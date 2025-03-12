import { wait } from '../utils/utils.js';
import { Emulator } from '../utils/emulator.js';
import { Devices } from '../utils/devices.js';
import { Core } from 'webserial-core';

export class Kernel extends Core {
  constructor(config) {
    super(config);
    this.__internal__ = structuredClone(this.__internal__);
    this.getResponseAsArrayHex();
    this.__internal__.device.door_open = false;
    this.__internal__.time.response_engines = 2_000;
    this.__internal__.time.sense = 100;
    this.__internal__.interval.waiting_sense = 0;
    this.__internal__.dispense = {
      must_response: false,
      dispensing: false,
      status: null,
      counter: 0,
      limit_counter: 20,
      custom_limit_counter: null,
      backup_dispense: {},
    };
  }

  get isDoorOpen() {
    return this.__internal__.device.door_open;
  }

  get isDispensing() {
    return this.__internal__.interval.waiting_sense || this.__internal__.dispense.dispensing;
  }

  async timeout(bytes, event) {
    await super.timeout(bytes, event);
    if (event === 'dispense') {
      this.__internal__.dispense.status = 'no-response';
    }
  }

  async serialPortsSaved(ports) {
    const filters = this.serialFilters;
    if (this.__internal__.aux_port_connector < ports.length) {
      const aux = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = ports[aux];
    } else {
      this.__internal__.aux_port_connector = 0;
      this.__internal__.serial.port = await navigator.serial.requestPort({ filters });
    }
    if (!this.__internal__.serial.port) {
      throw new Error('Select another port please');
    }
  }

  internalClearSensing() {
    if (this.__internal__.interval.waiting_sense) {
      clearInterval(this.__internal__.interval.waiting_sense);
    }
    this.__internal__.interval.waiting_sense = 0;
    this.__internal__.dispense.status = null;
    this.__internal__.dispense.counter = 0;
    this.__internal__.dispense.dispensing = false;
  }

  internalDispensingProcess() {
    let limit_counter = this.__internal__.dispense.limit_counter;
    if (this.__internal__.dispense.custom_limit_counter) {
      limit_counter = this.__internal__.dispense.custom_limit_counter;
    }
    limit_counter += Math.ceil(limit_counter * 0.6);

    if (this.__internal__.dispense.counter >= limit_counter) {
      this.internalClearSensing();
      this.__internal__.dispense.status = false;
      this.__internal__.dispense.dispensing = false;
      return false;
    }
    this.__internal__.dispense.counter = parseFloat((0.1 + this.__internal__.dispense.counter).toFixed(1));

    if (this.__internal__.dispense.counter % 1 === 0) {
      this.dispatch('dispensing', {
        status: this.__internal__.dispense.status,
        counter: this.__internal__.dispense.counter,
        limit: limit_counter,
      });
    }

    return null;
  }

  async internalDispenseStatus() {
    if (this.__internal__.dispense.must_response) {
      await wait(this.__internal__.time.response_engines + 10);
      if (this.__internal__.dispense.status === 'no-response') {
        this.internalClearSensing();
        this.__internal__.dispense.status = false;
        this.dispatch('not-dispensed', { reason: 'no-response' });
        return { status: false, error: 'no-response' };
      }
    }

    this.__internal__.dispense.status = null;
    this.__internal__.dispense.dispensing = true;
    this.dispatch('internal:dispense:running', {});
    const this1 = this;
    return new Promise((resolve) => {
      this.__internal__.interval.waiting_sense = setInterval(() => {
        switch (this1.__internal__.dispense.status) {
          case null:
            if (this1.internalDispensingProcess() === false) {
              this1.internalClearSensing();
              this1.dispatch('not-dispensed', { reason: 'timeout' });
              resolve({ status: false, error: 'timeout' });
            }
            break;
          case true:
            this1.internalClearSensing();
            this1.__internal__.dispense.status = true;
            this1.dispatch('dispensed', {});
            resolve({ status: true, error: null });
            break;
          case false:
            this1.internalClearSensing();
            this1.__internal__.dispense.status = false;
            this1.dispatch('not-dispensed', { reason: 'no-stock' });
            resolve({ status: false, error: null });
            break;
          case 'elevator-locked':
            this1.internalClearSensing();
            this1.__internal__.dispense.status = false;
            this1.dispatch('not-dispensed', { reason: 'elevator-locked' });
            resolve({ status: false, error: 'elevator-locked' });
            break;
          case 'no-response':
            this1.internalClearSensing();
            this1.__internal__.dispense.status = false;
            this1.dispatch('not-dispensed', { reason: 'no-response' });
            resolve({ status: false, error: 'no-response' });
            break;
        }
      }, this.__internal__.time.sense);
    });
  }

  async internalDispense(code) {
    if (this.isDispensing) throw new Error('Another dispensing process is running');

    if (!Emulator.enable && !this.__internal__.serial.connected) {
      await this.serialConnect();
      if (!this.__internal__.serial.connected) {
        throw new Error('Serial device not connected');
      }
    }

    if (this.__internal__.serial.queue.length === 0) {
      await this.appendToQueue(code, 'dispense');
      return await this.internalDispenseStatus();
    }

    return new Promise((resolve) => {
      // wait until the queue is empty
      const interval = setInterval(async () => {
        if (this.__internal__.serial.queue.length > 0) return;

        clearInterval(interval);
        await this.appendToQueue(code, 'dispense');
        const r = await this.internalDispenseStatus();
        resolve(r);
      }, 100);
    });
  }

  __emulate(data) {
    if (typeof data.code !== 'object') {
      console.error(`Invalid data to make an emulation`);
      return;
    }

    if (!this.__internal__.serial.connected) {
      this.__internal__.serial.connected = true;
      this.dispatch('serial:connected');
      Devices.instance.dispatch('change');
      if (this.__internal__.interval.reconnection) {
        clearInterval(this.__internal__.interval.reconnection);
        this.__internal__.interval.reconnection = 0;
      }
    }

    if (this.__internal__.timeout.until_response) {
      clearTimeout(this.__internal__.timeout.until_response);
      this.__internal__.timeout.until_response = 0;
    }

    const serial_data = [];
    for (const byte in data.code) {
      serial_data.push(data.code[byte].toString().padStart(2, '0').toLowerCase());
    }

    this.serialMessage(serial_data);
  }

  /**
   * @deprecated Use listenOnChannel instead
   * @param {string|number} channel
   */
  set listenOnPort(channel) {
    this.listenOnChannel = channel;
  }

  /**
   * @deprecated Use listenOnChannel instead
   */
  get listenOnPort() {
    return this.__internal__.device.listen_on_port ?? 1;
  }
}
