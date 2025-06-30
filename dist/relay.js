import { K as o, w as i } from "./kernel-DAtdBEi3.js";
import { e as a } from "./relay-CsdB0FSa.js";
import { h as s } from "./webserial-core-BjytHor1.js";
class p extends o {
  constructor({ filters: t = null, config_port: e = null, no_device: n = 1 } = {}) {
    if (super({ filters: t, config_port: e, no_device: n }), this.__internal__.device.type = "relay", this.__internal__.auto_response = !0, s.getCustom(this.typeDevice, n))
      throw new Error(`Device ${this.typeDevice} ${n} already exists`);
    s.add(this);
  }
  serialMessage(t) {
    const e = {
      code: t,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    switch (t[1].toString()) {
      case "dd":
        e.name = "Connection with the serial device completed.", e.description = "Your connection with the serial device was successfully completed.", e.request = "connect", e.no_code = 100;
        break;
      case "de":
        break;
      default:
        e.name = "Unrecognized response", e.description = "The response of application was received, but dont identify with any of current parameters", e.request = "undefined", e.no_code = 400;
        break;
    }
    this.dispatch("serial:message", e);
  }
  serialRelaySumHex(t) {
    let e = 0;
    return t.forEach((n, r) => {
      r !== 3 && (e += n);
    }), e;
  }
  serialSetConnectionConstant(t = 1) {
    return a.connection(t);
  }
  async turnOn() {
    const t = a.activate();
    await this.appendToQueue(t, "relay:turn-on");
  }
  async turnOff() {
    const t = a.deactivate();
    await this.appendToQueue(t, "relay:turn-off");
  }
  async toggle({ inverse: t = !1, ms: e = 300 } = {}) {
    if (!t) {
      await this.turnOn(), await i(e), await this.turnOff();
      return;
    }
    await this.turnOff(), await i(e), await this.turnOn();
  }
}
export {
  p as Relay
};
