import {Core} from "./core.js";
import {Devices} from "../utils/devices.js";

export class Locker extends Core {

    #_is_matrix_test = false;
    #_active_open_cell = 0;

    constructor({
                    filters = null,
                    config_port = null,
                    no_device = 1,
                } = {}) {
        super({filters, config_port, no_device});
        this.__internal__.device.type = "locker";
        this.#touch();
    }

    #touch() {
        Devices.add(this);
    }

    serialMessage(code) {
        const message = {
            code,
            name: null,
            description: null,
            request: null,
            no_code: 0,
        };

        switch (code[1]) {
            case "8": // status
                message.name = `Connection with the serial device completed.`;
                message.description = `Your connection with the serial device was successfully completed.`;
                message.request = `connect`;
                message.no_code = 100;
                break;
            case "7": // cell
                switch (code[4]) {
                    case '5': // cell inactive
                        message.name = `Cell inactive.`;
                        message.description = `The selected cell is inactive or doesn't exist.`;
                        message.request = `dispense`;
                        message.no_code = 101;
                        this.__internal__.dispense.status = false;
                        this.dispatch('not-dispensed', {})
                        if (this.#_is_matrix_test && this.#_active_open_cell >= 89) {
                            message.finished_test = true;
                            this.#_is_matrix_test = false;
                            this.#_active_open_cell = 0;
                        } else if (this.#_is_matrix_test) {
                            message.finished_test = false;
                        }
                        break;
                    case '4': // cell open
                    default:
                        message.name = `Cell open.`;
                        message.description = `The selected cell was open successfully.`;
                        message.request = `dispense`;
                        message.no_code = 102;
                        this.__internal__.dispense.status = true;
                        this.dispatch('dispensed', {})
                        if (this.#_is_matrix_test && this.#_active_open_cell >= 89) {
                            message.finished_test = true;
                            this.#_is_matrix_test = false;
                            this.#_active_open_cell = 0;
                        } else if (this.#_is_matrix_test) {
                            message.finished_test = false;
                        }
                        break;
                }
                break;
            case "6": // config cell
                message.name = `Configuration applied.`;
                message.description = `The configuration was successfully applied.`;
                message.request = `configure cell`;
                message.no_code = 103;
                break;

            default:
                message.request = `undefined`
                message.name = `Response unrecognized`
                message.description = `The response of application was received, but dont identify with any of current parameters`
                message.no_code = 400;
                break;
        }

        this.dispatch('serial:message', message);
    }

    // eslint-disable-next-line no-unused-vars
    serialSetConnectionConstant(no_device = 1) {
        let arr = ["02", "06", "00", "03", "03", "1D", "F8", "1B", "03", "F9"];
        return this.add0x(arr);
    }
}