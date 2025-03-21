'use strict';

import { Kernel } from './kernel.js';
import { Devices } from '../utils/devices.js';

export class Arduino extends Kernel {
  constructor({ filters = null, config_port = null, no_device = 1 } = {}) {
    super({ filters, config_port, no_device });
    this.__internal__.device.type = 'arduino';
    if (Devices.getCustom(this.typeDevice, no_device))
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    this.__internal__.time.response_connection = 2e3;
    this.__internal__.time.response_general = 2e3;
    this.__internal__.serial.delay_first_connection = 1_000;
    this.#registerAvailableListenersArduino();
    this.#touch();
    this.getResponseAsString();
  }

  #touch() {
    Devices.add(this);
  }

  #registerAvailableListenersArduino() {
    /*const _ = [];
                        for (const event of _) {
                            this.serialRegisterAvailableListener(event)
                        }
                        */
  }

  serialMessage(codex) {
    // this is only for compatibility with the old code, by default now in constructor we set getResponseAsString
    const original_code = this.stringToArrayHex(codex);
    const arrayBuffer = this.stringToArrayBuffer(codex);

    const message = {
      original_code,
      arrayBuffer,
      code: null,
      name: null,
      description: null,
      request: null,
      no_code: 0,
    };

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

  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(listen_on_port = 1) {
    return this.add0x(this.parseStringToBytes('CONNECT'));
  }

  async sayCredits() {
    const arr = this.parseStringToBytes('CREDITS');
    await this.appendToQueue(arr, 'credits');
  }

  async sayHi() {
    const arr = this.parseStringToBytes('HI');
    await this.appendToQueue(arr, 'hi');
  }

  async sayAra() {
    const arr = this.parseStringToBytes('OTHER');
    await this.appendToQueue(arr, 'ara');
  }

  async sendCustomCode({ code = '' } = {}) {
    if (typeof code !== 'string') throw new Error('Invalid string');
    const arr = this.parseStringToBytes(code);
    await this.appendToQueue(arr, 'custom');
  }

  async doSomething() {
    await this.sayCredits();
    await this.sayAra();
    await this.sayHi();
  }
}
