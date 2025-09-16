import { PinPax } from '../lib/serial/pinpax.js';

// @ts-expect-error import.meta.env is only available using vite
const server = import.meta.env.VITE_PINPAX_SERVER;
// @ts-expect-error import.meta.env is only available using vite
const bussinessId = import.meta.env.VITE_PINPAX_BUSSINESS_ID;
// @ts-expect-error import.meta.env is only available using vite
const encriptionKey = import.meta.env.VITE_PINPAX_ENCRYPTION_KEY;
// @ts-expect-error import.meta.env is only available using vite
const apiKey = import.meta.env.VITE_PINPAX_API_KEY;

const device = new PinPax();
device.server = server;
device.businessId = bussinessId;
device.encryptionKey = encriptionKey;
device.apiKey = apiKey;

device.on('serial:message', (data: any) => {
  console.log(data.detail);
});

device.on('serial:timeout', (data: any) => {
  console.log('serial:timeout', data.detail);
});

// device.on('serial:sent', data => {
//     console.log('serial:sent',data.detail);
// });

device.on('serial:error', (event: any) => {
  const log = document.getElementById('log');
  if (log) {
    log.innerText += event.detail.message + '\n\n';
  }
});

device.on('serial:disconnected', () => {
  const log = document.getElementById('log');
  if (log) {
    log.innerText += 'Disconnected\n\n';
  }

  const disconnected = document.getElementById('disconnected');
  if (disconnected) {
    disconnected.classList.remove('hidden');
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

device.on('serial:connecting', (event: any) => {
  const connect = document.getElementById('connect');
  if (connect && event.detail.active) {
    connect.setAttribute('disabled', 'disabled');
  } else if (connect) {
    connect.removeAttribute('disabled');
  }
  const disconnect = document.getElementById('disconnect');
  if (disconnect && event.detail.active) {
    disconnect.setAttribute('disabled', 'disabled');
  } else if (disconnect) {
    disconnect.removeAttribute('disabled');
  }

  if (event.detail.active) return;
  const log = document.getElementById('log');
  if (log) {
    log.innerText += 'Connecting finished\n\n';
  }
});

device.on('serial:connected', () => {
  const log = document.getElementById('log');
  if (log) {
    log.innerText += 'Connected\n\n';
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

device.on('serial:need-permission', () => {
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

// device.on('serial:unsupported', (event) => {
//   document.getElementById('unsupported').classList.remove('hidden');
// });

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
