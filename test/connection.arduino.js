import { Arduino } from '../lib/serial/arduino.js';

const machine = new Arduino();
machine.on('serial:message', (data) => {
  console.log(data.detail);
});

machine.on('serial:timeout', (data) => {
  console.log('serial:timeout', data.detail);
});

// machine.on('serial:sent', data => {
//     console.log('serial:sent',data.detail);
// });

machine.on('serial:error', (event) => {
  document.getElementById('log').innerText += event.detail.message + '\n\n';
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:disconnected', (event) => {
  document.getElementById('log').innerText += 'Disconnected\n\n';

  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:connecting', (event) => {
  document.getElementById('log').innerText += 'Connecting\n\n';
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:connected', (event) => {
  document.getElementById('log').innerText += 'Connected\n\n';

  document.getElementById('disconnected').classList.add('hidden');
  document.getElementById('need-permission').classList.add('hidden');
  document.getElementById('connect').classList.add('hidden');
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:need-permission', (event) => {
  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('need-permission').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:soft-reload', (event) => {
  // reset your variables
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:unsupported', (event) => {
  document.getElementById('unsupported').classList.remove('hidden');
});

function tryConnect() {
  machine
    .connect()
    .then(() => {})
    .catch(console.error);
}

document.addEventListener('DOMContentLoaded', () => {
  tryConnect();
  document.getElementById('connect').addEventListener('click', tryConnect);
});

window.machine = machine;
