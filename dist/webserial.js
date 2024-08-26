var pn = Object.defineProperty;
var Me = (f) => {
  throw TypeError(f);
};
var _n = (f, r, t) => r in f ? pn(f, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : f[r] = t;
var B = (f, r, t) => _n(f, typeof r != "symbol" ? r + "" : r, t), be = (f, r, t) => r.has(f) || Me("Cannot " + t);
var y = (f, r, t) => (be(f, r, "read from private field"), t ? t.call(f) : r.get(f)), I = (f, r, t) => r.has(f) ? Me("Cannot add the same private member more than once") : r instanceof WeakSet ? r.add(f) : r.set(f, t), x = (f, r, t, e) => (be(f, r, "write to private field"), e ? e.call(f, t) : r.set(f, t), t), i = (f, r, t) => (be(f, r, "access private method"), t);
var M = [];
for (var ye = 0; ye < 256; ++ye)
  M.push((ye + 256).toString(16).slice(1));
function fn(f, r = 0) {
  return (M[f[r + 0]] + M[f[r + 1]] + M[f[r + 2]] + M[f[r + 3]] + "-" + M[f[r + 4]] + M[f[r + 5]] + "-" + M[f[r + 6]] + M[f[r + 7]] + "-" + M[f[r + 8]] + M[f[r + 9]] + "-" + M[f[r + 10]] + M[f[r + 11]] + M[f[r + 12]] + M[f[r + 13]] + M[f[r + 14]] + M[f[r + 15]]).toLowerCase();
}
var ne, bn = new Uint8Array(16);
function yn() {
  if (!ne && (ne = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !ne))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return ne(bn);
}
var wn = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const Fe = {
  randomUUID: wn
};
function kn(f, r, t) {
  if (Fe.randomUUID && !r && !f)
    return Fe.randomUUID();
  f = f || {};
  var e = f.random || (f.rng || yn)();
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, fn(e);
}
class Pe extends EventTarget {
  constructor() {
    super(...arguments);
    B(this, "__listeners__", {});
  }
  dispatch(t, e = null) {
    const n = new vn(t, { detail: e });
    this.dispatchEvent(n);
  }
  dispatchAsync(t, e = null, n = 100) {
    const a = this;
    setTimeout(() => {
      a.dispatch(t, e);
    }, n);
  }
  on(t, e) {
    typeof this.__listeners__[t] < "u" && this.__listeners__[t] === !1 && (this.__listeners__[t] = !0), this.addEventListener(t, e);
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
class vn extends CustomEvent {
  constructor(r, t) {
    super(r, t);
  }
}
function $(f = 100) {
  return new Promise((r) => setTimeout(() => r(), f));
}
function Ne() {
  return "serial" in navigator;
}
function we(f = 1) {
  return f * 1e3;
}
var H, L, o, Ae, Be, _, ke, C, m, ie, p, ve, K;
const s = class s {
  static status(r = null) {
    var e, n;
    if (!i(e = s, o, _).call(e, r)) return !1;
    let t = [];
    switch (y(s, H)) {
      case "locker":
        t = ["0", "8"];
        break;
      case "boardroid":
        t = ["2", (5 + y(s, L)).toString(16).toUpperCase()];
        break;
      case "jofemar":
        t = ["6"];
        break;
      default:
        return !1;
    }
    i(n = s, o, p).call(n, t);
  }
  static dispensed(r = null) {
    var e, n;
    if (!i(e = s, o, _).call(e, r)) return !1;
    let t = [];
    switch (y(s, H)) {
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
    i(n = s, o, p).call(n, t);
  }
  static notDispensed(r = null) {
    var e, n;
    if (!i(e = s, o, _).call(e, r)) return !1;
    let t = [];
    switch (y(s, H)) {
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
    i(n = s, o, p).call(n, t);
  }
  static gateInactive(r = null) {
    var t;
    if (!i(t = s, o, _).call(t, r) || !i(this, o, ke).call(this)) return !1;
    i(this, o, p).call(this, ["0", "7", "5", "5", "5"]);
  }
  static gateConfigured(r = null) {
    var t;
    if (!i(t = s, o, _).call(t, r) || !i(this, o, ke).call(this)) return !1;
    i(this, o, p).call(this, ["0", "6"]);
  }
  static keyPressed(r = null) {
    var a, c, u;
    if (!i(a = s, o, _).call(a, r) || !i(c = s, o, m).call(c)) return !1;
    const t = ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "2A", "23", "41", "42", "43", "44"], e = (128 + y(s, L)).toString(16), n = Math.floor(Math.random() * 15);
    i(u = s, o, p).call(u, ["2", e, "54", t[n]]);
  }
  static doorOpened(r = null) {
    var n, a;
    if (!i(n = s, o, _).call(n, r) || !i(this, o, ie).call(this)) return !1;
    let t = [];
    const e = (128 + y(s, L)).toString(16);
    switch (y(s, H)) {
      case "boardroid":
        t = ["2", "D8", "dc"];
        break;
      case "jofemar":
        t = ["2", e, "50", "4F"];
        break;
    }
    i(a = s, o, p).call(a, t);
  }
  static doorClosed(r = null) {
    var n, a;
    if (!i(n = s, o, _).call(n, r) || !i(this, o, ie).call(this)) return !1;
    let t = [];
    const e = (128 + y(s, L)).toString(16);
    switch (y(s, H)) {
      case "boardroid":
        t = ["2", "D8", "db"];
        break;
      case "jofemar":
        t = ["2", e, "50", "43"];
        break;
    }
    i(a = s, o, p).call(a, t);
  }
  static channelDisconnected(r = null) {
    var e, n, a;
    if (!i(e = s, o, _).call(e, r) || !i(n = s, o, m).call(n)) return !1;
    const t = (128 + y(s, L)).toString(16);
    i(a = s, o, p).call(a, ["2", t, "43", "43", "43", "FD"]);
  }
  static channelConnected(r = null) {
    var e, n, a;
    if (!i(e = s, o, _).call(e, r) || !i(n = s, o, m).call(n)) return !1;
    const t = (128 + y(s, L)).toString(16);
    i(a = s, o, p).call(a, ["2", t, "43", "43", "43", "FC"]);
  }
  static channelEmpty(r = null) {
    var e, n, a;
    if (!i(e = s, o, _).call(e, r) || !i(n = s, o, m).call(n)) return !1;
    const t = (128 + y(s, L)).toString(16);
    i(a = s, o, p).call(a, ["2", t, "43", "43", "43", "FF"]);
  }
  static workingTemperature(r = null) {
    var e, n, a;
    if (!i(e = s, o, _).call(e, r) || !i(n = s, o, m).call(n)) return !1;
    const t = (128 + y(s, L)).toString(16);
    i(a = s, o, p).call(a, ["2", t, "43", "54", "16"]);
  }
  static currentTemperature(r = null) {
    var n, a, c;
    if (!i(n = s, o, _).call(n, r) || !i(a = s, o, ie).call(a)) return !1;
    let t = [];
    const e = (128 + y(s, L)).toString(16);
    switch (y(s, H)) {
      case "boardroid":
        t = ["2", "D9", "44", "30"];
        break;
      case "jofemar":
        t = ["2", e, "43", "74", "2B", "30", "39", "2E", "31", "7F", "43"];
        break;
    }
    i(c = s, o, p).call(c, t);
  }
  static ready(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "30"]);
  }
  static busy(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "31"]);
  }
  static invalidTray(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "32"]);
  }
  static invalidChannel(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "33"]);
  }
  static emptyChannel(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "34"]);
  }
  static elevatorJam(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "35"]);
  }
  static elevatorMalfunction(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "36"]);
  }
  static phototransistorFailure(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "37"]);
  }
  static allChannelsEmpty(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "38"]);
  }
  static productDetectorFailure(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "39"]);
  }
  static displayDisconnected(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "41"]);
  }
  static productUnderElevator(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "42"]);
  }
  static elevatorSettingAlarm(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "43"]);
  }
  static buttonPanelFailure(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "44"]);
  }
  static errorWritingEeprom(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "45"]);
  }
  static errorControlTemperature(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "46"]);
  }
  static thermometerDisconnected(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "47"]);
  }
  static thermometerMisconfigured(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "48"]);
  }
  static thermometerFailure(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "49"]);
  }
  static errorExtractorConsumption(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "4A"]);
  }
  static channelSearchError(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "4B"]);
  }
  static productExitMouthSearchError(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "4C"]);
  }
  static elevatorInteriorLocked(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "4D"]);
  }
  static productDetectorVerifierError(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "4E"]);
  }
  static waitingForProductRecall(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "4F"]);
  }
  static productExpiredByTemperature(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "50"]);
  }
  static faultyAutomaticDoor(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "51"]);
  }
  static rejectLever(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "A0", "1"]);
  }
  static resetCoinPurse(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "A0", "2"]);
  }
  static coinInsertedBox(r = null, t = null) {
    var a, c, u, h;
    if (!i(a = s, o, _).call(a, r) || !i(c = s, o, C).call(c)) return !1;
    const e = ["40", "41", "42", "43", "44", "45"], n = i(u = s, o, ve).call(u, e, t);
    i(h = s, o, p).call(h, ["2", "A0", n]);
  }
  static coinInsertedTube(r = null, t = null) {
    var a, c, u, h;
    if (!i(a = s, o, _).call(a, r) || !i(c = s, o, C).call(c)) return !1;
    const e = ["50", "51", "52", "53", "54", "55"], n = i(u = s, o, ve).call(u, e, t);
    i(h = s, o, p).call(h, ["2", "A0", n]);
  }
  static banknoteInsertedStacker(r = null, t = null) {
    var a, c, u, h;
    if (!i(a = s, o, _).call(a, r) || !i(c = s, o, C).call(c)) return !1;
    const e = ["80", "81", "82", "83", "84"], n = i(u = s, o, K).call(u, e, t);
    i(h = s, o, p).call(h, ["2", "B0", n]);
  }
  static banknoteInsertedEscrow(r = null, t = null) {
    var a, c, u, h;
    if (!i(a = s, o, _).call(a, r) || !i(c = s, o, C).call(c)) return !1;
    const e = ["90", "91", "92", "93", "94"], n = i(u = s, o, K).call(u, e, t);
    i(h = s, o, p).call(h, ["2", "B0", n]);
  }
  static banknoteEjected(r = null, t = null) {
    var a, c, u, h;
    if (!i(a = s, o, _).call(a, r) || !i(c = s, o, C).call(c)) return !1;
    const e = ["A0", "A1", "A2", "A3", "A4"], n = i(u = s, o, K).call(u, e, t);
    i(h = s, o, p).call(h, ["2", "B0", n]);
  }
  static banknoteInsertedRecycler(r = null, t = null) {
    var a, c, u, h;
    if (!i(a = s, o, _).call(a, r) || !i(c = s, o, C).call(c)) return !1;
    const e = ["B0", "B1", "B2", "B3", "B4"], n = i(u = s, o, K).call(u, e, t);
    i(h = s, o, p).call(h, ["2", "B0", n]);
  }
  static banknoteTaken(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "B0", "2a"]);
  }
  static coinPurseEnabled(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "D0", "1"]);
  }
  static coinPurseDisabled(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "D0", "0"]);
  }
  static billPurseDisabled(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "D1", "0", "0"]);
  }
  static billPurseEnabled(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "D1", "1", "1"]);
  }
  static readTubes(r = null) {
    var b, g, T;
    if (!i(b = s, o, _).call(b, r) || !i(g = s, o, C).call(g)) return !1;
    const t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f"], [e, n, a, c, u, h] = [
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)]
    ];
    i(T = s, o, p).call(T, ["2", "D2", e, n, a, c, u, h]);
  }
  static readBillPurse(r = null, t = null) {
    var n, a, c, u;
    if (!i(n = s, o, _).call(n, r) || !i(a = s, o, C).call(a)) return !1;
    let e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c"];
    if (r._recycler.ict) {
      const h = e[Math.floor(Math.random() * 31)];
      let b = "0", g = "0", T = "0", S = "0", j = "0";
      if (t !== null && !isNaN(parseInt(t)))
        switch (t.toString()) {
          case "20":
            b = h;
            break;
          case "50":
            g = h;
            break;
          case "100":
            T = h;
            break;
          case "200":
            S = h;
            break;
          case "500":
            j = h;
            break;
        }
      else
        switch (r._recycler.bill) {
          case 0:
            b = h;
            break;
          case 1:
            g = h;
            break;
          case 2:
            T = h;
            break;
          case 3:
            S = h;
            break;
          case 4:
            j = h;
            break;
        }
      i(c = s, o, p).call(c, ["2", "D3", b, g, T, S, j, "0"]);
    } else {
      const [h, b, g, T, S, j] = [
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 2)],
        e[Math.floor(Math.random())],
        e[Math.floor(Math.random())]
      ];
      i(u = s, o, p).call(u, ["2", "D3", h, b, g, T, S, j]);
    }
  }
  static banknoteAccepted(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "D4", "1"]);
  }
  static banknoteRejected(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "D4", "0"]);
  }
  static banknotesDispensed(r = null) {
    var e, n, a, c;
    if (!i(e = s, o, _).call(e, r) || !i(n = s, o, C).call(n)) return !1;
    let t = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c"];
    if (r._recycler.ict) {
      const u = t[Math.floor(Math.random() * 30)];
      let h = "0", b = "0", g = "0", T = "0", S = "0";
      switch (r._recycler.bill) {
        case 0:
          h = u;
          break;
        case 1:
          b = u;
          break;
        case 2:
          g = u;
          break;
        case 3:
          T = u;
          break;
        case 4:
          S = u;
          break;
      }
      i(a = s, o, p).call(a, ["2", "D5", h, b, g, T, S, "0"]);
    } else {
      const [u, h, b, g, T, S] = [
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 2)],
        t[Math.floor(Math.random())],
        t[Math.floor(Math.random())]
      ];
      i(c = s, o, p).call(c, ["2", "D5", u, h, b, g, T, S]);
    }
  }
  static coinsDispensed(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "D6"]);
  }
  static relayOn(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DA", "1"]);
  }
  static relayOff(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DA", "0"]);
  }
  static nayaxEnabled(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DD", "1"]);
  }
  static nayaxDisabled(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DD", "0"]);
  }
  static nayaxPreCreditAuthorized(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DD", "3"]);
  }
  static nayaxCancelRequest(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DD", "4"]);
  }
  static nayaxSellApproved(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DD", "5"]);
  }
  static nayaxSellDenied(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DD", "6"]);
  }
  static nayaxEndSession(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DD", "7"]);
  }
  static nayaxCancelled(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DD", "8"]);
  }
  static nayaxDispensed(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DD", "A", "0"]);
  }
  static nayaxNotDispensed(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, C).call(e)) return !1;
    i(n = s, o, p).call(n, ["2", "DD", "A", "1"]);
  }
  static fullTray(r = null) {
    var t, e, n;
    if (!i(t = s, o, _).call(t, r) || !i(e = s, o, m).call(e)) return !1;
    i(n = s, o, p).call(n, ["6", "4F"]);
  }
  static setConnection(r = null) {
    var t;
    if (!i(t = s, o, _).call(t, r)) return !1;
    r.__internal__.serial.connected = !0;
  }
};
H = new WeakMap(), L = new WeakMap(), o = new WeakSet(), Ae = function() {
  if (s.enable === !1) throw new Error("Emulator is disabled");
  return s.enable;
}, Be = function(r) {
  if (typeof r != "object" || !(r instanceof Y)) throw new Error(`Type ${r.typeDevice} is not supported`);
  return s.instance = r, x(s, H, r.typeDevice), x(s, L, r.deviceNumber), !0;
}, _ = function(r = null) {
  var t, e;
  return !i(t = s, o, Ae).call(t) || r === null && s.instance === null ? !1 : (s.instance === null && i(e = s, o, Be).call(e, r), !0);
}, ke = function() {
  if (y(s, H) !== "locker") throw new Error("This function is only available for Locker devices");
  return !0;
}, C = function() {
  if (y(s, H) !== "boardroid") throw new Error("This function is only available for Boardroid devices");
  return !0;
}, m = function() {
  if (y(s, H) !== "jofemar") throw new Error("This function is only available for Jofemar devices");
  return !0;
}, ie = function() {
  if (y(s, H) === "locker") throw new Error("This function is not available for Locker devices");
  return !0;
}, p = function(r) {
  s.instance.__emulate({ code: r });
}, ve = function(r, t = null) {
  let e = r[Math.floor(Math.random() * 5)];
  if (t !== null && !isNaN(parseFloat(t)))
    switch (t.toString()) {
      case "0.5":
        e = r[1];
        break;
      case "1":
        e = r[2];
        break;
      case "2":
        e = r[3];
        break;
      case "5":
        e = r[4];
        break;
      case "10":
        e = r[5];
        break;
    }
  return e;
}, K = function(r, t = null) {
  let e = r[Math.floor(Math.random() * 4)];
  if (t !== null && !isNaN(parseFloat(t)))
    switch (t.toString()) {
      case "20":
        e = r[0];
        break;
      case "50":
        e = r[1];
        break;
      case "100":
        e = r[2];
        break;
      case "200":
        e = r[3];
        break;
      case "500":
        e = r[4];
        break;
    }
  return e;
}, I(s, o), B(s, "enable", !1), B(s, "instance", null), I(s, H, null), I(s, L, 1);
let pe = s;
const k = class k extends Pe {
  static typeError(r) {
    const t = new Error();
    throw t.message = `Type ${r} is not supported`, t.name = "DeviceTypeError", t;
  }
  static addCustom(r, t) {
    typeof k.devices[r] > "u" && (k.devices[r] = []), k.add(t);
  }
  static add(r) {
    const t = r.typeDevice, e = r.uuid;
    if (typeof k.devices[t] > "u") return k.typeError(t);
    if (this.instance.dispatch("change", k.devices), !k.devices[t][e])
      return k.devices[t][e] = r, this.instance.dispatch("change", k.devices), k.devices[t].indexOf(r);
  }
  static get(r, t) {
    return typeof k.devices[r] > "u" ? k.typeError(r) : k.devices[r][t];
  }
  static getJofemarByUuid(r) {
    return k.get("jofemar", r);
  }
  static getLockerByUuid(r) {
    return k.get("locker", r);
  }
  static getRelayByUuid(r) {
    return k.get("relay", r);
  }
  static getBoardroidByUuid(r) {
    return k.get("boardroid", r);
  }
  static getArduinoByUuid(r) {
    return k.get("arduino", r);
  }
  static getAll(r = null) {
    return r === null ? k.devices : typeof k.devices[r] > "u" ? k.typeError(r) : k.devices[r];
  }
  static getList() {
    return Object.values(k.devices).map((t) => Object.values(t)).flat();
  }
  static getJofemar(r = 1) {
    return Object.values(k.devices.jofemar).find((e) => e.deviceNumber === r) ?? null;
  }
  static getBoardroid(r = 1) {
    return Object.values(k.devices.boardroid).find((e) => e.deviceNumber === r) ?? null;
  }
  static getLocker(r = 1) {
    return Object.values(k.devices.locker).find((e) => e.deviceNumber === r) ?? null;
  }
  static getRelay(r = 1) {
    return Object.values(k.devices.relay).find((e) => e.deviceNumber === r) ?? null;
  }
  static getArduino(r = 1) {
    return Object.values(k.devices.arduino).find((e) => e.deviceNumber === r) ?? null;
  }
  static getCustom(r, t = 1) {
    return typeof k.devices[r] > "u" ? k.typeError(r) : Object.values(k.devices[r]).find((n) => n.deviceNumber === t) ?? null;
  }
};
B(k, "instance", null), B(k, "devices", {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: [],
  arduino: []
});
let D = k;
D.instance || (D.instance = new D());
var w, qe, me, Q, Re, He, Le, Oe, Ue, je, We, $e, Qe, Ve, Je, ze;
class Y extends Pe {
  /**
   *
   * @param {null|array} filters
   * @param {null|object} config_port
   * @param {number} no_device
   * @param {null|number|string} device_listen_on_port
   */
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: n = 1,
    device_listen_on_port: a = 1
  } = {}) {
    super();
    I(this, w);
    B(this, "__internal__", {
      device_number: 1,
      aux_port_connector: 0,
      last_error: { message: null, action: null, code: null, no_code: 0 },
      serial: {
        connected: !1,
        port: null,
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
        id: kn(),
        listen_on_port: null
      },
      time: {
        response_connection: 500,
        response_general: 2e3,
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
        dispensing: !1,
        status: null,
        counter: 0,
        limit_counter: 20,
        backup_dispense: {}
      }
    });
    t && (this.serialFilters = t), e && (this.serialConfigPort = e), n && i(this, w, Je).call(this, n), a && (typeof a == "number" || typeof a == "string") && (this.listenOnPort = a), i(this, w, We).call(this), i(this, w, $e).call(this);
  }
  set listenOnPort(t) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 255) throw new Error("Invalid port number");
    this.__internal__.device.listen_on_port = t, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(t);
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
    await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector = 0, this.dispatch("serial:disconnected", t), D.instance.dispatch("change");
  }
  async connect() {
    return new Promise((t, e) => {
      Ne() || e("Web Serial not supported"), setTimeout(async () => {
        await $(499), await this.serialConnect(), this.isConnected ? t(`${this.typeDevice} device ${this.deviceNumber} connected`) : e(`${this.typeDevice} device ${this.deviceNumber} not connected`);
      }, 1);
    });
  }
  async serialDisconnect() {
    try {
      const t = this.__internal__.serial.reader, e = this.__internal__.serial.output_stream;
      t && (await t.cancel().catch((a) => this.serialErrors(a)), await this.__internal__.serial.input_done), e && (await e.getWriter().close(), await this.__internal__.serial.output_done), this.__internal__.serial.connected && this.__internal__.serial && await this.__internal__.serial.port.close();
    } catch (t) {
      this.serialErrors(t);
    } finally {
      this.__internal__.serial.reader = null, this.__internal__.serial.input_done = null, this.__internal__.serial.output_stream = null, this.__internal__.serial.output_done = null, this.__internal__.serial.connected = !1, this.__internal__.serial.port = null;
    }
  }
  async serialPortsSaved(t) {
    const e = this.serialFilters;
    if (this.__internal__.aux_port_connector < t.length) {
      const n = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = t[n];
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
      case e.includes("this readable stream reader has been released and cannot be used to cancel its previous owner stream"):
        this.dispatch("serial:need-permission", {}), D.instance.dispatch("change");
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
        this.dispatch("serial:lost", {}), D.instance.dispatch("change");
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
      const t = await i(this, w, Re).call(this);
      if (t.length > 0)
        await this.serialPortsSaved(t);
      else {
        const a = this.serialFilters;
        this.__internal__.serial.port = await navigator.serial.requestPort({ filters: a });
      }
      const e = this.__internal__.serial.port;
      await e.open(this.serialConfigPort);
      const n = this;
      e.onconnect = (a) => {
        n.dispatch("serial:connected", a.detail), D.instance.dispatch("change"), n.__internal__.serial.queue.length > 0 && n.dispatch("internal:queue", {});
      }, e.ondisconnect = async (a) => {
        await n.disconnect(a.detail ?? null);
      }, await $(this.__internal__.serial.delay_first_connection), this.__internal__.timeout.until_response = setTimeout(async () => {
        await n.timeout(n.__internal__.serial.bytes_connection, "connection:start");
      }, this.__internal__.time.response_connection), await i(this, w, me).call(this, this.__internal__.serial.bytes_connection), this.dispatch("serial:sent", {
        action: "connect",
        bytes: this.__internal__.serial.bytes_connection
      }), this.typeDevice === "relay" && i(this, w, Q).call(this, ["DD", "DD"], null), await i(this, w, Ue).call(this);
    } catch (t) {
      this.serialErrors(t);
    }
  }
  async serialForget() {
    return await i(this, w, je).call(this);
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
    return t.forEach((n, a) => {
      e[a] = "0x" + n;
    }), e;
  }
  bytesToHex(t) {
    return this.add0x(Array.from(t, (e) => this.hexMaker(e)));
  }
  async appendToQueue(t, e) {
    const n = this.bytesToHex(t);
    if (["connect", "connection:start"].includes(e)) {
      if (this.__internal__.serial.connected) return;
      await this.serialConnect();
      return;
    }
    this.__internal__.serial.queue.push({ bytes: n, action: e }), this.dispatch("internal:queue", {});
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
    return t.forEach((n) => {
      e += parseInt(n, 16);
    }), e.toString(16);
  }
  internalClearSensing() {
    this.__internal__.interval.waiting_sense && clearInterval(this.__internal__.interval.waiting_sense), this.__internal__.interval.waiting_sense = 0, this.__internal__.dispense.status = null, this.__internal__.dispense.counter = 0, this.__internal__.dispense.dispensing = !1;
  }
  internalDispensingProcess() {
    return this.__internal__.dispense.counter >= this.__internal__.dispense.limit_counter ? (this.internalClearSensing(), this.__internal__.dispense.status = !1, this.__internal__.dispense.dispensing = !1, !1) : (this.__internal__.dispense.counter += 0.1, this.__internal__.dispense.counter % 1 === 0 && this.dispatch("dispensing", {
      status: this.__internal__.dispense.status,
      counter: this.__internal__.dispense.counter,
      limit: this.__internal__.dispense.limit_counter
    }), null);
  }
  async internalDispenseStatus() {
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
    if (!pe.enable && !this.__internal__.serial.connected && (await this.serialConnect(), !this.__internal__.serial.connected))
      throw new Error("Serial device not connected");
    return this.__internal__.serial.queue.length === 0 ? (await this.appendToQueue(t, "dispense"), await this.internalDispenseStatus()) : new Promise((e) => {
      const n = setInterval(async () => {
        if (this.__internal__.serial.queue.length > 0) return;
        clearInterval(n), await this.appendToQueue(t, "dispense");
        const a = await this.internalDispenseStatus();
        e(a);
      }, 100);
    });
  }
  __emulate(t) {
    if (typeof t.code != "object") {
      console.error("Invalid data to make an emulation");
      return;
    }
    this.__internal__.serial.connected || (this.__internal__.serial.connected = !0, this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0)), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0);
    const e = [];
    for (const n in t.code)
      e.push(t.code[n].toString().padStart(2, "0").toLowerCase());
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
    i(this, w, ze).call(this), this.dispatch("serial:soft-reload", {});
  }
  async sendConnect() {
    await this.appendToQueue(this.__internal__.serial.bytes_connection, "connect");
  }
  async sendCustomCode(t) {
    await this.appendToQueue(t, "custom");
  }
}
w = new WeakSet(), qe = function(t) {
  return !!(t.readable && t.writable);
}, me = async function(t) {
  const e = this.__internal__.serial.port;
  if (!e) {
    if (pe.enable)
      return;
    throw new Error("The port is closed.");
  }
  const n = new Uint8Array(t), a = e.writable.getWriter();
  await a.write(n), a.releaseLock();
}, // #bytesToLowerCase(code = []) {
//     return code.map((item) => item.toString().toLowerCase());
// }
Q = function(t = [], e = null) {
  if (t && t.length > 0) {
    this.__internal__.serial.connected = !0, this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0);
    const n = [];
    for (const a in t)
      n.push(t[a].toString().padStart(2, "0").toLowerCase());
    this.serialMessage(n);
  } else
    this.serialCorruptMessage(t, e);
  this.__internal__.serial.queue.length !== 0 && this.dispatch("internal:queue", {});
}, Re = async function() {
  const t = this.serialFilters, e = await navigator.serial.getPorts({ filters: t });
  return t.length === 0 ? e : e.filter((a) => {
    const c = a.getInfo();
    return t.some((u) => c.usbProductId === u.usbProductId && c.usbVendorId === u.usbVendorId);
  }).filter((a) => !i(this, w, qe).call(this, a));
}, He = function(t) {
  if (t) {
    const e = this.__internal__.serial.response.buffer;
    let n = new Uint8Array(e.length + t.byteLength);
    n.set(e, 0), n.set(new Uint8Array(t), e.length), this.__internal__.serial.response.buffer = n;
  }
}, Le = async function() {
  this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0), this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
    let t = [];
    for (const e in this.__internal__.serial.response.buffer)
      t.push(this.__internal__.serial.response.buffer[e].toString(16));
    this.__internal__.serial.response.buffer && i(this, w, Q).call(this, t), this.__internal__.serial.response.buffer = new Uint8Array(0);
  }, 400);
}, Oe = async function() {
  if (this.__internal__.serial.response.length === this.__internal__.serial.response.buffer.length) {
    const t = [];
    for (const e in this.__internal__.serial.response.buffer)
      t.push(this.__internal__.serial.response.buffer[e].toString(16));
    await i(this, w, Q).call(this, t), this.__internal__.serial.response.buffer = new Uint8Array(0);
  } else if (this.__internal__.serial.response.length < this.__internal__.serial.response.buffer.length) {
    let t = [];
    for (let n = 0; n < this.__internal__.serial.response.length; n++)
      t[n] = this.__internal__.serial.response.buffer[n];
    if (t.length === this.__internal__.serial.response.length) {
      const n = [];
      for (const a in t)
        n.push(t[a].toString(16));
      await i(this, w, Q).call(this, n), this.__internal__.serial.response.buffer = new Uint8Array(0);
      return;
    }
    t = [];
    const e = this.__internal__.serial.response.length * 2;
    if (this.__internal__.serial.response.buffer.length === e) {
      for (let n = 14; n < e; n++)
        t[n - this.__internal__.serial.response.length] = this.__internal__.serial.response.buffer[n];
      if (t.length === this.__internal__.serial.response.length) {
        const n = [];
        for (const a in t)
          n.push(t[a].toString(16));
        await i(this, w, Q).call(this, n), this.__internal__.serial.response.buffer = new Uint8Array(0);
      }
    }
  }
}, Ue = async function() {
  const t = this.__internal__.serial.port;
  for (; t.readable && this.__internal__.serial.keep_reading; ) {
    const e = t.readable.getReader();
    this.__internal__.serial.reader = e;
    try {
      let n = !0;
      for (; n; ) {
        const { value: a, done: c } = await e.read();
        if (c) {
          e.releaseLock(), this.__internal__.serial.keep_reading = !1, n = !1;
          break;
        }
        i(this, w, He).call(this, a), this.__internal__.serial.response.length === null ? await i(this, w, Le).call(this) : await i(this, w, Oe).call(this);
      }
    } catch (n) {
      this.serialErrors(n);
    } finally {
      e.releaseLock();
    }
  }
  this.__internal__.serial.keep_reading = !0, await this.__internal__.serial.port.close();
}, je = async function() {
  return typeof window > "u" ? !1 : "serial" in navigator && "forget" in window.SerialPort.prototype ? (await this.__internal__.serial.port.forget(), !0) : !1;
}, We = function() {
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
    "serial:error"
  ].forEach((e) => {
    this.serialRegisterAvailableListener(e);
  });
}, $e = function() {
  this.on("internal:queue", async () => {
    await i(this, w, Ve).call(this);
  }), i(this, w, Qe).call(this);
}, Qe = function() {
  const t = this;
  navigator.serial.addEventListener("connect", async () => {
    t.isDisconnected && await t.serialConnect().catch(() => {
    });
  });
}, Ve = async function() {
  if (!this.__internal__.serial.connected) {
    await this.serialConnect();
    return;
  }
  if (this.__internal__.timeout.until_response || this.__internal__.serial.queue.length === 0) return;
  const t = this.__internal__.serial.queue[0];
  this.__internal__.timeout.until_response = setTimeout(async () => {
    await this.timeout(t.bytes, t.action);
  }, this.__internal__.time.response_general), await i(this, w, me).call(this, t.bytes), this.dispatch("serial:sent", {
    action: t.action,
    bytes: t.bytes
  }), this.typeDevice === "relay" && i(this, w, Q).call(this, ["DD", "DD"], null);
  const e = [...this.__internal__.serial.queue];
  this.__internal__.serial.queue = e.splice(1);
}, Je = function(t = 1) {
  this.__internal__.device_number = t, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(t);
}, ze = function() {
  this.__internal__.last_error = { message: null, action: null, code: null, no_code: 0 };
};
var ee, _e, Ge;
class gn extends Y {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: n = 1
  } = {}) {
    super({ filters: t, config_port: e, no_device: n });
    I(this, _e);
    I(this, ee, {
      activate: ["A0", "01", "01", "A2"],
      deactivate: ["A0", "01", "00", "A1"]
    });
    if (this.__internal__.device.type = "relay", D.getCustom(this.typeDevice, n)) throw new Error(`Device ${this.typeDevice} ${n} already exists`);
    i(this, _e, Ge).call(this);
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
    return t.forEach((n, a) => {
      a !== 3 && (e += parseInt(n, 16));
    }), e.toString(16).toUpperCase();
  }
  serialSetConnectionConstant(t = 1) {
    const e = ["A0", "01", "00", "A1"];
    return e[1] = this.hexMaker(this.decToHex(t.toString())), e[3] = this.serialRelaySumHex(e), this.add0x(e);
  }
  async turnOn() {
    const t = y(this, ee).activate;
    t[3] = this.serialRelaySumHex(t), await this.appendToQueue(t, "relay:turn-on");
  }
  async turnOff() {
    const t = y(this, ee).deactivate;
    t[3] = this.serialRelaySumHex(t), await this.appendToQueue(t, "relay:turn-off");
  }
  async toggle({ inverse: t = !1, ms: e = 300 } = {}) {
    const n = this;
    t ? (await n.turnOff(), await $(e), await n.turnOn()) : (await n.turnOn(), await $(e), await n.turnOff());
  }
}
ee = new WeakMap(), _e = new WeakSet(), Ge = function() {
  D.add(this);
};
var A, E, W, v, Ye, Ke, Ze, ge, Z, V, re, ae, se;
class Cn extends Y {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: n = 1,
    device_listen_on_port: a = 3
  } = {}) {
    super({ filters: t, config_port: e, no_device: n, device_listen_on_port: a });
    I(this, v);
    I(this, A, !1);
    I(this, E, 0);
    I(this, W, 0);
    if (this.__internal__.device.type = "locker", D.getCustom(this.typeDevice, n)) throw new Error(`Device ${this.typeDevice} ${n} already exists`);
    this.__internal__.device.milliseconds = 666, this.__internal__.dispense.limit_counter = 1, i(this, v, Ke).call(this), i(this, v, Ye).call(this);
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
            e.name = "Cell closed.", e.description = "The selected cell is closed.", e.request = "dispense", e.no_code = 1102, this.__internal__.dispense.status = !1, this.dispatch("dispensed", {}), y(this, A) && y(this, E) >= 89 ? (e.finished_test = !0, x(this, A, !1), x(this, E, 0)) : y(this, A) && (e.finished_test = !1);
            break;
          case "01":
          case "04":
            e.name = "Cell open.", e.description = "The selected cell was open successfully.", e.request = "dispense", e.no_code = 102, this.__internal__.dispense.status = !0, this.dispatch("dispensed", {}), y(this, A) && y(this, E) >= 89 ? (e.finished_test = !0, x(this, A, !1), x(this, E, 0)) : y(this, A) && (e.finished_test = !1);
            break;
          case "05":
            e.name = "Cell inactive.", e.description = "The selected cell is inactive or doesn't exist.", e.request = "dispense", e.no_code = 101, this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", {}), y(this, A) && y(this, E) >= 89 ? (e.finished_test = !0, x(this, A, !1), x(this, E, 0)) : y(this, A) && (e.finished_test = !1);
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
    let n = null;
    try {
      n = new Uint8Array(t.length + 8), n.set(t, 2), n[0] = 2, n[1] = t.length + 4, n[n.length - 2] = 3;
      let a = 0;
      for (let h = 1; h < t.length; h++)
        a += t[h], a *= parseInt(Math.pow(2, h - 1).toString());
      n[t.length + 2] = a % 256, n[t.length + 3] = e * 3 % 256, n[t.length + 4] = e * 8 % 256;
      let c = 0;
      for (let h = 3; h < t.length + 5; h++)
        c += n[h];
      n[t.length + 5] = c % 256;
      let u = 0;
      for (let h = 0; h < n.length - 1; h++)
        u ^= n[h];
      n[n.length - 1] = u;
    } catch (a) {
      this.serialErrors(`Error generating command: ${a.message}`), n = null;
    }
    return n;
  }
  serialLockerHexCmd(t) {
    const e = this.serialLockerCmdMaker(t), n = [];
    for (let a = 0; a < e.length; a++)
      n.push(this.decToHex(e[a]));
    return n;
  }
  serialLockerGetConnectionCmd(t = 3) {
    if (t < 1 || t > 255) throw new Error("Invalid port number");
    return this.serialLockerHexCmd(new Uint8Array([0, t]));
  }
  // #serialLockerGetLightScanCmd(since = 0, until = 10) {
  //     return this.serialLockerHexCmd(new Uint8Array([32, this.__internal__.device.listen_on_port, since, until]));
  // }
  parseCellToColumnRow(t) {
    const e = Math.floor((t - 1) / 10) + 1;
    let n = t % 8;
    return n === 0 && (n = 8), [e, n];
  }
  async dispense({ cell: t = 1 } = {}) {
    t = i(this, v, Z).call(this, t);
    const e = i(this, v, Ze).call(this, t);
    return await this.internalDispense(e);
  }
  async enable({ cell: t = 1 } = {}) {
    t = i(this, v, Z).call(this, t);
    const [e, n] = this.parseCellToColumnRow(t), a = i(this, v, ge).call(this, { enable: !0, column: e, row: n });
    await this.appendToQueue(a, "activate");
  }
  async disable({ cell: t = 1 } = {}) {
    t = i(this, v, Z).call(this, t);
    const [e, n] = this.parseCellToColumnRow(t), a = i(this, v, ge).call(this, { enable: !1, column: e, row: n });
    await this.appendToQueue(a, "disable");
  }
  async openAll() {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    i(this, v, V).call(this), x(this, A, !0), i(this, v, re).call(this);
    const t = [];
    for (let e = 1; e <= 90; e++) {
      const n = await this.dispense(e);
      t.push(n), x(this, E, e), i(this, v, re).call(this);
    }
    x(this, E, 90), i(this, v, re).call(this, t), i(this, v, V).call(this);
  }
  async enableAll() {
    i(this, v, V).call(this), x(this, A, !0), i(this, v, ae).call(this);
    for (let t = 1; t <= 90; t++)
      await this.enable(t), x(this, E, t), i(this, v, ae).call(this);
    x(this, E, 90), i(this, v, ae).call(this), i(this, v, V).call(this);
  }
  async disableAll() {
    i(this, v, V).call(this), x(this, A, !0), i(this, v, se).call(this);
    for (let t = 1; t <= 90; t++)
      await this.enable(t), x(this, E, t), i(this, v, se).call(this);
    x(this, E, 90), i(this, v, se).call(this), i(this, v, V).call(this);
  }
}
A = new WeakMap(), E = new WeakMap(), W = new WeakMap(), v = new WeakSet(), Ye = function() {
  const t = [
    "percentage:disable",
    "percentage:enable",
    "percentage:open"
  ];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, Ke = function() {
  D.add(this);
}, Ze = function(t = 1) {
  return t = i(this, v, Z).call(this, t), this.serialLockerHexCmd(new Uint8Array([16, this.__internal__.device.listen_on_port, t]));
}, ge = function({ enable: t = !0, column: e = 0, row: n = 10 } = {}) {
  if (e < 0 || e > 8) throw new Error("Invalid column number");
  if (n < 0 || n > 10) throw new Error("Invalid row number");
  let a = 1;
  return t || (a = 0), this.serialLockerHexCmd(new Uint8Array([48, this.__internal__.device.listen_on_port, e, n, a]));
}, // #serialLockerGetOpenCmd(cell = 1) {
//     cell = this.#validateCell(cell);
//     const time = this.__internal__.device.milliseconds;
//     //const time = new Date().getMilliseconds();
//     const timeHigh = time % 256;
//     const timeLow = Math.floor(time / 3) % 256;
//     return this.serialLockerHexCmd(new Uint8Array([64, this.__internal__.device.listen_on_port, cell, timeHigh, timeLow]));
// }
Z = function(t) {
  const e = parseInt(t);
  if (isNaN(e) || e < 1 || e > 90) throw new Error("Invalid cell number");
  return e;
}, V = function() {
  x(this, A, !1), x(this, E, 0), x(this, W, 0);
}, re = function(t = null) {
  x(this, W, Math.round(y(this, E) * 100 / 90)), this.dispatch("percentage:open", { percentage: y(this, W), dispensed: t });
}, ae = function() {
  x(this, W, Math.round(y(this, E) * 100 / 90)), this.dispatch("percentage:enable", { percentage: y(this, W) });
}, se = function() {
  x(this, W, Math.round(y(this, E) * 100 / 90)), this.dispatch("percentage:disable", { percentage: y(this, W) });
};
var l, Xe, et, tt, q, F, nt, it, rt, at, st, ot, lt, ct, dt, ht, ut, pt, _t, ft, bt, yt, wt, kt, vt, mt, gt, Ct, xt, Tt, Dt, Et, O, P, oe, N, U, St, It, Mt, Ft, X, Ce, xe, le, ce, Pt;
class xn extends Y {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: n = 1,
    device_listen_on_port: a = 1,
    type: c = "esplus",
    support_cart: u = !0
  } = {}) {
    super({ filters: t, config_port: e, no_device: n, device_listen_on_port: a });
    I(this, l);
    B(this, "__device", {
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
    if (this.__internal__.device.type = "jofemar", D.getCustom(this.typeDevice, n)) throw new Error(`Device ${this.typeDevice} ${n} already exists`);
    this.__internal__.time.response_general = 800, this.__internal__.dispense.limit_counter = 40, this.__internal__.dispense.timeout = 0, this.__internal__.dispense.timeout_time = 4e3, this.__internal__.dispense.interval = 0, this.__internal__.dispense.interval_time = 1e3, this.__internal__.device.hex_number = (128 + this.listenOnPort).toString(16), this.__internal__.dispense.elevator = {
      locking_time: 60,
      locking_interval: 0,
      need_reset: !1
    }, this.deviceType = c, this.supportCart = u, i(this, l, Xe).call(this), i(this, l, tt).call(this), i(this, l, et).call(this);
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
    this.__internal__.device.listen_on_port = t, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(t), this.__internal__.device.hex_number = (128 + this.listenOnPort).toString(16);
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
    let e = this.hexToDec(this.sumHex(t)), n = this.calcCheckSums(e.toString());
    for (let a = 0; a < 2; a++)
      t.push(this.hexMaker(n[a]));
    return t.push("03"), this.add0x(t);
  }
  calcCheckSums(t) {
    t = this.add0x([this.decToHex(parseInt(t).toString())]);
    let e = [];
    return e.push((t & 255 | 240).toString(16).toUpperCase()), e.push((t & 255 | 15).toString(16).toUpperCase()), e;
  }
  serialSetConnectionConstant(t = 1) {
    let e = ["02", "30", "30", (128 + t).toString(16), "53", "FF", "FF"], n = [];
    return e.forEach((a) => {
      n.push(this.hexMaker(a));
    }), this.serialJofemarMakeBytes(n);
  }
  serialMessage(t) {
    let n = {
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
        n = i(this, l, Et).call(this, t, n, 128);
        break;
      case "06":
        n = i(this, l, St).call(this, t, n);
        break;
      case "15":
        n.name = "Checksum error", n.description = "The calculated checksum does not match the received checksum", n.no_code = 38, i(this, l, P).call(this);
        break;
      default:
        n.name = "unknown", n.description = "The message received is unknown", n.no_code = 404;
        break;
    }
    this.dispatch("serial:message", n);
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
  async dispense({
    selection: t = 1,
    cart: e = !1
  } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 109) throw new Error("Invalid selection");
    const { channel: n, tray: a } = i(this, l, It).call(this, t);
    this.__internal__.dispense.backup_dispense = {
      selection: t,
      cart: e,
      channel: n,
      tray: a
    };
    let u = ["02", "30", "30", this.__internal__.device.hex_number, "56", a, n];
    e && (u[4] = "4D"), u = i(this, l, F).call(this, u);
    let h;
    do
      h = await this.internalDispense(u), i(this, l, Mt).call(this), h.error === "elevator-locked" ? await i(this, l, nt).call(this) : h.error === "no-response" && await $(1e3);
    while (["elevator-locked", "no-response"].includes(h.error));
    return this.__internal__.dispense.backup_dispense = {}, h;
  }
  async endDispense() {
    let e = ["02", "30", "30", this.__internal__.device.hex_number, "4D", "80", "80"];
    return e = i(this, l, F).call(this, e), await this.internalDispense(e);
  }
  async collect() {
    const t = i(this, l, F).call(this, ["02", "30", "30", "81", "4E", "FF", "FF"]);
    return await i(this, l, q).call(this, t, "collect");
  }
  async resetSoldOutErrors() {
    return await i(this, l, X).call(this, "80");
  }
  async resetWaitingProductRemovedError() {
    return await i(this, l, X).call(this, "81");
  }
  async resetMachineErrors() {
    return this.__internal__.serial.queue.length === 0 ? (i(this, l, Ce).call(this), await i(this, l, X).call(this, "FF")) : new Promise((t) => {
      const e = setInterval(async () => {
        this.__internal__.serial.queue.length > 0 || (clearInterval(e), await i(this, l, X).call(this, "FF"), i(this, l, Ce).call(this), t(!0));
      }, 100);
    });
  }
  async resetAllErrors() {
    return await this.resetSoldOutErrors(), await $(100), await this.resetWaitingProductRemovedError(), await $(100), await this.resetMachineErrors();
  }
  async status() {
    const t = i(this, l, F).call(this, ["02", "30", "30", "81", "53", "FF", "FF"]);
    return await i(this, l, q).call(this, t, "status");
  }
  async lightsOn() {
    return await i(this, l, xe).call(this, "81");
  }
  async lightsOff() {
    return await i(this, l, xe).call(this, "80");
  }
  async program(t, e) {
    const n = i(this, l, F).call(this, ["02", "30", "30", "81", "50", t, e]);
    return await i(this, l, q).call(this, n, "program");
  }
  async programDisplayLanguage(t = "spanish") {
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
    const e = this.__device.type === "iceplus" ? 6.5 : 32, n = this.__device.type === "iceplus" ? -25 : 0.5;
    if (isNaN(t) || t < n || t > e || t % 0.5 !== 0) throw new Error("Invalid degrees");
    let a = t * 2 + 128;
    return this.__device.type === "iceplus" && (a += 51), a = Math.ceil(a), await this.program("54", a.toString(16));
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
    if (t = parseFloat(t), isNaN(t) || t < 0.5 || t > 30 || t % 0.5 !== 0) throw new Error("Invalid degrees, valid range is 0.5 to 30");
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
    if (e = parseFloat(e), t = parseInt(t), isNaN(t) || t < 1 || t > 80) throw new Error("Invalid selection, valid range is 1 to 80");
    if (isNaN(e) || e < 5 || e > 9.5 || e % 0.5 !== 0) throw new Error("Invalid voltage, valid range is 5 to 9.5");
    const n = 109 + t, c = (128 + (e - 5) * 2).toString(16), u = i(this, l, F).call(this, ["02", "30", "30", "81", "47", n, c]);
    return await i(this, l, q).call(this, u, "voltage-engine");
  }
  /**
   * @param {number|string} selection
   * @param {boolean} enable
   * @return {Promise<void>}
   */
  async programPushOverProducts({ selection: t = 1, enable: e = !0 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 80) throw new Error("Invalid selection, valid range is 1 to 80");
    const n = 109 + t, a = e ? "31" : "30", c = i(this, l, F).call(this, ["02", "30", "30", "81", "4F", n, a]);
    return await i(this, l, q).call(this, c, "push-over-products");
  }
  /**
   * @param {number|string} selection
   * @param {number|string} seconds
   * @return {Promise<void>}
   */
  async programChannelRunningAfterDispense({ selection: t = 1, seconds: e = 0 } = {}) {
    if (t = parseInt(t), e = parseFloat(e), isNaN(t) || t < 1 || t > 126) throw new Error("Invalid selection, valid range is 1 to 126");
    if (isNaN(e) || e < 0 || e > 10) throw new Error("Invalid seconds, valid range is 0.0 to 10.0");
    const n = 109 + t;
    e = e.toFixed(1);
    const a = 128 + e * 10, c = i(this, l, F).call(this, ["02", "30", "30", "81", "45", n, a]);
    return await i(this, l, q).call(this, c, "channel-running-after-dispense");
  }
  async checkData(t, e = "FF") {
    const n = i(this, l, F).call(this, ["02", "30", "30", "81", "43", t, e]);
    return await i(this, l, q).call(this, n, "check-data");
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
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 126) throw new Error("Invalid selection, valid range is 1 to 126");
    const e = (109 + t).toString(16);
    return await this.checkData("47", e);
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getChannelPresence({ selection: t = 1 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 126) throw new Error("Invalid selection, valid range is 1 to 126");
    const e = (109 + t).toString(16);
    return await this.checkData("43", e);
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getPushOverProducts({ selection: t = 1 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 126) throw new Error("Invalid selection, valid range is 1 to 126");
    const e = (109 + t).toString(16);
    return await this.checkData("4F", e);
  }
  /**
   * @param {number|string} selection
   * @return {Promise<*>}
   */
  async getChannelRunningAfterDispense({ selection: t = 1 } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 126) throw new Error("Invalid selection, valid range is 1 to 126");
    const e = (109 + t).toString(16);
    return await this.checkData("45", e);
  }
  async setDisplayStandbyMessage({ message: t = "" } = {}) {
    t = t.substring(0, 32);
    const e = i(this, l, ce).call(this, t);
    return await i(this, l, le).call(this, "80", e);
  }
  /**
   * @param {string} message
   * @param {number|string} seconds
   * @return {Promise<void>}
   */
  async setDisplayMessageTemporarily({ message: t = "", seconds: e = 1 }) {
    if (t = t.substring(0, 32), e = parseInt(e), isNaN(e) || e < 1 || e > 125) throw new Error("Invalid seconds, valid range is 1 to 125");
    const n = i(this, l, ce).call(this, t), a = (128 + e).toString(16);
    return await i(this, l, le).call(this, a, n);
  }
  /**
   * @param {string} message
   * @return {Promise<void>}
   */
  async setDisplayMessageUnlimited({ message: t = "" }) {
    t = t.substring(0, 32);
    const e = i(this, l, ce).call(this, t);
    return await i(this, l, le).call(this, "FF", e);
  }
  async programClock(t = /* @__PURE__ */ new Date()) {
    if (!(t instanceof Date)) throw new Error("Invalid date, must be an instance of Date");
    const e = i(this, l, F).call(this, ["02", "30", "30", "81", "72", ...i(this, l, Pt).call(this, t)]);
    return await i(this, l, q).call(this, e, "clock");
  }
  /**
   * @param {null|string} event
   * @param {boolean} enable
   * @return {Promise<void>}
   */
  async eventsConfig({ event: t = null, enable: e = !0 } = {}) {
    if (t === null) throw new Error("Invalid event");
    const n = e ? "31" : "30", a = i(this, l, F).call(this, ["02", "30", "30", "81", "41", t, n]);
    return await i(this, l, q).call(this, a, "events-config");
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
  async sendCustomCode(t = []) {
    if (t.length < 5) throw new Error("Invalid code, minimum length is 5");
    const e = i(this, l, F).call(this, t);
    return await i(this, l, q).call(this, e, "custom");
  }
  async assignChannels() {
    const t = this.__device.channels.verification.start, e = this.__device.channels.verification.end;
    if (t > e) throw new Error("Invalid range, start must be less than end");
    this.__device.channels.verification.clear(), this.__device.channels.verification.running = !0;
    for (let n = t; n <= e; n++)
      this.__device.channels.verification.current = n, await this.getChannelPresence({ selection: n });
    return new Promise((n) => {
      let a = setInterval(() => {
        this.__device.channels.verification.channels.length === e - t + 1 && (clearInterval(a), this.dispatch("channels", { channels: this.__device.channels.verification.channels }), this.__device.channels.verification.clear(), n(!0));
      }, 500);
    });
  }
}
l = new WeakSet(), Xe = function() {
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
}, et = function() {
  this.on("internal:dispense:running", () => i(this, l, Ft));
}, tt = function() {
  D.add(this);
}, q = function(t, e) {
  return t[3] = this.__internal__.device.hex_number, this.appendToQueue(i(this, l, F).call(this, t), e);
}, F = function(t) {
  let e = this.hexToDec(this.sumHex(t)), n = this.calcCheckSums(e.toString());
  for (let a = 0; a < 2; a++)
    t.push(this.hexMaker(n[a]));
  return t.push("03"), t;
}, nt = async function() {
  if (this.__internal__.dispense.elevator.locking_interval) return;
  this.__internal__.dispense.elevator.need_reset && (this.__internal__.dispense.elevator.need_reset = !1, await this.resetWaitingProductRemovedError(), await $(500)), await this.collect();
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
}, it = function(t, e) {
  return e.name = "ok", e.description = "The last command was executed successfully", e.no_code = 1, this.dispatch("command-executed", e), e;
}, rt = function(t, e) {
  e.additional = {
    hex: t,
    dec: this.hexToDec(t),
    ascii: null
  };
  const n = {
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
  return e.additional.ascii = n[t] ?? null, e.name = "Key pressed", e.description = `The key ${e.additional.ascii} was pressed`, e.no_code = 2, this.dispatch("keyboard:pressed", e.additional), e;
}, at = function(t, e) {
  return e.additional = { open: !1 }, e.no_code = 3, t === "4f" ? (e.name = "door open", e.description = "The door was opened", e.additional.open = !0, this.dispatch("door:event", e.additional)) : t === "43" ? (e.name = "door close", e.description = "The door was closed", e.additional.open = !1, this.dispatch("door:event", e.additional)) : (e.name = "door event", e.description = "The door event received is unknown", this.dispatch("door:event", { open: e.additional.open, message: e })), e;
}, st = function(t, e) {
  e.no_code = 404;
  let n = t[5] ?? null;
  return n && this.listenOnPort > 1 && (n = this.hexToDec(n) - this.listenOnPort + 1, n = this.decToHex(n)), n && (n === "FD" ? (e.no_code = 4, e.name = "channel disconnected", e.description = "The channel is disconnected", e.additional = { active: !1 }) : n === "FC" ? (e.no_code = 5, e.name = "channel connected", e.description = "The channel is connected", e.additional = { active: !0 }) : (e.no_code = 6, e.name = "channel sold out", e.description = "The channel is empty", e.additional = { active: !0 }), this.__device.channels.verification.running && (this.__device.channels.verification.channels.push({
    selection: this.__device.channels.verification.current,
    active: e.additional.active
  }), e.additional.selection = this.__device.channels.verification.current), this.dispatch("channel:status", e.additional)), e;
}, ot = function(t, e) {
  e.no_code = 39, e.name = "Program version";
  const n = t.slice(4, 12), a = n.map((c) => String.fromCharCode(this.hexToDec(c))).join("");
  return e.additional = { version: a, hex: n }, e.description = `The program version is ${a}`, this.dispatch("program:version", e.additional), e;
}, lt = function(t, e) {
  e.no_code = 39, e.name = "Machine faults", e.description = "No faults detected", e.additional = { no_faults: 0, faults: [] };
  const n = t.slice(4, -3);
  if (n.length > 1 && n[0] !== "30") {
    e.description = "Machine has faults";
    const a = {
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
    for (const c of n)
      a[c] && (e.additional.faults.push(a[c]), e.additional.no_faults++);
  }
  return this.dispatch("machine:faults", e.additional), e;
}, ct = function(t, e) {
  e.no_code = 40, e.name = "Clock registers", e.description = "Clock registers";
  const n = t.slice(4, -3), a = n.map((fe) => String.fromCharCode(this.hexToDec(fe))).join(""), [c, u] = a.split(" "), [h, b] = c.split(":"), [g, T, S] = u.split("-"), j = new Date(2e3 + parseInt(S), parseInt(T) - 1, parseInt(g), parseInt(h), parseInt(b));
  return e.additional = {
    day: g,
    month: T,
    year: S,
    hours: h,
    minutes: b,
    formatted: a,
    date: j,
    hex: n
  }, this.dispatch("clock:registers", e.additional), e;
}, dt = function(t, e) {
  e.no_code = 41, e.name = "Machine activity", e.description = "Events from read machine activity";
  const n = String.fromCharCode(this.hexToDec(t[4]));
  if (n !== "0") {
    const a = t.slice(5, -3);
    if (n === "T" && a.length === 4) {
      const c = String.fromCharCode(this.hexToDec(a[0])), u = String.fromCharCode(this.hexToDec(a[1])), h = String.fromCharCode(this.hexToDec(a[3]));
      e.additional = {
        ascii: n,
        type: "DU.d",
        dozens: c,
        units: u,
        decimals: h,
        time: parseFloat(`${c}${u}.${h}`),
        meaning: "Extraction time (in seconds)"
      };
    } else if (["B", "D", "E", "F", "G"].includes(n) && a.length === 3) {
      const c = String.fromCharCode(this.hexToDec(a[0])), u = String.fromCharCode(this.hexToDec(a[1])), h = String.fromCharCode(this.hexToDec(a[2])), b = parseInt(`${c}${u}${h}`), g = {
        B: "Error on going to tray channel",
        D: "Error on product detector",
        E: "Extraction of channel ok",
        F: "Error on engine intensity detection",
        G: "Error on product exit door"
      };
      e.additional = {
        type: "HDU",
        hundreds: c,
        dozens: u,
        decimals: h,
        channel: b,
        selection: b - 109,
        ascii: n,
        meaning: g[n] ?? "Unknown"
      };
    } else if (a.length === 13) {
      const c = a.map((un) => String.fromCharCode(this.hexToDec(un))).join(""), u = parseInt(c.slice(0, 2)), h = parseInt(c.slice(2, 4)), b = parseInt(c.slice(4, 6)), g = parseInt(c.slice(7, 9)), T = parseInt(c.slice(9, 11)) - 1, S = 2e3 + parseInt(c.slice(11, 13)), j = new Date(S, T, g, u, h, b), fe = {
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
        date: j,
        hex: a,
        formatted: j.toLocaleString(),
        ascii: n,
        meaning: fe[n] ?? "Unknown"
      };
    }
  }
  return this.dispatch("machine:activity", e.additional), e;
}, ht = function(t, e) {
  const n = {
    30: "Spanish",
    31: "English",
    32: "French"
  };
  return e.no_code = 42, e.name = "Language", e.description = `The language is ${n[t] ?? "unknown"}`, e.additional = {
    hex: t,
    language: n[t] ?? "unknown"
  }, this.dispatch("check:language", e.additional), e;
}, ut = function(t, e) {
  return e.no_code = 43, e.name = "Beeper", e.description = `The beeper is ${t === "30" ? "on" : "off"}`, e.additional = {
    hex: t,
    beeper: t === "30"
  }, this.dispatch("check:beeper", e.additional), e;
}, pt = function(t, e) {
  e.no_code = 44, e.name = "Isolation tray", e.description = "Isolation tray";
  const n = this.hexToDec(t) - 139;
  return e.additional = {
    hex: t,
    tray: n
  }, this.dispatch("check:isolation-tray", e.additional), e;
}, _t = function(t, e) {
  e.no_code = 45, e.name = "Engine voltage", e.description = "Engine voltage";
  const n = (this.hexToDec(t) - 128) / 2 + 5;
  return e.additional = {
    hex: t,
    voltage: n
  }, this.dispatch("check:engine-voltage", e.additional), e;
}, ft = function(t, e) {
  e.no_code = 46, e.name = "Push over", e.description = "Push over";
  const n = t === "30";
  return e.additional = {
    hex: t,
    push: n
  }, this.dispatch("check:push-over", e.additional), e;
}, bt = function(t, e) {
  e.no_code = 47, e.name = "Extractor after dispense", e.description = "Extractor after dispense";
  const n = (this.hexToDec(t) - 128) / 10;
  return e.additional = {
    hex: t,
    seconds: n
  }, this.dispatch("check:extractor-after-dispense", e.additional), e;
}, yt = function(t, e) {
  e.no_code = 48, e.name = "Standby after collect", e.description = "Time to standby after collect product";
  const n = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    seconds: n
  }, this.dispatch("check:standby-after-collect", e.additional), e;
}, wt = function(t, e) {
  e.no_code = 49, e.name = "Standby without collect", e.description = "Time to standby when product delivery is not collected";
  const n = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    minutes: n
  }, this.dispatch("check:standby-without-collect", e.additional), e;
}, kt = function(t, e) {
  e.no_code = 50, e.name = "Elevator speed", e.description = "Elevator speed";
  const n = t === "30" ? "low" : "high";
  return e.additional = {
    hex: t,
    speed: n
  }, this.dispatch("check:elevator-speed", e.additional), e;
}, vt = function(t, e) {
  e.no_code = 51, e.name = "Temperature expiration", e.description = "Temperature expiration";
  const n = t === "31";
  return e.additional = {
    hex: t,
    enabled: n
  }, this.dispatch("check:expiration-by-temperature", e.additional), e;
}, mt = function(t, e) {
  e.no_code = 52, e.name = "Temperature before expiration", e.description = "Temperature before expiration";
  const n = (this.hexToDec(t) - 128) / 2;
  return e.additional = {
    hex: t,
    temperature: n
  }, this.dispatch("check:temperature-before-expiration", e.additional), e;
}, gt = function(t, e) {
  e.no_code = 53, e.name = "Time before expiration", e.description = "Time before expiration";
  const n = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    minutes: n
  }, this.dispatch("check:expiration-after", e.additional), e;
}, Ct = function(t, e) {
  e.no_code = 54, e.name = "Temperature scale", e.description = "Temperature scale";
  const n = t === "43" ? "Celsius" : "Fahrenheit";
  return e.additional = {
    hex: t,
    scale: n
  }, this.dispatch("check:temperature-scale", e.additional), e;
}, xt = function(t, e) {
  return e.no_code = 54, e.name = "Machine ID", e.description = "Machine ID", e.additional = { hex: t[4], full_hex: t }, this.dispatch("check:machine-id", e.additional), e;
}, Tt = function(t, e) {
  return e.no_code = 7, e.name = "working temperature", e.description = `The working temperature is ${t}`, e.additional = {
    hex: t,
    temperature: {
      traditional: (this.hexToDec(t) - this.hexToDec("80")) / 2,
      ice_plus: (this.hexToDec(t) - this.hexToDec("80")) / 2 - 25.5
    }
  }, this.dispatch("temperature:working", e.additional), e;
}, Dt = function(t, e) {
  return e.no_code = 8, e.name = "current temperature", e.additional = {
    sign: null,
    tens: null,
    units: null,
    decimals: null,
    type_degrees: null,
    formatted: null,
    decimal_point: t[7] === "2e" ? "." : null,
    degrees: t[9] === "7f" ? "°" : null
  }, t[4] === "2b" ? e.additional.sign = t[4] = "+" : ["2e", "2d"].includes(t[4]) && (e.additional.sign = t[4] = "-"), this.hexToDec(t[5]) >= 48 && this.hexToDec(t[5]) <= 57 && (e.additional.tens = this.hexToDec(t[5]) - 48), this.hexToDec(t[6]) >= 48 && this.hexToDec(t[6]) <= 57 && (e.additional.units = this.hexToDec(t[6]) - 48), this.hexToDec(t[8]) >= 48 && this.hexToDec(t[8]) <= 57 && (e.additional.decimals = this.hexToDec(t[8]) - 48), t[10] === "43" ? e.additional.type_degrees = "C" : t[10] === "46" && (e.additional.type_degrees = "F"), e.additional.formatted = (e.additional.sign ?? "") + (e.additional.tens ?? "") + (e.additional.units ?? "") + (e.additional.decimal_point ?? "") + (e.additional.decimals ?? "") + (e.additional.degrees ?? "") + (e.additional.type_degrees ?? ""), e.description = `The current temperature is ${e.additional.formatted}`, this.dispatch("temperature:current", e.additional), e;
}, Et = function(t, e, n = 128) {
  if (t[1] && (e.additional.machine.hex = t[1], e.additional.machine.dec = this.hexToDec(t[1]) - n), !(t[1] && t[2]))
    e = i(this, l, it).call(this, t, e);
  else
    switch (t[2]) {
      case "54":
        e.request = "--automatic", e = i(this, l, rt).call(this, t[3], e);
        break;
      case "50":
        e.request = "--automatic", e = i(this, l, at).call(this, t[3], e);
        break;
      case "43":
        switch (e.request = "check-data", t[3]) {
          case "41":
            e = i(this, l, dt).call(this, t, e);
            break;
          case "43":
            e.request = "channel-status", e = i(this, l, st).call(this, t, e);
            break;
          case "50":
            e = i(this, l, ot).call(this, t, e);
            break;
          case "53":
            e = i(this, l, lt).call(this, t, e);
            break;
          case "54":
            e.request = "working-temperature", e = i(this, l, Tt).call(this, t[4], e);
            break;
          case "72":
            e = i(this, l, ct).call(this, t, e);
            break;
          case "74":
            e.request = "current-temperature", e = i(this, l, Dt).call(this, t, e);
            break;
          case "49":
            e = i(this, l, ht).call(this, t[4], e);
            break;
          case "5a":
            e = i(this, l, ut).call(this, t[4], e);
            break;
          case "42":
            e = i(this, l, pt).call(this, t[4], e);
            break;
          case "47":
            e = i(this, l, _t).call(this, t[4], e);
            break;
          case "4e":
            e = i(this, l, xt).call(this, t, e);
            break;
          case "4f":
            e = i(this, l, ft).call(this, t[4], e);
            break;
          case "45":
            e = i(this, l, bt).call(this, t[4], e);
            break;
          case "46":
            e = i(this, l, yt).call(this, t[4], e);
            break;
          case "48":
            e = i(this, l, wt).call(this, t[4], e);
            break;
          case "76":
            e = i(this, l, kt).call(this, t[4], e);
            break;
          case "63":
            e = i(this, l, vt).call(this, t[4], e);
            break;
          case "65":
            e = i(this, l, mt).call(this, t[4], e);
            break;
          case "66":
            e = i(this, l, gt).call(this, t[4], e);
            break;
          case "67":
            e = i(this, l, Ct).call(this, t[4], e);
            break;
        }
        break;
    }
  return e;
}, O = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !0);
}, P = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !1);
}, oe = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = "elevator-locked");
}, /**
 * Dispatch a warning message
 * @param {null|string} type
 * @param {string} severity
 */
N = function({ type: t = null, severity: e = "low" } = {}) {
  this.dispatch("jofemar:warning", { type: t, severity: e });
}, /**
 * Dispatch an error message
 * @param {null|string} type
 * @param {string} severity
 */
U = function({ type: t = null, severity: e = "high" } = {}) {
  this.dispatch("jofemar:error", { type: t, severity: e });
}, St = function(t, e) {
  if (e.request = "status", t[1] && !t[2]) {
    switch (t[1]) {
      case "30":
        e.name = "Machine ready", e.description = "The machine is ready for instructions", e.no_code = 9, i(this, l, O).call(this);
        break;
      case "31":
        e.name = "Machine busy", e.description = "The machine is busy right now", e.no_code = 10;
        break;
      case "32":
        e.name = "Invalid tray", e.description = "The tray requested is invalid", e.no_code = 11, i(this, l, P).call(this), i(this, l, N).call(this, { type: "invalid-tray" });
        break;
      case "33":
        e.name = "Invalid channel", e.description = "The channel requested is invalid", e.no_code = 12, i(this, l, P).call(this), i(this, l, N).call(this, { type: "invalid-channel" });
        break;
      case "34":
        e.name = "Empty channel", e.description = "The channel requested is empty", e.no_code = 13, i(this, l, P).call(this), i(this, l, N).call(this, { type: "empty-channel" });
        break;
      case "35":
        e.name = "Jam", e.description = "Jam in elevator engine", e.no_code = 14, i(this, l, P).call(this), i(this, l, U).call(this, { type: "jam" });
        break;
      case "36":
        e.name = "Malfunction", e.description = "Malfunction in the elevator belt or product detector", e.no_code = 15, i(this, l, P).call(this), i(this, l, U).call(this, { type: "malfunction" });
        break;
      case "37":
        e.name = "Photo transistors", e.description = "Failure in one of the photo transistors in the cabinet", e.no_code = 16, i(this, l, P).call(this), i(this, l, U).call(this, { type: "photo-transistors" });
        break;
      case "38":
        e.name = "Without channels", e.description = "No channels detected", e.no_code = 17, i(this, l, P).call(this), i(this, l, U).call(this, { type: "without-channels" });
        break;
      case "39":
        e.name = "Product detector fault", e.description = "Product detector fault", e.no_code = 18, i(this, l, oe).call(this), i(this, l, N).call(this, { type: "fault-product-detector" });
        break;
      case "41":
        e.name = "Fault in 485 BUS", e.description = "Machine display is disconnected", e.no_code = 19, i(this, l, O).call(this), i(this, l, N).call(this, { type: "display-disconnected" });
        break;
      case "42":
        e.name = "Product under elevator", e.description = "Product alarm under elevator", e.no_code = 20, i(this, l, P).call(this), i(this, l, N).call(this, { type: "product-under-elevator" });
        break;
      case "43":
        e.name = "Error when elevator approaching to a position", e.description = "Error when elevator approaching to a position", e.no_code = 21, i(this, l, O).call(this), i(this, l, N).call(this, { type: "error-approaching-position", severity: "high" });
        break;
      case "44":
        e.name = "Fault in keyboard", e.description = "Fault in keyboard", e.no_code = 22, i(this, l, P).call(this), i(this, l, U).call(this, { type: "fault-keyboard" });
        break;
      case "45":
        e.name = "Eeprom writing error", e.description = "Eeprom writing error", e.no_code = 23, i(this, l, P).call(this), i(this, l, U).call(this, { type: "eeprom-writing-error", severity: "critical" });
        break;
      case "46":
        e.name = "Fault communicating with temperature control", e.description = "Fault communicating with temperature control", e.no_code = 24, i(this, l, O).call(this), i(this, l, N).call(this, { type: "fault-temperature-control" });
        break;
      case "47":
        e.name = "Thermometer disconnected", e.description = "The thermometer is disconnected", e.no_code = 25, i(this, l, O).call(this), i(this, l, N).call(this, { type: "thermometer-disconnected" });
        break;
      case "48":
        e.name = "Thermometer programming lost", e.description = "Thermometer programming lost", e.no_code = 26, i(this, l, O).call(this), i(this, l, N).call(this, { type: "thermometer-programming-lost" });
        break;
      case "49":
        e.name = "Thermometer faulty", e.description = "Thermometer faulty", e.no_code = 27, i(this, l, O).call(this), i(this, l, N).call(this, { type: "thermometer-faulty" });
        break;
      case "4a":
        e.name = "Channels power consumption detector faulty", e.description = "Channels power consumption detector faulty", e.no_code = 28, i(this, l, P).call(this), i(this, l, U).call(this, { type: "channels-power-consumption-detector-faulty", severity: "critical" });
        break;
      case "4b":
        e.name = "Elevator does not find channel or tray", e.description = "Elevator does not find channel or tray", e.no_code = 29, i(this, l, P).call(this), i(this, l, N).call(this, { type: "elevator-not-find-channel-tray" });
        break;
      case "4c":
        e.name = "Elevator does not find delivery product position", e.description = "Elevator does not find delivery product position", e.no_code = 30, i(this, l, P).call(this), i(this, l, U).call(this, { type: "elevator-not-find-delivery-position" });
        break;
      case "4d":
        e.name = "Interior of elevator blocked", e.description = "Interior of elevator blocked", e.no_code = 31, i(this, l, oe).call(this), this.__internal__.dispense.elevator.need_reset || (this.__internal__.dispense.elevator.need_reset = !0), i(this, l, U).call(this, { type: "interior-elevator-blocked", severity: "low" });
        break;
      case "4e":
        e.name = "Error in tester of product detector", e.description = "Error in tester of product detector", e.no_code = 32, i(this, l, P).call(this), i(this, l, U).call(this, { type: "error-tester-product-detector" });
        break;
      case "4f":
        e.name = "Waiting for product to be removed", e.description = "Waiting for product to be removed", e.no_code = 33, i(this, l, oe).call(this);
        break;
      case "50":
        e.name = "Product expired by temperature reasons", e.description = "Product expired by temperature reasons", e.no_code = 34, i(this, l, O).call(this), i(this, l, N).call(this, { type: "product-expired-temperature" });
        break;
      case "51":
        e.name = "Automatic door faulty", e.description = "Automatic door faulty", e.no_code = 35, i(this, l, O).call(this), i(this, l, N).call(this, { type: "automatic-door-faulty" });
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
        e.no_code = 36, i(this, l, O).call(this), i(this, l, N).call(this, { type: "product-expired" });
        break;
      case "64":
        e.name = "Product detector didn't change during its verification test", e.description = "Product detector didn't change during its verification test", e.no_code = 37, i(this, l, O).call(this), i(this, l, N).call(this, { type: "automatic-door-faulty" });
        break;
    }
    this.dispatch("machine:status", e);
  } else
    e.name = "executed", e.description = "The last command was executed successfully", e.no_code = 8, !t[1] && this.__internal__.dispense.dispensing && i(this, l, P).call(this);
  return e;
}, It = function(t) {
  if (t = t.toString(), t.length !== 3)
    throw new Error("Invalid selection");
  const e = (parseInt(t.substring(0, 2)) + 128).toString(16).padStart(2, "0");
  return { channel: (parseInt(t.substring(2, 3)) + 128).toString(16).padStart(2, "0"), tray: e };
}, Mt = function() {
  this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.dispense.timeout = 0, this.__internal__.dispense.interval = 0;
}, Ft = function() {
  const t = this;
  t.__internal__.dispense.timeout = setTimeout(() => {
    t.__internal__.dispense.interval = setInterval(() => {
      t.status().then(() => {
      });
    }, t.__internal__.dispense.interval_time);
  }, t.__internal__.dispense.timeout_time);
}, X = async function(t) {
  const e = i(this, l, F).call(this, ["02", "30", "30", "81", "52", t, "FF"]);
  return await i(this, l, q).call(this, e, "reset");
}, Ce = function() {
  const t = this.__device.type === "iceplus" ? we(40) : we(25), e = /* @__PURE__ */ new Date(), n = 1e3 * t + e.getTime(), a = new Date(n);
  this.dispatch("reset:errors", {
    description: "Resetting machine errors",
    duration: t,
    started_at: e,
    finished_at: a
  });
}, xe = async function(t) {
  const e = i(this, l, F).call(this, ["02", "30", "30", "81", "4C", t, "FF"]);
  return await i(this, l, q).call(this, e, "lights");
}, le = async function(t = "80", e = []) {
  const n = i(this, l, F).call(this, ["02", "30", "30", "81", "44", t, ...e]);
  return await i(this, l, q).call(this, n, "display");
}, ce = function(t = "") {
  t = t.padEnd(32, " ");
  const e = [];
  for (let n = 0; n < 32; n++)
    e.push(t.charCodeAt(n).toString(16));
  return e;
}, Pt = function(t) {
  if (!(t instanceof Date)) throw new Error("Invalid date, must be an instance of Date");
  const e = t.getHours().toString().padStart(2, "0"), n = t.getMinutes().toString().padStart(2, "0"), a = t.getDate().toString().padStart(2, "0"), c = (t.getMonth() + 1).toString().padStart(2, "0"), u = t.getFullYear().toString().substring(2, 4), h = `${e}:${n} ${a}-${c}-${u}`, b = [];
  for (let g = 0; g < 14; g++)
    b.push(h.charCodeAt(g).toString(16));
  return b;
};
var te, J, z, d, Nt, At, de, Bt, qt, Rt, Ht, Lt, Ot, Ut, jt, Te, Wt, $t, Qt, Vt, Jt, zt, Gt, Yt, Kt, Zt, Xt, en, tn, nn, R, he, rn, an, sn, on, De, ue, ln, cn, Ee, Se, Ie;
class Tn extends Y {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: n = 1
  } = {}) {
    super({ filters: t, config_port: e, no_device: n });
    I(this, d);
    B(this, "__coin_purse", {
      available: !0
    });
    B(this, "__banknote_purse", {
      available: !0,
      isRecycler: !0,
      recycler: {
        ict: !0,
        banknote: 1
        // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
      }
    });
    B(this, "__sale", {
      price: 0,
      change: 0,
      change_verified: 0,
      dispense_all: !0,
      last_change: 0,
      clear() {
        this.price = 0, this.change = 0, this.change_verified = 0, this.dispense_all = !0, this.last_change = 0;
      }
    });
    B(this, "__money_session", {
      inserted: 0,
      retired: 0,
      clear() {
        this.inserted = 0, this.retired = 0;
      }
    });
    B(this, "coins", {
      tubes: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      box: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      totals: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      total: 0
    });
    B(this, "banknotes", {
      stacker: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      recycler: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      out: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      totals: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      total: 0
    });
    B(this, "card_reader", {
      available: !1,
      max_pre_credit: 0
    });
    I(this, te, !1);
    I(this, J, 0);
    I(this, z, 0);
    if (this.__internal__.device.type = "boardroid", D.getCustom(this.typeDevice, n)) throw new Error(`Device ${this.typeDevice} ${n} already exists`);
    this.__internal__.serial.config_port.baudRate = 115200, this.__internal__.serial.response.length = 14, this.__internal__.time.response_connection = 600, this.__internal__.time.response_general = 4e3, this.__internal__.dispense.limit_counter = 15, this.__internal__.dispense.backup_dispense = {
      channel: 1,
      second_channel: null,
      sensor: !0,
      seconds: null
    }, i(this, d, Nt).call(this), i(this, d, At).call(this);
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
  get hasCoinPurse() {
    return this.__coin_purse.available;
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
    return t.forEach((n, a) => {
      a !== 0 && a !== 11 && (e += parseInt(n, 16));
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
        e.request = "connect", e = i(this, d, qt).call(this, e);
        break;
      case "a0":
        e.request = "--automatic", e = i(this, d, Wt).call(this, t, e);
        break;
      case "b0":
        e.request = "--automatic", e = i(this, d, $t).call(this, t, e);
        break;
      case "d0":
        e.request = "coin-purse:config", e = i(this, d, Qt).call(this, t[2], e);
        break;
      case "d1":
        e.request = "banknote-purse:config", e.additional = { scrow: null }, e = i(this, d, Vt).call(this, t, e);
        break;
      case "d2":
        e.request = "coin-purse:read-tubes", e = i(this, d, Jt).call(this, t, e);
        break;
      case "d3":
        e.request = "banknote-purse:read-recycler", e = i(this, d, zt).call(this, t, e);
        break;
      case "d4":
        e.request = "banknote-purse:banknote-scrow-status", e = i(this, d, Gt).call(this, t[2], e);
        break;
      case "d5":
        e.request = "banknote-purse:dispense", e = i(this, d, Yt).call(this, t, e);
        break;
      case "d6":
        e.request = "coin-purse:dispense", e = i(this, d, Kt).call(this, t, e);
        break;
      case "d7":
        e.request = "dispense", e = i(this, d, Zt).call(this, t[5], e);
        break;
      case "d8":
        e.request = "--automatic", e = i(this, d, Xt).call(this, t[13], e);
        break;
      case "d9":
        e.request = "status:temperature", e = i(this, d, en).call(this, t, e);
        break;
      case "da":
        e.request = "status:relay", e = i(this, d, tn).call(this, t[2], e);
        break;
      case "db":
        e.request = "banknote-purse:save-memory", e.no_code = 18, e.name = "Bill purse memory saved?", e.description = "The memory of bill purse was saved successfully?", this.dispatch("banknote-purse:save-memory", { message: e });
        break;
      case "dc":
        e.request = "coin-purse:read-memory", e.no_code = 19, e.name = "Coin purse memory read?", e.description = "The memory of coin purse was read successfully?", this.dispatch("banknote-purse:read-memory", { message: e });
        break;
      case "dd":
        e.request = "card-reader", i(this, d, nn).call(this, t, e);
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
    const c = ["F1", "C1", t ? "01" : "00", e, n, "00", "00", "00", "00", "00", "F2", "00"];
    await i(this, d, R).call(this, c, "coin-purse:config");
  }
  async coinPurseEnable() {
    await this.coinPurseConfigure({ enable: !0 });
  }
  async coinPurseDisable() {
    await this.coinPurseConfigure({ enable: !1 });
  }
  async coinPurseDispense({ $_50c: t = 0, $_1: e = 0, $_2: n = 0, $_5: a = 0, $_10: c = 0 } = {}) {
    if (!this.__coin_purse.available) throw new Error("Coin purse not available");
    if ([t, e, n, a, c].some((h) => isNaN(h) || typeof h == "string"))
      throw new Error("One of the values is not a number");
    if (t < 1 && e < 1 && n < 1 && a < 1 && c < 1) throw new Error("No coins to dispense");
    [t, e, n, a, c] = [
      this.decToHex(t),
      this.decToHex(e),
      this.decToHex(n),
      this.decToHex(a),
      this.decToHex(c)
    ];
    let u = ["F1", "C6", t, e, n, a, c, "00", "00", "00", "F2", "00"];
    await i(this, d, R).call(this, u, "coin-purse:dispense");
  }
  async coinPurseReadTubes() {
    const t = ["F1", "C2", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    await i(this, d, R).call(this, t, "coin-purse:read-tubes");
  }
  async banknotePurseConfigure({ enable: t = !1, scrow: e = !1 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    let n;
    return i(this, d, de).call(this) ? n = i(this, d, rn).call(this, { enable: t, scrow: e }) : n = i(this, d, an).call(this, { enable: t, scrow: e }), await i(this, d, R).call(this, n, "banknote-purse:config");
  }
  async banknotePurseDispense({ $_20: t = 0, $_50: e = 0, $_100: n = 0, $_200: a = 0, $_500: c = 0, $_1000: u = 0 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    let h;
    if (i(this, d, de).call(this)) {
      const b = [t, e, n, a, c];
      h = i(this, d, sn).call(this, b[this.__banknote_purse.recycler.banknote]);
    } else
      h = i(this, d, on).call(this, { $_20: t, $_50: e, $_100: n, $_200: a, $_500: c, $_1000: u });
    await i(this, d, R).call(this, h, "banknote-purse:dispense");
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
    await i(this, d, R).call(this, t, "banknote-purse:banknote-scrow-status");
  }
  async banknotePurseRejectInScrow() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    const t = ["F1", "C4", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    await i(this, d, R).call(this, t, "banknote-purse:banknote-scrow-status");
  }
  async banknotePurseSaveMemory({
    channel: t = null,
    $_20: e = null,
    $_50: n = null,
    $_100: a = null,
    $_200: c = null,
    $_500: u = null,
    $_1000: h = null
  } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (t === null || e === null || n === null || a === null || c === null || u === null || h === null)
      throw new Error("One of the values is not defined");
    const b = [
      "F1",
      "C8",
      this.decToHex(t),
      "00",
      this.decToHex(e),
      this.decToHex(n),
      this.decToHex(a),
      this.decToHex(c),
      this.decToHex(u),
      this.decToHex(h),
      "F2",
      "00"
    ];
    await i(this, d, R).call(this, b, "banknote-purse:save-memory");
  }
  async banknotePurseReadRecycler() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    const t = ["F1", "C3", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "B5"];
    return await i(this, d, R).call(this, t, "banknote-purse:read-recycler");
  }
  async cardReaderDisable() {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    const t = ["F1", "CD", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await i(this, d, R).call(this, t, "card-reader:disable");
  }
  async cardReaderDispense({ channel: t = 1, second_channel: e = null, sensor: n = !0, seconds: a = null, price: c = 0 } = {}) {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    if (isNaN(this.card_reader.max_pre_credit) || this.card_reader.max_pre_credit === 0) throw new Error("Card reader pre-credit not configured");
    if (isNaN(c) || c <= 0) throw new Error("Price must be greater than 0");
    if (c > this.card_reader.max_pre_credit) throw new Error("Price is greater than pre-credit configured");
    if (!n && (a === null || a <= 0 || a > 25.4)) throw new Error("Invalid time to dispense without sensor");
    const u = this.decToHex(c / 256), h = this.decToHex(c % 256), b = this.decToHex(t + 9);
    let g = "00";
    e && (g = this.decToHex(e + 9));
    let T = "00";
    n || (T = this.decToHex(a * 10));
    const S = ["F1", "CD", "01", b, g, T, u, h, "00", "00", "F2", "00"];
    await i(this, d, R).call(this, S, "card-reader:dispense");
  }
  async paymentPursesDisable({ coin: t = !0, banknote: e = !0, cardReader: n = !1 } = {}) {
    t && await this.coinPurseDisable(), e && await this.banknotePurseDisable(), n && await this.cardReaderDisable();
  }
  async paymentPursesEnable({ coin: t = !0, banknote: e = !0, scrowBanknote: n = !1 } = {}) {
    t && await this.coinPurseEnable(), e && await this.banknotePurseEnable({ scrow: n });
  }
  async coolingRelayConfigure({ enable: t = !1 } = {}) {
    const n = ["F1", "CC", t ? "01" : "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await i(this, d, R).call(this, n, "status:relay");
  }
  async coolingRelayEnable() {
    return await this.coolingRelayConfigure({ enable: !0 });
  }
  async coolingRelayDisable() {
    return await this.coolingRelayConfigure({ enable: !1 });
  }
  async readTemperature() {
    const t = ["F1", "CB", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await i(this, d, R).call(this, t, "status:temperature");
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
  async dispense({
    selection: t = 1,
    second_selection: e = null,
    sensor: n = !0,
    seconds: a = null,
    retry: c = !0
  } = {}) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 80) throw new Error("Invalid channel number");
    if (e !== null && (e < 1 || e > 80 || e === t)) throw new Error("Invalid second channel number");
    if (!n && (a === null || a <= 0 || a > 25.4)) throw new Error("Invalid time to dispense without sensor");
    c && (this.__internal__.dispense.backup_dispense = {
      selection: t,
      second_selection: e,
      sensor: n,
      seconds: a
    }), t += 9;
    const u = this.decToHex(t);
    let h = "00";
    e && (e += 9, h = this.decToHex(e));
    let b = "00";
    n || (b = this.decToHex(a * 10));
    const g = i(this, d, he).call(this, ["F1", "C7", u, h, b, "00", "00", "00", "00", "00", "F2", "00"]);
    let T = await this.internalDispense(g);
    return !T.dispensed && c && (T = await this.internalDispense(g)), T;
  }
  async testEngines({ singleEngine: t = !1 } = {}) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    i(this, d, De).call(this), x(this, te, !0);
    const e = [];
    i(this, d, ue).call(this);
    for (let n = 1; n <= 80; n++) {
      const a = await this.dispense({
        selection: n,
        second_selection: t ? null : n + 1,
        sensor: !1,
        seconds: 0.4,
        retry: !1
      });
      e.push(a), x(this, J, n), i(this, d, ue).call(this), t || n++;
    }
    x(this, J, 80), i(this, d, ue).call(this, { dispensed: e }), i(this, d, De).call(this);
  }
  async sendCustomCode(t) {
    t = i(this, d, he).call(this, t), await this.appendToQueue(t, "custom");
  }
  hasToReturnChange(t = 0) {
    let e = t;
    return e <= 0 ? !0 : (e = i(this, d, Ee).call(this, e).pending, e = i(this, d, Se).call(this, e).pending, !(e > 0));
  }
  async returnChange() {
    return await i(this, d, Ie).call(this);
  }
  async returnInsertedMoney() {
    return this.__money_session.inserted <= 0 ? !1 : await i(this, d, Ie).call(this, this.__money_session.inserted);
  }
  async serialCorruptMessage(t, e) {
    this.dispatch("corrupt:message", { data: t, message: e });
  }
}
te = new WeakMap(), J = new WeakMap(), z = new WeakMap(), d = new WeakSet(), Nt = function() {
  const t = [
    "banknote-purse:banknote-scrow-status",
    "banknote-purse:config",
    "banknote-purse:event-banknote",
    "banknote-purse:read-memory",
    "banknote-purse:recycler",
    "banknote-purse:save-memory",
    "card-reader:event",
    "change:pending",
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
    "status:relay",
    "status:temperature"
  ];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, At = function() {
  D.add(this);
}, de = function() {
  return this.__banknote_purse.isRecycler && this.__banknote_purse.recycler.ict;
}, Bt = function() {
  return this.hasCoinPurse || this.hasRecycler;
}, qt = function(t) {
  return t.name = "Connection with the serial device completed.", t.description = "Your connection with the serial device was successfully completed.", t.no_code = 1, this.dispatch("run:default-load", {}), t;
}, Rt = function(t) {
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
  for (let c in e)
    if (e[c].includes(t)) {
      n = c;
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
}, Ht = function(t) {
  return ["g50", "c50", "p1", "p2", "p5", "p10", "p20"].includes(t);
}, Lt = function(t) {
  const e = {
    p20: ["80", "90", "a0", "b0"],
    p50: ["81", "91", "a1", "b1"],
    p100: ["82", "92", "a2", "b2"],
    p200: ["83", "93", "a3", "b3"],
    p500: ["84", "94", "a4", "b4"],
    p1000: ["85", "95", "a5", "b5"]
  };
  let n = null;
  for (let c in e)
    if (e[c].includes(t)) {
      n = c;
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
}, Ot = function(t) {
  return ["p20", "p50", "p100", "p200", "p500", "p1000"].includes(t);
}, Ut = function(t) {
  return ["r20", "r50", "r100"].includes(t);
}, jt = function() {
  return [
    "r20",
    "r50",
    "r100",
    "r200",
    "r500"
  ][this.__banknote_purse.recycler.banknote];
}, Te = function(t, e) {
  if (!t) return;
  let n = !0;
  if (i(this, d, Ht).call(this, t)) {
    if (typeof this.coins.tubes[t] > "u") return;
    e === "tube" ? this.coins.tubes[t] += 1 : e === "box" && (this.coins.box[t] += 1);
    let a = 0;
    ["g50", "c50"].includes(t) ? a = 0.5 : a += parseInt(t.slice(1)), this.coins.totals[t] += a, this.__money_session.inserted += a, this.coins.total += a;
  } else if (i(this, d, Ot).call(this, t)) {
    if (typeof this.banknotes.tubes[t] > "u") return;
    e === "recycler" ? this.banknotes.recycler[t] += 1 : e === "stacker" && (this.banknotes.stacker[t] += 1);
    let a = parseInt(t.slice(1));
    this.banknotes.totals[t] += a, this.__money_session.inserted += a, this.banknotes.total += a;
  } else if (i(this, d, Ut).call(this, t) && e === "out") {
    if (typeof this.banknotes.out[t] > "u") return;
    this.banknotes.out[t] += 1;
    let a = parseInt(t.slice(1));
    this.__money_session.retired += a, this.banknotes.recycler[t] -= 1, this.banknotes.total -= a, n = !1, this.dispatch("session:money-dispensed", { type_money: t, retired: a, finish: !1, type: "banknotes" });
  }
  n && this.dispatch("session:money-request", {});
}, Wt = function(t, e) {
  const n = parseInt(t[2], 16);
  return e.name = "Coin Inserted", e.no_code = 2, e.additional = { where: null, coin: null }, n === 1 ? (e.name = "Lever pressed", e.description = "Reject lever", e.no_code = 100, this.dispatch("coin-purse:reject-lever", {})) : n === 2 ? (e.name = "Reset coin purse", e.description = "The configuration of coin purse was reset", e.no_code = 101, this.dispatch("coin-purse:reset", {})) : n >= 64 && n <= 79 ? (e.name = "Coin inserted in profit box", e.additional.where = "box") : n >= 80 && n <= 95 ? (e.name = "Coin inserted in tube", e.additional.where = "tube") : n >= 96 && n <= 111 ? (e.name = "Unused coin", e.description = "Something come from coin changer but in MDB Docs is unused", e.additional.where = "unused") : n >= 112 && n <= 127 ? (e.name = "Coin rejected", e.additional.where = "rejected") : n >= 144 && n <= 159 ? (e.name = "Coin dispensed", e.additional.where = "out", e.description = `Undefined value: ¿${t[2]}?`) : (e.name = "Coin inserted", e.description = "Undefined status. Without information of this", e.no_code = 400), n === 1 || n === 2 || n >= 160 || n >= 128 && n <= 143 || ([e.description, e.additional.coin] = i(this, d, Rt).call(this, t[2]), e.no_code = 38 + n, i(this, d, Te).call(this, e.additional.coin, e.additional.where), ["tube", "out"].includes(e.additional.where) && this.dispatch("coin-purse:tubes", this.coins.tubes), this.dispatch("coin-purse:coin-event", this.coins)), e;
}, $t = function(t, e) {
  const n = parseInt(t[2], 16);
  return e.name = "Banknote Inserted", e.no_code = 2, e.additional = { where: null, banknote: null }, n === 42 ? (e.name = "Banknote dispensed", e.description = "Banknote dispensed by request.", e.additional.banknote = i(this, d, jt).call(this), e.additional.where = "out", e.no_code = 200) : n >= 128 && n <= 143 ? (e.name = "Banknote inserted", e.additional.where = "stacker") : n >= 144 && n <= 159 ? (e.name = "Banknote inserted in pre stacker", e.additional.where = "tmp") : n >= 160 && n <= 175 ? (e.name = "Banknote rejected", e.additional.where = "nothing") : n >= 176 && n <= 191 && (e.name = "Banknote inserted", e.additional.where = "recycler"), n >= 128 && n <= 191 && ([e.description, e.additional.banknote] = i(this, d, Lt).call(this, t[2]), e.no_code = 74 + n), i(this, d, Te).call(this, e.additional.banknote, e.additional.where), this.dispatch("banknote-purse:event-banknote", this.banknotes), e;
}, Qt = function(t, e) {
  const n = parseInt(t, 16);
  return n === 1 ? (e.name = "Coin purse enabled", e.description = "Configuration complete, enabled", e.no_code = 3) : n === 0 ? (e.name = "Coin purse disabled", e.description = "Disabled by system request", e.no_code = 4) : (e.name = "Status unknown", e.description = "The response of coin purse doesn't identify successfully", e.no_code = 400), this.dispatch("coin-purse:config", { enabled: n === 1 }), e;
}, Vt = function(t, e) {
  const n = parseInt(t[2], 16), a = parseInt(t[3], 16);
  return n === 0 ? (e.name = "Bill purse disabled", e.description = "Configuration complete, disabled") : n === 1 && (e.name = "Bill purse enabled", e.description = "Configuration complete, enabled"), a === 0 ? e.additional.scrow = "Scrow disabled, banknote received automatic" : a === 1 && (e.additional.scrow = "Scrow enabled, require manual action"), e.no_code = 5, this.dispatch("banknote-purse:config", { enabled: n === 1, scrow: a === 1 }), e;
}, Jt = function(t, e) {
  e.no_code = 6;
  const [n, a, c, u, h, b] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ];
  return e.additional = {
    coins: { g50: n, c50: a, p1: c, p2: u, p5: h, p10: b }
  }, this.coins.tubes.g50 = n, this.coins.tubes.c50 = a, this.coins.tubes.p1 = c, this.coins.tubes.p2 = u, this.coins.tubes.p5 = h, this.coins.tubes.p10 = b, this.coins.totals.g50 = (this.coins.box.g50 + n) * 0.5, this.coins.totals.c50 = (this.coins.box.c50 + a) * 0.5, this.coins.totals.p1 = this.coins.box.p1 + c, this.coins.totals.p2 = (this.coins.box.p2 + u) * 2, this.coins.totals.p5 = (this.coins.box.p5 + h) * 5, this.coins.totals.p10 = (this.coins.box.p10 + b) * 10, this.coins.total = this.coins.totals.g50 + this.coins.totals.c50 + this.coins.totals.p1 + this.coins.totals.p2 + this.coins.totals.p5 + this.coins.totals.p10, e.name = "Read tubes", e.description = "Quantity of coins approximated", this.dispatch("coin-purse:tubes", this.coins.tubes), e;
}, zt = function(t, e) {
  e.no_code = 7;
  const [n, a, c, u, h, b] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ];
  return e.additional = {
    banknotes: { b20: n, b50: a, b100: c, b200: u, b500: h, b1000: b }
  }, this.banknotes.recycler.p20 = n, this.banknotes.recycler.p50 = a, this.banknotes.recycler.p100 = c, this.banknotes.recycler.p200 = u, this.banknotes.recycler.p500 = h, this.banknotes.recycler.p1000 = b, this.banknotes.totals.p20 = (this.banknotes.stacker.p20 + n) * 20, this.banknotes.totals.p50 = (this.banknotes.stacker.p50 + a) * 50, this.banknotes.totals.p100 = (this.banknotes.stacker.p100 + c) * 100, this.banknotes.totals.p200 = (this.banknotes.stacker.p200 + u) * 200, this.banknotes.totals.p500 = (this.banknotes.stacker.p500 + h) * 500, this.banknotes.totals.p1000 = (this.banknotes.stacker.p1000 + b) * 1e3, this.banknotes.total = this.banknotes.totals.p20 + this.banknotes.totals.p50 + this.banknotes.totals.p100 + this.banknotes.totals.p200 + this.banknotes.totals.p500 + this.banknotes.totals.p1000, e.name = "Read recycler", e.description = "Quantity of banknotes approximated", this.dispatch("banknote-purse:recycler", this.banknotes.recycler), e;
}, Gt = function(t, e) {
  const n = parseInt(t, 16);
  return n === 1 ? e.name = "Banknote accepted" : n === 0 ? e.name = "Banknote rejected" : e.name = "Unknown status banknote", e.no_code = 8, this.dispatch("banknote-purse:banknote-scrow-status", { status: n === 1 }), e;
}, Yt = function(t, e) {
  const [n, a, c, u, h, b] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ], g = n * 20 + a * 50 + c * 100 + u * 200 + h * 500 + b * 1e3;
  return e.name = "Banknotes dispensed", e.description = g > 0 ? "Banknotes dispensed by request" : "No banknotes dispensed, recycler empty", e.no_code = 9, e.additional = {
    banknotes: { b20: n, b50: a, b100: c, b200: u, b500: h, b1000: b },
    total_dispensed: g
  }, this.dispatch("session:money-dispensed", {
    type_money: null,
    retired: null,
    finish: !1,
    type: "banknotes",
    data: e
  }), e;
}, Kt = function(t, e) {
  return e.name = "Coins dispensed", e.no_code = 10, e.description = "Coins dispensed by request", isNaN(this.__sale.last_change) && (this.__sale.last_change = 0), this.__money_session.retired += this.__sale.last_change, this.dispatchAsync("session:money-dispensed", {
    type_money: null,
    retired: null,
    finish: !1,
    type: "coins"
  }, 500), e;
}, Zt = function(t, e) {
  const n = parseInt(t, 16);
  return n === 1 ? (e.name = "Product not delivered", e.description = "The product requested wasn't delivered", e.no_code = 11, this.__internal__.dispense.status = !1) : n === 0 ? (e.name = "Product delivered", e.description = "The product requested was delivered", e.no_code = 12, this.__internal__.dispense.status = !0) : (e.name = "Unknown status product", e.description = "The response of product doesn't identify successfully", e.no_code = 400, this.__internal__.dispense.status = !1), this.dispatch("dispensed", {}), e;
}, Xt = function(t, e) {
  let n = "closed";
  return t === "db" ? (e.name = "Door closed", e.no_code = 13) : t === "dc" ? (e.name = "Door open", e.no_code = 14, n = "open") : (e.name = "Unknown status door", e.description = "The response of door doesn't identify successfully", e.no_code = 400, n = "unknown"), this.dispatch("event:door", { open: n === "open" }), e;
}, en = function(t, e) {
  const n = parseInt(t[2], 16) * 255, a = parseInt(t[3], 16), c = (n + a) * 0.1;
  return e.no_code = 15, e.name = "Temperature status", e.description = `Temperature: ${c}`, e.additional = {
    high: n,
    low: a,
    temperature: parseFloat(c.toString())
  }, this.dispatch("status:temperature", e.additional), e;
}, tn = function(t, e) {
  const n = parseInt(t, 16);
  let a = "unknown";
  return n === 1 ? (e.name = "Relay on", e.description = "Relay on", e.no_code = 16, a = "on") : n === 0 ? (e.name = "Relay off", e.description = "Relay off", e.no_code = 17, a = "off") : (e.name = "Status unknown", e.description = "Status unknown", e.no_code = 400), this.dispatch("status:relay", { enabled: a === "on" }), e;
}, nn = function(t, e) {
  const n = parseInt(t[2], 16);
  if (e.no_code = 20 + n, e.name = "Status unknown", e.description = "The status of card reader does not identified correctly", e.no_code = 400, n === 0)
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
    const a = parseInt(t[8], 16);
    a === 0 ? (e.no_code = 30, e.name = "product not dispensed", e.description = "The product requested wasn't delivered") : a === 1 && (e.no_code = 31, e.name = "product dispensed", e.description = "The product requested was delivered");
  }
  return this.dispatch("card-reader:event", e), e;
}, R = function(t, e) {
  return this.appendToQueue(i(this, d, he).call(this, t), e);
}, he = function(t) {
  return t[11] = this.serialBoardroidSumHex(t), t.map((e, n) => {
    t[n] = this.hexMaker(e);
  }), t;
}, rn = function({ enable: t = !1, scrow: e = !1 } = {}) {
  const n = t ? "FF" : "00", a = e ? "FF" : "00";
  return ["F1", "C0", n, n, a, a, "00", "00", "00", "00", "F2", "00"];
}, an = function({ enable: t = !1, scrow: e = !1 } = {}) {
  return ["F1", "C0", t ? "01" : "00", e ? "01" : "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
}, sn = function(t = 1) {
  if (t < 1) throw new Error("No banknotes to dispense");
  return t = this.decToHex(t), ["F1", "C5", this.decToHex(this.__banknote_purse.recycler.banknote.toString()), t, "00", "00", "00", "00", "00", "00", "F2", "00"];
}, on = function({ $_20: t = 0, $_50: e = 0, $_100: n = 0, $_200: a = 0, $_500: c = 0, $_1000: u = 0 } = {}) {
  if ([t, e, n, a, c, u].some((h) => isNaN(h) || typeof h == "string"))
    throw new Error("One of the values is not a number");
  if (t < 1 && e < 1 && n < 1 && a < 1 && c < 1 && u < 1) throw new Error("No banknotes to dispense");
  return [t, e, n, a, c, u] = [
    this.decToHex(t),
    this.decToHex(e),
    this.decToHex(n),
    this.decToHex(a),
    this.decToHex(c),
    this.decToHex(u)
  ], ["F1", "C5", t, e, n, a, c, u, "00", "00", "F2", "00"];
}, De = function() {
  x(this, te, !1), x(this, J, 0), x(this, z, 0);
}, /**
 *
 * @param {null|object} dispensed
 * @param {number} limit
 */
ue = function({ dispensed: t = null, limit: e = 80 } = {}) {
  x(this, z, Math.round(y(this, J) * 100 / e)), this.dispatch("percentage:test", { percentage: y(this, z), dispensed: t });
}, ln = function(t) {
  const e = ["20", "50", "100", "200", "500"], n = "$_" + e[this.__banknote_purse.recycler.banknote], a = parseInt(e[this.__banknote_purse.recycler.banknote]), c = parseInt((t / a).toString()), u = {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: t,
    will_dispense: c > 0
  };
  return this.totalInRecycler === 0 || c < 1 || t === 0 || (u.banknotes[n] = c, u.pending = t % a), u;
}, cn = function(t) {
  const e = {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: t,
    will_dispense: !1
  };
  return this.totalInRecycler === 0 || t === 0 || (e.banknotes.$_1000 = parseInt((t / 1e3).toString()), e.pending = t % 1e3, e.banknotes.$_500 = parseInt((e.pending / 500).toString()), e.pending = e.pending % 500, e.banknotes.$_200 = parseInt((e.pending / 200).toString()), e.pending = e.pending % 200, e.banknotes.$_100 = parseInt((e.pending / 100).toString()), e.pending = e.pending % 100, e.banknotes.$_50 = parseInt((e.pending / 50).toString()), e.pending = e.pending % 50, e.banknotes.$_20 = parseInt((e.pending / 20).toString()), e.pending = e.pending % 20, e.will_dispense = e.banknotes.$_1000 > 0 || e.banknotes.$_500 > 0 || e.banknotes.$_200 > 0 || e.banknotes.$_100 > 0 || e.banknotes.$_50 > 0 || e.banknotes.$_20 > 0), e;
}, Ee = function(t) {
  return i(this, d, de).call(this) ? i(this, d, ln).call(this, t) : i(this, d, cn).call(this, t);
}, Se = function(t) {
  const e = {
    coins: { $_50c: 0, $_1: 0, $_2: 0, $_5: 0, $_10: 0 },
    pending: t,
    will_dispense: !1
  };
  return t <= 0 || this.totalInTubes === 0 || (e.coins.$_10 = parseInt((t / 10).toString()), e.pending = t % 10, e.coins.$_5 = parseInt((e.pending / 5).toString()), e.pending = e.pending % 5, e.coins.$_2 = parseInt((e.pending / 2).toString()), e.pending = e.pending % 2, e.coins.$_1 = parseInt(e.pending), e.pending = e.pending % 1, e.coins.$_50c = parseInt((e.pending / 0.5).toString()), e.pending = e.pending % 0.5, e.will_dispense = e.coins.$_10 > 0 || e.coins.$_5 > 0 || e.coins.$_2 > 0 || e.coins.$_1 > 0 || e.coins.$_50c > 0), e;
}, Ie = async function(t = null) {
  if (!i(this, d, Bt).call(this)) throw new Error("Change not available");
  let e = this.change, n = this.change;
  if (t !== null && (e = t, n = t), n <= 0) return !1;
  const a = i(this, d, Ee).call(this, n);
  n = a.pending;
  const c = i(this, d, Se).call(this, n);
  return n = c.pending, n > 0 && this.dispatch("change:pending", { pending: n }), n === e ? !1 : (a.will_dispense && await this.banknotePurseDispense(a.banknotes), c.will_dispense && await this.coinPurseDispense(c.coins), !0);
};
var G, dn, hn;
class Dn extends Y {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: n = 1
  } = {}) {
    super({ filters: t, config_port: e, no_device: n });
    I(this, G);
    if (this.__internal__.device.type = "arduino", D.getCustom(this.typeDevice, n)) throw new Error(`Device ${this.typeDevice} ${n} already exists`);
    this.__internal__.time.response_connection = 2e3, this.__internal__.time.response_general = 2e3, this.__internal__.serial.delay_first_connection = 1e3, i(this, G, hn).call(this), i(this, G, dn).call(this);
  }
  serialMessage(t) {
    const e = {
      original_code: t,
      code: null,
      name: null,
      description: null,
      request: null,
      no_code: 0
    }, n = t.map((c) => parseInt(c, 16)), a = String.fromCharCode(...n).replace(/[\n\r]+/g, "");
    switch (e.code = a, a) {
      case "connected":
        e.name = "connected", e.description = "Connection established", e.request = "connect", e.no_code = 100, this.dispatch("serial:connected"), D.instance.dispatch("change");
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
  parseStringToBytes(t = "") {
    const e = new TextEncoder();
    t += `
`;
    const n = e.encode(t);
    return Array.from(n).map((a) => a.toString(16));
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
  async sendCustomCode(t = "") {
    if (typeof t != "string") throw new Error("Invalid string");
    const e = this.parseStringToBytes(t);
    await this.appendToQueue(e, "custom");
  }
  async doSomething() {
    await this.sayCredits(), await this.sayAra(), await this.sayHi();
  }
}
G = new WeakSet(), dn = function() {
  D.addCustom("arduino", this);
}, hn = function() {
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
const En = {
  wait: $,
  getSeconds: we,
  supportWebSerial: Ne
}, Sn = "4.0.0";
export {
  Dn as Arduino,
  Tn as Boardroid,
  D as Devices,
  pe as Emulator,
  xn as Jofemar,
  Y as Kernel,
  Cn as Locker,
  gn as Relay,
  En as utils,
  Sn as version
};
