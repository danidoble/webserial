var O = Object.defineProperty;
var d = (n) => {
  throw TypeError(n);
};
var b = (n, a, s) => a in n ? O(n, a, { enumerable: !0, configurable: !0, writable: !0, value: s }) : n[a] = s;
var y = (n, a, s) => b(n, typeof a != "symbol" ? a + "" : a, s), B = (n, a, s) => a.has(n) || d("Cannot " + s);
var g = (n, a, s) => a.has(n) ? d("Cannot add the same private member more than once") : a instanceof WeakSet ? a.add(n) : a.set(n, s);
var r = (n, a, s) => (B(n, a, "access private method"), s);
import { K as x, _ as f } from "./kernel-BFXQSiNz.js";
var t, m, w, l, _, T, E, S, N, v, R;
class A extends x {
  constructor({
    filters: s = null,
    config_port: e = {
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      bufferSize: 32768,
      flowControl: "none"
    },
    no_device: i = 1,
    device_listen_on_channel: o = 1
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
    device_listen_on_channel: 1
  }) {
    super({ filters: s, config_port: e, no_device: i, device_listen_on_channel: o });
    g(this, t);
    y(this, "__pinpax__", {
      asyncResponses: {
        voucher: null,
        sale: null
      },
      waiting: {
        voucher: !1,
        sale: !1
      }
    });
    if (this.__internal__.device.type = "pinpax", f.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.time.response_connection = 4e3, this.__internal__.time.response_general = 3e3, this.__internal__.serial.delay_first_connection = 1e3, this.__internal__.serial.response.replacer = "", this.__internal__.serial.response.limiter = `\r
`, r(this, t, w).call(this), r(this, t, m).call(this), this.getResponseAsString();
  }
  serialMessage(s) {
    let e = null;
    try {
      e = JSON.parse(s);
    } catch (i) {
      console.error("Error parsing response", i, s), this.dispatch("serial:message", s);
      return;
    }
    switch (e.response) {
      case "INITAPP":
        this.dispatch("init-app", { status: "started" }), r(this, t, S).call(this).then(() => {
        });
        break;
      case "CONNECT":
        this.dispatch("connectMessage", { status: "connected" }), r(this, t, N).call(this).then(() => {
        });
        break;
      case "LASTVOUCHER":
        this.dispatch("voucher", e), this.__pinpax__.waiting.voucher && (this.__pinpax__.asyncResponses.voucher = e, this.__pinpax__.waiting.voucher = !1);
        break;
      case "DEVICEINFO":
        this.dispatch("info", e);
        break;
      case "KEEPALIVE":
        this.dispatch("keep-alive", { status: "alive" });
        break;
      case "RESETAPP":
        this.dispatch("reset-app", { status: "accepted" });
        break;
      case "GETCONFIG":
        this.dispatch("get-config", e);
        break;
      case "HIDEBUTTONS":
        this.dispatch("buttons-status", { hidden: !0 });
        break;
      case "SHOWBUTTONS":
        this.dispatch("buttons-status", { hidden: !1 });
        break;
      case "PAYMENT_PROCESS":
        this.dispatch("payment", {
          status: "starting",
          amount: e.amount,
          reference: e.referecence
        });
        break;
      case "INSERT_CARD":
        this.dispatch("payment", { status: "insert card" });
        break;
      case "CARD_DATA":
        this.dispatch("payment", {
          status: "card data",
          amount: e.amount,
          cardHolderName: e.cardHolderName,
          ccMark: e.ccMark,
          ccType: e.ccType,
          currency: e.currency,
          maskedPan: e.maskedPan,
          readingType: e.readingType
        });
        break;
      case "MERCHANT":
        this.dispatch("payment", {
          status: "merchant",
          afiliation: e.afiliation,
          alias: e.alias,
          amountCashBackCommission: e.amountCashBackCommission,
          currency: e.currency,
          description: e.description,
          hasCashBack: e.hasCashBack,
          limitCashBackAmount: e.limitCashBackAmount,
          merchant: e.merchant,
          months: e.months,
          name: e.name
        });
        break;
      case "TRANSACTION_RESULT":
        r(this, t, v).call(this, {
          status: "result",
          approved: e.approved,
          acquirer: e.acquirer,
          address: e.address,
          amount: e.amount,
          amountCashback: e.amountCashback,
          appIDLabel: e.appIDLabel,
          appId: e.appId,
          arqc: e.arqc,
          auth: e.auth,
          ccBin: e.ccBin,
          ccExpirationDate: e.ccExpirationDate,
          ccName: e.ccName,
          ccNumber: e.ccNumber,
          ccType: e.ccType,
          comissionCashback: e.comissionCashback,
          currency: e.currency,
          date: e.date,
          errorCode: e.errorCode,
          errorDescription: e.errorDescription,
          folio: e.folio,
          id: e.id,
          merchantName: e.merchantName,
          msiLabel: e.msiLabel,
          operation: e.operation,
          pin: e.pin,
          qps: e.qps,
          reference: e.reference,
          response: e.response,
          source: e.source,
          sourceLabel: e.sourceLabel,
          time: e.time
        });
        break;
      case "ERROR":
        this.__pinpax__.waiting.sale && (this.__pinpax__.asyncResponses.sale = {
          status: "error",
          approved: !1,
          response: e
        }), this.dispatch("error", {
          status: "error",
          response: e
        }), this.dispatch("payment", {
          status: "error",
          response: e
        });
        break;
      case "REFUND":
        this.dispatch("refund", { status: "refund", response: e });
        break;
    }
    this.dispatch("serial:message", e);
  }
  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(s = 1) {
    const e = JSON.stringify({ action: "CONNECT" });
    return this.add0x(this.parseStringToBytes(e, `\r
`));
  }
  softReload() {
    super.softReload(), this.__pinpax__.waiting.sale = !1, this.__pinpax__.waiting.voucher = !1, this.__pinpax__.asyncResponses.sale = null, this.__pinpax__.asyncResponses.voucher = null;
  }
  async sendCustomCode({ code: s = "" } = {}) {
    if (typeof s != "string") throw new Error("Invalid string");
    const e = this.parseStringToBytes(s, `\r
`);
    await this.appendToQueue(e, "custom");
  }
  async connectMessage() {
    const s = JSON.stringify({ action: "CONNECT" }), e = this.parseStringToBytes(s, `\r
`);
    await this.appendToQueue(e, "connect:message");
  }
  async makeSale({ amount: s = 0, reference: e = null } = {}) {
    if (this.isDisconnected) throw new Error("Device is disconnected");
    if (this.__pinpax__.waiting.sale) throw new Error("Already waiting for sale response");
    if (s <= 0) throw new Error("Invalid amount");
    if (s = parseFloat(s), isNaN(s)) throw new Error("Invalid amount");
    if (!e && !r(this, t, R).call(this, e))
      throw new Error(
        "Reference must be alphanumeric and the only symbol allowed is midlescore or underscore (- _) or null"
      );
    s = s.toFixed(2);
    const i = JSON.stringify({ action: "PAYMENT", amount: s, reference: e }), o = this.parseStringToBytes(i, `\r
`);
    this.__pinpax__.waiting.sale = !0, this.__pinpax__.asyncResponses.sale = null, this.queue.length > 0 && await r(this, t, l).call(this);
    const c = this;
    return await this.appendToQueue(o, "make-sale"), new Promise((p) => {
      const h = setInterval(() => {
        if (c.__pinpax__.asyncResponses.sale) {
          const u = c.__pinpax__.asyncResponses.sale;
          c.__pinpax__.asyncResponses.sale = null, c.__pinpax__.waiting.sale = !1, clearInterval(h), p(u.approved);
        }
      }, 100);
    });
  }
  async getVoucher({ folio: s = null } = {}) {
    if (this.isDisconnected) throw new Error("Device is disconnected");
    if (this.__pinpax__.waiting.voucher) throw new Error("Already waiting for voucher");
    if (!s) throw new Error("Folio is required");
    this.__pinpax__.waiting.voucher = !0, this.__pinpax__.asyncResponses.voucher = null;
    const e = JSON.stringify({ action: "GETVOUCHER", folio: s }), i = this.parseStringToBytes(e, `\r
`);
    this.queue.length > 0 && await r(this, t, l).call(this), await this.appendToQueue(i, "get-voucher");
    const o = this;
    return new Promise((c, p) => {
      const h = setTimeout(() => {
        o.__pinpax__.waiting.voucher = !1, p("Timeout");
      }, 1e4), u = setInterval(() => {
        if (o.__pinpax__.asyncResponses.voucher) {
          const C = o.__pinpax__.asyncResponses.voucher;
          o.__pinpax__.asyncResponses.voucher = null, o.__pinpax__.waiting.voucher = !1, clearInterval(u), clearTimeout(h), c(C.voucher);
        }
      }, 100);
    });
  }
  async info() {
    const s = JSON.stringify({ action: "DEVICEINFO" }), e = this.parseStringToBytes(s, `\r
`);
    await this.appendToQueue(e, "info");
  }
  async keepAlive() {
    const s = JSON.stringify({ action: "KEEPALIVE" }), e = this.parseStringToBytes(s, `\r
`);
    await this.appendToQueue(e, "keep-alive");
  }
  async restartApp() {
    const s = JSON.stringify({ action: "RESETAPP" }), e = this.parseStringToBytes(s, `\r
`);
    await this.appendToQueue(e, "reset-app");
  }
  async getConfig() {
    const s = JSON.stringify({ action: "GETCONFIG" }), e = this.parseStringToBytes(s, `\r
`);
    return await this.appendToQueue(e, "get-config");
  }
  async hideButtons() {
    const s = JSON.stringify({ action: "HIDEBUTTONS" }), e = this.parseStringToBytes(s, `\r
`);
    return await this.appendToQueue(e, "hide-buttons"), await r(this, t, T).call(this);
  }
  async showButtons() {
    const s = JSON.stringify({ action: "SHOWBUTTONS" }), e = this.parseStringToBytes(s, `\r
`);
    return await this.appendToQueue(e, "show-buttons"), await r(this, t, E).call(this);
  }
  async demo() {
    console.warn("RUNNING DEMO APP BE CAREFUL");
    const s = JSON.stringify({ action: "DEMO" }), e = this.parseStringToBytes(s, `\r
`);
    return await this.appendToQueue(e, "demo");
  }
  async refund({ amount: s = 0, folio: e = null, auth: i = null } = {}) {
    const o = JSON.stringify({ action: "REFUND", amount: s, folio: e, auth: i }), c = this.parseStringToBytes(o, `\r
`);
    return await this.appendToQueue(c, "refund");
  }
  async readProductionQR() {
    return await r(this, t, _).call(this, { type: "production" });
  }
  async readQualityAssuranceQR() {
    return r(this, t, _).call(this, { type: "QA" });
  }
  async exit() {
    const s = JSON.stringify({ action: "EXIT" }), e = this.parseStringToBytes(s, `\r
`);
    return await this.appendToQueue(e, "exit-app");
  }
  async init() {
    const s = JSON.stringify({ action: "INIT" }), e = this.parseStringToBytes(s, `\r
`);
    await this.appendToQueue(e, "init-app");
  }
}
t = new WeakSet(), m = function() {
  f.add(this);
}, w = function() {
  const s = [
    "buttons-status",
    "init-app",
    "connectMessage",
    "voucher",
    "info",
    "keep-alive",
    "reset-app",
    "get-config",
    "payment",
    "error",
    "refund"
  ];
  for (const e of s)
    this.serialRegisterAvailableListener(e);
}, l = async function() {
  if (this.isDisconnected) throw new Error("Device is disconnected");
  if (this.queue.length === 0) return !0;
  const s = this;
  return new Promise((e) => {
    let i = setInterval(() => {
      s.queue.length === 0 && (clearInterval(i), e(!0));
    }, 500);
  });
}, _ = async function({ type: s = "production" } = {}) {
  const e = JSON.stringify({ action: "READQR", server: s === "production" ? "PROD" : "QA" }), i = this.parseStringToBytes(e, `\r
`);
  return await this.appendToQueue(i, "read-qr");
}, T = async function() {
  const s = JSON.stringify({ action: "FORCEHIDE" }), e = this.parseStringToBytes(s, `\r
`);
  await this.appendToQueue(e, "force-hide");
}, E = async function() {
  const s = JSON.stringify({ action: "FORCESHOW" }), e = this.parseStringToBytes(s, `\r
`);
  await this.appendToQueue(e, "force-show");
}, S = async function() {
  await this.connectMessage();
}, N = async function() {
  await this.hideButtons();
}, v = function(s) {
  this.dispatch("payment", s), this.__pinpax__.waiting.sale && (this.__pinpax__.asyncResponses.sale = s);
}, R = function(s) {
  return /^[A-Z-a-z0-9_\s]+$/g.test(s);
};
export {
  A as PinPax
};
