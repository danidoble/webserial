import {Kernel} from "./kernel.js";
import {Devices} from "../utils/devices.js";

export class Locker extends Kernel {
    #_is_matrix_test = false;
    #_active_open_cell = 0;
    #_percentage_test_matrix = 0;

    constructor(
        {
            filters = null,
            config_port = null,
            no_device = 1,
            device_listen_on_port = 3,
        } = {}) {
        super({filters, config_port, no_device, device_listen_on_port});
        this.__internal__.device.type = "locker";
        if (Devices.getCustom(this.typeDevice, no_device)) throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
        this.__internal__.device.milliseconds = 666;
        this.__internal__.dispense.limit_counter = 1;
        this.#touch();
        this.#registerAvailableListenersLocker();
    }

    #registerAvailableListenersLocker() {
        const _ = [
            'percentage:disable',
            'percentage:enable',
            'percentage:open',
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
            case "08": // status
                message.name = `Connection with the serial device completed.`;
                message.description = `Your connection with the serial device was successfully completed.`;
                message.request = `connect`;
                message.no_code = 100;
                break;
            case "07": // cell
                switch (code[4]) {
                    case '00': // cell close
                        message.name = `Cell closed.`;
                        message.description = `The selected cell is closed.`;
                        message.request = `dispense`;
                        message.no_code = 1102;
                        this.__internal__.dispense.status = false;
                        this.dispatch('dispensed', {})
                        if (this.#_is_matrix_test && this.#_active_open_cell >= 89) {
                            message.finished_test = true;
                            this.#_is_matrix_test = false;
                            this.#_active_open_cell = 0;
                        } else if (this.#_is_matrix_test) {
                            message.finished_test = false;
                        }
                        break;
                    case '01': // cell open by status
                    case '04': // cell open by request
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
                    case '05': // cell inactive
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

                    default:
                        break;
                }
                break;
            case "06": // config cell
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

    serialSetConnectionConstant(listen_on_port = 3) {
        return this.add0x(this.serialLockerGetConnectionCmd(listen_on_port));
    }

    serialLockerCmdMaker(cmd) {
        const time = this.__internal__.device.milliseconds;
        //const time = new Date().getMilliseconds();
        let array = null;
        try {
            array = new Uint8Array(cmd.length + 8);
            array.set(cmd, 2);
            array[0] = 2;
            array[1] = cmd.length + 4;
            array[array.length - 2] = 3; // end Byte

            let cmdSum = 0;
            for (let i = 1; i < cmd.length; i++) {
                cmdSum += cmd[i];
                cmdSum *= parseInt((Math.pow(2, i - 1)).toString());
            }
            array[cmd.length + 2] = cmdSum % 256;
            array[cmd.length + 3] = (time * 3) % 256;
            array[cmd.length + 4] = (time * 8) % 256;

            let checksum = 0;
            for (let i = 3; i < cmd.length + 5; i++) {
                checksum += array[i];
            }
            array[cmd.length + 5] = checksum % 256;

            // Calc XOR for all bytes except the last one
            let xorValue = 0;
            for (let i = 0; i < array.length - 1; i++) {
                xorValue ^= array[i];
            }
            array[array.length - 1] = xorValue;
        } catch (ex) {
            this.serialErrors(`Error generating command: ${ex.message}`);
            array = null;
        }
        return array;
    }

    serialLockerHexCmd(command) {
        const cmd = this.serialLockerCmdMaker(command);
        const hex = [];
        for (let i = 0; i < cmd.length; i++) {
            hex.push(this.decToHex(cmd[i]));
        }
        return hex;
    }

    serialLockerGetConnectionCmd(port = 3) {
        if (port < 1 || port > 255) throw new Error('Invalid port number');
        return this.serialLockerHexCmd(new Uint8Array([0, port]));
    }

    #serialLockerGetStatusCellCmd(cell = 1) {
        cell = this.#validateCell(cell);
        return this.serialLockerHexCmd(new Uint8Array([16, this.__internal__.device.listen_on_port, cell]));
    }

    // #serialLockerGetLightScanCmd(since = 0, until = 10) {
    //     return this.serialLockerHexCmd(new Uint8Array([32, this.__internal__.device.listen_on_port, since, until]));
    // }

    parseCellToColumnRow(cell) {
        const column = Math.floor((cell - 1) / 10) + 1;
        let row = cell % 8;
        if (row === 0) row = 8;
        return [column, row];
    }

    #serialLockerGetConfigureCellCmd({enable = true, column = 0, row = 10} = {}) {
        if (column < 0 || column > 8) throw new Error('Invalid column number');
        if (row < 0 || row > 10) throw new Error('Invalid row number');
        let status = 1;
        if (!enable) status = 0;
        return this.serialLockerHexCmd(new Uint8Array([48, this.__internal__.device.listen_on_port, column, row, status]));
    }

    // #serialLockerGetOpenCmd(cell = 1) {
    //     cell = this.#validateCell(cell);
    //     const time = this.__internal__.device.milliseconds;
    //     //const time = new Date().getMilliseconds();
    //     const timeHigh = time % 256;
    //     const timeLow = Math.floor(time / 3) % 256;
    //     return this.serialLockerHexCmd(new Uint8Array([64, this.__internal__.device.listen_on_port, cell, timeHigh, timeLow]));
    // }

    #validateCell(cell) {
        const n = parseInt(cell);
        if (isNaN(n) || n < 1 || n > 90) throw new Error('Invalid cell number');

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

    async dispense({cell = 1} = {}) {
        cell = this.#validateCell(cell);
        const code = this.#serialLockerGetStatusCellCmd(cell);
        return await this.internalDispense(code);
    }

    async enable({cell = 1} = {}) {
        cell = this.#validateCell(cell);
        const [column, row] = this.parseCellToColumnRow(cell);
        const code = this.#serialLockerGetConfigureCellCmd({enable: true, column, row});
        await this.appendToQueue(code, 'activate');
    }

    async disable({cell = 1} = {}) {
        cell = this.#validateCell(cell);
        const [column, row] = this.parseCellToColumnRow(cell);
        const code = this.#serialLockerGetConfigureCellCmd({enable: false, column, row});
        await this.appendToQueue(code, 'disable');
    }

    async openAll() {
        if (this.isDispensing) throw new Error('Another dispensing process is running');

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

}