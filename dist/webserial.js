var L = Object.defineProperty;
var b = (i) => {
  throw TypeError(i);
};
var T = (i, t, e) => t in i ? L(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var m = (i, t, e) => T(i, typeof t != "symbol" ? t + "" : t, e), I = (i, t, e) => t.has(i) || b("Cannot " + e);
var d = (i, t, e) => t.has(i) ? b("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(i) : t.set(i, e);
var c = (i, t, e) => (I(i, t, "access private method"), e);
var a = [];
for (var g = 0; g < 256; ++g)
  a.push((g + 256).toString(16).slice(1));
function A(i, t = 0) {
  return (a[i[t + 0]] + a[i[t + 1]] + a[i[t + 2]] + a[i[t + 3]] + "-" + a[i[t + 4]] + a[i[t + 5]] + "-" + a[i[t + 6]] + a[i[t + 7]] + "-" + a[i[t + 8]] + a[i[t + 9]] + "-" + a[i[t + 10]] + a[i[t + 11]] + a[i[t + 12]] + a[i[t + 13]] + a[i[t + 14]] + a[i[t + 15]]).toLowerCase();
}
var u, B = new Uint8Array(16);
function R() {
  if (!u && (u = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !u))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return u(B);
}
var N = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const k = {
  randomUUID: N
};
function q(i, t, e) {
  if (k.randomUUID && !t && !i)
    return k.randomUUID();
  i = i || {};
  var n = i.random || (i.rng || R)();
  return n[6] = n[6] & 15 | 64, n[8] = n[8] & 63 | 128, A(n);
}
class F extends EventTarget {
  dispatch(t, e = null) {
    const n = new M(t, { detail: e });
    this.dispatchEvent(n);
  }
  on(t, e) {
    this.addEventListener(t, e);
  }
}
class M extends CustomEvent {
  constructor(t, e) {
    super(t, e);
  }
}
function V(i = 100) {
  return new Promise((t) => setTimeout(() => t(), i));
}
function W() {
  return "serial" in navigator;
}
var l, x, C, y, U, E, D;
class p extends F {
  constructor({
    filters: e = null,
    config_port: n = null,
    no_device: r = 1
  } = {}) {
    super();
    d(this, l);
    m(this, "__internal__", {
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
        }
      },
      device: {
        type: "unknown",
        id: q()
      },
      time: {
        response_connection: 500
      },
      timeout: {
        until_response: 0
      },
      interval: {
        reconnection: 0
      },
      wait_until_last_command_returns: void 0,
      time_to_reconnect: 7e3,
      time_response_general: 2e3,
      queue_commands: [],
      last_error: { message: null, handler: null, code: null, no_code: 0 }
    });
    e && (this.serialFilters = e), n && (this.serialConfigPort = n), r && (this.deviceNumber = r);
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
  set deviceNumber(e) {
    this.__internal__.device_number = e;
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
  async disconnect(e = null) {
    this.isConnected && this.dispatch("serial:disconnected", e), await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector = 0;
  }
  async connect() {
    return new Promise((e, n) => {
      W() || n("Web Serial not supported"), setTimeout(async () => {
        await V(499), await this.serialConnect(), this.isConnected ? e(`${this.typeDevice} device ${this.deviceNumber} connected`) : n(`${this.typeDevice} device ${this.deviceNumber} not connected`);
      }, 1);
    });
  }
  async serialDisconnect() {
    try {
      const e = this.__internal__.serial.reader, n = this.__internal__.serial.output_stream;
      e && (e.cancel().then(() => {
      }).catch((o) => this.serialErrors(o)), await this.__internal__.serial.input_done, this.__internal__.serial.reader = null, this.__internal__.serial.input_done = null), n && (await n.getWriter().close(), await this.__internal__.serial.output_done, this.__internal__.serial.output_stream = null, this.__internal__.serial.output_done = null), this.__internal__.serial.connected && this.__internal__.serial.port.close(), this.__internal__.serial.connected = !1, this.__internal__.serial.port = null;
    } catch (e) {
      this.serialErrors(e);
    }
  }
  async serialPortsSaved(e) {
    const n = this.serialFilters;
    if (this.__internal__.aux_port_connector < e.length) {
      const r = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = e[r];
    } else
      this.__internal__.aux_port_connector = 0, this.__internal__.serial.port = await navigator.serial.requestPort({ filters: n });
    if (!this.__internal__.serial.port)
      throw new Error("Select another port please");
  }
  serialErrors(e) {
    const n = e.toString().toLowerCase();
    switch (!0) {
      case n.includes("must be handling a user gesture to show a permission request"):
      case n.includes("the port is closed."):
      case n.includes("select another port please"):
      case n.includes("no port selected by the user"):
      case n.includes("this readable stream reader has been released and cannot be used to cancel its previous owner stream"):
        break;
      case n.includes("the port is already open."):
        this.serialDisconnect.then(async () => {
          this.__internal__.aux_port_connector += 1, await this.serialConnect();
        });
        break;
      case n.includes("cannot read properties of undefined (reading 'writable')"):
      case n.includes("cannot read properties of null (reading 'writable')"):
      case n.includes("cannot read property 'writable' of null"):
      case n.includes("cannot read property 'writable' of undefined"):
      case n.includes("failed to open serial port"):
        this.serialDisconnect.then(async () => {
          await this.serialConnect();
        });
        break;
      case n.includes("failed to execute 'open' on 'serialport': a call to open() is already in progress."):
        break;
      case n.includes("the device has been lost"):
        break;
      case n.includes("navigator.serial is undefined"):
        break;
    }
  }
  async serialConnect() {
    try {
      const e = await c(this, l, U).call(this);
      if (e.length > 0)
        await this.serialPortsSaved(e);
      else {
        const o = this.serialFilters;
        this.__internal__.serial.port = await navigator.serial.requestPort({ filters: o });
      }
      const n = this.__internal__.serial.port;
      await n.open(this.serialConfigPort);
      const r = this;
      n.onconnect = (o) => {
        r.dispatch("serial:connected", o.detail);
      }, n.ondisconnect = async (o) => {
        await r.disconnect(o.detail ?? null);
      }, this.dispatch("serial:connecting", n.getInfo()), this.__internal__.timeout.until_response = setTimeout(async () => {
        await r.timeout(r.__internal__.serial.bytes_connection, "connection:start");
      }, this.__internal__.time.response_connection), await c(this, l, x).call(this, this.__internal__.serial.bytes_connection), this.typeDevice === "relay" && c(this, l, y).call(this, ["DD", "DD"], null), await c(this, l, D).call(this);
    } catch (e) {
      this.serialErrors(e);
    }
  }
  // eslint-disable-next-line no-unused-vars
  serialMessage(e) {
  }
  // eslint-disable-next-line no-unused-vars
  serialCorruptMessage(e, n) {
  }
}
l = new WeakSet(), x = async function(e) {
  const n = this.__internal__.serial.port;
  if (!n)
    throw new Error("The port is closed.");
  const r = new Uint8Array(e), o = n.writable.getWriter();
  await o.write(r), o.releaseLock();
}, C = function(e = []) {
  return e.map((n) => n.toString().toLowerCase());
}, y = function(e = [], n = null) {
  e && e.length > 0 ? (this.__internal__.serial.connected = !0, this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), this.serialMessage(c(this, l, C).call(this, e))) : this.serialCorruptMessage(e, n);
}, U = async function() {
  const e = this.serialFilters;
  return (await navigator.serial.getPorts({ filters: e })).filter((r) => {
    const o = r.getInfo();
    return e.some((_) => o.usbProductId === _.usbProductId && o.usbVendorId === _.usbVendorId);
  });
}, E = function(e) {
  if (e !== void 0) {
    const n = this.__internal__.serial.incoming;
    let r = new Uint8Array(n.length + e.byteLength);
    r.set(n, 0), r.set(new Uint8Array(e), n.length), this.__internal__.serial.incoming = r;
  }
}, D = async function() {
  const e = this.__internal__.serial.port;
  for (; e.readable && this.__internal__.serial.keep_reading; ) {
    const n = e.readable.getReader();
    this.__internal__.serial.reader = n;
    try {
      let r = !0;
      for (; r; ) {
        const { value: o, done: _ } = await n.read();
        if (_) {
          n.releaseLock(), this.__internal__.serial.keep_reading = !1, r = !1;
          break;
        }
        c(this, l, E).call(this, o), this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0), this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
          let w = [];
          for (const P in this.__internal__.serial.incoming)
            w.push(this.__internal__.serial.incoming[P].toString(16));
          this.__internal__.serial.incoming && c(this, l, y).call(this, w), this.__internal__.serial.incoming = new Uint8Array(0);
        }, 400);
      }
    } catch (r) {
      this.serialErrors(r);
    } finally {
      n.releaseLock();
    }
  }
  this.__internal__.serial.keep_reading = !0, await this.__internal__.serial.port.close();
};
const s = class s {
  static typeError(t) {
    const e = new Error();
    throw e.message = `Type ${t} is not supported`, e.name = "DeviceTypeError", e;
  }
  static add(t) {
    const e = t.typeDevice, n = t.uuid;
    if (typeof s.devices[e] > "u") return s.typeError(e);
    if (!s.devices[e][n])
      return s.devices[e][n] = t, s.devices[e].indexOf(t);
  }
  static get(t, e) {
    return typeof s.devices[t] > "u" ? s.typeError(t) : s.devices[t][e];
  }
  static getJofemarByUuid(t) {
    return s.get("jofemar", t);
  }
  static getLockerByUuid(t) {
    return s.get("locker", t);
  }
  static getRelayByUuid(t) {
    return s.get("relay", t);
  }
  static getBoardroidByUuid(t) {
    return s.get("boardroid", t);
  }
  static getAll(t = null) {
    return t === null ? s.devices : typeof s.devices[t] > "u" ? s.typeError(t) : s.devices[t];
  }
  static getJofemar(t = 1) {
    return s.devices.jofemar.find((e) => e.deviceNumber === t);
  }
  static getBoardroid(t = 1) {
    return s.devices.boardroid.find((e) => e.deviceNumber === t);
  }
  static getLocker(t = 1) {
    return s.devices.locker.find((e) => e.deviceNumber === t);
  }
  static getRelay(t = 1) {
    return s.devices.relay.find((e) => e.deviceNumber === t);
  }
};
m(s, "devices", {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: []
});
let f = s;
var v, h, S;
class j extends p {
  constructor({
    filters: e = null,
    config_port: n = null,
    no_device: r = 1
  } = {}) {
    super({ filters: e, config_port: n, no_device: r });
    d(this, h);
    d(this, v, {
      activate: ["A0", "01", "01", "A2"],
      deactivate: ["A0", "01", "00", "A1"]
    });
    this.__internal__.device.type = "relay", c(this, h, S).call(this);
  }
  serialMessage(e) {
    const n = {
      code: e,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    switch (e[1].toString()) {
      case "dd":
        n.name = "Connection with the serial device completed.", n.description = "Your connection with the serial device was successfully completed.", n.request = "connect", n.no_code = 100;
        break;
      case "de":
        break;
      default:
        n.name = "Unrecognized response", n.description = "The response of application was received, but dont identify with any of current parameters", n.request = "undefined", n.no_code = 400;
        break;
    }
    this.dispatch("serialMessage", n);
  }
  //serialCorruptMessage(code = null, data = null) {}
}
v = new WeakMap(), h = new WeakSet(), S = function() {
  f.add(this);
};
class J extends p {
  constructor() {
    super();
  }
}
class z extends p {
  constructor() {
    super();
  }
}
class G extends p {
  constructor() {
    super();
  }
}
export {
  G as Boardroid,
  f as Devices,
  z as Jofemar,
  J as Locker,
  j as Relay
};
