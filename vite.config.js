import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const _dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        emptyOutDir: false,
        lib: {
            entry: {
                webserial: resolve(_dirname, 'lib/main.ts'),
                kernel: resolve(_dirname, 'lib/kernel.ts'),
                boardroid: resolve(_dirname, 'lib/serial/boardroid.ts'),
                jofemar: resolve(_dirname, 'lib/serial/jofemar.ts'),
                locker: resolve(_dirname, 'lib/serial/locker.ts'),
                pinpad: resolve(_dirname, 'lib/serial/pinpad.ts'),
                pinpax: resolve(_dirname, 'lib/serial/pinpax.ts'),
                relay: resolve(_dirname, 'lib/serial/relay.ts'),
                hopper: resolve(_dirname, 'lib/serial/hopper.ts'),
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
