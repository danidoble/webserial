'use strict';

import { Kernel } from './kernel.js';
import { Devices } from '../utils/devices.js';
import { isEmpty, supportCrypto, supportGeolocation, wait } from '../utils/utils.js';
import { JSEncrypt } from 'jsencrypt';

export class PinPad extends Kernel {
  constructor({ filters = null, config_port = null, no_device = 1 } = {}) {
    super({ filters, config_port, no_device });
    this.__internal__.device.type = 'pinpad';
    if (!supportCrypto()) {
      throw new Error('Crypto not supported in this browser');
    }
    if (Devices.getCustom(this.typeDevice, no_device)) {
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    }
    this.__internal__.time.response_connection = 2e3;
    this.__internal__.time.response_general = 2e3;
    this.__internal__.serial.delay_first_connection = 1_000;
    this.__internal__.serial.config_port.baudRate = 19200;

    this.__internal__.pinPad = {
      STX: '\x02',
      ETX: '\x03',
      FS: '\x1C',
      getNULL: '\0',
      versionAPP: '1.0.16',
      nameApp: 'pinpapWebApp ',
      canalAPP: '3',
      canalType: '11',
      serial_port: '',
      csv: null,
      //serial: chrome.serial,
      lineBuffer: '',
      respCode: '',
      respuestaWS: '',
      tipoServicio: '',
      keyRSA: null,
      modeloTerminalPP: '',
      bin8: '',
      printL: false,
      country: '',
      branch: '',
      company: '',
      contra: '',
      usuario: '',
      EMVCard: '0',
      getCVVAmex: '1',
      ForceOnline: '00',
      isError92TRX: false,
      dataResponseGlobal: '',
      responseTRX: '',
      aplicaReverso: false,
      OperationNumberReverse: '',
      stTokenization: false,
      TokenizarTRX: false,
      FuncionToken: false,
      AuthNumberReverse: '',
      C93Global: '',
      objDataLogin: {
        Ambiente: '',
        Usuario: '',
        Pass: '',
      },
      objDataKeys: {
        Ambiente: '',
        Usuario: '',
        Pass: '',
        Country: '',
        IdBranch: '',
        IdCompany: '',
      },
      objDataTRX: {
        Ambiente: '',
        Currency: '',
        CurrencyCode: '',
        Amount: '',
        TimeOutPinPad: '',
        SoportaFirma: '',
        SoportaCTLS: '',
        MarcaTerminal: '',
        ModeloTerminal: '',
      },
      objDataMerchant: {
        Ambiente: '',
        BIN: '',
        User: '',
        Currency: '',
      },
      latitud: '',
      longitud: '',
      ipPublica: '',
      tokenRespOriginal: '',
      objDataVenta: {
        Ambiente: '',
        Country: '',
        IdBranch: '',
        IdCompany: '',
        pwd: '',
        User: '',
        UserTRX: '',
        EMV: '',
        ModeloTerminal: '',
        SerieTerminal: '',
        Contactless: '',
        Printer: '',
        VersionTerminal: '',
        TpOperation: '',
        Reference: '',
        Currency: '',
        Merchant: '',
        Reverse: '',
      },
      objDataVentaTkn: {
        Ambiente: '',
        Country: '',
        IdBranch: '',
        IdCompany: '',
        pwd: '',
        User: '',
        UserTRX: '',
        EMV: '',
        ModeloTerminal: '',
        SerieTerminal: '',
        Contactless: '',
        Printer: '',
        VersionTerminal: '',
        TpOperation: '',
        Reference: '',
        Currency: '',
        Merchant: '',
        Reverse: '',
        GenerateToken: '',
      },
      objDataVentaTemp: {
        DisplayTerminal: '',
        VersionApp: '',
        Mobile: '',
        TpResp: '',
        Crypto: '',
        PIN: '',
        POSEM: '',
        AppId: '',
        AppIdLabel: '',
        Arqc: '',
        Chip: '',
        ChipName: '',
        ChipNameEnc: '',
        ReadCTLS: '',
        NB_Data: '',
        NB_ksn: '',
        Tp_DUKPT: '',
        Tags: '',
        Type: '',
        dccAmount: '',
        dccStatus: '',
      },
      objDataReimpresion: {
        Ambiente: '',
        User: '',
        Pwd: '',
        IdBranch: '',
        IdCompany: '',
        Country: '',
        Tx_OperationNumber: '',
      },
      objDataConsulta: {
        Ambiente: '',
        User: '',
        Pwd: '',
        IdBranch: '',
        IdCompany: '',
        Country: '',
        Tx_Date: '',
        Reference: '',
      },
      objDataCancelacion: {
        Ambiente: '',
        User: '',
        Pwd: '',
        IdBranch: '',
        IdCompany: '',
        Country: '',
        UserTRX: '',
        Tx_OperationNumber: '',
        Tx_Auth: '',
        Amount: '',
      },
      objRead: {
        EMV: '',
        PIN: '',
        POSEM: '',
        AppId: '',
        AppIdLabel: '',
        Arqc: '',
        Chip: '',
        ChipName: '',
        ChipNameEnc: '',
        ReadCTLS: '',
        NB_Data: '',
        NB_ksn: '',
        Tags: '',
        Type: '',
      },
      objFinishEMV: {
        A: '',
        B: '',
        C: '',
        D: '',
        E: '',
        F: '',
        G: '',
        H: '',
        I: '',
        J: '',
        K: '',
      },
      objPrint: {
        Ambiente: '',
        VoucherComercio: '',
        VoucherCliente: '',
        ModeloTerminal: '',
      },
      datosPinPad: '',
      MIN_RESPONSE_LENGTH: 350,
      err: '',
      isDisconnectedDevice: true,
      isConnectedDevice: 0,
      QPS_validado: false,
      isCargaCashback: false,
      soportaInyeccionValue: false,
      contactlessValue: '',
      TieneCargaCTLS: false,
      panelSign: '',
      ValidarQPS: '1',
      banderaDUKPT: '',
      datosEMV: '',
      qps_Domestic: '',
      qps_International: '',
      cvml_VMC_Domestic: '',
      cvml_VMC_International: '',
      cvml_Amex: '',
      translimit_CTLS_VMC: '',
      translimit_CTLS_Amex: '',
      contErrores: 0,
      contReadOK: 0,
      contPost: 0,
      contPostVta: 0,
      companyVoucherGlobal: '',
      clientVoucherGlobal: '',
      RC4Key: 'KEY CREDIT CARD KEY',
      urlTemp: '',
      url: '',
      urlDesa: 'https://fcdev.mitec.com.mx',
      urlQA: 'https://fcqa.mitec.com.mx',
      urlProd: 'https://m.mit.com.mx',
      urlProd_2: 'https://m2.mit.com.mx',
      urlLlaveRSA: '/pinpadWeb/getDataCrypt',
      urlKeysDUKPT: '/pinpadWeb/getKeysDUKPT',
      urlLogin: '/pinpadWeb/login',
      urlMerchant: '/pinpadWeb/getAfiliaciones',
      urlSndVenta: '/pinpadWeb/executeSale',
      urlSndReimpresion: '/pinpadWeb/reprint',
      urlSndConsulta: '/pinpadWeb/queryTrx',
      urlCancelacion: '/pinpadWeb/executeVoid',
      urlReverso: '/pinpadWeb/executeBackSale',
      urlcheckin_banda: '/pinpadWeb/checkInPres',
      urlcheckin_Reaut: '/pinpadWeb/reAuthorization',
      urlcheckout: '/pinpadWeb/checkout',
      urlcheckin_Moto: '/pinpadWeb/checkin',
      urlTokenize: '/pinpadWeb/tokenize',
      urlLoginTemp: '',
      urlLlaveRSATemp: '',
      urlKeysDUKPTTemp: '',
      urlMerchantTemp: '',
      urlSndVentaTemp: '',
      urlSndReimpresionTemp: '',
      urlSndConsultaTemp: '',
      urlCancelacionTemp: '',
      urlReversoTemp: '',
      urlcheckin_bandaTemp: '',
      urlcheckin_ReautTemp: '',
      urlcheckout_Temp: '',
      urlcheckin_MotoTemp: '',
      urlTokenizeTemp: '',
      portsCOM: '',

      objDataCheckinBanda: {
        Ambiente: '',
        Country: '',
        IdBranch: '',
        IdCompany: '',
        pwd: '',
        User: '',
        UserTRX: '',
        EMV: '',
        ModeloTerminal: '',
        SerieTerminal: '',
        Contactless: '',
        Printer: '',
        VersionTerminal: '',
        TpOperation: '',
        Reference: '',
        Amount: '',
        Currency: '',
        Merchant: '',
        Reverse: '',
        Tx_Room: '',
      },
      objDataReautorizacion: {
        Ambiente: '',
        User: '',
        Pwd: '',
        IdBranch: '',
        IdCompany: '',
        Country: '',
        UserTRX: '',
        Tx_OperationNumber: '',
        Amount: '',
      },
      objDataCheckOut: {
        Ambiente: '',
        User: '',
        Pwd: '',
        IdBranch: '',
        IdCompany: '',
        Country: '',
        UserTRX: '',
        Tx_OperationNumber: '',
        Amount: '',
      },
      objDataCheckinMoto: {
        Ambiente: '',
        Country: '',
        IdBranch: '',
        IdCompany: '',
        Pwd: '',
        User: '',
        UserTRX: '',
        TpOperation: '',
        Reference: '',
        Amount: '',
        Currency: '',
        Merchant: '',
        Tx_Room: '',
        Cc_Type: '',
        Cc_Name: '',
        Cc_Number: '',
        Cc_ExpMonth: '',
        Cc_ExpYear: '',
        Cc_CvvCsc: '',
      },
      objDataMerchantMOTO: {
        Ambiente: '',
        BIN: '',
        User: '',
        Currency: '',
        Tx_OperationType: '',
      },
    };

    this.#registerAvailableListenersLocker();
    this.#touch();
  }

  #touch() {
    Devices.addCustom('pinpad', this);
  }

  #registerAvailableListenersLocker() {
    const _ = ['pinPad:ws'];
    for (const event of _) {
      this.serialRegisterAvailableListener(event);
    }
  }

  serialMessage(original_code) {
    const message = {
      original_code,
      code: null,
      name: null,
      description: null,
      request: null,
      no_code: 0,
    };

    const byteArray = original_code.map((hexString) => parseInt(hexString, 16));
    const codex = String.fromCharCode(...byteArray).replace(/[\n\r]+/g, '');
    message.code = codex;

    switch (codex) {
      case 'connected':
        message.name = 'connected';
        message.description = 'Connection established';
        message.request = 'connect';
        message.no_code = 100;
        break;
      case 'created by danidoble':
        message.name = 'thanks';
        message.description = 'thanks for using this software';
        message.request = 'credits';
        message.no_code = 101;
        break;
      case 'hello there':
        message.name = 'hello there';
        message.description = 'hi human';
        message.request = 'hi';
        message.no_code = 102;
        break;
      case 'ara ara':
        message.name = 'ara ara';
        message.description = 'troll';
        message.request = 'ara ara';
        message.no_code = 404;
        break;
      default:
        message.name = 'unknown';
        message.description = 'Unknown command';
        message.request = 'unknown';
        message.no_code = 400;
        break;
    }
    //console.warn(codex);

    this.dispatch('serial:message', message);
  }

  parseStringToBytes(string = '') {
    const encoder = new TextEncoder();
    string += '\n'; // to finish the command
    const encoded = encoder.encode(string);
    return Array.from(encoded).map((byte) => byte.toString(16));

    // if (string.length === 0) throw new Error('Empty string');
    // string += '\n\r'; // to finish the command
    // return Array.from(string).map(char => char.charCodeAt(0).toString(16));
  }

  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(listen_on_port = 1) {
    return this.add0x(this.parseStringToBytes('CONNECT'));
  }

  async sendCustomCode({ code = '' } = {}) {
    if (typeof code !== 'string') throw new Error('Invalid string');
    const arr = this.parseStringToBytes(code);
    await this.appendToQueue(arr, 'custom');
  }

  // ========================================================================================
  // ========================================================================================
  // ========================================================================================

  crypt(key, value) {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(key);
    return jsEncrypt.encrypt(value);
  }

  generateKey(length) {
    const chars = '0123456789ABCDEF';
    let key = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      key += chars.substring(randomIndex, randomIndex + 1);
    }
    return key;
  }

  hexToAscii(hex) {
    let hexString = hex.toString();
    let asciiString = '';
    for (let i = 0; i < hexString.length; i += 2) {
      asciiString += String.fromCharCode(parseInt(hexString.substring(i, 2), 16));
    }
    return asciiString;
  }

  asciiToHex(asciiString) {
    const hexArray = [];
    for (let i = 0, length = asciiString.length; i < length; i++) {
      const hex = Number(asciiString.charCodeAt(i)).toString(16);
      hexArray.push(hex);
    }
    return hexArray.join('');
  }

  base16Encode(asciiString) {
    const hexChars = '0123456789abcdef';
    const hexArray = [];
    const encodedArray = [];
    for (let i = 0; i < 256; i++) {
      hexArray[i] = hexChars.charAt(i >> 4) + hexChars.charAt(i & 15);
    }
    for (let i = 0; i < asciiString.length; i++) {
      encodedArray[i] = hexArray[asciiString.charCodeAt(i)];
    }
    return encodedArray.join('');
  }

  base16Decode(hex) {
    const hexChars = '0123456789abcdef';
    const asciiArray = [];
    const decodedArray = [];
    let j = 0;
    for (let i = 0; i < 256; i++) {
      asciiArray[hexChars.charAt(i >> 4) + hexChars.charAt(i & 15)] = String.fromCharCode(i);
    }
    hex = hex.replace(/[^a-f0-9]/gi, '');
    if (hex.length % 2) {
      hex = '0' + hex;
    }
    for (let i = 0; i < hex.length; i += 2) {
      decodedArray[j++] = asciiArray[hex.substr(i, 2)];
    }
    return decodedArray.join('');
  }

  async AESEncrypt(key, message) {
    const keyBytes = new Uint8Array(key.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const encoder = new TextEncoder();
    const data = encoder.encode(message);

    const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['encrypt']);

    const encrypted = await crypto.subtle.encrypt({ name: 'AES-CBC', iv: iv }, cryptoKey, data);

    const ivBase64 = btoa(String.fromCharCode(...iv));
    const ciphertextBase64 = btoa(String.fromCharCode(...new Uint8Array(encrypted)));

    return ivBase64 + ciphertextBase64;
  }

  RC4Encrypt(key, message, base16 = false) {
    const stateArray = [];
    for (let i = 0; i < 256; i++) {
      stateArray[i] = i;
    }

    let keyIndex = 0;
    for (let i = 0; i < 256; i++) {
      keyIndex = (keyIndex + stateArray[i] + key.charCodeAt(i % key.length)) % 256;
      [stateArray[i], stateArray[keyIndex]] = [stateArray[keyIndex], stateArray[i]];
    }

    let statePointer1 = 0;
    let statePointer2 = 0;
    let encryptedText = '';
    for (const character of message) {
      statePointer1 = (statePointer1 + 1) % 256;
      statePointer2 = (statePointer2 + stateArray[statePointer1]) % 256;
      [stateArray[statePointer1], stateArray[statePointer2]] = [stateArray[statePointer2], stateArray[statePointer1]];

      let keyStreamByte = stateArray[(stateArray[statePointer1] + stateArray[statePointer2]) % 256];
      encryptedText += String.fromCharCode(character.charCodeAt(0) ^ keyStreamByte);
    }
    if (!base16) return encryptedText;

    return this.base16Encode(encryptedText).toUpperCase();
  }

  RC4Decrypt(key, ciphertext) {
    return this.RC4Encrypt(key, this.hexToAscii(ciphertext));
  }

  ab2str(buffer) {
    let str = String.fromCharCode.apply(null, new Uint8Array(buffer));
    return decodeURIComponent(encodeURIComponent(str));
  }

  async cancelReadCard() {
    let command = '\x02012VXVCANCEL\x03l';
    if (this.__internal__.pinPad.modeloTerminalPP.toLowerCase() === 'ingenico') {
      command = '\x02029C50AOPERACION       CANCELADA\x03\x1D';
    }
    this.__internal__.pinPad.lineBuffer = '';
    const arr = this.stringToArrayBuffer(command);
    await this.appendToQueue(arr, 'cancel:read');
  }

  removeAccents(str) {
    str.replaceAll('Á', 'A');
    str.replaceAll('É', 'E');
    str.replaceAll('Í', 'I');
    str.replaceAll('Ó', 'O');
    str.replaceAll('Ú', 'U');
    str.replaceAll('á', 'a');
    str.replaceAll('é', 'e');
    str.replaceAll('í', 'i');
    str.replaceAll('ó', 'o');
    str.replaceAll('ú', 'u');
    str.replaceAll('ñ', 'n');
    str.replaceAll('Ñ', 'N');
    str.replaceAll('Electr?a"', 'Electronica');
    return str;
  }

  processEndReceipt(voucher, logo, appVersion) {
    voucher = voucher.replace('@cnb logo_cpagos', logo);
    voucher = voucher.replace('@cnn ver_app', appVersion);
    voucher = voucher.replace(/@/g, ' @');
    voucher = voucher.replace(/ {2}@/g, ' @');
    voucher = voucher.replace(/ {3}@/g, ' @');
    voucher = voucher.replace(/\r/g, '');
    voucher = voucher.replace(/\n/g, '');
    if (voucher.includes('@lsn POR ESTE PAGARE ME OBLIGO INCONDI')) {
      const index = voucher.indexOf('@lsn POR ESTE PAGARE ME OBLIGO INCONDI');
      voucher = voucher.substring(0, index);
    }
    return voucher.trim() + '@br @br @br @br @br';
  }

  processReceipt(voucher, version) {
    const logo = '@logo3 @br';
    const appVersion = '@cnn ' + version;

    if (voucher.includes('@cnb Santander')) {
      voucher = voucher.replace('@cnb Santander', '@logo1@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb American Express')) {
      voucher = voucher.replace('@cnb American Express', '@logo2@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb HSBC')) {
      voucher = voucher.replace('@cnb HSBC', '@logo7@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb IXE')) {
      voucher = voucher.replace('@cnb IXE', '@logo11@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb MULTIVA')) {
      voucher = voucher.replace('@cnb MULTIVA', '@logo15@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb Multiva')) {
      voucher = voucher.replace('@cnb Multiva', '@logo15@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb SCOTIA BANK')) {
      voucher = voucher.replace('@cnb SCOTIA BANK', '@logo16@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb SCOTIABANK')) {
      voucher = voucher.replace('@cnb SCOTIABANK', '@logo16@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb BANCOMER')) {
      voucher = voucher.replace('@cnb BANCOMER', '@logo17@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb Bancomer')) {
      voucher = voucher.replace('@cnb Bancomer', '@logo17@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb BBVA')) {
      voucher = voucher.replace('@cnb BBVA', '@logo17@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb BANORTE')) {
      voucher = voucher.replace('@cnb BANORTE', '@logo18@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb Banorte')) {
      voucher = voucher.replace('@cnb Banorte', '@logo18@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb BANREGIO')) {
      voucher = voucher.replace('@cnb BANREGIO', '@logo19@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb Banregio')) {
      voucher = voucher.replace('@cnb Banregio', '@logo19@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb GETNET')) {
      voucher = voucher.replace('@cnb GETNET', '@logo20@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb GetNET')) {
      voucher = voucher.replace('@cnb GetNET', '@logo20@br');
      return this.processEndReceipt(voucher, logo, appVersion);
    }
    return this.processEndReceipt(voucher, logo, appVersion);
  }

  async print(voucherType) {
    voucherType = parseInt(voucherType.toString());
    this.__internal__.pinPad.contErrores = 0;
    const objPrint = this.__internal__.pinPad.objPrint;
    const STX = this.__internal__.pinPad.STX;
    const ETX = this.__internal__.pinPad.ETX;
    let voucherCommand = '';

    if (!objPrint.VoucherComercio.includes(':')) {
      objPrint.VoucherComercio = this.RC4Decrypt(this.__internal__.pinPad.RC4Key, objPrint.VoucherComercio);
    }
    if (!objPrint.VoucherCliente.includes(':')) {
      objPrint.VoucherCliente = this.RC4Decrypt(this.__internal__.pinPad.RC4Key, objPrint.VoucherCliente);
    }

    let voucher = objPrint.VoucherComercio;
    if (voucherType !== 1) {
      voucher = objPrint.VoucherCliente;
    }

    if (voucher.length === 0) {
      this.dispatch('pinPad:ws', {
        error: true,
        code: '001',
        message: 'Without information to print',
      });
      return;
    }
    voucher = this.removeAccents(voucher);
    voucher = this.processReceipt(voucher, this.__internal__.pinPad.nameApp + this.__internal__.pinPad.versionAPP);
    voucherCommand = 'C59A' + voucher;
    let command = STX + this.calcLength(voucherCommand) + voucherCommand + ETX;
    command = command + this.calcLRC(command);
    if (voucherType === 2) {
      objPrint.VoucherCliente = '';
    }
    this.__internal__.pinPad.lineBuffer = '';
    const arr = this.stringToArrayBuffer(command);
    await this.appendToQueue(arr, 'print');
  }

  validateReference(reference) {
    return /^[A-Za-z0-9\s]+$/g.test(reference);
  }

  calcLength(data) {
    let length = data.length;
    const lengthStr = length.toString().length;
    if (lengthStr === 2) {
      return '0' + length;
    } else if (lengthStr === 1) {
      return '00' + length;
    }
    return length;
  }

  calcLRC(data) {
    const charCodes = [];
    let lrc = 0;
    for (let i = 0; i < data.length; i++) {
      charCodes.push(data.charCodeAt(i));
    }
    for (let i = 0; i < data.length; i++) {
      lrc ^= charCodes[i];
    }
    return String.fromCharCode(lrc);
  }

  validateAmount(amount) {
    amount = parseFloat(amount.toString());
    return !(isNaN(amount) || amount < 0);
  }

  async validateObject(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'undefined' || obj[key] === null || obj[key] === '') {
        throw new Error('EE26');
      }
    }
    return obj;
  }

  /**
   * deprecated just use validateObject
   * @param obj
   * @returns {Promise<void>}
   */
  async validateObjectTwo(obj) {
    await this.validateObject(obj);
  }

  async validateOperationNumber(operationNumber) {
    operationNumber = operationNumber.toString();
    if (operationNumber === '') {
      throw new Error('EE23');
    }
    if (operationNumber.length !== 9) {
      throw new Error('EE24');
    }
    if (isNaN(parseFloat(operationNumber))) {
      throw new Error('EE25');
    }
    return operationNumber;
  }

  formatNumber(number, decimals = 0) {
    number = parseFloat(number.toString().replace(/[^0-9.-]/g, ''));
    if (isNaN(number)) {
      return (0).toFixed(decimals);
    }
    return number.toFixed(decimals).replace(/,/g, '');
  }

  async fetchRSAPublicKey(url) {
    const response = await fetch(url),
      contentType = response.headers.get('content-type');
    if (response.ok && contentType.indexOf('application/json') !== -1) {
      const data = await response.json();
      this.__internal__.pinPad.keyRSA = data.key_public;
    } else {
      this.__internal__.pinPad.keyRSA = null;
      this.dispatch('pinPad:error-rsa-fetch', {
        code: 'EE22',
        message: 'Error fetching RSA public key',
      });
      this.__internal__.pinPad.contErrores++;
    }
  }

  async getRSAKey() {
    if (this.isEmptyRSAKey()) {
      return await this.fetchRSAPublicKey(this.__internal__.pinPad.urlLlaveRSA);
    }
    return this.__internal__.pinPad.keyRSA;
  }

  async getRSAKeyLocal() {
    if (!(await this.getRSAKey())) {
      this.__internal__.pinPad.contErrores++;
      throw new Error('EE99');
    }
    return null;
  }

  async buildJson(type) {
    type = parseInt(type);
    if (isNaN(type) || type < 1 || type > 13) {
      throw new Error('Json type to build not found');
    }
    const this1 = this;

    if (type === 1) {
      return JSON.stringify({
        REPRINTVOUCHER: {
          business: {
            country: this.__internal__.pinPad.objDataReimpresion.Country.toUpperCase(),
            id_branch: this.__internal__.pinPad.objDataReimpresion.IdBranch.toUpperCase(),
            id_company: this.__internal__.pinPad.objDataReimpresion.IdCompany.toUpperCase(),
            pwd: this.__internal__.pinPad.objDataReimpresion.Pwd.toUpperCase(),
            user: this.__internal__.pinPad.objDataReimpresion.User.toUpperCase(),
          },
          no_operacion: this.__internal__.pinPad.objDataReimpresion.Tx_OperationNumber,
          crypto: '2',
        },
      });
    }
    if (type === 2) {
      return JSON.stringify({
        user: this.__internal__.pinPad.objDataConsulta.User.toUpperCase(),
        pwd: this.__internal__.pinPad.objDataConsulta.Pwd.toUpperCase(),
        id_branch: this.__internal__.pinPad.objDataConsulta.IdBranch.toUpperCase(),
        id_company: this.__internal__.pinPad.objDataConsulta.IdCompany.toUpperCase(),
        date: this.__internal__.pinPad.objDataConsulta.Tx_Date,
        reference: this.__internal__.pinPad.objDataConsulta.Reference.toUpperCase(),
      });
    }
    if (type === 3) {
      JSON.stringify({
        VMCAMEXMCANCELACION: {
          business: {
            country: this.__internal__.pinPad.objDataCancelacion.Country.toUpperCase(),
            id_branch: this.__internal__.pinPad.objDataCancelacion.IdBranch.toUpperCase(),
            id_company: this.__internal__.pinPad.objDataCancelacion.IdCompany.toUpperCase(),
            pwd: this.__internal__.pinPad.objDataCancelacion.Pwd.toUpperCase(),
            user: this.__internal__.pinPad.objDataCancelacion.User.toUpperCase(),
          },
          transacction: {
            amount: this.__internal__.pinPad.objDataCancelacion.Amount,
            auth: this.__internal__.pinPad.objDataCancelacion.Tx_Auth.toUpperCase(),
            crypto: '2',
            no_operacion: this.__internal__.pinPad.objDataCancelacion.Tx_OperationNumber,
            usrtransacction: this.__internal__.pinPad.objDataCancelacion.UserTRX,
            version: this.__internal__.pinPad.nameApp + this.__internal__.pinPad.versionAPP,
          },
        },
      });
    }
    if (type === 4) {
      return JSON.stringify({
        VMCAMEXMREVERSO: {
          business: {
            id_company: this.__internal__.pinPad.objDataVenta.IdCompany.toUpperCase(),
            id_branch: this.__internal__.pinPad.objDataVenta.IdBranch.toUpperCase(),
            country: this.__internal__.pinPad.objDataVenta.Country.toUpperCase(),
            user: this.__internal__.pinPad.objDataVenta.User.toUpperCase(),
            pwd: this.__internal__.pinPad.objDataVenta.pwd.toUpperCase(),
          },
          transacction: {
            amount: this.formatNumber(this.__internal__.pinPad.objDataTRX.Amount, 2),
            no_operacion: this.__internal__.pinPad.OperationNumberReverse,
            auth: this.__internal__.pinPad.AuthNumberReverse.toUpperCase(),
            tracks: '',
            usrtransacction: this.__internal__.pinPad.objDataVenta.UserTRX,
            crypto: '2',
            version: this.__internal__.pinPad.nameApp + this.__internal__.pinPad.versionAPP,
          },
        },
      });
    }
    if (type === 5) {
      if (this.__internal__.pinPad.objRead.Chip.toString() === '0') {
        return JSON.stringify({
          VMCAMEXBCHECKIN: {
            business: {
              id_company: this.__internal__.pinPad.objDataCheckinBanda.IdCompany.toUpperCase(),
              id_branch: this.__internal__.pinPad.objDataCheckinBanda.IdBranch.toUpperCase(),
              country: this.__internal__.pinPad.objDataCheckinBanda.Country.toUpperCase(),
              user: this.__internal__.pinPad.objDataCheckinBanda.User.toUpperCase(),
              pwd: this.__internal__.pinPad.objDataCheckinBanda.pwd.toUpperCase(),
            },
            transacction: {
              merchant: this.__internal__.pinPad.objDataCheckinBanda.Merchant,
              reference: this.__internal__.pinPad.objDataCheckinBanda.Reference.toUpperCase(),
              tp_operation: this.__internal__.pinPad.objDataCheckinBanda.TpOperation,
              creditcard: {
                crypto: '4',
                type: this.__internal__.pinPad.objRead.Type,
                chip: this.__internal__.pinPad.objRead.Chip,
                posentrymode: this.__internal__.pinPad.objRead.POSEM,
                dukpt: {
                  tp_dukpt: '1',
                  nb_ksn: this.__internal__.pinPad.objRead.NB_ksn,
                  nb_data: this.__internal__.pinPad.objRead.NB_Data,
                },
                contactless: this.__internal__.pinPad.objRead.ReadCTLS,
              },
              amount: this.__internal__.pinPad.objDataTRX.Amount,
              currency: this.__internal__.pinPad.objDataCheckinBanda.Currency.toUpperCase(),
              usrtransacction: this.__internal__.pinPad.objDataCheckinBanda.UserTRX.toUpperCase(),
              room: this.__internal__.pinPad.objDataCheckinBanda.Tx_Room.toUpperCase(),
              emv: this.__internal__.pinPad.objRead.EMV,
              version: this.__internal__.pinPad.nameApp + this.__internal__.pinPad.versionAPP,
              serie: this.__internal__.pinPad.objDataCheckinBanda.SerieTerminal,
              version_terminal: this.__internal__.pinPad.objDataCheckinBanda.VersionTerminal,
              modelo_terminal: this.__internal__.pinPad.objDataCheckinBanda.ModeloTerminal,
              terminal: {
                printer: this.__internal__.pinPad.objDataCheckinBanda.Printer,
                display: '1',
                is_mobile: '0',
                is_contactless: this.__internal__.pinPad.objDataCheckinBanda.Contactless,
              },
            },
            dcc: {
              dcc_amount: '0',
              dcc_status: '0',
            },
            geolocation: {
              latitude: this.__internal__.pinPad.latitud,
              longitude: this.__internal__.pinPad.longitud,
              ip: this.__internal__.pinPad.ipPublica,
            },
          },
        });
      }
      return JSON.stringify({
        VMCAMEXBCHECKIN: {
          business: {
            id_company: this.__internal__.pinPad.objDataCheckinBanda.IdCompany.toUpperCase(),
            id_branch: this.__internal__.pinPad.objDataCheckinBanda.IdBranch.toUpperCase(),
            country: this.__internal__.pinPad.objDataCheckinBanda.Country.toUpperCase(),
            user: this.__internal__.pinPad.objDataCheckinBanda.User.toUpperCase(),
            pwd: this.__internal__.pinPad.objDataCheckinBanda.pwd.toUpperCase(),
          },
          transacction: {
            merchant: this.__internal__.pinPad.objDataCheckinBanda.Merchant,
            reference: this.__internal__.pinPad.objDataCheckinBanda.Reference.toUpperCase(),
            tp_operation: this.__internal__.pinPad.objDataCheckinBanda.TpOperation,
            creditcard: {
              crypto: '4',
              type: this.__internal__.pinPad.objRead.Type,
              chip: this.__internal__.pinPad.objRead.Chip,
              tags: this.__internal__.pinPad.objRead.Tags,
              chipname: this.__internal__.pinPad.objRead.ChipName,
              chipnameenc: this.__internal__.pinPad.objRead.ChipNameEnc,
              pin: this.__internal__.pinPad.objRead.PIN,
              posentrymode: this.__internal__.pinPad.objRead.POSEM,
              arqc: this.__internal__.pinPad.objRead.Arqc,
              appid: this.__internal__.pinPad.objRead.AppId,
              appidlabel: this.__internal__.pinPad.objRead.AppIdLabel,
              dukpt: {
                tp_dukpt: '1',
                nb_ksn: this.__internal__.pinPad.objRead.NB_ksn,
                nb_data: this.__internal__.pinPad.objRead.NB_Data,
              },
              contactless: this.__internal__.pinPad.objRead.ReadCTLS,
            },
            amount: this.__internal__.pinPad.objDataTRX.Amount,
            currency: this.__internal__.pinPad.objDataCheckinBanda.Currency.toUpperCase(),
            usrtransacction: this.__internal__.pinPad.objDataCheckinBanda.UserTRX.toUpperCase(),
            room: this.__internal__.pinPad.objDataCheckinBanda.Tx_Room.toUpperCase(),
            emv: this.__internal__.pinPad.objRead.EMV,
            version: this.__internal__.pinPad.nameApp + this.__internal__.pinPad.versionAPP,
            serie: this.__internal__.pinPad.objDataCheckinBanda.SerieTerminal,
            version_terminal: this.__internal__.pinPad.objDataCheckinBanda.VersionTerminal,
            modelo_terminal: this.__internal__.pinPad.objDataCheckinBanda.ModeloTerminal,
            terminal: {
              printer: this.__internal__.pinPad.objDataCheckinBanda.Printer,
              display: '1',
              is_mobile: '0',
              is_contactless: this.__internal__.pinPad.objDataCheckinBanda.Contactless,
            },
          },
          dcc: {
            dcc_amount: '0',
            dcc_status: '0',
          },
          geolocation: {
            latitude: this.__internal__.pinPad.latitud,
            longitude: this.__internal__.pinPad.longitud,
            ip: this.__internal__.pinPad.ipPublica,
          },
        },
      });
    }
    if (type === 6) {
      return JSON.stringify({
        VMCAMEXMREAUTORIZACION: {
          business: {
            id_company: this.__internal__.pinPad.objDataReautorizacion.IdCompany.toUpperCase(),
            id_branch: this.__internal__.pinPad.objDataReautorizacion.IdBranch.toUpperCase(),
            country: this.__internal__.pinPad.objDataReautorizacion.Country.toUpperCase(),
            user: this.__internal__.pinPad.objDataReautorizacion.User.toUpperCase(),
            pwd: this.__internal__.pinPad.objDataReautorizacion.Pwd.toUpperCase(),
          },
          transacction: {
            amount: this.__internal__.pinPad.objDataReautorizacion.Amount,
            no_operacion: this.__internal__.pinPad.objDataReautorizacion.Tx_OperationNumber,
            usrtransacction: this.__internal__.pinPad.objDataReautorizacion.UserTRX,
            crypto: '2',
            version: this.__internal__.pinPad.nameApp + this.__internal__.pinPad.versionAPP,
          },
          dcc: {
            dcc_amount: '0',
            dcc_status: '0',
          },
          geolocation: {
            latitude: this.__internal__.pinPad.latitud,
            longitude: this.__internal__.pinPad.longitud,
            ip: this.__internal__.pinPad.ipPublica,
          },
        },
      });
    }
    if (type === 7) {
      return JSON.stringify({
        VMCAMEXMCHECKOUTEXPRESS: {
          business: {
            id_company: this.__internal__.pinPad.objDataCheckOut.IdCompany.toUpperCase(),
            id_branch: this.__internal__.pinPad.objDataCheckOut.IdBranch.toUpperCase(),
            country: this.__internal__.pinPad.objDataCheckOut.Country.toUpperCase(),
            user: this.__internal__.pinPad.objDataCheckOut.User.toUpperCase(),
            pwd: this.__internal__.pinPad.objDataCheckOut.Pwd.toUpperCase(),
          },
          transacction: {
            amount: this.__internal__.pinPad.objDataCheckOut.Amount,
            no_operacion: this.__internal__.pinPad.objDataCheckOut.Tx_OperationNumber,
            usrtransacction: this.__internal__.pinPad.objDataCheckOut.UserTRX,
            crypto: '2',
            version: this.__internal__.pinPad.nameApp + this.__internal__.pinPad.versionAPP,
          },
          dcc: {
            dcc_amount: '0',
            dcc_status: '0',
          },
          geolocation: {
            latitude: this.__internal__.pinPad.latitud,
            longitude: this.__internal__.pinPad.longitud,
            ip: this.__internal__.pinPad.ipPublica,
          },
        },
      });
    }
    if (type === 8) {
      return JSON.stringify({
        VMCAMEXMCHECKIN: {
          business: {
            id_company: this.__internal__.pinPad.objDataCheckinMoto.IdCompany.toUpperCase(),
            id_branch: this.__internal__.pinPad.objDataCheckinMoto.IdBranch.toUpperCase(),
            country: this.__internal__.pinPad.objDataCheckinMoto.Country.toUpperCase(),
            user: this.__internal__.pinPad.objDataCheckinMoto.User.toUpperCase(),
            pwd: this1.RC4Encrypt(
              this.__internal__.pinPad.RC4Key,
              this.__internal__.pinPad.objDataCheckinMoto.Pwd.toUpperCase()
            ),
          },
          transacction: {
            merchant: this.__internal__.pinPad.objDataCheckinMoto.Merchant,
            reference: this.__internal__.pinPad.objDataCheckinMoto.Reference.toUpperCase(),
            tp_operation: this.__internal__.pinPad.objDataCheckinMoto.TpOperation,
            creditcard: {
              crypto: '2',
              type: this.__internal__.pinPad.objDataCheckinMoto.Cc_Type,
              name: this.RC4Encrypt(
                this.__internal__.pinPad.RC4Key,
                this.__internal__.pinPad.objDataCheckinMoto.Cc_Name
              ),
              number: this.RC4Encrypt(
                this.__internal__.pinPad.RC4Key,
                this.__internal__.pinPad.objDataCheckinMoto.Cc_Number
              ),
              expmonth: this.RC4Encrypt(
                this.__internal__.pinPad.RC4Key,
                this.__internal__.pinPad.objDataCheckinMoto.Cc_ExpMonth
              ),
              expyear: this.RC4Encrypt(
                this.__internal__.pinPad.RC4Key,
                this.__internal__.pinPad.objDataCheckinMoto.Cc_ExpYear
              ),
              cvv_csc: this.RC4Encrypt(
                this.__internal__.pinPad.RC4Key,
                this.__internal__.pinPad.objDataCheckinMoto.Cc_CvvCsc
              ),
            },
            amount: this.__internal__.pinPad.objDataCheckinMoto.Amount,
            currency: this.__internal__.pinPad.objDataCheckinMoto.Currency.toUpperCase(),
            usrtransacction: this.__internal__.pinPad.objDataCheckinMoto.UserTRX.toUpperCase(),
            room: this.__internal__.pinPad.objDataCheckinMoto.Tx_Room.toUpperCase(),
            version: this.__internal__.pinPad.nameApp + this.__internal__.pinPad.versionAPP,
          },
          dcc: {
            dcc_amount: '0',
            dcc_status: '0',
          },
          geolocation: {
            latitude: this.__internal__.pinPad.latitud,
            longitude: this.__internal__.pinPad.longitud,
            ip: this.__internal__.pinPad.ipPublica,
          },
        },
      });
    }
    if (type === 9) {
      return JSON.stringify({
        accion: 'tipoPagoInfo',
        cc_num: this.__internal__.pinPad.objDataMerchantMOTO.BIN,
        usuario: this.__internal__.pinPad.objDataMerchantMOTO.User.toUpperCase(),
        canal: this.__internal__.pinPad.objDataMerchantMOTO.Tx_OperationType,
        tp_canal: 'B',
        tp_moneda: this.__internal__.pinPad.objDataMerchantMOTO.Currency.toUpperCase(),
      });
    }
    if (type === 10) {
      return JSON.stringify({
        VMCAMEXB: {
          business: {
            country: this.__internal__.pinPad.objDataVentaTkn.Country.toUpperCase(),
            id_branch: this.__internal__.pinPad.objDataVentaTkn.IdBranch.toUpperCase(),
            id_company: this.__internal__.pinPad.objDataVentaTkn.IdCompany.toUpperCase(),
            pwd: this.__internal__.pinPad.objDataVentaTkn.pwd.toUpperCase(),
            user: this.__internal__.pinPad.objDataVentaTkn.User.toUpperCase(),
          },
          dcc: {
            dcc_amount: '0',
            dcc_status: '0',
          },
          transacction: {
            amount: this.__internal__.pinPad.objDataTRX.Amount,
            creditcard: {
              appid: this.__internal__.pinPad.objRead.AppId,
              appidlabel: this.__internal__.pinPad.objRead.AppIdLabel,
              arqc: this.__internal__.pinPad.objRead.Arqc,
              chip: this.__internal__.pinPad.objRead.Chip,
              chipname: this.__internal__.pinPad.objRead.ChipName,
              chipnameenc: this.__internal__.pinPad.objRead.ChipNameEnc,
              contactless: this.__internal__.pinPad.objRead.ReadCTLS,
              crypto: '4',
              dukpt: {
                nb_data: this.__internal__.pinPad.objRead.NB_Data,
                nb_ksn: this.__internal__.pinPad.objRead.NB_ksn,
                tp_dukpt: '1',
              },
              pin: this.__internal__.pinPad.objRead.PIN,
              posentrymode: this.__internal__.pinPad.objRead.POSEM,
              tags: this.__internal__.pinPad.objRead.Tags,
              type: this.__internal__.pinPad.objRead.Type,
            },
            currency: this.__internal__.pinPad.objDataVentaTkn.Currency.toUpperCase(),
            emv: this.__internal__.pinPad.objRead.EMV,
            merchant: this.__internal__.pinPad.objDataVentaTkn.Merchant,
            modelo_terminal: this.__internal__.pinPad.objDataVentaTkn.ModeloTerminal,
            reference: this.__internal__.pinPad.objDataVentaTkn.Reference.toUpperCase(),
            serie: this.__internal__.pinPad.objDataVentaTkn.SerieTerminal,
            terminal: {
              display: '1',
              is_contactless: this.__internal__.pinPad.objDataVentaTkn.Contactless,
              is_mobile: '0',
              printer: this.__internal__.pinPad.objDataVentaTkn.Printer,
            },
            tp_operation: this.__internal__.pinPad.objDataVentaTkn.TpOperation,
            tp_resp: this.__internal__.pinPad.objDataVentaTkn.TpResp,
            usrtransacction: this.__internal__.pinPad.objDataVentaTkn.UserTRX,
            version: this.__internal__.pinPad.nameApp + this.__internal__.pinPad.versionAPP,
            version_terminal: this.__internal__.pinPad.objDataVentaTkn.VersionTerminal,
          },
          geolocation: {
            latitude: this.__internal__.pinPad.latitud,
            longitude: this.__internal__.pinPad.longitud,
            ip: this.__internal__.pinPad.ipPublica,
          },
        },
      });
    }
    if (type === 11) {
      return JSON.stringify({
        TOKENIZATION_TP: {
          business: {
            id_company: this.__internal__.pinPad.objDataVentaTkn?.IdCompanyTkn?.toUpperCase() || null,
            id_branch: this.__internal__.pinPad.objDataVentaTkn?.IdBranchTkn?.toUpperCase() || null,
            user: this.__internal__.pinPad.objDataVentaTkn?.UserTkn?.toUpperCase() || null,
            pwd: this.__internal__.pinPad.objDataVentaTkn?.pwdTkn?.toUpperCase() || null,
          },
          transacction_tkn: {
            version: this.__internal__.pinPad.nameApp + this.__internal__.pinPad.versionAPP,
            serie: this.__internal__.pinPad.objDataVentaTkn.SerieTerminal,
            version_terminal: this.__internal__.pinPad.objDataVentaTkn.VersionTerminal,
            modelo_terminal: this.__internal__.pinPad.objDataVentaTkn.ModeloTerminal,
          },
          dukpt: {
            tp_dukpt: '1',
            nb_ksn: this.__internal__.pinPad.objRead.NB_ksn,
            nb_data: this.__internal__.pinPad.objRead.NB_Data,
          },
          tkn_reference: this.__internal__.pinPad.objDataVentaTkn?.TknReference || null,
          geolocation: {
            latitude: this.__internal__.pinPad.latitud,
            longitude: this.__internal__.pinPad.longitud,
            ip: this.__internal__.pinPad.ipPublica,
          },
        },
      });
    }
    if (type === 12) {
      return JSON.stringify({
        VMCAMEXB: {
          business: {
            country: this.__internal__.pinPad.objDataVenta.Country.toUpperCase(),
            id_branch: this.__internal__.pinPad.objDataVenta.IdBranch.toUpperCase(),
            id_company: this.__internal__.pinPad.objDataVenta.IdCompany.toUpperCase(),
            pwd: this.__internal__.pinPad.objDataVenta.pwd.toUpperCase(),
            user: this.__internal__.pinPad.objDataVenta.User.toUpperCase(),
          },
          dcc: {
            dcc_amount: '0',
            dcc_status: '0',
          },
          transacction: {
            amount: this.__internal__.pinPad.objDataTRX.Amount,
            creditcard: {
              appid: this.__internal__.pinPad.objRead.AppId,
              appidlabel: this.__internal__.pinPad.objRead.AppIdLabel,
              arqc: this.__internal__.pinPad.objRead.Arqc,
              chip: this.__internal__.pinPad.objRead.Chip,
              chipname: this.__internal__.pinPad.objRead.ChipName,
              chipnameenc: this.__internal__.pinPad.objRead.ChipNameEnc,
              contactless: this.__internal__.pinPad.objRead.ReadCTLS,
              crypto: '4',
              dukpt: {
                nb_data: this.__internal__.pinPad.objRead.NB_Data,
                nb_ksn: this.__internal__.pinPad.objRead.NB_ksn,
                tp_dukpt: '1',
              },
              pin: this.__internal__.pinPad.objRead.PIN,
              posentrymode: this.__internal__.pinPad.objRead.POSEM,
              tags: this.__internal__.pinPad.objRead.Tags,
              type: this.__internal__.pinPad.objRead.Type,
            },
            currency: this.__internal__.pinPad.objDataVenta.Currency.toUpperCase(),
            emv: this.__internal__.pinPad.objRead.EMV,
            merchant: this.__internal__.pinPad.objDataVenta.Merchant,
            modelo_terminal: this.__internal__.pinPad.objDataVenta.ModeloTerminal,
            reference: this.__internal__.pinPad.objDataVenta.Reference.toUpperCase(),
            serie: this.__internal__.pinPad.objDataVenta.SerieTerminal,
            terminal: {
              display: '1',
              is_contactless: this.__internal__.pinPad.objDataVenta.Contactless,
              is_mobile: '0',
              printer: this.__internal__.pinPad.objDataVenta.Printer,
            },
            tp_operation: this.__internal__.pinPad.objDataVenta.TpOperation,
            tp_resp: this.__internal__.pinPad.objDataVenta.TpResp,
            usrtransacction: this.__internal__.pinPad.objDataVenta.UserTRX,
            version: this.__internal__.pinPad.nameApp + this.__internal__.pinPad.versionAPP,
            version_terminal: this.__internal__.pinPad.objDataVenta.VersionTerminal,
          },
          geolocation: {
            latitude: this.__internal__.pinPad.latitud,
            longitude: this.__internal__.pinPad.longitud,
            ip: this.__internal__.pinPad.ipPublica,
          },
        },
      });
    }

    return JSON.stringify({});
  }

  isEmptyRSAKey() {
    return this.__internal__.pinPad.keyRSA === null || this.__internal__.pinPad.keyRSA === '';
  }

  async executeWS(url, data) {
    await this.getRSAKeyLocal();

    const aesKey = this.generateKey(32);
    let encryptedKey = this.crypt(this.__internal__.pinPad.keyRSA, aesKey);
    let encryptedData = await this.AESEncrypt(aesKey, data);

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.addEventListener('readystatechange', function () {
        if (this.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 208 || xhr.status === 202) {
            if (this.responseText.includes('Ha ocurrido un error al procesar su solicitud.')) {
              reject(new Error('EE31'));
            } else {
              if (
                this.responseText.includes('Service Temporarily Unavailable') ||
                this.responseText.includes('Internal Server Error')
              ) {
                reject(new Error('EE19'));
              }
              resolve(this.responseText);
            }
          } else {
            reject(new Error('EE19'));
          }
        }
      });
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('cache-control', 'no-cache');
      xhr.setRequestHeader('data', encryptedKey || '');
      xhr.onerror = function () {
        this.__internal__.pinPad.contErrores++;
        reject(new Error('EE19'));
      };
      xhr.send(encryptedData);
    });
  }

  processError(errorCode) {
    switch (errorCode) {
      case 'PPE02':
        return '{ "RESPUESTA": "error", "ERROR": "Importe Incorrecto.", "codError": "PPE02"}';
      case 'PPE03':
        return '{ "RESPUESTA": "error", "ERROR": "No hay respuesta del lector, verifique que se encuentra conectado. ", "codError": "PPE03"}';
      case 'PP18':
        return '{ "RESPUESTA": "error", "ERROR": "Sin comunicación, por favor verifique su reporte.", "codError": "18"}';
      case 'PP24':
        return '{ "RESPUESTA": "error", "ERROR": "Transacción declinada por el PinPad.", "codError": "24"}';
      case 'A01':
        return '{ "RESPUESTA": "error", "ERROR": "Tarjeta Ilegible.", "codError": "01"}';
      case 'A02':
        return '{ "RESPUESTA": "error", "ERROR": "Importe Incorrecto.", "codError": "02"}';
      case 'A03':
        return '{ "RESPUESTA": "error", "ERROR": "No hay respuesta del lector, verifique que se encuentra conectado.", "codError": "03"}';
      case 'A04':
        return '{ "RESPUESTA": "error", "ERROR": "No hay planes de pago para esta tarjeta, por favor cambie la tarjeta.", "codError": "04"}';
      case 'A10':
        return '{ "RESPUESTA": "error", "ERROR": "Operación cancelada.", "codError": "10"}';
      case 'A11':
        return '{ "RESPUESTA": "error", "ERROR": "Proceso cancelado por timeout.", "codError": "11"}';
      case 'A12':
        return '{ "RESPUESTA": "error", "ERROR": "Lectura errónea de banda/chip.", "codError": "12"}';
      case 'A13':
        return '{ "RESPUESTA": "error", "ERROR": "Carga de llave fallida.", "codError": "13"}';
      case 'A14':
        return '{ "RESPUESTA": "error", "ERROR": "Error de lectura de PIN.", "codError": "14"}';
      case 'A15':
        return '{ "RESPUESTA": "error", "ERROR": "Tarjeta Vencida.", "codError": "15"}';
      case 'A16':
        return '{ "RESPUESTA": "error", "ERROR": "Problemas al leer el chip.", "codError": "16"}';
      case 'A17':
        return '{ "RESPUESTA": "error", "ERROR": "Impresora sin Papel.", "codError": "17"}';
      case 'E17':
        return '{ "RESPUESTA": "error", "ERROR": "Impresora sin Papel.", "codError": "17"}';
      case 'A21':
        return '{ "RESPUESTA": "error", "ERROR": "Información no almacenada correctamente.", "codError": "21"}';
      case 'A22':
        return '{ "RESPUESTA": "error", "ERROR": "Tarjeta bloqueada.", "codError": "22"}';
      case 'A23':
        return '{ "RESPUESTA": "error", "ERROR": "Sin llave de cifrado DUKPT.", "codError": "23"}';
      case 'A28':
        return '{ "RESPUESTA": "error", "ERROR": "Fallback no soportado.", "codError": "28"}';
      case 'EE19':
        return '{ "RESPUESTA": "error", "ERROR": "Error de conexión, verifique su reporte.", "codError": "19"}';
      case 'EE21':
        return '{ "RESPUESTA": "error", "ERROR": "Ha ocurrido un error al procesar su solicitud.", "codError": "21"}';
      case 'EE22':
        return '{ "RESPUESTA": "error", "ERROR": "Ha ocurrido un error de conexión al servidor.", "codError": "22"}';
      case 'EE23':
        return '{ "RESPUESTA": "error", "ERROR": "El número de operación no puede ir vacío.", "codError": "23"}';
      case 'EE24':
        return '{ "RESPUESTA": "error", "ERROR": "El número de operación debe ser de 9 dígitos.", "codError": "24"}';
      case 'EE25':
        return '{ "RESPUESTA": "error", "ERROR": "El número de operación debe ser numérico.", "codError": "25"}';
      case 'EE26':
        return '{ "RESPUESTA": "error", "ERROR": "La información enviada al servicio está incompleta.", "codError": "26"}';
      case 'EE27':
        return '{ "RESPUESTA": "error", "ERROR": "La referencia contiene caracteres inválidos o está vacía.", "codError": "27"}';
      case 'EE28':
        return '{ "RESPUESTA": "error", "ERROR": "Número de autorización inválido.", "codError": "28"}';
      case 'EE29':
        return '{ "RESPUESTA": "error", "ERROR": "Importe inválido.", "codError": "29"}';
      case 'EE30':
        return '{ "RESPUESTA": "error", "ERROR": "La información enviada al servicio no es válida.", "codError": "30"}';
      case 'EE31':
        return '{ "respuesta": "error", "ERROR": "No fue posible obtener las afiliaciones.", "codError": "31"}';
      case 'EE32':
        return '{ "respuesta": "error", "ERROR": "Error de conexión, existe una o más transacciones en el servidor , Favor de validar su reporte y en su caso reimprimir el voucher.", "codError": "32"}';
      case 'EE33':
        return '{ "respuesta": "error", "ERROR": "Error de comunicacion con CDP. IL/MTY", "codError": "33"}';
      case 'EE20':
        return '{"reference": "", "response": "error", "foliocpagos": "", "auth": "", "cd_response": "01", "cd_error": "20", "nb_error": "La Referencia contiene caracteres inválidos", "time": "", "date": "", "nb_company": "", "nb_merchant": "", "nb_street": "", "cc_type": "", "tp_operation": "", "cc_name": "", "cc_number": "", "cc_expmonth": "", "cc_expyear": "", "amount": "", "voucher_comercio": "", "voucher_cliente": "", "friendly_response": "", "appid": "", "appidlabel": "", "arqc": ""}';
      case 'EE99':
        return '{ "RESPUESTA": "error", "ERROR": "Error código 99.", "codError": "99"}';
      default:
        return `{ "RESPUESTA": "error", "ERROR": "${errorCode}", "codError": "PPE01"}`;
    }
  }

  async getMerchantMOTO() {
    this.__internal__.pinPad.contErrores = 0;
    this.__internal__.pinPad.contPost = 0;
    this.__internal__.pinPad.contPostVta = 0;
    await this.validateObject(this.__internal__.pinPad.objDataMerchantMOTO);
    const jsonRequest = await this.buildJson('9');
    const wsResponse = await this.executeWS(this.__internal__.pinPad.urlMerchant, jsonRequest);
    if (
      wsResponse === null ||
      wsResponse === '' ||
      wsResponse === '{}' ||
      wsResponse.includes('Ha ocurrido un error al procesar su solicitud.')
    ) {
      throw new Error('EE31');
    }
    this.dispatch('pinPad:merchant-moto', wsResponse);
  }

  async finishCode92() {
    this.__internal__.pinPad.isError92TRX = false;
    if (
      this.__internal__.pinPad.objRead.POSEM === '022' ||
      this.__internal__.pinPad.objRead.POSEM === '800' ||
      this.__internal__.pinPad.objRead.ReadCTLS === '1'
    ) {
      this.dispatch('pinPad:response', this.__internal__.pinPad.dataResponseGlobal);
    } else {
      this.__internal__.pinPad.lineBuffer = '';
      const arr = this.stringToArrayBuffer(this.__internal__.pinPad.C93Global);
      await this.appendToQueue(arr, 'code93');
      // here we need to wait for the response but in this version we are not going to do it here
      // timeout:1400 ~ this.dispatch('pinPad:response', this.__internal__.pinPad.dataResponseGlobal);
    }
  }

  async writeKeysDUKPT(response) {
    const parsedResponse = JSON.parse(response);
    if (parsedResponse.cd_estatus === null) {
      parsedResponse.cd_estatus = '0';
    }

    if (parsedResponse.cd_estatus !== '1') {
      if (this.__internal__.pinPad.isError92TRX) {
        await this.finishCode92();
        return;
      }
      this.dispatch('pinPad:response', this.__internal__.pinPad.respuestaWS);
      return;
    }
    const FS = this.__internal__.pinPad.FS;
    const ETX = this.__internal__.pinPad.ETX;
    const STX = this.__internal__.pinPad.STX;
    const ksn = parsedResponse.nb_ksn;
    const kcv = parsedResponse.nb_kcv || '';
    const ipek = parsedResponse.nb_ipek || '';
    const dukptCommand = 'C92A' + ksn + FS + 'B' + kcv + FS + 'C' + ipek;
    let command = STX + this.calcLength(dukptCommand) + dukptCommand + ETX;
    command = command + this.calcLRC(command);

    const arr = this.stringToArrayBuffer(command);
    await this.appendToQueue(arr, 'dukpt');
    await wait(2200);
    if (this.__internal__.pinPad.isError92TRX) {
      await this.finishCode92();
      return;
    }
    this.dispatch('pinPad:response', this.__internal__.pinPad.respuestaWS);
  }

  async cancelPP() {
    const STX = this.__internal__.pinPad.STX;
    const ETX = this.__internal__.pinPad.ETX;
    let command = 'C55ACANCEL';
    command = STX + this.calcLength(command) + command + ETX;
    command = command + this.calcLRC(command);
    const arr = this.stringToArrayBuffer(command);
    await this.appendToQueue(arr, 'cancel-pp');
  }

  async sendWSData(data, url, type) {
    await this.getRSAKeyLocal();
    type = type.toString();
    const aesKey = this.generateKey(32);
    const encryptedKey = this.crypt(this.__internal__.pinPad.keyRSA, aesKey);
    const encryptedData = await this.AESEncrypt(aesKey, data);
    const this1 = this;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener('readystatechange', async function () {
        if (this.readyState === 4) {
          const responseText = this.responseText;
          if (type === '1') {
            await this1.writeKeysDUKPT(this.responseText);
          }

          if (type === '2') {
            if (
              this.responseText == null ||
              this.responseText === '' ||
              this.responseText === '{}' ||
              this.responseText.includes('Ha ocurrido un error al procesar su solicitud.') ||
              xhr.status === 500 ||
              xhr.status === 503
            ) {
              if (this.responseText.includes('Ha ocurrido un error al procesar su solicitud.')) {
                this.dispatch('pinPad:error', 'EE21');
              }
              await this1.cancelPP();
            }
            const parsedResponse = JSON.parse(this.responseText);
            if (parsedResponse.respuesta == null || parsedResponse.respuesta === '0') {
              let cancelCommandString = 'C55ACANCEL';
              const STX = this1.__internal__.pinPad.STX;
              const ETX = this1.__internal__.pinPad.ETX;
              cancelCommandString = STX + this1.calcLength(cancelCommandString) + cancelCommandString + ETX;
              cancelCommandString = cancelCommandString + this1.calcLRC(cancelCommandString);
              const arr = this.stringToArrayBuffer(cancelCommandString);
              await this.appendToQueue(arr, 'ws-data');
              await wait(700);
              this.dispatch('pinPad:response:send-ws', responseText);
            } else {
              if (this1.__internal__.pinPad.contPost < 1) {
                this.dispatch('pinPad:response', this.responseText);
                this1.__internal__.pinPad.contPost++;
              }
            }
          }
        }
        reject(new Error('EE19'));
      });
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('cache-control', 'no-cache');
      xhr.setRequestHeader('data', encryptedKey || '');
      xhr.onerror = function () {
        if (this1.__internal__.pinPad.contErrores < 1) {
          this.dispatch('pinPad:error', 'EE19');
          this1.__internal__.pinPad.contErrores++;
        }
      };
      xhr.send(encryptedData);
    });
  }

  async getMerchant() {
    this.__internal__.pinPad.contPost = 0;
    if (this.__internal__.pinPad.bin8) {
      this.__internal__.pinPad.objDataMerchant.BIN = this.__internal__.pinPad.bin8;
    }

    const dataMerchant = JSON.stringify({
      accion: 'tipoPagoInfo',
      cc_num: this.__internal__.pinPad.objDataMerchant.BIN,
      usuario: this.__internal__.pinPad.objDataMerchant.User.toUpperCase(),
      canal: this.__internal__.pinPad.canalType,
      tp_canal: '1',
      tp_moneda: this.__internal__.pinPad.objDataMerchant.Currency.toUpperCase(),
    });
    this.__internal__.pinPad.bin8 = '';
    await this.sendWSData(dataMerchant, this.__internal__.pinPad.urlMerchant, '2');
  }

  async aboutPP(callback) {
    const STX = this.__internal__.pinPad.STX;
    const ETX = this.__internal__.pinPad.ETX;
    let command = 'C56AABOUT';
    command = STX + this.calcLength(command) + command + ETX;
    command = command + this.calcLRC(command);
    this.__internal__.pinPad.lineBuffer = '';
    if (isEmpty(this.__internal__.pinPad.datosPinPad)) {
      const arr = this.stringToArrayBuffer(command);
      await this.appendToQueue(arr, 'about');
    }
    await wait(2_500);
    if (isEmpty(this.__internal__.pinPad.lineBuffer)) {
      return;
    }
    let lineBuffer = this.__internal__.pinPad.lineBuffer;
    do {
      lineBuffer = lineBuffer.replace(this.__internal__.pinPad.getNULL, '');
    } while (lineBuffer.indexOf(this.__internal__.pinPad.getNULL) > 0);
    this.__internal__.pinPad.lineBuffer = lineBuffer;

    let marca = lineBuffer.substring(lineBuffer.indexOf('A00') + 3, lineBuffer.indexOf('\x1CB'));
    let versionApp = lineBuffer.substring(lineBuffer.indexOf('\x1CD') + 2, lineBuffer.indexOf('\x1CE'));

    if (marca !== 'undefined' && marca) {
      if (marca.toUpperCase() === 'VERIFONE') {
        const versionNumber = versionApp.replace('MITP_1.00.', '').replace('MITD_1.00.', '').replace('MITD_01.00.', ''),
          versionInt = parseInt(versionNumber);
        if (versionInt >= 15) {
          this.__internal__.pinPad.isCargaCashback = true;
        }
      }
    }
    this.__internal__.pinPad.soportaInyeccionValue = lineBuffer.indexOf('\x1CN') > 0;

    if (lineBuffer.indexOf('\x1CM') > 0) {
      this.__internal__.pinPad.panelSign = lineBuffer.substring(
        lineBuffer.indexOf('\x1CL') + 2,
        lineBuffer.indexOf('\x1CM')
      );

      if (this.__internal__.pinPad.soportaInyeccionValue) {
        this.__internal__.pinPad.contactlessValue = lineBuffer.substring(
          lineBuffer.indexOf('\x1CM') + 2,
          lineBuffer.indexOf('\x1CN')
        );
      } else {
        this.__internal__.pinPad.contactlessValue = lineBuffer.substring(
          lineBuffer.indexOf('\x1CM') + 2,
          lineBuffer.indexOf(ETX)
        );
        this.__internal__.pinPad.TieneCargaCTLS = true;
      }
    } else {
      this.__internal__.pinPad.panelSign = lineBuffer.substring(
        lineBuffer.indexOf('\x1CL') + 2,
        lineBuffer.indexOf(ETX)
      );
      this.__internal__.pinPad.TieneCargaCTLS = false;
    }

    if (isEmpty(lineBuffer)) {
      return;
    }

    this.__internal__.pinPad.banderaDUKPT = lineBuffer.substring(
      lineBuffer.indexOf('\x1CJ') + 2,
      lineBuffer.indexOf('\x1CK')
    );

    this.__internal__.pinPad.respuestaWS = JSON.stringify({
      RESPUESTA: 'ok',
      ERROR: '',
      EMV: lineBuffer.substring(lineBuffer.indexOf('\x1CE') + 2, lineBuffer.indexOf('\x1CF')),
      modelo: lineBuffer.substring(lineBuffer.indexOf('\x1CB') + 2, lineBuffer.indexOf('\x1CC')),
      serie: lineBuffer.substring(lineBuffer.indexOf('\x1CC') + 2, lineBuffer.indexOf('\x1CD')),
      marca: lineBuffer.substring(lineBuffer.indexOf('A00') + 3, lineBuffer.indexOf('\x1CB')),
      versionApp: lineBuffer.substring(lineBuffer.indexOf('\x1CD') + 2, lineBuffer.indexOf('\x1CE')),
      com: '@deprecated',
      impresora: lineBuffer.substring(lineBuffer.indexOf('\x1CF') + 2, lineBuffer.indexOf('\x1CG')),
      soportaFirma: this.__internal__.pinPad.panelSign,
      soportaCTLS: this.__internal__.pinPad.contactlessValue,
      soportaInyeccionEMV: this.__internal__.pinPad.soportaInyeccionValue,
    });
    callback(
      lineBuffer.substring(lineBuffer.indexOf('\x1CJ') + 2, lineBuffer.indexOf('\x1CK')),
      lineBuffer.substring(lineBuffer.indexOf('\x1CK') + 2, lineBuffer.indexOf('\x1CL'))
    );
  }

  getDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().substring(2);
    return day + month + year;
  }

  getHour() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return hours + minutes;
  }

  async injectValuesEMV() {
    const FS = this.__internal__.pinPad.FS;
    const ETX = this.__internal__.pinPad.ETX;
    const STX = this.__internal__.pinPad.STX;

    let data = 'C57A' + this.__internal__.pinPad.qps_Domestic;
    data = data + FS + 'B' + this.__internal__.pinPad.qps_International;
    data = data + FS + 'C' + this.__internal__.pinPad.cvml_VMC_Domestic;
    data = data + FS + 'D' + this.__internal__.pinPad.cvml_VMC_International;
    data = data + FS + 'E' + this.__internal__.pinPad.cvml_Amex;
    data = data + FS + 'F' + this.__internal__.pinPad.translimit_CTLS_VMC;
    data = data + FS + 'G' + this.__internal__.pinPad.translimit_CTLS_Amex;
    let C57 = STX + this.calcLength(data) + data + ETX;
    C57 = C57 + this.calcLRC(C57);
    this.__internal__.pinPad.lineBuffer = '';
    if (isEmpty(this.__internal__.pinPad.datosPinPad)) {
      const arr = this.stringToArrayBuffer(C57);
      await this.appendToQueue(arr, 'inject');
    }
  }

  async initDUKPT(supportsDUKPT, hasDUKPTKeys) {
    if (supportsDUKPT === null) {
      supportsDUKPT = '';
    }
    if (hasDUKPTKeys === null) {
      hasDUKPTKeys = '';
    }
    supportsDUKPT.toString();
    hasDUKPTKeys.toString();
    if (isEmpty(supportsDUKPT) || supportsDUKPT === '0') {
      this.dispatch('pinPad:dukpt-unsupported', this.__internal__.pinPad.respuestaWS);
      return;
    }
    if (isEmpty(hasDUKPTKeys) && hasDUKPTKeys === '1') {
      this.dispatch('pinPad:dukpt-already', this.__internal__.pinPad.respuestaWS);
      return;
    }

    this.__internal__.pinPad.lineBuffer = '';
    const date = this.getDate();
    const time = this.getHour();
    const FS = this.__internal__.pinPad.FS;
    const ETX = this.__internal__.pinPad.ETX;
    const STX = this.__internal__.pinPad.STX;

    let command = 'C91A' + date + FS + 'B' + time;
    command = STX + this.calcLength(command) + command + ETX;
    command = command + this.calcLRC(command);
    const arr = this.stringToArrayBuffer(command);
    await this.appendToQueue(arr, 'init-dukpt');
    await wait(4_000);
    if (this.__internal__.pinPad.isError92TRX) {
      this.__internal__.pinPad.objDataKeys.Country = this.__internal__.pinPad.objDataVenta.Country.toUpperCase();
      this.__internal__.pinPad.objDataKeys.IdBranch = this.__internal__.pinPad.objDataVenta.IdBranch.toUpperCase();
      this.__internal__.pinPad.objDataKeys.IdCompany = this.__internal__.pinPad.objDataVenta.IdCompany.toUpperCase();
      this.__internal__.pinPad.objDataKeys.Pass = this.__internal__.pinPad.objDataVenta.pwd.toUpperCase();
      this.__internal__.pinPad.objDataKeys.Usuario = this.__internal__.pinPad.objDataVenta.User.toUpperCase();
    }
    this.__internal__.pinPad.lineBuffer = this.__internal__.pinPad.lineBuffer.replace(
      '\x02010P93A00\x1CB01\x03t\x02036P81AACERQUE, INSERTE CHIP O  DESLICE\x03*',
      ''
    );

    const request = JSON.stringify({
      IPEK_REQUESTType: {
        business: {
          country: this.__internal__.pinPad.objDataKeys.Country.toUpperCase(),
          id_branch: this.__internal__.pinPad.objDataKeys.IdBranch.toUpperCase(),
          id_company: this.__internal__.pinPad.objDataKeys.IdCompany.toUpperCase(),
          pwd: this.__internal__.pinPad.objDataKeys.Pass.toUpperCase(),
          user: this.__internal__.pinPad.objDataKeys.Usuario.toUpperCase(),
        },
        terminal: {
          nb_kcv: this.__internal__.pinPad.lineBuffer.substring(
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CE') + 2,
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CF')
          ),
          nb_marca_terminal: this.__internal__.pinPad.lineBuffer.substring(
            this.__internal__.pinPad.lineBuffer.indexOf('P91A') + 4,
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CB')
          ),
          nb_modelo_terminal: this.__internal__.pinPad.lineBuffer.substring(
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CB') + 2,
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CC')
          ),
          nb_serie_lector: this.__internal__.pinPad.lineBuffer.substring(
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CC') + 2,
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CD')
          ),
          nb_tk: this.__internal__.pinPad.lineBuffer.substring(
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CF') + 2,
            this.__internal__.pinPad.lineBuffer.length - 2
          ),
          nb_version_terminal: this.__internal__.pinPad.lineBuffer.substring(
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CD') + 2,
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CE')
          ),
        },
      },
    });
    await this.sendWSData(request, this.__internal__.pinPad.urlKeysDUKPT, '1');
  }

  async getKeyRSA() {
    const key = await this.getRSAKey();
    if (!key) {
      return null;
    }
    this.__internal__.pinPad.respuestaWS = '{ "RESPUESTA": "ok", "ERROR": ""}';
    const this1 = this;
    await this.aboutPP(async function callback(param1, param2) {
      if (this1.__internal__.pinPad.soportaInyeccionValue) {
        if (this1.__internal__.pinPad.datosEMV) {
          await this1.injectValuesEMV();
        }
      }
      await wait(1_500);
      await this.initDUKPT(param1, param2);
    });
  }

  validateString(input) {
    if (input === undefined || input === null || input === '' || input.includes('<html>')) {
      return input;
    }
    input = input.replace(/aaa/g, 'á');
    input = input.replace(/eee/g, 'é');
    input = input.replace(/iii/g, 'í');
    input = input.replace(/ooo/g, 'ó');
    input = input.replace(/uuu/g, 'ú');
    input = input.replace(/NNN/g, 'Ñ');
    input = input.replace(/nnn/g, 'ñ');
    input = input.replace(/Ã¡/g, 'á');

    return input;
  }

  processJson(jsonString) {
    const parsedJson = JSON.parse(jsonString);
    if (parsedJson == null) {
      return '{ "RESPUESTA": "error", "ERROR": "Datos vacíos"}';
    }
    if (parsedJson.RESPUESTA === 'error') {
      return jsonString;
    }
    if (this.__internal__.pinPad.tipoServicio !== 'login') {
      return jsonString;
    }
    let response;

    let merchantCurrencyB = '',
      merchantCurrencyM = '';
    if (
      parsedJson.xml?.ventaspropias?.merchant_currencyb !== null &&
      parsedJson.xml?.ventaspropias?.merchant_currencyb !== undefined
    ) {
      merchantCurrencyB = parsedJson.xml.ventaspropias.merchant_currencyb;
    }
    if (
      parsedJson.xml?.ventaspropias?.merchant_currencym !== null &&
      parsedJson.xml?.ventaspropias?.merchant_currencym !== undefined
    ) {
      merchantCurrencyM = parsedJson.xml.ventaspropias.merchant_currencym;
    }
    let emvReverso = parsedJson.xml?.emvReverso;
    if (emvReverso === null || emvReverso === undefined || emvReverso === '') {
      emvReverso = '0';
    }
    this.__internal__.pinPad.stTokenization = parsedJson.xml?.st_tokenizacion;

    if (
      this.__internal__.pinPad.stTokenization == null ||
      this.__internal__.pinPad.stTokenization === '' ||
      this.__internal__.pinPad.stTokenization === undefined ||
      this.__internal__.pinPad.stTokenization === '0'
    ) {
      this.__internal__.pinPad.stTokenization = false;
    } else if (this.__internal__.pinPad.stTokenization === '1') {
      this.__internal__.pinPad.stTokenization = true;
    }
    this.__internal__.pinPad.datosEMV = parsedJson.xml.importesPGS;
    this.__internal__.pinPad.qps_Domestic = this.__internal__.pinPad.datosEMV.qps_dom;
    this.__internal__.pinPad.qps_International = this.__internal__.pinPad.datosEMV.qps_il;
    this.__internal__.pinPad.cvml_VMC_Domestic = this.__internal__.pinPad.datosEMV.cvml_vm_dom;
    this.__internal__.pinPad.cvml_VMC_International = this.__internal__.pinPad.datosEMV.cvml_vm_il;
    this.__internal__.pinPad.cvml_Amex = this.__internal__.pinPad.datosEMV.cvml_amex;
    this.__internal__.pinPad.translimit_CTLS_VMC = this.__internal__.pinPad.datosEMV.tl_mc;
    this.__internal__.pinPad.translimit_CTLS_Amex = this.__internal__.pinPad.datosEMV.tl_amex;
    response = JSON.stringify({
      RESPUESTA: 'ok',
      bs_user: parsedJson.user,
      nb_user: parsedJson.nb_user,
      bs_company: parsedJson.id_company,
      nb_company: parsedJson.nb_company,
      nb_streetcompany: parsedJson.nb_companystreet,
      bs_branch: parsedJson.id_branch,
      nb_branch: parsedJson.nb_branch,
      bs_country: parsedJson.country,
      monedas: merchantCurrencyB,
      monedasMOTO: merchantCurrencyM,
      ExecuteReverse: emvReverso,
    });

    return response;
  }

  async getPosition() {
    if (!supportGeolocation()) {
      this.__internal__.pinPad.latitud = null;
      this.__internal__.pinPad.longitud = null;
      return;
    }
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.__internal__.pinPad.latitud = position.coords.latitude;
          this.__internal__.pinPad.longitud = position.coords.longitude;
          resolve({
            latitud: position.coords.latitude,
            longitud: position.coords.longitude,
          });
        },
        () => {
          this.__internal__.pinPad.latitud = null;
          this.__internal__.pinPad.longitud = null;
          resolve({
            latitud: null,
            longitud: null,
          });
        },
        { enableHighAccuracy: false }
      );
    });
  }

  async getPublicIp() {
    const this1 = this;
    return new Promise((resolve) => {
      fetch('https://api.ipify.org?format=json')
        .then((response) => response.json())
        .then((data) => {
          this1.__internal__.pinPad.ipPublica = data.ip;
          resolve(this1.__internal__.pinPad.ipPublica);
        })
        .catch(() => {
          this1.__internal__.pinPad.ipPublica = null;
          resolve(this1.__internal__.pinPad.ipPublica);
        });
    });
  }

  async sendWS(data, url) {
    await this.getRSAKeyLocal();
    await wait(100);
    if (this.isEmptyRSAKey()) {
      this.__internal__.pinPad.respuestaWS = '{ "RESPUESTA": "error", "ERROR": "Error código 99"}';
      this.dispatch('pinPad:send-ws', this.__internal__.pinPad.respuestaWS);
      return;
    }
    const aesKey = this.generateKey(32);
    const encryptedKey = this.crypt(this.__internal__.pinPad.keyRSA, aesKey);
    const encryptedData = await this.AESEncrypt(aesKey, data);
    const this1 = this;
    return new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const validatedResponse = this1.validateString(xhr.responseText);
            this1.__internal__.pinPad.respuestaWS = this1.processJson(validatedResponse);
            this1.getPosition().then(() => {});
            this1.getPublicIp().then(() => {});
          } else {
            this1.__internal__.pinPad.respuestaWS = '{ "RESPUESTA": "error", "ERROR": "Verifique su conexión"}';
          }
          this.dispatch('pinPad:send-ws', this1.__internal__.pinPad.respuestaWS);
          resolve(this1.__internal__.pinPad.respuestaWS);
        }
      };
      xhr.open('POST', url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('cache-control', 'no-cache, must-revalidate, post-check=0, pre-check=0');
      xhr.setRequestHeader('cache-control', 'max-age=0');
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
      xhr.setRequestHeader('data', encryptedKey || '');
      xhr.onerror = function () {
        this1.__internal__.pinPad.respuestaWS = '{ "RESPUESTA": "error", "ERROR": "Verifique su conexión"}';
        this1.__internal__.pinPad.contErrores++;
      };
      xhr.send(encryptedData);
    });
  }

  async loginUser() {
    const this1 = this;
    const loginData = JSON.stringify({
      usuario: this1.__internal__.pinPad.objDataLogin.Usuario.toUpperCase(),
      password: this1.__internal__.pinPad.objDataLogin.Pass.toUpperCase(),
      crypto: '',
      version: this1.__internal__.pinPad.versionAPP,
      serieLector: '',
      canal: this1.__internal__.pinPad.canalAPP,
    });
    await this.sendWS(loginData, this.__internal__.pinPad.urlLogin);
  }

  clear() {
    this.__internal__.pinPad.objDataVentaTemp.AppId = '';
    this.__internal__.pinPad.objDataVentaTemp.AppIdLabel = '';
    this.__internal__.pinPad.objDataVentaTemp.Arqc = '';
    this.__internal__.pinPad.objDataVentaTemp.ChipName = '';
    this.__internal__.pinPad.objDataVentaTemp.ReadCTLS = '';
    this.__internal__.pinPad.objDataVentaTemp.NB_Data = '';
    this.__internal__.pinPad.objDataVentaTemp.NB_ksn = '';
    this.__internal__.pinPad.objDataVentaTemp.PIN = '';
    this.__internal__.pinPad.objDataVentaTemp.POSEM = '';
    this.__internal__.pinPad.objDataVentaTemp.Tags = '';
    this.__internal__.pinPad.objDataVentaTemp.Type = '';
    this.__internal__.pinPad.objDataVentaTemp.Chip = '';
    this.__internal__.pinPad.objDataVentaTemp.ChipNameEnc = '';
    this.__internal__.pinPad.err = '';
    this.__internal__.pinPad.dataResponseGlobal = '';
    this.__internal__.pinPad.C93Global = '';
    this.__internal__.pinPad.OperationNumberReverse = '';
    this.__internal__.pinPad.AuthNumberReverse = '';
    this.__internal__.pinPad.TokenizarTRX = false;
  }

  async readCard() {
    this.__internal__.pinPad.contErrores = 0;
    this.__internal__.pinPad.contReadOK = 0;

    let message = 'ACERQUE, INSERTE CHIP O  DESLICE TARJETA';
    if (
      this.__internal__.pinPad.objDataTRX.SoportaCTLS == null ||
      this.__internal__.pinPad.objDataTRX.SoportaCTLS === '0'
    ) {
      message = 'INSERTE CHIP O  DESLICE TARJETA';
    }
    if (this.__internal__.pinPad.objDataTRX.ModeloTerminal.toUpperCase().includes('UX300')) {
      message = 'ACERQUE O INSERTE TARJETA';
    }
    if (isEmpty(this.__internal__.pinPad.objDataTRX.Amount)) {
      this.dispatch('pinPad:error', 'PPE02');
      return;
    }

    const FS = this.__internal__.pinPad.FS;
    const STX = this.__internal__.pinPad.STX;
    const ETX = this.__internal__.pinPad.ETX;

    let command = 'C93A' + message;
    command = command + FS + 'B' + this.getDate();
    command = command + FS + 'C' + this.getHour();
    command = command + FS + 'D' + this.formatNumber(this.__internal__.pinPad.objDataTRX.Amount, 2);
    command = command + FS + 'E0.00';
    command = command + FS + 'F' + this.__internal__.pinPad.objDataTRX.CurrencyCode;
    if (this.__internal__.pinPad.banderaDUKPT === '1') {
      if (this.__internal__.pinPad.TieneCargaCTLS) {
        command = command + FS + 'G' + this.__internal__.pinPad.objDataTRX.TimeOutPinPad;
        command = command + FS + 'HTAGS';
        command = command + FS + 'I' + this.__internal__.pinPad.getCVVAmex;
        command = command + FS + 'J' + this.__internal__.pinPad.ForceOnline;
        command = command + FS + 'K' + this.__internal__.pinPad.objDataTRX.SoportaCTLS;
        command = command + FS + 'L' + this.__internal__.pinPad.EMVCard;
        if (this.__internal__.pinPad.isCargaCashback) {
          command = command + FS + 'M0';
          command = command + FS + 'N00';
        }
      } else {
        command = command + FS + 'G' + this.__internal__.pinPad.objDataTRX.TimeOutPinPad;
        command = command + FS + 'HTAGS';
        command = command + FS + 'I' + this.__internal__.pinPad.getCVVAmex;
        command = command + FS + 'L' + this.__internal__.pinPad.EMVCard;
      }

      if (this.__internal__.pinPad.soportaInyeccionValue) {
        command = command + FS + 'O' + this.__internal__.pinPad.ValidarQPS;
      }
    }
    command = STX + this.calcLength(command) + command + ETX;
    command = command + this.calcLRC(command);

    if (this.validateAmount(this.__internal__.pinPad.objDataTRX.Amount) === false) {
      this.dispatch('pinPad:error', 'PPE02');
      return;
    }
    if (this.formatNumber(this.__internal__.pinPad.objDataTRX.Amount, 2) <= 0) {
      this.dispatch('pinPad:error', 'PPE02');
      return;
    }
    const arr = this.stringToArrayBuffer(command);
    await this.appendToQueue(arr, 'read-card');
  }

  formatAmount(amount, decimals = 0) {
    amount = parseFloat(amount.toString().replace(/[^0-9.-]/g, ''));
    if (isNaN(amount) || amount === 0) {
      return parseFloat((0).toString()).toFixed(decimals);
    }
    amount = amount.toFixed(decimals);
    let parts = amount.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '');
    return parts.join('.');
  }

  async delay(seconds) {
    return await wait(seconds * 1000);
  }

  verifyVoucher(voucher) {
    voucher = voucher.replace(/@cnb/g, '');
    voucher = voucher.replace(/@cnn/g, '');
    voucher = voucher.replace(/@br/g, '');
    voucher = voucher.replace(/@lnn/g, '');
    voucher = voucher.replace('@cnb logo_cpagos', '');
    voucher = voucher.replace('@cnn ver_app', '');

    return voucher;
  }

  async codeError92(dataResponse, C93) {
    this.__internal__.pinPad.dataResponseGlobal = dataResponse;
    this.__internal__.pinPad.C93Global = C93;
    this.__internal__.pinPad.isError92TRX = true;
    await this.initDUKPT(1, 0);
  }

  async validateReferenceWithBlank(reference) {
    if (isEmpty(reference)) {
      return true;
    }
    const isValid = /^[A-Z-a-z0-9\s]+$/g.test(reference) === true;
    if (!isValid) {
      throw new Error('EE27');
    }
    return isValid;
  }

  consult() {
    this.__internal__.pinPad.contErrores = 0;
    let reference = this.__internal__.pinPad.objDataConsulta.Reference.trim();
    if (isEmpty(reference)) {
      reference = '--';
      this.__internal__.pinPad.objDataConsulta.Reference = reference;
    }
    const this1 = this;

    this.validateObject(this.__internal__.pinPad.objDataConsulta)
      .then(async function () {
        this1.__internal__.pinPad.objDataConsulta.Reference = reference;
        return await this1.validateReferenceWithBlank(this1.__internal__.pinPad.objDataConsulta.Reference);
      })
      .then(async function () {
        return await this1.buildJson('2');
      })
      .then(function (jsonRequest) {
        return this1.executeWS(this1.__internal__.pinPad.urlSndConsulta, jsonRequest);
      })
      .then(function (wsResponse) {
        this.dispatch('pinPad:consult', wsResponse);
      })
      .catch(function (error) {
        if (this.__internal__.pinPad.contErrores < 1) {
          this.dispatch('pinPad:error', error.message);
          this.__internal__.pinPad.contErrores++;
        }
      });
  }

  processingEMV() {
    const ETX = this.__internal__.pinPad.ETX;

    let expiryDate, maskPan, name, year, month;

    if (this.__internal__.pinPad.objDataTRX.MarcaTerminal.toLowerCase() === 'verifone') {
      this.__internal__.pinPad.lineBuffer = this.__internal__.pinPad.lineBuffer
        .replace('\x02006P93A00\x03.', '')
        .replace('\x02009P93A00\x1C', '')
        .replace('\x02010P93A00\x1CB01\x03v', '');
    } else {
      this.__internal__.pinPad.lineBuffer = this.__internal__.pinPad.lineBuffer.replace('\x02006P93A00\x03,', '');
    }

    this.__internal__.pinPad.objRead.POSEM = this.__internal__.pinPad.lineBuffer.substring(
      this.__internal__.pinPad.lineBuffer.indexOf('P93A') + 4,
      this.__internal__.pinPad.lineBuffer.indexOf('\x1CB')
    );
    if (this.__internal__.pinPad.objRead.POSEM === '051' || this.__internal__.pinPad.objRead.POSEM === '071') {
      this.__internal__.pinPad.objRead.Chip = '1';
      this.__internal__.pinPad.objRead.PIN = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CC') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CD')
      );
      this.__internal__.pinPad.objRead.AppId = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CG') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CH')
      );
      this.__internal__.pinPad.objRead.AppIdLabel = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CH') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CI')
      );
      this.__internal__.pinPad.objRead.Arqc = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CF') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CG')
      );
      if (this.__internal__.pinPad.lineBuffer.includes('\x1CO')) {
        const subLine = this.__internal__.pinPad.lineBuffer.substring(
          this.__internal__.pinPad.lineBuffer.indexOf('P93A')
        );
        this.__internal__.pinPad.objRead.ReadCTLS = subLine.substring(
          subLine.indexOf('\x1CM') + 2,
          subLine.indexOf('\x1CN')
        );
        this.__internal__.pinPad.QPS_validado =
          subLine.substring(subLine.indexOf('\x1CN') + 2, subLine.indexOf('\x1CO')) === '1';
        this.__internal__.pinPad.bin8 = subLine.substring(subLine.indexOf('\x1CO') + 2, subLine.indexOf(ETX));
      } else {
        if (this.__internal__.pinPad.lineBuffer.includes('\x1CN')) {
          const subLine = this.__internal__.pinPad.lineBuffer.substring(
            this.__internal__.pinPad.lineBuffer.indexOf('P93A')
          );
          this.__internal__.pinPad.objRead.ReadCTLS = subLine.substring(
            subLine.indexOf('\x1CM') + 2,
            subLine.indexOf('\x1CN')
          );
          this.__internal__.pinPad.QPS_validado =
            subLine.substring(subLine.indexOf('\x1CN') + 2, subLine.indexOf(ETX)) === '1';
        } else {
          const subLine = this.__internal__.pinPad.lineBuffer.substring(
            this.__internal__.pinPad.lineBuffer.indexOf('P93A'),
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CM') + 5
          );
          this.__internal__.pinPad.objRead.ReadCTLS = subLine.substring(
            subLine.indexOf('\x1CM') + 2,
            subLine.indexOf(ETX)
          );
          this.__internal__.pinPad.QPS_validado = false;
        }
      }
      this.__internal__.pinPad.objRead.Tags = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CB') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CC')
      );
      this.__internal__.pinPad.objRead.NB_ksn = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CK') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CM')
      );
      this.__internal__.pinPad.objRead.NB_Data = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CD') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CE')
      );
      maskPan = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CI') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CJ')
      );
      name = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CE') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CF')
      );
      this.__internal__.pinPad.objRead.ChipName = name;
      expiryDate = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CJ') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CK')
      );
    } else {
      let ksn;
      this.__internal__.pinPad.objRead.Chip = '0';
      this.__internal__.pinPad.objRead.PIN = '';
      this.__internal__.pinPad.objRead.AppId = '';
      this.__internal__.pinPad.objRead.Arqc = '';
      this.__internal__.pinPad.objRead.ReadCTLS = '0';
      this.__internal__.pinPad.objRead.AppIdLabel = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CH') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CI')
      );
      this.__internal__.pinPad.objRead.Tags = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CB') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CC')
      );
      if (this.__internal__.pinPad.objRead.POSEM === '022') {
        if (this.__internal__.pinPad.lineBuffer.includes('\x1CO')) {
          const subLine = this.__internal__.pinPad.lineBuffer.substring(
            this.__internal__.pinPad.lineBuffer.indexOf('P93A')
          );
          this.__internal__.pinPad.bin8 = subLine.substring(subLine.indexOf('\x1CO') + 2, subLine.indexOf(ETX));
          ksn = this.__internal__.pinPad.lineBuffer.substring(
            this.__internal__.pinPad.lineBuffer.indexOf('P93A022'),
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CI') + 23
          );
          ksn = ksn.substring(ksn.indexOf('\x1CI') + 2, ksn.lastIndexOf('\x1C'));
        } else {
          ksn = this.__internal__.pinPad.lineBuffer.substring(
            this.__internal__.pinPad.lineBuffer.indexOf('P93A022'),
            this.__internal__.pinPad.lineBuffer.indexOf('\x1CI') + 23
          );
          ksn = ksn.substring(ksn.indexOf('\x1CI') + 2, ksn.indexOf(ETX));
        }
      } else {
        ksn = this.__internal__.pinPad.lineBuffer.substring(
          this.__internal__.pinPad.lineBuffer.indexOf('P93A800'),
          this.__internal__.pinPad.lineBuffer.indexOf('\x1CI') + 23
        );
        ksn = ksn.substring(ksn.indexOf('\x1CI') + 2, ksn.indexOf(ETX));
      }
      this.__internal__.pinPad.objRead.NB_ksn = ksn;
      this.__internal__.pinPad.objRead.NB_Data = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CB') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CC')
      );
      maskPan = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CF') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CG')
      );
      expiryDate = this.__internal__.pinPad.lineBuffer.substring(
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CG') + 2,
        this.__internal__.pinPad.lineBuffer.indexOf('\x1CH')
      );
      if (this.__internal__.pinPad.objDataTRX.ModeloTerminal.toLowerCase() === 'vx520') {
        name = this.__internal__.pinPad.lineBuffer.substring(
          this.__internal__.pinPad.lineBuffer.indexOf('\x1CH') + 2,
          this.__internal__.pinPad.lineBuffer.indexOf('\x1CI')
        );
        this.__internal__.pinPad.objRead.ChipName = name;
      } else {
        name = this.__internal__.pinPad.lineBuffer.substring(
          this.__internal__.pinPad.lineBuffer.indexOf('\x1CH') + 2,
          this.__internal__.pinPad.lineBuffer.indexOf('\x1CI')
        );
        this.__internal__.pinPad.objRead.ChipName = name;
      }
    }
    if (expiryDate.includes('/')) {
      expiryDate = expiryDate.replace('/', '');
    }
    if (expiryDate.toString().length === 4) {
      month = expiryDate.toString().substring(0, 2);
      year = expiryDate.toString().substring(2);
    } else {
      month = '';
      year = '';
    }
    if (this.__internal__.pinPad.objRead.Chip === '1') {
      this.__internal__.pinPad.objRead.EMV = '3';
      this.__internal__.pinPad.objRead.ChipNameEnc = '1';
    } else {
      this.__internal__.pinPad.objRead.ChipNameEnc = '';
      this.__internal__.pinPad.objRead.EMV = '2';
    }

    if (
      this.__internal__.pinPad.objRead.AppIdLabel.toLowerCase().includes('american') ||
      this.__internal__.pinPad.objRead.AppIdLabel.toLowerCase().includes('amex')
    ) {
      this.__internal__.pinPad.objRead.Type = 'AMEX';
    } else {
      this.__internal__.pinPad.objRead.Type = 'V/MC';
    }
    const response = JSON.stringify({
      RESPUESTA: 'ok',
      ERROR: '',
      maskPan: maskPan,
      name: name,
      month: month,
      year: year,
    });
    if (this.__internal__.pinPad.contReadOK < 1) {
      this.__internal__.pinPad.contReadOK++;
      this.dispatch('pinPad:processing-emv', response);
    }
  }

  async validateSecondGenerate(command) {
    const this1 = this;
    return new Promise(function (resolve, reject) {
      try {
        if (
          this1.__internal__.pinPad.objRead.POSEM === '022' ||
          this1.__internal__.pinPad.objRead.POSEM === '800' ||
          this1.__internal__.pinPad.objRead.ReadCTLS === '1'
        ) {
          setTimeout(function () {
            resolve(false);
          }, 100);
        } else {
          const arr = this1.stringToArrayBuffer(command);
          this1.appendToQueue(arr, 'second-generate').then(() => {});
          setTimeout(function () {
            resolve('Second generate OK--> ' + this1.__internal__.pinPad.lineBuffer);
          }, 3000);
        }
      } catch (error) {
        this.dispatch('pinPad:error', 'PPE03');
        reject('PPE03');
      }
    });
  }

  finishEMV(response) {
    const FS = this.__internal__.pinPad.FS;
    const STX = this.__internal__.pinPad.STX;
    const ETX = this.__internal__.pinPad.ETX;

    const parsedResponse = JSON.parse(response);
    let errorCode = parsedResponse.cd_error;
    let dataRspToken = '';
    let command = 'C93A' + this.__internal__.pinPad.objFinishEMV.A;
    command = command + FS + 'B' + this.__internal__.pinPad.objFinishEMV.B;
    command = command + FS + 'C' + this.__internal__.pinPad.objFinishEMV.C;
    command = command + FS + 'D' + this.__internal__.pinPad.objFinishEMV.D;
    command = command + FS + 'E' + this.__internal__.pinPad.objFinishEMV.E;
    command = command + FS + 'F' + this.__internal__.pinPad.objFinishEMV.F;
    command = command + FS + 'G' + this.__internal__.pinPad.objFinishEMV.G;
    command = command + FS + 'H' + this.__internal__.pinPad.objFinishEMV.H;
    command = command + FS + 'I' + this.__internal__.pinPad.objFinishEMV.I;
    command = command + FS + 'J' + this.__internal__.pinPad.objFinishEMV.J;
    command = command + FS + 'K' + this.__internal__.pinPad.objFinishEMV.K;
    command = STX + this.calcLength(command) + command + ETX;
    command = command + this.calcLRC(command);
    const this1 = this;
    if (
      (this.__internal__.pinPad.objRead.POSEM === '022' ||
        this.__internal__.pinPad.objRead.POSEM === '800' ||
        this.__internal__.pinPad.objRead.ReadCTLS === '1') &&
      this.__internal__.pinPad.FuncionToken === false
    ) {
      this.dispatch('pinPad:finish-emv', response);
      return;
    } else {
      if (this.__internal__.pinPad.lineBuffer.includes('\x02020P81ATARJETA RETIRADA\x03J\x02006E93A10\x038')) {
        // const cardRemoved = true;
      }
      this.__internal__.pinPad.lineBuffer = '';
      this.validateSecondGenerate(command)
        .then(async function (/*validatedResponse*/) {
          // let pinpadResponse = validatedResponse.replace("\x02023P81AFAVOR RETIRAR TARJ.\x03\x0E", "");
          // pinpadResponse = pinpadResponse.replace("\x02020P81A DECLINADA EMV  \x03", "",);
          // pinpadResponse = pinpadResponse.replace("\x02020P81A DECLINADA EMV  \x03", "",);
          // pinpadResponse = pinpadResponse.substring(pinpadResponse.indexOf("\x1CB") + 2, pinpadResponse.indexOf(ETX));
          // if (pinpadResponse.includes("006E93A16")) {
          //     pinpadResponse = "01";
          // }
          if (
            this1.__internal__.pinPad.responseTRX === 'approved' &&
            this1.__internal__.pinPad.objDataVenta.Reverse === '1'
          ) {
            this1.__internal__.pinPad.aplicaReverso = true;
            return await this1.buildJson('4');
          }
          this1.__internal__.pinPad.aplicaReverso = false;
          await wait(200);
          return 'ok';
        })
        .then(async function (jsonRequest) {
          if (this1.__internal__.pinPad.aplicaReverso) {
            return await this1.executeWS(this1.__internal__.pinPad.urlReverso, jsonRequest);
          }
          await wait(200);
          return 'ok';
        })
        .then(function (waResponse) {
          if (this1.__internal__.pinPad.aplicaReverso) {
            const parsedWsResponse = JSON.parse(waResponse);
            let errorResponse;
            if (parsedWsResponse.response === 'approved') {
              errorResponse = this1.processError('PP24');
            } else {
              errorResponse = this1.processError('PP18');
            }
            if (this1.__internal__.pinPad.contPostVta < 1) {
              this1.dispatch('pinPad:finish-emv', errorResponse);
              this1.__internal__.pinPad.contPostVta++;
            }
          } else {
            let dataTempSlice = '';
            let errorTkn = '';
            if (this.__internal__.pinPad.FuncionToken) {
              console.log('Entro al flujo para tokenizar la tarjeta');
              if (this1.__internal__.pinPad.responseTRX === 'approved') {
                if (this1.__internal__.pinPad.stTokenization === true) {
                  if (this1.__internal__.pinPad.TokenizarTRX === true) {
                    if (this1.__internal__.pinPad.tokenRespOriginal !== null) {
                      let tokenSuccess =
                          ',"tokenization": { "tknresponse": "success", "codeResponse": "00", "errorMessage": "", "token": "' +
                          this1.__internal__.pinPad.tokenRespOriginal +
                          '"}}',
                        dataTempSlice = response.slice(0, -1);
                      dataRspToken = dataTempSlice.concat(tokenSuccess);

                      if (this1.__internal__.pinPad.contPostVta < 1) {
                        this.dispatch('pinPad:finish-emv', dataRspToken);
                        this1.__internal__.pinPad.contPostVta++;
                      }
                    } else {
                      let tokenError =
                          ',"tokenization": { "tknresponse": "error", "codeResponse": "TKN003", "errorMessage": "Error al obtener el token de la respuesta de pagos, Validar la configuracion Empresa/Sucursal", "token": ""}}',
                        dataTempSlice = response.slice(0, -1);
                      dataRspToken = dataTempSlice.concat(tokenError);
                      if (this1.__internal__.pinPad.contPostVta < 1) {
                        this1.dispatch('pinPad:finish-emv', dataRspToken);
                        this1.__internal__.pinPad.contPostVta++;
                      }
                    }
                  } else {
                    let tokenError =
                      ',"tokenization": { "tknresponse": "error", "codeResponse": "TKN002", "errorMessage": "No se solicitó generar el Token", "token": "" }}';
                    dataTempSlice = response.slice(0, -1);
                    dataRspToken = dataTempSlice.concat(tokenError);
                    if (this1.__internal__.pinPad.contPostVta < 1) {
                      this1.dispatch('pinPad:finish-emv', dataRspToken);
                      this1.__internal__.pinPad.contPostVta++;
                    }
                  }
                } else {
                  errorTkn =
                    ',"tokenization": { "tknresponse": "error", "codeResponse": "TKN001", "errorMessage": "Permisos insuficientes para generar Token", "token": "" }}';
                  dataTempSlice = response.slice(0, -1);
                  dataRspToken = dataTempSlice.concat(errorTkn);
                  if (this1.__internal__.pinPad.contPostVta < 1) {
                    this1.dispatch('pinPad:finish-emv', dataRspToken);
                    this1.__internal__.pinPad.contPostVta++;
                  }
                }
              } else {
                errorTkn =
                  ',"tokenization": { "tknresponse": "error", "codeResponse": "TKN010", "errorMessage": "Solo se tokenizan las transacciones aprobadas", "token": "" }}';
                dataTempSlice = response.slice(0, -1);
                dataRspToken = dataTempSlice.concat(errorTkn);
                if (this1.__internal__.pinPad.contPostVta < 1) {
                  this1.dispatch('pinPad:finish-emv', dataRspToken);
                  this1.__internal__.pinPad.contPostVta++;
                }
              }
            } else {
              if (this1.__internal__.pinPad.contPostVta < 1) {
                this1.dispatch('pinPad:finish-emv', response);
                this1.__internal__.pinPad.contPostVta++;
              }
            }
          }
        })
        .catch(function (error) {
          if (this1.__internal__.pinPad.contErrores < 1) {
            this.dispatch('pinPad:error', this1.processError(error));
            this1.__internal__.pinPad.contErrores++;
          }
        });
    }
    if (errorCode === '92') {
      setTimeout(async () => {
        await this1.codeError92(response, command);
      }, 5000);
    }
  }

  rePrint() {
    this.__internal__.pinPad.contErrores = 0;
    const this1 = this;
    this.validateOperationNumber(this.__internal__.pinPad.objDataReimpresion.Tx_OperationNumber)
      .then(async function () {
        return await this1.validateObject(this.__internal__.pinPad.objDataReimpresion);
      })
      .then(async function () {
        return await this1.buildJson('1');
      })
      .then(async function (jsonRequest) {
        return await this1.executeWS(this.__internal__.pinPad.urlSndReimpresion, jsonRequest);
      })
      .then(function (wsResponse) {
        const parsedResponse = JSON.parse(wsResponse || '{}');
        let voucher = parsedResponse.voucher_comercio;

        if (voucher === '' || voucher === null || voucher === undefined) {
          this1.__internal__.pinPad.companyVoucherGlobal = '';
        } else {
          if (parsedResponse.voucher_comercio.includes(':')) {
            this1.__internal__.pinPad.companyVoucherGlobal = parsedResponse.voucher_comercio;
          } else {
            this1.__internal__.pinPad.companyVoucherGlobal = this1.RC4Decrypt(
              this1.__internal__.pinPad.RC4Key,
              parsedResponse.voucher_comercio
            );
          }
        }

        voucher = parsedResponse.voucher_cliente;
        if (voucher === '' || voucher === null || voucher === undefined) {
          this1.__internal__.pinPad.clientVoucherGlobal = '';
        } else {
          if (parsedResponse.voucher_cliente.includes(':')) {
            this1.__internal__.pinPad.clientVoucherGlobal = parsedResponse.voucher_cliente;
          } else {
            this1.__internal__.pinPad.clientVoucherGlobal = this1.RC4Decrypt(
              this1.__internal__.pinPad.RC4Key,
              parsedResponse.voucher_cliente
            );
          }
        }
        this1.dispatch('pinPad:re-print', wsResponse);
      })
      .catch(function (error) {
        if (this1.__internal__.pinPad.contErrores < 1) {
          this1.dispatch('pinPad:error', this1.processError(error));
          this1.__internal__.pinPad.contErrores++;
        }
      });
  }

  async internalConsultation(attempt) {
    const this1 = this;
    if (attempt > 1 && this.__internal__.pinPad.objDataVenta.Ambiente === 'PROD') {
      this.__internal__.pinPad.urlSndConsulta = this.__internal__.pinPad.urlSndConsulta.replace(
        'https://m.mit.com.mx',
        'https://m2.mit.com.mx'
      );
    }

    this.__internal__.pinPad.objDataConsulta.Ambiente = this.__internal__.pinPad.objDataVenta.Ambiente;
    this.__internal__.pinPad.objDataConsulta.User = this.__internal__.pinPad.objDataVenta.User;
    this.__internal__.pinPad.objDataConsulta.Pwd = this.__internal__.pinPad.objDataVenta.pwd;
    this.__internal__.pinPad.objDataConsulta.IdBranch = this.__internal__.pinPad.objDataVenta.IdBranch;
    this.__internal__.pinPad.objDataConsulta.IdCompany = this.__internal__.pinPad.objDataVenta.IdCompany;
    this.__internal__.pinPad.objDataConsulta.Country = this.__internal__.pinPad.objDataVenta.Country;
    this.__internal__.pinPad.objDataConsulta.Tx_Date = new Date().toLocaleDateString('en-GB');
    this.__internal__.pinPad.objDataConsulta.Reference = this.__internal__.pinPad.objDataVenta.Reference;

    return new Promise(function (resolve, reject) {
      this1
        .buildJson('2')
        .then(async function (jsonRequest) {
          return await this1.executeWS(this1.__internal__.pinPad.urlSndConsulta, jsonRequest);
        })
        .then(function (wsResponse) {
          resolve(wsResponse);
        })
        .catch(function (error) {
          reject(error);
        });
    });
  }

  async postDataWS(url = '', data = {}) {
    let attempt = 1;
    do {
      if (attempt > 1 && this.__internal__.pinPad.objDataVenta.Ambiente === 'PROD') {
        url = url.replace('https://m.mit.com.mx', 'https://m2.mit.com.mx');
      }
      await this.delay(5);
      await this.getRSAKeyLocal();
      let encryptedKey = '';
      const aesKey = this.generateKey(32);
      encryptedKey = this.crypt(this.__internal__.pinPad.keyRSA, aesKey);
      const encryptedData = await this.AESEncrypt(aesKey, data);
      let headers = new Headers();
      headers.append('data', encryptedKey || '');
      headers.append('Content-Type', 'application/json');
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: encryptedData,
        redirect: 'follow',
      };
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        const consultResponse = await this.internalConsultation(attempt);
        if (
          consultResponse === '{}' ||
          consultResponse === null ||
          consultResponse === '' ||
          consultResponse.includes('"transacciones":""')
        ) {
          attempt = attempt + 1;
        } else {
          if (consultResponse.includes('nu_operaion')) {
            attempt = 1000;
            return Promise.reject('EE32');
          }
        }
      } else {
        attempt = 1000;
        const responseData = await response.json();
        return JSON.stringify(responseData);
      }
    } while (attempt <= 3);
    return Promise.reject('EE33');
  }

  checkInMoto() {
    const this1 = this;
    this.__internal__.pinPad.contErrores = 0;
    this.__internal__.pinPad.contPost = 0;
    this.__internal__.pinPad.contPostVta = 0;

    let parsedResponse,
      jsonResponse = '';
    const ccName = this1.__internal__.pinPad.objDataCheckinMoto.Cc_Name.trim();
    if (ccName === '') {
      this1.__internal__.pinPad.objDataCheckinMoto.Cc_Name = '--';
    }
    // let currentDate = new Date();
    // let currentYear = currentDate.getFullYear();
    // if (currentYear.toString().length === 4) {
    //   currentYear = currentYear.toString().substring(2);
    // }
    this1.__internal__.pinPad.objDataCheckinMoto.Cc_Number =
      this1.__internal__.pinPad.objDataCheckinMoto.Cc_Number.replace(/ /g, '');
    if (!this.validateReference(this1.__internal__.pinPad.objDataCheckinMoto.Reference)) {
      if (this1.__internal__.pinPad.contErrores < 1) {
        this.dispatch('pinPad:error', 'bad-reference');
        this1.__internal__.pinPad.contErrores++;
      }
      return;
    }
    this.validateObject(this1.__internal__.pinPad.objDataCheckinMoto)
      .then(function () {
        return new Promise(function (resolve, reject) {
          const moto = this1.__internal__.pinPad.objDataCheckinMoto;
          const currentYear = new Date().getFullYear();

          if (!/^[0-9]+$/.test(moto.Merchant)) return reject('EE30');
          if (!/^[0-9]+$/.test(moto.TpOperation)) return reject('EE30');
          if (!/^[A-Z-a-z0-9\s]+$/g.test(moto.Tx_Room)) return reject('EE30');
          if (!/^[A-Z-a-z\s]+$/g.test(moto.Currency)) return reject('EE30');
          if (isNaN(moto.Amount)) return reject('EE30');
          if (!/^[A-Z-a-z0-9\s]+$/g.test(moto.Cc_Name)) return reject('EE30');
          if (isNaN(moto.Cc_Number) || moto.Cc_Number.length <= 13) return reject('EE30');
          if (
            moto.Cc_ExpMonth === '00' ||
            moto.Cc_ExpMonth.length < 2 ||
            isNaN(moto.Cc_ExpMonth) ||
            Number(moto.Cc_ExpMonth) > 12
          )
            return reject('EE30');
          if (moto.Cc_ExpYear.length < 2 || isNaN(moto.Cc_ExpYear) || Number(moto.Cc_ExpYear) < Number(currentYear))
            return reject('EE30');
          if (isNaN(moto.Cc_CvvCsc) || moto.Cc_CvvCsc === '000' || moto.Cc_CvvCsc === '0000') return reject('EE30');

          this1.__internal__.pinPad.objDataCheckinMoto.Cc_Name = ccName;
          resolve(true);
        });
      })
      .then(function () {
        return this1.formatAmount(this1.__internal__.pinPad.objDataCheckinMoto.Amount, 2);
      })
      .then(function (formattedAmount) {
        this1.__internal__.pinPad.objDataCheckinMoto.Amount = formattedAmount;
        return this1.buildJson('8');
      })
      .then(async function (jsonProcesar) {
        return await this1.postDataWS(this1.__internal__.pinPad.urlcheckin_Moto, jsonProcesar);
      })
      .then(function (respuestaWS) {
        return new Promise(function (resolve) {
          parsedResponse = JSON.parse(respuestaWS);
          jsonResponse = respuestaWS;
          let companyVoucher = parsedResponse.voucher_comercio;
          if (companyVoucher !== null && companyVoucher.includes(':') === false) {
            companyVoucher = this1.RC4Decrypt(this1.__internal__.pinPad.RC4Key, companyVoucher);
            companyVoucher = companyVoucher.replace(/[\n\r]/g, '\\n');
            jsonResponse = jsonResponse.replace(parsedResponse.voucher_comercio, companyVoucher);
          }
          resolve('Voucher comercio obtenido OK');
        });
      })
      .then(function () {
        return new Promise(function (resolve) {
          let clientVoucher = parsedResponse.voucher_cliente;
          if (clientVoucher !== null && clientVoucher.includes(':') === false) {
            clientVoucher = this1.RC4Decrypt(this1.__internal__.pinPad.RC4Key, clientVoucher);
            clientVoucher = clientVoucher.replace(/[\n\r]/g, '\\n');
            jsonResponse = jsonResponse.replace(parsedResponse.voucher_cliente, clientVoucher);
          }
          resolve('Voucher cliente obtenido OK');
        });
      })
      .then(function () {
        this1.dispatch('pinPad:checkin-moto', jsonResponse);
      })
      .catch(function (error) {
        if (this1.__internal__.pinPad.contErrores < 1) {
          this1.dispatch('pinPad:error', this1.processError(error));
          this1.__internal__.pinPad.contErrores++;
        }
      });
  }

  /**
   * @deprecated
   * @param {string} data
   * @param {string} action
   * @returns {Promise<void>}
   */
  async writeSerialPinPad(data, action = 'unknown') {
    const arr = this.stringToArrayBuffer(data);
    await this.appendToQueue(arr, action);
  }
}
