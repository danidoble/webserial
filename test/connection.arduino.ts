import { Arduino } from './arduino';
import { Devices } from '../lib/utils/devices';

Devices.registerType('arduino');

// @ts-expect-error adding custom get functions
Devices.getArduinoByUuid = (id: string) => {
  return Devices.get('arduino', id);
};

// @ts-expect-error adding custom get functions
Devices.getArduino = (device_number: number = 1) => {
  return Devices.getByNumber('arduino', device_number);
};

const device = new Arduino();
device.on('serial:message', ({ detail }: any) => {
  console.log(detail);
});

device.on('serial:timeout', ({ detail }: any) => {
  console.log('serial:timeout', detail);
});

// device.on('serial:sent', data => {
//     console.log('serial:sent',data.detail);
// });

device.on('serial:error', ({ detail }: any) => {
  const el = document.getElementById('log');
  if (!el) return;
  el.innerText += detail.message + '\n\n';
});

device.on('serial:disconnected', ({ target }: any) => {
  const el = document.getElementById('log');
  if (el) {
    el.innerText += target.typeDevice + ' Disconnected\n\n';
  }
  const disconnectedEl = document.getElementById('disconnected');
  const connectEl = document.getElementById('connect');
  const disconnectEl = document.getElementById('disconnect');

  if (disconnectedEl) {
    disconnectedEl.classList.remove('hidden');
  }
  if (connectEl) {
    connectEl.classList.remove('hidden');
  }
  if (disconnectEl) {
    disconnectEl.classList.add('hidden');
  }
});

device.on('serial:connecting', ({ detail }: any) => {
  const connect = document.getElementById('connect');
  if (connect && detail.active) {
    connect.setAttribute('disabled', 'disabled');
  } else if (connect) {
    connect.removeAttribute('disabled');
  }
  const disconnect = document.getElementById('disconnect');
  if (disconnect && detail.active) {
    disconnect.setAttribute('disabled', 'disabled');
  } else if (disconnect) {
    disconnect.removeAttribute('disabled');
  }

  if (detail.active) return;
  const el = document.getElementById('log');
  if (el) {
    el.innerText += 'Connecting finished\n\n';
  }
});

device.on('serial:connected', ({ target }: any) => {
  const el = document.getElementById('log');
  if (el) {
    el.innerText += target.typeDevice + ' Connected\n\n';
  }

  const disconnected = document.getElementById('disconnected');
  if (disconnected) {
    disconnected.classList.add('hidden');
  }
  const need = document.getElementById('need-permission');
  if (need) {
    need.classList.add('hidden');
  }
  const connect = document.getElementById('connect');
  if (connect) {
    connect.classList.add('hidden');
  }
  const disconnect = document.getElementById('disconnect');
  if (disconnect) {
    disconnect.classList.remove('hidden');
  }
});

device.on('serial:need-permission', ({ target }: any) => {
  const el = document.getElementById('log');
  if (el) {
    el.innerText += target.typeDevice + ' Need permissions to access serial devices\n\n';
  }
  const disconnected = document.getElementById('disconnected');
  if (disconnected) {
    disconnected.classList.remove('hidden');
  }
  const need = document.getElementById('need-permission');
  if (need) {
    need.classList.remove('hidden');
  }
  const connect = document.getElementById('connect');
  if (connect) {
    connect.classList.remove('hidden');
  }
  const disconnect = document.getElementById('disconnect');
  if (disconnect) {
    disconnect.classList.add('hidden');
  }
});

//device.on('serial:soft-reload', (event) => {
// reset your variables
//});

//device.on('serial:unsupported', (event) => {
//  document.getElementById('unsupported').classList.remove('hidden');
//});

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
  const connect = document.getElementById('connect');
  if (connect) {
    connect.addEventListener('click', tryConnect);
  }
  const disconnect = document.getElementById('disconnect');
  if (disconnect) {
    disconnect.addEventListener('click', tryDisconnect);
  }
});

// @ts-expect-error declare device in window
window.device = device;
