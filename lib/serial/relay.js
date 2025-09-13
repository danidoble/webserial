'use strict';

import { Kernel } from './kernel.js';
import { Devices } from '../utils/devices.js';
import { wait } from '../utils/utils.js';
import { Relay as RelayCommands } from '@danidoble/webserial-vending-commands';

export class Relay extends Kernel {
  constructor({ filters = null, config_port = null, no_device = 1, socket = false } = {}) {
    super({ filters, config_port, no_device, socket });
    this.__internal__.device.type = 'relay';
    this.__internal__.auto_response = false;
    this.__internal__.serial.auto_response = [0x02, 0x06, 0xdd, 0xdd, 0xf0, 0xcf, 0x03];
    if (Devices.getCustom(this.typeDevice, no_device)) {
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    }
    Devices.add(this);
  }

  serialMessage(code) {
    code = this.fixHexArray(code);

    const message = {
      code,
      name: null,
      description: null,
      request: null,
      no_code: 0,
    };

    if (code[0] === 'a0' && code[2] == '00') {
      message.name = `Relay turned off`;
      message.description = `The relay has been turned off successfully.`;
      message.request = this.lastAction;
      message.no_code = 101;
    } else if (code[0] === 'a0' && code[2] == '01') {
      message.name = `Relay turned on`;
      message.description = `The relay has been turned on successfully.`;
      message.request = this.lastAction;
      message.no_code = 102;
    } else {
      message.name = `Unrecognized response`;
      message.description = `The response of application was received, but dont identify with any of current parameters`;
      message.request = `undefined`;
      message.no_code = 400;
    }

    this.dispatch('serial:message', message);
  }

  serialRelaySumHex(arr) {
    let sum = 0;
    arr.forEach((value, index) => {
      if (index !== 3) {
        sum += value;
      }
    });
    return sum;
  }

  serialSetConnectionConstant(listen_on_port = 1) {
    return RelayCommands.connection(listen_on_port);
  }

  async turnOn() {
    const code = RelayCommands.activate();
    await this.appendToQueue(code, 'relay:turn-on');
  }

  async turnOff() {
    const code = RelayCommands.deactivate();
    await this.appendToQueue(code, 'relay:turn-off');
  }

  async toggle({ inverse = false, ms = 300 } = {}) {
    if (!inverse) {
      await this.turnOn();
      await wait(ms);
      await this.turnOff();
      return;
    }
    await this.turnOff();
    await wait(ms);
    await this.turnOn();
  }
}
