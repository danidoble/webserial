import { Devices as DevicesCore } from 'webserial-core';
import { Kernel } from '../serial/kernel';

class Devices extends DevicesCore {
  constructor() {
    super();

    Devices.registerType('boardroid');
    Devices.registerType('hopper');
    Devices.registerType('jofemar');
    Devices.registerType('locker');
    Devices.registerType('pinpad');
    Devices.registerType('pinpax');
    Devices.registerType('relay');
  }

  public static addCustom(type: string, device: Kernel) {
    Devices.registerType(type);
    Devices.add(device);
  }

  /**
   * @deprecated use get instead
   * */
  public static getCustomByUuid(type: string, deviceId: string) {
    return Devices.get(type, deviceId);
  }

  public static getJofemarByUuid(id: string) {
    return Devices.get('jofemar', id);
  }

  public static getLockerByUuid(id: string) {
    return Devices.get('locker', id);
  }

  public static getRelayByUuid(id: string) {
    return Devices.get('relay', id);
  }

  public static getBoardroidByUuid(id: string) {
    return Devices.get('boardroid', id);
  }

  public static getPinPadByUuid(id: string) {
    return Devices.get('pinpad', id);
  }

  public static getPinPaxByUuid(id: string) {
    return Devices.get('pinpax', id);
  }

  public static getHopperByUuid(id: string) {
    return Devices.get('hopper', id);
  }

  public static getJofemar(device_number: number = 1) {
    return Devices.getByNumber('jofemar', device_number);
  }

  public static getBoardroid(device_number: number = 1) {
    return Devices.getByNumber('boardroid', device_number);
  }

  public static getLocker(device_number: number = 1) {
    return Devices.getByNumber('locker', device_number);
  }

  public static getRelay(device_number: number = 1) {
    return Devices.getByNumber('relay', device_number);
  }

  public static getPinPad(device_number: number = 1) {
    return Devices.getByNumber('pinpad', device_number);
  }

  public static getPinPax(device_number: number = 1) {
    return Devices.getByNumber('pinpax', device_number);
  }

  public static getHopper(device_number: number = 1) {
    return Devices.getByNumber('hopper', device_number);
  }
}

// Overide singleton instance
Devices.instance = new Devices();

export { Devices };
