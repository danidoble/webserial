import { v as d, s as p } from "./webserial-core-52yJu-0N.js";
class f extends d {
  __hoppers__ = {
    levels: [
      { id: 1, currency: 10, key: "Hopper 1", name: "10 Pesos", amount: 0, capacity: 1e3 },
      { id: 2, currency: 5, key: "Hopper 2", name: "5 Pesos", amount: 0, capacity: 1e3 },
      { id: 3, currency: 2, key: "Hopper 3", name: "2 Pesos", amount: 0, capacity: 1e3 },
      { id: 4, currency: 1, key: "Hopper 4", name: "1 Peso", amount: 0, capacity: 1e3 }
    ],
    balance: 0,
    current: null
  };
  constructor({
    filters: e = null,
    config_port: t = {
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      bufferSize: 32768,
      flowControl: "none"
    },
    no_device: r = 1,
    socket: n = !1
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
    no_device: 1,
    socket: !1
  }) {
    if (super({ filters: e, config_port: t, no_device: r, socket: n }), this.__internal__.device.type = "hopper", p.getCustom(this.typeDevice, r))
      throw new Error(`Device ${this.typeDevice} ${r} already exists`);
    this.__internal__.time.response_connection = 7e3, this.__internal__.time.response_general = 7e3, this.__internal__.serial.delay_first_connection = 500, this.__internal__.serial.response.replacer = "", this.__internal__.serial.response.limiter = `\r
`, p.add(this), this.#s();
  }
  #s() {
    const e = ["levels", "hopper:updated", "dispense-change", "balance:updated", "validator:status", "change:1x1"];
    for (const t of e)
      this.serialRegisterAvailableListener(t);
  }
  get balance() {
    return this.__hoppers__.balance;
  }
  get currentHopper() {
    return this.__hoppers__.current;
  }
  get levels() {
    return this.__hoppers__.levels;
  }
  setMaxCapacity({ hopper: e = 1, capacity: t = 1e3 } = { hopper: 1, capacity: 1e3 }) {
    return this.#r(e), this.__hoppers__.levels[e - 1].capacity = t, this;
  }
  setHopperName({ hopper: e = 1, name: t = "" } = { hopper: 1, name: "" }) {
    if (this.#r(e), typeof t != "string" || t.length === 0)
      throw new TypeError("Name must be a non-empty string");
    return this.__hoppers__.levels[e - 1].name = t, this;
  }
  setHopperKey({ hopper: e = 1, key: t = "" } = { hopper: 1, key: "" }) {
    if (this.#r(e), typeof t != "string" || t.length === 0)
      throw new TypeError("Key must be a non-empty string");
    return this.__hoppers__.levels[e - 1].key = t, this;
  }
  setHopperCurrency({ hopper: e = 1, currency: t = 1 } = { hopper: 1, currency: 1 }) {
    if (this.#r(e), typeof t != "number" || t <= 0)
      throw new RangeError("Currency must be a positive number");
    return this.__hoppers__.levels[e - 1].currency = t, this;
  }
  #n(e) {
    e.error = !0, e.ascii.includes("ffffff") ? (e.name = "SINTAX", e.description = "Error de Sintaxis", e.no_code = 400) : e.ascii.includes("ffaaaa") ? (e.name = "LOWLEVEL", e.description = "Bajo nivel de monedas en Hopper (99)", e.no_code = 401) : e.ascii.includes("ffbbbb") ? (e.name = "TIMEOUT_DISPENSE", e.description = "Error de dispensado, timeout", e.no_code = 402) : (e.name = "UNKNOWN_ERROR", e.description = "Unknown error occurred", e.no_code = 999), this.dispatch("serial:message", e);
  }
  #i(e) {
    if (this.lastAction === "status")
      e.name = "STATUS", e.description = "Hoppers status", e.no_code = 1, this.__hoppers__.levels[0].amount = this.#t(e.code[9], e.code[10]), this.__hoppers__.levels[1].amount = this.#t(e.code[7], e.code[8]), this.__hoppers__.levels[2].amount = this.#t(e.code[5], e.code[6]), this.__hoppers__.levels[3].amount = this.#t(e.code[3], e.code[4]), e.data = this.__hoppers__.levels, this.dispatch("levels", e.data);
    else if (this.lastAction === "readHopper") {
      e.name = "READ_HOPPER", e.description = `Hopper ${this.__hoppers__.current} level`, e.no_code = 2;
      const t = (this.__hoppers__.current || 1) - 1;
      this.__hoppers__.levels[t].amount = this.#t(e.code[9], e.code[10]), e.data = this.__hoppers__.levels, e.hopperId = this.__hoppers__.current, this.dispatch("hopper:updated", this.__hoppers__.levels[t]);
    } else if (this.lastAction === "writeHopper") {
      e.name = "WRITE_HOPPER", e.description = "Hopper " + this.__hoppers__.current + " write", e.no_code = 3, this.__hoppers__.levels[(this.__hoppers__.current || 1) - 1].amount = this.#t(
        // @ts-expect-error index position on uint8array is number
        e.code[9],
        // @ts-expect-error index position on uint8array is number
        e.code[10]
      ), e.data = this.__hoppers__.levels, e.hopperId = this.__hoppers__.current;
      const t = (this.__hoppers__.current || 1) - 1;
      this.dispatch("hopper:updated", this.__hoppers__.levels[t]);
    } else if (this.lastAction === "dispenseHopper") {
      e.name = "DISPENSEHOPPER", e.description = "Hopper " + this.__hoppers__.current + " dispense", e.no_code = 4, this.__hoppers__.levels[(this.__hoppers__.current || 1) - 1].amount = this.#t(
        // @ts-expect-error index position on uint8array is number
        e.code[9],
        // @ts-expect-error index position on uint8array is number
        e.code[10]
      ), e.data = this.__hoppers__.levels, e.hopperId = this.__hoppers__.current;
      const t = (this.__hoppers__.current || 0) - 1;
      this.dispatch("hopper:updated", this.__hoppers__.levels[t]);
    } else this.lastAction === "dispenseChange" ? (e.name = "DISPENSE_CHANGE", e.description = "Change dispensed", e.no_code = 5, e.data = this.#t(e.code[9], e.code[10]), this.dispatch("dispense-change", { amount: e.data })) : this.lastAction === "readBalance" ? (e.name = "READ_BALANCE", e.description = "Read Balance", e.no_code = 6, this.__hoppers__.balance = this.#t(e.code[9], e.code[10]), e.data = this.__hoppers__.balance, this.dispatch("balance:updated", { balance: e.data })) : this.lastAction === "clearBalance" ? (e.name = "CLEAR_BALANCE", e.description = "Clared hoppers balance", e.no_code = 7, this.__hoppers__.balance = this.#t(e.code[9], e.code[10]), e.data = this.__hoppers__.balance, this.dispatch("balance:updated", { balance: e.data })) : this.lastAction === "configValidator" ? (e.code[2] === 1 ? (e.name = "ENABLE_VALIDATOR", e.description = "Validator enabled", e.no_code = 8, this.dispatch("validator:status", { enabled: !0 })) : (e.name = "DISABLE_VALIDATOR", e.description = "Validator disabled", e.no_code = 9, this.dispatch("validator:status", { enabled: !1 })), e.no_code = 400, e.data = e.code[2] === 1 ? "enabled" : "disabled") : this.lastAction?.includes("change1x1Hopper") && (e.code[2] === 1 ? (e.name = "CHANGE_1X1_HOPPER_1", e.description = "Change 1x1 Hopper 1", e.no_code = 10) : e.code[2] === 2 ? (e.name = "CHANGE_1X1_HOPPER_2", e.description = "Change 1x1 Hopper 2", e.no_code = 11) : e.code[2] === 3 ? (e.name = "CHANGE_1X1_HOPPER_3", e.description = "Change 1x1 Hopper 3", e.no_code = 12) : e.code[2] === 4 ? (e.name = "CHANGE_1X1_HOPPER_4", e.description = "Change 1x1 Hopper 4", e.no_code = 13) : (e.name = "CHANGE_1X1_HOPPER_UNKNOWN", e.description = "Change 1x1 Hopper Unknown", e.no_code = 14), this.dispatch("change:1x1", { hopperId: e.code[2] }));
    this.dispatch("serial:message", e);
  }
  serialMessage(e) {
    const t = e, r = this.parseUint8ArrayToString(t), i = {
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
      this.#n(i);
      return;
    }
    const a = Array.from(t);
    if (t.length !== 13) {
      const c = this.#a({ array: a, chunkSize: 13 });
      for (const o of c) {
        const s = this.parseUint8ArrayToString(new Uint8Array(o)), h = this.asciiToHex(s), _ = this.stringToArrayHex(s);
        i.code = o, i.hex = _, i.ascii = h, o.length !== 13 ? this.#n(i) : this.#i(i);
      }
      return;
    }
    this.#i(i);
  }
  #t(e, t) {
    return (e << 8 | t) << 16 >> 16;
  }
  #r(e) {
    if (typeof e != "number" || e < 1 || e > 4)
      throw new RangeError("Hopper ID must be a number between 1 and 4");
    if (typeof e != "number" || !Number.isInteger(e))
      throw new TypeError("Hopper ID must be an integer");
  }
  #o(e) {
    if (typeof e != "number" || e < -32768 || e > 32767)
      throw new RangeError("Quantity must be a number between -32768 and 32767");
    if (typeof e != "number" || !Number.isInteger(e))
      throw new TypeError("Quantity must be an integer");
  }
  #p(e) {
    this.#o(e);
    const t = e & 65535, r = t >> 8 & 255, n = t & 255;
    return [r, n];
  }
  #a({
    array: e,
    chunkSize: t = 13
  } = {
    array: [],
    chunkSize: 13
  }) {
    if (!Array.isArray(e))
      throw new TypeError("Expected an array");
    if (typeof t != "number" || t <= 0)
      throw new RangeError("Chunk size must be a positive number");
    const r = [];
    for (let n = 0; n < e.length; n += t)
      r.push(e.slice(n, n + t));
    return r;
  }
  #e(e) {
    e.length < 11 && (e = [...e, ...Array(11 - e.length).fill(0)]);
    const r = e.slice(1, 11).reduce((n, i) => {
      if (typeof i != "number")
        throw new TypeError("Array must contain only numbers");
      return n + i;
    }, 0) & 255;
    return e[11] = r, e[12] = 15, e;
  }
  serialSetConnectionConstant() {
    return [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 15];
  }
  async sendConnect() {
    const e = this.#e([10]);
    return await this.appendToQueue(e, "connect");
  }
  async requestStatus() {
    const e = this.#e([10, 10, 11, 12]);
    return await this.appendToQueue(e, "status");
  }
  async readBalance() {
    const e = this.#e([10, 192, 1]);
    return await this.appendToQueue(e, "readBalance");
  }
  async clearBalance() {
    const e = this.#e([10, 192, 2]);
    return await this.appendToQueue(e, "clearBalance");
  }
  async forceInvalid() {
    const e = "0A000F00".match(/.{1,2}/g);
    return await this.appendToQueue(e, "ForceInvalid");
  }
  async readHopper({ hopper: e = 1 } = { hopper: 1 }) {
    this.#r(e), this.__hoppers__.current = e;
    const t = this.#e([10, e, e]);
    return await this.appendToQueue(t, "readHopper");
  }
  async writeHopper({ hopper: e = 1, quantity: t = 0 } = { hopper: 1, quantity: 0 }) {
    this.#r(e), this.#o(t), this.__hoppers__.current = e;
    const [r, n] = this.#p(t), i = this.#e([10, 240, e, 0, 0, 0, 0, 0, 0, r, n]);
    return await this.appendToQueue(i, "writeHopper");
  }
  async dispenseHopper({ hopper: e = 1 } = { hopper: 1 }) {
    this.#r(e), this.__hoppers__.current = e;
    const t = this.#e([10, 2, e]);
    return await this.appendToQueue(t, "dispenseHopper");
  }
  async dispenseChange({ change: e = 0 } = { change: 0 }) {
    if (typeof e != "number" || e < 0 || e > 32767)
      throw new RangeError("Change must be a number between 0 and 32767");
    if (typeof e != "number" || !Number.isInteger(e))
      throw new TypeError("Change must be an integer");
    const t = e & 255, r = e >> 8 & 255, n = this.#e([10, 204, 170, 0, 0, 0, 0, 0, 0, r, t]);
    return await this.appendToQueue(n, "dispenseChange");
  }
  async configValidator({
    enable: e = !1
  } = { enable: !1 }) {
    if (typeof e != "boolean")
      throw new TypeError("Enable must be a boolean");
    const t = this.#e([10, 176, e ? 1 : 0]);
    return await this.appendToQueue(t, "configValidator");
  }
  async disableValidator() {
    return await this.configValidator({ enable: !1 });
  }
  async enableValidator() {
    return await this.configValidator({ enable: !0 });
  }
  async change1x1({ hopper: e = 1 } = { hopper: 1 }) {
    this.#r(e), this.__hoppers__.current = e;
    const t = this.#e([10, 224, e]);
    return await this.appendToQueue(t, "change1x1Hopper-" + e);
  }
  async sendCustomCode({
    code: e = []
  } = { code: [] }) {
    if (!Array.isArray(e) || !e.every((r) => typeof r == "number" && r >= 0 && r <= 255))
      throw new TypeError("Code must be an array of numbers between 0 and 255");
    const t = this.#e(e);
    await this.appendToQueue(t, "custom");
  }
}
export {
  f as Hopper
};
