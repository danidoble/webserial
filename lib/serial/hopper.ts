'use strict';

import { Core, Devices } from 'webserial-core';

interface Hoppers {
  levels: { id: number; currency: number; key: string; name: string; amount: number; capacity: number }[];
  balance: number;
  current: number | null;
}

interface ConstructorParams {
  filters?: SerialPortFilter[] | null;
  config_port?: SerialOptions;
  no_device?: number;
  device_listen_on_channel?: number | string;
  bypassSerialBytesConnection?: boolean;
  socket?: boolean;
}

interface MessageSerial {
  hex?: string[] | null;
  ascii: string;
  code: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer;
  name: string;
  description: string;
  request: string | null;
  no_code: number;
  error: boolean;
  data: any;
  hopperId?: number | null;
}

export class Hopper extends Core {
  __hoppers__: Hoppers = {
    levels: [
      { id: 1, currency: 10, key: 'Hopper 1', name: '10 Pesos', amount: 0, capacity: 1000 },
      { id: 2, currency: 5, key: 'Hopper 2', name: '5 Pesos', amount: 0, capacity: 1000 },
      { id: 3, currency: 2, key: 'Hopper 3', name: '2 Pesos', amount: 0, capacity: 1000 },
      { id: 4, currency: 1, key: 'Hopper 4', name: '1 Peso', amount: 0, capacity: 1000 },
    ],
    balance: 0,
    current: null,
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
      socket = false,
    }: ConstructorParams = {
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
      socket: false,
    }
  ) {
    super({ filters, config_port, no_device, socket });
    this.__internal__.device.type = 'hopper';
    if (Devices.getCustom(this.typeDevice, no_device)) {
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    }

    this.__internal__.time.response_connection = 7e3;
    this.__internal__.time.response_general = 7e3;
    this.__internal__.serial.delay_first_connection = 500;
    this.__internal__.serial.response.replacer = ''; // /[\n\r]+/g  ->  default remove all \r\n () but we need to keep it if the limiter has \r or \n
    this.__internal__.serial.response.limiter = '\r\n';

    Devices.add(this as Core);
    this.#registerAvailableListenersLocker();
  }

  #registerAvailableListenersLocker() {
    const _ = ['levels', 'hopper:updated', 'dispense-change', 'balance:updated', 'validator:status', 'change:1x1'];
    for (const event of _) {
      this.serialRegisterAvailableListener(event);
    }
  }

  get balance() {
    return this.__hoppers__.balance;
  }

  get currentHopper() {
    return this.__hoppers__.current;
  }

  get levels() {
    return this.__hoppers__.levels;
  }

  setMaxCapacity({ hopper = 1, capacity = 1000 } = { hopper: 1, capacity: 1000 }) {
    this.#validateHopperId(hopper);
    this.__hoppers__.levels[hopper - 1].capacity = capacity;
    return this;
  }

  setHopperName({ hopper = 1, name = '' } = { hopper: 1, name: '' }) {
    this.#validateHopperId(hopper);
    if (typeof name !== 'string' || name.length === 0) {
      throw new TypeError('Name must be a non-empty string');
    }
    this.__hoppers__.levels[hopper - 1].name = name;
    return this;
  }

  setHopperKey({ hopper = 1, key = '' } = { hopper: 1, key: '' }) {
    this.#validateHopperId(hopper);
    if (typeof key !== 'string' || key.length === 0) {
      throw new TypeError('Key must be a non-empty string');
    }
    this.__hoppers__.levels[hopper - 1].key = key;
    return this;
  }

  setHopperCurrency({ hopper = 1, currency = 1 } = { hopper: 1, currency: 1 }) {
    this.#validateHopperId(hopper);
    if (typeof currency !== 'number' || currency <= 0) {
      throw new RangeError('Currency must be a positive number');
    }
    this.__hoppers__.levels[hopper - 1].currency = currency;
    return this;
  }

  #processError(message: MessageSerial) {
    message.error = true;
    if (message.ascii.includes('ffffff')) {
      message.name = 'SINTAX';
      message.description = 'Error de Sintaxis';
      message.no_code = 400;
    } else if (message.ascii.includes('ffaaaa')) {
      message.name = 'LOWLEVEL';
      message.description = 'Bajo nivel de monedas en Hopper (99)';
      message.no_code = 401;
    } else if (message.ascii.includes('ffbbbb')) {
      message.name = 'TIMEOUT_DISPENSE';
      message.description = 'Error de dispensado, timeout';
      message.no_code = 402;
    } else {
      message.name = 'UNKNOWN_ERROR';
      message.description = 'Unknown error occurred';
      message.no_code = 999;
    }
    this.dispatch('serial:message', message);
  }

  #processMessage(message: MessageSerial) {
    if ('status' === this.lastAction) {
      message.name = 'STATUS';
      message.description = 'Hoppers status';
      message.no_code = 1;
      // @ts-expect-error index position on uint8array is number
      this.__hoppers__.levels[0].amount = this.#toSignedInt16(message.code[9], message.code[10]);
      // @ts-expect-error index position on uint8array is number
      this.__hoppers__.levels[1].amount = this.#toSignedInt16(message.code[7], message.code[8]);
      // @ts-expect-error index position on uint8array is number
      this.__hoppers__.levels[2].amount = this.#toSignedInt16(message.code[5], message.code[6]);
      // @ts-expect-error index position on uint8array is number
      this.__hoppers__.levels[3].amount = this.#toSignedInt16(message.code[3], message.code[4]);
      message.data = this.__hoppers__.levels;

      this.dispatch('levels', message.data);
    } else if ('readHopper' === this.lastAction) {
      message.name = 'READ_HOPPER';
      message.description = `Hopper ${this.__hoppers__.current} level`;
      message.no_code = 2;
      const index = (this.__hoppers__.current || 1) - 1;
      // @ts-expect-error index position on uint8array is number
      this.__hoppers__.levels[index].amount = this.#toSignedInt16(message.code[9], message.code[10]);
      message.data = this.__hoppers__.levels;
      message.hopperId = this.__hoppers__.current;

      this.dispatch('hopper:updated', this.__hoppers__.levels[index]);
    } else if ('writeHopper' === this.lastAction) {
      message.name = 'WRITE_HOPPER';
      message.description = 'Hopper ' + this.__hoppers__.current + ' write';
      message.no_code = 3;

      this.__hoppers__.levels[(this.__hoppers__.current || 1) - 1].amount = this.#toSignedInt16(
        // @ts-expect-error index position on uint8array is number
        message.code[9],
        // @ts-expect-error index position on uint8array is number
        message.code[10]
      );
      message.data = this.__hoppers__.levels;
      message.hopperId = this.__hoppers__.current;

      const index = (this.__hoppers__.current || 1) - 1;
      this.dispatch('hopper:updated', this.__hoppers__.levels[index]);
    } else if ('dispenseHopper' === this.lastAction) {
      message.name = 'DISPENSEHOPPER';
      message.description = 'Hopper ' + this.__hoppers__.current + ' dispense';
      message.no_code = 4;

      this.__hoppers__.levels[(this.__hoppers__.current || 1) - 1].amount = this.#toSignedInt16(
        // @ts-expect-error index position on uint8array is number
        message.code[9],
        // @ts-expect-error index position on uint8array is number
        message.code[10]
      );
      message.data = this.__hoppers__.levels;
      message.hopperId = this.__hoppers__.current;
      const index = (this.__hoppers__.current || 0) - 1;
      this.dispatch('hopper:updated', this.__hoppers__.levels[index]);
    } else if ('dispenseChange' === this.lastAction) {
      message.name = 'DISPENSE_CHANGE';
      message.description = 'Change dispensed';
      message.no_code = 5;
      // @ts-expect-error index position on uint8array is number
      message.data = this.#toSignedInt16(message.code[9], message.code[10]);
      this.dispatch('dispense-change', { amount: message.data });
    } else if ('readBalance' === this.lastAction) {
      message.name = 'READ_BALANCE';
      message.description = 'Read Balance';
      message.no_code = 6;
      // @ts-expect-error index position on uint8array is number
      this.__hoppers__.balance = this.#toSignedInt16(message.code[9], message.code[10]);
      message.data = this.__hoppers__.balance;
      this.dispatch('balance:updated', { balance: message.data });
    } else if ('clearBalance' === this.lastAction) {
      message.name = 'CLEAR_BALANCE';
      message.description = `Clared hoppers balance`;
      message.no_code = 7;
      // @ts-expect-error index position on uint8array is number
      this.__hoppers__.balance = this.#toSignedInt16(message.code[9], message.code[10]);
      message.data = this.__hoppers__.balance;
      this.dispatch('balance:updated', { balance: message.data });
    } else if ('configValidator' === this.lastAction) {
      // @ts-expect-error index position on uint8array is number
      if (message.code[2] === 1) {
        message.name = 'ENABLE_VALIDATOR';
        message.description = 'Validator enabled';
        message.no_code = 8;
        this.dispatch('validator:status', { enabled: true });
      } else {
        message.name = 'DISABLE_VALIDATOR';
        message.description = 'Validator disabled';
        message.no_code = 9;
        this.dispatch('validator:status', { enabled: false });
      }
      message.no_code = 400;
      // @ts-expect-error index position on uint8array is number
      message.data = message.code[2] === 1 ? 'enabled' : 'disabled';
    } else if (this.lastAction?.includes('change1x1Hopper')) {
      // @ts-expect-error index position on uint8array is number
      if (message.code[2] === 1) {
        message.name = 'CHANGE_1X1_HOPPER_1';
        message.description = 'Change 1x1 Hopper 1';
        message.no_code = 10;
        // @ts-expect-error index position on uint8array is number
      } else if (message.code[2] === 2) {
        message.name = 'CHANGE_1X1_HOPPER_2';
        message.description = 'Change 1x1 Hopper 2';
        message.no_code = 11;
        // @ts-expect-error index position on uint8array is number
      } else if (message.code[2] === 3) {
        message.name = 'CHANGE_1X1_HOPPER_3';
        message.description = 'Change 1x1 Hopper 3';
        message.no_code = 12;
        // @ts-expect-error index position on uint8array is number
      } else if (message.code[2] === 4) {
        message.name = 'CHANGE_1X1_HOPPER_4';
        message.description = 'Change 1x1 Hopper 4';
        message.no_code = 13;
      } else {
        message.name = 'CHANGE_1X1_HOPPER_UNKNOWN';
        message.description = 'Change 1x1 Hopper Unknown';
        message.no_code = 14;
      }
      // @ts-expect-error index position on uint8array is number
      this.dispatch('change:1x1', { hopperId: message.code[2] });
    }

    this.dispatch('serial:message', message);
  }

  serialMessage(codex1: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer) {
    const codex = codex1 as Uint8Array;
    const str = this.parseUint8ArrayToString(codex);
    const ascii = this.asciiToHex(str);
    //const hex = this.stringToArrayHex(str);

    const message: MessageSerial = {
      //hex,
      ascii,
      code: codex,
      name: '',
      description: '',
      request: this.lastAction,
      no_code: 0,
      error: false,
      data: null,
    };

    if (codex.length === 3) {
      this.#processError(message);
      return;
    }

    const codexArray = Array.from(codex);

    if (codex.length !== 13) {
      const chunks = this.#splitArrayEveryNBytes({ array: codexArray, chunkSize: 13 });
      for (const chunk of chunks) {
        const str = this.parseUint8ArrayToString(new Uint8Array(chunk));
        const ascii = this.asciiToHex(str);
        const hex = this.stringToArrayHex(str);
        message.code = chunk;
        message.hex = hex;
        message.ascii = ascii;
        if (chunk.length !== 13) {
          this.#processError(message);
        } else {
          this.#processMessage(message);
        }
      }
      return;
    }

    this.#processMessage(message);
  }

  #toSignedInt16(high: number, low: number) {
    const combined = (high << 8) | low;
    return (combined << 16) >> 16;
  }

  #validateHopperId(hopper: number | null) {
    if (typeof hopper !== 'number' || hopper < 1 || hopper > 4) {
      throw new RangeError('Hopper ID must be a number between 1 and 4');
    }
    if (typeof hopper !== 'number' || !Number.isInteger(hopper)) {
      throw new TypeError('Hopper ID must be an integer');
    }
  }

  #validateHopperQuantity(quantity: number) {
    if (typeof quantity !== 'number' || quantity < -32768 || quantity > 32767) {
      throw new RangeError('Quantity must be a number between -32768 and 32767');
    }
    if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
      throw new TypeError('Quantity must be an integer');
    }
  }

  #intToHighLow(value: number) {
    this.#validateHopperQuantity(value);

    const unsigned = value & 0xffff;
    const high = (unsigned >> 8) & 0xff;
    const low = unsigned & 0xff;

    return [high, low];
  }

  #splitArrayEveryNBytes(
    {
      array,
      chunkSize = 13,
    }: {
      array: any[];
      chunkSize?: number;
    } = {
      array: [],
      chunkSize: 13,
    }
  ) {
    if (!Array.isArray(array)) {
      throw new TypeError('Expected an array');
    }
    if (typeof chunkSize !== 'number' || chunkSize <= 0) {
      throw new RangeError('Chunk size must be a positive number');
    }

    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  #checksum(array: number[]) {
    if (array.length < 11) {
      array = [...array, ...Array(11 - array.length).fill(0)];
    }

    const sum = array.slice(1, 11).reduce((acc, val) => {
      if (typeof val !== 'number') {
        throw new TypeError('Array must contain only numbers');
      }
      return acc + val;
    }, 0);
    const checksum = sum & 0xff;
    array[11] = checksum;
    array[12] = 0xf; // end byte
    return array;
  }

  serialSetConnectionConstant() {
    return [0xa, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0xf];
  }

  async sendConnect() {
    const arr = this.#checksum([0xa]);
    return await this.appendToQueue(arr, 'connect');
  }

  async requestStatus() {
    const arr = this.#checksum([0xa, 0xa, 0xb, 0xc]);
    return await this.appendToQueue(arr, 'status');
  }

  async readBalance() {
    const arr = this.#checksum([0xa, 0xc0, 0x1]);
    return await this.appendToQueue(arr, 'readBalance');
  }

  async clearBalance() {
    const arr = this.#checksum([0xa, 0xc0, 0x2]);
    return await this.appendToQueue(arr, 'clearBalance');
  }

  async forceInvalid() {
    //const arr = this.#checksum([0xa,0xbc]) // with this checksum it works, and for this purpose is not ok
    const arr = '0A000F00'.match(/.{1,2}/g); // with this fails because it has no checksum an no end byte
    return await this.appendToQueue(arr as unknown as Uint8Array<ArrayBufferLike>, 'ForceInvalid');
  }

  async readHopper({ hopper = 1 } = { hopper: 1 }) {
    this.#validateHopperId(hopper);
    this.__hoppers__.current = hopper;

    const arr = this.#checksum([0xa, hopper, hopper]);
    return await this.appendToQueue(arr, 'readHopper');
  }

  async writeHopper({ hopper = 1, quantity = 0 } = { hopper: 1, quantity: 0 }) {
    this.#validateHopperId(hopper);
    this.#validateHopperQuantity(quantity);

    this.__hoppers__.current = hopper;
    const [low, high] = this.#intToHighLow(quantity);
    const arr = this.#checksum([0xa, 0xf0, hopper, 0, 0, 0, 0, 0, 0, low, high]);
    return await this.appendToQueue(arr, 'writeHopper');
  }

  async dispenseHopper({ hopper = 1 } = { hopper: 1 }) {
    this.#validateHopperId(hopper);
    this.__hoppers__.current = hopper;
    const arr = this.#checksum([0xa, 0x2, hopper]);
    return await this.appendToQueue(arr, 'dispenseHopper');
  }

  async dispenseChange({ change = 0 } = { change: 0 }) {
    if (typeof change !== 'number' || change < 0 || change > 32767) {
      throw new RangeError('Change must be a number between 0 and 32767');
    }
    if (typeof change !== 'number' || !Number.isInteger(change)) {
      throw new TypeError('Change must be an integer');
    }

    const high = change & 0xff;
    const low = (change >> 8) & 0xff;
    const arr = this.#checksum([0xa, 0xcc, 0xaa, 0, 0, 0, 0, 0, 0, low, high]);
    return await this.appendToQueue(arr, 'dispenseChange');
  }

  async configValidator(
    {
      enable = false,
    }: {
      enable: boolean;
    } = { enable: false }
  ) {
    if (typeof enable !== 'boolean') {
      throw new TypeError('Enable must be a boolean');
    }

    const arr = this.#checksum([0xa, 0xb0, enable ? 1 : 0]);
    return await this.appendToQueue(arr, 'configValidator');
  }

  async disableValidator() {
    return await this.configValidator({ enable: false });
  }

  async enableValidator() {
    return await this.configValidator({ enable: true });
  }

  async change1x1({ hopper = 1 } = { hopper: 1 }) {
    this.#validateHopperId(hopper);
    this.__hoppers__.current = hopper;
    const arr = this.#checksum([0xa, 0xe0, hopper]);
    return await this.appendToQueue(arr, 'change1x1Hopper-' + hopper);
  }

  async sendCustomCode(
    {
      code = [],
    }: {
      code: any;
    } = { code: [] }
  ) {
    if (!Array.isArray(code) || !code.every((item) => typeof item === 'number' && item >= 0 && item <= 255)) {
      throw new TypeError('Code must be an array of numbers between 0 and 255');
    }

    const arr = this.#checksum(code);
    await this.appendToQueue(arr, 'custom');
  }
}
