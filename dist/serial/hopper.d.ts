import { Core } from 'webserial-core';
interface Hoppers {
    levels: {
        id: number;
        currency: number;
        key: string;
        name: string;
        amount: number;
        capacity: number;
    }[];
    balance: number;
    current: number | null;
}
interface ConstructorParams {
    filters?: SerialPortFilter[] | null;
    config_port?: SerialOptions;
    no_device?: number;
    device_listen_on_channel?: number | string;
    bypassSerialBytesConnection?: boolean;
    socket?: boolean;
}
export declare class Hopper extends Core {
    #private;
    __hoppers__: Hoppers;
    constructor({ filters, config_port, no_device, socket, }?: ConstructorParams);
    get balance(): number;
    get currentHopper(): number | null;
    get levels(): {
        id: number;
        currency: number;
        key: string;
        name: string;
        amount: number;
        capacity: number;
    }[];
    setMaxCapacity({ hopper, capacity }?: {
        hopper?: number;
        capacity?: number;
    }): this;
    setHopperName({ hopper, name }?: {
        hopper?: number;
        name?: string;
    }): this;
    setHopperKey({ hopper, key }?: {
        hopper?: number;
        key?: string;
    }): this;
    setHopperCurrency({ hopper, currency }?: {
        hopper?: number;
        currency?: number;
    }): this;
    serialMessage(codex1: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer): void;
    serialSetConnectionConstant(): number[];
    sendConnect(): Promise<void>;
    requestStatus(): Promise<void>;
    readBalance(): Promise<void>;
    clearBalance(): Promise<void>;
    forceInvalid(): Promise<void>;
    readHopper({ hopper }?: {
        hopper?: number;
    }): Promise<void>;
    writeHopper({ hopper, quantity }?: {
        hopper?: number;
        quantity?: number;
    }): Promise<void>;
    dispenseHopper({ hopper }?: {
        hopper?: number;
    }): Promise<void>;
    dispenseChange({ change }?: {
        change?: number;
    }): Promise<void>;
    configValidator({ enable, }?: {
        enable: boolean;
    }): Promise<void>;
    disableValidator(): Promise<void>;
    enableValidator(): Promise<void>;
    change1x1({ hopper }?: {
        hopper?: number;
    }): Promise<void>;
    sendCustomCode({ code, }?: {
        code: any;
    }): Promise<void>;
}
export {};
//# sourceMappingURL=hopper.d.ts.map