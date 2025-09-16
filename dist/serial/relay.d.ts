import { ConstructorParams, Kernel } from './kernel';
export declare class Relay extends Kernel {
    constructor({ filters, config_port, no_device, socket }?: ConstructorParams);
    serialMessage(code: string[] | Uint8Array<ArrayBufferLike> | string | ArrayBuffer): void;
    serialSetConnectionConstant(listen_on_port?: number): Uint8Array<ArrayBufferLike>;
    turnOn(): Promise<void>;
    turnOff(): Promise<void>;
    toggle({ inverse, ms }?: {
        inverse?: boolean | undefined;
        ms?: number | undefined;
    }): Promise<void>;
}
//# sourceMappingURL=relay.d.ts.map