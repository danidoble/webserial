import {Dispatcher} from "./dispatcher.js";
import {instance} from "eslint-plugin-react/lib/util/lifecycleMethods.js";

export class Devices extends Dispatcher {

    static instance = null;
    static devices = {
        relay: [],
        locker: [],
        jofemar: [],
        boardroid: [],
        arduino: [],
    };

    static typeError(type) {
        const error = new Error();
        error.message = `Type ${type} is not supported`;
        error.name = 'DeviceTypeError';
        throw error;
    }

    static addCustom(type, device) {
        if (typeof Devices.devices[type] === 'undefined') {
            Devices.devices[type] = [];
        }
        Devices.add(device);
    }

    static add(device) {
        const type = device.typeDevice;
        const id = device.uuid;

        if (typeof Devices.devices[type] === 'undefined') return Devices.typeError(type);

        this.instance.dispatch('change', Devices.devices);

        if (Devices.devices[type][id]) return;

        Devices.devices[type][id] = device;

        this.instance.dispatch('change', Devices.devices);
        return Devices.devices[type].indexOf(device);
    }

    static get(type, id) {
        if (typeof Devices.devices[type] === 'undefined') return Devices.typeError(type);

        return Devices.devices[type][id];
    }

    static getJofemarByUuid(id) {
        return Devices.get('jofemar', id);
    }

    static getLockerByUuid(id) {
        return Devices.get('locker', id);
    }

    static getRelayByUuid(id) {
        return Devices.get('relay', id);
    }

    static getBoardroidByUuid(id) {
        return Devices.get('boardroid', id);
    }
    static getArduinoByUuid(id) {
        return Devices.get('arduino', id);
    }

    static getAll(type = null) {
        if (type === null) return Devices.devices;

        if (typeof Devices.devices[type] === 'undefined') return Devices.typeError(type);

        return Devices.devices[type];
    }

    static getList(){
        // get all devices in list mode no matter the type
        // by some reason the array is empty so we need to use Object.values and map
        const devices = Object.values(Devices.devices);
        return devices.map((device) => {
            return Object.values(device);
        }).flat();
    }

    static getJofemar(device_number = 1) {
        const devices = Object.values(Devices.devices['jofemar']);
        return devices.find((device) => device.deviceNumber === device_number) ?? null;
    }

    static getBoardroid(device_number = 1) {
        const devices = Object.values(Devices.devices['boardroid']);
        return devices.find((device) => device.deviceNumber === device_number) ?? null;
    }

    static getLocker(device_number = 1) {
        const devices = Object.values(Devices.devices['locker']);
        return devices.find((device) => device.deviceNumber === device_number) ?? null;
    }

    static getRelay(device_number = 1) {
        const devices = Object.values(Devices.devices['relay']);
        return devices.find((device) => device.deviceNumber === device_number) ?? null;
    }

    static getArduino(device_number = 1) {
        const devices = Object.values(Devices.devices['arduino']);
        return devices.find((device) => device.deviceNumber === device_number) ?? null;
    }

    static getCustom(type, device_number = 1) {
        if (typeof Devices.devices[type] === 'undefined') return Devices.typeError(type);

        const devices = Object.values(Devices.devices[type]);
        return devices.find((device) => device.deviceNumber === device_number) ?? null;
    }
}

if (!Devices.instance) {
    Devices.instance = new Devices();
}
