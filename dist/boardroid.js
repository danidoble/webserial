var oe = Object.defineProperty;
var D = (l) => {
  throw TypeError(l);
};
var ce = (l, p, n) => p in l ? oe(l, p, { enumerable: !0, configurable: !0, writable: !0, value: n }) : l[p] = n;
var h = (l, p, n) => ce(l, typeof p != "symbol" ? p + "" : p, n), I = (l, p, n) => p.has(l) || D("Cannot " + n);
var y = (l, p, n) => (I(l, p, "read from private field"), n ? n.call(l) : p.get(l)), w = (l, p, n) => p.has(l) ? D("Cannot add the same private member more than once") : p instanceof WeakSet ? p.add(l) : p.set(l, n), b = (l, p, n, e) => (I(l, p, "write to private field"), e ? e.call(l, n) : p.set(l, n), n), a = (l, p, n) => (I(l, p, "access private method"), n);
import { K as le, _ as x } from "./kernel-Bquzoyqh.js";
import { l as d } from "./relay-CKxJ6ewy.js";
var f, _, k, i, E, M, v, S, Q, N, F, j, O, U, A, T, L, z, W, K, V, Y, m, G, H, J, X, Z, g, ee, ne, te, ie, se, R, C, re, ae, P, $, B;
class he extends le {
  constructor({ filters: n = null, config_port: e = null, no_device: t = 1 } = {}) {
    super({ filters: n, config_port: e, no_device: t });
    w(this, i);
    h(this, "__coin_purse", {
      available: !0
    });
    h(this, "__banknote_purse", {
      available: !0,
      isRecycler: !0,
      recycler: {
        ict: !0,
        banknote: 1
        // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
      }
    });
    h(this, "__sale", {
      price: 0,
      change: 0,
      change_verified: 0,
      dispense_all: !0,
      last_change: 0,
      clear() {
        this.price = 0, this.change = 0, this.change_verified = 0, this.dispense_all = !0, this.last_change = 0;
      }
    });
    h(this, "__money_session", {
      inserted: 0,
      retired: 0,
      clear() {
        this.inserted = 0, this.retired = 0;
      }
    });
    h(this, "coins", {
      tubes: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      box: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      totals: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      total: 0
    });
    h(this, "banknotes", {
      stacker: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      recycler: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      out: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      totals: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      total: 0
    });
    h(this, "card_reader", {
      available: !1,
      max_pre_credit: 0
    });
    w(this, f, !1);
    w(this, _, 0);
    w(this, k, 0);
    if (this.__internal__.device.type = "boardroid", x.getCustom(this.typeDevice, t))
      throw new Error(`Device ${this.typeDevice} ${t} already exists`);
    this.__internal__.serial.config_port.baudRate = 115200, this.__internal__.serial.response.length = 14, this.__internal__.time.response_connection = 600, this.__internal__.time.response_general = 4e3, this.__internal__.time.response_engines = 15e3, this.__internal__.dispense.limit_counter = 15, this.__internal__.dispense.custom_limit_counter = null, this.__internal__.dispense.backup_dispense = {
      channel: 1,
      second_channel: null,
      sensor: !0,
      seconds: null
    }, a(this, i, E).call(this), a(this, i, M).call(this);
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
  set hasRecycler(n) {
    this.__banknote_purse.isRecycler = n;
  }
  get hasICT() {
    return this.hasRecycler && this.__banknote_purse.recycler.ict;
  }
  set hasICT(n) {
    this.__banknote_purse.recycler.ict = n;
  }
  set banknoteICT(n) {
    if (![20, 50, 100, 200, 500].includes(n)) throw new Error(`Invalid banknote value: ${n}`);
    n = [20, 50, 100, 200, 500].indexOf(n), this.__banknote_purse.recycler.banknote = n;
  }
  get banknoteICT() {
    return [20, 50, 100, 200, 500][this.__banknote_purse.recycler.banknote];
  }
  get hasCoinPurse() {
    return this.__coin_purse.available;
  }
  set hasCoinPurse(n) {
    if (typeof n != "boolean")
      throw new Error(`Invalid value: ${n}`);
    this.__coin_purse.available = n;
  }
  set price(n) {
    let e = parseFloat(n);
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
  serialMessage(n) {
    let e = {
      code: n,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    const t = (5 + this.deviceNumber).toString(16).padStart(2, "0").toLowerCase();
    switch (n[1]) {
      case t:
        e.request = "connect", e = a(this, i, Q).call(this, e);
        break;
      case "a0":
        e.request = "--automatic", e = a(this, i, L).call(this, n, e);
        break;
      case "b0":
        e.request = "--automatic", e = a(this, i, z).call(this, n, e);
        break;
      case "d0":
        e.request = "coin-purse:config", e = a(this, i, W).call(this, n[2], e);
        break;
      case "d1":
        e.request = "banknote-purse:config", e.additional = { scrow: null }, e = a(this, i, K).call(this, n, e);
        break;
      case "d2":
        e.request = "coin-purse:read-tubes", e = a(this, i, V).call(this, n, e);
        break;
      case "d3":
        e.request = "banknote-purse:read-recycler", e = a(this, i, Y).call(this, n, e);
        break;
      case "d4":
        e.request = "banknote-purse:banknote-scrow-status", e = a(this, i, m).call(this, n[2], e);
        break;
      case "d5":
        e.request = "banknote-purse:dispense", e = a(this, i, G).call(this, n, e);
        break;
      case "d6":
        e.request = "coin-purse:dispense", e = a(this, i, H).call(this, n, e);
        break;
      case "d7":
        e.request = "dispense", e = a(this, i, J).call(this, n[5], e);
        break;
      case "d8":
        e.request = "--automatic", e = a(this, i, X).call(this, n[13], e);
        break;
      case "d9":
        e.request = "status:temperature", e = a(this, i, Z).call(this, n, e);
        break;
      case "da":
        e.request = "status:relay", e = a(this, i, g).call(this, n[2], e);
        break;
      case "db":
        e.request = "banknote-purse:save-memory", e.no_code = 18, e.name = "Bill purse memory saved?", e.description = "The memory of bill purse was saved successfully?", this.dispatch("banknote-purse:save-memory", { message: e });
        break;
      case "dc":
        e.request = "coin-purse:read-memory", e.no_code = 19, e.name = "Coin purse memory read?", e.description = "The memory of coin purse was read successfully?", this.dispatch("banknote-purse:read-memory", { message: e });
        break;
      case "dd":
        e.request = "card-reader", a(this, i, ee).call(this, n, e);
        break;
      default:
        e.request = "--unknown", e.name = "Response unrecognized", e.description = "The response of application was received, but dont identify with any of current parameters", e.no_code = 400, this.dispatch("unknown", e);
        break;
    }
    this.dispatch("serial:message", e);
  }
  serialSetConnectionConstant(n = 1) {
    return d.connection({ channel: n });
  }
  async coinPurseConfigure({ enable: n = !1, high: e = "FF", low: t = "FF" } = {}) {
    if (!this.__coin_purse.available) throw new Error("Coin purse not available");
    return e = this.hexToDec(e), t = this.hexToDec(t), await this.appendToQueue(
      d.coinPurseConfiguration({ enable: n, high: e, low: t }),
      "coin-purse:config"
    );
  }
  async coinPurseEnable() {
    await this.coinPurseConfigure({ enable: !0 });
  }
  async coinPurseDisable() {
    await this.coinPurseConfigure({ enable: !1 });
  }
  async coinPurseDispense({ $_50c: n = 0, $_1: e = 0, $_2: t = 0, $_5: s = 0, $_10: r = 0 } = {}) {
    if (!this.__coin_purse.available) throw new Error("Coin purse not available");
    return await this.appendToQueue(
      d.coinPurseDispense({
        $50c: n,
        $1: e,
        $2: t,
        $5: s,
        $10: r
      }),
      "coin-purse:dispense"
    );
  }
  async coinPurseReadTubes() {
    return await this.appendToQueue(d.coinPurseReadTubes(), "coin-purse:read-tubes");
  }
  async banknotePurseConfigure({ enable: n = !1, scrow: e = !1 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    let t;
    return a(this, i, v).call(this) ? t = a(this, i, ne).call(this, { enable: n, scrow: e }) : t = a(this, i, te).call(this, { enable: n, scrow: e }), await this.appendToQueue(t, "banknote-purse:config");
  }
  async banknotePurseDispense({ $_20: n = 0, $_50: e = 0, $_100: t = 0, $_200: s = 0, $_500: r = 0, $_1000: c = 0 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    let o;
    if (a(this, i, v).call(this)) {
      const u = [n, e, t, s, r];
      o = a(this, i, ie).call(this, u[this.__banknote_purse.recycler.banknote]);
    } else
      o = a(this, i, se).call(this, { $_20: n, $_50: e, $_100: t, $_200: s, $_500: r, $_1000: c });
    await this.appendToQueue(o, "banknote-purse:dispense");
  }
  async banknotePurseEnable({ scrow: n = !1 }) {
    return await this.banknotePurseConfigure({ enable: !0, scrow: n });
  }
  async banknotePurseDisable() {
    return await this.banknotePurseConfigure({ enable: !1 });
  }
  async banknotePurseAcceptInScrow() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    return await this.appendToQueue(
      d.banknotePurseAcceptInScrow(),
      "banknote-purse:banknote-scrow-status"
    );
  }
  async banknotePurseRejectInScrow() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    return await this.appendToQueue(
      d.banknotePurseRejectInScrow(),
      "banknote-purse:banknote-scrow-status"
    );
  }
  async banknotePurseSaveMemory({
    channel: n = null,
    $_20: e = null,
    $_50: t = null,
    $_100: s = null,
    $_200: r = null,
    $_500: c = null,
    $_1000: o = null
  } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    return await this.appendToQueue(
      d.banknotePurseSaveMemory({
        channel: n,
        $20: e,
        $50: t,
        $100: s,
        $200: r,
        $500: c,
        $1000: o
      }),
      "banknote-purse:save-memory"
    );
  }
  async banknotePurseReadRecycler() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    return await this.appendToQueue(d.banknotePurseReadRecycler(), "banknote-purse:read-recycler");
  }
  async cardReaderDisable() {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    return await this.appendToQueue(d.cardReaderDisable(), "card-reader:disable");
  }
  async cardReaderDispense({ channel: n = 1, second_channel: e = null, sensor: t = !0, seconds: s = null, price: r = 0 } = {}) {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    if ((isNaN(this.card_reader.max_pre_credit) || this.card_reader.max_pre_credit === 0) && (this.card_reader.max_pre_credit = r), isNaN(r) || r <= 0) throw new Error("Price must be greater than 0");
    if (r > this.card_reader.max_pre_credit) throw new Error("Price is greater than pre-credit configured");
    if (!t && (s === null || s <= 0 || s > 40))
      throw new Error("Invalid time to dispense without sensor, must be between 0.1 and 40.0 seconds");
    return this.appendToQueue(
      d.cardReaderDispense({
        selection: n,
        second_selection: e,
        sensor: t,
        seconds: s,
        price: r
      }),
      "card-reader:dispense"
    );
  }
  async paymentPursesDisable({ coin: n = !0, banknote: e = !0, cardReader: t = !1 } = {}) {
    n && this.__coin_purse.available && await this.coinPurseDisable(), e && this.__banknote_purse.available && await this.banknotePurseDisable(), t && this.card_reader.available && await this.cardReaderDisable();
  }
  async paymentPursesEnable({ coin: n = !0, banknote: e = !0, scrowBanknote: t = !1 } = {}) {
    n && this.__coin_purse.available && await this.coinPurseEnable(), e && this.__banknote_purse.available && await this.banknotePurseEnable({ scrow: t });
  }
  async coolingRelayConfigure({ enable: n = !1 } = {}) {
    return await this.appendToQueue(d.coolingRelayConfigure({ enable: n }), "status:relay");
  }
  async coolingRelayEnable() {
    return await this.coolingRelayConfigure({ enable: !0 });
  }
  async coolingRelayDisable() {
    return await this.coolingRelayConfigure({ enable: !1 });
  }
  async readTemperature() {
    return await this.appendToQueue(d.readTemperature(), "status:temperature");
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
  async dispense({ selection: n = 1, second_selection: e = null, sensor: t = !0, seconds: s = null, retry: r = !0 } = {}) {
    if (n = parseInt(n), isNaN(n) || n < 1 || n > 80) throw new Error("Invalid channel number");
    if (e !== null && (e < 1 || e > 80 || e === n))
      throw new Error("Invalid second channel number");
    if (!t && (s === null || s <= 0 || s > 40))
      throw new Error("Invalid time to dispense without sensor, must be between 0.1 and 40.0 seconds");
    r && (this.__internal__.dispense.backup_dispense = {
      selection: n,
      second_selection: e,
      sensor: t,
      seconds: s
    });
    const c = d.dispense({
      selection: n,
      second_selection: e,
      sensor: t,
      seconds: s
    });
    t || (s || (s = 1.5), this.__internal__.dispense.custom_limit_counter = s + 0.2);
    let o = await this.internalDispense(c);
    return !o.dispensed && r && (o = await this.internalDispense(c)), this.__internal__.dispense.custom_limit_counter = null, o;
  }
  async testEngines({ singleEngine: n = !1 } = {}) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    if (y(this, f)) throw new Error("Another test is running");
    a(this, i, R).call(this), b(this, f, !0);
    const e = [];
    a(this, i, C).call(this);
    for (let t = 1; t <= 80; t++) {
      const s = await this.dispense({
        selection: t,
        second_selection: n ? null : t + 1,
        sensor: !1,
        seconds: 0.4,
        retry: !1
      });
      e.push(s), b(this, _, t), a(this, i, C).call(this), n || t++;
    }
    b(this, _, 80), a(this, i, C).call(this, { dispensed: e }), a(this, i, R).call(this);
  }
  async sendCustomCode({ code: n = [] } = {}) {
    if (n.length === 0) throw new Error("Invalid code");
    return await this.appendToQueue(d.customCode(n), "custom");
  }
  hasToReturnChange(n = 0) {
    let e = n;
    return e <= 0 ? !0 : (e = a(this, i, P).call(this, e).pending, e = a(this, i, $).call(this, e).pending, !(e > 0));
  }
  async returnChange() {
    return await a(this, i, B).call(this);
  }
  async returnInsertedMoney() {
    return this.__money_session.inserted <= 0 ? !1 : await a(this, i, B).call(this, this.__money_session.inserted);
  }
  async serialCorruptMessage(n, e) {
    this.dispatch("corrupt:message", { data: n, message: e });
  }
}
f = new WeakMap(), _ = new WeakMap(), k = new WeakMap(), i = new WeakSet(), E = function() {
  const n = [
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
  for (const e of n)
    this.serialRegisterAvailableListener(e);
}, M = function() {
  x.add(this);
}, v = function() {
  return this.__banknote_purse.isRecycler && this.__banknote_purse.recycler.ict;
}, S = function() {
  return this.hasCoinPurse || this.hasRecycler;
}, Q = function(n) {
  return n.name = "Connection with the serial device completed.", n.description = "Your connection with the serial device was successfully completed.", n.no_code = 1, this.dispatch("run:default-load", {}), n;
}, N = function(n) {
  const e = {
    g50: ["40", "50", "60", "70", "90"],
    c50: ["41", "51", "61", "71", "91"],
    p1: ["42", "52", "62", "72", "92"],
    p2: ["43", "53", "63", "73", "93"],
    p5: ["44", "54", "64", "74", "94"],
    p10: ["45", "55", "65", "75", "95"],
    p20: ["47", "57", "67", "77", "97"]
  };
  let t = null;
  for (let r in e)
    if (e[r].includes(n)) {
      t = r;
      break;
    }
  return t ? [{
    g50: "50 pennies (the big one)",
    c0: "50 pennies (the little one)",
    p1: "1 peso",
    p2: "2 pesos",
    p5: "5 pesos",
    p10: "10 pesos",
    p20: "20 pesos"
  }[t], t] : [`Undefined value: ¿${n}?`, null];
}, F = function(n) {
  return ["g50", "c50", "p1", "p2", "p5", "p10", "p20"].includes(n);
}, j = function(n) {
  const e = {
    p20: ["80", "90", "a0", "b0"],
    p50: ["81", "91", "a1", "b1"],
    p100: ["82", "92", "a2", "b2"],
    p200: ["83", "93", "a3", "b3"],
    p500: ["84", "94", "a4", "b4"],
    p1000: ["85", "95", "a5", "b5"]
  };
  let t = null;
  for (let r in e)
    if (e[r].includes(n)) {
      t = r;
      break;
    }
  return t ? [{
    p20: "20 pesos",
    p50: "50 pesos",
    p100: "100 pesos",
    p200: "200 pesos",
    p500: "500 pesos",
    p1000: "1000 pesos"
  }[t], t] : [`Undefined value: ¿${n}?`, null];
}, O = function(n) {
  return ["p20", "p50", "p100", "p200", "p500", "p1000"].includes(n);
}, U = function(n) {
  return ["r20", "r50", "r100"].includes(n);
}, A = function() {
  return ["r20", "r50", "r100", "r200", "r500"][this.__banknote_purse.recycler.banknote];
}, T = function(n, e, t) {
  if (!n) return;
  let s = !0;
  if (a(this, i, F).call(this, n) && t === "coin") {
    if (typeof this.coins.tubes[n] > "u") return;
    e === "tube" ? this.coins.tubes[n] += 1 : e === "box" && (this.coins.box[n] += 1);
    let r = 0;
    ["g50", "c50"].includes(n) ? r = 0.5 : r += parseInt(n.slice(1)), this.coins.totals[n] += r, this.__money_session.inserted += r, this.coins.total += r;
  } else if (a(this, i, O).call(this, n) && t === "banknote") {
    if (typeof this.banknotes.recycler[n] > "u") return;
    e === "recycler" ? this.banknotes.recycler[n] += 1 : e === "stacker" && (this.banknotes.stacker[n] += 1);
    let r = parseInt(n.slice(1));
    this.banknotes.totals[n] += r, this.__money_session.inserted += r, this.banknotes.total += r;
  } else if (a(this, i, U).call(this, n) && e === "out" && t === "banknote") {
    if (typeof this.banknotes.out[n.replace("r", "p")] > "u") return;
    this.banknotes.out[n.replace("r", "p")] += 1;
    let r = parseInt(n.slice(1));
    this.__money_session.retired += r, this.banknotes.recycler[n.replace("r", "p")] -= 1, this.banknotes.total -= r, s = !1, this.dispatch("session:money-dispensed", { type_money: n, retired: r, finish: !1, type: "banknotes" });
  }
  s && this.dispatch("session:money-request", {});
}, L = function(n, e) {
  const t = parseInt(n[2], 16);
  return e.name = "Coin Inserted", e.no_code = 2, e.additional = { where: null, coin: null }, t === 1 ? (e.name = "Lever pressed", e.description = "Reject lever", e.no_code = 100, this.dispatch("coin-purse:reject-lever", {})) : t === 2 ? (e.name = "Reset coin purse", e.description = "The configuration of coin purse was reset", e.no_code = 101, this.dispatch("coin-purse:reset", {})) : t >= 64 && t <= 79 ? (e.name = "Coin inserted in profit box", e.additional.where = "box") : t >= 80 && t <= 95 ? (e.name = "Coin inserted in tube", e.additional.where = "tube") : t >= 96 && t <= 111 ? (e.name = "Unused coin", e.description = "Something come from coin changer but in MDB Docs is unused", e.additional.where = "unused") : t >= 112 && t <= 127 ? (e.name = "Coin rejected", e.additional.where = "rejected") : t >= 144 && t <= 159 ? (e.name = "Coin dispensed", e.additional.where = "out", e.description = `Undefined value: ¿${n[2]}?`) : (e.name = "Coin inserted", e.description = "Undefined status. Without information of this", e.no_code = 400), t === 1 || t === 2 || t >= 160 || t >= 128 && t <= 143 || ([e.description, e.additional.coin] = a(this, i, N).call(this, n[2]), e.no_code = 38 + t, a(this, i, T).call(this, e.additional.coin, e.additional.where, "coin"), ["tube", "out"].includes(e.additional.where) && this.dispatch("coin-purse:tubes", this.coins.tubes), this.dispatch("coin-purse:coin-event", this.coins)), e;
}, z = function(n, e) {
  const t = parseInt(n[2], 16);
  return e.name = "Banknote Inserted", e.no_code = 2, e.additional = { where: null, banknote: null }, t === 42 ? (e.name = "Banknote dispensed", e.description = "Banknote dispensed by request.", e.additional.banknote = a(this, i, A).call(this), e.additional.where = "out", e.no_code = 200) : t >= 128 && t <= 143 ? (e.name = "Banknote inserted", e.additional.where = "stacker") : t >= 144 && t <= 159 ? (e.name = "Banknote inserted in pre stacker", e.additional.where = "tmp") : t >= 160 && t <= 175 ? (e.name = "Banknote rejected", e.additional.where = "nothing") : t >= 176 && t <= 191 && (e.name = "Banknote inserted", e.additional.where = "recycler"), t >= 128 && t <= 191 && ([e.description, e.additional.banknote] = a(this, i, j).call(this, n[2]), e.no_code = 74 + t), a(this, i, T).call(this, e.additional.banknote, e.additional.where, "banknote"), this.dispatch("banknote-purse:event-banknote", this.banknotes), e;
}, W = function(n, e) {
  const t = parseInt(n, 16);
  return t === 1 ? (e.name = "Coin purse enabled", e.description = "Configuration complete, enabled", e.no_code = 3) : t === 0 ? (e.name = "Coin purse disabled", e.description = "Disabled by system request", e.no_code = 4) : (e.name = "Status unknown", e.description = "The response of coin purse doesn't identify successfully", e.no_code = 400), this.dispatch("coin-purse:config", { enabled: t === 1 }), e;
}, K = function(n, e) {
  const t = parseInt(n[2], 16), s = parseInt(n[3], 16);
  return t === 0 ? (e.name = "Bill purse disabled", e.description = "Configuration complete, disabled") : t === 1 && (e.name = "Bill purse enabled", e.description = "Configuration complete, enabled"), s === 0 ? e.additional.scrow = "Scrow disabled, banknote received automatic" : s === 1 && (e.additional.scrow = "Scrow enabled, require manual action"), e.no_code = 5, this.dispatch("banknote-purse:config", { enabled: t === 1, scrow: s === 1 }), e;
}, V = function(n, e) {
  e.no_code = 6;
  const [t, s, r, c, o, u] = [
    parseInt(n[2], 16),
    parseInt(n[3], 16),
    parseInt(n[4], 16),
    parseInt(n[5], 16),
    parseInt(n[6], 16),
    parseInt(n[7], 16)
  ];
  return e.additional = {
    coins: { g50: t, c50: s, p1: r, p2: c, p5: o, p10: u }
  }, this.coins.tubes.g50 = t, this.coins.tubes.c50 = s, this.coins.tubes.p1 = r, this.coins.tubes.p2 = c, this.coins.tubes.p5 = o, this.coins.tubes.p10 = u, this.coins.totals.g50 = (this.coins.box.g50 + t) * 0.5, this.coins.totals.c50 = (this.coins.box.c50 + s) * 0.5, this.coins.totals.p1 = this.coins.box.p1 + r, this.coins.totals.p2 = (this.coins.box.p2 + c) * 2, this.coins.totals.p5 = (this.coins.box.p5 + o) * 5, this.coins.totals.p10 = (this.coins.box.p10 + u) * 10, this.coins.total = this.coins.totals.g50 + this.coins.totals.c50 + this.coins.totals.p1 + this.coins.totals.p2 + this.coins.totals.p5 + this.coins.totals.p10, e.name = "Read tubes", e.description = "Quantity of coins approximated", this.dispatch("coin-purse:tubes", this.coins.tubes), e;
}, Y = function(n, e) {
  e.no_code = 7;
  const [t, s, r, c, o, u] = [
    parseInt(n[2], 16),
    parseInt(n[3], 16),
    parseInt(n[4], 16),
    parseInt(n[5], 16),
    parseInt(n[6], 16),
    parseInt(n[7], 16)
  ];
  return e.additional = {
    banknotes: { b20: t, b50: s, b100: r, b200: c, b500: o, b1000: u }
  }, this.banknotes.recycler.p20 = t, this.banknotes.recycler.p50 = s, this.banknotes.recycler.p100 = r, this.banknotes.recycler.p200 = c, this.banknotes.recycler.p500 = o, this.banknotes.recycler.p1000 = u, this.banknotes.totals.p20 = (this.banknotes.stacker.p20 + t) * 20, this.banknotes.totals.p50 = (this.banknotes.stacker.p50 + s) * 50, this.banknotes.totals.p100 = (this.banknotes.stacker.p100 + r) * 100, this.banknotes.totals.p200 = (this.banknotes.stacker.p200 + c) * 200, this.banknotes.totals.p500 = (this.banknotes.stacker.p500 + o) * 500, this.banknotes.totals.p1000 = (this.banknotes.stacker.p1000 + u) * 1e3, this.banknotes.total = this.banknotes.totals.p20 + this.banknotes.totals.p50 + this.banknotes.totals.p100 + this.banknotes.totals.p200 + this.banknotes.totals.p500 + this.banknotes.totals.p1000, e.name = "Read recycler", e.description = "Quantity of banknotes approximated", this.dispatch("banknote-purse:recycler", this.banknotes.recycler), e;
}, m = function(n, e) {
  const t = parseInt(n, 16);
  return t === 1 ? e.name = "Banknote accepted" : t === 0 ? e.name = "Banknote rejected" : e.name = "Unknown status banknote", e.no_code = 8, this.dispatch("banknote-purse:banknote-scrow-status", { status: t === 1 }), e;
}, G = function(n, e) {
  const [t, s, r, c, o, u] = [
    parseInt(n[2], 16),
    parseInt(n[3], 16),
    parseInt(n[4], 16),
    parseInt(n[5], 16),
    parseInt(n[6], 16),
    parseInt(n[7], 16)
  ], q = t * 20 + s * 50 + r * 100 + c * 200 + o * 500 + u * 1e3;
  return e.name = "Banknotes dispensed", e.description = q > 0 ? "Banknotes dispensed by request" : "No banknotes dispensed, recycler empty", e.no_code = 9, e.additional = {
    banknotes: { b20: t, b50: s, b100: r, b200: c, b500: o, b1000: u },
    total_dispensed: q
  }, this.dispatch("session:money-dispensed", {
    type_money: null,
    retired: null,
    finish: !1,
    type: "banknotes",
    data: e
  }), e;
}, H = function(n, e) {
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
}, J = function(n, e) {
  const t = parseInt(n, 16);
  return t === 1 ? (e.name = "Product not delivered", e.description = "The product requested wasn't delivered", e.no_code = 11, this.__internal__.dispense.status = !1) : t === 0 ? (e.name = "Product delivered", e.description = "The product requested was delivered", e.no_code = 12, this.__internal__.dispense.status = !0) : (e.name = "Unknown status product", e.description = "The response of product doesn't identify successfully", e.no_code = 400, this.__internal__.dispense.status = !1), this.dispatch("dispensed", {}), e;
}, X = function(n, e) {
  let t = "closed";
  return n === "db" ? (e.name = "Door closed", e.no_code = 13) : n === "dc" ? (e.name = "Door open", e.no_code = 14, t = "open") : (e.name = "Unknown status door", e.description = "The response of door doesn't identify successfully", e.no_code = 400, t = "unknown"), this.__internal__.device.door_open = t === "open", this.dispatch("event:door", { open: t === "open" }), this.dispatch("door:event", { open: t === "open" }), e;
}, Z = function(n, e) {
  const t = parseInt(n[2], 16) * 255, s = parseInt(n[3], 16), r = (t + s) * 0.1;
  return e.no_code = 15, e.name = "Temperature status", e.description = `Temperature: ${r}`, e.additional = {
    high: t,
    low: s,
    temperature: parseFloat(r.toString())
  }, this.dispatch("status:temperature", e.additional), e;
}, g = function(n, e) {
  const t = parseInt(n, 16);
  let s = "unknown";
  return t === 1 ? (e.name = "Relay on", e.description = "Relay on", e.no_code = 16, s = "on") : t === 0 ? (e.name = "Relay off", e.description = "Relay off", e.no_code = 17, s = "off") : (e.name = "Status unknown", e.description = "Status unknown", e.no_code = 400), this.dispatch("status:relay", { enabled: s === "on" }), e;
}, ee = function(n, e) {
  const t = parseInt(n[2], 16);
  if (e.no_code = 20 + t, e.name = "Status unknown", e.description = "The status of card reader does not identified correctly", t === 0)
    e.request += ":disable", e.name = "Card reader disabled", e.description = "Card reader device was disabled successfully";
  else if (t === 1 || t === 2)
    e.request += ":dispense", e.name = "Card reader enabled", e.description = "Card reader device is now enabled";
  else if (t === 3)
    e.request += ":pre-authorize", e.name = "Pre-authorized credit", e.description = "The pre credit was authorized successfully";
  else if (t === 4)
    e.request += ":cancel", e.name = "Cancellation in progress", e.description = "Cancellation request done successfully";
  else if (t === 5)
    e.request += ":sell", e.name = "Sell approved", e.description = "Sell approved, starting dispense product";
  else if (t === 6)
    e.request += ":sell", e.name = "Sell denied", e.description = "This sell was denied, try again";
  else if (t === 7)
    e.request += ":end", e.name = "Session ended", e.description = "The session ended";
  else if (t === 8)
    e.request += ":cancel", e.name = "Cancelled", e.description = "Cancellation complete";
  else if (t === 10) {
    const s = parseInt(n[8], 16);
    s === 1 ? (e.no_code = 30, e.name = "product not dispensed", e.description = "The product requested wasn't delivered") : s === 0 ? (e.no_code = 31, e.name = "product dispensed", e.description = "The product requested was delivered") : (e.name = "finished-unknown", e.no_code = 400);
  } else
    e.no_code = 400;
  return this.dispatch("card-reader:event", e), e;
}, ne = function({ enable: n = !1, scrow: e = !1 } = {}) {
  return d.banknotePurseICTConfigure({ enable: n, scrow: e });
}, te = function({ enable: n = !1, scrow: e = !1 } = {}) {
  return d.banknotePurseOtherConfigure({ enable: n, scrow: e });
}, ie = function(n = 1) {
  if (n < 1) throw new Error("No banknotes to dispense");
  const e = [20, 50, 100, 200, 500][this.__banknote_purse.recycler.banknote];
  return d.banknotePurseICTDispense({ quantity: n, denomination: e });
}, se = function({ $_20: n = 0, $_50: e = 0, $_100: t = 0, $_200: s = 0, $_500: r = 0, $_1000: c = 0 } = {}) {
  return d.banknotePurseOtherDispense({
    $20: n,
    $50: e,
    $100: t,
    $200: s,
    $500: r,
    $1000: c
  });
}, R = function() {
  b(this, f, !1), b(this, _, 0), b(this, k, 0);
}, /**
 *
 * @param {null|object} dispensed
 * @param {number} limit
 */
C = function({ dispensed: n = null, limit: e = 80 } = {}) {
  b(this, k, Math.round(y(this, _) * 100 / e)), this.dispatch("percentage:test", { percentage: y(this, k), dispensed: n });
}, re = function(n) {
  const e = ["20", "50", "100", "200", "500"], t = this.__banknote_purse.recycler.banknote, s = "$_" + e[t], r = parseInt(e[t]), c = this.banknotes.recycler[`p${e[t]}`], o = Math.min(Math.floor(n / r), c), u = {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: n,
    will_dispense: o > 0
  };
  return this.totalInRecycler === 0 || o < 1 || n === 0 || (u.banknotes[s] = o, u.pending = parseFloat((n - o * r).toFixed(2))), u;
}, ae = function(n) {
  const e = {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: n,
    will_dispense: !1
  };
  if (this.totalInRecycler === 0 || n === 0) return e;
  const t = (s, r) => {
    if (this.banknotes.recycler[r] > 0) {
      const c = Math.floor(e.pending / s), o = Math.min(c, this.banknotes.recycler[r]);
      e.banknotes[`$_${s}`] = o, e.pending = parseFloat((e.pending - o * s).toFixed(2));
    }
  };
  return t(1e3, "p1000"), t(500, "p500"), t(200, "p200"), t(100, "p100"), t(50, "p50"), t(20, "p20"), e.will_dispense = Object.values(e.banknotes).some((s) => s > 0), e;
}, P = function(n) {
  return this.hasRecycler ? a(this, i, v).call(this) ? a(this, i, re).call(this, n) : a(this, i, ae).call(this, n) : {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: n,
    will_dispense: !1
  };
}, $ = function(n) {
  const e = {
    coins: { $_50c: 0, $_1: 0, $_2: 0, $_5: 0, $_10: 0 },
    pending: n,
    will_dispense: !1
  };
  if (!this.hasCoinPurse || n <= 0 || this.totalInTubes === 0) return e;
  const t = (s, r, c = null) => {
    if (this.coins.tubes[r] > 0) {
      c === null && (c = "$_" + s);
      const o = Math.floor(e.pending / s), u = Math.min(o, this.coins.tubes[r]);
      e.coins[c] = u, e.pending = parseFloat((e.pending - u * s).toFixed(2));
    }
  };
  return t(10, "p10"), t(5, "p5"), t(2, "p2"), t(1, "p1"), t(0.5, "g50", "$_50c"), e.will_dispense = Object.values(e.coins).some((s) => s > 0), e;
}, B = async function(n = null) {
  if (!a(this, i, S).call(this)) throw new Error("Change not available");
  let e = this.change, t = this.change;
  if (n !== null && (e = n, t = n), t <= 0) return !1;
  const s = a(this, i, P).call(this, t);
  t = s.pending;
  const r = a(this, i, $).call(this, t);
  return t = r.pending, t > 0 && this.dispatch("change:pending", { pending: t }), this.dispatch("change:dispense", {
    recycler: s.banknotes,
    coins: r.coins,
    pending: t,
    delivery: e - t
  }), t === e ? !1 : (s.will_dispense && await this.banknotePurseDispense(s.banknotes), r.will_dispense && await this.coinPurseDispense(r.coins), !0);
};
export {
  he as Boardroid
};
