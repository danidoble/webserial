import { Arduino } from './arduino.js';
import { Devices } from '../lib/utils/devices.js';

Devices.registerType('arduino');

Devices.getArduinoByUuid = (id) => {
  return Devices.get('arduino', id);
};

Devices.getArduino = (device_number = 1) => {
  return Devices.getByNumber('arduino', device_number);
};

const device = new Arduino();
device.on('serial:message', (data) => {
  console.log(data.detail);
});

device.on('serial:timeout', (data) => {
  console.log('serial:timeout', data.detail);
});

// device.on('serial:sent', data => {
//     console.log('serial:sent',data.detail);
// });

device.on('serial:error', (event) => {
  document.getElementById('log').innerText += event.detail.message + '\n\n';
});

// eslint-disable-next-line no-unused-vars
device.on('serial:disconnected', (event) => {
  document.getElementById('log').innerText += 'Disconnected\n\n';

  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
  document.getElementById('disconnect').classList.add('hidden');
});

device.on('serial:connecting', (event) => {
  const connect = document.getElementById('connect');
  if (connect && event.detail.active) {
    connect.setAttribute('disabled', 'disabled');
  } else {
    connect.removeAttribute('disabled');
  }
  const disconnect = document.getElementById('disconnect');
  if (disconnect && event.detail.active) {
    disconnect.setAttribute('disabled', 'disabled');
  } else {
    disconnect.removeAttribute('disabled');
  }

  if (event.detail.active) return;
  document.getElementById('log').innerText += 'Connecting finished\n\n';
});

// eslint-disable-next-line no-unused-vars
device.on('serial:connected', (event) => {
  document.getElementById('log').innerText += 'Connected\n\n';

  document.getElementById('disconnected').classList.add('hidden');
  document.getElementById('need-permission').classList.add('hidden');
  document.getElementById('connect').classList.add('hidden');
  document.getElementById('disconnect').classList.remove('hidden');
});

// eslint-disable-next-line no-unused-vars
device.on('serial:need-permission', (event) => {
  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('need-permission').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
  document.getElementById('disconnect').classList.add('hidden');
});

// eslint-disable-next-line no-unused-vars
device.on('serial:soft-reload', (event) => {
  // reset your variables
});

// eslint-disable-next-line no-unused-vars
device.on('serial:unsupported', (event) => {
  document.getElementById('unsupported').classList.remove('hidden');
});

const tryConnect = () => {
  if (device.isConnected) return;

  device
    .connect()
    .then(() => {})
    .catch(console.error);
};

const tryDisconnect = () => {
  if (device.isDisconnected) return;

  device
    .disconnect()
    .then(() => {})
    .catch(console.error);
};

document.addEventListener('DOMContentLoaded', () => {
  tryConnect();
  document.getElementById('connect').addEventListener('click', tryConnect);
  document.getElementById('disconnect').addEventListener('click', tryDisconnect);
});

window.device = device;
