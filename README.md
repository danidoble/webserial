# Webserial API (Wrapper)

Opensource wrapper to simplify connect to serial devices over [Webserial API](https://wicg.github.io/serial/)

# Install

Using npm

```shell
npm install @danidoble/webserial
```

Using pnpm

```shell
pnpm install @danidoble/webserial
```

Using bun

```shell
bun install @danidoble/webserial
```

# Docs

If you want to use a custom or device or the other inside this package a good starter point would be [Here](https://webserial-docs.danidoble.com)

# Example

In this example we'll use Arduino interface

```html
<!-- index.html -->

<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Webserial</title>
    <script src="arduino.js" type="module"></script>
  </head>
  <body class="bg-neutral-950 text-white p-4 w-full">
    <div class="webserial w-full max-w-xl mx-auto grid grid-cols-1 gap-y-4">
      <div class="my-6"></div>
      <button id="connect" class="hidden px-4 py-3 bg-gray-800 rounded-lg">Connect to serial</button>

      <div id="need-permission" class="hidden p-4 bg-rose-900 rounded-lg">
        Woooah! It seems that you need to give permission to access the serial port. Please, click the button 'Connect
        to serial' to try again.
      </div>

      <div id="disconnected" class="hidden p-4 bg-neutral-900 w-full">
        The arduino is disconnected. Please, check the connection.
      </div>

      <div id="unsupported" class="hidden p-4 bg-orange-700 w-full absolute bottom-0 left-0">
        This browser does not support the WebSerial API. Please, use a compatible browser.
      </div>

      <div id="log" class="bg-neutral-800 p-4 rounded-lg">Log: <br /></div>
    </div>

    <script src="https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,container-queries"></script>
  </body>
</html>
```

```js
// arduino.js

import { Arduino } from '@danidoble/webserial';

const arduino = new Arduino();
arduino.on('serial:message', (data) => {
  console.log(data.detail);
});

arduino.on('serial:timeout', (data) => {
  console.log('serial:timeout', data.detail);
});

// arduino.on('serial:sent', data => {
//     console.log('serial:sent',data.detail);
// });

arduino.on('serial:error', (event) => {
  document.getElementById('log').innerText += event.detail.message + '\n\n';
});

// eslint-disable-next-line no-unused-vars
arduino.on('serial:disconnected', (event) => {
  document.getElementById('log').innerText += 'Disconnected\n\n';

  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
});

// eslint-disable-next-line no-unused-vars
arduino.on('serial:connecting', (event) => {
  document.getElementById('log').innerText += 'Connecting\n\n';
});

// eslint-disable-next-line no-unused-vars
arduino.on('serial:connected', (event) => {
  document.getElementById('log').innerText += 'Connected\n\n';

  document.getElementById('disconnected').classList.add('hidden');
  document.getElementById('need-permission').classList.add('hidden');
  document.getElementById('connect').classList.add('hidden');
});

// eslint-disable-next-line no-unused-vars
arduino.on('serial:need-permission', (event) => {
  document.getElementById('disconnected').classList.remove('hidden');
  document.getElementById('need-permission').classList.remove('hidden');
  document.getElementById('connect').classList.remove('hidden');
});

// eslint-disable-next-line no-unused-vars
arduino.on('serial:soft-reload', (event) => {
  // reset your variables
});

// eslint-disable-next-line no-unused-vars
arduino.on('serial:unsupported', (event) => {
  document.getElementById('unsupported').classList.remove('hidden');
});

function tryConnect() {
  arduino
    .connect()
    .then(() => {})
    .catch(console.error);
}

document.addEventListener('DOMContentLoaded', () => {
  tryConnect();
  document.getElementById('connect').addEventListener('click', tryConnect);
});

// get device instance after
// import {Devices} from '@danidoble/webserial'
// const myDevice = Devices.getArduino(1);

// window.arduino = arduino;
```
