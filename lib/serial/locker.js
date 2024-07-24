import {Core} from "./core.js";
import {Devices} from "../utils/devices.js";
import {open, deactivate, activate} from "./codes/locker.js";
import {Emulator} from "../utils/emulator.js";
import {
    makeBasicRequest,
    makeCellRequest,
    makeConfigCell,
    makeConfigLightScan,
    makeOpen
} from "./codes/generator.locker.js";

export class Locker extends Core {

    #_is_matrix_test = false;
    #_active_open_cell = 0;
    #_percentage_test_matrix = 0;

    constructor({
                    filters = null,
                    config_port = null,
                    no_device = 1,
                } = {}) {
        super({filters, config_port, no_device});
        this.__internal__.device.type = "locker";
        this.__internal__.dispense.limit_counter = 1;
        this.#touch();
        this.#registerAvailableListenersLocker();
    }

    #registerAvailableListenersLocker() {
        const _ = [
            'percentage:open',
            'percentage:enable',
            'percentage:disable',
        ];
        for (const event of _) {
            this.serialRegisterAvailableListener(event)
        }
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

    #validateCell(cell) {
        const n = parseInt(cell);
        if (isNaN(n) || n < 1 || n > 90) {
            throw new Error('Invalid cell number');
        }

        return n;
    }

    #resetTestMatrix() {
        this.#_is_matrix_test = false;
        this.#_active_open_cell = 0;
        this.#_percentage_test_matrix = 0;
    }

    #percentageOpenAll(dispensed = null) {
        this.#_percentage_test_matrix = Math.round((this.#_active_open_cell * 100) / 90);
        this.dispatch('percentage:open', {percentage: this.#_percentage_test_matrix, dispensed});
    }

    #percentageEnableAll() {
        this.#_percentage_test_matrix = Math.round((this.#_active_open_cell * 100) / 90);
        this.dispatch('percentage:enable', {percentage: this.#_percentage_test_matrix});
    }

    #percentageDisableAll() {
        this.#_percentage_test_matrix = Math.round((this.#_active_open_cell * 100) / 90);
        this.dispatch('percentage:disable', {percentage: this.#_percentage_test_matrix});
    }

    async dispense(cell) {
        const n = this.#validateCell(cell);
        const code = open[`g${n}`] ?? null;
        if (code === null) throw new Error('Invalid cell number');
        return await this.internalDispense(code);
    }

    async enable(cell) {
        const n = this.#validateCell(cell);
        const code = activate[`g${n}`] ?? null;
        if (code === null) throw new Error('Invalid cell number');
        await this.appendToQueue(code, 'activate');
    }

    async disable(cell) {
        const n = this.#validateCell(cell);
        const code = deactivate[`g${n}`] ?? null;
        if (code === null) throw new Error('Invalid cell number');
        await this.appendToQueue(code, 'disable');
    }

    async openAll() {
        if (this.isDispensing()) throw new Error('Another dispensing process is running');

        this.#resetTestMatrix();
        this.#_is_matrix_test = true;
        this.#percentageOpenAll();
        const dispensed = [];
        for (let i = 1; i <= 90; i++) {
            const tmp = await this.dispense(i);
            dispensed.push(tmp);
            this.#_active_open_cell = i;
            this.#percentageOpenAll();
        }
        this.#_active_open_cell = 90;
        this.#percentageOpenAll(dispensed);
        this.#resetTestMatrix();
    }

    async enableAll() {
        this.#resetTestMatrix();
        this.#_is_matrix_test = true;
        this.#percentageEnableAll();

        for (let i = 1; i <= 90; i++) {
            await this.enable(i);
            this.#_active_open_cell = i;
            this.#percentageEnableAll();
        }

        this.#_active_open_cell = 90;
        this.#percentageEnableAll();
        this.#resetTestMatrix();
    }

    async disableAll() {
        this.#resetTestMatrix();
        this.#_is_matrix_test = true;
        this.#percentageDisableAll();

        for (let i = 1; i <= 90; i++) {
            await this.enable(i);
            this.#_active_open_cell = i;
            this.#percentageDisableAll();
        }

        this.#_active_open_cell = 90;
        this.#percentageDisableAll();
        this.#resetTestMatrix();
    }


    giveMeCmdOpen(cell = 1) {
        console.log(makeOpen(3, cell));
    }

    giveMeCmdBasicRequest() {
        console.log(makeBasicRequest(3));
    }

    giveMeCmdCellRequest(cell = 1) {
        console.log(makeCellRequest(3, cell));
    }

    giveMeCmdConfigLightScan(since = 0, until = 10) {
        console.log(makeConfigLightScan(3, since, until));
    }

    giveMeCmdConfigCell(column = 0, row = 10, status = 1) {
        console.log(makeConfigCell(3, column, row, status));
    }
}