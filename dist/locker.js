var w = (l) => {
  throw TypeError(l);
};
var m = (l, c, e) => c.has(l) || w("Cannot " + e);
var r = (l, c, e) => (m(l, c, "read from private field"), e ? e.call(l) : c.get(l)), u = (l, c, e) => c.has(l) ? w("Cannot add the same private member more than once") : c instanceof WeakSet ? c.add(l) : c.set(l, e), i = (l, c, e, s) => (m(l, c, "write to private field"), s ? s.call(l, e) : c.set(l, e), e), n = (l, c, e) => (m(l, c, "access private method"), e);
import { K as A, h as v } from "./kernel-BLbpgXHp.js";
import { u as p } from "./relay-Dop4mFk-.js";
var h, a, o, t, y, _, f, g, b, C, T;
class M extends A {
  constructor({ filters: e = null, config_port: s = null, no_device: d = 1, device_listen_on_port: k = 3 } = {}) {
    super({ filters: e, config_port: s, no_device: d, device_listen_on_port: k });
    u(this, t);
    u(this, h, !1);
    u(this, a, 0);
    u(this, o, 0);
    if (this.__internal__.device.type = "locker", v.getCustom(this.typeDevice, d))
      throw new Error(`Device ${this.typeDevice} ${d} already exists`);
    this.__internal__.time.response_engines = 1e3, this.__internal__.device.milliseconds = 666, this.__internal__.dispense.limit_counter = 1, v.add(this), n(this, t, y).call(this);
  }
  serialMessage(e) {
    const s = {
      code: e,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    switch (e[1]) {
      case "08":
        s.name = "Connection with the serial device completed.", s.description = "Your connection with the serial device was successfully completed.", s.request = "connect", s.no_code = 100;
        break;
      case "07":
        switch (e[4]) {
          case "00":
            s.name = "Cell closed.", s.description = "The selected cell is closed.", s.request = "dispense", s.no_code = 1102, this.__internal__.dispense.status = !1, this.dispatch("dispensed", {}), r(this, h) && r(this, a) >= 89 ? (s.finished_test = !0, i(this, h, !1), i(this, a, 0)) : r(this, h) && (s.finished_test = !1);
            break;
          case "01":
          // cell open by status
          case "04":
            s.name = "Cell open.", s.description = "The selected cell was open successfully.", s.request = "dispense", s.no_code = 102, this.__internal__.dispense.status = !0, this.dispatch("dispensed", {}), r(this, h) && r(this, a) >= 89 ? (s.finished_test = !0, i(this, h, !1), i(this, a, 0)) : r(this, h) && (s.finished_test = !1);
            break;
          case "05":
            s.name = "Cell inactive.", s.description = "The selected cell is inactive or doesn't exist.", s.request = "dispense", s.no_code = 101, this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", {}), r(this, h) && r(this, a) >= 89 ? (s.finished_test = !0, i(this, h, !1), i(this, a, 0)) : r(this, h) && (s.finished_test = !1);
            break;
        }
        break;
      case "06":
        s.name = "Configuration applied.", s.description = "The configuration was successfully applied.", s.request = "configure cell", s.no_code = 103;
        break;
      default:
        s.request = "undefined", s.name = "Response unrecognized", s.description = "The response of application was received, but dont identify with any of current parameters", s.no_code = 400;
        break;
    }
    this.dispatch("serial:message", s);
  }
  serialSetConnectionConstant(e = 3) {
    return p.connection({ channel: e });
  }
  async dispense({ cell: e = 1, status: s = !0 } = {}) {
    return setTimeout(() => {
      s === !0 ? n(this, t, C).call(this) : n(this, t, T).call(this);
    }, this.__internal__.time.response_engines / 2), await this.internalDispense(
      p.openCell({
        cell: e,
        channel: this.__internal__.device.listen_on_port
      })
    );
  }
  async status({ cell: e = 1 } = {}) {
    return await this.appendToQueue(
      p.statusCell({
        cell: e,
        channel: this.__internal__.device.listen_on_port
      }),
      "status"
    );
  }
  async lightScan({ since: e = 0, until: s = 10 } = {}) {
    return await this.appendToQueue(
      p.lightScan({
        channel: this.__internal__.device.listen_on_port,
        since: e,
        until: s
      }),
      "light-scan"
    );
  }
  async enable({ cell: e = 1 } = {}) {
    return await this.appendToQueue(
      p.enableCell({
        cell: e,
        channel: this.__internal__.device.listen_on_port
      }),
      "activate"
    );
  }
  async disable({ cell: e = 1 } = {}) {
    await this.appendToQueue(
      p.disableCell({
        cell: e,
        channel: this.__internal__.device.listen_on_port
      }),
      "disable"
    );
  }
  async openAll() {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    n(this, t, _).call(this), i(this, h, !0), n(this, t, f).call(this);
    const e = [];
    for (let s = 1; s <= 90; s++) {
      const d = await this.dispense({ cell: s, status: !0 });
      e.push(d), i(this, a, s), n(this, t, f).call(this);
    }
    i(this, a, 90), n(this, t, f).call(this, e), n(this, t, _).call(this);
  }
  async enableAll() {
    n(this, t, _).call(this), i(this, h, !0), n(this, t, g).call(this);
    for (let e = 1; e <= 90; e++)
      await this.enable(e), i(this, a, e), n(this, t, g).call(this);
    i(this, a, 90), n(this, t, g).call(this), n(this, t, _).call(this);
  }
  async disableAll() {
    n(this, t, _).call(this), i(this, h, !0), n(this, t, b).call(this);
    for (let e = 1; e <= 90; e++)
      await this.enable(e), i(this, a, e), n(this, t, b).call(this);
    i(this, a, 90), n(this, t, b).call(this), n(this, t, _).call(this);
  }
}
h = new WeakMap(), a = new WeakMap(), o = new WeakMap(), t = new WeakSet(), y = function() {
  const e = ["percentage:disable", "percentage:enable", "percentage:open"];
  for (const s of e)
    this.serialRegisterAvailableListener(s);
}, _ = function() {
  i(this, h, !1), i(this, a, 0), i(this, o, 0);
}, f = function(e = null) {
  i(this, o, Math.round(r(this, a) * 100 / 90)), this.dispatch("percentage:open", { percentage: r(this, o), dispensed: e });
}, g = function() {
  i(this, o, Math.round(r(this, a) * 100 / 90)), this.dispatch("percentage:enable", { percentage: r(this, o) });
}, b = function() {
  i(this, o, Math.round(r(this, a) * 100 / 90)), this.dispatch("percentage:disable", { percentage: r(this, o) });
}, C = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !0);
}, T = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !1);
};
export {
  M as Locker
};
