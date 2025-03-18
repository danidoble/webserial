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
};
Devices.devices = { ...Devices.devices, ...customDevices };

Devices.addCustom = (type, device) => {
  Devices.registerType(type);
  Devices.add(device);
};

// @deprecated use get instead
Devices.getCustom = (type, device) => {
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

Devices.getJofemar = (device_number = 1) => {
  const devices = Object.values(Devices.devices.jofemar);
  return devices.find((device) => device.deviceNumber === device_number) ?? null;
};

Devices.getBoardroid = (device_number = 1) => {
  const devices = Object.values(Devices.devices.boardroid);
  return devices.find((device) => device.deviceNumber === device_number) ?? null;
};

Devices.getLocker = (device_number = 1) => {
  const devices = Object.values(Devices.devices.locker);
  return devices.find((device) => device.deviceNumber === device_number) ?? null;
};

Devices.getRelay = (device_number = 1) => {
  const devices = Object.values(Devices.devices.relay);
  return devices.find((device) => device.deviceNumber === device_number) ?? null;
};

Devices.getArduino = (device_number = 1) => {
  const devices = Object.values(Devices.devices.arduino);
  return devices.find((device) => device.deviceNumber === device_number) ?? null;
};

Devices.getPinPad = (device_number = 1) => {
  const devices = Object.values(Devices.devices.pinpad);
  return devices.find((device) => device.deviceNumber === device_number) ?? null;
};

export { Devices };
