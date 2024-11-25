import { Jofemar } from './../lib/serial/jofemar.js';
// import {Emulator} from './../lib/utils/emulator.js';
// window.Emulator = Emulator;

const machine = new Jofemar();

// machine.on('machine:status', event => {
//     console.log(event)
// });

machine.on('channels', (event) => {
  const active_channels = event.detail.channels.filter((channel) => channel.active);

  // eslint-disable-next-line no-undef
  axios.post('https://api.example.com/v1/channels', {
    active: active_channels,
  });
});

machine.on('dispensing:withdrawal', (event) => {
  const seconds = event.detail.seconds;
  if (seconds > 0) {
    document.getElementById('withdrawal').classList.remove('hidden');
    document.getElementById('seconds_to_continue').innerText = seconds;
  } else {
    document.getElementById('withdrawal').classList.add('hidden');
  }
});

// eslint-disable-next-line no-unused-vars
machine.on('jofemar:error', (event) => {
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

machine.on('reset:errors', (event) => {
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

machine.on('temperature:current', (event) => {
  document.getElementById('temperature').innerText = event.detail.formatted;
});

function tryConnect() {
  machine
    .connect()
    .then(() => {})
    .catch(console.error);
}

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
});

window.machine = machine;
