import { K as o, w as i } from "./kernel-505KqpPU.js";
import { e as s } from "./relay-CsdB0FSa.js";
import { a as r } from "./webserial-core-C0ZbaNYy.js";
class f extends o {
  constructor({ filters: t = null, config_port: e = null, no_device: a = 1, socket: n = !1 } = {}) {
    if (super({ filters: t, config_port: e, no_device: a, socket: n }), this.__internal__.device.type = "relay", this.__internal__.auto_response = !0, this.__internal__.serial.auto_response = [2, 6, 221, 221, 240, 207, 3], r.getCustom(this.typeDevice, a))
      throw new Error(`Device ${this.typeDevice} ${a} already exists`);
    r.add(this);
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
      // old status
      case "06":
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
    return t.forEach((a, n) => {
      n !== 3 && (e += a);
    }), e;
  }
  serialSetConnectionConstant(t = 1) {
    return s.connection(t);
  }
  async turnOn() {
    const t = s.activate();
    await this.appendToQueue(t, "relay:turn-on");
  }
  async turnOff() {
    const t = s.deactivate();
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
  f as Relay
};
