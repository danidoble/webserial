import {Kernel} from "./kernel.js";
import {Devices} from "../utils/devices.js";

export class Jofemar extends Kernel {
    __device = {
        type: 'esplus',
        support_cart: false,
        withdraw: {
            in_process: false,
            seconds: 60,
            interval: 0,
        }, // waiting for user withdraw products
        cart: {
            in_process: false,
        },
        channels: {
            verification: {
                start: 109,
                end: 189,
            }
        },
        current_dispense: {
            tray: null,
            channel: null,
        }
    }

    constructor({
                    filters = null,
                    config_port = null,
                    no_device = 1,
                } = {}) {
        super({filters, config_port, no_device});
        this.__internal__.device.type = "jofemar";
        this.__internal__.time.response_general = 800;
        this.__internal__.dispense.limit_counter = 40;
        this.#registerAvailableListenersJofemar();
        this.#touch();
    }

    #registerAvailableListenersJofemar() {
        const _ = [
            'serial:command-executed',
            'keyboard:pressed',
            'door:opened',
            'door:closed',
            'door:event',
        ];
        for (const event of _) {
            this.serialRegisterAvailableListener(event)
        }
    }

    #touch() {
        Devices.add(this);
    }

    serialJofemarMakeBytes(bytes) {
        let f_dec = this.hexToDec(this.sumHex(bytes));
        let f_ck = this.calcCheckSums(f_dec.toString());
        for (let j = 0; j < 2; j++) {
            bytes.push(this.hexMaker(f_ck[j]));
        }
        bytes.push('03');
        return this.add0x(bytes);
    }

    calcCheckSums(val) {
        val = this.add0x([this.decToHex(parseInt(val).toString())]);
        let f_ck = [];
        f_ck.push((((val & 0xFF) | 0xF0).toString(16)).toUpperCase());
        f_ck.push((((val & 0xFF) | 0x0F).toString(16)).toUpperCase());
        return f_ck;
    }

    serialSetConnectionConstant(no_device = 1) {
        let arr = ['02', '30', '30', (128 + no_device).toString(16), '53', 'FF', 'FF'];

        let bytes = [];
        arr.forEach((val) => {
            bytes.push(this.hexMaker(val));
        });

        return this.serialJofemarMakeBytes(bytes);
    }

    #internalMessageCommandExecuted(code, message) {
        message.name = `ok`;
        message.description = `The last command was executed successfully`;
        message.no_code = 1;
        this.dispatch('serial:command-executed', message);
        return message;
    }

    #internalMessageKeyboardPushed(code, message) {
        message.key = {
            hex: code,
            dec: this.hexToDec(code),
            ascii: null,
        };

        const ascii = {
            '30': '0', '31': '1', '32': '2', '33': '3', '34': '4', '35': '5', '36': '6', '37': '7', '38': '8',
            '39': '9', '2a': '*', '23': '#', '41': 'A', '42': 'B', '43': 'C', '44': 'D',
        }

        message.key.ascii = ascii[code] ?? null;
        message.name = `key pressed`;
        message.description = `The key ${message.key.ascii} was pressed`;
        message.no_code = 2;
        this.dispatch('keyboard:pressed', message);
        return message;
    }

    #internalMessageDoorEvent(code, message) {
        message.additional = {door: {open: false}};
        message.no_code = 3;
        if (code === '4f') {
            message.name = `door open`;
            message.description = `The door was opened`;
            this.dispatch('door:opened', message);
        } else if (code === '43') {
            message.name = `door close`;
            message.description = `The door was closed`;
            this.dispatch('door:closed', message);
        } else {
            message.name = `door event`;
            message.description = `The door event received is unknown`;
            this.dispatch('door:event', message);
        }
        return message;
    }

    #internalMessageChannelStatus(code, message) {
        message.no_code = 404;
        let machine = code[5] ?? null;
        if (machine && this.__internal__.device_number > 1) {
            machine = this.hexToDec(machine) - this.__internal__.device_number + 1;
            machine = this.decToHex(machine);
        }
        if (!machine) return message;

        if (machine === 'FD') { // disconnected
            message.no_code = 4;
            message.name = `channel disconnected`;
            message.description = `The channel is disconnected`;
            message.additional = {active: false};
        } else if (machine === 'FC') { // connected
            message.no_code = 5;
            message.name = `channel connected`;
            message.description = `The channel is connected`;
            message.additional = {active: true};
        } else { // sold out
            message.no_code = 6;
            message.name = `channel sold out`;
            message.description = `The channel is empty`;
            message.additional = {active: true};
        }
        this.dispatch('internal:channel-status', message.additional);
        return message;
    }

    #internalMessageWorkingTemperature(code, message) {
        message.no_code = 7;
        message.name = `working temperature`;
        message.description = `The working temperature is ${code}`;
        message.additional = {
            hex: code,
            temperature: {
                traditional: (this.hexToDec(code) - this.hexToDec('80')) / 2,
                ice_plus: ((this.hexToDec(code) - this.hexToDec('80')) / 2) - 25.5,
            },
        };
        this.dispatch('temperature:working', message.additional);
        return message;
    }

    #internalMessageCurrentTemperature(code, message) {
        message.no_code = 8;
        message.name = `current temperature`;

        message.additional = {
            sign: null, tens: null, units: null, decimals: null, type_degrees: null, formatted: null,
            decimal_point: code[7] === '2e' ? '.' : null,
            degrees: code[9] === '7f' ? '°' : null,
        };
        if (code[4] === '2b') {
            message.additional.sign = code[4] = '+';
        } else if (['2e', '2d'].includes(code[4])) {
            message.additional.sign = code[4] = '-';
        }

        if (this.hexToDec(code[5]) >= 48 && this.hexToDec(code[5]) <= 57) {
            message.additional.tens = this.hexToDec(code[5]) - 48;
        }

        if (this.hexToDec(code[6]) >= 48 && this.hexToDec(code[6]) <= 57) {
            message.additional.units = this.hexToDec(code[6]) - 48;
        }

        if (this.hexToDec(code[8]) >= 48 && this.hexToDec(code[8]) <= 57) {
            message.additional.decimals = this.hexToDec(code[8]) - 48;
        }

        if (code[10] === '43') {
            message.additional.type_degrees = 'C';
        } else if (code[10] === '46') {
            message.additional.type_degrees = 'F';
        }

        message.additional.formatted =
            (message.additional.sign ?? '') +
            (message.additional.tens ?? '') +
            (message.additional.units ?? '') +
            (message.additional.decimal_point ?? '') +
            (message.additional.decimals ?? '') +
            (message.additional.degrees ?? '') +
            (message.additional.type_degrees ?? '');

        message.description = `The current temperature is ${message.additional.formatted}`;

        this.dispatch('temperature:current', message.additional);
        return message;
    }

    #internalMessageByte0Case02(code, message, aux_machine = 128) {
        if (code[1]) {
            message.additional.machine.hex = code[1];
            message.additional.machine.dec = (this.hexToDec(code[1]) - aux_machine);
        }

        if (!(code[1] && code[2])) {
            //message.request = `unknown`; // implicit
            message = this.#internalMessageCommandExecuted(code, message);
        } else {
            switch (code[2]) {
                case '54':
                    message.request = `--automatic`;
                    message = this.#internalMessageKeyboardPushed(code[3], message);
                    break;
                case '50':
                    message.request = `--automatic`;
                    message = this.#internalMessageDoorEvent(code[3], message);
                    break;
                case '43':
                    switch (code[3] === '43') {
                        case '43':
                            message.request = `channel-status`;
                            message = this.#internalMessageChannelStatus(code, message);
                            break;
                        case '54':
                            message.request = `working-temperature`;
                            message = this.#internalMessageWorkingTemperature(code[4], message);
                            break;
                        case '74':
                            message.request = `current-temperature`;
                            message = this.#internalMessageCurrentTemperature(code, message);
                            break;
                    }
                    break;
            }
        }

        return message;
    }

    #setDispensed() {
        if (this.__internal__.dispense.dispensing) {
            this.__internal__.dispense.status = true;
        }
    }

    #setNotDispensed() {
        if (this.__internal__.dispense.dispensing) {
            this.__internal__.dispense.status = false;
        }
    }
    #setElevatorLocked() {
        if (this.__internal__.dispense.dispensing) {
            this.__internal__.dispense.status = false;
        }
    }

    #internalMessageByte0Case06(code, message, aux_machine = 128) {
        message.request = 'status';
        if (code[1] && !code[2]) {
            switch (code[1]) {
                case '30':
                    message.name = `Machine ready`;
                    message.description = `The machine is ready for instructions`;
                    message.no_code = 9;
                    this.#setDispensed();
                    break;
                case '31':
                    message.name = `Machine busy`;
                    message.description = `The machine is busy right now`;
                    message.no_code = 10;
                    break;
                case '32':
                    message.name = `Invalid tray`;
                    message.description = `The tray requested is invalid`;
                    message.no_code = 11;
                    this.#setNotDispensed();
                    break;
                case '33':
                    message.name = `Invalid channel`;
                    message.description = `The channel requested is invalid`;
                    message.no_code = 12;
                    this.#setNotDispensed();
                    break;
                case '34':
                    message.name = `Empty channel`;
                    message.description = `The channel requested is empty`;
                    message.no_code = 13;
                    this.#setNotDispensed();
                    break;
                case '35':
                    message.name = `Jam`;
                    message.description = `Jam in elevator engine`;
                    message.no_code = 14;
                    this.#setNotDispensed();
                    break;
                case '36':
                    message.name = `Malfunction`;
                    message.description = `Malfunction in the elevator belt or product detector`;
                    message.no_code = 15;
                    this.#setNotDispensed();
                    break;
                case '37':
                    message.name = `Photo transistors`;
                    message.description = `Failure in one of the photo transistors in the cabinet`;
                    message.no_code = 16;
                    this.#setNotDispensed();
                    break;
                case '38':
                    message.name = `Without channels`;
                    message.description = `No channels detected`;
                    message.no_code = 17;
                    this.#setNotDispensed();
                    break;
                case '39':
                    message.name = `Product detector fault`;
                    message.description = `Product detector fault`;
                    message.no_code = 18;
                    this.#setElevatorLocked();
                    break;
            }
        } else {
            message.name = 'executed';
            message.description = 'The last command was executed successfully';
            message.no_code = 8;
            if (!code[1] && this.__internal__.dispense.dispensing) {
                this.#setNotDispensed();
            }
        }

        return message;
    }

    // eslint-disable-next-line no-unused-vars
    serialMessage(code) {
        const aux_machine = 128;
        let message = {
            code,
            name: null,
            description: null,
            request: 'unknown',
            no_code: 0,
            additional: {
                machine: {
                    hex: null,
                    dec: null,
                },
            },
        };

        switch (code[0]) {
            case '02':
                message = this.#internalMessageByte0Case02(code, message, aux_machine);
                break;
            case '06':
                message = this.#internalMessageByte0Case06(code, message, aux_machine);
                break;
        }

        this.dispatch('serial:message', message);
    }
}

// todo:
// internal:channel-status