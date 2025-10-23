import { K as p, D as c } from "./kernel-BnWXOCde.js";
import { s } from "./relay-DP8PLsDP.js";
class l extends p {
  __pinpax__ = {
    server: "DEV",
    businessId: null,
    encryptionKey: null,
    apiKey: null,
    asyncResponses: {
      voucher: null,
      sale: null
    },
    waiting: {
      voucher: !1,
      sale: !1,
      sale_init: "idle",
      sale_login: "idle"
    }
  };
  constructor({
    filters: i = null,
    config_port: e = {
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      bufferSize: 32768,
      flowControl: "none"
    },
    no_device: t = 1,
    device_listen_on_channel: a = 1,
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
    device_listen_on_channel: 1,
    socket: !1
  }) {
    if (super({ filters: i, config_port: e, no_device: t, device_listen_on_channel: a, socket: n }), this.__internal__.device.type = "pinpax", c.getCustom(this.typeDevice, t))
      throw new Error(`Device ${this.typeDevice} ${t} already exists`);
    this.__internal__.time.response_connection = 4e3, this.__internal__.time.response_general = 3e3, this.__internal__.serial.delay_first_connection = 1e3, this.__internal__.serial.response.replacer = "", this.__internal__.serial.response.limiter = `\r
`, this.#t(), c.add(this), this.getResponseAsString();
  }
  #t() {
    const i = [
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
      "refund",
      "login"
    ];
    for (const e of i)
      this.serialRegisterAvailableListener(e);
  }
  set businessId(i) {
    this.__pinpax__.businessId = i;
  }
  get businessId() {
    return this.__pinpax__.businessId;
  }
  set encryptionKey(i) {
    this.__pinpax__.encryptionKey = i;
  }
  get encryptionKey() {
    return this.__pinpax__.encryptionKey;
  }
  set apiKey(i) {
    this.__pinpax__.apiKey = i;
  }
  get apiKey() {
    return this.__pinpax__.apiKey;
  }
  set server(i) {
    this.__pinpax__.server = i;
  }
  get server() {
    return this.__pinpax__.server;
  }
  serialMessage(i) {
    let e = null;
    try {
      e = JSON.parse(i), e.request || (e.request = this.lastAction), e.name || (e.name = this.lastAction);
    } catch (t) {
      console.error("Error parsing response", t, i), this.dispatch("serial:message", i);
      return;
    }
    switch (e.response) {
      case "INIT":
        this.dispatch("init", { name: "INIT", request: this.lastAction, status: "ok" }), this.__pinpax__.waiting.sale_init === "waiting" && (this.__pinpax__.waiting.sale_init = "received");
        break;
      case "INITAPP":
        this.dispatch("init-app", { name: "INITAPP", request: this.lastAction, status: "started" }), this.__pinpax__.waiting.sale_init === "waiting" ? this.__pinpax__.waiting.sale_init = "received" : this.#n().then(() => {
        });
        break;
      case "CONNECT":
        this.dispatch("connectMessage", { name: "CONNECT", request: this.lastAction, status: "connected" }), this.#r().then(() => {
        });
        break;
      case "LOGIN":
        e.name || (e.name = "LOGIN"), this.__pinpax__.waiting.sale_login === "waiting" && (this.__pinpax__.waiting.sale_login = "received"), this.dispatch("login", e);
        break;
      case "LASTVOUCHER":
        e.name || (e.name = "LASTVOUCHER"), this.dispatch("voucher", e), this.__pinpax__.waiting.voucher && (this.__pinpax__.asyncResponses.voucher = e, this.__pinpax__.waiting.voucher = !1);
        break;
      case "DEVICEINFO":
        e.name || (e.name = "DEVICEINFO"), this.dispatch("info", e);
        break;
      case "KEEPALIVE":
        this.dispatch("keep-alive", { name: "KEEPALIVE", request: this.lastAction, status: "alive" });
        break;
      case "RESETAPP":
        this.dispatch("reset-app", { name: "RESETAPP", request: this.lastAction, status: "accepted" });
        break;
      case "GETCONFIG":
        e.name || (e.name = "GETCONFIG"), this.dispatch("get-config", e);
        break;
      case "HIDEBUTTONS":
        this.dispatch("buttons-status", { name: "HIDEBUTTONS", request: this.lastAction, hidden: !0 });
        break;
      case "SHOWBUTTONS":
        this.dispatch("buttons-status", { name: "SHOWBUTTONS", request: this.lastAction, hidden: !1 });
        break;
      case "PAYMENT_PROCESS":
        e.name || (e.name = "PAYMENT_PROCESS"), this.dispatch("payment", {
          name: "PAYMENT_PROCESS",
          request: this.lastAction,
          status: "starting",
          amount: e.amount,
          reference: e.referecence
        });
        break;
      case "INSERT_CARD":
        this.dispatch("payment", { name: "INSERT_CARD", request: this.lastAction, status: "insert card" });
        break;
      case "CARD_DATA":
        e.name || (e.name = "CARD_DATA"), this.dispatch("payment", {
          name: "CARD_DATA",
          request: this.lastAction,
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
        e.name || (e.name = "MERCHANT"), this.dispatch("payment", {
          request: this.lastAction,
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
        e.name || (e.name = "TRANSACTION_RESULT"), this.#o({
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
        e.name || (e.name = "ERROR"), this.__pinpax__.waiting.sale && (this.__pinpax__.asyncResponses.sale = {
          status: "error",
          approved: !1,
          response: e
        }), this.dispatch("error", { name: "ERROR", request: this.lastAction, status: "error", response: e }), this.dispatch("payment", { name: "ERROR", request: this.lastAction, status: "error", response: e });
        break;
      case "REFUND":
        this.dispatch("refund", { name: "ERROR", request: this.lastAction, status: "refund", response: e });
        break;
    }
    this.dispatch("serial:message", e);
  }
  serialSetConnectionConstant() {
    return s.connection();
  }
  softReload() {
    super.softReload(), this.__pinpax__.waiting.sale = !1, this.__pinpax__.waiting.voucher = !1, this.__pinpax__.asyncResponses.sale = null, this.__pinpax__.asyncResponses.voucher = null;
  }
  async sendCustomCode(i = {}) {
    if (typeof i != "object") throw new Error("Invalid object");
    if (i.constructor !== Object) throw new Error("Invalid object");
    if (Object.keys(i).length === 0) throw new Error("Empty object");
    if (i.action === void 0 || i.action === null) throw new Error("Invalid object add action");
    const e = JSON.stringify(i), t = this.parseStringToBytes(e, `\r
`);
    await this.appendToQueue(this.stringArrayToUint8Array(t), "custom");
  }
  async connectMessage() {
    await this.appendToQueue(s.connect(), "connect:message");
  }
  async #e() {
    if (this.isDisconnected) throw new Error("Device is disconnected");
    return this.queue.length === 0 ? !0 : new Promise((i) => {
      const e = setInterval(() => {
        this.queue.length === 0 && (clearInterval(e), i(!0));
      }, 500);
    });
  }
  async #i({ type: i = "production" } = {}) {
    const e = s.readQR({ type: i });
    return await this.appendToQueue(e, "read-qr");
  }
  async #s() {
    await this.appendToQueue(s.forceHide(), "force-hide");
  }
  async #a() {
    await this.appendToQueue(s.forceShow(), "force-show");
  }
  async #n() {
    await this.connectMessage();
  }
  async #r() {
    await this.hideButtons();
  }
  #o(i) {
    this.dispatch("payment", i), this.__pinpax__.waiting.sale && (this.__pinpax__.asyncResponses.sale = i);
  }
  cancelSaleRequestInProcess() {
    this.__pinpax__.waiting.sale && (this.__pinpax__.asyncResponses.sale = {
      status: "error",
      approved: !1,
      response: {}
    });
  }
  async #c() {
    return new Promise((i, e) => {
      const t = setTimeout(() => {
        this.__pinpax__.waiting.sale_login === "waiting" && (this.__pinpax__.waiting.sale_login = "timeout", e(new Error("Login timeout")));
      }, 1e4), a = setInterval(() => {
        this.__pinpax__.waiting.sale_login === "received" && (clearTimeout(t), clearInterval(a), i(!0));
      }, 100);
    });
  }
  async #p() {
    return new Promise((i, e) => {
      const t = setTimeout(() => {
        this.__pinpax__.waiting.sale_init === "waiting" && (this.__pinpax__.waiting.sale_init = "timeout", e(new Error("Init timeout")));
      }, 1e4), a = setInterval(() => {
        this.__pinpax__.waiting.sale_init === "received" && (clearTimeout(t), clearInterval(a), i(!0));
      }, 100);
    });
  }
  async makeSale({
    amount: i = 0,
    reference: e = null
  } = {
    amount: 0,
    reference: null
  }) {
    if (this.isDisconnected) throw new Error("Device is disconnected");
    if (this.__pinpax__.waiting.sale) throw new Error("Already waiting for sale response");
    const t = s.makeSale({ amount: i, reference: e });
    this.__pinpax__.waiting.sale = !0, this.__pinpax__.asyncResponses.sale = null, this.queue.length > 0 && await this.#e();
    let a = !1;
    try {
      this.__pinpax__.waiting.sale_login = "waiting", await this.login(), await this.#c(), this.__pinpax__.waiting.sale_login = "idle", this.__pinpax__.waiting.sale_init = "waiting", await this.init(), await this.#p(), this.__pinpax__.waiting.sale_init = "idle";
    } catch (n) {
      a = !0, this.__pinpax__.waiting.sale_login = "idle", this.__pinpax__.waiting.sale_init = "idle", this.__pinpax__.waiting.sale = !1, this.dispatch("error", {
        name: "ERROR",
        request: this.lastAction,
        status: "error",
        response: "Error during login/init before sale",
        error: n
      });
    }
    return a ? !1 : (await this.appendToQueue(t, "make-sale"), new Promise((n) => {
      const r = setInterval(() => {
        if (this.__pinpax__.asyncResponses.sale) {
          const o = this.__pinpax__.asyncResponses.sale;
          this.__pinpax__.asyncResponses.sale = null, this.__pinpax__.waiting.sale = !1, clearInterval(r), n(o.approved);
        }
      }, 100);
    }));
  }
  async getVoucher({ folio: i = null } = {}) {
    if (this.isDisconnected) throw new Error("Device is disconnected");
    if (this.__pinpax__.waiting.voucher) throw new Error("Already waiting for voucher");
    if (!i) throw new Error("Folio is required");
    this.__pinpax__.waiting.voucher = !0, this.__pinpax__.asyncResponses.voucher = null;
    const e = s.getVoucher({ folio: i });
    return this.queue.length > 0 && await this.#e(), await this.appendToQueue(e, "get-voucher"), new Promise((t, a) => {
      const n = setTimeout(() => {
        this.__pinpax__.waiting.voucher = !1, a("Timeout");
      }, 1e4), r = setInterval(() => {
        if (this.__pinpax__.asyncResponses.voucher) {
          const o = this.__pinpax__.asyncResponses.voucher;
          this.__pinpax__.asyncResponses.voucher = null, this.__pinpax__.waiting.voucher = !1, clearInterval(r), clearTimeout(n), t(o.voucher);
        }
      }, 100);
    });
  }
  async info() {
    await this.appendToQueue(s.info(), "info");
  }
  async keepAlive() {
    await this.appendToQueue(s.keepAlive(), "keep-alive");
  }
  async restartApp() {
    await this.appendToQueue(s.restartApp(), "reset-app");
  }
  async getConfig() {
    return await this.appendToQueue(s.getConfig(), "get-config");
  }
  async hideButtons() {
    return await this.appendToQueue(s.hideButtons(), "hide-buttons"), await this.#s();
  }
  async showButtons() {
    return await this.appendToQueue(s.showButtons(), "show-buttons"), await this.#a();
  }
  async demo() {
    return console.warn("RUNNING DEMO APP, BE CAREFUL"), await this.appendToQueue(s.demo(), "demo");
  }
  async refund({ amount: i = 0, folio: e = null, auth: t = null } = {}) {
    return await this.appendToQueue(
      s.refund({
        amount: i,
        folio: e,
        auth: t
      }),
      "refund"
    );
  }
  async readProductionQR() {
    return await this.#i({ type: "production" });
  }
  async readQualityAssuranceQR() {
    return this.#i({ type: "QA" });
  }
  async exit() {
    return await this.appendToQueue(s.exit(), "exit-app");
  }
  async init() {
    await this.appendToQueue(s.init(), "init-app");
  }
  async login() {
    if (!this.apiKey || !this.businessId || !this.encryptionKey || !this.server)
      throw new Error("Invalid data to login check apiKey, businessId, encryptionKey, server");
    const i = JSON.stringify({
      action: "LOGIN_MIT",
      server: this.__pinpax__.server,
      business_id: this.__pinpax__.businessId,
      encryption_key: this.__pinpax__.encryptionKey,
      api_key: this.__pinpax__.apiKey
    }), e = this.parseStringToBytes(i, `\r
`);
    await this.appendToQueue(e, "login");
  }
}
export {
  l as PinPax
};
