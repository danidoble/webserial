export class Dispatcher extends EventTarget {
  __listeners__: Record<string, boolean> = {};
  __debug__: boolean = false;

  dispatch(type: string, data?: any): void {
    const event = new SerialEvent(type, { detail: data });
    this.dispatchEvent(event);
    if (this.__debug__) {
      this.dispatchEvent(new SerialEvent('debug', { detail: { type, data } }));
    }
  }

  dispatchAsync(type: string, data?: any, ms: number = 100): void {
    setTimeout(() => {
      this.dispatch(type, data);
    }, ms);
  }

  on(type: string, callback: EventListener): void {
    if (typeof this.__listeners__[type] !== 'undefined' && this.__listeners__[type] === false) {
      this.__listeners__[type] = true;
    }

    this.addEventListener(type, callback);
  }

  off(type: string, callback: EventListener): void {
    this.removeEventListener(type, callback);
  }

  serialRegisterAvailableListener(type: string): void {
    if (this.__listeners__[type]) return;

    this.__listeners__[type] = false;
  }

  get availableListeners(): { type: string; listening: boolean }[] {
    const keys = Object.keys(this.__listeners__).sort();
    return keys.map((type) => {
      return {
        type,
        listening: this.__listeners__[type],
      };
    });
  }
}

export class SerialEvent extends CustomEvent<any> {
  constructor(type: string, detail: CustomEventInit) {
    super(type, detail);
  }
}
