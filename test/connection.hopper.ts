import { Hopper } from '../lib/serial/hopper.js';

const device = new Hopper();
device.__debug__ = true;
device.on('debug', (data: any) => {
  console.log(data.detail);
});

device.on('serial:message', (data: any) => {
  console.log(data.detail);
  const log = document.getElementById('log');
  if (!log) return;
  log.innerHTML +=
    '<div class="rounded-lg max-h-64 overflow-auto my-4 bg-neutral-700 p-4 break-all">' +
    JSON.stringify(data.detail) +
    '</div>\n\n';
});

device.on('serial:timeout', (data: any) => {
  console.log('serial:timeout', data.detail);
});

device.on('serial:sent', (data: any) => {
  console.log('serial:sent', data.detail);
});

device.on('serial:error', (event: any) => {
  const message = event.detail.message || event.detail.description || 'Unknown error';
  const log = document.getElementById('log');
  if (log) {
    log.innerHTML += '<div>' + message + '\n\n' + '</div>';
  }
});

device.on('serial:disconnected', () => {
  const log = document.getElementById('log');
  if (log) {
    log.innerHTML += '<div>' + 'Disconnected\n\n' + '</div>';
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

let timeoutConnecting = 0;
device.on('serial:connecting', (event: any) => {
  if (timeoutConnecting) {
    clearTimeout(timeoutConnecting);
  }
  const log = document.getElementById('log');
  if (!log) return;
  if (timeoutConnecting === 0) {
    log.innerHTML += '<div>' + event.detail.active ? 'Connecting...\n\n' : 'Connecting finished\n\n' + '</div>';
  }
  timeoutConnecting = setTimeout(() => {
    log.innerHTML += '<div>' + event.detail.active ? 'Connecting...\n\n' : 'Connecting finished\n\n' + '</div>';
  }, 1000);
});

device.on('serial:connected', () => {
  const log = document.getElementById('log');
  if (log) {
    log.innerHTML += '<div>' + 'Connected\n\n' + '</div>';
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
