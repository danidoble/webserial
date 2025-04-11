var L = (l) => {
  throw TypeError(l);
};
var b = (l, d, e) => d.has(l) || L("Cannot " + e);
var h = (l, d, e) => (b(l, d, "read from private field"), e ? e.call(l) : d.get(l)), m = (l, d, e) => d.has(l) ? L("Cannot add the same private member more than once") : d instanceof WeakSet ? d.add(l) : d.set(l, e), r = (l, d, e, t) => (b(l, d, "write to private field"), t ? t.call(l, e) : d.set(l, e), e), n = (l, d, e) => (b(l, d, "access private method"), e);
import { K as I, c as x } from "./kernel-B15wfB2x.js";
var c, o, p, i, A, T, E, M, k, H, _, f, g, w, C;
class G extends I {
  constructor({ filters: e = null, config_port: t = null, no_device: s = 1, device_listen_on_port: a = 3 } = {}) {
    super({ filters: e, config_port: t, no_device: s, device_listen_on_port: a });
    m(this, i);
    m(this, c, !1);
    m(this, o, 0);
    m(this, p, 0);
    if (this.__internal__.device.type = "locker", x.getCustom(this.typeDevice, s))
      throw new Error(`Device ${this.typeDevice} ${s} already exists`);
    this.__internal__.device.milliseconds = 666, this.__internal__.dispense.limit_counter = 1, n(this, i, T).call(this), n(this, i, A).call(this);
  }
  serialMessage(e) {
    const t = {
      code: e,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    switch (e[1]) {
      case "08":
        t.name = "Connection with the serial device completed.", t.description = "Your connection with the serial device was successfully completed.", t.request = "connect", t.no_code = 100;
        break;
      case "07":
        switch (e[4]) {
          case "00":
            t.name = "Cell closed.", t.description = "The selected cell is closed.", t.request = "dispense", t.no_code = 1102, this.__internal__.dispense.status = !1, this.dispatch("dispensed", {}), h(this, c) && h(this, o) >= 89 ? (t.finished_test = !0, r(this, c, !1), r(this, o, 0)) : h(this, c) && (t.finished_test = !1);
            break;
          case "01":
          // cell open by status
          case "04":
            t.name = "Cell open.", t.description = "The selected cell was open successfully.", t.request = "dispense", t.no_code = 102, this.__internal__.dispense.status = !0, this.dispatch("dispensed", {}), h(this, c) && h(this, o) >= 89 ? (t.finished_test = !0, r(this, c, !1), r(this, o, 0)) : h(this, c) && (t.finished_test = !1);
            break;
          case "05":
            t.name = "Cell inactive.", t.description = "The selected cell is inactive or doesn't exist.", t.request = "dispense", t.no_code = 101, this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", {}), h(this, c) && h(this, o) >= 89 ? (t.finished_test = !0, r(this, c, !1), r(this, o, 0)) : h(this, c) && (t.finished_test = !1);
            break;
        }
        break;
      case "06":
        t.name = "Configuration applied.", t.description = "The configuration was successfully applied.", t.request = "configure cell", t.no_code = 103;
        break;
      default:
        t.request = "undefined", t.name = "Response unrecognized", t.description = "The response of application was received, but dont identify with any of current parameters", t.no_code = 400;
        break;
    }
    this.dispatch("serial:message", t);
  }
  serialSetConnectionConstant(e = 3) {
    return this.add0x(this.serialLockerGetConnectionCmd(e));
  }
  serialLockerCmdMaker(e) {
    const t = this.__internal__.device.milliseconds;
    let s = null;
    try {
      s = new Uint8Array(e.length + 8), s.set(e, 2), s[0] = 2, s[1] = e.length + 4, s[s.length - 2] = 3;
      let a = 0;
      for (let u = 1; u < e.length; u++)
        a += e[u], a *= parseInt(Math.pow(2, u - 1).toString());
      s[e.length + 2] = a % 256, s[e.length + 3] = t * 3 % 256, s[e.length + 4] = t * 8 % 256;
      let v = 0;
      for (let u = 3; u < e.length + 5; u++)
        v += s[u];
      s[e.length + 5] = v % 256;
      let y = 0;
      for (let u = 0; u < s.length - 1; u++)
        y ^= s[u];
      s[s.length - 1] = y;
    } catch (a) {
      this.serialErrors(`Error generating command: ${a.message}`), s = null;
    }
    return s;
  }
  serialLockerHexCmd(e) {
    const t = this.serialLockerCmdMaker(e), s = [];
    for (let a = 0; a < t.length; a++)
      s.push(this.decToHex(t[a]));
    return s;
  }
  serialLockerGetConnectionCmd(e = 3) {
    if (e < 1 || e > 255) throw new Error("Invalid port number");
    return this.serialLockerHexCmd(new Uint8Array([0, e]));
  }
  parseCellToColumnRow(e) {
    const t = Math.floor((e - 1) / 10) + 1;
    let s = e % 8;
    return s === 0 && (s = 8), [t, s];
  }
  async dispense({ cell: e = 1 } = {}) {
    e = n(this, i, _).call(this, e);
    const t = n(this, i, H).call(this, e);
    return await this.internalDispense(t);
  }
  async status({ cell: e = 1 } = {}) {
    e = n(this, i, _).call(this, e);
    const t = n(this, i, E).call(this, e);
    return await this.appendToQueue(t, "status");
  }
  async lightScan({ since: e = 0, until: t = 10 } = {}) {
    if (e < 0 || e > 10) throw new Error("Invalid since number");
    if (t < 0 || t > 10) throw new Error("Invalid until number");
    const s = n(this, i, M).call(this, e, t);
    return await this.appendToQueue(s, "light-scan");
  }
  async enable({ cell: e = 1 } = {}) {
    e = n(this, i, _).call(this, e);
    const [t, s] = this.parseCellToColumnRow(e), a = n(this, i, k).call(this, { enable: !0, column: t, row: s });
    await this.appendToQueue(a, "activate");
  }
  async disable({ cell: e = 1 } = {}) {
    e = n(this, i, _).call(this, e);
    const [t, s] = this.parseCellToColumnRow(e), a = n(this, i, k).call(this, { enable: !1, column: t, row: s });
    await this.appendToQueue(a, "disable");
  }
  async openAll() {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    n(this, i, f).call(this), r(this, c, !0), n(this, i, g).call(this);
    const e = [];
    for (let t = 1; t <= 90; t++) {
      const s = await this.dispense(t);
      e.push(s), r(this, o, t), n(this, i, g).call(this);
    }
    r(this, o, 90), n(this, i, g).call(this, e), n(this, i, f).call(this);
  }
  async enableAll() {
    n(this, i, f).call(this), r(this, c, !0), n(this, i, w).call(this);
    for (let e = 1; e <= 90; e++)
      await this.enable(e), r(this, o, e), n(this, i, w).call(this);
    r(this, o, 90), n(this, i, w).call(this), n(this, i, f).call(this);
  }
  async disableAll() {
    n(this, i, f).call(this), r(this, c, !0), n(this, i, C).call(this);
    for (let e = 1; e <= 90; e++)
      await this.enable(e), r(this, o, e), n(this, i, C).call(this);
    r(this, o, 90), n(this, i, C).call(this), n(this, i, f).call(this);
  }
}
c = new WeakMap(), o = new WeakMap(), p = new WeakMap(), i = new WeakSet(), A = function() {
  const e = ["percentage:disable", "percentage:enable", "percentage:open"];
  for (const t of e)
    this.serialRegisterAvailableListener(t);
}, T = function() {
  x.add(this);
}, E = function(e = 1) {
  return e = n(this, i, _).call(this, e), this.serialLockerHexCmd(new Uint8Array([16, this.__internal__.device.listen_on_port, e]));
}, M = function(e = 0, t = 10) {
  return this.serialLockerHexCmd(new Uint8Array([32, this.__internal__.device.listen_on_port, e, t]));
}, k = function({ enable: e = !0, column: t = 0, row: s = 10 } = {}) {
  if (t < 0 || t > 8) throw new Error("Invalid column number");
  if (s < 0 || s > 10) throw new Error("Invalid row number");
  let a = 1;
  return e || (a = 0), this.serialLockerHexCmd(new Uint8Array([48, this.__internal__.device.listen_on_port, t, s, a]));
}, H = function(e = 1) {
  e = n(this, i, _).call(this, e);
  const t = this.__internal__.device.milliseconds, s = t % 256, a = Math.floor(t / 3) % 256;
  return this.serialLockerHexCmd(
    new Uint8Array([64, this.__internal__.device.listen_on_port, e, s, a])
  );
}, _ = function(e) {
  const t = parseInt(e);
  if (isNaN(t) || t < 1 || t > 90) throw new Error("Invalid cell number");
  return t;
}, f = function() {
  r(this, c, !1), r(this, o, 0), r(this, p, 0);
}, g = function(e = null) {
  r(this, p, Math.round(h(this, o) * 100 / 90)), this.dispatch("percentage:open", { percentage: h(this, p), dispensed: e });
}, w = function() {
  r(this, p, Math.round(h(this, o) * 100 / 90)), this.dispatch("percentage:enable", { percentage: h(this, p) });
}, C = function() {
  r(this, p, Math.round(h(this, o) * 100 / 90)), this.dispatch("percentage:disable", { percentage: h(this, p) });
};
export {
  G as Locker
};
