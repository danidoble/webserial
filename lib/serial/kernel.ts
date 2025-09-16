import { wait } from '../utils/utils';
import { Emulator } from '../utils/emulator';
import { Devices } from '../utils/devices';
import { Core } from 'webserial-core';

export interface ConstructorParams {
  filters?: SerialPortFilter[] | null;
  config_port?: SerialOptions;
  no_device?: number;
  device_listen_on_channel?: number | string;
  bypassSerialBytesConnection?: boolean;
  socket?: boolean;
}

export interface DispenseResponse {
  error: string | null;
  status: boolean;
}

interface LastError {
  message: string | null;
  action: string | null;
  code: string | Uint8Array | Array<string> | Array<number> | null | number;
  no_code: number;
}

interface DeviceData {
  type: string;
  id: string;
  listen_on_port: number | null;
  door_open: boolean;
}

type SerialResponseAs = 'hex' | 'uint8' | 'string' | 'arraybuffer';

interface SerialResponse {
  length: number | null;
  buffer: Uint8Array;
  as: SerialResponseAs;
  replacer: RegExp | string;
  limiter: null | string | RegExp;
  prefixLimiter: boolean; // If true, the limiter is at the beginning of the message
  sufixLimiter: boolean; // If true, the limiter is at the end of the message
  delimited: boolean;
}

interface QueueData {
  bytes: string | Uint8Array | Array<string> | Array<number>;
  action: string;
}

type ParserSocketPort = {
  name: 'byte-length' | 'inter-byte-timeout';
  length?: number; // Length of each byte in the response, only for byte-length
  interval?: number; // Interval in milliseconds for inter-byte-timeout
};

type PortInfo = {
  path: string | null;
  vendorId: number | string | null;
  productId: number | string | null;
  parser: ParserSocketPort;
};

type SerialData = {
  socket: boolean;
  portInfo: PortInfo;
  aux_connecting: string;
  connecting: boolean;
  connected: boolean;
  port: SerialPort | null;
  last_action: string | null;
  response: SerialResponse;
  reader: ReadableStreamDefaultReader<Uint8Array> | null;
  input_done: Promise<void> | null;
  output_done: Promise<void> | null;
  input_stream: ReadableStream<Uint8Array> | null;
  output_stream: WritableStream<Uint8Array> | null;
  keep_reading: boolean;
  time_until_send_bytes: number | undefined | ReturnType<typeof setTimeout>;
  delay_first_connection: number;
  bytes_connection: string | Uint8Array | string[] | number[] | null;
  filters: SerialPortFilter[];
  config_port: SerialOptions;
  queue: QueueData[];
  running_queue: boolean;
  auto_response: any;
  free_timeout_ms: number;
  useRTSCTS: boolean;
};

interface TimeResponse {
  response_connection: number;
  response_engines: number;
  response_general: number;
  sense: number;
}

interface Timeout {
  until_response: number | ReturnType<typeof setTimeout>;
}

interface InternalIntervals {
  reconnection: number;
  waiting_sense: number;
}

export interface Internal {
  bypassSerialBytesConnection: boolean;
  auto_response: boolean;
  device_number: number;
  aux_port_connector: number;
  last_error: LastError;
  serial: SerialData;
  device: DeviceData;
  time: TimeResponse;
  timeout: Timeout;
  interval: InternalIntervals;
  dispense: {
    must_response: boolean;
    dispensing: boolean;
    status: boolean | null | 'no-response' | 'elevator-locked';
    counter: number;
    limit_counter: number;
    custom_limit_counter: number | null;
    backup_dispense: Record<string, any>;
  };
}

export class Kernel extends Core {
  declare __internal__: Internal;

  constructor(config: ConstructorParams = {}) {
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

  async timeout(bytes: string | Uint8Array | Array<string> | Array<number>, event: string) {
    await super.timeout(bytes, event);
    if (event === 'dispense') {
      this.__internal__.dispense.status = 'no-response';
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

  async internalDispenseStatus(): Promise<DispenseResponse> {
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

    return new Promise((resolve) => {
      this.__internal__.interval.waiting_sense = setInterval(() => {
        switch (this.__internal__.dispense.status) {
          case null:
            if (this.internalDispensingProcess() === false) {
              this.internalClearSensing();
              this.dispatch('not-dispensed', { reason: 'timeout' });
              resolve({ status: false, error: 'timeout' });
            }
            break;
          case true:
            this.internalClearSensing();
            this.__internal__.dispense.status = true;
            this.dispatch('dispensed', {});
            resolve({ status: true, error: null });
            break;
          case false:
            this.internalClearSensing();
            this.__internal__.dispense.status = false;
            this.dispatch('not-dispensed', { reason: 'no-stock' });
            resolve({ status: false, error: null });
            break;
          case 'elevator-locked':
            this.internalClearSensing();
            this.__internal__.dispense.status = false;
            this.dispatch('not-dispensed', { reason: 'elevator-locked' });
            resolve({ status: false, error: 'elevator-locked' });
            break;
          case 'no-response':
            this.internalClearSensing();
            this.__internal__.dispense.status = false;
            this.dispatch('not-dispensed', { reason: 'no-response' });
            resolve({ status: false, error: 'no-response' });
            break;
        }
      }, this.__internal__.time.sense);
    });
  }

  async internalDispense(code: string | Uint8Array | string[] | number[]): Promise<DispenseResponse> {
    if (this.isDispensing) throw new Error('Another dispensing process is running');
    this.__internal__.dispense.dispensing = true;

    if (!Emulator.enable && !this.__internal__.serial.connected) {
      await this.serialConnect();
      if (!this.__internal__.serial.connected) {
        this.__internal__.dispense.dispensing = false;
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

  __emulate(data: { code: string[] | number[] | Uint8Array }) {
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

  fixHexArray(array: Array<string> | Array<number>): string[] {
    return array.map((value) => {
      if (typeof value === 'string') {
        return value.padStart(2, '0').toLowerCase();
      }
      return value.toString(16).padStart(2, '0').toLowerCase();
    });
  }
}
