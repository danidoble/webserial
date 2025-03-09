import {resolve} from 'path'
import {defineConfig} from 'vite'
import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const _dirname = typeof __dirname !== 'undefined'
    // eslint-disable-next-line no-undef
    ? __dirname
    : dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    build: {
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(_dirname, 'lib/main.js'),
            name: 'WebSerial',
            // the proper extensions will be added
            fileName: 'webserial',
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
