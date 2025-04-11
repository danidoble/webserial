import {resolve} from 'path'
import {defineConfig} from 'vite'
import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import basicSsl from '@vitejs/plugin-basic-ssl'

const _dirname = typeof __dirname !== 'undefined'
    // eslint-disable-next-line no-undef
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        basicSsl(),
    ],
    build: {
        lib: {
            // entry: resolve(_dirname, 'lib/main.js'),
            // name: 'WebSerial',
            // fileName: 'webserial',
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
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: [],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {},
            },
        },
    },
})
