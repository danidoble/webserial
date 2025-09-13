import { Kernel } from './kernel.js';
import { Devices } from '../utils/devices.js';
import { getSeconds, wait } from '../utils/utils.js';
import { Jofemar as JofemarCommands } from '@danidoble/webserial-vending-commands';

export class Jofemar extends Kernel {
  __device = {
    type: 'esplus',
    support_cart: false,
    withdraw: {
      in_process: false,
      seconds: 60,
      interval: 0,
    }, // waiting for user withdraw products
    cart: {
      in_process: false,
    },
    channels: {
      verification: {
        clear() {
          this.running = false;
          this.current = 1;
          this.channels = [];
        },
        running: false,
        start: 1,
        end: 80,
        current: 1,
        channels: [],
      },
    },
  };

  constructor({
    filters = null,
    config_port = null,
    no_device = 1,
    device_listen_on_port = 1,
    type = 'esplus',
    support_cart = true,
    socket = false,
  } = {}) {
    super({ filters, config_port, no_device, device_listen_on_port, socket });
    this.__internal__.device.type = 'jofemar';
    if (Devices.getCustom(this.typeDevice, no_device))
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    this.__internal__.dispense.must_response = true;
    this.__internal__.time.response_general = 800;
    this.__internal__.time.response_engines = 800;
    this.__internal__.dispense.limit_counter = 40;
    this.__internal__.dispense.timeout = 0;
    this.__internal__.dispense.timeout_time = 4e3;
    this.__internal__.dispense.interval = 0;
    this.__internal__.dispense.interval_time = 1e3;
    this.__internal__.device.hex_number = (128 + this.listenOnChannel).toString(16);
    this.__internal__.device.door_open = false;
    this.__internal__.dispense.elevator = {
      locking_time: 60,
      locking_interval: 0,
      need_reset: false,
    };
    this.deviceType = type;
    this.supportCart = support_cart;
    this.#registerAvailableListenersJofemar();
    Devices.add(this);
    this.#internalListenerJofemar();
  }

  set startChannelVerification(value) {
    const start = parseInt(value);
    if (isNaN(start)) throw new Error('Invalid start channel verification, must be a number');
    if (start < 1 || start > 126) throw new Error('Invalid start channel verification, valid range is 1 to 126');
    this.__device.channels.verification.start = start;
  }

  set endChannelVerification(value) {
    const end = parseInt(value);
    if (isNaN(end)) throw new Error('Invalid end channel verification, must be a number');
    if (end < 1 || end > 126) throw new Error('Invalid end channel verification, valid range is 1 to 126');
    this.__device.channels.verification.end = end;
  }

  set listenOnChannel(channel) {
    channel = parseInt(channel);
    if (isNaN(channel) || channel < 1 || channel > 31) throw new Error('Invalid port number, valid range is 1 to 31');
    this.__internal__.device.listen_on_port = channel;
    this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(channel);
    this.__internal__.device.hex_number = (128 + channel).toString(16);
  }

  /**
   * @deperecated
   * @param {string|number} channel
   */
  set listenOnPort(channel) {
    this.listenOnChannel = channel;
  }

  set deviceType(type) {
    if (typeof type !== 'string') throw new Error('Invalid device type, must be a string');
    this.__device.type = type;
  }

  set supportCart(support_cart) {
    if (typeof support_cart !== 'boolean') throw new Error('Invalid support cart, must be a boolean');
    this.__device.support_cart = support_cart;
  }

  #registerAvailableListenersJofemar() {
    const _ = [
      'dispensing:withdrawal',
      'command-executed',
      'keyboard:pressed',
      'door:event',
      'program:version',
      'machine:faults',
      'clock:registers',
      'machine:activity',
      'check:language',
      'check:beeper',
      'check:isolation-tray',
      'check:engine-voltage',
      'check:push-over',
      'check:extractor-after-dispense',
      'check:standby-after-collect',
      'check:standby-without-collect',
      'check:elevator-speed',
      'check:expiration-by-temperature',
      'check:temperature-before-expiration',
      'check:expiration-after',
      'check:temperature-scale',
      'check:machine-id',
      'temperature:working',
      'temperature:current',
      'jofemar:warning',
      'jofemar:error',
      'serial:message',
      'reset:errors',
      'channels',
      'channel:status',
      'machine:status',
    ];
    for (const event of _) {
      this.serialRegisterAvailableListener(event);
    }
  }

  #internalListenerJofemar() {
    this.on('internal:dispense:running', this.#startStatusDispenseInterval.bind(this));
  }

  serialSetConnectionConstant(listen_on_port = 1) {
    return JofemarCommands.connection({ channel: listen_on_port });
  }

  async #internalElevatorWaitingWithdrawal() {
    if (this.__internal__.dispense.elevator.locking_interval) return;

    if (this.__internal__.dispense.elevator.need_reset) {
      this.__internal__.dispense.elevator.need_reset = false;
      await this.resetWaitingProductRemovedError();
      await wait(500);
    }

    // await this.collect(); // this can be problematic with some machines so don't use it automatically

    const this1 = this;
    this.__internal__.dispense.status = 'elevator-locked';
    this.__internal__.dispense.elevator.locking_time = 60;

    return new Promise((resolve) => {
      this1.__internal__.dispense.elevator.locking_interval = setInterval(() => {
        this1.dispatch('dispensing:withdrawal', {
          elevator: true,
          seconds: this1.__internal__.dispense.elevator.locking_time,
          description: `Please recall products from the elevator`,
        });
        this1.__internal__.dispense.elevator.locking_time -= 1;
        if (this1.__internal__.dispense.elevator.locking_time <= 0) {
          clearInterval(this1.__internal__.dispense.elevator.locking_interval);
          this1.__internal__.dispense.elevator.locking_interval = 0;
          resolve(true);
        }
      }, 1e3);
    });
  }

  #internalMessageCommandExecuted(code, message) {
    message.name = `ok`;
    message.description = `The last command was executed successfully`;
    message.no_code = 1;
    this.dispatch('command-executed', message);
    return message;
  }

  #internalMessageKeyboardPushed(code, message) {
    message.additional = {
      hex: code,
      dec: this.hexToDec(code),
      ascii: null,
    };

    const ascii = {
      30: '0',
      31: '1',
      32: '2',
      33: '3',
      34: '4',
      35: '5',
      36: '6',
      37: '7',
      38: '8',
      39: '9',
      '2a': '*',
      23: '#',
      41: 'A',
      42: 'B',
      43: 'C',
      44: 'D',
    };

    message.additional.ascii = ascii[code] ?? null;
    message.name = `Key pressed`;
    message.description = `The key ${message.additional.ascii} was pressed`;
    message.no_code = 2;
    this.dispatch('keyboard:pressed', message.additional);
    return message;
  }

  #internalMessageDoorEvent(code, message) {
    message.additional = { open: false };
    message.no_code = 3;
    if (code === '4f') {
      message.name = `door open`;
      message.description = `The door was opened`;
      message.additional.open = true;
      this.__internal__.device.door_open = true;
      this.dispatch('door:event', message.additional);
    } else if (code === '43') {
      message.name = `door close`;
      message.description = `The door was closed`;
      message.additional.open = false;
      this.__internal__.device.door_open = false;
      this.dispatch('door:event', message.additional);
    } else {
      message.name = `door event`;
      message.description = `The door event received is unknown`;
      this.dispatch('door:event', { open: message.additional.open, message });
    }
    return message;
  }

  #internalMessageChannelStatus(code, message) {
    message.no_code = 404;
    let machine = code[5] ?? null;
    if (machine && this.listenOnChannel > 1) {
      machine = this.hexToDec(machine) - this.listenOnChannel + 1;
      machine = this.decToHex(machine);
    }
    if (!machine) return message;

    if (machine === 'FD') {
      // disconnected
      message.no_code = 4;
      message.name = `channel disconnected`;
      message.description = `The channel is disconnected`;
      message.additional = { active: false };
    } else if (machine === 'FC') {
      // connected
      message.no_code = 5;
      message.name = `channel connected`;
      message.description = `The channel is connected`;
      message.additional = { active: true };
    } else {
      // sold out
      message.no_code = 6;
      message.name = `channel sold out`;
      message.description = `The channel is empty`;
      message.additional = { active: true };
    }

    if (this.__device.channels.verification.running) {
      this.__device.channels.verification.channels.push({
        selection: this.__device.channels.verification.current,
        active: message.additional.active,
      });
      message.additional.selection = this.__device.channels.verification.current;
    }

    this.dispatch('channel:status', message.additional);
    return message;
  }

  #internalMessageProgramVersion(code, message) {
    message.no_code = 39;
    message.name = `Program version`;
    const hex = code.slice(4, 12);
    const version = hex.map((hex) => String.fromCharCode(this.hexToDec(hex))).join('');
    message.additional = { version, hex };
    message.description = `The program version is ${version}`;

    this.dispatch('program:version', message.additional);
    return message;
  }

  #internalMessageMachineFaults(code, message) {
    message.no_code = 39;
    message.name = `Machine faults`;
    message.description = `No faults detected`;
    message.additional = { no_faults: 0, faults: [] };
    const bytes = code.slice(4, -3);
    if (bytes.length > 1 && bytes[0] !== '30') {
      message.description = `Machine has faults`;
      const faults = {
        31: 'Busy',
        32: 'Invalid tray',
        33: 'Invalid channel',
        34: 'Empty channel',
        35: 'Jam in elevator engine',
        36: 'Malfunction in the elevator belt or product detector',
        37: 'Failure in one of the photo transistors in the cabinet',
        38: 'No channels detected',
        39: 'Product detector fault',
        41: 'Machine display is disconnected',
        42: 'Product alarm under elevator',
        43: 'Error when elevator approaching to a position',
        44: 'Fault in keyboard',
        45: 'Eeprom writing error',
        46: 'Fault communicating with temperature control',
        47: 'The thermometer is disconnected',
        48: 'Thermometer programming lost',
        49: 'Thermometer faulty',
        '4a': 'Channels power consumption detector faulty',
        '4b': 'Elevator does not find channel or tray',
        '4c': 'Elevator does not find delivery product position',
        '4d': 'Interior of elevator blocked',
        '4e': 'Error in tester of product detector',
        '4f': 'Waiting for product to be removed',
        50: 'Product expired by temperature reasons',
        51: 'Automatic door faulty',
        59: 'Product is expired',
        '5a': 'Product is expired',
        61: 'Product is expired',
        62: 'Product is expired',
        63: 'Product is expired',
        64: "Product detector didn't change during its verification test",
      };
      for (const byte of bytes) {
        if (faults[byte]) {
          message.additional.faults.push(faults[byte]);
          message.additional.no_faults++;
        }
      }
    }

    this.dispatch('machine:faults', message.additional);
    return message;
  }

  #internalMessageClockRegisters(code, message) {
    message.no_code = 40;
    message.name = `Clock registers`;
    message.description = `Clock registers`;

    const bytes = code.slice(4, -3); // 14 bytes date -> hh:mm DD-MM-YY (ASCII)
    const formatted = bytes.map((hex) => String.fromCharCode(this.hexToDec(hex))).join('');
    const [time, date1] = formatted.split(' ');
    const [hours, minutes] = time.split(':');
    const [day, month, year] = date1.split('-');
    const date = new Date(
      2000 + parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    );

    message.additional = {
      day,
      month,
      year,
      hours,
      minutes,
      formatted,
      date,
      hex: bytes,
    };

    this.dispatch('clock:registers', message.additional);
    return message;
  }

  #internalMessageMachineActivity(code, message) {
    message.no_code = 41;
    message.name = `Machine activity`;
    message.description = `Events from read machine activity`;
    const ascii = String.fromCharCode(this.hexToDec(code[4]));
    if (ascii !== '0') {
      const bytes = code.slice(5, -3);
      if (ascii === 'T' && bytes.length === 4) {
        // Time (seconds) DU.d -> D:Dozens U:Units d:Decimals
        const dozens = String.fromCharCode(this.hexToDec(bytes[0]));
        const units = String.fromCharCode(this.hexToDec(bytes[1]));
        // implicit the 2nd byte is the decimal point
        const decimals = String.fromCharCode(this.hexToDec(bytes[3]));

        message.additional = {
          ascii,
          type: 'DU.d',
          dozens,
          units,
          decimals,
          time: parseFloat(`${dozens}${units}.${decimals}`),
          meaning: 'Extraction time (in seconds)',
        };
      } else if (['B', 'D', 'E', 'F', 'G'].includes(ascii) && bytes.length === 3) {
        // HDU -> H:Hundreds D:Dozens U:Units
        const hundreds = String.fromCharCode(this.hexToDec(bytes[0]));
        const dozens = String.fromCharCode(this.hexToDec(bytes[1]));
        const decimals = String.fromCharCode(this.hexToDec(bytes[2]));
        const channel = parseInt(`${hundreds}${dozens}${decimals}`);

        const meanings = {
          B: 'Error on going to tray channel',
          D: 'Error on product detector',
          E: 'Extraction of channel ok',
          F: 'Error on engine intensity detection',
          G: 'Error on product exit door',
        };

        message.additional = {
          type: 'HDU',
          hundreds,
          dozens,
          decimals,
          channel,
          selection: channel - 109,
          ascii,
          meaning: meanings[ascii] ?? 'Unknown',
        };
      } else if (bytes.length === 13) {
        // hhmmssWddMMAA -> hh:hours mm:minutes ss:seconds W:day of weak dd:day of month MM:month AA:year
        const _date = bytes.map((hex) => String.fromCharCode(this.hexToDec(hex))).join('');
        const hh = parseInt(_date.slice(0, 2));
        const mm = parseInt(_date.slice(2, 4));
        const ss = parseInt(_date.slice(4, 6));
        const dd = parseInt(_date.slice(7, 9));
        const MM = parseInt(_date.slice(9, 11)) - 1;
        const AA = 2000 + parseInt(_date.slice(11, 13));
        const date = new Date(AA, MM, dd, hh, mm, ss);

        const meanings = {
          A: 'Attempt to close product exit door',
          C: 'Closing of exterior door',
          H: 'Error on opening of product exit door',
          I: 'New attempt to arrive at product exit position after an error on first attempt',
          J: 'Power on cooling unit',
          K: 'Power off cooling unit',
          L: 'Start of defrosting',
          M: 'End of defrosting',
          O: 'Opening of exterior door',
          R: 'Memory reset',
          S: 'Error on going to product exit position',
          Y: 'Power on machine',
          Z: 'Power off machine',
          c: 'Closing of inner door',
          e: 'New attempt to extract from channel due no product detection when elevator arrived to product exit position',
          o: 'Opening of inner door',
        };

        message.additional = {
          type: 'hhmmssWddMMAA',
          date,
          hex: bytes,
          formatted: date.toLocaleString(),
          ascii,
          meaning: meanings[ascii] ?? 'Unknown',
        };
      }
    }

    this.dispatch('machine:activity', message.additional);
    return message;
  }

  #internalMessageCheckLanguage(code, message) {
    const languages = {
      30: 'Spanish',
      31: 'English',
      32: 'French',
    };

    message.no_code = 42;
    message.name = `Language`;
    message.description = `The language is ${languages[code] ?? 'unknown'}`;
    message.additional = {
      hex: code,
      language: languages[code] ?? 'unknown',
    };

    this.dispatch('check:language', message.additional);
    return message;
  }

  #internalMessageCheckBeeper(code, message) {
    message.no_code = 43;
    message.name = `Beeper`;
    message.description = `The beeper is ${code === '30' ? 'on' : 'off'}`;
    message.additional = {
      hex: code,
      beeper: code === '30',
    };

    this.dispatch('check:beeper', message.additional);
    return message;
  }

  #internalMessageCheckIsolationTray(code, message) {
    message.no_code = 44;
    message.name = `Isolation tray`;
    message.description = `Isolation tray`;

    const tray = this.hexToDec(code) - 139;
    message.additional = {
      hex: code,
      tray,
    };

    this.dispatch('check:isolation-tray', message.additional);
    return message;
  }

  #internalMessageCheckEngineVoltage(code, message) {
    message.no_code = 45;
    message.name = `Engine voltage`;
    message.description = `Engine voltage`;
    const voltage = (this.hexToDec(code) - 128) / 2 + 5;
    message.additional = {
      hex: code,
      voltage,
    };

    this.dispatch('check:engine-voltage', message.additional);
    return message;
  }

  #internalMessageCheckPushOver(code, message) {
    message.no_code = 46;
    message.name = `Push over`;
    message.description = `Push over`;

    const push = code === '30';
    message.additional = {
      hex: code,
      push,
    };

    this.dispatch('check:push-over', message.additional);
    return message;
  }

  #internalMessageCheckExtractorAfterDispense(code, message) {
    message.no_code = 47;
    message.name = `Extractor after dispense`;
    message.description = `Extractor after dispense`;

    const seconds = (this.hexToDec(code) - 128) / 10;
    message.additional = {
      hex: code,
      seconds,
    };

    this.dispatch('check:extractor-after-dispense', message.additional);
    return message;
  }

  #internalMessageCheckStandbyAfterCollect(code, message) {
    message.no_code = 48;
    message.name = `Standby after collect`;
    message.description = `Time to standby after collect product`;

    const seconds = this.hexToDec(code) - 128;
    message.additional = {
      hex: code,
      seconds,
    };

    this.dispatch('check:standby-after-collect', message.additional);
    return message;
  }

  #internalMessageCheckStandbyWithoutCollect(code, message) {
    message.no_code = 49;
    message.name = `Standby without collect`;
    message.description = `Time to standby when product delivery is not collected`;

    const minutes = this.hexToDec(code) - 128;
    message.additional = {
      hex: code,
      minutes,
    };

    this.dispatch('check:standby-without-collect', message.additional);
    return message;
  }

  #internalMessageCheckElevatorSpeed(code, message) {
    message.no_code = 50;
    message.name = `Elevator speed`;
    message.description = `Elevator speed`;

    const speed = code === '30' ? 'low' : 'high';
    message.additional = {
      hex: code,
      speed,
    };

    this.dispatch('check:elevator-speed', message.additional);
    return message;
  }

  #internalMessageCheckExpirationByTemperature(code, message) {
    message.no_code = 51;
    message.name = `Temperature expiration`;
    message.description = `Temperature expiration`;

    const enabled = code === '31';
    message.additional = {
      hex: code,
      enabled,
    };

    this.dispatch('check:expiration-by-temperature', message.additional);
    return message;
  }

  #internalMessageCheckTemperatureBeforeExpiration(code, message) {
    message.no_code = 52;
    message.name = `Temperature before expiration`;
    message.description = `Temperature before expiration`;

    const temperature = (this.hexToDec(code) - 128) / 2;
    message.additional = {
      hex: code,
      temperature,
    };

    this.dispatch('check:temperature-before-expiration', message.additional);
    return message;
  }

  #internalMessageCheckExpirationAfter(code, message) {
    message.no_code = 53;
    message.name = `Time before expiration`;
    message.description = `Time before expiration`;

    const minutes = this.hexToDec(code) - 128;
    message.additional = {
      hex: code,
      minutes,
    };

    this.dispatch('check:expiration-after', message.additional);
    return message;
  }

  #internalMessageCheckTemperatureScale(code, message) {
    message.no_code = 54;
    message.name = `Temperature scale`;
    message.description = `Temperature scale`;

    const scale = code === '43' ? 'Celsius' : 'Fahrenheit';
    message.additional = {
      hex: code,
      scale,
    };

    this.dispatch('check:temperature-scale', message.additional);
    return message;
  }

  #internalMessageCheckMachineId(code, message) {
    message.no_code = 54;
    message.name = `Machine ID`;
    message.description = `Machine ID`;

    message.additional = { hex: code[4], full_hex: code };

    this.dispatch('check:machine-id', message.additional);
    return message;
  }

  #internalMessageWorkingTemperature(code, message) {
    message.no_code = 7;
    message.name = `working temperature`;
    message.description = `The working temperature is ${code}`;
    message.additional = {
      hex: code,
      temperature: {
        traditional: (this.hexToDec(code) - this.hexToDec('80')) / 2,
        ice_plus: (this.hexToDec(code) - this.hexToDec('80')) / 2 - 25.5,
      },
    };
    this.dispatch('temperature:working', message.additional);
    return message;
  }

  #internalMessageCurrentTemperature(code, message) {
    message.no_code = 8;
    message.name = `current temperature`;

    message.additional = {
      sign: null,
      tens: null,
      units: null,
      decimals: null,
      type_degrees: null,
      formatted: null,
      decimal_point: code[7] === '2e' ? '.' : null,
      degrees: code[9] === '7f' ? '°' : null,
      error: null,
    };
    if (code[4] === '2b') {
      message.additional.sign = code[4] = '+';
    } else if (['2e', '2d'].includes(code[4])) {
      message.additional.sign = code[4] = '-';
    } else if (code[4] === '20') {
      message.additional.error = 'Error in thermometer';
    }

    if (this.hexToDec(code[5]) >= 48 && this.hexToDec(code[5]) <= 57) {
      message.additional.tens = this.hexToDec(code[5]) - 48;
    } else if (code[5] === '2a') {
      message.additional.error = 'Error in thermometer';
    }

    if (this.hexToDec(code[6]) >= 48 && this.hexToDec(code[6]) <= 57) {
      message.additional.units = this.hexToDec(code[6]) - 48;
    } else if (code[6] === '2a') {
      message.additional.error = 'Error in thermometer';
    }

    if (this.hexToDec(code[8]) >= 48 && this.hexToDec(code[8]) <= 57) {
      message.additional.decimals = this.hexToDec(code[8]) - 48;
    } else if (code[8] === '2a') {
      message.additional.error = 'Error in thermometer';
    }

    if (code[10] === '43') {
      message.additional.type_degrees = 'C';
    } else if (code[10] === '46') {
      message.additional.type_degrees = 'F';
    }

    if (message.additional.error === 'Error in thermometer') {
      message.additional.formatted = 'Error in thermometer';
      message.description = `The current temperature cannot be read because there is an error in the thermometer`;
    } else {
      message.additional.formatted =
        (message.additional.sign ?? '') +
        (message.additional.tens ?? '') +
        (message.additional.units ?? '') +
        (message.additional.decimal_point ?? '') +
        (message.additional.decimals ?? '') +
        (message.additional.degrees ?? '') +
        (message.additional.type_degrees ?? '');
      message.description = `The current temperature is ${message.additional.formatted}`;
    }

    this.dispatch('temperature:current', message.additional);
    return message;
  }

  #internalMessageByte0Case02(code, message, aux_machine = 128) {
    if (code[1]) {
      message.additional.machine.hex = code[1];
      message.additional.machine.dec = this.hexToDec(code[1]) - aux_machine;
    }

    if (!(code[1] && code[2])) {
      //message.request = `unknown`; // implicit
      message = this.#internalMessageCommandExecuted(code, message);
    } else {
      switch (code[2]) {
        case '54':
          message.request = `--automatic`;
          message = this.#internalMessageKeyboardPushed(code[3], message);
          break;
        case '50':
          message.request = `--automatic`;
          message = this.#internalMessageDoorEvent(code[3], message);
          break;
        case '43':
          message.request = `check-data`;
          switch (code[3]) {
            case '41' /*A*/:
              message = this.#internalMessageMachineActivity(code, message);
              break;
            case '43' /*C*/:
              message.request = `channel-status`;
              message = this.#internalMessageChannelStatus(code, message);
              break;
            case '50' /*P*/:
              message = this.#internalMessageProgramVersion(code, message);
              break;
            case '53' /*S*/:
              message = this.#internalMessageMachineFaults(code, message);
              break;
            case '54' /*T*/:
              message.request = `working-temperature`;
              message = this.#internalMessageWorkingTemperature(code[4], message);
              break;
            case '72' /*r*/:
              message = this.#internalMessageClockRegisters(code, message);
              break;
            case '74' /*t*/:
              message.request = `current-temperature`;
              message = this.#internalMessageCurrentTemperature(code, message);
              break;
            case '49' /*I*/:
              message = this.#internalMessageCheckLanguage(code[4], message);
              break;
            case '5a' /*Z*/:
              message = this.#internalMessageCheckBeeper(code[4], message);
              break;
            case '42' /*B*/:
              message = this.#internalMessageCheckIsolationTray(code[4], message);
              break;
            case '47' /*G*/:
              message = this.#internalMessageCheckEngineVoltage(code[4], message);
              break;
            case '4e' /*N*/:
              message = this.#internalMessageCheckMachineId(code, message);
              break;
            case '4f' /*O*/:
              message = this.#internalMessageCheckPushOver(code[4], message);
              break;
            case '45' /*E*/:
              message = this.#internalMessageCheckExtractorAfterDispense(code[4], message);
              break;
            case '46' /*F*/:
              message = this.#internalMessageCheckStandbyAfterCollect(code[4], message);
              break;
            case '48' /*H*/:
              message = this.#internalMessageCheckStandbyWithoutCollect(code[4], message);
              break;
            case '76' /*v*/:
              message = this.#internalMessageCheckElevatorSpeed(code[4], message);
              break;
            case '63' /*c*/:
              message = this.#internalMessageCheckExpirationByTemperature(code[4], message);
              break;
            case '65' /*e*/:
              message = this.#internalMessageCheckTemperatureBeforeExpiration(code[4], message);
              break;
            case '66' /*f*/:
              message = this.#internalMessageCheckExpirationAfter(code[4], message);
              break;
            case '67' /*g*/:
              message = this.#internalMessageCheckTemperatureScale(code[4], message);
              break;
          }
          break;
      }
    }

    return message;
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

  #setElevatorBlocked() {
    if (this.__internal__.dispense.dispensing) {
      this.__internal__.dispense.status = 'elevator-locked';
    }
  }

  /**
   * Dispatch a warning message
   * @param {null|string} type
   * @param {string} severity
   */
  #jofemarWarning({ type = null, severity = 'low' } = {}) {
    this.dispatch(`jofemar:warning`, { type, severity });
  }

  /**
   * Dispatch an error message
   * @param {null|string} type
   * @param {string} severity
   */
  #jofemarError({ type = null, severity = 'high' } = {}) {
    this.dispatch(`jofemar:error`, { type, severity });
  }

  #internalMessageByte0Case06(code, message) {
    message.request = 'status';
    if (code[1] && !code[2]) {
      switch (code[1]) {
        case '30':
          message.name = `Machine ready`;
          message.description = `The machine is ready for instructions`;
          message.no_code = 9;
          this.#setDispensed();
          break;
        case '31':
          message.name = `Machine busy`;
          message.description = `The machine is busy right now`;
          message.no_code = 10;
          break;
        case '32':
          message.name = `Invalid tray`;
          message.description = `The tray requested is invalid`;
          message.no_code = 11;
          this.#setNotDispensed();
          this.#jofemarWarning({ type: 'invalid-tray' });
          break;
        case '33':
          message.name = `Invalid channel`;
          message.description = `The channel requested is invalid`;
          message.no_code = 12;
          this.#setNotDispensed();
          this.#jofemarWarning({ type: 'invalid-channel' });
          break;
        case '34':
          message.name = `Empty channel`;
          message.description = `The channel requested is empty`;
          message.no_code = 13;
          this.#setNotDispensed();
          this.#jofemarWarning({ type: 'empty-channel' });
          break;
        case '35':
          message.name = `Jam`;
          message.description = `Jam in elevator engine`;
          message.no_code = 14;
          this.#setNotDispensed();
          this.#jofemarError({ type: 'jam' });
          break;
        case '36':
          message.name = `Malfunction`;
          message.description = `Malfunction in the elevator belt or product detector`;
          message.no_code = 15;
          this.#setNotDispensed();
          this.#jofemarError({ type: 'malfunction' });
          break;
        case '37':
          message.name = `Photo transistors`;
          message.description = `Failure in one of the photo transistors in the cabinet`;
          message.no_code = 16;
          this.#setNotDispensed();
          this.#jofemarError({ type: 'photo-transistors' });
          break;
        case '38':
          message.name = `Without channels`;
          message.description = `No channels detected`;
          message.no_code = 17;
          this.#setNotDispensed();
          this.#jofemarError({ type: 'without-channels' });
          break;
        case '39':
          message.name = `Product detector fault`;
          message.description = `Product detector fault`;
          message.no_code = 18;
          this.#setElevatorBlocked();
          this.#jofemarWarning({ type: 'fault-product-detector' });
          break;
        case '41':
          message.name = `Fault in 485 BUS`;
          message.description = `Machine display is disconnected`;
          message.no_code = 19;
          this.#setDispensed();
          this.#jofemarWarning({ type: 'display-disconnected' });
          break;
        case '42':
          message.name = `Product under elevator`;
          message.description = `Product alarm under elevator`;
          message.no_code = 20;
          this.#setNotDispensed();
          this.#jofemarWarning({ type: 'product-under-elevator' });
          break;
        case '43':
          message.name = `Error when elevator approaching to a position`;
          message.description = `Error when elevator approaching to a position`;
          message.no_code = 21;
          this.#setDispensed();
          this.#jofemarWarning({ type: 'error-approaching-position', severity: 'high' });
          break;
        case '44':
          message.name = `Fault in keyboard`;
          message.description = `Fault in keyboard`;
          message.no_code = 22;
          this.#setNotDispensed();
          this.#jofemarError({ type: 'fault-keyboard' });
          break;
        case '45':
          message.name = `Eeprom writing error`;
          message.description = `Eeprom writing error`;
          message.no_code = 23;
          this.#setNotDispensed();
          this.#jofemarError({ type: 'eeprom-writing-error', severity: 'critical' });
          break;
        case '46':
          message.name = `Fault communicating with temperature control`;
          message.description = `Fault communicating with temperature control`;
          message.no_code = 24;
          this.#setDispensed();
          this.#jofemarWarning({ type: 'fault-temperature-control' });
          break;
        case '47':
          message.name = `Thermometer disconnected`;
          message.description = `The thermometer is disconnected`;
          message.no_code = 25;
          this.#setDispensed();
          this.#jofemarWarning({ type: 'thermometer-disconnected' });
          break;
        case '48':
          message.name = `Thermometer programming lost`;
          message.description = `Thermometer programming lost`;
          message.no_code = 26;
          this.#setDispensed();
          this.#jofemarWarning({ type: 'thermometer-programming-lost' });
          break;
        case '49':
          message.name = `Thermometer faulty`;
          message.description = `Thermometer faulty`;
          message.no_code = 27;
          this.#setDispensed();
          this.#jofemarWarning({ type: 'thermometer-faulty' });
          break;
        case '4a':
          message.name = `Channels power consumption detector faulty`;
          message.description = `Channels power consumption detector faulty`;
          message.no_code = 28;
          this.#setNotDispensed();
          this.#jofemarError({ type: 'channels-power-consumption-detector-faulty', severity: 'critical' });
          break;
        case '4b':
          message.name = `Elevator does not find channel or tray`;
          message.description = `Elevator does not find channel or tray`;
          message.no_code = 29;
          this.#setNotDispensed();
          this.#jofemarWarning({ type: 'elevator-not-find-channel-tray' });
          break;
        case '4c':
          message.name = `Elevator does not find delivery product position`;
          message.description = `Elevator does not find delivery product position`;
          message.no_code = 30;
          this.#setNotDispensed();
          this.#jofemarError({ type: 'elevator-not-find-delivery-position' });
          break;
        case '4d':
          message.name = `Interior of elevator blocked`;
          message.description = `Interior of elevator blocked`;
          message.no_code = 31;
          this.#setElevatorBlocked();
          if (!this.__internal__.dispense.elevator.need_reset) {
            this.__internal__.dispense.elevator.need_reset = true;
          }
          this.#jofemarError({ type: 'interior-elevator-blocked', severity: 'low' });
          break;
        case '4e':
          message.name = `Error in tester of product detector`;
          message.description = `Error in tester of product detector`;
          message.no_code = 32;
          this.#setNotDispensed();
          this.#jofemarError({ type: 'error-tester-product-detector' });
          break;
        case '4f':
          message.name = `Waiting for product to be removed`;
          message.description = `Waiting for product to be removed`;
          message.no_code = 33;
          this.#setElevatorBlocked();
          break;
        case '50':
          message.name = `Product expired by temperature reasons`;
          message.description = `Product expired by temperature reasons`;
          message.no_code = 34;
          this.#setDispensed();
          this.#jofemarWarning({ type: 'product-expired-temperature' });
          break;
        case '51':
          message.name = `Automatic door faulty`;
          message.description = `Automatic door faulty`;
          message.no_code = 35;
          this.#setDispensed();
          this.#jofemarWarning({ type: 'automatic-door-faulty' });
          break;
        case '59':
        case '5a':
        case '61':
        case '62':
        case '63':
          message.name = `Product is expired`;
          message.description = `Product is expired`;
          message.additional = { nsf_alarm: 1 };
          switch (code[1]) {
            case '5a':
              message.additional.nsf_alarm = 2;
              break;
            case '61':
              message.additional.nsf_alarm = 3;
              break;
            case '62':
              message.additional.nsf_alarm = 4;
              break;
            case '63':
              message.additional.nsf_alarm = 5;
              break;
          }
          message.no_code = 36;
          this.#setDispensed();
          this.#jofemarWarning({ type: 'product-expired' });
          break;
        case '64':
          message.name = `Product detector didn't change during its verification test`;
          message.description = `Product detector didn't change during its verification test`;
          message.no_code = 37;
          this.#setDispensed();
          this.#jofemarWarning({ type: 'automatic-door-faulty' });
          break;
      }

      this.dispatch('machine:status', message);
    } else {
      message.name = 'executed';
      message.description = 'The last command was executed successfully';
      message.no_code = 8;
      if (!code[1] && this.__internal__.dispense.dispensing) {
        this.#setNotDispensed();
      }
    }

    return message;
  }

  serialMessage(code) {
    code = this.fixHexArray(code);

    const aux_machine = 128;
    let message = {
      code,
      name: null,
      description: null,
      request: 'unknown',
      no_code: 0,
      additional: {
        machine: {
          hex: null,
          dec: null,
        },
      },
    };

    switch (code[0]) {
      case '02':
        message = this.#internalMessageByte0Case02(code, message, aux_machine);
        break;
      case '06':
        message = this.#internalMessageByte0Case06(code, message);
        break;
      case '15':
        message.name = `Checksum error`;
        message.description = `The calculated checksum does not match the received checksum`;
        message.no_code = 38;
        this.#setNotDispensed();
        break;
      default:
        message.name = 'unknown';
        message.description = 'The message received is unknown';
        message.no_code = 404;
        break;
    }

    this.dispatch('serial:message', message);
  }

  productRemovedContinueDispensing() {
    if (!this.__internal__.dispense.elevator.locking_interval) return;
    this.__internal__.dispense.elevator.locking_time = 0;
  }

  /**
   * Dispense a product from the machine
   * @param {null|number|string} selection
   * @param {boolean} cart
   * @return {Promise<unknown>}
   */
  async dispense({ selection = 1, cart = false } = {}) {
    const bytes = JofemarCommands.dispense({ selection, cart, machineChannel: this.listenOnChannel });
    const tray = bytes[5];
    const channel = bytes[6];

    this.__internal__.dispense.backup_dispense = {
      selection,
      cart,
      channel,
      tray,
    };

    let r;
    do {
      r = await this.internalDispense(bytes);
      this.#clearDispenseWaitingStatus();
      if (r.error === 'elevator-locked') {
        await this.#internalElevatorWaitingWithdrawal();
      } else if (r.error === 'no-response') {
        await wait(1000);
      }
    } while (['elevator-locked', 'no-response'].includes(r.error));

    this.__internal__.dispense.backup_dispense = {};

    return r;
  }

  #clearDispenseWaitingStatus() {
    if (this.__internal__.dispense.timeout) {
      clearTimeout(this.__internal__.dispense.timeout);
    }
    if (this.__internal__.dispense.interval) {
      clearInterval(this.__internal__.dispense.interval);
    }
    this.__internal__.dispense.timeout = 0;
    this.__internal__.dispense.interval = 0;
  }

  #startStatusDispenseInterval() {
    if (this.__internal__.dispense.timeout) {
      clearTimeout(this.__internal__.dispense.timeout);
    }
    if (this.__internal__.dispense.interval) {
      clearInterval(this.__internal__.dispense.interval);
    }

    const this1 = this;
    this1.__internal__.dispense.timeout = setTimeout(() => {
      this1.__internal__.dispense.interval = setInterval(() => {
        this1.status().then(() => {});
      }, this1.__internal__.dispense.interval_time);
    }, this1.__internal__.dispense.timeout_time);
  }

  internalClearSensing() {
    super.internalClearSensing();

    if (this.__internal__.dispense.timeout) {
      clearTimeout(this.__internal__.dispense.timeout);
    }
    if (this.__internal__.dispense.interval) {
      clearInterval(this.__internal__.dispense.interval);
    }

    if (this.__internal__.serial.queue.length > 0) {
      // remove status from queue
      this.__internal__.serial.queue = this.__internal__.serial.queue.filter((item) => {
        return item.type !== 'status';
      });
    }
  }

  async endDispense() {
    const bytes = JofemarCommands.endCartDispense({ machineChannel: this.listenOnChannel });
    return await this.internalDispense(bytes);
  }

  async collect() {
    return await this.appendToQueue(JofemarCommands.collect({ machineChannel: this.listenOnChannel }), 'collect');
  }

  async #reset(param) {
    return await this.appendToQueue(
      JofemarCommands.reset({
        machineChannel: this.listenOnChannel,
        type: param,
      }),
      'reset'
    );
  }

  async resetSoldOutErrors() {
    return await this.#reset('soldOut');
  }

  async resetWaitingProductRemovedError() {
    return await this.#reset('waiting');
  }

  async resetMachineErrors() {
    if (this.__internal__.serial.queue.length === 0) {
      this.#dispatchResettingErrors();
      return await this.#reset('machine');
    }

    return new Promise((resolve) => {
      // wait until the queue is empty
      const interval = setInterval(async () => {
        if (this.__internal__.serial.queue.length > 0) return;

        clearInterval(interval);
        await this.#reset('machine');
        this.#dispatchResettingErrors();
        resolve(true);
      }, 100);
    });
  }

  #dispatchResettingErrors() {
    const duration = this.__device.type === 'iceplus' ? getSeconds(40) : getSeconds(25);
    const started_at = new Date();
    const _time = 1000 * duration + started_at.getTime();
    const finished_at = new Date(_time);

    this.dispatch('reset:errors', {
      description: 'Resetting machine errors',
      duration,
      started_at,
      finished_at,
    });
  }

  async resetAllErrors() {
    await this.resetWaitingProductRemovedError();
    await wait(200);
    await this.resetSoldOutErrors();
    await wait(400);
    return await this.resetMachineErrors();
  }

  async status() {
    return await this.appendToQueue(JofemarCommands.status({ machineChannel: this.listenOnChannel }), 'status');
  }

  async #lights(param) {
    return await this.appendToQueue(
      JofemarCommands.lights({
        machineChannel: this.listenOnChannel,
        type: param,
      }),
      'lights'
    );
  }

  async lightsOn() {
    return await this.#lights('on');
  }

  async lightsOff() {
    return await this.#lights('off');
  }

  async program(param1, param2) {
    return await this.appendToQueue(
      JofemarCommands.program({
        machineChannel: this.listenOnChannel,
        param1,
        param2,
      }),
      'program'
    );
  }

  async programDisplayLanguage({ language = 'spanish' } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programDisplayLanguage({
        machineChannel: this.listenOnChannel,
        language: language,
      }),
      'program'
    );
  }

  async programBeeper({ enable = true } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programBeeper({
        machineChannel: this.listenOnChannel,
        enable: enable,
      }),
      'program'
    );
  }

  async programDisableWorkingTemperature() {
    if (this.__device.type === 'iceplus') throw new Error('IcePlus does not support disable working temperature');

    return await this.appendToQueue(
      JofemarCommands.programDisableWorkingTemperature({
        machineChannel: this.listenOnChannel,
      }),
      'program'
    );
  }

  async programDisableThermometer() {
    return await this.appendToQueue(
      JofemarCommands.programDisableThermometer({
        machineChannel: this.listenOnChannel,
      }),
      'program'
    );
  }

  /**
   * Program the machine to work with a specific temperature
   * @param {number|string} degrees
   * @return {Promise<void>}
   */
  async programWorkingTemperature({ degrees = 0.5 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programWorkingTemperature({
        machineChannel: this.listenOnChannel,
        degrees: degrees,
        machineType: this.__device.type,
      }),
      'program'
    );
  }

  /**
   * @param {number|string} tray
   * @return {Promise<void>}
   */
  async programIsolationTray({ tray = 0 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programIsolationTray({
        machineChannel: this.listenOnChannel,
        tray,
      }),
      'program'
    );
  }

  /**
   * @param {number|string} seconds
   * @return {Promise<*>}
   */
  async programTimeToStandbyAfterCollect({ seconds = 15 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programTimeToStandbyAfterCollect({
        machineChannel: this.listenOnChannel,
        seconds,
      }),
      'program'
    );
  }

  /**
   * @param {number|string} seconds
   * @return {Promise<*>}
   */
  async programTimeToStandbyWithoutCollect({ minutes = 1 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programTimeToStandbyWithoutCollect({
        machineChannel: this.listenOnChannel,
        minutes,
      }),
      'program'
    );
  }

  async programElevatorSpeed({ speed = 'high' } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programElevatorSpeed({
        machineChannel: this.listenOnChannel,
        speed,
      }),
      'program'
    );
  }

  async programTemperatureExpiration({ enable = false } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programTemperatureExpiration({
        machineChannel: this.listenOnChannel,
        enable,
      }),
      'program'
    );
  }

  async programEnableTemperatureExpiration() {
    return await this.programTemperatureExpiration({ enable: true });
  }

  async programDisableTemperatureExpiration() {
    return await this.programTemperatureExpiration({ enable: false });
  }

  /**
   * @param {number|string} address
   * @return {Promise<*>}
   */
  async programMachineAddress({ address = 1 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programMachineAddress({
        machineChannel: this.listenOnChannel,
        address,
      }),
      'program'
    );
  }

  /**
   * @param {number|string} degrees
   * @return {Promise<*>}
   */
  async programTemperatureBeforeExpiration({ degrees = 0.5 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programTemperatureBeforeExpiration({
        machineChannel: this.listenOnChannel,
        degrees,
      }),
      'program'
    );
  }

  /**
   * @param {number|string} minutes
   * @return {Promise<*>}
   */
  async programTimeBeforeExpirationByTemperature({ minutes = 1 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programTimeBeforeExpirationByTemperature({
        machineChannel: this.listenOnChannel,
        minutes,
      }),
      'program'
    );
  }

  async programTemperatureScale({ scale = 'celsius' } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programTemperatureScale({
        machineChannel: this.listenOnChannel,
        scale,
      }),
      'program'
    );
  }

  /**
   * @param {number|string} selection
   * @param {number|string} voltage
   * @return {Promise<void>}
   */
  async programVoltageEngine({ selection = 1, voltage = 5 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programVoltageEngine({
        machineChannel: this.listenOnChannel,
        selection,
        voltage,
      }),
      'voltage-engine'
    );
  }

  /**
   * @param {number|string} selection
   * @param {boolean} enable
   * @return {Promise<void>}
   */
  async programPushOverProducts({ selection = 1, enable = true } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programPushOverProducts({
        machineChannel: this.listenOnChannel,
        selection,
        enable,
      }),
      'push-over-products'
    );
  }

  /**
   * @param {number|string} selection
   * @param {number|string} seconds
   * @return {Promise<void>}
   */
  async programChannelRunningAfterDispense({ selection = 1, seconds = 0 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programChannelRunningAfterDispense({
        machineChannel: this.listenOnChannel,
        selection,
        seconds,
      }),
      'channel-running-after-dispense'
    );
  }

  async checkData(type, aux = 'FF') {
    return await this.appendToQueue(
      JofemarCommands.checkData({
        machineChannel: this.listenOnChannel,
        type,
        aux,
      }),
      'check-data'
    );
  }

  async getDisplayLanguage() {
    return await this.appendToQueue(
      JofemarCommands.getDisplayLanguage({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getBeeper() {
    return await this.appendToQueue(JofemarCommands.getBeeper({ machineChannel: this.listenOnChannel }), 'check-data');
  }

  async getWorkingTemperature() {
    return await this.appendToQueue(
      JofemarCommands.getWorkingTemperature({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getIsolationTray() {
    return await this.appendToQueue(
      JofemarCommands.getIsolationTray({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getProgramVersion() {
    return await this.appendToQueue(
      JofemarCommands.getProgramVersion({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getFaults() {
    return await this.appendToQueue(JofemarCommands.getFaults({ machineChannel: this.listenOnChannel }), 'check-data');
  }

  async getMachineId() {
    return await this.appendToQueue(
      JofemarCommands.getMachineId({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getCurrentTemperature() {
    return await this.appendToQueue(
      JofemarCommands.getCurrentTemperature({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getTimeToStandbyAfterCollect() {
    return await this.appendToQueue(
      JofemarCommands.getTimeToStandbyAfterCollect({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getTimeToStandbyWithoutCollect() {
    return await this.appendToQueue(
      JofemarCommands.getTimeToStandbyWithoutCollect({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getElevatorSpeed() {
    return await this.appendToQueue(
      JofemarCommands.getElevatorSpeed({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getTemperatureExpiration() {
    return await this.appendToQueue(
      JofemarCommands.getTemperatureExpiration({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getTemperatureBeforeExpiration() {
    return await this.appendToQueue(
      JofemarCommands.getTemperatureBeforeExpiration({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getTimeBeforeExpirationByTemperature() {
    return await this.appendToQueue(
      JofemarCommands.getTimeBeforeExpirationByTemperature({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getTemperatureScale() {
    return await this.appendToQueue(
      JofemarCommands.getTemperatureScale({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getClockRegisters() {
    return await this.appendToQueue(
      JofemarCommands.getClockRegisters({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  async getMachineActivity() {
    return await this.appendToQueue(
      JofemarCommands.getMachineActivity({ machineChannel: this.listenOnChannel }),
      'check-data'
    );
  }

  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getVoltageEngine({ selection = 1 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.getVoltageEngine({
        machineChannel: this.listenOnChannel,
        selection,
      }),
      'check-data'
    );
  }

  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getChannelPresence({ selection = 1 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.getChannelPresence({
        machineChannel: this.listenOnChannel,
        selection,
      }),
      'check-data'
    );
  }

  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getPushOverProducts({ selection = 1 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.getPushOverProducts({
        machineChannel: this.listenOnChannel,
        selection,
      }),
      'check-data'
    );
  }

  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getChannelRunningAfterDispense({ selection = 1 } = {}) {
    return await this.appendToQueue(
      JofemarCommands.getChannelRunningAfterDispense({
        machineChannel: this.listenOnChannel,
        selection,
      }),
      'check-data'
    );
  }

  async setDisplayStandbyMessage({ message = '' } = {}) {
    return await this.appendToQueue(
      JofemarCommands.setDisplayStandbyMessage({
        machineChannel: this.listenOnChannel,
        message,
      }),
      'display'
    );
  }

  /**
   * @param {string} message
   * @param {number|string} seconds
   * @return {Promise<void>}
   */
  async setDisplayMessageTemporarily({ message = '', seconds = 1 }) {
    return this.appendToQueue(
      JofemarCommands.setDisplayMessageTemporarily({
        machineChannel: this.listenOnChannel,
        message,
        seconds,
      }),
      'display'
    );
  }

  /**
   * @param {string} message
   * @return {Promise<void>}
   */
  async setDisplayMessageUnlimited({ message = '' }) {
    return await this.appendToQueue(
      JofemarCommands.setDisplayMessageUnlimited({
        machineChannel: this.listenOnChannel,
        message,
      }),
      'display'
    );
  }

  async programClock({ date = new Date() } = {}) {
    return await this.appendToQueue(
      JofemarCommands.programClock({
        machineChannel: this.listenOnChannel,
        date,
      }),
      'clock'
    );
  }

  /**
   * @param {null|string} event
   * @param {boolean} enable
   * @return {Promise<void>}
   */
  async eventsConfig({ event = null, enable = true } = {}) {
    return await this.appendToQueue(
      JofemarCommands.eventsConfig({
        machineChannel: this.listenOnChannel,
        event,
        enable,
      }),
      'events-config'
    );
  }

  async eventEnable({ event = null } = {}) {
    return await this.appendToQueue(
      JofemarCommands.eventEnable({
        machineChannel: this.listenOnChannel,
        event,
      }),
      'events-config'
    );
  }

  async eventDisable({ event = null } = {}) {
    return await this.appendToQueue(
      JofemarCommands.eventEnable({
        machineChannel: this.listenOnChannel,
        event,
      }),
      'events-config'
    );
  }

  async sendCustomCode({ code = [] } = {}) {
    return await this.appendToQueue(
      JofemarCommands.sendCustomCode({
        machineChannel: this.listenOnChannel,
        code,
      }),
      'custom'
    );
  }

  async assignChannels() {
    const start = this.__device.channels.verification.start;
    const end = this.__device.channels.verification.end;
    if (start > end) throw new Error('Invalid range, start must be less than end');

    this.__device.channels.verification.clear();
    this.__device.channels.verification.running = true;
    for (let i = start; i <= end; i++) {
      this.__device.channels.verification.current = i;
      await this.getChannelPresence({ selection: i });
    }

    return new Promise((resolve) => {
      let interval = setInterval(() => {
        if (this.__device.channels.verification.channels.length === end - start + 1) {
          clearInterval(interval);
          this.dispatch('channels', { channels: this.__device.channels.verification.channels });
          this.__device.channels.verification.clear();
          resolve(true);
        }
      }, 500);
    });
  }
}
