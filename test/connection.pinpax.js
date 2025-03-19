import { PinPax } from '../lib/serial/pinpax.js';

const pinpax = new PinPax();
pinpax.server = 'DEV';
pinpax.bussinessId = '46211';
pinpax.encriptionKey = 'RTk5NkQ0MUE5QjUwQ0JGM0NFNEYzRTk4NTJGRkY2NTA';
pinpax.apiKey = 'NDNmNDYwNGQtMDZiMC00OGNjLWE2ZjctOTM2MmI3YjJiMGY0';

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
});

// eslint-disable-next-line no-unused-vars
pinpax.on('serial:connecting', (event) => {
  document.getElementById('log').innerText += 'Connecting\n\n';
});

// eslint-disable-next-line no-unused-vars
pinpax.on('serial:connected', (event) => {
  document.getElementById('log').innerText += 'Connected\n\n';

  document.getElementById('disconnected').classList.add('hidden');
  document.getElementById('need-permission').classList.add('hidden');
  document.getElementById('connect').classList.add('hidden');
});

// eslint-disable-next-line no-unused-vars
pinpax.on('serial:need-permission', (event) => {
  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('need-permission').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
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
});

window.pinpax = pinpax;
