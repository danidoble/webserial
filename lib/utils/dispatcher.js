export class Dispatcher extends EventTarget {
    dispatch(type, data = null) {
        const event = new SerialEvent(type, {detail: data})
        this.dispatchEvent(event);
    }

    on(type, callback) {
        this.addEventListener(type, callback);
    }
}

export class SerialEvent extends CustomEvent {
    constructor(type, detail) {
        super(type, detail);
    }
}