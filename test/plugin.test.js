'use strict';

import { Devices } from './../lib/utils/devices.js';
import { Kernel } from './../lib/serial/kernel.js';

export class PluginTest extends Kernel {
  constructor({ filters = null, config_port = null, no_device = 1 } = {}) {
    super({ filters, config_port, no_device });
    this.__internal__.device.type = 'testPlugin';

    if (typeof Devices.devices[this.__internal__.device.type] === 'undefined') {
      Devices.devices[this.__internal__.device.type] = [];
    }

    if (Devices.getCustom(this.typeDevice, no_device))
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    this.__internal__.time.response_connection = 2e3;
    this.__internal__.time.response_general = 2e3;
    this.__internal__.serial.delay_first_connection = 1_000;
    this.#registerAvailableListenersLocker();
    this.#touch();
  }

  #touch() {
    Devices.addCustom('testPlugin', this);
  }

  #registerAvailableListenersLocker() {
    /*const _ = [];
        for (const event of _) {
            this.serialRegisterAvailableListener(event)
        }
        */
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

    const byteArray = this.parseHexToUint8(original_code);
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

  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(listen_on_port = 1) {
    return this.add0x(this.parseStringToBytes('CONNECT'));
  }

  async sayHi() {
    const arr = this.parseStringToBytes('HI');
    await this.appendToQueue(arr, 'hi');
  }

  async sendCustomCode({ code = '' } = {}) {
    if (typeof code !== 'string') throw new Error('Invalid string');
    const arr = this.parseStringToBytes(code);
    await this.appendToQueue(arr, 'custom');
  }
}

const machine = new PluginTest();

machine.on('serial:message', (data) => {
  console.log(data.detail);
});

machine.on('serial:timeout', (data) => {
  console.log('serial:timeout', data.detail);
});

// machine.on('serial:sent', data => {
//     console.log('serial:sent',data.detail);
// });

machine.on('serial:error', (event) => {
  document.getElementById('log').innerText += event.detail.message + '\n\n';
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:disconnected', (event) => {
  document.getElementById('log').innerText += 'Disconnected\n\n';

  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:connecting', (event) => {
  document.getElementById('log').innerText += 'Connecting\n\n';
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:connected', (event) => {
  document.getElementById('log').innerText += 'Connected\n\n';

  document.getElementById('disconnected').classList.add('hidden');
  document.getElementById('need-permission').classList.add('hidden');
  document.getElementById('connect').classList.add('hidden');
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:need-permission', (event) => {
  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('need-permission').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:soft-reload', (event) => {
  // reset your variables
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:unsupported', (event) => {
  document.getElementById('unsupported').classList.remove('hidden');
});

function tryConnect() {
  machine
    .connect()
    .then(() => {})
    .catch(console.error);
}

document.addEventListener('DOMContentLoaded', () => {
  tryConnect();
  document.getElementById('connect').addEventListener('click', tryConnect);
});

window.machine = machine;
