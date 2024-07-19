"use strict";

import {Core} from "./core.js";
import {Devices} from "../utils/devices.js";

export class Relay extends Core {
    #_codes = {
        activate: ["A0", "01", "01", "A2"],
        deactivate: ["A0", "01", "00", "A1"],
    }

    constructor({
                    filters = null,
                    config_port = null,
                    no_device = 1,
                } = {}) {
        super({filters, config_port, no_device});
        this.__internal__.device.type = "relay";
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

        switch (code[1].toString()) {
            case "dd": // status
                message.name = `Connection with the serial device completed.`;
                message.description = `Your connection with the serial device was successfully completed.`;
                message.request = `connect`;
                message.no_code = 100;
                break;
            case "de":
                break;
            default:
                message.name = `Unrecognized response`;
                message.description = `The response of application was received, but dont identify with any of current parameters`;
                message.request = `undefined`;
                message.no_code = 400;
                break;
        }

        this.dispatch('serialMessage', message);
    }
}