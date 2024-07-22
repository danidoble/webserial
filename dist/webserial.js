var pe = Object.defineProperty;
var G = (u) => {
  throw TypeError(u);
};
var me = (u, r, e) => r in u ? pe(u, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : u[r] = e;
var E = (u, r, e) => me(u, typeof r != "symbol" ? r + "" : r, e), J = (u, r, e) => r.has(u) || G("Cannot " + e);
var m = (u, r, e) => (J(u, r, "read from private field"), e ? e.call(u) : r.get(u)), S = (u, r, e) => r.has(u) ? G("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(u) : r.set(u, e), T = (u, r, e, t) => (J(u, r, "write to private field"), t ? t.call(u, e) : r.set(u, e), e), s = (u, r, e) => (J(u, r, "access private method"), e);
var g = [];
for (var V = 0; V < 256; ++V)
  g.push((V + 256).toString(16).slice(1));
function be(u, r = 0) {
  return (g[u[r + 0]] + g[u[r + 1]] + g[u[r + 2]] + g[u[r + 3]] + "-" + g[u[r + 4]] + g[u[r + 5]] + "-" + g[u[r + 6]] + g[u[r + 7]] + "-" + g[u[r + 8]] + g[u[r + 9]] + "-" + g[u[r + 10]] + g[u[r + 11]] + g[u[r + 12]] + g[u[r + 13]] + g[u[r + 14]] + g[u[r + 15]]).toLowerCase();
}
var R, ye = new Uint8Array(16);
function ge() {
  if (!R && (R = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !R))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return R(ye);
}
var ve = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const K = {
  randomUUID: ve
};
function we(u, r, e) {
  if (K.randomUUID && !r && !u)
    return K.randomUUID();
  u = u || {};
  var t = u.random || (u.rng || ge)();
  return t[6] = t[6] & 15 | 64, t[8] = t[8] & 63 | 128, be(t);
}
class ke extends EventTarget {
  constructor() {
    super(...arguments);
    E(this, "__listeners__", {});
  }
  dispatch(e, t = null) {
    const n = new De(e, { detail: t });
    this.dispatchEvent(n);
  }
  on(e, t) {
    typeof this.__listeners__[e] < "u" && this.__listeners__[e] === !1 && (this.__listeners__[e] = !0), this.addEventListener(e, t);
  }
  serialRegisterAvailableListener(e) {
    this.__listeners__[e] || (this.__listeners__[e] = !1);
  }
  get availableListeners() {
    return Object.keys(this.__listeners__).map((e) => ({
      type: e,
      listening: this.__listeners__[e]
    }));
  }
}
class De extends CustomEvent {
  constructor(r, e) {
    super(r, e);
  }
}
function Q(u = 100) {
  return new Promise((r) => setTimeout(() => r(), u));
}
function xe() {
  return "serial" in navigator;
}
var y, W, X, j, Z, ee, te, re, ne, ie, se, ae, le;
class P extends ke {
  constructor({
    filters: e = null,
    config_port: t = null,
    no_device: n = 1
  } = {}) {
    super();
    S(this, y);
    E(this, "__internal__", {
      device_number: 1,
      aux_port_connector: 0,
      serial: {
        connected: !1,
        port: null,
        reader: null,
        input_done: null,
        output_done: null,
        input_stream: null,
        output_stream: null,
        keep_reading: !0,
        incoming: new Uint8Array(0),
        time_until_send_bytes: void 0,
        bytes_connection: null,
        navigator_not_supported: "_id_vl_not_support",
        filters: [],
        btn_connect_serial: null,
        config_port: {
          baudRate: 9600,
          dataBits: 8,
          stopBits: 1,
          parity: "none",
          bufferSize: 32768,
          flowControl: "none"
        },
        queue: []
      },
      device: {
        type: "unknown",
        id: we()
      },
      time: {
        response_connection: 500,
        response_general: 2e3
      },
      timeout: {
        until_response: 0
      },
      interval: {
        reconnection: 0
      },
      dispense: {
        status: !1
      },
      wait_until_last_command_returns: void 0,
      time_to_reconnect: 7e3,
      last_error: { message: null, handler: null, code: null, no_code: 0 }
    });
    e && (this.serialFilters = e), t && (this.serialConfigPort = t), n && s(this, y, ae).call(this, n), s(this, y, ne).call(this), s(this, y, ie).call(this);
  }
  set serialFilters(e) {
    this.__internal__.serial.filters = e;
  }
  get serialFilters() {
    return this.__internal__.serial.filters;
  }
  set serialConfigPort(e) {
    this.__internal__.serial.config_port = e;
  }
  get serialConfigPort() {
    return this.__internal__.serial.config_port;
  }
  get isConnected() {
    return this.__internal__.serial.connected;
  }
  get deviceNumber() {
    return this.__internal__.device_number;
  }
  get uuid() {
    return this.__internal__.device.id;
  }
  get typeDevice() {
    return this.__internal__.device.type;
  }
  get queue() {
    return this.__internal__.serial.queue;
  }
  async timeout(e, t) {
    console.log("se acabo el tiempo"), this.__internal__.last_error.message = "Operation response timed out.", this.__internal__.last_error.handler = t, this.__internal__.last_error.code = e, this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), t === "connect" ? (this.__internal__.serial.connected = !1, this.dispatch("serial:reconnect", {})) : t === "connection:start" && (await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector += 1, await this.serialConnect()), this.dispatch("serial:timeout", {
      ...this.__internal__.last_error,
      bytes: e,
      action: t
    });
  }
  async disconnect(e = null) {
    await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector = 0, this.dispatch("serial:disconnected", e);
  }
  async connect() {
    return new Promise((e, t) => {
      xe() || t("Web Serial not supported"), setTimeout(async () => {
        await Q(499), await this.serialConnect(), this.isConnected ? e(`${this.typeDevice} device ${this.deviceNumber} connected`) : t(`${this.typeDevice} device ${this.deviceNumber} not connected`);
      }, 1);
    });
  }
  async serialDisconnect() {
    try {
      const e = this.__internal__.serial.reader, t = this.__internal__.serial.output_stream;
      e && (await e.cancel().catch((l) => this.serialErrors(l)), await this.__internal__.serial.input_done), t && (await t.getWriter().close(), await this.__internal__.serial.output_done), this.__internal__.serial.connected && this.__internal__.serial && await this.__internal__.serial.port.close();
    } catch (e) {
      this.serialErrors(e);
    } finally {
      this.__internal__.serial.reader = null, this.__internal__.serial.input_done = null, this.__internal__.serial.output_stream = null, this.__internal__.serial.output_done = null, this.__internal__.serial.connected = !1, this.__internal__.serial.port = null;
    }
  }
  async serialPortsSaved(e) {
    const t = this.serialFilters;
    if (this.__internal__.aux_port_connector < e.length) {
      const n = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = e[n];
    } else
      this.__internal__.aux_port_connector = 0, this.__internal__.serial.port = await navigator.serial.requestPort({ filters: t });
    if (!this.__internal__.serial.port)
      throw new Error("Select another port please");
  }
  serialErrors(e) {
    const t = e.toString().toLowerCase();
    switch (!0) {
      case t.includes("must be handling a user gesture to show a permission request"):
      case t.includes("the port is closed."):
      case t.includes("select another port please"):
      case t.includes("no port selected by the user"):
      case t.includes("this readable stream reader has been released and cannot be used to cancel its previous owner stream"):
        break;
      case t.includes("the port is already open."):
        this.serialDisconnect().then(async () => {
          this.__internal__.aux_port_connector += 1, await this.serialConnect();
        });
        break;
      case t.includes("cannot read properties of undefined (reading 'writable')"):
      case t.includes("cannot read properties of null (reading 'writable')"):
      case t.includes("cannot read property 'writable' of null"):
      case t.includes("cannot read property 'writable' of undefined"):
      case t.includes("failed to open serial port"):
        this.serialDisconnect().then(async () => {
          await this.serialConnect();
        });
        break;
      case t.includes("'close' on 'serialport': a call to close() is already in progress."):
        break;
      case t.includes("failed to execute 'open' on 'serialport': a call to open() is already in progress."):
        break;
      case t.includes("the device has been lost"):
        break;
      case t.includes("the port is already closed."):
        break;
      case t.includes("navigator.serial is undefined"):
        break;
      default:
        console.error(e);
        break;
    }
  }
  async serialConnect() {
    try {
      const e = await s(this, y, Z).call(this);
      if (e.length > 0)
        await this.serialPortsSaved(e);
      else {
        const l = this.serialFilters;
        this.__internal__.serial.port = await navigator.serial.requestPort({ filters: l });
      }
      const t = this.__internal__.serial.port;
      await t.open(this.serialConfigPort);
      const n = this;
      t.onconnect = (l) => {
        n.dispatch("serial:connected", l.detail), n.__internal__.serial.queue.length > 0 && n.dispatch("internal:queue", {});
      }, t.ondisconnect = async (l) => {
        await n.disconnect(l.detail ?? null);
      }, this.__internal__.timeout.until_response = setTimeout(async () => {
        await n.timeout(n.__internal__.serial.bytes_connection, "connection:start");
      }, this.__internal__.time.response_connection), this.dispatch("serial:connecting", t.getInfo()), await s(this, y, W).call(this, this.__internal__.serial.bytes_connection), this.typeDevice === "relay" && s(this, y, j).call(this, ["DD", "DD"], null), await s(this, y, te).call(this);
    } catch (e) {
      this.serialErrors(e);
    }
  }
  async serialForget() {
    return await s(this, y, re).call(this);
  }
  decToHex(e) {
    return parseInt(e, 10).toString(16);
  }
  hexToDec(e) {
    return parseInt(e, 16).toString(10);
  }
  hexMaker(e, t = 2) {
    e === void 0 && (e = "00");
    let n = t - e.toString().length;
    if (n > 0)
      for (let l = 0; l < n; l++)
        e = "0" + e;
    return e.toString().toUpperCase();
  }
  add0x(e) {
    let t = [];
    return e.forEach((n, l) => {
      t[l] = "0x" + n;
    }), t;
  }
  bytesToHex(e) {
    return this.add0x(Array.from(e, (t) => this.hexMaker(t)));
  }
  async appendToQueue(e, t) {
    const n = this.bytesToHex(e);
    if (["connect", "connection:start"].includes(t)) {
      if (this.__internal__.serial.connected) return;
      await this.serialConnect();
      return;
    }
    this.__internal__.serial.queue.push({ bytes: n, action: t }), this.dispatch("internal:queue", {});
  }
  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(e = 1) {
  }
  // eslint-disable-next-line no-unused-vars
  serialMessage(e) {
  }
  // eslint-disable-next-line no-unused-vars
  serialCorruptMessage(e, t) {
  }
  clearSerialQueue() {
    this.__internal__.serial.queue = [];
  }
  sumHex(e) {
    let t = 0;
    return e.forEach((n) => {
      t += parseInt(n, 16);
    }), t.toString(16);
  }
  __emulate(e) {
    if (typeof e.code != "object") {
      console.error("Invalid data to make an emulation");
      return;
    }
    this.__internal__.serial.connected || (this.__internal__.serial.connected = !0, this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0)), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), this.serialMessage(e.code);
  }
  toString() {
    return JSON.stringify({
      __class: this.typeDevice,
      device_number: this.deviceNumber,
      uuid: this.uuid,
      connected: this.isConnected,
      connection: this.__internal__.serial.bytes_connection
    });
  }
  softReload() {
    s(this, y, le).call(this), this.dispatch("serial:soft-reload", {});
  }
  async sendConnect() {
    await this.appendToQueue(this.__internal__.serial.bytes_connection, "connect");
  }
  async sendCustomCode(e) {
    await this.appendToQueue(e, "custom");
  }
}
y = new WeakSet(), W = async function(e) {
  const t = this.__internal__.serial.port;
  if (!t)
    throw new Error("The port is closed.");
  const n = new Uint8Array(e), l = t.writable.getWriter();
  await l.write(n), l.releaseLock();
}, X = function(e = []) {
  return e.map((t) => t.toString().toLowerCase());
}, j = function(e = [], t = null) {
  e && e.length > 0 ? (this.__internal__.serial.connected = !0, this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), this.serialMessage(s(this, y, X).call(this, e))) : this.serialCorruptMessage(e, t), this.__internal__.serial.queue.length !== 0 && this.dispatch("internal:queue", {});
}, Z = async function() {
  const e = this.serialFilters, t = await navigator.serial.getPorts({ filters: e });
  return e.length === 0 ? t : t.filter((n) => {
    const l = n.getInfo();
    return e.some((h) => l.usbProductId === h.usbProductId && l.usbVendorId === h.usbVendorId);
  });
}, ee = function(e) {
  if (e !== void 0) {
    const t = this.__internal__.serial.incoming;
    let n = new Uint8Array(t.length + e.byteLength);
    n.set(t, 0), n.set(new Uint8Array(e), t.length), this.__internal__.serial.incoming = n;
  }
}, te = async function() {
  const e = this.__internal__.serial.port;
  for (; e.readable && this.__internal__.serial.keep_reading; ) {
    const t = e.readable.getReader();
    this.__internal__.serial.reader = t;
    try {
      let n = !0;
      for (; n; ) {
        const { value: l, done: h } = await t.read();
        if (h) {
          t.releaseLock(), this.__internal__.serial.keep_reading = !1, n = !1;
          break;
        }
        s(this, y, ee).call(this, l), this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0), this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
          let f = [];
          for (const d in this.__internal__.serial.incoming)
            f.push(this.__internal__.serial.incoming[d].toString(16));
          this.__internal__.serial.incoming && s(this, y, j).call(this, f), this.__internal__.serial.incoming = new Uint8Array(0);
        }, 400);
      }
    } catch (n) {
      this.serialErrors(n);
    } finally {
      t.releaseLock();
    }
  }
  this.__internal__.serial.keep_reading = !0, await this.__internal__.serial.port.close();
}, re = async function() {
  return typeof window > "u" ? !1 : "serial" in navigator && "forget" in window.SerialPort.prototype ? (await this.__internal__.serial.port.forget(), !0) : !1;
}, ne = function() {
  [
    "serial:connected",
    "serial:connecting",
    "serial:reconnect",
    "serial:timeout",
    "serial:disconnected",
    "serial:sent",
    "serial:soft-reload",
    "serial:message"
  ].forEach((t) => {
    this.serialRegisterAvailableListener(t);
  });
}, ie = function() {
  this.on("internal:queue", async () => {
    await s(this, y, se).call(this);
  });
}, se = async function() {
  if (!this.__internal__.serial.connected) {
    await this.serialConnect();
    return;
  }
  if (this.__internal__.timeout.until_response || this.__internal__.serial.queue.length === 0) return;
  const e = this.__internal__.serial.queue[0];
  this.__internal__.timeout.until_response = setTimeout(async () => {
    await this.timeout(e.bytes, e.action);
  }, this.__internal__.time.response_general), this.dispatch("serial:sent", {
    action: e.action,
    bytes: e.bytes
  }), await s(this, y, W).call(this, e.bytes), this.typeDevice === "relay" && s(this, y, j).call(this, ["DD", "DD"], null);
  const t = [...this.__internal__.serial.queue];
  this.__internal__.serial.queue = t.splice(1);
}, ae = function(e = 1) {
  this.__internal__.device_number = e, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(e);
}, le = function() {
  this.__internal__.last_error = { message: null, handler: null, code: null, no_code: 0 };
};
const b = class b {
  static typeError(r) {
    const e = new Error();
    throw e.message = `Type ${r} is not supported`, e.name = "DeviceTypeError", e;
  }
  static addCustom(r, e) {
    typeof b.devices[r] > "u" && (b.devices[r] = []), b.add(e);
  }
  static add(r) {
    const e = r.typeDevice, t = r.uuid;
    if (typeof b.devices[e] > "u") return b.typeError(e);
    if (!b.devices[e][t])
      return b.devices[e][t] = r, b.devices[e].indexOf(r);
  }
  static get(r, e) {
    return typeof b.devices[r] > "u" ? b.typeError(r) : b.devices[r][e];
  }
  static getJofemarByUuid(r) {
    return b.get("jofemar", r);
  }
  static getLockerByUuid(r) {
    return b.get("locker", r);
  }
  static getRelayByUuid(r) {
    return b.get("relay", r);
  }
  static getBoardroidByUuid(r) {
    return b.get("boardroid", r);
  }
  static getAll(r = null) {
    return r === null ? b.devices : typeof b.devices[r] > "u" ? b.typeError(r) : b.devices[r];
  }
  static getJofemar(r = 1) {
    return Object.values(b.devices.jofemar).find((t) => t.deviceNumber === r) ?? null;
  }
  static getBoardroid(r = 1) {
    return Object.values(b.devices.boardroid).find((t) => t.deviceNumber === r) ?? null;
  }
  static getLocker(r = 1) {
    return Object.values(b.devices.locker).find((t) => t.deviceNumber === r) ?? null;
  }
  static getRelay(r = 1) {
    return Object.values(b.devices.relay).find((t) => t.deviceNumber === r) ?? null;
  }
  static getCustom(r, e = 1) {
    return typeof b.devices[r] > "u" ? b.typeError(r) : Object.values(b.devices[r]).find((n) => n.deviceNumber === e) ?? null;
  }
};
E(b, "devices", {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: []
});
let F = b;
var U, O, oe;
class Se extends P {
  constructor({
    filters: e = null,
    config_port: t = null,
    no_device: n = 1
  } = {}) {
    super({ filters: e, config_port: t, no_device: n });
    S(this, O);
    S(this, U, {
      activate: ["A0", "01", "01", "A2"],
      deactivate: ["A0", "01", "00", "A1"]
    });
    this.__internal__.device.type = "relay", s(this, O, oe).call(this);
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
    return e.forEach((n, l) => {
      l !== 3 && (t += parseInt(n, 16));
    }), t.toString(16).toUpperCase();
  }
  serialSetConnectionConstant(e = 1) {
    const t = ["A0", "01", "00", "A1"];
    return t[1] = this.hexMaker(this.decToHex(e.toString())), t[3] = this.serialRelaySumHex(t), this.add0x(t);
  }
  async turnOn() {
    const e = m(this, U).activate;
    e[3] = this.serialRelaySumHex(e), await this.appendToQueue(e, "relay:turn-on");
  }
  async turnOff() {
    const e = m(this, U).deactivate;
    e[3] = this.serialRelaySumHex(e), await this.appendToQueue(e, "relay:turn-off");
  }
  async toggle(e = !1, t = 300) {
    const n = this;
    e ? (await n.turnOff(), await Q(t), await n.turnOn()) : (await n.turnOn(), await Q(t), await n.turnOff());
  }
}
U = new WeakMap(), O = new WeakSet(), oe = function() {
  F.add(this);
};
var M, A, N, ce;
class Ce extends P {
  constructor({
    filters: e = null,
    config_port: t = null,
    no_device: n = 1
  } = {}) {
    super({ filters: e, config_port: t, no_device: n });
    S(this, N);
    S(this, M, !1);
    S(this, A, 0);
    this.__internal__.device.type = "locker", s(this, N, ce).call(this);
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
      case "8":
        t.name = "Connection with the serial device completed.", t.description = "Your connection with the serial device was successfully completed.", t.request = "connect", t.no_code = 100;
        break;
      case "7":
        switch (e[4]) {
          case "5":
            t.name = "Cell inactive.", t.description = "The selected cell is inactive or doesn't exist.", t.request = "dispense", t.no_code = 101, this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", {}), m(this, M) && m(this, A) >= 89 ? (t.finished_test = !0, T(this, M, !1), T(this, A, 0)) : m(this, M) && (t.finished_test = !1);
            break;
          case "4":
          default:
            t.name = "Cell open.", t.description = "The selected cell was open successfully.", t.request = "dispense", t.no_code = 102, this.__internal__.dispense.status = !0, this.dispatch("dispensed", {}), m(this, M) && m(this, A) >= 89 ? (t.finished_test = !0, T(this, M, !1), T(this, A, 0)) : m(this, M) && (t.finished_test = !1);
            break;
        }
        break;
      case "6":
        t.name = "Configuration applied.", t.description = "The configuration was successfully applied.", t.request = "configure cell", t.no_code = 103;
        break;
      default:
        t.request = "undefined", t.name = "Response unrecognized", t.description = "The response of application was received, but dont identify with any of current parameters", t.no_code = 400;
        break;
    }
    this.dispatch("serial:message", t);
  }
  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(e = 1) {
    let t = ["02", "06", "00", "03", "03", "1D", "F8", "1B", "03", "F9"];
    return this.add0x(t);
  }
}
M = new WeakMap(), A = new WeakMap(), N = new WeakSet(), ce = function() {
  F.add(this);
};
var B, ue, de;
class Me extends P {
  constructor({
    filters: e = null,
    config_port: t = null,
    no_device: n = 1
  } = {}) {
    super({ filters: e, config_port: t, no_device: n });
    S(this, B);
    this.__internal__.device.type = "jofemar", s(this, B, ue).call(this);
  }
  serialJofemarMakeBytes(e) {
    let t = this.hexToDec(this.sumHex(e)), n = s(this, B, de).call(this, t.toString());
    for (let l = 0; l < 2; l++)
      e.push(this.hexMaker(n[l]));
    return e.push("03"), this.add0x(e);
  }
  serialSetConnectionConstant(e = 1) {
    let t = ["02", "30", "30", (128 + e).toString(16), "53", "FF", "FF"], n = [];
    return t.forEach((l) => {
      n.push(this.hexMaker(l));
    }), this.serialJofemarMakeBytes(n);
  }
  serialMessage(e) {
  }
}
B = new WeakSet(), ue = function() {
  F.add(this);
}, de = function(e) {
  e = this.add0x([this.decToHex(parseInt(e).toString())]);
  let t = [];
  return t.push((e & 255 | 240).toString(16).toUpperCase()), t.push((e & 255 | 15).toString(16).toUpperCase()), t;
};
var H, he;
class Ee extends P {
  constructor({
    filters: e = null,
    config_port: t = null,
    no_device: n = 1
  } = {}) {
    super({ filters: e, config_port: t, no_device: n });
    S(this, H);
    E(this, "_recycler", {
      ict: !0,
      bill: 1
      // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
    });
    this.__internal__.device.type = "boardroid", s(this, H, he).call(this);
  }
  serialBoardroidSumHex(e) {
    let t = 0;
    return e.forEach((n, l) => {
      l !== 0 && l !== 11 && (t += parseInt(n, 16));
    }), t.toString(16).toUpperCase();
  }
  serialMessage(e) {
  }
  serialSetConnectionConstant(e = 1) {
    let t = ["F1", "06", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "F8"];
    return t[1] = this.hexMaker(this.decToHex((5 + e).toString())), t[11] = this.serialBoardroidSumHex(t), this.add0x(t);
  }
}
H = new WeakSet(), he = function() {
  F.add(this);
};
var v, x, a, fe, _e, c, z, p, _, L, Te, Ae, o, Y, q;
const i = class i {
  static status(r = null) {
    var t, n;
    if (!s(t = i, a, c).call(t, r)) return !1;
    let e = [];
    switch (m(i, v)) {
      case "locker":
        e = ["0", "8"];
        break;
      case "boardroid":
        e = ["2", (5 + m(i, x)).toString(16).toUpperCase()];
        break;
      case "jofemar":
        e = ["6"];
        break;
      default:
        return !1;
    }
    s(n = i, a, o).call(n, e);
  }
  static dispensed(r = null) {
    var t, n;
    if (!s(t = i, a, c).call(t, r)) return !1;
    let e = [];
    switch (m(i, v)) {
      case "locker":
        e = ["0", "7", "4", "4", "4"];
        break;
      case "boardroid":
        e = ["2", "D7", "A", "0", "0", "0", "0", "0", "0", "0", "0", "0", "F2"];
        break;
      case "jofemar":
        e = ["6", "30"];
        break;
      default:
        return !1;
    }
    s(n = i, a, o).call(n, e);
  }
  static notDispensed(r = null) {
    var t, n;
    if (!s(t = i, a, c).call(t, r)) return !1;
    let e = [];
    switch (m(i, v)) {
      case "locker":
        e = ["0", "7", "5", "5", "5"];
        break;
      case "boardroid":
        e = ["2", "D7", "A", "0", "0", "1", "0", "0", "0", "0", "0", "0", "F2"];
        break;
      case "jofemar":
        e = ["6", "34"];
        break;
      default:
        return !1;
    }
    s(n = i, a, o).call(n, e);
  }
  static gateInactive(r = null) {
    var e;
    if (!s(e = i, a, c).call(e, r) || !s(this, a, z).call(this)) return !1;
    s(this, a, o).call(this, ["0", "7", "5", "5", "5"]);
  }
  static gateConfigured(r = null) {
    var e;
    if (!s(e = i, a, c).call(e, r) || !s(this, a, z).call(this)) return !1;
    s(this, a, o).call(this, ["0", "6"]);
  }
  static keyPressed(r = null) {
    var l, h, f;
    if (!s(l = i, a, c).call(l, r) || !s(h = i, a, _).call(h)) return !1;
    const e = ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "2A", "23", "41", "42", "43", "44"], t = (128 + m(i, x)).toString(16), n = Math.floor(Math.random() * 15);
    s(f = i, a, o).call(f, ["2", t, "54", e[n]]);
  }
  static doorOpened(r = null) {
    var n, l;
    if (!s(n = i, a, c).call(n, r) || !s(this, a, L).call(this)) return !1;
    let e = [];
    const t = (128 + m(i, x)).toString(16);
    switch (m(i, v)) {
      case "boardroid":
        e = ["2", "D8", "dc"];
        break;
      case "jofemar":
        e = ["2", t, "50", "4F"];
        break;
    }
    s(l = i, a, o).call(l, e);
  }
  static doorClosed(r = null) {
    var n, l;
    if (!s(n = i, a, c).call(n, r) || !s(this, a, L).call(this)) return !1;
    let e = [];
    const t = (128 + m(i, x)).toString(16);
    switch (m(i, v)) {
      case "boardroid":
        e = ["2", "D8", "db"];
        break;
      case "jofemar":
        e = ["2", t, "50", "43"];
        break;
    }
    s(l = i, a, o).call(l, e);
  }
  static channelDisconnected(r = null) {
    var t, n, l;
    if (!s(t = i, a, c).call(t, r) || !s(n = i, a, _).call(n)) return !1;
    const e = (128 + m(i, x)).toString(16);
    s(l = i, a, o).call(l, ["2", e, "43", "43", "43", "FD"]);
  }
  static channelConnected(r = null) {
    var t, n, l;
    if (!s(t = i, a, c).call(t, r) || !s(n = i, a, _).call(n)) return !1;
    const e = (128 + m(i, x)).toString(16);
    s(l = i, a, o).call(l, ["2", e, "43", "43", "43", "FC"]);
  }
  static channelEmpty(r = null) {
    var t, n, l;
    if (!s(t = i, a, c).call(t, r) || !s(n = i, a, _).call(n)) return !1;
    const e = (128 + m(i, x)).toString(16);
    s(l = i, a, o).call(l, ["2", e, "43", "43", "43", "FF"]);
  }
  static workingTemperature(r = null) {
    var t, n, l;
    if (!s(t = i, a, c).call(t, r) || !s(n = i, a, _).call(n)) return !1;
    const e = (128 + m(i, x)).toString(16);
    s(l = i, a, o).call(l, ["2", e, "43", "54", "16"]);
  }
  static currentTemperature(r = null) {
    var n, l, h;
    if (!s(n = i, a, c).call(n, r) || !s(l = i, a, L).call(l)) return !1;
    let e = [];
    const t = (128 + m(i, x)).toString(16);
    switch (m(i, v)) {
      case "boardroid":
        e = ["2", "D9", "44", "30"];
        break;
      case "jofemar":
        e = ["2", t, "43", "74", "2B", "30", "39", "2E", "31", "7F", "43"];
        break;
    }
    s(h = i, a, o).call(h, e);
  }
  static ready(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "30"]);
  }
  static busy(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "31"]);
  }
  static invalidTray(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "32"]);
  }
  static invalidChannel(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "33"]);
  }
  static emptyChannel(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "34"]);
  }
  static elevatorJam(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "35"]);
  }
  static elevatorMalfunction(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "36"]);
  }
  static phototransistorFailure(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "37"]);
  }
  static allChannelsEmpty(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "38"]);
  }
  static productDetectorFailure(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "39"]);
  }
  static displayDisconnected(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "41"]);
  }
  static productUnderElevator(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "42"]);
  }
  static elevatorSettingAlarm(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "43"]);
  }
  static buttonPanelFailure(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "44"]);
  }
  static errorWritingEeprom(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "45"]);
  }
  static errorControlTemperature(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "46"]);
  }
  static thermometerDisconnected(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "47"]);
  }
  static thermometerMisconfigured(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "48"]);
  }
  static thermometerFailure(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "49"]);
  }
  static errorExtractorConsumption(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "4A"]);
  }
  static channelSearchError(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "4B"]);
  }
  static productExitMouthSearchError(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "4C"]);
  }
  static elevatorInteriorLocked(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "4D"]);
  }
  static productDetectorVerifierError(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "4E"]);
  }
  static waitingForProductRecall(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "4F"]);
  }
  static productExpiredByTemperature(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "50"]);
  }
  static faultyAutomaticDoor(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "51"]);
  }
  static rejectLever(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "A0", "1"]);
  }
  static resetCoinPurse(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "A0", "2"]);
  }
  static coinInsertedBox(r = null, e = null) {
    var l, h, f, d;
    if (!s(l = i, a, c).call(l, r) || !s(h = i, a, p).call(h)) return !1;
    const t = ["40", "41", "42", "43", "44", "45"], n = s(f = i, a, Y).call(f, t, e);
    s(d = i, a, o).call(d, ["2", "A0", n]);
  }
  static coinInsertedTube(r = null, e = null) {
    var l, h, f, d;
    if (!s(l = i, a, c).call(l, r) || !s(h = i, a, p).call(h)) return !1;
    const t = ["50", "51", "52", "53", "54", "55"], n = s(f = i, a, Y).call(f, t, e);
    s(d = i, a, o).call(d, ["2", "A0", n]);
  }
  static banknoteInsertedStacker(r = null, e = null) {
    var l, h, f, d;
    if (!s(l = i, a, c).call(l, r) || !s(h = i, a, p).call(h)) return !1;
    const t = ["80", "81", "82", "83", "84"], n = s(f = i, a, q).call(f, t, e);
    s(d = i, a, o).call(d, ["2", "B0", n]);
  }
  static banknoteInsertedEscrow(r = null, e = null) {
    var l, h, f, d;
    if (!s(l = i, a, c).call(l, r) || !s(h = i, a, p).call(h)) return !1;
    const t = ["90", "91", "92", "93", "94"], n = s(f = i, a, q).call(f, t, e);
    s(d = i, a, o).call(d, ["2", "B0", n]);
  }
  static banknoteEjected(r = null, e = null) {
    var l, h, f, d;
    if (!s(l = i, a, c).call(l, r) || !s(h = i, a, p).call(h)) return !1;
    const t = ["A0", "A1", "A2", "A3", "A4"], n = s(f = i, a, q).call(f, t, e);
    s(d = i, a, o).call(d, ["2", "B0", n]);
  }
  static banknoteInsertedRecycler(r = null, e = null) {
    var l, h, f, d;
    if (!s(l = i, a, c).call(l, r) || !s(h = i, a, p).call(h)) return !1;
    const t = ["B0", "B1", "B2", "B3", "B4"], n = s(f = i, a, q).call(f, t, e);
    s(d = i, a, o).call(d, ["2", "B0", n]);
  }
  static banknoteTaken(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "B0", "2a"]);
  }
  static coinPurseEnabled(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "D0", "1"]);
  }
  static coinPurseDisabled(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "D0", "0"]);
  }
  static billPurseDisabled(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "D1", "0", "0"]);
  }
  static billPurseEnabled(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "D1", "1", "1"]);
  }
  static readTubes(r = null) {
    var w, k, D;
    if (!s(w = i, a, c).call(w, r) || !s(k = i, a, p).call(k)) return !1;
    const e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f"], [t, n, l, h, f, d] = [
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)]
    ];
    s(D = i, a, o).call(D, ["2", "D2", t, n, l, h, f, d]);
  }
  static readBillPurse(r = null, e = null) {
    var n, l, h, f;
    if (!s(n = i, a, c).call(n, r) || !s(l = i, a, p).call(l)) return !1;
    let t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c"];
    if (r._recycler.ict) {
      const d = t[Math.floor(Math.random() * 31)];
      let w = "0", k = "0", D = "0", C = "0", I = "0";
      if (e !== null && !isNaN(parseInt(e)))
        switch (e.toString()) {
          case "20":
            w = d;
            break;
          case "50":
            k = d;
            break;
          case "100":
            D = d;
            break;
          case "200":
            C = d;
            break;
          case "500":
            I = d;
            break;
        }
      else
        switch (r._recycler.bill) {
          case 0:
            w = d;
            break;
          case 1:
            k = d;
            break;
          case 2:
            D = d;
            break;
          case 3:
            C = d;
            break;
          case 4:
            I = d;
            break;
        }
      s(h = i, a, o).call(h, ["2", "D3", w, k, D, C, I, "0"]);
    } else {
      const [d, w, k, D, C, I] = [
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 2)],
        t[Math.floor(Math.random())],
        t[Math.floor(Math.random())]
      ];
      s(f = i, a, o).call(f, ["2", "D3", d, w, k, D, C, I]);
    }
  }
  static banknoteAccepted(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "D4", "1"]);
  }
  static banknoteRejected(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "D4", "0"]);
  }
  static banknotesDispensed(r = null) {
    var t, n, l, h;
    if (!s(t = i, a, c).call(t, r) || !s(n = i, a, p).call(n)) return !1;
    let e = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c"];
    if (r._recycler.ict) {
      const f = e[Math.floor(Math.random() * 30)];
      let d = "0", w = "0", k = "0", D = "0", C = "0";
      switch (r._recycler.bill) {
        case 0:
          d = f;
          break;
        case 1:
          w = f;
          break;
        case 2:
          k = f;
          break;
        case 3:
          D = f;
          break;
        case 4:
          C = f;
          break;
      }
      s(l = i, a, o).call(l, ["2", "D5", d, w, k, D, C, "0"]);
    } else {
      const [f, d, w, k, D, C] = [
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 2)],
        e[Math.floor(Math.random())],
        e[Math.floor(Math.random())]
      ];
      s(h = i, a, o).call(h, ["2", "D5", f, d, w, k, D, C]);
    }
  }
  static coinsDispensed(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "D6"]);
  }
  static relayOn(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DA", "1"]);
  }
  static relayOff(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DA", "0"]);
  }
  static nayaxEnabled(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DD", "1"]);
  }
  static nayaxDisabled(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DD", "0"]);
  }
  static nayaxPreCreditAuthorized(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DD", "3"]);
  }
  static nayaxCancelRequest(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DD", "4"]);
  }
  static nayaxSellApproved(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DD", "5"]);
  }
  static nayaxSellDenied(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DD", "6"]);
  }
  static nayaxEndSession(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DD", "7"]);
  }
  static nayaxCancelled(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DD", "8"]);
  }
  static nayaxDispensed(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DD", "A", "0"]);
  }
  static nayaxNotDispensed(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, p).call(t)) return !1;
    s(n = i, a, o).call(n, ["2", "DD", "A", "1"]);
  }
  static fullTray(r = null) {
    var e, t, n;
    if (!s(e = i, a, c).call(e, r) || !s(t = i, a, _).call(t)) return !1;
    s(n = i, a, o).call(n, ["6", "4F"]);
  }
};
v = new WeakMap(), x = new WeakMap(), a = new WeakSet(), fe = function() {
  if (i.enable === !1) throw new Error("Emulator is disabled");
  return i.enable;
}, _e = function(r) {
  if (typeof r != "object" || !(r instanceof P)) throw new Error(`Type ${r.typeDevice} is not supported`);
  return i.instance = r, T(i, v, r.typeDevice), T(i, x, r.deviceNumber), !0;
}, c = function(r = null) {
  var e, t;
  return !s(e = i, a, fe).call(e) || r === null && i.instance === null ? !1 : (i.instance === null && s(t = i, a, _e).call(t, r), !0);
}, z = function() {
  if (m(i, v) !== "locker") throw new Error("This function is only available for Locker devices");
  return !0;
}, p = function() {
  if (m(i, v) !== "boardroid") throw new Error("This function is only available for Boardroid devices");
  return !0;
}, _ = function() {
  if (m(i, v) !== "boardroid") throw new Error("This function is only available for Jofemar devices");
  return !0;
}, L = function() {
  if (m(i, v) === "locker") throw new Error("This function is not available for Locker devices");
  return !0;
}, Te = function() {
  if (m(i, v) === "boardroid") throw new Error("This function is not available for Boardroid devices");
  return !0;
}, Ae = function() {
  if (m(i, v) === "jofemar") throw new Error("This function is not available for Jofemar devices");
  return !0;
}, o = function(r) {
  i.instance.__emulate({ code: r });
}, Y = function(r, e = null) {
  let t = r[Math.floor(Math.random() * 5)];
  if (e !== null && !isNaN(parseFloat(e)))
    switch (e.toString()) {
      case "0.5":
        t = r[1];
        break;
      case "1":
        t = r[2];
        break;
      case "2":
        t = r[3];
        break;
      case "5":
        t = r[4];
        break;
      case "10":
        t = r[5];
        break;
    }
  return t;
}, q = function(r, e = null) {
  let t = r[Math.floor(Math.random() * 4)];
  if (e !== null && !isNaN(parseFloat(e)))
    switch (e.toString()) {
      case "20":
        t = r[0];
        break;
      case "50":
        t = r[1];
        break;
      case "100":
        t = r[2];
        break;
      case "200":
        t = r[3];
        break;
      case "500":
        t = r[4];
        break;
    }
  return t;
}, S(i, a), E(i, "enable", !1), E(i, "instance", null), S(i, v, null), S(i, x, 1);
let $ = i;
var Fe = { BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
const Ie = {
  Relay: Se,
  Locker: Ce,
  Jofemar: Me,
  Boardroid: Ee,
  Devices: F,
  Emulator: $,
  version: Fe.VITE_APP_VERSION
};
export {
  Ee as Boardroid,
  F as Devices,
  $ as Emulator,
  Me as Jofemar,
  Ce as Locker,
  Se as Relay,
  Ie as Webserial
};
