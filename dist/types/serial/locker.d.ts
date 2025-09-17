import { ConstructorParams, Kernel, DispenseResponse } from './kernel';
interface ConstructorParamsLocker extends ConstructorParams {
    device_listen_on_channel?: number;
}
export declare class Locker extends Kernel {
    #private;
    _default_fallback_listen_on_channel: number;
    constructor({ filters, config_port, no_device, device_listen_on_channel, socket, }?: ConstructorParamsLocker);
    serialMessage(code: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer): void;
    serialSetConnectionConstant(listen_on_port?: number): string[] | Uint8Array<ArrayBufferLike>;
    dispense({ cell, status }?: {
        cell?: number | undefined;
        status?: boolean | undefined;
    }): Promise<DispenseResponse>;
    status({ cell }?: {
        cell?: number | undefined;
    }): Promise<void>;
    lightScan({ since, until }?: {
        since?: number | undefined;
        until?: number | undefined;
    }): Promise<void>;
    enable({ cell }?: {
        cell?: number | undefined;
    }): Promise<void>;
    disable({ cell }?: {
        cell?: number | undefined;
    }): Promise<void>;
    openAll(): Promise<void>;
    enableAll(): Promise<void>;
    disableAll(): Promise<void>;
}
export {};
//# sourceMappingURL=locker.d.ts.map