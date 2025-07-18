import { Kernel } from './kernel.js';
import { Devices } from '../utils/devices.js';
import { Locker as LockerCommands } from '@danidoble/webserial-vending-commands';
import { wait } from '../utils/utils.js';

export class Locker extends Kernel {
  #_is_matrix_test = false;
  #_active_open_cell = 0;
  #_percentage_test_matrix = 0;

  constructor({ filters = null, config_port = null, no_device = 1, device_listen_on_port = 3 } = {}) {
    super({ filters, config_port, no_device, device_listen_on_port });
    this.__internal__.device.type = 'locker';
    if (Devices.getCustom(this.typeDevice, no_device))
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    this.__internal__.time.response_engines = 1_000;
    this.__internal__.device.milliseconds = 666;
    this.__internal__.dispense.limit_counter = 1;
    Devices.add(this);
    this.#registerAvailableListenersLocker();
  }

  #registerAvailableListenersLocker() {
    const _ = ['percentage:disable', 'percentage:enable', 'percentage:open'];
    for (const event of _) {
      this.serialRegisterAvailableListener(event);
    }
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

    switch (code[1]) {
      case '08': // status
        message.name = `Connection with the serial device completed.`;
        message.description = `Your connection with the serial device was successfully completed.`;
        message.request = `connect`;
        message.no_code = 100;
        break;
      case '07': // cell
        switch (code[4]) {
          case '00': // cell close
            message.name = `Cell closed.`;
            message.description = `The selected cell is closed.`;
            message.request = `dispense`;
            message.no_code = 1102;
            this.__internal__.dispense.status = false;
            this.dispatch('dispensed', {});
            if (this.#_is_matrix_test && this.#_active_open_cell >= 89) {
              message.finished_test = true;
              this.#_is_matrix_test = false;
              this.#_active_open_cell = 0;
            } else if (this.#_is_matrix_test) {
              message.finished_test = false;
            }
            break;
          case '01': // cell open by status
          case '04': // cell open by request
            message.name = `Cell open.`;
            message.description = `The selected cell was open successfully.`;
            message.request = `dispense`;
            message.no_code = 102;
            this.__internal__.dispense.status = true;
            this.dispatch('dispensed', {});
            if (this.#_is_matrix_test && this.#_active_open_cell >= 89) {
              message.finished_test = true;
              this.#_is_matrix_test = false;
              this.#_active_open_cell = 0;
            } else if (this.#_is_matrix_test) {
              message.finished_test = false;
            }
            break;
          case '05': // cell inactive
            message.name = `Cell inactive.`;
            message.description = `The selected cell is inactive or doesn't exist.`;
            message.request = `dispense`;
            message.no_code = 101;
            this.__internal__.dispense.status = false;
            this.dispatch('not-dispensed', {});
            if (this.#_is_matrix_test && this.#_active_open_cell >= 89) {
              message.finished_test = true;
              this.#_is_matrix_test = false;
              this.#_active_open_cell = 0;
            } else if (this.#_is_matrix_test) {
              message.finished_test = false;
            }
            break;

          default:
            break;
        }
        break;
      case '06': // config cell
        message.name = `Configuration applied.`;
        message.description = `The configuration was successfully applied.`;
        message.request = `configure cell`;
        message.no_code = 103;
        break;

      default:
        message.request = `undefined`;
        message.name = `Response unrecognized`;
        message.description = `The response of application was received, but dont identify with any of current parameters`;
        message.no_code = 400;
        break;
    }

    this.dispatch('serial:message', message);
  }

  serialSetConnectionConstant(listen_on_port = 3) {
    return LockerCommands.connection({ channel: listen_on_port });
  }

  #resetTestMatrix() {
    this.#_is_matrix_test = false;
    this.#_active_open_cell = 0;
    this.#_percentage_test_matrix = 0;
  }

  #percentageOpenAll(dispensed = null) {
    this.#_percentage_test_matrix = Math.round((this.#_active_open_cell * 100) / 80);
    this.dispatch('percentage:open', { percentage: this.#_percentage_test_matrix, dispensed });
  }

  #percentageEnableAll() {
    this.#_percentage_test_matrix = Math.round((this.#_active_open_cell * 100) / 80);
    this.dispatch('percentage:enable', { percentage: this.#_percentage_test_matrix });
  }

  #percentageDisableAll() {
    this.#_percentage_test_matrix = Math.round((this.#_active_open_cell * 100) / 80);
    this.dispatch('percentage:disable', { percentage: this.#_percentage_test_matrix });
  }

  async dispense({ cell = 1, status = true } = {}) {
    setTimeout(() => {
      if (status === true) {
        this.#setDispensed();
      } else {
        this.#setNotDispensed();
      }
    }, this.__internal__.time.response_engines / 2);
    return await this.internalDispense(
      LockerCommands.openCell({
        cell,
        channel: this.__internal__.device.listen_on_port,
      })
    );
  }

  #setDispensed() {
    if (this.__internal__.dispense.dispensing) {
      this.__internal__.dispense.status = true;
    }
  }

  #setNotDispensed() {
    if (this.__internal__.dispense.dispensing) {
      this.__internal__.dispense.status = false;
    }
  }

  async status({ cell = 1 } = {}) {
    return await this.appendToQueue(
      LockerCommands.statusCell({
        cell,
        channel: this.__internal__.device.listen_on_port,
      }),
      'status'
    );
  }

  async lightScan({ since = 0, until = 10 } = {}) {
    return await this.appendToQueue(
      LockerCommands.lightScan({
        channel: this.__internal__.device.listen_on_port,
        since,
        until,
      }),
      'light-scan'
    );
  }

  async enable({ cell = 1 } = {}) {
    return await this.appendToQueue(
      LockerCommands.enableCell({
        cell,
        channel: this.__internal__.device.listen_on_port,
      }),
      'activate'
    );
  }

  async disable({ cell = 1 } = {}) {
    await this.appendToQueue(
      LockerCommands.disableCell({
        cell,
        channel: this.__internal__.device.listen_on_port,
      }),
      'disable'
    );
  }

  async openAll() {
    if (this.isDispensing) throw new Error('Another dispensing process is running');

    this.#resetTestMatrix();
    this.#_is_matrix_test = true;
    this.#percentageOpenAll();
    const dispensed = [];
    for (let i = 1; i <= 80; i++) {
      const tmp = await this.dispense({ cell: i, status: true });
      dispensed.push(tmp);
      this.#_active_open_cell = i;
      this.#percentageOpenAll();
    }
    this.#_active_open_cell = 80;
    this.#percentageOpenAll(dispensed);
    this.#resetTestMatrix();
  }

  async enableAll() {
    this.#resetTestMatrix();
    this.#_is_matrix_test = true;
    this.#percentageEnableAll();

    for (let i = 1; i <= 80; i++) {
      await this.enable({ cell: i });
      await wait(100);
      this.#_active_open_cell = i;
      this.#percentageEnableAll();
    }

    this.#_active_open_cell = 80;
    this.#percentageEnableAll();
    this.#resetTestMatrix();
  }

  async disableAll() {
    this.#resetTestMatrix();
    this.#_is_matrix_test = true;
    this.#percentageDisableAll();

    for (let i = 1; i <= 80; i++) {
      await this.disable({ cell: i });
      await wait(100);
      this.#_active_open_cell = i;
      this.#percentageDisableAll();
    }

    this.#_active_open_cell = 80;
    this.#percentageDisableAll();
    this.#resetTestMatrix();
  }
}
