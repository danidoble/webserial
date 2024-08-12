var vt = Object.defineProperty;
var fe = (_) => {
  throw TypeError(_);
};
var gt = (_, s, t) => s in _ ? vt(_, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : _[s] = t;
var F = (_, s, t) => gt(_, typeof s != "symbol" ? s + "" : s, t), ie = (_, s, t) => s.has(_) || fe("Cannot " + t);
var f = (_, s, t) => (ie(_, s, "read from private field"), t ? t.call(_) : s.get(_)), I = (_, s, t) => s.has(_) ? fe("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(_) : s.set(_, t), g = (_, s, t, e) => (ie(_, s, "write to private field"), e ? e.call(_, t) : s.set(_, t), t), i = (_, s, t) => (ie(_, s, "access private method"), t);
var D = [];
for (var se = 0; se < 256; ++se)
  D.push((se + 256).toString(16).slice(1));
function mt(_, s = 0) {
  return (D[_[s + 0]] + D[_[s + 1]] + D[_[s + 2]] + D[_[s + 3]] + "-" + D[_[s + 4]] + D[_[s + 5]] + "-" + D[_[s + 6]] + D[_[s + 7]] + "-" + D[_[s + 8]] + D[_[s + 9]] + "-" + D[_[s + 10]] + D[_[s + 11]] + D[_[s + 12]] + D[_[s + 13]] + D[_[s + 14]] + D[_[s + 15]]).toLowerCase();
}
var G, Ct = new Uint8Array(16);
function xt() {
  if (!G && (G = typeof crypto < "u" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto), !G))
    throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
  return G(Ct);
}
var St = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const be = {
  randomUUID: St
};
function Dt(_, s, t) {
  if (be.randomUUID && !s && !_)
    return be.randomUUID();
  _ = _ || {};
  var e = _.random || (_.rng || xt)();
  return e[6] = e[6] & 15 | 64, e[8] = e[8] & 63 | 128, mt(e);
}
class Tt extends EventTarget {
  constructor() {
    super(...arguments);
    F(this, "__listeners__", {});
  }
  dispatch(t, e = null) {
    const n = new It(t, { detail: e });
    this.dispatchEvent(n);
  }
  dispatchAsync(t, e = null, n = 100) {
    const o = this;
    setTimeout(() => {
      o.dispatch(t, e);
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
class It extends CustomEvent {
  constructor(s, t) {
    super(s, t);
  }
}
function re(_ = 100) {
  return new Promise((s) => setTimeout(() => s(), _));
}
function Mt() {
  return "serial" in navigator;
}
var M, P, a, ke, we, h, ae, v, w, Y, Et, Ft, d, oe, Q;
const r = class r {
  static status(s = null) {
    var e, n;
    if (!i(e = r, a, h).call(e, s)) return !1;
    let t = [];
    switch (f(r, M)) {
      case "locker":
        t = ["0", "8"];
        break;
      case "boardroid":
        t = ["2", (5 + f(r, P)).toString(16).toUpperCase()];
        break;
      case "jofemar":
        t = ["6"];
        break;
      default:
        return !1;
    }
    i(n = r, a, d).call(n, t);
  }
  static dispensed(s = null) {
    var e, n;
    if (!i(e = r, a, h).call(e, s)) return !1;
    let t = [];
    switch (f(r, M)) {
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
    i(n = r, a, d).call(n, t);
  }
  static notDispensed(s = null) {
    var e, n;
    if (!i(e = r, a, h).call(e, s)) return !1;
    let t = [];
    switch (f(r, M)) {
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
    i(n = r, a, d).call(n, t);
  }
  static gateInactive(s = null) {
    var t;
    if (!i(t = r, a, h).call(t, s) || !i(this, a, ae).call(this)) return !1;
    i(this, a, d).call(this, ["0", "7", "5", "5", "5"]);
  }
  static gateConfigured(s = null) {
    var t;
    if (!i(t = r, a, h).call(t, s) || !i(this, a, ae).call(this)) return !1;
    i(this, a, d).call(this, ["0", "6"]);
  }
  static keyPressed(s = null) {
    var o, c, p;
    if (!i(o = r, a, h).call(o, s) || !i(c = r, a, w).call(c)) return !1;
    const t = ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "2A", "23", "41", "42", "43", "44"], e = (128 + f(r, P)).toString(16), n = Math.floor(Math.random() * 15);
    i(p = r, a, d).call(p, ["2", e, "54", t[n]]);
  }
  static doorOpened(s = null) {
    var n, o;
    if (!i(n = r, a, h).call(n, s) || !i(this, a, Y).call(this)) return !1;
    let t = [];
    const e = (128 + f(r, P)).toString(16);
    switch (f(r, M)) {
      case "boardroid":
        t = ["2", "D8", "dc"];
        break;
      case "jofemar":
        t = ["2", e, "50", "4F"];
        break;
    }
    i(o = r, a, d).call(o, t);
  }
  static doorClosed(s = null) {
    var n, o;
    if (!i(n = r, a, h).call(n, s) || !i(this, a, Y).call(this)) return !1;
    let t = [];
    const e = (128 + f(r, P)).toString(16);
    switch (f(r, M)) {
      case "boardroid":
        t = ["2", "D8", "db"];
        break;
      case "jofemar":
        t = ["2", e, "50", "43"];
        break;
    }
    i(o = r, a, d).call(o, t);
  }
  static channelDisconnected(s = null) {
    var e, n, o;
    if (!i(e = r, a, h).call(e, s) || !i(n = r, a, w).call(n)) return !1;
    const t = (128 + f(r, P)).toString(16);
    i(o = r, a, d).call(o, ["2", t, "43", "43", "43", "FD"]);
  }
  static channelConnected(s = null) {
    var e, n, o;
    if (!i(e = r, a, h).call(e, s) || !i(n = r, a, w).call(n)) return !1;
    const t = (128 + f(r, P)).toString(16);
    i(o = r, a, d).call(o, ["2", t, "43", "43", "43", "FC"]);
  }
  static channelEmpty(s = null) {
    var e, n, o;
    if (!i(e = r, a, h).call(e, s) || !i(n = r, a, w).call(n)) return !1;
    const t = (128 + f(r, P)).toString(16);
    i(o = r, a, d).call(o, ["2", t, "43", "43", "43", "FF"]);
  }
  static workingTemperature(s = null) {
    var e, n, o;
    if (!i(e = r, a, h).call(e, s) || !i(n = r, a, w).call(n)) return !1;
    const t = (128 + f(r, P)).toString(16);
    i(o = r, a, d).call(o, ["2", t, "43", "54", "16"]);
  }
  static currentTemperature(s = null) {
    var n, o, c;
    if (!i(n = r, a, h).call(n, s) || !i(o = r, a, Y).call(o)) return !1;
    let t = [];
    const e = (128 + f(r, P)).toString(16);
    switch (f(r, M)) {
      case "boardroid":
        t = ["2", "D9", "44", "30"];
        break;
      case "jofemar":
        t = ["2", e, "43", "74", "2B", "30", "39", "2E", "31", "7F", "43"];
        break;
    }
    i(c = r, a, d).call(c, t);
  }
  static ready(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "30"]);
  }
  static busy(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "31"]);
  }
  static invalidTray(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "32"]);
  }
  static invalidChannel(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "33"]);
  }
  static emptyChannel(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "34"]);
  }
  static elevatorJam(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "35"]);
  }
  static elevatorMalfunction(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "36"]);
  }
  static phototransistorFailure(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "37"]);
  }
  static allChannelsEmpty(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "38"]);
  }
  static productDetectorFailure(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "39"]);
  }
  static displayDisconnected(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "41"]);
  }
  static productUnderElevator(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "42"]);
  }
  static elevatorSettingAlarm(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "43"]);
  }
  static buttonPanelFailure(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "44"]);
  }
  static errorWritingEeprom(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "45"]);
  }
  static errorControlTemperature(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "46"]);
  }
  static thermometerDisconnected(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "47"]);
  }
  static thermometerMisconfigured(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "48"]);
  }
  static thermometerFailure(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "49"]);
  }
  static errorExtractorConsumption(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "4A"]);
  }
  static channelSearchError(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "4B"]);
  }
  static productExitMouthSearchError(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "4C"]);
  }
  static elevatorInteriorLocked(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "4D"]);
  }
  static productDetectorVerifierError(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "4E"]);
  }
  static waitingForProductRecall(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "4F"]);
  }
  static productExpiredByTemperature(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "50"]);
  }
  static faultyAutomaticDoor(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "51"]);
  }
  static rejectLever(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "A0", "1"]);
  }
  static resetCoinPurse(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "A0", "2"]);
  }
  static coinInsertedBox(s = null, t = null) {
    var o, c, p, u;
    if (!i(o = r, a, h).call(o, s) || !i(c = r, a, v).call(c)) return !1;
    const e = ["40", "41", "42", "43", "44", "45"], n = i(p = r, a, oe).call(p, e, t);
    i(u = r, a, d).call(u, ["2", "A0", n]);
  }
  static coinInsertedTube(s = null, t = null) {
    var o, c, p, u;
    if (!i(o = r, a, h).call(o, s) || !i(c = r, a, v).call(c)) return !1;
    const e = ["50", "51", "52", "53", "54", "55"], n = i(p = r, a, oe).call(p, e, t);
    i(u = r, a, d).call(u, ["2", "A0", n]);
  }
  static banknoteInsertedStacker(s = null, t = null) {
    var o, c, p, u;
    if (!i(o = r, a, h).call(o, s) || !i(c = r, a, v).call(c)) return !1;
    const e = ["80", "81", "82", "83", "84"], n = i(p = r, a, Q).call(p, e, t);
    i(u = r, a, d).call(u, ["2", "B0", n]);
  }
  static banknoteInsertedEscrow(s = null, t = null) {
    var o, c, p, u;
    if (!i(o = r, a, h).call(o, s) || !i(c = r, a, v).call(c)) return !1;
    const e = ["90", "91", "92", "93", "94"], n = i(p = r, a, Q).call(p, e, t);
    i(u = r, a, d).call(u, ["2", "B0", n]);
  }
  static banknoteEjected(s = null, t = null) {
    var o, c, p, u;
    if (!i(o = r, a, h).call(o, s) || !i(c = r, a, v).call(c)) return !1;
    const e = ["A0", "A1", "A2", "A3", "A4"], n = i(p = r, a, Q).call(p, e, t);
    i(u = r, a, d).call(u, ["2", "B0", n]);
  }
  static banknoteInsertedRecycler(s = null, t = null) {
    var o, c, p, u;
    if (!i(o = r, a, h).call(o, s) || !i(c = r, a, v).call(c)) return !1;
    const e = ["B0", "B1", "B2", "B3", "B4"], n = i(p = r, a, Q).call(p, e, t);
    i(u = r, a, d).call(u, ["2", "B0", n]);
  }
  static banknoteTaken(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "B0", "2a"]);
  }
  static coinPurseEnabled(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "D0", "1"]);
  }
  static coinPurseDisabled(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "D0", "0"]);
  }
  static billPurseDisabled(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "D1", "0", "0"]);
  }
  static billPurseEnabled(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "D1", "1", "1"]);
  }
  static readTubes(s = null) {
    var y, C, T;
    if (!i(y = r, a, h).call(y, s) || !i(C = r, a, v).call(C)) return !1;
    const t = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f"], [e, n, o, c, p, u] = [
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)]
    ];
    i(T = r, a, d).call(T, ["2", "D2", e, n, o, c, p, u]);
  }
  static readBillPurse(s = null, t = null) {
    var n, o, c, p;
    if (!i(n = r, a, h).call(n, s) || !i(o = r, a, v).call(o)) return !1;
    let e = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c"];
    if (s._recycler.ict) {
      const u = e[Math.floor(Math.random() * 31)];
      let y = "0", C = "0", T = "0", q = "0", O = "0";
      if (t !== null && !isNaN(parseInt(t)))
        switch (t.toString()) {
          case "20":
            y = u;
            break;
          case "50":
            C = u;
            break;
          case "100":
            T = u;
            break;
          case "200":
            q = u;
            break;
          case "500":
            O = u;
            break;
        }
      else
        switch (s._recycler.bill) {
          case 0:
            y = u;
            break;
          case 1:
            C = u;
            break;
          case 2:
            T = u;
            break;
          case 3:
            q = u;
            break;
          case 4:
            O = u;
            break;
        }
      i(c = r, a, d).call(c, ["2", "D3", y, C, T, q, O, "0"]);
    } else {
      const [u, y, C, T, q, O] = [
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 2)],
        e[Math.floor(Math.random())],
        e[Math.floor(Math.random())]
      ];
      i(p = r, a, d).call(p, ["2", "D3", u, y, C, T, q, O]);
    }
  }
  static banknoteAccepted(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "D4", "1"]);
  }
  static banknoteRejected(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "D4", "0"]);
  }
  static banknotesDispensed(s = null) {
    var e, n, o, c;
    if (!i(e = r, a, h).call(e, s) || !i(n = r, a, v).call(n)) return !1;
    let t = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c"];
    if (s._recycler.ict) {
      const p = t[Math.floor(Math.random() * 30)];
      let u = "0", y = "0", C = "0", T = "0", q = "0";
      switch (s._recycler.bill) {
        case 0:
          u = p;
          break;
        case 1:
          y = p;
          break;
        case 2:
          C = p;
          break;
        case 3:
          T = p;
          break;
        case 4:
          q = p;
          break;
      }
      i(o = r, a, d).call(o, ["2", "D5", u, y, C, T, q, "0"]);
    } else {
      const [p, u, y, C, T, q] = [
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 2)],
        t[Math.floor(Math.random())],
        t[Math.floor(Math.random())]
      ];
      i(c = r, a, d).call(c, ["2", "D5", p, u, y, C, T, q]);
    }
  }
  static coinsDispensed(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "D6"]);
  }
  static relayOn(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DA", "1"]);
  }
  static relayOff(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DA", "0"]);
  }
  static nayaxEnabled(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DD", "1"]);
  }
  static nayaxDisabled(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DD", "0"]);
  }
  static nayaxPreCreditAuthorized(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DD", "3"]);
  }
  static nayaxCancelRequest(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DD", "4"]);
  }
  static nayaxSellApproved(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DD", "5"]);
  }
  static nayaxSellDenied(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DD", "6"]);
  }
  static nayaxEndSession(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DD", "7"]);
  }
  static nayaxCancelled(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DD", "8"]);
  }
  static nayaxDispensed(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DD", "A", "0"]);
  }
  static nayaxNotDispensed(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, v).call(e)) return !1;
    i(n = r, a, d).call(n, ["2", "DD", "A", "1"]);
  }
  static fullTray(s = null) {
    var t, e, n;
    if (!i(t = r, a, h).call(t, s) || !i(e = r, a, w).call(e)) return !1;
    i(n = r, a, d).call(n, ["6", "4F"]);
  }
  static setConnection(s = null) {
    var t;
    if (!i(t = r, a, h).call(t, s)) return !1;
    s.__internal__.serial.connected = !0;
  }
};
M = new WeakMap(), P = new WeakMap(), a = new WeakSet(), ke = function() {
  if (r.enable === !1) throw new Error("Emulator is disabled");
  return r.enable;
}, we = function(s) {
  if (typeof s != "object" || !(s instanceof V)) throw new Error(`Type ${s.typeDevice} is not supported`);
  return r.instance = s, g(r, M, s.typeDevice), g(r, P, s.deviceNumber), !0;
}, h = function(s = null) {
  var t, e;
  return !i(t = r, a, ke).call(t) || s === null && r.instance === null ? !1 : (r.instance === null && i(e = r, a, we).call(e, s), !0);
}, ae = function() {
  if (f(r, M) !== "locker") throw new Error("This function is only available for Locker devices");
  return !0;
}, v = function() {
  if (f(r, M) !== "boardroid") throw new Error("This function is only available for Boardroid devices");
  return !0;
}, w = function() {
  if (f(r, M) !== "boardroid") throw new Error("This function is only available for Jofemar devices");
  return !0;
}, Y = function() {
  if (f(r, M) === "locker") throw new Error("This function is not available for Locker devices");
  return !0;
}, Et = function() {
  if (f(r, M) === "boardroid") throw new Error("This function is not available for Boardroid devices");
  return !0;
}, Ft = function() {
  if (f(r, M) === "jofemar") throw new Error("This function is not available for Jofemar devices");
  return !0;
}, d = function(s) {
  r.instance.__emulate({ code: s });
}, oe = function(s, t = null) {
  let e = s[Math.floor(Math.random() * 5)];
  if (t !== null && !isNaN(parseFloat(t)))
    switch (t.toString()) {
      case "0.5":
        e = s[1];
        break;
      case "1":
        e = s[2];
        break;
      case "2":
        e = s[3];
        break;
      case "5":
        e = s[4];
        break;
      case "10":
        e = s[5];
        break;
    }
  return e;
}, Q = function(s, t = null) {
  let e = s[Math.floor(Math.random() * 4)];
  if (t !== null && !isNaN(parseFloat(t)))
    switch (t.toString()) {
      case "20":
        e = s[0];
        break;
      case "50":
        e = s[1];
        break;
      case "100":
        e = s[2];
        break;
      case "200":
        e = s[3];
        break;
      case "500":
        e = s[4];
        break;
    }
  return e;
}, I(r, a), F(r, "enable", !1), F(r, "instance", null), I(r, M, null), I(r, P, 1);
let J = r;
var b, ye, le, Bt, A, ve, ge, me, Ce, xe, Se, De, Te, Ie, Me, Ee, Fe;
class V extends Tt {
  /**
   *
   * @param {null|array} filters
   * @param {null|object} config_port
   * @param {number} no_device
   * @param {null|number} device_listen_on_port
   */
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: n = 1,
    device_listen_on_port: o = null
  } = {}) {
    super();
    I(this, b);
    F(this, "__internal__", {
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
        id: Dt(),
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
        limit_counter: 20
      }
    });
    t && (this.serialFilters = t), e && (this.serialConfigPort = e), n && i(this, b, Ee).call(this, n), o && typeof o == "number" && (this.__internal__.device.listen_on_port = parseInt(o.toString()), this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(o)), i(this, b, De).call(this), i(this, b, Te).call(this);
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
  async timeout(t, e) {
    this.__internal__.last_error.message = "Operation response timed out.", this.__internal__.last_error.action = e, this.__internal__.last_error.code = t, this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), e === "connect" ? (this.__internal__.serial.connected = !1, this.dispatch("serial:reconnect", {})) : e === "connection:start" && (await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector += 1, await this.serialConnect()), this.dispatch("serial:timeout", {
      ...this.__internal__.last_error,
      bytes: t,
      action: e
    });
  }
  async disconnect(t = null) {
    await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector = 0, this.dispatch("serial:disconnected", t);
  }
  async connect() {
    return new Promise((t, e) => {
      Mt() || e("Web Serial not supported"), setTimeout(async () => {
        await re(499), await this.serialConnect(), this.isConnected ? t(`${this.typeDevice} device ${this.deviceNumber} connected`) : e(`${this.typeDevice} device ${this.deviceNumber} not connected`);
      }, 1);
    });
  }
  async serialDisconnect() {
    try {
      const t = this.__internal__.serial.reader, e = this.__internal__.serial.output_stream;
      t && (await t.cancel().catch((o) => this.serialErrors(o)), await this.__internal__.serial.input_done), e && (await e.getWriter().close(), await this.__internal__.serial.output_done), this.__internal__.serial.connected && this.__internal__.serial && await this.__internal__.serial.port.close();
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
        this.dispatch("serial:need-permission", {});
        break;
      case e.includes("the port is already open."):
        this.serialDisconnect().then(async () => {
          this.__internal__.aux_port_connector += 1, await this.serialConnect();
        });
        break;
      case e.includes("cannot read properties of undefined (reading 'writable')"):
      case e.includes("cannot read properties of null (reading 'writable')"):
      case e.includes("cannot read property 'writable' of null"):
      case e.includes("cannot read property 'writable' of undefined"):
      case e.includes("failed to open serial port"):
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
        this.dispatch("serial:lost", {});
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
      const t = await i(this, b, ve).call(this);
      if (t.length > 0)
        await this.serialPortsSaved(t);
      else {
        const o = this.serialFilters;
        this.__internal__.serial.port = await navigator.serial.requestPort({ filters: o });
      }
      const e = this.__internal__.serial.port;
      await e.open(this.serialConfigPort);
      const n = this;
      e.onconnect = (o) => {
        n.dispatch("serial:connected", o.detail), n.__internal__.serial.queue.length > 0 && n.dispatch("internal:queue", {});
      }, e.ondisconnect = async (o) => {
        await n.disconnect(o.detail ?? null);
      }, this.__internal__.timeout.until_response = setTimeout(async () => {
        await n.timeout(n.__internal__.serial.bytes_connection, "connection:start");
      }, this.__internal__.time.response_connection), await i(this, b, le).call(this, this.__internal__.serial.bytes_connection), this.dispatch("serial:sent", {
        action: "connect",
        bytes: this.__internal__.serial.bytes_connection
      }), this.typeDevice === "relay" && i(this, b, A).call(this, ["DD", "DD"], null), await i(this, b, xe).call(this);
    } catch (t) {
      this.serialErrors(t);
    }
  }
  async serialForget() {
    return await i(this, b, Se).call(this);
  }
  decToHex(t) {
    return parseInt(t, 10).toString(16);
  }
  hexToDec(t) {
    return parseInt(t, 16).toString(10);
  }
  hexMaker(t = "00", e = 2) {
    return t.toString().padStart(e, "0").toLowerCase();
  }
  add0x(t) {
    let e = [];
    return t.forEach((n, o) => {
      e[o] = "0x" + n;
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
  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(t = 1) {
  }
  // eslint-disable-next-line no-unused-vars
  serialMessage(t) {
  }
  // eslint-disable-next-line no-unused-vars
  serialCorruptMessage(t, e) {
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
  get isDispensing() {
    return this.__internal__.interval.waiting_sense || this.__internal__.dispense.dispensing;
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
    this.__internal__.dispense.status = null, this.__internal__.dispense.dispensing = !0;
    const t = this;
    return new Promise((e) => {
      this.__internal__.interval.waiting_sense = setInterval(() => {
        switch (t.__internal__.dispense.status) {
          case null:
            t.internalDispensingProcess() === !1 && (t.internalClearSensing(), e({ status: !1, error: "timeout" }));
            break;
          case !0:
            t.internalClearSensing(), this.__internal__.dispense.status = !0, e({ status: !0, error: null });
            break;
          case !1:
            t.internalClearSensing(), this.__internal__.dispense.status = !1, e({ status: !1, error: null });
            break;
        }
      }, this.__internal__.time.sense);
    });
  }
  async internalDispense(t) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    if (!J.enable && !this.__internal__.serial.connected && (await this.serialConnect(), !this.__internal__.serial.connected))
      throw new Error("Serial device not connected");
    return this.__internal__.serial.queue.length === 0 ? (await this.appendToQueue(t, "dispense"), await this.internalDispenseStatus()) : new Promise((e) => {
      const n = setInterval(async () => {
        if (this.__internal__.serial.queue.length > 0) return;
        clearInterval(n), await this.appendToQueue(t, "dispense");
        const o = await this.internalDispenseStatus();
        e(o);
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
    i(this, b, Fe).call(this), this.dispatch("serial:soft-reload", {});
  }
  async sendConnect() {
    await this.appendToQueue(this.__internal__.serial.bytes_connection, "connect");
  }
  async sendCustomCode(t) {
    await this.appendToQueue(t, "custom");
  }
}
b = new WeakSet(), ye = function(t) {
  return !!(t.readable && t.writable);
}, le = async function(t) {
  const e = this.__internal__.serial.port;
  if (!e) {
    if (J.enable)
      return;
    throw new Error("The port is closed.");
  }
  const n = new Uint8Array(t), o = e.writable.getWriter();
  await o.write(n), o.releaseLock();
}, Bt = function(t = []) {
  return t.map((e) => e.toString().toLowerCase());
}, A = function(t = [], e = null) {
  if (t && t.length > 0) {
    this.__internal__.serial.connected = !0, this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0);
    const n = [];
    for (const o in t)
      n.push(t[o].toString().padStart(2, "0").toLowerCase());
    this.serialMessage(n);
  } else
    this.serialCorruptMessage(t, e);
  this.__internal__.serial.queue.length !== 0 && this.dispatch("internal:queue", {});
}, ve = async function() {
  const t = this.serialFilters, e = await navigator.serial.getPorts({ filters: t });
  return t.length === 0 ? e : e.filter((o) => {
    const c = o.getInfo();
    return t.some((p) => c.usbProductId === p.usbProductId && c.usbVendorId === p.usbVendorId);
  }).filter((o) => !i(this, b, ye).call(this, o));
}, ge = function(t) {
  if (t) {
    const e = this.__internal__.serial.response.buffer;
    let n = new Uint8Array(e.length + t.byteLength);
    n.set(e, 0), n.set(new Uint8Array(t), e.length), this.__internal__.serial.response.buffer = n;
  }
}, me = async function() {
  this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0), this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
    let t = [];
    for (const e in this.__internal__.serial.response.buffer)
      t.push(this.__internal__.serial.response.buffer[e].toString(16));
    this.__internal__.serial.response.buffer && i(this, b, A).call(this, t), this.__internal__.serial.response.buffer = new Uint8Array(0);
  }, 400);
}, Ce = async function() {
  if (this.__internal__.serial.response.length === this.__internal__.serial.response.buffer.length) {
    const t = [];
    for (const e in this.__internal__.serial.response.buffer)
      t.push(this.__internal__.serial.response.buffer[e].toString(16));
    await i(this, b, A).call(this, t), this.__internal__.serial.response.buffer = new Uint8Array(0);
  } else if (this.__internal__.serial.response.length < this.__internal__.serial.response.buffer.length) {
    let t = [];
    for (let n = 0; n < this.__internal__.serial.response.length; n++)
      t[n] = this.__internal__.serial.response.buffer[n];
    if (t.length === this.__internal__.serial.response.length) {
      const n = [];
      for (const o in t)
        n.push(t[o].toString(16));
      await i(this, b, A).call(this, n), this.__internal__.serial.response.buffer = new Uint8Array(0);
      return;
    }
    t = [];
    const e = this.__internal__.serial.response.length * 2;
    if (this.__internal__.serial.response.buffer.length === e) {
      for (let n = 14; n < e; n++)
        t[n - this.__internal__.serial.response.length] = this.__internal__.serial.response.buffer[n];
      if (t.length === this.__internal__.serial.response.length) {
        const n = [];
        for (const o in t)
          n.push(t[o].toString(16));
        await i(this, b, A).call(this, n), this.__internal__.serial.response.buffer = new Uint8Array(0);
      }
    }
  }
}, xe = async function() {
  const t = this.__internal__.serial.port;
  for (; t.readable && this.__internal__.serial.keep_reading; ) {
    const e = t.readable.getReader();
    this.__internal__.serial.reader = e;
    try {
      let n = !0;
      for (; n; ) {
        const { value: o, done: c } = await e.read();
        if (c) {
          e.releaseLock(), this.__internal__.serial.keep_reading = !1, n = !1;
          break;
        }
        i(this, b, ge).call(this, o), this.__internal__.serial.response.length === null ? await i(this, b, me).call(this) : await i(this, b, Ce).call(this);
      }
    } catch (n) {
      this.serialErrors(n);
    } finally {
      e.releaseLock();
    }
  }
  this.__internal__.serial.keep_reading = !0, await this.__internal__.serial.port.close();
}, Se = async function() {
  return typeof window > "u" ? !1 : "serial" in navigator && "forget" in window.SerialPort.prototype ? (await this.__internal__.serial.port.forget(), !0) : !1;
}, De = function() {
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
}, Te = function() {
  this.on("internal:queue", async () => {
    await i(this, b, Me).call(this);
  }), i(this, b, Ie).call(this);
}, Ie = function() {
  const t = this;
  navigator.serial.addEventListener("connect", async () => {
    console.log("ara?"), t.isDisconnected && await t.serialConnect().catch(() => {
    });
  });
}, Me = async function() {
  if (!this.__internal__.serial.connected) {
    await this.serialConnect();
    return;
  }
  if (this.__internal__.timeout.until_response || this.__internal__.serial.queue.length === 0) return;
  const t = this.__internal__.serial.queue[0];
  this.__internal__.timeout.until_response = setTimeout(async () => {
    await this.timeout(t.bytes, t.action);
  }, this.__internal__.time.response_general), await i(this, b, le).call(this, t.bytes), this.dispatch("serial:sent", {
    action: t.action,
    bytes: t.bytes
  }), this.typeDevice === "relay" && i(this, b, A).call(this, ["DD", "DD"], null);
  const e = [...this.__internal__.serial.queue];
  this.__internal__.serial.queue = e.splice(1);
}, Ee = function(t = 1) {
  this.__internal__.device_number = t, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(t);
}, Fe = function() {
  this.__internal__.last_error = { message: null, action: null, code: null, no_code: 0 };
};
const m = class m {
  static typeError(s) {
    const t = new Error();
    throw t.message = `Type ${s} is not supported`, t.name = "DeviceTypeError", t;
  }
  static addCustom(s, t) {
    typeof m.devices[s] > "u" && (m.devices[s] = []), m.add(t);
  }
  static add(s) {
    const t = s.typeDevice, e = s.uuid;
    if (typeof m.devices[t] > "u") return m.typeError(t);
    if (!m.devices[t][e])
      return m.devices[t][e] = s, m.devices[t].indexOf(s);
  }
  static get(s, t) {
    return typeof m.devices[s] > "u" ? m.typeError(s) : m.devices[s][t];
  }
  static getJofemarByUuid(s) {
    return m.get("jofemar", s);
  }
  static getLockerByUuid(s) {
    return m.get("locker", s);
  }
  static getRelayByUuid(s) {
    return m.get("relay", s);
  }
  static getBoardroidByUuid(s) {
    return m.get("boardroid", s);
  }
  static getAll(s = null) {
    return s === null ? m.devices : typeof m.devices[s] > "u" ? m.typeError(s) : m.devices[s];
  }
  static getJofemar(s = 1) {
    return Object.values(m.devices.jofemar).find((e) => e.deviceNumber === s) ?? null;
  }
  static getBoardroid(s = 1) {
    return Object.values(m.devices.boardroid).find((e) => e.deviceNumber === s) ?? null;
  }
  static getLocker(s = 1) {
    return Object.values(m.devices.locker).find((e) => e.deviceNumber === s) ?? null;
  }
  static getRelay(s = 1) {
    return Object.values(m.devices.relay).find((e) => e.deviceNumber === s) ?? null;
  }
  static getCustom(s, t = 1) {
    return typeof m.devices[s] > "u" ? m.typeError(s) : Object.values(m.devices[s]).find((n) => n.deviceNumber === t) ?? null;
  }
};
F(m, "devices", {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: []
});
let U = m;
var W, ne, Be;
class Pt extends V {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: n = 1
  } = {}) {
    super({ filters: t, config_port: e, no_device: n });
    I(this, ne);
    I(this, W, {
      activate: ["A0", "01", "01", "A2"],
      deactivate: ["A0", "01", "00", "A1"]
    });
    this.__internal__.device.type = "relay", i(this, ne, Be).call(this);
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
    return t.forEach((n, o) => {
      o !== 3 && (e += parseInt(n, 16));
    }), e.toString(16).toUpperCase();
  }
  serialSetConnectionConstant(t = 1) {
    const e = ["A0", "01", "00", "A1"];
    return e[1] = this.hexMaker(this.decToHex(t.toString())), e[3] = this.serialRelaySumHex(e), this.add0x(e);
  }
  async turnOn() {
    const t = f(this, W).activate;
    t[3] = this.serialRelaySumHex(t), await this.appendToQueue(t, "relay:turn-on");
  }
  async turnOff() {
    const t = f(this, W).deactivate;
    t[3] = this.serialRelaySumHex(t), await this.appendToQueue(t, "relay:turn-off");
  }
  async toggle(t = !1, e = 300) {
    const n = this;
    t ? (await n.turnOff(), await re(e), await n.turnOn()) : (await n.turnOn(), await re(e), await n.turnOff());
  }
}
W = new WeakMap(), ne = new WeakSet(), Be = function() {
  U.add(this);
};
var E, x, R, k, Pe, qe, Re, Rt, ce, At, N, L, K, X, Z;
class qt extends V {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: n = 1,
    device_listen_on_port: o = 3
  } = {}) {
    super({ filters: t, config_port: e, no_device: n, device_listen_on_port: o });
    I(this, k);
    I(this, E, !1);
    I(this, x, 0);
    I(this, R, 0);
    this.__internal__.device.type = "locker", this.__internal__.device.milliseconds = 666, this.__internal__.dispense.limit_counter = 1, i(this, k, qe).call(this), i(this, k, Pe).call(this);
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
            e.name = "Cell closed.", e.description = "The selected cell is closed.", e.request = "dispense", e.no_code = 1102, this.__internal__.dispense.status = !1, this.dispatch("dispensed", {}), f(this, E) && f(this, x) >= 89 ? (e.finished_test = !0, g(this, E, !1), g(this, x, 0)) : f(this, E) && (e.finished_test = !1);
            break;
          case "01":
          case "04":
            e.name = "Cell open.", e.description = "The selected cell was open successfully.", e.request = "dispense", e.no_code = 102, this.__internal__.dispense.status = !0, this.dispatch("dispensed", {}), f(this, E) && f(this, x) >= 89 ? (e.finished_test = !0, g(this, E, !1), g(this, x, 0)) : f(this, E) && (e.finished_test = !1);
            break;
          case "05":
            e.name = "Cell inactive.", e.description = "The selected cell is inactive or doesn't exist.", e.request = "dispense", e.no_code = 101, this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", {}), f(this, E) && f(this, x) >= 89 ? (e.finished_test = !0, g(this, E, !1), g(this, x, 0)) : f(this, E) && (e.finished_test = !1);
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
      let o = 0;
      for (let u = 1; u < t.length; u++)
        o += t[u], o *= parseInt(Math.pow(2, u - 1).toString());
      n[t.length + 2] = o % 256, n[t.length + 3] = e * 3 % 256, n[t.length + 4] = e * 8 % 256;
      let c = 0;
      for (let u = 3; u < t.length + 5; u++)
        c += n[u];
      n[t.length + 5] = c % 256;
      let p = 0;
      for (let u = 0; u < n.length - 1; u++)
        p ^= n[u];
      n[n.length - 1] = p;
    } catch (o) {
      this.serialErrors(`Error generating command: ${o.message}`), n = null;
    }
    return n;
  }
  serialLockerHexCmd(t) {
    const e = this.serialLockerCmdMaker(t), n = [];
    for (let o = 0; o < e.length; o++)
      n.push(this.decToHex(e[o]));
    return n;
  }
  serialLockerGetConnectionCmd(t = 3) {
    if (t < 1 || t > 255) throw new Error("Invalid port number");
    return this.serialLockerHexCmd(new Uint8Array([0, t]));
  }
  parseCellToColumnRow(t) {
    const e = Math.floor((t - 1) / 10) + 1;
    let n = t % 8;
    return n === 0 && (n = 8), [e, n];
  }
  async dispense(t) {
    t = i(this, k, N).call(this, t);
    const e = i(this, k, Re).call(this, t);
    return await this.internalDispense(e);
  }
  async enable(t) {
    t = i(this, k, N).call(this, t);
    const [e, n] = this.parseCellToColumnRow(t), o = i(this, k, ce).call(this, { enable: !0, column: e, row: n });
    await this.appendToQueue(o, "activate");
  }
  async disable(t) {
    t = i(this, k, N).call(this, t);
    const [e, n] = this.parseCellToColumnRow(t), o = i(this, k, ce).call(this, { enable: !1, column: e, row: n });
    await this.appendToQueue(o, "disable");
  }
  async openAll() {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    i(this, k, L).call(this), g(this, E, !0), i(this, k, K).call(this);
    const t = [];
    for (let e = 1; e <= 90; e++) {
      const n = await this.dispense(e);
      t.push(n), g(this, x, e), i(this, k, K).call(this);
    }
    g(this, x, 90), i(this, k, K).call(this, t), i(this, k, L).call(this);
  }
  async enableAll() {
    i(this, k, L).call(this), g(this, E, !0), i(this, k, X).call(this);
    for (let t = 1; t <= 90; t++)
      await this.enable(t), g(this, x, t), i(this, k, X).call(this);
    g(this, x, 90), i(this, k, X).call(this), i(this, k, L).call(this);
  }
  async disableAll() {
    i(this, k, L).call(this), g(this, E, !0), i(this, k, Z).call(this);
    for (let t = 1; t <= 90; t++)
      await this.enable(t), g(this, x, t), i(this, k, Z).call(this);
    g(this, x, 90), i(this, k, Z).call(this), i(this, k, L).call(this);
  }
}
E = new WeakMap(), x = new WeakMap(), R = new WeakMap(), k = new WeakSet(), Pe = function() {
  const t = [
    "percentage:open",
    "percentage:enable",
    "percentage:disable"
  ];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, qe = function() {
  U.add(this);
}, Re = function(t = 1) {
  return t = i(this, k, N).call(this, t), this.serialLockerHexCmd(new Uint8Array([16, this.__internal__.device.listen_on_port, t]));
}, Rt = function(t = 0, e = 10) {
  return this.serialLockerHexCmd(new Uint8Array([32, this.__internal__.device.listen_on_port, t, e]));
}, ce = function({ enable: t = !0, column: e = 0, row: n = 10 } = {}) {
  if (e < 0 || e > 8) throw new Error("Invalid column number");
  if (n < 0 || n > 10) throw new Error("Invalid row number");
  let o = 1;
  return t || (o = 0), this.serialLockerHexCmd(new Uint8Array([48, this.__internal__.device.listen_on_port, e, n, o]));
}, At = function(t = 1) {
  t = i(this, k, N).call(this, t);
  const e = this.__internal__.device.milliseconds, n = e % 256, o = Math.floor(e / 3) % 256;
  return this.serialLockerHexCmd(new Uint8Array([64, this.__internal__.device.listen_on_port, t, n, o]));
}, N = function(t) {
  const e = parseInt(t);
  if (isNaN(e) || e < 1 || e > 90) throw new Error("Invalid cell number");
  return e;
}, L = function() {
  g(this, E, !1), g(this, x, 0), g(this, R, 0);
}, K = function(t = null) {
  g(this, R, Math.round(f(this, x) * 100 / 90)), this.dispatch("percentage:open", { percentage: f(this, R), dispensed: t });
}, X = function() {
  g(this, R, Math.round(f(this, x) * 100 / 90)), this.dispatch("percentage:enable", { percentage: f(this, R) });
}, Z = function() {
  g(this, R, Math.round(f(this, x) * 100 / 90)), this.dispatch("percentage:disable", { percentage: f(this, R) });
};
var S, Ae, Le, He, Ue, Ne, je, Oe, Qe;
class Lt extends V {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: n = 1
  } = {}) {
    super({ filters: t, config_port: e, no_device: n });
    I(this, S);
    F(this, "__device", {
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
          start: 109,
          end: 189
        }
      },
      current_dispense: {
        tray: null,
        channel: null
      }
    });
    this.__internal__.device.type = "jofemar", this.__internal__.time.response_general = 800, this.__internal__.dispense.limit_counter = 40, i(this, S, Ae).call(this), i(this, S, Le).call(this);
  }
  serialJofemarMakeBytes(t) {
    let e = this.hexToDec(this.sumHex(t)), n = i(this, S, He).call(this, e.toString());
    for (let o = 0; o < 2; o++)
      t.push(this.hexMaker(n[o]));
    return t.push("03"), this.add0x(t);
  }
  serialSetConnectionConstant(t = 1) {
    let e = ["02", "30", "30", (128 + t).toString(16), "53", "FF", "FF"], n = [];
    return e.forEach((o) => {
      n.push(this.hexMaker(o));
    }), this.serialJofemarMakeBytes(n);
  }
  // eslint-disable-next-line no-unused-vars
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
        n = i(this, S, Qe).call(this, t, n, 128);
        break;
    }
    this.dispatch("serial:message", n);
  }
}
S = new WeakSet(), Ae = function() {
  const t = [
    "serial:command-executed",
    "keyboard:pressed",
    "door:opened",
    "door:closed",
    "door:event"
  ];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, Le = function() {
  U.add(this);
}, He = function(t) {
  t = this.add0x([this.decToHex(parseInt(t).toString())]);
  let e = [];
  return e.push((t & 255 | 240).toString(16).toUpperCase()), e.push((t & 255 | 15).toString(16).toUpperCase()), e;
}, Ue = function(t, e) {
  return e.name = "ok", e.description = "The last command was executed successfully", e.no_code = 1, this.dispatch("serial:command-executed", e), e;
}, Ne = function(t, e) {
  e.key = {
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
  return e.key.ascii = n[t] ?? null, e.name = "key pressed", e.description = `The key ${e.key.ascii} was pressed`, e.no_code = 2, this.dispatch("keyboard:pressed", e), e;
}, je = function(t, e) {
  return e.additional = { door: { open: !1 } }, e.no_code = 3, t === "4f" ? (e.name = "door open", e.description = "The door was opened", this.dispatch("door:opened", e)) : t === "43" ? (e.name = "door close", e.description = "The door was closed", this.dispatch("door:closed", e)) : (e.name = "door event", e.description = "The door event received is unknown", this.dispatch("door:event", e)), e;
}, Oe = function(t, e) {
  e.no_code = 4;
}, Qe = function(t, e, n = 128) {
  if (t[1] && (e.additional.machine.hex = t[1], e.additional.machine.dec = this.hexToDec(t[1]) - n), !(t[1] && t[2]))
    e = i(this, S, Ue).call(this, t, e);
  else
    switch (t[2]) {
      case "54":
        e.request = "--automatic", e = i(this, S, Ne).call(this, t[3], e);
        break;
      case "50":
        e.request = "--automatic", e = i(this, S, je).call(this, t[3], e);
        break;
      case "43":
        e = i(this, S, Oe).call(this, t, e);
        break;
    }
  return e;
};
var z, H, j, l, Je, We, $, ze, Ve, Ge, Ye, Ke, Xe, Ze, $e, ue, et, tt, nt, it, st, rt, at, ot, lt, ct, ut, dt, ht, pt, B, ee, _t, ft, bt, kt, de, te, wt, yt, he, pe, _e;
class Ht extends V {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: n = 1
  } = {}) {
    super({ filters: t, config_port: e, no_device: n });
    I(this, l);
    F(this, "__coin_purse", {
      available: !0
    });
    F(this, "__banknote_purse", {
      available: !0,
      isRecycler: !0,
      recycler: {
        ict: !0,
        banknote: 1
        // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
      }
    });
    F(this, "__sale", {
      price: 0,
      change: 0,
      change_verified: 0,
      dispense_all: !0,
      last_change: 0,
      clear() {
        this.price = 0, this.change = 0, this.change_verified = 0, this.dispense_all = !0, this.last_change = 0;
      }
    });
    F(this, "__money_session", {
      inserted: 0,
      retired: 0,
      clear() {
        this.inserted = 0, this.retired = 0;
      }
    });
    F(this, "coins", {
      tubes: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      box: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      totals: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      total: 0
    });
    F(this, "banknotes", {
      stacker: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      recycler: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      out: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      totals: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      total: 0
    });
    F(this, "card_reader", {
      available: !1,
      max_pre_credit: 0
    });
    I(this, z, !1);
    I(this, H, 0);
    I(this, j, 0);
    this.__internal__.device.type = "boardroid", this.__internal__.serial.config_port.baudRate = 115200, this.__internal__.serial.response.length = 14, this.__internal__.time.response_connection = 600, this.__internal__.time.response_general = 4e3, this.__internal__.dispense.limit_counter = 15, i(this, l, Je).call(this), i(this, l, We).call(this);
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
  serialBoardroidSumHex(t) {
    let e = 0;
    return t.forEach((n, o) => {
      o !== 0 && o !== 11 && (e += parseInt(n, 16));
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
        e.request = "connect", e = i(this, l, Ve).call(this, e);
        break;
      case "a0":
        e.request = "--automatic", e = i(this, l, et).call(this, t, e);
        break;
      case "b0":
        e.request = "--automatic", e = i(this, l, tt).call(this, t, e);
        break;
      case "d0":
        e.request = "coin-purse:config", e = i(this, l, nt).call(this, t[2], e);
        break;
      case "d1":
        e.request = "banknote-purse:config", e.additional = { scrow: null }, e = i(this, l, it).call(this, t, e);
        break;
      case "d2":
        e.request = "coin-purse:read-tubes", e = i(this, l, st).call(this, t, e);
        break;
      case "d3":
        e.request = "banknote-purse:read-recycler", e = i(this, l, rt).call(this, t, e);
        break;
      case "d4":
        e.request = "banknote-purse:banknote-scrow-status", e = i(this, l, at).call(this, t[2], e);
        break;
      case "d5":
        e.request = "banknote-purse:dispense", e = i(this, l, ot).call(this, t, e);
        break;
      case "d6":
        e.request = "coin-purse:dispense", e = i(this, l, lt).call(this, t, e);
        break;
      case "d7":
        e.request = "dispense", e = i(this, l, ct).call(this, t[5], e);
        break;
      case "d8":
        e.request = "status:door", e = i(this, l, ut).call(this, t[13], e);
        break;
      case "d9":
        e.request = "status:temperature", e = i(this, l, dt).call(this, t, e);
        break;
      case "da":
        e.request = "status:relay", e = i(this, l, ht).call(this, t[2], e);
        break;
      case "db":
        e.request = "banknote-purse:save-memory", e.no_code = 18, e.name = "Bill purse memory saved?", e.description = "The memory of bill purse was saved successfully?", this.dispatch("banknote-purse:save-memory", { message: e });
        break;
      case "dc":
        e.request = "coin-purse:read-memory", e.no_code = 19, e.name = "Coin purse memory read?", e.description = "The memory of coin purse was read successfully?", this.dispatch("banknote-purse:read-memory", { message: e });
        break;
      case "dd":
        e.request = "card-reader", i(this, l, pt).call(this, t, e);
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
    await i(this, l, B).call(this, c, "coin-purse:config");
  }
  async coinPurseEnable() {
    await this.coinPurseConfigure({ enable: !0 });
  }
  async coinPurseDisable() {
    await this.coinPurseConfigure({ enable: !1 });
  }
  async coinPurseDispense({ $_50c: t = 0, $_1: e = 0, $_2: n = 0, $_5: o = 0, $_10: c = 0 } = {}) {
    if (!this.__coin_purse.available) throw new Error("Coin purse not available");
    if ([t, e, n, o, c].some((u) => isNaN(u) || typeof u == "string"))
      throw new Error("One of the values is not a number");
    if (t < 1 && e < 1 && n < 1 && o < 1 && c < 1) throw new Error("No coins to dispense");
    [t, e, n, o, c] = [
      this.decToHex(t),
      this.decToHex(e),
      this.decToHex(n),
      this.decToHex(o),
      this.decToHex(c)
    ];
    let p = ["F1", "C6", t, e, n, o, c, "00", "00", "00", "F2", "00"];
    await i(this, l, B).call(this, p, "coin-purse:dispense");
  }
  async coinPurseReadTubes() {
    const t = ["F1", "C2", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    await i(this, l, B).call(this, t, "coin-purse:read-tubes");
  }
  async banknotePurseConfigure({ enable: t = !1, scrow: e = !1 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    let n = null;
    return i(this, l, $).call(this) ? n = i(this, l, _t).call(this, { enable: t, scrow: e }) : n = i(this, l, ft).call(this, { enable: t, scrow: e }), await i(this, l, B).call(this, n, "banknote-purse:config");
  }
  async banknotePurseDispense({ $_20: t = 0, $_50: e = 0, $_100: n = 0, $_200: o = 0, $_500: c = 0, $_1000: p = 0 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    let u = null;
    if (i(this, l, $).call(this)) {
      const y = [t, e, n, o, c];
      u = i(this, l, bt).call(this, y[this.__banknote_purse.recycler.banknote]);
    } else
      u = i(this, l, kt).call(this, { $_20: t, $_50: e, $_100: n, $_200: o, $_500: c, $_1000: p });
    await i(this, l, B).call(this, u, "banknote-purse:dispense");
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
    await i(this, l, B).call(this, t, "banknote-purse:banknote-scrow-status");
  }
  async banknotePurseRejectInScrow() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    const t = ["F1", "C4", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    await i(this, l, B).call(this, t, "banknote-purse:banknote-scrow-status");
  }
  async banknotePurseSaveMemory({
    channel: t = null,
    $_20: e = null,
    $_50: n = null,
    $_100: o = null,
    $_200: c = null,
    $_500: p = null,
    $_1000: u = null
  } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (t === null || e === null || n === null || o === null || c === null || p === null || u === null)
      throw new Error("One of the values is not defined");
    const y = [
      "F1",
      "C8",
      this.decToHex(t),
      "00",
      this.decToHex(e),
      this.decToHex(n),
      this.decToHex(o),
      this.decToHex(c),
      this.decToHex(p),
      this.decToHex(u),
      "F2",
      "00"
    ];
    await i(this, l, B).call(this, y, "banknote-purse:save-memory");
  }
  async banknotePurseReadRecycler() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    const t = ["F1", "C3", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "B5"];
    return await i(this, l, B).call(this, t, "banknote-purse:read-recycler");
  }
  async cardReaderDisable() {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    const t = ["F1", "CD", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await i(this, l, B).call(this, t, "card-reader:disable");
  }
  async cardReaderDispense({ channel: t = 1, second_channel: e = null, sensor: n = !0, seconds: o = null, price: c = 0 } = {}) {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    if (isNaN(this.card_reader.max_pre_credit) || this.card_reader.max_pre_credit === 0) throw new Error("Card reader pre-credit not configured");
    if (isNaN(c) || c <= 0) throw new Error("Price must be greater than 0");
    if (c > this.card_reader.max_pre_credit) throw new Error("Price is greater than pre-credit configured");
    if (!n && (o === null || o <= 0 || o > 25.4)) throw new Error("Invalid time to dispense without sensor");
    const p = this.decToHex(c / 256), u = this.decToHex(c % 256), y = this.decToHex(t + 9);
    let C = "00";
    e && (C = this.decToHex(e + 9));
    let T = "00";
    n || (T = this.decToHex(o * 10));
    const q = ["F1", "CD", "01", y, C, T, p, u, "00", "00", "F2", "00"];
    await i(this, l, B).call(this, q, "card-reader:dispense");
  }
  async paymentPursesDisable({ coin: t = !0, banknote: e = !0, cardReader: n = !1 } = {}) {
    t && await this.coinPurseDisable(), e && await this.banknotePurseDisable(), n && await this.cardReaderDisable();
  }
  async paymentPursesEnable({ coin: t = !0, banknote: e = !0, scrowBanknote: n = !1 } = {}) {
    t && await this.coinPurseEnable(), e && await this.banknotePurseEnable({ scrow: n });
  }
  async coolingRelayConfigure({ enable: t = !1 } = {}) {
    const n = ["F1", "CC", t ? "01" : "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await i(this, l, B).call(this, n, "status:relay");
  }
  async coolingRelayEnable() {
    return await this.coolingRelayConfigure({ enable: !0 });
  }
  async coolingRelayDisable() {
    return await this.coolingRelayConfigure({ enable: !1 });
  }
  async readTemperature() {
    const t = ["F1", "CB", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await i(this, l, B).call(this, t, "status:temperature");
  }
  /**
   * Dispense a product from the machine
   * @param {number} channel
   * @param {null|number} second_channel
   * @param {boolean} sensor
   * @param {null|number} seconds
   * @return {Promise<unknown>}
   */
  async dispense({ channel: t = 1, second_channel: e = null, sensor: n = !0, seconds: o = null } = {}) {
    if (t < 1 || t > 80) throw new Error("Invalid channel number");
    if (e && (e < 1 || e > 80 || e === t)) throw new Error("Invalid second channel number");
    if (!n && (o === null || o <= 0 || o > 25.4)) throw new Error("Invalid time to dispense without sensor");
    t += 9;
    const c = this.decToHex(t);
    let p = "00";
    e && (e += 9, p = this.decToHex(e));
    let u = "00";
    n || (u = this.decToHex(o * 10));
    const y = i(this, l, ee).call(this, ["F1", "C7", c, p, u, "00", "00", "00", "00", "00", "F2", "00"]);
    return await this.internalDispense(y);
  }
  async testEngines({ singleEngine: t = !1 } = {}) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    i(this, l, de).call(this), g(this, z, !0);
    const e = [];
    i(this, l, te).call(this);
    for (let n = 1; n <= 80; n++) {
      const o = await this.dispense({
        channel: n,
        second_channel: t ? null : n + 1,
        sensor: !1,
        seconds: 0.4
      });
      e.push(o), g(this, H, n), i(this, l, te).call(this), t || n++;
    }
    g(this, H, 80), i(this, l, te).call(this, { dispensed: e }), i(this, l, de).call(this);
  }
  async sendCustomCode(t) {
    t = i(this, l, ee).call(this, t), await this.appendToQueue(t, "custom");
  }
  hasToReturnChange(t = 0) {
    let e = t;
    return e <= 0 ? !0 : (e = i(this, l, he).call(this, e).pending, e = i(this, l, pe).call(this, e).pending, !(e > 0));
  }
  async returnChange() {
    return await i(this, l, _e).call(this);
  }
  async returnInsertedMoney() {
    return this.__money_session.inserted <= 0 ? !1 : await i(this, l, _e).call(this, this.__money_session.inserted);
  }
  async serialCorruptMessage(t, e) {
    console.log("Corrupt message", t, e);
  }
}
z = new WeakMap(), H = new WeakMap(), j = new WeakMap(), l = new WeakSet(), Je = function() {
  const t = [
    "run:default-load",
    "session:money-dispensed",
    "session:money-request",
    "coin-purse:reject-lever",
    "coin-purse:reset",
    "coin-purse:coin-event",
    "banknote-purse:event-banknote",
    "coin-purse:tubes",
    "banknote-purse:recycler",
    "status:door",
    "status:temperature",
    "status:relay",
    "card-reader:event",
    "coin-purse:config",
    "banknote-purse:config",
    "banknote-purse:banknote-scrow-status",
    "percentage:test",
    "change:pending"
  ];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, We = function() {
  U.add(this);
}, $ = function() {
  return this.__banknote_purse.isRecycler && this.__banknote_purse.recycler.ict;
}, ze = function() {
  return this.hasCoinPurse || this.hasRecycler;
}, Ve = function(t) {
  return t.name = "Connection with the serial device completed.", t.description = "Your connection with the serial device was successfully completed.", t.no_code = 1, this.dispatch("run:default-load", {}), t;
}, Ge = function(t) {
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
}, Ye = function(t) {
  return ["g50", "c50", "p1", "p2", "p5", "p10", "p20"].includes(t);
}, Ke = function(t) {
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
}, Xe = function(t) {
  return ["p20", "p50", "p100", "p200", "p500", "p1000"].includes(t);
}, Ze = function(t) {
  return ["r20", "r50", "r100"].includes(t);
}, $e = function() {
  return [
    "r20",
    "r50",
    "r100",
    "r200",
    "r500"
  ][this.__banknote_purse.recycler.banknote];
}, ue = function(t, e) {
  if (!t) return;
  let n = !0;
  if (i(this, l, Ye).call(this, t)) {
    if (typeof this.coins.tubes[t] > "u") return;
    e === "tube" ? this.coins.tubes[t] += 1 : e === "box" && (this.coins.box[t] += 1);
    let o = 0;
    ["g50", "c50"].includes(t) ? o = 0.5 : o += parseInt(t.slice(1)), this.coins.totals[t] += o, this.__money_session.inserted += o, this.coins.total += o;
  } else if (i(this, l, Xe).call(this, t)) {
    if (typeof this.banknotes.tubes[t] > "u") return;
    e === "recycler" ? this.banknotes.recycler[t] += 1 : e === "stacker" && (this.banknotes.stacker[t] += 1);
    let o = parseInt(t.slice(1));
    this.banknotes.totals[t] += o, this.__money_session.inserted += o, this.banknotes.total += o;
  } else if (i(this, l, Ze).call(this, t) && e === "out") {
    if (typeof this.banknotes.out[t] > "u") return;
    this.banknotes.out[t] += 1;
    let o = parseInt(t.slice(1));
    this.__money_session.retired += o, this.banknotes.recycler[t] -= 1, this.banknotes.total -= o, n = !1, this.dispatch("session:money-dispensed", { type_money: t, retired: o, finish: !1, type: "banknotes" });
  }
  n && this.dispatch("session:money-request", {});
}, et = function(t, e) {
  const n = parseInt(t[2], 16);
  return e.name = "Coin Inserted", e.no_code = 2, e.additional = { where: null, coin: null }, n === 1 ? (e.name = "Lever pressed", e.description = "Reject lever", e.no_code = 100, this.dispatch("coin-purse:reject-lever", {})) : n === 2 ? (e.name = "Reset coin purse", e.description = "The configuration of coin purse was reset", e.no_code = 101, this.dispatch("coin-purse:reset", {})) : n >= 64 && n <= 79 ? (e.name = "Coin inserted in profit box", e.additional.where = "box") : n >= 80 && n <= 95 ? (e.name = "Coin inserted in tube", e.additional.where = "tube") : n >= 96 && n <= 111 ? (e.name = "Unused coin", e.description = "Something come from coin changer but in MDB Docs is unused", e.additional.where = "unused") : n >= 112 && n <= 127 ? (e.name = "Coin rejected", e.additional.where = "rejected") : n >= 144 && n <= 159 ? (e.name = "Coin dispensed", e.additional.where = "out", e.description = `Undefined value: ¿${t[2]}?`) : (e.name = "Coin inserted", e.description = "Undefined status. Without information of this", e.no_code = 400), n === 1 || n === 2 || n >= 160 || n >= 128 && n <= 143 || ([e.description, e.additional.coin] = i(this, l, Ge).call(this, t[2]), e.no_code = 38 + n, i(this, l, ue).call(this, e.additional.coin, e.additional.where), ["tube", "out"].includes(e.additional.where) && this.dispatch("coin-purse:tubes", this.coins.tubes), this.dispatch("coin-purse:coin-event", this.coins)), e;
}, tt = function(t, e) {
  const n = parseInt(t[2], 16);
  return e.name = "Banknote Inserted", e.no_code = 2, e.additional = { where: null, banknote: null }, n === 42 ? (e.name = "Banknote dispensed", e.description = "Banknote dispensed by request.", e.additional.banknote = i(this, l, $e).call(this), e.additional.where = "out", e.no_code = 200) : n >= 128 && n <= 143 ? (e.name = "Banknote inserted", e.additional.where = "stacker") : n >= 144 && n <= 159 ? (e.name = "Banknote inserted in pre stacker", e.additional.where = "tmp") : n >= 160 && n <= 175 ? (e.name = "Banknote rejected", e.additional.where = "nothing") : n >= 176 && n <= 191 && (e.name = "Banknote inserted", e.additional.where = "recycler"), n >= 128 && n <= 191 && ([e.description, e.additional.banknote] = i(this, l, Ke).call(this, t[2]), e.no_code = 74 + n), i(this, l, ue).call(this, e.additional.banknote, e.additional.where), this.dispatch("banknote-purse:event-banknote", this.banknotes), e;
}, nt = function(t, e) {
  const n = parseInt(t, 16);
  return n === 1 ? (e.name = "Coin purse enabled", e.description = "Configuration complete, enabled", e.no_code = 3) : n === 0 ? (e.name = "Coin purse disabled", e.description = "Disabled by system request", e.no_code = 4) : (e.name = "Status unknown", e.description = "The response of coin purse doesn't identify successfully", e.no_code = 400), this.dispatch("coin-purse:config", { status: n === 1 }), e;
}, it = function(t, e) {
  const n = parseInt(t[2], 16), o = parseInt(t[3], 16);
  return n === 0 ? (e.name = "Bill purse disabled", e.description = "Configuration complete, disabled") : n === 1 && (e.name = "Bill purse enabled", e.description = "Configuration complete, enabled"), o === 0 ? e.additional.scrow = "Scrow disabled, banknote received automatic" : o === 1 && (e.additional.scrow = "Scrow enabled, require manual action"), e.no_code = 5, this.dispatch("banknote-purse:config", { status: n === 1, scrow: o === 1 }), e;
}, st = function(t, e) {
  e.no_code = 6;
  const [n, o, c, p, u, y] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ];
  return e.additional = {
    coins: { g50: n, c50: o, p1: c, p2: p, p5: u, p10: y }
  }, this.coins.tubes.g50 = n, this.coins.tubes.c50 = o, this.coins.tubes.p1 = c, this.coins.tubes.p2 = p, this.coins.tubes.p5 = u, this.coins.tubes.p10 = y, this.coins.totals.g50 = (this.coins.box.g50 + n) * 0.5, this.coins.totals.c50 = (this.coins.box.c50 + o) * 0.5, this.coins.totals.p1 = this.coins.box.p1 + c, this.coins.totals.p2 = (this.coins.box.p2 + p) * 2, this.coins.totals.p5 = (this.coins.box.p5 + u) * 5, this.coins.totals.p10 = (this.coins.box.p10 + y) * 10, this.coins.total = this.coins.totals.g50 + this.coins.totals.c50 + this.coins.totals.p1 + this.coins.totals.p2 + this.coins.totals.p5 + this.coins.totals.p10, e.name = "Read tubes", e.description = "Quantity of coins approximated", this.dispatch("coin-purse:tubes", this.coins.tubes), e;
}, rt = function(t, e) {
  e.no_code = 7;
  const [n, o, c, p, u, y] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ];
  return e.additional = {
    banknotes: { b20: n, b50: o, b100: c, b200: p, b500: u, b1000: y }
  }, this.banknotes.recycler.p20 = n, this.banknotes.recycler.p50 = o, this.banknotes.recycler.p100 = c, this.banknotes.recycler.p200 = p, this.banknotes.recycler.p500 = u, this.banknotes.recycler.p1000 = y, this.banknotes.totals.p20 = (this.banknotes.stacker.p20 + n) * 20, this.banknotes.totals.p50 = (this.banknotes.stacker.p50 + o) * 50, this.banknotes.totals.p100 = (this.banknotes.stacker.p100 + c) * 100, this.banknotes.totals.p200 = (this.banknotes.stacker.p200 + p) * 200, this.banknotes.totals.p500 = (this.banknotes.stacker.p500 + u) * 500, this.banknotes.totals.p1000 = (this.banknotes.stacker.p1000 + y) * 1e3, this.banknotes.total = this.banknotes.totals.p20 + this.banknotes.totals.p50 + this.banknotes.totals.p100 + this.banknotes.totals.p200 + this.banknotes.totals.p500 + this.banknotes.totals.p1000, e.name = "Read recycler", e.description = "Quantity of banknotes approximated", this.dispatch("banknote-purse:recycler", this.banknotes.recycler), e;
}, at = function(t, e) {
  const n = parseInt(t, 16);
  return n === 1 ? e.name = "Banknote accepted" : n === 0 ? e.name = "Banknote rejected" : e.name = "Unknown status banknote", e.no_code = 8, this.dispatch("banknote-purse:banknote-scrow-status", { status: n === 1 }), e;
}, ot = function(t, e) {
  const [n, o, c, p, u, y] = [
    parseInt(t[2], 16),
    parseInt(t[3], 16),
    parseInt(t[4], 16),
    parseInt(t[5], 16),
    parseInt(t[6], 16),
    parseInt(t[7], 16)
  ], C = n * 20 + o * 50 + c * 100 + p * 200 + u * 500 + y * 1e3;
  return e.name = "Banknotes dispensed", e.description = C > 0 ? "Banknotes dispensed by request" : "No banknotes dispensed, recycler empty", e.no_code = 9, e.additional = {
    banknotes: { b20: n, b50: o, b100: c, b200: p, b500: u, b1000: y },
    total_dispensed: C
  }, this.dispatch("session:money-dispensed", {
    type_money: null,
    retired: null,
    finish: !1,
    type: "banknotes",
    data: e
  }), e;
}, lt = function(t, e) {
  return e.name = "Coins dispensed", e.no_code = 10, e.description = "Coins dispensed by request", isNaN(this.__sale.last_change) && (this.__sale.last_change = 0), this.__money_session.retired += this.__sale.last_change, this.dispatchAsync("session:money-dispensed", {
    type_money: null,
    retired: null,
    finish: !1,
    type: "coins"
  }, 500), e;
}, ct = function(t, e) {
  const n = parseInt(t, 16);
  return n === 1 ? (e.name = "Product not delivered", e.description = "The product requested wasn't delivered", e.no_code = 11, this.__internal__.dispense.status = !1) : n === 0 ? (e.name = "Product delivered", e.description = "The product requested was delivered", e.no_code = 12, this.__internal__.dispense.status = !0) : (e.name = "Unknown status product", e.description = "The response of product doesn't identify successfully", e.no_code = 400, this.__internal__.dispense.status = !1), this.dispatch("dispensed", {}), e;
}, ut = function(t, e) {
  let n = "closed";
  return t === "db" ? (e.name = "Door closed", e.no_code = 13) : t === "dc" ? (e.name = "Door open", e.no_code = 14, n = "open") : (e.name = "Unknown status door", e.description = "The response of door doesn't identify successfully", e.no_code = 400, n = "unknown"), this.dispatch("status:door", { status: n }), e;
}, dt = function(t, e) {
  const n = parseInt(t[2], 16) * 255, o = parseInt(t[3], 16), c = (n + o) * 0.1;
  return e.no_code = 15, e.name = "Temperature status", e.description = `Temperature: ${c}`, e.additional = {
    high: n,
    low: o,
    temperature: parseFloat(c.toString())
  }, this.dispatch("status:temperature", e.additional), e;
}, ht = function(t, e) {
  const n = parseInt(t, 16);
  let o = "unknown";
  return n === 1 ? (e.name = "Relay on", e.description = "Relay on", e.no_code = 16, o = "on") : n === 0 ? (e.name = "Relay off", e.description = "Relay off", e.no_code = 17, o = "off") : (e.name = "Status unknown", e.description = "Status unknown", e.no_code = 400), this.dispatch("status:relay", { status: o }), e;
}, pt = function(t, e) {
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
    const o = parseInt(t[8], 16);
    o === 0 ? (e.no_code = 30, e.name = "product not dispensed", e.description = "The product requested wasn't delivered") : o === 1 && (e.no_code = 31, e.name = "product dispensed", e.description = "The product requested was delivered");
  }
  return this.dispatch("card-reader:event", e), e;
}, B = function(t, e) {
  return this.appendToQueue(i(this, l, ee).call(this, t), e);
}, ee = function(t) {
  return t[11] = this.serialBoardroidSumHex(t), t.map((e, n) => {
    t[n] = this.hexMaker(e);
  }), t;
}, _t = function({ enable: t = !1, scrow: e = !1 } = {}) {
  const n = t ? "FF" : "00", o = e ? "FF" : "00";
  return ["F1", "C0", n, n, o, o, "00", "00", "00", "00", "F2", "00"];
}, ft = function({ enable: t = !1, scrow: e = !1 } = {}) {
  return ["F1", "C0", t ? "01" : "00", e ? "01" : "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
}, bt = function(t = 1) {
  if (t < 1) throw new Error("No banknotes to dispense");
  return t = this.decToHex(t), ["F1", "C5", this.decToHex(this.__banknote_purse.recycler.banknote.toString()), t, "00", "00", "00", "00", "00", "00", "F2", "00"];
}, kt = function({ $_20: t = 0, $_50: e = 0, $_100: n = 0, $_200: o = 0, $_500: c = 0, $_1000: p = 0 } = {}) {
  if ([t, e, n, o, c, p].some((u) => isNaN(u) || typeof u == "string"))
    throw new Error("One of the values is not a number");
  if (t < 1 && e < 1 && n < 1 && o < 1 && c < 1 && p < 1) throw new Error("No banknotes to dispense");
  return [t, e, n, o, c, p] = [
    this.decToHex(t),
    this.decToHex(e),
    this.decToHex(n),
    this.decToHex(o),
    this.decToHex(c),
    this.decToHex(p)
  ], ["F1", "C5", t, e, n, o, c, p, "00", "00", "F2", "00"];
}, de = function() {
  g(this, z, !1), g(this, H, 0), g(this, j, 0);
}, /**
 *
 * @param {null|object} dispensed
 * @param {number} limit
 */
te = function({ dispensed: t = null, limit: e = 80 } = {}) {
  g(this, j, Math.round(f(this, H) * 100 / e)), this.dispatch("percentage:test", { percentage: f(this, j), dispensed: t });
}, wt = function(t) {
  const e = ["20", "50", "100", "200", "500"], n = "$_" + e[this.__banknote_purse.recycler.banknote], o = parseInt(e[this.__banknote_purse.recycler.banknote]), c = parseInt((t / o).toString()), p = {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: t,
    will_dispense: c > 0
  };
  return this.totalInRecycler === 0 || c < 1 || t === 0 || (p.banknotes[n] = c, p.pending = t % o), p;
}, yt = function(t) {
  const e = {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: t,
    will_dispense: !1
  };
  return this.totalInRecycler === 0 || t === 0 || (e.banknotes.$_1000 = parseInt((t / 1e3).toString()), e.pending = t % 1e3, e.banknotes.$_500 = parseInt((e.pending / 500).toString()), e.pending = e.pending % 500, e.banknotes.$_200 = parseInt((e.pending / 200).toString()), e.pending = e.pending % 200, e.banknotes.$_100 = parseInt((e.pending / 100).toString()), e.pending = e.pending % 100, e.banknotes.$_50 = parseInt((e.pending / 50).toString()), e.pending = e.pending % 50, e.banknotes.$_20 = parseInt((e.pending / 20).toString()), e.pending = e.pending % 20, e.will_dispense = e.banknotes.$_1000 > 0 || e.banknotes.$_500 > 0 || e.banknotes.$_200 > 0 || e.banknotes.$_100 > 0 || e.banknotes.$_50 > 0 || e.banknotes.$_20 > 0), e;
}, he = function(t) {
  return i(this, l, $).call(this) ? i(this, l, wt).call(this, t) : i(this, l, yt).call(this, t);
}, pe = function(t) {
  const e = {
    coins: { $_50c: 0, $_1: 0, $_2: 0, $_5: 0, $_10: 0 },
    pending: t,
    will_dispense: !1
  };
  return t <= 0 || this.totalInTubes === 0 || (e.coins.$_10 = parseInt((t / 10).toString()), e.pending = t % 10, e.coins.$_5 = parseInt((e.pending / 5).toString()), e.pending = e.pending % 5, e.coins.$_2 = parseInt((e.pending / 2).toString()), e.pending = e.pending % 2, e.coins.$_1 = parseInt(e.pending), e.pending = e.pending % 1, e.coins.$_50c = parseInt((e.pending / 0.5).toString()), e.pending = e.pending % 0.5, e.will_dispense = e.coins.$_10 > 0 || e.coins.$_5 > 0 || e.coins.$_2 > 0 || e.coins.$_1 > 0 || e.coins.$_50c > 0), e;
}, _e = async function(t = null) {
  if (!i(this, l, ze).call(this)) throw new Error("Change not available");
  let e = this.change, n = this.change;
  if (t !== null && (e = t, n = t), n <= 0) return !1;
  const o = i(this, l, he).call(this, n);
  n = o.pending;
  const c = i(this, l, pe).call(this, n);
  return n = c.pending, n > 0 && this.dispatch("change:pending", { pending: n }), n === e ? !1 : (o.will_dispense && await this.banknotePurseDispense(o.banknotes), c.will_dispense && await this.coinPurseDispense(c.coins), !0);
};
const Nt = {
  Relay: Pt,
  Locker: qt,
  Jofemar: Lt,
  Boardroid: Ht,
  Devices: U,
  Emulator: J,
  version: "3.0.0"
};
export {
  Ht as Boardroid,
  U as Devices,
  J as Emulator,
  Lt as Jofemar,
  qt as Locker,
  Pt as Relay,
  Nt as WebSerial
};
