import { K as o, D as a, w as i } from "./kernel-BnWXOCde.js";
import { e as n } from "./relay-DP8PLsDP.js";
class f extends o {
  constructor({ filters: t = null, config_port: e, no_device: s = 1, socket: r = !1 } = {}) {
    if (super({ filters: t, config_port: e, no_device: s, socket: r }), this.__internal__.device.type = "relay", this.__internal__.auto_response = !1, this.__internal__.serial.auto_response = [2, 6, 221, 221, 240, 207, 3], a.getCustom(this.typeDevice, s))
      throw new Error(`Device ${this.typeDevice} ${s} already exists`);
    a.add(this);
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
  serialSetConnectionConstant(t = 1) {
    return n.connection(t);
  }
  async turnOn() {
    const t = n.activate();
    await this.appendToQueue(t, "relay:turn-on");
  }
  async turnOff() {
    const t = n.deactivate();
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
