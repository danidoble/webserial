import {Relay} from "./serial/relay.js";
import {Locker} from "./serial/locker.js";
import {Jofemar} from "./serial/jofemar.js";
import {Boardroid} from "./serial/boardroid.js";
import {Devices} from "./utils/devices.js";
import {Emulator} from "./utils/emulator.js";

export {Relay, Locker, Jofemar, Boardroid, Devices, Emulator};

export const WebSerial = {
    Relay,
    Locker,
    Jofemar,
    Boardroid,
    Devices,
    Emulator,
    version: import.meta.env.VITE_APP_VERSION,
};
