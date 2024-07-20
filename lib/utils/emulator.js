"use strict";

import {Core} from "../serial/core.js";

export class Emulator {
    static enable = false;
    static instance = null;
    static #_device_type = null;
    static #_device_number = 1;

    static #check() {
        if (Emulator.enable === false) throw new Error(`Emulator is disabled`);

        return Emulator.enable;
    }

    static #type(instance) {
        if (typeof instance !== 'object' || !(instance instanceof Core)) throw new Error(`Type ${instance.typeDevice} is not supported`);

        Emulator.instance = instance;
        Emulator.#_device_type = instance.typeDevice;
        Emulator.#_device_number = instance.deviceNumber;
        return true;
    }

    static #checkInstance(instance = null) {
        if (!Emulator.#check()) return false;

        if (instance === null && Emulator.instance === null) return false;

        if (Emulator.instance === null) {
            Emulator.#type(instance);
        }
        return true;
    }

    static #lockerOnly() {
        if (Emulator.#_device_type !== 'locker') throw new Error(`This function is only available for Locker devices`);

        return true;
    }

    static #boardroidOnly() {
        if (Emulator.#_device_type !== 'boardroid') throw new Error(`This function is only available for Boardroid devices`);

        return true;
    }

    static #jofemarOnly() {
        if (Emulator.#_device_type !== 'boardroid') throw new Error(`This function is only available for Jofemar devices`);

        return true;
    }

    static #withoutLocker() {
        if (Emulator.#_device_type === 'locker') throw new Error(`This function is not available for Locker devices`);

        return true;
    }

    static #withoutBoardroid() {
        if (Emulator.#_device_type === 'boardroid') throw new Error(`This function is not available for Boardroid devices`);

        return true;
    }

    static #withoutJofemar() {
        if (Emulator.#_device_type === 'jofemar') throw new Error(`This function is not available for Jofemar devices`);

        return true;
    }

    static #emulate(code) {
        Emulator.instance.__emulate({code});
    }

    static status(instance = null) {
        if (!Emulator.#checkInstance(instance)) return false;

        let code = [];
        switch (Emulator.#_device_type) {
            case 'locker':
                code = ['0', '8'];
                break;
            case 'boardroid':
                code = ['2', ((5 + Emulator.#_device_number).toString(16).toUpperCase())]; // 02 06 00 00 00 00 00 00 00 00 00 00 03 09
                break;
            case 'jofemar':
                code = ['6'];
                break;
            default:
                return false;
        }

        Emulator.#emulate(code);
    }

    static dispensed(instance = null) {
        if (!Emulator.#checkInstance(instance)) return false;

        let code = [];
        switch (Emulator.#_device_type) {
            case 'locker':
                code = ['0', '7', '4', '4', '4'];
                break;
            case 'boardroid':
                code = ['2', 'D7', 'A', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'F2'];
                break;
            case 'jofemar':
                code = ['6', '30'];
                break;
            default:
                return false;
        }

        Emulator.#emulate(code);
    }

    static notDispensed(instance = null) {
        if (!Emulator.#checkInstance(instance)) return false;

        let code = [];
        switch (Emulator.#_device_type) {
            case 'locker':
                code = ['0', '7', '5', '5', '5'];
                break;
            case 'boardroid':
                code = ['2', 'D7', 'A', '0', '0', '1', '0', '0', '0', '0', '0', '0', 'F2'];
                break;
            case 'jofemar':
                code = ['6', '34'];
                break;
            default:
                return false;
        }

        Emulator.#emulate(code);
    }

    static gateInactive(instance = null) {
        if (!Emulator.#checkInstance(instance)) return false;

        if (!this.#lockerOnly()) return false;

        this.#emulate(['0', '7', '5', '5', '5']);
    }

    static gateConfigured(instance = null) {
        if (!Emulator.#checkInstance(instance)) return false;

        if (!this.#lockerOnly()) return false;

        this.#emulate(['0', '6']);
    }

    static keyPressed(instance = null) {
        if (!Emulator.#checkInstance(instance)) return false;
        if (!Emulator.#jofemarOnly()) return false;
        const code = ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '2A', '23', '41', '42', '43', '44'];
        const machine = (128 + Emulator.#_device_number).toString(16);
        const random = Math.floor(Math.random() * 15);
        Emulator.#emulate(['2', machine, '54', code[random]]);
    }

    static doorOpened(instance = null) {
        if (!Emulator.#checkInstance(instance) || !this.#withoutLocker()) return false;
        let code = [];
        const machine = (128 + Emulator.#_device_number).toString(16);
        switch (Emulator.#_device_type) {
            case "boardroid":
                code = ['2', 'D8', 'dc'];
                break;
            case "jofemar":
                code = ['2', machine, '50', '4F'];
                break;
        }
        Emulator.#emulate(code);
    }

    static doorClosed(instance = null) {
        if (!Emulator.#checkInstance(instance) || !this.#withoutLocker()) return false;
        let code = [];
        const machine = (128 + Emulator.#_device_number).toString(16);
        switch (Emulator.#_device_type) {
            case "boardroid":
                code = ['2', 'D8', 'db'];
                break;
            case "jofemar":
                code = ['2', machine, '50', '43'];
                break;
        }
        Emulator.#emulate(code);
    }

    static channelDisconnected(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        const machine = (128 + Emulator.#_device_number).toString(16);
        Emulator.#emulate(['2', machine, '43', '43', '43', 'FD']);
    }

    static channelConnected(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        const machine = (128 + Emulator.#_device_number).toString(16);
        Emulator.#emulate(['2', machine, '43', '43', '43', 'FC']);
    }

    static channelEmpty(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        const machine = (128 + Emulator.#_device_number).toString(16);
        Emulator.#emulate(['2', machine, '43', '43', '43', 'FF']);
    }

    static workingTemperature(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        const machine = (128 + Emulator.#_device_number).toString(16);
        Emulator.#emulate(['2', machine, '43', '54', '16']);
    }

    static currentTemperature(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#withoutLocker()) return false;

        let code = [];
        const machine = (128 + Emulator.#_device_number).toString(16);

        switch (Emulator.#_device_type) {
            case "boardroid":
                code = ['2', 'D9', '44', '30'];
                break;
            case "jofemar":
                code = ['2', machine, '43', '74', '2B', '30', '39', '2E', '31', '7F', '43'];
                break;
        }

        Emulator.#emulate(code);
    }

    static ready(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '30']);
    }

    static busy(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '31']);
    }

    static invalidTray(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '32']);
    }

    static invalidChannel(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '33']);
    }

    static emptyChannel(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '34']);
    }

    static elevatorJam(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '35']);
    }

    static elevatorMalfunction(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '36']);
    }

    static phototransistorFailure(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '37']);
    }

    static allChannelsEmpty(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '38']);
    }

    static productDetectorFailure(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '39']);
    }

    static displayDisconnected(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '41']);
    }

    static productUnderElevator(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '42']);
    }

    static elevatorSettingAlarm(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '43']);
    }

    static buttonPanelFailure(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '44']);
    }

    static errorWritingEeprom(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '45']);
    }

    static errorControlTemperature(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '46']);
    }

    static thermometerDisconnected(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '47']);
    }

    static thermometerMisconfigured(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '48']);
    }

    static thermometerFailure(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '49']);
    }

    static errorExtractorConsumption(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '4A']);
    }

    static channelSearchError(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '4B']);
    }

    static productExitMouthSearchError(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '4C']);
    }

    static elevatorInteriorLocked(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '4D']);
    }

    static productDetectorVerifierError(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '4E']);
    }

    static waitingForProductRecall(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '4F']);
    }

    static productExpiredByTemperature(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '50']);
    }

    static faultyAutomaticDoor(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '51']);
    }

    static rejectLever(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'A0', '1']);
    }

    static resetCoinPurse(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'A0', '2']);
    }

    static #coinInserted(code, coin = null) {
        let num = code[Math.floor(Math.random() * 5)];
        if (coin !== null && !isNaN(parseFloat(coin))) {
            switch (coin.toString()) {
                case '0.5':
                    num = code[1];
                    break;
                case '1':
                    num = code[2];
                    break;
                case '2':
                    num = code[3];
                    break;
                case '5':
                    num = code[4];
                    break;
                case '10':
                    num = code[5];
                    break;
            }
        }
        return num;
    }

    static coinInsertedBox(instance = null, coin = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        const code = ['40', '41', '42', '43', '44', '45'];
        const num = Emulator.#coinInserted(code, coin);
        Emulator.#emulate(['2', 'A0', num]);
    }

    static coinInsertedTube(instance = null, coin = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        const code = ['50', '51', '52', '53', '54', '55'];
        const num = Emulator.#coinInserted(code, coin);
        Emulator.#emulate(['2', 'A0', num]);
    }

    static #banknoteInserted(code, banknote = null) {
        let num = code[Math.floor(Math.random() * 4)];
        if (banknote !== null && !isNaN(parseFloat(banknote))) {
            switch (banknote.toString()) {
                case '20':
                    num = code[0];
                    break;
                case '50':
                    num = code[1];
                    break;
                case '100':
                    num = code[2];
                    break;
                case '200':
                    num = code[3];
                    break;
                case '500':
                    num = code[4];
                    break;
            }
        }
        return num;
    }

    static banknoteInsertedStacker(instance = null, banknote = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        const code = ['80', '81', '82', '83', '84'];
        const num = Emulator.#banknoteInserted(code, banknote);
        Emulator.#emulate(['2', 'B0', num]);
    }

    static banknoteInsertedEscrow(instance = null, banknote = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        const code = ['90', '91', '92', '93', '94'];
        const num = Emulator.#banknoteInserted(code, banknote);
        Emulator.#emulate(['2', 'B0', num]);
    }

    static banknoteEjected(instance = null, banknote = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        const code = ['A0', 'A1', 'A2', 'A3', 'A4'];
        const num = Emulator.#banknoteInserted(code, banknote);
        Emulator.#emulate(['2', 'B0', num]);
    }

    static banknoteInsertedRecycler(instance = null, banknote = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        const code = ['B0', 'B1', 'B2', 'B3', 'B4'];
        const num = Emulator.#banknoteInserted(code, banknote);
        Emulator.#emulate(['2', 'B0', num]);
    }

    static banknoteTaken(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'B0', '2a']);
    }

    static coinPurseEnabled(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'D0', '1']);
    }

    static coinPurseDisabled(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'D0', '0']);
    }

    static billPurseDisabled(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'D1', '0', '0']);
    }

    static billPurseEnabled(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'D1', '1', '1']);
    }

    static readTubes(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        const code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1a', '1b', '1c', '1d', '1e', '1f'];
        const [r1, r2, r3, r4, r5, r6] = [
            code[Math.floor(Math.random() * 30)],
            code[Math.floor(Math.random() * 30)],
            code[Math.floor(Math.random() * 30)],
            code[Math.floor(Math.random() * 30)],
            code[Math.floor(Math.random() * 30)],
            code[Math.floor(Math.random() * 30)]
        ];

        Emulator.#emulate(['2', 'D2', r1, r2, r3, r4, r5, r6]);
    }

    static readBillPurse(instance = null, bill = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        let code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1a', '1b', '1c'];

        if (instance._recycler.ict) {
            const random = code[Math.floor(Math.random() * 31)];
            let pos0 = "0", pos1 = "0", pos2 = "0", pos3 = "0", pos4 = "0";
            if (bill !== null && !isNaN(parseInt(bill))) {
                switch (bill.toString()) {
                    case '20':
                        pos0 = random;
                        break;
                    case '50':
                        pos1 = random;
                        break;
                    case '100':
                        pos2 = random;
                        break;
                    case '200':
                        pos3 = random;
                        break;
                    case '500':
                        pos4 = random;
                        break;
                }
            } else {
                switch (instance._recycler.bill) {
                    case 0:// 20$
                        pos0 = random;
                        break;
                    case 1:// 50$
                        pos1 = random;
                        break;
                    case 2:// 100$
                        pos2 = random;
                        break;
                    case 3:// 200$
                        pos3 = random;
                        break;
                    case 4:// 500$
                        pos4 = random;
                        break;
                }
            }
            Emulator.#emulate(['2', 'D3', pos0, pos1, pos2, pos3, pos4, "0"]);
        } else {
            const [r1, r2, r3, r4, r5, r6] = [
                code[Math.floor(Math.random() * 30)],
                code[Math.floor(Math.random() * 30)],
                code[Math.floor(Math.random() * 30)],
                code[Math.floor(Math.random() * 2)],
                code[Math.floor(Math.random())],
                code[Math.floor(Math.random())]
            ];
            Emulator.#emulate(['2', 'D3', r1, r2, r3, r4, r5, r6]);
        }
    }

    static banknoteAccepted(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'D4', '1']);
    }

    static banknoteRejected(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'D4', '0']);
    }

    static banknotesDispensed(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        let code = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '1a', '1b', '1c'];
        if (instance._recycler.ict) {
            const random = code[Math.floor(Math.random() * 30)];
            let pos0 = "0", pos1 = "0", pos2 = "0", pos3 = "0", pos4 = "0";
            switch (instance._recycler.bill) {
                case 0:// 20$
                    pos0 = random;
                    break;
                case 1:// 50$
                    pos1 = random;
                    break;
                case 2:// 100$
                    pos2 = random;
                    break;
                case 3:// 200$
                    pos3 = random;
                    break;
                case 4:// 500$
                    pos4 = random;
                    break;
            }
            Emulator.#emulate(['2', 'D5', pos0, pos1, pos2, pos3, pos4, "0"]);
        } else {
            const [r1, r2, r3, r4, r5, r6] = [
                code[Math.floor(Math.random() * 30)],
                code[Math.floor(Math.random() * 30)],
                code[Math.floor(Math.random() * 30)],
                code[Math.floor(Math.random() * 2)],
                code[Math.floor(Math.random())],
                code[Math.floor(Math.random())]
            ];
            Emulator.#emulate(['2', 'D5', r1, r2, r3, r4, r5, r6]);
        }
    }

    static coinsDispensed(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'D6'])
    }

    static relayOn(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DA', '1']);
    }

    static relayOff(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DA', '0']);
    }

    static nayaxEnabled(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DD', '1']);
    }

    static nayaxDisabled(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DD', '0']);
    }

    static nayaxPreCreditAuthorized(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DD', '3']);
    }

    static nayaxCancelRequest(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DD', '4']);
    }

    static nayaxSellApproved(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DD', '5']);
    }

    static nayaxSellDenied(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DD', '6']);
    }

    static nayaxEndSession(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DD', '7']);
    }

    static nayaxCancelled(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DD', '8']);
    }

    static nayaxDispensed(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DD', 'A', '0']);
    }

    static nayaxNotDispensed(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#boardroidOnly()) return false;

        Emulator.#emulate(['2', 'DD', 'A', '1']);
    }

    static fullTray(instance = null) {
        if (!Emulator.#checkInstance(instance) || !Emulator.#jofemarOnly()) return false;

        Emulator.#emulate(['6', '4F']);
    }
}
