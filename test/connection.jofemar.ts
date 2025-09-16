import { Jofemar } from './../lib/serial/jofemar.js';
// import {Emulator} from './../lib/utils/emulator.js';
// window.Emulator = Emulator;

const device = new Jofemar();

// device.on('device:status', event => {
//     console.log(event)
// });

device.on('channels', (event: any) => {
  const active_channels = event.detail.channels.filter((channel) => channel.active);

  // @ts-expect-error axios example
  axios.post('https://api.example.com/v1/channels', {
    active: active_channels,
  });
});

device.on('dispensing:withdrawal', (event: any) => {
  const seconds = event.detail.seconds;
  const withdrawal = document.getElementById('withdrawal');
  if (seconds > 0) {
    if (withdrawal) {
      withdrawal.classList.remove('hidden');
    }
    const seconds_to_continue = document.getElementById('seconds_to_continue');
    if (seconds_to_continue) {
      seconds_to_continue.innerText = seconds;
    }
  } else {
    if (withdrawal) {
      withdrawal.classList.add('hidden');
    }
  }
});

//device.on('jofemar:error', (event) => {
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
//   document.getElementById('error').classList.remove('hidden');
// });

device.on('reset:errors', (event: any) => {
  let timerInterval;
  // @ts-expect-error Swal example
  Swal.fire({
    title: 'Resetting errors',
    html: 'This close in <b>X</b> seconds.',
    timer: event.detail.duration * 1_000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      // @ts-expect-error Swal example
      Swal.showLoading();
      // @ts-expect-error Swal example
      const timer = Swal.getPopup().querySelector('b');
      timerInterval = setInterval(() => {
        // @ts-expect-error Swal example
        timer.textContent = `${parseInt(Swal.getTimerLeft() / 1_000)}`;
      }, 1_000);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  });
});

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
  if (!log) return;
  log.innerText += 'Connecting finished\n\n';
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

//device.on('serial:unsupported', (event) => {
//   document.getElementById('unsupported').classList.remove('hidden');
// });

device.on('temperature:current', (event: any) => {
  const temperature = document.getElementById('temperature');
  if (!temperature) return;
  temperature.innerText = event.detail.formatted;
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
  const ws = document.querySelector('.webserial');
  if (!ws) return;
  ws.innerHTML += `<div id="withdrawal" class="hidden p-4 bg-sky-900 rounded-lg">
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
