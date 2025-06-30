var se = Object.defineProperty;
var O = (p) => {
  throw TypeError(p);
};
var de = (p, h, t) => h in p ? se(p, h, { enumerable: !0, configurable: !0, writable: !0, value: t }) : p[h] = t;
var M = (p, h, t) => de(p, typeof h != "symbol" ? h + "" : h, t), pe = (p, h, t) => h.has(p) || O("Cannot " + t);
var I = (p, h, t) => h.has(p) ? O("Cannot add the same private member more than once") : h instanceof WeakSet ? h.add(p) : h.set(p, t);
var i = (p, h, t) => (pe(p, h, "access private method"), t);
import { K as ue, w, g as P } from "./kernel-CkdAehfH.js";
import { o as a } from "./relay-CsdB0FSa.js";
import { h as Q } from "./webserial-core-DoXvp5fR.js";
var n, S, g, A, B, W, F, q, R, $, N, j, L, V, J, U, K, H, z, G, Y, Z, X, ee, te, ne, ie, re, ae, u, s, b, d, _, oe, ce, he, C, E, D;
class Ce extends ue {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: r = 1,
    device_listen_on_port: o = 1,
    type: c = "esplus",
    support_cart: l = !0
  } = {}) {
    super({ filters: t, config_port: e, no_device: r, device_listen_on_port: o });
    I(this, n);
    M(this, "__device", {
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
    if (this.__internal__.device.type = "jofemar", Q.getCustom(this.typeDevice, r))
      throw new Error(`Device ${this.typeDevice} ${r} already exists`);
    this.__internal__.dispense.must_response = !0, this.__internal__.time.response_general = 800, this.__internal__.time.response_engines = 800, this.__internal__.dispense.limit_counter = 40, this.__internal__.dispense.timeout = 0, this.__internal__.dispense.timeout_time = 4e3, this.__internal__.dispense.interval = 0, this.__internal__.dispense.interval_time = 1e3, this.__internal__.device.hex_number = (128 + this.listenOnChannel).toString(16), this.__internal__.device.door_open = !1, this.__internal__.dispense.elevator = {
      locking_time: 60,
      locking_interval: 0,
      need_reset: !1
    }, this.deviceType = c, this.supportCart = l, i(this, n, S).call(this), Q.add(this), i(this, n, g).call(this);
  }
  set startChannelVerification(t) {
    const e = parseInt(t);
    if (isNaN(e)) throw new Error("Invalid start channel verification, must be a number");
    if (e < 1 || e > 126) throw new Error("Invalid start channel verification, valid range is 1 to 126");
    this.__device.channels.verification.start = e;
  }
  set endChannelVerification(t) {
    const e = parseInt(t);
    if (isNaN(e)) throw new Error("Invalid end channel verification, must be a number");
    if (e < 1 || e > 126) throw new Error("Invalid end channel verification, valid range is 1 to 126");
    this.__device.channels.verification.end = e;
  }
  set listenOnChannel(t) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 31) throw new Error("Invalid port number, valid range is 1 to 31");
    this.__internal__.device.listen_on_port = t, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(t), this.__internal__.device.hex_number = (128 + t).toString(16);
  }
  /**
   * @deperecated
   * @param {string|number} channel
   */
  set listenOnPort(t) {
    this.listenOnChannel = t;
  }
  set deviceType(t) {
    if (typeof t != "string") throw new Error("Invalid device type, must be a string");
    this.__device.type = t;
  }
  set supportCart(t) {
    if (typeof t != "boolean") throw new Error("Invalid support cart, must be a boolean");
    this.__device.support_cart = t;
  }
  serialSetConnectionConstant(t = 1) {
    return a.connection({ channel: t });
  }
  serialMessage(t) {
    let r = {
      code: t,
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
    switch (t[0]) {
      case "02":
        r = i(this, n, ae).call(this, t, r, 128);
        break;
      case "06":
        r = i(this, n, oe).call(this, t, r);
        break;
      case "15":
        r.name = "Checksum error", r.description = "The calculated checksum does not match the received checksum", r.no_code = 38, i(this, n, s).call(this);
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
  async dispense({ selection: t = 1, cart: e = !1 } = {}) {
    const r = a.dispense({ selection: t, cart: e, machineChannel: this.listenOnChannel }), o = r[5], c = r[6];
    this.__internal__.dispense.backup_dispense = {
      selection: t,
      cart: e,
      channel: c,
      tray: o
    };
    let l;
    do
      l = await this.internalDispense(r), i(this, n, ce).call(this), l.error === "elevator-locked" ? await i(this, n, A).call(this) : l.error === "no-response" && await w(1e3);
    while (["elevator-locked", "no-response"].includes(l.error));
    return this.__internal__.dispense.backup_dispense = {}, l;
  }
  internalClearSensing() {
    super.internalClearSensing(), this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.serial.queue.length > 0 && (this.__internal__.serial.queue = this.__internal__.serial.queue.filter((t) => t.type !== "status"));
  }
  async endDispense() {
    const t = a.endCartDispense({ machineChannel: this.listenOnChannel });
    return await this.internalDispense(t);
  }
  async collect() {
    return await this.appendToQueue(a.collect({ machineChannel: this.listenOnChannel }), "collect");
  }
  async resetSoldOutErrors() {
    return await i(this, n, C).call(this, "soldOut");
  }
  async resetWaitingProductRemovedError() {
    return await i(this, n, C).call(this, "waiting");
  }
  async resetMachineErrors() {
    return this.__internal__.serial.queue.length === 0 ? (i(this, n, E).call(this), await i(this, n, C).call(this, "machine")) : new Promise((t) => {
      const e = setInterval(async () => {
        this.__internal__.serial.queue.length > 0 || (clearInterval(e), await i(this, n, C).call(this, "machine"), i(this, n, E).call(this), t(!0));
      }, 100);
    });
  }
  async resetAllErrors() {
    return await this.resetSoldOutErrors(), await w(100), await this.resetWaitingProductRemovedError(), await w(100), await this.resetMachineErrors();
  }
  async status() {
    return await this.appendToQueue(a.status({ machineChannel: this.listenOnChannel }), "status");
  }
  async lightsOn() {
    return await i(this, n, D).call(this, "on");
  }
  async lightsOff() {
    return await i(this, n, D).call(this, "off");
  }
  async program(t, e) {
    return await this.appendToQueue(
      a.program({
        machineChannel: this.listenOnChannel,
        param1: t,
        param2: e
      }),
      "program"
    );
  }
  async programDisplayLanguage({ language: t = "spanish" } = {}) {
    return await this.appendToQueue(
      a.programDisplayLanguage({
        machineChannel: this.listenOnChannel,
        language: t
      }),
      "program"
    );
  }
  async programBeeper({ enable: t = !0 } = {}) {
    return await this.appendToQueue(
      a.programBeeper({
        machineChannel: this.listenOnChannel,
        enable: t
      }),
      "program"
    );
  }
  async programDisableWorkingTemperature() {
    if (this.__device.type === "iceplus") throw new Error("IcePlus does not support disable working temperature");
    return await this.appendToQueue(
      a.programDisableWorkingTemperature({
        machineChannel: this.listenOnChannel
      }),
      "program"
    );
  }
  async programDisableThermometer() {
    return await this.appendToQueue(
      a.programDisableThermometer({
        machineChannel: this.listenOnChannel
      }),
      "program"
    );
  }
  /**
   * Program the machine to work with a specific temperature
   * @param {number|string} degrees
   * @return {Promise<void>}
   */
  async programWorkingTemperature({ degrees: t = 0.5 } = {}) {
    return await this.appendToQueue(
      a.programWorkingTemperature({
        machineChannel: this.listenOnChannel,
        degrees: t,
        machineType: this.__device.type
      }),
      "program"
    );
  }
  /**
   * @param {number|string} tray
   * @return {Promise<void>}
   */
  async programIsolationTray({ tray: t = 0 } = {}) {
    return await this.appendToQueue(
      a.programIsolationTray({
        machineChannel: this.listenOnChannel,
        tray: t
      }),
      "program"
    );
  }
  /**
   * @param {number|string} seconds
   * @return {Promise<*>}
   */
  async programTimeToStandbyAfterCollect({ seconds: t = 15 } = {}) {
    return await this.appendToQueue(
      a.programTimeToStandbyAfterCollect({
        machineChannel: this.listenOnChannel,
        seconds: t
      }),
      "program"
    );
  }
  /**
   * @param {number|string} seconds
   * @return {Promise<*>}
   */
  async programTimeToStandbyWithoutCollect({ minutes: t = 1 } = {}) {
    return await this.appendToQueue(
      a.programTimeToStandbyWithoutCollect({
        machineChannel: this.listenOnChannel,
        minutes: t
      }),
      "program"
    );
  }
  async programElevatorSpeed({ speed: t = "high" } = {}) {
    return await this.appendToQueue(
      a.programElevatorSpeed({
        machineChannel: this.listenOnChannel,
        speed: t
      }),
      "program"
    );
  }
  async programTemperatureExpiration({ enable: t = !1 } = {}) {
    return await this.appendToQueue(
      a.programTemperatureExpiration({
        machineChannel: this.listenOnChannel,
        enable: t
      }),
      "program"
    );
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
  async programMachineAddress({ address: t = 1 } = {}) {
    return await this.appendToQueue(
      a.programMachineAddress({
        machineChannel: this.listenOnChannel,
        address: t
      }),
      "program"
    );
  }
  /**
   * @param {number|string} degrees
   * @return {Promise<*>}
   */
  async programTemperatureBeforeExpiration({ degrees: t = 0.5 } = {}) {
    return await this.appendToQueue(
      a.programTemperatureBeforeExpiration({
        machineChannel: this.listenOnChannel,
        degrees: t
      }),
      "program"
    );
  }
  /**
   * @param {number|string} minutes
   * @return {Promise<*>}
   */
  async programTimeBeforeExpirationByTemperature({ minutes: t = 1 } = {}) {
    return await this.appendToQueue(
      a.programTimeBeforeExpirationByTemperature({
        machineChannel: this.listenOnChannel,
        minutes: t
      }),
      "program"
    );
  }
  async programTemperatureScale({ scale: t = "celsius" } = {}) {
    return await this.appendToQueue(
      a.programTemperatureScale({
        machineChannel: this.listenOnChannel,
        scale: t
      }),
      "program"
    );
  }
  /**
   * @param {number|string} selection
   * @param {number|string} voltage
   * @return {Promise<void>}
   */
  async programVoltageEngine({ selection: t = 1, voltage: e = 5 } = {}) {
    return await this.appendToQueue(
      a.programVoltageEngine({
        machineChannel: this.listenOnChannel,
        selection: t,
        voltage: e
      }),
      "voltage-engine"
    );
  }
  /**
   * @param {number|string} selection
   * @param {boolean} enable
   * @return {Promise<void>}
   */
  async programPushOverProducts({ selection: t = 1, enable: e = !0 } = {}) {
    return await this.appendToQueue(
      a.programPushOverProducts({
        machineChannel: this.listenOnChannel,
        selection: t,
        enable: e
      }),
      "push-over-products"
    );
  }
  /**
   * @param {number|string} selection
   * @param {number|string} seconds
   * @return {Promise<void>}
   */
  async programChannelRunningAfterDispense({ selection: t = 1, seconds: e = 0 } = {}) {
    return await this.appendToQueue(
      a.programChannelRunningAfterDispense({
        machineChannel: this.listenOnChannel,
        selection: t,
        seconds: e
      }),
      "channel-running-after-dispense"
    );
  }
  async checkData(t, e = "FF") {
    return await this.appendToQueue(
      a.checkData({
        machineChannel: this.listenOnChannel,
        type: t,
        aux: e
      }),
      "check-data"
    );
  }
  async getDisplayLanguage() {
    return await this.appendToQueue(
      a.getDisplayLanguage({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getBeeper() {
    return await this.appendToQueue(a.getBeeper({ machineChannel: this.listenOnChannel }), "check-data");
  }
  async getWorkingTemperature() {
    return await this.appendToQueue(
      a.getWorkingTemperature({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getIsolationTray() {
    return await this.appendToQueue(
      a.getIsolationTray({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getProgramVersion() {
    return await this.appendToQueue(
      a.getProgramVersion({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getFaults() {
    return await this.appendToQueue(a.getFaults({ machineChannel: this.listenOnChannel }), "check-data");
  }
  async getMachineId() {
    return await this.appendToQueue(
      a.getMachineId({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getCurrentTemperature() {
    return await this.appendToQueue(
      a.getCurrentTemperature({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTimeToStandbyAfterCollect() {
    return await this.appendToQueue(
      a.getTimeToStandbyAfterCollect({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTimeToStandbyWithoutCollect() {
    return await this.appendToQueue(
      a.getTimeToStandbyWithoutCollect({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getElevatorSpeed() {
    return await this.appendToQueue(
      a.getElevatorSpeed({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTemperatureExpiration() {
    return await this.appendToQueue(
      a.getTemperatureExpiration({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTemperatureBeforeExpiration() {
    return await this.appendToQueue(
      a.getTemperatureBeforeExpiration({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTimeBeforeExpirationByTemperature() {
    return await this.appendToQueue(
      a.getTimeBeforeExpirationByTemperature({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTemperatureScale() {
    return await this.appendToQueue(
      a.getTemperatureScale({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getClockRegisters() {
    return await this.appendToQueue(
      a.getClockRegisters({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getMachineActivity() {
    return await this.appendToQueue(
      a.getMachineActivity({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getVoltageEngine({ selection: t = 1 } = {}) {
    return await this.appendToQueue(
      a.getVoltageEngine({
        machineChannel: this.listenOnChannel,
        selection: t
      }),
      "check-data"
    );
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getChannelPresence({ selection: t = 1 } = {}) {
    return await this.appendToQueue(
      a.getChannelPresence({
        machineChannel: this.listenOnChannel,
        selection: t
      }),
      "check-data"
    );
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getPushOverProducts({ selection: t = 1 } = {}) {
    return await this.appendToQueue(
      a.getPushOverProducts({
        machineChannel: this.listenOnChannel,
        selection: t
      }),
      "check-data"
    );
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getChannelRunningAfterDispense({ selection: t = 1 } = {}) {
    return await this.appendToQueue(
      a.getChannelRunningAfterDispense({
        machineChannel: this.listenOnChannel,
        selection: t
      }),
      "check-data"
    );
  }
  async setDisplayStandbyMessage({ message: t = "" } = {}) {
    return await this.appendToQueue(
      a.setDisplayStandbyMessage({
        machineChannel: this.listenOnChannel,
        message: t
      }),
      "display"
    );
  }
  /**
   * @param {string} message
   * @param {number|string} seconds
   * @return {Promise<void>}
   */
  async setDisplayMessageTemporarily({ message: t = "", seconds: e = 1 }) {
    return this.appendToQueue(
      a.setDisplayMessageTemporarily({
        machineChannel: this.listenOnChannel,
        message: t,
        seconds: e
      }),
      "display"
    );
  }
  /**
   * @param {string} message
   * @return {Promise<void>}
   */
  async setDisplayMessageUnlimited({ message: t = "" }) {
    return await this.appendToQueue(
      a.setDisplayMessageUnlimited({
        machineChannel: this.listenOnChannel,
        message: t
      }),
      "display"
    );
  }
  async programClock({ date: t = /* @__PURE__ */ new Date() } = {}) {
    return await this.appendToQueue(
      a.programClock({
        machineChannel: this.listenOnChannel,
        date: t
      }),
      "clock"
    );
  }
  /**
   * @param {null|string} event
   * @param {boolean} enable
   * @return {Promise<void>}
   */
  async eventsConfig({ event: t = null, enable: e = !0 } = {}) {
    return await this.appendToQueue(
      a.eventsConfig({
        machineChannel: this.listenOnChannel,
        event: t,
        enable: e
      }),
      "events-config"
    );
  }
  async eventEnable({ event: t = null } = {}) {
    return await this.appendToQueue(
      a.eventEnable({
        machineChannel: this.listenOnChannel,
        event: t
      }),
      "events-config"
    );
  }
  async eventDisable({ event: t = null } = {}) {
    return await this.appendToQueue(
      a.eventEnable({
        machineChannel: this.listenOnChannel,
        event: t
      }),
      "events-config"
    );
  }
  async sendCustomCode({ code: t = [] } = {}) {
    return await this.appendToQueue(
      a.sendCustomCode({
        machineChannel: this.listenOnChannel,
        code: t
      }),
      "custom"
    );
  }
  async assignChannels() {
    const t = this.__device.channels.verification.start, e = this.__device.channels.verification.end;
    if (t > e) throw new Error("Invalid range, start must be less than end");
    this.__device.channels.verification.clear(), this.__device.channels.verification.running = !0;
    for (let r = t; r <= e; r++)
      this.__device.channels.verification.current = r, await this.getChannelPresence({ selection: r });
    return new Promise((r) => {
      let o = setInterval(() => {
        this.__device.channels.verification.channels.length === e - t + 1 && (clearInterval(o), this.dispatch("channels", { channels: this.__device.channels.verification.channels }), this.__device.channels.verification.clear(), r(!0));
      }, 500);
    });
  }
}
n = new WeakSet(), S = function() {
  const t = [
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
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, g = function() {
  this.on("internal:dispense:running", i(this, n, he).bind(this));
}, A = async function() {
  if (this.__internal__.dispense.elevator.locking_interval) return;
  this.__internal__.dispense.elevator.need_reset && (this.__internal__.dispense.elevator.need_reset = !1, await this.resetWaitingProductRemovedError(), await w(500));
  const t = this;
  return this.__internal__.dispense.status = "elevator-locked", this.__internal__.dispense.elevator.locking_time = 60, new Promise((e) => {
    t.__internal__.dispense.elevator.locking_interval = setInterval(() => {
      t.dispatch("dispensing:withdrawal", {
        elevator: !0,
        seconds: t.__internal__.dispense.elevator.locking_time,
        description: "Please recall products from the elevator"
      }), t.__internal__.dispense.elevator.locking_time -= 1, t.__internal__.dispense.elevator.locking_time <= 0 && (clearInterval(t.__internal__.dispense.elevator.locking_interval), t.__internal__.dispense.elevator.locking_interval = 0, e(!0));
    }, 1e3);
  });
}, B = function(t, e) {
  return e.name = "ok", e.description = "The last command was executed successfully", e.no_code = 1, this.dispatch("command-executed", e), e;
}, W = function(t, e) {
  e.additional = {
    hex: t,
    dec: this.hexToDec(t),
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
  return e.additional.ascii = r[t] ?? null, e.name = "Key pressed", e.description = `The key ${e.additional.ascii} was pressed`, e.no_code = 2, this.dispatch("keyboard:pressed", e.additional), e;
}, F = function(t, e) {
  return e.additional = { open: !1 }, e.no_code = 3, t === "4f" ? (e.name = "door open", e.description = "The door was opened", e.additional.open = !0, this.__internal__.device.door_open = !0, this.dispatch("door:event", e.additional)) : t === "43" ? (e.name = "door close", e.description = "The door was closed", e.additional.open = !1, this.__internal__.device.door_open = !1, this.dispatch("door:event", e.additional)) : (e.name = "door event", e.description = "The door event received is unknown", this.dispatch("door:event", { open: e.additional.open, message: e })), e;
}, q = function(t, e) {
  e.no_code = 404;
  let r = t[5] ?? null;
  return r && this.listenOnChannel > 1 && (r = this.hexToDec(r) - this.listenOnChannel + 1, r = this.decToHex(r)), r && (r === "FD" ? (e.no_code = 4, e.name = "channel disconnected", e.description = "The channel is disconnected", e.additional = { active: !1 }) : r === "FC" ? (e.no_code = 5, e.name = "channel connected", e.description = "The channel is connected", e.additional = { active: !0 }) : (e.no_code = 6, e.name = "channel sold out", e.description = "The channel is empty", e.additional = { active: !0 }), this.__device.channels.verification.running && (this.__device.channels.verification.channels.push({
    selection: this.__device.channels.verification.current,
    active: e.additional.active
  }), e.additional.selection = this.__device.channels.verification.current), this.dispatch("channel:status", e.additional)), e;
}, R = function(t, e) {
  e.no_code = 39, e.name = "Program version";
  const r = t.slice(4, 12), o = r.map((c) => String.fromCharCode(this.hexToDec(c))).join("");
  return e.additional = { version: o, hex: r }, e.description = `The program version is ${o}`, this.dispatch("program:version", e.additional), e;
}, $ = function(t, e) {
  e.no_code = 39, e.name = "Machine faults", e.description = "No faults detected", e.additional = { no_faults: 0, faults: [] };
  const r = t.slice(4, -3);
  if (r.length > 1 && r[0] !== "30") {
    e.description = "Machine has faults";
    const o = {
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
    for (const c of r)
      o[c] && (e.additional.faults.push(o[c]), e.additional.no_faults++);
  }
  return this.dispatch("machine:faults", e.additional), e;
}, N = function(t, e) {
  e.no_code = 40, e.name = "Clock registers", e.description = "Clock registers";
  const r = t.slice(4, -3), o = r.map((x) => String.fromCharCode(this.hexToDec(x))).join(""), [c, l] = o.split(" "), [f, y] = c.split(":"), [v, T, k] = l.split("-"), m = new Date(
    2e3 + parseInt(k),
    parseInt(T) - 1,
    parseInt(v),
    parseInt(f),
    parseInt(y)
  );
  return e.additional = {
    day: v,
    month: T,
    year: k,
    hours: f,
    minutes: y,
    formatted: o,
    date: m,
    hex: r
  }, this.dispatch("clock:registers", e.additional), e;
}, j = function(t, e) {
  e.no_code = 41, e.name = "Machine activity", e.description = "Events from read machine activity";
  const r = String.fromCharCode(this.hexToDec(t[4]));
  if (r !== "0") {
    const o = t.slice(5, -3);
    if (r === "T" && o.length === 4) {
      const c = String.fromCharCode(this.hexToDec(o[0])), l = String.fromCharCode(this.hexToDec(o[1])), f = String.fromCharCode(this.hexToDec(o[3]));
      e.additional = {
        ascii: r,
        type: "DU.d",
        dozens: c,
        units: l,
        decimals: f,
        time: parseFloat(`${c}${l}.${f}`),
        meaning: "Extraction time (in seconds)"
      };
    } else if (["B", "D", "E", "F", "G"].includes(r) && o.length === 3) {
      const c = String.fromCharCode(this.hexToDec(o[0])), l = String.fromCharCode(this.hexToDec(o[1])), f = String.fromCharCode(this.hexToDec(o[2])), y = parseInt(`${c}${l}${f}`), v = {
        B: "Error on going to tray channel",
        D: "Error on product detector",
        E: "Extraction of channel ok",
        F: "Error on engine intensity detection",
        G: "Error on product exit door"
      };
      e.additional = {
        type: "HDU",
        hundreds: c,
        dozens: l,
        decimals: f,
        channel: y,
        selection: y - 109,
        ascii: r,
        meaning: v[r] ?? "Unknown"
      };
    } else if (o.length === 13) {
      const c = o.map((le) => String.fromCharCode(this.hexToDec(le))).join(""), l = parseInt(c.slice(0, 2)), f = parseInt(c.slice(2, 4)), y = parseInt(c.slice(4, 6)), v = parseInt(c.slice(7, 9)), T = parseInt(c.slice(9, 11)) - 1, k = 2e3 + parseInt(c.slice(11, 13)), m = new Date(k, T, v, l, f, y), x = {
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
      e.additional = {
        type: "hhmmssWddMMAA",
        date: m,
        hex: o,
        formatted: m.toLocaleString(),
        ascii: r,
        meaning: x[r] ?? "Unknown"
      };
    }
  }
  return this.dispatch("machine:activity", e.additional), e;
}, L = function(t, e) {
  const r = {
    30: "Spanish",
    31: "English",
    32: "French"
  };
  return e.no_code = 42, e.name = "Language", e.description = `The language is ${r[t] ?? "unknown"}`, e.additional = {
    hex: t,
    language: r[t] ?? "unknown"
  }, this.dispatch("check:language", e.additional), e;
}, V = function(t, e) {
  return e.no_code = 43, e.name = "Beeper", e.description = `The beeper is ${t === "30" ? "on" : "off"}`, e.additional = {
    hex: t,
    beeper: t === "30"
  }, this.dispatch("check:beeper", e.additional), e;
}, J = function(t, e) {
  e.no_code = 44, e.name = "Isolation tray", e.description = "Isolation tray";
  const r = this.hexToDec(t) - 139;
  return e.additional = {
    hex: t,
    tray: r
  }, this.dispatch("check:isolation-tray", e.additional), e;
}, U = function(t, e) {
  e.no_code = 45, e.name = "Engine voltage", e.description = "Engine voltage";
  const r = (this.hexToDec(t) - 128) / 2 + 5;
  return e.additional = {
    hex: t,
    voltage: r
  }, this.dispatch("check:engine-voltage", e.additional), e;
}, K = function(t, e) {
  e.no_code = 46, e.name = "Push over", e.description = "Push over";
  const r = t === "30";
  return e.additional = {
    hex: t,
    push: r
  }, this.dispatch("check:push-over", e.additional), e;
}, H = function(t, e) {
  e.no_code = 47, e.name = "Extractor after dispense", e.description = "Extractor after dispense";
  const r = (this.hexToDec(t) - 128) / 10;
  return e.additional = {
    hex: t,
    seconds: r
  }, this.dispatch("check:extractor-after-dispense", e.additional), e;
}, z = function(t, e) {
  e.no_code = 48, e.name = "Standby after collect", e.description = "Time to standby after collect product";
  const r = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    seconds: r
  }, this.dispatch("check:standby-after-collect", e.additional), e;
}, G = function(t, e) {
  e.no_code = 49, e.name = "Standby without collect", e.description = "Time to standby when product delivery is not collected";
  const r = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    minutes: r
  }, this.dispatch("check:standby-without-collect", e.additional), e;
}, Y = function(t, e) {
  e.no_code = 50, e.name = "Elevator speed", e.description = "Elevator speed";
  const r = t === "30" ? "low" : "high";
  return e.additional = {
    hex: t,
    speed: r
  }, this.dispatch("check:elevator-speed", e.additional), e;
}, Z = function(t, e) {
  e.no_code = 51, e.name = "Temperature expiration", e.description = "Temperature expiration";
  const r = t === "31";
  return e.additional = {
    hex: t,
    enabled: r
  }, this.dispatch("check:expiration-by-temperature", e.additional), e;
}, X = function(t, e) {
  e.no_code = 52, e.name = "Temperature before expiration", e.description = "Temperature before expiration";
  const r = (this.hexToDec(t) - 128) / 2;
  return e.additional = {
    hex: t,
    temperature: r
  }, this.dispatch("check:temperature-before-expiration", e.additional), e;
}, ee = function(t, e) {
  e.no_code = 53, e.name = "Time before expiration", e.description = "Time before expiration";
  const r = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    minutes: r
  }, this.dispatch("check:expiration-after", e.additional), e;
}, te = function(t, e) {
  e.no_code = 54, e.name = "Temperature scale", e.description = "Temperature scale";
  const r = t === "43" ? "Celsius" : "Fahrenheit";
  return e.additional = {
    hex: t,
    scale: r
  }, this.dispatch("check:temperature-scale", e.additional), e;
}, ne = function(t, e) {
  return e.no_code = 54, e.name = "Machine ID", e.description = "Machine ID", e.additional = { hex: t[4], full_hex: t }, this.dispatch("check:machine-id", e.additional), e;
}, ie = function(t, e) {
  return e.no_code = 7, e.name = "working temperature", e.description = `The working temperature is ${t}`, e.additional = {
    hex: t,
    temperature: {
      traditional: (this.hexToDec(t) - this.hexToDec("80")) / 2,
      ice_plus: (this.hexToDec(t) - this.hexToDec("80")) / 2 - 25.5
    }
  }, this.dispatch("temperature:working", e.additional), e;
}, re = function(t, e) {
  return e.no_code = 8, e.name = "current temperature", e.additional = {
    sign: null,
    tens: null,
    units: null,
    decimals: null,
    type_degrees: null,
    formatted: null,
    decimal_point: t[7] === "2e" ? "." : null,
    degrees: t[9] === "7f" ? "°" : null,
    error: null
  }, t[4] === "2b" ? e.additional.sign = t[4] = "+" : ["2e", "2d"].includes(t[4]) ? e.additional.sign = t[4] = "-" : t[4] === "20" && (e.additional.error = "Error in thermometer"), this.hexToDec(t[5]) >= 48 && this.hexToDec(t[5]) <= 57 ? e.additional.tens = this.hexToDec(t[5]) - 48 : t[5] === "2a" && (e.additional.error = "Error in thermometer"), this.hexToDec(t[6]) >= 48 && this.hexToDec(t[6]) <= 57 ? e.additional.units = this.hexToDec(t[6]) - 48 : t[6] === "2a" && (e.additional.error = "Error in thermometer"), this.hexToDec(t[8]) >= 48 && this.hexToDec(t[8]) <= 57 ? e.additional.decimals = this.hexToDec(t[8]) - 48 : t[8] === "2a" && (e.additional.error = "Error in thermometer"), t[10] === "43" ? e.additional.type_degrees = "C" : t[10] === "46" && (e.additional.type_degrees = "F"), e.additional.error === "Error in thermometer" ? (e.additional.formatted = "Error in thermometer", e.description = "The current temperature cannot be read because there is an error in the thermometer") : (e.additional.formatted = (e.additional.sign ?? "") + (e.additional.tens ?? "") + (e.additional.units ?? "") + (e.additional.decimal_point ?? "") + (e.additional.decimals ?? "") + (e.additional.degrees ?? "") + (e.additional.type_degrees ?? ""), e.description = `The current temperature is ${e.additional.formatted}`), this.dispatch("temperature:current", e.additional), e;
}, ae = function(t, e, r = 128) {
  if (t[1] && (e.additional.machine.hex = t[1], e.additional.machine.dec = this.hexToDec(t[1]) - r), !(t[1] && t[2]))
    e = i(this, n, B).call(this, t, e);
  else
    switch (t[2]) {
      case "54":
        e.request = "--automatic", e = i(this, n, W).call(this, t[3], e);
        break;
      case "50":
        e.request = "--automatic", e = i(this, n, F).call(this, t[3], e);
        break;
      case "43":
        switch (e.request = "check-data", t[3]) {
          case "41":
            e = i(this, n, j).call(this, t, e);
            break;
          case "43":
            e.request = "channel-status", e = i(this, n, q).call(this, t, e);
            break;
          case "50":
            e = i(this, n, R).call(this, t, e);
            break;
          case "53":
            e = i(this, n, $).call(this, t, e);
            break;
          case "54":
            e.request = "working-temperature", e = i(this, n, ie).call(this, t[4], e);
            break;
          case "72":
            e = i(this, n, N).call(this, t, e);
            break;
          case "74":
            e.request = "current-temperature", e = i(this, n, re).call(this, t, e);
            break;
          case "49":
            e = i(this, n, L).call(this, t[4], e);
            break;
          case "5a":
            e = i(this, n, V).call(this, t[4], e);
            break;
          case "42":
            e = i(this, n, J).call(this, t[4], e);
            break;
          case "47":
            e = i(this, n, U).call(this, t[4], e);
            break;
          case "4e":
            e = i(this, n, ne).call(this, t, e);
            break;
          case "4f":
            e = i(this, n, K).call(this, t[4], e);
            break;
          case "45":
            e = i(this, n, H).call(this, t[4], e);
            break;
          case "46":
            e = i(this, n, z).call(this, t[4], e);
            break;
          case "48":
            e = i(this, n, G).call(this, t[4], e);
            break;
          case "76":
            e = i(this, n, Y).call(this, t[4], e);
            break;
          case "63":
            e = i(this, n, Z).call(this, t[4], e);
            break;
          case "65":
            e = i(this, n, X).call(this, t[4], e);
            break;
          case "66":
            e = i(this, n, ee).call(this, t[4], e);
            break;
          case "67":
            e = i(this, n, te).call(this, t[4], e);
            break;
        }
        break;
    }
  return e;
}, u = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !0);
}, s = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !1);
}, b = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = "elevator-locked");
}, /**
 * Dispatch a warning message
 * @param {null|string} type
 * @param {string} severity
 */
d = function({ type: t = null, severity: e = "low" } = {}) {
  this.dispatch("jofemar:warning", { type: t, severity: e });
}, /**
 * Dispatch an error message
 * @param {null|string} type
 * @param {string} severity
 */
_ = function({ type: t = null, severity: e = "high" } = {}) {
  this.dispatch("jofemar:error", { type: t, severity: e });
}, oe = function(t, e) {
  if (e.request = "status", t[1] && !t[2]) {
    switch (t[1]) {
      case "30":
        e.name = "Machine ready", e.description = "The machine is ready for instructions", e.no_code = 9, i(this, n, u).call(this);
        break;
      case "31":
        e.name = "Machine busy", e.description = "The machine is busy right now", e.no_code = 10;
        break;
      case "32":
        e.name = "Invalid tray", e.description = "The tray requested is invalid", e.no_code = 11, i(this, n, s).call(this), i(this, n, d).call(this, { type: "invalid-tray" });
        break;
      case "33":
        e.name = "Invalid channel", e.description = "The channel requested is invalid", e.no_code = 12, i(this, n, s).call(this), i(this, n, d).call(this, { type: "invalid-channel" });
        break;
      case "34":
        e.name = "Empty channel", e.description = "The channel requested is empty", e.no_code = 13, i(this, n, s).call(this), i(this, n, d).call(this, { type: "empty-channel" });
        break;
      case "35":
        e.name = "Jam", e.description = "Jam in elevator engine", e.no_code = 14, i(this, n, s).call(this), i(this, n, _).call(this, { type: "jam" });
        break;
      case "36":
        e.name = "Malfunction", e.description = "Malfunction in the elevator belt or product detector", e.no_code = 15, i(this, n, s).call(this), i(this, n, _).call(this, { type: "malfunction" });
        break;
      case "37":
        e.name = "Photo transistors", e.description = "Failure in one of the photo transistors in the cabinet", e.no_code = 16, i(this, n, s).call(this), i(this, n, _).call(this, { type: "photo-transistors" });
        break;
      case "38":
        e.name = "Without channels", e.description = "No channels detected", e.no_code = 17, i(this, n, s).call(this), i(this, n, _).call(this, { type: "without-channels" });
        break;
      case "39":
        e.name = "Product detector fault", e.description = "Product detector fault", e.no_code = 18, i(this, n, b).call(this), i(this, n, d).call(this, { type: "fault-product-detector" });
        break;
      case "41":
        e.name = "Fault in 485 BUS", e.description = "Machine display is disconnected", e.no_code = 19, i(this, n, u).call(this), i(this, n, d).call(this, { type: "display-disconnected" });
        break;
      case "42":
        e.name = "Product under elevator", e.description = "Product alarm under elevator", e.no_code = 20, i(this, n, s).call(this), i(this, n, d).call(this, { type: "product-under-elevator" });
        break;
      case "43":
        e.name = "Error when elevator approaching to a position", e.description = "Error when elevator approaching to a position", e.no_code = 21, i(this, n, u).call(this), i(this, n, d).call(this, { type: "error-approaching-position", severity: "high" });
        break;
      case "44":
        e.name = "Fault in keyboard", e.description = "Fault in keyboard", e.no_code = 22, i(this, n, s).call(this), i(this, n, _).call(this, { type: "fault-keyboard" });
        break;
      case "45":
        e.name = "Eeprom writing error", e.description = "Eeprom writing error", e.no_code = 23, i(this, n, s).call(this), i(this, n, _).call(this, { type: "eeprom-writing-error", severity: "critical" });
        break;
      case "46":
        e.name = "Fault communicating with temperature control", e.description = "Fault communicating with temperature control", e.no_code = 24, i(this, n, u).call(this), i(this, n, d).call(this, { type: "fault-temperature-control" });
        break;
      case "47":
        e.name = "Thermometer disconnected", e.description = "The thermometer is disconnected", e.no_code = 25, i(this, n, u).call(this), i(this, n, d).call(this, { type: "thermometer-disconnected" });
        break;
      case "48":
        e.name = "Thermometer programming lost", e.description = "Thermometer programming lost", e.no_code = 26, i(this, n, u).call(this), i(this, n, d).call(this, { type: "thermometer-programming-lost" });
        break;
      case "49":
        e.name = "Thermometer faulty", e.description = "Thermometer faulty", e.no_code = 27, i(this, n, u).call(this), i(this, n, d).call(this, { type: "thermometer-faulty" });
        break;
      case "4a":
        e.name = "Channels power consumption detector faulty", e.description = "Channels power consumption detector faulty", e.no_code = 28, i(this, n, s).call(this), i(this, n, _).call(this, { type: "channels-power-consumption-detector-faulty", severity: "critical" });
        break;
      case "4b":
        e.name = "Elevator does not find channel or tray", e.description = "Elevator does not find channel or tray", e.no_code = 29, i(this, n, s).call(this), i(this, n, d).call(this, { type: "elevator-not-find-channel-tray" });
        break;
      case "4c":
        e.name = "Elevator does not find delivery product position", e.description = "Elevator does not find delivery product position", e.no_code = 30, i(this, n, s).call(this), i(this, n, _).call(this, { type: "elevator-not-find-delivery-position" });
        break;
      case "4d":
        e.name = "Interior of elevator blocked", e.description = "Interior of elevator blocked", e.no_code = 31, i(this, n, b).call(this), this.__internal__.dispense.elevator.need_reset || (this.__internal__.dispense.elevator.need_reset = !0), i(this, n, _).call(this, { type: "interior-elevator-blocked", severity: "low" });
        break;
      case "4e":
        e.name = "Error in tester of product detector", e.description = "Error in tester of product detector", e.no_code = 32, i(this, n, s).call(this), i(this, n, _).call(this, { type: "error-tester-product-detector" });
        break;
      case "4f":
        e.name = "Waiting for product to be removed", e.description = "Waiting for product to be removed", e.no_code = 33, i(this, n, b).call(this);
        break;
      case "50":
        e.name = "Product expired by temperature reasons", e.description = "Product expired by temperature reasons", e.no_code = 34, i(this, n, u).call(this), i(this, n, d).call(this, { type: "product-expired-temperature" });
        break;
      case "51":
        e.name = "Automatic door faulty", e.description = "Automatic door faulty", e.no_code = 35, i(this, n, u).call(this), i(this, n, d).call(this, { type: "automatic-door-faulty" });
        break;
      case "59":
      case "5a":
      case "61":
      case "62":
      case "63":
        switch (e.name = "Product is expired", e.description = "Product is expired", e.additional = { nsf_alarm: 1 }, t[1]) {
          case "5a":
            e.additional.nsf_alarm = 2;
            break;
          case "61":
            e.additional.nsf_alarm = 3;
            break;
          case "62":
            e.additional.nsf_alarm = 4;
            break;
          case "63":
            e.additional.nsf_alarm = 5;
            break;
        }
        e.no_code = 36, i(this, n, u).call(this), i(this, n, d).call(this, { type: "product-expired" });
        break;
      case "64":
        e.name = "Product detector didn't change during its verification test", e.description = "Product detector didn't change during its verification test", e.no_code = 37, i(this, n, u).call(this), i(this, n, d).call(this, { type: "automatic-door-faulty" });
        break;
    }
    this.dispatch("machine:status", e);
  } else
    e.name = "executed", e.description = "The last command was executed successfully", e.no_code = 8, !t[1] && this.__internal__.dispense.dispensing && i(this, n, s).call(this);
  return e;
}, ce = function() {
  this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.dispense.timeout = 0, this.__internal__.dispense.interval = 0;
}, he = function() {
  this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval);
  const t = this;
  t.__internal__.dispense.timeout = setTimeout(() => {
    t.__internal__.dispense.interval = setInterval(() => {
      t.status().then(() => {
      });
    }, t.__internal__.dispense.interval_time);
  }, t.__internal__.dispense.timeout_time);
}, C = async function(t) {
  return await this.appendToQueue(
    a.reset({
      machineChannel: this.listenOnChannel,
      type: t
    }),
    "reset"
  );
}, E = function() {
  const t = this.__device.type === "iceplus" ? P(40) : P(25), e = /* @__PURE__ */ new Date(), r = 1e3 * t + e.getTime(), o = new Date(r);
  this.dispatch("reset:errors", {
    description: "Resetting machine errors",
    duration: t,
    started_at: e,
    finished_at: o
  });
}, D = async function(t) {
  return await this.appendToQueue(
    a.lights({
      machineChannel: this.listenOnChannel,
      type: t
    }),
    "lights"
  );
};
export {
  Ce as Jofemar
};
