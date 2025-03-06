'use strict';

import { Kernel } from './kernel.js';
import { Devices } from '../utils/devices.js';
import { wait } from '../utils/utils.js';

export class Relay extends Kernel {
  #_codes = {
    activate: ['A0', '01', '01', 'A2'],
    deactivate: ['A0', '01', '00', 'A1'],
  };

  constructor({ filters = null, config_port = null, no_device = 1 } = {}) {
    super({ filters, config_port, no_device });
    this.__internal__.device.type = 'relay';
    this.__internal__.auto_response = true;
    if (Devices.getCustom(this.typeDevice, no_device))
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    this.#touch();
  }

  #touch() {
    Devices.add(this);
  }

  serialMessage(code) {
    const message = {
      code,
      name: null,
      description: null,
      request: null,
      no_code: 0,
    };

    switch (code[1].toString()) {
      case 'dd': // status
        message.name = `Connection with the serial device completed.`;
        message.description = `Your connection with the serial device was successfully completed.`;
        message.request = `connect`;
        message.no_code = 100;
        break;
      case 'de':
        break;
      default:
        message.name = `Unrecognized response`;
        message.description = `The response of application was received, but dont identify with any of current parameters`;
        message.request = `undefined`;
        message.no_code = 400;
        break;
    }

    this.dispatch('serial:message', message);
  }

  serialRelaySumHex(arr) {
    let sum = 0;
    arr.forEach((value, index) => {
      if (index !== 3) {
        sum += parseInt(value, 16);
      }
    });
    return sum.toString(16).toUpperCase();
  }

  serialSetConnectionConstant(listen_on_port = 1) {
    const arr = ['A0', '01', '00', 'A1'];
    arr[1] = this.hexMaker(this.decToHex(listen_on_port.toString()));
    arr[3] = this.serialRelaySumHex(arr);
    return this.add0x(arr);
  }

  async turnOn() {
    const code = this.#_codes.activate;
    code[3] = this.serialRelaySumHex(code);
    await this.appendToQueue(code, 'relay:turn-on');
  }

  async turnOff() {
    const code = this.#_codes.deactivate;
    code[3] = this.serialRelaySumHex(code);
    await this.appendToQueue(code, 'relay:turn-off');
  }

  async toggle({ inverse = false, ms = 300 } = {}) {
    const this1 = this;
    if (!inverse) {
      await this1.turnOn();
      await wait(ms);
      await this1.turnOff();
    } else {
      await this1.turnOff();
      await wait(ms);
      await this1.turnOn();
    }
  }
}
