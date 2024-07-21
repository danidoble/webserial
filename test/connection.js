import './style.css';
import {Arduino} from './arduino.js';

const arduino = new Arduino();
arduino.on('serial:message', data => {
    console.log(data.detail);
});
arduino.on('serial:disconnected', () => {
    console.log('serial device was disconnected');
})

document.addEventListener('DOMContentLoaded', () => {
    tryConnect();

    const connect = document.getElementById('testConnection');
    connect.addEventListener('click', async () => {
        await arduino.connect().catch(console.error);
    });
});

function tryConnect() {
    arduino.connect().then(() => {
    }).catch(console.error);
}

window.arduino = arduino;