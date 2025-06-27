/**
 * @license Webserial
 * webserial
 *
 * Created by (c) Danidoble.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { wait, getSeconds, supportWebSerial } from './utils/utils.js';

export { Kernel } from './serial/kernel.js';
export { Relay } from './serial/relay.js';
export { Locker } from './serial/locker.js';
export { PinPad } from './serial/pinpad.js';
export { PinPax } from './serial/pinpax.js';
export { Jofemar } from './serial/jofemar.js';
export { Boardroid } from './serial/boardroid.js';
export { Arduino } from './serial/arduino.js';
export { Hopper } from './serial/hopper.js';
export { Devices } from './utils/devices.js';
export { Emulator } from './utils/emulator.js';

export const utils = {
  wait,
  getSeconds,
  supportWebSerial,
};

export const version = import.meta.env.VITE_APP_VERSION;
