import { Devices as DevicesCore, Core } from 'webserial-core';
import { Kernel } from '../serial/kernel';
declare class Devices extends DevicesCore {
    constructor();
    addCustom(type: string, device: Kernel): void;
    /**
     * @deprecated use get instead
     * */
    getCustomByUuid(type: string, deviceId: string): Core;
    getJofemarByUuid(id: string): Core;
    getLockerByUuid(id: string): Core;
    getRelayByUuid(id: string): Core;
    getBoardroidByUuid(id: string): Core;
    getPinPadByUuid(id: string): Core;
    getPinPaxByUuid(id: string): Core;
    getHopperByUuid(id: string): Core;
    getJofemar(device_number?: number): Core | null;
    getBoardroid(device_number?: number): Core | null;
    getLocker(device_number?: number): Core | null;
    getRelay(device_number?: number): Core | null;
    getPinPad(device_number?: number): Core | null;
    getPinPax(device_number?: number): Core | null;
    getHopper(device_number?: number): Core | null;
}
export { Devices };
//# sourceMappingURL=devices.d.ts.map