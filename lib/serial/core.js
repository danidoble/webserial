import {v4 as uuidv4} from 'uuid';
import {Dispatcher} from "../utils/dispatcher.js";
import {supportWebSerial, wait} from "../utils/utils.js";

export class Core extends Dispatcher {
    __internal__ = {
        device_number: 1,
        aux_port_connector: 0,
        serial: {
            connected: false,
            port: null,
            reader: null,
            input_done: null,
            output_done: null,
            input_stream: null,
            output_stream: null,
            keep_reading: true,
            incoming: new Uint8Array(0),
            time_until_send_bytes: undefined,
            bytes_connection: null,
            navigator_not_supported: "_id_vl_not_support",
            filters: [],
            btn_connect_serial: null,
            config_port: {
                baudRate: 9600,
                dataBits: 8,
                stopBits: 1,
                parity: "none",
                bufferSize: 32768,
                flowControl: "none",
            },
            queue: [],
        },
        device: {
            type: 'unknown',
            id: uuidv4(),
        },
        time: {
            response_connection: 500,
            response_general: 2e3,
        },
        timeout: {
            until_response: 0,
        },
        interval: {
            reconnection: 0,
        },
        dispense: {
            status: false,
        },

        wait_until_last_command_returns: undefined,

        time_to_reconnect: 7e3,
        last_error: {"message": null, "handler": null, "code": null, "no_code": 0},
    }

    constructor({
                    filters = null,
                    config_port = null,
                    no_device = 1,
                } = {}) {
        super();

        if (filters) {
            this.serialFilters = filters;
        }

        if (config_port) {
            this.serialConfigPort = config_port;
        }

        if (no_device) {
            this.#serialSetBytesConnection(no_device);
        }

        this.#internalEvents();
    }

    set serialFilters(filters) {
        this.__internal__.serial.filters = filters;
    }

    get serialFilters() {
        return this.__internal__.serial.filters;
    }

    set serialConfigPort(config_port) {
        this.__internal__.serial.config_port = config_port;
    }

    get serialConfigPort() {
        return this.__internal__.serial.config_port;
    }

    get isConnected() {
        return this.__internal__.serial.connected;
    }

    get deviceNumber() {
        return this.__internal__.device_number;
    }

    get uuid() {
        return this.__internal__.device.id;
    }

    get typeDevice() {
        return this.__internal__.device.type;
    }

    async timeout(bytes, event) {
        this.__internal__.last_error.message = "Operation response timed out.";
        this.__internal__.last_error.handler = event;
        this.__internal__.last_error.code = bytes;
        if (this.__internal__.timeout.until_response) {
            clearTimeout(this.__internal__.timeout.until_response);
            this.__internal__.timeout.until_response = 0;
        }
        if (event === 'connect') {
            this.__internal__.serial.connected = false;
            this.dispatch('serial:reconnect', {});
        } else if (event === 'connection:start') {
            await this.serialDisconnect();
            this.__internal__.serial.connected = false;
            this.__internal__.aux_port_connector += 1;
            await this.serialConnect();
        }

        this.dispatch('serial:timeout', {
            ...this.__internal__.last_error,
            bytes,
            action: event
        });
    }

    async disconnect(detail = null) {
        if (this.isConnected) {
            this.dispatch('serial:disconnected', detail);
        }
        await this.serialDisconnect();
        this.__internal__.serial.connected = false;
        this.__internal__.aux_port_connector = 0;
    }

    async connect() {
        return new Promise((resolve, reject) => {

            if (!supportWebSerial()) {
                reject(`Web Serial not supported`);
            }

            setTimeout(async () => {
                await wait(499);
                await this.serialConnect();
                if (this.isConnected) {
                    resolve(`${this.typeDevice} device ${this.deviceNumber} connected`);
                } else {
                    reject(`${this.typeDevice} device ${this.deviceNumber} not connected`);
                }
            }, 1);
        });
    }

    async serialDisconnect() {
        try {
            const reader = this.__internal__.serial.reader;
            const output_stream = this.__internal__.serial.output_stream;
            if (reader) {
                const reader_promise = reader.cancel();
                reader_promise.then(() => {
                }).catch((err) => this.serialErrors(err));

                await this.__internal__.serial.input_done;
                this.__internal__.serial.reader = null;
                this.__internal__.serial.input_done = null;
            }

            if (output_stream) {
                await output_stream.getWriter().close();
                await this.__internal__.serial.output_done;
                this.__internal__.serial.output_stream = null;
                this.__internal__.serial.output_done = null;
            }

            if (this.__internal__.serial.connected) {
                this.__internal__.serial.port.close();
            }
            this.__internal__.serial.connected = false;
            this.__internal__.serial.port = null;
        } catch (err) {
            this.serialErrors(err)
        }
    }

    async #serialWrite(data) {
        const port = this.__internal__.serial.port;
        if (!port) {
            throw new Error("The port is closed.");
        }
        const bytes = new Uint8Array(data);
        const writer = port.writable.getWriter();
        await writer.write(bytes);
        writer.releaseLock();
    }

    #bytesToLowerCase(code = []) {
        return code.map((item) => item.toString().toLowerCase());
    }

    #serialGetResponse(code = [], data = null) {
        if (code && code.length > 0) {
            this.__internal__.serial.connected = true;
            if (this.__internal__.interval.reconnection) {
                clearInterval(this.__internal__.interval.reconnection);
                this.__internal__.interval.reconnection = 0;
            }

            if (this.__internal__.timeout.until_response) {
                clearTimeout(this.__internal__.timeout.until_response);
                this.__internal__.timeout.until_response = 0;
            }
            this.serialMessage(this.#bytesToLowerCase(code));
        } else {
            this.serialCorruptMessage(code, data);
        }

        if (this.__internal__.serial.queue.length === 0) return;
        this.dispatch('internal:queue', {});
    }

    async #serialPortsFiltered() {
        const filters = this.serialFilters;
        const ports = await navigator.serial.getPorts({filters});

        return ports.filter((port) => {
            const info = port.getInfo();
            return filters.some((filter) => {
                return (
                    (info.usbProductId === filter.usbProductId) &&
                    (info.usbVendorId === filter.usbVendorId)
                );
            });
        });
    }

    async serialPortsSaved(ports) {
        const filters = this.serialFilters;
        if (this.__internal__.aux_port_connector < ports.length) {
            const aux = this.__internal__.aux_port_connector;
            this.__internal__.serial.port = ports[aux];
        } else {
            this.__internal__.aux_port_connector = 0;
            this.__internal__.serial.port = await navigator.serial.requestPort({filters});
        }
        if (!this.__internal__.serial.port) {
            throw new Error("Select another port please");
        }
    }

    serialErrors(error) {
        const err = error.toString().toLowerCase();
        switch (true) {
            case err.includes("must be handling a user gesture to show a permission request"):
            case err.includes('the port is closed.'):
            case err.includes('select another port please'):
            case err.includes('no port selected by the user'):
            case err.includes("this readable stream reader has been released and cannot be used to cancel its previous owner stream"):
                // show permissions modal
                break;
            case err.includes("the port is already open."):
                this.serialDisconnect.then(async () => {
                    this.__internal__.aux_port_connector += 1;
                    await this.serialConnect();
                });
                break;
            case err.includes("cannot read properties of undefined (reading 'writable')"):
            case err.includes("cannot read properties of null (reading 'writable')"):
            case err.includes("cannot read property 'writable' of null"):
            case err.includes("cannot read property 'writable' of undefined"):
            case err.includes("failed to open serial port"):
                this.serialDisconnect.then(async () => {
                    await this.serialConnect();
                });
                break;
            case err.includes("failed to execute 'open' on 'serialport': a call to open() is already in progress."):
                // ... do something?
                break;
            case err.includes("the device has been lost"):
                // dispatch event
                break;
            case err.includes("navigator.serial is undefined"):
                // dispatch event
                break;
            default:
                // unhandled error
                break;
        }
    }

    #appendBuffer(arraybuffer) {
        if (arraybuffer !== undefined) {
            const incoming = this.__internal__.serial.incoming;
            let tmp = new Uint8Array(incoming.length + arraybuffer.byteLength);
            tmp.set(incoming, 0);
            tmp.set(new Uint8Array(arraybuffer), incoming.length);
            this.__internal__.serial.incoming = tmp;
        }
    }

    async #readSerialLoop() {
        const port = this.__internal__.serial.port;
        while (port.readable && this.__internal__.serial.keep_reading) {
            const reader = port.readable.getReader();
            this.__internal__.serial.reader = reader;
            try {
                let run = true;
                while (run) {
                    const {value, done} = await reader.read();
                    if (done) {
                        reader.releaseLock();
                        this.__internal__.serial.keep_reading = false;
                        run = false;
                        break;
                    }

                    this.#appendBuffer(value);

                    if (this.__internal__.serial.time_until_send_bytes) {
                        clearTimeout(this.__internal__.serial.time_until_send_bytes);
                        this.__internal__.serial.time_until_send_bytes = 0;
                    }

                    this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
                        let hex = [];
                        for (const byte in this.__internal__.serial.incoming) {
                            hex.push(this.__internal__.serial.incoming[byte].toString(16));
                        }

                        if (this.__internal__.serial.incoming) {
                            this.#serialGetResponse(hex);
                        }

                        this.__internal__.serial.incoming = new Uint8Array(0);
                    }, 400);
                }
            } catch (err) {
                this.serialErrors(err);
            } finally {
                reader.releaseLock();
            }
        }
        this.__internal__.serial.keep_reading = true;
        await this.__internal__.serial.port.close();
    }

    async serialConnect() {
        try {
            const ports = await this.#serialPortsFiltered();
            if (ports.length > 0) {
                await this.serialPortsSaved(ports);
            } else {
                const filters = this.serialFilters;
                this.__internal__.serial.port = await navigator.serial.requestPort({filters});
            }

            const port = this.__internal__.serial.port;
            await port.open(this.serialConfigPort);
            const this1 = this;
            port.onconnect = (event) => {
                this1.dispatch('serial:connected', event.detail);
                if (this1.__internal__.serial.queue.length > 0) {
                    this1.dispatch('internal:queue', {});
                }
            }
            port.ondisconnect = async (event) => {
                await this1.disconnect(event.detail ?? null);
            }
            this.dispatch('serial:connecting', port.getInfo());
            this.__internal__.timeout.until_response = setTimeout(async () => {
                await this1.timeout(this1.__internal__.serial.bytes_connection, 'connection:start');
            }, this.__internal__.time.response_connection);

            await this.#serialWrite(this.__internal__.serial.bytes_connection);
            if (this.typeDevice === 'relay') {
                this.#serialGetResponse(["DD", "DD"], null);
            }
            await this.#readSerialLoop();
        } catch (e) {
            this.serialErrors(e);
        }
    }

    async #forget() {
        if (typeof window === 'undefined') return false;

        if ("serial" in navigator && "forget" in window.SerialPort.prototype) {
            await this.__internal__.serial.port.forget();
            return true;
        }

        //console.warn("Navigator don't support forget by now");
        return false;
    }

    async serialForget() {
        return await this.#forget();
    }

    decToHex(dec) {
        return parseInt(dec, 10).toString(16);
    }

    hexToDec(hex) {
        return parseInt(hex, 16).toString(10);
    }

    hexMaker(val, min = 2) {
        if (val === undefined) {
            val = "00";
        }
        let missing = (min - (val.toString().length));
        if (missing > 0) {
            for (let i = 0; i < missing; i++) {
                val = "0" + val;
            }
        }
        return val.toString().toUpperCase();
    }

    add0x(bytes) {
        let new_bytes = [];
        bytes.forEach((value, index) => {
            new_bytes[index] = "0x" + value;
        });
        return new_bytes;
    }

    bytesToHex(bytes) {
        return this.add0x(Array.from(bytes, byte => this.hexMaker(byte)));
    }

    #internalEvents() {
        this.on('internal:queue', async () => {
            await this.#runQueue();
        });
    }

    async #runQueue() {
        if (!this.__internal__.serial.connected) {
            await this.serialConnect();
            return;
        }

        // check if something is waiting for a response, when response arrives, the queue will be processed
        if (this.__internal__.timeout.until_response) return;

        if (this.__internal__.serial.queue.length === 0) return;

        // first element in queue
        const first = this.__internal__.serial.queue[0];
        this.__internal__.timeout.until_response = setTimeout(async () => {
            await this.timeout(first.bytes, first.action);
        }, this.__internal__.time.response_general);


        this.dispatch('serial:sent', {
            action: first.action,
            bytes: first.bytes,
        });

        await this.#serialWrite(first.bytes);
        if (this.typeDevice === 'relay') {
            this.#serialGetResponse(["DD", "DD"], null);
        }
        const copy_queue = [...this.__internal__.serial.queue];
        this.__internal__.serial.queue = copy_queue.splice(1);
    }

    async appendToQueue(arr, action) {
        const bytes = this.bytesToHex(arr);

        if (['connect', 'connection:start'].includes(action)) {
            if (this.__internal__.serial.connected) return;

            // ignore queue because the connection is not established, so first message is connection
            // queue will never send a message before connection is established

            await this.serialConnect();
            return;
        }

        this.__internal__.serial.queue.push({bytes, action});
        this.dispatch('internal:queue', {})
    }

    #serialSetBytesConnection(no_device = 1) {
        this.__internal__.device_number = no_device;
        this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(no_device);
    }

    // eslint-disable-next-line no-unused-vars
    serialSetConnectionConstant(no_device = 1) {
        // ... implement in subclass
    }

    // eslint-disable-next-line no-unused-vars
    serialMessage(code) {
        // this.dispatch('serial:message', code);
        // ... implement in subclass
    }

    // eslint-disable-next-line no-unused-vars
    serialCorruptMessage(code, data) {
        // ... implement in subclass
    }

    #clearLastError() {
        this.__internal__.last_error = {"message": null, "handler": null, "code": null, "no_code": 0};
    }

    sumHex(arr) {
        let sum = 0;
        arr.forEach((value) => {
            sum += parseInt(value, 16);
        });
        return sum.toString(16);
    }

    __emulate(data) {
        if (typeof data.code !== "object") {
            console.error(`Invalid data to make an emulation`);
            return;
        }

        if (!this.__internal__.serial.connected) {
            this.__internal__.serial.connected = true;
            if (this.__internal__.interval.reconnection) {
                clearInterval(this.__internal__.interval.reconnection);
                this.__internal__.interval.reconnection = 0;
            }
        }

        if (this.__internal__.timeout.until_response) {
            clearTimeout(this.__internal__.timeout.until_response);
            this.__internal__.timeout.until_response = 0;
        }

        this.serialMessage(data.code);
    }

    toString() {
        return JSON.stringify({
            __class: this.typeDevice,
            device_number: this.deviceNumber,
            uuid: this.uuid,
            connected: this.isConnected,
            connection: this.__internal__.serial.bytes_connection,
        })
    }

    softReload() {
        this.#clearLastError();
        this.dispatch('serial:soft-reload', {});
    }

    async sendConnect() {
        await this.appendToQueue(this.__internal__.serial.bytes_connection, 'connect');
    }

    async sendCustomCode(bytes) {
        await this.appendToQueue(bytes, 'custom');
    }
}

