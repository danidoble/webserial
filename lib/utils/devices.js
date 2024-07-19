export class Devices {
    static devices = {
        relay: [],
        locker: [],
        jofemar: [],
        boardroid: [],
    };

    static typeError(type) {
        const error = new Error();
        error.message = `Type ${type} is not supported`;
        error.name = 'DeviceTypeError';
        throw error;
    }

    static add(device) {
        const type = device.typeDevice;
        const id = device.uuid;

        if (typeof Devices.devices[type] === 'undefined') return Devices.typeError(type);

        if (Devices.devices[type][id]) return;

        Devices.devices[type][id] = device;


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

    static getAll(type = null) {
        if (type === null) return Devices.devices;

        if (typeof Devices.devices[type] === 'undefined') return Devices.typeError(type);

        return Devices.devices[type];
    }


    static getJofemar(device_number = 1) {
        return Devices.devices.jofemar.find((device) => device.deviceNumber === device_number);
    }

    static getBoardroid(device_number = 1) {
        return Devices.devices.boardroid.find((device) => device.deviceNumber === device_number);
    }

    static getLocker(device_number = 1) {
        return Devices.devices.locker.find((device) => device.deviceNumber === device_number);
    }

    static getRelay(device_number = 1) {
        return Devices.devices.relay.find((device) => device.deviceNumber === device_number);
    }
}
