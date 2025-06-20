var w = (a) => {
  throw TypeError(a);
};
var m = (a, c, e) => c.has(a) || w("Cannot " + e);
var r = (a, c, e) => (m(a, c, "read from private field"), e ? e.call(a) : c.get(a)), u = (a, c, e) => c.has(a) ? w("Cannot add the same private member more than once") : c instanceof WeakSet ? c.add(a) : c.set(a, e), i = (a, c, e, s) => (m(a, c, "write to private field"), s ? s.call(a, e) : c.set(a, e), e), l = (a, c, e) => (m(a, c, "access private method"), e);
import { K as k, h as v } from "./kernel-BLbpgXHp.js";
import { u as p } from "./relay-Dop4mFk-.js";
var h, n, o, t, y, d, f, g, b;
class x extends k {
  constructor({ filters: e = null, config_port: s = null, no_device: _ = 1, device_listen_on_port: C = 3 } = {}) {
    super({ filters: e, config_port: s, no_device: _, device_listen_on_port: C });
    u(this, t);
    u(this, h, !1);
    u(this, n, 0);
    u(this, o, 0);
    if (this.__internal__.device.type = "locker", v.getCustom(this.typeDevice, _))
      throw new Error(`Device ${this.typeDevice} ${_} already exists`);
    this.__internal__.device.milliseconds = 666, this.__internal__.dispense.limit_counter = 1, v.add(this), l(this, t, y).call(this);
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
            s.name = "Cell closed.", s.description = "The selected cell is closed.", s.request = "dispense", s.no_code = 1102, this.__internal__.dispense.status = !1, this.dispatch("dispensed", {}), r(this, h) && r(this, n) >= 89 ? (s.finished_test = !0, i(this, h, !1), i(this, n, 0)) : r(this, h) && (s.finished_test = !1);
            break;
          case "01":
          // cell open by status
          case "04":
            s.name = "Cell open.", s.description = "The selected cell was open successfully.", s.request = "dispense", s.no_code = 102, this.__internal__.dispense.status = !0, this.dispatch("dispensed", {}), r(this, h) && r(this, n) >= 89 ? (s.finished_test = !0, i(this, h, !1), i(this, n, 0)) : r(this, h) && (s.finished_test = !1);
            break;
          case "05":
            s.name = "Cell inactive.", s.description = "The selected cell is inactive or doesn't exist.", s.request = "dispense", s.no_code = 101, this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", {}), r(this, h) && r(this, n) >= 89 ? (s.finished_test = !0, i(this, h, !1), i(this, n, 0)) : r(this, h) && (s.finished_test = !1);
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
  async dispense({ cell: e = 1 } = {}) {
    return await this.internalDispense(
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
    l(this, t, d).call(this), i(this, h, !0), l(this, t, f).call(this);
    const e = [];
    for (let s = 1; s <= 90; s++) {
      const _ = await this.dispense(s);
      e.push(_), i(this, n, s), l(this, t, f).call(this);
    }
    i(this, n, 90), l(this, t, f).call(this, e), l(this, t, d).call(this);
  }
  async enableAll() {
    l(this, t, d).call(this), i(this, h, !0), l(this, t, g).call(this);
    for (let e = 1; e <= 90; e++)
      await this.enable(e), i(this, n, e), l(this, t, g).call(this);
    i(this, n, 90), l(this, t, g).call(this), l(this, t, d).call(this);
  }
  async disableAll() {
    l(this, t, d).call(this), i(this, h, !0), l(this, t, b).call(this);
    for (let e = 1; e <= 90; e++)
      await this.enable(e), i(this, n, e), l(this, t, b).call(this);
    i(this, n, 90), l(this, t, b).call(this), l(this, t, d).call(this);
  }
}
h = new WeakMap(), n = new WeakMap(), o = new WeakMap(), t = new WeakSet(), y = function() {
  const e = ["percentage:disable", "percentage:enable", "percentage:open"];
  for (const s of e)
    this.serialRegisterAvailableListener(s);
}, d = function() {
  i(this, h, !1), i(this, n, 0), i(this, o, 0);
}, f = function(e = null) {
  i(this, o, Math.round(r(this, n) * 100 / 90)), this.dispatch("percentage:open", { percentage: r(this, o), dispensed: e });
}, g = function() {
  i(this, o, Math.round(r(this, n) * 100 / 90)), this.dispatch("percentage:enable", { percentage: r(this, o) });
}, b = function() {
  i(this, o, Math.round(r(this, n) * 100 / 90)), this.dispatch("percentage:disable", { percentage: r(this, o) });
};
export {
  x as Locker
};
