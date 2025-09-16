'use strict';

import { ConstructorParams, Kernel } from '../lib/serial/kernel';
import { Devices } from '../lib/utils/devices';
import { Arduino as ArduinoCommands } from '@danidoble/webserial-vending-commands';

export class Arduino extends Kernel {
  constructor({ filters = null, config_port, no_device = 1, socket = false }: ConstructorParams = {}) {
    super({ filters, config_port, no_device, socket });
    this.__internal__.device.type = 'arduino';
    Devices.registerType(this.__internal__.device.type);
    if (Devices.getCustom(this.typeDevice, no_device)) {
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    }
    this.__internal__.time.response_connection = 2e3;
    this.__internal__.time.response_general = 2e3;
    this.__internal__.serial.delay_first_connection = 1_000;
    this.#registerAvailableListenersArduino();
    Devices.add(this as Kernel);
    this.getResponseAsString();
  }

  #registerAvailableListenersArduino() {
    /*const _ = [];
    for (const event of _) {
        this.serialRegisterAvailableListener(event)
    }
    */
  }

  override serialMessage(codex: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer) {
    // this is only for compatibility with the old code, by default now in constructor we set getResponseAsString
    const original_code = this.stringToArrayHex(codex as unknown as string);
    const arrayBuffer = this.stringToArrayBuffer(codex as unknown as string);

    const message: {
      original_code: string[];
      arrayBuffer: ArrayBufferLike | null;
      code: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer | null;
      name: string | null;
      description: string | null;
      request: string | null;
      no_code: number;
    } = {
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

  override serialSetConnectionConstant() {
    return ArduinoCommands.connection();
  }

  async sayCredits() {
    await this.appendToQueue(ArduinoCommands.credits(), 'credits');
  }

  async sayHi() {
    await this.appendToQueue(ArduinoCommands.hi(), 'hi');
  }

  async sayAra() {
    await this.appendToQueue(ArduinoCommands.ara(), 'ara');
  }

  override async sendCustomCode({ code = '' }: { code: string } = { code: '' }) {
    if (typeof code !== 'string') throw new Error('Invalid string');
    await this.appendToQueue(this.parseStringToTextEncoder(code), 'custom');
  }

  async doSomething() {
    await this.sayCredits();
    await this.sayAra();
    await this.sayHi();
  }
}
