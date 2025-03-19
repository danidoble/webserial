import { Devices } from 'webserial-core';

if (!Devices.instance) {
  Devices.instance = new Devices();
}

const customDevices = {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: [],
  arduino: [],
  pinpad: [],
  pinpax: [],
};
Devices.devices = { ...Devices.devices, ...customDevices };

Devices.addCustom = (type, device) => {
  Devices.registerType(type);
  Devices.add(device);
};

// @deprecated use get instead
Devices.getCustomByUuid = (type, device) => {
  return Devices.get(type, device);
};

Devices.getJofemarByUuid = (id) => {
  return Devices.get('jofemar', id);
};

Devices.getLockerByUuid = (id) => {
  return Devices.get('locker', id);
};

Devices.getRelayByUuid = (id) => {
  return Devices.get('relay', id);
};

Devices.getBoardroidByUuid = (id) => {
  return Devices.get('boardroid', id);
};

Devices.getArduinoByUuid = (id) => {
  return Devices.get('arduino', id);
};

Devices.getPinPadByUuid = (id) => {
  return Devices.get('pinpad', id);
};

Devices.getPinPaxByUuid = (id) => {
  return Devices.get('pinpax', id);
};

Devices.getJofemar = (device_number = 1) => {
  return Devices.getByNumber('jofemar', device_number);
};

Devices.getBoardroid = (device_number = 1) => {
  return Devices.getByNumber('boardroid', device_number);
};

Devices.getLocker = (device_number = 1) => {
  return Devices.getByNumber('locker', device_number);
};

Devices.getRelay = (device_number = 1) => {
  return Devices.getByNumber('relay', device_number);
};

Devices.getArduino = (device_number = 1) => {
  return Devices.getByNumber('arduino', device_number);
};

Devices.getPinPad = (device_number = 1) => {
  return Devices.getByNumber('pinpad', device_number);
};

Devices.getPinPax = (device_number = 1) => {
  return Devices.getByNumber('pinpax', device_number);
};

export { Devices };
