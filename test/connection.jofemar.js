import { Jofemar } from './../lib/serial/jofemar.js';
// import {Emulator} from './../lib/utils/emulator.js';
// window.Emulator = Emulator;

const device = new Jofemar();

// device.on('device:status', event => {
//     console.log(event)
// });

device.on('channels', (event) => {
  const active_channels = event.detail.channels.filter((channel) => channel.active);

  // eslint-disable-next-line no-undef
  axios.post('https://api.example.com/v1/channels', {
    active: active_channels,
  });
});

device.on('dispensing:withdrawal', (event) => {
  const seconds = event.detail.seconds;
  if (seconds > 0) {
    document.getElementById('withdrawal').classList.remove('hidden');
    document.getElementById('seconds_to_continue').innerText = seconds;
  } else {
    document.getElementById('withdrawal').classList.add('hidden');
  }
});

// eslint-disable-next-line no-unused-vars
device.on('jofemar:error', (event) => {
  // switch (event.detail.type) {
  //     case 'jam':break;
  //     case 'malfunction':break;
  //     case 'photo-transistors':break;
  //     case 'without-channels':break;
  //     case 'fault-keyboard':break;
  //     case 'eeprom-writing-error':break;
  //     case 'channels-power-consumption-detector-faulty':break;
  //     case 'elevator-not-find-delivery-position':break;
  //     case 'interior-elevator-blocked':break;
  //     case 'error-tester-product-detector':break;
  // }
  document.getElementById('error').classList.remove('hidden');
});

device.on('reset:errors', (event) => {
  let timerInterval;
  // eslint-disable-next-line no-undef
  Swal.fire({
    title: 'Resetting errors',
    html: 'This close in <b>X</b> seconds.',
    timer: event.detail.duration * 1_000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      // eslint-disable-next-line no-undef
      Swal.showLoading();
      // eslint-disable-next-line no-undef
      const timer = Swal.getPopup().querySelector('b');
      timerInterval = setInterval(() => {
        // eslint-disable-next-line no-undef
        timer.textContent = `${parseInt(Swal.getTimerLeft() / 1_000)}`;
      }, 1_000);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });
});

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

device.on('temperature:current', (event) => {
  document.getElementById('temperature').innerText = event.detail.formatted;
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

function addView() {
  document.querySelector('.webserial').innerHTML += `<div id="withdrawal" class="hidden p-4 bg-sky-900 rounded-lg">
        Please remove the product(s) from the delivery area.
        We continue in <span id="seconds_to_continue">0</span> seconds.
        <br>
        Or
        <button id="continueNow" class="bg-sky-950 px-2 py-0.5 rounded-lg">click here</button>
        to continue now
    </div>

    <div id="error" class="hidden p-4 bg-red-900 w-full absolute bottom-0 left-0">
        <p class="text-lg">Error</p>
        <p>
        Some error occurred. Please, check the machine.
        </p>
    </div>

    <div class="absolute top-0 right-0 p-4 bg-neutral-700/50 rounded-l-lg">
        The temperature is: <span id="temperature">0</span>
    </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  addView();

  tryConnect();
  document.getElementById('connect').addEventListener('click', tryConnect);
  document.getElementById('disconnect').addEventListener('click', tryDisconnect);
});

window.device = device;
