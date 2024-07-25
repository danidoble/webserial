import './style.css';
import {Locker} from './../lib/serial/locker.js';

const locker = new Locker();
locker.on('serial:message', data => {
    console.log(data);
});
// locker.on('serial:disconnected', () => {
//     console.log('serial device was disconnected');
// });
// locker.on('dispensed', () => {
//     console.log('Cell opened');
// });
// locker.on('not-dispensed', () => {
//     console.log('Cell not opened');
// });

document.addEventListener('DOMContentLoaded', () => {
    tryConnect();

    const connect = document.getElementById('testConnection');
    connect.addEventListener('click', async () => {
        await locker.connect().catch(console.error);
    });
});

function tryConnect() {
    locker.connect().then(() => {
    }).catch(console.error);
}

window.locker = locker;