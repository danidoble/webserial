import { Kernel } from '../serial/kernel.js';

const kernel = new Kernel();

kernel.availableListeners;
kernel.queue;
await kernel.serialForget();
kernel.clearSerialQueue();
kernel.softReload();
await kernel.sendConnect();
await kernel.sendCustomCode();
