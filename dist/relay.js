import { K as o, w as s } from "./kernel-Dk_J4ThU.js";
import { e as a } from "./relay-CsdB0FSa.js";
import { h as i } from "./webserial-core-BjytHor1.js";
class h extends o {
  constructor({ filters: t = null, config_port: e = null, no_device: n = 1 } = {}) {
    if (super({ filters: t, config_port: e, no_device: n }), this.__internal__.device.type = "relay", this.__internal__.auto_response = !1, i.getCustom(this.typeDevice, n))
      throw new Error(`Device ${this.typeDevice} ${n} already exists`);
    i.add(this);
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
      await this.turnOn(), await s(e), await this.turnOff();
      return;
    }
    await this.turnOff(), await s(e), await this.turnOn();
  }
}
export {
  h as Relay
};
