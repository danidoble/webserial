import './style.css';
import {Boardroid} from './../lib/serial/boardroid.js';

const boardroid = new Boardroid();
boardroid.on('serial:message', data => {
    console.log(data);
});
// boardroid.on('serial:disconnected', () => {
//     console.log('serial device was disconnected');
// });
// boardroid.on('dispensed', () => {
//     console.log('dispensed');
// });
// boardroid.on('not-dispensed', () => {
//     console.log('not dispensed');
// });
// boardroid.on('serial:sent', (data) => {
//     console.log(data);
// });
// boardroid.on('serial:timeout', (data) => {
//     console.log(data);
// });
boardroid.on('percentage:test', (data) => {
    console.log(data.detail);
});
boardroid.on('serial:disconnected',(data)=>console.log(data));
boardroid.on('serial:lost',(data)=>console.log(data));
boardroid.on('serial:connecting',(data)=>console.log(data));

document.addEventListener('DOMContentLoaded', () => {
    tryConnect();

    const connect = document.getElementById('testConnection');
    connect.addEventListener('click', async () => {
        await boardroid.connect().catch(console.error);
    });
});

function tryConnect() {
    boardroid.connect().then(() => {
    }).catch(console.error);
}

window.boardroid = boardroid;