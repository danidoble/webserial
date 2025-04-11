var l = (a) => {
  throw TypeError(a);
};
var u = (a, s, e) => s.has(a) || l("Cannot " + e);
var o = (a, s, e) => (u(a, s, "read from private field"), e ? e.call(a) : s.get(a)), c = (a, s, e) => s.has(a) ? l("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(a) : s.set(a, e);
var d = (a, s, e) => (u(a, s, "access private method"), e);
import { K as y, c as h, w as p } from "./kernel-B15wfB2x.js";
var n, r, f;
class g extends y {
  constructor({ filters: e = null, config_port: t = null, no_device: i = 1 } = {}) {
    super({ filters: e, config_port: t, no_device: i });
    c(this, r);
    c(this, n, {
      activate: ["A0", "01", "01", "A2"],
      deactivate: ["A0", "01", "00", "A1"]
    });
    if (this.__internal__.device.type = "relay", this.__internal__.auto_response = !0, h.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    d(this, r, f).call(this);
  }
  serialMessage(e) {
    const t = {
      code: e,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    switch (e[1].toString()) {
      case "dd":
        t.name = "Connection with the serial device completed.", t.description = "Your connection with the serial device was successfully completed.", t.request = "connect", t.no_code = 100;
        break;
      case "de":
        break;
      default:
        t.name = "Unrecognized response", t.description = "The response of application was received, but dont identify with any of current parameters", t.request = "undefined", t.no_code = 400;
        break;
    }
    this.dispatch("serial:message", t);
  }
  serialRelaySumHex(e) {
    let t = 0;
    return e.forEach((i, w) => {
      w !== 3 && (t += parseInt(i, 16));
    }), t.toString(16).toUpperCase();
  }
  serialSetConnectionConstant(e = 1) {
    const t = ["A0", "01", "00", "A1"];
    return t[1] = this.hexMaker(this.decToHex(e.toString())), t[3] = this.serialRelaySumHex(t), this.add0x(t);
  }
  async turnOn() {
    const e = o(this, n).activate;
    e[3] = this.serialRelaySumHex(e), await this.appendToQueue(e, "relay:turn-on");
  }
  async turnOff() {
    const e = o(this, n).deactivate;
    e[3] = this.serialRelaySumHex(e), await this.appendToQueue(e, "relay:turn-off");
  }
  async toggle({ inverse: e = !1, ms: t = 300 } = {}) {
    const i = this;
    e ? (await i.turnOff(), await p(t), await i.turnOn()) : (await i.turnOn(), await p(t), await i.turnOff());
  }
}
n = new WeakMap(), r = new WeakSet(), f = function() {
  h.add(this);
};
export {
  g as Relay
};
