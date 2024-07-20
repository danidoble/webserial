import {Core} from "./core.js";
import {Devices} from "../utils/devices.js";

export class Jofemar extends Core {
    constructor({
                    filters = null,
                    config_port = null,
                    no_device = 1,
                } = {}) {
        super({filters, config_port, no_device});
        this.__internal__.device.type = "jofemar";
        this.#touch();
    }

    #touch() {
        Devices.add(this);
    }

    #makeBytes(bytes) {
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

        return this.#makeBytes(bytes);
    }

    serialMessage(code) {
        // this.dispatch('serial:message', message);
    }
}