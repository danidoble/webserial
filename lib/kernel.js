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
import { Devices } from './utils/devices.js';
export const version = import.meta.env.VITE_APP_VERSION;
export { Devices, Kernel };
