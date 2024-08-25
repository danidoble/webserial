import {Kernel} from "./serial/kernel.js";
import {Relay} from "./serial/relay.js";
import {Locker} from "./serial/locker.js";
import {Jofemar} from "./serial/jofemar.js";
import {Boardroid} from "./serial/boardroid.js";
import {Devices} from "./utils/devices.js";
import {Emulator} from "./utils/emulator.js";
import {wait, getSeconds, supportWebSerial} from "./utils/utils.js";

export const utils = {
    wait,
    getSeconds,
    supportWebSerial,
};

export const version = import.meta.env.VITE_APP_VERSION;
export {Relay, Locker, Jofemar, Boardroid, Devices, Emulator, Kernel};

// export const WebSerial = {
//     Relay,
//     Locker,
//     Jofemar,
//     Boardroid,
//     Devices,
//     Emulator,
//     version,
// };
