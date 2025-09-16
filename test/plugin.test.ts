'use strict';

import { Devices } from './../lib/utils/devices.js';
import { Kernel, ConstructorParams } from './../lib/serial/kernel.js';

export class PluginTest extends Kernel {
  constructor({ filters = null, config_port, no_device = 1 }: ConstructorParams = {}) {
    super({ filters, config_port, no_device });
    this.__internal__.device.type = 'testPlugin';

    if (typeof Devices.devices[this.__internal__.device.type] === 'undefined') {
      // @ts-expect-error register new device type
      Devices.devices[this.__internal__.device.type] = [];
    }

    if (Devices.getCustom(this.typeDevice, no_device)) {
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    }
    this.__internal__.time.response_connection = 2e3;
    this.__internal__.time.response_general = 2e3;
    this.__internal__.serial.delay_first_connection = 1_000;
    this.#registerAvailableListenersLocker();
    this.getResponseAsArrayHex();
    // @ts-expect-error add custom device
    Devices.addCustom('testPlugin', this as Kernel);
  }

  #registerAvailableListenersLocker() {
    /*const _ = [];
        for (const event of _) {
            this.serialRegisterAvailableListener(event)
        }
        */
  }

  serialMessage(original_code: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer) {
    const message: {
      original_code: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer;
      code: string | null;
      name: string | null;
      description: string | null;
      request: string | null;
      no_code: number;
    } = {
      original_code,
      code: null,
      name: null,
      description: null,
      request: null,
      no_code: 0,
    };

    const byteArray = this.parseHexToUint8(original_code as string[]);
    const codex = this.parseUint8ArrayToString(byteArray);

    message.code = codex;

    switch (codex) {
      case 'connected':
        message.name = 'connected';
        message.description = 'Connection established';
        message.request = 'connect';
        message.no_code = 100;
        break;
      case 'hello there':
        message.name = 'hello there';
        message.description = 'hi human';
        message.request = 'hi';
        message.no_code = 102;
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

  serialSetConnectionConstant() {
    return this.add0x(this.parseStringToBytes('CONNECT'));
  }

  async sayHi() {
    const arr = this.parseStringToBytes('HI');
    await this.appendToQueue(arr, 'hi');
  }

  async sendCustomCode({ code = '' }: { code: any } = { code: '' }) {
    if (typeof code !== 'string') throw new Error('Invalid string');
    const arr = this.parseStringToBytes(code);
    await this.appendToQueue(arr, 'custom');
  }
}

const machine = new PluginTest();

machine.on('serial:message', (data: any) => {
  console.log(data.detail);
});

machine.on('serial:timeout', (data: any) => {
  console.log('serial:timeout', data.detail);
});

// machine.on('serial:sent', data => {
//     console.log('serial:sent',data.detail);
// });

machine.on('serial:error', (event: any) => {
  const log = document.getElementById('log');
  if (log) {
    log.innerText += event.detail.message + '\n\n';
  }
});

machine.on('serial:disconnected', () => {
  const log = document.getElementById('log');
  if (log) {
    log.innerText += 'Disconnected\n\n';
  }

  const disconnected = document.getElementById('disconnected');
  if (disconnected) {
    disconnected.classList.remove('hidden');
  }
  const connect = document.getElementById('connect');
  if (connect) {
    connect.classList.remove('hidden');
  }
});

machine.on('serial:connecting', () => {
  const log = document.getElementById('log');
  if (log) {
    log.innerText += 'Connecting\n\n';
  }
});

machine.on('serial:connected', () => {
  const log = document.getElementById('log');
  if (log) {
    log.innerText += 'Connected\n\n';
  }

  const disconnected = document.getElementById('disconnected');
  if (disconnected) {
    disconnected.classList.add('hidden');
  }
  const need = document.getElementById('need-permission');
  if (need) {
    need.classList.add('hidden');
  }
  const connect = document.getElementById('connect');
  if (connect) {
    connect.classList.add('hidden');
  }
});

machine.on('serial:need-permission', () => {
  const disconnected = document.getElementById('disconnected');
  if (disconnected) {
    disconnected.classList.remove('hidden');
  }
  const need = document.getElementById('need-permission');
  if (need) {
    need.classList.remove('hidden');
  }
  const connect = document.getElementById('connect');
  if (connect) {
    connect.classList.remove('hidden');
  }
});

//machine.on('serial:soft-reload', (event) => {
// reset your variables
//});

// machine.on('serial:unsupported', (event) => {
//   const unsupported = document.getElementById('unsupported');
//   if(unsupported){
//     unsupported.classList.remove('hidden');
//   }
// });

function tryConnect() {
  machine
    .connect()
    .then(() => {})
    .catch(console.error);
}

document.addEventListener('DOMContentLoaded', () => {
  tryConnect();
  const connect = document.getElementById('connect');
  if (connect) {
    connect.addEventListener('click', tryConnect);
  }
});

// @ts-expect-error declare device in window
window.machine = machine;
