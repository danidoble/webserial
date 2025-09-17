import { Devices as DevicesCore } from 'webserial-core';
import { Kernel } from '../serial/kernel';
declare class Devices extends DevicesCore {
    constructor();
    static addCustom(type: string, device: Kernel): void;
    /**
     * @deprecated use get instead
     * */
    static getCustomByUuid(type: string, deviceId: string): import("webserial-core").Core;
    static getJofemarByUuid(id: string): import("webserial-core").Core;
    static getLockerByUuid(id: string): import("webserial-core").Core;
    static getRelayByUuid(id: string): import("webserial-core").Core;
    static getBoardroidByUuid(id: string): import("webserial-core").Core;
    static getPinPadByUuid(id: string): import("webserial-core").Core;
    static getPinPaxByUuid(id: string): import("webserial-core").Core;
    static getHopperByUuid(id: string): import("webserial-core").Core;
    static getJofemar(device_number?: number): import("webserial-core").Core | null;
    static getBoardroid(device_number?: number): import("webserial-core").Core | null;
    static getLocker(device_number?: number): import("webserial-core").Core | null;
    static getRelay(device_number?: number): import("webserial-core").Core | null;
    static getPinPad(device_number?: number): import("webserial-core").Core | null;
    static getPinPax(device_number?: number): import("webserial-core").Core | null;
    static getHopper(device_number?: number): import("webserial-core").Core | null;
}
export { Devices };
//# sourceMappingURL=devices.d.ts.map