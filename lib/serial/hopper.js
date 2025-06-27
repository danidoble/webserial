'use strict';

import { Core, Devices } from 'webserial-core';

export class Hopper extends Core {
  __hoppers__ = {
    levels: [
      { id: 1, coinValue: 10, coinName: 'Hopper 1: 10 Pesos', count: 0, maxCapacity: 1000 },
      { id: 2, coinValue: 5, coinName: 'Hopper 2: 5 Pesos', count: 0, maxCapacity: 1000 },
      { id: 3, coinValue: 2, coinName: 'Hopper 3: 2 Pesos', count: 0, maxCapacity: 1000 },
      { id: 4, coinValue: 1, coinName: 'Hopper 4: 1 Peso', count: 0, maxCapacity: 1000 },
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
    }
  ) {
    super({ filters, config_port, no_device });
    this.__internal__.device.type = 'hopper';
    Devices.registerType(this.__internal__.device.type);

    if (Devices.getByNumber(this.typeDevice, no_device)) {
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    }
    this.__internal__.time.response_connection = 7e3;
    this.__internal__.time.response_general = 7e3;
    this.__internal__.serial.delay_first_connection = 500;
    this.__internal__.serial.response.replacer = ''; // /[\n\r]+/g  ->  default remove all \r\n () but we need to keep it if the limiter has \r or \n
    this.__internal__.serial.response.limiter = '\r\n';

    Devices.add(this);
  }

  #processError(message) {
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

  #processMessage(message) {
    if ('status' === this.lastAction) {
      message.name = 'STATUS';
      message.description = 'Hoppers status';
      message.no_code = 1;
      this.__hoppers__.levels[0].count = this.#toSignedInt16(message.code[9], message.code[10]);
      this.__hoppers__.levels[1].count = this.#toSignedInt16(message.code[7], message.code[8]);
      this.__hoppers__.levels[2].count = this.#toSignedInt16(message.code[5], message.code[6]);
      this.__hoppers__.levels[3].count = this.#toSignedInt16(message.code[3], message.code[4]);
      message.data = this.__hoppers__.levels;
    } else if ('readHopper' === this.lastAction) {
      message.name = 'READ_HOPPER';
      message.description = `Hopper ${this.__hoppers__.current} level`;
      message.no_code = 2;
      const index = this.__hoppers__.current - 1;
      this.__hoppers__.levels[index].count = this.#toSignedInt16(message.code[9], message.code[10]);
      message.data = this.__hoppers__.levels;
      message.hopperId = this.__hoppers__.current;
    } else if ('writeHopper' === this.lastAction) {
      message.name = 'WRITE_HOPPER';
      message.description = 'Hopper ' + this.__hoppers__.current + ' write';
      message.no_code = 3;
      this.__hoppers__.levels[this.__hoppers__.current - 1].count = this.#toSignedInt16(
        message.code[9],
        message.code[10]
      );
      message.data = this.__hoppers__.levels;
      message.hopperId = this.__hoppers__.current;
    } else if ('dispenseHopper' === this.lastAction) {
      message.name = 'DISPENSEHOPPER';
      message.description = 'Hopper ' + this.__hoppers__.current + ' dispense';
      message.no_code = 4;
      this.__hoppers__.levels[this.__hoppers__.current - 1].count = this.#toSignedInt16(
        message.code[9],
        message.code[10]
      );
      message.data = this.__hoppers__.levels;
      message.hopperId = this.__hoppers__.current;
    } else if ('dispenseChange' === this.lastAction) {
      message.name = 'DISPENSE_CHANGE';
      message.description = 'Change dispensed';
      message.no_code = 5;
      message.data = this.#toSignedInt16(message.code[9], message.code[10]);
    } else if ('readBalance' === this.lastAction) {
      message.name = 'READ_BALANCE';
      message.description = 'Read Balance';
      message.no_code = 6;
      this.__hoppers__.balance = this.#toSignedInt16(message.code[9], message.code[10]);
      message.data = this.__hoppers__.balance;
    } else if ('clearBalance' === this.lastAction) {
      message.name = 'CLEAR_BALANCE';
      message.description = `Clared hoppers balance`;
      message.no_code = 7;
      this.__hoppers__.balance = this.#toSignedInt16(message.code[9], message.code[10]);
      message.data = this.__hoppers__.balance;
    } else if ('configValidator' === this.lastAction) {
      if (message.code[2] === 1) {
        message.name = 'ENABLE_VALIDATOR';
        message.description = 'Validator enabled';
        message.no_code = 8;
      } else {
        message.name = 'DISABLE_VALIDATOR';
        message.description = 'Validator disabled';
        message.no_code = 9;
      }
      message.no_code = 400;
      message.data = message.code[2] === 1 ? 'enabled' : 'disabled';
    } else if (this.lastAction.includes('change1x1Hopper')) {
      if (message.code[2] === 1) {
        message.name = 'CHANGE_1X1_HOPPER_1';
        message.description = 'Change 1x1 Hopper 1';
        message.no_code = 10;
      } else if (message.code[2] === 2) {
        message.name = 'CHANGE_1X1_HOPPER_2';
        message.description = 'Change 1x1 Hopper 2';
        message.no_code = 11;
      } else if (message.code[2] === 3) {
        message.name = 'CHANGE_1X1_HOPPER_3';
        message.description = 'Change 1x1 Hopper 3';
        message.no_code = 12;
      } else if (message.code[2] === 4) {
        message.name = 'CHANGE_1X1_HOPPER_4';
        message.description = 'Change 1x1 Hopper 4';
        message.no_code = 13;
      } else {
        message.name = 'CHANGE_1X1_HOPPER_UNKNOWN';
        message.description = 'Change 1x1 Hopper Unknown';
        message.no_code = 14;
      }
    }

    this.dispatch('serial:message', message);
  }

  serialMessage(codex) {
    const str = this.parseUint8ArrayToString(codex);
    const ascii = this.asciiToHex(str);
    //const hex = this.stringToArrayHex(str);

    const message = {
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

    if (codex.length !== 13) {
      const chunks = this.#splitArrayEveryNBytes({ array: codex, chunkSize: 13 });
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

  #toSignedInt16(high, low) {
    const combined = (high << 8) | low;
    return (combined << 16) >> 16;
  }

  #validateHopperId(hopper) {
    if (typeof hopper !== 'number' || hopper < 1 || hopper > 4) {
      throw new RangeError('Hopper ID must be a number between 1 and 4');
    }
    if (typeof hopper !== 'number' || !Number.isInteger(hopper)) {
      throw new TypeError('Hopper ID must be an integer');
    }
  }

  #validateHopperQuantity(quantity) {
    if (typeof quantity !== 'number' || quantity < -32768 || quantity > 32767) {
      throw new RangeError('Quantity must be a number between -32768 and 32767');
    }
    if (typeof quantity !== 'number' || !Number.isInteger(quantity)) {
      throw new TypeError('Quantity must be an integer');
    }
  }

  #intToHighLow(value) {
    this.#validateHopperQuantity(value);

    const unsigned = value & 0xffff;
    const high = (unsigned >> 8) & 0xff;
    const low = unsigned & 0xff;

    return [high, low];
  }

  #splitArrayEveryNBytes({ array, chunkSize = 13 } = {}) {
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

  #checksum(array) {
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
    return await this.appendToQueue(arr, 'ForceInvalid');
  }

  async readHopper({ hopper = null } = { hopper: null }) {
    this.#validateHopperId(hopper);
    this.__hoppers__.current = hopper;

    const arr = this.#checksum([0xa, hopper, hopper]);
    return await this.appendToQueue(arr, 'readHopper');
  }

  async writeHopper({ hopper = null, quantity = 0 } = { hopper: null, quantity: 0 }) {
    this.#validateHopperId(hopper);
    this.#validateHopperQuantity(quantity);

    this.__hoppers__.current = hopper;
    const [low, high] = this.#intToHighLow(quantity);
    const arr = this.#checksum([0xa, 0xf0, hopper, 0, 0, 0, 0, 0, 0, low, high]);
    return await this.appendToQueue(arr, 'writeHopper');
  }

  async dispenseHopper({ hopper = null } = { hopper: null }) {
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

  async configValidator({ enable = false } = { enable: false }) {
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

  async change1x1({ hopper = null } = { hopper: null }) {
    this.#validateHopperId(hopper);
    this.__hoppers__.current = hopper;
    const arr = this.#checksum([0xa, 0xe0, hopper]);
    return await this.appendToQueue(arr, 'change1x1Hopper-' + hopper);
  }

  async sendCustomCode({ code = [] } = { code: [] }) {
    if (!Array.isArray(code) || !code.every((item) => typeof item === 'number' && item >= 0 && item <= 255)) {
      throw new TypeError('Code must be an array of numbers between 0 and 255');
    }

    const arr = this.#checksum(code);
    await this.appendToQueue(arr, 'custom');
  }
}
