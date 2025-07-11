import { K as u } from "./kernel-505KqpPU.js";
import { l } from "./relay-CsdB0FSa.js";
import { a as p } from "./webserial-core-C0ZbaNYy.js";
class f extends u {
  __coin_purse = {
    available: !0
  };
  __banknote_purse = {
    available: !0,
    isRecycler: !0,
    recycler: {
      ict: !0,
      banknote: 1
      // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
    }
  };
  __sale = {
    price: 0,
    change: 0,
    change_verified: 0,
    dispense_all: !0,
    last_change: 0,
    clear() {
      this.price = 0, this.change = 0, this.change_verified = 0, this.dispense_all = !0, this.last_change = 0;
    }
  };
  __money_session = {
    inserted: 0,
    retired: 0,
    clear() {
      this.inserted = 0, this.retired = 0;
    }
  };
  coins = {
    tubes: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
    box: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
    totals: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
    total: 0
  };
  banknotes = {
    stacker: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
    recycler: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
    out: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
    totals: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
    total: 0
  };
  card_reader = {
    available: !1,
    max_pre_credit: 0
  };
  #n = !1;
  #e = 0;
  #t = 0;
  constructor({ filters: n = null, config_port: e = null, no_device: t = 1, socket: s = !1 } = {}) {
    if (super({ filters: n, config_port: e, no_device: t, socket: s }), this.__internal__.device.type = "boardroid", p.getCustom(this.typeDevice, t))
      throw new Error(`Device ${this.typeDevice} ${t} already exists`);
    this.__internal__.serial.config_port.baudRate = 115200, this.__internal__.serial.response.length = 14, this.__internal__.time.response_connection = 600, this.__internal__.time.response_general = 4e3, this.__internal__.time.response_engines = 15e3, this.__internal__.dispense.limit_counter = 15, this.__internal__.dispense.custom_limit_counter = null, this.__internal__.dispense.backup_dispense = {
      channel: 1,
      second_channel: null,
      sensor: !0,
      seconds: null
    }, this.#p(), this.#u();
  }
  #p() {
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
      "status:temperature",
      "money:inserted"
    ];
    for (const e of n)
      this.serialRegisterAvailableListener(e);
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
  #u() {
    p.add(this);
  }
  #s() {
    return this.__banknote_purse.isRecycler && this.__banknote_purse.recycler.ict;
  }
  #d() {
    return this.hasCoinPurse || this.hasRecycler;
  }
  softReload() {
    super.softReload(), this.__sale.clear(), this.__money_session.clear();
  }
  #h(n) {
    return n.name = "Connection with the serial device completed.", n.description = "Your connection with the serial device was successfully completed.", n.no_code = 1, this.dispatch("run:default-load", {}), n;
  }
  #b(n) {
    const e = {
      g50: { value: 0.5, name: "50 pennies (the big one)" },
      c0: { value: 0.5, name: "50 pennies (the little one)" },
      p1: { value: 1, name: "1 peso" },
      p2: { value: 2, name: "2 pesos" },
      p5: { value: 5, name: "5 pesos" },
      p10: { value: 10, name: "10 pesos" },
      p20: { value: 20, name: "20 pesos" }
    };
    return e[n] ? e[n] : !1;
  }
  #_(n) {
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
    for (let i in e)
      if (e[i].includes(n)) {
        t = i;
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
  }
  #f(n) {
    return ["g50", "c50", "p1", "p2", "p5", "p10", "p20"].includes(n);
  }
  #k(n) {
    const e = {
      p20: ["80", "90", "a0", "b0"],
      p50: ["81", "91", "a1", "b1"],
      p100: ["82", "92", "a2", "b2"],
      p200: ["83", "93", "a3", "b3"],
      p500: ["84", "94", "a4", "b4"],
      p1000: ["85", "95", "a5", "b5"]
    };
    let t = null;
    for (let i in e)
      if (e[i].includes(n)) {
        t = i;
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
  }
  #y(n) {
    const e = {
      p20: { value: 20, name: "20 pesos" },
      p50: { value: 50, name: "50 pesos" },
      p100: { value: 100, name: "100 pesos" },
      p200: { value: 200, name: "200 pesos" },
      p500: { value: 500, name: "500 pesos" },
      p1000: { value: 1e3, name: "1000 pesos" }
    };
    return e[n] ? e[n] : !1;
  }
  #w(n) {
    return ["p20", "p50", "p100", "p200", "p500", "p1000"].includes(n);
  }
  #v(n) {
    return ["r20", "r50", "r100"].includes(n);
  }
  #C() {
    return ["r20", "r50", "r100", "r200", "r500"][this.__banknote_purse.recycler.banknote];
  }
  #r(n, e, t) {
    if (!n) return;
    let s = !0;
    if (this.#f(n) && t === "coin") {
      if (typeof this.coins.tubes[n] > "u") return;
      e === "tube" ? this.coins.tubes[n] += 1 : e === "box" && (this.coins.box[n] += 1);
      let i = 0;
      ["g50", "c50"].includes(n) ? i = 0.5 : i += parseInt(n.slice(1)), this.coins.totals[n] += i, this.__money_session.inserted += i, this.coins.total += i;
      const r = this.#b(n);
      r && this.dispatch("money:inserted", {
        type: "coin",
        money: r,
        // {value:number,name:string}
        where: e
      });
    } else if (this.#w(n) && t === "banknote") {
      if (typeof this.banknotes.recycler[n] > "u") return;
      e === "recycler" ? this.banknotes.recycler[n] += 1 : e === "stacker" && (this.banknotes.stacker[n] += 1);
      let i = parseInt(n.slice(1));
      this.banknotes.totals[n] += i, this.__money_session.inserted += i, this.banknotes.total += i;
      const r = this.#y(n);
      r && this.dispatch("money:inserted", {
        type: "banknote",
        money: r,
        // {value:number,name:string}
        where: e
      });
    } else if (this.#v(n) && e === "out" && t === "banknote") {
      if (typeof this.banknotes.out[n.replace("r", "p")] > "u") return;
      this.banknotes.out[n.replace("r", "p")] += 1;
      let i = parseInt(n.slice(1));
      this.__money_session.retired += i, this.banknotes.recycler[n.replace("r", "p")] -= 1, this.banknotes.total -= i, s = !1, this.dispatch("session:money-dispensed", { type_money: n, retired: i, finish: !1, type: "banknotes" });
    }
    s && this.dispatch("session:money-request", {});
  }
  #I(n, e) {
    const t = parseInt(n[2], 16);
    return e.name = "Coin Inserted", e.no_code = 2, e.additional = { where: null, coin: null }, t === 1 ? (e.name = "Lever pressed", e.description = "Reject lever", e.no_code = 100, this.dispatch("coin-purse:reject-lever", {})) : t === 2 ? (e.name = "Reset coin purse", e.description = "The configuration of coin purse was reset", e.no_code = 101, this.dispatch("coin-purse:reset", {})) : t >= 64 && t <= 79 ? (e.name = "Coin inserted in profit box", e.additional.where = "box") : t >= 80 && t <= 95 ? (e.name = "Coin inserted in tube", e.additional.where = "tube") : t >= 96 && t <= 111 ? (e.name = "Unused coin", e.description = "Something come from coin changer but in MDB Docs is unused", e.additional.where = "unused") : t >= 112 && t <= 127 ? (e.name = "Coin rejected", e.additional.where = "rejected") : t >= 144 && t <= 159 ? (e.name = "Coin dispensed", e.additional.where = "out", e.description = `Undefined value: ¿${n[2]}?`) : (e.name = "Coin inserted", e.description = "Undefined status. Without information of this", e.no_code = 400), t === 1 || t === 2 || t >= 160 || t >= 128 && t <= 143 || ([e.description, e.additional.coin] = this.#_(n[2]), e.no_code = 38 + t, this.#r(e.additional.coin, e.additional.where, "coin"), ["tube", "out"].includes(e.additional.where) && this.dispatch("coin-purse:tubes", this.coins.tubes), this.dispatch("coin-purse:coin-event", this.coins)), e;
  }
  #T(n, e) {
    const t = parseInt(n[2], 16);
    return e.name = "Banknote Inserted", e.no_code = 2, e.additional = { where: null, banknote: null }, t === 42 ? (e.name = "Banknote dispensed", e.description = "Banknote dispensed by request.", e.additional.banknote = this.#C(), e.additional.where = "out", e.no_code = 200) : t >= 128 && t <= 143 ? (e.name = "Banknote inserted", e.additional.where = "stacker") : t >= 144 && t <= 159 ? (e.name = "Banknote inserted in pre stacker", e.additional.where = "tmp") : t >= 160 && t <= 175 ? (e.name = "Banknote rejected", e.additional.where = "nothing") : t >= 176 && t <= 191 && (e.name = "Banknote inserted", e.additional.where = "recycler"), t >= 128 && t <= 191 && ([e.description, e.additional.banknote] = this.#k(n[2]), e.no_code = 74 + t), this.#r(e.additional.banknote, e.additional.where, "banknote"), this.dispatch("banknote-purse:event-banknote", this.banknotes), e;
  }
  #R(n, e) {
    const t = parseInt(n, 16);
    return t === 1 ? (e.name = "Coin purse enabled", e.description = "Configuration complete, enabled", e.no_code = 3) : t === 0 ? (e.name = "Coin purse disabled", e.description = "Disabled by system request", e.no_code = 4) : (e.name = "Status unknown", e.description = "The response of coin purse doesn't identify successfully", e.no_code = 400), this.dispatch("coin-purse:config", { enabled: t === 1 }), e;
  }
  #P(n, e) {
    const t = parseInt(n[2], 16), s = parseInt(n[3], 16);
    return t === 0 ? (e.name = "Bill purse disabled", e.description = "Configuration complete, disabled") : t === 1 && (e.name = "Bill purse enabled", e.description = "Configuration complete, enabled"), s === 0 ? e.additional.scrow = "Scrow disabled, banknote received automatic" : s === 1 && (e.additional.scrow = "Scrow enabled, require manual action"), e.no_code = 5, this.dispatch("banknote-purse:config", { enabled: t === 1, scrow: s === 1 }), e;
  }
  #$(n, e) {
    e.no_code = 6;
    const [t, s, i, r, a, o] = [
      parseInt(n[2], 16),
      parseInt(n[3], 16),
      parseInt(n[4], 16),
      parseInt(n[5], 16),
      parseInt(n[6], 16),
      parseInt(n[7], 16)
    ];
    return e.additional = {
      coins: { g50: t, c50: s, p1: i, p2: r, p5: a, p10: o }
    }, this.coins.tubes.g50 = t, this.coins.tubes.c50 = s, this.coins.tubes.p1 = i, this.coins.tubes.p2 = r, this.coins.tubes.p5 = a, this.coins.tubes.p10 = o, this.coins.totals.g50 = (this.coins.box.g50 + t) * 0.5, this.coins.totals.c50 = (this.coins.box.c50 + s) * 0.5, this.coins.totals.p1 = this.coins.box.p1 + i, this.coins.totals.p2 = (this.coins.box.p2 + r) * 2, this.coins.totals.p5 = (this.coins.box.p5 + a) * 5, this.coins.totals.p10 = (this.coins.box.p10 + o) * 10, this.coins.total = this.coins.totals.g50 + this.coins.totals.c50 + this.coins.totals.p1 + this.coins.totals.p2 + this.coins.totals.p5 + this.coins.totals.p10, e.name = "Read tubes", e.description = "Quantity of coins approximated", this.dispatch("coin-purse:tubes", this.coins.tubes), e;
  }
  #B(n, e) {
    e.no_code = 7;
    const [t, s, i, r, a, o] = [
      parseInt(n[2], 16),
      parseInt(n[3], 16),
      parseInt(n[4], 16),
      parseInt(n[5], 16),
      parseInt(n[6], 16),
      parseInt(n[7], 16)
    ];
    return e.additional = {
      banknotes: { b20: t, b50: s, b100: i, b200: r, b500: a, b1000: o }
    }, this.banknotes.recycler.p20 = t, this.banknotes.recycler.p50 = s, this.banknotes.recycler.p100 = i, this.banknotes.recycler.p200 = r, this.banknotes.recycler.p500 = a, this.banknotes.recycler.p1000 = o, this.banknotes.totals.p20 = (this.banknotes.stacker.p20 + t) * 20, this.banknotes.totals.p50 = (this.banknotes.stacker.p50 + s) * 50, this.banknotes.totals.p100 = (this.banknotes.stacker.p100 + i) * 100, this.banknotes.totals.p200 = (this.banknotes.stacker.p200 + r) * 200, this.banknotes.totals.p500 = (this.banknotes.stacker.p500 + a) * 500, this.banknotes.totals.p1000 = (this.banknotes.stacker.p1000 + o) * 1e3, this.banknotes.total = this.banknotes.totals.p20 + this.banknotes.totals.p50 + this.banknotes.totals.p100 + this.banknotes.totals.p200 + this.banknotes.totals.p500 + this.banknotes.totals.p1000, e.name = "Read recycler", e.description = "Quantity of banknotes approximated", this.dispatch("banknote-purse:recycler", this.banknotes.recycler), e;
  }
  #q(n, e) {
    const t = parseInt(n, 16);
    return t === 1 ? e.name = "Banknote accepted" : t === 0 ? e.name = "Banknote rejected" : e.name = "Unknown status banknote", e.no_code = 8, this.dispatch("banknote-purse:banknote-scrow-status", { status: t === 1 }), e;
  }
  #D(n, e) {
    const [t, s, i, r, a, o] = [
      parseInt(n[2], 16),
      parseInt(n[3], 16),
      parseInt(n[4], 16),
      parseInt(n[5], 16),
      parseInt(n[6], 16),
      parseInt(n[7], 16)
    ], c = t * 20 + s * 50 + i * 100 + r * 200 + a * 500 + o * 1e3;
    return e.name = "Banknotes dispensed", e.description = c > 0 ? "Banknotes dispensed by request" : "No banknotes dispensed, recycler empty", e.no_code = 9, e.additional = {
      banknotes: { b20: t, b50: s, b100: i, b200: r, b500: a, b1000: o },
      total_dispensed: c
    }, this.dispatch("session:money-dispensed", {
      type_money: null,
      retired: null,
      finish: !1,
      type: "banknotes",
      data: e
    }), e;
  }
  #x(n, e) {
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
  }
  #E(n, e) {
    const t = parseInt(n, 16);
    return t === 1 ? (e.name = "Product not delivered", e.description = "The product requested wasn't delivered", e.no_code = 11, this.__internal__.dispense.status = !1) : t === 0 ? (e.name = "Product delivered", e.description = "The product requested was delivered", e.no_code = 12, this.__internal__.dispense.status = !0) : (e.name = "Unknown status product", e.description = "The response of product doesn't identify successfully", e.no_code = 400, this.__internal__.dispense.status = !1), this.dispatch("dispensed", {}), e;
  }
  #M(n, e) {
    let t = "closed";
    return n === "db" ? (e.name = "Door closed", e.no_code = 13) : n === "dc" ? (e.name = "Door open", e.no_code = 14, t = "open") : (e.name = "Unknown status door", e.description = "The response of door doesn't identify successfully", e.no_code = 400, t = "unknown"), this.__internal__.device.door_open = t === "open", this.dispatch("event:door", { open: t === "open" }), this.dispatch("door:event", { open: t === "open" }), e;
  }
  #S(n, e) {
    const t = parseInt(n[2], 16) * 255, s = parseInt(n[3], 16), i = (t + s) * 0.1;
    return e.no_code = 15, e.name = "Temperature status", e.description = `Temperature: ${i}`, e.additional = {
      high: t,
      low: s,
      temperature: parseFloat(i.toString())
    }, this.dispatch("status:temperature", e.additional), e;
  }
  #m(n, e) {
    const t = parseInt(n, 16);
    let s = "unknown";
    return t === 1 ? (e.name = "Relay on", e.description = "Relay on", e.no_code = 16, s = "on") : t === 0 ? (e.name = "Relay off", e.description = "Relay off", e.no_code = 17, s = "off") : (e.name = "Status unknown", e.description = "Status unknown", e.no_code = 400), this.dispatch("status:relay", { enabled: s === "on" }), e;
  }
  #Q(n, e) {
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
        e.request = "connect", e = this.#h(e);
        break;
      case "a0":
        e.request = "--automatic", e = this.#I(n, e);
        break;
      case "b0":
        e.request = "--automatic", e = this.#T(n, e);
        break;
      case "d0":
        e.request = "coin-purse:config", e = this.#R(n[2], e);
        break;
      case "d1":
        e.request = "banknote-purse:config", e.additional = { scrow: null }, e = this.#P(n, e);
        break;
      case "d2":
        e.request = "coin-purse:read-tubes", e = this.#$(n, e);
        break;
      case "d3":
        e.request = "banknote-purse:read-recycler", e = this.#B(n, e);
        break;
      case "d4":
        e.request = "banknote-purse:banknote-scrow-status", e = this.#q(n[2], e);
        break;
      case "d5":
        e.request = "banknote-purse:dispense", e = this.#D(n, e);
        break;
      case "d6":
        e.request = "coin-purse:dispense", e = this.#x(n, e);
        break;
      case "d7":
        e.request = "dispense", e = this.#E(n[5], e);
        break;
      case "d8":
        e.request = "--automatic", e = this.#M(n[13], e);
        break;
      case "d9":
        e.request = "status:temperature", e = this.#S(n, e);
        break;
      case "da":
        e.request = "status:relay", e = this.#m(n[2], e);
        break;
      case "db":
        e.request = "banknote-purse:save-memory", e.no_code = 18, e.name = "Bill purse memory saved?", e.description = "The memory of bill purse was saved successfully?", this.dispatch("banknote-purse:save-memory", { message: e });
        break;
      case "dc":
        e.request = "coin-purse:read-memory", e.no_code = 19, e.name = "Coin purse memory read?", e.description = "The memory of coin purse was read successfully?", this.dispatch("banknote-purse:read-memory", { message: e });
        break;
      case "dd":
        e.request = "card-reader", this.#Q(n, e);
        break;
      default:
        e.request = "--unknown", e.name = "Response unrecognized", e.description = "The response of application was received, but dont identify with any of current parameters", e.no_code = 400, this.dispatch("unknown", e);
        break;
    }
    this.dispatch("serial:message", e);
  }
  serialSetConnectionConstant(n = 1) {
    return l.connection({ channel: n });
  }
  async coinPurseConfigure({ enable: n = !1, high: e = "FF", low: t = "FF" } = {}) {
    if (!this.__coin_purse.available) throw new Error("Coin purse not available");
    return e = this.hexToDec(e), t = this.hexToDec(t), await this.appendToQueue(
      l.coinPurseConfiguration({ enable: n, high: e, low: t }),
      "coin-purse:config"
    );
  }
  async coinPurseEnable() {
    await this.coinPurseConfigure({ enable: !0 });
  }
  async coinPurseDisable() {
    await this.coinPurseConfigure({ enable: !1 });
  }
  async coinPurseDispense({ $_50c: n = 0, $_1: e = 0, $_2: t = 0, $_5: s = 0, $_10: i = 0 } = {}) {
    if (!this.__coin_purse.available) throw new Error("Coin purse not available");
    return await this.appendToQueue(
      l.coinPurseDispense({
        $50c: n,
        $1: e,
        $2: t,
        $5: s,
        $10: i
      }),
      "coin-purse:dispense"
    );
  }
  async coinPurseReadTubes() {
    return await this.appendToQueue(l.coinPurseReadTubes(), "coin-purse:read-tubes");
  }
  #N({ enable: n = !1, scrow: e = !1 } = {}) {
    return l.banknotePurseICTConfigure({ enable: n, scrow: e });
  }
  #F({ enable: n = !1, scrow: e = !1 } = {}) {
    return l.banknotePurseOtherConfigure({ enable: n, scrow: e });
  }
  async banknotePurseConfigure({ enable: n = !1, scrow: e = !1 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    let t;
    return this.#s() ? t = this.#N({ enable: n, scrow: e }) : t = this.#F({ enable: n, scrow: e }), await this.appendToQueue(t, "banknote-purse:config");
  }
  #j(n = 1) {
    if (n < 1) throw new Error("No banknotes to dispense");
    const e = [20, 50, 100, 200, 500][this.__banknote_purse.recycler.banknote];
    return l.banknotePurseICTDispense({ quantity: n, denomination: e });
  }
  #O({ $_20: n = 0, $_50: e = 0, $_100: t = 0, $_200: s = 0, $_500: i = 0, $_1000: r = 0 } = {}) {
    return l.banknotePurseOtherDispense({
      $20: n,
      $50: e,
      $100: t,
      $200: s,
      $500: i,
      $1000: r
    });
  }
  async banknotePurseDispense({ $_20: n = 0, $_50: e = 0, $_100: t = 0, $_200: s = 0, $_500: i = 0, $_1000: r = 0 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    let a;
    if (this.#s()) {
      const o = [n, e, t, s, i];
      a = this.#j(o[this.__banknote_purse.recycler.banknote]);
    } else
      a = this.#O({ $_20: n, $_50: e, $_100: t, $_200: s, $_500: i, $_1000: r });
    await this.appendToQueue(a, "banknote-purse:dispense");
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
      l.banknotePurseAcceptInScrow(),
      "banknote-purse:banknote-scrow-status"
    );
  }
  async banknotePurseRejectInScrow() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    return await this.appendToQueue(
      l.banknotePurseRejectInScrow(),
      "banknote-purse:banknote-scrow-status"
    );
  }
  async banknotePurseSaveMemory({
    channel: n = null,
    $_20: e = null,
    $_50: t = null,
    $_100: s = null,
    $_200: i = null,
    $_500: r = null,
    $_1000: a = null
  } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    return await this.appendToQueue(
      l.banknotePurseSaveMemory({
        channel: n,
        $20: e,
        $50: t,
        $100: s,
        $200: i,
        $500: r,
        $1000: a
      }),
      "banknote-purse:save-memory"
    );
  }
  async banknotePurseReadRecycler() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    return await this.appendToQueue(l.banknotePurseReadRecycler(), "banknote-purse:read-recycler");
  }
  async cardReaderDisable() {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    return await this.appendToQueue(l.cardReaderDisable(), "card-reader:disable");
  }
  async cardReaderDispense({ channel: n = 1, second_channel: e = null, sensor: t = !0, seconds: s = null, price: i = 0 } = {}) {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    if ((isNaN(this.card_reader.max_pre_credit) || this.card_reader.max_pre_credit === 0) && (this.card_reader.max_pre_credit = i), isNaN(i) || i <= 0) throw new Error("Price must be greater than 0");
    if (i > this.card_reader.max_pre_credit) throw new Error("Price is greater than pre-credit configured");
    if (!t && (s === null || s <= 0 || s > 40))
      throw new Error("Invalid time to dispense without sensor, must be between 0.1 and 40.0 seconds");
    return this.appendToQueue(
      l.cardReaderDispense({
        selection: n,
        second_selection: e,
        sensor: t,
        seconds: s,
        price: i
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
    return await this.appendToQueue(l.coolingRelayConfigure({ enable: n }), "status:relay");
  }
  async coolingRelayEnable() {
    return await this.coolingRelayConfigure({ enable: !0 });
  }
  async coolingRelayDisable() {
    return await this.coolingRelayConfigure({ enable: !1 });
  }
  async readTemperature() {
    return await this.appendToQueue(l.readTemperature(), "status:temperature");
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
  async dispense({ selection: n = 1, second_selection: e = null, sensor: t = !0, seconds: s = null, retry: i = !0 } = {}) {
    if (n = parseInt(n), isNaN(n) || n < 1 || n > 80) throw new Error("Invalid channel number");
    if (e !== null && (e < 1 || e > 80 || e === n))
      throw new Error("Invalid second channel number");
    if (!t && (s === null || s <= 0 || s > 40))
      throw new Error("Invalid time to dispense without sensor, must be between 0.1 and 40.0 seconds");
    i && (this.__internal__.dispense.backup_dispense = {
      selection: n,
      second_selection: e,
      sensor: t,
      seconds: s
    });
    const r = l.dispense({
      selection: n,
      second_selection: e,
      sensor: t,
      seconds: s
    });
    t || (s || (s = 1.5), this.__internal__.dispense.custom_limit_counter = s + 0.2);
    let a = await this.internalDispense(r);
    return !a.status && i && (a = await this.internalDispense(r)), this.__internal__.dispense.custom_limit_counter = null, a;
  }
  #a() {
    this.#n = !1, this.#e = 0, this.#t = 0;
  }
  /**
   *
   * @param {null|object} dispensed
   * @param {number} limit
   */
  #i({ dispensed: n = null, limit: e = 80 } = {}) {
    this.#t = Math.round(this.#e * 100 / e), this.dispatch("percentage:test", { percentage: this.#t, dispensed: n });
  }
  async testEngines({ singleEngine: n = !1 } = {}) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    if (this.#n) throw new Error("Another test is running");
    this.#a(), this.#n = !0;
    const e = [];
    this.#i();
    for (let t = 1; t <= 80; t++) {
      const s = await this.dispense({
        selection: t,
        second_selection: n ? null : t + 1,
        sensor: !1,
        seconds: 0.4,
        retry: !1
      });
      e.push(s), this.#e = t, this.#i(), n || t++;
    }
    this.#e = 80, this.#i({ dispensed: e }), this.#a();
  }
  async sendCustomCode({ code: n = [] } = {}) {
    if (n.length === 0) throw new Error("Invalid code");
    return await this.appendToQueue(l.customCode(n), "custom");
  }
  #U(n) {
    const e = ["20", "50", "100", "200", "500"], t = this.__banknote_purse.recycler.banknote, s = "$_" + e[t], i = parseInt(e[t]), r = this.banknotes.recycler[`p${e[t]}`], a = Math.min(Math.floor(n / i), r), o = {
      banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
      pending: n,
      will_dispense: a > 0
    };
    return this.totalInRecycler === 0 || a < 1 || n === 0 || (o.banknotes[s] = a, o.pending = parseFloat((n - a * i).toFixed(2))), o;
  }
  #A(n) {
    const e = {
      banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
      pending: n,
      will_dispense: !1
    };
    if (this.totalInRecycler === 0 || n === 0) return e;
    const t = (s, i) => {
      if (this.banknotes.recycler[i] > 0) {
        const r = Math.floor(e.pending / s), a = Math.min(r, this.banknotes.recycler[i]);
        e.banknotes[`$_${s}`] = a, e.pending = parseFloat((e.pending - a * s).toFixed(2));
      }
    };
    return t(1e3, "p1000"), t(500, "p500"), t(200, "p200"), t(100, "p100"), t(50, "p50"), t(20, "p20"), e.will_dispense = Object.values(e.banknotes).some((s) => s > 0), e;
  }
  #o(n) {
    return this.hasRecycler ? this.#s() ? this.#U(n) : this.#A(n) : {
      banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
      pending: n,
      will_dispense: !1
    };
  }
  #l(n) {
    const e = {
      coins: { $_50c: 0, $_1: 0, $_2: 0, $_5: 0, $_10: 0 },
      pending: n,
      will_dispense: !1
    };
    if (!this.hasCoinPurse || n <= 0 || this.totalInTubes === 0) return e;
    const t = (s, i, r = null) => {
      if (this.coins.tubes[i] > 0) {
        r === null && (r = "$_" + s);
        const a = Math.floor(e.pending / s), o = Math.min(a, this.coins.tubes[i]);
        e.coins[r] = o, e.pending = parseFloat((e.pending - o * s).toFixed(2));
      }
    };
    return t(10, "p10"), t(5, "p5"), t(2, "p2"), t(1, "p1"), t(0.5, "g50", "$_50c"), e.will_dispense = Object.values(e.coins).some((s) => s > 0), e;
  }
  hasToReturnChange(n = 0) {
    let e = n;
    return e <= 0 ? !0 : (e = this.#o(e).pending, e = this.#l(e).pending, !(e > 0));
  }
  async #c(n = null) {
    if (!this.#d()) throw new Error("Change not available");
    let e = this.change, t = this.change;
    if (n !== null && (e = n, t = n), t <= 0) return !1;
    const s = this.#o(t);
    t = s.pending;
    const i = this.#l(t);
    return t = i.pending, t > 0 && this.dispatch("change:pending", { pending: t }), this.dispatch("change:dispense", {
      recycler: s.banknotes,
      coins: i.coins,
      pending: t,
      delivery: e - t
    }), t === e ? !1 : (s.will_dispense && await this.banknotePurseDispense(s.banknotes), i.will_dispense && await this.coinPurseDispense(i.coins), !0);
  }
  async returnChange() {
    return await this.#c();
  }
  async returnInsertedMoney() {
    return this.__money_session.inserted <= 0 ? !1 : await this.#c(this.__money_session.inserted);
  }
  async serialCorruptMessage(n, e) {
    this.dispatch("corrupt:message", { data: n, message: e });
  }
}
export {
  f as Boardroid
};
