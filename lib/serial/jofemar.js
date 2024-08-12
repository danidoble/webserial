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
        let f_ck = this.#calcCheckSums(f_dec.toString());
        for (let j = 0; j < 2; j++) {
            bytes.push(this.hexMaker(f_ck[j]));
        }
        bytes.push('03');
        return this.add0x(bytes);
    }

    #calcCheckSums(val) {
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
        message.no_code = 4;
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
                    message = this.#internalMessageChannelStatus(code, message); // ????
                    break;
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
        }

        this.dispatch('serial:message', message);
    }
}