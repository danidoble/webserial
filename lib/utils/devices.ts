import { Devices as DevicesCore, Core } from 'webserial-core';
import { Kernel } from '../serial/kernel';

interface IDevice {
  [key: string]: Core | Kernel;
}

interface IDevices {
  [key: string]: IDevice[];
}

class Devices extends DevicesCore {
  constructor() {
    super();

    const customDevices: IDevices = {
      relay: [],
      locker: [],
      jofemar: [],
      boardroid: [],
      pinpad: [],
      pinpax: [],
      hopper: [],
    };

    // @ts-expect-error merging devices
    Devices.devices = { ...structuredClone(DevicesCore.devices), ...customDevices };
  }

  addCustom(type: string, device: Kernel) {
    Devices.registerType(type);
    Devices.add(device);
  }

  /**
   * @deprecated use get instead
   * */
  getCustomByUuid(type: string, deviceId: string) {
    return Devices.get(type, deviceId);
  }

  getJofemarByUuid(id: string) {
    return Devices.get('jofemar', id);
  }

  getLockerByUuid(id: string) {
    return Devices.get('locker', id);
  }

  getRelayByUuid(id: string) {
    return Devices.get('relay', id);
  }

  getBoardroidByUuid(id: string) {
    return Devices.get('boardroid', id);
  }

  getPinPadByUuid(id: string) {
    return Devices.get('pinpad', id);
  }

  getPinPaxByUuid(id: string) {
    return Devices.get('pinpax', id);
  }

  getHopperByUuid(id: string) {
    return Devices.get('hopper', id);
  }

  getJofemar(device_number: number = 1) {
    return Devices.getByNumber('jofemar', device_number);
  }

  getBoardroid(device_number: number = 1) {
    return Devices.getByNumber('boardroid', device_number);
  }

  getLocker(device_number: number = 1) {
    return Devices.getByNumber('locker', device_number);
  }

  getRelay(device_number: number = 1) {
    return Devices.getByNumber('relay', device_number);
  }

  getPinPad(device_number: number = 1) {
    return Devices.getByNumber('pinpad', device_number);
  }

  getPinPax(device_number: number = 1) {
    return Devices.getByNumber('pinpax', device_number);
  }

  getHopper(device_number: number = 1) {
    return Devices.getByNumber('hopper', device_number);
  }
}

if (!Devices.instance) {
  Devices.instance = new Devices();
}

export { Devices };
