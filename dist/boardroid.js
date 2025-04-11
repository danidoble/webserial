var de = Object.defineProperty;
var q = (d) => {
  throw TypeError(d);
};
var ue = (d, u, t) => u in d ? de(d, u, { enumerable: !0, configurable: !0, writable: !0, value: t }) : d[u] = t;
var b = (d, u, t) => ue(d, typeof u != "symbol" ? u + "" : u, t), F = (d, u, t) => u.has(d) || q("Cannot " + t);
var v = (d, u, t) => (F(d, u, "read from private field"), t ? t.call(d) : u.get(d)), C = (d, u, t) => u.has(d) ? q("Cannot add the same private member more than once") : u instanceof WeakSet ? u.add(d) : u.set(d, t), _ = (d, u, t, e) => (F(d, u, "write to private field"), e ? e.call(d, t) : u.set(d, t), t), a = (d, u, t) => (F(d, u, "access private method"), t);
import { K as pe, c as D } from "./kernel-B15wfB2x.js";
var w, f, y, s, M, H, x, N, O, U, j, A, L, Q, m, R, z, W, K, V, Y, G, J, X, Z, g, $, ee, te, ne, p, T, se, ie, re, ae, B, I, oe, ce, S, P, E;
class _e extends pe {
  constructor({ filters: t = null, config_port: e = null, no_device: n = 1 } = {}) {
    super({ filters: t, config_port: e, no_device: n });
    C(this, s);
    b(this, "__coin_purse", {
      available: !0
    });
    b(this, "__banknote_purse", {
      available: !0,
      isRecycler: !0,
      recycler: {
        ict: !0,
        banknote: 1
        // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
      }
    });
    b(this, "__sale", {
      price: 0,
      change: 0,
      change_verified: 0,
      dispense_all: !0,
      last_change: 0,
      clear() {
        this.price = 0, this.change = 0, this.change_verified = 0, this.dispense_all = !0, this.last_change = 0;
      }
    });
    b(this, "__money_session", {
      inserted: 0,
      retired: 0,
      clear() {
        this.inserted = 0, this.retired = 0;
      }
    });
    b(this, "coins", {
      tubes: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      box: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      totals: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      total: 0
    });
    b(this, "banknotes", {
      stacker: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      recycler: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      out: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      totals: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      total: 0
    });
    b(this, "card_reader", {
      available: !1,
      max_pre_credit: 0
    });
    C(this, w, !1);
    C(this, f, 0);
    C(this, y, 0);
    if (this.__internal__.device.type = "boardroid", D.getCustom(this.typeDevice, n))
      throw new Error(`Device ${this.typeDevice} ${n} already exists`);
    this.__internal__.serial.config_port.baudRate = 115200, this.__internal__.serial.response.length = 14, this.__internal__.time.response_connection = 600, this.__internal__.time.response_general = 4e3, this.__internal__.time.response_engines = 15e3, this.__internal__.dispense.limit_counter = 15, this.__internal__.dispense.custom_limit_counter = null, this.__internal__.dispense.backup_dispense = {
      channel: 1,
      second_channel: null,
      sensor: !0,
      seconds: null
    }, a(this, s, M).call(this), a(this, s, H).call(this);
  }
  get totalInTubes() {
    return this.coins.tubes.g50 * 0.5 + this.coins.tubes.c50 * 0.5 + this.coins.tubes.p1 + this.coins.tubes.p2 * 2 + this.coins.tubes.p5 * 5 + this.coins.tubes.p10 * 10;
  }
  get totalInRecycler() {
    return this.banknotes.recycler.p20 * 20 + this.banknotes.recycler.p50 * 50 + this.banknotes.recycler.p100 * 100 + this.banknotes.recycler.p200 * 200 + this.banknotes.recycler.p500 * 500 + this.banknotes.recycler.p1000 * 1e3;
  }
  get hasRecycler() {
    return this.__banknote_purse.available && this.__banknote_purse.isRecycler;
  }
  set hasRecycler(t) {
    this.__banknote_purse.isRecycler = t;
  }
  get hasICT() {
    return this.hasRecycler && this.__banknote_purse.recycler.ict;
  }
  set hasICT(t) {
    this.__banknote_purse.recycler.ict = t;
  }
  set banknoteICT(t) {
    if (![20, 50, 100, 200, 500].includes(t)) throw new Error(`Invalid banknote value: ${t}`);
    t = [20, 50, 100, 200, 500].indexOf(t), this.__banknote_purse.recycler.banknote = t;
  }
  get banknoteICT() {
    return [20, 50, 100, 200, 500][this.__banknote_purse.recycler.banknote];
  }
  get hasCoinPurse() {
    return this.__coin_purse.available;
  }
  set hasCoinPurse(t) {
    if (typeof t != "boolean")
      throw new Error(`Invalid value: ${t}`);
    this.__coin_purse.available = t;
  }
  set price(t) {
    let e = parseFloat(t);
    (isNaN(e) || e < 0) && (e = 0), this.__sale.price = e;
  }
  get price() {
    return this.__sale.price;
  }
  get change() {
    return this.__sale.price <= 0 || this.__money_session.inserted <= this.__sale.price ? 0 : this.__money_session.inserted - this.__sale.price;
  }
  softReload() {
    super.softReload(), this.__sale.clear(), this.__money_session.clear();
  }
  serialBoardroidSumHex(t) {
    let e = 0;
    return t.forEach((n, i) => {
      i !== 0 && i !== 11 && (e += parseInt(n, 16));
    }), e.toString(16).toUpperCase();
  }
  serialMessage(t) {
    let e = {
      code: t,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    const n = (5 + this.deviceNumber).toString(16).padStart(2, "0").toLowerCase();
    switch (t[1]) {
      case n:
        e.request = "connect", e = a(this, s, O).call(this, e);
        break;
      case "a0":
        e.request = "--automatic", e = a(this, s, z).call(this, t, e);
        break;
      case "b0":
        e.request = "--automatic", e = a(this, s, W).call(this, t, e);
        break;
      case "d0":
        e.request = "coin-purse:config", e = a(this, s, K).call(this, t[2], e);
        break;
      case "d1":
        e.request = "banknote-purse:config", e.additional = { scrow: null }, e = a(this, s, V).call(this, t, e);
        break;
      case "d2":
        e.request = "coin-purse:read-tubes", e = a(this, s, Y).call(this, t, e);
        break;
      case "d3":
        e.request = "banknote-purse:read-recycler", e = a(this, s, G).call(this, t, e);
        break;
      case "d4":
        e.request = "banknote-purse:banknote-scrow-status", e = a(this, s, J).call(this, t[2], e);
        break;
      case "d5":
        e.request = "banknote-purse:dispense", e = a(this, s, X).call(this, t, e);
        break;
      case "d6":
        e.request = "coin-purse:dispense", e = a(this, s, Z).call(this, t, e);
        break;
      case "d7":
        e.request = "dispense", e = a(this, s, g).call(this, t[5], e);
        break;
      case "d8":
        e.request = "--automatic", e = a(this, s, $).call(this, t[13], e);
        break;
      case "d9":
        e.request = "status:temperature", e = a(this, s, ee).call(this, t, e);
        break;
      case "da":
        e.request = "status:relay", e = a(this, s, te).call(this, t[2], e);
        break;
      case "db":
        e.request = "banknote-purse:save-memory", e.no_code = 18, e.name = "Bill purse memory saved?", e.description = "The memory of bill purse was saved successfully?", this.dispatch("banknote-purse:save-memory", { message: e });
        break;
      case "dc":
        e.request = "coin-purse:read-memory", e.no_code = 19, e.name = "Coin purse memory read?", e.description = "The memory of coin purse was read successfully?", this.dispatch("banknote-purse:read-memory", { message: e });
        break;
      case "dd":
        e.request = "card-reader", a(this, s, ne).call(this, t, e);
        break;
      default:
        e.request = "--unknown", e.name = "Response unrecognized", e.description = "The response of application was received, but dont identify with any of current parameters", e.no_code = 400, this.dispatch("unknown", e);
        break;
    }
    this.dispatch("serial:message", e);
  }
  serialSetConnectionConstant(t = 1) {
    let e = ["F1", "06", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "F8"];
    return e[1] = this.hexMaker(this.decToHex((5 + t).toString())), e[11] = this.serialBoardroidSumHex(e), this.add0x(e);
  }
  async coinPurseConfigure({ enable: t = !1, high: e = "FF", low: n = "FF" } = {}) {
    if (!this.__coin_purse.available) throw new Error("Coin purse not available");
    const r = ["F1", "C1", t ? "01" : "00", e, n, "00", "00", "00", "00", "00", "F2", "00"];
    await a(this, s, p).call(this, r, "coin-purse:config");
  }
  async coinPurseEnable() {
    await this.coinPurseConfigure({ enable: !0 });
  }
  async coinPurseDisable() {
    await this.coinPurseConfigure({ enable: !1 });
  }
  async coinPurseDispense({ $_50c: t = 0, $_1: e = 0, $_2: n = 0, $_5: i = 0, $_10: r = 0 } = {}) {
    if (!this.__coin_purse.available) throw new Error("Coin purse not available");
    if ([t, e, n, i, r].some((o) => isNaN(o) || typeof o == "string"))
      throw new Error("One of the values is not a number");
    if (t < 1 && e < 1 && n < 1 && i < 1 && r < 1) throw new Error("No coins to dispense");
    [t, e, n, i, r] = [
      this.decToHex(t),
      this.decToHex(e),
      this.decToHex(n),
      this.decToHex(i),
      this.decToHex(r)
    ];
    let c = ["F1", "C6", t, e, n, i, r, "00", "00", "00", "F2", "00"];
    await a(this, s, p).call(this, c, "coin-purse:dispense");
  }
  async coinPurseReadTubes() {
    const t = ["F1", "C2", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    await a(this, s, p).call(this, t, "coin-purse:read-tubes");
  }
  async banknotePurseConfigure({ enable: t = !1, scrow: e = !1 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    let n;
    return a(this, s, x).call(this) ? n = a(this, s, se).call(this, { enable: t, scrow: e }) : n = a(this, s, ie).call(this, { enable: t, scrow: e }), await a(this, s, p).call(this, n, "banknote-purse:config");
  }
  async banknotePurseDispense({ $_20: t = 0, $_50: e = 0, $_100: n = 0, $_200: i = 0, $_500: r = 0, $_1000: c = 0 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    let o;
    if (a(this, s, x).call(this)) {
      const l = [t, e, n, i, r];
      o = a(this, s, re).call(this, l[this.__banknote_purse.recycler.banknote]);
    } else
      o = a(this, s, ae).call(this, { $_20: t, $_50: e, $_100: n, $_200: i, $_500: r, $_1000: c });
    await a(this, s, p).call(this, o, "banknote-purse:dispense");
  }
  async banknotePurseEnable({ scrow: t = !1 }) {
    return await this.banknotePurseConfigure({ enable: !0, scrow: t });
  }
  async banknotePurseDisable() {
    return await this.banknotePurseConfigure({ enable: !1 });
  }
  async banknotePurseAcceptInScrow() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    const t = ["F1", "C4", "01", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    await a(this, s, p).call(this, t, "banknote-purse:banknote-scrow-status");
  }
  async banknotePurseRejectInScrow() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    const t = ["F1", "C4", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    await a(this, s, p).call(this, t, "banknote-purse:banknote-scrow-status");
  }
  async banknotePurseSaveMemory({
    channel: t = null,
    $_20: e = null,
    $_50: n = null,
    $_100: i = null,
    $_200: r = null,
    $_500: c = null,
    $_1000: o = null
  } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (t === null || e === null || n === null || i === null || r === null || c === null || o === null)
      throw new Error("One of the values is not defined");
    const l = [
      "F1",
      "C8",
      this.decToHex(t),
      "00",
      this.decToHex(e),
      this.decToHex(n),
      this.decToHex(i),
      this.decToHex(r),
      this.decToHex(c),
      this.decToHex(o),
      "F2",
      "00"
    ];
    await a(this, s, p).call(this, l, "banknote-purse:save-memory");
  }
  async banknotePurseReadRecycler() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    const t = ["F1", "C3", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "B5"];
    return await a(this, s, p).call(this, t, "banknote-purse:read-recycler");
  }
  async cardReaderDisable() {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    const t = ["F1", "CD", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await a(this, s, p).call(this, t, "card-reader:disable");
  }
  async cardReaderDispense({ channel: t = 1, second_channel: e = null, sensor: n = !0, seconds: i = null, price: r = 0 } = {}) {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    if (isNaN(this.card_reader.max_pre_credit) || this.card_reader.max_pre_credit === 0)
      throw new Error("Card reader pre-credit not configured");
    if (isNaN(r) || r <= 0) throw new Error("Price must be greater than 0");
    if (r > this.card_reader.max_pre_credit) throw new Error("Price is greater than pre-credit configured");
    if (!n && (i === null || i <= 0 || i > 40))
      throw new Error("Invalid time to dispense without sensor, must be between 0.1 and 40.0 seconds");
    const c = this.decToHex(r / 256), o = this.decToHex(r % 256), l = this.decToHex(t + 9);
    let h = "00";
    e && (h = this.decToHex(e + 9));
    let k = "00";
    n || (k = this.decToHex(i * 10));
    const le = ["F1", "CD", "01", l, h, k, c, o, "00", "00", "F2", "00"];
    await a(this, s, p).call(this, le, "card-reader:dispense");
  }
  async paymentPursesDisable({ coin: t = !0, banknote: e = !0, cardReader: n = !1 } = {}) {
    t && await this.coinPurseDisable(), e && await this.banknotePurseDisable(), n && await this.cardReaderDisable();
  }
  async paymentPursesEnable({ coin: t = !0, banknote: e = !0, scrowBanknote: n = !1 } = {}) {
    t && await this.coinPurseEnable(), e && await this.banknotePurseEnable({ scrow: n });
  }
  async coolingRelayConfigure({ enable: t = !1 } = {}) {
    const n = ["F1", "CC", t ? "01" : "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await a(this, s, p).call(this, n, "status:relay");
  }
  async coolingRelayEnable() {
    return await this.coolingRelayConfigure({ enable: !0 });
  }
  async coolingRelayDisable() {
    return await this.coolingRelayConfigure({ enable: !1 });
  }
  async readTemperature() {
    const t = ["F1", "CB", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await a(this, s, p).call(this, t, "status:temperature");
  }
  /**
   * Dispense a product from the machine
   * @param {number|string} selection
   * @param {null|number|string} second_selection
   * @param {boolean} sensor
   * @param {null|number} seconds
   * @param {boolean} retry
   * @return {Promise<unknown>}
   */
  async dispense({ selection: t = 1, second_selection: e = null, sensor: n = !0, seconds: i = null, retry: r = !0 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 80) throw new Error("Invalid channel number");
    if (e !== null && (e < 1 || e > 80 || e === t))
      throw new Error("Invalid second channel number");
    if (!n && (i === null || i <= 0 || i > 40))
      throw new Error("Invalid time to dispense without sensor, must be between 0.1 and 40.0 seconds");
    r && (this.__internal__.dispense.backup_dispense = {
      selection: t,
      second_selection: e,
      sensor: n,
      seconds: i
    }), t += 9;
    const c = this.decToHex(t);
    let o = "00";
    e && (e += 9, o = this.decToHex(e));
    let l = "00";
    n || (l = this.decToHex(Math.round(i * 6.2)), this.__internal__.dispense.custom_limit_counter = i);
    const h = a(this, s, T).call(this, [
      "F1",
      "C7",
      c,
      o,
      l,
      "00",
      "00",
      "00",
      "00",
      "00",
      "F2",
      "00"
    ]);
    let k = await this.internalDispense(h);
    return !k.dispensed && r && (k = await this.internalDispense(h)), this.__internal__.dispense.custom_limit_counter = null, k;
  }
  async testEngines({ singleEngine: t = !1 } = {}) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    if (v(this, w)) throw new Error("Another test is running");
    a(this, s, B).call(this), _(this, w, !0);
    const e = [];
    a(this, s, I).call(this);
    for (let n = 1; n <= 80; n++) {
      const i = await this.dispense({
        selection: n,
        second_selection: t ? null : n + 1,
        sensor: !1,
        seconds: 0.4,
        retry: !1
      });
      e.push(i), _(this, f, n), a(this, s, I).call(this), t || n++;
    }
    _(this, f, 80), a(this, s, I).call(this, { dispensed: e }), a(this, s, B).call(this);
  }
  async sendCustomCode({ code: t = [] } = {}) {
    if (t.length === 0) throw new Error("Invalid code");
    const e = a(this, s, T).call(this, t);
    await this.appendToQueue(e, "custom");
  }
  hasToReturnChange(t = 0) {
    let e = t;
    return e <= 0 ? !0 : (e = a(this, s, S).call(this, e).pending, e = a(this, s, P).call(this, e).pending, !(e > 0));
  }
  async returnChange() {
    return await a(this, s, E).call(this);
  }
  async returnInsertedMoney() {
    return this.__money_session.inserted <= 0 ? !1 : await a(this, s, E).call(this, this.__money_session.inserted);
  }
  async serialCorruptMessage(t, e) {
    this.dispatch("corrupt:message", { data: t, message: e });
  }
}
w = new WeakMap(), f = new WeakMap(), y = new WeakMap(), s = new WeakSet(), M = function() {
  const t = [
    "banknote-purse:banknote-scrow-status",
    "banknote-purse:config",
    "banknote-purse:event-banknote",
    "banknote-purse:read-memory",
    "banknote-purse:recycler",
    "banknote-purse:save-memory",
    "card-reader:event",
    "change:pending",
    "change:dispense",
    "coin-purse:coin-event",
    "coin-purse:config",
    "coin-purse:reject-lever",
    "coin-purse:reset",
    "coin-purse:tubes",
    "percentage:test",
    "run:default-load",
    "session:money-dispensed",
    "session:money-request",
    "event:door",
    "door:event",
    "status:relay",
    "status:temperature"
  ];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, H = function() {
  D.add(this);
}, x = function() {
  return this.__banknote_purse.isRecycler && this.__banknote_purse.recycler.ict;
}, N = function() {
  return this.hasCoinPurse || this.hasRecycler;
}, O = function(t) {
  return t.name = "Connection with the serial device completed.", t.description = "Your connection with the serial device was successfully completed.", t.no_code = 1, this.dispatch("run:default-load", {}), t;
}, U = function(t) {
  const e = {
    g50: ["40", "50", "60", "70", "90"],
    c50: ["41", "51", "61", "71", "91"],
    p1: ["42", "52", "62", "72", "92"],
    p2: ["43", "53", "63", "73", "93"],
    p5: ["44", "54", "64", "74", "94"],
    p10: ["45", "55", "65", "75", "95"],
    p20: ["47", "57", "67", "77", "97"]
  };
  let n = null;
  for (let r in e)
    if (e[r].includes(t)) {
      n = r;
      break;
    }
  return n ? [{
    g50: "50 pennies (the big one)",
    c0: "50 pennies (the little one)",
    p1: "1 peso",
    p2: "2 pesos",
    p5: "5 pesos",
    p10: "10 pesos",
    p20: "20 pesos"
  }[n], n] : [`Undefined value: ¿${t}?`, null];
}, j = function(t) {
  return ["g50", "c50", "p1", "p2", "p5", "p10", "p20"].includes(t);
}, A = function(t) {
  const e = {
    p20: ["80", "90", "a0", "b0"],
    p50: ["81", "91", "a1", "b1"],
    p100: ["82", "92", "a2", "b2"],
    p200: ["83", "93", "a3", "b3"],
    p500: ["84", "94", "a4", "b4"],
    p1000: ["85", "95", "a5", "b5"]
  };
  let n = null;
  for (let r in e)
    if (e[r].includes(t)) {
      n = r;
      break;
    }
  return n ? [{
    p20: "20 pesos",
    p50: "50 pesos",
    p100: "100 pesos",
    p200: "200 pesos",
    p500: "500 pesos",
    p1000: "1000 pesos"
  }[n], n] : [`Undefined value: ¿${t}?`, null];
}, L = function(t) {
  return ["p20", "p50", "p100", "p200", "p500", "p1000"].includes(t);
}, Q = function(t) {
  return ["r20", "r50", "r100"].includes(t);
}, m = function() {
  return ["r20", "r50", "r100", "r200", "r500"][this.__banknote_purse.recycler.banknote];
}, R = function(t, e, n) {
  if (!t) return;
  let i = !0;
  if (a(this, s, j).call(this, t) && n === "coin") {
    if (typeof this.coins.tubes[t] > "u") return;
    e === "tube" ? this.coins.tubes[t] += 1 : e === "box" && (this.coins.box[t] += 1);
    let r = 0;
    ["g50", "c50"].includes(t) ? r = 0.5 : r += parseInt(t.slice(1)), this.coins.totals[t] += r, this.__money_session.inserted += r, this.coins.total += r;
  } else if (a(this, s, L).call(this, t) && n === "banknote") {
    if (typeof this.banknotes.recycler[t] > "u") return;
    e === "recycler" ? this.banknotes.recycler[t] += 1 : e === "stacker" && (this.banknotes.stacker[t] += 1);
    let r = parseInt(t.slice(1));
    this.banknotes.totals[t] += r, this.__money_session.inserted += r, this.banknotes.total += r;
  } else if (a(this, s, Q).call(this, t) && e === "out" && n === "banknote") {
    if (typeof this.banknotes.out[t.replace("r", "p")] > "u") return;
    this.banknotes.out[t.replace("r", "p")] += 1;
    let r = parseInt(t.slice(1));
    this.__money_session.retired += r, this.banknotes.recycler[t.replace("r", "p")] -= 1, this.banknotes.total -= r, i = !1, this.dispatch("session:money-dispensed", { type_money: t, retired: r, finish: !1, type: "banknotes" });
  }
  i && this.dispatch("session:money-request", {});
}, z = function(t, e) {
  const n = parseInt(t[2], 16);
  return e.name = "Coin Inserted", e.no_code = 2, e.additional = { where: null, coin: null }, n === 1 ? (e.name = "Lever pressed", e.description = "Reject lever", e.no_code = 100, this.dispatch("coin-purse:reject-lever", {})) : n === 2 ? (e.name = "Reset coin purse", e.description = "The configuration of coin purse was reset", e.no_code = 101, this.dispatch("coin-purse:reset", {})) : n >= 64 && n <= 79 ? (e.name = "Coin inserted in profit box", e.additional.where = "box") : n >= 80 && n <= 95 ? (e.name = "Coin inserted in tube", e.additional.where = "tube") : n >= 96 && n <= 111 ? (e.name = "Unused coin", e.description = "Something come from coin changer but in MDB Docs is unused", e.additional.where = "unused") : n >= 112 && n <= 127 ? (e.name = "Coin rejected", e.additional.where = "rejected") : n >= 144 && n <= 159 ? (e.name = "Coin dispensed", e.additional.where = "out", e.description = `Undefined value: ¿${t[2]}?`) : (e.name = "Coin inserted", e.description = "Undefined status. Without information of this", e.no_code = 400), n === 1 || n === 2 || n >= 160 || n >= 128 && n <= 143 || ([e.description, e.additional.coin] = a(this, s, U).call(this, t[2]), e.no_code = 38 + n, a(this, s, R).call(this, e.additional.coin, e.additional.where, "coin"), ["tube", "out"].includes(e.additional.where) && this.dispatch("coin-purse:tubes", this.coins.tubes), this.dispatch("coin-purse:coin-event", this.coins)), e;
}, W = function(t, e) {
  const n = parseInt(t[2], 16);
  return e.name = "Banknote Inserted", e.no_code = 2, e.additional = { where: null, banknote: null }, n === 42 ? (e.name = "Banknote dispensed", e.description = "Banknote dispensed by request.", e.additional.banknote = a(this, s, m).call(this), e.additional.where = "out", e.no_code = 200) : n >= 128 && n <= 143 ? (e.name = "Banknote inserted", e.additional.where = "stacker") : n >= 144 && n <= 159 ? (e.name = "Banknote inserted in pre stacker", e.additional.where = "tmp") : n >= 160 && n <= 175 ? (e.name = "Banknote rejected", e.additional.where = "nothing") : n >= 176 && n <= 191 && (e.name = "Banknote inserted", e.additional.where = "recycler"), n >= 128 && n <= 191 && ([e.description, e.additional.banknote] = a(this, s, A).call(this, t[2]), e.no_code = 74 + n), a(this, s, R).call(this, e.additional.banknote, e.additional.where, "banknote"), this.dispatch("banknote-purse:event-banknote", this.banknotes), e;
}, K = function(t, e) {
  const n = parseInt(t, 16);
  return n === 1 ? (e.name = "Coin purse enabled", e.description = "Configuration complete, enabled", e.no_code = 3) : n === 0 ? (e.name = "Coin purse disabled", e.description = "Disabled by system request", e.no_code = 4) : (e.name = "Status unknown", e.description = "The response of coin purse doesn't identify successfully", e.no_code = 400), this.dispatch("coin-purse:config", { enabled: n === 1 }), e;
}, V = function(t, e) {
  const n = parseInt(t[2], 16), i = parseInt(t[3], 16);
  return n === 0 ? (e.name = "Bill purse disabled", e.description = "Configuration complete, disabled") : n === 1 && (e.name = "Bill purse enabled", e.description = "Configuration complete, enabled"), i === 0 ? e.additional.scrow = "Scrow disabled, banknote received automatic" : i === 1 && (e.additional.scrow = "Scrow enabled, require manual action"), e.no_code = 5, this.dispatch("banknote-purse:config", { enabled: n === 1, scrow: i === 1 }), e;
}, Y = function(t, e) {
  e.no_code = 6;
  const [n, i, r, c, o, l] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ];
  return e.additional = {
    coins: { g50: n, c50: i, p1: r, p2: c, p5: o, p10: l }
  }, this.coins.tubes.g50 = n, this.coins.tubes.c50 = i, this.coins.tubes.p1 = r, this.coins.tubes.p2 = c, this.coins.tubes.p5 = o, this.coins.tubes.p10 = l, this.coins.totals.g50 = (this.coins.box.g50 + n) * 0.5, this.coins.totals.c50 = (this.coins.box.c50 + i) * 0.5, this.coins.totals.p1 = this.coins.box.p1 + r, this.coins.totals.p2 = (this.coins.box.p2 + c) * 2, this.coins.totals.p5 = (this.coins.box.p5 + o) * 5, this.coins.totals.p10 = (this.coins.box.p10 + l) * 10, this.coins.total = this.coins.totals.g50 + this.coins.totals.c50 + this.coins.totals.p1 + this.coins.totals.p2 + this.coins.totals.p5 + this.coins.totals.p10, e.name = "Read tubes", e.description = "Quantity of coins approximated", this.dispatch("coin-purse:tubes", this.coins.tubes), e;
}, G = function(t, e) {
  e.no_code = 7;
  const [n, i, r, c, o, l] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ];
  return e.additional = {
    banknotes: { b20: n, b50: i, b100: r, b200: c, b500: o, b1000: l }
  }, this.banknotes.recycler.p20 = n, this.banknotes.recycler.p50 = i, this.banknotes.recycler.p100 = r, this.banknotes.recycler.p200 = c, this.banknotes.recycler.p500 = o, this.banknotes.recycler.p1000 = l, this.banknotes.totals.p20 = (this.banknotes.stacker.p20 + n) * 20, this.banknotes.totals.p50 = (this.banknotes.stacker.p50 + i) * 50, this.banknotes.totals.p100 = (this.banknotes.stacker.p100 + r) * 100, this.banknotes.totals.p200 = (this.banknotes.stacker.p200 + c) * 200, this.banknotes.totals.p500 = (this.banknotes.stacker.p500 + o) * 500, this.banknotes.totals.p1000 = (this.banknotes.stacker.p1000 + l) * 1e3, this.banknotes.total = this.banknotes.totals.p20 + this.banknotes.totals.p50 + this.banknotes.totals.p100 + this.banknotes.totals.p200 + this.banknotes.totals.p500 + this.banknotes.totals.p1000, e.name = "Read recycler", e.description = "Quantity of banknotes approximated", this.dispatch("banknote-purse:recycler", this.banknotes.recycler), e;
}, J = function(t, e) {
  const n = parseInt(t, 16);
  return n === 1 ? e.name = "Banknote accepted" : n === 0 ? e.name = "Banknote rejected" : e.name = "Unknown status banknote", e.no_code = 8, this.dispatch("banknote-purse:banknote-scrow-status", { status: n === 1 }), e;
}, X = function(t, e) {
  const [n, i, r, c, o, l] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ], h = n * 20 + i * 50 + r * 100 + c * 200 + o * 500 + l * 1e3;
  return e.name = "Banknotes dispensed", e.description = h > 0 ? "Banknotes dispensed by request" : "No banknotes dispensed, recycler empty", e.no_code = 9, e.additional = {
    banknotes: { b20: n, b50: i, b100: r, b200: c, b500: o, b1000: l },
    total_dispensed: h
  }, this.dispatch("session:money-dispensed", {
    type_money: null,
    retired: null,
    finish: !1,
    type: "banknotes",
    data: e
  }), e;
}, Z = function(t, e) {
  return e.name = "Coins dispensed", e.no_code = 10, e.description = "Coins dispensed by request", isNaN(this.__sale.last_change) && (this.__sale.last_change = 0), this.__money_session.retired += this.__sale.last_change, this.dispatchAsync(
    "session:money-dispensed",
    {
      type_money: null,
      retired: null,
      finish: !1,
      type: "coins"
    },
    500
  ), e;
}, g = function(t, e) {
  const n = parseInt(t, 16);
  return n === 1 ? (e.name = "Product not delivered", e.description = "The product requested wasn't delivered", e.no_code = 11, this.__internal__.dispense.status = !1) : n === 0 ? (e.name = "Product delivered", e.description = "The product requested was delivered", e.no_code = 12, this.__internal__.dispense.status = !0) : (e.name = "Unknown status product", e.description = "The response of product doesn't identify successfully", e.no_code = 400, this.__internal__.dispense.status = !1), this.dispatch("dispensed", {}), e;
}, $ = function(t, e) {
  let n = "closed";
  return t === "db" ? (e.name = "Door closed", e.no_code = 13) : t === "dc" ? (e.name = "Door open", e.no_code = 14, n = "open") : (e.name = "Unknown status door", e.description = "The response of door doesn't identify successfully", e.no_code = 400, n = "unknown"), this.__internal__.device.door_open = n === "open", this.dispatch("event:door", { open: n === "open" }), this.dispatch("door:event", { open: n === "open" }), e;
}, ee = function(t, e) {
  const n = parseInt(t[2], 16) * 255, i = parseInt(t[3], 16), r = (n + i) * 0.1;
  return e.no_code = 15, e.name = "Temperature status", e.description = `Temperature: ${r}`, e.additional = {
    high: n,
    low: i,
    temperature: parseFloat(r.toString())
  }, this.dispatch("status:temperature", e.additional), e;
}, te = function(t, e) {
  const n = parseInt(t, 16);
  let i = "unknown";
  return n === 1 ? (e.name = "Relay on", e.description = "Relay on", e.no_code = 16, i = "on") : n === 0 ? (e.name = "Relay off", e.description = "Relay off", e.no_code = 17, i = "off") : (e.name = "Status unknown", e.description = "Status unknown", e.no_code = 400), this.dispatch("status:relay", { enabled: i === "on" }), e;
}, ne = function(t, e) {
  const n = parseInt(t[2], 16);
  if (e.no_code = 20 + n, e.name = "Status unknown", e.description = "The status of card reader does not identified correctly", n === 0)
    e.request += ":disable", e.name = "Card reader disabled", e.description = "Card reader device was disabled successfully";
  else if (n === 1 || n === 2)
    e.request += ":dispense", e.name = "Card reader enabled", e.description = "Card reader device is now enabled";
  else if (n === 3)
    e.request += ":pre-authorize", e.name = "Pre-authorized credit", e.description = "The pre credit was authorized successfully";
  else if (n === 4)
    e.request += ":cancel", e.name = "Cancellation in progress", e.description = "Cancellation request done successfully";
  else if (n === 5)
    e.request += ":sell", e.name = "Sell approved", e.description = "Sell approved, starting dispense product";
  else if (n === 6)
    e.request += ":sell", e.name = "Sell denied", e.description = "This sell was denied, try again";
  else if (n === 7)
    e.request += ":end", e.name = "Session ended", e.description = "The session ended";
  else if (n === 8)
    e.request += ":cancel", e.name = "Cancelled", e.description = "Cancellation complete";
  else if (n === 10) {
    const i = parseInt(t[8], 16);
    i === 1 ? (e.no_code = 30, e.name = "product not dispensed", e.description = "The product requested wasn't delivered") : i === 0 ? (e.no_code = 31, e.name = "product dispensed", e.description = "The product requested was delivered") : (e.name = "finished-unknown", e.no_code = 400);
  } else
    e.no_code = 400;
  return this.dispatch("card-reader:event", e), e;
}, p = function(t, e) {
  return this.appendToQueue(a(this, s, T).call(this, t), e);
}, T = function(t) {
  return t[11] = this.serialBoardroidSumHex(t), t.map((e, n) => {
    t[n] = this.hexMaker(e);
  }), t;
}, se = function({ enable: t = !1, scrow: e = !1 } = {}) {
  const n = t ? "FF" : "00", i = e ? "FF" : "00";
  return ["F1", "C0", n, n, i, i, "00", "00", "00", "00", "F2", "00"];
}, ie = function({ enable: t = !1, scrow: e = !1 } = {}) {
  return ["F1", "C0", t ? "01" : "00", e ? "01" : "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
}, re = function(t = 1) {
  if (t < 1) throw new Error("No banknotes to dispense");
  return t = this.decToHex(t), ["F1", "C5", this.decToHex(this.__banknote_purse.recycler.banknote.toString()), t, "00", "00", "00", "00", "00", "00", "F2", "00"];
}, ae = function({ $_20: t = 0, $_50: e = 0, $_100: n = 0, $_200: i = 0, $_500: r = 0, $_1000: c = 0 } = {}) {
  if ([t, e, n, i, r, c].some((o) => isNaN(o) || typeof o == "string"))
    throw new Error("One of the values is not a number");
  if (t < 1 && e < 1 && n < 1 && i < 1 && r < 1 && c < 1)
    throw new Error("No banknotes to dispense");
  return [t, e, n, i, r, c] = [
    this.decToHex(t),
    this.decToHex(e),
    this.decToHex(n),
    this.decToHex(i),
    this.decToHex(r),
    this.decToHex(c)
  ], ["F1", "C5", t, e, n, i, r, c, "00", "00", "F2", "00"];
}, B = function() {
  _(this, w, !1), _(this, f, 0), _(this, y, 0);
}, /**
 *
 * @param {null|object} dispensed
 * @param {number} limit
 */
I = function({ dispensed: t = null, limit: e = 80 } = {}) {
  _(this, y, Math.round(v(this, f) * 100 / e)), this.dispatch("percentage:test", { percentage: v(this, y), dispensed: t });
}, oe = function(t) {
  const e = ["20", "50", "100", "200", "500"], n = this.__banknote_purse.recycler.banknote, i = "$_" + e[n], r = parseInt(e[n]), c = this.banknotes.recycler[`p${e[n]}`], o = Math.min(Math.floor(t / r), c), l = {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: t,
    will_dispense: o > 0
  };
  return this.totalInRecycler === 0 || o < 1 || t === 0 || (l.banknotes[i] = o, l.pending = parseFloat((t - o * r).toFixed(2))), l;
}, ce = function(t) {
  const e = {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: t,
    will_dispense: !1
  };
  if (this.totalInRecycler === 0 || t === 0) return e;
  const n = (i, r) => {
    if (this.banknotes.recycler[r] > 0) {
      const c = Math.floor(e.pending / i), o = Math.min(c, this.banknotes.recycler[r]);
      e.banknotes[`$_${i}`] = o, e.pending = parseFloat((e.pending - o * i).toFixed(2));
    }
  };
  return n(1e3, "p1000"), n(500, "p500"), n(200, "p200"), n(100, "p100"), n(50, "p50"), n(20, "p20"), e.will_dispense = Object.values(e.banknotes).some((i) => i > 0), e;
}, S = function(t) {
  return this.hasRecycler ? a(this, s, x).call(this) ? a(this, s, oe).call(this, t) : a(this, s, ce).call(this, t) : {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: t,
    will_dispense: !1
  };
}, P = function(t) {
  const e = {
    coins: { $_50c: 0, $_1: 0, $_2: 0, $_5: 0, $_10: 0 },
    pending: t,
    will_dispense: !1
  };
  if (!this.hasCoinPurse || t <= 0 || this.totalInTubes === 0) return e;
  const n = (i, r, c = null) => {
    if (this.coins.tubes[r] > 0) {
      c === null && (c = "$_" + i);
      const o = Math.floor(e.pending / i), l = Math.min(o, this.coins.tubes[r]);
      e.coins[c] = l, e.pending = parseFloat((e.pending - l * i).toFixed(2));
    }
  };
  return n(10, "p10"), n(5, "p5"), n(2, "p2"), n(1, "p1"), n(0.5, "g50", "$_50c"), e.will_dispense = Object.values(e.coins).some((i) => i > 0), e;
}, E = async function(t = null) {
  if (!a(this, s, N).call(this)) throw new Error("Change not available");
  let e = this.change, n = this.change;
  if (t !== null && (e = t, n = t), n <= 0) return !1;
  const i = a(this, s, S).call(this, n);
  n = i.pending;
  const r = a(this, s, P).call(this, n);
  return n = r.pending, n > 0 && this.dispatch("change:pending", { pending: n }), this.dispatch("change:dispense", {
    recycler: i.banknotes,
    coins: r.coins,
    pending: n,
    delivery: e - n
  }), n === e ? !1 : (i.will_dispense && await this.banknotePurseDispense(i.banknotes), r.will_dispense && await this.coinPurseDispense(r.coins), !0);
};
export {
  _e as Boardroid
};
