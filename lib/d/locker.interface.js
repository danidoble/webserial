import {Locker} from "../serial/locker.js";

const locker = new Locker();
await locker.disable();
await locker.openAll();
await locker.enableAll();
await locker.disableAll();