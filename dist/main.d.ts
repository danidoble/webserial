/**
 * @license Webserial
 * webserial
 *
 * Created by (c) Danidoble.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { wait, getSeconds, supportWebSerial } from './utils/utils';
export { Kernel } from './serial/kernel';
export { Relay } from './serial/relay';
export { Locker } from './serial/locker';
export { PinPad } from './serial/pinpad';
export { PinPax } from './serial/pinpax';
export { Jofemar } from './serial/jofemar';
export { Boardroid } from './serial/boardroid';
export { Hopper } from './serial/hopper';
export { Devices } from './utils/devices';
export { Emulator } from './utils/emulator';
export { Socket } from 'webserial-core';
export declare const utils: {
    wait: typeof wait;
    getSeconds: typeof getSeconds;
    supportWebSerial: typeof supportWebSerial;
};
export declare const version: any;
//# sourceMappingURL=main.d.ts.map