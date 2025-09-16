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
    prefixLimiter: boolean;
    sufixLimiter: boolean;
    delimited: boolean;
}
interface QueueData {
    bytes: string | Uint8Array | Array<string> | Array<number>;
    action: string;
}
type ParserSocketPort = {
    name: 'byte-length' | 'inter-byte-timeout';
    length?: number;
    interval?: number;
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
export declare class Kernel extends Core {
    __internal__: Internal;
    constructor(config?: ConstructorParams);
    get isDoorOpen(): boolean;
    get isDispensing(): number | boolean;
    timeout(bytes: string | Uint8Array | Array<string> | Array<number>, event: string): Promise<void>;
    internalClearSensing(): void;
    internalDispensingProcess(): false | null;
    internalDispenseStatus(): Promise<DispenseResponse>;
    internalDispense(code: string | Uint8Array | string[] | number[]): Promise<DispenseResponse>;
    __emulate(data: {
        code: string[] | number[] | Uint8Array;
    }): void;
    /**
     * @deprecated Use listenOnChannel instead
     * @param {string|number} channel
     */
    set listenOnPort(channel: number);
    /**
     * @deprecated Use listenOnChannel instead
     */
    get listenOnPort(): number;
    fixHexArray(array: Array<string> | Array<number>): string[];
}
export {};
//# sourceMappingURL=kernel.d.ts.map