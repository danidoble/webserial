import { K as o, w as i } from "./kernel-CXM5xoJD.js";
import { e as s } from "./relay-DP8PLsDP.js";
import { a as r } from "./webserial-core-D3luFguv.js";
class d extends o {
  constructor({ filters: t = null, config_port: e = null, no_device: n = 1, socket: a = !1 } = {}) {
    if (super({ filters: t, config_port: e, no_device: n, socket: a }), this.__internal__.device.type = "relay", this.__internal__.auto_response = !1, this.__internal__.serial.auto_response = [2, 6, 221, 221, 240, 207, 3], r.getCustom(this.typeDevice, n))
      throw new Error(`Device ${this.typeDevice} ${n} already exists`);
    r.add(this);
  }
  serialMessage(t) {
    t = this.fixHexArray(t);
    const e = {
      code: t,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    t[0] === "a0" && t[2] == "00" ? (e.name = "Relay turned off", e.description = "The relay has been turned off successfully.", e.request = this.lastAction, e.no_code = 101) : t[0] === "a0" && t[2] == "01" ? (e.name = "Relay turned on", e.description = "The relay has been turned on successfully.", e.request = this.lastAction, e.no_code = 102) : (e.name = "Unrecognized response", e.description = "The response of application was received, but dont identify with any of current parameters", e.request = "undefined", e.no_code = 400), this.dispatch("serial:message", e);
  }
  serialRelaySumHex(t) {
    let e = 0;
    return t.forEach((n, a) => {
      a !== 3 && (e += n);
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
  d as Relay
};
