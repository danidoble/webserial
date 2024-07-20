var se = Object.defineProperty;
var Q = (u) => {
  throw TypeError(u);
};
var le = (u, r, e) => r in u ? se(u, r, { enumerable: !0, configurable: !0, writable: !0, value: e }) : u[r] = e;
var E = (u, r, e) => le(u, typeof r != "symbol" ? r + "" : r, e), N = (u, r, e) => r.has(u) || Q("Cannot " + e);
var b = (u, r, e) => (N(u, r, "read from private field"), e ? e.call(u) : r.get(u)), S = (u, r, e) => r.has(u) ? Q("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(u) : r.set(u, e), j = (u, r, e, t) => (N(u, r, "write to private field"), t ? t.call(u, e) : r.set(u, e), e), a = (u, r, e) => (N(u, r, "access private method"), e);
var g = [];
for (var O = 0; O < 256; ++O)
  g.push((O + 256).toString(16).slice(1));
function oe(u, r = 0) {
  return (g[u[r + 0]] + g[u[r + 1]] + g[u[r + 2]] + g[u[r + 3]] + "-" + g[u[r + 4]] + g[u[r + 5]] + "-" + g[u[r + 6]] + g[u[r + 7]] + "-" + g[u[r + 8]] + g[u[r + 9]] + "-" + g[u[r + 10]] + g[u[r + 11]] + g[u[r + 12]] + g[u[r + 13]] + g[u[r + 14]] + g[u[r + 15]]).toLowerCase();
}
var F, ce = new Uint8Array(16);
function ue() {
  if (!F && (F = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !F))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return F(ce);
}
var de = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const $ = {
  randomUUID: de
};
function fe(u, r, e) {
  if ($.randomUUID && !r && !u)
    return $.randomUUID();
  u = u || {};
  var t = u.random || (u.rng || ue)();
  return t[6] = t[6] & 15 | 64, t[8] = t[8] & 63 | 128, oe(t);
}
class he extends EventTarget {
  dispatch(r, e = null) {
    const t = new pe(r, { detail: e });
    this.dispatchEvent(t);
  }
  on(r, e) {
    this.addEventListener(r, e);
  }
}
class pe extends CustomEvent {
  constructor(r, e) {
    super(r, e);
  }
}
function R(u = 100) {
  return new Promise((r) => setTimeout(() => r(), u));
}
function _e() {
  return "serial" in navigator;
}
var m, J, z, P, G, Y, K, X, Z, ee, te, re;
class I extends he {
  constructor({
    filters: e = null,
    config_port: t = null,
    no_device: i = 1
  } = {}) {
    super();
    S(this, m);
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
        id: fe()
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
      wait_until_last_command_returns: void 0,
      time_to_reconnect: 7e3,
      last_error: { message: null, handler: null, code: null, no_code: 0 }
    });
    e && (this.serialFilters = e), t && (this.serialConfigPort = t), i && a(this, m, te).call(this, i), a(this, m, Z).call(this);
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
  async timeout(e, t) {
    this.__internal__.last_error.message = "Operation response timed out.", this.__internal__.last_error.handler = t, this.__internal__.last_error.code = e, this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), t === "connect" ? (this.__internal__.serial.connected = !1, this.dispatch("serial:reconnect", {})) : t === "connection:start" && (await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector += 1, await this.serialConnect()), this.dispatch("timeout", {
      ...this.__internal__.last_error,
      bytes: e,
      action: t
    });
  }
  async disconnect(e = null) {
    this.isConnected && this.dispatch("serial:disconnected", e), await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector = 0;
  }
  async connect() {
    return new Promise((e, t) => {
      _e() || t("Web Serial not supported"), setTimeout(async () => {
        await R(499), await this.serialConnect(), this.isConnected ? e(`${this.typeDevice} device ${this.deviceNumber} connected`) : t(`${this.typeDevice} device ${this.deviceNumber} not connected`);
      }, 1);
    });
  }
  async serialDisconnect() {
    try {
      const e = this.__internal__.serial.reader, t = this.__internal__.serial.output_stream;
      e && (e.cancel().then(() => {
      }).catch((c) => this.serialErrors(c)), await this.__internal__.serial.input_done, this.__internal__.serial.reader = null, this.__internal__.serial.input_done = null), t && (await t.getWriter().close(), await this.__internal__.serial.output_done, this.__internal__.serial.output_stream = null, this.__internal__.serial.output_done = null), this.__internal__.serial.connected && this.__internal__.serial.port.close(), this.__internal__.serial.connected = !1, this.__internal__.serial.port = null;
    } catch (e) {
      this.serialErrors(e);
    }
  }
  async serialPortsSaved(e) {
    const t = this.serialFilters;
    if (this.__internal__.aux_port_connector < e.length) {
      const i = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = e[i];
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
        this.serialDisconnect.then(async () => {
          this.__internal__.aux_port_connector += 1, await this.serialConnect();
        });
        break;
      case t.includes("cannot read properties of undefined (reading 'writable')"):
      case t.includes("cannot read properties of null (reading 'writable')"):
      case t.includes("cannot read property 'writable' of null"):
      case t.includes("cannot read property 'writable' of undefined"):
      case t.includes("failed to open serial port"):
        this.serialDisconnect.then(async () => {
          await this.serialConnect();
        });
        break;
      case t.includes("failed to execute 'open' on 'serialport': a call to open() is already in progress."):
        break;
      case t.includes("the device has been lost"):
        break;
      case t.includes("navigator.serial is undefined"):
        break;
    }
  }
  async serialConnect() {
    try {
      const e = await a(this, m, G).call(this);
      if (e.length > 0)
        await this.serialPortsSaved(e);
      else {
        const c = this.serialFilters;
        this.__internal__.serial.port = await navigator.serial.requestPort({ filters: c });
      }
      const t = this.__internal__.serial.port;
      await t.open(this.serialConfigPort);
      const i = this;
      t.onconnect = (c) => {
        i.dispatch("serial:connected", c.detail), i.__internal__.serial.queue.length > 0 && i.dispatch("internal:queue", {});
      }, t.ondisconnect = async (c) => {
        await i.disconnect(c.detail ?? null);
      }, this.dispatch("serial:connecting", t.getInfo()), this.__internal__.timeout.until_response = setTimeout(async () => {
        await i.timeout(i.__internal__.serial.bytes_connection, "connection:start");
      }, this.__internal__.time.response_connection), await a(this, m, J).call(this, this.__internal__.serial.bytes_connection), this.typeDevice === "relay" && a(this, m, P).call(this, ["DD", "DD"], null), await a(this, m, K).call(this);
    } catch (e) {
      this.serialErrors(e);
    }
  }
  async serialForget() {
    return await a(this, m, X).call(this);
  }
  decToHex(e) {
    return parseInt(e, 10).toString(16);
  }
  hexToDec(e) {
    return parseInt(e, 16).toString(10);
  }
  hexMaker(e, t = 2) {
    e === void 0 && (e = "00");
    let i = t - e.toString().length;
    if (i > 0)
      for (let c = 0; c < i; c++)
        e = "0" + e;
    return e.toString().toUpperCase();
  }
  add0x(e) {
    let t = [];
    return e.forEach((i, c) => {
      t[c] = "0x" + i;
    }), t;
  }
  bytesToHex(e) {
    return this.add0x(Array.from(e, (t) => this.hexMaker(t)));
  }
  async appendToQueue(e, t) {
    const i = this.bytesToHex(e);
    if (["connect", "connection:start"].includes(t)) {
      if (this.__internal__.serial.connected) return;
      await this.serialConnect();
      return;
    }
    this.__internal__.serial.queue.push({ bytes: i, action: t }), this.dispatch("internal:queue", {});
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
    a(this, m, re).call(this), this.dispatch("serial:soft-reload", {});
  }
  async sendConnect() {
    await this.appendToQueue(this.__internal__.serial.bytes_connection, "connect");
  }
  async sendCustomCode(e) {
    await this.appendToQueue(e, "custom");
  }
}
m = new WeakSet(), J = async function(e) {
  const t = this.__internal__.serial.port;
  if (!t)
    throw new Error("The port is closed.");
  const i = new Uint8Array(e), c = t.writable.getWriter();
  await c.write(i), c.releaseLock();
}, z = function(e = []) {
  return e.map((t) => t.toString().toLowerCase());
}, P = function(e = [], t = null) {
  e && e.length > 0 ? (this.__internal__.serial.connected = !0, this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), this.serialMessage(a(this, m, z).call(this, e))) : this.serialCorruptMessage(e, t), this.__internal__.serial.queue.length !== 0 && this.dispatch("internal:queue", {});
}, G = async function() {
  const e = this.serialFilters;
  return (await navigator.serial.getPorts({ filters: e })).filter((i) => {
    const c = i.getInfo();
    return e.some((f) => c.usbProductId === f.usbProductId && c.usbVendorId === f.usbVendorId);
  });
}, Y = function(e) {
  if (e !== void 0) {
    const t = this.__internal__.serial.incoming;
    let i = new Uint8Array(t.length + e.byteLength);
    i.set(t, 0), i.set(new Uint8Array(e), t.length), this.__internal__.serial.incoming = i;
  }
}, K = async function() {
  const e = this.__internal__.serial.port;
  for (; e.readable && this.__internal__.serial.keep_reading; ) {
    const t = e.readable.getReader();
    this.__internal__.serial.reader = t;
    try {
      let i = !0;
      for (; i; ) {
        const { value: c, done: f } = await t.read();
        if (f) {
          t.releaseLock(), this.__internal__.serial.keep_reading = !1, i = !1;
          break;
        }
        a(this, m, Y).call(this, c), this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0), this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
          let h = [];
          for (const d in this.__internal__.serial.incoming)
            h.push(this.__internal__.serial.incoming[d].toString(16));
          this.__internal__.serial.incoming && a(this, m, P).call(this, h), this.__internal__.serial.incoming = new Uint8Array(0);
        }, 400);
      }
    } catch (i) {
      this.serialErrors(i);
    } finally {
      t.releaseLock();
    }
  }
  this.__internal__.serial.keep_reading = !0, await this.__internal__.serial.port.close();
}, X = async function() {
  return typeof window > "u" ? !1 : "serial" in navigator && "forget" in window.SerialPort.prototype ? (await this.__internal__.serial.port.forget(), !0) : !1;
}, Z = function() {
  this.on("internal:queue", async () => {
    await a(this, m, ee).call(this);
  });
}, ee = async function() {
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
  }), await a(this, m, J).call(this, e.bytes), this.typeDevice === "relay" && a(this, m, P).call(this, ["DD", "DD"], null);
  const t = [...this.__internal__.serial.queue];
  this.__internal__.serial.queue = t.splice(1);
}, te = function(e = 1) {
  this.__internal__.device_number = e, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(e);
}, re = function() {
  this.__internal__.last_error = { message: null, handler: null, code: null, no_code: 0 };
};
const y = class y {
  static typeError(r) {
    const e = new Error();
    throw e.message = `Type ${r} is not supported`, e.name = "DeviceTypeError", e;
  }
  static add(r) {
    const e = r.typeDevice, t = r.uuid;
    if (typeof y.devices[e] > "u") return y.typeError(e);
    if (!y.devices[e][t])
      return y.devices[e][t] = r, y.devices[e].indexOf(r);
  }
  static get(r, e) {
    return typeof y.devices[r] > "u" ? y.typeError(r) : y.devices[r][e];
  }
  static getJofemarByUuid(r) {
    return y.get("jofemar", r);
  }
  static getLockerByUuid(r) {
    return y.get("locker", r);
  }
  static getRelayByUuid(r) {
    return y.get("relay", r);
  }
  static getBoardroidByUuid(r) {
    return y.get("boardroid", r);
  }
  static getAll(r = null) {
    return r === null ? y.devices : typeof y.devices[r] > "u" ? y.typeError(r) : y.devices[r];
  }
  static getJofemar(r = 1) {
    return y.devices.jofemar.find((e) => e.deviceNumber === r);
  }
  static getBoardroid(r = 1) {
    return y.devices.boardroid.find((e) => e.deviceNumber === r);
  }
  static getLocker(r = 1) {
    return y.devices.locker.find((e) => e.deviceNumber === r);
  }
  static getRelay(r = 1) {
    return y.devices.relay.find((e) => e.deviceNumber === r);
  }
};
E(y, "devices", {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: []
});
let L = y;
var B, C, ne, U;
class me extends I {
  constructor({
    filters: e = null,
    config_port: t = null,
    no_device: i = 1
  } = {}) {
    super({ filters: e, config_port: t, no_device: i });
    S(this, C);
    S(this, B, {
      activate: ["A0", "01", "01", "A2"],
      deactivate: ["A0", "01", "00", "A1"]
    });
    this.__internal__.device.type = "relay", a(this, C, ne).call(this);
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
    this.dispatch("serialMessage", t);
  }
  serialSetConnectionConstant(e = 1) {
    const t = ["A0", "01", "00", "A1"];
    return t[1] = this.hexMaker(this.decToHex(e.toString())), t[3] = a(this, C, U).call(this, t), this.add0x(t);
  }
  async turnOn() {
    const e = b(this, B).activate;
    e[3] = a(this, C, U).call(this, e), await this.appendToQueue(e, "relay:turn-on");
  }
  async turnOff() {
    const e = b(this, B).deactivate;
    e[3] = a(this, C, U).call(this, e), await this.appendToQueue(e, "relay:turn-off");
  }
  async toggle(e = !1, t = 300) {
    const i = this;
    e ? (await i.turnOff(), await R(t), await i.turnOn()) : (await i.turnOn(), await R(t), await i.turnOff());
  }
}
B = new WeakMap(), C = new WeakSet(), ne = function() {
  L.add(this);
}, U = function(e) {
  let t = 0;
  return e.forEach((i, c) => {
    c !== 3 && (t += parseInt(i, 16));
  }), t.toString(16).toUpperCase();
};
class be extends I {
  constructor() {
    super();
  }
}
class ye extends I {
  constructor() {
    super();
  }
}
class ge extends I {
  constructor() {
    super();
    E(this, "_recycler", {
      ict: !0,
      bill: 1
      // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
    });
  }
}
var w, M, s, ie, ae, o, W, _, p, q, we, ve, l, H, A;
const n = class n {
  static status(r = null) {
    var t, i;
    if (!a(t = n, s, o).call(t, r)) return !1;
    let e = [];
    switch (b(n, w)) {
      case "locker":
        e = ["0", "8"];
        break;
      case "boardroid":
        e = ["2", (5 + b(n, M)).toString(16).toUpperCase()];
        break;
      case "jofemar":
        e = ["6"];
        break;
      default:
        return !1;
    }
    a(i = n, s, l).call(i, e);
  }
  static dispensed(r = null) {
    var t, i;
    if (!a(t = n, s, o).call(t, r)) return !1;
    let e = [];
    switch (b(n, w)) {
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
    a(i = n, s, l).call(i, e);
  }
  static notDispensed(r = null) {
    var t, i;
    if (!a(t = n, s, o).call(t, r)) return !1;
    let e = [];
    switch (b(n, w)) {
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
    a(i = n, s, l).call(i, e);
  }
  static gateInactive(r = null) {
    var e;
    if (!a(e = n, s, o).call(e, r) || !a(this, s, W).call(this)) return !1;
    a(this, s, l).call(this, ["0", "7", "5", "5", "5"]);
  }
  static gateConfigured(r = null) {
    var e;
    if (!a(e = n, s, o).call(e, r) || !a(this, s, W).call(this)) return !1;
    a(this, s, l).call(this, ["0", "6"]);
  }
  static keyPressed(r = null) {
    var c, f, h;
    if (!a(c = n, s, o).call(c, r) || !a(f = n, s, p).call(f)) return !1;
    const e = ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "2A", "23", "41", "42", "43", "44"], t = (128 + b(n, M)).toString(16), i = Math.floor(Math.random() * 15);
    a(h = n, s, l).call(h, ["2", t, "54", e[i]]);
  }
  static doorOpened(r = null) {
    var i, c;
    if (!a(i = n, s, o).call(i, r) || !a(this, s, q).call(this)) return !1;
    let e = [];
    const t = (128 + b(n, M)).toString(16);
    switch (b(n, w)) {
      case "boardroid":
        e = ["2", "D8", "dc"];
        break;
      case "jofemar":
        e = ["2", t, "50", "4F"];
        break;
    }
    a(c = n, s, l).call(c, e);
  }
  static doorClosed(r = null) {
    var i, c;
    if (!a(i = n, s, o).call(i, r) || !a(this, s, q).call(this)) return !1;
    let e = [];
    const t = (128 + b(n, M)).toString(16);
    switch (b(n, w)) {
      case "boardroid":
        e = ["2", "D8", "db"];
        break;
      case "jofemar":
        e = ["2", t, "50", "43"];
        break;
    }
    a(c = n, s, l).call(c, e);
  }
  static channelDisconnected(r = null) {
    var t, i, c;
    if (!a(t = n, s, o).call(t, r) || !a(i = n, s, p).call(i)) return !1;
    const e = (128 + b(n, M)).toString(16);
    a(c = n, s, l).call(c, ["2", e, "43", "43", "43", "FD"]);
  }
  static channelConnected(r = null) {
    var t, i, c;
    if (!a(t = n, s, o).call(t, r) || !a(i = n, s, p).call(i)) return !1;
    const e = (128 + b(n, M)).toString(16);
    a(c = n, s, l).call(c, ["2", e, "43", "43", "43", "FC"]);
  }
  static channelEmpty(r = null) {
    var t, i, c;
    if (!a(t = n, s, o).call(t, r) || !a(i = n, s, p).call(i)) return !1;
    const e = (128 + b(n, M)).toString(16);
    a(c = n, s, l).call(c, ["2", e, "43", "43", "43", "FF"]);
  }
  static workingTemperature(r = null) {
    var t, i, c;
    if (!a(t = n, s, o).call(t, r) || !a(i = n, s, p).call(i)) return !1;
    const e = (128 + b(n, M)).toString(16);
    a(c = n, s, l).call(c, ["2", e, "43", "54", "16"]);
  }
  static currentTemperature(r = null) {
    var i, c, f;
    if (!a(i = n, s, o).call(i, r) || !a(c = n, s, q).call(c)) return !1;
    let e = [];
    const t = (128 + b(n, M)).toString(16);
    switch (b(n, w)) {
      case "boardroid":
        e = ["2", "D9", "44", "30"];
        break;
      case "jofemar":
        e = ["2", t, "43", "74", "2B", "30", "39", "2E", "31", "7F", "43"];
        break;
    }
    a(f = n, s, l).call(f, e);
  }
  static ready(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "30"]);
  }
  static busy(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "31"]);
  }
  static invalidTray(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "32"]);
  }
  static invalidChannel(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "33"]);
  }
  static emptyChannel(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "34"]);
  }
  static elevatorJam(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "35"]);
  }
  static elevatorMalfunction(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "36"]);
  }
  static phototransistorFailure(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "37"]);
  }
  static allChannelsEmpty(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "38"]);
  }
  static productDetectorFailure(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "39"]);
  }
  static displayDisconnected(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "41"]);
  }
  static productUnderElevator(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "42"]);
  }
  static elevatorSettingAlarm(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "43"]);
  }
  static buttonPanelFailure(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "44"]);
  }
  static errorWritingEeprom(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "45"]);
  }
  static errorControlTemperature(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "46"]);
  }
  static thermometerDisconnected(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "47"]);
  }
  static thermometerMisconfigured(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "48"]);
  }
  static thermometerFailure(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "49"]);
  }
  static errorExtractorConsumption(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "4A"]);
  }
  static channelSearchError(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "4B"]);
  }
  static productExitMouthSearchError(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "4C"]);
  }
  static elevatorInteriorLocked(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "4D"]);
  }
  static productDetectorVerifierError(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "4E"]);
  }
  static waitingForProductRecall(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "4F"]);
  }
  static productExpiredByTemperature(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "50"]);
  }
  static faultyAutomaticDoor(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "51"]);
  }
  static rejectLever(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "A0", "1"]);
  }
  static resetCoinPurse(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "A0", "2"]);
  }
  static coinInsertedBox(r = null, e = null) {
    var c, f, h, d;
    if (!a(c = n, s, o).call(c, r) || !a(f = n, s, _).call(f)) return !1;
    const t = ["40", "41", "42", "43", "44", "45"], i = a(h = n, s, H).call(h, t, e);
    a(d = n, s, l).call(d, ["2", "A0", i]);
  }
  static coinInsertedTube(r = null, e = null) {
    var c, f, h, d;
    if (!a(c = n, s, o).call(c, r) || !a(f = n, s, _).call(f)) return !1;
    const t = ["50", "51", "52", "53", "54", "55"], i = a(h = n, s, H).call(h, t, e);
    a(d = n, s, l).call(d, ["2", "A0", i]);
  }
  static banknoteInsertedStacker(r = null, e = null) {
    var c, f, h, d;
    if (!a(c = n, s, o).call(c, r) || !a(f = n, s, _).call(f)) return !1;
    const t = ["80", "81", "82", "83", "84"], i = a(h = n, s, A).call(h, t, e);
    a(d = n, s, l).call(d, ["2", "B0", i]);
  }
  static banknoteInsertedEscrow(r = null, e = null) {
    var c, f, h, d;
    if (!a(c = n, s, o).call(c, r) || !a(f = n, s, _).call(f)) return !1;
    const t = ["90", "91", "92", "93", "94"], i = a(h = n, s, A).call(h, t, e);
    a(d = n, s, l).call(d, ["2", "B0", i]);
  }
  static banknoteEjected(r = null, e = null) {
    var c, f, h, d;
    if (!a(c = n, s, o).call(c, r) || !a(f = n, s, _).call(f)) return !1;
    const t = ["A0", "A1", "A2", "A3", "A4"], i = a(h = n, s, A).call(h, t, e);
    a(d = n, s, l).call(d, ["2", "B0", i]);
  }
  static banknoteInsertedRecycler(r = null, e = null) {
    var c, f, h, d;
    if (!a(c = n, s, o).call(c, r) || !a(f = n, s, _).call(f)) return !1;
    const t = ["B0", "B1", "B2", "B3", "B4"], i = a(h = n, s, A).call(h, t, e);
    a(d = n, s, l).call(d, ["2", "B0", i]);
  }
  static banknoteTaken(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "B0", "2a"]);
  }
  static coinPurseEnabled(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "D0", "1"]);
  }
  static coinPurseDisabled(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "D0", "0"]);
  }
  static billPurseDisabled(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "D1", "0", "0"]);
  }
  static billPurseEnabled(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "D1", "1", "1"]);
  }
  static readTubes(r = null) {
    var v, k, D;
    if (!a(v = n, s, o).call(v, r) || !a(k = n, s, _).call(k)) return !1;
    const e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f"], [t, i, c, f, h, d] = [
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)]
    ];
    a(D = n, s, l).call(D, ["2", "D2", t, i, c, f, h, d]);
  }
  static readBillPurse(r = null, e = null) {
    var i, c, f, h;
    if (!a(i = n, s, o).call(i, r) || !a(c = n, s, _).call(c)) return !1;
    let t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c"];
    if (r._recycler.ict) {
      const d = t[Math.floor(Math.random() * 31)];
      let v = "0", k = "0", D = "0", x = "0", T = "0";
      if (e !== null && !isNaN(parseInt(e)))
        switch (e.toString()) {
          case "20":
            v = d;
            break;
          case "50":
            k = d;
            break;
          case "100":
            D = d;
            break;
          case "200":
            x = d;
            break;
          case "500":
            T = d;
            break;
        }
      else
        switch (r._recycler.bill) {
          case 0:
            v = d;
            break;
          case 1:
            k = d;
            break;
          case 2:
            D = d;
            break;
          case 3:
            x = d;
            break;
          case 4:
            T = d;
            break;
        }
      a(f = n, s, l).call(f, ["2", "D3", v, k, D, x, T, "0"]);
    } else {
      const [d, v, k, D, x, T] = [
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 2)],
        t[Math.floor(Math.random())],
        t[Math.floor(Math.random())]
      ];
      a(h = n, s, l).call(h, ["2", "D3", d, v, k, D, x, T]);
    }
  }
  static banknoteAccepted(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "D4", "1"]);
  }
  static banknoteRejected(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "D4", "0"]);
  }
  static banknotesDispensed(r = null) {
    var t, i, c, f;
    if (!a(t = n, s, o).call(t, r) || !a(i = n, s, _).call(i)) return !1;
    let e = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c"];
    if (r._recycler.ict) {
      const h = e[Math.floor(Math.random() * 30)];
      let d = "0", v = "0", k = "0", D = "0", x = "0";
      switch (r._recycler.bill) {
        case 0:
          d = h;
          break;
        case 1:
          v = h;
          break;
        case 2:
          k = h;
          break;
        case 3:
          D = h;
          break;
        case 4:
          x = h;
          break;
      }
      a(c = n, s, l).call(c, ["2", "D5", d, v, k, D, x, "0"]);
    } else {
      const [h, d, v, k, D, x] = [
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 2)],
        e[Math.floor(Math.random())],
        e[Math.floor(Math.random())]
      ];
      a(f = n, s, l).call(f, ["2", "D5", h, d, v, k, D, x]);
    }
  }
  static coinsDispensed(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "D6"]);
  }
  static relayOn(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DA", "1"]);
  }
  static relayOff(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DA", "0"]);
  }
  static nayaxEnabled(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DD", "1"]);
  }
  static nayaxDisabled(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DD", "0"]);
  }
  static nayaxPreCreditAuthorized(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DD", "3"]);
  }
  static nayaxCancelRequest(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DD", "4"]);
  }
  static nayaxSellApproved(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DD", "5"]);
  }
  static nayaxSellDenied(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DD", "6"]);
  }
  static nayaxEndSession(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DD", "7"]);
  }
  static nayaxCancelled(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DD", "8"]);
  }
  static nayaxDispensed(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DD", "A", "0"]);
  }
  static nayaxNotDispensed(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, _).call(t)) return !1;
    a(i = n, s, l).call(i, ["2", "DD", "A", "1"]);
  }
  static fullTray(r = null) {
    var e, t, i;
    if (!a(e = n, s, o).call(e, r) || !a(t = n, s, p).call(t)) return !1;
    a(i = n, s, l).call(i, ["6", "4F"]);
  }
};
w = new WeakMap(), M = new WeakMap(), s = new WeakSet(), ie = function() {
  if (n.enable === !1) throw new Error("Emulator is disabled");
  return n.enable;
}, ae = function(r) {
  if (typeof r != "object" || !(r instanceof I)) throw new Error(`Type ${r.typeDevice} is not supported`);
  return n.instance = r, j(n, w, r.typeDevice), j(n, M, r.deviceNumber), !0;
}, o = function(r = null) {
  var e, t;
  return !a(e = n, s, ie).call(e) || r === null && n.instance === null ? !1 : (n.instance === null && a(t = n, s, ae).call(t, r), !0);
}, W = function() {
  if (b(n, w) !== "locker") throw new Error("This function is only available for Locker devices");
  return !0;
}, _ = function() {
  if (b(n, w) !== "boardroid") throw new Error("This function is only available for Boardroid devices");
  return !0;
}, p = function() {
  if (b(n, w) !== "boardroid") throw new Error("This function is only available for Jofemar devices");
  return !0;
}, q = function() {
  if (b(n, w) === "locker") throw new Error("This function is not available for Locker devices");
  return !0;
}, we = function() {
  if (b(n, w) === "boardroid") throw new Error("This function is not available for Boardroid devices");
  return !0;
}, ve = function() {
  if (b(n, w) === "jofemar") throw new Error("This function is not available for Jofemar devices");
  return !0;
}, l = function(r) {
  n.instance.__emulate({ code: r });
}, H = function(r, e = null) {
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
}, A = function(r, e = null) {
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
}, S(n, s), E(n, "enable", !1), E(n, "instance", null), S(n, w, null), S(n, M, 1);
let V = n;
const De = {
  Relay: me,
  Locker: be,
  Jofemar: ye,
  Boardroid: ge,
  Devices: L,
  Emulator: V,
  version: "3.0.0"
};
export {
  ge as Boardroid,
  L as Devices,
  V as Emulator,
  ye as Jofemar,
  be as Locker,
  me as Relay,
  De as Webserial
};
