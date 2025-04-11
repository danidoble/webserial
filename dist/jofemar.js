var vt = Object.defineProperty;
var F = (p) => {
  throw TypeError(p);
};
var yt = (p, h, e) => h in p ? vt(p, h, { enumerable: !0, configurable: !0, writable: !0, value: e }) : p[h] = e;
var N = (p, h, e) => yt(p, typeof h != "symbol" ? h + "" : h, e), wt = (p, h, e) => h.has(p) || F("Cannot " + e);
var P = (p, h, e) => h.has(p) ? F("Cannot add the same private member more than once") : h instanceof WeakSet ? h.add(p) : h.set(p, e);
var n = (p, h, e) => (wt(p, h, "access private method"), e);
import { K as kt, c as A, w as T, g as B } from "./kernel-B15wfB2x.js";
var i, $, W, g, u, E, q, O, j, R, J, L, U, H, V, K, G, z, Q, Y, Z, X, tt, et, it, nt, rt, at, ot, ct, st, ht, _, l, m, d, f, lt, dt, pt, ut, w, S, M, D, I, _t;
class Tt extends kt {
  constructor({
    filters: e = null,
    config_port: t = null,
    no_device: r = 1,
    device_listen_on_port: a = 1,
    type: o = "esplus",
    support_cart: c = !0
  } = {}) {
    super({ filters: e, config_port: t, no_device: r, device_listen_on_port: a });
    P(this, i);
    N(this, "__device", {
      type: "esplus",
      support_cart: !1,
      withdraw: {
        in_process: !1,
        seconds: 60,
        interval: 0
      },
      // waiting for user withdraw products
      cart: {
        in_process: !1
      },
      channels: {
        verification: {
          clear() {
            this.running = !1, this.current = 1, this.channels = [];
          },
          running: !1,
          start: 1,
          end: 80,
          current: 1,
          channels: []
        }
      }
    });
    if (this.__internal__.device.type = "jofemar", A.getCustom(this.typeDevice, r))
      throw new Error(`Device ${this.typeDevice} ${r} already exists`);
    this.__internal__.dispense.must_response = !0, this.__internal__.time.response_general = 800, this.__internal__.time.response_engines = 800, this.__internal__.dispense.limit_counter = 40, this.__internal__.dispense.timeout = 0, this.__internal__.dispense.timeout_time = 4e3, this.__internal__.dispense.interval = 0, this.__internal__.dispense.interval_time = 1e3, this.__internal__.device.hex_number = (128 + this.listenOnChannel).toString(16), this.__internal__.device.door_open = !1, this.__internal__.dispense.elevator = {
      locking_time: 60,
      locking_interval: 0,
      need_reset: !1
    }, this.deviceType = o, this.supportCart = c, n(this, i, $).call(this), n(this, i, g).call(this), n(this, i, W).call(this);
  }
  set startChannelVerification(e) {
    const t = parseInt(e);
    if (isNaN(t)) throw new Error("Invalid start channel verification, must be a number");
    if (t < 1 || t > 126) throw new Error("Invalid start channel verification, valid range is 1 to 126");
    this.__device.channels.verification.start = t;
  }
  set endChannelVerification(e) {
    const t = parseInt(e);
    if (isNaN(t)) throw new Error("Invalid end channel verification, must be a number");
    if (t < 1 || t > 126) throw new Error("Invalid end channel verification, valid range is 1 to 126");
    this.__device.channels.verification.end = t;
  }
  set listenOnChannel(e) {
    if (e = parseInt(e), isNaN(e) || e < 1 || e > 31) throw new Error("Invalid port number, valid range is 1 to 31");
    this.__internal__.device.listen_on_port = e, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(e), this.__internal__.device.hex_number = (128 + e).toString(16);
  }
  /**
   * @deperecated
   * @param {string|number} channel
   */
  set listenOnPort(e) {
    this.listenOnChannel = e;
  }
  set deviceType(e) {
    if (typeof e != "string") throw new Error("Invalid device type, must be a string");
    this.__device.type = e;
  }
  set supportCart(e) {
    if (typeof e != "boolean") throw new Error("Invalid support cart, must be a boolean");
    this.__device.support_cart = e;
  }
  serialJofemarMakeBytes(e) {
    let t = this.hexToDec(this.sumHex(e)), r = this.calcCheckSums(t.toString());
    for (let a = 0; a < 2; a++)
      e.push(this.hexMaker(r[a]));
    return e.push("03"), this.add0x(e);
  }
  calcCheckSums(e) {
    e = this.add0x([this.decToHex(parseInt(e).toString())]);
    let t = [];
    return t.push((e & 255 | 240).toString(16).toUpperCase()), t.push((e & 255 | 15).toString(16).toUpperCase()), t;
  }
  serialSetConnectionConstant(e = 1) {
    let t = ["02", "30", "30", (128 + e).toString(16), "53", "FF", "FF"], r = [];
    return t.forEach((a) => {
      r.push(this.hexMaker(a));
    }), this.serialJofemarMakeBytes(r);
  }
  serialMessage(e) {
    let r = {
      code: e,
      name: null,
      description: null,
      request: "unknown",
      no_code: 0,
      additional: {
        machine: {
          hex: null,
          dec: null
        }
      }
    };
    switch (e[0]) {
      case "02":
        r = n(this, i, ht).call(this, e, r, 128);
        break;
      case "06":
        r = n(this, i, lt).call(this, e, r);
        break;
      case "15":
        r.name = "Checksum error", r.description = "The calculated checksum does not match the received checksum", r.no_code = 38, n(this, i, l).call(this);
        break;
      default:
        r.name = "unknown", r.description = "The message received is unknown", r.no_code = 404;
        break;
    }
    this.dispatch("serial:message", r);
  }
  productRemovedContinueDispensing() {
    this.__internal__.dispense.elevator.locking_interval && (this.__internal__.dispense.elevator.locking_time = 0);
  }
  /**
   * Dispense a product from the machine
   * @param {null|number|string} selection
   * @param {boolean} cart
   * @return {Promise<unknown>}
   */
  async dispense({ selection: e = 1, cart: t = !1 } = {}) {
    if (e = parseInt(e), isNaN(e) || e < 1 || e > 130) throw new Error("Invalid selection");
    const { channel: r, tray: a } = n(this, i, dt).call(this, e);
    this.__internal__.dispense.backup_dispense = {
      selection: e,
      cart: t,
      channel: r,
      tray: a
    };
    let c = ["02", "30", "30", this.__internal__.device.hex_number, "56", a, r];
    t && (c[4] = "4D"), c = n(this, i, E).call(this, c);
    let s;
    do
      s = await this.internalDispense(c), n(this, i, pt).call(this), s.error === "elevator-locked" ? await n(this, i, q).call(this) : s.error === "no-response" && await T(1e3);
    while (["elevator-locked", "no-response"].includes(s.error));
    return this.__internal__.dispense.backup_dispense = {}, s;
  }
  internalClearSensing() {
    super.internalClearSensing(), this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.serial.queue.length > 0 && (this.__internal__.serial.queue = this.__internal__.serial.queue.filter((e) => e.type !== "status"));
  }
  async endDispense() {
    let t = ["02", "30", "30", this.__internal__.device.hex_number, "4D", "80", "80"];
    return t = n(this, i, E).call(this, t), await this.internalDispense(t);
  }
  async collect() {
    const e = ["02", "30", "30", "81", "4E", "FF", "FF"];
    return await n(this, i, u).call(this, e, "collect");
  }
  async resetSoldOutErrors() {
    return await n(this, i, w).call(this, "80");
  }
  async resetWaitingProductRemovedError() {
    return await n(this, i, w).call(this, "81");
  }
  async resetMachineErrors() {
    return this.__internal__.serial.queue.length === 0 ? (n(this, i, S).call(this), await n(this, i, w).call(this, "FF")) : new Promise((e) => {
      const t = setInterval(async () => {
        this.__internal__.serial.queue.length > 0 || (clearInterval(t), await n(this, i, w).call(this, "FF"), n(this, i, S).call(this), e(!0));
      }, 100);
    });
  }
  async resetAllErrors() {
    return await this.resetSoldOutErrors(), await T(100), await this.resetWaitingProductRemovedError(), await T(100), await this.resetMachineErrors();
  }
  async status() {
    const e = ["02", "30", "30", "81", "53", "FF", "FF"];
    return await n(this, i, u).call(this, e, "status");
  }
  async lightsOn() {
    return await n(this, i, M).call(this, "81");
  }
  async lightsOff() {
    return await n(this, i, M).call(this, "80");
  }
  async program(e, t) {
    const r = ["02", "30", "30", "81", "50", e, t];
    return await n(this, i, u).call(this, r, "program");
  }
  async programDisplayLanguage({ language: e = "spanish" } = {}) {
    const t = { spanish: "30", english: "31", french: "32" };
    if (!t[e]) throw new Error("Invalid language");
    return await this.program("49", t[e]);
  }
  async programBeeper({ enable: e = !0 } = {}) {
    const t = e ? "31" : "30";
    return await this.program("5A", t);
  }
  async programDisableWorkingTemperature() {
    if (this.__device.type === "iceplus") throw new Error("IcePlus does not support disable working temperature");
    return await this.program("54", "80");
  }
  async programDisableThermometer() {
    return await this.programDisableWorkingTemperature();
  }
  /**
   * Program the machine to work with a specific temperature
   * @param {number|string} degrees
   * @return {Promise<void>}
   */
  async programWorkingTemperature({ degrees: e = 0.5 } = {}) {
    e = parseFloat(e);
    const t = this.__device.type === "iceplus" ? 6.5 : 32, r = this.__device.type === "iceplus" ? -25 : 0.5;
    if (isNaN(e) || e < r || e > t || e % 0.5 !== 0)
      throw new Error("Invalid degrees, must be a multiple of 0.5 and between 0.5 and 32");
    let a = e * 2 + 128;
    return this.__device.type === "iceplus" && (a += 51), a = Math.ceil(a), await this.program("54", a.toString(16));
  }
  /**
   * @param {number|string} tray
   * @return {Promise<void>}
   */
  async programIsolationTray({ tray: e = 0 } = {}) {
    if (e = parseInt(e), isNaN(e) || e < 0 || e > 12) throw new Error("Invalid tray, valid range is 0 to 12");
    const t = e === 0 ? "80" : (e + 139).toString(16);
    return this.program("42", t);
  }
  /**
   * @param {number|string} seconds
   * @return {Promise<*>}
   */
  async programTimeToStandbyAfterCollect({ seconds: e = 15 } = {}) {
    if (e = parseInt(e), isNaN(e) || e < 15 || e > 120) throw new Error("Invalid seconds, valid range is 15 to 120");
    const t = (128 + e).toString(16);
    return await this.program("46", t);
  }
  /**
   * @param {number|string} seconds
   * @return {Promise<*>}
   */
  async programTimeToStandbyWithoutCollect({ minutes: e = 1 } = {}) {
    if (e = parseInt(e), isNaN(e) || e < 1 || e > 10) throw new Error("Invalid minutes, valid range is 1 to 10");
    const t = (128 + e).toString(16);
    return await this.program("48", t);
  }
  async programElevatorSpeed({ speed: e = "high" } = {}) {
    const t = { high: "31", low: "30" };
    if (!t[e]) throw new Error("Invalid speed, valid speeds are 'high' and 'low'");
    return await this.program("76", t[e]);
  }
  async programTemperatureExpiration({ enable: e = !1 } = {}) {
    const t = e ? "31" : "30";
    return await this.program("63", t);
  }
  async programEnableTemperatureExpiration() {
    return await this.programTemperatureExpiration({ enable: !0 });
  }
  async programDisableTemperatureExpiration() {
    return await this.programTemperatureExpiration({ enable: !1 });
  }
  /**
   * @param {number|string} address
   * @return {Promise<*>}
   */
  async programMachineAddress({ address: e = 1 } = {}) {
    if (e = parseInt(e), isNaN(e) || e < 1 || e > 31) throw new Error("Invalid address, valid range is 1 to 31");
    const t = (128 + e).toString(16);
    return await this.program("64", t);
  }
  /**
   * @param {number|string} degrees
   * @return {Promise<*>}
   */
  async programTemperatureBeforeExpiration({ degrees: e = 0.5 } = {}) {
    if (e = parseFloat(e), isNaN(e) || e < 0.5 || e > 30 || e % 0.5 !== 0)
      throw new Error("Invalid degrees, must be a multiple of 0.5 and valid range is 0.5 to 30");
    const t = (128 + e * 2).toString(16);
    return await this.program("65", t);
  }
  /**
   * @param {number|string} minutes
   * @return {Promise<*>}
   */
  async programTimeBeforeExpirationByTemperature({ minutes: e = 1 } = {}) {
    if (e = parseInt(e), isNaN(e) || e < 1 || e > 120) throw new Error("Invalid minutes, valid range is 1 to 120");
    const t = (128 + e).toString(16);
    return await this.program("66", t);
  }
  async programTemperatureScale({ scale: e = "c" } = {}) {
    const t = { c: "43", f: "46" };
    if (!t[e]) throw new Error("Invalid scale, valid scales are 'c' for celsius and 'f' for fahrenheit");
    return await this.program("67", t[e]);
  }
  /**
   * @param {number|string} selection
   * @param {number|string} voltage
   * @return {Promise<void>}
   */
  async programVoltageEngine({ selection: e = 1, voltage: t = 5 } = {}) {
    if (t = parseFloat(t), e = parseInt(e), isNaN(e) || e < 1 || e > this.__device.channels.verification.end)
      throw new Error(`Invalid selection, valid range is 1 to ${this.__device.channels.verification.end}`);
    if (isNaN(t) || t < 5 || t > 9.5 || t % 0.5 !== 0)
      throw new Error("Invalid voltage, valid range is 5 to 9.5");
    const r = 109 + e, o = (128 + (t - 5) * 2).toString(16), c = ["02", "30", "30", "81", "47", r, o];
    return await n(this, i, u).call(this, c, "voltage-engine");
  }
  /**
   * @param {number|string} selection
   * @param {boolean} enable
   * @return {Promise<void>}
   */
  async programPushOverProducts({ selection: e = 1, enable: t = !0 } = {}) {
    if (e = parseInt(e), isNaN(e) || e < 1 || e > this.__device.channels.verification.end)
      throw new Error(`Invalid selection, valid range is 1 to ${this.__device.channels.verification.end}`);
    const o = ["02", "30", "30", "81", "4F", 109 + e, t ? "31" : "30"];
    return await n(this, i, u).call(this, o, "push-over-products");
  }
  /**
   * @param {number|string} selection
   * @param {number|string} seconds
   * @return {Promise<void>}
   */
  async programChannelRunningAfterDispense({ selection: e = 1, seconds: t = 0 } = {}) {
    if (e = parseInt(e), t = parseFloat(t), isNaN(e) || e < 1 || e > this.__device.channels.verification.end)
      throw new Error(`Invalid selection, valid range is 1 to ${this.__device.channels.verification.end}`);
    if (isNaN(t) || t < 0 || t > 10 || t % 0.1 !== 0)
      throw new Error("Invalid seconds, valid range is 0.0 to 10.0 with a step of 0.1");
    const r = 109 + e;
    t = t.toFixed(1);
    const a = 128 + t * 10, o = ["02", "30", "30", "81", "45", r, a];
    return await n(this, i, u).call(this, o, "channel-running-after-dispense");
  }
  async checkData(e, t = "FF") {
    const r = ["02", "30", "30", "81", "43", e, t];
    return await n(this, i, u).call(this, r, "check-data");
  }
  async getDisplayLanguage() {
    return await this.checkData("49");
  }
  async getBeeper() {
    return await this.checkData("5A");
  }
  async getWorkingTemperature() {
    return await this.checkData("54");
  }
  async getIsolationTray() {
    return await this.checkData("42");
  }
  async getProgramVersion() {
    return await this.checkData("50");
  }
  async getFaults() {
    return await this.checkData("53");
  }
  async getMachineId() {
    return await this.checkData("4E");
  }
  async getCurrentTemperature() {
    return await this.checkData("74");
  }
  async getTimeToStandbyAfterCollect() {
    return await this.checkData("46");
  }
  async getTimeToStandbyWithoutCollect() {
    return await this.checkData("48");
  }
  async getElevatorSpeed() {
    return await this.checkData("76");
  }
  async getTemperatureExpiration() {
    return await this.checkData("63");
  }
  async getTemperatureBeforeExpiration() {
    return await this.checkData("65");
  }
  async getTimeBeforeExpirationByTemperature() {
    return await this.checkData("66");
  }
  async getTemperatureScale() {
    return await this.checkData("67");
  }
  async getClockRegisters() {
    return await this.checkData("72");
  }
  async getMachineActivity() {
    return await this.checkData("41");
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getVoltageEngine({ selection: e = 1 } = {}) {
    if (e = parseInt(e), isNaN(e) || e < 1 || e > 126)
      throw new Error("Invalid selection, valid range is 1 to 126");
    const t = (109 + e).toString(16);
    return await this.checkData("47", t);
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getChannelPresence({ selection: e = 1 } = {}) {
    if (e = parseInt(e), isNaN(e) || e < 1 || e > 126)
      throw new Error("Invalid selection, valid range is 1 to 126");
    const t = (109 + e).toString(16);
    return await this.checkData("43", t);
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getPushOverProducts({ selection: e = 1 } = {}) {
    if (e = parseInt(e), isNaN(e) || e < 1 || e > 126)
      throw new Error("Invalid selection, valid range is 1 to 126");
    const t = (109 + e).toString(16);
    return await this.checkData("4F", t);
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getChannelRunningAfterDispense({ selection: e = 1 } = {}) {
    if (e = parseInt(e), isNaN(e) || e < 1 || e > 126)
      throw new Error("Invalid selection, valid range is 1 to 126");
    const t = (109 + e).toString(16);
    return await this.checkData("45", t);
  }
  async setDisplayStandbyMessage({ message: e = "" } = {}) {
    e = e.substring(0, 32);
    const t = n(this, i, I).call(this, e);
    return await n(this, i, D).call(this, "80", t);
  }
  /**
   * @param {string} message
   * @param {number|string} seconds
   * @return {Promise<void>}
   */
  async setDisplayMessageTemporarily({ message: e = "", seconds: t = 1 }) {
    if (e = e.substring(0, 32), t = parseInt(t), isNaN(t) || t < 1 || t > 125) throw new Error("Invalid seconds, valid range is 1 to 125");
    const r = n(this, i, I).call(this, e), a = (128 + t).toString(16);
    return await n(this, i, D).call(this, a, r);
  }
  /**
   * @param {string} message
   * @return {Promise<void>}
   */
  async setDisplayMessageUnlimited({ message: e = "" }) {
    e = e.substring(0, 32);
    const t = n(this, i, I).call(this, e);
    return await n(this, i, D).call(this, "FF", t);
  }
  async programClock({ date: e = /* @__PURE__ */ new Date() } = {}) {
    if (!(e instanceof Date)) throw new Error("Invalid date, must be an instance of Date");
    const t = ["02", "30", "30", "81", "72", ...n(this, i, _t).call(this, e)];
    return await n(this, i, u).call(this, t, "clock");
  }
  /**
   * @param {null|string} event
   * @param {boolean} enable
   * @return {Promise<void>}
   */
  async eventsConfig({ event: e = null, enable: t = !0 } = {}) {
    if (e === null) throw new Error("Invalid event");
    const a = ["02", "30", "30", "81", "41", e, t ? "31" : "30"];
    return await n(this, i, u).call(this, a, "events-config");
  }
  async eventEnable({ event: e = null } = {}) {
    if (e === null) throw new Error("Invalid event");
    const t = parseInt(e, 16);
    if (isNaN(t) || t < 38 || t > 100) throw new Error("Invalid event");
    return await this.eventsConfig({ event: e, enable: !0 });
  }
  async eventDisable({ event: e = null } = {}) {
    if (e === null) throw new Error("Invalid event");
    const t = parseInt(e, 16);
    if (isNaN(t) || t < 38 || t > 100) throw new Error("Invalid event");
    return await this.eventsConfig({ event: e, enable: !1 });
  }
  async sendCustomCode({ code: e = [] } = {}) {
    if (e.length < 5) throw new Error("Invalid code, minimum length is 5");
    return await n(this, i, u).call(this, e, "custom");
  }
  async assignChannels() {
    const e = this.__device.channels.verification.start, t = this.__device.channels.verification.end;
    if (e > t) throw new Error("Invalid range, start must be less than end");
    this.__device.channels.verification.clear(), this.__device.channels.verification.running = !0;
    for (let r = e; r <= t; r++)
      this.__device.channels.verification.current = r, await this.getChannelPresence({ selection: r });
    return new Promise((r) => {
      let a = setInterval(() => {
        this.__device.channels.verification.channels.length === t - e + 1 && (clearInterval(a), this.dispatch("channels", { channels: this.__device.channels.verification.channels }), this.__device.channels.verification.clear(), r(!0));
      }, 500);
    });
  }
}
i = new WeakSet(), $ = function() {
  const e = [
    "dispensing:withdrawal",
    "command-executed",
    "keyboard:pressed",
    "door:event",
    "program:version",
    "machine:faults",
    "clock:registers",
    "machine:activity",
    "check:language",
    "check:beeper",
    "check:isolation-tray",
    "check:engine-voltage",
    "check:push-over",
    "check:extractor-after-dispense",
    "check:standby-after-collect",
    "check:standby-without-collect",
    "check:elevator-speed",
    "check:expiration-by-temperature",
    "check:temperature-before-expiration",
    "check:expiration-after",
    "check:temperature-scale",
    "check:machine-id",
    "temperature:working",
    "temperature:current",
    "jofemar:warning",
    "jofemar:error",
    "serial:message",
    "reset:errors",
    "channels",
    "channel:status",
    "machine:status"
  ];
  for (const t of e)
    this.serialRegisterAvailableListener(t);
}, W = function() {
  this.on("internal:dispense:running", n(this, i, ut).bind(this));
}, g = function() {
  A.add(this);
}, u = function(e, t) {
  return e[3] = this.__internal__.device.hex_number, this.appendToQueue(n(this, i, E).call(this, e), t);
}, E = function(e) {
  let t = this.hexToDec(this.sumHex(e)), r = this.calcCheckSums(t.toString());
  for (let a = 0; a < 2; a++)
    e.push(this.hexMaker(r[a]));
  return e.push("03"), e;
}, q = async function() {
  if (this.__internal__.dispense.elevator.locking_interval) return;
  this.__internal__.dispense.elevator.need_reset && (this.__internal__.dispense.elevator.need_reset = !1, await this.resetWaitingProductRemovedError(), await T(500));
  const e = this;
  return this.__internal__.dispense.status = "elevator-locked", this.__internal__.dispense.elevator.locking_time = 60, new Promise((t) => {
    e.__internal__.dispense.elevator.locking_interval = setInterval(() => {
      e.dispatch("dispensing:withdrawal", {
        elevator: !0,
        seconds: e.__internal__.dispense.elevator.locking_time,
        description: "Please recall products from the elevator"
      }), e.__internal__.dispense.elevator.locking_time -= 1, e.__internal__.dispense.elevator.locking_time <= 0 && (clearInterval(e.__internal__.dispense.elevator.locking_interval), e.__internal__.dispense.elevator.locking_interval = 0, t(!0));
    }, 1e3);
  });
}, O = function(e, t) {
  return t.name = "ok", t.description = "The last command was executed successfully", t.no_code = 1, this.dispatch("command-executed", t), t;
}, j = function(e, t) {
  t.additional = {
    hex: e,
    dec: this.hexToDec(e),
    ascii: null
  };
  const r = {
    30: "0",
    31: "1",
    32: "2",
    33: "3",
    34: "4",
    35: "5",
    36: "6",
    37: "7",
    38: "8",
    39: "9",
    "2a": "*",
    23: "#",
    41: "A",
    42: "B",
    43: "C",
    44: "D"
  };
  return t.additional.ascii = r[e] ?? null, t.name = "Key pressed", t.description = `The key ${t.additional.ascii} was pressed`, t.no_code = 2, this.dispatch("keyboard:pressed", t.additional), t;
}, R = function(e, t) {
  return t.additional = { open: !1 }, t.no_code = 3, e === "4f" ? (t.name = "door open", t.description = "The door was opened", t.additional.open = !0, this.__internal__.device.door_open = !0, this.dispatch("door:event", t.additional)) : e === "43" ? (t.name = "door close", t.description = "The door was closed", t.additional.open = !1, this.__internal__.device.door_open = !1, this.dispatch("door:event", t.additional)) : (t.name = "door event", t.description = "The door event received is unknown", this.dispatch("door:event", { open: t.additional.open, message: t })), t;
}, J = function(e, t) {
  t.no_code = 404;
  let r = e[5] ?? null;
  return r && this.listenOnChannel > 1 && (r = this.hexToDec(r) - this.listenOnChannel + 1, r = this.decToHex(r)), r && (r === "FD" ? (t.no_code = 4, t.name = "channel disconnected", t.description = "The channel is disconnected", t.additional = { active: !1 }) : r === "FC" ? (t.no_code = 5, t.name = "channel connected", t.description = "The channel is connected", t.additional = { active: !0 }) : (t.no_code = 6, t.name = "channel sold out", t.description = "The channel is empty", t.additional = { active: !0 }), this.__device.channels.verification.running && (this.__device.channels.verification.channels.push({
    selection: this.__device.channels.verification.current,
    active: t.additional.active
  }), t.additional.selection = this.__device.channels.verification.current), this.dispatch("channel:status", t.additional)), t;
}, L = function(e, t) {
  t.no_code = 39, t.name = "Program version";
  const r = e.slice(4, 12), a = r.map((o) => String.fromCharCode(this.hexToDec(o))).join("");
  return t.additional = { version: a, hex: r }, t.description = `The program version is ${a}`, this.dispatch("program:version", t.additional), t;
}, U = function(e, t) {
  t.no_code = 39, t.name = "Machine faults", t.description = "No faults detected", t.additional = { no_faults: 0, faults: [] };
  const r = e.slice(4, -3);
  if (r.length > 1 && r[0] !== "30") {
    t.description = "Machine has faults";
    const a = {
      31: "Busy",
      32: "Invalid tray",
      33: "Invalid channel",
      34: "Empty channel",
      35: "Jam in elevator engine",
      36: "Malfunction in the elevator belt or product detector",
      37: "Failure in one of the photo transistors in the cabinet",
      38: "No channels detected",
      39: "Product detector fault",
      41: "Machine display is disconnected",
      42: "Product alarm under elevator",
      43: "Error when elevator approaching to a position",
      44: "Fault in keyboard",
      45: "Eeprom writing error",
      46: "Fault communicating with temperature control",
      47: "The thermometer is disconnected",
      48: "Thermometer programming lost",
      49: "Thermometer faulty",
      "4a": "Channels power consumption detector faulty",
      "4b": "Elevator does not find channel or tray",
      "4c": "Elevator does not find delivery product position",
      "4d": "Interior of elevator blocked",
      "4e": "Error in tester of product detector",
      "4f": "Waiting for product to be removed",
      50: "Product expired by temperature reasons",
      51: "Automatic door faulty",
      59: "Product is expired",
      "5a": "Product is expired",
      61: "Product is expired",
      62: "Product is expired",
      63: "Product is expired",
      64: "Product detector didn't change during its verification test"
    };
    for (const o of r)
      a[o] && (t.additional.faults.push(a[o]), t.additional.no_faults++);
  }
  return this.dispatch("machine:faults", t.additional), t;
}, H = function(e, t) {
  t.no_code = 40, t.name = "Clock registers", t.description = "Clock registers";
  const r = e.slice(4, -3), a = r.map((C) => String.fromCharCode(this.hexToDec(C))).join(""), [o, c] = a.split(" "), [s, v] = o.split(":"), [y, k, b] = c.split("-"), x = new Date(
    2e3 + parseInt(b),
    parseInt(k) - 1,
    parseInt(y),
    parseInt(s),
    parseInt(v)
  );
  return t.additional = {
    day: y,
    month: k,
    year: b,
    hours: s,
    minutes: v,
    formatted: a,
    date: x,
    hex: r
  }, this.dispatch("clock:registers", t.additional), t;
}, V = function(e, t) {
  t.no_code = 41, t.name = "Machine activity", t.description = "Events from read machine activity";
  const r = String.fromCharCode(this.hexToDec(e[4]));
  if (r !== "0") {
    const a = e.slice(5, -3);
    if (r === "T" && a.length === 4) {
      const o = String.fromCharCode(this.hexToDec(a[0])), c = String.fromCharCode(this.hexToDec(a[1])), s = String.fromCharCode(this.hexToDec(a[3]));
      t.additional = {
        ascii: r,
        type: "DU.d",
        dozens: o,
        units: c,
        decimals: s,
        time: parseFloat(`${o}${c}.${s}`),
        meaning: "Extraction time (in seconds)"
      };
    } else if (["B", "D", "E", "F", "G"].includes(r) && a.length === 3) {
      const o = String.fromCharCode(this.hexToDec(a[0])), c = String.fromCharCode(this.hexToDec(a[1])), s = String.fromCharCode(this.hexToDec(a[2])), v = parseInt(`${o}${c}${s}`), y = {
        B: "Error on going to tray channel",
        D: "Error on product detector",
        E: "Extraction of channel ok",
        F: "Error on engine intensity detection",
        G: "Error on product exit door"
      };
      t.additional = {
        type: "HDU",
        hundreds: o,
        dozens: c,
        decimals: s,
        channel: v,
        selection: v - 109,
        ascii: r,
        meaning: y[r] ?? "Unknown"
      };
    } else if (a.length === 13) {
      const o = a.map((ft) => String.fromCharCode(this.hexToDec(ft))).join(""), c = parseInt(o.slice(0, 2)), s = parseInt(o.slice(2, 4)), v = parseInt(o.slice(4, 6)), y = parseInt(o.slice(7, 9)), k = parseInt(o.slice(9, 11)) - 1, b = 2e3 + parseInt(o.slice(11, 13)), x = new Date(b, k, y, c, s, v), C = {
        A: "Attempt to close product exit door",
        C: "Closing of exterior door",
        H: "Error on opening of product exit door",
        I: "New attempt to arrive at product exit position after an error on first attempt",
        J: "Power on cooling unit",
        K: "Power off cooling unit",
        L: "Start of defrosting",
        M: "End of defrosting",
        O: "Opening of exterior door",
        R: "Memory reset",
        S: "Error on going to product exit position",
        Y: "Power on machine",
        Z: "Power off machine",
        c: "Closing of inner door",
        e: "New attempt to extract from channel due no product detection when elevator arrived to product exit position",
        o: "Opening of inner door"
      };
      t.additional = {
        type: "hhmmssWddMMAA",
        date: x,
        hex: a,
        formatted: x.toLocaleString(),
        ascii: r,
        meaning: C[r] ?? "Unknown"
      };
    }
  }
  return this.dispatch("machine:activity", t.additional), t;
}, K = function(e, t) {
  const r = {
    30: "Spanish",
    31: "English",
    32: "French"
  };
  return t.no_code = 42, t.name = "Language", t.description = `The language is ${r[e] ?? "unknown"}`, t.additional = {
    hex: e,
    language: r[e] ?? "unknown"
  }, this.dispatch("check:language", t.additional), t;
}, G = function(e, t) {
  return t.no_code = 43, t.name = "Beeper", t.description = `The beeper is ${e === "30" ? "on" : "off"}`, t.additional = {
    hex: e,
    beeper: e === "30"
  }, this.dispatch("check:beeper", t.additional), t;
}, z = function(e, t) {
  t.no_code = 44, t.name = "Isolation tray", t.description = "Isolation tray";
  const r = this.hexToDec(e) - 139;
  return t.additional = {
    hex: e,
    tray: r
  }, this.dispatch("check:isolation-tray", t.additional), t;
}, Q = function(e, t) {
  t.no_code = 45, t.name = "Engine voltage", t.description = "Engine voltage";
  const r = (this.hexToDec(e) - 128) / 2 + 5;
  return t.additional = {
    hex: e,
    voltage: r
  }, this.dispatch("check:engine-voltage", t.additional), t;
}, Y = function(e, t) {
  t.no_code = 46, t.name = "Push over", t.description = "Push over";
  const r = e === "30";
  return t.additional = {
    hex: e,
    push: r
  }, this.dispatch("check:push-over", t.additional), t;
}, Z = function(e, t) {
  t.no_code = 47, t.name = "Extractor after dispense", t.description = "Extractor after dispense";
  const r = (this.hexToDec(e) - 128) / 10;
  return t.additional = {
    hex: e,
    seconds: r
  }, this.dispatch("check:extractor-after-dispense", t.additional), t;
}, X = function(e, t) {
  t.no_code = 48, t.name = "Standby after collect", t.description = "Time to standby after collect product";
  const r = this.hexToDec(e) - 128;
  return t.additional = {
    hex: e,
    seconds: r
  }, this.dispatch("check:standby-after-collect", t.additional), t;
}, tt = function(e, t) {
  t.no_code = 49, t.name = "Standby without collect", t.description = "Time to standby when product delivery is not collected";
  const r = this.hexToDec(e) - 128;
  return t.additional = {
    hex: e,
    minutes: r
  }, this.dispatch("check:standby-without-collect", t.additional), t;
}, et = function(e, t) {
  t.no_code = 50, t.name = "Elevator speed", t.description = "Elevator speed";
  const r = e === "30" ? "low" : "high";
  return t.additional = {
    hex: e,
    speed: r
  }, this.dispatch("check:elevator-speed", t.additional), t;
}, it = function(e, t) {
  t.no_code = 51, t.name = "Temperature expiration", t.description = "Temperature expiration";
  const r = e === "31";
  return t.additional = {
    hex: e,
    enabled: r
  }, this.dispatch("check:expiration-by-temperature", t.additional), t;
}, nt = function(e, t) {
  t.no_code = 52, t.name = "Temperature before expiration", t.description = "Temperature before expiration";
  const r = (this.hexToDec(e) - 128) / 2;
  return t.additional = {
    hex: e,
    temperature: r
  }, this.dispatch("check:temperature-before-expiration", t.additional), t;
}, rt = function(e, t) {
  t.no_code = 53, t.name = "Time before expiration", t.description = "Time before expiration";
  const r = this.hexToDec(e) - 128;
  return t.additional = {
    hex: e,
    minutes: r
  }, this.dispatch("check:expiration-after", t.additional), t;
}, at = function(e, t) {
  t.no_code = 54, t.name = "Temperature scale", t.description = "Temperature scale";
  const r = e === "43" ? "Celsius" : "Fahrenheit";
  return t.additional = {
    hex: e,
    scale: r
  }, this.dispatch("check:temperature-scale", t.additional), t;
}, ot = function(e, t) {
  return t.no_code = 54, t.name = "Machine ID", t.description = "Machine ID", t.additional = { hex: e[4], full_hex: e }, this.dispatch("check:machine-id", t.additional), t;
}, ct = function(e, t) {
  return t.no_code = 7, t.name = "working temperature", t.description = `The working temperature is ${e}`, t.additional = {
    hex: e,
    temperature: {
      traditional: (this.hexToDec(e) - this.hexToDec("80")) / 2,
      ice_plus: (this.hexToDec(e) - this.hexToDec("80")) / 2 - 25.5
    }
  }, this.dispatch("temperature:working", t.additional), t;
}, st = function(e, t) {
  return t.no_code = 8, t.name = "current temperature", t.additional = {
    sign: null,
    tens: null,
    units: null,
    decimals: null,
    type_degrees: null,
    formatted: null,
    decimal_point: e[7] === "2e" ? "." : null,
    degrees: e[9] === "7f" ? "°" : null,
    error: null
  }, e[4] === "2b" ? t.additional.sign = e[4] = "+" : ["2e", "2d"].includes(e[4]) ? t.additional.sign = e[4] = "-" : e[4] === "20" && (t.additional.error = "Error in thermometer"), this.hexToDec(e[5]) >= 48 && this.hexToDec(e[5]) <= 57 ? t.additional.tens = this.hexToDec(e[5]) - 48 : e[5] === "2a" && (t.additional.error = "Error in thermometer"), this.hexToDec(e[6]) >= 48 && this.hexToDec(e[6]) <= 57 ? t.additional.units = this.hexToDec(e[6]) - 48 : e[6] === "2a" && (t.additional.error = "Error in thermometer"), this.hexToDec(e[8]) >= 48 && this.hexToDec(e[8]) <= 57 ? t.additional.decimals = this.hexToDec(e[8]) - 48 : e[8] === "2a" && (t.additional.error = "Error in thermometer"), e[10] === "43" ? t.additional.type_degrees = "C" : e[10] === "46" && (t.additional.type_degrees = "F"), t.additional.error === "Error in thermometer" ? (t.additional.formatted = "Error in thermometer", t.description = "The current temperature cannot be read because there is an error in the thermometer") : (t.additional.formatted = (t.additional.sign ?? "") + (t.additional.tens ?? "") + (t.additional.units ?? "") + (t.additional.decimal_point ?? "") + (t.additional.decimals ?? "") + (t.additional.degrees ?? "") + (t.additional.type_degrees ?? ""), t.description = `The current temperature is ${t.additional.formatted}`), this.dispatch("temperature:current", t.additional), t;
}, ht = function(e, t, r = 128) {
  if (e[1] && (t.additional.machine.hex = e[1], t.additional.machine.dec = this.hexToDec(e[1]) - r), !(e[1] && e[2]))
    t = n(this, i, O).call(this, e, t);
  else
    switch (e[2]) {
      case "54":
        t.request = "--automatic", t = n(this, i, j).call(this, e[3], t);
        break;
      case "50":
        t.request = "--automatic", t = n(this, i, R).call(this, e[3], t);
        break;
      case "43":
        switch (t.request = "check-data", e[3]) {
          case "41":
            t = n(this, i, V).call(this, e, t);
            break;
          case "43":
            t.request = "channel-status", t = n(this, i, J).call(this, e, t);
            break;
          case "50":
            t = n(this, i, L).call(this, e, t);
            break;
          case "53":
            t = n(this, i, U).call(this, e, t);
            break;
          case "54":
            t.request = "working-temperature", t = n(this, i, ct).call(this, e[4], t);
            break;
          case "72":
            t = n(this, i, H).call(this, e, t);
            break;
          case "74":
            t.request = "current-temperature", t = n(this, i, st).call(this, e, t);
            break;
          case "49":
            t = n(this, i, K).call(this, e[4], t);
            break;
          case "5a":
            t = n(this, i, G).call(this, e[4], t);
            break;
          case "42":
            t = n(this, i, z).call(this, e[4], t);
            break;
          case "47":
            t = n(this, i, Q).call(this, e[4], t);
            break;
          case "4e":
            t = n(this, i, ot).call(this, e, t);
            break;
          case "4f":
            t = n(this, i, Y).call(this, e[4], t);
            break;
          case "45":
            t = n(this, i, Z).call(this, e[4], t);
            break;
          case "46":
            t = n(this, i, X).call(this, e[4], t);
            break;
          case "48":
            t = n(this, i, tt).call(this, e[4], t);
            break;
          case "76":
            t = n(this, i, et).call(this, e[4], t);
            break;
          case "63":
            t = n(this, i, it).call(this, e[4], t);
            break;
          case "65":
            t = n(this, i, nt).call(this, e[4], t);
            break;
          case "66":
            t = n(this, i, rt).call(this, e[4], t);
            break;
          case "67":
            t = n(this, i, at).call(this, e[4], t);
            break;
        }
        break;
    }
  return t;
}, _ = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !0);
}, l = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !1);
}, m = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = "elevator-locked");
}, /**
 * Dispatch a warning message
 * @param {null|string} type
 * @param {string} severity
 */
d = function({ type: e = null, severity: t = "low" } = {}) {
  this.dispatch("jofemar:warning", { type: e, severity: t });
}, /**
 * Dispatch an error message
 * @param {null|string} type
 * @param {string} severity
 */
f = function({ type: e = null, severity: t = "high" } = {}) {
  this.dispatch("jofemar:error", { type: e, severity: t });
}, lt = function(e, t) {
  if (t.request = "status", e[1] && !e[2]) {
    switch (e[1]) {
      case "30":
        t.name = "Machine ready", t.description = "The machine is ready for instructions", t.no_code = 9, n(this, i, _).call(this);
        break;
      case "31":
        t.name = "Machine busy", t.description = "The machine is busy right now", t.no_code = 10;
        break;
      case "32":
        t.name = "Invalid tray", t.description = "The tray requested is invalid", t.no_code = 11, n(this, i, l).call(this), n(this, i, d).call(this, { type: "invalid-tray" });
        break;
      case "33":
        t.name = "Invalid channel", t.description = "The channel requested is invalid", t.no_code = 12, n(this, i, l).call(this), n(this, i, d).call(this, { type: "invalid-channel" });
        break;
      case "34":
        t.name = "Empty channel", t.description = "The channel requested is empty", t.no_code = 13, n(this, i, l).call(this), n(this, i, d).call(this, { type: "empty-channel" });
        break;
      case "35":
        t.name = "Jam", t.description = "Jam in elevator engine", t.no_code = 14, n(this, i, l).call(this), n(this, i, f).call(this, { type: "jam" });
        break;
      case "36":
        t.name = "Malfunction", t.description = "Malfunction in the elevator belt or product detector", t.no_code = 15, n(this, i, l).call(this), n(this, i, f).call(this, { type: "malfunction" });
        break;
      case "37":
        t.name = "Photo transistors", t.description = "Failure in one of the photo transistors in the cabinet", t.no_code = 16, n(this, i, l).call(this), n(this, i, f).call(this, { type: "photo-transistors" });
        break;
      case "38":
        t.name = "Without channels", t.description = "No channels detected", t.no_code = 17, n(this, i, l).call(this), n(this, i, f).call(this, { type: "without-channels" });
        break;
      case "39":
        t.name = "Product detector fault", t.description = "Product detector fault", t.no_code = 18, n(this, i, m).call(this), n(this, i, d).call(this, { type: "fault-product-detector" });
        break;
      case "41":
        t.name = "Fault in 485 BUS", t.description = "Machine display is disconnected", t.no_code = 19, n(this, i, _).call(this), n(this, i, d).call(this, { type: "display-disconnected" });
        break;
      case "42":
        t.name = "Product under elevator", t.description = "Product alarm under elevator", t.no_code = 20, n(this, i, l).call(this), n(this, i, d).call(this, { type: "product-under-elevator" });
        break;
      case "43":
        t.name = "Error when elevator approaching to a position", t.description = "Error when elevator approaching to a position", t.no_code = 21, n(this, i, _).call(this), n(this, i, d).call(this, { type: "error-approaching-position", severity: "high" });
        break;
      case "44":
        t.name = "Fault in keyboard", t.description = "Fault in keyboard", t.no_code = 22, n(this, i, l).call(this), n(this, i, f).call(this, { type: "fault-keyboard" });
        break;
      case "45":
        t.name = "Eeprom writing error", t.description = "Eeprom writing error", t.no_code = 23, n(this, i, l).call(this), n(this, i, f).call(this, { type: "eeprom-writing-error", severity: "critical" });
        break;
      case "46":
        t.name = "Fault communicating with temperature control", t.description = "Fault communicating with temperature control", t.no_code = 24, n(this, i, _).call(this), n(this, i, d).call(this, { type: "fault-temperature-control" });
        break;
      case "47":
        t.name = "Thermometer disconnected", t.description = "The thermometer is disconnected", t.no_code = 25, n(this, i, _).call(this), n(this, i, d).call(this, { type: "thermometer-disconnected" });
        break;
      case "48":
        t.name = "Thermometer programming lost", t.description = "Thermometer programming lost", t.no_code = 26, n(this, i, _).call(this), n(this, i, d).call(this, { type: "thermometer-programming-lost" });
        break;
      case "49":
        t.name = "Thermometer faulty", t.description = "Thermometer faulty", t.no_code = 27, n(this, i, _).call(this), n(this, i, d).call(this, { type: "thermometer-faulty" });
        break;
      case "4a":
        t.name = "Channels power consumption detector faulty", t.description = "Channels power consumption detector faulty", t.no_code = 28, n(this, i, l).call(this), n(this, i, f).call(this, { type: "channels-power-consumption-detector-faulty", severity: "critical" });
        break;
      case "4b":
        t.name = "Elevator does not find channel or tray", t.description = "Elevator does not find channel or tray", t.no_code = 29, n(this, i, l).call(this), n(this, i, d).call(this, { type: "elevator-not-find-channel-tray" });
        break;
      case "4c":
        t.name = "Elevator does not find delivery product position", t.description = "Elevator does not find delivery product position", t.no_code = 30, n(this, i, l).call(this), n(this, i, f).call(this, { type: "elevator-not-find-delivery-position" });
        break;
      case "4d":
        t.name = "Interior of elevator blocked", t.description = "Interior of elevator blocked", t.no_code = 31, n(this, i, m).call(this), this.__internal__.dispense.elevator.need_reset || (this.__internal__.dispense.elevator.need_reset = !0), n(this, i, f).call(this, { type: "interior-elevator-blocked", severity: "low" });
        break;
      case "4e":
        t.name = "Error in tester of product detector", t.description = "Error in tester of product detector", t.no_code = 32, n(this, i, l).call(this), n(this, i, f).call(this, { type: "error-tester-product-detector" });
        break;
      case "4f":
        t.name = "Waiting for product to be removed", t.description = "Waiting for product to be removed", t.no_code = 33, n(this, i, m).call(this);
        break;
      case "50":
        t.name = "Product expired by temperature reasons", t.description = "Product expired by temperature reasons", t.no_code = 34, n(this, i, _).call(this), n(this, i, d).call(this, { type: "product-expired-temperature" });
        break;
      case "51":
        t.name = "Automatic door faulty", t.description = "Automatic door faulty", t.no_code = 35, n(this, i, _).call(this), n(this, i, d).call(this, { type: "automatic-door-faulty" });
        break;
      case "59":
      case "5a":
      case "61":
      case "62":
      case "63":
        switch (t.name = "Product is expired", t.description = "Product is expired", t.additional = { nsf_alarm: 1 }, e[1]) {
          case "5a":
            t.additional.nsf_alarm = 2;
            break;
          case "61":
            t.additional.nsf_alarm = 3;
            break;
          case "62":
            t.additional.nsf_alarm = 4;
            break;
          case "63":
            t.additional.nsf_alarm = 5;
            break;
        }
        t.no_code = 36, n(this, i, _).call(this), n(this, i, d).call(this, { type: "product-expired" });
        break;
      case "64":
        t.name = "Product detector didn't change during its verification test", t.description = "Product detector didn't change during its verification test", t.no_code = 37, n(this, i, _).call(this), n(this, i, d).call(this, { type: "automatic-door-faulty" });
        break;
    }
    this.dispatch("machine:status", t);
  } else
    t.name = "executed", t.description = "The last command was executed successfully", t.no_code = 8, !e[1] && this.__internal__.dispense.dispensing && n(this, i, l).call(this);
  return t;
}, dt = function(e) {
  if (e = parseInt(e) + 109, e = e.toString(), e.length !== 3)
    throw new Error("Invalid selection");
  const t = (parseInt(e.substring(0, 2)) + 128).toString(16).padStart(2, "0");
  return { channel: (parseInt(e.substring(2, 3)) + 128).toString(16).padStart(2, "0"), tray: t };
}, pt = function() {
  this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.dispense.timeout = 0, this.__internal__.dispense.interval = 0;
}, ut = function() {
  this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval);
  const e = this;
  e.__internal__.dispense.timeout = setTimeout(() => {
    e.__internal__.dispense.interval = setInterval(() => {
      e.status().then(() => {
      });
    }, e.__internal__.dispense.interval_time);
  }, e.__internal__.dispense.timeout_time);
}, w = async function(e) {
  const t = ["02", "30", "30", "81", "52", e, "FF"];
  return await n(this, i, u).call(this, t, "reset");
}, S = function() {
  const e = this.__device.type === "iceplus" ? B(40) : B(25), t = /* @__PURE__ */ new Date(), r = 1e3 * e + t.getTime(), a = new Date(r);
  this.dispatch("reset:errors", {
    description: "Resetting machine errors",
    duration: e,
    started_at: t,
    finished_at: a
  });
}, M = async function(e) {
  const t = ["02", "30", "30", "81", "4C", e, "FF"];
  return await n(this, i, u).call(this, t, "lights");
}, D = async function(e = "80", t = []) {
  const r = ["02", "30", "30", "81", "44", e, ...t];
  return await n(this, i, u).call(this, r, "display");
}, I = function(e = "") {
  e = e.padEnd(32, " ");
  const t = [];
  for (let r = 0; r < 32; r++)
    t.push(e.charCodeAt(r).toString(16));
  return t;
}, _t = function(e) {
  if (!(e instanceof Date)) throw new Error("Invalid date, must be an instance of Date");
  const t = e.getHours().toString().padStart(2, "0"), r = e.getMinutes().toString().padStart(2, "0"), a = e.getDate().toString().padStart(2, "0"), o = (e.getMonth() + 1).toString().padStart(2, "0"), c = e.getFullYear().toString().substring(2, 4), s = `${t}:${r} ${a}-${o}-${c}`, v = [];
  for (let y = 0; y < 14; y++)
    v.push(s.charCodeAt(y).toString(16));
  return v;
};
export {
  Tt as Jofemar
};
