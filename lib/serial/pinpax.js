'use strict';

import { Kernel } from './kernel.js';
import { Devices } from '../utils/devices.js';
import { PinPax as PinPaxCommands } from '@danidoble/webserial-vending-commands';

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
      socket = false,
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
      socket: false,
    }
  ) {
    super({ filters, config_port, no_device, device_listen_on_channel, socket });
    this.__internal__.device.type = 'pinpax';
    if (Devices.getCustom(this.typeDevice, no_device))
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    this.__internal__.time.response_connection = 4e3;
    this.__internal__.time.response_general = 3e3;
    this.__internal__.serial.delay_first_connection = 1_000;
    this.__internal__.serial.response.replacer = ''; // /[\n\r]+/g  ->  default remove all \r\n () but we need to keep it if the limiter has \r or \n
    this.__internal__.serial.response.limiter = '\r\n';
    this.#registerAvailableListenersPinPax();
    Devices.add(this);
    this.getResponseAsString();
  }

  #registerAvailableListenersPinPax() {
    const _ = [
      'buttons-status',
      'init-app',
      'connectMessage',
      'voucher',
      'info',
      'keep-alive',
      'reset-app',
      'get-config',
      'payment',
      'error',
      'refund',
      'login',
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
      if (!response.request) {
        response.request = this.lastAction;
      }
      if (!response.name) {
        response.name = this.lastAction;
      }
    } catch (e) {
      console.error('Error parsing response', e, codex);
      this.dispatch('serial:message', codex);
      return;
    }

    switch (response.response) {
      case 'INITAPP':
        this.dispatch('init-app', { name: 'INITAPP', request: this.lastAction, status: 'started' });
        this.#afterInitApp().then(() => {});
        break;
      case 'CONNECT':
        this.dispatch('connectMessage', { name: 'CONNECT', request: this.lastAction, status: 'connected' });
        this.#afterConnectMessage().then(() => {});
        break;
      case 'LOGIN':
        if (!response.name) {
          response.name = 'LOGIN';
        }
        this.dispatch('login', response);
        break;
      case 'LASTVOUCHER':
        if (!response.name) {
          response.name = 'LASTVOUCHER';
        }
        this.dispatch('voucher', response);
        if (this.__pinpax__.waiting.voucher) {
          this.__pinpax__.asyncResponses.voucher = response;
          this.__pinpax__.waiting.voucher = false;
        }
        break;
      case 'DEVICEINFO':
        if (!response.name) {
          response.name = 'DEVICEINFO';
        }
        this.dispatch('info', response);
        break;
      case 'KEEPALIVE':
        this.dispatch('keep-alive', { name: 'KEEPALIVE', request: this.lastAction, status: 'alive' });
        break;
      case 'RESETAPP':
        this.dispatch('reset-app', { name: 'RESETAPP', request: this.lastAction, status: 'accepted' });
        break;
      case 'GETCONFIG':
        if (!response.name) {
          response.name = 'GETCONFIG';
        }
        this.dispatch('get-config', response);
        break;
      case 'HIDEBUTTONS':
        this.dispatch('buttons-status', { name: 'HIDEBUTTONS', request: this.lastAction, hidden: true });
        break;
      case 'SHOWBUTTONS':
        this.dispatch('buttons-status', { name: 'SHOWBUTTONS', request: this.lastAction, hidden: false });
        break;
      case 'PAYMENT_PROCESS':
        if (!response.name) {
          response.name = 'PAYMENT_PROCESS';
        }
        this.dispatch('payment', {
          name: 'PAYMENT_PROCESS',
          request: this.lastAction,
          status: 'starting',
          amount: response.amount,
          reference: response.referecence,
        });
        break;
      case 'INSERT_CARD':
        this.dispatch('payment', { name: 'INSERT_CARD', request: this.lastAction, status: 'insert card' });
        break;
      case 'CARD_DATA':
        if (!response.name) {
          response.name = 'CARD_DATA';
        }
        this.dispatch('payment', {
          name: 'CARD_DATA',
          request: this.lastAction,
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
        if (!response.name) {
          response.name = 'MERCHANT';
        }
        this.dispatch('payment', {
          request: this.lastAction,
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
        if (!response.name) {
          response.name = 'TRANSACTION_RESULT';
        }
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
        if (!response.name) {
          response.name = 'ERROR';
        }
        if (this.__pinpax__.waiting.sale) {
          this.__pinpax__.asyncResponses.sale = {
            status: 'error',
            approved: false,
            response: response,
          };
        }
        this.dispatch('error', { name: 'ERROR', request: this.lastAction, status: 'error', response: response });
        this.dispatch('payment', { name: 'ERROR', request: this.lastAction, status: 'error', response: response });
        break;
      case 'REFUND':
        this.dispatch('refund', { name: 'ERROR', request: this.lastAction, status: 'refund', response });
        break;
    }

    this.dispatch('serial:message', response);
    // console.log(response);
  }

  serialSetConnectionConstant(listen_on_port = 1) {
    return PinPaxCommands.connection(listen_on_port);
  }

  softReload() {
    super.softReload();
    this.__pinpax__.waiting.sale = false;
    this.__pinpax__.waiting.voucher = false;
    this.__pinpax__.asyncResponses.sale = null;
    this.__pinpax__.asyncResponses.voucher = null;
  }

  async sendCustomCode(code = {}) {
    if (typeof code !== 'object') throw new Error('Invalid object');
    if (code.constructor !== Object) throw new Error('Invalid object');
    if (Object.keys(code).length === 0) throw new Error('Empty object');
    if (code.action === undefined || code.action === null) throw new Error('Invalid object add action');

    const msg = JSON.stringify(code);
    const arr = this.parseStringToBytes(msg, '\r\n');
    await this.appendToQueue(this.stringArrayToUint8Array(arr), 'custom');
  }

  async connectMessage() {
    await this.appendToQueue(PinPaxCommands.connect(), 'connect:message');
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

  async #readQR({ type = 'production' } = {}) {
    const bytes = PinPaxCommands.readQR({ type });
    return await this.appendToQueue(bytes, 'read-qr');
  }

  async #forceHide() {
    await this.appendToQueue(PinPaxCommands.forceHide(), 'force-hide');
  }

  async #forceShow() {
    await this.appendToQueue(PinPaxCommands.forceShow(), 'force-show');
  }

  async #afterInitApp() {
    await this.connectMessage();
  }

  async #afterConnectMessage() {
    await this.hideButtons();
  }

  #responseResult(response) {
    this.dispatch('payment', response);
    if (this.__pinpax__.waiting.sale) {
      this.__pinpax__.asyncResponses.sale = response;
    }
  }

  async makeSale({ amount = 0, reference = null } = {}) {
    if (this.isDisconnected) throw new Error('Device is disconnected');
    if (this.__pinpax__.waiting.sale) throw new Error('Already waiting for sale response');
    const bytes = PinPaxCommands.makeSale({ amount, reference });

    this.__pinpax__.waiting.sale = true;
    this.__pinpax__.asyncResponses.sale = null;

    if (this.queue.length > 0) {
      await this.#waitUntilQueueIsEmpty();
    }
    const this1 = this;

    await this.appendToQueue(bytes, 'make-sale');
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

  async getVoucher({ folio = null } = {}) {
    if (this.isDisconnected) throw new Error('Device is disconnected');
    if (this.__pinpax__.waiting.voucher) throw new Error('Already waiting for voucher');
    if (!folio) throw new Error('Folio is required');

    this.__pinpax__.waiting.voucher = true;
    this.__pinpax__.asyncResponses.voucher = null;

    const arr = PinPaxCommands.getVoucher({ folio });

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
    await this.appendToQueue(PinPaxCommands.info(), 'info');
  }

  async keepAlive() {
    await this.appendToQueue(PinPaxCommands.keepAlive(), 'keep-alive');
  }

  async restartApp() {
    await this.appendToQueue(PinPaxCommands.restartApp(), 'reset-app');
  }

  async getConfig() {
    return await this.appendToQueue(PinPaxCommands.getConfig(), 'get-config');
  }

  async hideButtons() {
    await this.appendToQueue(PinPaxCommands.hideButtons(), 'hide-buttons');
    return await this.#forceHide();
  }

  async showButtons() {
    await this.appendToQueue(PinPaxCommands.showButtons(), 'show-buttons');
    return await this.#forceShow();
  }

  async demo() {
    console.warn('RUNNING DEMO APP, BE CAREFUL');
    return await this.appendToQueue(PinPaxCommands.demo(), 'demo');
  }

  async refund({ amount = 0, folio = null, auth = null } = {}) {
    return await this.appendToQueue(
      PinPaxCommands.refund({
        amount,
        folio,
        auth,
      }),
      'refund'
    );
  }

  async readProductionQR() {
    return await this.#readQR({ type: 'production' });
  }

  async readQualityAssuranceQR() {
    return this.#readQR({ type: 'QA' });
  }

  async exit() {
    return await this.appendToQueue(PinPaxCommands.exit(), 'exit-app');
  }

  async init() {
    await this.appendToQueue(PinPaxCommands.init(), 'init-app');
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
}
