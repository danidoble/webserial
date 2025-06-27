import { Hopper } from '../lib/serial/hopper.js';

const device = new Hopper();
device.__debug = true;
device.on('debug', (data) => {
  console.log(data.detail);
});

device.on('serial:message', (data) => {
  console.log(data.detail);
  document.getElementById('log').innerHTML +=
    '<div class="rounded-lg max-h-64 overflow-auto my-4 bg-neutral-700 p-4 break-all">' +
    JSON.stringify(data.detail) +
    '</div>\n\n';
});

device.on('serial:timeout', (data) => {
  console.log('serial:timeout', data.detail);
});

device.on('serial:sent', (data) => {
  console.log('serial:sent', data.detail);
});

device.on('serial:error', (event) => {
  const message = event.detail.message || event.detail.description || 'Unknown error';
  document.getElementById('log').innerHTML += '<div>' + message + '\n\n' + '</div>';
});

// eslint-disable-next-line no-unused-vars
device.on('serial:disconnected', (event) => {
  document.getElementById('log').innerHTML += '<div>' + 'Disconnected\n\n' + '</div>';

  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
  document.getElementById('disconnect').classList.add('hidden');
});

let timeoutConnecting = 0;
device.on('serial:connecting', (event) => {
  if (timeoutConnecting) {
    clearTimeout(timeoutConnecting);
  }
  if (timeoutConnecting === 0) {
    document.getElementById('log').innerHTML +=
      '<div>' + event.detail.active ? 'Connecting...\n\n' : 'Connecting finished\n\n' + '</div>';
  }
  timeoutConnecting = setTimeout(() => {
    document.getElementById('log').innerHTML +=
      '<div>' + event.detail.active ? 'Connecting...\n\n' : 'Connecting finished\n\n' + '</div>';
  }, 1000);
});

// eslint-disable-next-line no-unused-vars
device.on('serial:connected', (event) => {
  document.getElementById('log').innerHTML += '<div>' + 'Connected\n\n' + '</div>';

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

function tryConnect() {
  device
    .connect()
    .then(() => {})
    .catch(console.error);
}

document.addEventListener('DOMContentLoaded', () => {
  tryConnect();
  document.getElementById('connect').addEventListener('click', tryConnect);
  document.getElementById('disconnect').addEventListener('click', () => {
    device
      .disconnect()
      .then(() => {
        console.log('Disconnected');
      })
      .catch(console.error);
  });
});

window.device = device;
