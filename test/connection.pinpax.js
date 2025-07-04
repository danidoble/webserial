import { PinPax } from '../lib/serial/pinpax.js';

const server = import.meta.env.VITE_PINPAX_SERVER;
const bussinessId = import.meta.env.VITE_PINPAX_BUSSINESS_ID;
const encriptionKey = import.meta.env.VITE_PINPAX_ENCRYPTION_KEY;
const apiKey = import.meta.env.VITE_PINPAX_API_KEY;

const pinpax = new PinPax();
pinpax.server = server;
pinpax.bussinessId = bussinessId;
pinpax.encriptionKey = encriptionKey;
pinpax.apiKey = apiKey;

pinpax.on('serial:message', (data) => {
  console.log(data.detail);
});

pinpax.on('serial:timeout', (data) => {
  console.log('serial:timeout', data.detail);
});

// pinpax.on('serial:sent', data => {
//     console.log('serial:sent',data.detail);
// });

pinpax.on('serial:error', (event) => {
  document.getElementById('log').innerText += event.detail.message + '\n\n';
});

// eslint-disable-next-line no-unused-vars
pinpax.on('serial:disconnected', (event) => {
  document.getElementById('log').innerText += 'Disconnected\n\n';

  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
  document.getElementById('disconnect').classList.add('hidden');
});

pinpax.on('serial:connecting', (event) => {
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
pinpax.on('serial:connected', (event) => {
  document.getElementById('log').innerText += 'Connected\n\n';

  document.getElementById('disconnected').classList.add('hidden');
  document.getElementById('need-permission').classList.add('hidden');
  document.getElementById('connect').classList.add('hidden');
  document.getElementById('disconnect').classList.remove('hidden');
});

// eslint-disable-next-line no-unused-vars
pinpax.on('serial:need-permission', (event) => {
  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('need-permission').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
  document.getElementById('disconnect').classList.add('hidden');
});

// eslint-disable-next-line no-unused-vars
pinpax.on('serial:soft-reload', (event) => {
  // reset your variables
});

// eslint-disable-next-line no-unused-vars
pinpax.on('serial:unsupported', (event) => {
  document.getElementById('unsupported').classList.remove('hidden');
});

function tryConnect() {
  pinpax
    .connect()
    .then(() => {})
    .catch(console.error);
}

document.addEventListener('DOMContentLoaded', () => {
  tryConnect();
  document.getElementById('connect').addEventListener('click', tryConnect);
  document.getElementById('disconnect').addEventListener('click', () => {
    pinpax
      .disconnect()
      .then(() => {
        console.log('Disconnected');
      })
      .catch(console.error);
  });
});

window.pinpax = pinpax;
