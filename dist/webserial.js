var ua = Object.defineProperty;
var Vn = (r) => {
  throw TypeError(r);
};
var da = (r, n, t) => n in r ? ua(r, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[n] = t;
var J = (r, n, t) => da(r, typeof n != "symbol" ? n + "" : n, t), We = (r, n, t) => n.has(r) || Vn("Cannot " + t);
var R = (r, n, t) => (We(r, n, "read from private field"), t ? t.call(r) : n.get(r)), X = (r, n, t) => n.has(r) ? Vn("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(r) : n.set(r, t), F = (r, n, t, e) => (We(r, n, "write to private field"), e ? e.call(r, t) : n.set(r, t), t), o = (r, n, t) => (We(r, n, "access private method"), t);
const $ = [];
for (let r = 0; r < 256; ++r)
  $.push((r + 256).toString(16).slice(1));
function pa(r, n = 0) {
  return ($[r[n + 0]] + $[r[n + 1]] + $[r[n + 2]] + $[r[n + 3]] + "-" + $[r[n + 4]] + $[r[n + 5]] + "-" + $[r[n + 6]] + $[r[n + 7]] + "-" + $[r[n + 8]] + $[r[n + 9]] + "-" + $[r[n + 10]] + $[r[n + 11]] + $[r[n + 12]] + $[r[n + 13]] + $[r[n + 14]] + $[r[n + 15]]).toLowerCase();
}
let ze;
const fa = new Uint8Array(16);
function _a() {
  if (!ze) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    ze = crypto.getRandomValues.bind(crypto);
  }
  return ze(fa);
}
const ga = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), qn = { randomUUID: ga };
function ba(r, n, t) {
  var i;
  if (qn.randomUUID && !n && !r)
    return qn.randomUUID();
  r = r || {};
  const e = r.random ?? ((i = r.rng) == null ? void 0 : i.call(r)) ?? _a();
  if (e.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, pa(e);
}
class fi extends EventTarget {
  constructor() {
    super(...arguments);
    J(this, "__listeners__", {});
    J(this, "__debug__", !1);
  }
  dispatch(t, e = null) {
    const i = new jn(t, { detail: e });
    this.dispatchEvent(i), this.__debug__ && this.dispatchEvent(new jn("debug", { detail: { type: t, data: e } }));
  }
  dispatchAsync(t, e = null, i = 100) {
    const s = this;
    setTimeout(() => {
      s.dispatch(t, e);
    }, i);
  }
  on(t, e) {
    typeof this.__listeners__[t] < "u" && this.__listeners__[t] === !1 && (this.__listeners__[t] = !0), this.addEventListener(t, e);
  }
  off(t, e) {
    this.removeEventListener(t, e);
  }
  serialRegisterAvailableListener(t) {
    this.__listeners__[t] || (this.__listeners__[t] = !1);
  }
  get availableListeners() {
    return Object.keys(this.__listeners__).sort().map((e) => ({
      type: e,
      listening: this.__listeners__[e]
    }));
  }
}
class jn extends CustomEvent {
  constructor(n, t) {
    super(n, t);
  }
}
function ut(r = 100) {
  return new Promise((n) => setTimeout(() => n(), r));
}
function _i() {
  return "serial" in navigator;
}
function Hn() {
  return "geolocation" in navigator;
}
function ma() {
  return "crypto" in window;
}
function tn(r = 1) {
  return r * 1e3;
}
function Et(r) {
  return r == null || r === "";
}
var st, ct, d, gi, bi, T, en, M, N, _e, E, nn, $t;
const u = class u {
  static status(n = null) {
    var e, i;
    if (!o(e = u, d, T).call(e, n)) return !1;
    let t = [];
    switch (R(u, st)) {
      case "locker":
        t = ["0", "8"];
        break;
      case "boardroid":
        t = ["2", (5 + R(u, ct)).toString(16).toUpperCase()];
        break;
      case "jofemar":
        t = ["6"];
        break;
      default:
        return !1;
    }
    o(i = u, d, E).call(i, t);
  }
  static dispensed(n = null) {
    var e, i;
    if (!o(e = u, d, T).call(e, n)) return !1;
    let t = [];
    switch (R(u, st)) {
      case "locker":
        t = ["0", "7", "4", "4", "4"];
        break;
      case "boardroid":
        t = ["2", "D7", "A", "0", "0", "0", "0", "0", "0", "0", "0", "0", "F2"];
        break;
      case "jofemar":
        t = ["6", "30"];
        break;
      default:
        return !1;
    }
    o(i = u, d, E).call(i, t);
  }
  static notDispensed(n = null) {
    var e, i;
    if (!o(e = u, d, T).call(e, n)) return !1;
    let t = [];
    switch (R(u, st)) {
      case "locker":
        t = ["0", "7", "5", "5", "5"];
        break;
      case "boardroid":
        t = ["2", "D7", "A", "0", "0", "1", "0", "0", "0", "0", "0", "0", "F2"];
        break;
      case "jofemar":
        t = ["6", "34"];
        break;
      default:
        return !1;
    }
    o(i = u, d, E).call(i, t);
  }
  static gateInactive(n = null) {
    var t;
    if (!o(t = u, d, T).call(t, n) || !o(this, d, en).call(this)) return !1;
    o(this, d, E).call(this, ["0", "7", "5", "5", "5"]);
  }
  static gateConfigured(n = null) {
    var t;
    if (!o(t = u, d, T).call(t, n) || !o(this, d, en).call(this)) return !1;
    o(this, d, E).call(this, ["0", "6"]);
  }
  static keyPressed(n = null) {
    var s, a, c;
    if (!o(s = u, d, T).call(s, n) || !o(a = u, d, N).call(a)) return !1;
    const t = ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "2A", "23", "41", "42", "43", "44"], e = (128 + R(u, ct)).toString(16), i = Math.floor(Math.random() * 15);
    o(c = u, d, E).call(c, ["2", e, "54", t[i]]);
  }
  static doorOpened(n = null) {
    var i, s;
    if (!o(i = u, d, T).call(i, n) || !o(this, d, _e).call(this)) return !1;
    let t = [];
    const e = (128 + R(u, ct)).toString(16);
    switch (R(u, st)) {
      case "boardroid":
        t = ["2", "D8", "dc"];
        break;
      case "jofemar":
        t = ["2", e, "50", "4F"];
        break;
    }
    o(s = u, d, E).call(s, t);
  }
  static doorClosed(n = null) {
    var i, s;
    if (!o(i = u, d, T).call(i, n) || !o(this, d, _e).call(this)) return !1;
    let t = [];
    const e = (128 + R(u, ct)).toString(16);
    switch (R(u, st)) {
      case "boardroid":
        t = ["2", "D8", "db"];
        break;
      case "jofemar":
        t = ["2", e, "50", "43"];
        break;
    }
    o(s = u, d, E).call(s, t);
  }
  static channelDisconnected(n = null) {
    var e, i, s;
    if (!o(e = u, d, T).call(e, n) || !o(i = u, d, N).call(i)) return !1;
    const t = (128 + R(u, ct)).toString(16);
    o(s = u, d, E).call(s, ["2", t, "43", "43", "43", "FD"]);
  }
  static channelConnected(n = null) {
    var e, i, s;
    if (!o(e = u, d, T).call(e, n) || !o(i = u, d, N).call(i)) return !1;
    const t = (128 + R(u, ct)).toString(16);
    o(s = u, d, E).call(s, ["2", t, "43", "43", "43", "FC"]);
  }
  static channelEmpty(n = null) {
    var e, i, s;
    if (!o(e = u, d, T).call(e, n) || !o(i = u, d, N).call(i)) return !1;
    const t = (128 + R(u, ct)).toString(16);
    o(s = u, d, E).call(s, ["2", t, "43", "43", "43", "FF"]);
  }
  static workingTemperature(n = null) {
    var e, i, s;
    if (!o(e = u, d, T).call(e, n) || !o(i = u, d, N).call(i)) return !1;
    const t = (128 + R(u, ct)).toString(16);
    o(s = u, d, E).call(s, ["2", t, "43", "54", "16"]);
  }
  static currentTemperature(n = null) {
    var i, s, a;
    if (!o(i = u, d, T).call(i, n) || !o(s = u, d, _e).call(s)) return !1;
    let t = [];
    const e = (128 + R(u, ct)).toString(16);
    switch (R(u, st)) {
      case "boardroid":
        t = ["2", "D9", "44", "30"];
        break;
      case "jofemar":
        t = ["2", e, "43", "74", "2B", "30", "39", "2E", "31", "7F", "43"];
        break;
    }
    o(a = u, d, E).call(a, t);
  }
  static ready(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "30"]);
  }
  static busy(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "31"]);
  }
  static invalidTray(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "32"]);
  }
  static invalidChannel(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "33"]);
  }
  static emptyChannel(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "34"]);
  }
  static elevatorJam(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "35"]);
  }
  static elevatorMalfunction(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "36"]);
  }
  static phototransistorFailure(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "37"]);
  }
  static allChannelsEmpty(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "38"]);
  }
  static productDetectorFailure(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "39"]);
  }
  static displayDisconnected(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "41"]);
  }
  static productUnderElevator(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "42"]);
  }
  static elevatorSettingAlarm(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "43"]);
  }
  static buttonPanelFailure(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "44"]);
  }
  static errorWritingEeprom(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "45"]);
  }
  static errorControlTemperature(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "46"]);
  }
  static thermometerDisconnected(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "47"]);
  }
  static thermometerMisconfigured(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "48"]);
  }
  static thermometerFailure(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "49"]);
  }
  static errorExtractorConsumption(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "4A"]);
  }
  static channelSearchError(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "4B"]);
  }
  static productExitMouthSearchError(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "4C"]);
  }
  static elevatorInteriorLocked(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "4D"]);
  }
  static productDetectorVerifierError(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "4E"]);
  }
  static waitingForProductRecall(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "4F"]);
  }
  static productExpiredByTemperature(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "50"]);
  }
  static faultyAutomaticDoor(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "51"]);
  }
  static rejectLever(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "A0", "1"]);
  }
  static resetCoinPurse(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "A0", "2"]);
  }
  static coinInsertedBox(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, T).call(s, n) || !o(a = u, d, M).call(a)) return !1;
    const e = ["40", "41", "42", "43", "44", "45"], i = o(c = u, d, nn).call(c, e, t);
    o(l = u, d, E).call(l, ["2", "A0", i]);
  }
  static coinInsertedTube(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, T).call(s, n) || !o(a = u, d, M).call(a)) return !1;
    const e = ["50", "51", "52", "53", "54", "55"], i = o(c = u, d, nn).call(c, e, t);
    o(l = u, d, E).call(l, ["2", "A0", i]);
  }
  static banknoteInsertedStacker(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, T).call(s, n) || !o(a = u, d, M).call(a)) return !1;
    const e = ["80", "81", "82", "83", "84"], i = o(c = u, d, $t).call(c, e, t);
    o(l = u, d, E).call(l, ["2", "B0", i]);
  }
  static banknoteInsertedEscrow(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, T).call(s, n) || !o(a = u, d, M).call(a)) return !1;
    const e = ["90", "91", "92", "93", "94"], i = o(c = u, d, $t).call(c, e, t);
    o(l = u, d, E).call(l, ["2", "B0", i]);
  }
  static banknoteEjected(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, T).call(s, n) || !o(a = u, d, M).call(a)) return !1;
    const e = ["A0", "A1", "A2", "A3", "A4"], i = o(c = u, d, $t).call(c, e, t);
    o(l = u, d, E).call(l, ["2", "B0", i]);
  }
  static banknoteInsertedRecycler(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, T).call(s, n) || !o(a = u, d, M).call(a)) return !1;
    const e = ["B0", "B1", "B2", "B3", "B4"], i = o(c = u, d, $t).call(c, e, t);
    o(l = u, d, E).call(l, ["2", "B0", i]);
  }
  static banknoteTaken(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "B0", "2a"]);
  }
  static coinPurseEnabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "D0", "1"]);
  }
  static coinPurseDisabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "D0", "0"]);
  }
  static billPurseDisabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "D1", "0", "0"]);
  }
  static billPurseEnabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "D1", "1", "1"]);
  }
  static readTubes(n = null) {
    var h, p, _;
    if (!o(h = u, d, T).call(h, n) || !o(p = u, d, M).call(p)) return !1;
    const t = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "1a",
      "1b",
      "1c",
      "1d",
      "1e",
      "1f"
    ], [e, i, s, a, c, l] = [
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)]
    ];
    o(_ = u, d, E).call(_, ["2", "D2", e, i, s, a, c, l]);
  }
  static readBillPurse(n = null, t = null) {
    var i, s, a, c;
    if (!o(i = u, d, T).call(i, n) || !o(s = u, d, M).call(s)) return !1;
    let e = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "1a",
      "1b",
      "1c"
    ];
    if (n._recycler.ict) {
      const l = e[Math.floor(Math.random() * 31)];
      let h = "0", p = "0", _ = "0", m = "0", P = "0";
      if (t !== null && !isNaN(parseInt(t)))
        switch (t.toString()) {
          case "20":
            h = l;
            break;
          case "50":
            p = l;
            break;
          case "100":
            _ = l;
            break;
          case "200":
            m = l;
            break;
          case "500":
            P = l;
            break;
        }
      else
        switch (n._recycler.bill) {
          case 0:
            h = l;
            break;
          case 1:
            p = l;
            break;
          case 2:
            _ = l;
            break;
          case 3:
            m = l;
            break;
          case 4:
            P = l;
            break;
        }
      o(a = u, d, E).call(a, ["2", "D3", h, p, _, m, P, "0"]);
    } else {
      const [l, h, p, _, m, P] = [
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 2)],
        e[Math.floor(Math.random())],
        e[Math.floor(Math.random())]
      ];
      o(c = u, d, E).call(c, ["2", "D3", l, h, p, _, m, P]);
    }
  }
  static banknoteAccepted(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "D4", "1"]);
  }
  static banknoteRejected(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "D4", "0"]);
  }
  static banknotesDispensed(n = null) {
    var e, i, s, a;
    if (!o(e = u, d, T).call(e, n) || !o(i = u, d, M).call(i)) return !1;
    let t = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "1a",
      "1b",
      "1c"
    ];
    if (n._recycler.ict) {
      const c = t[Math.floor(Math.random() * 30)];
      let l = "0", h = "0", p = "0", _ = "0", m = "0";
      switch (n._recycler.bill) {
        case 0:
          l = c;
          break;
        case 1:
          h = c;
          break;
        case 2:
          p = c;
          break;
        case 3:
          _ = c;
          break;
        case 4:
          m = c;
          break;
      }
      o(s = u, d, E).call(s, ["2", "D5", l, h, p, _, m, "0"]);
    } else {
      const [c, l, h, p, _, m] = [
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 2)],
        t[Math.floor(Math.random())],
        t[Math.floor(Math.random())]
      ];
      o(a = u, d, E).call(a, ["2", "D5", c, l, h, p, _, m]);
    }
  }
  static coinsDispensed(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "D6"]);
  }
  static relayOn(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DA", "1"]);
  }
  static relayOff(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DA", "0"]);
  }
  static nayaxEnabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DD", "1"]);
  }
  static nayaxDisabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DD", "0"]);
  }
  static nayaxPreCreditAuthorized(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DD", "3"]);
  }
  static nayaxCancelRequest(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DD", "4"]);
  }
  static nayaxSellApproved(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DD", "5"]);
  }
  static nayaxSellDenied(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DD", "6"]);
  }
  static nayaxEndSession(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DD", "7"]);
  }
  static nayaxCancelled(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DD", "8"]);
  }
  static nayaxDispensed(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DD", "A", "0"]);
  }
  static nayaxNotDispensed(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, M).call(e)) return !1;
    o(i = u, d, E).call(i, ["2", "DD", "A", "1"]);
  }
  static fullTray(n = null) {
    var t, e, i;
    if (!o(t = u, d, T).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, E).call(i, ["6", "4F"]);
  }
  static setConnection(n = null) {
    var t;
    if (!o(t = u, d, T).call(t, n)) return !1;
    n.__internal__.serial.connected = !0;
  }
};
st = new WeakMap(), ct = new WeakMap(), d = new WeakSet(), gi = function() {
  if (u.enable === !1) throw new Error("Emulator is disabled");
  return u.enable;
}, bi = function(n) {
  if (typeof n != "object" || !(n instanceof Ft))
    throw new Error(`Type ${n.typeDevice} is not supported`);
  return u.instance = n, F(u, st, n.typeDevice), F(u, ct, n.deviceNumber), !0;
}, T = function(n = null) {
  var t, e;
  return !o(t = u, d, gi).call(t) || n === null && u.instance === null ? !1 : (u.instance === null && o(e = u, d, bi).call(e, n), !0);
}, en = function() {
  if (R(u, st) !== "locker") throw new Error("This function is only available for Locker devices");
  return !0;
}, M = function() {
  if (R(u, st) !== "boardroid")
    throw new Error("This function is only available for Boardroid devices");
  return !0;
}, N = function() {
  if (R(u, st) !== "jofemar") throw new Error("This function is only available for Jofemar devices");
  return !0;
}, _e = function() {
  if (R(u, st) === "locker") throw new Error("This function is not available for Locker devices");
  return !0;
}, E = function(n) {
  u.instance.__emulate({ code: n });
}, nn = function(n, t = null) {
  let e = n[Math.floor(Math.random() * 5)];
  if (t !== null && !isNaN(parseFloat(t)))
    switch (t.toString()) {
      case "0.5":
        e = n[1];
        break;
      case "1":
        e = n[2];
        break;
      case "2":
        e = n[3];
        break;
      case "5":
        e = n[4];
        break;
      case "10":
        e = n[5];
        break;
    }
  return e;
}, $t = function(n, t = null) {
  let e = n[Math.floor(Math.random() * 4)];
  if (t !== null && !isNaN(parseFloat(t)))
    switch (t.toString()) {
      case "20":
        e = n[0];
        break;
      case "50":
        e = n[1];
        break;
      case "100":
        e = n[2];
        break;
      case "200":
        e = n[3];
        break;
      case "500":
        e = n[4];
        break;
    }
  return e;
}, X(u, d), J(u, "enable", !1), J(u, "instance", null), X(u, st, null), X(u, ct, 1);
let Ie = u;
const O = class O extends fi {
  static typeError(n) {
    const t = new Error();
    throw t.message = `Type ${n} is not supported`, t.name = "DeviceTypeError", t;
  }
  static addCustom(n, t) {
    typeof O.devices[n] > "u" && (O.devices[n] = []), O.add(t);
  }
  static add(n) {
    const t = n.typeDevice, e = n.uuid;
    if (typeof O.devices[t] > "u") return O.typeError(t);
    if (this.instance.dispatch("change", O.devices), !O.devices[t][e])
      return O.devices[t][e] = n, this.instance.dispatch("change", O.devices), O.devices[t].indexOf(n);
  }
  static get(n, t) {
    return typeof O.devices[n] > "u" ? O.typeError(n) : O.devices[n][t];
  }
  static getJofemarByUuid(n) {
    return O.get("jofemar", n);
  }
  static getLockerByUuid(n) {
    return O.get("locker", n);
  }
  static getRelayByUuid(n) {
    return O.get("relay", n);
  }
  static getBoardroidByUuid(n) {
    return O.get("boardroid", n);
  }
  static getArduinoByUuid(n) {
    return O.get("arduino", n);
  }
  static getPinPadByUuid(n) {
    return O.get("pinpad", n);
  }
  static getAll(n = null) {
    return n === null ? O.devices : typeof O.devices[n] > "u" ? O.typeError(n) : O.devices[n];
  }
  static getList() {
    return Object.values(O.devices).map((t) => Object.values(t)).flat();
  }
  static getJofemar(n = 1) {
    return Object.values(O.devices.jofemar).find((e) => e.deviceNumber === n) ?? null;
  }
  static getBoardroid(n = 1) {
    return Object.values(O.devices.boardroid).find((e) => e.deviceNumber === n) ?? null;
  }
  static getLocker(n = 1) {
    return Object.values(O.devices.locker).find((e) => e.deviceNumber === n) ?? null;
  }
  static getRelay(n = 1) {
    return Object.values(O.devices.relay).find((e) => e.deviceNumber === n) ?? null;
  }
  static getArduino(n = 1) {
    return Object.values(O.devices.arduino).find((e) => e.deviceNumber === n) ?? null;
  }
  static getPinPad(n = 1) {
    return Object.values(O.devices.pinpad).find((e) => e.deviceNumber === n) ?? null;
  }
  static getCustom(n, t = 1) {
    return typeof O.devices[n] > "u" ? O.typeError(n) : Object.values(O.devices[n]).find((i) => i.deviceNumber === t) ?? null;
  }
};
J(O, "instance", null), J(O, "devices", {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: [],
  arduino: [],
  pinpad: []
});
let j = O;
j.instance || (j.instance = new j());
var I, mi, rn, At, yi, wi, vi, Pi, Ei, Ti, Ci, Si, ki, xi, Ai, Di;
class Ft extends fi {
  /**
   *
   * @param {null|array} filters
   * @param {null|object} config_port
   * @param {number} no_device
   * @param {null|number|string} device_listen_on_port
   */
  constructor({ filters: t = null, config_port: e = null, no_device: i = 1, device_listen_on_port: s = 1 } = {}) {
    super();
    X(this, I);
    J(this, "__internal__", {
      device_number: 1,
      aux_port_connector: 0,
      last_error: { message: null, action: null, code: null, no_code: 0 },
      serial: {
        connected: !1,
        port: null,
        last_action: null,
        response: {
          length: null,
          buffer: new Uint8Array([])
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
        id: ba(),
        listen_on_port: null,
        door_open: !1
      },
      time: {
        response_connection: 500,
        response_general: 2e3,
        response_engines: 2e3,
        sense: 100
      },
      timeout: {
        until_response: 0
      },
      interval: {
        reconnection: 0,
        waiting_sense: 0
      },
      dispense: {
        must_response: !1,
        dispensing: !1,
        status: null,
        counter: 0,
        limit_counter: 20,
        custom_limit_counter: null,
        backup_dispense: {}
      }
    });
    if (!("serial" in navigator))
      throw new Error("Web Serial not supported");
    t && (this.serialFilters = t), e && (this.serialConfigPort = e), i && o(this, I, Ai).call(this, i), s && (typeof s == "number" || typeof s == "string") && (this.listenOnPort = s), o(this, I, Ci).call(this), o(this, I, Si).call(this);
  }
  set listenOnPort(t) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 255) throw new Error("Invalid port number");
    this.__internal__.device.listen_on_port = t, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(t);
  }
  get isDoorOpen() {
    return this.__internal__.device.door_open;
  }
  get lastAction() {
    return this.__internal__.serial.last_action;
  }
  get listenOnPort() {
    return this.__internal__.device.listen_on_port ?? 1;
  }
  set serialFilters(t) {
    this.__internal__.serial.filters = t;
  }
  get serialFilters() {
    return this.__internal__.serial.filters;
  }
  set serialConfigPort(t) {
    this.__internal__.serial.config_port = t;
  }
  get serialConfigPort() {
    return this.__internal__.serial.config_port;
  }
  get isConnected() {
    return this.__internal__.serial.connected;
  }
  get isDisconnected() {
    return !this.__internal__.serial.connected;
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
  get isDispensing() {
    return this.__internal__.interval.waiting_sense || this.__internal__.dispense.dispensing;
  }
  async timeout(t, e) {
    this.__internal__.last_error.message = "Operation response timed out.", this.__internal__.last_error.action = e, this.__internal__.last_error.code = t, this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), e === "connect" ? (this.__internal__.serial.connected = !1, this.dispatch("serial:reconnect", {})) : e === "connection:start" ? (await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector += 1, await this.serialConnect()) : e === "dispense" && (this.__internal__.dispense.status = "no-response"), this.dispatch("serial:timeout", {
      ...this.__internal__.last_error,
      bytes: t,
      action: e
    });
  }
  async disconnect(t = null) {
    await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector = 0, this.dispatch("serial:disconnected", t), j.instance.dispatch("change");
  }
  async connect() {
    return new Promise((t, e) => {
      _i() || e("Web Serial not supported"), setTimeout(async () => {
        await ut(499), await this.serialConnect(), this.isConnected ? t(`${this.typeDevice} device ${this.deviceNumber} connected`) : e(`${this.typeDevice} device ${this.deviceNumber} not connected`);
      }, 1);
    });
  }
  async serialDisconnect() {
    try {
      const t = this.__internal__.serial.reader, e = this.__internal__.serial.output_stream;
      t && (await t.cancel().catch((s) => this.serialErrors(s)), await this.__internal__.serial.input_done), e && (await e.getWriter().close(), await this.__internal__.serial.output_done), this.__internal__.serial.connected && this.__internal__.serial && await this.__internal__.serial.port.close();
    } catch (t) {
      this.serialErrors(t);
    } finally {
      this.__internal__.serial.reader = null, this.__internal__.serial.input_done = null, this.__internal__.serial.output_stream = null, this.__internal__.serial.output_done = null, this.__internal__.serial.connected = !1, this.__internal__.serial.port = null;
    }
  }
  async serialPortsSaved(t) {
    const e = this.serialFilters;
    if (this.__internal__.aux_port_connector < t.length) {
      const i = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = t[i];
    } else
      this.__internal__.aux_port_connector = 0, this.__internal__.serial.port = await navigator.serial.requestPort({ filters: e });
    if (!this.__internal__.serial.port)
      throw new Error("Select another port please");
  }
  serialErrors(t) {
    const e = t.toString().toLowerCase();
    switch (!0) {
      case e.includes("must be handling a user gesture to show a permission request"):
      case e.includes("the port is closed."):
      case e.includes("select another port please"):
      case e.includes("no port selected by the user"):
      case e.includes(
        "this readable stream reader has been released and cannot be used to cancel its previous owner stream"
      ):
        this.dispatch("serial:need-permission", {}), j.instance.dispatch("change");
        break;
      case e.includes("the port is already open."):
      case e.includes("failed to open serial port"):
        this.serialDisconnect().then(async () => {
          this.__internal__.aux_port_connector += 1, await this.serialConnect();
        });
        break;
      case e.includes("cannot read properties of undefined (reading 'writable')"):
      case e.includes("cannot read properties of null (reading 'writable')"):
      case e.includes("cannot read property 'writable' of null"):
      case e.includes("cannot read property 'writable' of undefined"):
        this.serialDisconnect().then(async () => {
          await this.serialConnect();
        });
        break;
      case e.includes("'close' on 'serialport': a call to close() is already in progress."):
        break;
      case e.includes("failed to execute 'open' on 'serialport': a call to open() is already in progress."):
        break;
      case e.includes("the port is already closed."):
        break;
      case e.includes("the device has been lost"):
        this.dispatch("serial:lost", {}), j.instance.dispatch("change");
        break;
      case e.includes("navigator.serial is undefined"):
        this.dispatch("serial:unsupported", {});
        break;
      default:
        console.error(t);
        break;
    }
    this.dispatch("serial:error", t);
  }
  async serialConnect() {
    try {
      this.dispatch("serial:connecting", {});
      const t = await o(this, I, yi).call(this);
      if (t.length > 0)
        await this.serialPortsSaved(t);
      else {
        const s = this.serialFilters;
        this.__internal__.serial.port = await navigator.serial.requestPort({ filters: s });
      }
      const e = this.__internal__.serial.port;
      await e.open(this.serialConfigPort);
      const i = this;
      e.onconnect = (s) => {
        i.dispatch("serial:connected", s.detail), j.instance.dispatch("change"), i.__internal__.serial.queue.length > 0 && i.dispatch("internal:queue", {});
      }, e.ondisconnect = async (s) => {
        await i.disconnect(s.detail ?? null);
      }, await ut(this.__internal__.serial.delay_first_connection), this.__internal__.timeout.until_response = setTimeout(async () => {
        await i.timeout(i.__internal__.serial.bytes_connection, "connection:start");
      }, this.__internal__.time.response_connection), this.__internal__.serial.last_action = "connect", await o(this, I, rn).call(this, this.__internal__.serial.bytes_connection), this.dispatch("serial:sent", {
        action: "connect",
        bytes: this.__internal__.serial.bytes_connection
      }), this.typeDevice === "relay" && o(this, I, At).call(this, ["DD", "DD"], null), await o(this, I, Ei).call(this);
    } catch (t) {
      this.serialErrors(t);
    }
  }
  async serialForget() {
    return await o(this, I, Ti).call(this);
  }
  decToHex(t) {
    return parseInt(t, 10).toString(16);
  }
  hexToDec(t) {
    return parseInt(t, 16);
  }
  hexMaker(t = "00", e = 2) {
    return t.toString().padStart(e, "0").toLowerCase();
  }
  add0x(t) {
    let e = [];
    return t.forEach((i, s) => {
      e[s] = "0x" + i;
    }), e;
  }
  bytesToHex(t) {
    return this.add0x(Array.from(t, (e) => this.hexMaker(e)));
  }
  async appendToQueue(t, e) {
    const i = this.bytesToHex(t);
    if (["connect", "connection:start"].includes(e)) {
      if (this.__internal__.serial.connected) return;
      await this.serialConnect();
      return;
    }
    this.__internal__.serial.queue.push({ bytes: i, action: e }), this.dispatch("internal:queue", {});
  }
  /**
   * @param {number} listen_on_port
   * @returns {never|array}
   */
  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(t = 1) {
    throw new Error("Method not implemented");
  }
  /**
   * @param {any} code
   * @returns {never|void}
   */
  // eslint-disable-next-line no-unused-vars
  serialMessage(t) {
    throw new Error("Method not implemented");
  }
  /**
   * @param {any} code
   * @param {any} data
   * @returns {never|void}
   */
  // eslint-disable-next-line no-unused-vars
  serialCorruptMessage(t, e) {
    throw new Error("Method not implemented");
  }
  clearSerialQueue() {
    this.__internal__.serial.queue = [];
  }
  sumHex(t) {
    let e = 0;
    return t.forEach((i) => {
      e += parseInt(i, 16);
    }), e.toString(16);
  }
  internalClearSensing() {
    this.__internal__.interval.waiting_sense && clearInterval(this.__internal__.interval.waiting_sense), this.__internal__.interval.waiting_sense = 0, this.__internal__.dispense.status = null, this.__internal__.dispense.counter = 0, this.__internal__.dispense.dispensing = !1;
  }
  internalDispensingProcess() {
    let t = this.__internal__.dispense.limit_counter;
    return this.__internal__.dispense.custom_limit_counter && (t = this.__internal__.dispense.custom_limit_counter), t += Math.ceil(t * 0.6), this.__internal__.dispense.counter >= t ? (this.internalClearSensing(), this.__internal__.dispense.status = !1, this.__internal__.dispense.dispensing = !1, !1) : (this.__internal__.dispense.counter = parseFloat((0.1 + this.__internal__.dispense.counter).toFixed(1)), this.__internal__.dispense.counter % 1 === 0 && this.dispatch("dispensing", {
      status: this.__internal__.dispense.status,
      counter: this.__internal__.dispense.counter,
      limit: t
    }), null);
  }
  async internalDispenseStatus() {
    if (this.__internal__.dispense.must_response && (await ut(this.__internal__.time.response_engines + 10), this.__internal__.dispense.status === "no-response"))
      return this.internalClearSensing(), this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", { reason: "no-response" }), { status: !1, error: "no-response" };
    this.__internal__.dispense.status = null, this.__internal__.dispense.dispensing = !0, this.dispatch("internal:dispense:running", {});
    const t = this;
    return new Promise((e) => {
      this.__internal__.interval.waiting_sense = setInterval(() => {
        switch (t.__internal__.dispense.status) {
          case null:
            t.internalDispensingProcess() === !1 && (t.internalClearSensing(), t.dispatch("not-dispensed", { reason: "timeout" }), e({ status: !1, error: "timeout" }));
            break;
          case !0:
            t.internalClearSensing(), t.__internal__.dispense.status = !0, t.dispatch("dispensed", {}), e({ status: !0, error: null });
            break;
          case !1:
            t.internalClearSensing(), t.__internal__.dispense.status = !1, t.dispatch("not-dispensed", { reason: "no-stock" }), e({ status: !1, error: null });
            break;
          case "elevator-locked":
            t.internalClearSensing(), t.__internal__.dispense.status = !1, t.dispatch("not-dispensed", { reason: "elevator-locked" }), e({ status: !1, error: "elevator-locked" });
            break;
          case "no-response":
            t.internalClearSensing(), t.__internal__.dispense.status = !1, t.dispatch("not-dispensed", { reason: "no-response" }), e({ status: !1, error: "no-response" });
            break;
        }
      }, this.__internal__.time.sense);
    });
  }
  async internalDispense(t) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    if (!Ie.enable && !this.__internal__.serial.connected && (await this.serialConnect(), !this.__internal__.serial.connected))
      throw new Error("Serial device not connected");
    return this.__internal__.serial.queue.length === 0 ? (await this.appendToQueue(t, "dispense"), await this.internalDispenseStatus()) : new Promise((e) => {
      const i = setInterval(async () => {
        if (this.__internal__.serial.queue.length > 0) return;
        clearInterval(i), await this.appendToQueue(t, "dispense");
        const s = await this.internalDispenseStatus();
        e(s);
      }, 100);
    });
  }
  __emulate(t) {
    if (typeof t.code != "object") {
      console.error("Invalid data to make an emulation");
      return;
    }
    this.__internal__.serial.connected || (this.__internal__.serial.connected = !0, this.dispatch("serial:connected"), j.instance.dispatch("change"), this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0)), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0);
    const e = [];
    for (const i in t.code)
      e.push(t.code[i].toString().padStart(2, "0").toLowerCase());
    this.serialMessage(e);
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
    o(this, I, Di).call(this), this.dispatch("serial:soft-reload", {});
  }
  async sendConnect() {
    await this.appendToQueue(this.__internal__.serial.bytes_connection, "connect");
  }
  async sendCustomCode({ code: t = [] } = {}) {
    await this.appendToQueue(t, "custom");
  }
  stringToArrayBuffer(t, e = `
`) {
    return this.parseStringToTextEncoder(t, e).buffer;
  }
  parseStringToTextEncoder(t = "", e = `
`) {
    const i = new TextEncoder();
    return t += e, i.encode(t);
  }
  parseStringToBytes(t = "", e = `
`) {
    const i = this.parseStringToTextEncoder(t, e);
    return Array.from(i).map((s) => s.toString(16));
  }
  parseUint8ToHex(t) {
    return Array.from(t).map((e) => e.toString(16));
  }
  parseHexToUint8(t) {
    return new Uint8Array(t.map((e) => parseInt(e, 16)));
  }
  parseUint8ArrayToString(t) {
    t = new Uint8Array(t), t = this.parseUint8ToHex(t);
    const e = t.map((i) => parseInt(i, 16));
    return String.fromCharCode(...e).replace(/[\n\r]+/g, "");
  }
  hexToAscii(t) {
    let e = t.toString(), i = "";
    for (let s = 0; s < e.length; s += 2)
      i += String.fromCharCode(parseInt(e.substring(s, 2), 16));
    return i;
  }
  asciiToHex(t) {
    const e = [];
    for (let i = 0, s = t.length; i < s; i++) {
      const a = Number(t.charCodeAt(i)).toString(16);
      e.push(a);
    }
    return e.join("");
  }
}
I = new WeakSet(), mi = function(t) {
  return !!(t.readable && t.writable);
}, rn = async function(t) {
  const e = this.__internal__.serial.port;
  if (!e) {
    if (Ie.enable)
      return;
    throw new Error("The port is closed.");
  }
  const i = new Uint8Array(t), s = e.writable.getWriter();
  await s.write(i), s.releaseLock();
}, // #bytesToLowerCase(code = []) {
//     return code.map((item) => item.toString().toLowerCase());
// }
At = function(t = [], e = null) {
  if (t && t.length > 0) {
    this.__internal__.serial.connected || (this.dispatch("serial:connected"), j.instance.dispatch("change")), this.__internal__.serial.connected = !0, this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0);
    const i = [];
    for (const s in t)
      i.push(t[s].toString().padStart(2, "0").toLowerCase());
    this.serialMessage(i);
  } else
    this.serialCorruptMessage(t, e);
  this.__internal__.serial.queue.length !== 0 && this.dispatch("internal:queue", {});
}, yi = async function() {
  const t = this.serialFilters, e = await navigator.serial.getPorts({ filters: t });
  return t.length === 0 ? e : e.filter((s) => {
    const a = s.getInfo();
    return t.some((c) => a.usbProductId === c.usbProductId && a.usbVendorId === c.usbVendorId);
  }).filter((s) => !o(this, I, mi).call(this, s));
}, wi = function(t) {
  if (t) {
    const e = this.__internal__.serial.response.buffer;
    let i = new Uint8Array(e.length + t.byteLength);
    i.set(e, 0), i.set(new Uint8Array(t), e.length), this.__internal__.serial.response.buffer = i;
  }
}, vi = async function() {
  this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0), this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
    let t = [];
    for (const e in this.__internal__.serial.response.buffer)
      t.push(this.__internal__.serial.response.buffer[e].toString(16));
    this.__internal__.serial.response.buffer && o(this, I, At).call(this, t), this.__internal__.serial.response.buffer = new Uint8Array(0);
  }, 400);
}, Pi = async function() {
  if (this.__internal__.serial.response.length === this.__internal__.serial.response.buffer.length) {
    const t = [];
    for (const e in this.__internal__.serial.response.buffer)
      t.push(this.__internal__.serial.response.buffer[e].toString(16));
    await o(this, I, At).call(this, t), this.__internal__.serial.response.buffer = new Uint8Array(0);
  } else if (this.__internal__.serial.response.length < this.__internal__.serial.response.buffer.length) {
    let t = [];
    for (let i = 0; i < this.__internal__.serial.response.length; i++)
      t[i] = this.__internal__.serial.response.buffer[i];
    if (t.length === this.__internal__.serial.response.length) {
      const i = [];
      for (const s in t)
        i.push(t[s].toString(16));
      await o(this, I, At).call(this, i), this.__internal__.serial.response.buffer = new Uint8Array(0);
      return;
    }
    t = [];
    const e = this.__internal__.serial.response.length * 2;
    if (this.__internal__.serial.response.buffer.length === e) {
      for (let i = 14; i < e; i++)
        t[i - this.__internal__.serial.response.length] = this.__internal__.serial.response.buffer[i];
      if (t.length === this.__internal__.serial.response.length) {
        const i = [];
        for (const s in t)
          i.push(t[s].toString(16));
        await o(this, I, At).call(this, i), this.__internal__.serial.response.buffer = new Uint8Array(0);
      }
    }
  }
}, Ei = async function() {
  const t = this.__internal__.serial.port;
  for (; t.readable && this.__internal__.serial.keep_reading; ) {
    const e = t.readable.getReader();
    this.__internal__.serial.reader = e;
    try {
      let i = !0;
      for (; i; ) {
        const { value: s, done: a } = await e.read();
        if (a) {
          e.releaseLock(), this.__internal__.serial.keep_reading = !1, i = !1;
          break;
        }
        o(this, I, wi).call(this, s), this.__internal__.serial.response.length === null ? await o(this, I, vi).call(this) : await o(this, I, Pi).call(this);
      }
    } catch (i) {
      this.serialErrors(i);
    } finally {
      e.releaseLock();
    }
  }
  this.__internal__.serial.keep_reading = !0, await this.__internal__.serial.port.close();
}, Ti = async function() {
  return typeof window > "u" ? !1 : "serial" in navigator && "forget" in window.SerialPort.prototype ? (await this.__internal__.serial.port.forget(), !0) : !1;
}, Ci = function() {
  [
    "serial:connected",
    "serial:connecting",
    "serial:reconnect",
    "serial:timeout",
    "serial:disconnected",
    "serial:sent",
    "serial:soft-reload",
    "serial:message",
    "dispensed",
    "not-dispensed",
    "dispensing",
    "unknown",
    "serial:need-permission",
    "serial:lost",
    "serial:unsupported",
    "serial:error",
    "debug"
  ].forEach((e) => {
    this.serialRegisterAvailableListener(e);
  });
}, Si = function() {
  const t = this;
  this.on("internal:queue", async () => {
    var e;
    await o(e = t, I, xi).call(e);
  }), o(this, I, ki).call(this);
}, ki = function() {
  const t = this;
  navigator.serial.addEventListener("connect", async () => {
    t.isDisconnected && await t.serialConnect().catch(() => {
    });
  });
}, xi = async function() {
  if (!this.__internal__.serial.connected) {
    await this.serialConnect();
    return;
  }
  if (this.__internal__.timeout.until_response || this.__internal__.serial.queue.length === 0) return;
  const t = this.__internal__.serial.queue[0];
  let e = this.__internal__.time.response_general;
  t.action === "connect" ? e = this.__internal__.time.response_connection : t.action === "dispense" && (e = this.__internal__.time.response_engines), this.__internal__.timeout.until_response = setTimeout(async () => {
    await this.timeout(t.bytes, t.action);
  }, e), this.__internal__.serial.last_action = t.action ?? "unknown", await o(this, I, rn).call(this, t.bytes), this.dispatch("serial:sent", {
    action: t.action,
    bytes: t.bytes
  }), this.typeDevice === "relay" && o(this, I, At).call(this, ["DD", "DD"], null);
  const i = [...this.__internal__.serial.queue];
  this.__internal__.serial.queue = i.splice(1);
}, Ai = function(t = 1) {
  this.__internal__.device_number = t, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(t);
}, Di = function() {
  this.__internal__.last_error = { message: null, action: null, code: null, no_code: 0 };
};
var se, Me, Ri;
class wc extends Ft {
  constructor({ filters: t = null, config_port: e = null, no_device: i = 1 } = {}) {
    super({ filters: t, config_port: e, no_device: i });
    X(this, Me);
    X(this, se, {
      activate: ["A0", "01", "01", "A2"],
      deactivate: ["A0", "01", "00", "A1"]
    });
    if (this.__internal__.device.type = "relay", j.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    o(this, Me, Ri).call(this);
  }
  serialMessage(t) {
    const e = {
      code: t,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    switch (t[1].toString()) {
      case "dd":
        e.name = "Connection with the serial device completed.", e.description = "Your connection with the serial device was successfully completed.", e.request = "connect", e.no_code = 100;
        break;
      case "de":
        break;
      default:
        e.name = "Unrecognized response", e.description = "The response of application was received, but dont identify with any of current parameters", e.request = "undefined", e.no_code = 400;
        break;
    }
    this.dispatch("serial:message", e);
  }
  serialRelaySumHex(t) {
    let e = 0;
    return t.forEach((i, s) => {
      s !== 3 && (e += parseInt(i, 16));
    }), e.toString(16).toUpperCase();
  }
  serialSetConnectionConstant(t = 1) {
    const e = ["A0", "01", "00", "A1"];
    return e[1] = this.hexMaker(this.decToHex(t.toString())), e[3] = this.serialRelaySumHex(e), this.add0x(e);
  }
  async turnOn() {
    const t = R(this, se).activate;
    t[3] = this.serialRelaySumHex(t), await this.appendToQueue(t, "relay:turn-on");
  }
  async turnOff() {
    const t = R(this, se).deactivate;
    t[3] = this.serialRelaySumHex(t), await this.appendToQueue(t, "relay:turn-off");
  }
  async toggle({ inverse: t = !1, ms: e = 300 } = {}) {
    const i = this;
    t ? (await i.turnOff(), await ut(e), await i.turnOn()) : (await i.turnOn(), await ut(e), await i.turnOff());
  }
}
se = new WeakMap(), Me = new WeakSet(), Ri = function() {
  j.add(this);
};
var Y, z, Pt, D, Ii, Oi, Bi, Ni, sn, Mi, Dt, Rt, ge, be, me;
class vc extends Ft {
  constructor({ filters: t = null, config_port: e = null, no_device: i = 1, device_listen_on_port: s = 3 } = {}) {
    super({ filters: t, config_port: e, no_device: i, device_listen_on_port: s });
    X(this, D);
    X(this, Y, !1);
    X(this, z, 0);
    X(this, Pt, 0);
    if (this.__internal__.device.type = "locker", j.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.device.milliseconds = 666, this.__internal__.dispense.limit_counter = 1, o(this, D, Oi).call(this), o(this, D, Ii).call(this);
  }
  serialMessage(t) {
    const e = {
      code: t,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    switch (t[1]) {
      case "08":
        e.name = "Connection with the serial device completed.", e.description = "Your connection with the serial device was successfully completed.", e.request = "connect", e.no_code = 100;
        break;
      case "07":
        switch (t[4]) {
          case "00":
            e.name = "Cell closed.", e.description = "The selected cell is closed.", e.request = "dispense", e.no_code = 1102, this.__internal__.dispense.status = !1, this.dispatch("dispensed", {}), R(this, Y) && R(this, z) >= 89 ? (e.finished_test = !0, F(this, Y, !1), F(this, z, 0)) : R(this, Y) && (e.finished_test = !1);
            break;
          case "01":
          // cell open by status
          case "04":
            e.name = "Cell open.", e.description = "The selected cell was open successfully.", e.request = "dispense", e.no_code = 102, this.__internal__.dispense.status = !0, this.dispatch("dispensed", {}), R(this, Y) && R(this, z) >= 89 ? (e.finished_test = !0, F(this, Y, !1), F(this, z, 0)) : R(this, Y) && (e.finished_test = !1);
            break;
          case "05":
            e.name = "Cell inactive.", e.description = "The selected cell is inactive or doesn't exist.", e.request = "dispense", e.no_code = 101, this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", {}), R(this, Y) && R(this, z) >= 89 ? (e.finished_test = !0, F(this, Y, !1), F(this, z, 0)) : R(this, Y) && (e.finished_test = !1);
            break;
        }
        break;
      case "06":
        e.name = "Configuration applied.", e.description = "The configuration was successfully applied.", e.request = "configure cell", e.no_code = 103;
        break;
      default:
        e.request = "undefined", e.name = "Response unrecognized", e.description = "The response of application was received, but dont identify with any of current parameters", e.no_code = 400;
        break;
    }
    this.dispatch("serial:message", e);
  }
  serialSetConnectionConstant(t = 3) {
    return this.add0x(this.serialLockerGetConnectionCmd(t));
  }
  serialLockerCmdMaker(t) {
    const e = this.__internal__.device.milliseconds;
    let i = null;
    try {
      i = new Uint8Array(t.length + 8), i.set(t, 2), i[0] = 2, i[1] = t.length + 4, i[i.length - 2] = 3;
      let s = 0;
      for (let l = 1; l < t.length; l++)
        s += t[l], s *= parseInt(Math.pow(2, l - 1).toString());
      i[t.length + 2] = s % 256, i[t.length + 3] = e * 3 % 256, i[t.length + 4] = e * 8 % 256;
      let a = 0;
      for (let l = 3; l < t.length + 5; l++)
        a += i[l];
      i[t.length + 5] = a % 256;
      let c = 0;
      for (let l = 0; l < i.length - 1; l++)
        c ^= i[l];
      i[i.length - 1] = c;
    } catch (s) {
      this.serialErrors(`Error generating command: ${s.message}`), i = null;
    }
    return i;
  }
  serialLockerHexCmd(t) {
    const e = this.serialLockerCmdMaker(t), i = [];
    for (let s = 0; s < e.length; s++)
      i.push(this.decToHex(e[s]));
    return i;
  }
  serialLockerGetConnectionCmd(t = 3) {
    if (t < 1 || t > 255) throw new Error("Invalid port number");
    return this.serialLockerHexCmd(new Uint8Array([0, t]));
  }
  parseCellToColumnRow(t) {
    const e = Math.floor((t - 1) / 10) + 1;
    let i = t % 8;
    return i === 0 && (i = 8), [e, i];
  }
  async dispense({ cell: t = 1 } = {}) {
    t = o(this, D, Dt).call(this, t);
    const e = o(this, D, Mi).call(this, t);
    return await this.internalDispense(e);
  }
  async status({ cell: t = 1 } = {}) {
    t = o(this, D, Dt).call(this, t);
    const e = o(this, D, Bi).call(this, t);
    return await this.appendToQueue(e, "status");
  }
  async lightScan({ since: t = 0, until: e = 10 } = {}) {
    if (t < 0 || t > 10) throw new Error("Invalid since number");
    if (e < 0 || e > 10) throw new Error("Invalid until number");
    const i = o(this, D, Ni).call(this, t, e);
    return await this.appendToQueue(i, "light-scan");
  }
  async enable({ cell: t = 1 } = {}) {
    t = o(this, D, Dt).call(this, t);
    const [e, i] = this.parseCellToColumnRow(t), s = o(this, D, sn).call(this, { enable: !0, column: e, row: i });
    await this.appendToQueue(s, "activate");
  }
  async disable({ cell: t = 1 } = {}) {
    t = o(this, D, Dt).call(this, t);
    const [e, i] = this.parseCellToColumnRow(t), s = o(this, D, sn).call(this, { enable: !1, column: e, row: i });
    await this.appendToQueue(s, "disable");
  }
  async openAll() {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    o(this, D, Rt).call(this), F(this, Y, !0), o(this, D, ge).call(this);
    const t = [];
    for (let e = 1; e <= 90; e++) {
      const i = await this.dispense(e);
      t.push(i), F(this, z, e), o(this, D, ge).call(this);
    }
    F(this, z, 90), o(this, D, ge).call(this, t), o(this, D, Rt).call(this);
  }
  async enableAll() {
    o(this, D, Rt).call(this), F(this, Y, !0), o(this, D, be).call(this);
    for (let t = 1; t <= 90; t++)
      await this.enable(t), F(this, z, t), o(this, D, be).call(this);
    F(this, z, 90), o(this, D, be).call(this), o(this, D, Rt).call(this);
  }
  async disableAll() {
    o(this, D, Rt).call(this), F(this, Y, !0), o(this, D, me).call(this);
    for (let t = 1; t <= 90; t++)
      await this.enable(t), F(this, z, t), o(this, D, me).call(this);
    F(this, z, 90), o(this, D, me).call(this), o(this, D, Rt).call(this);
  }
}
Y = new WeakMap(), z = new WeakMap(), Pt = new WeakMap(), D = new WeakSet(), Ii = function() {
  const t = ["percentage:disable", "percentage:enable", "percentage:open"];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, Oi = function() {
  j.add(this);
}, Bi = function(t = 1) {
  return t = o(this, D, Dt).call(this, t), this.serialLockerHexCmd(new Uint8Array([16, this.__internal__.device.listen_on_port, t]));
}, Ni = function(t = 0, e = 10) {
  return this.serialLockerHexCmd(new Uint8Array([32, this.__internal__.device.listen_on_port, t, e]));
}, sn = function({ enable: t = !0, column: e = 0, row: i = 10 } = {}) {
  if (e < 0 || e > 8) throw new Error("Invalid column number");
  if (i < 0 || i > 10) throw new Error("Invalid row number");
  let s = 1;
  return t || (s = 0), this.serialLockerHexCmd(new Uint8Array([48, this.__internal__.device.listen_on_port, e, i, s]));
}, Mi = function(t = 1) {
  t = o(this, D, Dt).call(this, t);
  const e = this.__internal__.device.milliseconds, i = e % 256, s = Math.floor(e / 3) % 256;
  return this.serialLockerHexCmd(
    new Uint8Array([64, this.__internal__.device.listen_on_port, t, i, s])
  );
}, Dt = function(t) {
  const e = parseInt(t);
  if (isNaN(e) || e < 1 || e > 90) throw new Error("Invalid cell number");
  return e;
}, Rt = function() {
  F(this, Y, !1), F(this, z, 0), F(this, Pt, 0);
}, ge = function(t = null) {
  F(this, Pt, Math.round(R(this, z) * 100 / 90)), this.dispatch("percentage:open", { percentage: R(this, Pt), dispensed: t });
}, be = function() {
  F(this, Pt, Math.round(R(this, z) * 100 / 90)), this.dispatch("percentage:enable", { percentage: R(this, Pt) });
}, me = function() {
  F(this, Pt, Math.round(R(this, z) * 100 / 90)), this.dispatch("percentage:disable", { percentage: R(this, Pt) });
};
var ya = "0123456789abcdefghijklmnopqrstuvwxyz";
function Tt(r) {
  return ya.charAt(r);
}
function wa(r, n) {
  return r & n;
}
function le(r, n) {
  return r | n;
}
function Kn(r, n) {
  return r ^ n;
}
function Wn(r, n) {
  return r & ~n;
}
function va(r) {
  if (r == 0)
    return -1;
  var n = 0;
  return r & 65535 || (r >>= 16, n += 16), r & 255 || (r >>= 8, n += 8), r & 15 || (r >>= 4, n += 4), r & 3 || (r >>= 2, n += 2), r & 1 || ++n, n;
}
function Pa(r) {
  for (var n = 0; r != 0; )
    r &= r - 1, ++n;
  return n;
}
var Vt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Fi = "=";
function Oe(r) {
  var n, t, e = "";
  for (n = 0; n + 3 <= r.length; n += 3)
    t = parseInt(r.substring(n, n + 3), 16), e += Vt.charAt(t >> 6) + Vt.charAt(t & 63);
  for (n + 1 == r.length ? (t = parseInt(r.substring(n, n + 1), 16), e += Vt.charAt(t << 2)) : n + 2 == r.length && (t = parseInt(r.substring(n, n + 2), 16), e += Vt.charAt(t >> 2) + Vt.charAt((t & 3) << 4)); (e.length & 3) > 0; )
    e += Fi;
  return e;
}
function zn(r) {
  var n = "", t, e = 0, i = 0;
  for (t = 0; t < r.length && r.charAt(t) != Fi; ++t) {
    var s = Vt.indexOf(r.charAt(t));
    s < 0 || (e == 0 ? (n += Tt(s >> 2), i = s & 3, e = 1) : e == 1 ? (n += Tt(i << 2 | s >> 4), i = s & 15, e = 2) : e == 2 ? (n += Tt(i), n += Tt(s >> 2), i = s & 3, e = 3) : (n += Tt(i << 2 | s >> 4), n += Tt(s & 15), e = 0));
  }
  return e == 1 && (n += Tt(i << 2)), n;
}
var Ut, Ea = {
  decode: function(r) {
    var n;
    if (Ut === void 0) {
      var t = "0123456789ABCDEF", e = ` \f
\r	 \u2028\u2029`;
      for (Ut = {}, n = 0; n < 16; ++n)
        Ut[t.charAt(n)] = n;
      for (t = t.toLowerCase(), n = 10; n < 16; ++n)
        Ut[t.charAt(n)] = n;
      for (n = 0; n < e.length; ++n)
        Ut[e.charAt(n)] = -1;
    }
    var i = [], s = 0, a = 0;
    for (n = 0; n < r.length; ++n) {
      var c = r.charAt(n);
      if (c == "=")
        break;
      if (c = Ut[c], c != -1) {
        if (c === void 0)
          throw new Error("Illegal character at offset " + n);
        s |= c, ++a >= 2 ? (i[i.length] = s, s = 0, a = 0) : s <<= 4;
      }
    }
    if (a)
      throw new Error("Hex encoding incomplete: 4 bits missing");
    return i;
  }
}, xt, an = {
  decode: function(r) {
    var n;
    if (xt === void 0) {
      var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = `= \f
\r	 \u2028\u2029`;
      for (xt = /* @__PURE__ */ Object.create(null), n = 0; n < 64; ++n)
        xt[t.charAt(n)] = n;
      for (xt["-"] = 62, xt._ = 63, n = 0; n < e.length; ++n)
        xt[e.charAt(n)] = -1;
    }
    var i = [], s = 0, a = 0;
    for (n = 0; n < r.length; ++n) {
      var c = r.charAt(n);
      if (c == "=")
        break;
      if (c = xt[c], c != -1) {
        if (c === void 0)
          throw new Error("Illegal character at offset " + n);
        s |= c, ++a >= 4 ? (i[i.length] = s >> 16, i[i.length] = s >> 8 & 255, i[i.length] = s & 255, s = 0, a = 0) : s <<= 6;
      }
    }
    switch (a) {
      case 1:
        throw new Error("Base64 encoding incomplete: at least 2 bits missing");
      case 2:
        i[i.length] = s >> 10;
        break;
      case 3:
        i[i.length] = s >> 16, i[i.length] = s >> 8 & 255;
        break;
    }
    return i;
  },
  re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
  unarmor: function(r) {
    var n = an.re.exec(r);
    if (n)
      if (n[1])
        r = n[1];
      else if (n[2])
        r = n[2];
      else
        throw new Error("RegExp out of sync");
    return an.decode(r);
  }
}, Lt = 1e13, Qt = (
  /** @class */
  function() {
    function r(n) {
      this.buf = [+n || 0];
    }
    return r.prototype.mulAdd = function(n, t) {
      var e = this.buf, i = e.length, s, a;
      for (s = 0; s < i; ++s)
        a = e[s] * n + t, a < Lt ? t = 0 : (t = 0 | a / Lt, a -= t * Lt), e[s] = a;
      t > 0 && (e[s] = t);
    }, r.prototype.sub = function(n) {
      var t = this.buf, e = t.length, i, s;
      for (i = 0; i < e; ++i)
        s = t[i] - n, s < 0 ? (s += Lt, n = 1) : n = 0, t[i] = s;
      for (; t[t.length - 1] === 0; )
        t.pop();
    }, r.prototype.toString = function(n) {
      if ((n || 10) != 10)
        throw new Error("only base 10 is supported");
      for (var t = this.buf, e = t[t.length - 1].toString(), i = t.length - 2; i >= 0; --i)
        e += (Lt + t[i]).toString().substring(1);
      return e;
    }, r.prototype.valueOf = function() {
      for (var n = this.buf, t = 0, e = n.length - 1; e >= 0; --e)
        t = t * Lt + n[e];
      return t;
    }, r.prototype.simplify = function() {
      var n = this.buf;
      return n.length == 1 ? n[0] : this;
    }, r;
  }()
), Ui = "…", Ta = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, Ca = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function jt(r, n) {
  return r.length > n && (r = r.substring(0, n) + Ui), r;
}
var Xe = (
  /** @class */
  function() {
    function r(n, t) {
      this.hexDigits = "0123456789ABCDEF", n instanceof r ? (this.enc = n.enc, this.pos = n.pos) : (this.enc = n, this.pos = t);
    }
    return r.prototype.get = function(n) {
      if (n === void 0 && (n = this.pos++), n >= this.enc.length)
        throw new Error("Requesting byte offset ".concat(n, " on a stream of length ").concat(this.enc.length));
      return typeof this.enc == "string" ? this.enc.charCodeAt(n) : this.enc[n];
    }, r.prototype.hexByte = function(n) {
      return this.hexDigits.charAt(n >> 4 & 15) + this.hexDigits.charAt(n & 15);
    }, r.prototype.hexDump = function(n, t, e) {
      for (var i = "", s = n; s < t; ++s)
        if (i += this.hexByte(this.get(s)), e !== !0)
          switch (s & 15) {
            case 7:
              i += "  ";
              break;
            case 15:
              i += `
`;
              break;
            default:
              i += " ";
          }
      return i;
    }, r.prototype.isASCII = function(n, t) {
      for (var e = n; e < t; ++e) {
        var i = this.get(e);
        if (i < 32 || i > 176)
          return !1;
      }
      return !0;
    }, r.prototype.parseStringISO = function(n, t) {
      for (var e = "", i = n; i < t; ++i)
        e += String.fromCharCode(this.get(i));
      return e;
    }, r.prototype.parseStringUTF = function(n, t) {
      for (var e = "", i = n; i < t; ) {
        var s = this.get(i++);
        s < 128 ? e += String.fromCharCode(s) : s > 191 && s < 224 ? e += String.fromCharCode((s & 31) << 6 | this.get(i++) & 63) : e += String.fromCharCode((s & 15) << 12 | (this.get(i++) & 63) << 6 | this.get(i++) & 63);
      }
      return e;
    }, r.prototype.parseStringBMP = function(n, t) {
      for (var e = "", i, s, a = n; a < t; )
        i = this.get(a++), s = this.get(a++), e += String.fromCharCode(i << 8 | s);
      return e;
    }, r.prototype.parseTime = function(n, t, e) {
      var i = this.parseStringISO(n, t), s = (e ? Ta : Ca).exec(i);
      return s ? (e && (s[1] = +s[1], s[1] += +s[1] < 70 ? 2e3 : 1900), i = s[1] + "-" + s[2] + "-" + s[3] + " " + s[4], s[5] && (i += ":" + s[5], s[6] && (i += ":" + s[6], s[7] && (i += "." + s[7]))), s[8] && (i += " UTC", s[8] != "Z" && (i += s[8], s[9] && (i += ":" + s[9]))), i) : "Unrecognized time: " + i;
    }, r.prototype.parseInteger = function(n, t) {
      for (var e = this.get(n), i = e > 127, s = i ? 255 : 0, a, c = ""; e == s && ++n < t; )
        e = this.get(n);
      if (a = t - n, a === 0)
        return i ? -1 : 0;
      if (a > 4) {
        for (c = e, a <<= 3; !((+c ^ s) & 128); )
          c = +c << 1, --a;
        c = "(" + a + ` bit)
`;
      }
      i && (e = e - 256);
      for (var l = new Qt(e), h = n + 1; h < t; ++h)
        l.mulAdd(256, this.get(h));
      return c + l.toString();
    }, r.prototype.parseBitString = function(n, t, e) {
      for (var i = this.get(n), s = (t - n - 1 << 3) - i, a = "(" + s + ` bit)
`, c = "", l = n + 1; l < t; ++l) {
        for (var h = this.get(l), p = l == t - 1 ? i : 0, _ = 7; _ >= p; --_)
          c += h >> _ & 1 ? "1" : "0";
        if (c.length > e)
          return a + jt(c, e);
      }
      return a + c;
    }, r.prototype.parseOctetString = function(n, t, e) {
      if (this.isASCII(n, t))
        return jt(this.parseStringISO(n, t), e);
      var i = t - n, s = "(" + i + ` byte)
`;
      e /= 2, i > e && (t = n + e);
      for (var a = n; a < t; ++a)
        s += this.hexByte(this.get(a));
      return i > e && (s += Ui), s;
    }, r.prototype.parseOID = function(n, t, e) {
      for (var i = "", s = new Qt(), a = 0, c = n; c < t; ++c) {
        var l = this.get(c);
        if (s.mulAdd(128, l & 127), a += 7, !(l & 128)) {
          if (i === "")
            if (s = s.simplify(), s instanceof Qt)
              s.sub(80), i = "2." + s.toString();
            else {
              var h = s < 80 ? s < 40 ? 0 : 1 : 2;
              i = h + "." + (s - h * 40);
            }
          else
            i += "." + s.toString();
          if (i.length > e)
            return jt(i, e);
          s = new Qt(), a = 0;
        }
      }
      return a > 0 && (i += ".incomplete"), i;
    }, r;
  }()
), Sa = (
  /** @class */
  function() {
    function r(n, t, e, i, s) {
      if (!(i instanceof Xn))
        throw new Error("Invalid tag value.");
      this.stream = n, this.header = t, this.length = e, this.tag = i, this.sub = s;
    }
    return r.prototype.typeName = function() {
      switch (this.tag.tagClass) {
        case 0:
          switch (this.tag.tagNumber) {
            case 0:
              return "EOC";
            case 1:
              return "BOOLEAN";
            case 2:
              return "INTEGER";
            case 3:
              return "BIT_STRING";
            case 4:
              return "OCTET_STRING";
            case 5:
              return "NULL";
            case 6:
              return "OBJECT_IDENTIFIER";
            case 7:
              return "ObjectDescriptor";
            case 8:
              return "EXTERNAL";
            case 9:
              return "REAL";
            case 10:
              return "ENUMERATED";
            case 11:
              return "EMBEDDED_PDV";
            case 12:
              return "UTF8String";
            case 16:
              return "SEQUENCE";
            case 17:
              return "SET";
            case 18:
              return "NumericString";
            case 19:
              return "PrintableString";
            // ASCII subset
            case 20:
              return "TeletexString";
            // aka T61String
            case 21:
              return "VideotexString";
            case 22:
              return "IA5String";
            // ASCII
            case 23:
              return "UTCTime";
            case 24:
              return "GeneralizedTime";
            case 25:
              return "GraphicString";
            case 26:
              return "VisibleString";
            // ASCII subset
            case 27:
              return "GeneralString";
            case 28:
              return "UniversalString";
            case 30:
              return "BMPString";
          }
          return "Universal_" + this.tag.tagNumber.toString();
        case 1:
          return "Application_" + this.tag.tagNumber.toString();
        case 2:
          return "[" + this.tag.tagNumber.toString() + "]";
        // Context
        case 3:
          return "Private_" + this.tag.tagNumber.toString();
      }
    }, r.prototype.content = function(n) {
      if (this.tag === void 0)
        return null;
      n === void 0 && (n = 1 / 0);
      var t = this.posContent(), e = Math.abs(this.length);
      if (!this.tag.isUniversal())
        return this.sub !== null ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + e, n);
      switch (this.tag.tagNumber) {
        case 1:
          return this.stream.get(t) === 0 ? "false" : "true";
        case 2:
          return this.stream.parseInteger(t, t + e);
        case 3:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(t, t + e, n);
        case 4:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + e, n);
        // case 0x05: // NULL
        case 6:
          return this.stream.parseOID(t, t + e, n);
        // case 0x07: // ObjectDescriptor
        // case 0x08: // EXTERNAL
        // case 0x09: // REAL
        // case 0x0A: // ENUMERATED
        // case 0x0B: // EMBEDDED_PDV
        case 16:
        // SEQUENCE
        case 17:
          return this.sub !== null ? "(" + this.sub.length + " elem)" : "(no elem)";
        case 12:
          return jt(this.stream.parseStringUTF(t, t + e), n);
        case 18:
        // NumericString
        case 19:
        // PrintableString
        case 20:
        // TeletexString
        case 21:
        // VideotexString
        case 22:
        // IA5String
        // case 0x19: // GraphicString
        case 26:
          return jt(this.stream.parseStringISO(t, t + e), n);
        case 30:
          return jt(this.stream.parseStringBMP(t, t + e), n);
        case 23:
        // UTCTime
        case 24:
          return this.stream.parseTime(t, t + e, this.tag.tagNumber == 23);
      }
      return null;
    }, r.prototype.toString = function() {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
    }, r.prototype.toPrettyString = function(n) {
      n === void 0 && (n = "");
      var t = n + this.typeName() + " @" + this.stream.pos;
      if (this.length >= 0 && (t += "+"), t += this.length, this.tag.tagConstructed ? t += " (constructed)" : this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null && (t += " (encapsulates)"), t += `
`, this.sub !== null) {
        n += "  ";
        for (var e = 0, i = this.sub.length; e < i; ++e)
          t += this.sub[e].toPrettyString(n);
      }
      return t;
    }, r.prototype.posStart = function() {
      return this.stream.pos;
    }, r.prototype.posContent = function() {
      return this.stream.pos + this.header;
    }, r.prototype.posEnd = function() {
      return this.stream.pos + this.header + Math.abs(this.length);
    }, r.prototype.toHexString = function() {
      return this.stream.hexDump(this.posStart(), this.posEnd(), !0);
    }, r.decodeLength = function(n) {
      var t = n.get(), e = t & 127;
      if (e == t)
        return e;
      if (e > 6)
        throw new Error("Length over 48 bits not supported at position " + (n.pos - 1));
      if (e === 0)
        return null;
      t = 0;
      for (var i = 0; i < e; ++i)
        t = t * 256 + n.get();
      return t;
    }, r.prototype.getHexStringValue = function() {
      var n = this.toHexString(), t = this.header * 2, e = this.length * 2;
      return n.substr(t, e);
    }, r.decode = function(n) {
      var t;
      n instanceof Xe ? t = n : t = new Xe(n, 0);
      var e = new Xe(t), i = new Xn(t), s = r.decodeLength(t), a = t.pos, c = a - e.pos, l = null, h = function() {
        var _ = [];
        if (s !== null) {
          for (var m = a + s; t.pos < m; )
            _[_.length] = r.decode(t);
          if (t.pos != m)
            throw new Error("Content size is not correct for container starting at offset " + a);
        } else
          try {
            for (; ; ) {
              var P = r.decode(t);
              if (P.tag.isEOC())
                break;
              _[_.length] = P;
            }
            s = a - t.pos;
          } catch (v) {
            throw new Error("Exception while decoding undefined length content: " + v);
          }
        return _;
      };
      if (i.tagConstructed)
        l = h();
      else if (i.isUniversal() && (i.tagNumber == 3 || i.tagNumber == 4))
        try {
          if (i.tagNumber == 3 && t.get() != 0)
            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
          l = h();
          for (var p = 0; p < l.length; ++p)
            if (l[p].tag.isEOC())
              throw new Error("EOC is not supposed to be actual content.");
        } catch {
          l = null;
        }
      if (l === null) {
        if (s === null)
          throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);
        t.pos = a + Math.abs(s);
      }
      return new r(e, c, s, i, l);
    }, r;
  }()
), Xn = (
  /** @class */
  function() {
    function r(n) {
      var t = n.get();
      if (this.tagClass = t >> 6, this.tagConstructed = (t & 32) !== 0, this.tagNumber = t & 31, this.tagNumber == 31) {
        var e = new Qt();
        do
          t = n.get(), e.mulAdd(128, t & 127);
        while (t & 128);
        this.tagNumber = e.simplify();
      }
    }
    return r.prototype.isUniversal = function() {
      return this.tagClass === 0;
    }, r.prototype.isEOC = function() {
      return this.tagClass === 0 && this.tagNumber === 0;
    }, r;
  }()
), kt, ka = 244837814094590, Gn = (ka & 16777215) == 15715070, et = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], xa = (1 << 26) / et[et.length - 1], A = (
  /** @class */
  function() {
    function r(n, t, e) {
      n != null && (typeof n == "number" ? this.fromNumber(n, t, e) : t == null && typeof n != "string" ? this.fromString(n, 256) : this.fromString(n, t));
    }
    return r.prototype.toString = function(n) {
      if (this.s < 0)
        return "-" + this.negate().toString(n);
      var t;
      if (n == 16)
        t = 4;
      else if (n == 8)
        t = 3;
      else if (n == 2)
        t = 1;
      else if (n == 32)
        t = 5;
      else if (n == 4)
        t = 2;
      else
        return this.toRadix(n);
      var e = (1 << t) - 1, i, s = !1, a = "", c = this.t, l = this.DB - c * this.DB % t;
      if (c-- > 0)
        for (l < this.DB && (i = this[c] >> l) > 0 && (s = !0, a = Tt(i)); c >= 0; )
          l < t ? (i = (this[c] & (1 << l) - 1) << t - l, i |= this[--c] >> (l += this.DB - t)) : (i = this[c] >> (l -= t) & e, l <= 0 && (l += this.DB, --c)), i > 0 && (s = !0), s && (a += Tt(i));
      return s ? a : "0";
    }, r.prototype.negate = function() {
      var n = B();
      return r.ZERO.subTo(this, n), n;
    }, r.prototype.abs = function() {
      return this.s < 0 ? this.negate() : this;
    }, r.prototype.compareTo = function(n) {
      var t = this.s - n.s;
      if (t != 0)
        return t;
      var e = this.t;
      if (t = e - n.t, t != 0)
        return this.s < 0 ? -t : t;
      for (; --e >= 0; )
        if ((t = this[e] - n[e]) != 0)
          return t;
      return 0;
    }, r.prototype.bitLength = function() {
      return this.t <= 0 ? 0 : this.DB * (this.t - 1) + he(this[this.t - 1] ^ this.s & this.DM);
    }, r.prototype.mod = function(n) {
      var t = B();
      return this.abs().divRemTo(n, null, t), this.s < 0 && t.compareTo(r.ZERO) > 0 && n.subTo(t, t), t;
    }, r.prototype.modPowInt = function(n, t) {
      var e;
      return n < 256 || t.isEven() ? e = new Jn(t) : e = new $n(t), this.exp(n, e);
    }, r.prototype.clone = function() {
      var n = B();
      return this.copyTo(n), n;
    }, r.prototype.intValue = function() {
      if (this.s < 0) {
        if (this.t == 1)
          return this[0] - this.DV;
        if (this.t == 0)
          return -1;
      } else {
        if (this.t == 1)
          return this[0];
        if (this.t == 0)
          return 0;
      }
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    }, r.prototype.byteValue = function() {
      return this.t == 0 ? this.s : this[0] << 24 >> 24;
    }, r.prototype.shortValue = function() {
      return this.t == 0 ? this.s : this[0] << 16 >> 16;
    }, r.prototype.signum = function() {
      return this.s < 0 ? -1 : this.t <= 0 || this.t == 1 && this[0] <= 0 ? 0 : 1;
    }, r.prototype.toByteArray = function() {
      var n = this.t, t = [];
      t[0] = this.s;
      var e = this.DB - n * this.DB % 8, i, s = 0;
      if (n-- > 0)
        for (e < this.DB && (i = this[n] >> e) != (this.s & this.DM) >> e && (t[s++] = i | this.s << this.DB - e); n >= 0; )
          e < 8 ? (i = (this[n] & (1 << e) - 1) << 8 - e, i |= this[--n] >> (e += this.DB - 8)) : (i = this[n] >> (e -= 8) & 255, e <= 0 && (e += this.DB, --n)), i & 128 && (i |= -256), s == 0 && (this.s & 128) != (i & 128) && ++s, (s > 0 || i != this.s) && (t[s++] = i);
      return t;
    }, r.prototype.equals = function(n) {
      return this.compareTo(n) == 0;
    }, r.prototype.min = function(n) {
      return this.compareTo(n) < 0 ? this : n;
    }, r.prototype.max = function(n) {
      return this.compareTo(n) > 0 ? this : n;
    }, r.prototype.and = function(n) {
      var t = B();
      return this.bitwiseTo(n, wa, t), t;
    }, r.prototype.or = function(n) {
      var t = B();
      return this.bitwiseTo(n, le, t), t;
    }, r.prototype.xor = function(n) {
      var t = B();
      return this.bitwiseTo(n, Kn, t), t;
    }, r.prototype.andNot = function(n) {
      var t = B();
      return this.bitwiseTo(n, Wn, t), t;
    }, r.prototype.not = function() {
      for (var n = B(), t = 0; t < this.t; ++t)
        n[t] = this.DM & ~this[t];
      return n.t = this.t, n.s = ~this.s, n;
    }, r.prototype.shiftLeft = function(n) {
      var t = B();
      return n < 0 ? this.rShiftTo(-n, t) : this.lShiftTo(n, t), t;
    }, r.prototype.shiftRight = function(n) {
      var t = B();
      return n < 0 ? this.lShiftTo(-n, t) : this.rShiftTo(n, t), t;
    }, r.prototype.getLowestSetBit = function() {
      for (var n = 0; n < this.t; ++n)
        if (this[n] != 0)
          return n * this.DB + va(this[n]);
      return this.s < 0 ? this.t * this.DB : -1;
    }, r.prototype.bitCount = function() {
      for (var n = 0, t = this.s & this.DM, e = 0; e < this.t; ++e)
        n += Pa(this[e] ^ t);
      return n;
    }, r.prototype.testBit = function(n) {
      var t = Math.floor(n / this.DB);
      return t >= this.t ? this.s != 0 : (this[t] & 1 << n % this.DB) != 0;
    }, r.prototype.setBit = function(n) {
      return this.changeBit(n, le);
    }, r.prototype.clearBit = function(n) {
      return this.changeBit(n, Wn);
    }, r.prototype.flipBit = function(n) {
      return this.changeBit(n, Kn);
    }, r.prototype.add = function(n) {
      var t = B();
      return this.addTo(n, t), t;
    }, r.prototype.subtract = function(n) {
      var t = B();
      return this.subTo(n, t), t;
    }, r.prototype.multiply = function(n) {
      var t = B();
      return this.multiplyTo(n, t), t;
    }, r.prototype.divide = function(n) {
      var t = B();
      return this.divRemTo(n, t, null), t;
    }, r.prototype.remainder = function(n) {
      var t = B();
      return this.divRemTo(n, null, t), t;
    }, r.prototype.divideAndRemainder = function(n) {
      var t = B(), e = B();
      return this.divRemTo(n, t, e), [t, e];
    }, r.prototype.modPow = function(n, t) {
      var e = n.bitLength(), i, s = Ct(1), a;
      if (e <= 0)
        return s;
      e < 18 ? i = 1 : e < 48 ? i = 3 : e < 144 ? i = 4 : e < 768 ? i = 5 : i = 6, e < 8 ? a = new Jn(t) : t.isEven() ? a = new Da(t) : a = new $n(t);
      var c = [], l = 3, h = i - 1, p = (1 << i) - 1;
      if (c[1] = a.convert(this), i > 1) {
        var _ = B();
        for (a.sqrTo(c[1], _); l <= p; )
          c[l] = B(), a.mulTo(_, c[l - 2], c[l]), l += 2;
      }
      var m = n.t - 1, P, v = !0, S = B(), C;
      for (e = he(n[m]) - 1; m >= 0; ) {
        for (e >= h ? P = n[m] >> e - h & p : (P = (n[m] & (1 << e + 1) - 1) << h - e, m > 0 && (P |= n[m - 1] >> this.DB + e - h)), l = i; !(P & 1); )
          P >>= 1, --l;
        if ((e -= l) < 0 && (e += this.DB, --m), v)
          c[P].copyTo(s), v = !1;
        else {
          for (; l > 1; )
            a.sqrTo(s, S), a.sqrTo(S, s), l -= 2;
          l > 0 ? a.sqrTo(s, S) : (C = s, s = S, S = C), a.mulTo(S, c[P], s);
        }
        for (; m >= 0 && !(n[m] & 1 << e); )
          a.sqrTo(s, S), C = s, s = S, S = C, --e < 0 && (e = this.DB - 1, --m);
      }
      return a.revert(s);
    }, r.prototype.modInverse = function(n) {
      var t = n.isEven();
      if (this.isEven() && t || n.signum() == 0)
        return r.ZERO;
      for (var e = n.clone(), i = this.clone(), s = Ct(1), a = Ct(0), c = Ct(0), l = Ct(1); e.signum() != 0; ) {
        for (; e.isEven(); )
          e.rShiftTo(1, e), t ? ((!s.isEven() || !a.isEven()) && (s.addTo(this, s), a.subTo(n, a)), s.rShiftTo(1, s)) : a.isEven() || a.subTo(n, a), a.rShiftTo(1, a);
        for (; i.isEven(); )
          i.rShiftTo(1, i), t ? ((!c.isEven() || !l.isEven()) && (c.addTo(this, c), l.subTo(n, l)), c.rShiftTo(1, c)) : l.isEven() || l.subTo(n, l), l.rShiftTo(1, l);
        e.compareTo(i) >= 0 ? (e.subTo(i, e), t && s.subTo(c, s), a.subTo(l, a)) : (i.subTo(e, i), t && c.subTo(s, c), l.subTo(a, l));
      }
      if (i.compareTo(r.ONE) != 0)
        return r.ZERO;
      if (l.compareTo(n) >= 0)
        return l.subtract(n);
      if (l.signum() < 0)
        l.addTo(n, l);
      else
        return l;
      return l.signum() < 0 ? l.add(n) : l;
    }, r.prototype.pow = function(n) {
      return this.exp(n, new Aa());
    }, r.prototype.gcd = function(n) {
      var t = this.s < 0 ? this.negate() : this.clone(), e = n.s < 0 ? n.negate() : n.clone();
      if (t.compareTo(e) < 0) {
        var i = t;
        t = e, e = i;
      }
      var s = t.getLowestSetBit(), a = e.getLowestSetBit();
      if (a < 0)
        return t;
      for (s < a && (a = s), a > 0 && (t.rShiftTo(a, t), e.rShiftTo(a, e)); t.signum() > 0; )
        (s = t.getLowestSetBit()) > 0 && t.rShiftTo(s, t), (s = e.getLowestSetBit()) > 0 && e.rShiftTo(s, e), t.compareTo(e) >= 0 ? (t.subTo(e, t), t.rShiftTo(1, t)) : (e.subTo(t, e), e.rShiftTo(1, e));
      return a > 0 && e.lShiftTo(a, e), e;
    }, r.prototype.isProbablePrime = function(n) {
      var t, e = this.abs();
      if (e.t == 1 && e[0] <= et[et.length - 1]) {
        for (t = 0; t < et.length; ++t)
          if (e[0] == et[t])
            return !0;
        return !1;
      }
      if (e.isEven())
        return !1;
      for (t = 1; t < et.length; ) {
        for (var i = et[t], s = t + 1; s < et.length && i < xa; )
          i *= et[s++];
        for (i = e.modInt(i); t < s; )
          if (i % et[t++] == 0)
            return !1;
      }
      return e.millerRabin(n);
    }, r.prototype.copyTo = function(n) {
      for (var t = this.t - 1; t >= 0; --t)
        n[t] = this[t];
      n.t = this.t, n.s = this.s;
    }, r.prototype.fromInt = function(n) {
      this.t = 1, this.s = n < 0 ? -1 : 0, n > 0 ? this[0] = n : n < -1 ? this[0] = n + this.DV : this.t = 0;
    }, r.prototype.fromString = function(n, t) {
      var e;
      if (t == 16)
        e = 4;
      else if (t == 8)
        e = 3;
      else if (t == 256)
        e = 8;
      else if (t == 2)
        e = 1;
      else if (t == 32)
        e = 5;
      else if (t == 4)
        e = 2;
      else {
        this.fromRadix(n, t);
        return;
      }
      this.t = 0, this.s = 0;
      for (var i = n.length, s = !1, a = 0; --i >= 0; ) {
        var c = e == 8 ? +n[i] & 255 : Zn(n, i);
        if (c < 0) {
          n.charAt(i) == "-" && (s = !0);
          continue;
        }
        s = !1, a == 0 ? this[this.t++] = c : a + e > this.DB ? (this[this.t - 1] |= (c & (1 << this.DB - a) - 1) << a, this[this.t++] = c >> this.DB - a) : this[this.t - 1] |= c << a, a += e, a >= this.DB && (a -= this.DB);
      }
      e == 8 && +n[0] & 128 && (this.s = -1, a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)), this.clamp(), s && r.ZERO.subTo(this, this);
    }, r.prototype.clamp = function() {
      for (var n = this.s & this.DM; this.t > 0 && this[this.t - 1] == n; )
        --this.t;
    }, r.prototype.dlShiftTo = function(n, t) {
      var e;
      for (e = this.t - 1; e >= 0; --e)
        t[e + n] = this[e];
      for (e = n - 1; e >= 0; --e)
        t[e] = 0;
      t.t = this.t + n, t.s = this.s;
    }, r.prototype.drShiftTo = function(n, t) {
      for (var e = n; e < this.t; ++e)
        t[e - n] = this[e];
      t.t = Math.max(this.t - n, 0), t.s = this.s;
    }, r.prototype.lShiftTo = function(n, t) {
      for (var e = n % this.DB, i = this.DB - e, s = (1 << i) - 1, a = Math.floor(n / this.DB), c = this.s << e & this.DM, l = this.t - 1; l >= 0; --l)
        t[l + a + 1] = this[l] >> i | c, c = (this[l] & s) << e;
      for (var l = a - 1; l >= 0; --l)
        t[l] = 0;
      t[a] = c, t.t = this.t + a + 1, t.s = this.s, t.clamp();
    }, r.prototype.rShiftTo = function(n, t) {
      t.s = this.s;
      var e = Math.floor(n / this.DB);
      if (e >= this.t) {
        t.t = 0;
        return;
      }
      var i = n % this.DB, s = this.DB - i, a = (1 << i) - 1;
      t[0] = this[e] >> i;
      for (var c = e + 1; c < this.t; ++c)
        t[c - e - 1] |= (this[c] & a) << s, t[c - e] = this[c] >> i;
      i > 0 && (t[this.t - e - 1] |= (this.s & a) << s), t.t = this.t - e, t.clamp();
    }, r.prototype.subTo = function(n, t) {
      for (var e = 0, i = 0, s = Math.min(n.t, this.t); e < s; )
        i += this[e] - n[e], t[e++] = i & this.DM, i >>= this.DB;
      if (n.t < this.t) {
        for (i -= n.s; e < this.t; )
          i += this[e], t[e++] = i & this.DM, i >>= this.DB;
        i += this.s;
      } else {
        for (i += this.s; e < n.t; )
          i -= n[e], t[e++] = i & this.DM, i >>= this.DB;
        i -= n.s;
      }
      t.s = i < 0 ? -1 : 0, i < -1 ? t[e++] = this.DV + i : i > 0 && (t[e++] = i), t.t = e, t.clamp();
    }, r.prototype.multiplyTo = function(n, t) {
      var e = this.abs(), i = n.abs(), s = e.t;
      for (t.t = s + i.t; --s >= 0; )
        t[s] = 0;
      for (s = 0; s < i.t; ++s)
        t[s + e.t] = e.am(0, i[s], t, s, 0, e.t);
      t.s = 0, t.clamp(), this.s != n.s && r.ZERO.subTo(t, t);
    }, r.prototype.squareTo = function(n) {
      for (var t = this.abs(), e = n.t = 2 * t.t; --e >= 0; )
        n[e] = 0;
      for (e = 0; e < t.t - 1; ++e) {
        var i = t.am(e, t[e], n, 2 * e, 0, 1);
        (n[e + t.t] += t.am(e + 1, 2 * t[e], n, 2 * e + 1, i, t.t - e - 1)) >= t.DV && (n[e + t.t] -= t.DV, n[e + t.t + 1] = 1);
      }
      n.t > 0 && (n[n.t - 1] += t.am(e, t[e], n, 2 * e, 0, 1)), n.s = 0, n.clamp();
    }, r.prototype.divRemTo = function(n, t, e) {
      var i = n.abs();
      if (!(i.t <= 0)) {
        var s = this.abs();
        if (s.t < i.t) {
          t != null && t.fromInt(0), e != null && this.copyTo(e);
          return;
        }
        e == null && (e = B());
        var a = B(), c = this.s, l = n.s, h = this.DB - he(i[i.t - 1]);
        h > 0 ? (i.lShiftTo(h, a), s.lShiftTo(h, e)) : (i.copyTo(a), s.copyTo(e));
        var p = a.t, _ = a[p - 1];
        if (_ != 0) {
          var m = _ * (1 << this.F1) + (p > 1 ? a[p - 2] >> this.F2 : 0), P = this.FV / m, v = (1 << this.F1) / m, S = 1 << this.F2, C = e.t, L = C - p, U = t ?? B();
          for (a.dlShiftTo(L, U), e.compareTo(U) >= 0 && (e[e.t++] = 1, e.subTo(U, e)), r.ONE.dlShiftTo(p, U), U.subTo(a, a); a.t < p; )
            a[a.t++] = 0;
          for (; --L >= 0; ) {
            var V = e[--C] == _ ? this.DM : Math.floor(e[C] * P + (e[C - 1] + S) * v);
            if ((e[C] += a.am(0, V, e, L, 0, p)) < V)
              for (a.dlShiftTo(L, U), e.subTo(U, e); e[C] < --V; )
                e.subTo(U, e);
          }
          t != null && (e.drShiftTo(p, t), c != l && r.ZERO.subTo(t, t)), e.t = p, e.clamp(), h > 0 && e.rShiftTo(h, e), c < 0 && r.ZERO.subTo(e, e);
        }
      }
    }, r.prototype.invDigit = function() {
      if (this.t < 1)
        return 0;
      var n = this[0];
      if (!(n & 1))
        return 0;
      var t = n & 3;
      return t = t * (2 - (n & 15) * t) & 15, t = t * (2 - (n & 255) * t) & 255, t = t * (2 - ((n & 65535) * t & 65535)) & 65535, t = t * (2 - n * t % this.DV) % this.DV, t > 0 ? this.DV - t : -t;
    }, r.prototype.isEven = function() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    }, r.prototype.exp = function(n, t) {
      if (n > 4294967295 || n < 1)
        return r.ONE;
      var e = B(), i = B(), s = t.convert(this), a = he(n) - 1;
      for (s.copyTo(e); --a >= 0; )
        if (t.sqrTo(e, i), (n & 1 << a) > 0)
          t.mulTo(i, s, e);
        else {
          var c = e;
          e = i, i = c;
        }
      return t.revert(e);
    }, r.prototype.chunkSize = function(n) {
      return Math.floor(Math.LN2 * this.DB / Math.log(n));
    }, r.prototype.toRadix = function(n) {
      if (n == null && (n = 10), this.signum() == 0 || n < 2 || n > 36)
        return "0";
      var t = this.chunkSize(n), e = Math.pow(n, t), i = Ct(e), s = B(), a = B(), c = "";
      for (this.divRemTo(i, s, a); s.signum() > 0; )
        c = (e + a.intValue()).toString(n).substr(1) + c, s.divRemTo(i, s, a);
      return a.intValue().toString(n) + c;
    }, r.prototype.fromRadix = function(n, t) {
      this.fromInt(0), t == null && (t = 10);
      for (var e = this.chunkSize(t), i = Math.pow(t, e), s = !1, a = 0, c = 0, l = 0; l < n.length; ++l) {
        var h = Zn(n, l);
        if (h < 0) {
          n.charAt(l) == "-" && this.signum() == 0 && (s = !0);
          continue;
        }
        c = t * c + h, ++a >= e && (this.dMultiply(i), this.dAddOffset(c, 0), a = 0, c = 0);
      }
      a > 0 && (this.dMultiply(Math.pow(t, a)), this.dAddOffset(c, 0)), s && r.ZERO.subTo(this, this);
    }, r.prototype.fromNumber = function(n, t, e) {
      if (typeof t == "number")
        if (n < 2)
          this.fromInt(1);
        else
          for (this.fromNumber(n, e), this.testBit(n - 1) || this.bitwiseTo(r.ONE.shiftLeft(n - 1), le, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(t); )
            this.dAddOffset(2, 0), this.bitLength() > n && this.subTo(r.ONE.shiftLeft(n - 1), this);
      else {
        var i = [], s = n & 7;
        i.length = (n >> 3) + 1, t.nextBytes(i), s > 0 ? i[0] &= (1 << s) - 1 : i[0] = 0, this.fromString(i, 256);
      }
    }, r.prototype.bitwiseTo = function(n, t, e) {
      var i, s, a = Math.min(n.t, this.t);
      for (i = 0; i < a; ++i)
        e[i] = t(this[i], n[i]);
      if (n.t < this.t) {
        for (s = n.s & this.DM, i = a; i < this.t; ++i)
          e[i] = t(this[i], s);
        e.t = this.t;
      } else {
        for (s = this.s & this.DM, i = a; i < n.t; ++i)
          e[i] = t(s, n[i]);
        e.t = n.t;
      }
      e.s = t(this.s, n.s), e.clamp();
    }, r.prototype.changeBit = function(n, t) {
      var e = r.ONE.shiftLeft(n);
      return this.bitwiseTo(e, t, e), e;
    }, r.prototype.addTo = function(n, t) {
      for (var e = 0, i = 0, s = Math.min(n.t, this.t); e < s; )
        i += this[e] + n[e], t[e++] = i & this.DM, i >>= this.DB;
      if (n.t < this.t) {
        for (i += n.s; e < this.t; )
          i += this[e], t[e++] = i & this.DM, i >>= this.DB;
        i += this.s;
      } else {
        for (i += this.s; e < n.t; )
          i += n[e], t[e++] = i & this.DM, i >>= this.DB;
        i += n.s;
      }
      t.s = i < 0 ? -1 : 0, i > 0 ? t[e++] = i : i < -1 && (t[e++] = this.DV + i), t.t = e, t.clamp();
    }, r.prototype.dMultiply = function(n) {
      this[this.t] = this.am(0, n - 1, this, 0, 0, this.t), ++this.t, this.clamp();
    }, r.prototype.dAddOffset = function(n, t) {
      if (n != 0) {
        for (; this.t <= t; )
          this[this.t++] = 0;
        for (this[t] += n; this[t] >= this.DV; )
          this[t] -= this.DV, ++t >= this.t && (this[this.t++] = 0), ++this[t];
      }
    }, r.prototype.multiplyLowerTo = function(n, t, e) {
      var i = Math.min(this.t + n.t, t);
      for (e.s = 0, e.t = i; i > 0; )
        e[--i] = 0;
      for (var s = e.t - this.t; i < s; ++i)
        e[i + this.t] = this.am(0, n[i], e, i, 0, this.t);
      for (var s = Math.min(n.t, t); i < s; ++i)
        this.am(0, n[i], e, i, 0, t - i);
      e.clamp();
    }, r.prototype.multiplyUpperTo = function(n, t, e) {
      --t;
      var i = e.t = this.t + n.t - t;
      for (e.s = 0; --i >= 0; )
        e[i] = 0;
      for (i = Math.max(t - this.t, 0); i < n.t; ++i)
        e[this.t + i - t] = this.am(t - i, n[i], e, 0, 0, this.t + i - t);
      e.clamp(), e.drShiftTo(1, e);
    }, r.prototype.modInt = function(n) {
      if (n <= 0)
        return 0;
      var t = this.DV % n, e = this.s < 0 ? n - 1 : 0;
      if (this.t > 0)
        if (t == 0)
          e = this[0] % n;
        else
          for (var i = this.t - 1; i >= 0; --i)
            e = (t * e + this[i]) % n;
      return e;
    }, r.prototype.millerRabin = function(n) {
      var t = this.subtract(r.ONE), e = t.getLowestSetBit();
      if (e <= 0)
        return !1;
      var i = t.shiftRight(e);
      n = n + 1 >> 1, n > et.length && (n = et.length);
      for (var s = B(), a = 0; a < n; ++a) {
        s.fromInt(et[Math.floor(Math.random() * et.length)]);
        var c = s.modPow(i, this);
        if (c.compareTo(r.ONE) != 0 && c.compareTo(t) != 0) {
          for (var l = 1; l++ < e && c.compareTo(t) != 0; )
            if (c = c.modPowInt(2, this), c.compareTo(r.ONE) == 0)
              return !1;
          if (c.compareTo(t) != 0)
            return !1;
        }
      }
      return !0;
    }, r.prototype.square = function() {
      var n = B();
      return this.squareTo(n), n;
    }, r.prototype.gcda = function(n, t) {
      var e = this.s < 0 ? this.negate() : this.clone(), i = n.s < 0 ? n.negate() : n.clone();
      if (e.compareTo(i) < 0) {
        var s = e;
        e = i, i = s;
      }
      var a = e.getLowestSetBit(), c = i.getLowestSetBit();
      if (c < 0) {
        t(e);
        return;
      }
      a < c && (c = a), c > 0 && (e.rShiftTo(c, e), i.rShiftTo(c, i));
      var l = function() {
        (a = e.getLowestSetBit()) > 0 && e.rShiftTo(a, e), (a = i.getLowestSetBit()) > 0 && i.rShiftTo(a, i), e.compareTo(i) >= 0 ? (e.subTo(i, e), e.rShiftTo(1, e)) : (i.subTo(e, i), i.rShiftTo(1, i)), e.signum() > 0 ? setTimeout(l, 0) : (c > 0 && i.lShiftTo(c, i), setTimeout(function() {
          t(i);
        }, 0));
      };
      setTimeout(l, 10);
    }, r.prototype.fromNumberAsync = function(n, t, e, i) {
      if (typeof t == "number")
        if (n < 2)
          this.fromInt(1);
        else {
          this.fromNumber(n, e), this.testBit(n - 1) || this.bitwiseTo(r.ONE.shiftLeft(n - 1), le, this), this.isEven() && this.dAddOffset(1, 0);
          var s = this, a = function() {
            s.dAddOffset(2, 0), s.bitLength() > n && s.subTo(r.ONE.shiftLeft(n - 1), s), s.isProbablePrime(t) ? setTimeout(function() {
              i();
            }, 0) : setTimeout(a, 0);
          };
          setTimeout(a, 0);
        }
      else {
        var c = [], l = n & 7;
        c.length = (n >> 3) + 1, t.nextBytes(c), l > 0 ? c[0] &= (1 << l) - 1 : c[0] = 0, this.fromString(c, 256);
      }
    }, r;
  }()
), Aa = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.convert = function(n) {
      return n;
    }, r.prototype.revert = function(n) {
      return n;
    }, r.prototype.mulTo = function(n, t, e) {
      n.multiplyTo(t, e);
    }, r.prototype.sqrTo = function(n, t) {
      n.squareTo(t);
    }, r;
  }()
), Jn = (
  /** @class */
  function() {
    function r(n) {
      this.m = n;
    }
    return r.prototype.convert = function(n) {
      return n.s < 0 || n.compareTo(this.m) >= 0 ? n.mod(this.m) : n;
    }, r.prototype.revert = function(n) {
      return n;
    }, r.prototype.reduce = function(n) {
      n.divRemTo(this.m, null, n);
    }, r.prototype.mulTo = function(n, t, e) {
      n.multiplyTo(t, e), this.reduce(e);
    }, r.prototype.sqrTo = function(n, t) {
      n.squareTo(t), this.reduce(t);
    }, r;
  }()
), $n = (
  /** @class */
  function() {
    function r(n) {
      this.m = n, this.mp = n.invDigit(), this.mpl = this.mp & 32767, this.mph = this.mp >> 15, this.um = (1 << n.DB - 15) - 1, this.mt2 = 2 * n.t;
    }
    return r.prototype.convert = function(n) {
      var t = B();
      return n.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), n.s < 0 && t.compareTo(A.ZERO) > 0 && this.m.subTo(t, t), t;
    }, r.prototype.revert = function(n) {
      var t = B();
      return n.copyTo(t), this.reduce(t), t;
    }, r.prototype.reduce = function(n) {
      for (; n.t <= this.mt2; )
        n[n.t++] = 0;
      for (var t = 0; t < this.m.t; ++t) {
        var e = n[t] & 32767, i = e * this.mpl + ((e * this.mph + (n[t] >> 15) * this.mpl & this.um) << 15) & n.DM;
        for (e = t + this.m.t, n[e] += this.m.am(0, i, n, t, 0, this.m.t); n[e] >= n.DV; )
          n[e] -= n.DV, n[++e]++;
      }
      n.clamp(), n.drShiftTo(this.m.t, n), n.compareTo(this.m) >= 0 && n.subTo(this.m, n);
    }, r.prototype.mulTo = function(n, t, e) {
      n.multiplyTo(t, e), this.reduce(e);
    }, r.prototype.sqrTo = function(n, t) {
      n.squareTo(t), this.reduce(t);
    }, r;
  }()
), Da = (
  /** @class */
  function() {
    function r(n) {
      this.m = n, this.r2 = B(), this.q3 = B(), A.ONE.dlShiftTo(2 * n.t, this.r2), this.mu = this.r2.divide(n);
    }
    return r.prototype.convert = function(n) {
      if (n.s < 0 || n.t > 2 * this.m.t)
        return n.mod(this.m);
      if (n.compareTo(this.m) < 0)
        return n;
      var t = B();
      return n.copyTo(t), this.reduce(t), t;
    }, r.prototype.revert = function(n) {
      return n;
    }, r.prototype.reduce = function(n) {
      for (n.drShiftTo(this.m.t - 1, this.r2), n.t > this.m.t + 1 && (n.t = this.m.t + 1, n.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); n.compareTo(this.r2) < 0; )
        n.dAddOffset(1, this.m.t + 1);
      for (n.subTo(this.r2, n); n.compareTo(this.m) >= 0; )
        n.subTo(this.m, n);
    }, r.prototype.mulTo = function(n, t, e) {
      n.multiplyTo(t, e), this.reduce(e);
    }, r.prototype.sqrTo = function(n, t) {
      n.squareTo(t), this.reduce(t);
    }, r;
  }()
);
function B() {
  return new A(null);
}
function H(r, n) {
  return new A(r, n);
}
var Qn = typeof navigator < "u";
Qn && Gn && navigator.appName == "Microsoft Internet Explorer" ? (A.prototype.am = function(n, t, e, i, s, a) {
  for (var c = t & 32767, l = t >> 15; --a >= 0; ) {
    var h = this[n] & 32767, p = this[n++] >> 15, _ = l * h + p * c;
    h = c * h + ((_ & 32767) << 15) + e[i] + (s & 1073741823), s = (h >>> 30) + (_ >>> 15) + l * p + (s >>> 30), e[i++] = h & 1073741823;
  }
  return s;
}, kt = 30) : Qn && Gn && navigator.appName != "Netscape" ? (A.prototype.am = function(n, t, e, i, s, a) {
  for (; --a >= 0; ) {
    var c = t * this[n++] + e[i] + s;
    s = Math.floor(c / 67108864), e[i++] = c & 67108863;
  }
  return s;
}, kt = 26) : (A.prototype.am = function(n, t, e, i, s, a) {
  for (var c = t & 16383, l = t >> 14; --a >= 0; ) {
    var h = this[n] & 16383, p = this[n++] >> 14, _ = l * h + p * c;
    h = c * h + ((_ & 16383) << 14) + e[i] + s, s = (h >> 28) + (_ >> 14) + l * p, e[i++] = h & 268435455;
  }
  return s;
}, kt = 28);
A.prototype.DB = kt;
A.prototype.DM = (1 << kt) - 1;
A.prototype.DV = 1 << kt;
var Nn = 52;
A.prototype.FV = Math.pow(2, Nn);
A.prototype.F1 = Nn - kt;
A.prototype.F2 = 2 * kt - Nn;
var Fe = [], zt, dt;
zt = 48;
for (dt = 0; dt <= 9; ++dt)
  Fe[zt++] = dt;
zt = 97;
for (dt = 10; dt < 36; ++dt)
  Fe[zt++] = dt;
zt = 65;
for (dt = 10; dt < 36; ++dt)
  Fe[zt++] = dt;
function Zn(r, n) {
  var t = Fe[r.charCodeAt(n)];
  return t ?? -1;
}
function Ct(r) {
  var n = B();
  return n.fromInt(r), n;
}
function he(r) {
  var n = 1, t;
  return (t = r >>> 16) != 0 && (r = t, n += 16), (t = r >> 8) != 0 && (r = t, n += 8), (t = r >> 4) != 0 && (r = t, n += 4), (t = r >> 2) != 0 && (r = t, n += 2), (t = r >> 1) != 0 && (r = t, n += 1), n;
}
A.ZERO = Ct(0);
A.ONE = Ct(1);
var Ra = (
  /** @class */
  function() {
    function r() {
      this.i = 0, this.j = 0, this.S = [];
    }
    return r.prototype.init = function(n) {
      var t, e, i;
      for (t = 0; t < 256; ++t)
        this.S[t] = t;
      for (e = 0, t = 0; t < 256; ++t)
        e = e + this.S[t] + n[t % n.length] & 255, i = this.S[t], this.S[t] = this.S[e], this.S[e] = i;
      this.i = 0, this.j = 0;
    }, r.prototype.next = function() {
      var n;
      return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, n = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = n, this.S[n + this.S[this.i] & 255];
    }, r;
  }()
);
function Ia() {
  return new Ra();
}
var Li = 256, ue, St = null, bt;
if (St == null) {
  St = [], bt = 0;
  var de = void 0;
  if (typeof window < "u" && window.crypto && window.crypto.getRandomValues) {
    var Ge = new Uint32Array(256);
    for (window.crypto.getRandomValues(Ge), de = 0; de < Ge.length; ++de)
      St[bt++] = Ge[de] & 255;
  }
  var pe = 0, fe = function(r) {
    if (pe = pe || 0, pe >= 256 || bt >= Li) {
      window.removeEventListener ? window.removeEventListener("mousemove", fe, !1) : window.detachEvent && window.detachEvent("onmousemove", fe);
      return;
    }
    try {
      var n = r.x + r.y;
      St[bt++] = n & 255, pe += 1;
    } catch {
    }
  };
  typeof window < "u" && (window.addEventListener ? window.addEventListener("mousemove", fe, !1) : window.attachEvent && window.attachEvent("onmousemove", fe));
}
function Oa() {
  if (ue == null) {
    for (ue = Ia(); bt < Li; ) {
      var r = Math.floor(65536 * Math.random());
      St[bt++] = r & 255;
    }
    for (ue.init(St), bt = 0; bt < St.length; ++bt)
      St[bt] = 0;
    bt = 0;
  }
  return ue.next();
}
var on = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.nextBytes = function(n) {
      for (var t = 0; t < n.length; ++t)
        n[t] = Oa();
    }, r;
  }()
);
function Ba(r, n) {
  if (n < r.length + 22)
    return console.error("Message too long for RSA"), null;
  for (var t = n - r.length - 6, e = "", i = 0; i < t; i += 2)
    e += "ff";
  var s = "0001" + e + "00" + r;
  return H(s, 16);
}
function Na(r, n) {
  if (n < r.length + 11)
    return console.error("Message too long for RSA"), null;
  for (var t = [], e = r.length - 1; e >= 0 && n > 0; ) {
    var i = r.charCodeAt(e--);
    i < 128 ? t[--n] = i : i > 127 && i < 2048 ? (t[--n] = i & 63 | 128, t[--n] = i >> 6 | 192) : (t[--n] = i & 63 | 128, t[--n] = i >> 6 & 63 | 128, t[--n] = i >> 12 | 224);
  }
  t[--n] = 0;
  for (var s = new on(), a = []; n > 2; ) {
    for (a[0] = 0; a[0] == 0; )
      s.nextBytes(a);
    t[--n] = a[0];
  }
  return t[--n] = 2, t[--n] = 0, new A(t);
}
var Ma = (
  /** @class */
  function() {
    function r() {
      this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null;
    }
    return r.prototype.doPublic = function(n) {
      return n.modPowInt(this.e, this.n);
    }, r.prototype.doPrivate = function(n) {
      if (this.p == null || this.q == null)
        return n.modPow(this.d, this.n);
      for (var t = n.mod(this.p).modPow(this.dmp1, this.p), e = n.mod(this.q).modPow(this.dmq1, this.q); t.compareTo(e) < 0; )
        t = t.add(this.p);
      return t.subtract(e).multiply(this.coeff).mod(this.p).multiply(this.q).add(e);
    }, r.prototype.setPublic = function(n, t) {
      n != null && t != null && n.length > 0 && t.length > 0 ? (this.n = H(n, 16), this.e = parseInt(t, 16)) : console.error("Invalid RSA public key");
    }, r.prototype.encrypt = function(n) {
      var t = this.n.bitLength() + 7 >> 3, e = Na(n, t);
      if (e == null)
        return null;
      var i = this.doPublic(e);
      if (i == null)
        return null;
      for (var s = i.toString(16), a = s.length, c = 0; c < t * 2 - a; c++)
        s = "0" + s;
      return s;
    }, r.prototype.setPrivate = function(n, t, e) {
      n != null && t != null && n.length > 0 && t.length > 0 ? (this.n = H(n, 16), this.e = parseInt(t, 16), this.d = H(e, 16)) : console.error("Invalid RSA private key");
    }, r.prototype.setPrivateEx = function(n, t, e, i, s, a, c, l) {
      n != null && t != null && n.length > 0 && t.length > 0 ? (this.n = H(n, 16), this.e = parseInt(t, 16), this.d = H(e, 16), this.p = H(i, 16), this.q = H(s, 16), this.dmp1 = H(a, 16), this.dmq1 = H(c, 16), this.coeff = H(l, 16)) : console.error("Invalid RSA private key");
    }, r.prototype.generate = function(n, t) {
      var e = new on(), i = n >> 1;
      this.e = parseInt(t, 16);
      for (var s = new A(t, 16); ; ) {
        for (; this.p = new A(n - i, 1, e), !(this.p.subtract(A.ONE).gcd(s).compareTo(A.ONE) == 0 && this.p.isProbablePrime(10)); )
          ;
        for (; this.q = new A(i, 1, e), !(this.q.subtract(A.ONE).gcd(s).compareTo(A.ONE) == 0 && this.q.isProbablePrime(10)); )
          ;
        if (this.p.compareTo(this.q) <= 0) {
          var a = this.p;
          this.p = this.q, this.q = a;
        }
        var c = this.p.subtract(A.ONE), l = this.q.subtract(A.ONE), h = c.multiply(l);
        if (h.gcd(s).compareTo(A.ONE) == 0) {
          this.n = this.p.multiply(this.q), this.d = s.modInverse(h), this.dmp1 = this.d.mod(c), this.dmq1 = this.d.mod(l), this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    }, r.prototype.decrypt = function(n) {
      var t = H(n, 16), e = this.doPrivate(t);
      return e == null ? null : Fa(e, this.n.bitLength() + 7 >> 3);
    }, r.prototype.generateAsync = function(n, t, e) {
      var i = new on(), s = n >> 1;
      this.e = parseInt(t, 16);
      var a = new A(t, 16), c = this, l = function() {
        var h = function() {
          if (c.p.compareTo(c.q) <= 0) {
            var m = c.p;
            c.p = c.q, c.q = m;
          }
          var P = c.p.subtract(A.ONE), v = c.q.subtract(A.ONE), S = P.multiply(v);
          S.gcd(a).compareTo(A.ONE) == 0 ? (c.n = c.p.multiply(c.q), c.d = a.modInverse(S), c.dmp1 = c.d.mod(P), c.dmq1 = c.d.mod(v), c.coeff = c.q.modInverse(c.p), setTimeout(function() {
            e();
          }, 0)) : setTimeout(l, 0);
        }, p = function() {
          c.q = B(), c.q.fromNumberAsync(s, 1, i, function() {
            c.q.subtract(A.ONE).gcda(a, function(m) {
              m.compareTo(A.ONE) == 0 && c.q.isProbablePrime(10) ? setTimeout(h, 0) : setTimeout(p, 0);
            });
          });
        }, _ = function() {
          c.p = B(), c.p.fromNumberAsync(n - s, 1, i, function() {
            c.p.subtract(A.ONE).gcda(a, function(m) {
              m.compareTo(A.ONE) == 0 && c.p.isProbablePrime(10) ? setTimeout(p, 0) : setTimeout(_, 0);
            });
          });
        };
        setTimeout(_, 0);
      };
      setTimeout(l, 0);
    }, r.prototype.sign = function(n, t, e) {
      var i = Ua(e), s = i + t(n).toString(), a = Ba(s, this.n.bitLength() / 4);
      if (a == null)
        return null;
      var c = this.doPrivate(a);
      if (c == null)
        return null;
      var l = c.toString(16);
      return l.length & 1 ? "0" + l : l;
    }, r.prototype.verify = function(n, t, e) {
      var i = H(t, 16), s = this.doPublic(i);
      if (s == null)
        return null;
      var a = s.toString(16).replace(/^1f+00/, ""), c = La(a);
      return c == e(n).toString();
    }, r;
  }()
);
function Fa(r, n) {
  for (var t = r.toByteArray(), e = 0; e < t.length && t[e] == 0; )
    ++e;
  if (t.length - e != n - 1 || t[e] != 2)
    return null;
  for (++e; t[e] != 0; )
    if (++e >= t.length)
      return null;
  for (var i = ""; ++e < t.length; ) {
    var s = t[e] & 255;
    s < 128 ? i += String.fromCharCode(s) : s > 191 && s < 224 ? (i += String.fromCharCode((s & 31) << 6 | t[e + 1] & 63), ++e) : (i += String.fromCharCode((s & 15) << 12 | (t[e + 1] & 63) << 6 | t[e + 2] & 63), e += 2);
  }
  return i;
}
var ye = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};
function Ua(r) {
  return ye[r] || "";
}
function La(r) {
  for (var n in ye)
    if (ye.hasOwnProperty(n)) {
      var t = ye[n], e = t.length;
      if (r.substr(0, e) == t)
        return r.substr(e);
    }
  return r;
}
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
var K = {};
K.lang = {
  /**
   * Utility to set up the prototype, constructor and superclass properties to
   * support an inheritance strategy that can chain constructors and methods.
   * Static members will not be inherited.
   *
   * @method extend
   * @static
   * @param {Function} subc   the object to modify
   * @param {Function} superc the object to inherit
   * @param {Object} overrides  additional properties/methods to add to the
   *                              subclass prototype.  These will override the
   *                              matching items obtained from the superclass
   *                              if present.
   */
  extend: function(r, n, t) {
    if (!n || !r)
      throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
    var e = function() {
    };
    if (e.prototype = n.prototype, r.prototype = new e(), r.prototype.constructor = r, r.superclass = n.prototype, n.prototype.constructor == Object.prototype.constructor && (n.prototype.constructor = n), t) {
      var i;
      for (i in t)
        r.prototype[i] = t[i];
      var s = function() {
      }, a = ["toString", "valueOf"];
      try {
        /MSIE/.test(navigator.userAgent) && (s = function(c, l) {
          for (i = 0; i < a.length; i = i + 1) {
            var h = a[i], p = l[h];
            typeof p == "function" && p != Object.prototype[h] && (c[h] = p);
          }
        });
      } catch {
      }
      s(r.prototype, t);
    }
  }
};
/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */
var y = {};
(typeof y.asn1 > "u" || !y.asn1) && (y.asn1 = {});
y.asn1.ASN1Util = new function() {
  this.integerToByteHex = function(r) {
    var n = r.toString(16);
    return n.length % 2 == 1 && (n = "0" + n), n;
  }, this.bigIntToMinTwosComplementsHex = function(r) {
    var n = r.toString(16);
    if (n.substr(0, 1) != "-")
      n.length % 2 == 1 ? n = "0" + n : n.match(/^[0-7]/) || (n = "00" + n);
    else {
      var t = n.substr(1), e = t.length;
      e % 2 == 1 ? e += 1 : n.match(/^[0-7]/) || (e += 2);
      for (var i = "", s = 0; s < e; s++)
        i += "f";
      var a = new A(i, 16), c = a.xor(r).add(A.ONE);
      n = c.toString(16).replace(/^-/, "");
    }
    return n;
  }, this.getPEMStringFromHex = function(r, n) {
    return hextopem(r, n);
  }, this.newObject = function(r) {
    var n = y, t = n.asn1, e = t.DERBoolean, i = t.DERInteger, s = t.DERBitString, a = t.DEROctetString, c = t.DERNull, l = t.DERObjectIdentifier, h = t.DEREnumerated, p = t.DERUTF8String, _ = t.DERNumericString, m = t.DERPrintableString, P = t.DERTeletexString, v = t.DERIA5String, S = t.DERUTCTime, C = t.DERGeneralizedTime, L = t.DERSequence, U = t.DERSet, V = t.DERTaggedObject, nt = t.ASN1Util.newObject, G = Object.keys(r);
    if (G.length != 1)
      throw "key of param shall be only one.";
    var k = G[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + k + ":") == -1)
      throw "undefined key: " + k;
    if (k == "bool")
      return new e(r[k]);
    if (k == "int")
      return new i(r[k]);
    if (k == "bitstr")
      return new s(r[k]);
    if (k == "octstr")
      return new a(r[k]);
    if (k == "null")
      return new c(r[k]);
    if (k == "oid")
      return new l(r[k]);
    if (k == "enum")
      return new h(r[k]);
    if (k == "utf8str")
      return new p(r[k]);
    if (k == "numstr")
      return new _(r[k]);
    if (k == "prnstr")
      return new m(r[k]);
    if (k == "telstr")
      return new P(r[k]);
    if (k == "ia5str")
      return new v(r[k]);
    if (k == "utctime")
      return new S(r[k]);
    if (k == "gentime")
      return new C(r[k]);
    if (k == "seq") {
      for (var ot = r[k], yt = [], wt = 0; wt < ot.length; wt++) {
        var Ke = nt(ot[wt]);
        yt.push(Ke);
      }
      return new L({ array: yt });
    }
    if (k == "set") {
      for (var ot = r[k], yt = [], wt = 0; wt < ot.length; wt++) {
        var Ke = nt(ot[wt]);
        yt.push(Ke);
      }
      return new U({ array: yt });
    }
    if (k == "tag") {
      var pt = r[k];
      if (Object.prototype.toString.call(pt) === "[object Array]" && pt.length == 3) {
        var ha = nt(pt[2]);
        return new V({
          tag: pt[0],
          explicit: pt[1],
          obj: ha
        });
      } else {
        var ce = {};
        if (pt.explicit !== void 0 && (ce.explicit = pt.explicit), pt.tag !== void 0 && (ce.tag = pt.tag), pt.obj === void 0)
          throw "obj shall be specified for 'tag'.";
        return ce.obj = nt(pt.obj), new V(ce);
      }
    }
  }, this.jsonToASN1HEX = function(r) {
    var n = this.newObject(r);
    return n.getEncodedHex();
  };
}();
y.asn1.ASN1Util.oidHexToInt = function(r) {
  for (var i = "", n = parseInt(r.substr(0, 2), 16), t = Math.floor(n / 40), e = n % 40, i = t + "." + e, s = "", a = 2; a < r.length; a += 2) {
    var c = parseInt(r.substr(a, 2), 16), l = ("00000000" + c.toString(2)).slice(-8);
    if (s = s + l.substr(1, 7), l.substr(0, 1) == "0") {
      var h = new A(s, 2);
      i = i + "." + h.toString(10), s = "";
    }
  }
  return i;
};
y.asn1.ASN1Util.oidIntToHex = function(r) {
  var n = function(c) {
    var l = c.toString(16);
    return l.length == 1 && (l = "0" + l), l;
  }, t = function(c) {
    var l = "", h = new A(c, 10), p = h.toString(2), _ = 7 - p.length % 7;
    _ == 7 && (_ = 0);
    for (var m = "", P = 0; P < _; P++)
      m += "0";
    p = m + p;
    for (var P = 0; P < p.length - 1; P += 7) {
      var v = p.substr(P, 7);
      P != p.length - 7 && (v = "1" + v), l += n(parseInt(v, 2));
    }
    return l;
  };
  if (!r.match(/^[0-9.]+$/))
    throw "malformed oid string: " + r;
  var e = "", i = r.split("."), s = parseInt(i[0]) * 40 + parseInt(i[1]);
  e += n(s), i.splice(0, 2);
  for (var a = 0; a < i.length; a++)
    e += t(i[a]);
  return e;
};
y.asn1.ASN1Object = function() {
  var r = "";
  this.getLengthHexFromValue = function() {
    if (typeof this.hV > "u" || this.hV == null)
      throw "this.hV is null or undefined.";
    if (this.hV.length % 2 == 1)
      throw "value hex must be even length: n=" + r.length + ",v=" + this.hV;
    var n = this.hV.length / 2, t = n.toString(16);
    if (t.length % 2 == 1 && (t = "0" + t), n < 128)
      return t;
    var e = t.length / 2;
    if (e > 15)
      throw "ASN.1 length too long to represent by 8x: n = " + n.toString(16);
    var i = 128 + e;
    return i.toString(16) + t;
  }, this.getEncodedHex = function() {
    return (this.hTLV == null || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV;
  }, this.getValueHex = function() {
    return this.getEncodedHex(), this.hV;
  }, this.getFreshValueHex = function() {
    return "";
  };
};
y.asn1.DERAbstractString = function(r) {
  y.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function() {
    return this.s;
  }, this.setString = function(n) {
    this.hTLV = null, this.isModified = !0, this.s = n, this.hV = stohex(this.s);
  }, this.setStringHex = function(n) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = n;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof r < "u" && (typeof r == "string" ? this.setString(r) : typeof r.str < "u" ? this.setString(r.str) : typeof r.hex < "u" && this.setStringHex(r.hex));
};
K.lang.extend(y.asn1.DERAbstractString, y.asn1.ASN1Object);
y.asn1.DERAbstractTime = function(r) {
  y.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function(n) {
    utc = n.getTime() + n.getTimezoneOffset() * 6e4;
    var t = new Date(utc);
    return t;
  }, this.formatDate = function(n, t, e) {
    var i = this.zeroPadding, s = this.localDateToUTC(n), a = String(s.getFullYear());
    t == "utc" && (a = a.substr(2, 2));
    var c = i(String(s.getMonth() + 1), 2), l = i(String(s.getDate()), 2), h = i(String(s.getHours()), 2), p = i(String(s.getMinutes()), 2), _ = i(String(s.getSeconds()), 2), m = a + c + l + h + p + _;
    if (e === !0) {
      var P = s.getMilliseconds();
      if (P != 0) {
        var v = i(String(P), 3);
        v = v.replace(/[0]+$/, ""), m = m + "." + v;
      }
    }
    return m + "Z";
  }, this.zeroPadding = function(n, t) {
    return n.length >= t ? n : new Array(t - n.length + 1).join("0") + n;
  }, this.getString = function() {
    return this.s;
  }, this.setString = function(n) {
    this.hTLV = null, this.isModified = !0, this.s = n, this.hV = stohex(n);
  }, this.setByDateValue = function(n, t, e, i, s, a) {
    var c = new Date(Date.UTC(n, t - 1, e, i, s, a, 0));
    this.setByDate(c);
  }, this.getFreshValueHex = function() {
    return this.hV;
  };
};
K.lang.extend(y.asn1.DERAbstractTime, y.asn1.ASN1Object);
y.asn1.DERAbstractStructured = function(r) {
  y.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function(n) {
    this.hTLV = null, this.isModified = !0, this.asn1Array = n;
  }, this.appendASN1Object = function(n) {
    this.hTLV = null, this.isModified = !0, this.asn1Array.push(n);
  }, this.asn1Array = new Array(), typeof r < "u" && typeof r.array < "u" && (this.asn1Array = r.array);
};
K.lang.extend(y.asn1.DERAbstractStructured, y.asn1.ASN1Object);
y.asn1.DERBoolean = function() {
  y.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff";
};
K.lang.extend(y.asn1.DERBoolean, y.asn1.ASN1Object);
y.asn1.DERInteger = function(r) {
  y.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(n) {
    this.hTLV = null, this.isModified = !0, this.hV = y.asn1.ASN1Util.bigIntToMinTwosComplementsHex(n);
  }, this.setByInteger = function(n) {
    var t = new A(String(n), 10);
    this.setByBigInteger(t);
  }, this.setValueHex = function(n) {
    this.hV = n;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof r < "u" && (typeof r.bigint < "u" ? this.setByBigInteger(r.bigint) : typeof r.int < "u" ? this.setByInteger(r.int) : typeof r == "number" ? this.setByInteger(r) : typeof r.hex < "u" && this.setValueHex(r.hex));
};
K.lang.extend(y.asn1.DERInteger, y.asn1.ASN1Object);
y.asn1.DERBitString = function(r) {
  if (r !== void 0 && typeof r.obj < "u") {
    var n = y.asn1.ASN1Util.newObject(r.obj);
    r.hex = "00" + n.getEncodedHex();
  }
  y.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(t) {
    this.hTLV = null, this.isModified = !0, this.hV = t;
  }, this.setUnusedBitsAndHexValue = function(t, e) {
    if (t < 0 || 7 < t)
      throw "unused bits shall be from 0 to 7: u = " + t;
    var i = "0" + t;
    this.hTLV = null, this.isModified = !0, this.hV = i + e;
  }, this.setByBinaryString = function(t) {
    t = t.replace(/0+$/, "");
    var e = 8 - t.length % 8;
    e == 8 && (e = 0);
    for (var i = 0; i <= e; i++)
      t += "0";
    for (var s = "", i = 0; i < t.length - 1; i += 8) {
      var a = t.substr(i, 8), c = parseInt(a, 2).toString(16);
      c.length == 1 && (c = "0" + c), s += c;
    }
    this.hTLV = null, this.isModified = !0, this.hV = "0" + e + s;
  }, this.setByBooleanArray = function(t) {
    for (var e = "", i = 0; i < t.length; i++)
      t[i] == !0 ? e += "1" : e += "0";
    this.setByBinaryString(e);
  }, this.newFalseArray = function(t) {
    for (var e = new Array(t), i = 0; i < t; i++)
      e[i] = !1;
    return e;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof r < "u" && (typeof r == "string" && r.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(r) : typeof r.hex < "u" ? this.setHexValueIncludingUnusedBits(r.hex) : typeof r.bin < "u" ? this.setByBinaryString(r.bin) : typeof r.array < "u" && this.setByBooleanArray(r.array));
};
K.lang.extend(y.asn1.DERBitString, y.asn1.ASN1Object);
y.asn1.DEROctetString = function(r) {
  if (r !== void 0 && typeof r.obj < "u") {
    var n = y.asn1.ASN1Util.newObject(r.obj);
    r.hex = n.getEncodedHex();
  }
  y.asn1.DEROctetString.superclass.constructor.call(this, r), this.hT = "04";
};
K.lang.extend(y.asn1.DEROctetString, y.asn1.DERAbstractString);
y.asn1.DERNull = function() {
  y.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500";
};
K.lang.extend(y.asn1.DERNull, y.asn1.ASN1Object);
y.asn1.DERObjectIdentifier = function(r) {
  var n = function(e) {
    var i = e.toString(16);
    return i.length == 1 && (i = "0" + i), i;
  }, t = function(e) {
    var i = "", s = new A(e, 10), a = s.toString(2), c = 7 - a.length % 7;
    c == 7 && (c = 0);
    for (var l = "", h = 0; h < c; h++)
      l += "0";
    a = l + a;
    for (var h = 0; h < a.length - 1; h += 7) {
      var p = a.substr(h, 7);
      h != a.length - 7 && (p = "1" + p), i += n(parseInt(p, 2));
    }
    return i;
  };
  y.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(e) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = e;
  }, this.setValueOidString = function(e) {
    if (!e.match(/^[0-9.]+$/))
      throw "malformed oid string: " + e;
    var i = "", s = e.split("."), a = parseInt(s[0]) * 40 + parseInt(s[1]);
    i += n(a), s.splice(0, 2);
    for (var c = 0; c < s.length; c++)
      i += t(s[c]);
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = i;
  }, this.setValueName = function(e) {
    var i = y.asn1.x509.OID.name2oid(e);
    if (i !== "")
      this.setValueOidString(i);
    else
      throw "DERObjectIdentifier oidName undefined: " + e;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, r !== void 0 && (typeof r == "string" ? r.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(r) : this.setValueName(r) : r.oid !== void 0 ? this.setValueOidString(r.oid) : r.hex !== void 0 ? this.setValueHex(r.hex) : r.name !== void 0 && this.setValueName(r.name));
};
K.lang.extend(y.asn1.DERObjectIdentifier, y.asn1.ASN1Object);
y.asn1.DEREnumerated = function(r) {
  y.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(n) {
    this.hTLV = null, this.isModified = !0, this.hV = y.asn1.ASN1Util.bigIntToMinTwosComplementsHex(n);
  }, this.setByInteger = function(n) {
    var t = new A(String(n), 10);
    this.setByBigInteger(t);
  }, this.setValueHex = function(n) {
    this.hV = n;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof r < "u" && (typeof r.int < "u" ? this.setByInteger(r.int) : typeof r == "number" ? this.setByInteger(r) : typeof r.hex < "u" && this.setValueHex(r.hex));
};
K.lang.extend(y.asn1.DEREnumerated, y.asn1.ASN1Object);
y.asn1.DERUTF8String = function(r) {
  y.asn1.DERUTF8String.superclass.constructor.call(this, r), this.hT = "0c";
};
K.lang.extend(y.asn1.DERUTF8String, y.asn1.DERAbstractString);
y.asn1.DERNumericString = function(r) {
  y.asn1.DERNumericString.superclass.constructor.call(this, r), this.hT = "12";
};
K.lang.extend(y.asn1.DERNumericString, y.asn1.DERAbstractString);
y.asn1.DERPrintableString = function(r) {
  y.asn1.DERPrintableString.superclass.constructor.call(this, r), this.hT = "13";
};
K.lang.extend(y.asn1.DERPrintableString, y.asn1.DERAbstractString);
y.asn1.DERTeletexString = function(r) {
  y.asn1.DERTeletexString.superclass.constructor.call(this, r), this.hT = "14";
};
K.lang.extend(y.asn1.DERTeletexString, y.asn1.DERAbstractString);
y.asn1.DERIA5String = function(r) {
  y.asn1.DERIA5String.superclass.constructor.call(this, r), this.hT = "16";
};
K.lang.extend(y.asn1.DERIA5String, y.asn1.DERAbstractString);
y.asn1.DERUTCTime = function(r) {
  y.asn1.DERUTCTime.superclass.constructor.call(this, r), this.hT = "17", this.setByDate = function(n) {
    this.hTLV = null, this.isModified = !0, this.date = n, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s);
  }, this.getFreshValueHex = function() {
    return typeof this.date > "u" && typeof this.s > "u" && (this.date = /* @__PURE__ */ new Date(), this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)), this.hV;
  }, r !== void 0 && (r.str !== void 0 ? this.setString(r.str) : typeof r == "string" && r.match(/^[0-9]{12}Z$/) ? this.setString(r) : r.hex !== void 0 ? this.setStringHex(r.hex) : r.date !== void 0 && this.setByDate(r.date));
};
K.lang.extend(y.asn1.DERUTCTime, y.asn1.DERAbstractTime);
y.asn1.DERGeneralizedTime = function(r) {
  y.asn1.DERGeneralizedTime.superclass.constructor.call(this, r), this.hT = "18", this.withMillis = !1, this.setByDate = function(n) {
    this.hTLV = null, this.isModified = !0, this.date = n, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s);
  }, this.getFreshValueHex = function() {
    return this.date === void 0 && this.s === void 0 && (this.date = /* @__PURE__ */ new Date(), this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)), this.hV;
  }, r !== void 0 && (r.str !== void 0 ? this.setString(r.str) : typeof r == "string" && r.match(/^[0-9]{14}Z$/) ? this.setString(r) : r.hex !== void 0 ? this.setStringHex(r.hex) : r.date !== void 0 && this.setByDate(r.date), r.millis === !0 && (this.withMillis = !0));
};
K.lang.extend(y.asn1.DERGeneralizedTime, y.asn1.DERAbstractTime);
y.asn1.DERSequence = function(r) {
  y.asn1.DERSequence.superclass.constructor.call(this, r), this.hT = "30", this.getFreshValueHex = function() {
    for (var n = "", t = 0; t < this.asn1Array.length; t++) {
      var e = this.asn1Array[t];
      n += e.getEncodedHex();
    }
    return this.hV = n, this.hV;
  };
};
K.lang.extend(y.asn1.DERSequence, y.asn1.DERAbstractStructured);
y.asn1.DERSet = function(r) {
  y.asn1.DERSet.superclass.constructor.call(this, r), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function() {
    for (var n = new Array(), t = 0; t < this.asn1Array.length; t++) {
      var e = this.asn1Array[t];
      n.push(e.getEncodedHex());
    }
    return this.sortFlag == !0 && n.sort(), this.hV = n.join(""), this.hV;
  }, typeof r < "u" && typeof r.sortflag < "u" && r.sortflag == !1 && (this.sortFlag = !1);
};
K.lang.extend(y.asn1.DERSet, y.asn1.DERAbstractStructured);
y.asn1.DERTaggedObject = function(r) {
  y.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(n, t, e) {
    this.hT = t, this.isExplicit = n, this.asn1Object = e, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = e.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, t), this.isModified = !1);
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof r < "u" && (typeof r.tag < "u" && (this.hT = r.tag), typeof r.explicit < "u" && (this.isExplicit = r.explicit), typeof r.obj < "u" && (this.asn1Object = r.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)));
};
K.lang.extend(y.asn1.DERTaggedObject, y.asn1.ASN1Object);
var Va = /* @__PURE__ */ function() {
  var r = function(n, t) {
    return r = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, i) {
      e.__proto__ = i;
    } || function(e, i) {
      for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s]);
    }, r(n, t);
  };
  return function(n, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    r(n, t);
    function e() {
      this.constructor = n;
    }
    n.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
  };
}(), Yn = (
  /** @class */
  function(r) {
    Va(n, r);
    function n(t) {
      var e = r.call(this) || this;
      return t && (typeof t == "string" ? e.parseKey(t) : (n.hasPrivateKeyProperty(t) || n.hasPublicKeyProperty(t)) && e.parsePropertiesFrom(t)), e;
    }
    return n.prototype.parseKey = function(t) {
      try {
        var e = 0, i = 0, s = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/, a = s.test(t) ? Ea.decode(t) : an.unarmor(t), c = Sa.decode(a);
        if (c.sub.length === 3 && (c = c.sub[2].sub[0]), c.sub.length === 9) {
          e = c.sub[1].getHexStringValue(), this.n = H(e, 16), i = c.sub[2].getHexStringValue(), this.e = parseInt(i, 16);
          var l = c.sub[3].getHexStringValue();
          this.d = H(l, 16);
          var h = c.sub[4].getHexStringValue();
          this.p = H(h, 16);
          var p = c.sub[5].getHexStringValue();
          this.q = H(p, 16);
          var _ = c.sub[6].getHexStringValue();
          this.dmp1 = H(_, 16);
          var m = c.sub[7].getHexStringValue();
          this.dmq1 = H(m, 16);
          var P = c.sub[8].getHexStringValue();
          this.coeff = H(P, 16);
        } else if (c.sub.length === 2)
          if (c.sub[0].sub) {
            var v = c.sub[1], S = v.sub[0];
            e = S.sub[0].getHexStringValue(), this.n = H(e, 16), i = S.sub[1].getHexStringValue(), this.e = parseInt(i, 16);
          } else
            e = c.sub[0].getHexStringValue(), this.n = H(e, 16), i = c.sub[1].getHexStringValue(), this.e = parseInt(i, 16);
        else
          return !1;
        return !0;
      } catch {
        return !1;
      }
    }, n.prototype.getPrivateBaseKey = function() {
      var t = {
        array: [
          new y.asn1.DERInteger({ int: 0 }),
          new y.asn1.DERInteger({ bigint: this.n }),
          new y.asn1.DERInteger({ int: this.e }),
          new y.asn1.DERInteger({ bigint: this.d }),
          new y.asn1.DERInteger({ bigint: this.p }),
          new y.asn1.DERInteger({ bigint: this.q }),
          new y.asn1.DERInteger({ bigint: this.dmp1 }),
          new y.asn1.DERInteger({ bigint: this.dmq1 }),
          new y.asn1.DERInteger({ bigint: this.coeff })
        ]
      }, e = new y.asn1.DERSequence(t);
      return e.getEncodedHex();
    }, n.prototype.getPrivateBaseKeyB64 = function() {
      return Oe(this.getPrivateBaseKey());
    }, n.prototype.getPublicBaseKey = function() {
      var t = new y.asn1.DERSequence({
        array: [
          new y.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
          new y.asn1.DERNull()
        ]
      }), e = new y.asn1.DERSequence({
        array: [
          new y.asn1.DERInteger({ bigint: this.n }),
          new y.asn1.DERInteger({ int: this.e })
        ]
      }), i = new y.asn1.DERBitString({
        hex: "00" + e.getEncodedHex()
      }), s = new y.asn1.DERSequence({
        array: [t, i]
      });
      return s.getEncodedHex();
    }, n.prototype.getPublicBaseKeyB64 = function() {
      return Oe(this.getPublicBaseKey());
    }, n.wordwrap = function(t, e) {
      if (e = e || 64, !t)
        return t;
      var i = "(.{1," + e + `})( +|$
?)|(.{1,` + e + "})";
      return t.match(RegExp(i, "g")).join(`
`);
    }, n.prototype.getPrivateKey = function() {
      var t = `-----BEGIN RSA PRIVATE KEY-----
`;
      return t += n.wordwrap(this.getPrivateBaseKeyB64()) + `
`, t += "-----END RSA PRIVATE KEY-----", t;
    }, n.prototype.getPublicKey = function() {
      var t = `-----BEGIN PUBLIC KEY-----
`;
      return t += n.wordwrap(this.getPublicBaseKeyB64()) + `
`, t += "-----END PUBLIC KEY-----", t;
    }, n.hasPublicKeyProperty = function(t) {
      return t = t || {}, t.hasOwnProperty("n") && t.hasOwnProperty("e");
    }, n.hasPrivateKeyProperty = function(t) {
      return t = t || {}, t.hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff");
    }, n.prototype.parsePropertiesFrom = function(t) {
      this.n = t.n, this.e = t.e, t.hasOwnProperty("d") && (this.d = t.d, this.p = t.p, this.q = t.q, this.dmp1 = t.dmp1, this.dmq1 = t.dmq1, this.coeff = t.coeff);
    }, n;
  }(Ma)
), Je, qa = typeof process < "u" ? (Je = process.env) === null || Je === void 0 ? void 0 : Je.npm_package_version : void 0, ja = (
  /** @class */
  function() {
    function r(n) {
      n === void 0 && (n = {}), n = n || {}, this.default_key_size = n.default_key_size ? parseInt(n.default_key_size, 10) : 1024, this.default_public_exponent = n.default_public_exponent || "010001", this.log = n.log || !1, this.key = null;
    }
    return r.prototype.setKey = function(n) {
      this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new Yn(n);
    }, r.prototype.setPrivateKey = function(n) {
      this.setKey(n);
    }, r.prototype.setPublicKey = function(n) {
      this.setKey(n);
    }, r.prototype.decrypt = function(n) {
      try {
        return this.getKey().decrypt(zn(n));
      } catch {
        return !1;
      }
    }, r.prototype.encrypt = function(n) {
      try {
        return Oe(this.getKey().encrypt(n));
      } catch {
        return !1;
      }
    }, r.prototype.sign = function(n, t, e) {
      try {
        return Oe(this.getKey().sign(n, t, e));
      } catch {
        return !1;
      }
    }, r.prototype.verify = function(n, t, e) {
      try {
        return this.getKey().verify(n, zn(t), e);
      } catch {
        return !1;
      }
    }, r.prototype.getKey = function(n) {
      if (!this.key) {
        if (this.key = new Yn(), n && {}.toString.call(n) === "[object Function]") {
          this.key.generateAsync(this.default_key_size, this.default_public_exponent, n);
          return;
        }
        this.key.generate(this.default_key_size, this.default_public_exponent);
      }
      return this.key;
    }, r.prototype.getPrivateKey = function() {
      return this.getKey().getPrivateKey();
    }, r.prototype.getPrivateKeyB64 = function() {
      return this.getKey().getPrivateBaseKeyB64();
    }, r.prototype.getPublicKey = function() {
      return this.getKey().getPublicKey();
    }, r.prototype.getPublicKeyB64 = function() {
      return this.getKey().getPublicBaseKeyB64();
    }, r.version = qa, r;
  }()
);
function Vi(r, n) {
  return function() {
    return r.apply(n, arguments);
  };
}
const { toString: Ha } = Object.prototype, { getPrototypeOf: Mn } = Object, Ue = /* @__PURE__ */ ((r) => (n) => {
  const t = Ha.call(n);
  return r[t] || (r[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), mt = (r) => (r = r.toLowerCase(), (n) => Ue(n) === r), Le = (r) => (n) => typeof n === r, { isArray: Xt } = Array, re = Le("undefined");
function Ka(r) {
  return r !== null && !re(r) && r.constructor !== null && !re(r.constructor) && lt(r.constructor.isBuffer) && r.constructor.isBuffer(r);
}
const qi = mt("ArrayBuffer");
function Wa(r) {
  let n;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? n = ArrayBuffer.isView(r) : n = r && r.buffer && qi(r.buffer), n;
}
const za = Le("string"), lt = Le("function"), ji = Le("number"), Ve = (r) => r !== null && typeof r == "object", Xa = (r) => r === !0 || r === !1, we = (r) => {
  if (Ue(r) !== "object")
    return !1;
  const n = Mn(r);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in r) && !(Symbol.iterator in r);
}, Ga = mt("Date"), Ja = mt("File"), $a = mt("Blob"), Qa = mt("FileList"), Za = (r) => Ve(r) && lt(r.pipe), Ya = (r) => {
  let n;
  return r && (typeof FormData == "function" && r instanceof FormData || lt(r.append) && ((n = Ue(r)) === "formdata" || // detect form-data instance
  n === "object" && lt(r.toString) && r.toString() === "[object FormData]"));
}, to = mt("URLSearchParams"), [eo, no, io, ro] = ["ReadableStream", "Request", "Response", "Headers"].map(mt), so = (r) => r.trim ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ae(r, n, { allOwnKeys: t = !1 } = {}) {
  if (r === null || typeof r > "u")
    return;
  let e, i;
  if (typeof r != "object" && (r = [r]), Xt(r))
    for (e = 0, i = r.length; e < i; e++)
      n.call(null, r[e], e, r);
  else {
    const s = t ? Object.getOwnPropertyNames(r) : Object.keys(r), a = s.length;
    let c;
    for (e = 0; e < a; e++)
      c = s[e], n.call(null, r[c], c, r);
  }
}
function Hi(r, n) {
  n = n.toLowerCase();
  const t = Object.keys(r);
  let e = t.length, i;
  for (; e-- > 0; )
    if (i = t[e], n === i.toLowerCase())
      return i;
  return null;
}
const Ot = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Ki = (r) => !re(r) && r !== Ot;
function cn() {
  const { caseless: r } = Ki(this) && this || {}, n = {}, t = (e, i) => {
    const s = r && Hi(n, i) || i;
    we(n[s]) && we(e) ? n[s] = cn(n[s], e) : we(e) ? n[s] = cn({}, e) : Xt(e) ? n[s] = e.slice() : n[s] = e;
  };
  for (let e = 0, i = arguments.length; e < i; e++)
    arguments[e] && ae(arguments[e], t);
  return n;
}
const ao = (r, n, t, { allOwnKeys: e } = {}) => (ae(n, (i, s) => {
  t && lt(i) ? r[s] = Vi(i, t) : r[s] = i;
}, { allOwnKeys: e }), r), oo = (r) => (r.charCodeAt(0) === 65279 && (r = r.slice(1)), r), co = (r, n, t, e) => {
  r.prototype = Object.create(n.prototype, e), r.prototype.constructor = r, Object.defineProperty(r, "super", {
    value: n.prototype
  }), t && Object.assign(r.prototype, t);
}, lo = (r, n, t, e) => {
  let i, s, a;
  const c = {};
  if (n = n || {}, r == null) return n;
  do {
    for (i = Object.getOwnPropertyNames(r), s = i.length; s-- > 0; )
      a = i[s], (!e || e(a, r, n)) && !c[a] && (n[a] = r[a], c[a] = !0);
    r = t !== !1 && Mn(r);
  } while (r && (!t || t(r, n)) && r !== Object.prototype);
  return n;
}, ho = (r, n, t) => {
  r = String(r), (t === void 0 || t > r.length) && (t = r.length), t -= n.length;
  const e = r.indexOf(n, t);
  return e !== -1 && e === t;
}, uo = (r) => {
  if (!r) return null;
  if (Xt(r)) return r;
  let n = r.length;
  if (!ji(n)) return null;
  const t = new Array(n);
  for (; n-- > 0; )
    t[n] = r[n];
  return t;
}, po = /* @__PURE__ */ ((r) => (n) => r && n instanceof r)(typeof Uint8Array < "u" && Mn(Uint8Array)), fo = (r, n) => {
  const e = (r && r[Symbol.iterator]).call(r);
  let i;
  for (; (i = e.next()) && !i.done; ) {
    const s = i.value;
    n.call(r, s[0], s[1]);
  }
}, _o = (r, n) => {
  let t;
  const e = [];
  for (; (t = r.exec(n)) !== null; )
    e.push(t);
  return e;
}, go = mt("HTMLFormElement"), bo = (r) => r.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, e, i) {
    return e.toUpperCase() + i;
  }
), ti = (({ hasOwnProperty: r }) => (n, t) => r.call(n, t))(Object.prototype), mo = mt("RegExp"), Wi = (r, n) => {
  const t = Object.getOwnPropertyDescriptors(r), e = {};
  ae(t, (i, s) => {
    let a;
    (a = n(i, s, r)) !== !1 && (e[s] = a || i);
  }), Object.defineProperties(r, e);
}, yo = (r) => {
  Wi(r, (n, t) => {
    if (lt(r) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const e = r[t];
    if (lt(e)) {
      if (n.enumerable = !1, "writable" in n) {
        n.writable = !1;
        return;
      }
      n.set || (n.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, wo = (r, n) => {
  const t = {}, e = (i) => {
    i.forEach((s) => {
      t[s] = !0;
    });
  };
  return Xt(r) ? e(r) : e(String(r).split(n)), t;
}, vo = () => {
}, Po = (r, n) => r != null && Number.isFinite(r = +r) ? r : n, $e = "abcdefghijklmnopqrstuvwxyz", ei = "0123456789", zi = {
  DIGIT: ei,
  ALPHA: $e,
  ALPHA_DIGIT: $e + $e.toUpperCase() + ei
}, Eo = (r = 16, n = zi.ALPHA_DIGIT) => {
  let t = "";
  const { length: e } = n;
  for (; r--; )
    t += n[Math.random() * e | 0];
  return t;
};
function To(r) {
  return !!(r && lt(r.append) && r[Symbol.toStringTag] === "FormData" && r[Symbol.iterator]);
}
const Co = (r) => {
  const n = new Array(10), t = (e, i) => {
    if (Ve(e)) {
      if (n.indexOf(e) >= 0)
        return;
      if (!("toJSON" in e)) {
        n[i] = e;
        const s = Xt(e) ? [] : {};
        return ae(e, (a, c) => {
          const l = t(a, i + 1);
          !re(l) && (s[c] = l);
        }), n[i] = void 0, s;
      }
    }
    return e;
  };
  return t(r, 0);
}, So = mt("AsyncFunction"), ko = (r) => r && (Ve(r) || lt(r)) && lt(r.then) && lt(r.catch), Xi = ((r, n) => r ? setImmediate : n ? ((t, e) => (Ot.addEventListener("message", ({ source: i, data: s }) => {
  i === Ot && s === t && e.length && e.shift()();
}, !1), (i) => {
  e.push(i), Ot.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(
  typeof setImmediate == "function",
  lt(Ot.postMessage)
), xo = typeof queueMicrotask < "u" ? queueMicrotask.bind(Ot) : typeof process < "u" && process.nextTick || Xi, b = {
  isArray: Xt,
  isArrayBuffer: qi,
  isBuffer: Ka,
  isFormData: Ya,
  isArrayBufferView: Wa,
  isString: za,
  isNumber: ji,
  isBoolean: Xa,
  isObject: Ve,
  isPlainObject: we,
  isReadableStream: eo,
  isRequest: no,
  isResponse: io,
  isHeaders: ro,
  isUndefined: re,
  isDate: Ga,
  isFile: Ja,
  isBlob: $a,
  isRegExp: mo,
  isFunction: lt,
  isStream: Za,
  isURLSearchParams: to,
  isTypedArray: po,
  isFileList: Qa,
  forEach: ae,
  merge: cn,
  extend: ao,
  trim: so,
  stripBOM: oo,
  inherits: co,
  toFlatObject: lo,
  kindOf: Ue,
  kindOfTest: mt,
  endsWith: ho,
  toArray: uo,
  forEachEntry: fo,
  matchAll: _o,
  isHTMLForm: go,
  hasOwnProperty: ti,
  hasOwnProp: ti,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Wi,
  freezeMethods: yo,
  toObjectSet: wo,
  toCamelCase: bo,
  noop: vo,
  toFiniteNumber: Po,
  findKey: Hi,
  global: Ot,
  isContextDefined: Ki,
  ALPHABET: zi,
  generateString: Eo,
  isSpecCompliantForm: To,
  toJSONObject: Co,
  isAsyncFn: So,
  isThenable: ko,
  setImmediate: Xi,
  asap: xo
};
function x(r, n, t, e, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = r, this.name = "AxiosError", n && (this.code = n), t && (this.config = t), e && (this.request = e), i && (this.response = i, this.status = i.status ? i.status : null);
}
b.inherits(x, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: b.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Gi = x.prototype, Ji = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((r) => {
  Ji[r] = { value: r };
});
Object.defineProperties(x, Ji);
Object.defineProperty(Gi, "isAxiosError", { value: !0 });
x.from = (r, n, t, e, i, s) => {
  const a = Object.create(Gi);
  return b.toFlatObject(r, a, function(l) {
    return l !== Error.prototype;
  }, (c) => c !== "isAxiosError"), x.call(a, r.message, n, t, e, i), a.cause = r, a.name = r.name, s && Object.assign(a, s), a;
};
const Ao = null;
function ln(r) {
  return b.isPlainObject(r) || b.isArray(r);
}
function $i(r) {
  return b.endsWith(r, "[]") ? r.slice(0, -2) : r;
}
function ni(r, n, t) {
  return r ? r.concat(n).map(function(i, s) {
    return i = $i(i), !t && s ? "[" + i + "]" : i;
  }).join(t ? "." : "") : n;
}
function Do(r) {
  return b.isArray(r) && !r.some(ln);
}
const Ro = b.toFlatObject(b, {}, null, function(n) {
  return /^is[A-Z]/.test(n);
});
function qe(r, n, t) {
  if (!b.isObject(r))
    throw new TypeError("target must be an object");
  n = n || new FormData(), t = b.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(S, C) {
    return !b.isUndefined(C[S]);
  });
  const e = t.metaTokens, i = t.visitor || p, s = t.dots, a = t.indexes, l = (t.Blob || typeof Blob < "u" && Blob) && b.isSpecCompliantForm(n);
  if (!b.isFunction(i))
    throw new TypeError("visitor must be a function");
  function h(v) {
    if (v === null) return "";
    if (b.isDate(v))
      return v.toISOString();
    if (!l && b.isBlob(v))
      throw new x("Blob is not supported. Use a Buffer instead.");
    return b.isArrayBuffer(v) || b.isTypedArray(v) ? l && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v;
  }
  function p(v, S, C) {
    let L = v;
    if (v && !C && typeof v == "object") {
      if (b.endsWith(S, "{}"))
        S = e ? S : S.slice(0, -2), v = JSON.stringify(v);
      else if (b.isArray(v) && Do(v) || (b.isFileList(v) || b.endsWith(S, "[]")) && (L = b.toArray(v)))
        return S = $i(S), L.forEach(function(V, nt) {
          !(b.isUndefined(V) || V === null) && n.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? ni([S], nt, s) : a === null ? S : S + "[]",
            h(V)
          );
        }), !1;
    }
    return ln(v) ? !0 : (n.append(ni(C, S, s), h(v)), !1);
  }
  const _ = [], m = Object.assign(Ro, {
    defaultVisitor: p,
    convertValue: h,
    isVisitable: ln
  });
  function P(v, S) {
    if (!b.isUndefined(v)) {
      if (_.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + S.join("."));
      _.push(v), b.forEach(v, function(L, U) {
        (!(b.isUndefined(L) || L === null) && i.call(
          n,
          L,
          b.isString(U) ? U.trim() : U,
          S,
          m
        )) === !0 && P(L, S ? S.concat(U) : [U]);
      }), _.pop();
    }
  }
  if (!b.isObject(r))
    throw new TypeError("data must be an object");
  return P(r), n;
}
function ii(r) {
  const n = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(r).replace(/[!'()~]|%20|%00/g, function(e) {
    return n[e];
  });
}
function Fn(r, n) {
  this._pairs = [], r && qe(r, this, n);
}
const Qi = Fn.prototype;
Qi.append = function(n, t) {
  this._pairs.push([n, t]);
};
Qi.toString = function(n) {
  const t = n ? function(e) {
    return n.call(this, e, ii);
  } : ii;
  return this._pairs.map(function(i) {
    return t(i[0]) + "=" + t(i[1]);
  }, "").join("&");
};
function Io(r) {
  return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function Zi(r, n, t) {
  if (!n)
    return r;
  const e = t && t.encode || Io;
  b.isFunction(t) && (t = {
    serialize: t
  });
  const i = t && t.serialize;
  let s;
  if (i ? s = i(n, t) : s = b.isURLSearchParams(n) ? n.toString() : new Fn(n, t).toString(e), s) {
    const a = r.indexOf("#");
    a !== -1 && (r = r.slice(0, a)), r += (r.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return r;
}
class ri {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(n, t, e) {
    return this.handlers.push({
      fulfilled: n,
      rejected: t,
      synchronous: e ? e.synchronous : !1,
      runWhen: e ? e.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(n) {
    this.handlers[n] && (this.handlers[n] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(n) {
    b.forEach(this.handlers, function(e) {
      e !== null && n(e);
    });
  }
}
const Yi = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Oo = typeof URLSearchParams < "u" ? URLSearchParams : Fn, Bo = typeof FormData < "u" ? FormData : null, No = typeof Blob < "u" ? Blob : null, Mo = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Oo,
    FormData: Bo,
    Blob: No
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Un = typeof window < "u" && typeof document < "u", hn = typeof navigator == "object" && navigator || void 0, Fo = Un && (!hn || ["ReactNative", "NativeScript", "NS"].indexOf(hn.product) < 0), Uo = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Lo = Un && window.location.href || "http://localhost", Vo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Un,
  hasStandardBrowserEnv: Fo,
  hasStandardBrowserWebWorkerEnv: Uo,
  navigator: hn,
  origin: Lo
}, Symbol.toStringTag, { value: "Module" })), tt = {
  ...Vo,
  ...Mo
};
function qo(r, n) {
  return qe(r, new tt.classes.URLSearchParams(), Object.assign({
    visitor: function(t, e, i, s) {
      return tt.isNode && b.isBuffer(t) ? (this.append(e, t.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, n));
}
function jo(r) {
  return b.matchAll(/\w+|\[(\w*)]/g, r).map((n) => n[0] === "[]" ? "" : n[1] || n[0]);
}
function Ho(r) {
  const n = {}, t = Object.keys(r);
  let e;
  const i = t.length;
  let s;
  for (e = 0; e < i; e++)
    s = t[e], n[s] = r[s];
  return n;
}
function tr(r) {
  function n(t, e, i, s) {
    let a = t[s++];
    if (a === "__proto__") return !0;
    const c = Number.isFinite(+a), l = s >= t.length;
    return a = !a && b.isArray(i) ? i.length : a, l ? (b.hasOwnProp(i, a) ? i[a] = [i[a], e] : i[a] = e, !c) : ((!i[a] || !b.isObject(i[a])) && (i[a] = []), n(t, e, i[a], s) && b.isArray(i[a]) && (i[a] = Ho(i[a])), !c);
  }
  if (b.isFormData(r) && b.isFunction(r.entries)) {
    const t = {};
    return b.forEachEntry(r, (e, i) => {
      n(jo(e), i, t, 0);
    }), t;
  }
  return null;
}
function Ko(r, n, t) {
  if (b.isString(r))
    try {
      return (n || JSON.parse)(r), b.trim(r);
    } catch (e) {
      if (e.name !== "SyntaxError")
        throw e;
    }
  return (0, JSON.stringify)(r);
}
const oe = {
  transitional: Yi,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(n, t) {
    const e = t.getContentType() || "", i = e.indexOf("application/json") > -1, s = b.isObject(n);
    if (s && b.isHTMLForm(n) && (n = new FormData(n)), b.isFormData(n))
      return i ? JSON.stringify(tr(n)) : n;
    if (b.isArrayBuffer(n) || b.isBuffer(n) || b.isStream(n) || b.isFile(n) || b.isBlob(n) || b.isReadableStream(n))
      return n;
    if (b.isArrayBufferView(n))
      return n.buffer;
    if (b.isURLSearchParams(n))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), n.toString();
    let c;
    if (s) {
      if (e.indexOf("application/x-www-form-urlencoded") > -1)
        return qo(n, this.formSerializer).toString();
      if ((c = b.isFileList(n)) || e.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return qe(
          c ? { "files[]": n } : n,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return s || i ? (t.setContentType("application/json", !1), Ko(n)) : n;
  }],
  transformResponse: [function(n) {
    const t = this.transitional || oe.transitional, e = t && t.forcedJSONParsing, i = this.responseType === "json";
    if (b.isResponse(n) || b.isReadableStream(n))
      return n;
    if (n && b.isString(n) && (e && !this.responseType || i)) {
      const a = !(t && t.silentJSONParsing) && i;
      try {
        return JSON.parse(n);
      } catch (c) {
        if (a)
          throw c.name === "SyntaxError" ? x.from(c, x.ERR_BAD_RESPONSE, this, null, this.response) : c;
      }
    }
    return n;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: tt.classes.FormData,
    Blob: tt.classes.Blob
  },
  validateStatus: function(n) {
    return n >= 200 && n < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
b.forEach(["delete", "get", "head", "post", "put", "patch"], (r) => {
  oe.headers[r] = {};
});
const Wo = b.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), zo = (r) => {
  const n = {};
  let t, e, i;
  return r && r.split(`
`).forEach(function(a) {
    i = a.indexOf(":"), t = a.substring(0, i).trim().toLowerCase(), e = a.substring(i + 1).trim(), !(!t || n[t] && Wo[t]) && (t === "set-cookie" ? n[t] ? n[t].push(e) : n[t] = [e] : n[t] = n[t] ? n[t] + ", " + e : e);
  }), n;
}, si = Symbol("internals");
function Jt(r) {
  return r && String(r).trim().toLowerCase();
}
function ve(r) {
  return r === !1 || r == null ? r : b.isArray(r) ? r.map(ve) : String(r);
}
function Xo(r) {
  const n = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let e;
  for (; e = t.exec(r); )
    n[e[1]] = e[2];
  return n;
}
const Go = (r) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r.trim());
function Qe(r, n, t, e, i) {
  if (b.isFunction(e))
    return e.call(this, n, t);
  if (i && (n = t), !!b.isString(n)) {
    if (b.isString(e))
      return n.indexOf(e) !== -1;
    if (b.isRegExp(e))
      return e.test(n);
  }
}
function Jo(r) {
  return r.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (n, t, e) => t.toUpperCase() + e);
}
function $o(r, n) {
  const t = b.toCamelCase(" " + n);
  ["get", "set", "has"].forEach((e) => {
    Object.defineProperty(r, e + t, {
      value: function(i, s, a) {
        return this[e].call(this, n, i, s, a);
      },
      configurable: !0
    });
  });
}
class at {
  constructor(n) {
    n && this.set(n);
  }
  set(n, t, e) {
    const i = this;
    function s(c, l, h) {
      const p = Jt(l);
      if (!p)
        throw new Error("header name must be a non-empty string");
      const _ = b.findKey(i, p);
      (!_ || i[_] === void 0 || h === !0 || h === void 0 && i[_] !== !1) && (i[_ || l] = ve(c));
    }
    const a = (c, l) => b.forEach(c, (h, p) => s(h, p, l));
    if (b.isPlainObject(n) || n instanceof this.constructor)
      a(n, t);
    else if (b.isString(n) && (n = n.trim()) && !Go(n))
      a(zo(n), t);
    else if (b.isHeaders(n))
      for (const [c, l] of n.entries())
        s(l, c, e);
    else
      n != null && s(t, n, e);
    return this;
  }
  get(n, t) {
    if (n = Jt(n), n) {
      const e = b.findKey(this, n);
      if (e) {
        const i = this[e];
        if (!t)
          return i;
        if (t === !0)
          return Xo(i);
        if (b.isFunction(t))
          return t.call(this, i, e);
        if (b.isRegExp(t))
          return t.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(n, t) {
    if (n = Jt(n), n) {
      const e = b.findKey(this, n);
      return !!(e && this[e] !== void 0 && (!t || Qe(this, this[e], e, t)));
    }
    return !1;
  }
  delete(n, t) {
    const e = this;
    let i = !1;
    function s(a) {
      if (a = Jt(a), a) {
        const c = b.findKey(e, a);
        c && (!t || Qe(e, e[c], c, t)) && (delete e[c], i = !0);
      }
    }
    return b.isArray(n) ? n.forEach(s) : s(n), i;
  }
  clear(n) {
    const t = Object.keys(this);
    let e = t.length, i = !1;
    for (; e--; ) {
      const s = t[e];
      (!n || Qe(this, this[s], s, n, !0)) && (delete this[s], i = !0);
    }
    return i;
  }
  normalize(n) {
    const t = this, e = {};
    return b.forEach(this, (i, s) => {
      const a = b.findKey(e, s);
      if (a) {
        t[a] = ve(i), delete t[s];
        return;
      }
      const c = n ? Jo(s) : String(s).trim();
      c !== s && delete t[s], t[c] = ve(i), e[c] = !0;
    }), this;
  }
  concat(...n) {
    return this.constructor.concat(this, ...n);
  }
  toJSON(n) {
    const t = /* @__PURE__ */ Object.create(null);
    return b.forEach(this, (e, i) => {
      e != null && e !== !1 && (t[i] = n && b.isArray(e) ? e.join(", ") : e);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([n, t]) => n + ": " + t).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(n) {
    return n instanceof this ? n : new this(n);
  }
  static concat(n, ...t) {
    const e = new this(n);
    return t.forEach((i) => e.set(i)), e;
  }
  static accessor(n) {
    const e = (this[si] = this[si] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function s(a) {
      const c = Jt(a);
      e[c] || ($o(i, a), e[c] = !0);
    }
    return b.isArray(n) ? n.forEach(s) : s(n), this;
  }
}
at.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
b.reduceDescriptors(at.prototype, ({ value: r }, n) => {
  let t = n[0].toUpperCase() + n.slice(1);
  return {
    get: () => r,
    set(e) {
      this[t] = e;
    }
  };
});
b.freezeMethods(at);
function Ze(r, n) {
  const t = this || oe, e = n || t, i = at.from(e.headers);
  let s = e.data;
  return b.forEach(r, function(c) {
    s = c.call(t, s, i.normalize(), n ? n.status : void 0);
  }), i.normalize(), s;
}
function er(r) {
  return !!(r && r.__CANCEL__);
}
function Gt(r, n, t) {
  x.call(this, r ?? "canceled", x.ERR_CANCELED, n, t), this.name = "CanceledError";
}
b.inherits(Gt, x, {
  __CANCEL__: !0
});
function nr(r, n, t) {
  const e = t.config.validateStatus;
  !t.status || !e || e(t.status) ? r(t) : n(new x(
    "Request failed with status code " + t.status,
    [x.ERR_BAD_REQUEST, x.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
function Qo(r) {
  const n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(r);
  return n && n[1] || "";
}
function Zo(r, n) {
  r = r || 10;
  const t = new Array(r), e = new Array(r);
  let i = 0, s = 0, a;
  return n = n !== void 0 ? n : 1e3, function(l) {
    const h = Date.now(), p = e[s];
    a || (a = h), t[i] = l, e[i] = h;
    let _ = s, m = 0;
    for (; _ !== i; )
      m += t[_++], _ = _ % r;
    if (i = (i + 1) % r, i === s && (s = (s + 1) % r), h - a < n)
      return;
    const P = p && h - p;
    return P ? Math.round(m * 1e3 / P) : void 0;
  };
}
function Yo(r, n) {
  let t = 0, e = 1e3 / n, i, s;
  const a = (h, p = Date.now()) => {
    t = p, i = null, s && (clearTimeout(s), s = null), r.apply(null, h);
  };
  return [(...h) => {
    const p = Date.now(), _ = p - t;
    _ >= e ? a(h, p) : (i = h, s || (s = setTimeout(() => {
      s = null, a(i);
    }, e - _)));
  }, () => i && a(i)];
}
const Be = (r, n, t = 3) => {
  let e = 0;
  const i = Zo(50, 250);
  return Yo((s) => {
    const a = s.loaded, c = s.lengthComputable ? s.total : void 0, l = a - e, h = i(l), p = a <= c;
    e = a;
    const _ = {
      loaded: a,
      total: c,
      progress: c ? a / c : void 0,
      bytes: l,
      rate: h || void 0,
      estimated: h && c && p ? (c - a) / h : void 0,
      event: s,
      lengthComputable: c != null,
      [n ? "download" : "upload"]: !0
    };
    r(_);
  }, t);
}, ai = (r, n) => {
  const t = r != null;
  return [(e) => n[0]({
    lengthComputable: t,
    total: r,
    loaded: e
  }), n[1]];
}, oi = (r) => (...n) => b.asap(() => r(...n)), tc = tt.hasStandardBrowserEnv ? /* @__PURE__ */ ((r, n) => (t) => (t = new URL(t, tt.origin), r.protocol === t.protocol && r.host === t.host && (n || r.port === t.port)))(
  new URL(tt.origin),
  tt.navigator && /(msie|trident)/i.test(tt.navigator.userAgent)
) : () => !0, ec = tt.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(r, n, t, e, i, s) {
      const a = [r + "=" + encodeURIComponent(n)];
      b.isNumber(t) && a.push("expires=" + new Date(t).toGMTString()), b.isString(e) && a.push("path=" + e), b.isString(i) && a.push("domain=" + i), s === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read(r) {
      const n = document.cookie.match(new RegExp("(^|;\\s*)(" + r + ")=([^;]*)"));
      return n ? decodeURIComponent(n[3]) : null;
    },
    remove(r) {
      this.write(r, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function nc(r) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r);
}
function ic(r, n) {
  return n ? r.replace(/\/?\/$/, "") + "/" + n.replace(/^\/+/, "") : r;
}
function ir(r, n) {
  return r && !nc(n) ? ic(r, n) : n;
}
const ci = (r) => r instanceof at ? { ...r } : r;
function Mt(r, n) {
  n = n || {};
  const t = {};
  function e(h, p, _, m) {
    return b.isPlainObject(h) && b.isPlainObject(p) ? b.merge.call({ caseless: m }, h, p) : b.isPlainObject(p) ? b.merge({}, p) : b.isArray(p) ? p.slice() : p;
  }
  function i(h, p, _, m) {
    if (b.isUndefined(p)) {
      if (!b.isUndefined(h))
        return e(void 0, h, _, m);
    } else return e(h, p, _, m);
  }
  function s(h, p) {
    if (!b.isUndefined(p))
      return e(void 0, p);
  }
  function a(h, p) {
    if (b.isUndefined(p)) {
      if (!b.isUndefined(h))
        return e(void 0, h);
    } else return e(void 0, p);
  }
  function c(h, p, _) {
    if (_ in n)
      return e(h, p);
    if (_ in r)
      return e(void 0, h);
  }
  const l = {
    url: s,
    method: s,
    data: s,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: c,
    headers: (h, p, _) => i(ci(h), ci(p), _, !0)
  };
  return b.forEach(Object.keys(Object.assign({}, r, n)), function(p) {
    const _ = l[p] || i, m = _(r[p], n[p], p);
    b.isUndefined(m) && _ !== c || (t[p] = m);
  }), t;
}
const rr = (r) => {
  const n = Mt({}, r);
  let { data: t, withXSRFToken: e, xsrfHeaderName: i, xsrfCookieName: s, headers: a, auth: c } = n;
  n.headers = a = at.from(a), n.url = Zi(ir(n.baseURL, n.url), r.params, r.paramsSerializer), c && a.set(
    "Authorization",
    "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))
  );
  let l;
  if (b.isFormData(t)) {
    if (tt.hasStandardBrowserEnv || tt.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if ((l = a.getContentType()) !== !1) {
      const [h, ...p] = l ? l.split(";").map((_) => _.trim()).filter(Boolean) : [];
      a.setContentType([h || "multipart/form-data", ...p].join("; "));
    }
  }
  if (tt.hasStandardBrowserEnv && (e && b.isFunction(e) && (e = e(n)), e || e !== !1 && tc(n.url))) {
    const h = i && s && ec.read(s);
    h && a.set(i, h);
  }
  return n;
}, rc = typeof XMLHttpRequest < "u", sc = rc && function(r) {
  return new Promise(function(t, e) {
    const i = rr(r);
    let s = i.data;
    const a = at.from(i.headers).normalize();
    let { responseType: c, onUploadProgress: l, onDownloadProgress: h } = i, p, _, m, P, v;
    function S() {
      P && P(), v && v(), i.cancelToken && i.cancelToken.unsubscribe(p), i.signal && i.signal.removeEventListener("abort", p);
    }
    let C = new XMLHttpRequest();
    C.open(i.method.toUpperCase(), i.url, !0), C.timeout = i.timeout;
    function L() {
      if (!C)
        return;
      const V = at.from(
        "getAllResponseHeaders" in C && C.getAllResponseHeaders()
      ), G = {
        data: !c || c === "text" || c === "json" ? C.responseText : C.response,
        status: C.status,
        statusText: C.statusText,
        headers: V,
        config: r,
        request: C
      };
      nr(function(ot) {
        t(ot), S();
      }, function(ot) {
        e(ot), S();
      }, G), C = null;
    }
    "onloadend" in C ? C.onloadend = L : C.onreadystatechange = function() {
      !C || C.readyState !== 4 || C.status === 0 && !(C.responseURL && C.responseURL.indexOf("file:") === 0) || setTimeout(L);
    }, C.onabort = function() {
      C && (e(new x("Request aborted", x.ECONNABORTED, r, C)), C = null);
    }, C.onerror = function() {
      e(new x("Network Error", x.ERR_NETWORK, r, C)), C = null;
    }, C.ontimeout = function() {
      let nt = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const G = i.transitional || Yi;
      i.timeoutErrorMessage && (nt = i.timeoutErrorMessage), e(new x(
        nt,
        G.clarifyTimeoutError ? x.ETIMEDOUT : x.ECONNABORTED,
        r,
        C
      )), C = null;
    }, s === void 0 && a.setContentType(null), "setRequestHeader" in C && b.forEach(a.toJSON(), function(nt, G) {
      C.setRequestHeader(G, nt);
    }), b.isUndefined(i.withCredentials) || (C.withCredentials = !!i.withCredentials), c && c !== "json" && (C.responseType = i.responseType), h && ([m, v] = Be(h, !0), C.addEventListener("progress", m)), l && C.upload && ([_, P] = Be(l), C.upload.addEventListener("progress", _), C.upload.addEventListener("loadend", P)), (i.cancelToken || i.signal) && (p = (V) => {
      C && (e(!V || V.type ? new Gt(null, r, C) : V), C.abort(), C = null);
    }, i.cancelToken && i.cancelToken.subscribe(p), i.signal && (i.signal.aborted ? p() : i.signal.addEventListener("abort", p)));
    const U = Qo(i.url);
    if (U && tt.protocols.indexOf(U) === -1) {
      e(new x("Unsupported protocol " + U + ":", x.ERR_BAD_REQUEST, r));
      return;
    }
    C.send(s || null);
  });
}, ac = (r, n) => {
  const { length: t } = r = r ? r.filter(Boolean) : [];
  if (n || t) {
    let e = new AbortController(), i;
    const s = function(h) {
      if (!i) {
        i = !0, c();
        const p = h instanceof Error ? h : this.reason;
        e.abort(p instanceof x ? p : new Gt(p instanceof Error ? p.message : p));
      }
    };
    let a = n && setTimeout(() => {
      a = null, s(new x(`timeout ${n} of ms exceeded`, x.ETIMEDOUT));
    }, n);
    const c = () => {
      r && (a && clearTimeout(a), a = null, r.forEach((h) => {
        h.unsubscribe ? h.unsubscribe(s) : h.removeEventListener("abort", s);
      }), r = null);
    };
    r.forEach((h) => h.addEventListener("abort", s));
    const { signal: l } = e;
    return l.unsubscribe = () => b.asap(c), l;
  }
}, oc = function* (r, n) {
  let t = r.byteLength;
  if (t < n) {
    yield r;
    return;
  }
  let e = 0, i;
  for (; e < t; )
    i = e + n, yield r.slice(e, i), e = i;
}, cc = async function* (r, n) {
  for await (const t of lc(r))
    yield* oc(t, n);
}, lc = async function* (r) {
  if (r[Symbol.asyncIterator]) {
    yield* r;
    return;
  }
  const n = r.getReader();
  try {
    for (; ; ) {
      const { done: t, value: e } = await n.read();
      if (t)
        break;
      yield e;
    }
  } finally {
    await n.cancel();
  }
}, li = (r, n, t, e) => {
  const i = cc(r, n);
  let s = 0, a, c = (l) => {
    a || (a = !0, e && e(l));
  };
  return new ReadableStream({
    async pull(l) {
      try {
        const { done: h, value: p } = await i.next();
        if (h) {
          c(), l.close();
          return;
        }
        let _ = p.byteLength;
        if (t) {
          let m = s += _;
          t(m);
        }
        l.enqueue(new Uint8Array(p));
      } catch (h) {
        throw c(h), h;
      }
    },
    cancel(l) {
      return c(l), i.return();
    }
  }, {
    highWaterMark: 2
  });
}, je = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", sr = je && typeof ReadableStream == "function", hc = je && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((r) => (n) => r.encode(n))(new TextEncoder()) : async (r) => new Uint8Array(await new Response(r).arrayBuffer())), ar = (r, ...n) => {
  try {
    return !!r(...n);
  } catch {
    return !1;
  }
}, uc = sr && ar(() => {
  let r = !1;
  const n = new Request(tt.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return r = !0, "half";
    }
  }).headers.has("Content-Type");
  return r && !n;
}), hi = 64 * 1024, un = sr && ar(() => b.isReadableStream(new Response("").body)), Ne = {
  stream: un && ((r) => r.body)
};
je && ((r) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((n) => {
    !Ne[n] && (Ne[n] = b.isFunction(r[n]) ? (t) => t[n]() : (t, e) => {
      throw new x(`Response type '${n}' is not supported`, x.ERR_NOT_SUPPORT, e);
    });
  });
})(new Response());
const dc = async (r) => {
  if (r == null)
    return 0;
  if (b.isBlob(r))
    return r.size;
  if (b.isSpecCompliantForm(r))
    return (await new Request(tt.origin, {
      method: "POST",
      body: r
    }).arrayBuffer()).byteLength;
  if (b.isArrayBufferView(r) || b.isArrayBuffer(r))
    return r.byteLength;
  if (b.isURLSearchParams(r) && (r = r + ""), b.isString(r))
    return (await hc(r)).byteLength;
}, pc = async (r, n) => {
  const t = b.toFiniteNumber(r.getContentLength());
  return t ?? dc(n);
}, fc = je && (async (r) => {
  let {
    url: n,
    method: t,
    data: e,
    signal: i,
    cancelToken: s,
    timeout: a,
    onDownloadProgress: c,
    onUploadProgress: l,
    responseType: h,
    headers: p,
    withCredentials: _ = "same-origin",
    fetchOptions: m
  } = rr(r);
  h = h ? (h + "").toLowerCase() : "text";
  let P = ac([i, s && s.toAbortSignal()], a), v;
  const S = P && P.unsubscribe && (() => {
    P.unsubscribe();
  });
  let C;
  try {
    if (l && uc && t !== "get" && t !== "head" && (C = await pc(p, e)) !== 0) {
      let G = new Request(n, {
        method: "POST",
        body: e,
        duplex: "half"
      }), k;
      if (b.isFormData(e) && (k = G.headers.get("content-type")) && p.setContentType(k), G.body) {
        const [ot, yt] = ai(
          C,
          Be(oi(l))
        );
        e = li(G.body, hi, ot, yt);
      }
    }
    b.isString(_) || (_ = _ ? "include" : "omit");
    const L = "credentials" in Request.prototype;
    v = new Request(n, {
      ...m,
      signal: P,
      method: t.toUpperCase(),
      headers: p.normalize().toJSON(),
      body: e,
      duplex: "half",
      credentials: L ? _ : void 0
    });
    let U = await fetch(v);
    const V = un && (h === "stream" || h === "response");
    if (un && (c || V && S)) {
      const G = {};
      ["status", "statusText", "headers"].forEach((wt) => {
        G[wt] = U[wt];
      });
      const k = b.toFiniteNumber(U.headers.get("content-length")), [ot, yt] = c && ai(
        k,
        Be(oi(c), !0)
      ) || [];
      U = new Response(
        li(U.body, hi, ot, () => {
          yt && yt(), S && S();
        }),
        G
      );
    }
    h = h || "text";
    let nt = await Ne[b.findKey(Ne, h) || "text"](U, r);
    return !V && S && S(), await new Promise((G, k) => {
      nr(G, k, {
        data: nt,
        headers: at.from(U.headers),
        status: U.status,
        statusText: U.statusText,
        config: r,
        request: v
      });
    });
  } catch (L) {
    throw S && S(), L && L.name === "TypeError" && /fetch/i.test(L.message) ? Object.assign(
      new x("Network Error", x.ERR_NETWORK, r, v),
      {
        cause: L.cause || L
      }
    ) : x.from(L, L && L.code, r, v);
  }
}), dn = {
  http: Ao,
  xhr: sc,
  fetch: fc
};
b.forEach(dn, (r, n) => {
  if (r) {
    try {
      Object.defineProperty(r, "name", { value: n });
    } catch {
    }
    Object.defineProperty(r, "adapterName", { value: n });
  }
});
const ui = (r) => `- ${r}`, _c = (r) => b.isFunction(r) || r === null || r === !1, or = {
  getAdapter: (r) => {
    r = b.isArray(r) ? r : [r];
    const { length: n } = r;
    let t, e;
    const i = {};
    for (let s = 0; s < n; s++) {
      t = r[s];
      let a;
      if (e = t, !_c(t) && (e = dn[(a = String(t)).toLowerCase()], e === void 0))
        throw new x(`Unknown adapter '${a}'`);
      if (e)
        break;
      i[a || "#" + s] = e;
    }
    if (!e) {
      const s = Object.entries(i).map(
        ([c, l]) => `adapter ${c} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = n ? s.length > 1 ? `since :
` + s.map(ui).join(`
`) : " " + ui(s[0]) : "as no adapter specified";
      throw new x(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return e;
  },
  adapters: dn
};
function Ye(r) {
  if (r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted)
    throw new Gt(null, r);
}
function di(r) {
  return Ye(r), r.headers = at.from(r.headers), r.data = Ze.call(
    r,
    r.transformRequest
  ), ["post", "put", "patch"].indexOf(r.method) !== -1 && r.headers.setContentType("application/x-www-form-urlencoded", !1), or.getAdapter(r.adapter || oe.adapter)(r).then(function(e) {
    return Ye(r), e.data = Ze.call(
      r,
      r.transformResponse,
      e
    ), e.headers = at.from(e.headers), e;
  }, function(e) {
    return er(e) || (Ye(r), e && e.response && (e.response.data = Ze.call(
      r,
      r.transformResponse,
      e.response
    ), e.response.headers = at.from(e.response.headers))), Promise.reject(e);
  });
}
const cr = "1.7.9", He = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((r, n) => {
  He[r] = function(e) {
    return typeof e === r || "a" + (n < 1 ? "n " : " ") + r;
  };
});
const pi = {};
He.transitional = function(n, t, e) {
  function i(s, a) {
    return "[Axios v" + cr + "] Transitional option '" + s + "'" + a + (e ? ". " + e : "");
  }
  return (s, a, c) => {
    if (n === !1)
      throw new x(
        i(a, " has been removed" + (t ? " in " + t : "")),
        x.ERR_DEPRECATED
      );
    return t && !pi[a] && (pi[a] = !0, console.warn(
      i(
        a,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), n ? n(s, a, c) : !0;
  };
};
He.spelling = function(n) {
  return (t, e) => (console.warn(`${e} is likely a misspelling of ${n}`), !0);
};
function gc(r, n, t) {
  if (typeof r != "object")
    throw new x("options must be an object", x.ERR_BAD_OPTION_VALUE);
  const e = Object.keys(r);
  let i = e.length;
  for (; i-- > 0; ) {
    const s = e[i], a = n[s];
    if (a) {
      const c = r[s], l = c === void 0 || a(c, s, r);
      if (l !== !0)
        throw new x("option " + s + " must be " + l, x.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new x("Unknown option " + s, x.ERR_BAD_OPTION);
  }
}
const Pe = {
  assertOptions: gc,
  validators: He
}, vt = Pe.validators;
class Nt {
  constructor(n) {
    this.defaults = n, this.interceptors = {
      request: new ri(),
      response: new ri()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(n, t) {
    try {
      return await this._request(n, t);
    } catch (e) {
      if (e instanceof Error) {
        let i = {};
        Error.captureStackTrace ? Error.captureStackTrace(i) : i = new Error();
        const s = i.stack ? i.stack.replace(/^.+\n/, "") : "";
        try {
          e.stack ? s && !String(e.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (e.stack += `
` + s) : e.stack = s;
        } catch {
        }
      }
      throw e;
    }
  }
  _request(n, t) {
    typeof n == "string" ? (t = t || {}, t.url = n) : t = n || {}, t = Mt(this.defaults, t);
    const { transitional: e, paramsSerializer: i, headers: s } = t;
    e !== void 0 && Pe.assertOptions(e, {
      silentJSONParsing: vt.transitional(vt.boolean),
      forcedJSONParsing: vt.transitional(vt.boolean),
      clarifyTimeoutError: vt.transitional(vt.boolean)
    }, !1), i != null && (b.isFunction(i) ? t.paramsSerializer = {
      serialize: i
    } : Pe.assertOptions(i, {
      encode: vt.function,
      serialize: vt.function
    }, !0)), Pe.assertOptions(t, {
      baseUrl: vt.spelling("baseURL"),
      withXsrfToken: vt.spelling("withXSRFToken")
    }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let a = s && b.merge(
      s.common,
      s[t.method]
    );
    s && b.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (v) => {
        delete s[v];
      }
    ), t.headers = at.concat(a, s);
    const c = [];
    let l = !0;
    this.interceptors.request.forEach(function(S) {
      typeof S.runWhen == "function" && S.runWhen(t) === !1 || (l = l && S.synchronous, c.unshift(S.fulfilled, S.rejected));
    });
    const h = [];
    this.interceptors.response.forEach(function(S) {
      h.push(S.fulfilled, S.rejected);
    });
    let p, _ = 0, m;
    if (!l) {
      const v = [di.bind(this), void 0];
      for (v.unshift.apply(v, c), v.push.apply(v, h), m = v.length, p = Promise.resolve(t); _ < m; )
        p = p.then(v[_++], v[_++]);
      return p;
    }
    m = c.length;
    let P = t;
    for (_ = 0; _ < m; ) {
      const v = c[_++], S = c[_++];
      try {
        P = v(P);
      } catch (C) {
        S.call(this, C);
        break;
      }
    }
    try {
      p = di.call(this, P);
    } catch (v) {
      return Promise.reject(v);
    }
    for (_ = 0, m = h.length; _ < m; )
      p = p.then(h[_++], h[_++]);
    return p;
  }
  getUri(n) {
    n = Mt(this.defaults, n);
    const t = ir(n.baseURL, n.url);
    return Zi(t, n.params, n.paramsSerializer);
  }
}
b.forEach(["delete", "get", "head", "options"], function(n) {
  Nt.prototype[n] = function(t, e) {
    return this.request(Mt(e || {}, {
      method: n,
      url: t,
      data: (e || {}).data
    }));
  };
});
b.forEach(["post", "put", "patch"], function(n) {
  function t(e) {
    return function(s, a, c) {
      return this.request(Mt(c || {}, {
        method: n,
        headers: e ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: a
      }));
    };
  }
  Nt.prototype[n] = t(), Nt.prototype[n + "Form"] = t(!0);
});
class Ln {
  constructor(n) {
    if (typeof n != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(s) {
      t = s;
    });
    const e = this;
    this.promise.then((i) => {
      if (!e._listeners) return;
      let s = e._listeners.length;
      for (; s-- > 0; )
        e._listeners[s](i);
      e._listeners = null;
    }), this.promise.then = (i) => {
      let s;
      const a = new Promise((c) => {
        e.subscribe(c), s = c;
      }).then(i);
      return a.cancel = function() {
        e.unsubscribe(s);
      }, a;
    }, n(function(s, a, c) {
      e.reason || (e.reason = new Gt(s, a, c), t(e.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(n) {
    if (this.reason) {
      n(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(n) : this._listeners = [n];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(n) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(n);
    t !== -1 && this._listeners.splice(t, 1);
  }
  toAbortSignal() {
    const n = new AbortController(), t = (e) => {
      n.abort(e);
    };
    return this.subscribe(t), n.signal.unsubscribe = () => this.unsubscribe(t), n.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let n;
    return {
      token: new Ln(function(i) {
        n = i;
      }),
      cancel: n
    };
  }
}
function bc(r) {
  return function(t) {
    return r.apply(null, t);
  };
}
function mc(r) {
  return b.isObject(r) && r.isAxiosError === !0;
}
const pn = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(pn).forEach(([r, n]) => {
  pn[n] = r;
});
function lr(r) {
  const n = new Nt(r), t = Vi(Nt.prototype.request, n);
  return b.extend(t, Nt.prototype, n, { allOwnKeys: !0 }), b.extend(t, n, null, { allOwnKeys: !0 }), t.create = function(i) {
    return lr(Mt(r, i));
  }, t;
}
const q = lr(oe);
q.Axios = Nt;
q.CanceledError = Gt;
q.CancelToken = Ln;
q.isCancel = er;
q.VERSION = cr;
q.toFormData = qe;
q.AxiosError = x;
q.Cancel = q.CanceledError;
q.all = function(n) {
  return Promise.all(n);
};
q.spread = bc;
q.isAxiosError = mc;
q.mergeConfig = Mt;
q.AxiosHeaders = at;
q.formToJSON = (r) => tr(b.isHTMLForm(r) ? new FormData(r) : r);
q.getAdapter = or.getAdapter;
q.HttpStatusCode = pn;
q.default = q;
var f, hr, ur, dr, fn, pr, fr, _r, gr, br, mr, yr, wr, vr, Pr, Zt, Yt, Er, te, Tr, It, Cr, W, Sr, kr, _n, xr, Ar, Dr, gn, bn, ee, mn, Rr, ft, _t, Ee, yn, ne, wn, vn, Ir, Pn, En, Or, Br, qt, Tn, Nr, Mr, Fr, Te, Ur, Lr, Cn, Vr, qr, jr, Hr, Kr, Wr, zr, Xr, Gr, Sn, kn, Jr, $r, Qr;
class Pc extends Ft {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: i = 1,
    username: s = null,
    password: a = null,
    environment: c = "production"
  } = {}) {
    super({ filters: t, config_port: e, no_device: i });
    X(this, f);
    J(this, "__pinPad__", {
      buffer: null,
      about: {
        EMV: null,
        model: null,
        serial: null,
        brand: null,
        appVersion: null,
        printer: null,
        hasCashback: !1,
        supportInjection: !1,
        supportSign: !1,
        supportContactlessCollisionCard: !1,
        supportContactless: !1,
        supportDUKPT: "",
        // Derived Unique Key Per Transaction
        injectedValues: !1,
        pp: null
      },
      config: {
        defaultEnvironment: "production",
        environment: "production",
        currency: "MXN",
        currencyCode: "0484",
        timeoutPinPad: "100",
        signSupport: "1",
        CTLSSupport: "1",
        userTRX: "userPinpadWeb",
        tp_operation: "29",
        requireCVVAmex: "1",
        forceOnline: "00",
        emvCard: "0",
        validateQPS: "1",
        username: null,
        password: null,
        country: null,
        idBranch: null,
        idCompany: null,
        latitude: null,
        longitude: null,
        publicKeyRSA: null,
        publicIP: null,
        internal: {
          stTokenization: !1,
          qpsDomestic: "",
          qpsInternational: "",
          cvmlVMCDomestic: "",
          cvmlVMCInternational: "",
          cvmlAmex: "",
          translimitCTLSVMC: "",
          translimitCTLSAmex: "",
          emv: {}
        },
        terminal: {},
        loginResponse: null,
        otherLogin: {},
        RC4Key: "KEY CREDIT CARD KEY",
        read: {
          EMV: "",
          PIN: "",
          POSEM: "",
          AppId: "",
          AppIdLabel: "",
          Arqc: "",
          Chip: "",
          ChipName: "",
          ChipNameEnc: "",
          ReadCTLS: "",
          NB_Data: "",
          NB_ksn: "",
          Tags: "",
          Type: ""
        },
        tokenizeTRX: !1
      },
      constants: {
        // don't change
        appVersion: "1.0.16",
        appName: "pinpapWebApp ",
        STX: "",
        ETX: "",
        FS: "",
        getNULL: "\0",
        appChannel: "3",
        typeChannel: "11",
        urls: {
          development: "https://fcdev.mitec.com.mx",
          qa: "https://fcqa.mitec.com.mx",
          production: "https://m.mit.com.mx",
          productionAlternative: "https://m2.mit.com.mx"
        },
        uris: {
          login: "/pinpadWeb/login",
          RSAKey: "/pinpadWeb/getDataCrypt",
          merchant: "/pinpadWeb/getAfiliaciones",
          consult: "/pinpadWeb/queryTrx",
          keysDUKPT: "/pinpadWeb/getKeysDUKPT",
          reverse: "/pinpadWeb/executeBackSale",
          rePrint: "/pinpadWeb/reprint",
          checkInMoto: "/pinpadWeb/checkin",
          checkOutMoto: "/pinpadWeb/checkout",
          reAuthorizationMoto: "/pinpadWeb/reAuthorization",
          cancellation: "/pinpadWeb/executeVoid",
          sale: "/pinpadWeb/executeSale"
        }
      },
      operation: {
        amount: 0,
        reference: null,
        folio: null,
        authorization: null,
        errors: 0,
        last_error: null,
        commerceVoucher: "",
        clientVoucher: "",
        consultDate: null,
        ignore: { counter: !1, counterSale: !1, isError92TRX: !1, C93Global: !1, error: "" },
        finalResult: {},
        moto: {
          ccType: "",
          ccName: "",
          ccNumber: "",
          ccExpMonth: "",
          ccExpYear: "",
          ccCvvCsc: "",
          txRoom: ""
        },
        bin: "",
        bin8: "",
        hasQPS: !1,
        onlyMerchant: "",
        merchant: null,
        typeOperation: "29",
        typeResponse: "",
        responseMit: {},
        applyReverse: !1
      },
      finishCommand: { A: "", B: "", C: "", D: "", E: "", F: "", G: "", H: "", I: "", J: "", K: "" },
      waiting: {
        statusAboutWaiting: null,
        statusInjectWaiting: null,
        statusReadCardWaiting: null,
        statusSecondGenerateWaiting: null
      }
    });
    if (this.__internal__.device.type = "pinpad", !ma())
      throw new Error("Crypto not supported in this browser");
    if (j.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.time.response_connection = 3e3, this.__internal__.time.response_general = 5e3, this.__internal__.serial.delay_first_connection = 1e3, this.__internal__.serial.config_port.baudRate = 19200, this.environment = c, s && (this.username = s), a && (this.password = a), o(this, f, ur).call(this), o(this, f, hr).call(this);
  }
  async timeout(t, e) {
    await super.timeout(t, e), this.__pinPad__.waiting.statusAboutWaiting && e === "about" ? this.__pinPad__.waiting.statusAboutWaiting = "rejected" : this.__pinPad__.waiting.statusInjectWaiting && e === "inject" ? this.__pinPad__.waiting.statusInjectWaiting = "rejected" : this.__pinPad__.waiting.statusinitDUKPTWaiting && e === "init-dukpt" ? this.__pinPad__.waiting.statusinitDUKPTWaiting = "rejected" : this.__pinPad__.waiting.statuswritingDUKPTWaiting && e === "dukpt" ? this.__pinPad__.waiting.statuswritingDUKPTWaiting = "rejected" : this.__pinPad__.waiting.statusReadCardWaiting && e === "read-card" ? this.__pinPad__.waiting.statusReadCardWaiting = "rejected" : this.__pinPad__.waiting.statusSecondGenerateWaiting && e === "second-generate" && (this.__pinPad__.waiting.statusSecondGenerateWaiting = "rejected");
  }
  serialMessage(t) {
    const e = {
      original_code: t,
      code: null,
      name: null,
      description: null,
      request: this.lastAction,
      no_code: 0,
      parsed: null
    }, i = this.parseHexToUint8(t), s = this.parseUint8ArrayToString(i);
    let a = o(this, f, dr).call(this, s);
    switch (this.__pinPad__.buffer = s, e.parsed = a, e.code = s, e.request) {
      case "connect":
        e.name = "connected", e.description = "Connection established", e.no_code = 100, o(this, f, fn).call(this, a, s);
        break;
      case "about":
        e.name = "About PinPad", e.description = "Response of about", e.no_code = 101, o(this, f, fn).call(this, a, s);
        break;
      case "inject":
        e.name = "Inject", e.description = "Response of inject values", e.no_code = 102, o(this, f, pr).call(this, a, s);
        break;
      case "init-dukpt":
        e.name = "Init DUKPT", e.description = "Response of init DUKPT", e.no_code = 103, o(this, f, fr).call(this, a, s);
        break;
      case "dukpt":
        e.name = "Write DUKPT", e.description = "Response of write DUKPT", e.no_code = 104, o(this, f, _r).call(this, a, s);
        break;
      case "read-card":
        e.name = "read card", e.description = "response of read card", e.no_code = 105, o(this, f, gr).call(this, a, s);
        break;
      case "second-generate":
        e.name = "second generate", e.description = "response of second generate", e.no_code = 106, o(this, f, br).call(this, a, s);
        break;
      case "cancel":
        e.name = "cancel pinpad", e.description = "response of cancel", e.no_code = 107;
        break;
      case "print":
        o(this, f, wr).call(this, a, s), e.name = "print voucher", e.description = "response of print", e.no_code = 108;
        break;
      case "cancel-read-card":
        o(this, f, yr).call(this, a, s), e.name = "cancel read card", e.description = "response of cancel read card", e.no_code = 109;
        break;
      case "code93":
        o(this, f, vr).call(this, a, s), e.name = "code 93", e.description = "response of code 93", e.no_code = 110;
        break;
      case "finish-emv-end":
        o(this, f, Pr).call(this, a, s), e.name = "Finish EMV End", e.description = "response of finish EMV End", e.no_code = 111;
        break;
      default:
        e.name = "unknown", e.description = "Unknown command", e.no_code = 400;
        break;
    }
    this.dispatch("serial:message", e);
  }
  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(t = 1) {
    const e = "", i = "";
    let s = "C56AABOUT";
    s = e + s.length.toString().padStart(3, "0") + s + i;
    let a = 0;
    for (let l = 0; l < s.length; l++)
      a ^= s.charCodeAt(l);
    s = s + String.fromCharCode(a);
    const c = this.parseStringToBytes(s, "");
    return this.add0x(c);
  }
  async sendCustomCode({ code: t = "" } = {}) {
    if (typeof t != "string") throw new Error("Invalid string");
    const e = this.parseStringToBytes(t);
    await this.appendToQueue(e, "custom");
  }
  // ========================================================================================
  // ========================================================================================
  // ========================================================================================
  set username(t) {
    this.__pinPad__.config.username = t;
  }
  get username() {
    return this.__pinPad__.config.username;
  }
  set password(t) {
    if (typeof t != "string") throw new Error("Invalid password");
    this.__pinPad__.config.password = t.toUpperCase();
  }
  get password() {
    return this.__pinPad__.config.password;
  }
  set amount(t) {
    if (t = parseFloat(t), isNaN(t) || t <= 0) throw new Error("Invalid amount");
    this.__pinPad__.operation.amount = t.toFixed(2).toString();
  }
  get amount() {
    return parseFloat(this.__pinPad__.operation.amount) || 0;
  }
  set reference(t) {
    if (!o(this, f, mn).call(this, t.trim())) throw new Error("Invalid reference");
    this.__pinPad__.operation.reference = t.trim().toString().replaceAll(" ", "").toUpperCase();
  }
  get reference() {
    return this.__pinPad__.operation.reference;
  }
  get url() {
    const t = this.environment;
    return this.__pinPad__.constants.urls[t];
  }
  get version() {
    return {
      name: this.__pinPad__.constants.appName,
      version: this.__pinPad__.constants.appVersion,
      environment: this.environment,
      type: this.typeDevice
    };
  }
  set environment(t) {
    const e = ["development", "qa", "production", "productionAlternative"];
    if (typeof t != "string" || !e.includes(t.toLowerCase()))
      throw new Error("The environment must be a string, in: " + e.join(", "));
    this.__pinPad__.config.defaultEnvironment = t.toLowerCase(), this.__pinPad__.config.environment = t.toLowerCase();
  }
  get defaultEnvironment() {
    return this.__pinPad__.config.defaultEnvironment;
  }
  get environment() {
    return this.__pinPad__.config.environment;
  }
  get latitudeLongitude() {
    return {
      latitude: this.__pinPad__.config.latitude,
      longitude: this.__pinPad__.config.longitude
    };
  }
  set timeoutPinPad(t) {
    if (t = parseInt(t), isNaN(t) || t <= 10 || t >= 300)
      throw new Error("Invalid timeout please use a number between 10 and 300 seconds");
    this.__pinPad__.config.timeoutPinPad = t.toString();
  }
  get timeoutPinPad() {
    return parseInt(this.__pinPad__.config.timeoutPinPad);
  }
  async login({ force: t = !1 } = {}) {
    return await o(this, f, kr).call(this, t);
  }
  clearSession() {
    localStorage.removeItem("ppLoginResponse"), localStorage.removeItem("ppRSAKey"), localStorage.removeItem("ppPublicIP");
  }
  async checkPositionPermission() {
    if (!Hn())
      throw new Error("Geolocation not supported");
    return new Promise((t, e) => {
      navigator.permissions.query({ name: "geolocation" }).then((i) => {
        i.state === "granted" ? t(!0) : t(!1);
      }).catch(() => e(!1));
    });
  }
  async cancelReadCard() {
    let t = "012VXVCANCELl";
    this.__pinPad__.about.model.toLowerCase() === "ingenico" && (t = "029C50AOPERACION       CANCELADA");
    const e = this.parseStringToBytes(t, "");
    await this.appendToQueue(e, "cancel-read-card");
  }
  async print(t = "client") {
    this.__pinPad__.operation.errors = 0;
    const e = this.__pinPad__.constants.STX, i = this.__pinPad__.constants.ETX;
    this.__pinPad__.operation.commerceVoucher.includes(":") || (this.__pinPad__.operation.commerceVoucher = o(this, f, It).call(this, this.__pinPad__.config.RC4Key, this.__pinPad__.operation.commerceVoucher)), this.__pinPad__.operation.clientVoucher.includes(":") || (this.__pinPad__.operation.clientVoucher = o(this, f, It).call(this, this.__pinPad__.config.RC4Key, this.__pinPad__.operation.clientVoucher));
    let s = t === "client" ? this.__pinPad__.operation.clientVoucher : this.__pinPad__.operation.commerceVoucher;
    if (s.length === 0) {
      this.dispatch("pp:print", {
        error: !0,
        code: "001",
        message: "Without information to print"
      });
      return;
    }
    s = o(this, f, Cr).call(this, s), s = o(this, f, Sr).call(this, s, this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion);
    let a = "C59A" + s;
    a = e + o(this, f, ft).call(this, a) + a + i, a = a + o(this, f, _t).call(this, a), t === "client" ? this.__pinPad__.operation.clientVoucher = "" : t === "commerce" && (this.__pinPad__.operation.commerceVoucher = "");
    const c = this.parseStringToBytes(a, "");
    await this.appendToQueue(c, "print");
  }
  getClientVoucher() {
    return this.__pinPad__.operation.clientVoucher;
  }
  getCommerceVoucher() {
    return this.__pinPad__.operation.commerceVoucher;
  }
  /**
   * @param {null|string} reference
   * @return {Promise<any>}
   */
  async consult({ reference: t = null }) {
    return t || (t = this.reference), Et(t) && (t = "--", this.reference = t), o(this, f, Rr).call(this, this.reference), this.__pinPad__.operation.consultDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB"), await o(this, f, ne).call(this, {
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      Tx_Date: this.__pinPad__.operation.consultDate
    }), o(this, f, qt).call(this, this.url + this.__pinPad__.constants.uris.consult, {
      user: this.username.toUpperCase(),
      pwd: this.password.toUpperCase(),
      id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
      id_company: this.__pinPad__.config.idCompany.toUpperCase(),
      date: this.__pinPad__.operation.consultDate,
      reference: this.reference
    });
  }
  /**
   * @param {number|string|null} folio
   * @return {Promise<any>}
   */
  async rePrint({ folio: t = null } = {}) {
    t === null && (t = this.__pinPad__.operation.folio || ""), o(this, f, wn).call(this, t), await o(this, f, ne).call(this, {
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      Tx_OperationNumber: t
    });
    const e = await o(this, f, qt).call(this, this.url + this.__pinPad__.constants.uris.rePrint, {
      REPRINTVOUCHER: {
        business: {
          country: this.__pinPad__.config.country.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany.toUpperCase(),
          pwd: this.password.toUpperCase(),
          user: this.username.toUpperCase()
        },
        no_operacion: t,
        crypto: "2"
      }
    });
    let i = e.voucher_comercio;
    return this.__pinPad__.operation.commerceVoucher = "", i && (e.voucher_comercio.includes(":") ? this.__pinPad__.operation.commerceVoucher = e.voucher_comercio : this.__pinPad__.operation.commerceVoucher = o(this, f, It).call(this, this.__pinPad__.config.RC4Key, e.voucher_comercio)), i = e.voucher_cliente, this.__pinPad__.operation.clientVoucher = "", i && (e.voucher_cliente.includes(":") ? this.__pinPad__.operation.clientVoucher = e.voucher_cliente : this.__pinPad__.operation.clientVoucher = o(this, f, It).call(this, this.__pinPad__.config.RC4Key, e.voucher_cliente)), e;
  }
  async cancelPurchase({ amount: t = 0, authorization: e = "", folio: i = "" } = {}) {
    if (!o(this, f, yn).call(this, t)) throw new Error("Invalid amount");
    if (!o(this, f, Kr).call(this, e)) throw new Error("Invalid authorization");
    if (!o(this, f, wn).call(this, i)) throw new Error("Invalid folio");
    t = o(this, f, Cn).call(this, t, 2);
    const s = {
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      UserTRX: "userPinpadWeb",
      Tx_OperationNumber: i,
      Tx_Auth: e,
      Amount: t
    };
    await o(this, f, ne).call(this, s);
    const a = o(this, f, qt).call(this, this.url + this.__pinPad__.constants.uris.cancellation, {
      VMCAMEXMCANCELACION: {
        business: {
          country: this.__pinPad__.config.country.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany.toUpperCase(),
          pwd: this.password.toUpperCase(),
          user: this.username.toUpperCase()
        },
        transacction: {
          amount: t,
          auth: e.toUpperCase(),
          crypto: "2",
          no_operacion: i,
          usrtransacction: this.username.toUpperCase(),
          version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion
        }
      }
    });
    return this.__pinPad__.operation.commerceVoucher = "", a.voucher_comercio && (a.voucher_comercio.includes(":") ? this.__pinPad__.operation.commerceVoucher = a.voucher_comercio : this.__pinPad__.operation.commerceVoucher = o(this, f, It).call(this, this.__pinPad__.config.RC4Key, a.voucher_comercio)), this.__pinPad__.operation.clientVoucher = "", a.voucher_cliente && (a.voucher_cliente.includes(":") ? this.__pinPad__.operation.clientVoucher = a.voucher_cliente : this.__pinPad__.operation.clientVoucher = o(this, f, It).call(this, this.__pinPad__.config.RC4Key, a.voucher_cliente)), JSON.stringify(a);
  }
  // ========================================================================================
  // Needed for WS v4
  // ========================================================================================
  /**
   * @param {number} amount
   * @param {null|string} reference
   * @returns {Promise<{error: boolean, message: null, approved: boolean, object: {}}>}
   */
  async makeSale({ amount: t = 0, reference: e = null } = {}) {
    if (t = parseFloat(t.toString()), isNaN(t) || t <= 0)
      throw new Error("Amount is required and must be greater than 0");
    if (this.amount = t, !e || Et(e) || !o(this, f, mn).call(this, e))
      throw new Error("Reference is required and must be alphanumeric");
    if (this.reference = e, /^[A-Z-a-z\s]+$/g.test(this.__pinPad__.config.currency) === !1)
      throw new Error("Invalid currency");
    let i = {
      error: !1,
      message: null,
      approved: !1,
      object: {}
    };
    try {
      return await this.login(), await o(this, f, Lr).call(this), !await o(this, f, Vr).call(this) || !await o(this, f, Mr).call(this) ? i : await o(this, f, zr).call(this);
    } catch (s) {
      console.warn(s), i.error = !0, i.message = s.message, i.approved = !1, i.object = s;
    }
    return i;
  }
}
f = new WeakSet(), hr = function() {
  j.addCustom("pinpad", this);
}, ur = function() {
  const t = [
    "pp:processing-card",
    "pp:read-card",
    "pp:error",
    "pp:print",
    "pp:merchant-moto",
    "pp:dukpt",
    "pp:finish-emv",
    "pp:response",
    "pp:error",
    "pp:finish-emv"
  ];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, dr = function(t) {
  const e = this.__pinPad__.constants.STX, i = this.__pinPad__.constants.ETX, s = this.__pinPad__.constants.FS, a = this.__pinPad__.constants.getNULL;
  t = t.replace(new RegExp(e, "g"), "");
  const c = t.split(i);
  t = c[0];
  const l = t.split(s);
  l.push(...c[1].split(s));
  const h = {};
  return l.map((p, _) => {
    const m = _ > 0 ? p.substring(0, 1) : "A", P = _ > 0 ? p.substring(1) : p;
    return { [m]: P.replace(new RegExp(a, "g"), "") };
  }).forEach((p) => Object.assign(h, p)), h;
}, fn = function(t, e) {
  const i = this.__pinPad__.constants.ETX, s = e.substring(e.indexOf("D") + 2, e.indexOf("E"));
  let a = 0;
  const c = e.indexOf("N") > 0, l = e.substring(e.indexOf("A00") + 3, e.indexOf("B"));
  if (l && l !== "undefined" && l.toUpperCase() === "VERIFONE") {
    const p = s.replace("MITP_1.00.", "").replace("MITP_01.00.", "").replace("MITD_1.00.", "").replace("MITD_01.00.", "");
    a = parseInt(p), a >= 15 && (this.__pinPad__.about.hasCashback = !0);
  }
  this.__pinPad__.about.supportInjection = c, e.indexOf("M") > 0 ? (this.__pinPad__.about.supportSign = e.substring(e.indexOf("L") + 2, e.indexOf("M")), this.__pinPad__.about.supportInjection ? this.__pinPad__.about.supportContactlessCollisionCard = e.substring(
    e.indexOf("M") + 2,
    e.indexOf("N")
  ) : (this.__pinPad__.about.supportContactlessCollisionCard = e.substring(
    e.indexOf("M") + 2,
    e.indexOf(i)
  ), this.__pinPad__.about.supportContactless = !0)) : (this.__pinPad__.about.supportSign = e.substring(e.indexOf("L") + 2, e.indexOf(i)), this.__pinPad__.about.supportContactless = !1), this.__pinPad__.about.supportDUKPT = e.substring(e.indexOf("J") + 2, e.indexOf("K")), this.__pinPad__.about.EMV = e.substring(e.indexOf("E") + 2, e.indexOf("F")), this.__pinPad__.about.serial = e.substring(e.indexOf("C") + 2, e.indexOf("D")), this.__pinPad__.about.printer = e.substring(e.indexOf("F") + 2, e.indexOf("G")), this.__pinPad__.about.model = e.substring(e.indexOf("B") + 2, e.indexOf("C")), this.__pinPad__.about.brand = l, this.__pinPad__.about.appVersion = s;
  const h = e.substring(e.indexOf("K") + 2, e.indexOf("L"));
  this.__pinPad__.about.pp = {
    brand: l,
    appVersion: s,
    versionInt: a,
    hasCashback: this.__pinPad__.about.hasCashback,
    supportInjection: this.__pinPad__.about.supportInjection,
    supportSign: this.__pinPad__.about.supportSign,
    supportContactlessCollisionCard: this.__pinPad__.about.supportContactlessCollisionCard,
    supportContactless: this.__pinPad__.about.supportContactless,
    supportDUKPT: this.__pinPad__.about.supportDUKPT,
    hasDUKPTKeys: h,
    EMV: this.__pinPad__.about.EMV,
    serial: this.__pinPad__.about.serial,
    printer: this.__pinPad__.about.printer,
    model: this.__pinPad__.about.model
  }, this.__pinPad__.waiting.statusAboutWaiting && (this.__pinPad__.waiting.statusAboutWaiting = "resolved");
}, // eslint-disable-next-line no-unused-vars
pr = function(t, e) {
  this.__pinPad__.waiting.statusInjectWaiting = "resolved";
}, fr = function(t, e) {
  e = e.replace("010P93A00B01t036P81AACERQUE, INSERTE CHIP O  DESLICE*", ""), this.__pinPad__.config.terminal = {
    nb_kcv: e.substring(e.indexOf("E") + 2, e.indexOf("F")),
    nb_marca_terminal: e.substring(e.indexOf("P91A") + 4, e.indexOf("B")),
    nb_modelo_terminal: e.substring(e.indexOf("B") + 2, e.indexOf("C")),
    nb_serie_lector: e.substring(e.indexOf("C") + 2, e.indexOf("D")),
    nb_tk: e.substring(e.indexOf("F") + 2, e.length - 2),
    nb_version_terminal: e.substring(e.indexOf("D") + 2, e.indexOf("E"))
  }, this.__pinPad__.waiting.statusinitDUKPTWaiting = "resolved";
}, // eslint-disable-next-line no-unused-vars
_r = function(t, e) {
  this.__pinPad__.waiting.statuswritingDUKPTWaiting = "resolved";
}, gr = function(t, e) {
  const i = this.__pinPad__.about.brand.toLowerCase(), s = this.__pinPad__.about.model.toLowerCase(), a = i === "ingenico" && s === "ipp320" ? 500 : 350;
  if (e.length < a) {
    e = e.replace("006P93A00.", "").replace("006P93A00,", ""), e.includes("E93") ? this.__pinPad__.operation.ignore.error = e.substring(e.indexOf("E93") + 3, e.indexOf("E93") + 6) : e.includes("E71") && (this.__pinPad__.operation.ignore.error = e.substring(e.indexOf("E71") + 3, e.indexOf("E71") + 6)), this.__pinPad__.operation.ignore.error !== "" && e.indexOf("OPERACION       CANCELADA") === -1 && e.indexOf("TIEMPO         EXCEDIDO") === -1 && this.__pinPad__.operation.ignore.error.length === 3 && (this.__pinPad__.operation.last_error = o(this, f, kn).call(this, this.__pinPad__.operation.ignore.error), this.__pinPad__.waiting.statusReadCardWaiting = "rejected");
    return;
  }
  if (e.includes("M1") || e.includes("M0") || e.includes("M1") || e.includes("N1") || e.includes("N1") || e.includes("P93A022") && e.substring(e.length - 24).includes("I") && e.substring(e.length - 1).includes("") || e.includes("P93A800") && e.substring(e.length - 24).includes("I") && e.substring(e.length - 1).includes("") || e.includes("P93A022") && e.length >= 406 && s === "vx820" || e.includes("P93A022") && e.length >= 406 && s === "vx520" || e.includes("P93A800") && e.length >= 406 && s === "vx520" || e.includes("P93A800") && e.length >= 406 && s === "vx820" || e.includes("P93A022") && e.length >= 406 && s === "p400" || e.includes("P93A800") && e.length >= 406 && s === "p400" || e.includes("P93A022") && e.length >= 406 && s === "v205c" || e.includes("P93A800") && e.length >= 406 && s === "v205c" || e.includes("P93A022") && e.length >= 406 && s === "move2500" || e.includes("P93A800") && e.length >= 406 && s === "move2500" || e.includes("P93A022") && e.length >= 406 && s === "lane3000" || e.includes("P93A800") && e.length >= 406 && s === "lane3000") {
    let c = e;
    i === "verifone" && (c = e.replace("006P93A00.", "").substring(e.indexOf("P93A"), e.indexOf("P93A") + 7)), e.includes("P81APROCESANDO, NO RETIRE TARJETA") || e.includes("P81APROCESANDO TARJETA") || c.includes("P93A022") || c.includes("P81AINSERTE CHIP O  DESLICE TARJETA") || c.includes("ACERQUE, INSERTE CHIP O  DESLICE") || c.includes("P81AACERQUE, INSERTE CHIP O  DESLICE TARJETA") ? this.dispatch("pp:processing-card", { waiting: !0 }) : e.length > a && o(this, f, mr).call(this, e);
  }
}, br = function(t, e) {
  const i = this.__pinPad__.constants.ETX;
  let s = e.replace("023P81AFAVOR RETIRAR TARJ.", "").replace("020P81A DECLINADA EMV  ", "").replace("020P81A DECLINADA EMV  ", "");
  s = s.substring(s.indexOf("B") + 2, s.indexOf(i)), s.includes("006E93A16") && (s = "01"), this.__pinPad__.operation.applyReverse = s === "01" && this.__pinPad__.operation.responseMit._approved && this.__pinPad__.config.otherLogin.executeReverse === "1", this.__pinPad__.waiting.statusSecondGenerateWaiting = "resolved";
}, mr = function(t) {
  const e = this.__pinPad__.constants.ETX, i = this.__pinPad__.about.brand.toLowerCase();
  let s, a, c, l, h;
  i === "verifone" ? t = t.replace("006P93A00.", "").replace("009P93A00", "").replace("010P93A00B01v", "") : t = t.replace("006P93A00,", ""), this.__pinPad__.config.read.POSEM = t.substring(t.indexOf("P93A") + 4, t.indexOf("B"));
  const p = this.__pinPad__.config.read.POSEM;
  if (p === "051" || p === "071") {
    if (this.__pinPad__.config.read.Chip = "1", this.__pinPad__.config.read.PIN = t.substring(t.indexOf("C") + 2, t.indexOf("D")), this.__pinPad__.config.read.AppId = t.substring(t.indexOf("G") + 2, t.indexOf("H")), this.__pinPad__.config.read.AppIdLabel = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.Arqc = t.substring(t.indexOf("F") + 2, t.indexOf("G")), t.includes("O")) {
      const _ = t.substring(t.indexOf("P93A"));
      this.__pinPad__.config.read.ReadCTLS = _.substring(
        _.indexOf("M") + 2,
        _.indexOf("N")
      ), this.__pinPad__.operation.hasQPS = _.substring(_.indexOf("N") + 2, _.indexOf("O")) === "1", this.__pinPad__.operation.bin8 = _.substring(_.indexOf("O") + 2, _.indexOf(e));
    } else if (t.includes("N")) {
      const _ = t.substring(t.indexOf("P93A"));
      this.__pinPad__.config.read.ReadCTLS = _.substring(
        _.indexOf("M") + 2,
        _.indexOf("N")
      ), this.__pinPad__.operation.hasQPS = _.substring(_.indexOf("N") + 2, _.indexOf(e)) === "1";
    } else {
      const _ = t.substring(t.indexOf("P93A"), t.indexOf("M") + 5);
      this.__pinPad__.config.read.ReadCTLS = _.substring(_.indexOf("M") + 2, _.indexOf(e)), this.__pinPad__.operation.hasQPS = !1;
    }
    this.__pinPad__.config.read.Tags = t.substring(t.indexOf("B") + 2, t.indexOf("C")), this.__pinPad__.config.read.NB_ksn = t.substring(t.indexOf("K") + 2, t.indexOf("M")), this.__pinPad__.config.read.NB_Data = t.substring(t.indexOf("D") + 2, t.indexOf("E")), a = t.substring(t.indexOf("I") + 2, t.indexOf("J")), c = t.substring(t.indexOf("E") + 2, t.indexOf("F")), this.__pinPad__.config.read.ChipName = c, s = t.substring(t.indexOf("J") + 2, t.indexOf("K"));
  } else {
    let _;
    if (this.__pinPad__.config.read.Chip = "0", this.__pinPad__.config.read.PIN = "", this.__pinPad__.config.read.AppId = "", this.__pinPad__.config.read.Arqc = "", this.__pinPad__.config.read.ReadCTLS = "0", this.__pinPad__.config.read.AppIdLabel = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.Tags = t.substring(t.indexOf("B") + 2, t.indexOf("C")), p === "022")
      if (t.includes("O")) {
        const m = t.substring(t.indexOf("P93A"));
        this.__pinPad__.operation.bin8 = m.substring(m.indexOf("O") + 2, m.indexOf(e)), _ = t.substring(t.indexOf("P93A022"), t.indexOf("I") + 23), _ = _.substring(_.indexOf("I") + 2, _.lastIndexOf(""));
      } else
        _ = t.substring(t.indexOf("P93A022"), t.indexOf("I") + 23), _ = _.substring(_.indexOf("I") + 2, _.indexOf(e));
    else
      _ = t.substring(t.indexOf("P93A800"), t.indexOf("I") + 23), _ = _.substring(_.indexOf("I") + 2, _.indexOf(e));
    this.__pinPad__.config.read.NB_ksn = _, this.__pinPad__.config.read.NB_Data = t.substring(t.indexOf("B") + 2, t.indexOf("C")), a = t.substring(t.indexOf("F") + 2, t.indexOf("G")), s = t.substring(t.indexOf("G") + 2, t.indexOf("H")), this.__pinPad__.about.model.toLowerCase() === "vx520" ? (c = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.ChipName = c) : (c = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.ChipName = c);
  }
  s.includes("/") && (s = s.replace("/", "")), s.toString().length === 4 ? (h = s.toString().substring(0, 2), l = s.toString().substring(2)) : (h = "", l = ""), this.__pinPad__.config.read.Chip === "1" ? (this.__pinPad__.config.read.EMV = "3", this.__pinPad__.config.read.ChipNameEnc = "1") : (this.__pinPad__.config.read.ChipNameEnc = "", this.__pinPad__.config.read.EMV = "2"), this.__pinPad__.config.read.AppIdLabel.toLowerCase().includes("american") || this.__pinPad__.config.read.AppIdLabel.toLowerCase().includes("amex") ? this.__pinPad__.config.read.Type = "AMEX" : this.__pinPad__.config.read.Type = "V/MC", this.__pinPad__.operation.bin = a, a.length > 6 && (this.__pinPad__.operation.bin = a.substring(0, 6)), this.__pinPad__.waiting.statusReadCardWaiting = "resolved", this.dispatch("pp:read-card", {
    ERROR: "",
    maskPan: a,
    name: c,
    month: h,
    year: l
  });
}, yr = function(t, e) {
  e.length > 10 && e.includes("E93A10") && (this.__pinPad__.waiting.statusReadCardWaiting === "pending" && (this.__pinPad__.waiting.statusReadCardWaiting = "rejected"), this.dispatch("pp:error", { message: "Operation cancelled by user." }));
}, wr = function(t, e) {
  const i = this;
  if (this.__pinPad__.about.model.toLowerCase() === "vx520") {
    if (e.length > 11)
      if (e.includes("P59A00"))
        this.__pinPad__.operation.clientVoucher !== "" ? setTimeout(function() {
          i.print("client").then(() => {
          }).catch((s) => {
            console.error(s);
          });
        }, 1e3) : this.dispatch("pp:print", { type: "success" });
      else {
        const s = e.includes("E17") || e.includes("A17") ? { type: "warning", message: "printer without paper" } : { type: "error", message: "The voucher could not be printed" };
        this.dispatch("pp:print", s);
      }
  } else if (e.includes("P59A00"))
    this.__pinPad__.operation.clientVoucher !== "" ? setTimeout(function() {
      i.print("client").then(() => {
      }).catch((s) => {
        console.error(s);
      });
    }, 1e3) : this.dispatch("pp:print", { type: "success" });
  else {
    const s = e.includes("E17") || e.includes("A17") ? { type: "warning", message: "printer without paper" } : { type: "error", message: "The voucher could not be printed" };
    this.dispatch("pp:print", s);
  }
}, // eslint-disable-next-line no-unused-vars
vr = function(t, e) {
}, // eslint-disable-next-line no-unused-vars
Pr = function(t, e) {
}, // ========================================================================================
// Updated to WS v4
// ========================================================================================
Zt = function(t, e) {
  const i = new ja();
  return i.setPublicKey(t), i.encrypt(e);
}, Yt = function(t) {
  const e = "0123456789ABCDEF";
  let i = "";
  for (let s = 0; s < t; s++) {
    const a = Math.floor(Math.random() * e.length);
    i += e.substring(a, a + 1);
  }
  return i;
}, Er = function(t) {
  const e = "0123456789abcdef", i = [], s = [];
  for (let a = 0; a < 256; a++)
    i[a] = e.charAt(a >> 4) + e.charAt(a & 15);
  for (let a = 0; a < t.length; a++)
    s[a] = i[t.charCodeAt(a)];
  return s.join("");
}, te = async function(t, e) {
  const i = new Uint8Array(t.match(/.{1,2}/g).map((m) => parseInt(m, 16))), s = crypto.getRandomValues(new Uint8Array(16)), c = new TextEncoder().encode(e), l = await crypto.subtle.importKey("raw", i, { name: "AES-CBC" }, !1, ["encrypt"]), h = await crypto.subtle.encrypt({ name: "AES-CBC", iv: s }, l, c), p = btoa(String.fromCharCode(...s)), _ = btoa(String.fromCharCode(...new Uint8Array(h)));
  return p + _;
}, // async AESDecrypt(key, encryptedMessage) {
//   const keyBytes = new Uint8Array(key.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
//   const ivBase64 = encryptedMessage.slice(0, 24); // Assuming the IV is 16 bytes and base64 encoded
//   const ciphertextBase64 = encryptedMessage.slice(24);
//
//   const iv = new Uint8Array(
//     atob(ivBase64)
//       .split('')
//       .map((char) => char.charCodeAt(0))
//   );
//   const ciphertext = new Uint8Array(
//     atob(ciphertextBase64)
//       .split('')
//       .map((char) => char.charCodeAt(0))
//   );
//
//   const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['decrypt']);
//
//   const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: iv }, cryptoKey, ciphertext);
//
//   const decoder = new TextDecoder();
//   return decoder.decode(decrypted);
// }
Tr = function(t, e, i = !1) {
  const s = [];
  for (let p = 0; p < 256; p++)
    s[p] = p;
  let a = 0;
  for (let p = 0; p < 256; p++)
    a = (a + s[p] + t.charCodeAt(p % t.length)) % 256, [s[p], s[a]] = [s[a], s[p]];
  let c = 0, l = 0, h = "";
  for (const p of e) {
    c = (c + 1) % 256, l = (l + s[c]) % 256, [s[c], s[l]] = [s[l], s[c]];
    let _ = s[(s[c] + s[l]) % 256];
    h += String.fromCharCode(p.charCodeAt(0) ^ _);
  }
  return i ? o(this, f, Er).call(this, h).toUpperCase() : h;
}, It = function(t, e) {
  return o(this, f, Tr).call(this, t, this.hexToAscii(e));
}, Cr = function(t) {
  return t.replaceAll("Á", "A"), t.replaceAll("É", "E"), t.replaceAll("Í", "I"), t.replaceAll("Ó", "O"), t.replaceAll("Ú", "U"), t.replaceAll("á", "a"), t.replaceAll("é", "e"), t.replaceAll("í", "i"), t.replaceAll("ó", "o"), t.replaceAll("ú", "u"), t.replaceAll("ñ", "n"), t.replaceAll("Ñ", "N"), t.replaceAll('Electr?a"', "Electronica"), t;
}, W = function(t, e, i) {
  if (t = t.replace("@cnb logo_cpagos", e), t = t.replace("@cnn ver_app", i), t = t.replace(/@/g, " @"), t = t.replace(/ {2}@/g, " @"), t = t.replace(/ {3}@/g, " @"), t = t.replace(/\r/g, ""), t = t.replace(/\n/g, ""), t.includes("@lsn POR ESTE PAGARE ME OBLIGO INCONDI")) {
    const s = t.indexOf("@lsn POR ESTE PAGARE ME OBLIGO INCONDI");
    t = t.substring(0, s);
  }
  return t.trim() + "@br @br @br @br @br";
}, Sr = function(t, e) {
  const i = "@logo3 @br", s = "@cnn " + e;
  return t.includes("@cnb Santander") ? (t = t.replace("@cnb Santander", "@logo1@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb American Express") ? (t = t.replace("@cnb American Express", "@logo2@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb HSBC") ? (t = t.replace("@cnb HSBC", "@logo7@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb IXE") ? (t = t.replace("@cnb IXE", "@logo11@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb MULTIVA") ? (t = t.replace("@cnb MULTIVA", "@logo15@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb Multiva") ? (t = t.replace("@cnb Multiva", "@logo15@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb SCOTIA BANK") ? (t = t.replace("@cnb SCOTIA BANK", "@logo16@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb SCOTIABANK") ? (t = t.replace("@cnb SCOTIABANK", "@logo16@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb BANCOMER") ? (t = t.replace("@cnb BANCOMER", "@logo17@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb Bancomer") ? (t = t.replace("@cnb Bancomer", "@logo17@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb BBVA") ? (t = t.replace("@cnb BBVA", "@logo17@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb BANORTE") ? (t = t.replace("@cnb BANORTE", "@logo18@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb Banorte") ? (t = t.replace("@cnb Banorte", "@logo18@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb BANREGIO") ? (t = t.replace("@cnb BANREGIO", "@logo19@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb Banregio") ? (t = t.replace("@cnb Banregio", "@logo19@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb GETNET") ? (t = t.replace("@cnb GETNET", "@logo20@br"), o(this, f, W).call(this, t, i, s)) : t.includes("@cnb GetNET") ? (t = t.replace("@cnb GetNET", "@logo20@br"), o(this, f, W).call(this, t, i, s)) : o(this, f, W).call(this, t, i, s);
}, kr = async function(t = !1) {
  if (o(this, f, Ar).call(this), this.__pinPad__.config.loginResponse && !t) return await o(this, f, _n).call(this);
  const e = this.url + this.__pinPad__.constants.uris.login, i = {
    usuario: this.username,
    password: this.password,
    crypto: "",
    version: this.__pinPad__.constants.appVersion,
    serieLector: "",
    canal: this.__pinPad__.constants.appChannel
  };
  if (await o(this, f, ee).call(this), o(this, f, gn).call(this))
    throw new Error("Empty RSA Key");
  const s = o(this, f, Yt).call(this, 32), a = o(this, f, Zt).call(this, this.__pinPad__.config.publicKeyRSA, s), c = await o(this, f, te).call(this, s, JSON.stringify(i)), l = await q.post(e, c, {
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0",
      data: a || ""
    }
  }).catch((p) => {
    var _;
    throw new Error(`Error in request, verify internet connection: ${(_ = p.response) == null ? void 0 : _.status} ${p.message}`);
  });
  let h = o(this, f, vn).call(this, JSON.stringify(l.data));
  if (typeof h == "string" && (h = JSON.parse(h)), !h)
    throw new Error("Invalid response JSON");
  if (h.RESPUESTA === "error")
    throw new Error(h);
  return this.__pinPad__.config.loginResponse = h, localStorage.setItem(
    "ppLoginResponse",
    JSON.stringify({
      timestamp: (/* @__PURE__ */ new Date()).getTime(),
      data: h
    })
  ), await o(this, f, _n).call(this);
}, _n = async function() {
  await o(this, f, Br).call(this);
  try {
    await o(this, f, Or).call(this);
  } catch (t) {
    console.log("Error getting position", t);
  }
  return this.__pinPad__.config.otherLogin = {}, o(this, f, xr).call(this, this.__pinPad__.config.loginResponse), this.__pinPad__.config.otherLogin;
}, xr = function(t) {
  var a, c, l, h, p, _;
  let e = "", i = "";
  (c = (a = t.xml) == null ? void 0 : a.ventaspropias) != null && c.merchant_currencyb && (e = t.xml.ventaspropias.merchant_currencyb), (h = (l = t.xml) == null ? void 0 : l.ventaspropias) != null && h.merchant_currencym && (i = t.xml.ventaspropias.merchant_currencym);
  let s = (p = t.xml) == null ? void 0 : p.emvReverso;
  s || (s = "0"), this.__pinPad__.config.internal.stTokenization = (_ = t.xml) == null ? void 0 : _.st_tokenizacion, !this.__pinPad__.config.internal.stTokenization || this.__pinPad__.config.internal.stTokenization === "false" || this.__pinPad__.config.internal.stTokenization === "0" ? this.__pinPad__.config.internal.stTokenization = !1 : this.__pinPad__.config.internal.stTokenization && (this.__pinPad__.config.internal.stTokenization = !0), this.__pinPad__.config.internal.emv = t.xml.importesPGS, this.__pinPad__.config.internal.qpsDomestic = this.__pinPad__.config.internal.emv.qps_dom, this.__pinPad__.config.internal.qpsInternational = this.__pinPad__.config.internal.emv.qps_il, this.__pinPad__.config.internal.cvmlVMCDomestic = this.__pinPad__.config.internal.emv.cvml_vm_dom, this.__pinPad__.config.internal.cvmlVMCInternational = this.__pinPad__.config.internal.emv.cvml_vm_il, this.__pinPad__.config.internal.cvmlAmex = this.__pinPad__.config.internal.emv.cvml_amex, this.__pinPad__.config.internal.translimitCTLSVMC = this.__pinPad__.config.internal.emv.tl_mc, this.__pinPad__.config.internal.translimitCTLSAmex = this.__pinPad__.config.internal.emv.tl_amex, this.__pinPad__.config.country = t.country.toUpperCase(), this.__pinPad__.config.idBranch = t.id_branch.toUpperCase(), this.__pinPad__.config.idCompany = t.id_company.toUpperCase(), this.__pinPad__.config.otherLogin = {
    bsUser: t.user,
    nbUser: t.nb_user,
    bsCompany: t.id_company,
    nbCompany: t.nb_company,
    nbStreetCompany: t.nb_companystreet,
    bsBranch: t.id_branch,
    nbBranch: t.nb_branch,
    bsCountry: t.country,
    coins: e,
    coinsMOTO: i,
    executeReverse: s
  };
}, Ar = function() {
  let t = localStorage.getItem("ppLoginResponse");
  t && (t = JSON.parse(t), this.__pinPad__.config.loginResponse || (this.__pinPad__.config.loginResponse = t.data), (/* @__PURE__ */ new Date()).getTime() - t.timestamp >= 864e5 && (this.__pinPad__.config.loginResponse = null));
}, Dr = async function() {
  const t = this.url + this.__pinPad__.constants.uris.RSAKey, e = await q.get(t).catch((i) => {
    throw new Error(`Error in request, verify internet connection: ${i.response.status} ${i.message}`);
  });
  if (e.headers.get("content-type").indexOf("application/json") === -1)
    throw new Error("Fail to fetch RSA public key");
  return this.__pinPad__.config.publicKeyRSA = e.data.key_public, localStorage.setItem(
    "ppRSAKey",
    JSON.stringify({
      timestamp: (/* @__PURE__ */ new Date()).getTime(),
      data: e.data.key_public
    })
  ), this.__pinPad__.config.publicKeyRSA;
}, gn = function() {
  let t = localStorage.getItem("ppRSAKey");
  return !t || (t = JSON.parse(t), this.__pinPad__.config.publicKeyRSA = t.data, (/* @__PURE__ */ new Date()).getTime() - t.timestamp >= 864e5) ? !0 : !this.__pinPad__.config.publicKeyRSA;
}, bn = async function() {
  return o(this, f, gn).call(this) ? await o(this, f, Dr).call(this) : this.__pinPad__.config.publicKeyRSA;
}, ee = async function() {
  if (!await o(this, f, bn).call(this))
    throw new Error("RSA public key is empty");
}, mn = function(t) {
  return /^[A-Z-a-z0-9\s]+$/g.test(t);
}, Rr = function(t) {
  if (Et(t))
    return !0;
  const e = /^[A-Z-a-z0-9\s]+$/g.test(t) === !0;
  if (!e)
    throw new Error("Invalid reference");
  return e;
}, ft = function(t) {
  return t.length.toString().padStart(3, "0");
}, _t = function(t) {
  let e = 0;
  for (let i = 0; i < t.length; i++)
    e ^= t.charCodeAt(i);
  return String.fromCharCode(e);
}, Ee = function(t, e = 0) {
  return t = parseFloat(t.toString().replace(/[^0-9.-]/g, "")), isNaN(t) ? 0 .toFixed(e) : t.toFixed(e).replace(/,/g, "");
}, yn = function(t) {
  return t = parseFloat(t.toString()), !(isNaN(t) || t < 0);
}, ne = async function(t) {
  for (const e in t)
    if (typeof t[e] > "u" || t[e] === null || t[e] === "")
      throw new Error("Object incomplete to process");
  return t;
}, wn = function(t) {
  if (!t || isNaN(parseInt(t)) || t.toString().length !== 9)
    throw new Error("Number of operation must be number of 9 digits");
  return t;
}, vn = function(t) {
  if (typeof t != "string") throw new Error("Invalid string");
  return !t || /<html(?:\s+lang=["'][^"']*["'])?>/i.test(t) || (t = t.replace(/aaa/g, "á"), t = t.replace(/eee/g, "é"), t = t.replace(/iii/g, "í"), t = t.replace(/ooo/g, "ó"), t = t.replace(/uuu/g, "ú"), t = t.replace(/NNN/g, "Ñ"), t = t.replace(/nnn/g, "ñ"), t = t.replace(/Ã¡/g, "á")), t;
}, Ir = async function() {
  const t = this.__pinPad__.constants.STX, e = this.__pinPad__.constants.ETX;
  let i = "C55ACANCEL";
  i = t + o(this, f, ft).call(this, i) + i + e, i = i + o(this, f, _t).call(this, i);
  const s = this.parseStringToBytes(i, "");
  await this.appendToQueue(s, "cancel");
}, Pn = function() {
  const t = /* @__PURE__ */ new Date(), e = t.getDate().toString().padStart(2, "0"), i = (t.getMonth() + 1).toString().padStart(2, "0"), s = t.getFullYear().toString().substring(2);
  return e + i + s;
}, En = function() {
  const t = /* @__PURE__ */ new Date(), e = t.getHours().toString().padStart(2, "0"), i = t.getMinutes().toString().padStart(2, "0");
  return e + i;
}, Or = async function() {
  return this.__pinPad__.config.latitude && this.__pinPad__.config.longitude ? this.latitudeLongitude : (this.__pinPad__.config.latitude = null, this.__pinPad__.config.longitude = null, Hn() ? new Promise((t) => {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        this.__pinPad__.config.latitude = e.coords.latitude, this.__pinPad__.config.longitude = e.coords.longitude, t(this.latitudeLongitude);
      },
      () => {
        t(this.latitudeLongitude);
      }
    );
  }) : this.latitudeLongitude);
}, Br = async function() {
  let t = localStorage.getItem("ppPublicIP");
  if (t && (t = JSON.parse(t), this.__pinPad__.config.publicIP = t.data, (/* @__PURE__ */ new Date()).getTime() - t.timestamp >= 864e5 && (this.__pinPad__.config.publicIP = null)), this.__pinPad__.config.publicIP) return this.__pinPad__.config.publicIP;
  this.__pinPad__.config.publicIP = null;
  let e = !1;
  const i = await q.get("https://api.ipify.org?format=json").catch(() => e = !0);
  return e ? null : (this.__pinPad__.config.publicIP = i.data.ip || null, localStorage.setItem(
    "ppPublicIP",
    JSON.stringify({
      timestamp: (/* @__PURE__ */ new Date()).getTime(),
      data: i.data.ip
    })
  ), this.__pinPad__.config.publicIP);
}, qt = async function(t, e) {
  await o(this, f, ee).call(this);
  const i = o(this, f, Yt).call(this, 32);
  let s = o(this, f, Zt).call(this, this.__pinPad__.config.publicKeyRSA, i), a = await o(this, f, te).call(this, i, JSON.stringify(e));
  return (await q.post(t, a, {
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      data: s || ""
    }
  }).catch((l) => {
    var h;
    throw l.response.data.includes("Ha ocurrido un error al procesar su solicitud.") ? new Error("It was not possible to obtain the affiliations.") : l.response.status >= 500 && l.response.status <= 599 ? new Error(`Service Temporarily Unavailable ${l.message}`) : new Error(`Error in request, verify internet connection: ${(h = l.response) == null ? void 0 : h.status} ${l.message}`);
  })).data;
}, Tn = async function({ data: t, url: e, cancelable: i = !1 } = {}) {
  await o(this, f, ee).call(this);
  const s = o(this, f, Yt).call(this, 32), a = o(this, f, Zt).call(this, this.__pinPad__.config.publicKeyRSA, s), c = await o(this, f, te).call(this, s, JSON.stringify(t)), l = this;
  return (await q.post(e, c, {
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      data: a || ""
    }
  }).catch(async (p) => {
    var m;
    let _ = `Error in request, verify internet connection: ${p.status} ${p.message}`;
    throw p.response.status >= 500 && p.response.status <= 599 ? _ = "Service Temporarily Unavailable" : p.response.status >= 400 && p.response.status <= 499 && (_ = "Bad Request"), i && await o(m = l, f, Ir).call(m), new Error(_);
  })).data;
}, Nr = async function() {
  const t = this.__pinPad__.constants.FS, e = this.__pinPad__.constants.ETX, i = this.__pinPad__.constants.STX;
  let s = "C57A" + this.__pinPad__.config.internal.qpsDomestic;
  if (s = s + t + "B" + this.__pinPad__.config.internal.qpsInternational, s = s + t + "C" + this.__pinPad__.config.internal.cvmlVMCDomestic, s = s + t + "D" + this.__pinPad__.config.internal.cvmlVMCInternational, s = s + t + "E" + this.__pinPad__.config.internal.cvmlAmex, s = s + t + "F" + this.__pinPad__.config.internal.translimitCTLSVMC, s = s + t + "G" + this.__pinPad__.config.internal.translimitCTLSAmex, s = i + o(this, f, ft).call(this, s) + s + e, s = s + o(this, f, _t).call(this, s), !this.__pinPad__.about.injectedValues) {
    const a = this.parseStringToBytes(s, "");
    await this.appendToQueue(a, "inject");
  }
}, Mr = async function() {
  this.__pinPad__.operation.bin8 && (this.__pinPad__.operation.bin = this.__pinPad__.operation.bin8), this.__pinPad__.operation.bin8 = "";
  const t = await o(this, f, Tn).call(this, {
    data: {
      accion: "tipoPagoInfo",
      cc_num: this.__pinPad__.operation.bin,
      usuario: this.username.toUpperCase(),
      canal: this.__pinPad__.constants.typeChannel,
      tp_canal: "1",
      tp_moneda: this.__pinPad__.config.currency.toUpperCase()
    },
    url: this.url + this.__pinPad__.constants.uris.merchant,
    cancelable: !0
  });
  if (!t.respuesta || t.respuesta === "0") {
    let e = "C55ACANCEL";
    const i = this.__pinPad__.constants.STX, s = this.__pinPad__.constants.ETX;
    e = i + o(this, f, ft).call(this, e) + e + s, e = e + o(this, f, _t).call(this, e);
    const a = this.parseStringToBytes(e, "");
    return await this.appendToQueue(a, "cancel"), !1;
  }
  return this.__pinPad__.operation.merchant = t, this.__pinPad__.operation.onlyMerchant = t.contado.af.length > 1 ? t.contado.af[0].merchant : t.contado.af.merchant, !0;
}, Fr = async function(t = null) {
  if (this.__pinPad__.waiting.statusAboutWaiting) throw new Error("AboutPP is already running");
  const e = this.__pinPad__.constants.STX, i = this.__pinPad__.constants.ETX;
  let s = "C56AABOUT";
  if (s = e + o(this, f, ft).call(this, s) + s + i, s = s + o(this, f, _t).call(this, s), Et(this.__pinPad__.about.pp)) {
    this.__pinPad__.waiting.statusAboutWaiting = "pending";
    const l = this.parseStringToBytes(s, "");
    await this.appendToQueue(l, "about");
  } else
    return t ? t(this.__pinPad__.about.pp.supportDUKPT, this.__pinPad__.about.pp.hasDUKPTKeys) : !0;
  const a = this;
  let c = 0;
  return new Promise((l, h) => {
    c = setInterval(() => {
      if (a.__pinPad__.waiting.statusAboutWaiting === "resolved") {
        if (clearInterval(c), a.__pinPad__.waiting.statusAboutWaiting = null, Et(a.__pinPad__.about.pp))
          return;
        t || l(!0), l(t(a.__pinPad__.about.pp.supportDUKPT, a.__pinPad__.about.pp.hasDUKPTKeys));
      } else a.__pinPad__.waiting.statusAboutWaiting === "rejected" && (clearInterval(c), a.__pinPad__.waiting.statusAboutWaiting = null, h("Error"));
    }, 500);
  });
}, Te = async function(t, e) {
  if (t = t ? t.toString() : "", e = e ? e.toString() : "", Et(t) || t === "0") {
    this.dispatch("pp:dukpt", { status: "unsupported", already: !1 });
    return;
  }
  if (Et(e) || e === "1") {
    this.dispatch("pp:dukpt", { status: "charged", already: !0 });
    return;
  }
  const i = o(this, f, Pn).call(this), s = o(this, f, En).call(this), a = this.__pinPad__.constants.FS, c = this.__pinPad__.constants.ETX, l = this.__pinPad__.constants.STX;
  let h = "C91A" + i + a + "B" + s;
  h = l + o(this, f, ft).call(this, h) + h + c, h = h + o(this, f, _t).call(this, h);
  const p = this.parseStringToBytes(h, "");
  await this.appendToQueue(p, "init-dukpt");
  let _ = 0;
  this.__pinPad__.waiting.statusinitDUKPTWaiting = "pending";
  const m = this;
  return new Promise((P, v) => {
    _ = setInterval(async () => {
      var S;
      m.__pinPad__.waiting.statusinitDUKPTWaiting === "resolved" ? (clearInterval(_), m.__pinPad__.waiting.statusinitDUKPTWaiting = null, m.dispatch("pp:dukpt", { status: "charged", already: !1 }), await o(S = m, f, Ur).call(S), P(!0)) : m.__pinPad__.waiting.statusinitDUKPTWaiting === "rejected" && (clearInterval(_), m.__pinPad__.waiting.statusinitDUKPTWaiting = null, v("Error"));
    }, 500);
  });
}, Ur = async function() {
  const t = {
    IPEK_REQUESTType: {
      business: {
        country: this.__pinPad__.config.country.toUpperCase(),
        id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
        id_company: this.__pinPad__.config.idCompany.toUpperCase(),
        pwd: this.password.toUpperCase(),
        user: this.username.toUpperCase()
      },
      terminal: this.__pinPad__.config.terminal
    }
  }, e = await o(this, f, Tn).call(this, {
    data: t,
    url: this.url + this.__pinPad__.constants.uris.keysDUKPT
  });
  await o(this, f, $r).call(this, e);
}, Lr = async function() {
  if (!await o(this, f, bn).call(this))
    throw new Error("RSA public key is empty");
  const e = this;
  await o(this, f, Fr).call(this, async function(s, a) {
    var l, h;
    if (e.__pinPad__.about.supportInjection && e.__pinPad__.config.internal.emv && e.__pinPad__.about.injectedValues)
      return await o(l = e, f, Te).call(l, s, a), !0;
    let c = 0;
    return e.__pinPad__.waiting.statusInjectWaiting = "pending", await o(h = e, f, Nr).call(h), new Promise((p, _) => {
      c = setInterval(async () => {
        var m;
        e.__pinPad__.waiting.statusInjectWaiting === "resolved" ? (clearInterval(c), e.__pinPad__.waiting.statusInjectWaiting = null, await o(m = e, f, Te).call(m, s, a), p(!0)) : e.__pinPad__.waiting.statusInjectWaiting === "rejected" && (clearInterval(c), e.__pinPad__.waiting.statusInjectWaiting = null, _("Error"));
      }, 500);
    });
  });
}, Cn = function(t, e = 0) {
  if (t = parseFloat(t.toString().replace(/[^0-9.-]/g, "")), isNaN(t) || t === 0)
    return parseFloat("0").toFixed(e);
  t = t.toFixed(e);
  let i = t.split(".");
  return i[0] = i[0].replace(/\B(?=(\d{3})+(?!\d))/g, ""), i.join(".");
}, Vr = async function() {
  this.__pinPad__.operation.errors = 0;
  let t = "ACERQUE, INSERTE CHIP O  DESLICE TARJETA";
  if (this.__pinPad__.about.supportContactless || (t = "INSERTE CHIP O  DESLICE TARJETA"), this.__pinPad__.about.model.toUpperCase().includes("UX300") && (t = "ACERQUE O INSERTE TARJETA"), Et(this.amount) || this.amount <= 0)
    throw new Error("Amount required");
  if (o(this, f, yn).call(this, this.amount) === !1)
    throw new Error("Invalid amount required");
  if (o(this, f, Ee).call(this, this.amount, 2) <= 0)
    throw new Error("Amount must be greater than 0");
  const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.STX, s = this.__pinPad__.constants.ETX;
  let a = "C93A" + t;
  a = a + e + "B" + o(this, f, Pn).call(this), a = a + e + "C" + o(this, f, En).call(this), a = a + e + "D" + o(this, f, Ee).call(this, this.amount, 2), a = a + e + "E0.00", a = a + e + "F" + this.__pinPad__.config.currencyCode, this.__pinPad__.about.supportDUKPT && this.__pinPad__.about.supportDUKPT !== "0" && this.__pinPad__.about.supportDUKPT !== "false" && (this.__pinPad__.about.supportContactless ? (a = a + e + "G" + this.timeoutPinPad, a = a + e + "HTAGS", a = a + e + "I" + this.__pinPad__.config.requireCVVAmex, a = a + e + "J" + this.__pinPad__.config.forceOnline, a = a + e + "K" + this.__pinPad__.about.supportContactless, a = a + e + "L" + this.__pinPad__.config.emvCard, this.__pinPad__.about.hasCashback && (a = a + e + "M0", a = a + e + "N00")) : (a = a + e + "G" + this.timeoutPinPad, a = a + e + "HTAGS", a = a + e + "I" + this.__pinPad__.config.requireCVVAmex, a = a + e + "L" + this.__pinPad__.config.emvCard), this.__pinPad__.about.supportInjection && (a = a + e + "O" + this.__pinPad__.config.validateQPS)), a = i + o(this, f, ft).call(this, a) + a + s, a = a + o(this, f, _t).call(this, a), o(this, f, Qr).call(this);
  const c = this.parseStringToBytes(a, "");
  await this.appendToQueue(c, "read-card");
  let l = 0;
  const h = this;
  return this.__pinPad__.waiting.statusReadCardWaiting = "pending", new Promise((p, _) => {
    l = setInterval(() => {
      if (h.__pinPad__.waiting.statusReadCardWaiting === "resolved")
        clearInterval(l), h.__pinPad__.waiting.statusReadCardWaiting = null, p(!0);
      else if (h.__pinPad__.waiting.statusReadCardWaiting === "rejected") {
        clearInterval(l), h.__pinPad__.waiting.statusReadCardWaiting = null;
        const m = h.__pinPad__.operation.last_error;
        _(m ?? "Error reading card");
      }
    }, 500);
  });
}, qr = async function(t) {
  return await ut(t * 1e3);
}, jr = async function(t) {
  let e = this.url + this.__pinPad__.constants.uris.consult;
  return t > 1 && this.environment === "production" && (e = e.replace(
    this.__pinPad__.constants.urls.production,
    this.__pinPad__.constants.urls.productionAlternative
  )), this.__pinPad__.operation.consultDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB"), await o(this, f, qt).call(this, e, {
    user: this.username.toUpperCase(),
    pwd: this.password.toUpperCase(),
    id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
    id_company: this.__pinPad__.config.idCompany.toUpperCase(),
    date: this.__pinPad__.operation.consultDate,
    reference: this.reference
  });
}, Hr = async function(t = "", e = {}) {
  let i = 1, s = null;
  do {
    i > 1 && this.environment === "production" && (t = t.replace(
      this.__pinPad__.constants.urls.production,
      this.__pinPad__.constants.urls.productionAlternative
    ), await o(this, f, qr).call(this, 5)), await o(this, f, ee).call(this);
    const a = o(this, f, Yt).call(this, 32), c = o(this, f, Zt).call(this, this.__pinPad__.config.publicKeyRSA, a), l = await o(this, f, te).call(this, a, JSON.stringify(e));
    let h = !1;
    const p = await q.post(t, l, {
      headers: {
        "Content-Type": "application/json",
        data: c || ""
      }
    }).catch(async (_) => {
      let m = `Error in request, verify internet connection: ${_.status} ${_.message}`;
      _.response.status >= 500 && _.response.status <= 599 ? m = "Service Temporarily Unavailable" : _.response.status >= 400 && _.response.status <= 499 && (m = "Bad Request"), console.warn(_), s = m;
      const P = await o(this, f, jr).call(this, i);
      P && P !== "{}" && !P.includes('"transacciones":""') && P.includes("nu_operaion") && (i = 5, s = "EE32"), h = !0;
    });
    if (!h)
      return p.data;
  } while (i++ <= 3);
  return s ? Promise.reject(s) : Promise.reject("Communication error with CDP. IL/MTY");
}, Kr = function(t) {
  if (Et(t)) throw new Error("Number of authorization invalid");
  if (/^[A-Za-z0-9]+$/g.test(t) !== !0) throw new Error("Number of authorization invalid");
  if (t.length !== 6) throw new Error("Number of authorization invalid");
  return !0;
}, // jsonTokenization() {
//   // build json "11"
//   return {
//     TOKENIZATION_TP: {
//       business: {
//         id_company: this.__pinPad__.config.idCompany,
//         id_branch: this.__pinPad__.config.idBranch,
//         user: this.username,
//         pwd: this.password,
//       },
//       transacction_tkn: {
//         version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion,
//         serie: this.__pinPad__.about.serial,
//         version_terminal: this.__pinPad__.about.appVersion,
//         modelo_terminal: this.__pinPad__.about.model,
//       },
//       dukpt: {
//         tp_dukpt: '1',
//         nb_ksn: this.__pinPad__.config.read.NB_ksn,
//         nb_data: this.__pinPad__.config.read.NB_Data,
//       },
//       tkn_reference: this.reference,
//       geolocation: {
//         latitude: this.__pinPad__.config.latitude,
//         longitude: this.__pinPad__.config.longitude,
//         ip: this.__pinPad__.config.publicIP,
//       },
//     },
//   };
// }
Wr = function(t) {
  var s, a;
  const e = this;
  this.__pinPad__.operation.responseMit._approved = t.response === "approved", this.__pinPad__.operation.responseMit._status = t.response, this.__pinPad__.operation.responseMit._originalToken = t.number_tkn ?? "", this.__pinPad__.operation.folio = t.foliocpagos, this.__pinPad__.operation.authorization = t.auth;
  let i = (s = t.cd_response) == null ? void 0 : s.toUpperCase();
  return i.toUpperCase() === "0C" || this.__pinPad__.operation.responseMit._approved ? i = "00" : (i !== "Z3" && i !== "05" || t.cd_error === "92") && (i = "01"), this.__pinPad__.operation.responseMit._cdResponse = i, this.__pinPad__.finishCommand.A = i, this.__pinPad__.finishCommand.B = "", this.__pinPad__.finishCommand.C = "", this.__pinPad__.finishCommand.D = "", this.__pinPad__.finishCommand.E = t.emv_key_date ? t.emv_key_date : "", this.__pinPad__.finishCommand.F = t.icc_csn ? t.icc_csn : "", this.__pinPad__.finishCommand.G = t.icc_atc ? t.icc_atc : "", this.__pinPad__.finishCommand.H = t.icc_arpc ? t.icc_arpc : "", this.__pinPad__.finishCommand.I = t.icc_issuer_script ? t.icc_issuer_script : "", this.__pinPad__.finishCommand.J = t.authorized_amount ? t.authorized_amount : "", this.__pinPad__.finishCommand.K = t.account_balance_1 ? t.account_balance_1 : "", {
    reference: t.reference,
    response: t.response,
    foliocpagos: t.foliocpagos,
    auth: t.auth,
    cd_response: i,
    cd_error: t.cd_error,
    nb_error: o(a = e, f, vn).call(a, t.nb_error ?? ""),
    time: t.time,
    date: t.date,
    nb_company: t.nb_company,
    nb_merchant: t.nb_merchant,
    nb_street: t.nb_street,
    cc_type: t.cc_type,
    tp_operation: t.tp_operation,
    cc_name: t.cc_name,
    cc_number: t.cc_number,
    cc_expmonth: t.cc_expmonth,
    cc_expyear: t.cc_expyear,
    amount: t.amount,
    voucher_comercio: t.voucher_comercio,
    voucher_cliente: t.voucher_cliente,
    friendly_response: t.friendly_response,
    appid: t.appid,
    appidlabel: t.appidlabel,
    arqc: t.arqc
  };
}, zr = async function() {
  var s, a;
  const t = this;
  this.__pinPad__.operation.errors = 0, this.__pinPad__.operation.ignore.counterSale = !1;
  const e = this.__pinPad__.operation.onlyMerchant;
  if (/^[0-9]+$/.test(e) === !1) throw new Error("Invalid merchant");
  this.__pinPad__.operation.typeOperation = "29";
  let i = {
    error: !1,
    message: null,
    approved: !1,
    object: {}
  };
  try {
    const c = await o(this, f, Cn).call(this, this.amount, 2);
    await o(this, f, ne).call(this, {
      Ambiente: this.environment,
      Country: this.__pinPad__.config.country,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      pwd: this.password,
      User: this.username,
      UserTRX: "userPinpadWeb",
      EMV: this.__pinPad__.config.read.EMV,
      ModeloTerminal: this.__pinPad__.about.model,
      SerieTerminal: this.__pinPad__.about.serial,
      Contactless: this.__pinPad__.about.supportContactless,
      Printer: this.__pinPad__.about.printer,
      VersionTerminal: this.__pinPad__.about.appVersion,
      TpOperation: this.__pinPad__.operation.typeOperation,
      Reference: this.reference,
      Amount: c,
      Currency: this.__pinPad__.config.currency,
      Merchant: e,
      Reverse: this.__pinPad__.config.otherLogin.executeReverse
    });
    const l = this.__pinPad__.about.supportContactless && this.__pinPad__.about.supportContactless !== "0" ? "1" : "0", h = await o(this, f, Hr).call(this, this.url + this.__pinPad__.constants.uris.sale, {
      VMCAMEXB: {
        business: {
          country: this.__pinPad__.config.country.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany.toUpperCase(),
          pwd: this.password.toUpperCase(),
          user: this.username.toUpperCase()
        },
        dcc: {
          dcc_amount: "0",
          dcc_status: "0"
        },
        transacction: {
          amount: c,
          creditcard: {
            appid: this.__pinPad__.config.read.AppId,
            appidlabel: this.__pinPad__.config.read.AppIdLabel,
            arqc: this.__pinPad__.config.read.Arqc,
            chip: this.__pinPad__.config.read.Chip,
            chipname: this.__pinPad__.config.read.ChipName,
            chipnameenc: this.__pinPad__.config.read.ChipNameEnc,
            contactless: this.__pinPad__.config.read.ReadCTLS,
            crypto: "4",
            dukpt: {
              nb_data: this.__pinPad__.config.read.NB_Data,
              nb_ksn: this.__pinPad__.config.read.NB_ksn,
              tp_dukpt: "1"
            },
            pin: this.__pinPad__.config.read.PIN,
            posentrymode: this.__pinPad__.config.read.POSEM,
            tags: this.__pinPad__.config.read.Tags,
            type: this.__pinPad__.config.read.Type
          },
          currency: this.__pinPad__.config.currency.toUpperCase(),
          emv: this.__pinPad__.config.read.EMV,
          merchant: this.__pinPad__.operation.onlyMerchant,
          modelo_terminal: this.__pinPad__.about.model,
          reference: this.reference,
          serie: this.__pinPad__.about.serial,
          terminal: {
            display: "1",
            is_contactless: l,
            is_mobile: "0",
            printer: this.__pinPad__.about.printer
          },
          tp_operation: this.__pinPad__.operation.typeOperation,
          tp_resp: this.__pinPad__.operation.typeResponse,
          usrtransacction: this.username.toUpperCase(),
          version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion,
          version_terminal: this.__pinPad__.about.appVersion
        },
        geolocation: {
          latitude: this.__pinPad__.config.latitude,
          longitude: this.__pinPad__.config.longitude,
          ip: this.__pinPad__.config.publicIP
        }
      }
    });
    h.response === "error" && (i.error = !0, i.message = h.nb_error || "Error in response");
    const p = o(this, f, Wr).call(this, h);
    return i.object = p, await o(this, f, Xr).call(this, p), i.approved = this.__pinPad__.operation.responseMit._approved, this.__pinPad__.operation.finalResult = p, i;
  } catch (c) {
    throw t.__pinPad__.finishCommand.A = "01", t.__pinPad__.finishCommand.B = "", t.__pinPad__.finishCommand.C = "", t.__pinPad__.finishCommand.D = "", t.__pinPad__.finishCommand.E = "", t.__pinPad__.finishCommand.F = "", t.__pinPad__.finishCommand.G = "", t.__pinPad__.finishCommand.H = "", t.__pinPad__.finishCommand.I = "", t.__pinPad__.finishCommand.J = "", t.__pinPad__.finishCommand.K = "", await o(a = t, f, Jr).call(a, o(s = t, f, kn).call(s, c)), c;
  }
}, Xr = async function(t) {
  if (this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1")
    return this.dispatch("pp:finish-emv", t), !0;
  const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.STX, s = this.__pinPad__.constants.ETX;
  let a = "C93A" + this.__pinPad__.finishCommand.A;
  a = a + e + "B" + this.__pinPad__.finishCommand.B, a = a + e + "C" + this.__pinPad__.finishCommand.C, a = a + e + "D" + this.__pinPad__.finishCommand.D, a = a + e + "E" + this.__pinPad__.finishCommand.E, a = a + e + "F" + this.__pinPad__.finishCommand.F, a = a + e + "G" + this.__pinPad__.finishCommand.G, a = a + e + "H" + this.__pinPad__.finishCommand.H, a = a + e + "I" + this.__pinPad__.finishCommand.I, a = a + e + "J" + this.__pinPad__.finishCommand.J, a = a + e + "K" + this.__pinPad__.finishCommand.K, a = i + o(this, f, ft).call(this, a) + a + s, a = a + o(this, f, _t).call(this, a);
  const c = this.parseStringToBytes(a, "");
  this.__pinPad__.waiting.statusSecondGenerateWaiting = "pending", await this.appendToQueue(c, "second-generate");
  let l = 0;
  const h = this;
  return new Promise((p, _) => {
    l = setInterval(async () => {
      var m, P;
      if (h.__pinPad__.waiting.statusSecondGenerateWaiting === "resolved") {
        if (clearInterval(l), h.__pinPad__.waiting.statusSecondGenerateWaiting = null, h.__pinPad__.operation.applyReverse) {
          const v = await o(m = h, f, qt).call(m, h.url + h.__pinPad__.constants.uris.reverse, {
            VMCAMEXMREVERSO: {
              business: {
                id_company: this.__pinPad__.config.idCompany.toUpperCase(),
                id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
                country: this.__pinPad__.config.country.toUpperCase(),
                user: this.username.toUpperCase(),
                pwd: this.password.toUpperCase()
              },
              transacction: {
                amount: o(this, f, Ee).call(this, this.amount, 2),
                no_operacion: this.__pinPad__.operation.folio,
                auth: this.__pinPad__.operation.authorization.toUpperCase(),
                tracks: "",
                usrtransacction: this.username.toUpperCase(),
                crypto: "2",
                version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion
              }
            }
          }), S = JSON.parse(v);
          let C;
          S.response === "approved" ? C = { message: "Transaction rejected by PinPad." } : C = { message: "No communication, please check your report." }, h.__pinPad__.operation.ignore.counterSale || (h.dispatch("pp:finish-emv", C), h.__pinPad__.operation.ignore.counterSale = !0);
        } else
          h.__pinPad__.operation.ignore.counterSale || (h.dispatch("pp:finish-emv", t), h.__pinPad__.operation.ignore.counterSale = !0);
        t.cd_error === "92" && await o(P = h, f, Gr).call(P, t, a), p(!0);
      } else h.__pinPad__.waiting.statusSecondGenerateWaiting === "rejected" && (clearInterval(l), h.__pinPad__.waiting.statusSecondGenerateWaiting = null, _("There is no response from the reader, check that it is connected."));
    }, 500);
  });
}, Gr = async function(t, e) {
  this.__pinPad__.operation.ignore.responseGlobal = t, this.__pinPad__.operation.ignore.C93Global = e, this.__pinPad__.operation.ignore.isError92TRX = !0, await o(this, f, Te).call(this, 1, 0);
}, Sn = async function() {
  if (this.__pinPad__.operation.ignore.isError92TRX = !1, this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1")
    this.dispatch("pp:response", this.__pinPad__.operation.ignore.responseGlobal);
  else {
    const t = this.parseStringToBytes(this.__pinPad__.operation.ignore.C93Global, "");
    await this.appendToQueue(t, "code93"), await ut(1400), this.dispatch("pp:response", this.__pinPad__.operation.ignore.responseGlobal);
  }
}, kn = function(t) {
  const e = {
    PPE02: "Importe Incorrecto.",
    A02: "Importe Incorrecto.",
    PPE03: "No hay respuesta del lector, verifique que se encuentra conectado.",
    A03: "No hay respuesta del lector, verifique que se encuentra conectado.",
    PP18: "Sin comunicación, por favor verifique su reporte.",
    PP24: "Transacción declinada por la PinPad.",
    A01: "Tarjeta Ilegible.",
    A04: "No hay planes de pago para esta tarjeta, por favor cambie la tarjeta.",
    A10: "Operación cancelada por el usuario.",
    A11: "Proceso cancelado por timeout.",
    A12: "Lectura errónea de banda/chip.",
    A13: "Carga de llave fallida.",
    A14: "Error de lectura de PIN.",
    A15: "Tarjeta Vencida.",
    A16: "Problemas al leer el chip.",
    A17: "Impresora sin Papel.",
    E17: "Impresora sin Papel.",
    A21: "Información no almacenada correctamente.",
    A22: "Tarjeta bloqueada.",
    A23: "Sin llave de cifrado DUKPT.",
    A28: "Fallback no soportado.",
    EE19: "Error de conexión, verifique su reporte.",
    EE21: "Ha ocurrido un error al procesar su solicitud.",
    EE22: "Ha ocurrido un error de conexión al servidor.",
    EE23: "El número de operación no puede ir vacío.",
    EE24: "El número de operación debe ser de 9 dígitos.",
    EE25: "El número de operación debe ser numérico.",
    EE26: "La información enviada al servicio está incompleta.",
    EE27: "La referencia contiene caracteres inválidos o está vacía.",
    EE28: "Número de autorización inválido.",
    EE29: "Importe inválido.",
    EE30: "La información enviada al servicio no es válida.",
    EE31: "No fue posible obtener las afiliaciones.",
    EE32: "Error de conexión, existe una o más transacciones en el servidor , Favor de validar su reporte y en su caso reimprimir el voucher.",
    EE33: "Error de comunicacion con CDP. IL/MTY",
    EE20: "La Referencia contiene caracteres inválidos",
    EE99: "Error código 99."
  };
  let i = e[t] ? {
    error: t,
    message: e[t]
  } : { error: t, message: "Error desconocido" };
  return this.dispatch("pp:error", i), i;
}, Jr = async function(t) {
  const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.STX, s = this.__pinPad__.constants.ETX;
  let a = "C93A" + this.__pinPad__.finishCommand.A;
  if (a = a + e + "B" + this.__pinPad__.finishCommand.B, a = a + e + "C" + this.__pinPad__.finishCommand.C, a = a + e + "D" + this.__pinPad__.finishCommand.D, a = a + e + "E" + this.__pinPad__.finishCommand.E, a = a + e + "F" + this.__pinPad__.finishCommand.F, a = a + e + "G" + this.__pinPad__.finishCommand.G, a = a + e + "H" + this.__pinPad__.finishCommand.H, a = a + e + "I" + this.__pinPad__.finishCommand.I, a = a + e + "J" + this.__pinPad__.finishCommand.J, a = a + e + "K" + this.__pinPad__.finishCommand.K, a = i + o(this, f, ft).call(this, a) + a + s, a = a + o(this, f, _t).call(this, a), this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1") {
    this.dispatch("pp:finish-emv", t);
    return;
  }
  const c = this.parseStringToBytes(a, "");
  await this.appendToQueue(c, "finish-emv-end");
}, $r = async function(t) {
  if (t.cd_estatus = t.cd_estatus ? t.cd_estatus : "0", t.cd_estatus !== "1") {
    this.__pinPad__.operation.ignore.isError92TRX && await o(this, f, Sn).call(this);
    return;
  }
  const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.ETX, s = this.__pinPad__.constants.STX, a = t.nb_ksn, c = t.nb_kcv || "", l = t.nb_ipek || "";
  let h = "C92A" + a + e + "B" + c + e + "C" + l;
  h = s + o(this, f, ft).call(this, h) + h + i, h = h + o(this, f, _t).call(this, h);
  const p = this.parseStringToBytes(h, "");
  await this.appendToQueue(p, "dukpt");
  let _ = 0;
  this.__pinPad__.waiting.statuswritingDUKPTWaiting = "pending";
  const m = this;
  return new Promise((P, v) => {
    _ = setInterval(async () => {
      var S;
      m.__pinPad__.waiting.statuswritingDUKPTWaiting === "resolved" ? (clearInterval(_), m.__pinPad__.waiting.statuswritingDUKPTWaiting = null, this.__pinPad__.operation.ignore.isError92TRX && await o(S = m, f, Sn).call(S), P(!0)) : m.__pinPad__.waiting.statuswritingDUKPTWaiting === "rejected" && (clearInterval(_), m.__pinPad__.waiting.statuswritingDUKPTWaiting = null, v("Error writing DUKPT keys"));
    }, 500);
  });
}, Qr = function() {
  this.__pinPad__.config.read.AppId = "", this.__pinPad__.config.read.AppIdLabel = "", this.__pinPad__.config.read.Arqc = "", this.__pinPad__.config.read.ChipName = "", this.__pinPad__.config.read.ReadCTLS = "", this.__pinPad__.config.read.NB_Data = "", this.__pinPad__.config.read.NB_ksn = "", this.__pinPad__.config.read.PIN = "", this.__pinPad__.config.read.POSEM = "", this.__pinPad__.config.read.Tags = "", this.__pinPad__.config.read.Type = "", this.__pinPad__.config.read.Chip = "", this.__pinPad__.config.read.ChipNameEnc = "", this.__pinPad__.operation.ignore.error = "", this.__pinPad__.operation.ignore.C93Global = "", this.__pinPad__.operation.folio = "", this.__pinPad__.operation.authorization = "", this.__pinPad__.config.tokenizeTRX = !1;
};
var g, Zr, Yr, ts, it, Ce, es, ns, is, rs, ss, as, os, cs, ls, hs, us, ds, ps, fs, _s, gs, bs, ms, ys, ws, vs, Ps, Es, Ts, Cs, Ss, ht, Q, Se, Z, gt, ks, xs, As, Ds, ie, xn, An, ke, xe, Rs;
class Ec extends Ft {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: i = 1,
    device_listen_on_port: s = 1,
    type: a = "esplus",
    support_cart: c = !0
  } = {}) {
    super({ filters: t, config_port: e, no_device: i, device_listen_on_port: s });
    X(this, g);
    J(this, "__device", {
      type: "esplus",
      support_cart: !1,
      withdraw: {
        in_process: !1,
        seconds: 60,
        interval: 0
      },
      // waiting for user withdraw products
      cart: {
        in_process: !1
      },
      channels: {
        verification: {
          clear() {
            this.running = !1, this.current = 1, this.channels = [];
          },
          running: !1,
          start: 1,
          end: 80,
          current: 1,
          channels: []
        }
      }
    });
    if (this.__internal__.device.type = "jofemar", j.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.dispense.must_response = !0, this.__internal__.time.response_general = 800, this.__internal__.time.response_engines = 800, this.__internal__.dispense.limit_counter = 40, this.__internal__.dispense.timeout = 0, this.__internal__.dispense.timeout_time = 4e3, this.__internal__.dispense.interval = 0, this.__internal__.dispense.interval_time = 1e3, this.__internal__.device.hex_number = (128 + this.listenOnPort).toString(16), this.__internal__.device.door_open = !1, this.__internal__.dispense.elevator = {
      locking_time: 60,
      locking_interval: 0,
      need_reset: !1
    }, this.deviceType = a, this.supportCart = c, o(this, g, Zr).call(this), o(this, g, ts).call(this), o(this, g, Yr).call(this);
  }
  set startChannelVerification(t) {
    const e = parseInt(t);
    if (isNaN(e)) throw new Error("Invalid start channel verification, must be a number");
    if (e < 1 || e > 126) throw new Error("Invalid start channel verification, valid range is 1 to 126");
    this.__device.channels.verification.start = e;
  }
  set endChannelVerification(t) {
    const e = parseInt(t);
    if (isNaN(e)) throw new Error("Invalid end channel verification, must be a number");
    if (e < 1 || e > 126) throw new Error("Invalid end channel verification, valid range is 1 to 126");
    this.__device.channels.verification.end = e;
  }
  set listenOnPort(t) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 31) throw new Error("Invalid port number, valid range is 1 to 31");
    this.__internal__.device.listen_on_port = t, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(t), this.__internal__.device.hex_number = (128 + t).toString(16);
  }
  set deviceType(t) {
    if (typeof t != "string") throw new Error("Invalid device type, must be a string");
    this.__device.type = t;
  }
  set supportCart(t) {
    if (typeof t != "boolean") throw new Error("Invalid support cart, must be a boolean");
    this.__device.support_cart = t;
  }
  get listenOnPort() {
    return this.__internal__.device.listen_on_port ?? 1;
  }
  serialJofemarMakeBytes(t) {
    let e = this.hexToDec(this.sumHex(t)), i = this.calcCheckSums(e.toString());
    for (let s = 0; s < 2; s++)
      t.push(this.hexMaker(i[s]));
    return t.push("03"), this.add0x(t);
  }
  calcCheckSums(t) {
    t = this.add0x([this.decToHex(parseInt(t).toString())]);
    let e = [];
    return e.push((t & 255 | 240).toString(16).toUpperCase()), e.push((t & 255 | 15).toString(16).toUpperCase()), e;
  }
  serialSetConnectionConstant(t = 1) {
    let e = ["02", "30", "30", (128 + t).toString(16), "53", "FF", "FF"], i = [];
    return e.forEach((s) => {
      i.push(this.hexMaker(s));
    }), this.serialJofemarMakeBytes(i);
  }
  serialMessage(t) {
    let i = {
      code: t,
      name: null,
      description: null,
      request: "unknown",
      no_code: 0,
      additional: {
        machine: {
          hex: null,
          dec: null
        }
      }
    };
    switch (t[0]) {
      case "02":
        i = o(this, g, Ss).call(this, t, i, 128);
        break;
      case "06":
        i = o(this, g, ks).call(this, t, i);
        break;
      case "15":
        i.name = "Checksum error", i.description = "The calculated checksum does not match the received checksum", i.no_code = 38, o(this, g, Q).call(this);
        break;
      default:
        i.name = "unknown", i.description = "The message received is unknown", i.no_code = 404;
        break;
    }
    this.dispatch("serial:message", i);
  }
  productRemovedContinueDispensing() {
    this.__internal__.dispense.elevator.locking_interval && (this.__internal__.dispense.elevator.locking_time = 0);
  }
  /**
   * Dispense a product from the machine
   * @param {null|number|string} selection
   * @param {boolean} cart
   * @return {Promise<unknown>}
   */
  async dispense({ selection: t = 1, cart: e = !1 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 130) throw new Error("Invalid selection");
    const { channel: i, tray: s } = o(this, g, xs).call(this, t);
    this.__internal__.dispense.backup_dispense = {
      selection: t,
      cart: e,
      channel: i,
      tray: s
    };
    let c = ["02", "30", "30", this.__internal__.device.hex_number, "56", s, i];
    e && (c[4] = "4D"), c = o(this, g, Ce).call(this, c);
    let l;
    do
      l = await this.internalDispense(c), o(this, g, As).call(this), l.error === "elevator-locked" ? await o(this, g, es).call(this) : l.error === "no-response" && await ut(1e3);
    while (["elevator-locked", "no-response"].includes(l.error));
    return this.__internal__.dispense.backup_dispense = {}, l;
  }
  internalClearSensing() {
    super.internalClearSensing(), this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.serial.queue.length > 0 && (this.__internal__.serial.queue = this.__internal__.serial.queue.filter((t) => t.type !== "status"));
  }
  async endDispense() {
    let e = ["02", "30", "30", this.__internal__.device.hex_number, "4D", "80", "80"];
    return e = o(this, g, Ce).call(this, e), await this.internalDispense(e);
  }
  async collect() {
    const t = ["02", "30", "30", "81", "4E", "FF", "FF"];
    return await o(this, g, it).call(this, t, "collect");
  }
  async resetSoldOutErrors() {
    return await o(this, g, ie).call(this, "80");
  }
  async resetWaitingProductRemovedError() {
    return await o(this, g, ie).call(this, "81");
  }
  async resetMachineErrors() {
    return this.__internal__.serial.queue.length === 0 ? (o(this, g, xn).call(this), await o(this, g, ie).call(this, "FF")) : new Promise((t) => {
      const e = setInterval(async () => {
        this.__internal__.serial.queue.length > 0 || (clearInterval(e), await o(this, g, ie).call(this, "FF"), o(this, g, xn).call(this), t(!0));
      }, 100);
    });
  }
  async resetAllErrors() {
    return await this.resetSoldOutErrors(), await ut(100), await this.resetWaitingProductRemovedError(), await ut(100), await this.resetMachineErrors();
  }
  async status() {
    const t = ["02", "30", "30", "81", "53", "FF", "FF"];
    return await o(this, g, it).call(this, t, "status");
  }
  async lightsOn() {
    return await o(this, g, An).call(this, "81");
  }
  async lightsOff() {
    return await o(this, g, An).call(this, "80");
  }
  async program(t, e) {
    const i = ["02", "30", "30", "81", "50", t, e];
    return await o(this, g, it).call(this, i, "program");
  }
  async programDisplayLanguage({ language: t = "spanish" } = {}) {
    const e = { spanish: "30", english: "31", french: "32" };
    if (!e[t]) throw new Error("Invalid language");
    return await this.program("49", e[t]);
  }
  async programBeeper({ enable: t = !0 } = {}) {
    const e = t ? "31" : "30";
    return await this.program("5A", e);
  }
  async programDisableWorkingTemperature() {
    if (this.__device.type === "iceplus") throw new Error("IcePlus does not support disable working temperature");
    return await this.program("54", "80");
  }
  async programDisableThermometer() {
    return await this.programDisableWorkingTemperature();
  }
  /**
   * Program the machine to work with a specific temperature
   * @param {number|string} degrees
   * @return {Promise<void>}
   */
  async programWorkingTemperature({ degrees: t = 0.5 } = {}) {
    t = parseFloat(t);
    const e = this.__device.type === "iceplus" ? 6.5 : 32, i = this.__device.type === "iceplus" ? -25 : 0.5;
    if (isNaN(t) || t < i || t > e || t % 0.5 !== 0)
      throw new Error("Invalid degrees, must be a multiple of 0.5 and between 0.5 and 32");
    let s = t * 2 + 128;
    return this.__device.type === "iceplus" && (s += 51), s = Math.ceil(s), await this.program("54", s.toString(16));
  }
  /**
   * @param {number|string} tray
   * @return {Promise<void>}
   */
  async programIsolationTray({ tray: t = 0 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 0 || t > 12) throw new Error("Invalid tray, valid range is 0 to 12");
    const e = t === 0 ? "80" : (t + 139).toString(16);
    return this.program("42", e);
  }
  /**
   * @param {number|string} seconds
   * @return {Promise<*>}
   */
  async programTimeToStandbyAfterCollect({ seconds: t = 15 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 15 || t > 120) throw new Error("Invalid seconds, valid range is 15 to 120");
    const e = (128 + t).toString(16);
    return await this.program("46", e);
  }
  /**
   * @param {number|string} seconds
   * @return {Promise<*>}
   */
  async programTimeToStandbyWithoutCollect({ minutes: t = 1 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 10) throw new Error("Invalid minutes, valid range is 1 to 10");
    const e = (128 + t).toString(16);
    return await this.program("48", e);
  }
  async programElevatorSpeed({ speed: t = "high" } = {}) {
    const e = { high: "31", low: "30" };
    if (!e[t]) throw new Error("Invalid speed, valid speeds are 'high' and 'low'");
    return await this.program("76", e[t]);
  }
  async programTemperatureExpiration({ enable: t = !1 } = {}) {
    const e = t ? "31" : "30";
    return await this.program("63", e);
  }
  async programEnableTemperatureExpiration() {
    return await this.programTemperatureExpiration({ enable: !0 });
  }
  async programDisableTemperatureExpiration() {
    return await this.programTemperatureExpiration({ enable: !1 });
  }
  /**
   * @param {number|string} address
   * @return {Promise<*>}
   */
  async programMachineAddress({ address: t = 1 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 31) throw new Error("Invalid address, valid range is 1 to 31");
    const e = (128 + t).toString(16);
    return await this.program("64", e);
  }
  /**
   * @param {number|string} degrees
   * @return {Promise<*>}
   */
  async programTemperatureBeforeExpiration({ degrees: t = 0.5 } = {}) {
    if (t = parseFloat(t), isNaN(t) || t < 0.5 || t > 30 || t % 0.5 !== 0)
      throw new Error("Invalid degrees, must be a multiple of 0.5 and valid range is 0.5 to 30");
    const e = (128 + t * 2).toString(16);
    return await this.program("65", e);
  }
  /**
   * @param {number|string} minutes
   * @return {Promise<*>}
   */
  async programTimeBeforeExpirationByTemperature({ minutes: t = 1 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 120) throw new Error("Invalid minutes, valid range is 1 to 120");
    const e = (128 + t).toString(16);
    return await this.program("66", e);
  }
  async programTemperatureScale({ scale: t = "c" } = {}) {
    const e = { c: "43", f: "46" };
    if (!e[t]) throw new Error("Invalid scale, valid scales are 'c' for celsius and 'f' for fahrenheit");
    return await this.program("67", e[t]);
  }
  /**
   * @param {number|string} selection
   * @param {number|string} voltage
   * @return {Promise<void>}
   */
  async programVoltageEngine({ selection: t = 1, voltage: e = 5 } = {}) {
    if (e = parseFloat(e), t = parseInt(t), isNaN(t) || t < 1 || t > this.__device.channels.verification.end)
      throw new Error(`Invalid selection, valid range is 1 to ${this.__device.channels.verification.end}`);
    if (isNaN(e) || e < 5 || e > 9.5 || e % 0.5 !== 0)
      throw new Error("Invalid voltage, valid range is 5 to 9.5");
    const i = 109 + t, a = (128 + (e - 5) * 2).toString(16), c = ["02", "30", "30", "81", "47", i, a];
    return await o(this, g, it).call(this, c, "voltage-engine");
  }
  /**
   * @param {number|string} selection
   * @param {boolean} enable
   * @return {Promise<void>}
   */
  async programPushOverProducts({ selection: t = 1, enable: e = !0 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > this.__device.channels.verification.end)
      throw new Error(`Invalid selection, valid range is 1 to ${this.__device.channels.verification.end}`);
    const a = ["02", "30", "30", "81", "4F", 109 + t, e ? "31" : "30"];
    return await o(this, g, it).call(this, a, "push-over-products");
  }
  /**
   * @param {number|string} selection
   * @param {number|string} seconds
   * @return {Promise<void>}
   */
  async programChannelRunningAfterDispense({ selection: t = 1, seconds: e = 0 } = {}) {
    if (t = parseInt(t), e = parseFloat(e), isNaN(t) || t < 1 || t > this.__device.channels.verification.end)
      throw new Error(`Invalid selection, valid range is 1 to ${this.__device.channels.verification.end}`);
    if (isNaN(e) || e < 0 || e > 10 || e % 0.1 !== 0)
      throw new Error("Invalid seconds, valid range is 0.0 to 10.0 with a step of 0.1");
    const i = 109 + t;
    e = e.toFixed(1);
    const s = 128 + e * 10, a = ["02", "30", "30", "81", "45", i, s];
    return await o(this, g, it).call(this, a, "channel-running-after-dispense");
  }
  async checkData(t, e = "FF") {
    const i = ["02", "30", "30", "81", "43", t, e];
    return await o(this, g, it).call(this, i, "check-data");
  }
  async getDisplayLanguage() {
    return await this.checkData("49");
  }
  async getBeeper() {
    return await this.checkData("5A");
  }
  async getWorkingTemperature() {
    return await this.checkData("54");
  }
  async getIsolationTray() {
    return await this.checkData("42");
  }
  async getProgramVersion() {
    return await this.checkData("50");
  }
  async getFaults() {
    return await this.checkData("53");
  }
  async getMachineId() {
    return await this.checkData("4E");
  }
  async getCurrentTemperature() {
    return await this.checkData("74");
  }
  async getTimeToStandbyAfterCollect() {
    return await this.checkData("46");
  }
  async getTimeToStandbyWithoutCollect() {
    return await this.checkData("48");
  }
  async getElevatorSpeed() {
    return await this.checkData("76");
  }
  async getTemperatureExpiration() {
    return await this.checkData("63");
  }
  async getTemperatureBeforeExpiration() {
    return await this.checkData("65");
  }
  async getTimeBeforeExpirationByTemperature() {
    return await this.checkData("66");
  }
  async getTemperatureScale() {
    return await this.checkData("67");
  }
  async getClockRegisters() {
    return await this.checkData("72");
  }
  async getMachineActivity() {
    return await this.checkData("41");
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getVoltageEngine({ selection: t = 1 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 126)
      throw new Error("Invalid selection, valid range is 1 to 126");
    const e = (109 + t).toString(16);
    return await this.checkData("47", e);
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getChannelPresence({ selection: t = 1 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 126)
      throw new Error("Invalid selection, valid range is 1 to 126");
    const e = (109 + t).toString(16);
    return await this.checkData("43", e);
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getPushOverProducts({ selection: t = 1 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 126)
      throw new Error("Invalid selection, valid range is 1 to 126");
    const e = (109 + t).toString(16);
    return await this.checkData("4F", e);
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getChannelRunningAfterDispense({ selection: t = 1 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 126)
      throw new Error("Invalid selection, valid range is 1 to 126");
    const e = (109 + t).toString(16);
    return await this.checkData("45", e);
  }
  async setDisplayStandbyMessage({ message: t = "" } = {}) {
    t = t.substring(0, 32);
    const e = o(this, g, xe).call(this, t);
    return await o(this, g, ke).call(this, "80", e);
  }
  /**
   * @param {string} message
   * @param {number|string} seconds
   * @return {Promise<void>}
   */
  async setDisplayMessageTemporarily({ message: t = "", seconds: e = 1 }) {
    if (t = t.substring(0, 32), e = parseInt(e), isNaN(e) || e < 1 || e > 125) throw new Error("Invalid seconds, valid range is 1 to 125");
    const i = o(this, g, xe).call(this, t), s = (128 + e).toString(16);
    return await o(this, g, ke).call(this, s, i);
  }
  /**
   * @param {string} message
   * @return {Promise<void>}
   */
  async setDisplayMessageUnlimited({ message: t = "" }) {
    t = t.substring(0, 32);
    const e = o(this, g, xe).call(this, t);
    return await o(this, g, ke).call(this, "FF", e);
  }
  async programClock({ date: t = /* @__PURE__ */ new Date() } = {}) {
    if (!(t instanceof Date)) throw new Error("Invalid date, must be an instance of Date");
    const e = ["02", "30", "30", "81", "72", ...o(this, g, Rs).call(this, t)];
    return await o(this, g, it).call(this, e, "clock");
  }
  /**
   * @param {null|string} event
   * @param {boolean} enable
   * @return {Promise<void>}
   */
  async eventsConfig({ event: t = null, enable: e = !0 } = {}) {
    if (t === null) throw new Error("Invalid event");
    const s = ["02", "30", "30", "81", "41", t, e ? "31" : "30"];
    return await o(this, g, it).call(this, s, "events-config");
  }
  async eventEnable({ event: t = null } = {}) {
    if (t === null) throw new Error("Invalid event");
    const e = parseInt(t, 16);
    if (isNaN(e) || e < 38 || e > 100) throw new Error("Invalid event");
    return await this.eventsConfig({ event: t, enable: !0 });
  }
  async eventDisable({ event: t = null } = {}) {
    if (t === null) throw new Error("Invalid event");
    const e = parseInt(t, 16);
    if (isNaN(e) || e < 38 || e > 100) throw new Error("Invalid event");
    return await this.eventsConfig({ event: t, enable: !1 });
  }
  async sendCustomCode({ code: t = [] } = {}) {
    if (t.length < 5) throw new Error("Invalid code, minimum length is 5");
    return await o(this, g, it).call(this, t, "custom");
  }
  async assignChannels() {
    const t = this.__device.channels.verification.start, e = this.__device.channels.verification.end;
    if (t > e) throw new Error("Invalid range, start must be less than end");
    this.__device.channels.verification.clear(), this.__device.channels.verification.running = !0;
    for (let i = t; i <= e; i++)
      this.__device.channels.verification.current = i, await this.getChannelPresence({ selection: i });
    return new Promise((i) => {
      let s = setInterval(() => {
        this.__device.channels.verification.channels.length === e - t + 1 && (clearInterval(s), this.dispatch("channels", { channels: this.__device.channels.verification.channels }), this.__device.channels.verification.clear(), i(!0));
      }, 500);
    });
  }
}
g = new WeakSet(), Zr = function() {
  const t = [
    "dispensing:withdrawal",
    "command-executed",
    "keyboard:pressed",
    "door:event",
    "program:version",
    "machine:faults",
    "clock:registers",
    "machine:activity",
    "check:language",
    "check:beeper",
    "check:isolation-tray",
    "check:engine-voltage",
    "check:push-over",
    "check:extractor-after-dispense",
    "check:standby-after-collect",
    "check:standby-without-collect",
    "check:elevator-speed",
    "check:expiration-by-temperature",
    "check:temperature-before-expiration",
    "check:expiration-after",
    "check:temperature-scale",
    "check:machine-id",
    "temperature:working",
    "temperature:current",
    "jofemar:warning",
    "jofemar:error",
    "serial:message",
    "reset:errors",
    "channels",
    "channel:status",
    "machine:status"
  ];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, Yr = function() {
  this.on("internal:dispense:running", o(this, g, Ds).bind(this));
}, ts = function() {
  j.add(this);
}, it = function(t, e) {
  return t[3] = this.__internal__.device.hex_number, this.appendToQueue(o(this, g, Ce).call(this, t), e);
}, Ce = function(t) {
  let e = this.hexToDec(this.sumHex(t)), i = this.calcCheckSums(e.toString());
  for (let s = 0; s < 2; s++)
    t.push(this.hexMaker(i[s]));
  return t.push("03"), t;
}, es = async function() {
  if (this.__internal__.dispense.elevator.locking_interval) return;
  this.__internal__.dispense.elevator.need_reset && (this.__internal__.dispense.elevator.need_reset = !1, await this.resetWaitingProductRemovedError(), await ut(500));
  const t = this;
  return this.__internal__.dispense.status = "elevator-locked", this.__internal__.dispense.elevator.locking_time = 60, new Promise((e) => {
    t.__internal__.dispense.elevator.locking_interval = setInterval(() => {
      t.dispatch("dispensing:withdrawal", {
        elevator: !0,
        seconds: t.__internal__.dispense.elevator.locking_time,
        description: "Please recall products from the elevator"
      }), t.__internal__.dispense.elevator.locking_time -= 1, t.__internal__.dispense.elevator.locking_time <= 0 && (clearInterval(t.__internal__.dispense.elevator.locking_interval), t.__internal__.dispense.elevator.locking_interval = 0, e(!0));
    }, 1e3);
  });
}, ns = function(t, e) {
  return e.name = "ok", e.description = "The last command was executed successfully", e.no_code = 1, this.dispatch("command-executed", e), e;
}, is = function(t, e) {
  e.additional = {
    hex: t,
    dec: this.hexToDec(t),
    ascii: null
  };
  const i = {
    30: "0",
    31: "1",
    32: "2",
    33: "3",
    34: "4",
    35: "5",
    36: "6",
    37: "7",
    38: "8",
    39: "9",
    "2a": "*",
    23: "#",
    41: "A",
    42: "B",
    43: "C",
    44: "D"
  };
  return e.additional.ascii = i[t] ?? null, e.name = "Key pressed", e.description = `The key ${e.additional.ascii} was pressed`, e.no_code = 2, this.dispatch("keyboard:pressed", e.additional), e;
}, rs = function(t, e) {
  return e.additional = { open: !1 }, e.no_code = 3, t === "4f" ? (e.name = "door open", e.description = "The door was opened", e.additional.open = !0, this.__internal__.device.door_open = !0, this.dispatch("door:event", e.additional)) : t === "43" ? (e.name = "door close", e.description = "The door was closed", e.additional.open = !1, this.__internal__.device.door_open = !1, this.dispatch("door:event", e.additional)) : (e.name = "door event", e.description = "The door event received is unknown", this.dispatch("door:event", { open: e.additional.open, message: e })), e;
}, ss = function(t, e) {
  e.no_code = 404;
  let i = t[5] ?? null;
  return i && this.listenOnPort > 1 && (i = this.hexToDec(i) - this.listenOnPort + 1, i = this.decToHex(i)), i && (i === "FD" ? (e.no_code = 4, e.name = "channel disconnected", e.description = "The channel is disconnected", e.additional = { active: !1 }) : i === "FC" ? (e.no_code = 5, e.name = "channel connected", e.description = "The channel is connected", e.additional = { active: !0 }) : (e.no_code = 6, e.name = "channel sold out", e.description = "The channel is empty", e.additional = { active: !0 }), this.__device.channels.verification.running && (this.__device.channels.verification.channels.push({
    selection: this.__device.channels.verification.current,
    active: e.additional.active
  }), e.additional.selection = this.__device.channels.verification.current), this.dispatch("channel:status", e.additional)), e;
}, as = function(t, e) {
  e.no_code = 39, e.name = "Program version";
  const i = t.slice(4, 12), s = i.map((a) => String.fromCharCode(this.hexToDec(a))).join("");
  return e.additional = { version: s, hex: i }, e.description = `The program version is ${s}`, this.dispatch("program:version", e.additional), e;
}, os = function(t, e) {
  e.no_code = 39, e.name = "Machine faults", e.description = "No faults detected", e.additional = { no_faults: 0, faults: [] };
  const i = t.slice(4, -3);
  if (i.length > 1 && i[0] !== "30") {
    e.description = "Machine has faults";
    const s = {
      31: "Busy",
      32: "Invalid tray",
      33: "Invalid channel",
      34: "Empty channel",
      35: "Jam in elevator engine",
      36: "Malfunction in the elevator belt or product detector",
      37: "Failure in one of the photo transistors in the cabinet",
      38: "No channels detected",
      39: "Product detector fault",
      41: "Machine display is disconnected",
      42: "Product alarm under elevator",
      43: "Error when elevator approaching to a position",
      44: "Fault in keyboard",
      45: "Eeprom writing error",
      46: "Fault communicating with temperature control",
      47: "The thermometer is disconnected",
      48: "Thermometer programming lost",
      49: "Thermometer faulty",
      "4a": "Channels power consumption detector faulty",
      "4b": "Elevator does not find channel or tray",
      "4c": "Elevator does not find delivery product position",
      "4d": "Interior of elevator blocked",
      "4e": "Error in tester of product detector",
      "4f": "Waiting for product to be removed",
      50: "Product expired by temperature reasons",
      51: "Automatic door faulty",
      59: "Product is expired",
      "5a": "Product is expired",
      61: "Product is expired",
      62: "Product is expired",
      63: "Product is expired",
      64: "Product detector didn't change during its verification test"
    };
    for (const a of i)
      s[a] && (e.additional.faults.push(s[a]), e.additional.no_faults++);
  }
  return this.dispatch("machine:faults", e.additional), e;
}, cs = function(t, e) {
  e.no_code = 40, e.name = "Clock registers", e.description = "Clock registers";
  const i = t.slice(4, -3), s = i.map((v) => String.fromCharCode(this.hexToDec(v))).join(""), [a, c] = s.split(" "), [l, h] = a.split(":"), [p, _, m] = c.split("-"), P = new Date(
    2e3 + parseInt(m),
    parseInt(_) - 1,
    parseInt(p),
    parseInt(l),
    parseInt(h)
  );
  return e.additional = {
    day: p,
    month: _,
    year: m,
    hours: l,
    minutes: h,
    formatted: s,
    date: P,
    hex: i
  }, this.dispatch("clock:registers", e.additional), e;
}, ls = function(t, e) {
  e.no_code = 41, e.name = "Machine activity", e.description = "Events from read machine activity";
  const i = String.fromCharCode(this.hexToDec(t[4]));
  if (i !== "0") {
    const s = t.slice(5, -3);
    if (i === "T" && s.length === 4) {
      const a = String.fromCharCode(this.hexToDec(s[0])), c = String.fromCharCode(this.hexToDec(s[1])), l = String.fromCharCode(this.hexToDec(s[3]));
      e.additional = {
        ascii: i,
        type: "DU.d",
        dozens: a,
        units: c,
        decimals: l,
        time: parseFloat(`${a}${c}.${l}`),
        meaning: "Extraction time (in seconds)"
      };
    } else if (["B", "D", "E", "F", "G"].includes(i) && s.length === 3) {
      const a = String.fromCharCode(this.hexToDec(s[0])), c = String.fromCharCode(this.hexToDec(s[1])), l = String.fromCharCode(this.hexToDec(s[2])), h = parseInt(`${a}${c}${l}`), p = {
        B: "Error on going to tray channel",
        D: "Error on product detector",
        E: "Extraction of channel ok",
        F: "Error on engine intensity detection",
        G: "Error on product exit door"
      };
      e.additional = {
        type: "HDU",
        hundreds: a,
        dozens: c,
        decimals: l,
        channel: h,
        selection: h - 109,
        ascii: i,
        meaning: p[i] ?? "Unknown"
      };
    } else if (s.length === 13) {
      const a = s.map((S) => String.fromCharCode(this.hexToDec(S))).join(""), c = parseInt(a.slice(0, 2)), l = parseInt(a.slice(2, 4)), h = parseInt(a.slice(4, 6)), p = parseInt(a.slice(7, 9)), _ = parseInt(a.slice(9, 11)) - 1, m = 2e3 + parseInt(a.slice(11, 13)), P = new Date(m, _, p, c, l, h), v = {
        A: "Attempt to close product exit door",
        C: "Closing of exterior door",
        H: "Error on opening of product exit door",
        I: "New attempt to arrive at product exit position after an error on first attempt",
        J: "Power on cooling unit",
        K: "Power off cooling unit",
        L: "Start of defrosting",
        M: "End of defrosting",
        O: "Opening of exterior door",
        R: "Memory reset",
        S: "Error on going to product exit position",
        Y: "Power on machine",
        Z: "Power off machine",
        c: "Closing of inner door",
        e: "New attempt to extract from channel due no product detection when elevator arrived to product exit position",
        o: "Opening of inner door"
      };
      e.additional = {
        type: "hhmmssWddMMAA",
        date: P,
        hex: s,
        formatted: P.toLocaleString(),
        ascii: i,
        meaning: v[i] ?? "Unknown"
      };
    }
  }
  return this.dispatch("machine:activity", e.additional), e;
}, hs = function(t, e) {
  const i = {
    30: "Spanish",
    31: "English",
    32: "French"
  };
  return e.no_code = 42, e.name = "Language", e.description = `The language is ${i[t] ?? "unknown"}`, e.additional = {
    hex: t,
    language: i[t] ?? "unknown"
  }, this.dispatch("check:language", e.additional), e;
}, us = function(t, e) {
  return e.no_code = 43, e.name = "Beeper", e.description = `The beeper is ${t === "30" ? "on" : "off"}`, e.additional = {
    hex: t,
    beeper: t === "30"
  }, this.dispatch("check:beeper", e.additional), e;
}, ds = function(t, e) {
  e.no_code = 44, e.name = "Isolation tray", e.description = "Isolation tray";
  const i = this.hexToDec(t) - 139;
  return e.additional = {
    hex: t,
    tray: i
  }, this.dispatch("check:isolation-tray", e.additional), e;
}, ps = function(t, e) {
  e.no_code = 45, e.name = "Engine voltage", e.description = "Engine voltage";
  const i = (this.hexToDec(t) - 128) / 2 + 5;
  return e.additional = {
    hex: t,
    voltage: i
  }, this.dispatch("check:engine-voltage", e.additional), e;
}, fs = function(t, e) {
  e.no_code = 46, e.name = "Push over", e.description = "Push over";
  const i = t === "30";
  return e.additional = {
    hex: t,
    push: i
  }, this.dispatch("check:push-over", e.additional), e;
}, _s = function(t, e) {
  e.no_code = 47, e.name = "Extractor after dispense", e.description = "Extractor after dispense";
  const i = (this.hexToDec(t) - 128) / 10;
  return e.additional = {
    hex: t,
    seconds: i
  }, this.dispatch("check:extractor-after-dispense", e.additional), e;
}, gs = function(t, e) {
  e.no_code = 48, e.name = "Standby after collect", e.description = "Time to standby after collect product";
  const i = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    seconds: i
  }, this.dispatch("check:standby-after-collect", e.additional), e;
}, bs = function(t, e) {
  e.no_code = 49, e.name = "Standby without collect", e.description = "Time to standby when product delivery is not collected";
  const i = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    minutes: i
  }, this.dispatch("check:standby-without-collect", e.additional), e;
}, ms = function(t, e) {
  e.no_code = 50, e.name = "Elevator speed", e.description = "Elevator speed";
  const i = t === "30" ? "low" : "high";
  return e.additional = {
    hex: t,
    speed: i
  }, this.dispatch("check:elevator-speed", e.additional), e;
}, ys = function(t, e) {
  e.no_code = 51, e.name = "Temperature expiration", e.description = "Temperature expiration";
  const i = t === "31";
  return e.additional = {
    hex: t,
    enabled: i
  }, this.dispatch("check:expiration-by-temperature", e.additional), e;
}, ws = function(t, e) {
  e.no_code = 52, e.name = "Temperature before expiration", e.description = "Temperature before expiration";
  const i = (this.hexToDec(t) - 128) / 2;
  return e.additional = {
    hex: t,
    temperature: i
  }, this.dispatch("check:temperature-before-expiration", e.additional), e;
}, vs = function(t, e) {
  e.no_code = 53, e.name = "Time before expiration", e.description = "Time before expiration";
  const i = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    minutes: i
  }, this.dispatch("check:expiration-after", e.additional), e;
}, Ps = function(t, e) {
  e.no_code = 54, e.name = "Temperature scale", e.description = "Temperature scale";
  const i = t === "43" ? "Celsius" : "Fahrenheit";
  return e.additional = {
    hex: t,
    scale: i
  }, this.dispatch("check:temperature-scale", e.additional), e;
}, Es = function(t, e) {
  return e.no_code = 54, e.name = "Machine ID", e.description = "Machine ID", e.additional = { hex: t[4], full_hex: t }, this.dispatch("check:machine-id", e.additional), e;
}, Ts = function(t, e) {
  return e.no_code = 7, e.name = "working temperature", e.description = `The working temperature is ${t}`, e.additional = {
    hex: t,
    temperature: {
      traditional: (this.hexToDec(t) - this.hexToDec("80")) / 2,
      ice_plus: (this.hexToDec(t) - this.hexToDec("80")) / 2 - 25.5
    }
  }, this.dispatch("temperature:working", e.additional), e;
}, Cs = function(t, e) {
  return e.no_code = 8, e.name = "current temperature", e.additional = {
    sign: null,
    tens: null,
    units: null,
    decimals: null,
    type_degrees: null,
    formatted: null,
    decimal_point: t[7] === "2e" ? "." : null,
    degrees: t[9] === "7f" ? "°" : null,
    error: null
  }, t[4] === "2b" ? e.additional.sign = t[4] = "+" : ["2e", "2d"].includes(t[4]) ? e.additional.sign = t[4] = "-" : t[4] === "20" && (e.additional.error = "Error in thermometer"), this.hexToDec(t[5]) >= 48 && this.hexToDec(t[5]) <= 57 ? e.additional.tens = this.hexToDec(t[5]) - 48 : t[5] === "2a" && (e.additional.error = "Error in thermometer"), this.hexToDec(t[6]) >= 48 && this.hexToDec(t[6]) <= 57 ? e.additional.units = this.hexToDec(t[6]) - 48 : t[6] === "2a" && (e.additional.error = "Error in thermometer"), this.hexToDec(t[8]) >= 48 && this.hexToDec(t[8]) <= 57 ? e.additional.decimals = this.hexToDec(t[8]) - 48 : t[8] === "2a" && (e.additional.error = "Error in thermometer"), t[10] === "43" ? e.additional.type_degrees = "C" : t[10] === "46" && (e.additional.type_degrees = "F"), e.additional.error === "Error in thermometer" ? (e.additional.formatted = "Error in thermometer", e.description = "The current temperature cannot be read because there is an error in the thermometer") : (e.additional.formatted = (e.additional.sign ?? "") + (e.additional.tens ?? "") + (e.additional.units ?? "") + (e.additional.decimal_point ?? "") + (e.additional.decimals ?? "") + (e.additional.degrees ?? "") + (e.additional.type_degrees ?? ""), e.description = `The current temperature is ${e.additional.formatted}`), this.dispatch("temperature:current", e.additional), e;
}, Ss = function(t, e, i = 128) {
  if (t[1] && (e.additional.machine.hex = t[1], e.additional.machine.dec = this.hexToDec(t[1]) - i), !(t[1] && t[2]))
    e = o(this, g, ns).call(this, t, e);
  else
    switch (t[2]) {
      case "54":
        e.request = "--automatic", e = o(this, g, is).call(this, t[3], e);
        break;
      case "50":
        e.request = "--automatic", e = o(this, g, rs).call(this, t[3], e);
        break;
      case "43":
        switch (e.request = "check-data", t[3]) {
          case "41":
            e = o(this, g, ls).call(this, t, e);
            break;
          case "43":
            e.request = "channel-status", e = o(this, g, ss).call(this, t, e);
            break;
          case "50":
            e = o(this, g, as).call(this, t, e);
            break;
          case "53":
            e = o(this, g, os).call(this, t, e);
            break;
          case "54":
            e.request = "working-temperature", e = o(this, g, Ts).call(this, t[4], e);
            break;
          case "72":
            e = o(this, g, cs).call(this, t, e);
            break;
          case "74":
            e.request = "current-temperature", e = o(this, g, Cs).call(this, t, e);
            break;
          case "49":
            e = o(this, g, hs).call(this, t[4], e);
            break;
          case "5a":
            e = o(this, g, us).call(this, t[4], e);
            break;
          case "42":
            e = o(this, g, ds).call(this, t[4], e);
            break;
          case "47":
            e = o(this, g, ps).call(this, t[4], e);
            break;
          case "4e":
            e = o(this, g, Es).call(this, t, e);
            break;
          case "4f":
            e = o(this, g, fs).call(this, t[4], e);
            break;
          case "45":
            e = o(this, g, _s).call(this, t[4], e);
            break;
          case "46":
            e = o(this, g, gs).call(this, t[4], e);
            break;
          case "48":
            e = o(this, g, bs).call(this, t[4], e);
            break;
          case "76":
            e = o(this, g, ms).call(this, t[4], e);
            break;
          case "63":
            e = o(this, g, ys).call(this, t[4], e);
            break;
          case "65":
            e = o(this, g, ws).call(this, t[4], e);
            break;
          case "66":
            e = o(this, g, vs).call(this, t[4], e);
            break;
          case "67":
            e = o(this, g, Ps).call(this, t[4], e);
            break;
        }
        break;
    }
  return e;
}, ht = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !0);
}, Q = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !1);
}, Se = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = "elevator-locked");
}, /**
 * Dispatch a warning message
 * @param {null|string} type
 * @param {string} severity
 */
Z = function({ type: t = null, severity: e = "low" } = {}) {
  this.dispatch("jofemar:warning", { type: t, severity: e });
}, /**
 * Dispatch an error message
 * @param {null|string} type
 * @param {string} severity
 */
gt = function({ type: t = null, severity: e = "high" } = {}) {
  this.dispatch("jofemar:error", { type: t, severity: e });
}, ks = function(t, e) {
  if (e.request = "status", t[1] && !t[2]) {
    switch (t[1]) {
      case "30":
        e.name = "Machine ready", e.description = "The machine is ready for instructions", e.no_code = 9, o(this, g, ht).call(this);
        break;
      case "31":
        e.name = "Machine busy", e.description = "The machine is busy right now", e.no_code = 10;
        break;
      case "32":
        e.name = "Invalid tray", e.description = "The tray requested is invalid", e.no_code = 11, o(this, g, Q).call(this), o(this, g, Z).call(this, { type: "invalid-tray" });
        break;
      case "33":
        e.name = "Invalid channel", e.description = "The channel requested is invalid", e.no_code = 12, o(this, g, Q).call(this), o(this, g, Z).call(this, { type: "invalid-channel" });
        break;
      case "34":
        e.name = "Empty channel", e.description = "The channel requested is empty", e.no_code = 13, o(this, g, Q).call(this), o(this, g, Z).call(this, { type: "empty-channel" });
        break;
      case "35":
        e.name = "Jam", e.description = "Jam in elevator engine", e.no_code = 14, o(this, g, Q).call(this), o(this, g, gt).call(this, { type: "jam" });
        break;
      case "36":
        e.name = "Malfunction", e.description = "Malfunction in the elevator belt or product detector", e.no_code = 15, o(this, g, Q).call(this), o(this, g, gt).call(this, { type: "malfunction" });
        break;
      case "37":
        e.name = "Photo transistors", e.description = "Failure in one of the photo transistors in the cabinet", e.no_code = 16, o(this, g, Q).call(this), o(this, g, gt).call(this, { type: "photo-transistors" });
        break;
      case "38":
        e.name = "Without channels", e.description = "No channels detected", e.no_code = 17, o(this, g, Q).call(this), o(this, g, gt).call(this, { type: "without-channels" });
        break;
      case "39":
        e.name = "Product detector fault", e.description = "Product detector fault", e.no_code = 18, o(this, g, Se).call(this), o(this, g, Z).call(this, { type: "fault-product-detector" });
        break;
      case "41":
        e.name = "Fault in 485 BUS", e.description = "Machine display is disconnected", e.no_code = 19, o(this, g, ht).call(this), o(this, g, Z).call(this, { type: "display-disconnected" });
        break;
      case "42":
        e.name = "Product under elevator", e.description = "Product alarm under elevator", e.no_code = 20, o(this, g, Q).call(this), o(this, g, Z).call(this, { type: "product-under-elevator" });
        break;
      case "43":
        e.name = "Error when elevator approaching to a position", e.description = "Error when elevator approaching to a position", e.no_code = 21, o(this, g, ht).call(this), o(this, g, Z).call(this, { type: "error-approaching-position", severity: "high" });
        break;
      case "44":
        e.name = "Fault in keyboard", e.description = "Fault in keyboard", e.no_code = 22, o(this, g, Q).call(this), o(this, g, gt).call(this, { type: "fault-keyboard" });
        break;
      case "45":
        e.name = "Eeprom writing error", e.description = "Eeprom writing error", e.no_code = 23, o(this, g, Q).call(this), o(this, g, gt).call(this, { type: "eeprom-writing-error", severity: "critical" });
        break;
      case "46":
        e.name = "Fault communicating with temperature control", e.description = "Fault communicating with temperature control", e.no_code = 24, o(this, g, ht).call(this), o(this, g, Z).call(this, { type: "fault-temperature-control" });
        break;
      case "47":
        e.name = "Thermometer disconnected", e.description = "The thermometer is disconnected", e.no_code = 25, o(this, g, ht).call(this), o(this, g, Z).call(this, { type: "thermometer-disconnected" });
        break;
      case "48":
        e.name = "Thermometer programming lost", e.description = "Thermometer programming lost", e.no_code = 26, o(this, g, ht).call(this), o(this, g, Z).call(this, { type: "thermometer-programming-lost" });
        break;
      case "49":
        e.name = "Thermometer faulty", e.description = "Thermometer faulty", e.no_code = 27, o(this, g, ht).call(this), o(this, g, Z).call(this, { type: "thermometer-faulty" });
        break;
      case "4a":
        e.name = "Channels power consumption detector faulty", e.description = "Channels power consumption detector faulty", e.no_code = 28, o(this, g, Q).call(this), o(this, g, gt).call(this, { type: "channels-power-consumption-detector-faulty", severity: "critical" });
        break;
      case "4b":
        e.name = "Elevator does not find channel or tray", e.description = "Elevator does not find channel or tray", e.no_code = 29, o(this, g, Q).call(this), o(this, g, Z).call(this, { type: "elevator-not-find-channel-tray" });
        break;
      case "4c":
        e.name = "Elevator does not find delivery product position", e.description = "Elevator does not find delivery product position", e.no_code = 30, o(this, g, Q).call(this), o(this, g, gt).call(this, { type: "elevator-not-find-delivery-position" });
        break;
      case "4d":
        e.name = "Interior of elevator blocked", e.description = "Interior of elevator blocked", e.no_code = 31, o(this, g, Se).call(this), this.__internal__.dispense.elevator.need_reset || (this.__internal__.dispense.elevator.need_reset = !0), o(this, g, gt).call(this, { type: "interior-elevator-blocked", severity: "low" });
        break;
      case "4e":
        e.name = "Error in tester of product detector", e.description = "Error in tester of product detector", e.no_code = 32, o(this, g, Q).call(this), o(this, g, gt).call(this, { type: "error-tester-product-detector" });
        break;
      case "4f":
        e.name = "Waiting for product to be removed", e.description = "Waiting for product to be removed", e.no_code = 33, o(this, g, Se).call(this);
        break;
      case "50":
        e.name = "Product expired by temperature reasons", e.description = "Product expired by temperature reasons", e.no_code = 34, o(this, g, ht).call(this), o(this, g, Z).call(this, { type: "product-expired-temperature" });
        break;
      case "51":
        e.name = "Automatic door faulty", e.description = "Automatic door faulty", e.no_code = 35, o(this, g, ht).call(this), o(this, g, Z).call(this, { type: "automatic-door-faulty" });
        break;
      case "59":
      case "5a":
      case "61":
      case "62":
      case "63":
        switch (e.name = "Product is expired", e.description = "Product is expired", e.additional = { nsf_alarm: 1 }, t[1]) {
          case "5a":
            e.additional.nsf_alarm = 2;
            break;
          case "61":
            e.additional.nsf_alarm = 3;
            break;
          case "62":
            e.additional.nsf_alarm = 4;
            break;
          case "63":
            e.additional.nsf_alarm = 5;
            break;
        }
        e.no_code = 36, o(this, g, ht).call(this), o(this, g, Z).call(this, { type: "product-expired" });
        break;
      case "64":
        e.name = "Product detector didn't change during its verification test", e.description = "Product detector didn't change during its verification test", e.no_code = 37, o(this, g, ht).call(this), o(this, g, Z).call(this, { type: "automatic-door-faulty" });
        break;
    }
    this.dispatch("machine:status", e);
  } else
    e.name = "executed", e.description = "The last command was executed successfully", e.no_code = 8, !t[1] && this.__internal__.dispense.dispensing && o(this, g, Q).call(this);
  return e;
}, xs = function(t) {
  if (t = parseInt(t) + 109, t = t.toString(), t.length !== 3)
    throw new Error("Invalid selection");
  const e = (parseInt(t.substring(0, 2)) + 128).toString(16).padStart(2, "0");
  return { channel: (parseInt(t.substring(2, 3)) + 128).toString(16).padStart(2, "0"), tray: e };
}, As = function() {
  this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.dispense.timeout = 0, this.__internal__.dispense.interval = 0;
}, Ds = function() {
  this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval);
  const t = this;
  t.__internal__.dispense.timeout = setTimeout(() => {
    t.__internal__.dispense.interval = setInterval(() => {
      t.status().then(() => {
      });
    }, t.__internal__.dispense.interval_time);
  }, t.__internal__.dispense.timeout_time);
}, ie = async function(t) {
  const e = ["02", "30", "30", "81", "52", t, "FF"];
  return await o(this, g, it).call(this, e, "reset");
}, xn = function() {
  const t = this.__device.type === "iceplus" ? tn(40) : tn(25), e = /* @__PURE__ */ new Date(), i = 1e3 * t + e.getTime(), s = new Date(i);
  this.dispatch("reset:errors", {
    description: "Resetting machine errors",
    duration: t,
    started_at: e,
    finished_at: s
  });
}, An = async function(t) {
  const e = ["02", "30", "30", "81", "4C", t, "FF"];
  return await o(this, g, it).call(this, e, "lights");
}, ke = async function(t = "80", e = []) {
  const i = ["02", "30", "30", "81", "44", t, ...e];
  return await o(this, g, it).call(this, i, "display");
}, xe = function(t = "") {
  t = t.padEnd(32, " ");
  const e = [];
  for (let i = 0; i < 32; i++)
    e.push(t.charCodeAt(i).toString(16));
  return e;
}, Rs = function(t) {
  if (!(t instanceof Date)) throw new Error("Invalid date, must be an instance of Date");
  const e = t.getHours().toString().padStart(2, "0"), i = t.getMinutes().toString().padStart(2, "0"), s = t.getDate().toString().padStart(2, "0"), a = (t.getMonth() + 1).toString().padStart(2, "0"), c = t.getFullYear().toString().substring(2, 4), l = `${e}:${i} ${s}-${a}-${c}`, h = [];
  for (let p = 0; p < 14; p++)
    h.push(l.charCodeAt(p).toString(16));
  return h;
};
var Ht, Bt, Kt, w, Is, Os, Ae, Bs, Ns, Ms, Fs, Us, Ls, Vs, qs, Dn, js, Hs, Ks, Ws, zs, Xs, Gs, Js, $s, Qs, Zs, Ys, ta, ea, rt, De, na, ia, ra, sa, Rn, Re, aa, oa, In, On, Bn;
class Tc extends Ft {
  constructor({ filters: t = null, config_port: e = null, no_device: i = 1 } = {}) {
    super({ filters: t, config_port: e, no_device: i });
    X(this, w);
    J(this, "__coin_purse", {
      available: !0
    });
    J(this, "__banknote_purse", {
      available: !0,
      isRecycler: !0,
      recycler: {
        ict: !0,
        banknote: 1
        // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
      }
    });
    J(this, "__sale", {
      price: 0,
      change: 0,
      change_verified: 0,
      dispense_all: !0,
      last_change: 0,
      clear() {
        this.price = 0, this.change = 0, this.change_verified = 0, this.dispense_all = !0, this.last_change = 0;
      }
    });
    J(this, "__money_session", {
      inserted: 0,
      retired: 0,
      clear() {
        this.inserted = 0, this.retired = 0;
      }
    });
    J(this, "coins", {
      tubes: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      box: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      totals: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      total: 0
    });
    J(this, "banknotes", {
      stacker: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      recycler: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      out: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      totals: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      total: 0
    });
    J(this, "card_reader", {
      available: !1,
      max_pre_credit: 0
    });
    X(this, Ht, !1);
    X(this, Bt, 0);
    X(this, Kt, 0);
    if (this.__internal__.device.type = "boardroid", j.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.serial.config_port.baudRate = 115200, this.__internal__.serial.response.length = 14, this.__internal__.time.response_connection = 600, this.__internal__.time.response_general = 4e3, this.__internal__.time.response_engines = 15e3, this.__internal__.dispense.limit_counter = 15, this.__internal__.dispense.custom_limit_counter = null, this.__internal__.dispense.backup_dispense = {
      channel: 1,
      second_channel: null,
      sensor: !0,
      seconds: null
    }, o(this, w, Is).call(this), o(this, w, Os).call(this);
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
    return t.forEach((i, s) => {
      s !== 0 && s !== 11 && (e += parseInt(i, 16));
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
    const i = (5 + this.deviceNumber).toString(16).padStart(2, "0").toLowerCase();
    switch (t[1]) {
      case i:
        e.request = "connect", e = o(this, w, Ns).call(this, e);
        break;
      case "a0":
        e.request = "--automatic", e = o(this, w, js).call(this, t, e);
        break;
      case "b0":
        e.request = "--automatic", e = o(this, w, Hs).call(this, t, e);
        break;
      case "d0":
        e.request = "coin-purse:config", e = o(this, w, Ks).call(this, t[2], e);
        break;
      case "d1":
        e.request = "banknote-purse:config", e.additional = { scrow: null }, e = o(this, w, Ws).call(this, t, e);
        break;
      case "d2":
        e.request = "coin-purse:read-tubes", e = o(this, w, zs).call(this, t, e);
        break;
      case "d3":
        e.request = "banknote-purse:read-recycler", e = o(this, w, Xs).call(this, t, e);
        break;
      case "d4":
        e.request = "banknote-purse:banknote-scrow-status", e = o(this, w, Gs).call(this, t[2], e);
        break;
      case "d5":
        e.request = "banknote-purse:dispense", e = o(this, w, Js).call(this, t, e);
        break;
      case "d6":
        e.request = "coin-purse:dispense", e = o(this, w, $s).call(this, t, e);
        break;
      case "d7":
        e.request = "dispense", e = o(this, w, Qs).call(this, t[5], e);
        break;
      case "d8":
        e.request = "--automatic", e = o(this, w, Zs).call(this, t[13], e);
        break;
      case "d9":
        e.request = "status:temperature", e = o(this, w, Ys).call(this, t, e);
        break;
      case "da":
        e.request = "status:relay", e = o(this, w, ta).call(this, t[2], e);
        break;
      case "db":
        e.request = "banknote-purse:save-memory", e.no_code = 18, e.name = "Bill purse memory saved?", e.description = "The memory of bill purse was saved successfully?", this.dispatch("banknote-purse:save-memory", { message: e });
        break;
      case "dc":
        e.request = "coin-purse:read-memory", e.no_code = 19, e.name = "Coin purse memory read?", e.description = "The memory of coin purse was read successfully?", this.dispatch("banknote-purse:read-memory", { message: e });
        break;
      case "dd":
        e.request = "card-reader", o(this, w, ea).call(this, t, e);
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
  async coinPurseConfigure({ enable: t = !1, high: e = "FF", low: i = "FF" } = {}) {
    if (!this.__coin_purse.available) throw new Error("Coin purse not available");
    const a = ["F1", "C1", t ? "01" : "00", e, i, "00", "00", "00", "00", "00", "F2", "00"];
    await o(this, w, rt).call(this, a, "coin-purse:config");
  }
  async coinPurseEnable() {
    await this.coinPurseConfigure({ enable: !0 });
  }
  async coinPurseDisable() {
    await this.coinPurseConfigure({ enable: !1 });
  }
  async coinPurseDispense({ $_50c: t = 0, $_1: e = 0, $_2: i = 0, $_5: s = 0, $_10: a = 0 } = {}) {
    if (!this.__coin_purse.available) throw new Error("Coin purse not available");
    if ([t, e, i, s, a].some((l) => isNaN(l) || typeof l == "string"))
      throw new Error("One of the values is not a number");
    if (t < 1 && e < 1 && i < 1 && s < 1 && a < 1) throw new Error("No coins to dispense");
    [t, e, i, s, a] = [
      this.decToHex(t),
      this.decToHex(e),
      this.decToHex(i),
      this.decToHex(s),
      this.decToHex(a)
    ];
    let c = ["F1", "C6", t, e, i, s, a, "00", "00", "00", "F2", "00"];
    await o(this, w, rt).call(this, c, "coin-purse:dispense");
  }
  async coinPurseReadTubes() {
    const t = ["F1", "C2", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    await o(this, w, rt).call(this, t, "coin-purse:read-tubes");
  }
  async banknotePurseConfigure({ enable: t = !1, scrow: e = !1 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    let i;
    return o(this, w, Ae).call(this) ? i = o(this, w, na).call(this, { enable: t, scrow: e }) : i = o(this, w, ia).call(this, { enable: t, scrow: e }), await o(this, w, rt).call(this, i, "banknote-purse:config");
  }
  async banknotePurseDispense({ $_20: t = 0, $_50: e = 0, $_100: i = 0, $_200: s = 0, $_500: a = 0, $_1000: c = 0 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    let l;
    if (o(this, w, Ae).call(this)) {
      const h = [t, e, i, s, a];
      l = o(this, w, ra).call(this, h[this.__banknote_purse.recycler.banknote]);
    } else
      l = o(this, w, sa).call(this, { $_20: t, $_50: e, $_100: i, $_200: s, $_500: a, $_1000: c });
    await o(this, w, rt).call(this, l, "banknote-purse:dispense");
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
    await o(this, w, rt).call(this, t, "banknote-purse:banknote-scrow-status");
  }
  async banknotePurseRejectInScrow() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    const t = ["F1", "C4", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    await o(this, w, rt).call(this, t, "banknote-purse:banknote-scrow-status");
  }
  async banknotePurseSaveMemory({
    channel: t = null,
    $_20: e = null,
    $_50: i = null,
    $_100: s = null,
    $_200: a = null,
    $_500: c = null,
    $_1000: l = null
  } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (t === null || e === null || i === null || s === null || a === null || c === null || l === null)
      throw new Error("One of the values is not defined");
    const h = [
      "F1",
      "C8",
      this.decToHex(t),
      "00",
      this.decToHex(e),
      this.decToHex(i),
      this.decToHex(s),
      this.decToHex(a),
      this.decToHex(c),
      this.decToHex(l),
      "F2",
      "00"
    ];
    await o(this, w, rt).call(this, h, "banknote-purse:save-memory");
  }
  async banknotePurseReadRecycler() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    const t = ["F1", "C3", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "B5"];
    return await o(this, w, rt).call(this, t, "banknote-purse:read-recycler");
  }
  async cardReaderDisable() {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    const t = ["F1", "CD", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await o(this, w, rt).call(this, t, "card-reader:disable");
  }
  async cardReaderDispense({ channel: t = 1, second_channel: e = null, sensor: i = !0, seconds: s = null, price: a = 0 } = {}) {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    if (isNaN(this.card_reader.max_pre_credit) || this.card_reader.max_pre_credit === 0)
      throw new Error("Card reader pre-credit not configured");
    if (isNaN(a) || a <= 0) throw new Error("Price must be greater than 0");
    if (a > this.card_reader.max_pre_credit) throw new Error("Price is greater than pre-credit configured");
    if (!i && (s === null || s <= 0 || s > 40))
      throw new Error("Invalid time to dispense without sensor, must be between 0.1 and 40.0 seconds");
    const c = this.decToHex(a / 256), l = this.decToHex(a % 256), h = this.decToHex(t + 9);
    let p = "00";
    e && (p = this.decToHex(e + 9));
    let _ = "00";
    i || (_ = this.decToHex(s * 10));
    const m = ["F1", "CD", "01", h, p, _, c, l, "00", "00", "F2", "00"];
    await o(this, w, rt).call(this, m, "card-reader:dispense");
  }
  async paymentPursesDisable({ coin: t = !0, banknote: e = !0, cardReader: i = !1 } = {}) {
    t && await this.coinPurseDisable(), e && await this.banknotePurseDisable(), i && await this.cardReaderDisable();
  }
  async paymentPursesEnable({ coin: t = !0, banknote: e = !0, scrowBanknote: i = !1 } = {}) {
    t && await this.coinPurseEnable(), e && await this.banknotePurseEnable({ scrow: i });
  }
  async coolingRelayConfigure({ enable: t = !1 } = {}) {
    const i = ["F1", "CC", t ? "01" : "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await o(this, w, rt).call(this, i, "status:relay");
  }
  async coolingRelayEnable() {
    return await this.coolingRelayConfigure({ enable: !0 });
  }
  async coolingRelayDisable() {
    return await this.coolingRelayConfigure({ enable: !1 });
  }
  async readTemperature() {
    const t = ["F1", "CB", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await o(this, w, rt).call(this, t, "status:temperature");
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
  async dispense({ selection: t = 1, second_selection: e = null, sensor: i = !0, seconds: s = null, retry: a = !0 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 80) throw new Error("Invalid channel number");
    if (e !== null && (e < 1 || e > 80 || e === t))
      throw new Error("Invalid second channel number");
    if (!i && (s === null || s <= 0 || s > 40))
      throw new Error("Invalid time to dispense without sensor, must be between 0.1 and 40.0 seconds");
    a && (this.__internal__.dispense.backup_dispense = {
      selection: t,
      second_selection: e,
      sensor: i,
      seconds: s
    }), t += 9;
    const c = this.decToHex(t);
    let l = "00";
    e && (e += 9, l = this.decToHex(e));
    let h = "00";
    i || (h = this.decToHex(Math.round(s * 6.2)), this.__internal__.dispense.custom_limit_counter = s);
    const p = o(this, w, De).call(this, [
      "F1",
      "C7",
      c,
      l,
      h,
      "00",
      "00",
      "00",
      "00",
      "00",
      "F2",
      "00"
    ]);
    let _ = await this.internalDispense(p);
    return !_.dispensed && a && (_ = await this.internalDispense(p)), this.__internal__.dispense.custom_limit_counter = null, _;
  }
  async testEngines({ singleEngine: t = !1 } = {}) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    if (R(this, Ht)) throw new Error("Another test is running");
    o(this, w, Rn).call(this), F(this, Ht, !0);
    const e = [];
    o(this, w, Re).call(this);
    for (let i = 1; i <= 80; i++) {
      const s = await this.dispense({
        selection: i,
        second_selection: t ? null : i + 1,
        sensor: !1,
        seconds: 0.4,
        retry: !1
      });
      e.push(s), F(this, Bt, i), o(this, w, Re).call(this), t || i++;
    }
    F(this, Bt, 80), o(this, w, Re).call(this, { dispensed: e }), o(this, w, Rn).call(this);
  }
  async sendCustomCode({ code: t = [] } = {}) {
    if (t.length === 0) throw new Error("Invalid code");
    const e = o(this, w, De).call(this, t);
    await this.appendToQueue(e, "custom");
  }
  hasToReturnChange(t = 0) {
    let e = t;
    return e <= 0 ? !0 : (e = o(this, w, In).call(this, e).pending, e = o(this, w, On).call(this, e).pending, !(e > 0));
  }
  async returnChange() {
    return await o(this, w, Bn).call(this);
  }
  async returnInsertedMoney() {
    return this.__money_session.inserted <= 0 ? !1 : await o(this, w, Bn).call(this, this.__money_session.inserted);
  }
  async serialCorruptMessage(t, e) {
    this.dispatch("corrupt:message", { data: t, message: e });
  }
}
Ht = new WeakMap(), Bt = new WeakMap(), Kt = new WeakMap(), w = new WeakSet(), Is = function() {
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
}, Os = function() {
  j.add(this);
}, Ae = function() {
  return this.__banknote_purse.isRecycler && this.__banknote_purse.recycler.ict;
}, Bs = function() {
  return this.hasCoinPurse || this.hasRecycler;
}, Ns = function(t) {
  return t.name = "Connection with the serial device completed.", t.description = "Your connection with the serial device was successfully completed.", t.no_code = 1, this.dispatch("run:default-load", {}), t;
}, Ms = function(t) {
  const e = {
    g50: ["40", "50", "60", "70", "90"],
    c50: ["41", "51", "61", "71", "91"],
    p1: ["42", "52", "62", "72", "92"],
    p2: ["43", "53", "63", "73", "93"],
    p5: ["44", "54", "64", "74", "94"],
    p10: ["45", "55", "65", "75", "95"],
    p20: ["47", "57", "67", "77", "97"]
  };
  let i = null;
  for (let a in e)
    if (e[a].includes(t)) {
      i = a;
      break;
    }
  return i ? [{
    g50: "50 pennies (the big one)",
    c0: "50 pennies (the little one)",
    p1: "1 peso",
    p2: "2 pesos",
    p5: "5 pesos",
    p10: "10 pesos",
    p20: "20 pesos"
  }[i], i] : [`Undefined value: ¿${t}?`, null];
}, Fs = function(t) {
  return ["g50", "c50", "p1", "p2", "p5", "p10", "p20"].includes(t);
}, Us = function(t) {
  const e = {
    p20: ["80", "90", "a0", "b0"],
    p50: ["81", "91", "a1", "b1"],
    p100: ["82", "92", "a2", "b2"],
    p200: ["83", "93", "a3", "b3"],
    p500: ["84", "94", "a4", "b4"],
    p1000: ["85", "95", "a5", "b5"]
  };
  let i = null;
  for (let a in e)
    if (e[a].includes(t)) {
      i = a;
      break;
    }
  return i ? [{
    p20: "20 pesos",
    p50: "50 pesos",
    p100: "100 pesos",
    p200: "200 pesos",
    p500: "500 pesos",
    p1000: "1000 pesos"
  }[i], i] : [`Undefined value: ¿${t}?`, null];
}, Ls = function(t) {
  return ["p20", "p50", "p100", "p200", "p500", "p1000"].includes(t);
}, Vs = function(t) {
  return ["r20", "r50", "r100"].includes(t);
}, qs = function() {
  return ["r20", "r50", "r100", "r200", "r500"][this.__banknote_purse.recycler.banknote];
}, Dn = function(t, e, i) {
  if (!t) return;
  let s = !0;
  if (o(this, w, Fs).call(this, t) && i === "coin") {
    if (typeof this.coins.tubes[t] > "u") return;
    e === "tube" ? this.coins.tubes[t] += 1 : e === "box" && (this.coins.box[t] += 1);
    let a = 0;
    ["g50", "c50"].includes(t) ? a = 0.5 : a += parseInt(t.slice(1)), this.coins.totals[t] += a, this.__money_session.inserted += a, this.coins.total += a;
  } else if (o(this, w, Ls).call(this, t) && i === "banknote") {
    if (typeof this.banknotes.recycler[t] > "u") return;
    e === "recycler" ? this.banknotes.recycler[t] += 1 : e === "stacker" && (this.banknotes.stacker[t] += 1);
    let a = parseInt(t.slice(1));
    this.banknotes.totals[t] += a, this.__money_session.inserted += a, this.banknotes.total += a;
  } else if (o(this, w, Vs).call(this, t) && e === "out" && i === "banknote") {
    if (typeof this.banknotes.out[t.replace("r", "p")] > "u") return;
    this.banknotes.out[t.replace("r", "p")] += 1;
    let a = parseInt(t.slice(1));
    this.__money_session.retired += a, this.banknotes.recycler[t.replace("r", "p")] -= 1, this.banknotes.total -= a, s = !1, this.dispatch("session:money-dispensed", { type_money: t, retired: a, finish: !1, type: "banknotes" });
  }
  s && this.dispatch("session:money-request", {});
}, js = function(t, e) {
  const i = parseInt(t[2], 16);
  return e.name = "Coin Inserted", e.no_code = 2, e.additional = { where: null, coin: null }, i === 1 ? (e.name = "Lever pressed", e.description = "Reject lever", e.no_code = 100, this.dispatch("coin-purse:reject-lever", {})) : i === 2 ? (e.name = "Reset coin purse", e.description = "The configuration of coin purse was reset", e.no_code = 101, this.dispatch("coin-purse:reset", {})) : i >= 64 && i <= 79 ? (e.name = "Coin inserted in profit box", e.additional.where = "box") : i >= 80 && i <= 95 ? (e.name = "Coin inserted in tube", e.additional.where = "tube") : i >= 96 && i <= 111 ? (e.name = "Unused coin", e.description = "Something come from coin changer but in MDB Docs is unused", e.additional.where = "unused") : i >= 112 && i <= 127 ? (e.name = "Coin rejected", e.additional.where = "rejected") : i >= 144 && i <= 159 ? (e.name = "Coin dispensed", e.additional.where = "out", e.description = `Undefined value: ¿${t[2]}?`) : (e.name = "Coin inserted", e.description = "Undefined status. Without information of this", e.no_code = 400), i === 1 || i === 2 || i >= 160 || i >= 128 && i <= 143 || ([e.description, e.additional.coin] = o(this, w, Ms).call(this, t[2]), e.no_code = 38 + i, o(this, w, Dn).call(this, e.additional.coin, e.additional.where, "coin"), ["tube", "out"].includes(e.additional.where) && this.dispatch("coin-purse:tubes", this.coins.tubes), this.dispatch("coin-purse:coin-event", this.coins)), e;
}, Hs = function(t, e) {
  const i = parseInt(t[2], 16);
  return e.name = "Banknote Inserted", e.no_code = 2, e.additional = { where: null, banknote: null }, i === 42 ? (e.name = "Banknote dispensed", e.description = "Banknote dispensed by request.", e.additional.banknote = o(this, w, qs).call(this), e.additional.where = "out", e.no_code = 200) : i >= 128 && i <= 143 ? (e.name = "Banknote inserted", e.additional.where = "stacker") : i >= 144 && i <= 159 ? (e.name = "Banknote inserted in pre stacker", e.additional.where = "tmp") : i >= 160 && i <= 175 ? (e.name = "Banknote rejected", e.additional.where = "nothing") : i >= 176 && i <= 191 && (e.name = "Banknote inserted", e.additional.where = "recycler"), i >= 128 && i <= 191 && ([e.description, e.additional.banknote] = o(this, w, Us).call(this, t[2]), e.no_code = 74 + i), o(this, w, Dn).call(this, e.additional.banknote, e.additional.where, "banknote"), this.dispatch("banknote-purse:event-banknote", this.banknotes), e;
}, Ks = function(t, e) {
  const i = parseInt(t, 16);
  return i === 1 ? (e.name = "Coin purse enabled", e.description = "Configuration complete, enabled", e.no_code = 3) : i === 0 ? (e.name = "Coin purse disabled", e.description = "Disabled by system request", e.no_code = 4) : (e.name = "Status unknown", e.description = "The response of coin purse doesn't identify successfully", e.no_code = 400), this.dispatch("coin-purse:config", { enabled: i === 1 }), e;
}, Ws = function(t, e) {
  const i = parseInt(t[2], 16), s = parseInt(t[3], 16);
  return i === 0 ? (e.name = "Bill purse disabled", e.description = "Configuration complete, disabled") : i === 1 && (e.name = "Bill purse enabled", e.description = "Configuration complete, enabled"), s === 0 ? e.additional.scrow = "Scrow disabled, banknote received automatic" : s === 1 && (e.additional.scrow = "Scrow enabled, require manual action"), e.no_code = 5, this.dispatch("banknote-purse:config", { enabled: i === 1, scrow: s === 1 }), e;
}, zs = function(t, e) {
  e.no_code = 6;
  const [i, s, a, c, l, h] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ];
  return e.additional = {
    coins: { g50: i, c50: s, p1: a, p2: c, p5: l, p10: h }
  }, this.coins.tubes.g50 = i, this.coins.tubes.c50 = s, this.coins.tubes.p1 = a, this.coins.tubes.p2 = c, this.coins.tubes.p5 = l, this.coins.tubes.p10 = h, this.coins.totals.g50 = (this.coins.box.g50 + i) * 0.5, this.coins.totals.c50 = (this.coins.box.c50 + s) * 0.5, this.coins.totals.p1 = this.coins.box.p1 + a, this.coins.totals.p2 = (this.coins.box.p2 + c) * 2, this.coins.totals.p5 = (this.coins.box.p5 + l) * 5, this.coins.totals.p10 = (this.coins.box.p10 + h) * 10, this.coins.total = this.coins.totals.g50 + this.coins.totals.c50 + this.coins.totals.p1 + this.coins.totals.p2 + this.coins.totals.p5 + this.coins.totals.p10, e.name = "Read tubes", e.description = "Quantity of coins approximated", this.dispatch("coin-purse:tubes", this.coins.tubes), e;
}, Xs = function(t, e) {
  e.no_code = 7;
  const [i, s, a, c, l, h] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ];
  return e.additional = {
    banknotes: { b20: i, b50: s, b100: a, b200: c, b500: l, b1000: h }
  }, this.banknotes.recycler.p20 = i, this.banknotes.recycler.p50 = s, this.banknotes.recycler.p100 = a, this.banknotes.recycler.p200 = c, this.banknotes.recycler.p500 = l, this.banknotes.recycler.p1000 = h, this.banknotes.totals.p20 = (this.banknotes.stacker.p20 + i) * 20, this.banknotes.totals.p50 = (this.banknotes.stacker.p50 + s) * 50, this.banknotes.totals.p100 = (this.banknotes.stacker.p100 + a) * 100, this.banknotes.totals.p200 = (this.banknotes.stacker.p200 + c) * 200, this.banknotes.totals.p500 = (this.banknotes.stacker.p500 + l) * 500, this.banknotes.totals.p1000 = (this.banknotes.stacker.p1000 + h) * 1e3, this.banknotes.total = this.banknotes.totals.p20 + this.banknotes.totals.p50 + this.banknotes.totals.p100 + this.banknotes.totals.p200 + this.banknotes.totals.p500 + this.banknotes.totals.p1000, e.name = "Read recycler", e.description = "Quantity of banknotes approximated", this.dispatch("banknote-purse:recycler", this.banknotes.recycler), e;
}, Gs = function(t, e) {
  const i = parseInt(t, 16);
  return i === 1 ? e.name = "Banknote accepted" : i === 0 ? e.name = "Banknote rejected" : e.name = "Unknown status banknote", e.no_code = 8, this.dispatch("banknote-purse:banknote-scrow-status", { status: i === 1 }), e;
}, Js = function(t, e) {
  const [i, s, a, c, l, h] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ], p = i * 20 + s * 50 + a * 100 + c * 200 + l * 500 + h * 1e3;
  return e.name = "Banknotes dispensed", e.description = p > 0 ? "Banknotes dispensed by request" : "No banknotes dispensed, recycler empty", e.no_code = 9, e.additional = {
    banknotes: { b20: i, b50: s, b100: a, b200: c, b500: l, b1000: h },
    total_dispensed: p
  }, this.dispatch("session:money-dispensed", {
    type_money: null,
    retired: null,
    finish: !1,
    type: "banknotes",
    data: e
  }), e;
}, $s = function(t, e) {
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
}, Qs = function(t, e) {
  const i = parseInt(t, 16);
  return i === 1 ? (e.name = "Product not delivered", e.description = "The product requested wasn't delivered", e.no_code = 11, this.__internal__.dispense.status = !1) : i === 0 ? (e.name = "Product delivered", e.description = "The product requested was delivered", e.no_code = 12, this.__internal__.dispense.status = !0) : (e.name = "Unknown status product", e.description = "The response of product doesn't identify successfully", e.no_code = 400, this.__internal__.dispense.status = !1), this.dispatch("dispensed", {}), e;
}, Zs = function(t, e) {
  let i = "closed";
  return t === "db" ? (e.name = "Door closed", e.no_code = 13) : t === "dc" ? (e.name = "Door open", e.no_code = 14, i = "open") : (e.name = "Unknown status door", e.description = "The response of door doesn't identify successfully", e.no_code = 400, i = "unknown"), this.__internal__.device.door_open = i === "open", this.dispatch("event:door", { open: i === "open" }), this.dispatch("door:event", { open: i === "open" }), e;
}, Ys = function(t, e) {
  const i = parseInt(t[2], 16) * 255, s = parseInt(t[3], 16), a = (i + s) * 0.1;
  return e.no_code = 15, e.name = "Temperature status", e.description = `Temperature: ${a}`, e.additional = {
    high: i,
    low: s,
    temperature: parseFloat(a.toString())
  }, this.dispatch("status:temperature", e.additional), e;
}, ta = function(t, e) {
  const i = parseInt(t, 16);
  let s = "unknown";
  return i === 1 ? (e.name = "Relay on", e.description = "Relay on", e.no_code = 16, s = "on") : i === 0 ? (e.name = "Relay off", e.description = "Relay off", e.no_code = 17, s = "off") : (e.name = "Status unknown", e.description = "Status unknown", e.no_code = 400), this.dispatch("status:relay", { enabled: s === "on" }), e;
}, ea = function(t, e) {
  const i = parseInt(t[2], 16);
  if (e.no_code = 20 + i, e.name = "Status unknown", e.description = "The status of card reader does not identified correctly", i === 0)
    e.request += ":disable", e.name = "Card reader disabled", e.description = "Card reader device was disabled successfully";
  else if (i === 1 || i === 2)
    e.request += ":dispense", e.name = "Card reader enabled", e.description = "Card reader device is now enabled";
  else if (i === 3)
    e.request += ":pre-authorize", e.name = "Pre-authorized credit", e.description = "The pre credit was authorized successfully";
  else if (i === 4)
    e.request += ":cancel", e.name = "Cancellation in progress", e.description = "Cancellation request done successfully";
  else if (i === 5)
    e.request += ":sell", e.name = "Sell approved", e.description = "Sell approved, starting dispense product";
  else if (i === 6)
    e.request += ":sell", e.name = "Sell denied", e.description = "This sell was denied, try again";
  else if (i === 7)
    e.request += ":end", e.name = "Session ended", e.description = "The session ended";
  else if (i === 8)
    e.request += ":cancel", e.name = "Cancelled", e.description = "Cancellation complete";
  else if (i === 10) {
    const s = parseInt(t[8], 16);
    s === 0 ? (e.no_code = 30, e.name = "product not dispensed", e.description = "The product requested wasn't delivered") : s === 1 && (e.no_code = 31, e.name = "product dispensed", e.description = "The product requested was delivered");
  } else
    e.no_code = 400;
  return this.dispatch("card-reader:event", e), e;
}, rt = function(t, e) {
  return this.appendToQueue(o(this, w, De).call(this, t), e);
}, De = function(t) {
  return t[11] = this.serialBoardroidSumHex(t), t.map((e, i) => {
    t[i] = this.hexMaker(e);
  }), t;
}, na = function({ enable: t = !1, scrow: e = !1 } = {}) {
  const i = t ? "FF" : "00", s = e ? "FF" : "00";
  return ["F1", "C0", i, i, s, s, "00", "00", "00", "00", "F2", "00"];
}, ia = function({ enable: t = !1, scrow: e = !1 } = {}) {
  return ["F1", "C0", t ? "01" : "00", e ? "01" : "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
}, ra = function(t = 1) {
  if (t < 1) throw new Error("No banknotes to dispense");
  return t = this.decToHex(t), ["F1", "C5", this.decToHex(this.__banknote_purse.recycler.banknote.toString()), t, "00", "00", "00", "00", "00", "00", "F2", "00"];
}, sa = function({ $_20: t = 0, $_50: e = 0, $_100: i = 0, $_200: s = 0, $_500: a = 0, $_1000: c = 0 } = {}) {
  if ([t, e, i, s, a, c].some((l) => isNaN(l) || typeof l == "string"))
    throw new Error("One of the values is not a number");
  if (t < 1 && e < 1 && i < 1 && s < 1 && a < 1 && c < 1)
    throw new Error("No banknotes to dispense");
  return [t, e, i, s, a, c] = [
    this.decToHex(t),
    this.decToHex(e),
    this.decToHex(i),
    this.decToHex(s),
    this.decToHex(a),
    this.decToHex(c)
  ], ["F1", "C5", t, e, i, s, a, c, "00", "00", "F2", "00"];
}, Rn = function() {
  F(this, Ht, !1), F(this, Bt, 0), F(this, Kt, 0);
}, /**
 *
 * @param {null|object} dispensed
 * @param {number} limit
 */
Re = function({ dispensed: t = null, limit: e = 80 } = {}) {
  F(this, Kt, Math.round(R(this, Bt) * 100 / e)), this.dispatch("percentage:test", { percentage: R(this, Kt), dispensed: t });
}, aa = function(t) {
  const e = ["20", "50", "100", "200", "500"], i = this.__banknote_purse.recycler.banknote, s = "$_" + e[i], a = parseInt(e[i]), c = this.banknotes.recycler[`p${e[i]}`], l = Math.min(Math.floor(t / a), c), h = {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: t,
    will_dispense: l > 0
  };
  return this.totalInRecycler === 0 || l < 1 || t === 0 || (h.banknotes[s] = l, h.pending = parseFloat((t - l * a).toFixed(2))), h;
}, oa = function(t) {
  const e = {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: t,
    will_dispense: !1
  };
  if (this.totalInRecycler === 0 || t === 0) return e;
  const i = (s, a) => {
    if (this.banknotes.recycler[a] > 0) {
      const c = Math.floor(e.pending / s), l = Math.min(c, this.banknotes.recycler[a]);
      e.banknotes[`$_${s}`] = l, e.pending = parseFloat((e.pending - l * s).toFixed(2));
    }
  };
  return i(1e3, "p1000"), i(500, "p500"), i(200, "p200"), i(100, "p100"), i(50, "p50"), i(20, "p20"), e.will_dispense = Object.values(e.banknotes).some((s) => s > 0), e;
}, In = function(t) {
  return o(this, w, Ae).call(this) ? o(this, w, aa).call(this, t) : o(this, w, oa).call(this, t);
}, On = function(t) {
  const e = {
    coins: { $_50c: 0, $_1: 0, $_2: 0, $_5: 0, $_10: 0 },
    pending: t,
    will_dispense: !1
  };
  if (t <= 0 || this.totalInTubes === 0) return e;
  const i = (s, a, c = null) => {
    if (this.coins.tubes[a] > 0) {
      c === null && (c = "$_" + s);
      const l = Math.floor(e.pending / s), h = Math.min(l, this.coins.tubes[a]);
      e.coins[c] = h, e.pending = parseFloat((e.pending - h * s).toFixed(2));
    }
  };
  return i(10, "p10"), i(5, "p5"), i(2, "p2"), i(1, "p1"), i(0.5, "g50", "$_50c"), e.will_dispense = Object.values(e.coins).some((s) => s > 0), e;
}, Bn = async function(t = null) {
  if (!o(this, w, Bs).call(this)) throw new Error("Change not available");
  let e = this.change, i = this.change;
  if (t !== null && (e = t, i = t), i <= 0) return !1;
  const s = o(this, w, In).call(this, i);
  i = s.pending;
  const a = o(this, w, On).call(this, i);
  return i = a.pending, i > 0 && this.dispatch("change:pending", { pending: i }), this.dispatch("change:dispense", {
    recycler: s.banknotes,
    coins: a.coins,
    pending: i,
    delivery: e - i
  }), i === e ? !1 : (s.will_dispense && await this.banknotePurseDispense(s.banknotes), a.will_dispense && await this.coinPurseDispense(a.coins), !0);
};
var Wt, ca, la;
class Cc extends Ft {
  constructor({ filters: t = null, config_port: e = null, no_device: i = 1 } = {}) {
    super({ filters: t, config_port: e, no_device: i });
    X(this, Wt);
    if (this.__internal__.device.type = "arduino", j.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.time.response_connection = 2e3, this.__internal__.time.response_general = 2e3, this.__internal__.serial.delay_first_connection = 1e3, o(this, Wt, la).call(this), o(this, Wt, ca).call(this);
  }
  serialMessage(t) {
    const e = {
      original_code: t,
      code: null,
      name: null,
      description: null,
      request: null,
      no_code: 0
    }, i = this.parseHexToUint8(t), s = this.parseUint8ArrayToString(i);
    switch (e.code = s, s) {
      case "connected":
        e.name = "connected", e.description = "Connection established", e.request = "connect", e.no_code = 100;
        break;
      case "created by danidoble":
        e.name = "thanks", e.description = "thanks for using this software", e.request = "credits", e.no_code = 101;
        break;
      case "hello there":
        e.name = "hello there", e.description = "hi human", e.request = "hi", e.no_code = 102;
        break;
      case "ara ara":
        e.name = "ara ara", e.description = "troll", e.request = "ara ara", e.no_code = 404;
        break;
      default:
        e.name = "unknown", e.description = "Unknown command", e.request = "unknown", e.no_code = 400;
        break;
    }
    this.dispatch("serial:message", e);
  }
  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(t = 1) {
    return this.add0x(this.parseStringToBytes("CONNECT"));
  }
  async sayCredits() {
    const t = this.parseStringToBytes("CREDITS");
    await this.appendToQueue(t, "credits");
  }
  async sayHi() {
    const t = this.parseStringToBytes("HI");
    await this.appendToQueue(t, "hi");
  }
  async sayAra() {
    const t = this.parseStringToBytes("OTHER");
    await this.appendToQueue(t, "ara");
  }
  async sendCustomCode({ code: t = "" } = {}) {
    if (typeof t != "string") throw new Error("Invalid string");
    const e = this.parseStringToBytes(t);
    await this.appendToQueue(e, "custom");
  }
  async doSomething() {
    await this.sayCredits(), await this.sayAra(), await this.sayHi();
  }
}
Wt = new WeakSet(), ca = function() {
  j.addCustom("arduino", this);
}, la = function() {
};
/**
 * @license Webserial
 * webserial
 *
 * Created by (c) Danidoble.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const Sc = {
  wait: ut,
  getSeconds: tn,
  supportWebSerial: _i
}, kc = "4.1.3";
export {
  Cc as Arduino,
  Tc as Boardroid,
  j as Devices,
  Ie as Emulator,
  Ec as Jofemar,
  Ft as Kernel,
  vc as Locker,
  Pc as PinPad,
  wc as Relay,
  Sc as utils,
  kc as version
};
