var N = Object.defineProperty;
var w = (a) => {
  throw TypeError(a);
};
var R = (a, c, t) => c in a ? N(a, c, { enumerable: !0, configurable: !0, writable: !0, value: t }) : a[c] = t;
var y = (a, c, t) => R(a, typeof c != "symbol" ? c + "" : c, t), v = (a, c, t) => c.has(a) || w("Cannot " + t);
var E = (a, c, t) => c.has(a) ? w("Cannot add the same private member more than once") : c instanceof WeakSet ? c.add(a) : c.set(a, t);
var n = (a, c, t) => (v(a, c, "access private method"), t);
import { K as P, h as d } from "./webserial-core-DGKQCs5a.js";
var e, u, f, _, l, x, H, A, p;
class S extends P {
  constructor({
    filters: t = null,
    config_port: r = {
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      bufferSize: 32768,
      flowControl: "none"
    },
    no_device: i = 1
  } = {
    filters: null,
    config_port: {
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      bufferSize: 32768,
      flowControl: "none"
    },
    no_device: 1
  }) {
    super({ filters: t, config_port: r, no_device: i });
    E(this, e);
    y(this, "__hoppers__", {
      levels: [
        { id: 1, coinValue: 10, coinName: "Hopper 1: 10 Pesos", count: 0, maxCapacity: 1e3 },
        { id: 2, coinValue: 5, coinName: "Hopper 2: 5 Pesos", count: 0, maxCapacity: 1e3 },
        { id: 3, coinValue: 2, coinName: "Hopper 3: 2 Pesos", count: 0, maxCapacity: 1e3 },
        { id: 4, coinValue: 1, coinName: "Hopper 4: 1 Peso", count: 0, maxCapacity: 1e3 }
      ],
      balance: 0,
      current: null
    });
    if (this.__internal__.device.type = "hopper", d.registerType(this.__internal__.device.type), d.getByNumber(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.time.response_connection = 7e3, this.__internal__.time.response_general = 7e3, this.__internal__.serial.delay_first_connection = 500, this.__internal__.serial.response.replacer = "", this.__internal__.serial.response.limiter = `\r
`, d.add(this);
  }
  serialMessage(t) {
    const r = this.parseUint8ArrayToString(t), o = {
      //hex,
      ascii: this.asciiToHex(r),
      code: t,
      name: "",
      description: "",
      request: this.lastAction,
      no_code: 0,
      error: !1,
      data: null
    };
    if (t.length === 3) {
      n(this, e, u).call(this, o);
      return;
    }
    if (t.length !== 13) {
      const s = n(this, e, A).call(this, { array: t, chunkSize: 13 });
      for (const h of s) {
        const b = this.parseUint8ArrayToString(new Uint8Array(h)), C = this.asciiToHex(b), T = this.stringToArrayHex(b);
        o.code = h, o.hex = T, o.ascii = C, h.length !== 13 ? n(this, e, u).call(this, o) : n(this, e, f).call(this, o);
      }
      return;
    }
    n(this, e, f).call(this, o);
  }
  serialSetConnectionConstant() {
    return [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15];
  }
  async sendConnect() {
    const t = n(this, e, p).call(this, [10]);
    return await this.appendToQueue(t, "connect");
  }
  async requestStatus() {
    const t = n(this, e, p).call(this, [10, 10, 11, 12]);
    return await this.appendToQueue(t, "status");
  }
  async readBalance() {
    const t = n(this, e, p).call(this, [10, 192, 1]);
    return await this.appendToQueue(t, "readBalance");
  }
  async clearBalance() {
    const t = n(this, e, p).call(this, [10, 192, 2]);
    return await this.appendToQueue(t, "clearBalance");
  }
  async forceInvalid() {
    const t = "0A000F00".match(/.{1,2}/g);
    return await this.appendToQueue(t, "ForceInvalid");
  }
  async readHopper({ hopper: t = null } = { hopper: null }) {
    n(this, e, l).call(this, t), this.__hoppers__.current = t;
    const r = n(this, e, p).call(this, [10, t, t]);
    return await this.appendToQueue(r, "readHopper");
  }
  async writeHopper({ hopper: t = null, quantity: r = 0 } = { hopper: null, quantity: 0 }) {
    n(this, e, l).call(this, t), n(this, e, x).call(this, r), this.__hoppers__.current = t;
    const [i, o] = n(this, e, H).call(this, r), s = n(this, e, p).call(this, [10, 240, t, 0, 0, 0, 0, 0, 0, i, o]);
    return await this.appendToQueue(s, "writeHopper");
  }
  async dispenseHopper({ hopper: t = null } = { hopper: null }) {
    n(this, e, l).call(this, t), this.__hoppers__.current = t;
    const r = n(this, e, p).call(this, [10, 2, t]);
    return await this.appendToQueue(r, "dispenseHopper");
  }
  async dispenseChange({ change: t = 0 } = { change: 0 }) {
    if (typeof t != "number" || t < 0 || t > 32767)
      throw new RangeError("Change must be a number between 0 and 32767");
    if (typeof t != "number" || !Number.isInteger(t))
      throw new TypeError("Change must be an integer");
    const r = t & 255, i = t >> 8 & 255, o = n(this, e, p).call(this, [10, 204, 170, 0, 0, 0, 0, 0, 0, i, r]);
    return await this.appendToQueue(o, "dispenseChange");
  }
  async configValidator({ enable: t = !1 } = { enable: !1 }) {
    if (typeof t != "boolean")
      throw new TypeError("Enable must be a boolean");
    const r = n(this, e, p).call(this, [10, 176, t ? 1 : 0]);
    return await this.appendToQueue(r, "configValidator");
  }
  async disableValidator() {
    return await this.configValidator({ enable: !1 });
  }
  async enableValidator() {
    return await this.configValidator({ enable: !0 });
  }
  async change1x1({ hopper: t = null } = { hopper: null }) {
    n(this, e, l).call(this, t), this.__hoppers__.current = t;
    const r = n(this, e, p).call(this, [10, 224, t]);
    return await this.appendToQueue(r, "change1x1Hopper-" + t);
  }
  async sendCustomCode({ code: t = [] } = { code: [] }) {
    if (!Array.isArray(t) || !t.every((i) => typeof i == "number" && i >= 0 && i <= 255))
      throw new TypeError("Code must be an array of numbers between 0 and 255");
    const r = n(this, e, p).call(this, t);
    await this.appendToQueue(r, "custom");
  }
}
e = new WeakSet(), u = function(t) {
  t.error = !0, t.ascii.includes("ffffff") ? (t.name = "SINTAX", t.description = "Error de Sintaxis", t.no_code = 400) : t.ascii.includes("ffaaaa") ? (t.name = "LOWLEVEL", t.description = "Bajo nivel de monedas en Hopper (99)", t.no_code = 401) : t.ascii.includes("ffbbbb") ? (t.name = "TIMEOUT_DISPENSE", t.description = "Error de dispensado, timeout", t.no_code = 402) : (t.name = "UNKNOWN_ERROR", t.description = "Unknown error occurred", t.no_code = 999), this.dispatch("serial:message", t);
}, f = function(t) {
  if (this.lastAction === "status")
    t.name = "STATUS", t.description = "Hoppers status", t.no_code = 1, this.__hoppers__.levels[0].count = n(this, e, _).call(this, t.code[9], t.code[10]), this.__hoppers__.levels[1].count = n(this, e, _).call(this, t.code[7], t.code[8]), this.__hoppers__.levels[2].count = n(this, e, _).call(this, t.code[5], t.code[6]), this.__hoppers__.levels[3].count = n(this, e, _).call(this, t.code[3], t.code[4]), t.data = this.__hoppers__.levels;
  else if (this.lastAction === "readHopper") {
    t.name = "READ_HOPPER", t.description = `Hopper ${this.__hoppers__.current} level`, t.no_code = 2;
    const r = this.__hoppers__.current - 1;
    this.__hoppers__.levels[r].count = n(this, e, _).call(this, t.code[9], t.code[10]), t.data = this.__hoppers__.levels, t.hopperId = this.__hoppers__.current;
  } else this.lastAction === "writeHopper" ? (t.name = "WRITE_HOPPER", t.description = "Hopper " + this.__hoppers__.current + " write", t.no_code = 3, this.__hoppers__.levels[this.__hoppers__.current - 1].count = n(this, e, _).call(this, t.code[9], t.code[10]), t.data = this.__hoppers__.levels, t.hopperId = this.__hoppers__.current) : this.lastAction === "dispenseHopper" ? (t.name = "DISPENSEHOPPER", t.description = "Hopper " + this.__hoppers__.current + " dispense", t.no_code = 4, this.__hoppers__.levels[this.__hoppers__.current - 1].count = n(this, e, _).call(this, t.code[9], t.code[10]), t.data = this.__hoppers__.levels, t.hopperId = this.__hoppers__.current) : this.lastAction === "dispenseChange" ? (t.name = "DISPENSE_CHANGE", t.description = "Change dispensed", t.no_code = 5, t.data = n(this, e, _).call(this, t.code[9], t.code[10])) : this.lastAction === "readBalance" ? (t.name = "READ_BALANCE", t.description = "Read Balance", t.no_code = 6, this.__hoppers__.balance = n(this, e, _).call(this, t.code[9], t.code[10]), t.data = this.__hoppers__.balance) : this.lastAction === "clearBalance" ? (t.name = "CLEAR_BALANCE", t.description = "Clared hoppers balance", t.no_code = 7, this.__hoppers__.balance = n(this, e, _).call(this, t.code[9], t.code[10]), t.data = this.__hoppers__.balance) : this.lastAction === "configValidator" ? (t.code[2] === 1 ? (t.name = "ENABLE_VALIDATOR", t.description = "Validator enabled", t.no_code = 8) : (t.name = "DISABLE_VALIDATOR", t.description = "Validator disabled", t.no_code = 9), t.no_code = 400, t.data = t.code[2] === 1 ? "enabled" : "disabled") : this.lastAction.includes("change1x1Hopper") && (t.code[2] === 1 ? (t.name = "CHANGE_1X1_HOPPER_1", t.description = "Change 1x1 Hopper 1", t.no_code = 10) : t.code[2] === 2 ? (t.name = "CHANGE_1X1_HOPPER_2", t.description = "Change 1x1 Hopper 2", t.no_code = 11) : t.code[2] === 3 ? (t.name = "CHANGE_1X1_HOPPER_3", t.description = "Change 1x1 Hopper 3", t.no_code = 12) : t.code[2] === 4 ? (t.name = "CHANGE_1X1_HOPPER_4", t.description = "Change 1x1 Hopper 4", t.no_code = 13) : (t.name = "CHANGE_1X1_HOPPER_UNKNOWN", t.description = "Change 1x1 Hopper Unknown", t.no_code = 14));
  this.dispatch("serial:message", t);
}, _ = function(t, r) {
  return (t << 8 | r) << 16 >> 16;
}, l = function(t) {
  if (typeof t != "number" || t < 1 || t > 4)
    throw new RangeError("Hopper ID must be a number between 1 and 4");
  if (typeof t != "number" || !Number.isInteger(t))
    throw new TypeError("Hopper ID must be an integer");
}, x = function(t) {
  if (typeof t != "number" || t < -32768 || t > 32767)
    throw new RangeError("Quantity must be a number between -32768 and 32767");
  if (typeof t != "number" || !Number.isInteger(t))
    throw new TypeError("Quantity must be an integer");
}, H = function(t) {
  n(this, e, x).call(this, t);
  const r = t & 65535, i = r >> 8 & 255, o = r & 255;
  return [i, o];
}, A = function({ array: t, chunkSize: r = 13 } = {}) {
  if (!Array.isArray(t))
    throw new TypeError("Expected an array");
  if (typeof r != "number" || r <= 0)
    throw new RangeError("Chunk size must be a positive number");
  const i = [];
  for (let o = 0; o < t.length; o += r)
    i.push(t.slice(o, o + r));
  return i;
}, p = function(t) {
  t.length < 11 && (t = [...t, ...Array(11 - t.length).fill(0)]);
  const i = t.slice(1, 11).reduce((o, s) => {
    if (typeof s != "number")
      throw new TypeError("Array must contain only numbers");
    return o + s;
  }, 0) & 255;
  return t[11] = i, t[12] = 15, t;
};
export {
  S as Hopper
};
