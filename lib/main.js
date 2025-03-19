/**
 * @license Webserial
 * webserial
 *
 * Created by (c) Danidoble.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Kernel } from './serial/kernel.js';
import { Relay } from './serial/relay.js';
import { Locker } from './serial/locker.js';
import { PinPad } from './serial/pinpad.js';
import { PinPax } from './serial/pinpax.js';
import { Jofemar } from './serial/jofemar.js';
import { Boardroid } from './serial/boardroid.js';
import { Arduino } from './serial/arduino.js';
import { Devices } from './utils/devices.js';
import { Emulator } from './utils/emulator.js';
import { wait, getSeconds, supportWebSerial } from './utils/utils.js';

export const utils = {
  wait,
  getSeconds,
  supportWebSerial,
};

export const version = import.meta.env.VITE_APP_VERSION;
export { Arduino, Boardroid, Devices, Emulator, Jofemar, Kernel, Locker, PinPad, Relay, PinPax };
