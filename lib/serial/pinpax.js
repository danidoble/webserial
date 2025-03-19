'use strict';

import { Kernel } from './kernel.js';
import { Devices } from '../utils/devices.js';

export class PinPax extends Kernel {
  __pinpax__ = {
    server: 'DEV',
    bussinessId: null,
    encriptionKey: null,
    apiKey: null,

    asyncResponses: {
      voucher: null,
      sale: null,
    },
    waiting: {
      voucher: false,
      sale: false,
    },
  };
  constructor(
    {
      filters = null,
      config_port = {
        baudRate: 115200,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        bufferSize: 32768,
        flowControl: 'none',
      },
      no_device = 1,
      device_listen_on_channel = 1,
    } = {
      filters: null,
      config_port: {
        baudRate: 115200,
        dataBits: 8,
        stopBits: 1,
        parity: 'none',
        bufferSize: 32768,
        flowControl: 'none',
      },
      no_device: 1,
      device_listen_on_channel: 1,
    }
  ) {
    super({ filters, config_port, no_device, device_listen_on_channel });
    this.__internal__.device.type = 'pinpax';
    if (Devices.getCustom(this.typeDevice, no_device))
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    this.__internal__.time.response_connection = 2e3;
    this.__internal__.time.response_general = 3e3;
    this.__internal__.serial.delay_first_connection = 1_000;
    this.__internal__.serial.response.replacer = ''; // /[\n\r]+/g  ->  default remove all \r\n () but we need to keep it if the limiter has \r or \n
    this.__internal__.serial.response.limiter = '\r\n';
    this.#registerAvailableListenersPinPax();
    this.#touch();
    this.getResponseAsString();
  }

  #touch() {
    Devices.add(this);
  }

  #registerAvailableListenersPinPax() {
    const _ = [
      'buttons-status',
      'init-app',
      'connectMessage',
      'login',
      'voucher',
      'info',
      'keep-alive',
      'reset-app',
      'get-config',
      'payment',
      'error',
    ];
    for (const event of _) {
      this.serialRegisterAvailableListener(event);
    }
  }

  set bussinessId(bussinessId) {
    this.__pinpax__.bussinessId = bussinessId;
  }
  get bussinessId() {
    return this.__pinpax__.bussinessId;
  }

  set encriptionKey(encriptionKey) {
    this.__pinpax__.encriptionKey = encriptionKey;
  }
  get encriptionKey() {
    return this.__pinpax__.encriptionKey;
  }

  set apiKey(apiKey) {
    this.__pinpax__.apiKey = apiKey;
  }
  get apiKey() {
    return this.__pinpax__.apiKey;
  }

  set server(server) {
    this.__pinpax__.server = server;
  }
  get server() {
    return this.__pinpax__.server;
  }

  serialMessage(codex) {
    let response = null;
    try {
      response = JSON.parse(codex);
    } catch (e) {
      console.error('Error parsing response', e);
      this.dispatch('serial:message', codex);
      return;
    }

    switch (response.response) {
      case 'INITAPP':
        this.dispatch('init-app', { status: 'started' });
        this.#afterInitApp().then(() => {});
        break;
      case 'CONNECT':
        this.dispatch('connectMessage', { status: 'connected' });
        break;
      case 'LOGIN':
        this.dispatch('login', response);
        break;
      case 'LASTVOUCHER':
        this.dispatch('voucher', response);
        if (this.__pinpax__.waiting.voucher) {
          this.__pinpax__.asyncResponses.voucher = response;
          this.__pinpax__.waiting.voucher = false;
        }
        break;
      case 'DEVICEINFO':
        this.dispatch('info', response);
        break;
      case 'KEEPALIVE':
        this.dispatch('keep-alive', { status: 'alive' });
        break;
      case 'RESETAPP':
        this.dispatch('reset-app', { status: 'accepted' });
        break;
      case 'GETCONFIG':
        this.dispatch('get-config', response);
        break;
      case 'HIDEBUTTONS':
        this.dispatch('buttons-status', { hidden: true });
        break;
      case 'SHOWBUTTONS':
        this.dispatch('buttons-status', { hidden: false });
        break;
      case 'PAYMENT_PROCESS':
        this.dispatch('payment', {
          status: 'starting',
          amount: response.amount,
          reference: response.referecence,
        });
        break;
      case 'INSERT_CARD':
        this.dispatch('payment', { status: 'insert card' });
        break;
      case 'CARD_DATA':
        this.dispatch('payment', {
          status: 'card data',
          amount: response.amount,
          cardHolderName: response.cardHolderName,
          ccMark: response.ccMark,
          ccType: response.ccType,
          currency: response.currency,
          maskedPan: response.maskedPan,
          readingType: response.readingType,
        });
        break;
      case 'MERCHANT':
        this.dispatch('payment', {
          status: 'merchant',
          afiliation: response.afiliation,
          alias: response.alias,
          amountCashBackCommission: response.amountCashBackCommission,
          currency: response.currency,
          description: response.description,
          hasCashBack: response.hasCashBack,
          limitCashBackAmount: response.limitCashBackAmount,
          merchant: response.merchant,
          months: response.months,
          name: response.name,
        });
        break;
      case 'TRANSACTION_RESULT':
        this.#responseResult({
          status: 'result',
          approved: response.approved,
          acquirer: response.acquirer,
          address: response.address,
          amount: response.amount,
          amountCashback: response.amountCashback,
          appIDLabel: response.appIDLabel,
          appId: response.appId,
          arqc: response.arqc,
          auth: response.auth,
          ccBin: response.ccBin,
          ccExpirationDate: response.ccExpirationDate,
          ccName: response.ccName,
          ccNumber: response.ccNumber,
          ccType: response.ccType,
          comissionCashback: response.comissionCashback,
          currency: response.currency,
          date: response.date,
          errorCode: response.errorCode,
          errorDescription: response.errorDescription,
          folio: response.folio,
          id: response.id,
          merchantName: response.merchantName,
          msiLabel: response.msiLabel,
          operation: response.operation,
          pin: response.pin,
          qps: response.qps,
          reference: response.reference,
          response: response.response,
          source: response.source,
          sourceLabel: response.sourceLabel,
          time: response.time,
        });
        break;
      case 'ERROR':
        if (this.__pinpax__.waiting.sale) {
          this.__pinpax__.asyncResponses.sale = {
            status: 'error',
            approved: false,
            response: response,
          };
        }
        this.dispatch('error', {
          status: 'error',
          response: response,
        });
        this.dispatch('payment', {
          status: 'error',
          response: response,
        });
        break;
    }

    this.dispatch('serial:message', response);
    // console.log(response);
  }

  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(listen_on_port = 1) {
    const msg = JSON.stringify({ action: 'CONNECT' });
    return this.add0x(this.parseStringToBytes(msg, '\r\n'));
  }

  softReload() {
    super.softReload();
    this.__pinpax__.waiting.sale = false;
    this.__pinpax__.waiting.voucher = false;
    this.__pinpax__.asyncResponses.sale = null;
    this.__pinpax__.asyncResponses.voucher = null;
  }

  async sendCustomCode({ code = '' } = {}) {
    if (typeof code !== 'string') throw new Error('Invalid string');
    const arr = this.parseStringToBytes(code, '\r\n');
    await this.appendToQueue(arr, 'custom');
  }

  async connectMessage() {
    const msg = JSON.stringify({ action: 'CONNECT' });
    const arr = this.parseStringToBytes(msg, '\r\n');
    await this.appendToQueue(arr, 'connect:message');
  }

  #responseResult(response) {
    this.dispatch('payment', response);
    if (this.__pinpax__.waiting.sale) {
      this.__pinpax__.asyncResponses.sale = response;
    }
  }

  async login() {
    if (!this.apiKey || !this.bussinessId || !this.encriptionKey || !this.server)
      throw new Error('Invalid data to login check apiKey, bussinessId, encriptionKey, server');

    const msg = JSON.stringify({
      action: 'LOGIN_MIT',
      server: this.__pinpax__.server,
      bussiness_id: this.__pinpax__.bussinessId,
      encription_key: this.__pinpax__.encriptionKey,
      api_key: this.__pinpax__.apiKey,
    });
    const arr = this.parseStringToBytes(msg, '\r\n');
    await this.appendToQueue(arr, 'login');
  }

  #validateReference(reference) {
    return /^[A-Z-a-z0-9_\s]+$/g.test(reference);
  }

  async makeSale({ amount = 0, reference = null } = {}) {
    if (this.isDisconnected) throw new Error('Device is disconnected');
    if (this.__pinpax__.waiting.sale) throw new Error('Already waiting for sale response');
    if (amount <= 0) throw new Error('Invalid amount');
    amount = parseFloat(amount);
    if (isNaN(amount)) throw new Error('Invalid amount');
    if (!reference || !this.#validateReference(reference))
      throw new Error(
        'Reference is required and must be alphanumeric and the only symbol allowed is midlescore or underscore (- _)'
      );

    amount = amount.toFixed(2);
    const msg = JSON.stringify({ action: 'PAYMENT', amount: amount, reference: reference });
    const arr = this.parseStringToBytes(msg, '\r\n');

    this.__pinpax__.waiting.sale = true;
    this.__pinpax__.asyncResponses.sale = null;

    if (this.queue.length > 0) {
      await this.#waitUntilQueueIsEmpty();
    }
    const this1 = this;

    await this.appendToQueue(arr, 'make-sale');
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this1.__pinpax__.asyncResponses.sale) {
          const sale = this1.__pinpax__.asyncResponses.sale;
          this1.__pinpax__.asyncResponses.sale = null;
          this1.__pinpax__.waiting.sale = false;
          clearInterval(interval);
          resolve(sale.approved);
        }
      }, 100);
    });
  }

  async #waitUntilQueueIsEmpty() {
    if (this.isDisconnected) throw new Error('Device is disconnected');
    if (this.queue.length === 0) return true;
    const this1 = this;

    return new Promise((resolve) => {
      let interval = setInterval(() => {
        if (this1.queue.length === 0) {
          clearInterval(interval);
          resolve(true);
        }
      }, 500);
    });
  }

  async getVoucher() {
    if (this.isDisconnected) throw new Error('Device is disconnected');
    if (this.__pinpax__.waiting.voucher) throw new Error('Already waiting for voucher');

    this.__pinpax__.waiting.voucher = true;
    this.__pinpax__.asyncResponses.voucher = null;

    const msg = JSON.stringify({ action: 'GETVOUCHER' });
    const arr = this.parseStringToBytes(msg, '\r\n');

    if (this.queue.length > 0) {
      await this.#waitUntilQueueIsEmpty();
    }
    await this.appendToQueue(arr, 'get-voucher');
    const this1 = this;

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this1.__pinpax__.waiting.voucher = false;
        reject('Timeout');
      }, 10_000);

      const interval = setInterval(() => {
        if (this1.__pinpax__.asyncResponses.voucher) {
          const voucher = this1.__pinpax__.asyncResponses.voucher;
          this1.__pinpax__.asyncResponses.voucher = null;
          this1.__pinpax__.waiting.voucher = false;
          clearInterval(interval);
          clearTimeout(timeout);
          resolve(voucher.voucher);
        }
      }, 100);
    });
  }

  async info() {
    const msg = JSON.stringify({ action: 'DEVICEINFO' });
    const arr = this.parseStringToBytes(msg, '\r\n');
    await this.appendToQueue(arr, 'info');
  }

  async keepAlive() {
    const msg = JSON.stringify({ action: 'KEEPALIVE' });
    const arr = this.parseStringToBytes(msg, '\r\n');
    await this.appendToQueue(arr, 'keep-alive');
  }

  async resetApp() {
    const msg = JSON.stringify({ action: 'RESETAPP' });
    const arr = this.parseStringToBytes(msg, '\r\n');
    await this.appendToQueue(arr, 'reset-app');
  }

  async getConfig() {
    const msg = JSON.stringify({ action: 'GETCONFIG' });
    const arr = this.parseStringToBytes(msg, '\r\n');
    await this.appendToQueue(arr, 'get-config');
  }

  async hideButtons() {
    const msg = JSON.stringify({ action: 'HIDEBUTTONS' });
    const arr = this.parseStringToBytes(msg, '\r\n');
    await this.appendToQueue(arr, 'hide-buttons');
  }

  async showButtons() {
    const msg = JSON.stringify({ action: 'SHOWBUTTONS' });
    const arr = this.parseStringToBytes(msg, '\r\n');
    await this.appendToQueue(arr, 'show-buttons');
  }

  async demo() {
    console.warn('RUNNING DEMO APP BE CAREFUL');
    const msg = JSON.stringify({ action: 'DEMO' });
    const arr = this.parseStringToBytes(msg, '\r\n');
    await this.appendToQueue(arr, 'demo');
  }

  async #afterInitApp() {
    await this.connectMessage();
    await this.login();
    await this.hideButtons();
  }
}
