import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const _dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry: {
                webserial: resolve(_dirname, 'lib/main.js'),
                kernel: resolve(_dirname, 'lib/kernel.js'),
                arduino: resolve(_dirname, 'lib/serial/arduino.js'),
                boardroid: resolve(_dirname, 'lib/serial/boardroid.js'),
                jofemar: resolve(_dirname, 'lib/serial/jofemar.js'),
                locker: resolve(_dirname, 'lib/serial/locker.js'),
                pinpad: resolve(_dirname, 'lib/serial/pinpad.js'),
                pinpax: resolve(_dirname, 'lib/serial/pinpax.js'),
                relay: resolve(_dirname, 'lib/serial/relay.js'),
            },
            name: 'WebSerial'
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {},
            },
        },
    },
})
