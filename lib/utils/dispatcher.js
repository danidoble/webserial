export class Dispatcher extends EventTarget {
  __listeners__ = {};

  dispatch(type, data = null) {
    const event = new SerialEvent(type, { detail: data });
    this.dispatchEvent(event);
  }

  dispatchAsync(type, data = null, ms = 100) {
    const this1 = this;
    setTimeout(() => {
      this1.dispatch(type, data);
    }, ms);
  }

  on(type, callback) {
    if (typeof this.__listeners__[type] !== 'undefined' && this.__listeners__[type] === false) {
      this.__listeners__[type] = true;
    }

    this.addEventListener(type, callback);
  }

  off(type, callback) {
    this.removeEventListener(type, callback);
  }

  serialRegisterAvailableListener(type) {
    if (this.__listeners__[type]) return;

    this.__listeners__[type] = false;
  }

  get availableListeners() {
    const keys = Object.keys(this.__listeners__).sort();
    return keys.map((type) => {
      return {
        type,
        listening: this.__listeners__[type],
      };
    });
  }
}

export class SerialEvent extends CustomEvent {
  constructor(type, detail) {
    super(type, detail);
  }
}
