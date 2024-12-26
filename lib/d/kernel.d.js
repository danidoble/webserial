import { Kernel } from '../serial/kernel.js';

const kernel = new Kernel();

console.log(kernel.availableListeners);
console.log(kernel.queue);
console.log(kernel.isDoorOpen);
await kernel.serialForget();
kernel.clearSerialQueue();
kernel.softReload();
await kernel.sendConnect();
await kernel.sendCustomCode();
kernel.stringToArrayBuffer('data');
kernel.hexToAscii();
kernel.asciiToHex();
