import {Core} from "./core.js";
import {Devices} from "../utils/devices.js";

export class Boardroid extends Core {
    _recycler = {
        ict: true,
        bill: 1, // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
    }

    constructor({
                    filters = null,
                    config_port = null,
                    no_device = 1,
                } = {}) {
        super({filters, config_port, no_device});
        this.__internal__.device.type = "boardroid";
        this.#touch();
    }

    #touch() {
        Devices.add(this);
    }

    serialBoardroidSumHex(arr) {
        let sum = 0;
        arr.forEach((value, index) => {
            if (index !== 0 && index !== 11) {
                sum += parseInt(value, 16);
            }
        });
        return sum.toString(16).toUpperCase();
    }

    serialMessage(code) {
        // this.dispatch('serial:message', message);
    }

    serialSetConnectionConstant(no_device = 1) {
        let arr = ["F1", "06", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "F8"];
        arr[1] = this.hexMaker(this.decToHex((5 + no_device).toString()));
        arr[11] = this.serialBoardroidSumHex(arr);
        return this.add0x(arr);
    }
}