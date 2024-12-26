'use strict';

import { Kernel } from './kernel.js';
import { Devices } from '../utils/devices.js';
import { isEmpty, supportCrypto, supportGeolocation, wait } from '../utils/utils.js';
import { JSEncrypt } from 'jsencrypt';
import axios from 'axios';

export class PinPad extends Kernel {
  __pinPad__ = {
    buffer: null,
    about: {
      EMV: null,
      model: null,
      serial: null,
      brand: null,
      appVersion: null,
      printer: null,
      hasCashback: false,
      supportInjection: false,
      supportSign: false,
      supportContactlessCollisionCard: false,
      supportContactless: false,
      supportDUKPT: '', // Derived Unique Key Per Transaction
      injectedValues: false,
      pp: null,
    },
    config: {
      defaultEnvironment: 'production',
      environment: 'production',
      currency: 'MXN',
      currencyCode: '0484',
      timeoutPinPad: '100',
      signSupport: '1',
      CTLSSupport: '1',
      userTRX: 'userPinpadWeb',
      tp_operation: '29',
      requireCVVAmex: '1',
      forceOnline: '00',
      emvCard: '0',
      validateQPS: '1',
      username: null,
      password: null,
      country: null,
      idBranch: null,
      idCompany: null,
      latitude: null,
      longitude: null,
      publicKeyRSA: null,
      publicIP: null,
      internal: {
        stTokenization: false,
        qpsDomestic: '',
        qpsInternational: '',
        cvmlVMCDomestic: '',
        cvmlVMCInternational: '',
        cvmlAmex: '',
        translimitCTLSVMC: '',
        translimitCTLSAmex: '',
        emv: {},
      },
      terminal: {},
      loginResponse: null,
      otherLogin: {},
      RC4Key: 'KEY CREDIT CARD KEY',
      read: {
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
      tokenizeTRX: false,
    },
    constants: {
      // don't change
      appVersion: '1.0.16',
      appName: 'pinpapWebApp ',
      STX: '\x02',
      ETX: '\x03',
      FS: '\x1C',
      getNULL: '\0',
      appChannel: '3',
      typeChannel: '11',
      urls: {
        development: 'https://fcdev.mitec.com.mx',
        qa: 'https://fcqa.mitec.com.mx',
        production: 'https://m.mit.com.mx',
        productionAlternative: 'https://m2.mit.com.mx',
      },
      uris: {
        login: '/pinpadWeb/login',
        RSAKey: '/pinpadWeb/getDataCrypt',
        merchant: '/pinpadWeb/getAfiliaciones',
        consult: '/pinpadWeb/queryTrx',
        keysDUKPT: '/pinpadWeb/getKeysDUKPT',
        reverse: '/pinpadWeb/executeBackSale',
        rePrint: '/pinpadWeb/reprint',
        checkInMoto: '/pinpadWeb/checkin',
        checkOutMoto: '/pinpadWeb/checkout',
        reAuthorizationMoto: '/pinpadWeb/reAuthorization',
        cancellation: '/pinpadWeb/executeVoid',
        sale: '/pinpadWeb/executeSale',
      },
    },
    operation: {
      amount: 0,
      reference: null,
      folio: null,
      authorization: null,
      errors: 0,
      last_error: null,
      commerceVoucher: '',
      clientVoucher: '',
      consultDate: null,
      ignore: { counter: false, counterSale: false, isError92TRX: false, C93Global: false, error: '' },
      finalResult: {},
      moto: {
        ccType: '',
        ccName: '',
        ccNumber: '',
        ccExpMonth: '',
        ccExpYear: '',
        ccCvvCsc: '',
        txRoom: '',
      },
      bin: '',
      bin8: '',
      hasQPS: false,
      onlyMerchant: '',
      merchant: null,
      typeOperation: '29',
      typeResponse: '',
      responseMit: {},
      applyReverse: false,
    },
    finishCommand: { A: '', B: '', C: '', D: '', E: '', F: '', G: '', H: '', I: '', J: '', K: '' },
    waiting: {
      statusAboutWaiting: null,
      statusInjectWaiting: null,
      statusReadCardWaiting: null,
      statusSecondGenerateWaiting: null,
    },
  };

  constructor({
    filters = null,
    config_port = null,
    no_device = 1,
    username = null,
    password = null,
    environment = 'production',
  } = {}) {
    super({ filters, config_port, no_device });
    this.__internal__.device.type = 'pinpad';
    if (!supportCrypto()) {
      throw new Error('Crypto not supported in this browser');
    }
    if (Devices.getCustom(this.typeDevice, no_device)) {
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    }
    this.__internal__.time.response_connection = 3e3;
    this.__internal__.time.response_general = 5e3;
    this.__internal__.serial.delay_first_connection = 1_000;
    this.__internal__.serial.config_port.baudRate = 19200;

    this.environment = environment;
    if (username) this.username = username;
    if (password) this.password = password;

    this.#registerAvailableListenersLocker();
    this.#touch();
  }

  #touch() {
    Devices.addCustom('pinpad', this);
  }

  #registerAvailableListenersLocker() {
    const _ = [
      'pp:processing-card',
      'pp:read-card',
      'pp:error',
      'pp:print',
      'pp:merchant-moto',
      'pp:dukpt',
      'pp:finish-emv',
      'pp:response',
      'pp:error',
      'pp:finish-emv',
    ];
    for (const event of _) {
      this.serialRegisterAvailableListener(event);
    }
  }

  async timeout(bytes, event) {
    await super.timeout(bytes, event);
    if (this.__pinPad__.waiting.statusAboutWaiting && event === 'about') {
      this.__pinPad__.waiting.statusAboutWaiting = 'rejected';
    } else if (this.__pinPad__.waiting.statusInjectWaiting && event === 'inject') {
      this.__pinPad__.waiting.statusInjectWaiting = 'rejected';
    } else if (this.__pinPad__.waiting.statusinitDUKPTWaiting && event === 'init-dukpt') {
      this.__pinPad__.waiting.statusinitDUKPTWaiting = 'rejected';
    } else if (this.__pinPad__.waiting.statuswritingDUKPTWaiting && event === 'dukpt') {
      this.__pinPad__.waiting.statuswritingDUKPTWaiting = 'rejected';
    } else if (this.__pinPad__.waiting.statusReadCardWaiting && event === 'read-card') {
      this.__pinPad__.waiting.statusReadCardWaiting = 'rejected';
    } else if (this.__pinPad__.waiting.statusSecondGenerateWaiting && event === 'second-generate') {
      this.__pinPad__.waiting.statusSecondGenerateWaiting = 'rejected';
    }
  }

  #parseData(data) {
    const STX = this.__pinPad__.constants.STX;
    const ETX = this.__pinPad__.constants.ETX;
    const FS = this.__pinPad__.constants.FS;
    const NULL_CHAR = this.__pinPad__.constants.getNULL;
    data = data.replace(new RegExp(STX, 'g'), '');
    const split = data.split(ETX);
    data = split[0];
    const parts = data.split(FS);
    parts.push(...split[1].split(FS)); // ignore the rest of the data because come after ETX
    const object = {};
    parts
      .map((part, index) => {
        const key = index > 0 ? part.substring(0, 1) : 'A';
        const value = index > 0 ? part.substring(1) : part;
        return { [key]: value.replace(new RegExp(NULL_CHAR, 'g'), '') };
      })
      .forEach((part) => Object.assign(object, part));
    return object;
  }

  #assignAboutPinPad(parts, codex) {
    const ETX = this.__pinPad__.constants.ETX;
    const appVersion = codex.substring(codex.indexOf('\x1CD') + 2, codex.indexOf('\x1CE'));
    let versionInt = 0;
    const supportInjection = codex.indexOf('\x1CN') > 0;
    const brand = codex.substring(codex.indexOf('A00') + 3, codex.indexOf('\x1CB'));
    if (brand && brand !== 'undefined') {
      if (brand.toUpperCase() === 'VERIFONE') {
        const versionNumber = appVersion
          .replace('MITP_1.00.', '')
          .replace('MITP_01.00.', '')
          .replace('MITD_1.00.', '')
          .replace('MITD_01.00.', '');
        versionInt = parseInt(versionNumber);
        if (versionInt >= 15) {
          this.__pinPad__.about.hasCashback = true;
        }
      }
    }

    this.__pinPad__.about.supportInjection = supportInjection;

    if (codex.indexOf('\x1CM') > 0) {
      this.__pinPad__.about.supportSign = codex.substring(codex.indexOf('\x1CL') + 2, codex.indexOf('\x1CM'));
      if (this.__pinPad__.about.supportInjection) {
        this.__pinPad__.about.supportContactlessCollisionCard = codex.substring(
          codex.indexOf('\x1CM') + 2,
          codex.indexOf('\x1CN')
        );
      } else {
        this.__pinPad__.about.supportContactlessCollisionCard = codex.substring(
          codex.indexOf('\x1CM') + 2,
          codex.indexOf(ETX)
        );
        this.__pinPad__.about.supportContactless = true;
      }
    } else {
      this.__pinPad__.about.supportSign = codex.substring(codex.indexOf('\x1CL') + 2, codex.indexOf(ETX));
      this.__pinPad__.about.supportContactless = false;
    }

    this.__pinPad__.about.supportDUKPT = codex.substring(codex.indexOf('\x1CJ') + 2, codex.indexOf('\x1CK'));
    this.__pinPad__.about.EMV = codex.substring(codex.indexOf('\x1CE') + 2, codex.indexOf('\x1CF'));
    this.__pinPad__.about.serial = codex.substring(codex.indexOf('\x1CC') + 2, codex.indexOf('\x1CD'));
    this.__pinPad__.about.printer = codex.substring(codex.indexOf('\x1CF') + 2, codex.indexOf('\x1CG'));
    this.__pinPad__.about.model = codex.substring(codex.indexOf('\x1CB') + 2, codex.indexOf('\x1CC'));
    this.__pinPad__.about.brand = brand;
    this.__pinPad__.about.appVersion = appVersion;
    const hasDUKPTKeys = codex.substring(codex.indexOf('\x1CK') + 2, codex.indexOf('\x1CL'));

    this.__pinPad__.about.pp = {
      brand,
      appVersion,
      versionInt,
      hasCashback: this.__pinPad__.about.hasCashback,
      supportInjection: this.__pinPad__.about.supportInjection,
      supportSign: this.__pinPad__.about.supportSign,
      supportContactlessCollisionCard: this.__pinPad__.about.supportContactlessCollisionCard,
      supportContactless: this.__pinPad__.about.supportContactless,
      supportDUKPT: this.__pinPad__.about.supportDUKPT,
      hasDUKPTKeys,
      EMV: this.__pinPad__.about.EMV,
      serial: this.__pinPad__.about.serial,
      printer: this.__pinPad__.about.printer,
      model: this.__pinPad__.about.model,
    };

    if (this.__pinPad__.waiting.statusAboutWaiting) {
      this.__pinPad__.waiting.statusAboutWaiting = 'resolved';
    }
  }

  // eslint-disable-next-line no-unused-vars
  #assignInjectPinPad(parts, codex) {
    this.__pinPad__.waiting.statusInjectWaiting = 'resolved';
  }

  #assignInitDUKPT(parts, codex) {
    codex = codex.replace('\x02010P93A00\x1CB01\x03t\x02036P81AACERQUE, INSERTE CHIP O  DESLICE\x03*', '');

    this.__pinPad__.config.terminal = {
      nb_kcv: codex.substring(codex.indexOf('\x1CE') + 2, codex.indexOf('\x1CF')),
      nb_marca_terminal: codex.substring(codex.indexOf('P91A') + 4, codex.indexOf('\x1CB')),
      nb_modelo_terminal: codex.substring(codex.indexOf('\x1CB') + 2, codex.indexOf('\x1CC')),
      nb_serie_lector: codex.substring(codex.indexOf('\x1CC') + 2, codex.indexOf('\x1CD')),
      nb_tk: codex.substring(codex.indexOf('\x1CF') + 2, codex.length - 2),
      nb_version_terminal: codex.substring(codex.indexOf('\x1CD') + 2, codex.indexOf('\x1CE')),
    };
    this.__pinPad__.waiting.statusinitDUKPTWaiting = 'resolved';
  }

  // eslint-disable-next-line no-unused-vars
  #assignWriteDUKPT(parts, codex) {
    // failed = "\u0002006E92A13\u00038"
    // failed = "\u0002006E92A13\u00038"
    this.__pinPad__.waiting.statuswritingDUKPTWaiting = 'resolved';
  }

  #receivedReadCard(parts, codex) {
    const brand = this.__pinPad__.about.brand.toLowerCase();
    const model = this.__pinPad__.about.model.toLowerCase();
    const minResponseLength = brand === 'ingenico' && model === 'ipp320' ? 500 : 350;

    if (codex.length < minResponseLength) {
      codex = codex.replace('\x02006P93A00\x03.', '').replace('\x02006P93A00\x03,', '');
      if (codex.includes('E93')) {
        this.__pinPad__.operation.ignore.error = codex.substring(codex.indexOf('E93') + 3, codex.indexOf('E93') + 6);
      } else if (codex.includes('E71')) {
        this.__pinPad__.operation.ignore.error = codex.substring(codex.indexOf('E71') + 3, codex.indexOf('E71') + 6);
      }

      if (
        this.__pinPad__.operation.ignore.error !== '' &&
        codex.indexOf('OPERACION       CANCELADA') === -1 &&
        codex.indexOf('TIEMPO         EXCEDIDO') === -1 &&
        this.__pinPad__.operation.ignore.error.length === 3
      ) {
        this.__pinPad__.operation.last_error = this.#processError(this.__pinPad__.operation.ignore.error);
        this.__pinPad__.waiting.statusReadCardWaiting = 'rejected';
        //this.__pinPad__.operation.errors++;
      }
      return;
    }

    if (
      codex.includes('\x1CM1\x03') ||
      codex.includes('\x1CM0\x03') ||
      codex.includes('\x1CM1\x1C') ||
      codex.includes('\x1CN1\x03') ||
      codex.includes('\x1CN1\x1C') ||
      (codex.includes('P93A022\x1C') &&
        codex.substring(codex.length - 24).includes('\x1CI') &&
        codex.substring(codex.length - 1).includes('\x03')) ||
      (codex.includes('P93A800\x1C') &&
        codex.substring(codex.length - 24).includes('\x1CI') &&
        codex.substring(codex.length - 1).includes('\x03')) ||
      (codex.includes('P93A022\x1C') && codex.length >= 406 && model === 'vx820') ||
      (codex.includes('P93A022\x1C') && codex.length >= 406 && model === 'vx520') ||
      (codex.includes('P93A800\x1C') && codex.length >= 406 && model === 'vx520') ||
      (codex.includes('P93A800\x1C') && codex.length >= 406 && model === 'vx820') ||
      (codex.includes('P93A022\x1C') && codex.length >= 406 && model === 'p400') ||
      (codex.includes('P93A800\x1C') && codex.length >= 406 && model === 'p400') ||
      (codex.includes('P93A022\x1C') && codex.length >= 406 && model === 'v205c') ||
      (codex.includes('P93A800\x1C') && codex.length >= 406 && model === 'v205c') ||
      (codex.includes('P93A022\x1C') && codex.length >= 406 && model === 'move2500') ||
      (codex.includes('P93A800\x1C') && codex.length >= 406 && model === 'move2500') ||
      (codex.includes('P93A022\x1C') && codex.length >= 406 && model === 'lane3000') ||
      (codex.includes('P93A800\x1C') && codex.length >= 406 && model === 'lane3000')
    ) {
      let processedLine = codex;
      if (brand === 'verifone') {
        processedLine = codex
          .replace('\x02006P93A00\x03.', '')
          .substring(codex.indexOf('P93A'), codex.indexOf('P93A') + 7);
      }

      if (
        codex.includes('P81APROCESANDO, NO RETIRE TARJETA') ||
        codex.includes('P81APROCESANDO TARJETA') ||
        processedLine.includes('P93A022') ||
        processedLine.includes('P81AINSERTE CHIP O  DESLICE TARJETA') ||
        processedLine.includes('ACERQUE, INSERTE CHIP O  DESLICE') ||
        processedLine.includes('P81AACERQUE, INSERTE CHIP O  DESLICE TARJETA')
      ) {
        this.dispatch('pp:processing-card', { waiting: true });
      } else if (codex.length > minResponseLength) {
        this.#processingEMV(codex);
      }
    }
  }

  #receivedSecondGenerate(parts, codex) {
    const ETX = this.__pinPad__.constants.ETX;

    let ppResponse = codex
      .replace('\x02023P81AFAVOR RETIRAR TARJ.\x03\x0E', '')
      .replace('\x02020P81A DECLINADA EMV  \x03', '')
      .replace('\x02020P81A DECLINADA EMV  \x03', '');
    ppResponse = ppResponse.substring(ppResponse.indexOf('\x1CB') + 2, ppResponse.indexOf(ETX));
    if (ppResponse.includes('006E93A16')) {
      ppResponse = '01';
    }

    this.__pinPad__.operation.applyReverse =
      ppResponse === '01' &&
      this.__pinPad__.operation.responseMit._approved &&
      this.__pinPad__.config.otherLogin.executeReverse === '1';

    this.__pinPad__.waiting.statusSecondGenerateWaiting = 'resolved';
  }

  #processingEMV(codex) {
    const ETX = this.__pinPad__.constants.ETX;
    const brand = this.__pinPad__.about.brand.toLowerCase();

    let expiryDate, maskPan, name, year, month;

    if (brand === 'verifone') {
      codex = codex
        .replace('\x02006P93A00\x03.', '')
        .replace('\x02009P93A00\x1C', '')
        .replace('\x02010P93A00\x1CB01\x03v', '');
    } else {
      codex = codex.replace('\x02006P93A00\x03,', '');
    }

    this.__pinPad__.config.read.POSEM = codex.substring(codex.indexOf('P93A') + 4, codex.indexOf('\x1CB'));
    const POSEM = this.__pinPad__.config.read.POSEM;

    if (POSEM === '051' || POSEM === '071') {
      this.__pinPad__.config.read.Chip = '1';
      this.__pinPad__.config.read.PIN = codex.substring(codex.indexOf('\x1CC') + 2, codex.indexOf('\x1CD'));
      this.__pinPad__.config.read.AppId = codex.substring(codex.indexOf('\x1CG') + 2, codex.indexOf('\x1CH'));
      this.__pinPad__.config.read.AppIdLabel = codex.substring(codex.indexOf('\x1CH') + 2, codex.indexOf('\x1CI'));
      this.__pinPad__.config.read.Arqc = codex.substring(codex.indexOf('\x1CF') + 2, codex.indexOf('\x1CG'));
      if (codex.includes('\x1CO')) {
        const subLine = codex.substring(codex.indexOf('P93A'));
        this.__pinPad__.config.read.ReadCTLS = subLine.substring(
          subLine.indexOf('\x1CM') + 2,
          subLine.indexOf('\x1CN')
        );
        this.__pinPad__.operation.hasQPS =
          subLine.substring(subLine.indexOf('\x1CN') + 2, subLine.indexOf('\x1CO')) === '1';
        this.__pinPad__.operation.bin8 = subLine.substring(subLine.indexOf('\x1CO') + 2, subLine.indexOf(ETX));
      } else {
        if (codex.includes('\x1CN')) {
          const subLine = codex.substring(codex.indexOf('P93A'));
          this.__pinPad__.config.read.ReadCTLS = subLine.substring(
            subLine.indexOf('\x1CM') + 2,
            subLine.indexOf('\x1CN')
          );
          this.__pinPad__.operation.hasQPS =
            subLine.substring(subLine.indexOf('\x1CN') + 2, subLine.indexOf(ETX)) === '1';
        } else {
          const subLine = codex.substring(codex.indexOf('P93A'), codex.indexOf('\x1CM') + 5);
          this.__pinPad__.config.read.ReadCTLS = subLine.substring(subLine.indexOf('\x1CM') + 2, subLine.indexOf(ETX));
          this.__pinPad__.operation.hasQPS = false;
        }
      }
      this.__pinPad__.config.read.Tags = codex.substring(codex.indexOf('\x1CB') + 2, codex.indexOf('\x1CC'));
      this.__pinPad__.config.read.NB_ksn = codex.substring(codex.indexOf('\x1CK') + 2, codex.indexOf('\x1CM'));
      this.__pinPad__.config.read.NB_Data = codex.substring(codex.indexOf('\x1CD') + 2, codex.indexOf('\x1CE'));
      maskPan = codex.substring(codex.indexOf('\x1CI') + 2, codex.indexOf('\x1CJ'));
      name = codex.substring(codex.indexOf('\x1CE') + 2, codex.indexOf('\x1CF'));
      this.__pinPad__.config.read.ChipName = name;
      expiryDate = codex.substring(codex.indexOf('\x1CJ') + 2, codex.indexOf('\x1CK'));
    } else {
      let ksn;
      this.__pinPad__.config.read.Chip = '0';
      this.__pinPad__.config.read.PIN = '';
      this.__pinPad__.config.read.AppId = '';
      this.__pinPad__.config.read.Arqc = '';
      this.__pinPad__.config.read.ReadCTLS = '0';
      this.__pinPad__.config.read.AppIdLabel = codex.substring(codex.indexOf('\x1CH') + 2, codex.indexOf('\x1CI'));
      this.__pinPad__.config.read.Tags = codex.substring(codex.indexOf('\x1CB') + 2, codex.indexOf('\x1CC'));
      if (POSEM === '022') {
        if (codex.includes('\x1CO')) {
          const subLine = codex.substring(codex.indexOf('P93A'));
          this.__pinPad__.operation.bin8 = subLine.substring(subLine.indexOf('\x1CO') + 2, subLine.indexOf(ETX));
          ksn = codex.substring(codex.indexOf('P93A022'), codex.indexOf('\x1CI') + 23);
          ksn = ksn.substring(ksn.indexOf('\x1CI') + 2, ksn.lastIndexOf('\x1C'));
        } else {
          ksn = codex.substring(codex.indexOf('P93A022'), codex.indexOf('\x1CI') + 23);
          ksn = ksn.substring(ksn.indexOf('\x1CI') + 2, ksn.indexOf(ETX));
        }
      } else {
        ksn = codex.substring(codex.indexOf('P93A800'), codex.indexOf('\x1CI') + 23);
        ksn = ksn.substring(ksn.indexOf('\x1CI') + 2, ksn.indexOf(ETX));
      }
      this.__pinPad__.config.read.NB_ksn = ksn;
      this.__pinPad__.config.read.NB_Data = codex.substring(codex.indexOf('\x1CB') + 2, codex.indexOf('\x1CC'));
      maskPan = codex.substring(codex.indexOf('\x1CF') + 2, codex.indexOf('\x1CG'));
      expiryDate = codex.substring(codex.indexOf('\x1CG') + 2, codex.indexOf('\x1CH'));
      if (this.__pinPad__.about.model.toLowerCase() === 'vx520') {
        name = codex.substring(codex.indexOf('\x1CH') + 2, codex.indexOf('\x1CI'));
        this.__pinPad__.config.read.ChipName = name;
      } else {
        name = codex.substring(codex.indexOf('\x1CH') + 2, codex.indexOf('\x1CI'));
        this.__pinPad__.config.read.ChipName = name;
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
    if (this.__pinPad__.config.read.Chip === '1') {
      this.__pinPad__.config.read.EMV = '3';
      this.__pinPad__.config.read.ChipNameEnc = '1';
    } else {
      this.__pinPad__.config.read.ChipNameEnc = '';
      this.__pinPad__.config.read.EMV = '2';
    }

    if (
      this.__pinPad__.config.read.AppIdLabel.toLowerCase().includes('american') ||
      this.__pinPad__.config.read.AppIdLabel.toLowerCase().includes('amex')
    ) {
      this.__pinPad__.config.read.Type = 'AMEX';
    } else {
      this.__pinPad__.config.read.Type = 'V/MC';
    }

    this.__pinPad__.operation.bin = maskPan;
    if (maskPan.length > 6) {
      this.__pinPad__.operation.bin = maskPan.substring(0, 6);
    }
    this.__pinPad__.waiting.statusReadCardWaiting = 'resolved';

    this.dispatch('pp:read-card', {
      ERROR: '',
      maskPan: maskPan,
      name: name,
      month: month,
      year: year,
    });
  }

  #receivedCancelReadCard(parts, codex) {
    if (codex.length > 10 && codex.includes('E93A10')) {
      if (this.__pinPad__.waiting.statusReadCardWaiting === 'pending') {
        this.__pinPad__.waiting.statusReadCardWaiting = 'rejected';
      }
      this.dispatch('pp:error', { message: 'Operation cancelled by user.' });
    }
  }

  #receivedPrintVoucher(parts, codex) {
    const this1 = this;
    if (this.__pinPad__.about.model.toLowerCase() === 'vx520') {
      if (codex.length > 11) {
        if (codex.includes('P59A00')) {
          if (this.__pinPad__.operation.clientVoucher !== '') {
            setTimeout(function () {
              this1
                .print('client')
                .then(() => {})
                .catch((e) => {
                  console.error(e);
                });
            }, 1000);
          } else {
            this.dispatch('pp:print', { type: 'success' });
          }
        } else {
          const obj =
            codex.includes('E17') || codex.includes('A17')
              ? { type: 'warning', message: 'printer without paper' }
              : { type: 'error', message: 'The voucher could not be printed' };
          this.dispatch('pp:print', obj);
        }
      }
    } else {
      if (codex.includes('P59A00')) {
        if (this.__pinPad__.operation.clientVoucher !== '') {
          setTimeout(function () {
            this1
              .print('client')
              .then(() => {})
              .catch((e) => {
                console.error(e);
              });
          }, 1000);
        } else {
          this.dispatch('pp:print', { type: 'success' });
        }
      } else {
        const obj =
          codex.includes('E17') || codex.includes('A17')
            ? { type: 'warning', message: 'printer without paper' }
            : { type: 'error', message: 'The voucher could not be printed' };
        this.dispatch('pp:print', obj);
      }
    }
  }

  // eslint-disable-next-line no-unused-vars
  #receivedCode93(parts, codex) {
    //console.log(parts, codex);
  }

  // eslint-disable-next-line no-unused-vars
  #receivedFinishEmv(parts, codex) {
    //console.log(parts, codex);
  }

  serialMessage(original_code) {
    const message = {
      original_code,
      code: null,
      name: null,
      description: null,
      request: this.lastAction,
      no_code: 0,
      parsed: null,
    };
    //this.__internal__.serial.last_action = null;

    const byteArray = this.parseHexToUint8(original_code);
    const codex = this.parseUint8ArrayToString(byteArray);
    let parts = this.#parseData(codex);

    this.__pinPad__.buffer = codex;
    message.parsed = parts;
    message.code = codex;

    //console.log(message);

    switch (message.request) {
      case 'connect':
        message.name = 'connected';
        message.description = 'Connection established';
        message.no_code = 100;
        this.#assignAboutPinPad(parts, codex);
        break;
      case 'about':
        message.name = 'About PinPad';
        message.description = 'Response of about';
        message.no_code = 101;
        this.#assignAboutPinPad(parts, codex);
        break;
      case 'inject':
        message.name = 'Inject';
        message.description = 'Response of inject values';
        message.no_code = 102;
        this.#assignInjectPinPad(parts, codex);
        break;
      case 'init-dukpt':
        message.name = 'Init DUKPT';
        message.description = 'Response of init DUKPT';
        message.no_code = 103;
        this.#assignInitDUKPT(parts, codex);
        break;
      case 'dukpt':
        message.name = 'Write DUKPT';
        message.description = 'Response of write DUKPT';
        message.no_code = 104;
        this.#assignWriteDUKPT(parts, codex);
        break;
      case 'read-card':
        message.name = 'read card';
        message.description = 'response of read card';
        message.no_code = 105;
        this.#receivedReadCard(parts, codex);
        break;
      case 'second-generate':
        message.name = 'second generate';
        message.description = 'response of second generate';
        message.no_code = 106;
        this.#receivedSecondGenerate(parts, codex);
        break;
      case 'cancel':
        message.name = 'cancel pinpad';
        message.description = 'response of cancel';
        message.no_code = 107;
        break;
      case 'print':
        this.#receivedPrintVoucher(parts, codex);
        message.name = 'print voucher';
        message.description = 'response of print';
        message.no_code = 108;
        break;
      case 'cancel-read-card':
        this.#receivedCancelReadCard(parts, codex);
        message.name = 'cancel read card';
        message.description = 'response of cancel read card';
        message.no_code = 109;
        break;
      case 'code93':
        this.#receivedCode93(parts, codex);
        message.name = 'code 93';
        message.description = 'response of code 93';
        message.no_code = 110;
        break;
      case 'finish-emv-end':
        this.#receivedFinishEmv(parts, codex);
        message.name = 'Finish EMV End';
        message.description = 'response of finish EMV End';
        message.no_code = 111;
        break;
      default:
        message.name = 'unknown';
        message.description = 'Unknown command';
        message.no_code = 400;
        break;
    }
    //console.warn(codex);

    this.dispatch('serial:message', message);
  }

  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(listen_on_port = 1) {
    const STX = '\x02';
    const ETX = '\x03';
    let command = 'C56AABOUT';
    command = STX + command.length.toString().padStart(3, '0') + command + ETX;
    let lrc = 0;
    for (let i = 0; i < command.length; i++) {
      lrc ^= command.charCodeAt(i);
    }
    command = command + String.fromCharCode(lrc);
    const arr = this.parseStringToBytes(command, '');
    return this.add0x(arr);
  }

  async sendCustomCode({ code = '' } = {}) {
    if (typeof code !== 'string') throw new Error('Invalid string');
    const arr = this.parseStringToBytes(code);
    await this.appendToQueue(arr, 'custom');
  }

  // ========================================================================================
  // ========================================================================================
  // ========================================================================================

  set username(username) {
    this.__pinPad__.config.username = username;
  }

  get username() {
    return this.__pinPad__.config.username;
  }

  set password(password) {
    if (typeof password !== 'string') throw new Error('Invalid password');
    this.__pinPad__.config.password = password.toUpperCase();
  }

  get password() {
    return this.__pinPad__.config.password;
  }

  set amount(amount) {
    amount = parseFloat(amount);
    if (isNaN(amount) || amount <= 0) throw new Error('Invalid amount');
    this.__pinPad__.operation.amount = amount.toFixed(2).toString();
  }

  get amount() {
    return parseFloat(this.__pinPad__.operation.amount) || 0;
  }

  set reference(reference) {
    if (!this.#validateReference(reference.trim())) throw new Error('Invalid reference');
    this.__pinPad__.operation.reference = reference.trim().toString().replaceAll(' ', '').toUpperCase();
  }

  get reference() {
    return this.__pinPad__.operation.reference;
  }

  get url() {
    const env = this.environment;
    return this.__pinPad__.constants.urls[env];
  }

  get version() {
    return {
      name: this.__pinPad__.constants.appName,
      version: this.__pinPad__.constants.appVersion,
      environment: this.environment,
      type: this.typeDevice,
    };
  }

  set environment(value) {
    const validEnvs = ['development', 'qa', 'production', 'productionAlternative'];
    if (typeof value !== 'string' || !validEnvs.includes(value.toLowerCase())) {
      throw new Error('The environment must be a string, in: ' + validEnvs.join(', '));
    }
    this.__pinPad__.config.defaultEnvironment = value.toLowerCase();
    this.__pinPad__.config.environment = value.toLowerCase();
  }

  get defaultEnvironment() {
    return this.__pinPad__.config.defaultEnvironment;
  }

  get environment() {
    return this.__pinPad__.config.environment;
  }

  get latitudeLongitude() {
    return {
      latitude: this.__pinPad__.config.latitude,
      longitude: this.__pinPad__.config.longitude,
    };
  }

  set timeoutPinPad(timeout) {
    timeout = parseInt(timeout);
    if (isNaN(timeout) || timeout <= 10 || timeout >= 300)
      throw new Error('Invalid timeout please use a number between 10 and 300 seconds');
    this.__pinPad__.config.timeoutPinPad = timeout.toString();
  }

  get timeoutPinPad() {
    return parseInt(this.__pinPad__.config.timeoutPinPad);
  }

  // ========================================================================================
  // Updated to WS v4
  // ========================================================================================

  #crypt(key, value) {
    const jsEncrypt = new JSEncrypt();
    jsEncrypt.setPublicKey(key);
    return jsEncrypt.encrypt(value);
  }

  #generateKey(length) {
    const chars = '0123456789ABCDEF';
    let key = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      key += chars.substring(randomIndex, randomIndex + 1);
    }
    return key;
  }

  #base16Encode(asciiString) {
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

  // base16Decode(hex) {
  //   const hexChars = '0123456789abcdef';
  //   const asciiArray = [];
  //   const decodedArray = [];
  //   let j = 0;
  //   for (let i = 0; i < 256; i++) {
  //     asciiArray[hexChars.charAt(i >> 4) + hexChars.charAt(i & 15)] = String.fromCharCode(i);
  //   }
  //   hex = hex.replace(/[^a-f0-9]/gi, '');
  //   if (hex.length % 2) {
  //     hex = '0' + hex;
  //   }
  //   for (let i = 0; i < hex.length; i += 2) {
  //     decodedArray[j++] = asciiArray[hex.substr(i, 2)];
  //   }
  //   return decodedArray.join('');
  // }

  async #AESEncrypt(key, message) {
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

  // async AESDecrypt(key, encryptedMessage) {
  //   const keyBytes = new Uint8Array(key.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  //   const ivBase64 = encryptedMessage.slice(0, 24); // Assuming the IV is 16 bytes and base64 encoded
  //   const ciphertextBase64 = encryptedMessage.slice(24);
  //
  //   const iv = new Uint8Array(
  //     atob(ivBase64)
  //       .split('')
  //       .map((char) => char.charCodeAt(0))
  //   );
  //   const ciphertext = new Uint8Array(
  //     atob(ciphertextBase64)
  //       .split('')
  //       .map((char) => char.charCodeAt(0))
  //   );
  //
  //   const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['decrypt']);
  //
  //   const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: iv }, cryptoKey, ciphertext);
  //
  //   const decoder = new TextDecoder();
  //   return decoder.decode(decrypted);
  // }

  #RC4Encrypt(key, message, base16 = false) {
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

    return this.#base16Encode(encryptedText).toUpperCase();
  }

  #RC4Decrypt(key, ciphertext) {
    return this.#RC4Encrypt(key, this.hexToAscii(ciphertext));
  }

  #removeAccents(str) {
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

  #processEndReceipt(voucher, logo, appVersion) {
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

  #processReceipt(voucher, version) {
    const logo = '@logo3 @br';
    const appVersion = '@cnn ' + version;

    if (voucher.includes('@cnb Santander')) {
      voucher = voucher.replace('@cnb Santander', '@logo1@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb American Express')) {
      voucher = voucher.replace('@cnb American Express', '@logo2@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb HSBC')) {
      voucher = voucher.replace('@cnb HSBC', '@logo7@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb IXE')) {
      voucher = voucher.replace('@cnb IXE', '@logo11@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb MULTIVA')) {
      voucher = voucher.replace('@cnb MULTIVA', '@logo15@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb Multiva')) {
      voucher = voucher.replace('@cnb Multiva', '@logo15@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb SCOTIA BANK')) {
      voucher = voucher.replace('@cnb SCOTIA BANK', '@logo16@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb SCOTIABANK')) {
      voucher = voucher.replace('@cnb SCOTIABANK', '@logo16@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb BANCOMER')) {
      voucher = voucher.replace('@cnb BANCOMER', '@logo17@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb Bancomer')) {
      voucher = voucher.replace('@cnb Bancomer', '@logo17@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb BBVA')) {
      voucher = voucher.replace('@cnb BBVA', '@logo17@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb BANORTE')) {
      voucher = voucher.replace('@cnb BANORTE', '@logo18@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb Banorte')) {
      voucher = voucher.replace('@cnb Banorte', '@logo18@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb BANREGIO')) {
      voucher = voucher.replace('@cnb BANREGIO', '@logo19@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb Banregio')) {
      voucher = voucher.replace('@cnb Banregio', '@logo19@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb GETNET')) {
      voucher = voucher.replace('@cnb GETNET', '@logo20@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    if (voucher.includes('@cnb GetNET')) {
      voucher = voucher.replace('@cnb GetNET', '@logo20@br');
      return this.#processEndReceipt(voucher, logo, appVersion);
    }
    return this.#processEndReceipt(voucher, logo, appVersion);
  }

  async #xhrLogin(force = false) {
    this.#recoverLogin();

    if (this.__pinPad__.config.loginResponse && !force) return await this.#loginResponse();

    const url = this.url + this.__pinPad__.constants.uris.login;
    const data = {
      usuario: this.username,
      password: this.password,
      crypto: '',
      version: this.__pinPad__.constants.appVersion,
      serieLector: '',
      canal: this.__pinPad__.constants.appChannel,
    };

    await this.#loadRSAKeyLocal();
    if (this.#isEmptyRSAKey()) {
      throw new Error('Empty RSA Key');
    }
    const aesKey = this.#generateKey(32);
    const encryptedKey = this.#crypt(this.__pinPad__.config.publicKeyRSA, aesKey);
    const encryptedData = await this.#AESEncrypt(aesKey, JSON.stringify(data));
    const response = await axios
      .post(url, encryptedData, {
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0',
          data: encryptedKey || '',
        },
      })
      .catch((error) => {
        throw new Error(`Error in request, verify internet connection: ${error.response?.status} ${error.message}`);
      });

    let parsedJson = this.#validateString(JSON.stringify(response.data));
    if (typeof parsedJson === 'string') {
      parsedJson = JSON.parse(parsedJson);
    }
    if (!parsedJson) {
      throw new Error('Invalid response JSON');
    }
    if (parsedJson.RESPUESTA === 'error') {
      throw new Error(parsedJson);
    }
    this.__pinPad__.config.loginResponse = parsedJson;
    localStorage.setItem(
      'ppLoginResponse',
      JSON.stringify({
        timestamp: new Date().getTime(),
        data: parsedJson,
      })
    );
    return await this.#loginResponse();
  }

  async #loginResponse() {
    await this.#getPublicIp();
    try {
      await this.#getPosition();
    } catch (e) {
      console.log('Error getting position', e);
    }
    this.__pinPad__.config.otherLogin = {};
    this.#processResponseLogin(this.__pinPad__.config.loginResponse);
    return this.__pinPad__.config.otherLogin;
  }

  #processResponseLogin(parsedJson) {
    let merchantCurrencyB = '';
    let merchantCurrencyM = '';
    if (parsedJson.xml?.ventaspropias?.merchant_currencyb) {
      merchantCurrencyB = parsedJson.xml.ventaspropias.merchant_currencyb;
    }
    if (parsedJson.xml?.ventaspropias?.merchant_currencym) {
      merchantCurrencyM = parsedJson.xml.ventaspropias.merchant_currencym;
    }
    let emvReverso = parsedJson.xml?.emvReverso;
    if (!emvReverso) {
      emvReverso = '0';
    }
    this.__pinPad__.config.internal.stTokenization = parsedJson.xml?.st_tokenizacion;

    if (
      !this.__pinPad__.config.internal.stTokenization ||
      this.__pinPad__.config.internal.stTokenization === 'false' ||
      this.__pinPad__.config.internal.stTokenization === '0'
    ) {
      this.__pinPad__.config.internal.stTokenization = false;
    } else if (this.__pinPad__.config.internal.stTokenization) {
      this.__pinPad__.config.internal.stTokenization = true;
    }
    this.__pinPad__.config.internal.emv = parsedJson.xml.importesPGS;
    this.__pinPad__.config.internal.qpsDomestic = this.__pinPad__.config.internal.emv.qps_dom;
    this.__pinPad__.config.internal.qpsInternational = this.__pinPad__.config.internal.emv.qps_il;
    this.__pinPad__.config.internal.cvmlVMCDomestic = this.__pinPad__.config.internal.emv.cvml_vm_dom;
    this.__pinPad__.config.internal.cvmlVMCInternational = this.__pinPad__.config.internal.emv.cvml_vm_il;
    this.__pinPad__.config.internal.cvmlAmex = this.__pinPad__.config.internal.emv.cvml_amex;
    this.__pinPad__.config.internal.translimitCTLSVMC = this.__pinPad__.config.internal.emv.tl_mc;
    this.__pinPad__.config.internal.translimitCTLSAmex = this.__pinPad__.config.internal.emv.tl_amex;

    this.__pinPad__.config.country = parsedJson.country.toUpperCase();
    this.__pinPad__.config.idBranch = parsedJson.id_branch.toUpperCase();
    this.__pinPad__.config.idCompany = parsedJson.id_company.toUpperCase();
    this.__pinPad__.config.otherLogin = {
      bsUser: parsedJson.user,
      nbUser: parsedJson.nb_user,
      bsCompany: parsedJson.id_company,
      nbCompany: parsedJson.nb_company,
      nbStreetCompany: parsedJson.nb_companystreet,
      bsBranch: parsedJson.id_branch,
      nbBranch: parsedJson.nb_branch,
      bsCountry: parsedJson.country,
      coins: merchantCurrencyB,
      coinsMOTO: merchantCurrencyM,
      executeReverse: emvReverso,
    };
  }

  #recoverLogin() {
    let oldLogin = localStorage.getItem('ppLoginResponse');
    if (oldLogin) {
      oldLogin = JSON.parse(oldLogin);
      if (!this.__pinPad__.config.loginResponse) {
        this.__pinPad__.config.loginResponse = oldLogin.data;
      }
      let now = new Date().getTime();
      let diff = now - oldLogin.timestamp;
      // 24h
      if (diff >= 86400000) {
        this.__pinPad__.config.loginResponse = null;
      }
    }
  }

  async login({ force = false } = {}) {
    return await this.#xhrLogin(force);
  }

  async #fetchRSAPublicKey() {
    const url = this.url + this.__pinPad__.constants.uris.RSAKey;
    const response = await axios.get(url).catch((error) => {
      throw new Error(`Error in request, verify internet connection: ${error.response.status} ${error.message}`);
    });
    if (response.headers.get('content-type').indexOf('application/json') === -1) {
      throw new Error('Fail to fetch RSA public key');
    }
    this.__pinPad__.config.publicKeyRSA = response.data.key_public;
    localStorage.setItem(
      'ppRSAKey',
      JSON.stringify({
        timestamp: new Date().getTime(),
        data: response.data.key_public,
      })
    );
    return this.__pinPad__.config.publicKeyRSA;
  }

  clearSession() {
    localStorage.removeItem('ppLoginResponse');
    localStorage.removeItem('ppRSAKey');
    localStorage.removeItem('ppPublicIP');
  }

  #isEmptyRSAKey() {
    let storage = localStorage.getItem('ppRSAKey');
    if (!storage) return true;

    storage = JSON.parse(storage);
    this.__pinPad__.config.publicKeyRSA = storage.data;
    let now = new Date().getTime();
    let diff = now - storage.timestamp;
    // 24h
    if (diff >= 86400000) return true;
    return !this.__pinPad__.config.publicKeyRSA;
  }

  async #getRSAKey() {
    if (this.#isEmptyRSAKey()) {
      return await this.#fetchRSAPublicKey();
    }
    return this.__pinPad__.config.publicKeyRSA;
  }

  async #loadRSAKeyLocal() {
    const key = await this.#getRSAKey();
    if (!key) {
      throw new Error('RSA public key is empty');
    }
  }

  #validateReference(reference) {
    return /^[A-Z-a-z0-9\s]+$/g.test(reference);
  }

  #validateReferenceWithBlank(reference) {
    if (isEmpty(reference)) {
      return true;
    }
    const isValid = /^[A-Z-a-z0-9\s]+$/g.test(reference) === true;
    if (!isValid) {
      throw new Error('Invalid reference');
    }
    return isValid;
  }

  #calcLength(data) {
    return data.length.toString().padStart(3, '0');
  }

  #calcLRC(data) {
    let lrc = 0;
    for (let i = 0; i < data.length; i++) {
      lrc ^= data.charCodeAt(i);
    }
    return String.fromCharCode(lrc);
  }

  #formatNumber(number, decimals = 0) {
    number = parseFloat(number.toString().replace(/[^0-9.-]/g, ''));
    if (isNaN(number)) {
      return (0).toFixed(decimals);
    }
    return number.toFixed(decimals).replace(/,/g, '');
  }

  #validateAmount(amount) {
    amount = parseFloat(amount.toString());
    return !(isNaN(amount) || amount < 0);
  }

  async #validateObject(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'undefined' || obj[key] === null || obj[key] === '') {
        throw new Error('Object incomplete to process');
      }
    }
    return obj;
  }

  #validateOperationNumber(op) {
    if (!op || isNaN(parseInt(op)) || op.toString().length !== 9) {
      throw new Error('Number of operation must be number of 9 digits');
    }
    return op;
  }

  #validateString(input) {
    if (typeof input !== 'string') throw new Error('Invalid string');
    const regex = /<html(?:\s+lang=["'][^"']*["'])?>/i;
    if (!input || regex.test(input)) {
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

  async #cancel() {
    const STX = this.__pinPad__.constants.STX;
    const ETX = this.__pinPad__.constants.ETX;
    let command = 'C55ACANCEL';
    command = STX + this.#calcLength(command) + command + ETX;
    command = command + this.#calcLRC(command);
    const arr = this.parseStringToBytes(command, '');
    await this.appendToQueue(arr, 'cancel');
  }

  #getDate() {
    const date = new Date();
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().substring(2);
    return day + month + year;
  }

  #getHour() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return hours + minutes;
  }

  async checkPositionPermission() {
    if (!supportGeolocation()) {
      throw new Error('Geolocation not supported');
    }
    return new Promise((resolve, reject) => {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((result) => {
          if (result.state === 'granted') {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(() => reject(false));
    });
  }

  async #getPosition() {
    if (this.__pinPad__.config.latitude && this.__pinPad__.config.longitude) {
      return this.latitudeLongitude;
    }

    this.__pinPad__.config.latitude = null;
    this.__pinPad__.config.longitude = null;
    if (!supportGeolocation()) {
      return this.latitudeLongitude;
    }
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.__pinPad__.config.latitude = position.coords.latitude;
          this.__pinPad__.config.longitude = position.coords.longitude;
          resolve(this.latitudeLongitude);
        },
        () => {
          resolve(this.latitudeLongitude);
        }
      );
    });
  }

  async #getPublicIp() {
    let storage = localStorage.getItem('ppPublicIP');
    if (storage) {
      storage = JSON.parse(storage);
      this.__pinPad__.config.publicIP = storage.data;
      let now = new Date().getTime();
      let diff = now - storage.timestamp;
      // 24h
      if (diff >= 86400000) {
        this.__pinPad__.config.publicIP = null;
      }
    }

    if (this.__pinPad__.config.publicIP) return this.__pinPad__.config.publicIP;

    this.__pinPad__.config.publicIP = null;
    let stop = false;
    const response = await axios.get('https://api.ipify.org?format=json').catch(() => (stop = true));
    if (stop) return null;
    this.__pinPad__.config.publicIP = response.data.ip || null;
    localStorage.setItem(
      'ppPublicIP',
      JSON.stringify({
        timestamp: new Date().getTime(),
        data: response.data.ip,
      })
    );
    return this.__pinPad__.config.publicIP;
  }

  async cancelReadCard() {
    let command = '\x02012VXVCANCEL\x03l';
    if (this.__pinPad__.about.model.toLowerCase() === 'ingenico') {
      command = '\x02029C50AOPERACION       CANCELADA\x03\x1D';
    }
    const arr = this.parseStringToBytes(command, '');
    await this.appendToQueue(arr, 'cancel-read-card');
  }

  async print(voucherType = 'client') {
    this.__pinPad__.operation.errors = 0;
    const STX = this.__pinPad__.constants.STX;
    const ETX = this.__pinPad__.constants.ETX;

    if (!this.__pinPad__.operation.commerceVoucher.includes(':')) {
      this.__pinPad__.operation.commerceVoucher = this.#RC4Decrypt(
        this.__pinPad__.config.RC4Key,
        this.__pinPad__.operation.commerceVoucher
      );
    }
    if (!this.__pinPad__.operation.clientVoucher.includes(':')) {
      this.__pinPad__.operation.clientVoucher = this.#RC4Decrypt(
        this.__pinPad__.config.RC4Key,
        this.__pinPad__.operation.clientVoucher
      );
    }

    let voucher =
      voucherType === 'client' ? this.__pinPad__.operation.clientVoucher : this.__pinPad__.operation.commerceVoucher;

    if (voucher.length === 0) {
      this.dispatch('pp:print', {
        error: true,
        code: '001',
        message: 'Without information to print',
      });
      return;
    }
    voucher = this.#removeAccents(voucher);
    voucher = this.#processReceipt(voucher, this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion);
    let command = 'C59A' + voucher;
    command = STX + this.#calcLength(command) + command + ETX;
    command = command + this.#calcLRC(command);
    if (voucherType === 'client') {
      this.__pinPad__.operation.clientVoucher = '';
    } else if (voucherType === 'commerce') {
      this.__pinPad__.operation.commerceVoucher = '';
    }
    const arr = this.parseStringToBytes(command, '');
    await this.appendToQueue(arr, 'print');
  }

  async #postMITRequest(url, data) {
    await this.#loadRSAKeyLocal();

    const aesKey = this.#generateKey(32);
    let encryptedKey = this.#crypt(this.__pinPad__.config.publicKeyRSA, aesKey);
    let encryptedData = await this.#AESEncrypt(aesKey, JSON.stringify(data));

    const response = await axios
      .post(url, encryptedData, {
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
          data: encryptedKey || '',
        },
      })
      .catch((error) => {
        if (error.response.data.includes('Ha ocurrido un error al procesar su solicitud.')) {
          throw new Error('It was not possible to obtain the affiliations.');
        }
        if (error.response.status >= 500 && error.response.status <= 599) {
          throw new Error(`Service Temporarily Unavailable ${error.message}`);
        }

        throw new Error(`Error in request, verify internet connection: ${error.response?.status} ${error.message}`);
      });

    return response.data;
  }

  // async getMerchantMOTO() {
  //   this.__pinPad__.operation.errors = 0;
  //   this.__pinPad__.operation.ignore.counterSale = false;
  //   await this.#validateObject({
  //     Ambiente: this.environment,
  //     BIN: this.__pinPad__.operation.bin8,
  //     User: this.username,
  //     Currency: this.__pinPad__.config.currency,
  //     Tx_OperationType: '',
  //   });
  //   const response = await this.#postMITRequest(this.url + this.__pinPad__.constants.uris.merchant, {
  //     accion: 'tipoPagoInfo',
  //     cc_num: this.__pinPad__.operation.bin8,
  //     usuario: this.username.toUpperCase(),
  //     canal: '',
  //     tp_canal: 'B',
  //     tp_moneda: this.__pinPad__.config.currency.toUpperCase(),
  //   });
  //   if (!response || response === '{}' || response.includes('Ha ocurrido un error al procesar su solicitud.')) {
  //     throw new Error('It was not possible to obtain the affiliations.');
  //   }
  //   this.dispatch('pp:merchant-moto', response);
  //   return response;
  // }

  async #mitPostRequest({ data, url, cancelable = false } = {}) {
    await this.#loadRSAKeyLocal();
    const aesKey = this.#generateKey(32);
    const encryptedKey = this.#crypt(this.__pinPad__.config.publicKeyRSA, aesKey);
    const encryptedData = await this.#AESEncrypt(aesKey, JSON.stringify(data));
    const this1 = this;

    const response = await axios
      .post(url, encryptedData, {
        headers: {
          'Content-Type': 'application/json',
          'cache-control': 'no-cache',
          data: encryptedKey || '',
        },
      })
      .catch(async (error) => {
        let message = `Error in request, verify internet connection: ${error.status} ${error.message}`;
        if (error.response.status >= 500 && error.response.status <= 599) {
          message = 'Service Temporarily Unavailable';
        } else if (error.response.status >= 400 && error.response.status <= 499) {
          message = 'Bad Request';
        }

        if (cancelable) {
          await this1.#cancel();
        }
        throw new Error(message);
      });

    return response.data;
  }

  async #injectValuesEMV() {
    const FS = this.__pinPad__.constants.FS;
    const ETX = this.__pinPad__.constants.ETX;
    const STX = this.__pinPad__.constants.STX;

    let command = 'C57A' + this.__pinPad__.config.internal.qpsDomestic;
    command = command + FS + 'B' + this.__pinPad__.config.internal.qpsInternational;
    command = command + FS + 'C' + this.__pinPad__.config.internal.cvmlVMCDomestic;
    command = command + FS + 'D' + this.__pinPad__.config.internal.cvmlVMCInternational;
    command = command + FS + 'E' + this.__pinPad__.config.internal.cvmlAmex;
    command = command + FS + 'F' + this.__pinPad__.config.internal.translimitCTLSVMC;
    command = command + FS + 'G' + this.__pinPad__.config.internal.translimitCTLSAmex;
    command = STX + this.#calcLength(command) + command + ETX;
    command = command + this.#calcLRC(command);
    if (!this.__pinPad__.about.injectedValues) {
      const arr = this.parseStringToBytes(command, '');
      await this.appendToQueue(arr, 'inject');
    }
  }

  async #getMerchant() {
    if (this.__pinPad__.operation.bin8) {
      this.__pinPad__.operation.bin = this.__pinPad__.operation.bin8;
    }
    this.__pinPad__.operation.bin8 = '';
    const response = await this.#mitPostRequest({
      data: {
        accion: 'tipoPagoInfo',
        cc_num: this.__pinPad__.operation.bin,
        usuario: this.username.toUpperCase(),
        canal: this.__pinPad__.constants.typeChannel,
        tp_canal: '1',
        tp_moneda: this.__pinPad__.config.currency.toUpperCase(),
      },
      url: this.url + this.__pinPad__.constants.uris.merchant,
      cancelable: true,
    });

    if (!response.respuesta || response.respuesta === '0') {
      let cancelCommandString = 'C55ACANCEL';
      const STX = this.__pinPad__.constants.STX;
      const ETX = this.__pinPad__.constants.ETX;
      cancelCommandString = STX + this.#calcLength(cancelCommandString) + cancelCommandString + ETX;
      cancelCommandString = cancelCommandString + this.#calcLRC(cancelCommandString);
      const arr = this.parseStringToBytes(cancelCommandString, '');
      await this.appendToQueue(arr, 'cancel');
      return false;
    }

    this.__pinPad__.operation.merchant = response;
    this.__pinPad__.operation.onlyMerchant =
      response.contado.af.length > 1 ? response.contado.af[0].merchant : response.contado.af.merchant;

    return true;
  }

  /**
   * @param {function|null} callback
   * @return {Promise<unknown>}
   */
  async #aboutPinPad(callback = null) {
    if (this.__pinPad__.waiting.statusAboutWaiting) throw new Error('AboutPP is already running');

    const STX = this.__pinPad__.constants.STX;
    const ETX = this.__pinPad__.constants.ETX;
    let command = 'C56AABOUT';
    command = STX + this.#calcLength(command) + command + ETX;
    command = command + this.#calcLRC(command);
    if (isEmpty(this.__pinPad__.about.pp)) {
      this.__pinPad__.waiting.statusAboutWaiting = 'pending';
      const arr = this.parseStringToBytes(command, '');
      await this.appendToQueue(arr, 'about');
    } else {
      if (!callback) return true;

      return callback(this.__pinPad__.about.pp.supportDUKPT, this.__pinPad__.about.pp.hasDUKPTKeys);
    }

    const this1 = this;
    let interval = 0;
    return new Promise((resolve, reject) => {
      interval = setInterval(() => {
        if (this1.__pinPad__.waiting.statusAboutWaiting === 'resolved') {
          clearInterval(interval);
          this1.__pinPad__.waiting.statusAboutWaiting = null;
          if (isEmpty(this1.__pinPad__.about.pp)) {
            return;
          }
          if (!callback) resolve(true);

          resolve(callback(this1.__pinPad__.about.pp.supportDUKPT, this1.__pinPad__.about.pp.hasDUKPTKeys));
        } else if (this1.__pinPad__.waiting.statusAboutWaiting === 'rejected') {
          clearInterval(interval);
          this1.__pinPad__.waiting.statusAboutWaiting = null;
          reject('Error');
        }
      }, 500);
    });
  }

  async #initDUKPT(supportsDUKPT, hasDUKPTKeys) {
    supportsDUKPT = !supportsDUKPT ? '' : supportsDUKPT.toString();
    hasDUKPTKeys = !hasDUKPTKeys ? '' : hasDUKPTKeys.toString();
    if (isEmpty(supportsDUKPT) || supportsDUKPT === '0') {
      this.dispatch('pp:dukpt', { status: 'unsupported', already: false });
      return;
    }
    if (isEmpty(hasDUKPTKeys) || hasDUKPTKeys === '1') {
      this.dispatch('pp:dukpt', { status: 'charged', already: true });
      return;
    }

    const date = this.#getDate();
    const time = this.#getHour();
    const FS = this.__pinPad__.constants.FS;
    const ETX = this.__pinPad__.constants.ETX;
    const STX = this.__pinPad__.constants.STX;

    let command = 'C91A' + date + FS + 'B' + time;
    command = STX + this.#calcLength(command) + command + ETX;
    command = command + this.#calcLRC(command);
    const arr = this.parseStringToBytes(command, '');
    await this.appendToQueue(arr, 'init-dukpt');

    let interval = 0;
    this.__pinPad__.waiting.statusinitDUKPTWaiting = 'pending';
    const this1 = this;
    return new Promise((resolve, reject) => {
      interval = setInterval(async () => {
        if (this1.__pinPad__.waiting.statusinitDUKPTWaiting === 'resolved') {
          clearInterval(interval);
          this1.__pinPad__.waiting.statusinitDUKPTWaiting = null;
          this1.dispatch('pp:dukpt', { status: 'charged', already: false });
          await this1.#writeDUKPTKeys();
          resolve(true);
        } else if (this1.__pinPad__.waiting.statusinitDUKPTWaiting === 'rejected') {
          clearInterval(interval);
          this1.__pinPad__.waiting.statusinitDUKPTWaiting = null;
          reject('Error');
        }
      }, 500);
    });
  }

  async #writeDUKPTKeys() {
    const request = {
      IPEK_REQUESTType: {
        business: {
          country: this.__pinPad__.config.country.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany.toUpperCase(),
          pwd: this.password.toUpperCase(),
          user: this.username.toUpperCase(),
        },
        terminal: this.__pinPad__.config.terminal,
      },
    };
    const response = await this.#mitPostRequest({
      data: request,
      url: this.url + this.__pinPad__.constants.uris.keysDUKPT,
    });
    await this.#writeKeysDUKPT(response);
  }

  async #getKeyRSA() {
    const key = await this.#getRSAKey();
    if (!key) {
      throw new Error('RSA public key is empty');
    }
    const this1 = this;
    await this.#aboutPinPad(async function callback(supportsDUKPT, hasDUKPTKeys) {
      if (
        this1.__pinPad__.about.supportInjection &&
        this1.__pinPad__.config.internal.emv &&
        this1.__pinPad__.about.injectedValues
      ) {
        await this1.#initDUKPT(supportsDUKPT, hasDUKPTKeys);
        return true;
      }
      let interval = 0;
      this1.__pinPad__.waiting.statusInjectWaiting = 'pending';
      await this1.#injectValuesEMV();
      return new Promise((resolve, reject) => {
        interval = setInterval(async () => {
          if (this1.__pinPad__.waiting.statusInjectWaiting === 'resolved') {
            clearInterval(interval);
            this1.__pinPad__.waiting.statusInjectWaiting = null;
            await this1.#initDUKPT(supportsDUKPT, hasDUKPTKeys);
            resolve(true);
          } else if (this1.__pinPad__.waiting.statusInjectWaiting === 'rejected') {
            clearInterval(interval);
            this1.__pinPad__.waiting.statusInjectWaiting = null;
            reject('Error');
          }
        }, 500);
      });
    });
  }

  #formatAmount(amount, decimals = 0) {
    amount = parseFloat(amount.toString().replace(/[^0-9.-]/g, ''));
    if (isNaN(amount) || amount === 0) {
      return parseFloat((0).toString()).toFixed(decimals);
    }
    amount = amount.toFixed(decimals);
    let parts = amount.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '');
    return parts.join('.');
  }

  getClientVoucher() {
    return this.__pinPad__.operation.clientVoucher;
  }

  getCommerceVoucher() {
    return this.__pinPad__.operation.commerceVoucher;
  }

  async #readCard() {
    this.__pinPad__.operation.errors = 0;

    let message = 'ACERQUE, INSERTE CHIP O  DESLICE TARJETA';
    if (!this.__pinPad__.about.supportContactless) {
      message = 'INSERTE CHIP O  DESLICE TARJETA';
    }
    if (this.__pinPad__.about.model.toUpperCase().includes('UX300')) {
      message = 'ACERQUE O INSERTE TARJETA';
    }
    if (isEmpty(this.amount) || this.amount <= 0) {
      throw new Error('Amount required');
    }
    if (this.#validateAmount(this.amount) === false) {
      throw new Error('Invalid amount required');
    }
    if (this.#formatNumber(this.amount, 2) <= 0) {
      throw new Error('Amount must be greater than 0');
    }

    const FS = this.__pinPad__.constants.FS;
    const STX = this.__pinPad__.constants.STX;
    const ETX = this.__pinPad__.constants.ETX;

    let command = 'C93A' + message;
    command = command + FS + 'B' + this.#getDate();
    command = command + FS + 'C' + this.#getHour();
    command = command + FS + 'D' + this.#formatNumber(this.amount, 2);
    command = command + FS + 'E0.00';
    command = command + FS + 'F' + this.__pinPad__.config.currencyCode;
    if (
      this.__pinPad__.about.supportDUKPT &&
      this.__pinPad__.about.supportDUKPT !== '0' &&
      this.__pinPad__.about.supportDUKPT !== 'false'
    ) {
      if (this.__pinPad__.about.supportContactless) {
        command = command + FS + 'G' + this.timeoutPinPad;
        command = command + FS + 'HTAGS';
        command = command + FS + 'I' + this.__pinPad__.config.requireCVVAmex;
        command = command + FS + 'J' + this.__pinPad__.config.forceOnline;
        command = command + FS + 'K' + this.__pinPad__.about.supportContactless;
        command = command + FS + 'L' + this.__pinPad__.config.emvCard;
        if (this.__pinPad__.about.hasCashback) {
          command = command + FS + 'M0';
          command = command + FS + 'N00';
        }
      } else {
        command = command + FS + 'G' + this.timeoutPinPad;
        command = command + FS + 'HTAGS';
        command = command + FS + 'I' + this.__pinPad__.config.requireCVVAmex;
        command = command + FS + 'L' + this.__pinPad__.config.emvCard;
      }

      if (this.__pinPad__.about.supportInjection) {
        command = command + FS + 'O' + this.__pinPad__.config.validateQPS;
      }
    }
    command = STX + this.#calcLength(command) + command + ETX;
    command = command + this.#calcLRC(command);

    this.#clear();
    const arr = this.parseStringToBytes(command, '');
    await this.appendToQueue(arr, 'read-card');

    let interval = 0;
    const this1 = this;
    this.__pinPad__.waiting.statusReadCardWaiting = 'pending';
    return new Promise((resolve, reject) => {
      interval = setInterval(() => {
        if (this1.__pinPad__.waiting.statusReadCardWaiting === 'resolved') {
          clearInterval(interval);
          this1.__pinPad__.waiting.statusReadCardWaiting = null;
          resolve(true);
        } else if (this1.__pinPad__.waiting.statusReadCardWaiting === 'rejected') {
          clearInterval(interval);
          this1.__pinPad__.waiting.statusReadCardWaiting = null;
          const err = this1.__pinPad__.operation.last_error;
          reject(err ?? 'Error reading card');
        }
      }, 500);
    });
  }

  async #waitSeconds(seconds) {
    return await wait(seconds * 1000);
  }

  /**
   * @param {null|string} reference
   * @return {Promise<any>}
   */
  async consult({ reference = null }) {
    if (!reference) {
      reference = this.reference;
    }
    if (isEmpty(reference)) {
      reference = '--';
      this.reference = reference;
    }
    this.#validateReferenceWithBlank(this.reference);
    this.__pinPad__.operation.consultDate = new Date().toLocaleDateString('en-GB');

    await this.#validateObject({
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      Tx_Date: this.__pinPad__.operation.consultDate,
    });

    return this.#postMITRequest(this.url + this.__pinPad__.constants.uris.consult, {
      user: this.username.toUpperCase(),
      pwd: this.password.toUpperCase(),
      id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
      id_company: this.__pinPad__.config.idCompany.toUpperCase(),
      date: this.__pinPad__.operation.consultDate,
      reference: this.reference,
    });
  }

  async #internalConsultation(attempt) {
    let url = this.url + this.__pinPad__.constants.uris.consult;
    if (attempt > 1 && this.environment === 'production') {
      url = url.replace(
        this.__pinPad__.constants.urls.production,
        this.__pinPad__.constants.urls.productionAlternative
      );
    }
    this.__pinPad__.operation.consultDate = new Date().toLocaleDateString('en-GB');
    return await this.#postMITRequest(url, {
      user: this.username.toUpperCase(),
      pwd: this.password.toUpperCase(),
      id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
      id_company: this.__pinPad__.config.idCompany.toUpperCase(),
      date: this.__pinPad__.operation.consultDate,
      reference: this.reference,
    });
  }

  async #postDataMIT(url = '', data = {}) {
    let attempt = 1;
    let _error = null;
    do {
      if (attempt > 1 && this.environment === 'production') {
        url = url.replace(
          this.__pinPad__.constants.urls.production,
          this.__pinPad__.constants.urls.productionAlternative
        );
        await this.#waitSeconds(5);
      }

      await this.#loadRSAKeyLocal();
      const aesKey = this.#generateKey(32);
      const encryptedKey = this.#crypt(this.__pinPad__.config.publicKeyRSA, aesKey);
      const encryptedData = await this.#AESEncrypt(aesKey, JSON.stringify(data));

      let err = false;
      const response = await axios
        .post(url, encryptedData, {
          headers: {
            'Content-Type': 'application/json',
            data: encryptedKey || '',
          },
        })
        .catch(async (error) => {
          let message = `Error in request, verify internet connection: ${error.status} ${error.message}`;
          if (error.response.status >= 500 && error.response.status <= 599) {
            message = 'Service Temporarily Unavailable';
          } else if (error.response.status >= 400 && error.response.status <= 499) {
            message = 'Bad Request';
          }

          console.warn(error);
          _error = message;
          const consultResponse = await this.#internalConsultation(attempt);
          if (
            consultResponse &&
            consultResponse !== '{}' &&
            !consultResponse.includes('"transacciones":""') &&
            consultResponse.includes('nu_operaion')
          ) {
            attempt = 5;
            _error = 'EE32';
          }
          err = true;
        });
      if (err) continue;
      return response.data;
    } while (attempt++ <= 3);
    if (_error) return Promise.reject(_error);

    return Promise.reject('Communication error with CDP. IL/MTY');
  }

  #validateAuthorizationNumber(authorization) {
    if (isEmpty(authorization)) throw new Error('Number of authorization invalid');
    if (/^[A-Za-z0-9]+$/g.test(authorization) !== true) throw new Error('Number of authorization invalid');
    if (authorization.length !== 6) throw new Error('Number of authorization invalid');
    return true;
  }

  /**
   * @param {number|string|null} folio
   * @return {Promise<any>}
   */
  async rePrint({ folio = null } = {}) {
    if (folio === null) {
      folio = this.__pinPad__.operation.folio || '';
    }
    this.#validateOperationNumber(folio);

    await this.#validateObject({
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      Tx_OperationNumber: folio,
    });

    const response = await this.#postMITRequest(this.url + this.__pinPad__.constants.uris.rePrint, {
      REPRINTVOUCHER: {
        business: {
          country: this.__pinPad__.config.country.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany.toUpperCase(),
          pwd: this.password.toUpperCase(),
          user: this.username.toUpperCase(),
        },
        no_operacion: folio,
        crypto: '2',
      },
    });

    let voucher = response.voucher_comercio;
    this.__pinPad__.operation.commerceVoucher = '';
    if (voucher) {
      if (response.voucher_comercio.includes(':')) {
        this.__pinPad__.operation.commerceVoucher = response.voucher_comercio;
      } else {
        this.__pinPad__.operation.commerceVoucher = this.#RC4Decrypt(
          this.__pinPad__.config.RC4Key,
          response.voucher_comercio
        );
      }
    }

    voucher = response.voucher_cliente;
    this.__pinPad__.operation.clientVoucher = '';
    if (voucher) {
      if (response.voucher_cliente.includes(':')) {
        this.__pinPad__.operation.clientVoucher = response.voucher_cliente;
      } else {
        this.__pinPad__.operation.clientVoucher = this.#RC4Decrypt(
          this.__pinPad__.config.RC4Key,
          response.voucher_cliente
        );
      }
    }
    return response;
  }

  // jsonTokenization() {
  //   // build json "11"
  //   return {
  //     TOKENIZATION_TP: {
  //       business: {
  //         id_company: this.__pinPad__.config.idCompany,
  //         id_branch: this.__pinPad__.config.idBranch,
  //         user: this.username,
  //         pwd: this.password,
  //       },
  //       transacction_tkn: {
  //         version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion,
  //         serie: this.__pinPad__.about.serial,
  //         version_terminal: this.__pinPad__.about.appVersion,
  //         modelo_terminal: this.__pinPad__.about.model,
  //       },
  //       dukpt: {
  //         tp_dukpt: '1',
  //         nb_ksn: this.__pinPad__.config.read.NB_ksn,
  //         nb_data: this.__pinPad__.config.read.NB_Data,
  //       },
  //       tkn_reference: this.reference,
  //       geolocation: {
  //         latitude: this.__pinPad__.config.latitude,
  //         longitude: this.__pinPad__.config.longitude,
  //         ip: this.__pinPad__.config.publicIP,
  //       },
  //     },
  //   };
  // }

  #validateResponseCentralPayment(response) {
    const this1 = this;
    this.__pinPad__.operation.responseMit._approved = response.response === 'approved';
    this.__pinPad__.operation.responseMit._status = response.response;
    this.__pinPad__.operation.responseMit._originalToken = response.number_tkn ?? '';
    this.__pinPad__.operation.folio = response.foliocpagos;
    this.__pinPad__.operation.authorization = response.auth;

    let cdResponse = response.cd_response?.toUpperCase();
    if (cdResponse.toUpperCase() === '0C') {
      cdResponse = '00';
    } else if (this.__pinPad__.operation.responseMit._approved) {
      cdResponse = '00';
    } else if (cdResponse !== 'Z3' && cdResponse !== '05') {
      cdResponse = '01';
    } else if (response.cd_error === '92') {
      cdResponse = '01';
    }

    this.__pinPad__.operation.responseMit._cdResponse = cdResponse;

    this.__pinPad__.finishCommand.A = cdResponse;
    this.__pinPad__.finishCommand.B = '';
    this.__pinPad__.finishCommand.C = '';
    this.__pinPad__.finishCommand.D = '';
    this.__pinPad__.finishCommand.E = !response.emv_key_date ? '' : response.emv_key_date;
    this.__pinPad__.finishCommand.F = !response.icc_csn ? '' : response.icc_csn;
    this.__pinPad__.finishCommand.G = !response.icc_atc ? '' : response.icc_atc;
    this.__pinPad__.finishCommand.H = !response.icc_arpc ? '' : response.icc_arpc;
    this.__pinPad__.finishCommand.I = !response.icc_issuer_script ? '' : response.icc_issuer_script;
    this.__pinPad__.finishCommand.J = !response.authorized_amount ? '' : response.authorized_amount;
    this.__pinPad__.finishCommand.K = !response.account_balance_1 ? '' : response.account_balance_1;

    return {
      reference: response.reference,
      response: response.response,
      foliocpagos: response.foliocpagos,
      auth: response.auth,
      cd_response: cdResponse,
      cd_error: response.cd_error,
      nb_error: this1.#validateString(response.nb_error ?? ''),
      time: response.time,
      date: response.date,
      nb_company: response.nb_company,
      nb_merchant: response.nb_merchant,
      nb_street: response.nb_street,
      cc_type: response.cc_type,
      tp_operation: response.tp_operation,
      cc_name: response.cc_name,
      cc_number: response.cc_number,
      cc_expmonth: response.cc_expmonth,
      cc_expyear: response.cc_expyear,
      amount: response.amount,
      voucher_comercio: response.voucher_comercio,
      voucher_cliente: response.voucher_cliente,
      friendly_response: response.friendly_response,
      appid: response.appid,
      appidlabel: response.appidlabel,
      arqc: response.arqc,
    };
  }

  async cancelPurchase({ amount = 0, authorization = '', folio = '' } = {}) {
    if (!this.#validateAmount(amount)) throw new Error('Invalid amount');
    if (!this.#validateAuthorizationNumber(authorization)) throw new Error('Invalid authorization');
    if (!this.#validateOperationNumber(folio)) throw new Error('Invalid folio');
    amount = this.#formatAmount(amount, 2);
    const object = {
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      UserTRX: 'userPinpadWeb',
      Tx_OperationNumber: folio,
      Tx_Auth: authorization,
      Amount: amount,
    };
    await this.#validateObject(object);

    const response = this.#postMITRequest(this.url + this.__pinPad__.constants.uris.cancellation, {
      VMCAMEXMCANCELACION: {
        business: {
          country: this.__pinPad__.config.country.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany.toUpperCase(),
          pwd: this.password.toUpperCase(),
          user: this.username.toUpperCase(),
        },
        transacction: {
          amount: amount,
          auth: authorization.toUpperCase(),
          crypto: '2',
          no_operacion: folio,
          usrtransacction: this.username.toUpperCase(),
          version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion,
        },
      },
    });

    this.__pinPad__.operation.commerceVoucher = '';
    if (response.voucher_comercio) {
      if (response.voucher_comercio.includes(':')) {
        this.__pinPad__.operation.commerceVoucher = response.voucher_comercio;
      } else {
        this.__pinPad__.operation.commerceVoucher = this.#RC4Decrypt(
          this.__pinPad__.config.RC4Key,
          response.voucher_comercio
        );
      }
    }
    this.__pinPad__.operation.clientVoucher = '';
    if (response.voucher_cliente) {
      if (response.voucher_cliente.includes(':')) {
        this.__pinPad__.operation.clientVoucher = response.voucher_cliente;
      } else {
        this.__pinPad__.operation.clientVoucher = this.#RC4Decrypt(
          this.__pinPad__.config.RC4Key,
          response.voucher_cliente
        );
      }
    }

    return JSON.stringify(response);
  }

  async #sendSale() {
    const this1 = this;
    this.__pinPad__.operation.errors = 0;
    this.__pinPad__.operation.ignore.counterSale = false;

    const merchant = this.__pinPad__.operation.onlyMerchant;

    if (/^[0-9]+$/.test(merchant) === false) throw new Error('Invalid merchant');
    this.__pinPad__.operation.typeOperation = '29';
    let responseData = {
      error: false,
      message: null,
      approved: false,
      object: {},
    };

    try {
      const formattedAmount = await this.#formatAmount(this.amount, 2);
      //const formattedAmount = await this.#formatAmount(this.amountString, 2);
      await this.#validateObject({
        Ambiente: this.environment,
        Country: this.__pinPad__.config.country,
        IdBranch: this.__pinPad__.config.idBranch,
        IdCompany: this.__pinPad__.config.idCompany,
        pwd: this.password,
        User: this.username,
        UserTRX: 'userPinpadWeb',
        EMV: this.__pinPad__.config.read.EMV,
        ModeloTerminal: this.__pinPad__.about.model,
        SerieTerminal: this.__pinPad__.about.serial,
        Contactless: this.__pinPad__.about.supportContactless,
        Printer: this.__pinPad__.about.printer,
        VersionTerminal: this.__pinPad__.about.appVersion,
        TpOperation: this.__pinPad__.operation.typeOperation,
        Reference: this.reference,
        Amount: formattedAmount,
        Currency: this.__pinPad__.config.currency,
        Merchant: merchant,
        Reverse: this.__pinPad__.config.otherLogin.executeReverse,
      });

      const isContactless =
        this.__pinPad__.about.supportContactless && this.__pinPad__.about.supportContactless !== '0' ? '1' : '0';

      const response = await this.#postDataMIT(this.url + this.__pinPad__.constants.uris.sale, {
        VMCAMEXB: {
          business: {
            country: this.__pinPad__.config.country.toUpperCase(),
            id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
            id_company: this.__pinPad__.config.idCompany.toUpperCase(),
            pwd: this.password.toUpperCase(),
            user: this.username.toUpperCase(),
          },
          dcc: {
            dcc_amount: '0',
            dcc_status: '0',
          },
          transacction: {
            amount: formattedAmount,
            creditcard: {
              appid: this.__pinPad__.config.read.AppId,
              appidlabel: this.__pinPad__.config.read.AppIdLabel,
              arqc: this.__pinPad__.config.read.Arqc,
              chip: this.__pinPad__.config.read.Chip,
              chipname: this.__pinPad__.config.read.ChipName,
              chipnameenc: this.__pinPad__.config.read.ChipNameEnc,
              contactless: this.__pinPad__.config.read.ReadCTLS,
              crypto: '4',
              dukpt: {
                nb_data: this.__pinPad__.config.read.NB_Data,
                nb_ksn: this.__pinPad__.config.read.NB_ksn,
                tp_dukpt: '1',
              },
              pin: this.__pinPad__.config.read.PIN,
              posentrymode: this.__pinPad__.config.read.POSEM,
              tags: this.__pinPad__.config.read.Tags,
              type: this.__pinPad__.config.read.Type,
            },
            currency: this.__pinPad__.config.currency.toUpperCase(),
            emv: this.__pinPad__.config.read.EMV,
            merchant: this.__pinPad__.operation.onlyMerchant,
            modelo_terminal: this.__pinPad__.about.model,
            reference: this.reference,
            serie: this.__pinPad__.about.serial,
            terminal: {
              display: '1',
              is_contactless: isContactless,
              is_mobile: '0',
              printer: this.__pinPad__.about.printer,
            },
            tp_operation: this.__pinPad__.operation.typeOperation,
            tp_resp: this.__pinPad__.operation.typeResponse,
            usrtransacction: this.username.toUpperCase(),
            version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion,
            version_terminal: this.__pinPad__.about.appVersion,
          },
          geolocation: {
            latitude: this.__pinPad__.config.latitude,
            longitude: this.__pinPad__.config.longitude,
            ip: this.__pinPad__.config.publicIP,
          },
        },
      });
      if (response.response === 'error') {
        responseData.error = true;
        responseData.message = response.nb_error || 'Error in response';
      }
      const validated = this.#validateResponseCentralPayment(response);
      responseData.object = validated;
      await this.#finishEMV(validated);
      responseData.approved = this.__pinPad__.operation.responseMit._approved;
      this.__pinPad__.operation.finalResult = validated;
      return responseData;
    } catch (e) {
      this1.__pinPad__.finishCommand.A = '01';
      this1.__pinPad__.finishCommand.B = '';
      this1.__pinPad__.finishCommand.C = '';
      this1.__pinPad__.finishCommand.D = '';
      this1.__pinPad__.finishCommand.E = '';
      this1.__pinPad__.finishCommand.F = '';
      this1.__pinPad__.finishCommand.G = '';
      this1.__pinPad__.finishCommand.H = '';
      this1.__pinPad__.finishCommand.I = '';
      this1.__pinPad__.finishCommand.J = '';
      this1.__pinPad__.finishCommand.K = '';
      await this1.#finishEMVEnd(this1.#processError(e));
      throw e;
    }
  }

  async #finishEMV(response) {
    if (
      this.__pinPad__.config.read.POSEM === '022' ||
      this.__pinPad__.config.read.POSEM === '800' ||
      this.__pinPad__.config.read.ReadCTLS === '1'
    ) {
      this.dispatch('pp:finish-emv', response);
      return true;
    }

    const FS = this.__pinPad__.constants.FS;
    const STX = this.__pinPad__.constants.STX;
    const ETX = this.__pinPad__.constants.ETX;

    let command = 'C93A' + this.__pinPad__.finishCommand.A;
    command = command + FS + 'B' + this.__pinPad__.finishCommand.B;
    command = command + FS + 'C' + this.__pinPad__.finishCommand.C;
    command = command + FS + 'D' + this.__pinPad__.finishCommand.D;
    command = command + FS + 'E' + this.__pinPad__.finishCommand.E;
    command = command + FS + 'F' + this.__pinPad__.finishCommand.F;
    command = command + FS + 'G' + this.__pinPad__.finishCommand.G;
    command = command + FS + 'H' + this.__pinPad__.finishCommand.H;
    command = command + FS + 'I' + this.__pinPad__.finishCommand.I;
    command = command + FS + 'J' + this.__pinPad__.finishCommand.J;
    command = command + FS + 'K' + this.__pinPad__.finishCommand.K;
    command = STX + this.#calcLength(command) + command + ETX;
    command = command + this.#calcLRC(command);
    const arr = this.parseStringToBytes(command, '');
    this.__pinPad__.waiting.statusSecondGenerateWaiting = 'pending';
    await this.appendToQueue(arr, 'second-generate');
    let interval = 0;
    const this1 = this;
    return new Promise((resolve, reject) => {
      interval = setInterval(async () => {
        if (this1.__pinPad__.waiting.statusSecondGenerateWaiting === 'resolved') {
          clearInterval(interval);
          this1.__pinPad__.waiting.statusSecondGenerateWaiting = null;
          if (this1.__pinPad__.operation.applyReverse) {
            const waResponse = await this1.#postMITRequest(this1.url + this1.__pinPad__.constants.uris.reverse, {
              VMCAMEXMREVERSO: {
                business: {
                  id_company: this.__pinPad__.config.idCompany.toUpperCase(),
                  id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
                  country: this.__pinPad__.config.country.toUpperCase(),
                  user: this.username.toUpperCase(),
                  pwd: this.password.toUpperCase(),
                },
                transacction: {
                  amount: this.#formatNumber(this.amount, 2),
                  no_operacion: this.__pinPad__.operation.folio,
                  auth: this.__pinPad__.operation.authorization.toUpperCase(),
                  tracks: '',
                  usrtransacction: this.username.toUpperCase(),
                  crypto: '2',
                  version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion,
                },
              },
            });
            const parsedWsResponse = JSON.parse(waResponse);
            let errorResponse;
            if (parsedWsResponse.response === 'approved') {
              errorResponse = { message: 'Transaction rejected by PinPad.' };
            } else {
              errorResponse = { message: 'No communication, please check your report.' };
            }
            if (!this1.__pinPad__.operation.ignore.counterSale) {
              this1.dispatch('pp:finish-emv', errorResponse);
              this1.__pinPad__.operation.ignore.counterSale = true;
            }
          } else {
            if (!this1.__pinPad__.operation.ignore.counterSale) {
              this1.dispatch('pp:finish-emv', response);
              this1.__pinPad__.operation.ignore.counterSale = true;
            }
          }

          if (response.cd_error === '92') {
            await this1.#codeError92(response, command);
          }

          resolve(true);
        } else if (this1.__pinPad__.waiting.statusSecondGenerateWaiting === 'rejected') {
          clearInterval(interval);
          this1.__pinPad__.waiting.statusSecondGenerateWaiting = null;
          reject('There is no response from the reader, check that it is connected.');
        }
      }, 500);
    });
  }

  async #codeError92(dataResponse, C93) {
    this.__pinPad__.operation.ignore.responseGlobal = dataResponse;
    this.__pinPad__.operation.ignore.C93Global = C93;
    this.__pinPad__.operation.ignore.isError92TRX = true;
    await this.#initDUKPT(1, 0);
  }

  async #finishCode92() {
    this.__pinPad__.operation.ignore.isError92TRX = false;
    if (
      this.__pinPad__.config.read.POSEM === '022' ||
      this.__pinPad__.config.read.POSEM === '800' ||
      this.__pinPad__.config.read.ReadCTLS === '1'
    ) {
      this.dispatch('pp:response', this.__pinPad__.operation.ignore.responseGlobal);
    } else {
      const arr = this.parseStringToBytes(this.__pinPad__.operation.ignore.C93Global, '');
      await this.appendToQueue(arr, 'code93');
      await wait(1400);
      this.dispatch('pp:response', this.__pinPad__.operation.ignore.responseGlobal);
    }
  }

  #processError(code) {
    const errors = {
      PPE02: 'Importe Incorrecto.',
      A02: 'Importe Incorrecto.',
      PPE03: 'No hay respuesta del lector, verifique que se encuentra conectado.',
      A03: 'No hay respuesta del lector, verifique que se encuentra conectado.',
      PP18: 'Sin comunicación, por favor verifique su reporte.',
      PP24: 'Transacción declinada por la PinPad.',
      A01: 'Tarjeta Ilegible.',
      A04: 'No hay planes de pago para esta tarjeta, por favor cambie la tarjeta.',
      A10: 'Operación cancelada por el usuario.',
      A11: 'Proceso cancelado por timeout.',
      A12: 'Lectura errónea de banda/chip.',
      A13: 'Carga de llave fallida.',
      A14: 'Error de lectura de PIN.',
      A15: 'Tarjeta Vencida.',
      A16: 'Problemas al leer el chip.',
      A17: 'Impresora sin Papel.',
      E17: 'Impresora sin Papel.',
      A21: 'Información no almacenada correctamente.',
      A22: 'Tarjeta bloqueada.',
      A23: 'Sin llave de cifrado DUKPT.',
      A28: 'Fallback no soportado.',
      EE19: 'Error de conexión, verifique su reporte.',
      EE21: 'Ha ocurrido un error al procesar su solicitud.',
      EE22: 'Ha ocurrido un error de conexión al servidor.',
      EE23: 'El número de operación no puede ir vacío.',
      EE24: 'El número de operación debe ser de 9 dígitos.',
      EE25: 'El número de operación debe ser numérico.',
      EE26: 'La información enviada al servicio está incompleta.',
      EE27: 'La referencia contiene caracteres inválidos o está vacía.',
      EE28: 'Número de autorización inválido.',
      EE29: 'Importe inválido.',
      EE30: 'La información enviada al servicio no es válida.',
      EE31: 'No fue posible obtener las afiliaciones.',
      EE32: 'Error de conexión, existe una o más transacciones en el servidor , Favor de validar su reporte y en su caso reimprimir el voucher.',
      EE33: 'Error de comunicacion con CDP. IL/MTY',
      EE20: 'La Referencia contiene caracteres inválidos',
      EE99: 'Error código 99.',
    };

    let object = !errors[code]
      ? { error: code, message: 'Error desconocido' }
      : {
          error: code,
          message: errors[code],
        };
    this.dispatch('pp:error', object);
    return object;
  }

  async #finishEMVEnd(response) {
    const FS = this.__pinPad__.constants.FS;
    const STX = this.__pinPad__.constants.STX;
    const ETX = this.__pinPad__.constants.ETX;

    let command = 'C93A' + this.__pinPad__.finishCommand.A;
    command = command + FS + 'B' + this.__pinPad__.finishCommand.B;
    command = command + FS + 'C' + this.__pinPad__.finishCommand.C;
    command = command + FS + 'D' + this.__pinPad__.finishCommand.D;
    command = command + FS + 'E' + this.__pinPad__.finishCommand.E;
    command = command + FS + 'F' + this.__pinPad__.finishCommand.F;
    command = command + FS + 'G' + this.__pinPad__.finishCommand.G;
    command = command + FS + 'H' + this.__pinPad__.finishCommand.H;
    command = command + FS + 'I' + this.__pinPad__.finishCommand.I;
    command = command + FS + 'J' + this.__pinPad__.finishCommand.J;
    command = command + FS + 'K' + this.__pinPad__.finishCommand.K;
    command = STX + this.#calcLength(command) + command + ETX;
    command = command + this.#calcLRC(command);
    if (
      this.__pinPad__.config.read.POSEM === '022' ||
      this.__pinPad__.config.read.POSEM === '800' ||
      this.__pinPad__.config.read.ReadCTLS === '1'
    ) {
      this.dispatch('pp:finish-emv', response);
      return;
    }
    const arr = this.parseStringToBytes(command, '');
    await this.appendToQueue(arr, 'finish-emv-end');
  }

  async #writeKeysDUKPT(response) {
    response.cd_estatus = !response.cd_estatus ? '0' : response.cd_estatus;

    if (response.cd_estatus !== '1') {
      if (this.__pinPad__.operation.ignore.isError92TRX) {
        await this.#finishCode92();
      }
      // error here?
      return;
    }
    const FS = this.__pinPad__.constants.FS;
    const ETX = this.__pinPad__.constants.ETX;
    const STX = this.__pinPad__.constants.STX;
    const ksn = response.nb_ksn;
    const kcv = response.nb_kcv || '';
    const ipek = response.nb_ipek || '';
    let command = 'C92A' + ksn + FS + 'B' + kcv + FS + 'C' + ipek;
    command = STX + this.#calcLength(command) + command + ETX;
    command = command + this.#calcLRC(command);

    const arr = this.parseStringToBytes(command, '');
    await this.appendToQueue(arr, 'dukpt');

    let interval = 0;
    this.__pinPad__.waiting.statuswritingDUKPTWaiting = 'pending';
    const this1 = this;

    return new Promise((resolve, reject) => {
      interval = setInterval(async () => {
        if (this1.__pinPad__.waiting.statuswritingDUKPTWaiting === 'resolved') {
          clearInterval(interval);
          this1.__pinPad__.waiting.statuswritingDUKPTWaiting = null;
          if (this.__pinPad__.operation.ignore.isError92TRX) {
            await this1.#finishCode92();
          }
          resolve(true);
        } else if (this1.__pinPad__.waiting.statuswritingDUKPTWaiting === 'rejected') {
          clearInterval(interval);
          this1.__pinPad__.waiting.statuswritingDUKPTWaiting = null;
          reject('Error writing DUKPT keys');
        }
      }, 500);
    });
  }

  #clear() {
    this.__pinPad__.config.read.AppId = '';
    this.__pinPad__.config.read.AppIdLabel = '';
    this.__pinPad__.config.read.Arqc = '';
    this.__pinPad__.config.read.ChipName = '';
    this.__pinPad__.config.read.ReadCTLS = '';
    this.__pinPad__.config.read.NB_Data = '';
    this.__pinPad__.config.read.NB_ksn = '';
    this.__pinPad__.config.read.PIN = '';
    this.__pinPad__.config.read.POSEM = '';
    this.__pinPad__.config.read.Tags = '';
    this.__pinPad__.config.read.Type = '';
    this.__pinPad__.config.read.Chip = '';
    this.__pinPad__.config.read.ChipNameEnc = '';
    this.__pinPad__.operation.ignore.error = '';
    this.__pinPad__.operation.ignore.C93Global = '';
    this.__pinPad__.operation.folio = '';
    this.__pinPad__.operation.authorization = '';
    this.__pinPad__.config.tokenizeTRX = false;
  }

  // ========================================================================================
  // Needed for WS v4
  // ========================================================================================

  /**
   * @param {number} amount
   * @param {null|string} reference
   * @returns {Promise<{error: boolean, message: null, approved: boolean, object: {}}>}
   */
  async makeSale({ amount = 0, reference = null } = {}) {
    amount = parseFloat(amount.toString());
    if (isNaN(amount) || amount <= 0) {
      throw new Error('Amount is required and must be greater than 0');
    }
    this.amount = amount;
    if (!reference || isEmpty(reference) || !this.#validateReference(reference)) {
      throw new Error('Reference is required and must be alphanumeric');
    }
    this.reference = reference;
    if (/^[A-Z-a-z\s]+$/g.test(this.__pinPad__.config.currency) === false) {
      throw new Error('Invalid currency');
    }

    let r = {
      error: false,
      message: null,
      approved: false,
      object: {},
    };
    try {
      await this.login();
      await this.#getKeyRSA();
      if (!(await this.#readCard())) {
        return r;
      }
      if (!(await this.#getMerchant())) {
        return r;
      }
      return await this.#sendSale();
    } catch (e) {
      console.warn(e);
      r.error = true;
      r.message = e.message;
      r.approved = false;
      r.object = e;
    }
    return r;
  }
}
