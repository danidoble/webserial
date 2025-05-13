var E = Object.defineProperty;
var d = (r) => {
  throw TypeError(r);
};
var x = (r, i, s) => i in r ? E(r, i, { enumerable: !0, configurable: !0, writable: !0, value: s }) : r[i] = s;
var f = (r, i, s) => x(r, typeof i != "symbol" ? i + "" : i, s), C = (r, i, s) => i.has(r) || d("Cannot " + s);
var m = (r, i, s) => i.has(r) ? d("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(r) : i.set(r, s);
var o = (r, i, s) => (C(r, i, "access private method"), s);
import { K as A, _ as y } from "./kernel-Bquzoyqh.js";
import { s as n } from "./relay-CKxJ6ewy.js";
var t, w, l, _, g, v, b, T, R;
class D extends A {
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
    no_device: a = 1,
    device_listen_on_channel: c = 1
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
    super({ filters: s, config_port: e, no_device: a, device_listen_on_channel: c });
    m(this, t);
    f(this, "__pinpax__", {
      asyncResponses: {
        voucher: null,
        sale: null
      },
      waiting: {
        voucher: !1,
        sale: !1
      }
    });
    if (this.__internal__.device.type = "pinpax", y.getCustom(this.typeDevice, a))
      throw new Error(`Device ${this.typeDevice} ${a} already exists`);
    this.__internal__.time.response_connection = 4e3, this.__internal__.time.response_general = 3e3, this.__internal__.serial.delay_first_connection = 1e3, this.__internal__.serial.response.replacer = "", this.__internal__.serial.response.limiter = `\r
`, o(this, t, w).call(this), y.add(this), this.getResponseAsString();
  }
  serialMessage(s) {
    let e = null;
    try {
      e = JSON.parse(s);
    } catch (a) {
      console.error("Error parsing response", a, s), this.dispatch("serial:message", s);
      return;
    }
    switch (e.response) {
      case "INITAPP":
        this.dispatch("init-app", { status: "started" }), o(this, t, b).call(this).then(() => {
        });
        break;
      case "CONNECT":
        this.dispatch("connectMessage", { status: "connected" }), o(this, t, T).call(this).then(() => {
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
        o(this, t, R).call(this, {
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
  serialSetConnectionConstant(s = 1) {
    return n.connection(s);
  }
  softReload() {
    super.softReload(), this.__pinpax__.waiting.sale = !1, this.__pinpax__.waiting.voucher = !1, this.__pinpax__.asyncResponses.sale = null, this.__pinpax__.asyncResponses.voucher = null;
  }
  async sendCustomCode(s = {}) {
    if (typeof s != "object") throw new Error("Invalid object");
    if (s.constructor !== Object) throw new Error("Invalid object");
    if (Object.keys(s).length === 0) throw new Error("Empty object");
    if (s.action === void 0 || s.action === null) throw new Error("Invalid object add action");
    const e = JSON.stringify(s), a = this.parseStringToBytes(e, `\r
`);
    await this.appendToQueue(this.stringArrayToUint8Array(a), "custom");
  }
  async connectMessage() {
    await this.appendToQueue(n.connect(), "connect:message");
  }
  async makeSale({ amount: s = 0, reference: e = null } = {}) {
    if (this.isDisconnected) throw new Error("Device is disconnected");
    if (this.__pinpax__.waiting.sale) throw new Error("Already waiting for sale response");
    const a = n.makeSale({ amount: s, reference: e });
    this.__pinpax__.waiting.sale = !0, this.__pinpax__.asyncResponses.sale = null, this.queue.length > 0 && await o(this, t, l).call(this);
    const c = this;
    return await this.appendToQueue(a, "make-sale"), new Promise((p) => {
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
    const e = n.getVoucher({ folio: s });
    this.queue.length > 0 && await o(this, t, l).call(this), await this.appendToQueue(e, "get-voucher");
    const a = this;
    return new Promise((c, p) => {
      const h = setTimeout(() => {
        a.__pinpax__.waiting.voucher = !1, p("Timeout");
      }, 1e4), u = setInterval(() => {
        if (a.__pinpax__.asyncResponses.voucher) {
          const k = a.__pinpax__.asyncResponses.voucher;
          a.__pinpax__.asyncResponses.voucher = null, a.__pinpax__.waiting.voucher = !1, clearInterval(u), clearTimeout(h), c(k.voucher);
        }
      }, 100);
    });
  }
  async info() {
    await this.appendToQueue(n.info(), "info");
  }
  async keepAlive() {
    await this.appendToQueue(n.keepAlive(), "keep-alive");
  }
  async restartApp() {
    await this.appendToQueue(n.restartApp(), "reset-app");
  }
  async getConfig() {
    return await this.appendToQueue(n.getConfig(), "get-config");
  }
  async hideButtons() {
    return await this.appendToQueue(n.hideButtons(), "hide-buttons"), await o(this, t, g).call(this);
  }
  async showButtons() {
    return await this.appendToQueue(n.showButtons(), "show-buttons"), await o(this, t, v).call(this);
  }
  async demo() {
    return console.warn("RUNNING DEMO APP, BE CAREFUL"), await this.appendToQueue(n.demo(), "demo");
  }
  async refund({ amount: s = 0, folio: e = null, auth: a = null } = {}) {
    return await this.appendToQueue(
      n.refund({
        amount: s,
        folio: e,
        auth: a
      }),
      "refund"
    );
  }
  async readProductionQR() {
    return await o(this, t, _).call(this, { type: "production" });
  }
  async readQualityAssuranceQR() {
    return o(this, t, _).call(this, { type: "QA" });
  }
  async exit() {
    return await this.appendToQueue(n.exit(), "exit-app");
  }
  async init() {
    await this.appendToQueue(n.init(), "init-app");
  }
}
t = new WeakSet(), w = function() {
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
    let a = setInterval(() => {
      s.queue.length === 0 && (clearInterval(a), e(!0));
    }, 500);
  });
}, _ = async function({ type: s = "production" } = {}) {
  const e = n.readQR({ type: s });
  return await this.appendToQueue(e, "read-qr");
}, g = async function() {
  await this.appendToQueue(n.forceHide(), "force-hide");
}, v = async function() {
  await this.appendToQueue(n.forceShow(), "force-show");
}, b = async function() {
  await this.connectMessage();
}, T = async function() {
  await this.hideButtons();
}, R = function(s) {
  this.dispatch("payment", s), this.__pinpax__.waiting.sale && (this.__pinpax__.asyncResponses.sale = s);
};
export {
  D as PinPax
};
