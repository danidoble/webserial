import './style.css';
import {Jofemar} from './../lib/serial/jofemar.js';
import {Emulator} from './../lib/utils/emulator.js';

const jofemar = new Jofemar();
jofemar.on('serial:message', data => {
    console.log(data);
});
// jofemar.on('serial:disconnected', () => {
//     console.log('serial device was disconnected');
// });
// jofemar.on('dispensed', () => {
//     console.log('Cell opened');
// });
// jofemar.on('not-dispensed', () => {
//     console.log('Cell not opened');
// });

document.addEventListener('DOMContentLoaded', () => {
    tryConnect();

    const connect = document.getElementById('testConnection');
    connect.addEventListener('click', async () => {
        await jofemar.connect().catch(console.error);
    });
});

function tryConnect() {
    jofemar.connect().then(() => {
    }).catch(console.error);
}

window.jofemar = jofemar;
window.Emulator = Emulator;