var V = Object.defineProperty, R = (n) => {
  throw TypeError(n);
}, z = (n, e, t) => e in n ? V(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t, y = (n, e, t) => z(n, typeof e != "symbol" ? e + "" : e, t), T = (n, e, t) => e.has(n) || R("Cannot " + t), b = (n, e, t) => (T(n, e, "read from private field"), e.get(n)), S = (n, e, t) => e.has(n) ? R("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(n) : e.set(n, t), J = (n, e, t, i) => (T(n, e, "write to private field"), e.set(n, t), t), l = (n, e, t) => (T(n, e, "access private method"), t);
class A extends CustomEvent {
  constructor(e, t) {
    super(e, t);
  }
}
class I extends EventTarget {
  constructor() {
    super(...arguments), y(this, "__listeners__", {
      debug: !1
    }), y(this, "__debug__", !1), y(this, "__listenersCallbacks__", []);
  }
  dispatch(e, t = null) {
    const i = new A(e, { detail: t });
    this.dispatchEvent(i), this.__debug__ && this.dispatchEvent(new A("debug", { detail: { type: e, data: t } }));
  }
  dispatchAsync(e, t = null, i = 100) {
    const s = this;
    setTimeout(() => {
      s.dispatch(e, t);
    }, i);
  }
  on(e, t) {
    typeof this.__listeners__[e] < "u" && !this.__listeners__[e] && (this.__listeners__[e] = !0), this.__listenersCallbacks__.push({ key: e, callback: t }), this.addEventListener(e, t);
  }
  off(e, t) {
    this.__listenersCallbacks__ = this.__listenersCallbacks__.filter((i) => !(i.key === e && i.callback === t)), this.removeEventListener(e, t);
  }
  serialRegisterAvailableListener(e) {
    this.__listeners__[e] || (this.__listeners__[e] = !1);
  }
  get availableListeners() {
    return Object.keys(this.__listeners__).sort().map((e) => ({
      type: e,
      listening: this.__listeners__[e]
    }));
  }
  removeAllListeners() {
    for (const e of this.__listenersCallbacks__)
      ["internal:queue"].includes(e.key) || (this.__listenersCallbacks__ = this.__listenersCallbacks__.filter((t) => !(t.key === e.key && t.callback === e.callback)), this.removeEventListener(e.key, e.callback));
    for (const e of Object.keys(this.__listeners__))
      this.__listeners__[e] = !1;
  }
}
const C = class a extends I {
  constructor() {
    super(), ["change"].forEach((e) => {
      this.serialRegisterAvailableListener(e);
    });
  }
  static $dispatchChange(e = null) {
    e && e.$checkAndDispatchConnection(), a.instance.dispatch("change", { devices: a.devices, dispatcher: e });
  }
  static typeError(e) {
    const t = new Error();
    throw t.message = `Type ${e} is not supported`, t.name = "DeviceTypeError", t;
  }
  static registerType(e) {
    typeof a.devices[e] > "u" && (a.devices = { ...a.devices, [e]: {} });
  }
  static add(e) {
    const t = e.typeDevice;
    typeof a.devices[t] > "u" && a.registerType(t);
    const i = e.uuid;
    if (typeof a.devices[t] > "u" && a.typeError(t), a.devices[t][i])
      throw new Error(`Device with id ${i} already exists`);
    return a.devices[t][i] = e, a.$dispatchChange(e), Object.keys(a.devices[t]).indexOf(i);
  }
  static get(e, t) {
    return typeof a.devices[e] > "u" && a.registerType(e), typeof a.devices[e] > "u" && a.typeError(e), a.devices[e][t];
  }
  static getAll(e = null) {
    return e === null ? a.devices : (typeof a.devices[e] > "u" && a.typeError(e), a.devices[e]);
  }
  static getList() {
    return Object.values(a.devices).map((e) => Object.values(e)).flat();
  }
  static getByNumber(e, t) {
    return typeof a.devices[e] > "u" && a.typeError(e), Object.values(a.devices[e]).find((i) => i.deviceNumber === t) ?? null;
  }
  static getCustom(e, t = 1) {
    return typeof a.devices[e] > "u" && a.typeError(e), Object.values(a.devices[e]).find((i) => i.deviceNumber === t) ?? null;
  }
  static async connectToAll() {
    const e = a.getList();
    for (const t of e)
      t.isConnected || await t.connect().catch(console.warn);
    return Promise.resolve(a.areAllConnected());
  }
  static async disconnectAll() {
    const e = a.getList();
    for (const t of e)
      t.isDisconnected || await t.disconnect().catch(console.warn);
    return Promise.resolve(a.areAllDisconnected());
  }
  static async areAllConnected() {
    const e = a.getList();
    for (const t of e)
      if (!t.isConnected) return Promise.resolve(!1);
    return Promise.resolve(!0);
  }
  static async areAllDisconnected() {
    const e = a.getList();
    for (const t of e)
      if (!t.isDisconnected) return Promise.resolve(!1);
    return Promise.resolve(!0);
  }
  static async getAllConnected() {
    const e = a.getList();
    return Promise.resolve(e.filter((t) => t.isConnected));
  }
  static async getAllDisconnected() {
    const e = a.getList();
    return Promise.resolve(e.filter((t) => t.isDisconnected));
  }
};
y(C, "instance"), y(C, "devices", {});
let c = C;
c.instance || (c.instance = new c());
function M(n = 100) {
  return new Promise(
    (e) => setTimeout(() => e(), n)
  );
}
function G() {
  return "serial" in navigator;
}
const v = {
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: "none",
  bufferSize: 32768,
  flowControl: "none"
};
var p, r, f, m, q, x, k, u, N, L, D, B, P, O, g, H, j, F, U, $, W, Q;
class K extends I {
  constructor({
    filters: e = null,
    config_port: t = v,
    no_device: i = 1,
    device_listen_on_channel: s = 1,
    bypassSerialBytesConnection: o = !1
  } = {
    filters: null,
    config_port: v,
    no_device: 1,
    device_listen_on_channel: 1,
    bypassSerialBytesConnection: !1
  }) {
    if (super(), S(this, r), y(this, "__internal__", {
      bypassSerialBytesConnection: !1,
      auto_response: !1,
      device_number: 1,
      aux_port_connector: 0,
      last_error: {
        message: null,
        action: null,
        code: null,
        no_code: 0
      },
      serial: {
        aux_connecting: "idle",
        connecting: !1,
        connected: !1,
        port: null,
        last_action: null,
        response: {
          length: null,
          buffer: new Uint8Array([]),
          as: "uint8",
          replacer: /[\n\r]+/g,
          limiter: null,
          prefixLimiter: !1,
          sufixLimiter: !0,
          delimited: !1
        },
        reader: null,
        input_done: null,
        output_done: null,
        input_stream: null,
        output_stream: null,
        keep_reading: !0,
        time_until_send_bytes: void 0,
        delay_first_connection: 200,
        bytes_connection: null,
        filters: [],
        config_port: v,
        queue: [],
        auto_response: ["DD", "DD"],
        free_timeout_ms: 50,
        // In previous versions 400 was used
        useRTSCTS: !1
        // Use RTS/CTS flow control
      },
      device: {
        type: "unknown",
        id: window.crypto.randomUUID(),
        listen_on_port: null
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
      }
    }), S(this, p, null), !("serial" in navigator))
      throw new Error("Web Serial not supported");
    e && (this.serialFilters = e), t && (this.serialConfigPort = t), o && (this.__internal__.bypassSerialBytesConnection = o), i && l(this, r, W).call(this, i), s && ["number", "string"].includes(typeof s) && (this.listenOnChannel = s), l(this, r, j).call(this), l(this, r, F).call(this);
  }
  set listenOnChannel(e) {
    if (typeof e == "string" && (e = parseInt(e)), isNaN(e) || e < 1 || e > 255)
      throw new Error("Invalid port number");
    this.__internal__.device.listen_on_port = e, !this.__internal__.bypassSerialBytesConnection && (this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(e));
  }
  get lastAction() {
    return this.__internal__.serial.last_action;
  }
  get listenOnChannel() {
    return this.__internal__.device.listen_on_port ?? 1;
  }
  set serialFilters(e) {
    if (this.isConnected) throw new Error("Cannot change serial filters while connected");
    this.__internal__.serial.filters = e;
  }
  get serialFilters() {
    return this.__internal__.serial.filters;
  }
  set serialConfigPort(e) {
    if (this.isConnected) throw new Error("Cannot change serial filters while connected");
    this.__internal__.serial.config_port = e;
  }
  get serialConfigPort() {
    return this.__internal__.serial.config_port;
  }
  get useRTSCTS() {
    return this.__internal__.serial.useRTSCTS;
  }
  set useRTSCTS(e) {
    this.__internal__.serial.useRTSCTS = e;
  }
  get isConnected() {
    const e = this.__internal__.serial.connected, t = l(this, r, f).call(this, this.__internal__.serial.port);
    return e && !t && l(this, r, m).call(this, { error: "Port is closed, not readable or writable." }), this.__internal__.serial.connected = t, this.__internal__.serial.connected;
  }
  get isConnecting() {
    return this.__internal__.serial.connecting;
  }
  get isDisconnected() {
    const e = this.__internal__.serial.connected, t = l(this, r, f).call(this, this.__internal__.serial.port);
    return !e && t && (this.dispatch("serial:connected"), l(this, r, g).call(this, !1), c.$dispatchChange(this)), this.__internal__.serial.connected = t, !this.__internal__.serial.connected;
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
  get responseDelimited() {
    return this.__internal__.serial.response.delimited;
  }
  set responseDelimited(e) {
    if (typeof e != "boolean")
      throw new Error("responseDelimited must be a boolean");
    this.__internal__.serial.response.delimited = e;
  }
  get responsePrefixLimited() {
    return this.__internal__.serial.response.prefixLimiter;
  }
  set responsePrefixLimited(e) {
    if (typeof e != "boolean")
      throw new Error("responsePrefixLimited must be a boolean");
    this.__internal__.serial.response.prefixLimiter = e;
  }
  get responseSufixLimited() {
    return this.__internal__.serial.response.sufixLimiter;
  }
  set responseSufixLimited(e) {
    if (typeof e != "boolean")
      throw new Error("responseSufixLimited must be a boolean");
    this.__internal__.serial.response.sufixLimiter = e;
  }
  get responseLimiter() {
    return this.__internal__.serial.response.limiter;
  }
  set responseLimiter(e) {
    if (typeof e != "string" && !(e instanceof RegExp))
      throw new Error("responseLimiter must be a string or a RegExp");
    this.__internal__.serial.response.limiter = e;
  }
  get fixedBytesMessage() {
    return this.__internal__.serial.response.length;
  }
  set fixedBytesMessage(e) {
    if (e !== null && (typeof e != "number" || e < 1))
      throw new Error("Invalid length for fixed bytes message");
    this.__internal__.serial.response.length = e;
  }
  get timeoutBeforeResponseBytes() {
    return this.__internal__.serial.free_timeout_ms || 50;
  }
  set timeoutBeforeResponseBytes(e) {
    if (e !== void 0 && (typeof e != "number" || e < 1))
      throw new Error("Invalid timeout for response bytes");
    this.__internal__.serial.free_timeout_ms = e ?? 50;
  }
  get bypassSerialBytesConnection() {
    return this.__internal__.bypassSerialBytesConnection;
  }
  set bypassSerialBytesConnection(e) {
    if (typeof e != "boolean")
      throw new Error("bypassSerialBytesConnection must be a boolean");
    this.__internal__.bypassSerialBytesConnection = e;
  }
  async timeout(e, t) {
    this.__internal__.last_error.message = "Operation response timed out.", this.__internal__.last_error.action = t, this.__internal__.last_error.code = e, this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), t === "connect" ? (this.__internal__.serial.connected = !1, this.dispatch("serial:reconnect", {}), c.$dispatchChange(this)) : t === "connection:start" && (await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector += 1, c.$dispatchChange(this), await this.serialConnect()), this.dispatch("serial:timeout", {
      ...this.__internal__.last_error,
      bytes: e,
      action: t
    });
  }
  async disconnect(e = null) {
    await this.serialDisconnect(), l(this, r, m).call(this, e);
  }
  async connect() {
    return this.isConnected ? !0 : (this.__internal__.serial.aux_connecting = "idle", new Promise((e, t) => {
      G() || t("Web Serial not supported"), b(this, p) || J(this, p, l(this, r, q).bind(this)), this.on("internal:connecting", b(this, p));
      const i = setInterval(() => {
        this.__internal__.serial.aux_connecting === "finished" ? (clearInterval(i), this.__internal__.serial.aux_connecting = "idle", b(this, p) !== null && this.off("internal:connecting", b(this, p)), this.isConnected ? e(!0) : t(`${this.typeDevice} device ${this.deviceNumber} not connected`)) : this.__internal__.serial.aux_connecting === "connecting" && (this.__internal__.serial.aux_connecting = "idle", this.dispatch("internal:connecting", { active: !0 }), this.dispatch("serial:connecting", { active: !0 }));
      }, 100);
      this.serialConnect();
    }));
  }
  async serialDisconnect() {
    try {
      const e = this.__internal__.serial.reader, t = this.__internal__.serial.output_stream;
      e && (await e.cancel().catch((i) => this.serialErrors(i)), await this.__internal__.serial.input_done), t && (await t.getWriter().close(), await this.__internal__.serial.output_done), this.__internal__.serial.connected && this.__internal__.serial && this.__internal__.serial.port && await this.__internal__.serial.port.close();
    } catch (e) {
      this.serialErrors(e);
    } finally {
      this.__internal__.serial.reader = null, this.__internal__.serial.input_done = null, this.__internal__.serial.output_stream = null, this.__internal__.serial.output_done = null, this.__internal__.serial.connected = !1, this.__internal__.serial.port = null, c.$dispatchChange(this);
    }
  }
  getResponseAsArrayBuffer() {
    this.__internal__.serial.response.as = "arraybuffer";
  }
  getResponseAsArrayHex() {
    this.__internal__.serial.response.as = "hex";
  }
  getResponseAsUint8Array() {
    this.__internal__.serial.response.as = "uint8";
  }
  getResponseAsString() {
    this.__internal__.serial.response.as = "string";
  }
  async serialPortsSaved(e) {
    const t = this.serialFilters;
    if (this.__internal__.aux_port_connector < e.length) {
      const i = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = e[i];
    } else
      this.__internal__.aux_port_connector = 0, this.__internal__.serial.port = await navigator.serial.requestPort({
        filters: t
      });
    if (!this.__internal__.serial.port)
      throw new Error("Select another port please");
  }
  serialErrors(e) {
    const t = e.toString().toLowerCase();
    switch (!0) {
      case t.includes("must be handling a user gesture to show a permission request"):
      case t.includes("the port is closed."):
      case t.includes("the port is closed or is not writable"):
      case t.includes("the port is closed or is not readable"):
      case t.includes("the port is closed or is not readable/writable"):
      case t.includes("select another port please"):
      case t.includes("no port selected by the user"):
      case t.includes(
        "this readable stream reader has been released and cannot be used to cancel its previous owner stream"
      ):
        this.dispatch("serial:need-permission", {}), c.$dispatchChange(this);
        break;
      case t.includes("the port is already open."):
      case t.includes("failed to open serial port"):
        this.serialDisconnect().then(async () => {
          this.__internal__.aux_port_connector += 1, await this.serialConnect();
        });
        break;
      case t.includes("cannot read properties of undefined (reading 'writable')"):
      case t.includes("cannot read properties of null (reading 'writable')"):
      case t.includes("cannot read property 'writable' of null"):
      case t.includes("cannot read property 'writable' of undefined"):
        this.serialDisconnect().then(async () => {
          await this.serialConnect();
        });
        break;
      case t.includes("'close' on 'serialport': a call to close() is already in progress."):
        break;
      case t.includes("failed to execute 'open' on 'serialport': a call to open() is already in progress."):
        break;
      case t.includes("the port is already closed."):
        break;
      case t.includes("the device has been lost"):
        this.dispatch("serial:lost", {}), c.$dispatchChange(this);
        break;
      case t.includes("navigator.serial is undefined"):
        this.dispatch("serial:unsupported", {});
        break;
      default:
        console.error(e);
        break;
    }
    this.dispatch("serial:error", e);
  }
  async serialConnect() {
    try {
      l(this, r, g).call(this, !0);
      const e = await l(this, r, N).call(this);
      if (e.length > 0)
        await this.serialPortsSaved(e);
      else {
        const s = this.serialFilters;
        this.__internal__.serial.port = await navigator.serial.requestPort({
          filters: s
        });
      }
      const t = this.__internal__.serial.port;
      if (!t)
        throw new Error("No port selected by the user");
      await t.open(this.serialConfigPort);
      const i = this;
      t.onconnect = (s) => {
        var o;
        i.dispatch("serial:connected", s), l(o = i, r, g).call(o, !1), c.$dispatchChange(this), i.__internal__.serial.queue.length > 0 && i.dispatch("internal:queue", {});
      }, t.ondisconnect = async () => {
        await i.disconnect();
      }, await M(this.__internal__.serial.delay_first_connection), this.__internal__.timeout.until_response = setTimeout(async () => {
        await i.timeout(i.__internal__.serial.bytes_connection ?? [], "connection:start");
      }, this.__internal__.time.response_connection), this.__internal__.serial.last_action = "connect", await l(this, r, x).call(this, this.__internal__.serial.bytes_connection ?? []), this.dispatch("serial:sent", {
        action: "connect",
        bytes: this.__internal__.serial.bytes_connection
      }), this.__internal__.auto_response && l(this, r, u).call(this, this.__internal__.serial.auto_response), await l(this, r, O).call(this);
    } catch (e) {
      l(this, r, g).call(this, !1), this.serialErrors(e);
    }
  }
  async serialForget() {
    return await l(this, r, H).call(this);
  }
  decToHex(e) {
    return typeof e == "string" && (e = parseInt(e, 10)), e.toString(16);
  }
  hexToDec(e) {
    return parseInt(e, 16);
  }
  hexMaker(e = "00", t = 2) {
    return e.toString().padStart(t, "0").toLowerCase();
  }
  add0x(e) {
    const t = [];
    return e.forEach((i, s) => {
      t[s] = "0x" + i;
    }), t;
  }
  bytesToHex(e) {
    return this.add0x(Array.from(e, (t) => this.hexMaker(t)));
  }
  validateBytes(e) {
    let t = new Uint8Array(0);
    if (e instanceof Uint8Array)
      t = e;
    else if (typeof e == "string")
      t = this.parseStringToTextEncoder(e);
    else if (Array.isArray(e) && typeof e[0] == "string")
      t = this.stringArrayToUint8Array(e);
    else if (Array.isArray(e) && typeof e[0] == "number")
      t = new Uint8Array(e);
    else
      throw new Error("Invalid data type");
    return t;
  }
  async appendToQueue(e, t) {
    const i = this.validateBytes(e);
    if (["connect", "connection:start"].includes(t)) {
      if (this.__internal__.serial.connected) return;
      await this.serialConnect();
      return;
    }
    this.__internal__.serial.queue.push({ bytes: i, action: t }), this.dispatch("internal:queue", {});
  }
  serialSetConnectionConstant(e = 1) {
    if (this.__internal__.bypassSerialBytesConnection) return this.__internal__.serial.bytes_connection;
    throw new Error(`Method not implemented 'serialSetConnectionConstant' to listen on channel ${e}`);
  }
  serialMessage(e) {
    throw console.log(e), this.dispatch("serial:message", { code: e }), new Error("Method not implemented 'serialMessage'");
  }
  serialCorruptMessage(e) {
    throw console.log(e), this.dispatch("serial:corrupt-message", { code: e }), new Error("Method not implemented 'serialCorruptMessage'");
  }
  clearSerialQueue() {
    this.__internal__.serial.queue = [];
  }
  sumHex(e) {
    let t = 0;
    return e.forEach((i) => {
      t += parseInt(i, 16);
    }), t.toString(16);
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
    l(this, r, Q).call(this), this.dispatch("serial:soft-reload", {});
  }
  async sendConnect() {
    if (!this.__internal__.serial.bytes_connection)
      throw new Error("No connection bytes defined");
    await this.appendToQueue(this.__internal__.serial.bytes_connection, "connect");
  }
  async sendCustomCode({ code: e = [] } = { code: [] }) {
    if (!e)
      throw new Error("No data to send");
    this.__internal__.bypassSerialBytesConnection && (this.__internal__.serial.bytes_connection = this.validateBytes(e)), await this.appendToQueue(e, "custom");
  }
  stringToArrayHex(e) {
    return Array.from(e).map((t) => t.charCodeAt(0).toString(16));
  }
  stringToArrayBuffer(e, t = `
`) {
    return this.parseStringToTextEncoder(e, t).buffer;
  }
  parseStringToTextEncoder(e = "", t = `
`) {
    const i = new TextEncoder();
    return e += t, i.encode(e);
  }
  parseStringToBytes(e = "", t = `
`) {
    const i = this.parseStringToTextEncoder(e, t);
    return Array.from(i).map((s) => s.toString(16));
  }
  parseUint8ToHex(e) {
    return Array.from(e).map((t) => t.toString(16));
  }
  parseHexToUint8(e) {
    return new Uint8Array(e.map((t) => parseInt(t, 16)));
  }
  stringArrayToUint8Array(e) {
    const t = [];
    return typeof e == "string" ? this.parseStringToTextEncoder(e).buffer : (e.forEach((i) => {
      const s = i.replace("0x", "");
      t.push(parseInt(s, 16));
    }), new Uint8Array(t));
  }
  parseUint8ArrayToString(e) {
    let t = new Uint8Array(0);
    e instanceof Uint8Array ? t = e : t = this.stringArrayToUint8Array(e), e = this.parseUint8ToHex(t);
    const i = e.map((s) => parseInt(s, 16));
    return this.__internal__.serial.response.replacer ? String.fromCharCode(...i).replace(this.__internal__.serial.response.replacer, "") : String.fromCharCode(...i);
  }
  hexToAscii(e) {
    const t = e.toString();
    let i = "";
    for (let s = 0; s < t.length; s += 2)
      i += String.fromCharCode(parseInt(t.substring(s, 2), 16));
    return i;
  }
  asciiToHex(e) {
    const t = [];
    for (let i = 0, s = e.length; i < s; i++) {
      const o = Number(e.charCodeAt(i)).toString(16);
      t.push(o);
    }
    return t.join("");
  }
  $checkAndDispatchConnection() {
    return this.isConnected;
  }
}
p = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakSet(), f = function(n) {
  return !!(n && n.readable && n.writable);
}, m = function(n = null) {
  this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector = 0, this.dispatch("serial:disconnected", n), c.$dispatchChange(this);
}, q = function(n) {
  this.__internal__.serial.aux_connecting = n.detail.active ? "connecting" : "finished";
}, x = async function(n) {
  const e = this.__internal__.serial.port;
  if (!e || e && (!e.readable || !e.writable))
    throw l(this, r, m).call(this, { error: "Port is closed, not readable or writable." }), new Error("The port is closed or is not readable/writable");
  const t = this.validateBytes(n);
  if (this.useRTSCTS && await l(this, r, k).call(this, e, 5e3), e.writable === null) return;
  const i = e.writable.getWriter();
  await i.write(t), i.releaseLock();
}, k = async function(n, e = 5e3) {
  const t = Date.now();
  for (; ; ) {
    if (Date.now() - t > e)
      throw new Error("Timeout waiting for clearToSend signal");
    const { clearToSend: i } = await n.getSignals();
    if (i) return;
    await M(100);
  }
}, u = function(n = new Uint8Array([]), e = !1) {
  if (n && n.length > 0) {
    const t = this.__internal__.serial.connected;
    if (this.__internal__.serial.connected = l(this, r, f).call(this, this.__internal__.serial.port), c.$dispatchChange(this), !t && this.__internal__.serial.connected && (this.dispatch("serial:connected"), l(this, r, g).call(this, !1)), this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), this.__internal__.serial.response.as === "hex")
      e ? this.serialCorruptMessage(this.parseUint8ToHex(n)) : this.serialMessage(this.parseUint8ToHex(n));
    else if (this.__internal__.serial.response.as === "uint8")
      e ? this.serialCorruptMessage(n) : this.serialMessage(n);
    else if (this.__internal__.serial.response.as === "string") {
      const i = this.parseUint8ArrayToString(n);
      if (this.__internal__.serial.response.limiter !== null) {
        const s = i.split(this.__internal__.serial.response.limiter);
        for (const o in s)
          s[o] && (e ? this.serialCorruptMessage(s[o]) : this.serialMessage(s[o]));
      } else
        e ? this.serialCorruptMessage(i) : this.serialMessage(i);
    } else {
      const i = this.stringToArrayBuffer(this.parseUint8ArrayToString(n));
      e ? this.serialCorruptMessage(i) : this.serialMessage(i);
    }
  }
  this.__internal__.serial.queue.length !== 0 && this.dispatch("internal:queue", {});
}, N = async function() {
  const n = this.serialFilters, e = await navigator.serial.getPorts({ filters: n });
  return n.length === 0 ? e : e.filter((t) => {
    const i = t.getInfo();
    return n.some((s) => i.usbProductId === s.usbProductId && i.usbVendorId === s.usbVendorId);
  }).filter((t) => !l(this, r, f).call(this, t));
}, L = function(n) {
  if (n) {
    const e = this.__internal__.serial.response.buffer, t = new Uint8Array(e.length + n.byteLength);
    t.set(e, 0), t.set(new Uint8Array(n), e.length), this.__internal__.serial.response.buffer = t;
  }
}, D = async function() {
  this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0), this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
    this.__internal__.serial.response.buffer && l(this, r, u).call(this, this.__internal__.serial.response.buffer), this.__internal__.serial.response.buffer = new Uint8Array(0);
  }, this.__internal__.serial.free_timeout_ms || 50);
}, B = async function() {
  const n = this.__internal__.serial.response.length;
  let e = this.__internal__.serial.response.buffer;
  if (this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0), !(n === null || !e || e.length === 0)) {
    for (; e.length >= n; ) {
      const t = e.slice(0, n);
      l(this, r, u).call(this, t), e = e.slice(n);
    }
    this.__internal__.serial.response.buffer = e, e.length > 0 && (this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
      l(this, r, u).call(this, this.__internal__.serial.response.buffer, !0);
    }, this.__internal__.serial.free_timeout_ms || 50));
  }
}, P = async function() {
  const {
    limiter: n,
    prefixLimiter: e = !1,
    sufixLimiter: t = !0
  } = this.__internal__.serial.response;
  if (!n)
    throw new Error("No limiter defined for delimited serial response");
  const i = this.__internal__.serial.response.buffer;
  if (!n || !i || i.length === 0) return;
  this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0);
  let s = new TextDecoder().decode(i);
  const o = [];
  if (typeof n == "string") {
    let _;
    if (e && t)
      _ = new RegExp(`${n}([^${n}]+)${n}`, "g");
    else if (e)
      _ = new RegExp(`${n}([^${n}]*)`, "g");
    else if (t)
      _ = new RegExp(`([^${n}]+)${n}`, "g");
    else
      return;
    let d, h = 0;
    for (; (d = _.exec(s)) !== null; )
      o.push(new TextEncoder().encode(d[1])), h = _.lastIndex;
    s = s.slice(h);
  } else if (n instanceof RegExp) {
    let _, d = 0;
    if (e && t) {
      const h = new RegExp(`${n.source}(.*?)${n.source}`, "g");
      for (; (_ = h.exec(s)) !== null; )
        o.push(new TextEncoder().encode(_[1])), d = h.lastIndex;
    } else if (t)
      for (; (_ = n.exec(s)) !== null; ) {
        const h = _.index, w = s.slice(d, h);
        o.push(new TextEncoder().encode(w)), d = n.lastIndex;
      }
    else if (e) {
      const h = s.split(n);
      h.shift();
      for (const w of h)
        o.push(new TextEncoder().encode(w));
      s = "";
    }
    s = s.slice(d);
  }
  for (const _ of o)
    l(this, r, u).call(this, _);
  const E = new TextEncoder().encode(s);
  this.__internal__.serial.response.buffer = E, E.length > 0 && (this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
    l(this, r, u).call(this, this.__internal__.serial.response.buffer, !0), this.__internal__.serial.response.buffer = new Uint8Array(0);
  }, this.__internal__.serial.free_timeout_ms ?? 50));
}, O = async function() {
  const n = this.__internal__.serial.port;
  if (!n || !n.readable) throw new Error("Port is not readable");
  const e = n.readable.getReader();
  this.__internal__.serial.reader = e;
  try {
    for (; this.__internal__.serial.keep_reading; ) {
      const { value: t, done: i } = await e.read();
      if (i) break;
      l(this, r, L).call(this, t), this.__internal__.serial.response.delimited ? await l(this, r, P).call(this) : this.__internal__.serial.response.length === null ? await l(this, r, D).call(this) : await l(this, r, B).call(this);
    }
  } catch (t) {
    this.serialErrors(t);
  } finally {
    e.releaseLock(), this.__internal__.serial.keep_reading = !0, this.__internal__.serial.port && await this.__internal__.serial.port.close();
  }
}, g = function(n) {
  n !== this.__internal__.serial.connecting && (this.__internal__.serial.connecting = n, this.dispatch("serial:connecting", { active: n }));
}, H = async function() {
  return typeof window > "u" ? !1 : "serial" in navigator && "forget" in SerialPort.prototype && this.__internal__.serial.port ? (await this.__internal__.serial.port.forget(), !0) : !1;
}, j = function() {
  [
    "serial:connected",
    "serial:connecting",
    "serial:reconnect",
    "serial:timeout",
    "serial:disconnected",
    "serial:sent",
    "serial:soft-reload",
    "serial:message",
    "serial:corrupt-message",
    "unknown",
    "serial:need-permission",
    "serial:lost",
    "serial:unsupported",
    "serial:error",
    "debug"
  ].forEach((n) => {
    this.serialRegisterAvailableListener(n);
  });
}, F = function() {
  const n = this;
  this.on("internal:queue", async () => {
    var e;
    await l(e = n, r, $).call(e);
  }), l(this, r, U).call(this);
}, U = function() {
  const n = this;
  navigator.serial.addEventListener("connect", async () => {
    n.isDisconnected && await n.serialConnect().catch(() => {
    });
  });
}, $ = async function() {
  if (!l(this, r, f).call(this, this.__internal__.serial.port)) {
    l(this, r, m).call(this, { error: "Port is closed, not readable or writable." }), await this.serialConnect();
    return;
  }
  if (this.__internal__.timeout.until_response || this.__internal__.serial.queue.length === 0) return;
  const n = this.__internal__.serial.queue[0];
  let e = this.__internal__.time.response_general;
  if (n.action === "connect" && (e = this.__internal__.time.response_connection), this.__internal__.timeout.until_response = setTimeout(async () => {
    await this.timeout(n.bytes, n.action);
  }, e), this.__internal__.serial.last_action = n.action ?? "unknown", await l(this, r, x).call(this, n.bytes), this.dispatch("serial:sent", {
    action: n.action,
    bytes: n.bytes
  }), this.__internal__.auto_response) {
    let i = new Uint8Array(0);
    try {
      i = this.validateBytes(this.__internal__.serial.auto_response);
    } catch (s) {
      this.serialErrors(s);
    }
    l(this, r, u).call(this, i);
  }
  const t = [...this.__internal__.serial.queue];
  this.__internal__.serial.queue = t.splice(1);
}, W = function(n = 1) {
  this.__internal__.device_number = n, !this.__internal__.bypassSerialBytesConnection && (this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(n));
}, Q = function() {
  this.__internal__.last_error = {
    message: null,
    action: null,
    code: null,
    no_code: 0
  };
};
export {
  K as Z,
  c as h
};
