"use strict";

import {Core} from "./../lib/serial/core.js";
import {Devices} from "./../lib/utils/devices.js";

export class Arduino extends Core {
    constructor({
                    filters = null,
                    config_port = null,
                    no_device = 1,
                } = {}) {
        super({filters, config_port, no_device});
        this.__internal__.device.type = "arduino";
        this.__internal__.time.response_connection = 2e3;
        this.__internal__.time.response_general = 2e3;
        this.#registerAvailableListenersLocker();
        this.#touch();
    }

    #touch() {
        Devices.addCustom('arduino', this);
    }

    #registerAvailableListenersLocker() {
        /*const _ = [];
        for (const event of _) {
            this.serialRegisterAvailableListener(event)
        }
        */
    }

    serialMessage(original_code) {
        const message = {
            original_code,
            code: null,
            name: null,
            description: null,
            request: null,
            no_code: 0,
        };

        const byteArray = original_code.map(hexString => parseInt(hexString, 16));
        const codex = String.fromCharCode(...byteArray).replace(/[\n\r]+/g, '');
        message.code = codex;

        switch (codex) {
            case 'connected':
                message.name = 'connected';
                message.description = 'Connection established';
                message.request = 'connect';
                message.no_code = 100;
                break;
            case 'created by danidoble':
                message.name = 'thanks';
                message.description = 'thanks for using this software';
                message.request = 'credits';
                message.no_code = 101;
                break;
            case 'hello there':
                message.name = 'hello there';
                message.description = 'hi human';
                message.request = 'hi';
                message.no_code = 102;
                break;
            case 'ara ara':
                message.name = 'ara ara';
                message.description = 'troll';
                message.request = 'ara ara';
                message.no_code = 404;
                break;
            default:
                message.name = 'unknown';
                message.description = 'Unknown command';
                message.request = 'unknown';
                message.no_code = 400;
                break
        }
        //console.warn(codex);

        this.dispatch('serial:message', message);
    }

    // eslint-disable-next-line no-unused-vars
    serialSetConnectionConstant(no_device = 1) {
        const arr = ['02'];
        return this.add0x(arr);
    }

    async sayCredits() {
        const arr = ['03', '04'];
        await this.appendToQueue(arr, 'credits');
    }

    async sayHi() {
        const arr = ['04', '05'];
        await this.appendToQueue(arr, 'hi');
    }

    async sayAra() {
        const arr = ['05', '06'];
        await this.appendToQueue(arr, 'ara');
    }

    async doSomething() {
        await this.sayCredits();
        await this.sayAra();
        await this.sayHi();
    }
}