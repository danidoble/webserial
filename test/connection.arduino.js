import { Arduino } from './arduino.js';
import { Devices } from '../lib/utils/devices.js';

Devices.registerType('arduino');

Devices.getArduinoByUuid = (id) => {
  return Devices.get('arduino', id);
};

Devices.getArduino = (device_number = 1) => {
  return Devices.getByNumber('arduino', device_number);
};

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
  document.getElementById('disconnect').classList.add('hidden');
});

machine.on('serial:connecting', (event) => {
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
machine.on('serial:connected', (event) => {
  document.getElementById('log').innerText += 'Connected\n\n';

  document.getElementById('disconnected').classList.add('hidden');
  document.getElementById('need-permission').classList.add('hidden');
  document.getElementById('connect').classList.add('hidden');
  document.getElementById('disconnect').classList.remove('hidden');
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:need-permission', (event) => {
  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('need-permission').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
  document.getElementById('disconnect').classList.add('hidden');
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:soft-reload', (event) => {
  // reset your variables
});

// eslint-disable-next-line no-unused-vars
machine.on('serial:unsupported', (event) => {
  document.getElementById('unsupported').classList.remove('hidden');
});

async function tryConnect() {
  //await Devices.connectToAll()
  machine
    .connect()
    .then(() => {})
    .catch(console.error);
}

document.addEventListener('DOMContentLoaded', () => {
  tryConnect();
  document.getElementById('connect').addEventListener('click', tryConnect);
  document.getElementById('disconnect').addEventListener('click', () => {
    machine
      .disconnect()
      .then(() => {
        console.log('Disconnected');
      })
      .catch(console.error);
  });
});

window.machine = machine;
