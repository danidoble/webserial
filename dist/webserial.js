var va = Object.defineProperty;
var $n = (r) => {
  throw TypeError(r);
};
var Ea = (r, n, t) => n in r ? va(r, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[n] = t;
var lt = (r, n, t) => Ea(r, typeof n != "symbol" ? n + "" : n, t), Xe = (r, n, t) => n.has(r) || $n("Cannot " + t);
var I = (r, n, t) => (Xe(r, n, "read from private field"), t ? t.call(r) : n.get(r)), G = (r, n, t) => n.has(r) ? $n("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(r) : n.set(r, t), M = (r, n, t, e) => (Xe(r, n, "write to private field"), e ? e.call(r, t) : n.set(r, t), t), o = (r, n, t) => (Xe(r, n, "access private method"), t);
function Ct(r = 100) {
  return new Promise((n) => setTimeout(() => n(), r));
}
function Pa() {
  return "serial" in navigator;
}
function zn() {
  return "geolocation" in navigator;
}
function Ca() {
  return "crypto" in window;
}
function sn(r = 1) {
  return r * 1e3;
}
function Tt(r) {
  return r == null || r === "";
}
var at, ht, d, Ti, Si, C, on, B, N, we, P, cn, Yt;
const u = class u {
  static status(n = null) {
    var e, i;
    if (!o(e = u, d, C).call(e, n)) return !1;
    let t = [];
    switch (I(u, at)) {
      case "locker":
        t = ["0", "8"];
        break;
      case "boardroid":
        t = ["2", (5 + I(u, ht)).toString(16).toUpperCase()];
        break;
      case "jofemar":
        t = ["6"];
        break;
      default:
        return !1;
    }
    o(i = u, d, P).call(i, t);
  }
  static dispensed(n = null) {
    var e, i;
    if (!o(e = u, d, C).call(e, n)) return !1;
    let t = [];
    switch (I(u, at)) {
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
    o(i = u, d, P).call(i, t);
  }
  static notDispensed(n = null) {
    var e, i;
    if (!o(e = u, d, C).call(e, n)) return !1;
    let t = [];
    switch (I(u, at)) {
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
    o(i = u, d, P).call(i, t);
  }
  static gateInactive(n = null) {
    var t;
    if (!o(t = u, d, C).call(t, n) || !o(this, d, on).call(this)) return !1;
    o(this, d, P).call(this, ["0", "7", "5", "5", "5"]);
  }
  static gateConfigured(n = null) {
    var t;
    if (!o(t = u, d, C).call(t, n) || !o(this, d, on).call(this)) return !1;
    o(this, d, P).call(this, ["0", "6"]);
  }
  static keyPressed(n = null) {
    var s, a, c;
    if (!o(s = u, d, C).call(s, n) || !o(a = u, d, N).call(a)) return !1;
    const t = ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "2A", "23", "41", "42", "43", "44"], e = (128 + I(u, ht)).toString(16), i = Math.floor(Math.random() * 15);
    o(c = u, d, P).call(c, ["2", e, "54", t[i]]);
  }
  static doorOpened(n = null) {
    var i, s;
    if (!o(i = u, d, C).call(i, n) || !o(this, d, we).call(this)) return !1;
    let t = [];
    const e = (128 + I(u, ht)).toString(16);
    switch (I(u, at)) {
      case "boardroid":
        t = ["2", "D8", "dc"];
        break;
      case "jofemar":
        t = ["2", e, "50", "4F"];
        break;
    }
    o(s = u, d, P).call(s, t);
  }
  static doorClosed(n = null) {
    var i, s;
    if (!o(i = u, d, C).call(i, n) || !o(this, d, we).call(this)) return !1;
    let t = [];
    const e = (128 + I(u, ht)).toString(16);
    switch (I(u, at)) {
      case "boardroid":
        t = ["2", "D8", "db"];
        break;
      case "jofemar":
        t = ["2", e, "50", "43"];
        break;
    }
    o(s = u, d, P).call(s, t);
  }
  static channelDisconnected(n = null) {
    var e, i, s;
    if (!o(e = u, d, C).call(e, n) || !o(i = u, d, N).call(i)) return !1;
    const t = (128 + I(u, ht)).toString(16);
    o(s = u, d, P).call(s, ["2", t, "43", "43", "43", "FD"]);
  }
  static channelConnected(n = null) {
    var e, i, s;
    if (!o(e = u, d, C).call(e, n) || !o(i = u, d, N).call(i)) return !1;
    const t = (128 + I(u, ht)).toString(16);
    o(s = u, d, P).call(s, ["2", t, "43", "43", "43", "FC"]);
  }
  static channelEmpty(n = null) {
    var e, i, s;
    if (!o(e = u, d, C).call(e, n) || !o(i = u, d, N).call(i)) return !1;
    const t = (128 + I(u, ht)).toString(16);
    o(s = u, d, P).call(s, ["2", t, "43", "43", "43", "FF"]);
  }
  static workingTemperature(n = null) {
    var e, i, s;
    if (!o(e = u, d, C).call(e, n) || !o(i = u, d, N).call(i)) return !1;
    const t = (128 + I(u, ht)).toString(16);
    o(s = u, d, P).call(s, ["2", t, "43", "54", "16"]);
  }
  static currentTemperature(n = null) {
    var i, s, a;
    if (!o(i = u, d, C).call(i, n) || !o(s = u, d, we).call(s)) return !1;
    let t = [];
    const e = (128 + I(u, ht)).toString(16);
    switch (I(u, at)) {
      case "boardroid":
        t = ["2", "D9", "44", "30"];
        break;
      case "jofemar":
        t = ["2", e, "43", "74", "2B", "30", "39", "2E", "31", "7F", "43"];
        break;
    }
    o(a = u, d, P).call(a, t);
  }
  static ready(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "30"]);
  }
  static busy(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "31"]);
  }
  static invalidTray(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "32"]);
  }
  static invalidChannel(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "33"]);
  }
  static emptyChannel(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "34"]);
  }
  static elevatorJam(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "35"]);
  }
  static elevatorMalfunction(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "36"]);
  }
  static phototransistorFailure(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "37"]);
  }
  static allChannelsEmpty(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "38"]);
  }
  static productDetectorFailure(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "39"]);
  }
  static displayDisconnected(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "41"]);
  }
  static productUnderElevator(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "42"]);
  }
  static elevatorSettingAlarm(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "43"]);
  }
  static buttonPanelFailure(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "44"]);
  }
  static errorWritingEeprom(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "45"]);
  }
  static errorControlTemperature(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "46"]);
  }
  static thermometerDisconnected(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "47"]);
  }
  static thermometerMisconfigured(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "48"]);
  }
  static thermometerFailure(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "49"]);
  }
  static errorExtractorConsumption(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "4A"]);
  }
  static channelSearchError(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "4B"]);
  }
  static productExitMouthSearchError(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "4C"]);
  }
  static elevatorInteriorLocked(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "4D"]);
  }
  static productDetectorVerifierError(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "4E"]);
  }
  static waitingForProductRecall(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "4F"]);
  }
  static productExpiredByTemperature(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "50"]);
  }
  static faultyAutomaticDoor(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "51"]);
  }
  static rejectLever(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "A0", "1"]);
  }
  static resetCoinPurse(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "A0", "2"]);
  }
  static coinInsertedBox(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, C).call(s, n) || !o(a = u, d, B).call(a)) return !1;
    const e = ["40", "41", "42", "43", "44", "45"], i = o(c = u, d, cn).call(c, e, t);
    o(l = u, d, P).call(l, ["2", "A0", i]);
  }
  static coinInsertedTube(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, C).call(s, n) || !o(a = u, d, B).call(a)) return !1;
    const e = ["50", "51", "52", "53", "54", "55"], i = o(c = u, d, cn).call(c, e, t);
    o(l = u, d, P).call(l, ["2", "A0", i]);
  }
  static banknoteInsertedStacker(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, C).call(s, n) || !o(a = u, d, B).call(a)) return !1;
    const e = ["80", "81", "82", "83", "84"], i = o(c = u, d, Yt).call(c, e, t);
    o(l = u, d, P).call(l, ["2", "B0", i]);
  }
  static banknoteInsertedEscrow(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, C).call(s, n) || !o(a = u, d, B).call(a)) return !1;
    const e = ["90", "91", "92", "93", "94"], i = o(c = u, d, Yt).call(c, e, t);
    o(l = u, d, P).call(l, ["2", "B0", i]);
  }
  static banknoteEjected(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, C).call(s, n) || !o(a = u, d, B).call(a)) return !1;
    const e = ["A0", "A1", "A2", "A3", "A4"], i = o(c = u, d, Yt).call(c, e, t);
    o(l = u, d, P).call(l, ["2", "B0", i]);
  }
  static banknoteInsertedRecycler(n = null, t = null) {
    var s, a, c, l;
    if (!o(s = u, d, C).call(s, n) || !o(a = u, d, B).call(a)) return !1;
    const e = ["B0", "B1", "B2", "B3", "B4"], i = o(c = u, d, Yt).call(c, e, t);
    o(l = u, d, P).call(l, ["2", "B0", i]);
  }
  static banknoteTaken(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "B0", "2a"]);
  }
  static coinPurseEnabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "D0", "1"]);
  }
  static coinPurseDisabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "D0", "0"]);
  }
  static billPurseDisabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "D1", "0", "0"]);
  }
  static billPurseEnabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "D1", "1", "1"]);
  }
  static readTubes(n = null) {
    var h, p, f;
    if (!o(h = u, d, C).call(h, n) || !o(p = u, d, B).call(p)) return !1;
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
    o(f = u, d, P).call(f, ["2", "D2", e, i, s, a, c, l]);
  }
  static readBillPurse(n = null, t = null) {
    var i, s, a, c;
    if (!o(i = u, d, C).call(i, n) || !o(s = u, d, B).call(s)) return !1;
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
      let h = "0", p = "0", f = "0", b = "0", E = "0";
      if (t !== null && !isNaN(parseInt(t)))
        switch (t.toString()) {
          case "20":
            h = l;
            break;
          case "50":
            p = l;
            break;
          case "100":
            f = l;
            break;
          case "200":
            b = l;
            break;
          case "500":
            E = l;
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
            f = l;
            break;
          case 3:
            b = l;
            break;
          case 4:
            E = l;
            break;
        }
      o(a = u, d, P).call(a, ["2", "D3", h, p, f, b, E, "0"]);
    } else {
      const [l, h, p, f, b, E] = [
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 2)],
        e[Math.floor(Math.random())],
        e[Math.floor(Math.random())]
      ];
      o(c = u, d, P).call(c, ["2", "D3", l, h, p, f, b, E]);
    }
  }
  static banknoteAccepted(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "D4", "1"]);
  }
  static banknoteRejected(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "D4", "0"]);
  }
  static banknotesDispensed(n = null) {
    var e, i, s, a;
    if (!o(e = u, d, C).call(e, n) || !o(i = u, d, B).call(i)) return !1;
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
      let l = "0", h = "0", p = "0", f = "0", b = "0";
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
          f = c;
          break;
        case 4:
          b = c;
          break;
      }
      o(s = u, d, P).call(s, ["2", "D5", l, h, p, f, b, "0"]);
    } else {
      const [c, l, h, p, f, b] = [
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 2)],
        t[Math.floor(Math.random())],
        t[Math.floor(Math.random())]
      ];
      o(a = u, d, P).call(a, ["2", "D5", c, l, h, p, f, b]);
    }
  }
  static coinsDispensed(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "D6"]);
  }
  static relayOn(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DA", "1"]);
  }
  static relayOff(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DA", "0"]);
  }
  static nayaxEnabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DD", "1"]);
  }
  static nayaxDisabled(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DD", "0"]);
  }
  static nayaxPreCreditAuthorized(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DD", "3"]);
  }
  static nayaxCancelRequest(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DD", "4"]);
  }
  static nayaxSellApproved(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DD", "5"]);
  }
  static nayaxSellDenied(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DD", "6"]);
  }
  static nayaxEndSession(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DD", "7"]);
  }
  static nayaxCancelled(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DD", "8"]);
  }
  static nayaxDispensed(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DD", "A", "0"]);
  }
  static nayaxNotDispensed(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, B).call(e)) return !1;
    o(i = u, d, P).call(i, ["2", "DD", "A", "1"]);
  }
  static fullTray(n = null) {
    var t, e, i;
    if (!o(t = u, d, C).call(t, n) || !o(e = u, d, N).call(e)) return !1;
    o(i = u, d, P).call(i, ["6", "4F"]);
  }
  static setConnection(n = null) {
    var t;
    if (!o(t = u, d, C).call(t, n)) return !1;
    n.__internal__.serial.connected = !0;
  }
};
at = new WeakMap(), ht = new WeakMap(), d = new WeakSet(), Ti = function() {
  if (u.enable === !1) throw new Error("Emulator is disabled");
  return u.enable;
}, Si = function(n) {
  if (typeof n != "object" || !(n instanceof Dt))
    throw new Error(`Type ${n.typeDevice} is not supported`);
  return u.instance = n, M(u, at, n.typeDevice), M(u, ht, n.deviceNumber), !0;
}, C = function(n = null) {
  var t, e;
  return !o(t = u, d, Ti).call(t) || n === null && u.instance === null ? !1 : (u.instance === null && o(e = u, d, Si).call(e, n), !0);
}, on = function() {
  if (I(u, at) !== "locker") throw new Error("This function is only available for Locker devices");
  return !0;
}, B = function() {
  if (I(u, at) !== "boardroid")
    throw new Error("This function is only available for Boardroid devices");
  return !0;
}, N = function() {
  if (I(u, at) !== "jofemar") throw new Error("This function is only available for Jofemar devices");
  return !0;
}, we = function() {
  if (I(u, at) === "locker") throw new Error("This function is not available for Locker devices");
  return !0;
}, P = function(n) {
  u.instance.__emulate({ code: n });
}, cn = function(n, t = null) {
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
}, Yt = function(n, t = null) {
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
}, G(u, d), lt(u, "enable", !1), lt(u, "instance", null), G(u, at, null), G(u, ht, 1);
let an = u;
var Ta = Object.defineProperty, ki = (r) => {
  throw TypeError(r);
}, Sa = (r, n, t) => n in r ? Ta(r, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[n] = t, ce = (r, n, t) => Sa(r, typeof n != "symbol" ? n + "" : n, t), ka = (r, n, t) => n.has(r) || ki("Cannot " + t), xa = (r, n, t) => n.has(r) ? ki("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(r) : n.set(r, t), V = (r, n, t) => (ka(r, n, "access private method"), t);
const J = [];
for (let r = 0; r < 256; ++r)
  J.push((r + 256).toString(16).slice(1));
function Aa(r, n = 0) {
  return (J[r[n + 0]] + J[r[n + 1]] + J[r[n + 2]] + J[r[n + 3]] + "-" + J[r[n + 4]] + J[r[n + 5]] + "-" + J[r[n + 6]] + J[r[n + 7]] + "-" + J[r[n + 8]] + J[r[n + 9]] + "-" + J[r[n + 10]] + J[r[n + 11]] + J[r[n + 12]] + J[r[n + 13]] + J[r[n + 14]] + J[r[n + 15]]).toLowerCase();
}
let Je;
const Da = new Uint8Array(16);
function Ra() {
  if (!Je) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    Je = crypto.getRandomValues.bind(crypto);
  }
  return Je(Da);
}
const Ia = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), Gn = { randomUUID: Ia };
function Oa(r, n, t) {
  var e;
  if (Gn.randomUUID && !r)
    return Gn.randomUUID();
  r = r || {};
  const i = r.random ?? ((e = r.rng) == null ? void 0 : e.call(r)) ?? Ra();
  if (i.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return i[6] = i[6] & 15 | 64, i[8] = i[8] & 63 | 128, Aa(i);
}
class Xn extends CustomEvent {
  constructor(n, t) {
    super(n, t);
  }
}
class xi extends EventTarget {
  constructor() {
    super(...arguments), ce(this, "__listeners__", {
      debug: !1
    }), ce(this, "__debug__", !1);
  }
  dispatch(n, t = null) {
    const e = new Xn(n, { detail: t });
    this.dispatchEvent(e), this.__debug__ && this.dispatchEvent(new Xn("debug", { detail: { type: n, data: t } }));
  }
  dispatchAsync(n, t = null, e = 100) {
    const i = this;
    setTimeout(() => {
      i.dispatch(n, t);
    }, e);
  }
  on(n, t) {
    typeof this.__listeners__[n] < "u" && !this.__listeners__[n] && (this.__listeners__[n] = !0), this.addEventListener(n, t);
  }
  off(n, t) {
    this.removeEventListener(n, t);
  }
  serialRegisterAvailableListener(n) {
    this.__listeners__[n] || (this.__listeners__[n] = !1);
  }
  get availableListeners() {
    return Object.keys(this.__listeners__).sort().map((n) => ({
      type: n,
      listening: this.__listeners__[n]
    }));
  }
}
const ln = class L extends xi {
  constructor() {
    super(), ["change"].forEach((n) => {
      this.serialRegisterAvailableListener(n);
    });
  }
  static $dispatchChange(n = null) {
    n && n.$checkAndDispatchConnection(), L.instance.dispatch("change", { devices: L.devices, dispatcher: n });
  }
  static typeError(n) {
    const t = new Error();
    throw t.message = `Type ${n} is not supported`, t.name = "DeviceTypeError", t;
  }
  static registerType(n) {
    typeof L.devices[n] > "u" && (L.devices[n] = {});
  }
  static add(n) {
    const t = n.typeDevice;
    typeof L.devices[t] > "u" && (L.devices[t] = {});
    const e = n.uuid;
    if (typeof L.devices[t] > "u" && L.typeError(t), L.devices[t][e])
      throw new Error(`Device with id ${e} already exists`);
    return L.devices[t][e] = n, L.$dispatchChange(n), Object.keys(L.devices[t]).indexOf(e);
  }
  static get(n, t) {
    return typeof L.devices[n] > "u" && (L.devices[n] = {}), typeof L.devices[n] > "u" && L.typeError(n), L.devices[n][t];
  }
  static getAll(n = null) {
    return n === null ? L.devices : (typeof L.devices[n] > "u" && L.typeError(n), L.devices[n]);
  }
  static getList() {
    return Object.values(L.devices).map((n) => Object.values(n)).flat();
  }
  static getByNumber(n, t) {
    return typeof L.devices[n] > "u" && L.typeError(n), Object.values(L.devices[n]).find((e) => e.deviceNumber === t) ?? null;
  }
  static getCustom(n, t = 1) {
    return typeof L.devices[n] > "u" && L.typeError(n), Object.values(L.devices[n]).find((e) => e.deviceNumber === t) ?? null;
  }
};
ce(ln, "instance"), ce(ln, "devices", {});
let k = ln;
k.instance || (k.instance = new k());
function Jn(r = 100) {
  return new Promise(
    (n) => setTimeout(() => n(), r)
  );
}
function Na() {
  return "serial" in navigator;
}
const Qe = {
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: "none",
  bufferSize: 32768,
  flowControl: "none"
};
var F, Kt, oe, hn, It, Ai, Qn, Zn, Yn, Di, Ri, Ii, Oi, ti, ei, Ni, Bi;
class Ba extends xi {
  constructor({
    filters: n = null,
    config_port: t = Qe,
    no_device: e = 1,
    device_listen_on_channel: i = 1
  } = {
    filters: null,
    config_port: Qe,
    no_device: 1,
    device_listen_on_channel: 1
  }) {
    if (super(), xa(this, F), ce(this, "__internal__", {
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
        connected: !1,
        port: null,
        last_action: null,
        response: {
          length: null,
          buffer: new Uint8Array([]),
          as: "hex",
          replacer: /[\n\r]+/g,
          limiter: null
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
        config_port: Qe,
        queue: [],
        auto_response: ["DD", "DD"]
      },
      device: {
        type: "unknown",
        id: Oa(),
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
    }), !("serial" in navigator))
      throw new Error("Web Serial not supported");
    n && (this.serialFilters = n), t && (this.serialConfigPort = t), e && V(this, F, Ni).call(this, e), i && ["number", "string"].includes(typeof i) && (this.listenOnChannel = i), V(this, F, Ii).call(this), V(this, F, Oi).call(this);
  }
  set listenOnChannel(n) {
    if (typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 1 || n > 255)
      throw new Error("Invalid port number");
    this.__internal__.device.listen_on_port = n, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(n);
  }
  get lastAction() {
    return this.__internal__.serial.last_action;
  }
  get listenOnChannel() {
    return this.__internal__.device.listen_on_port ?? 1;
  }
  set serialFilters(n) {
    this.__internal__.serial.filters = n;
  }
  get serialFilters() {
    return this.__internal__.serial.filters;
  }
  set serialConfigPort(n) {
    this.__internal__.serial.config_port = n;
  }
  get serialConfigPort() {
    return this.__internal__.serial.config_port;
  }
  get isConnected() {
    const n = this.__internal__.serial.connected, t = V(this, F, Kt).call(this, this.__internal__.serial.port);
    return n && !t && V(this, F, oe).call(this, { error: "Port is closed, not readable or writable." }), this.__internal__.serial.connected = t, this.__internal__.serial.connected;
  }
  get isDisconnected() {
    const n = this.__internal__.serial.connected, t = V(this, F, Kt).call(this, this.__internal__.serial.port);
    return !n && t && (this.dispatch("serial:connected"), k.$dispatchChange(this)), this.__internal__.serial.connected = t, !this.__internal__.serial.connected;
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
  async timeout(n, t) {
    this.__internal__.last_error.message = "Operation response timed out.", this.__internal__.last_error.action = t, this.__internal__.last_error.code = n, this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), t === "connect" ? (this.__internal__.serial.connected = !1, this.dispatch("serial:reconnect", {}), k.$dispatchChange(this)) : t === "connection:start" && (await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector += 1, k.$dispatchChange(this), await this.serialConnect()), this.dispatch("serial:timeout", {
      ...this.__internal__.last_error,
      bytes: n,
      action: t
    });
  }
  async disconnect(n = null) {
    await this.serialDisconnect(), V(this, F, oe).call(this, n);
  }
  async connect() {
    return new Promise((n, t) => {
      Na() || t("Web Serial not supported"), setTimeout(async () => {
        await Jn(499), await this.serialConnect(), this.isConnected ? n(`${this.typeDevice} device ${this.deviceNumber} connected`) : t(`${this.typeDevice} device ${this.deviceNumber} not connected`);
      }, 1);
    });
  }
  async serialDisconnect() {
    try {
      const n = this.__internal__.serial.reader, t = this.__internal__.serial.output_stream;
      n && (await n.cancel().catch((e) => this.serialErrors(e)), await this.__internal__.serial.input_done), t && (await t.getWriter().close(), await this.__internal__.serial.output_done), this.__internal__.serial.connected && this.__internal__.serial && this.__internal__.serial.port && await this.__internal__.serial.port.close();
    } catch (n) {
      this.serialErrors(n);
    } finally {
      this.__internal__.serial.reader = null, this.__internal__.serial.input_done = null, this.__internal__.serial.output_stream = null, this.__internal__.serial.output_done = null, this.__internal__.serial.connected = !1, this.__internal__.serial.port = null, k.$dispatchChange(this);
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
  async serialPortsSaved(n) {
    const t = this.serialFilters;
    if (this.__internal__.aux_port_connector < n.length) {
      const e = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = n[e];
    } else
      this.__internal__.aux_port_connector = 0, this.__internal__.serial.port = await navigator.serial.requestPort({
        filters: t
      });
    if (!this.__internal__.serial.port)
      throw new Error("Select another port please");
  }
  serialErrors(n) {
    const t = n.toString().toLowerCase();
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
        this.dispatch("serial:need-permission", {}), k.$dispatchChange(this);
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
        this.dispatch("serial:lost", {}), k.$dispatchChange(this);
        break;
      case t.includes("navigator.serial is undefined"):
        this.dispatch("serial:unsupported", {});
        break;
      default:
        console.error(n);
        break;
    }
    this.dispatch("serial:error", n);
  }
  async serialConnect() {
    try {
      this.dispatch("serial:connecting", {});
      const n = await V(this, F, Ai).call(this);
      if (n.length > 0)
        await this.serialPortsSaved(n);
      else {
        const i = this.serialFilters;
        this.__internal__.serial.port = await navigator.serial.requestPort({
          filters: i
        });
      }
      const t = this.__internal__.serial.port;
      if (!t)
        throw new Error("No port selected by the user");
      await t.open(this.serialConfigPort);
      const e = this;
      t.onconnect = (i) => {
        console.log(i), e.dispatch("serial:connected", i), k.$dispatchChange(this), e.__internal__.serial.queue.length > 0 && e.dispatch("internal:queue", {});
      }, t.ondisconnect = async () => {
        await e.disconnect();
      }, await Jn(this.__internal__.serial.delay_first_connection), this.__internal__.timeout.until_response = setTimeout(async () => {
        await e.timeout(e.__internal__.serial.bytes_connection ?? [], "connection:start");
      }, this.__internal__.time.response_connection), this.__internal__.serial.last_action = "connect", await V(this, F, hn).call(this, this.__internal__.serial.bytes_connection ?? []), this.dispatch("serial:sent", {
        action: "connect",
        bytes: this.__internal__.serial.bytes_connection
      }), this.__internal__.auto_response && V(this, F, It).call(this, this.__internal__.serial.auto_response, null), await V(this, F, Di).call(this);
    } catch (n) {
      this.serialErrors(n);
    }
  }
  async serialForget() {
    return await V(this, F, Ri).call(this);
  }
  decToHex(n) {
    return typeof n == "string" && (n = parseInt(n, 10)), n.toString(16);
  }
  hexToDec(n) {
    return parseInt(n, 16);
  }
  hexMaker(n = "00", t = 2) {
    return n.toString().padStart(t, "0").toLowerCase();
  }
  add0x(n) {
    const t = [];
    return n.forEach((e, i) => {
      t[i] = "0x" + e;
    }), t;
  }
  bytesToHex(n) {
    return this.add0x(Array.from(n, (t) => this.hexMaker(t)));
  }
  async appendToQueue(n, t) {
    const e = this.bytesToHex(n);
    if (["connect", "connection:start"].includes(t)) {
      if (this.__internal__.serial.connected) return;
      await this.serialConnect();
      return;
    }
    this.__internal__.serial.queue.push({ bytes: e, action: t }), this.dispatch("internal:queue", {});
  }
  serialSetConnectionConstant(n = 1) {
    throw new Error(`Method not implemented 'serialSetConnectionConstant' to listen on channel ${n}`);
  }
  serialMessage(n) {
    throw console.log(n), new Error("Method not implemented 'serialMessage'");
  }
  serialCorruptMessage(n, t) {
    throw console.log(n, t), new Error("Method not implemented 'serialCorruptMessage'");
  }
  clearSerialQueue() {
    this.__internal__.serial.queue = [];
  }
  sumHex(n) {
    let t = 0;
    return n.forEach((e) => {
      t += parseInt(e, 16);
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
    V(this, F, Bi).call(this), this.dispatch("serial:soft-reload", {});
  }
  async sendConnect() {
    if (!this.__internal__.serial.bytes_connection)
      throw new Error("No connection bytes defined");
    await this.appendToQueue(this.__internal__.serial.bytes_connection, "connect");
  }
  // @ts-expect-error code is required but can be empty
  async sendCustomCode({ code: n = [] } = { code: [] }) {
    if (n === null || n.length === 0)
      throw new Error("No data to send");
    await this.appendToQueue(n, "custom");
  }
  stringToArrayHex(n) {
    return Array.from(n).map((t) => t.charCodeAt(0).toString(16));
  }
  stringToArrayBuffer(n, t = `
`) {
    return this.parseStringToTextEncoder(n, t).buffer;
  }
  parseStringToTextEncoder(n = "", t = `
`) {
    const e = new TextEncoder();
    return n += t, e.encode(n);
  }
  parseStringToBytes(n = "", t = `
`) {
    const e = this.parseStringToTextEncoder(n, t);
    return Array.from(e).map((i) => i.toString(16));
  }
  parseUint8ToHex(n) {
    return Array.from(n).map((t) => t.toString(16));
  }
  parseHexToUint8(n) {
    return new Uint8Array(n.map((t) => parseInt(t, 16)));
  }
  stringArrayToUint8Array(n) {
    const t = [];
    return n.forEach((e) => {
      const i = e.replace("0x", "");
      t.push(parseInt(i, 16));
    }), new Uint8Array(t);
  }
  parseUint8ArrayToString(n) {
    const t = this.stringArrayToUint8Array(n);
    n = this.parseUint8ToHex(t);
    const e = n.map((i) => parseInt(i, 16));
    return this.__internal__.serial.response.replacer ? String.fromCharCode(...e).replace(this.__internal__.serial.response.replacer, "") : String.fromCharCode(...e);
  }
  hexToAscii(n) {
    const t = n.toString();
    let e = "";
    for (let i = 0; i < t.length; i += 2)
      e += String.fromCharCode(parseInt(t.substring(i, 2), 16));
    return e;
  }
  asciiToHex(n) {
    const t = [];
    for (let e = 0, i = n.length; e < i; e++) {
      const s = Number(n.charCodeAt(e)).toString(16);
      t.push(s);
    }
    return t.join("");
  }
  $checkAndDispatchConnection() {
    return this.isConnected;
  }
}
F = /* @__PURE__ */ new WeakSet(), Kt = function(r) {
  return !!(r && r.readable && r.writable);
}, oe = function(r = null) {
  this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector = 0, this.dispatch("serial:disconnected", r), k.$dispatchChange(this);
}, hn = async function(r) {
  const n = this.__internal__.serial.port;
  if (!n || n && (!n.readable || !n.writable))
    throw V(this, F, oe).call(this, { error: "Port is closed, not readable or writable." }), new Error("The port is closed or is not readable/writable");
  const t = this.stringArrayToUint8Array(r);
  if (n.writable === null) return;
  const e = n.writable.getWriter();
  await e.write(t), e.releaseLock();
}, It = function(r = [], n = null) {
  if (r && r.length > 0) {
    const t = this.__internal__.serial.connected;
    this.__internal__.serial.connected = V(this, F, Kt).call(this, this.__internal__.serial.port), k.$dispatchChange(this), !t && this.__internal__.serial.connected && this.dispatch("serial:connected"), this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0);
    const e = [];
    for (const i in r)
      e.push(r[i].toString().padStart(2, "0").toLowerCase());
    if (this.__internal__.serial.response.as === "hex")
      this.serialMessage(e);
    else if (this.__internal__.serial.response.as === "uint8")
      this.serialMessage(this.parseHexToUint8(this.add0x(e)));
    else if (this.__internal__.serial.response.as === "string")
      if (this.__internal__.serial.response.limiter !== null) {
        const i = this.parseUint8ArrayToString(this.add0x(e)).split(this.__internal__.serial.response.limiter);
        for (const s in i)
          i[s] && this.serialMessage(i[s]);
      } else
        this.serialMessage(this.parseUint8ArrayToString(this.add0x(e)));
    else {
      const i = this.stringToArrayBuffer(
        this.parseUint8ArrayToString(this.add0x(e))
      );
      this.serialMessage(i);
    }
  } else
    this.serialCorruptMessage(r, n);
  this.__internal__.serial.queue.length !== 0 && this.dispatch("internal:queue", {});
}, Ai = async function() {
  const r = this.serialFilters, n = await navigator.serial.getPorts({ filters: r });
  return r.length === 0 ? n : n.filter((t) => {
    const e = t.getInfo();
    return r.some((i) => e.usbProductId === i.usbProductId && e.usbVendorId === i.usbVendorId);
  }).filter((t) => !V(this, F, Kt).call(this, t));
}, Qn = function(r) {
  if (r) {
    const n = this.__internal__.serial.response.buffer, t = new Uint8Array(n.length + r.byteLength);
    t.set(n, 0), t.set(new Uint8Array(r), n.length), this.__internal__.serial.response.buffer = t;
  }
}, Zn = async function() {
  this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0), this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
    const r = [];
    for (const n in this.__internal__.serial.response.buffer)
      r.push(this.__internal__.serial.response.buffer[n].toString(16));
    this.__internal__.serial.response.buffer && V(this, F, It).call(this, r), this.__internal__.serial.response.buffer = new Uint8Array(0);
  }, 400);
}, Yn = async function() {
  if (this.__internal__.serial.response.length !== null) {
    if (this.__internal__.serial.response.length === this.__internal__.serial.response.buffer.length) {
      const r = [];
      for (const n in this.__internal__.serial.response.buffer)
        r.push(this.__internal__.serial.response.buffer[n].toString(16));
      V(this, F, It).call(this, r), this.__internal__.serial.response.buffer = new Uint8Array(0);
    } else if (this.__internal__.serial.response.length < this.__internal__.serial.response.buffer.length) {
      let r = new Uint8Array(0);
      for (let t = 0; t < this.__internal__.serial.response.length; t++)
        r[t] = this.__internal__.serial.response.buffer[t];
      if (r.length === this.__internal__.serial.response.length) {
        const t = [];
        for (const e in r)
          t.push(r[e].toString(16));
        V(this, F, It).call(this, t), this.__internal__.serial.response.buffer = new Uint8Array(0);
        return;
      }
      r = new Uint8Array(0);
      const n = this.__internal__.serial.response.length * 2;
      if (this.__internal__.serial.response.buffer.length === n) {
        for (let t = 14; t < n; t++)
          r[t - this.__internal__.serial.response.length] = this.__internal__.serial.response.buffer[t];
        if (r.length === this.__internal__.serial.response.length) {
          const t = [];
          for (const e in r)
            t.push(r[e].toString(16));
          V(this, F, It).call(this, t), this.__internal__.serial.response.buffer = new Uint8Array(0);
        }
      }
    }
  }
}, Di = async function() {
  const r = this.__internal__.serial.port;
  if (!r || !r.readable) throw new Error("Port is not readable");
  for (; r.readable && this.__internal__.serial.keep_reading; ) {
    const n = r.readable.getReader();
    this.__internal__.serial.reader = n;
    try {
      let t = !0;
      for (; t; ) {
        const { value: e, done: i } = await n.read();
        if (i) {
          n.releaseLock(), this.__internal__.serial.keep_reading = !1, t = !1;
          break;
        }
        V(this, F, Qn).call(this, e), this.__internal__.serial.response.length === null ? await V(this, F, Zn).call(this) : await V(this, F, Yn).call(this);
      }
    } catch (t) {
      this.serialErrors(t);
    } finally {
      n.releaseLock();
    }
  }
  this.__internal__.serial.keep_reading = !0, this.__internal__.serial.port && await this.__internal__.serial.port.close();
}, Ri = async function() {
  return typeof window > "u" ? !1 : "serial" in navigator && "forget" in SerialPort.prototype && this.__internal__.serial.port ? (await this.__internal__.serial.port.forget(), !0) : !1;
}, Ii = function() {
  [
    "serial:connected",
    "serial:connecting",
    "serial:reconnect",
    "serial:timeout",
    "serial:disconnected",
    "serial:sent",
    "serial:soft-reload",
    "serial:message",
    "unknown",
    "serial:need-permission",
    "serial:lost",
    "serial:unsupported",
    "serial:error",
    "debug"
  ].forEach((r) => {
    this.serialRegisterAvailableListener(r);
  });
}, Oi = function() {
  const r = this;
  this.on("internal:queue", async () => {
    var n;
    await V(n = r, F, ei).call(n);
  }), V(this, F, ti).call(this);
}, ti = function() {
  const r = this;
  navigator.serial.addEventListener("connect", async () => {
    r.isDisconnected && await r.serialConnect().catch(() => {
    });
  });
}, ei = async function() {
  if (!V(this, F, Kt).call(this, this.__internal__.serial.port)) {
    V(this, F, oe).call(this, { error: "Port is closed, not readable or writable." }), await this.serialConnect();
    return;
  }
  if (this.__internal__.timeout.until_response || this.__internal__.serial.queue.length === 0) return;
  const r = this.__internal__.serial.queue[0];
  let n = this.__internal__.time.response_general;
  r.action === "connect" && (n = this.__internal__.time.response_connection), this.__internal__.timeout.until_response = setTimeout(async () => {
    await this.timeout(r.bytes, r.action);
  }, n), this.__internal__.serial.last_action = r.action ?? "unknown", await V(this, F, hn).call(this, r.bytes), this.dispatch("serial:sent", {
    action: r.action,
    bytes: r.bytes
  }), this.__internal__.auto_response && V(this, F, It).call(this, this.__internal__.serial.auto_response, null);
  const t = [...this.__internal__.serial.queue];
  this.__internal__.serial.queue = t.splice(1);
}, Ni = function(r = 1) {
  this.__internal__.device_number = r, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(r);
}, Bi = function() {
  this.__internal__.last_error = {
    message: null,
    action: null,
    code: null,
    no_code: 0
  };
};
k.instance || (k.instance = new k());
const Ma = {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: [],
  arduino: [],
  pinpad: []
};
k.devices = { ...k.devices, ...Ma };
k.addCustom = (r, n) => {
  k.registerType(r), k.add(n);
};
k.getCustom = (r, n) => k.get(r, n);
k.getJofemarByUuid = (r) => k.get("jofemar", r);
k.getLockerByUuid = (r) => k.get("locker", r);
k.getRelayByUuid = (r) => k.get("relay", r);
k.getBoardroidByUuid = (r) => k.get("boardroid", r);
k.getArduinoByUuid = (r) => k.get("arduino", r);
k.getPinPadByUuid = (r) => k.get("pinpad", r);
k.getJofemar = (r = 1) => Object.values(k.devices.jofemar).find((t) => t.deviceNumber === r) ?? null;
k.getBoardroid = (r = 1) => Object.values(k.devices.boardroid).find((t) => t.deviceNumber === r) ?? null;
k.getLocker = (r = 1) => Object.values(k.devices.locker).find((t) => t.deviceNumber === r) ?? null;
k.getRelay = (r = 1) => Object.values(k.devices.relay).find((t) => t.deviceNumber === r) ?? null;
k.getArduino = (r = 1) => Object.values(k.devices.arduino).find((t) => t.deviceNumber === r) ?? null;
k.getPinPad = (r = 1) => Object.values(k.devices.pinpad).find((t) => t.deviceNumber === r) ?? null;
class Dt extends Ba {
  constructor(n) {
    super(n), this.__internal__ = structuredClone(this.__internal__), this.getResponseAsArrayHex(), this.__internal__.device.door_open = !1, this.__internal__.time.response_engines = 2e3, this.__internal__.time.sense = 100, this.__internal__.interval.waiting_sense = 0, this.__internal__.dispense = {
      must_response: !1,
      dispensing: !1,
      status: null,
      counter: 0,
      limit_counter: 20,
      custom_limit_counter: null,
      backup_dispense: {}
    };
  }
  get isDoorOpen() {
    return this.__internal__.device.door_open;
  }
  get isDispensing() {
    return this.__internal__.interval.waiting_sense || this.__internal__.dispense.dispensing;
  }
  async timeout(n, t) {
    await super.timeout(n, t), t === "dispense" && (this.__internal__.dispense.status = "no-response");
  }
  async serialPortsSaved(n) {
    const t = this.serialFilters;
    if (this.__internal__.aux_port_connector < n.length) {
      const e = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = n[e];
    } else
      this.__internal__.aux_port_connector = 0, this.__internal__.serial.port = await navigator.serial.requestPort({ filters: t });
    if (!this.__internal__.serial.port)
      throw new Error("Select another port please");
  }
  internalClearSensing() {
    this.__internal__.interval.waiting_sense && clearInterval(this.__internal__.interval.waiting_sense), this.__internal__.interval.waiting_sense = 0, this.__internal__.dispense.status = null, this.__internal__.dispense.counter = 0, this.__internal__.dispense.dispensing = !1;
  }
  internalDispensingProcess() {
    let n = this.__internal__.dispense.limit_counter;
    return this.__internal__.dispense.custom_limit_counter && (n = this.__internal__.dispense.custom_limit_counter), n += Math.ceil(n * 0.6), this.__internal__.dispense.counter >= n ? (this.internalClearSensing(), this.__internal__.dispense.status = !1, this.__internal__.dispense.dispensing = !1, !1) : (this.__internal__.dispense.counter = parseFloat((0.1 + this.__internal__.dispense.counter).toFixed(1)), this.__internal__.dispense.counter % 1 === 0 && this.dispatch("dispensing", {
      status: this.__internal__.dispense.status,
      counter: this.__internal__.dispense.counter,
      limit: n
    }), null);
  }
  async internalDispenseStatus() {
    if (this.__internal__.dispense.must_response && (await Ct(this.__internal__.time.response_engines + 10), this.__internal__.dispense.status === "no-response"))
      return this.internalClearSensing(), this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", { reason: "no-response" }), { status: !1, error: "no-response" };
    this.__internal__.dispense.status = null, this.__internal__.dispense.dispensing = !0, this.dispatch("internal:dispense:running", {});
    const n = this;
    return new Promise((t) => {
      this.__internal__.interval.waiting_sense = setInterval(() => {
        switch (n.__internal__.dispense.status) {
          case null:
            n.internalDispensingProcess() === !1 && (n.internalClearSensing(), n.dispatch("not-dispensed", { reason: "timeout" }), t({ status: !1, error: "timeout" }));
            break;
          case !0:
            n.internalClearSensing(), n.__internal__.dispense.status = !0, n.dispatch("dispensed", {}), t({ status: !0, error: null });
            break;
          case !1:
            n.internalClearSensing(), n.__internal__.dispense.status = !1, n.dispatch("not-dispensed", { reason: "no-stock" }), t({ status: !1, error: null });
            break;
          case "elevator-locked":
            n.internalClearSensing(), n.__internal__.dispense.status = !1, n.dispatch("not-dispensed", { reason: "elevator-locked" }), t({ status: !1, error: "elevator-locked" });
            break;
          case "no-response":
            n.internalClearSensing(), n.__internal__.dispense.status = !1, n.dispatch("not-dispensed", { reason: "no-response" }), t({ status: !1, error: "no-response" });
            break;
        }
      }, this.__internal__.time.sense);
    });
  }
  async internalDispense(n) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    if (!an.enable && !this.__internal__.serial.connected && (await this.serialConnect(), !this.__internal__.serial.connected))
      throw new Error("Serial device not connected");
    return this.__internal__.serial.queue.length === 0 ? (await this.appendToQueue(n, "dispense"), await this.internalDispenseStatus()) : new Promise((t) => {
      const e = setInterval(async () => {
        if (this.__internal__.serial.queue.length > 0) return;
        clearInterval(e), await this.appendToQueue(n, "dispense");
        const i = await this.internalDispenseStatus();
        t(i);
      }, 100);
    });
  }
  __emulate(n) {
    if (typeof n.code != "object") {
      console.error("Invalid data to make an emulation");
      return;
    }
    this.__internal__.serial.connected || (this.__internal__.serial.connected = !0, this.dispatch("serial:connected"), k.instance.dispatch("change"), this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0)), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0);
    const t = [];
    for (const e in n.code)
      t.push(n.code[e].toString().padStart(2, "0").toLowerCase());
    this.serialMessage(t);
  }
  /**
   * @deprecated Use listenOnChannel instead
   * @param {string|number} channel
   */
  set listenOnPort(n) {
    this.listenOnChannel = n;
  }
  /**
   * @deprecated Use listenOnChannel instead
   */
  get listenOnPort() {
    return this.__internal__.device.listen_on_port ?? 1;
  }
}
var he, Ve, Mi;
class Uc extends Dt {
  constructor({ filters: t = null, config_port: e = null, no_device: i = 1 } = {}) {
    super({ filters: t, config_port: e, no_device: i });
    G(this, Ve);
    G(this, he, {
      activate: ["A0", "01", "01", "A2"],
      deactivate: ["A0", "01", "00", "A1"]
    });
    if (this.__internal__.device.type = "relay", this.__internal__.auto_response = !0, k.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    o(this, Ve, Mi).call(this);
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
    const t = I(this, he).activate;
    t[3] = this.serialRelaySumHex(t), await this.appendToQueue(t, "relay:turn-on");
  }
  async turnOff() {
    const t = I(this, he).deactivate;
    t[3] = this.serialRelaySumHex(t), await this.appendToQueue(t, "relay:turn-off");
  }
  async toggle({ inverse: t = !1, ms: e = 300 } = {}) {
    const i = this;
    t ? (await i.turnOff(), await Ct(e), await i.turnOn()) : (await i.turnOn(), await Ct(e), await i.turnOff());
  }
}
he = new WeakMap(), Ve = new WeakSet(), Mi = function() {
  k.add(this);
};
var Y, z, Pt, R, Fi, Ui, Li, Vi, un, qi, Ot, Nt, ve, Ee, Pe;
class Lc extends Dt {
  constructor({ filters: t = null, config_port: e = null, no_device: i = 1, device_listen_on_port: s = 3 } = {}) {
    super({ filters: t, config_port: e, no_device: i, device_listen_on_port: s });
    G(this, R);
    G(this, Y, !1);
    G(this, z, 0);
    G(this, Pt, 0);
    if (this.__internal__.device.type = "locker", k.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.device.milliseconds = 666, this.__internal__.dispense.limit_counter = 1, o(this, R, Ui).call(this), o(this, R, Fi).call(this);
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
            e.name = "Cell closed.", e.description = "The selected cell is closed.", e.request = "dispense", e.no_code = 1102, this.__internal__.dispense.status = !1, this.dispatch("dispensed", {}), I(this, Y) && I(this, z) >= 89 ? (e.finished_test = !0, M(this, Y, !1), M(this, z, 0)) : I(this, Y) && (e.finished_test = !1);
            break;
          case "01":
          // cell open by status
          case "04":
            e.name = "Cell open.", e.description = "The selected cell was open successfully.", e.request = "dispense", e.no_code = 102, this.__internal__.dispense.status = !0, this.dispatch("dispensed", {}), I(this, Y) && I(this, z) >= 89 ? (e.finished_test = !0, M(this, Y, !1), M(this, z, 0)) : I(this, Y) && (e.finished_test = !1);
            break;
          case "05":
            e.name = "Cell inactive.", e.description = "The selected cell is inactive or doesn't exist.", e.request = "dispense", e.no_code = 101, this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", {}), I(this, Y) && I(this, z) >= 89 ? (e.finished_test = !0, M(this, Y, !1), M(this, z, 0)) : I(this, Y) && (e.finished_test = !1);
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
    t = o(this, R, Ot).call(this, t);
    const e = o(this, R, qi).call(this, t);
    return await this.internalDispense(e);
  }
  async status({ cell: t = 1 } = {}) {
    t = o(this, R, Ot).call(this, t);
    const e = o(this, R, Li).call(this, t);
    return await this.appendToQueue(e, "status");
  }
  async lightScan({ since: t = 0, until: e = 10 } = {}) {
    if (t < 0 || t > 10) throw new Error("Invalid since number");
    if (e < 0 || e > 10) throw new Error("Invalid until number");
    const i = o(this, R, Vi).call(this, t, e);
    return await this.appendToQueue(i, "light-scan");
  }
  async enable({ cell: t = 1 } = {}) {
    t = o(this, R, Ot).call(this, t);
    const [e, i] = this.parseCellToColumnRow(t), s = o(this, R, un).call(this, { enable: !0, column: e, row: i });
    await this.appendToQueue(s, "activate");
  }
  async disable({ cell: t = 1 } = {}) {
    t = o(this, R, Ot).call(this, t);
    const [e, i] = this.parseCellToColumnRow(t), s = o(this, R, un).call(this, { enable: !1, column: e, row: i });
    await this.appendToQueue(s, "disable");
  }
  async openAll() {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    o(this, R, Nt).call(this), M(this, Y, !0), o(this, R, ve).call(this);
    const t = [];
    for (let e = 1; e <= 90; e++) {
      const i = await this.dispense(e);
      t.push(i), M(this, z, e), o(this, R, ve).call(this);
    }
    M(this, z, 90), o(this, R, ve).call(this, t), o(this, R, Nt).call(this);
  }
  async enableAll() {
    o(this, R, Nt).call(this), M(this, Y, !0), o(this, R, Ee).call(this);
    for (let t = 1; t <= 90; t++)
      await this.enable(t), M(this, z, t), o(this, R, Ee).call(this);
    M(this, z, 90), o(this, R, Ee).call(this), o(this, R, Nt).call(this);
  }
  async disableAll() {
    o(this, R, Nt).call(this), M(this, Y, !0), o(this, R, Pe).call(this);
    for (let t = 1; t <= 90; t++)
      await this.enable(t), M(this, z, t), o(this, R, Pe).call(this);
    M(this, z, 90), o(this, R, Pe).call(this), o(this, R, Nt).call(this);
  }
}
Y = new WeakMap(), z = new WeakMap(), Pt = new WeakMap(), R = new WeakSet(), Fi = function() {
  const t = ["percentage:disable", "percentage:enable", "percentage:open"];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, Ui = function() {
  k.add(this);
}, Li = function(t = 1) {
  return t = o(this, R, Ot).call(this, t), this.serialLockerHexCmd(new Uint8Array([16, this.__internal__.device.listen_on_port, t]));
}, Vi = function(t = 0, e = 10) {
  return this.serialLockerHexCmd(new Uint8Array([32, this.__internal__.device.listen_on_port, t, e]));
}, un = function({ enable: t = !0, column: e = 0, row: i = 10 } = {}) {
  if (e < 0 || e > 8) throw new Error("Invalid column number");
  if (i < 0 || i > 10) throw new Error("Invalid row number");
  let s = 1;
  return t || (s = 0), this.serialLockerHexCmd(new Uint8Array([48, this.__internal__.device.listen_on_port, e, i, s]));
}, qi = function(t = 1) {
  t = o(this, R, Ot).call(this, t);
  const e = this.__internal__.device.milliseconds, i = e % 256, s = Math.floor(e / 3) % 256;
  return this.serialLockerHexCmd(
    new Uint8Array([64, this.__internal__.device.listen_on_port, t, i, s])
  );
}, Ot = function(t) {
  const e = parseInt(t);
  if (isNaN(e) || e < 1 || e > 90) throw new Error("Invalid cell number");
  return e;
}, Nt = function() {
  M(this, Y, !1), M(this, z, 0), M(this, Pt, 0);
}, ve = function(t = null) {
  M(this, Pt, Math.round(I(this, z) * 100 / 90)), this.dispatch("percentage:open", { percentage: I(this, Pt), dispensed: t });
}, Ee = function() {
  M(this, Pt, Math.round(I(this, z) * 100 / 90)), this.dispatch("percentage:enable", { percentage: I(this, Pt) });
}, Pe = function() {
  M(this, Pt, Math.round(I(this, z) * 100 / 90)), this.dispatch("percentage:disable", { percentage: I(this, Pt) });
};
var Fa = "0123456789abcdefghijklmnopqrstuvwxyz";
function St(r) {
  return Fa.charAt(r);
}
function Ua(r, n) {
  return r & n;
}
function _e(r, n) {
  return r | n;
}
function ni(r, n) {
  return r ^ n;
}
function ii(r, n) {
  return r & ~n;
}
function La(r) {
  if (r == 0)
    return -1;
  var n = 0;
  return (r & 65535) == 0 && (r >>= 16, n += 16), (r & 255) == 0 && (r >>= 8, n += 8), (r & 15) == 0 && (r >>= 4, n += 4), (r & 3) == 0 && (r >>= 2, n += 2), (r & 1) == 0 && ++n, n;
}
function Va(r) {
  for (var n = 0; r != 0; )
    r &= r - 1, ++n;
  return n;
}
var jt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ji = "=";
function Fe(r) {
  var n, t, e = "";
  for (n = 0; n + 3 <= r.length; n += 3)
    t = parseInt(r.substring(n, n + 3), 16), e += jt.charAt(t >> 6) + jt.charAt(t & 63);
  for (n + 1 == r.length ? (t = parseInt(r.substring(n, n + 1), 16), e += jt.charAt(t << 2)) : n + 2 == r.length && (t = parseInt(r.substring(n, n + 2), 16), e += jt.charAt(t >> 2) + jt.charAt((t & 3) << 4)); (e.length & 3) > 0; )
    e += ji;
  return e;
}
function ri(r) {
  var n = "", t, e = 0, i = 0;
  for (t = 0; t < r.length && r.charAt(t) != ji; ++t) {
    var s = jt.indexOf(r.charAt(t));
    s < 0 || (e == 0 ? (n += St(s >> 2), i = s & 3, e = 1) : e == 1 ? (n += St(i << 2 | s >> 4), i = s & 15, e = 2) : e == 2 ? (n += St(i), n += St(s >> 2), i = s & 3, e = 3) : (n += St(i << 2 | s >> 4), n += St(s & 15), e = 0));
  }
  return e == 1 && (n += St(i << 2)), n;
}
var Vt, qa = {
  decode: function(r) {
    var n;
    if (Vt === void 0) {
      var t = "0123456789ABCDEF", e = ` \f
\r	 \u2028\u2029`;
      for (Vt = {}, n = 0; n < 16; ++n)
        Vt[t.charAt(n)] = n;
      for (t = t.toLowerCase(), n = 10; n < 16; ++n)
        Vt[t.charAt(n)] = n;
      for (n = 0; n < e.length; ++n)
        Vt[e.charAt(n)] = -1;
    }
    var i = [], s = 0, a = 0;
    for (n = 0; n < r.length; ++n) {
      var c = r.charAt(n);
      if (c == "=")
        break;
      if (c = Vt[c], c != -1) {
        if (c === void 0)
          throw new Error("Illegal character at offset " + n);
        s |= c, ++a >= 2 ? (i[i.length] = s, s = 0, a = 0) : s <<= 4;
      }
    }
    if (a)
      throw new Error("Hex encoding incomplete: 4 bits missing");
    return i;
  }
}, Rt, dn = {
  decode: function(r) {
    var n;
    if (Rt === void 0) {
      var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = `= \f
\r	 \u2028\u2029`;
      for (Rt = /* @__PURE__ */ Object.create(null), n = 0; n < 64; ++n)
        Rt[t.charAt(n)] = n;
      for (Rt["-"] = 62, Rt._ = 63, n = 0; n < e.length; ++n)
        Rt[e.charAt(n)] = -1;
    }
    var i = [], s = 0, a = 0;
    for (n = 0; n < r.length; ++n) {
      var c = r.charAt(n);
      if (c == "=")
        break;
      if (c = Rt[c], c != -1) {
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
    var n = dn.re.exec(r);
    if (n)
      if (n[1])
        r = n[1];
      else if (n[2])
        r = n[2];
      else
        throw new Error("RegExp out of sync");
    return dn.decode(r);
  }
}, qt = 1e13, te = (
  /** @class */
  function() {
    function r(n) {
      this.buf = [+n || 0];
    }
    return r.prototype.mulAdd = function(n, t) {
      var e = this.buf, i = e.length, s, a;
      for (s = 0; s < i; ++s)
        a = e[s] * n + t, a < qt ? t = 0 : (t = 0 | a / qt, a -= t * qt), e[s] = a;
      t > 0 && (e[s] = t);
    }, r.prototype.sub = function(n) {
      var t = this.buf, e = t.length, i, s;
      for (i = 0; i < e; ++i)
        s = t[i] - n, s < 0 ? (s += qt, n = 1) : n = 0, t[i] = s;
      for (; t[t.length - 1] === 0; )
        t.pop();
    }, r.prototype.toString = function(n) {
      if ((n || 10) != 10)
        throw new Error("only base 10 is supported");
      for (var t = this.buf, e = t[t.length - 1].toString(), i = t.length - 2; i >= 0; --i)
        e += (qt + t[i]).toString().substring(1);
      return e;
    }, r.prototype.valueOf = function() {
      for (var n = this.buf, t = 0, e = n.length - 1; e >= 0; --e)
        t = t * qt + n[e];
      return t;
    }, r.prototype.simplify = function() {
      var n = this.buf;
      return n.length == 1 ? n[0] : this;
    }, r;
  }()
), Hi = "…", ja = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, Ha = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function Wt(r, n) {
  return r.length > n && (r = r.substring(0, n) + Hi), r;
}
var Ze = (
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
      var i = this.parseStringISO(n, t), s = (e ? ja : Ha).exec(i);
      return s ? (e && (s[1] = +s[1], s[1] += +s[1] < 70 ? 2e3 : 1900), i = s[1] + "-" + s[2] + "-" + s[3] + " " + s[4], s[5] && (i += ":" + s[5], s[6] && (i += ":" + s[6], s[7] && (i += "." + s[7]))), s[8] && (i += " UTC", s[8] != "Z" && (i += s[8], s[9] && (i += ":" + s[9]))), i) : "Unrecognized time: " + i;
    }, r.prototype.parseInteger = function(n, t) {
      for (var e = this.get(n), i = e > 127, s = i ? 255 : 0, a, c = ""; e == s && ++n < t; )
        e = this.get(n);
      if (a = t - n, a === 0)
        return i ? -1 : 0;
      if (a > 4) {
        for (c = e, a <<= 3; ((+c ^ s) & 128) == 0; )
          c = +c << 1, --a;
        c = "(" + a + ` bit)
`;
      }
      i && (e = e - 256);
      for (var l = new te(e), h = n + 1; h < t; ++h)
        l.mulAdd(256, this.get(h));
      return c + l.toString();
    }, r.prototype.parseBitString = function(n, t, e) {
      for (var i = this.get(n), s = (t - n - 1 << 3) - i, a = "(" + s + ` bit)
`, c = "", l = n + 1; l < t; ++l) {
        for (var h = this.get(l), p = l == t - 1 ? i : 0, f = 7; f >= p; --f)
          c += h >> f & 1 ? "1" : "0";
        if (c.length > e)
          return a + Wt(c, e);
      }
      return a + c;
    }, r.prototype.parseOctetString = function(n, t, e) {
      if (this.isASCII(n, t))
        return Wt(this.parseStringISO(n, t), e);
      var i = t - n, s = "(" + i + ` byte)
`;
      e /= 2, i > e && (t = n + e);
      for (var a = n; a < t; ++a)
        s += this.hexByte(this.get(a));
      return i > e && (s += Hi), s;
    }, r.prototype.parseOID = function(n, t, e) {
      for (var i = "", s = new te(), a = 0, c = n; c < t; ++c) {
        var l = this.get(c);
        if (s.mulAdd(128, l & 127), a += 7, !(l & 128)) {
          if (i === "")
            if (s = s.simplify(), s instanceof te)
              s.sub(80), i = "2." + s.toString();
            else {
              var h = s < 80 ? s < 40 ? 0 : 1 : 2;
              i = h + "." + (s - h * 40);
            }
          else
            i += "." + s.toString();
          if (i.length > e)
            return Wt(i, e);
          s = new te(), a = 0;
        }
      }
      return a > 0 && (i += ".incomplete"), i;
    }, r;
  }()
), Ka = (
  /** @class */
  function() {
    function r(n, t, e, i, s) {
      if (!(i instanceof si))
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
          return Wt(this.stream.parseStringUTF(t, t + e), n);
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
          return Wt(this.stream.parseStringISO(t, t + e), n);
        case 30:
          return Wt(this.stream.parseStringBMP(t, t + e), n);
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
      n instanceof Ze ? t = n : t = new Ze(n, 0);
      var e = new Ze(t), i = new si(t), s = r.decodeLength(t), a = t.pos, c = a - e.pos, l = null, h = function() {
        var f = [];
        if (s !== null) {
          for (var b = a + s; t.pos < b; )
            f[f.length] = r.decode(t);
          if (t.pos != b)
            throw new Error("Content size is not correct for container starting at offset " + a);
        } else
          try {
            for (; ; ) {
              var E = r.decode(t);
              if (E.tag.isEOC())
                break;
              f[f.length] = E;
            }
            s = a - t.pos;
          } catch (v) {
            throw new Error("Exception while decoding undefined length content: " + v);
          }
        return f;
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
), si = (
  /** @class */
  function() {
    function r(n) {
      var t = n.get();
      if (this.tagClass = t >> 6, this.tagConstructed = (t & 32) !== 0, this.tagNumber = t & 31, this.tagNumber == 31) {
        var e = new te();
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
), At, Wa = 244837814094590, ai = (Wa & 16777215) == 15715070, et = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], $a = (1 << 26) / et[et.length - 1], D = (
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
        for (l < this.DB && (i = this[c] >> l) > 0 && (s = !0, a = St(i)); c >= 0; )
          l < t ? (i = (this[c] & (1 << l) - 1) << t - l, i |= this[--c] >> (l += this.DB - t)) : (i = this[c] >> (l -= t) & e, l <= 0 && (l += this.DB, --c)), i > 0 && (s = !0), s && (a += St(i));
      return s ? a : "0";
    }, r.prototype.negate = function() {
      var n = O();
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
      return this.t <= 0 ? 0 : this.DB * (this.t - 1) + fe(this[this.t - 1] ^ this.s & this.DM);
    }, r.prototype.mod = function(n) {
      var t = O();
      return this.abs().divRemTo(n, null, t), this.s < 0 && t.compareTo(r.ZERO) > 0 && n.subTo(t, t), t;
    }, r.prototype.modPowInt = function(n, t) {
      var e;
      return n < 256 || t.isEven() ? e = new oi(t) : e = new ci(t), this.exp(n, e);
    }, r.prototype.clone = function() {
      var n = O();
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
          e < 8 ? (i = (this[n] & (1 << e) - 1) << 8 - e, i |= this[--n] >> (e += this.DB - 8)) : (i = this[n] >> (e -= 8) & 255, e <= 0 && (e += this.DB, --n)), (i & 128) != 0 && (i |= -256), s == 0 && (this.s & 128) != (i & 128) && ++s, (s > 0 || i != this.s) && (t[s++] = i);
      return t;
    }, r.prototype.equals = function(n) {
      return this.compareTo(n) == 0;
    }, r.prototype.min = function(n) {
      return this.compareTo(n) < 0 ? this : n;
    }, r.prototype.max = function(n) {
      return this.compareTo(n) > 0 ? this : n;
    }, r.prototype.and = function(n) {
      var t = O();
      return this.bitwiseTo(n, Ua, t), t;
    }, r.prototype.or = function(n) {
      var t = O();
      return this.bitwiseTo(n, _e, t), t;
    }, r.prototype.xor = function(n) {
      var t = O();
      return this.bitwiseTo(n, ni, t), t;
    }, r.prototype.andNot = function(n) {
      var t = O();
      return this.bitwiseTo(n, ii, t), t;
    }, r.prototype.not = function() {
      for (var n = O(), t = 0; t < this.t; ++t)
        n[t] = this.DM & ~this[t];
      return n.t = this.t, n.s = ~this.s, n;
    }, r.prototype.shiftLeft = function(n) {
      var t = O();
      return n < 0 ? this.rShiftTo(-n, t) : this.lShiftTo(n, t), t;
    }, r.prototype.shiftRight = function(n) {
      var t = O();
      return n < 0 ? this.lShiftTo(-n, t) : this.rShiftTo(n, t), t;
    }, r.prototype.getLowestSetBit = function() {
      for (var n = 0; n < this.t; ++n)
        if (this[n] != 0)
          return n * this.DB + La(this[n]);
      return this.s < 0 ? this.t * this.DB : -1;
    }, r.prototype.bitCount = function() {
      for (var n = 0, t = this.s & this.DM, e = 0; e < this.t; ++e)
        n += Va(this[e] ^ t);
      return n;
    }, r.prototype.testBit = function(n) {
      var t = Math.floor(n / this.DB);
      return t >= this.t ? this.s != 0 : (this[t] & 1 << n % this.DB) != 0;
    }, r.prototype.setBit = function(n) {
      return this.changeBit(n, _e);
    }, r.prototype.clearBit = function(n) {
      return this.changeBit(n, ii);
    }, r.prototype.flipBit = function(n) {
      return this.changeBit(n, ni);
    }, r.prototype.add = function(n) {
      var t = O();
      return this.addTo(n, t), t;
    }, r.prototype.subtract = function(n) {
      var t = O();
      return this.subTo(n, t), t;
    }, r.prototype.multiply = function(n) {
      var t = O();
      return this.multiplyTo(n, t), t;
    }, r.prototype.divide = function(n) {
      var t = O();
      return this.divRemTo(n, t, null), t;
    }, r.prototype.remainder = function(n) {
      var t = O();
      return this.divRemTo(n, null, t), t;
    }, r.prototype.divideAndRemainder = function(n) {
      var t = O(), e = O();
      return this.divRemTo(n, t, e), [t, e];
    }, r.prototype.modPow = function(n, t) {
      var e = n.bitLength(), i, s = kt(1), a;
      if (e <= 0)
        return s;
      e < 18 ? i = 1 : e < 48 ? i = 3 : e < 144 ? i = 4 : e < 768 ? i = 5 : i = 6, e < 8 ? a = new oi(t) : t.isEven() ? a = new Ga(t) : a = new ci(t);
      var c = [], l = 3, h = i - 1, p = (1 << i) - 1;
      if (c[1] = a.convert(this), i > 1) {
        var f = O();
        for (a.sqrTo(c[1], f); l <= p; )
          c[l] = O(), a.mulTo(f, c[l - 2], c[l]), l += 2;
      }
      var b = n.t - 1, E, v = !0, S = O(), T;
      for (e = fe(n[b]) - 1; b >= 0; ) {
        for (e >= h ? E = n[b] >> e - h & p : (E = (n[b] & (1 << e + 1) - 1) << h - e, b > 0 && (E |= n[b - 1] >> this.DB + e - h)), l = i; (E & 1) == 0; )
          E >>= 1, --l;
        if ((e -= l) < 0 && (e += this.DB, --b), v)
          c[E].copyTo(s), v = !1;
        else {
          for (; l > 1; )
            a.sqrTo(s, S), a.sqrTo(S, s), l -= 2;
          l > 0 ? a.sqrTo(s, S) : (T = s, s = S, S = T), a.mulTo(S, c[E], s);
        }
        for (; b >= 0 && (n[b] & 1 << e) == 0; )
          a.sqrTo(s, S), T = s, s = S, S = T, --e < 0 && (e = this.DB - 1, --b);
      }
      return a.revert(s);
    }, r.prototype.modInverse = function(n) {
      var t = n.isEven();
      if (this.isEven() && t || n.signum() == 0)
        return r.ZERO;
      for (var e = n.clone(), i = this.clone(), s = kt(1), a = kt(0), c = kt(0), l = kt(1); e.signum() != 0; ) {
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
      return this.exp(n, new za());
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
        for (var i = et[t], s = t + 1; s < et.length && i < $a; )
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
        var c = e == 8 ? +n[i] & 255 : hi(n, i);
        if (c < 0) {
          n.charAt(i) == "-" && (s = !0);
          continue;
        }
        s = !1, a == 0 ? this[this.t++] = c : a + e > this.DB ? (this[this.t - 1] |= (c & (1 << this.DB - a) - 1) << a, this[this.t++] = c >> this.DB - a) : this[this.t - 1] |= c << a, a += e, a >= this.DB && (a -= this.DB);
      }
      e == 8 && (+n[0] & 128) != 0 && (this.s = -1, a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)), this.clamp(), s && r.ZERO.subTo(this, this);
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
        e == null && (e = O());
        var a = O(), c = this.s, l = n.s, h = this.DB - fe(i[i.t - 1]);
        h > 0 ? (i.lShiftTo(h, a), s.lShiftTo(h, e)) : (i.copyTo(a), s.copyTo(e));
        var p = a.t, f = a[p - 1];
        if (f != 0) {
          var b = f * (1 << this.F1) + (p > 1 ? a[p - 2] >> this.F2 : 0), E = this.FV / b, v = (1 << this.F1) / b, S = 1 << this.F2, T = e.t, q = T - p, U = t ?? O();
          for (a.dlShiftTo(q, U), e.compareTo(U) >= 0 && (e[e.t++] = 1, e.subTo(U, e)), r.ONE.dlShiftTo(p, U), U.subTo(a, a); a.t < p; )
            a[a.t++] = 0;
          for (; --q >= 0; ) {
            var H = e[--T] == f ? this.DM : Math.floor(e[T] * E + (e[T - 1] + S) * v);
            if ((e[T] += a.am(0, H, e, q, 0, p)) < H)
              for (a.dlShiftTo(q, U), e.subTo(U, e); e[T] < --H; )
                e.subTo(U, e);
          }
          t != null && (e.drShiftTo(p, t), c != l && r.ZERO.subTo(t, t)), e.t = p, e.clamp(), h > 0 && e.rShiftTo(h, e), c < 0 && r.ZERO.subTo(e, e);
        }
      }
    }, r.prototype.invDigit = function() {
      if (this.t < 1)
        return 0;
      var n = this[0];
      if ((n & 1) == 0)
        return 0;
      var t = n & 3;
      return t = t * (2 - (n & 15) * t) & 15, t = t * (2 - (n & 255) * t) & 255, t = t * (2 - ((n & 65535) * t & 65535)) & 65535, t = t * (2 - n * t % this.DV) % this.DV, t > 0 ? this.DV - t : -t;
    }, r.prototype.isEven = function() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    }, r.prototype.exp = function(n, t) {
      if (n > 4294967295 || n < 1)
        return r.ONE;
      var e = O(), i = O(), s = t.convert(this), a = fe(n) - 1;
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
      var t = this.chunkSize(n), e = Math.pow(n, t), i = kt(e), s = O(), a = O(), c = "";
      for (this.divRemTo(i, s, a); s.signum() > 0; )
        c = (e + a.intValue()).toString(n).substr(1) + c, s.divRemTo(i, s, a);
      return a.intValue().toString(n) + c;
    }, r.prototype.fromRadix = function(n, t) {
      this.fromInt(0), t == null && (t = 10);
      for (var e = this.chunkSize(t), i = Math.pow(t, e), s = !1, a = 0, c = 0, l = 0; l < n.length; ++l) {
        var h = hi(n, l);
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
          for (this.fromNumber(n, e), this.testBit(n - 1) || this.bitwiseTo(r.ONE.shiftLeft(n - 1), _e, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(t); )
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
      for (var s = O(), a = 0; a < n; ++a) {
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
      var n = O();
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
          this.fromNumber(n, e), this.testBit(n - 1) || this.bitwiseTo(r.ONE.shiftLeft(n - 1), _e, this), this.isEven() && this.dAddOffset(1, 0);
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
), za = (
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
), oi = (
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
), ci = (
  /** @class */
  function() {
    function r(n) {
      this.m = n, this.mp = n.invDigit(), this.mpl = this.mp & 32767, this.mph = this.mp >> 15, this.um = (1 << n.DB - 15) - 1, this.mt2 = 2 * n.t;
    }
    return r.prototype.convert = function(n) {
      var t = O();
      return n.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), n.s < 0 && t.compareTo(D.ZERO) > 0 && this.m.subTo(t, t), t;
    }, r.prototype.revert = function(n) {
      var t = O();
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
), Ga = (
  /** @class */
  function() {
    function r(n) {
      this.m = n, this.r2 = O(), this.q3 = O(), D.ONE.dlShiftTo(2 * n.t, this.r2), this.mu = this.r2.divide(n);
    }
    return r.prototype.convert = function(n) {
      if (n.s < 0 || n.t > 2 * this.m.t)
        return n.mod(this.m);
      if (n.compareTo(this.m) < 0)
        return n;
      var t = O();
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
function O() {
  return new D(null);
}
function K(r, n) {
  return new D(r, n);
}
var li = typeof navigator < "u";
li && ai && navigator.appName == "Microsoft Internet Explorer" ? (D.prototype.am = function(n, t, e, i, s, a) {
  for (var c = t & 32767, l = t >> 15; --a >= 0; ) {
    var h = this[n] & 32767, p = this[n++] >> 15, f = l * h + p * c;
    h = c * h + ((f & 32767) << 15) + e[i] + (s & 1073741823), s = (h >>> 30) + (f >>> 15) + l * p + (s >>> 30), e[i++] = h & 1073741823;
  }
  return s;
}, At = 30) : li && ai && navigator.appName != "Netscape" ? (D.prototype.am = function(n, t, e, i, s, a) {
  for (; --a >= 0; ) {
    var c = t * this[n++] + e[i] + s;
    s = Math.floor(c / 67108864), e[i++] = c & 67108863;
  }
  return s;
}, At = 26) : (D.prototype.am = function(n, t, e, i, s, a) {
  for (var c = t & 16383, l = t >> 14; --a >= 0; ) {
    var h = this[n] & 16383, p = this[n++] >> 14, f = l * h + p * c;
    h = c * h + ((f & 16383) << 14) + e[i] + s, s = (h >> 28) + (f >> 14) + l * p, e[i++] = h & 268435455;
  }
  return s;
}, At = 28);
D.prototype.DB = At;
D.prototype.DM = (1 << At) - 1;
D.prototype.DV = 1 << At;
var jn = 52;
D.prototype.FV = Math.pow(2, jn);
D.prototype.F1 = jn - At;
D.prototype.F2 = 2 * At - jn;
var qe = [], Xt, pt;
Xt = 48;
for (pt = 0; pt <= 9; ++pt)
  qe[Xt++] = pt;
Xt = 97;
for (pt = 10; pt < 36; ++pt)
  qe[Xt++] = pt;
Xt = 65;
for (pt = 10; pt < 36; ++pt)
  qe[Xt++] = pt;
function hi(r, n) {
  var t = qe[r.charCodeAt(n)];
  return t ?? -1;
}
function kt(r) {
  var n = O();
  return n.fromInt(r), n;
}
function fe(r) {
  var n = 1, t;
  return (t = r >>> 16) != 0 && (r = t, n += 16), (t = r >> 8) != 0 && (r = t, n += 8), (t = r >> 4) != 0 && (r = t, n += 4), (t = r >> 2) != 0 && (r = t, n += 2), (t = r >> 1) != 0 && (r = t, n += 1), n;
}
D.ZERO = kt(0);
D.ONE = kt(1);
var Xa = (
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
function Ja() {
  return new Xa();
}
var Ki = 256, ge, xt = null, bt;
if (xt == null) {
  xt = [], bt = 0;
  var ye = void 0;
  if (typeof window < "u" && window.crypto && window.crypto.getRandomValues) {
    var Ye = new Uint32Array(256);
    for (window.crypto.getRandomValues(Ye), ye = 0; ye < Ye.length; ++ye)
      xt[bt++] = Ye[ye] & 255;
  }
  var be = 0, me = function(r) {
    if (be = be || 0, be >= 256 || bt >= Ki) {
      window.removeEventListener ? window.removeEventListener("mousemove", me, !1) : window.detachEvent && window.detachEvent("onmousemove", me);
      return;
    }
    try {
      var n = r.x + r.y;
      xt[bt++] = n & 255, be += 1;
    } catch {
    }
  };
  typeof window < "u" && (window.addEventListener ? window.addEventListener("mousemove", me, !1) : window.attachEvent && window.attachEvent("onmousemove", me));
}
function Qa() {
  if (ge == null) {
    for (ge = Ja(); bt < Ki; ) {
      var r = Math.floor(65536 * Math.random());
      xt[bt++] = r & 255;
    }
    for (ge.init(xt), bt = 0; bt < xt.length; ++bt)
      xt[bt] = 0;
    bt = 0;
  }
  return ge.next();
}
var pn = (
  /** @class */
  function() {
    function r() {
    }
    return r.prototype.nextBytes = function(n) {
      for (var t = 0; t < n.length; ++t)
        n[t] = Qa();
    }, r;
  }()
);
function Za(r, n) {
  if (n < r.length + 22)
    return console.error("Message too long for RSA"), null;
  for (var t = n - r.length - 6, e = "", i = 0; i < t; i += 2)
    e += "ff";
  var s = "0001" + e + "00" + r;
  return K(s, 16);
}
function Ya(r, n) {
  if (n < r.length + 11)
    return console.error("Message too long for RSA"), null;
  for (var t = [], e = r.length - 1; e >= 0 && n > 0; ) {
    var i = r.charCodeAt(e--);
    i < 128 ? t[--n] = i : i > 127 && i < 2048 ? (t[--n] = i & 63 | 128, t[--n] = i >> 6 | 192) : (t[--n] = i & 63 | 128, t[--n] = i >> 6 & 63 | 128, t[--n] = i >> 12 | 224);
  }
  t[--n] = 0;
  for (var s = new pn(), a = []; n > 2; ) {
    for (a[0] = 0; a[0] == 0; )
      s.nextBytes(a);
    t[--n] = a[0];
  }
  return t[--n] = 2, t[--n] = 0, new D(t);
}
var to = (
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
      n != null && t != null && n.length > 0 && t.length > 0 ? (this.n = K(n, 16), this.e = parseInt(t, 16)) : console.error("Invalid RSA public key");
    }, r.prototype.encrypt = function(n) {
      var t = this.n.bitLength() + 7 >> 3, e = Ya(n, t);
      if (e == null)
        return null;
      var i = this.doPublic(e);
      if (i == null)
        return null;
      for (var s = i.toString(16), a = s.length, c = 0; c < t * 2 - a; c++)
        s = "0" + s;
      return s;
    }, r.prototype.setPrivate = function(n, t, e) {
      n != null && t != null && n.length > 0 && t.length > 0 ? (this.n = K(n, 16), this.e = parseInt(t, 16), this.d = K(e, 16)) : console.error("Invalid RSA private key");
    }, r.prototype.setPrivateEx = function(n, t, e, i, s, a, c, l) {
      n != null && t != null && n.length > 0 && t.length > 0 ? (this.n = K(n, 16), this.e = parseInt(t, 16), this.d = K(e, 16), this.p = K(i, 16), this.q = K(s, 16), this.dmp1 = K(a, 16), this.dmq1 = K(c, 16), this.coeff = K(l, 16)) : console.error("Invalid RSA private key");
    }, r.prototype.generate = function(n, t) {
      var e = new pn(), i = n >> 1;
      this.e = parseInt(t, 16);
      for (var s = new D(t, 16); ; ) {
        for (; this.p = new D(n - i, 1, e), !(this.p.subtract(D.ONE).gcd(s).compareTo(D.ONE) == 0 && this.p.isProbablePrime(10)); )
          ;
        for (; this.q = new D(i, 1, e), !(this.q.subtract(D.ONE).gcd(s).compareTo(D.ONE) == 0 && this.q.isProbablePrime(10)); )
          ;
        if (this.p.compareTo(this.q) <= 0) {
          var a = this.p;
          this.p = this.q, this.q = a;
        }
        var c = this.p.subtract(D.ONE), l = this.q.subtract(D.ONE), h = c.multiply(l);
        if (h.gcd(s).compareTo(D.ONE) == 0) {
          this.n = this.p.multiply(this.q), this.d = s.modInverse(h), this.dmp1 = this.d.mod(c), this.dmq1 = this.d.mod(l), this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    }, r.prototype.decrypt = function(n) {
      var t = K(n, 16), e = this.doPrivate(t);
      return e == null ? null : eo(e, this.n.bitLength() + 7 >> 3);
    }, r.prototype.generateAsync = function(n, t, e) {
      var i = new pn(), s = n >> 1;
      this.e = parseInt(t, 16);
      var a = new D(t, 16), c = this, l = function() {
        var h = function() {
          if (c.p.compareTo(c.q) <= 0) {
            var b = c.p;
            c.p = c.q, c.q = b;
          }
          var E = c.p.subtract(D.ONE), v = c.q.subtract(D.ONE), S = E.multiply(v);
          S.gcd(a).compareTo(D.ONE) == 0 ? (c.n = c.p.multiply(c.q), c.d = a.modInverse(S), c.dmp1 = c.d.mod(E), c.dmq1 = c.d.mod(v), c.coeff = c.q.modInverse(c.p), setTimeout(function() {
            e();
          }, 0)) : setTimeout(l, 0);
        }, p = function() {
          c.q = O(), c.q.fromNumberAsync(s, 1, i, function() {
            c.q.subtract(D.ONE).gcda(a, function(b) {
              b.compareTo(D.ONE) == 0 && c.q.isProbablePrime(10) ? setTimeout(h, 0) : setTimeout(p, 0);
            });
          });
        }, f = function() {
          c.p = O(), c.p.fromNumberAsync(n - s, 1, i, function() {
            c.p.subtract(D.ONE).gcda(a, function(b) {
              b.compareTo(D.ONE) == 0 && c.p.isProbablePrime(10) ? setTimeout(p, 0) : setTimeout(f, 0);
            });
          });
        };
        setTimeout(f, 0);
      };
      setTimeout(l, 0);
    }, r.prototype.sign = function(n, t, e) {
      var i = no(e), s = i + t(n).toString(), a = Za(s, this.n.bitLength() / 4);
      if (a == null)
        return null;
      var c = this.doPrivate(a);
      if (c == null)
        return null;
      var l = c.toString(16);
      return (l.length & 1) == 0 ? l : "0" + l;
    }, r.prototype.verify = function(n, t, e) {
      var i = K(t, 16), s = this.doPublic(i);
      if (s == null)
        return null;
      var a = s.toString(16).replace(/^1f+00/, ""), c = io(a);
      return c == e(n).toString();
    }, r;
  }()
);
function eo(r, n) {
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
var Ce = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};
function no(r) {
  return Ce[r] || "";
}
function io(r) {
  for (var n in Ce)
    if (Ce.hasOwnProperty(n)) {
      var t = Ce[n], e = t.length;
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
var W = {};
W.lang = {
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
var m = {};
(typeof m.asn1 > "u" || !m.asn1) && (m.asn1 = {});
m.asn1.ASN1Util = new function() {
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
      var a = new D(i, 16), c = a.xor(r).add(D.ONE);
      n = c.toString(16).replace(/^-/, "");
    }
    return n;
  }, this.getPEMStringFromHex = function(r, n) {
    return hextopem(r, n);
  }, this.newObject = function(r) {
    var n = m, t = n.asn1, e = t.DERBoolean, i = t.DERInteger, s = t.DERBitString, a = t.DEROctetString, c = t.DERNull, l = t.DERObjectIdentifier, h = t.DEREnumerated, p = t.DERUTF8String, f = t.DERNumericString, b = t.DERPrintableString, E = t.DERTeletexString, v = t.DERIA5String, S = t.DERUTCTime, T = t.DERGeneralizedTime, q = t.DERSequence, U = t.DERSet, H = t.DERTaggedObject, it = t.ASN1Util.newObject, X = Object.keys(r);
    if (X.length != 1)
      throw "key of param shall be only one.";
    var x = X[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + x + ":") == -1)
      throw "undefined key: " + x;
    if (x == "bool")
      return new e(r[x]);
    if (x == "int")
      return new i(r[x]);
    if (x == "bitstr")
      return new s(r[x]);
    if (x == "octstr")
      return new a(r[x]);
    if (x == "null")
      return new c(r[x]);
    if (x == "oid")
      return new l(r[x]);
    if (x == "enum")
      return new h(r[x]);
    if (x == "utf8str")
      return new p(r[x]);
    if (x == "numstr")
      return new f(r[x]);
    if (x == "prnstr")
      return new b(r[x]);
    if (x == "telstr")
      return new E(r[x]);
    if (x == "ia5str")
      return new v(r[x]);
    if (x == "utctime")
      return new S(r[x]);
    if (x == "gentime")
      return new T(r[x]);
    if (x == "seq") {
      for (var ct = r[x], wt = [], vt = 0; vt < ct.length; vt++) {
        var Ge = it(ct[vt]);
        wt.push(Ge);
      }
      return new q({ array: wt });
    }
    if (x == "set") {
      for (var ct = r[x], wt = [], vt = 0; vt < ct.length; vt++) {
        var Ge = it(ct[vt]);
        wt.push(Ge);
      }
      return new U({ array: wt });
    }
    if (x == "tag") {
      var _t = r[x];
      if (Object.prototype.toString.call(_t) === "[object Array]" && _t.length == 3) {
        var wa = it(_t[2]);
        return new H({
          tag: _t[0],
          explicit: _t[1],
          obj: wa
        });
      } else {
        var pe = {};
        if (_t.explicit !== void 0 && (pe.explicit = _t.explicit), _t.tag !== void 0 && (pe.tag = _t.tag), _t.obj === void 0)
          throw "obj shall be specified for 'tag'.";
        return pe.obj = it(_t.obj), new H(pe);
      }
    }
  }, this.jsonToASN1HEX = function(r) {
    var n = this.newObject(r);
    return n.getEncodedHex();
  };
}();
m.asn1.ASN1Util.oidHexToInt = function(r) {
  for (var i = "", n = parseInt(r.substr(0, 2), 16), t = Math.floor(n / 40), e = n % 40, i = t + "." + e, s = "", a = 2; a < r.length; a += 2) {
    var c = parseInt(r.substr(a, 2), 16), l = ("00000000" + c.toString(2)).slice(-8);
    if (s = s + l.substr(1, 7), l.substr(0, 1) == "0") {
      var h = new D(s, 2);
      i = i + "." + h.toString(10), s = "";
    }
  }
  return i;
};
m.asn1.ASN1Util.oidIntToHex = function(r) {
  var n = function(c) {
    var l = c.toString(16);
    return l.length == 1 && (l = "0" + l), l;
  }, t = function(c) {
    var l = "", h = new D(c, 10), p = h.toString(2), f = 7 - p.length % 7;
    f == 7 && (f = 0);
    for (var b = "", E = 0; E < f; E++)
      b += "0";
    p = b + p;
    for (var E = 0; E < p.length - 1; E += 7) {
      var v = p.substr(E, 7);
      E != p.length - 7 && (v = "1" + v), l += n(parseInt(v, 2));
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
m.asn1.ASN1Object = function() {
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
m.asn1.DERAbstractString = function(r) {
  m.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function() {
    return this.s;
  }, this.setString = function(n) {
    this.hTLV = null, this.isModified = !0, this.s = n, this.hV = stohex(this.s);
  }, this.setStringHex = function(n) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = n;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof r < "u" && (typeof r == "string" ? this.setString(r) : typeof r.str < "u" ? this.setString(r.str) : typeof r.hex < "u" && this.setStringHex(r.hex));
};
W.lang.extend(m.asn1.DERAbstractString, m.asn1.ASN1Object);
m.asn1.DERAbstractTime = function(r) {
  m.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function(n) {
    utc = n.getTime() + n.getTimezoneOffset() * 6e4;
    var t = new Date(utc);
    return t;
  }, this.formatDate = function(n, t, e) {
    var i = this.zeroPadding, s = this.localDateToUTC(n), a = String(s.getFullYear());
    t == "utc" && (a = a.substr(2, 2));
    var c = i(String(s.getMonth() + 1), 2), l = i(String(s.getDate()), 2), h = i(String(s.getHours()), 2), p = i(String(s.getMinutes()), 2), f = i(String(s.getSeconds()), 2), b = a + c + l + h + p + f;
    if (e === !0) {
      var E = s.getMilliseconds();
      if (E != 0) {
        var v = i(String(E), 3);
        v = v.replace(/[0]+$/, ""), b = b + "." + v;
      }
    }
    return b + "Z";
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
W.lang.extend(m.asn1.DERAbstractTime, m.asn1.ASN1Object);
m.asn1.DERAbstractStructured = function(r) {
  m.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function(n) {
    this.hTLV = null, this.isModified = !0, this.asn1Array = n;
  }, this.appendASN1Object = function(n) {
    this.hTLV = null, this.isModified = !0, this.asn1Array.push(n);
  }, this.asn1Array = new Array(), typeof r < "u" && typeof r.array < "u" && (this.asn1Array = r.array);
};
W.lang.extend(m.asn1.DERAbstractStructured, m.asn1.ASN1Object);
m.asn1.DERBoolean = function() {
  m.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff";
};
W.lang.extend(m.asn1.DERBoolean, m.asn1.ASN1Object);
m.asn1.DERInteger = function(r) {
  m.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(n) {
    this.hTLV = null, this.isModified = !0, this.hV = m.asn1.ASN1Util.bigIntToMinTwosComplementsHex(n);
  }, this.setByInteger = function(n) {
    var t = new D(String(n), 10);
    this.setByBigInteger(t);
  }, this.setValueHex = function(n) {
    this.hV = n;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof r < "u" && (typeof r.bigint < "u" ? this.setByBigInteger(r.bigint) : typeof r.int < "u" ? this.setByInteger(r.int) : typeof r == "number" ? this.setByInteger(r) : typeof r.hex < "u" && this.setValueHex(r.hex));
};
W.lang.extend(m.asn1.DERInteger, m.asn1.ASN1Object);
m.asn1.DERBitString = function(r) {
  if (r !== void 0 && typeof r.obj < "u") {
    var n = m.asn1.ASN1Util.newObject(r.obj);
    r.hex = "00" + n.getEncodedHex();
  }
  m.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(t) {
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
W.lang.extend(m.asn1.DERBitString, m.asn1.ASN1Object);
m.asn1.DEROctetString = function(r) {
  if (r !== void 0 && typeof r.obj < "u") {
    var n = m.asn1.ASN1Util.newObject(r.obj);
    r.hex = n.getEncodedHex();
  }
  m.asn1.DEROctetString.superclass.constructor.call(this, r), this.hT = "04";
};
W.lang.extend(m.asn1.DEROctetString, m.asn1.DERAbstractString);
m.asn1.DERNull = function() {
  m.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500";
};
W.lang.extend(m.asn1.DERNull, m.asn1.ASN1Object);
m.asn1.DERObjectIdentifier = function(r) {
  var n = function(e) {
    var i = e.toString(16);
    return i.length == 1 && (i = "0" + i), i;
  }, t = function(e) {
    var i = "", s = new D(e, 10), a = s.toString(2), c = 7 - a.length % 7;
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
  m.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(e) {
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
    var i = m.asn1.x509.OID.name2oid(e);
    if (i !== "")
      this.setValueOidString(i);
    else
      throw "DERObjectIdentifier oidName undefined: " + e;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, r !== void 0 && (typeof r == "string" ? r.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(r) : this.setValueName(r) : r.oid !== void 0 ? this.setValueOidString(r.oid) : r.hex !== void 0 ? this.setValueHex(r.hex) : r.name !== void 0 && this.setValueName(r.name));
};
W.lang.extend(m.asn1.DERObjectIdentifier, m.asn1.ASN1Object);
m.asn1.DEREnumerated = function(r) {
  m.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(n) {
    this.hTLV = null, this.isModified = !0, this.hV = m.asn1.ASN1Util.bigIntToMinTwosComplementsHex(n);
  }, this.setByInteger = function(n) {
    var t = new D(String(n), 10);
    this.setByBigInteger(t);
  }, this.setValueHex = function(n) {
    this.hV = n;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof r < "u" && (typeof r.int < "u" ? this.setByInteger(r.int) : typeof r == "number" ? this.setByInteger(r) : typeof r.hex < "u" && this.setValueHex(r.hex));
};
W.lang.extend(m.asn1.DEREnumerated, m.asn1.ASN1Object);
m.asn1.DERUTF8String = function(r) {
  m.asn1.DERUTF8String.superclass.constructor.call(this, r), this.hT = "0c";
};
W.lang.extend(m.asn1.DERUTF8String, m.asn1.DERAbstractString);
m.asn1.DERNumericString = function(r) {
  m.asn1.DERNumericString.superclass.constructor.call(this, r), this.hT = "12";
};
W.lang.extend(m.asn1.DERNumericString, m.asn1.DERAbstractString);
m.asn1.DERPrintableString = function(r) {
  m.asn1.DERPrintableString.superclass.constructor.call(this, r), this.hT = "13";
};
W.lang.extend(m.asn1.DERPrintableString, m.asn1.DERAbstractString);
m.asn1.DERTeletexString = function(r) {
  m.asn1.DERTeletexString.superclass.constructor.call(this, r), this.hT = "14";
};
W.lang.extend(m.asn1.DERTeletexString, m.asn1.DERAbstractString);
m.asn1.DERIA5String = function(r) {
  m.asn1.DERIA5String.superclass.constructor.call(this, r), this.hT = "16";
};
W.lang.extend(m.asn1.DERIA5String, m.asn1.DERAbstractString);
m.asn1.DERUTCTime = function(r) {
  m.asn1.DERUTCTime.superclass.constructor.call(this, r), this.hT = "17", this.setByDate = function(n) {
    this.hTLV = null, this.isModified = !0, this.date = n, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s);
  }, this.getFreshValueHex = function() {
    return typeof this.date > "u" && typeof this.s > "u" && (this.date = /* @__PURE__ */ new Date(), this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)), this.hV;
  }, r !== void 0 && (r.str !== void 0 ? this.setString(r.str) : typeof r == "string" && r.match(/^[0-9]{12}Z$/) ? this.setString(r) : r.hex !== void 0 ? this.setStringHex(r.hex) : r.date !== void 0 && this.setByDate(r.date));
};
W.lang.extend(m.asn1.DERUTCTime, m.asn1.DERAbstractTime);
m.asn1.DERGeneralizedTime = function(r) {
  m.asn1.DERGeneralizedTime.superclass.constructor.call(this, r), this.hT = "18", this.withMillis = !1, this.setByDate = function(n) {
    this.hTLV = null, this.isModified = !0, this.date = n, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s);
  }, this.getFreshValueHex = function() {
    return this.date === void 0 && this.s === void 0 && (this.date = /* @__PURE__ */ new Date(), this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)), this.hV;
  }, r !== void 0 && (r.str !== void 0 ? this.setString(r.str) : typeof r == "string" && r.match(/^[0-9]{14}Z$/) ? this.setString(r) : r.hex !== void 0 ? this.setStringHex(r.hex) : r.date !== void 0 && this.setByDate(r.date), r.millis === !0 && (this.withMillis = !0));
};
W.lang.extend(m.asn1.DERGeneralizedTime, m.asn1.DERAbstractTime);
m.asn1.DERSequence = function(r) {
  m.asn1.DERSequence.superclass.constructor.call(this, r), this.hT = "30", this.getFreshValueHex = function() {
    for (var n = "", t = 0; t < this.asn1Array.length; t++) {
      var e = this.asn1Array[t];
      n += e.getEncodedHex();
    }
    return this.hV = n, this.hV;
  };
};
W.lang.extend(m.asn1.DERSequence, m.asn1.DERAbstractStructured);
m.asn1.DERSet = function(r) {
  m.asn1.DERSet.superclass.constructor.call(this, r), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function() {
    for (var n = new Array(), t = 0; t < this.asn1Array.length; t++) {
      var e = this.asn1Array[t];
      n.push(e.getEncodedHex());
    }
    return this.sortFlag == !0 && n.sort(), this.hV = n.join(""), this.hV;
  }, typeof r < "u" && typeof r.sortflag < "u" && r.sortflag == !1 && (this.sortFlag = !1);
};
W.lang.extend(m.asn1.DERSet, m.asn1.DERAbstractStructured);
m.asn1.DERTaggedObject = function(r) {
  m.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(n, t, e) {
    this.hT = t, this.isExplicit = n, this.asn1Object = e, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = e.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, t), this.isModified = !1);
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof r < "u" && (typeof r.tag < "u" && (this.hT = r.tag), typeof r.explicit < "u" && (this.isExplicit = r.explicit), typeof r.obj < "u" && (this.asn1Object = r.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)));
};
W.lang.extend(m.asn1.DERTaggedObject, m.asn1.ASN1Object);
var ro = /* @__PURE__ */ function() {
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
}(), ui = (
  /** @class */
  function(r) {
    ro(n, r);
    function n(t) {
      var e = r.call(this) || this;
      return t && (typeof t == "string" ? e.parseKey(t) : (n.hasPrivateKeyProperty(t) || n.hasPublicKeyProperty(t)) && e.parsePropertiesFrom(t)), e;
    }
    return n.prototype.parseKey = function(t) {
      try {
        var e = 0, i = 0, s = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/, a = s.test(t) ? qa.decode(t) : dn.unarmor(t), c = Ka.decode(a);
        if (c.sub.length === 3 && (c = c.sub[2].sub[0]), c.sub.length === 9) {
          e = c.sub[1].getHexStringValue(), this.n = K(e, 16), i = c.sub[2].getHexStringValue(), this.e = parseInt(i, 16);
          var l = c.sub[3].getHexStringValue();
          this.d = K(l, 16);
          var h = c.sub[4].getHexStringValue();
          this.p = K(h, 16);
          var p = c.sub[5].getHexStringValue();
          this.q = K(p, 16);
          var f = c.sub[6].getHexStringValue();
          this.dmp1 = K(f, 16);
          var b = c.sub[7].getHexStringValue();
          this.dmq1 = K(b, 16);
          var E = c.sub[8].getHexStringValue();
          this.coeff = K(E, 16);
        } else if (c.sub.length === 2)
          if (c.sub[0].sub) {
            var v = c.sub[1], S = v.sub[0];
            e = S.sub[0].getHexStringValue(), this.n = K(e, 16), i = S.sub[1].getHexStringValue(), this.e = parseInt(i, 16);
          } else
            e = c.sub[0].getHexStringValue(), this.n = K(e, 16), i = c.sub[1].getHexStringValue(), this.e = parseInt(i, 16);
        else
          return !1;
        return !0;
      } catch {
        return !1;
      }
    }, n.prototype.getPrivateBaseKey = function() {
      var t = {
        array: [
          new m.asn1.DERInteger({ int: 0 }),
          new m.asn1.DERInteger({ bigint: this.n }),
          new m.asn1.DERInteger({ int: this.e }),
          new m.asn1.DERInteger({ bigint: this.d }),
          new m.asn1.DERInteger({ bigint: this.p }),
          new m.asn1.DERInteger({ bigint: this.q }),
          new m.asn1.DERInteger({ bigint: this.dmp1 }),
          new m.asn1.DERInteger({ bigint: this.dmq1 }),
          new m.asn1.DERInteger({ bigint: this.coeff })
        ]
      }, e = new m.asn1.DERSequence(t);
      return e.getEncodedHex();
    }, n.prototype.getPrivateBaseKeyB64 = function() {
      return Fe(this.getPrivateBaseKey());
    }, n.prototype.getPublicBaseKey = function() {
      var t = new m.asn1.DERSequence({
        array: [
          new m.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
          new m.asn1.DERNull()
        ]
      }), e = new m.asn1.DERSequence({
        array: [
          new m.asn1.DERInteger({ bigint: this.n }),
          new m.asn1.DERInteger({ int: this.e })
        ]
      }), i = new m.asn1.DERBitString({
        hex: "00" + e.getEncodedHex()
      }), s = new m.asn1.DERSequence({
        array: [t, i]
      });
      return s.getEncodedHex();
    }, n.prototype.getPublicBaseKeyB64 = function() {
      return Fe(this.getPublicBaseKey());
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
  }(to)
), tn, so = typeof process < "u" ? (tn = process.env) === null || tn === void 0 ? void 0 : tn.npm_package_version : void 0, ao = (
  /** @class */
  function() {
    function r(n) {
      n === void 0 && (n = {}), n = n || {}, this.default_key_size = n.default_key_size ? parseInt(n.default_key_size, 10) : 1024, this.default_public_exponent = n.default_public_exponent || "010001", this.log = n.log || !1, this.key = null;
    }
    return r.prototype.setKey = function(n) {
      this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new ui(n);
    }, r.prototype.setPrivateKey = function(n) {
      this.setKey(n);
    }, r.prototype.setPublicKey = function(n) {
      this.setKey(n);
    }, r.prototype.decrypt = function(n) {
      try {
        return this.getKey().decrypt(ri(n));
      } catch {
        return !1;
      }
    }, r.prototype.encrypt = function(n) {
      try {
        return Fe(this.getKey().encrypt(n));
      } catch {
        return !1;
      }
    }, r.prototype.sign = function(n, t, e) {
      try {
        return Fe(this.getKey().sign(n, t, e));
      } catch {
        return !1;
      }
    }, r.prototype.verify = function(n, t, e) {
      try {
        return this.getKey().verify(n, ri(t), e);
      } catch {
        return !1;
      }
    }, r.prototype.getKey = function(n) {
      if (!this.key) {
        if (this.key = new ui(), n && {}.toString.call(n) === "[object Function]") {
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
    }, r.version = so, r;
  }()
);
function Wi(r, n) {
  return function() {
    return r.apply(n, arguments);
  };
}
const { toString: oo } = Object.prototype, { getPrototypeOf: Hn } = Object, je = /* @__PURE__ */ ((r) => (n) => {
  const t = oo.call(n);
  return r[t] || (r[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), mt = (r) => (r = r.toLowerCase(), (n) => je(n) === r), He = (r) => (n) => typeof n === r, { isArray: Jt } = Array, le = He("undefined");
function co(r) {
  return r !== null && !le(r) && r.constructor !== null && !le(r.constructor) && ut(r.constructor.isBuffer) && r.constructor.isBuffer(r);
}
const $i = mt("ArrayBuffer");
function lo(r) {
  let n;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? n = ArrayBuffer.isView(r) : n = r && r.buffer && $i(r.buffer), n;
}
const ho = He("string"), ut = He("function"), zi = He("number"), Ke = (r) => r !== null && typeof r == "object", uo = (r) => r === !0 || r === !1, Te = (r) => {
  if (je(r) !== "object")
    return !1;
  const n = Hn(r);
  return (n === null || n === Object.prototype || Object.getPrototypeOf(n) === null) && !(Symbol.toStringTag in r) && !(Symbol.iterator in r);
}, po = mt("Date"), _o = mt("File"), fo = mt("Blob"), go = mt("FileList"), yo = (r) => Ke(r) && ut(r.pipe), bo = (r) => {
  let n;
  return r && (typeof FormData == "function" && r instanceof FormData || ut(r.append) && ((n = je(r)) === "formdata" || // detect form-data instance
  n === "object" && ut(r.toString) && r.toString() === "[object FormData]"));
}, mo = mt("URLSearchParams"), [wo, vo, Eo, Po] = ["ReadableStream", "Request", "Response", "Headers"].map(mt), Co = (r) => r.trim ? r.trim() : r.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function ue(r, n, { allOwnKeys: t = !1 } = {}) {
  if (r === null || typeof r > "u")
    return;
  let e, i;
  if (typeof r != "object" && (r = [r]), Jt(r))
    for (e = 0, i = r.length; e < i; e++)
      n.call(null, r[e], e, r);
  else {
    const s = t ? Object.getOwnPropertyNames(r) : Object.keys(r), a = s.length;
    let c;
    for (e = 0; e < a; e++)
      c = s[e], n.call(null, r[c], c, r);
  }
}
function Gi(r, n) {
  n = n.toLowerCase();
  const t = Object.keys(r);
  let e = t.length, i;
  for (; e-- > 0; )
    if (i = t[e], n === i.toLowerCase())
      return i;
  return null;
}
const Mt = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Xi = (r) => !le(r) && r !== Mt;
function _n() {
  const { caseless: r } = Xi(this) && this || {}, n = {}, t = (e, i) => {
    const s = r && Gi(n, i) || i;
    Te(n[s]) && Te(e) ? n[s] = _n(n[s], e) : Te(e) ? n[s] = _n({}, e) : Jt(e) ? n[s] = e.slice() : n[s] = e;
  };
  for (let e = 0, i = arguments.length; e < i; e++)
    arguments[e] && ue(arguments[e], t);
  return n;
}
const To = (r, n, t, { allOwnKeys: e } = {}) => (ue(n, (i, s) => {
  t && ut(i) ? r[s] = Wi(i, t) : r[s] = i;
}, { allOwnKeys: e }), r), So = (r) => (r.charCodeAt(0) === 65279 && (r = r.slice(1)), r), ko = (r, n, t, e) => {
  r.prototype = Object.create(n.prototype, e), r.prototype.constructor = r, Object.defineProperty(r, "super", {
    value: n.prototype
  }), t && Object.assign(r.prototype, t);
}, xo = (r, n, t, e) => {
  let i, s, a;
  const c = {};
  if (n = n || {}, r == null) return n;
  do {
    for (i = Object.getOwnPropertyNames(r), s = i.length; s-- > 0; )
      a = i[s], (!e || e(a, r, n)) && !c[a] && (n[a] = r[a], c[a] = !0);
    r = t !== !1 && Hn(r);
  } while (r && (!t || t(r, n)) && r !== Object.prototype);
  return n;
}, Ao = (r, n, t) => {
  r = String(r), (t === void 0 || t > r.length) && (t = r.length), t -= n.length;
  const e = r.indexOf(n, t);
  return e !== -1 && e === t;
}, Do = (r) => {
  if (!r) return null;
  if (Jt(r)) return r;
  let n = r.length;
  if (!zi(n)) return null;
  const t = new Array(n);
  for (; n-- > 0; )
    t[n] = r[n];
  return t;
}, Ro = /* @__PURE__ */ ((r) => (n) => r && n instanceof r)(typeof Uint8Array < "u" && Hn(Uint8Array)), Io = (r, n) => {
  const e = (r && r[Symbol.iterator]).call(r);
  let i;
  for (; (i = e.next()) && !i.done; ) {
    const s = i.value;
    n.call(r, s[0], s[1]);
  }
}, Oo = (r, n) => {
  let t;
  const e = [];
  for (; (t = r.exec(n)) !== null; )
    e.push(t);
  return e;
}, No = mt("HTMLFormElement"), Bo = (r) => r.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, e, i) {
    return e.toUpperCase() + i;
  }
), di = (({ hasOwnProperty: r }) => (n, t) => r.call(n, t))(Object.prototype), Mo = mt("RegExp"), Ji = (r, n) => {
  const t = Object.getOwnPropertyDescriptors(r), e = {};
  ue(t, (i, s) => {
    let a;
    (a = n(i, s, r)) !== !1 && (e[s] = a || i);
  }), Object.defineProperties(r, e);
}, Fo = (r) => {
  Ji(r, (n, t) => {
    if (ut(r) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const e = r[t];
    if (ut(e)) {
      if (n.enumerable = !1, "writable" in n) {
        n.writable = !1;
        return;
      }
      n.set || (n.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, Uo = (r, n) => {
  const t = {}, e = (i) => {
    i.forEach((s) => {
      t[s] = !0;
    });
  };
  return Jt(r) ? e(r) : e(String(r).split(n)), t;
}, Lo = () => {
}, Vo = (r, n) => r != null && Number.isFinite(r = +r) ? r : n;
function qo(r) {
  return !!(r && ut(r.append) && r[Symbol.toStringTag] === "FormData" && r[Symbol.iterator]);
}
const jo = (r) => {
  const n = new Array(10), t = (e, i) => {
    if (Ke(e)) {
      if (n.indexOf(e) >= 0)
        return;
      if (!("toJSON" in e)) {
        n[i] = e;
        const s = Jt(e) ? [] : {};
        return ue(e, (a, c) => {
          const l = t(a, i + 1);
          !le(l) && (s[c] = l);
        }), n[i] = void 0, s;
      }
    }
    return e;
  };
  return t(r, 0);
}, Ho = mt("AsyncFunction"), Ko = (r) => r && (Ke(r) || ut(r)) && ut(r.then) && ut(r.catch), Qi = ((r, n) => r ? setImmediate : n ? ((t, e) => (Mt.addEventListener("message", ({ source: i, data: s }) => {
  i === Mt && s === t && e.length && e.shift()();
}, !1), (i) => {
  e.push(i), Mt.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(
  typeof setImmediate == "function",
  ut(Mt.postMessage)
), Wo = typeof queueMicrotask < "u" ? queueMicrotask.bind(Mt) : typeof process < "u" && process.nextTick || Qi, y = {
  isArray: Jt,
  isArrayBuffer: $i,
  isBuffer: co,
  isFormData: bo,
  isArrayBufferView: lo,
  isString: ho,
  isNumber: zi,
  isBoolean: uo,
  isObject: Ke,
  isPlainObject: Te,
  isReadableStream: wo,
  isRequest: vo,
  isResponse: Eo,
  isHeaders: Po,
  isUndefined: le,
  isDate: po,
  isFile: _o,
  isBlob: fo,
  isRegExp: Mo,
  isFunction: ut,
  isStream: yo,
  isURLSearchParams: mo,
  isTypedArray: Ro,
  isFileList: go,
  forEach: ue,
  merge: _n,
  extend: To,
  trim: Co,
  stripBOM: So,
  inherits: ko,
  toFlatObject: xo,
  kindOf: je,
  kindOfTest: mt,
  endsWith: Ao,
  toArray: Do,
  forEachEntry: Io,
  matchAll: Oo,
  isHTMLForm: No,
  hasOwnProperty: di,
  hasOwnProp: di,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ji,
  freezeMethods: Fo,
  toObjectSet: Uo,
  toCamelCase: Bo,
  noop: Lo,
  toFiniteNumber: Vo,
  findKey: Gi,
  global: Mt,
  isContextDefined: Xi,
  isSpecCompliantForm: qo,
  toJSONObject: jo,
  isAsyncFn: Ho,
  isThenable: Ko,
  setImmediate: Qi,
  asap: Wo
};
function A(r, n, t, e, i) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = r, this.name = "AxiosError", n && (this.code = n), t && (this.config = t), e && (this.request = e), i && (this.response = i, this.status = i.status ? i.status : null);
}
y.inherits(A, Error, {
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
      config: y.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Zi = A.prototype, Yi = {};
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
  Yi[r] = { value: r };
});
Object.defineProperties(A, Yi);
Object.defineProperty(Zi, "isAxiosError", { value: !0 });
A.from = (r, n, t, e, i, s) => {
  const a = Object.create(Zi);
  return y.toFlatObject(r, a, function(l) {
    return l !== Error.prototype;
  }, (c) => c !== "isAxiosError"), A.call(a, r.message, n, t, e, i), a.cause = r, a.name = r.name, s && Object.assign(a, s), a;
};
const $o = null;
function fn(r) {
  return y.isPlainObject(r) || y.isArray(r);
}
function tr(r) {
  return y.endsWith(r, "[]") ? r.slice(0, -2) : r;
}
function pi(r, n, t) {
  return r ? r.concat(n).map(function(i, s) {
    return i = tr(i), !t && s ? "[" + i + "]" : i;
  }).join(t ? "." : "") : n;
}
function zo(r) {
  return y.isArray(r) && !r.some(fn);
}
const Go = y.toFlatObject(y, {}, null, function(n) {
  return /^is[A-Z]/.test(n);
});
function We(r, n, t) {
  if (!y.isObject(r))
    throw new TypeError("target must be an object");
  n = n || new FormData(), t = y.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(S, T) {
    return !y.isUndefined(T[S]);
  });
  const e = t.metaTokens, i = t.visitor || p, s = t.dots, a = t.indexes, l = (t.Blob || typeof Blob < "u" && Blob) && y.isSpecCompliantForm(n);
  if (!y.isFunction(i))
    throw new TypeError("visitor must be a function");
  function h(v) {
    if (v === null) return "";
    if (y.isDate(v))
      return v.toISOString();
    if (!l && y.isBlob(v))
      throw new A("Blob is not supported. Use a Buffer instead.");
    return y.isArrayBuffer(v) || y.isTypedArray(v) ? l && typeof Blob == "function" ? new Blob([v]) : Buffer.from(v) : v;
  }
  function p(v, S, T) {
    let q = v;
    if (v && !T && typeof v == "object") {
      if (y.endsWith(S, "{}"))
        S = e ? S : S.slice(0, -2), v = JSON.stringify(v);
      else if (y.isArray(v) && zo(v) || (y.isFileList(v) || y.endsWith(S, "[]")) && (q = y.toArray(v)))
        return S = tr(S), q.forEach(function(H, it) {
          !(y.isUndefined(H) || H === null) && n.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? pi([S], it, s) : a === null ? S : S + "[]",
            h(H)
          );
        }), !1;
    }
    return fn(v) ? !0 : (n.append(pi(T, S, s), h(v)), !1);
  }
  const f = [], b = Object.assign(Go, {
    defaultVisitor: p,
    convertValue: h,
    isVisitable: fn
  });
  function E(v, S) {
    if (!y.isUndefined(v)) {
      if (f.indexOf(v) !== -1)
        throw Error("Circular reference detected in " + S.join("."));
      f.push(v), y.forEach(v, function(q, U) {
        (!(y.isUndefined(q) || q === null) && i.call(
          n,
          q,
          y.isString(U) ? U.trim() : U,
          S,
          b
        )) === !0 && E(q, S ? S.concat(U) : [U]);
      }), f.pop();
    }
  }
  if (!y.isObject(r))
    throw new TypeError("data must be an object");
  return E(r), n;
}
function _i(r) {
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
function Kn(r, n) {
  this._pairs = [], r && We(r, this, n);
}
const er = Kn.prototype;
er.append = function(n, t) {
  this._pairs.push([n, t]);
};
er.toString = function(n) {
  const t = n ? function(e) {
    return n.call(this, e, _i);
  } : _i;
  return this._pairs.map(function(i) {
    return t(i[0]) + "=" + t(i[1]);
  }, "").join("&");
};
function Xo(r) {
  return encodeURIComponent(r).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function nr(r, n, t) {
  if (!n)
    return r;
  const e = t && t.encode || Xo;
  y.isFunction(t) && (t = {
    serialize: t
  });
  const i = t && t.serialize;
  let s;
  if (i ? s = i(n, t) : s = y.isURLSearchParams(n) ? n.toString() : new Kn(n, t).toString(e), s) {
    const a = r.indexOf("#");
    a !== -1 && (r = r.slice(0, a)), r += (r.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return r;
}
class fi {
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
    y.forEach(this.handlers, function(e) {
      e !== null && n(e);
    });
  }
}
const ir = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Jo = typeof URLSearchParams < "u" ? URLSearchParams : Kn, Qo = typeof FormData < "u" ? FormData : null, Zo = typeof Blob < "u" ? Blob : null, Yo = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Jo,
    FormData: Qo,
    Blob: Zo
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Wn = typeof window < "u" && typeof document < "u", gn = typeof navigator == "object" && navigator || void 0, tc = Wn && (!gn || ["ReactNative", "NativeScript", "NS"].indexOf(gn.product) < 0), ec = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", nc = Wn && window.location.href || "http://localhost", ic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Wn,
  hasStandardBrowserEnv: tc,
  hasStandardBrowserWebWorkerEnv: ec,
  navigator: gn,
  origin: nc
}, Symbol.toStringTag, { value: "Module" })), tt = {
  ...ic,
  ...Yo
};
function rc(r, n) {
  return We(r, new tt.classes.URLSearchParams(), Object.assign({
    visitor: function(t, e, i, s) {
      return tt.isNode && y.isBuffer(t) ? (this.append(e, t.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, n));
}
function sc(r) {
  return y.matchAll(/\w+|\[(\w*)]/g, r).map((n) => n[0] === "[]" ? "" : n[1] || n[0]);
}
function ac(r) {
  const n = {}, t = Object.keys(r);
  let e;
  const i = t.length;
  let s;
  for (e = 0; e < i; e++)
    s = t[e], n[s] = r[s];
  return n;
}
function rr(r) {
  function n(t, e, i, s) {
    let a = t[s++];
    if (a === "__proto__") return !0;
    const c = Number.isFinite(+a), l = s >= t.length;
    return a = !a && y.isArray(i) ? i.length : a, l ? (y.hasOwnProp(i, a) ? i[a] = [i[a], e] : i[a] = e, !c) : ((!i[a] || !y.isObject(i[a])) && (i[a] = []), n(t, e, i[a], s) && y.isArray(i[a]) && (i[a] = ac(i[a])), !c);
  }
  if (y.isFormData(r) && y.isFunction(r.entries)) {
    const t = {};
    return y.forEachEntry(r, (e, i) => {
      n(sc(e), i, t, 0);
    }), t;
  }
  return null;
}
function oc(r, n, t) {
  if (y.isString(r))
    try {
      return (n || JSON.parse)(r), y.trim(r);
    } catch (e) {
      if (e.name !== "SyntaxError")
        throw e;
    }
  return (t || JSON.stringify)(r);
}
const de = {
  transitional: ir,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(n, t) {
    const e = t.getContentType() || "", i = e.indexOf("application/json") > -1, s = y.isObject(n);
    if (s && y.isHTMLForm(n) && (n = new FormData(n)), y.isFormData(n))
      return i ? JSON.stringify(rr(n)) : n;
    if (y.isArrayBuffer(n) || y.isBuffer(n) || y.isStream(n) || y.isFile(n) || y.isBlob(n) || y.isReadableStream(n))
      return n;
    if (y.isArrayBufferView(n))
      return n.buffer;
    if (y.isURLSearchParams(n))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), n.toString();
    let c;
    if (s) {
      if (e.indexOf("application/x-www-form-urlencoded") > -1)
        return rc(n, this.formSerializer).toString();
      if ((c = y.isFileList(n)) || e.indexOf("multipart/form-data") > -1) {
        const l = this.env && this.env.FormData;
        return We(
          c ? { "files[]": n } : n,
          l && new l(),
          this.formSerializer
        );
      }
    }
    return s || i ? (t.setContentType("application/json", !1), oc(n)) : n;
  }],
  transformResponse: [function(n) {
    const t = this.transitional || de.transitional, e = t && t.forcedJSONParsing, i = this.responseType === "json";
    if (y.isResponse(n) || y.isReadableStream(n))
      return n;
    if (n && y.isString(n) && (e && !this.responseType || i)) {
      const a = !(t && t.silentJSONParsing) && i;
      try {
        return JSON.parse(n);
      } catch (c) {
        if (a)
          throw c.name === "SyntaxError" ? A.from(c, A.ERR_BAD_RESPONSE, this, null, this.response) : c;
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
y.forEach(["delete", "get", "head", "post", "put", "patch"], (r) => {
  de.headers[r] = {};
});
const cc = y.toObjectSet([
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
]), lc = (r) => {
  const n = {};
  let t, e, i;
  return r && r.split(`
`).forEach(function(a) {
    i = a.indexOf(":"), t = a.substring(0, i).trim().toLowerCase(), e = a.substring(i + 1).trim(), !(!t || n[t] && cc[t]) && (t === "set-cookie" ? n[t] ? n[t].push(e) : n[t] = [e] : n[t] = n[t] ? n[t] + ", " + e : e);
  }), n;
}, gi = Symbol("internals");
function Zt(r) {
  return r && String(r).trim().toLowerCase();
}
function Se(r) {
  return r === !1 || r == null ? r : y.isArray(r) ? r.map(Se) : String(r);
}
function hc(r) {
  const n = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let e;
  for (; e = t.exec(r); )
    n[e[1]] = e[2];
  return n;
}
const uc = (r) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(r.trim());
function en(r, n, t, e, i) {
  if (y.isFunction(e))
    return e.call(this, n, t);
  if (i && (n = t), !!y.isString(n)) {
    if (y.isString(e))
      return n.indexOf(e) !== -1;
    if (y.isRegExp(e))
      return e.test(n);
  }
}
function dc(r) {
  return r.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (n, t, e) => t.toUpperCase() + e);
}
function pc(r, n) {
  const t = y.toCamelCase(" " + n);
  ["get", "set", "has"].forEach((e) => {
    Object.defineProperty(r, e + t, {
      value: function(i, s, a) {
        return this[e].call(this, n, i, s, a);
      },
      configurable: !0
    });
  });
}
let ot = class {
  constructor(n) {
    n && this.set(n);
  }
  set(n, t, e) {
    const i = this;
    function s(c, l, h) {
      const p = Zt(l);
      if (!p)
        throw new Error("header name must be a non-empty string");
      const f = y.findKey(i, p);
      (!f || i[f] === void 0 || h === !0 || h === void 0 && i[f] !== !1) && (i[f || l] = Se(c));
    }
    const a = (c, l) => y.forEach(c, (h, p) => s(h, p, l));
    if (y.isPlainObject(n) || n instanceof this.constructor)
      a(n, t);
    else if (y.isString(n) && (n = n.trim()) && !uc(n))
      a(lc(n), t);
    else if (y.isHeaders(n))
      for (const [c, l] of n.entries())
        s(l, c, e);
    else
      n != null && s(t, n, e);
    return this;
  }
  get(n, t) {
    if (n = Zt(n), n) {
      const e = y.findKey(this, n);
      if (e) {
        const i = this[e];
        if (!t)
          return i;
        if (t === !0)
          return hc(i);
        if (y.isFunction(t))
          return t.call(this, i, e);
        if (y.isRegExp(t))
          return t.exec(i);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(n, t) {
    if (n = Zt(n), n) {
      const e = y.findKey(this, n);
      return !!(e && this[e] !== void 0 && (!t || en(this, this[e], e, t)));
    }
    return !1;
  }
  delete(n, t) {
    const e = this;
    let i = !1;
    function s(a) {
      if (a = Zt(a), a) {
        const c = y.findKey(e, a);
        c && (!t || en(e, e[c], c, t)) && (delete e[c], i = !0);
      }
    }
    return y.isArray(n) ? n.forEach(s) : s(n), i;
  }
  clear(n) {
    const t = Object.keys(this);
    let e = t.length, i = !1;
    for (; e--; ) {
      const s = t[e];
      (!n || en(this, this[s], s, n, !0)) && (delete this[s], i = !0);
    }
    return i;
  }
  normalize(n) {
    const t = this, e = {};
    return y.forEach(this, (i, s) => {
      const a = y.findKey(e, s);
      if (a) {
        t[a] = Se(i), delete t[s];
        return;
      }
      const c = n ? dc(s) : String(s).trim();
      c !== s && delete t[s], t[c] = Se(i), e[c] = !0;
    }), this;
  }
  concat(...n) {
    return this.constructor.concat(this, ...n);
  }
  toJSON(n) {
    const t = /* @__PURE__ */ Object.create(null);
    return y.forEach(this, (e, i) => {
      e != null && e !== !1 && (t[i] = n && y.isArray(e) ? e.join(", ") : e);
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
    const e = (this[gi] = this[gi] = {
      accessors: {}
    }).accessors, i = this.prototype;
    function s(a) {
      const c = Zt(a);
      e[c] || (pc(i, a), e[c] = !0);
    }
    return y.isArray(n) ? n.forEach(s) : s(n), this;
  }
};
ot.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
y.reduceDescriptors(ot.prototype, ({ value: r }, n) => {
  let t = n[0].toUpperCase() + n.slice(1);
  return {
    get: () => r,
    set(e) {
      this[t] = e;
    }
  };
});
y.freezeMethods(ot);
function nn(r, n) {
  const t = this || de, e = n || t, i = ot.from(e.headers);
  let s = e.data;
  return y.forEach(r, function(c) {
    s = c.call(t, s, i.normalize(), n ? n.status : void 0);
  }), i.normalize(), s;
}
function sr(r) {
  return !!(r && r.__CANCEL__);
}
function Qt(r, n, t) {
  A.call(this, r ?? "canceled", A.ERR_CANCELED, n, t), this.name = "CanceledError";
}
y.inherits(Qt, A, {
  __CANCEL__: !0
});
function ar(r, n, t) {
  const e = t.config.validateStatus;
  !t.status || !e || e(t.status) ? r(t) : n(new A(
    "Request failed with status code " + t.status,
    [A.ERR_BAD_REQUEST, A.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
function _c(r) {
  const n = /^([-+\w]{1,25})(:?\/\/|:)/.exec(r);
  return n && n[1] || "";
}
function fc(r, n) {
  r = r || 10;
  const t = new Array(r), e = new Array(r);
  let i = 0, s = 0, a;
  return n = n !== void 0 ? n : 1e3, function(l) {
    const h = Date.now(), p = e[s];
    a || (a = h), t[i] = l, e[i] = h;
    let f = s, b = 0;
    for (; f !== i; )
      b += t[f++], f = f % r;
    if (i = (i + 1) % r, i === s && (s = (s + 1) % r), h - a < n)
      return;
    const E = p && h - p;
    return E ? Math.round(b * 1e3 / E) : void 0;
  };
}
function gc(r, n) {
  let t = 0, e = 1e3 / n, i, s;
  const a = (h, p = Date.now()) => {
    t = p, i = null, s && (clearTimeout(s), s = null), r.apply(null, h);
  };
  return [(...h) => {
    const p = Date.now(), f = p - t;
    f >= e ? a(h, p) : (i = h, s || (s = setTimeout(() => {
      s = null, a(i);
    }, e - f)));
  }, () => i && a(i)];
}
const Ue = (r, n, t = 3) => {
  let e = 0;
  const i = fc(50, 250);
  return gc((s) => {
    const a = s.loaded, c = s.lengthComputable ? s.total : void 0, l = a - e, h = i(l), p = a <= c;
    e = a;
    const f = {
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
    r(f);
  }, t);
}, yi = (r, n) => {
  const t = r != null;
  return [(e) => n[0]({
    lengthComputable: t,
    total: r,
    loaded: e
  }), n[1]];
}, bi = (r) => (...n) => y.asap(() => r(...n)), yc = tt.hasStandardBrowserEnv ? /* @__PURE__ */ ((r, n) => (t) => (t = new URL(t, tt.origin), r.protocol === t.protocol && r.host === t.host && (n || r.port === t.port)))(
  new URL(tt.origin),
  tt.navigator && /(msie|trident)/i.test(tt.navigator.userAgent)
) : () => !0, bc = tt.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(r, n, t, e, i, s) {
      const a = [r + "=" + encodeURIComponent(n)];
      y.isNumber(t) && a.push("expires=" + new Date(t).toGMTString()), y.isString(e) && a.push("path=" + e), y.isString(i) && a.push("domain=" + i), s === !0 && a.push("secure"), document.cookie = a.join("; ");
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
function mc(r) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(r);
}
function wc(r, n) {
  return n ? r.replace(/\/?\/$/, "") + "/" + n.replace(/^\/+/, "") : r;
}
function or(r, n, t) {
  let e = !mc(n);
  return r && (e || t == !1) ? wc(r, n) : n;
}
const mi = (r) => r instanceof ot ? { ...r } : r;
function Lt(r, n) {
  n = n || {};
  const t = {};
  function e(h, p, f, b) {
    return y.isPlainObject(h) && y.isPlainObject(p) ? y.merge.call({ caseless: b }, h, p) : y.isPlainObject(p) ? y.merge({}, p) : y.isArray(p) ? p.slice() : p;
  }
  function i(h, p, f, b) {
    if (y.isUndefined(p)) {
      if (!y.isUndefined(h))
        return e(void 0, h, f, b);
    } else return e(h, p, f, b);
  }
  function s(h, p) {
    if (!y.isUndefined(p))
      return e(void 0, p);
  }
  function a(h, p) {
    if (y.isUndefined(p)) {
      if (!y.isUndefined(h))
        return e(void 0, h);
    } else return e(void 0, p);
  }
  function c(h, p, f) {
    if (f in n)
      return e(h, p);
    if (f in r)
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
    headers: (h, p, f) => i(mi(h), mi(p), f, !0)
  };
  return y.forEach(Object.keys(Object.assign({}, r, n)), function(p) {
    const f = l[p] || i, b = f(r[p], n[p], p);
    y.isUndefined(b) && f !== c || (t[p] = b);
  }), t;
}
const cr = (r) => {
  const n = Lt({}, r);
  let { data: t, withXSRFToken: e, xsrfHeaderName: i, xsrfCookieName: s, headers: a, auth: c } = n;
  n.headers = a = ot.from(a), n.url = nr(or(n.baseURL, n.url, n.allowAbsoluteUrls), r.params, r.paramsSerializer), c && a.set(
    "Authorization",
    "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))
  );
  let l;
  if (y.isFormData(t)) {
    if (tt.hasStandardBrowserEnv || tt.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if ((l = a.getContentType()) !== !1) {
      const [h, ...p] = l ? l.split(";").map((f) => f.trim()).filter(Boolean) : [];
      a.setContentType([h || "multipart/form-data", ...p].join("; "));
    }
  }
  if (tt.hasStandardBrowserEnv && (e && y.isFunction(e) && (e = e(n)), e || e !== !1 && yc(n.url))) {
    const h = i && s && bc.read(s);
    h && a.set(i, h);
  }
  return n;
}, vc = typeof XMLHttpRequest < "u", Ec = vc && function(r) {
  return new Promise(function(t, e) {
    const i = cr(r);
    let s = i.data;
    const a = ot.from(i.headers).normalize();
    let { responseType: c, onUploadProgress: l, onDownloadProgress: h } = i, p, f, b, E, v;
    function S() {
      E && E(), v && v(), i.cancelToken && i.cancelToken.unsubscribe(p), i.signal && i.signal.removeEventListener("abort", p);
    }
    let T = new XMLHttpRequest();
    T.open(i.method.toUpperCase(), i.url, !0), T.timeout = i.timeout;
    function q() {
      if (!T)
        return;
      const H = ot.from(
        "getAllResponseHeaders" in T && T.getAllResponseHeaders()
      ), X = {
        data: !c || c === "text" || c === "json" ? T.responseText : T.response,
        status: T.status,
        statusText: T.statusText,
        headers: H,
        config: r,
        request: T
      };
      ar(function(ct) {
        t(ct), S();
      }, function(ct) {
        e(ct), S();
      }, X), T = null;
    }
    "onloadend" in T ? T.onloadend = q : T.onreadystatechange = function() {
      !T || T.readyState !== 4 || T.status === 0 && !(T.responseURL && T.responseURL.indexOf("file:") === 0) || setTimeout(q);
    }, T.onabort = function() {
      T && (e(new A("Request aborted", A.ECONNABORTED, r, T)), T = null);
    }, T.onerror = function() {
      e(new A("Network Error", A.ERR_NETWORK, r, T)), T = null;
    }, T.ontimeout = function() {
      let it = i.timeout ? "timeout of " + i.timeout + "ms exceeded" : "timeout exceeded";
      const X = i.transitional || ir;
      i.timeoutErrorMessage && (it = i.timeoutErrorMessage), e(new A(
        it,
        X.clarifyTimeoutError ? A.ETIMEDOUT : A.ECONNABORTED,
        r,
        T
      )), T = null;
    }, s === void 0 && a.setContentType(null), "setRequestHeader" in T && y.forEach(a.toJSON(), function(it, X) {
      T.setRequestHeader(X, it);
    }), y.isUndefined(i.withCredentials) || (T.withCredentials = !!i.withCredentials), c && c !== "json" && (T.responseType = i.responseType), h && ([b, v] = Ue(h, !0), T.addEventListener("progress", b)), l && T.upload && ([f, E] = Ue(l), T.upload.addEventListener("progress", f), T.upload.addEventListener("loadend", E)), (i.cancelToken || i.signal) && (p = (H) => {
      T && (e(!H || H.type ? new Qt(null, r, T) : H), T.abort(), T = null);
    }, i.cancelToken && i.cancelToken.subscribe(p), i.signal && (i.signal.aborted ? p() : i.signal.addEventListener("abort", p)));
    const U = _c(i.url);
    if (U && tt.protocols.indexOf(U) === -1) {
      e(new A("Unsupported protocol " + U + ":", A.ERR_BAD_REQUEST, r));
      return;
    }
    T.send(s || null);
  });
}, Pc = (r, n) => {
  const { length: t } = r = r ? r.filter(Boolean) : [];
  if (n || t) {
    let e = new AbortController(), i;
    const s = function(h) {
      if (!i) {
        i = !0, c();
        const p = h instanceof Error ? h : this.reason;
        e.abort(p instanceof A ? p : new Qt(p instanceof Error ? p.message : p));
      }
    };
    let a = n && setTimeout(() => {
      a = null, s(new A(`timeout ${n} of ms exceeded`, A.ETIMEDOUT));
    }, n);
    const c = () => {
      r && (a && clearTimeout(a), a = null, r.forEach((h) => {
        h.unsubscribe ? h.unsubscribe(s) : h.removeEventListener("abort", s);
      }), r = null);
    };
    r.forEach((h) => h.addEventListener("abort", s));
    const { signal: l } = e;
    return l.unsubscribe = () => y.asap(c), l;
  }
}, Cc = function* (r, n) {
  let t = r.byteLength;
  if (t < n) {
    yield r;
    return;
  }
  let e = 0, i;
  for (; e < t; )
    i = e + n, yield r.slice(e, i), e = i;
}, Tc = async function* (r, n) {
  for await (const t of Sc(r))
    yield* Cc(t, n);
}, Sc = async function* (r) {
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
}, wi = (r, n, t, e) => {
  const i = Tc(r, n);
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
        let f = p.byteLength;
        if (t) {
          let b = s += f;
          t(b);
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
}, $e = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", lr = $e && typeof ReadableStream == "function", kc = $e && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((r) => (n) => r.encode(n))(new TextEncoder()) : async (r) => new Uint8Array(await new Response(r).arrayBuffer())), hr = (r, ...n) => {
  try {
    return !!r(...n);
  } catch {
    return !1;
  }
}, xc = lr && hr(() => {
  let r = !1;
  const n = new Request(tt.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return r = !0, "half";
    }
  }).headers.has("Content-Type");
  return r && !n;
}), vi = 64 * 1024, yn = lr && hr(() => y.isReadableStream(new Response("").body)), Le = {
  stream: yn && ((r) => r.body)
};
$e && ((r) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((n) => {
    !Le[n] && (Le[n] = y.isFunction(r[n]) ? (t) => t[n]() : (t, e) => {
      throw new A(`Response type '${n}' is not supported`, A.ERR_NOT_SUPPORT, e);
    });
  });
})(new Response());
const Ac = async (r) => {
  if (r == null)
    return 0;
  if (y.isBlob(r))
    return r.size;
  if (y.isSpecCompliantForm(r))
    return (await new Request(tt.origin, {
      method: "POST",
      body: r
    }).arrayBuffer()).byteLength;
  if (y.isArrayBufferView(r) || y.isArrayBuffer(r))
    return r.byteLength;
  if (y.isURLSearchParams(r) && (r = r + ""), y.isString(r))
    return (await kc(r)).byteLength;
}, Dc = async (r, n) => {
  const t = y.toFiniteNumber(r.getContentLength());
  return t ?? Ac(n);
}, Rc = $e && (async (r) => {
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
    withCredentials: f = "same-origin",
    fetchOptions: b
  } = cr(r);
  h = h ? (h + "").toLowerCase() : "text";
  let E = Pc([i, s && s.toAbortSignal()], a), v;
  const S = E && E.unsubscribe && (() => {
    E.unsubscribe();
  });
  let T;
  try {
    if (l && xc && t !== "get" && t !== "head" && (T = await Dc(p, e)) !== 0) {
      let X = new Request(n, {
        method: "POST",
        body: e,
        duplex: "half"
      }), x;
      if (y.isFormData(e) && (x = X.headers.get("content-type")) && p.setContentType(x), X.body) {
        const [ct, wt] = yi(
          T,
          Ue(bi(l))
        );
        e = wi(X.body, vi, ct, wt);
      }
    }
    y.isString(f) || (f = f ? "include" : "omit");
    const q = "credentials" in Request.prototype;
    v = new Request(n, {
      ...b,
      signal: E,
      method: t.toUpperCase(),
      headers: p.normalize().toJSON(),
      body: e,
      duplex: "half",
      credentials: q ? f : void 0
    });
    let U = await fetch(v);
    const H = yn && (h === "stream" || h === "response");
    if (yn && (c || H && S)) {
      const X = {};
      ["status", "statusText", "headers"].forEach((vt) => {
        X[vt] = U[vt];
      });
      const x = y.toFiniteNumber(U.headers.get("content-length")), [ct, wt] = c && yi(
        x,
        Ue(bi(c), !0)
      ) || [];
      U = new Response(
        wi(U.body, vi, ct, () => {
          wt && wt(), S && S();
        }),
        X
      );
    }
    h = h || "text";
    let it = await Le[y.findKey(Le, h) || "text"](U, r);
    return !H && S && S(), await new Promise((X, x) => {
      ar(X, x, {
        data: it,
        headers: ot.from(U.headers),
        status: U.status,
        statusText: U.statusText,
        config: r,
        request: v
      });
    });
  } catch (q) {
    throw S && S(), q && q.name === "TypeError" && /fetch/i.test(q.message) ? Object.assign(
      new A("Network Error", A.ERR_NETWORK, r, v),
      {
        cause: q.cause || q
      }
    ) : A.from(q, q && q.code, r, v);
  }
}), bn = {
  http: $o,
  xhr: Ec,
  fetch: Rc
};
y.forEach(bn, (r, n) => {
  if (r) {
    try {
      Object.defineProperty(r, "name", { value: n });
    } catch {
    }
    Object.defineProperty(r, "adapterName", { value: n });
  }
});
const Ei = (r) => `- ${r}`, Ic = (r) => y.isFunction(r) || r === null || r === !1, ur = {
  getAdapter: (r) => {
    r = y.isArray(r) ? r : [r];
    const { length: n } = r;
    let t, e;
    const i = {};
    for (let s = 0; s < n; s++) {
      t = r[s];
      let a;
      if (e = t, !Ic(t) && (e = bn[(a = String(t)).toLowerCase()], e === void 0))
        throw new A(`Unknown adapter '${a}'`);
      if (e)
        break;
      i[a || "#" + s] = e;
    }
    if (!e) {
      const s = Object.entries(i).map(
        ([c, l]) => `adapter ${c} ` + (l === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = n ? s.length > 1 ? `since :
` + s.map(Ei).join(`
`) : " " + Ei(s[0]) : "as no adapter specified";
      throw new A(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return e;
  },
  adapters: bn
};
function rn(r) {
  if (r.cancelToken && r.cancelToken.throwIfRequested(), r.signal && r.signal.aborted)
    throw new Qt(null, r);
}
function Pi(r) {
  return rn(r), r.headers = ot.from(r.headers), r.data = nn.call(
    r,
    r.transformRequest
  ), ["post", "put", "patch"].indexOf(r.method) !== -1 && r.headers.setContentType("application/x-www-form-urlencoded", !1), ur.getAdapter(r.adapter || de.adapter)(r).then(function(e) {
    return rn(r), e.data = nn.call(
      r,
      r.transformResponse,
      e
    ), e.headers = ot.from(e.headers), e;
  }, function(e) {
    return sr(e) || (rn(r), e && e.response && (e.response.data = nn.call(
      r,
      r.transformResponse,
      e.response
    ), e.response.headers = ot.from(e.response.headers))), Promise.reject(e);
  });
}
const dr = "1.8.4", ze = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((r, n) => {
  ze[r] = function(e) {
    return typeof e === r || "a" + (n < 1 ? "n " : " ") + r;
  };
});
const Ci = {};
ze.transitional = function(n, t, e) {
  function i(s, a) {
    return "[Axios v" + dr + "] Transitional option '" + s + "'" + a + (e ? ". " + e : "");
  }
  return (s, a, c) => {
    if (n === !1)
      throw new A(
        i(a, " has been removed" + (t ? " in " + t : "")),
        A.ERR_DEPRECATED
      );
    return t && !Ci[a] && (Ci[a] = !0, console.warn(
      i(
        a,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), n ? n(s, a, c) : !0;
  };
};
ze.spelling = function(n) {
  return (t, e) => (console.warn(`${e} is likely a misspelling of ${n}`), !0);
};
function Oc(r, n, t) {
  if (typeof r != "object")
    throw new A("options must be an object", A.ERR_BAD_OPTION_VALUE);
  const e = Object.keys(r);
  let i = e.length;
  for (; i-- > 0; ) {
    const s = e[i], a = n[s];
    if (a) {
      const c = r[s], l = c === void 0 || a(c, s, r);
      if (l !== !0)
        throw new A("option " + s + " must be " + l, A.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new A("Unknown option " + s, A.ERR_BAD_OPTION);
  }
}
const ke = {
  assertOptions: Oc,
  validators: ze
}, Et = ke.validators;
let Ut = class {
  constructor(n) {
    this.defaults = n, this.interceptors = {
      request: new fi(),
      response: new fi()
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
    typeof n == "string" ? (t = t || {}, t.url = n) : t = n || {}, t = Lt(this.defaults, t);
    const { transitional: e, paramsSerializer: i, headers: s } = t;
    e !== void 0 && ke.assertOptions(e, {
      silentJSONParsing: Et.transitional(Et.boolean),
      forcedJSONParsing: Et.transitional(Et.boolean),
      clarifyTimeoutError: Et.transitional(Et.boolean)
    }, !1), i != null && (y.isFunction(i) ? t.paramsSerializer = {
      serialize: i
    } : ke.assertOptions(i, {
      encode: Et.function,
      serialize: Et.function
    }, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : t.allowAbsoluteUrls = !0), ke.assertOptions(t, {
      baseUrl: Et.spelling("baseURL"),
      withXsrfToken: Et.spelling("withXSRFToken")
    }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let a = s && y.merge(
      s.common,
      s[t.method]
    );
    s && y.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (v) => {
        delete s[v];
      }
    ), t.headers = ot.concat(a, s);
    const c = [];
    let l = !0;
    this.interceptors.request.forEach(function(S) {
      typeof S.runWhen == "function" && S.runWhen(t) === !1 || (l = l && S.synchronous, c.unshift(S.fulfilled, S.rejected));
    });
    const h = [];
    this.interceptors.response.forEach(function(S) {
      h.push(S.fulfilled, S.rejected);
    });
    let p, f = 0, b;
    if (!l) {
      const v = [Pi.bind(this), void 0];
      for (v.unshift.apply(v, c), v.push.apply(v, h), b = v.length, p = Promise.resolve(t); f < b; )
        p = p.then(v[f++], v[f++]);
      return p;
    }
    b = c.length;
    let E = t;
    for (f = 0; f < b; ) {
      const v = c[f++], S = c[f++];
      try {
        E = v(E);
      } catch (T) {
        S.call(this, T);
        break;
      }
    }
    try {
      p = Pi.call(this, E);
    } catch (v) {
      return Promise.reject(v);
    }
    for (f = 0, b = h.length; f < b; )
      p = p.then(h[f++], h[f++]);
    return p;
  }
  getUri(n) {
    n = Lt(this.defaults, n);
    const t = or(n.baseURL, n.url, n.allowAbsoluteUrls);
    return nr(t, n.params, n.paramsSerializer);
  }
};
y.forEach(["delete", "get", "head", "options"], function(n) {
  Ut.prototype[n] = function(t, e) {
    return this.request(Lt(e || {}, {
      method: n,
      url: t,
      data: (e || {}).data
    }));
  };
});
y.forEach(["post", "put", "patch"], function(n) {
  function t(e) {
    return function(s, a, c) {
      return this.request(Lt(c || {}, {
        method: n,
        headers: e ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: a
      }));
    };
  }
  Ut.prototype[n] = t(), Ut.prototype[n + "Form"] = t(!0);
});
let Nc = class pr {
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
      e.reason || (e.reason = new Qt(s, a, c), t(e.reason));
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
      token: new pr(function(i) {
        n = i;
      }),
      cancel: n
    };
  }
};
function Bc(r) {
  return function(t) {
    return r.apply(null, t);
  };
}
function Mc(r) {
  return y.isObject(r) && r.isAxiosError === !0;
}
const mn = {
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
Object.entries(mn).forEach(([r, n]) => {
  mn[n] = r;
});
function _r(r) {
  const n = new Ut(r), t = Wi(Ut.prototype.request, n);
  return y.extend(t, Ut.prototype, n, { allOwnKeys: !0 }), y.extend(t, n, null, { allOwnKeys: !0 }), t.create = function(i) {
    return _r(Lt(r, i));
  }, t;
}
const j = _r(de);
j.Axios = Ut;
j.CanceledError = Qt;
j.CancelToken = Nc;
j.isCancel = sr;
j.VERSION = dr;
j.toFormData = We;
j.AxiosError = A;
j.Cancel = j.CanceledError;
j.all = function(n) {
  return Promise.all(n);
};
j.spread = Bc;
j.isAxiosError = Mc;
j.mergeConfig = Lt;
j.AxiosHeaders = ot;
j.formToJSON = (r) => rr(y.isHTMLForm(r) ? new FormData(r) : r);
j.getAdapter = ur.getAdapter;
j.HttpStatusCode = mn;
j.default = j;
const {
  Axios: jc,
  AxiosError: Hc,
  CanceledError: Kc,
  isCancel: Wc,
  CancelToken: $c,
  VERSION: zc,
  all: Gc,
  Cancel: Xc,
  isAxiosError: Jc,
  spread: Qc,
  toFormData: Zc,
  AxiosHeaders: Yc,
  HttpStatusCode: tl,
  formToJSON: el,
  getAdapter: nl,
  mergeConfig: il
} = j;
var _, fr, gr, yr, wn, br, mr, wr, vr, Er, Pr, Cr, Tr, Sr, kr, ee, ne, xr, ie, Ar, Bt, Dr, $, Rr, Ir, vn, Or, Nr, Br, En, Pn, re, Cn, Mr, ft, gt, xe, Tn, se, Sn, kn, Fr, xn, An, Ur, Lr, Ht, Dn, Vr, qr, jr, Ae, Hr, Kr, Rn, Wr, $r, zr, Gr, Xr, Jr, Qr, Zr, Yr, In, On, ts, es, ns;
class rl extends Dt {
  constructor({
    filters: t = null,
    config_port: e = {
      baudRate: 19200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      bufferSize: 32768,
      flowControl: "none"
    },
    no_device: i = 1,
    device_listen_on_channel: s = 1,
    username: a = null,
    password: c = null,
    environment: l = "production"
  } = {
    filters: null,
    config_port: {
      baudRate: 19200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      bufferSize: 32768,
      flowControl: "none"
    },
    no_device: 1,
    device_listen_on_channel: 1,
    username: null,
    password: null,
    environment: "production"
  }) {
    super({ filters: t, config_port: e, no_device: i, device_listen_on_channel: s });
    G(this, _);
    lt(this, "__pinPad__", {
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
    if (this.__internal__.device.type = "pinpad", !Ca())
      throw new Error("Crypto not supported in this browser");
    if (k.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.time.response_connection = 3e3, this.__internal__.time.response_general = 5e3, this.__internal__.serial.delay_first_connection = 1e3, this.environment = l, a && (this.username = a), c && (this.password = c), o(this, _, gr).call(this), o(this, _, fr).call(this);
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
    let a = o(this, _, yr).call(this, s);
    switch (this.__pinPad__.buffer = s, e.parsed = a, e.code = s, e.request) {
      case "connect":
        e.name = "connected", e.description = "Connection established", e.no_code = 100, o(this, _, wn).call(this, a, s);
        break;
      case "about":
        e.name = "About PinPad", e.description = "Response of about", e.no_code = 101, o(this, _, wn).call(this, a, s);
        break;
      case "inject":
        e.name = "Inject", e.description = "Response of inject values", e.no_code = 102, o(this, _, br).call(this, a, s);
        break;
      case "init-dukpt":
        e.name = "Init DUKPT", e.description = "Response of init DUKPT", e.no_code = 103, o(this, _, mr).call(this, a, s);
        break;
      case "dukpt":
        e.name = "Write DUKPT", e.description = "Response of write DUKPT", e.no_code = 104, o(this, _, wr).call(this, a, s);
        break;
      case "read-card":
        e.name = "read card", e.description = "response of read card", e.no_code = 105, o(this, _, vr).call(this, a, s);
        break;
      case "second-generate":
        e.name = "second generate", e.description = "response of second generate", e.no_code = 106, o(this, _, Er).call(this, a, s);
        break;
      case "cancel":
        e.name = "cancel pinpad", e.description = "response of cancel", e.no_code = 107;
        break;
      case "print":
        o(this, _, Tr).call(this, a, s), e.name = "print voucher", e.description = "response of print", e.no_code = 108;
        break;
      case "cancel-read-card":
        o(this, _, Cr).call(this, a, s), e.name = "cancel read card", e.description = "response of cancel read card", e.no_code = 109;
        break;
      case "code93":
        o(this, _, Sr).call(this, a, s), e.name = "code 93", e.description = "response of code 93", e.no_code = 110;
        break;
      case "finish-emv-end":
        o(this, _, kr).call(this, a, s), e.name = "Finish EMV End", e.description = "response of finish EMV End", e.no_code = 111;
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
    if (!o(this, _, Cn).call(this, t.trim())) throw new Error("Invalid reference");
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
    return await o(this, _, Ir).call(this, t);
  }
  clearSession() {
    localStorage.removeItem("ppLoginResponse"), localStorage.removeItem("ppRSAKey"), localStorage.removeItem("ppPublicIP");
  }
  async checkPositionPermission() {
    if (!zn())
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
    this.__pinPad__.operation.commerceVoucher.includes(":") || (this.__pinPad__.operation.commerceVoucher = o(this, _, Bt).call(this, this.__pinPad__.config.RC4Key, this.__pinPad__.operation.commerceVoucher)), this.__pinPad__.operation.clientVoucher.includes(":") || (this.__pinPad__.operation.clientVoucher = o(this, _, Bt).call(this, this.__pinPad__.config.RC4Key, this.__pinPad__.operation.clientVoucher));
    let s = t === "client" ? this.__pinPad__.operation.clientVoucher : this.__pinPad__.operation.commerceVoucher;
    if (s.length === 0) {
      this.dispatch("pp:print", {
        error: !0,
        code: "001",
        message: "Without information to print"
      });
      return;
    }
    s = o(this, _, Dr).call(this, s), s = o(this, _, Rr).call(this, s, this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion);
    let a = "C59A" + s;
    a = e + o(this, _, ft).call(this, a) + a + i, a = a + o(this, _, gt).call(this, a), t === "client" ? this.__pinPad__.operation.clientVoucher = "" : t === "commerce" && (this.__pinPad__.operation.commerceVoucher = "");
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
    return t || (t = this.reference), Tt(t) && (t = "--", this.reference = t), o(this, _, Mr).call(this, this.reference), this.__pinPad__.operation.consultDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB"), await o(this, _, se).call(this, {
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      Tx_Date: this.__pinPad__.operation.consultDate
    }), o(this, _, Ht).call(this, this.url + this.__pinPad__.constants.uris.consult, {
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
    t === null && (t = this.__pinPad__.operation.folio || ""), o(this, _, Sn).call(this, t), await o(this, _, se).call(this, {
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      Tx_OperationNumber: t
    });
    const e = await o(this, _, Ht).call(this, this.url + this.__pinPad__.constants.uris.rePrint, {
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
    return this.__pinPad__.operation.commerceVoucher = "", i && (e.voucher_comercio.includes(":") ? this.__pinPad__.operation.commerceVoucher = e.voucher_comercio : this.__pinPad__.operation.commerceVoucher = o(this, _, Bt).call(this, this.__pinPad__.config.RC4Key, e.voucher_comercio)), i = e.voucher_cliente, this.__pinPad__.operation.clientVoucher = "", i && (e.voucher_cliente.includes(":") ? this.__pinPad__.operation.clientVoucher = e.voucher_cliente : this.__pinPad__.operation.clientVoucher = o(this, _, Bt).call(this, this.__pinPad__.config.RC4Key, e.voucher_cliente)), e;
  }
  async cancelPurchase({ amount: t = 0, authorization: e = "", folio: i = "" } = {}) {
    if (!o(this, _, Tn).call(this, t)) throw new Error("Invalid amount");
    if (!o(this, _, Xr).call(this, e)) throw new Error("Invalid authorization");
    if (!o(this, _, Sn).call(this, i)) throw new Error("Invalid folio");
    t = o(this, _, Rn).call(this, t, 2);
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
    await o(this, _, se).call(this, s);
    const a = o(this, _, Ht).call(this, this.url + this.__pinPad__.constants.uris.cancellation, {
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
    return this.__pinPad__.operation.commerceVoucher = "", a.voucher_comercio && (a.voucher_comercio.includes(":") ? this.__pinPad__.operation.commerceVoucher = a.voucher_comercio : this.__pinPad__.operation.commerceVoucher = o(this, _, Bt).call(this, this.__pinPad__.config.RC4Key, a.voucher_comercio)), this.__pinPad__.operation.clientVoucher = "", a.voucher_cliente && (a.voucher_cliente.includes(":") ? this.__pinPad__.operation.clientVoucher = a.voucher_cliente : this.__pinPad__.operation.clientVoucher = o(this, _, Bt).call(this, this.__pinPad__.config.RC4Key, a.voucher_cliente)), JSON.stringify(a);
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
    if (this.amount = t, !e || Tt(e) || !o(this, _, Cn).call(this, e))
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
      return await this.login(), await o(this, _, Kr).call(this), !await o(this, _, Wr).call(this) || !await o(this, _, qr).call(this) ? i : await o(this, _, Qr).call(this);
    } catch (s) {
      console.warn(s), i.error = !0, i.message = s.message, i.approved = !1, i.object = s;
    }
    return i;
  }
}
_ = new WeakSet(), fr = function() {
  k.add(this);
}, gr = function() {
  const t = [
    "pp:processing-card",
    "pp:read-card",
    "pp:error",
    "pp:print",
    "pp:merchant-moto",
    "pp:dukpt",
    "pp:finish-emv",
    "pp:response"
  ];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, yr = function(t) {
  const e = this.__pinPad__.constants.STX, i = this.__pinPad__.constants.ETX, s = this.__pinPad__.constants.FS, a = this.__pinPad__.constants.getNULL;
  t = t.replace(new RegExp(e, "g"), "");
  const c = t.split(i);
  t = c[0];
  const l = t.split(s);
  l.push(...c[1].split(s));
  const h = {};
  return l.map((p, f) => {
    const b = f > 0 ? p.substring(0, 1) : "A", E = f > 0 ? p.substring(1) : p;
    return { [b]: E.replace(new RegExp(a, "g"), "") };
  }).forEach((p) => Object.assign(h, p)), h;
}, wn = function(t, e) {
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
br = function(t, e) {
  this.__pinPad__.waiting.statusInjectWaiting = "resolved";
}, mr = function(t, e) {
  e = e.replace("010P93A00B01t036P81AACERQUE, INSERTE CHIP O  DESLICE*", ""), this.__pinPad__.config.terminal = {
    nb_kcv: e.substring(e.indexOf("E") + 2, e.indexOf("F")),
    nb_marca_terminal: e.substring(e.indexOf("P91A") + 4, e.indexOf("B")),
    nb_modelo_terminal: e.substring(e.indexOf("B") + 2, e.indexOf("C")),
    nb_serie_lector: e.substring(e.indexOf("C") + 2, e.indexOf("D")),
    nb_tk: e.substring(e.indexOf("F") + 2, e.length - 2),
    nb_version_terminal: e.substring(e.indexOf("D") + 2, e.indexOf("E"))
  }, this.__pinPad__.waiting.statusinitDUKPTWaiting = "resolved";
}, // eslint-disable-next-line no-unused-vars
wr = function(t, e) {
  this.__pinPad__.waiting.statuswritingDUKPTWaiting = "resolved";
}, vr = function(t, e) {
  const i = this.__pinPad__.about.brand.toLowerCase(), s = this.__pinPad__.about.model.toLowerCase(), a = i === "ingenico" && s === "ipp320" ? 500 : 350;
  if (e.length < a) {
    e = e.replace("006P93A00.", "").replace("006P93A00,", ""), e.includes("E93") ? this.__pinPad__.operation.ignore.error = e.substring(e.indexOf("E93") + 3, e.indexOf("E93") + 6) : e.includes("E71") && (this.__pinPad__.operation.ignore.error = e.substring(e.indexOf("E71") + 3, e.indexOf("E71") + 6)), this.__pinPad__.operation.ignore.error !== "" && e.indexOf("OPERACION       CANCELADA") === -1 && e.indexOf("TIEMPO         EXCEDIDO") === -1 && this.__pinPad__.operation.ignore.error.length === 3 && (this.__pinPad__.operation.last_error = o(this, _, On).call(this, this.__pinPad__.operation.ignore.error), this.__pinPad__.waiting.statusReadCardWaiting = "rejected");
    return;
  }
  if (e.includes("M1") || e.includes("M0") || e.includes("M1") || e.includes("N1") || e.includes("N1") || e.includes("P93A022") && e.substring(e.length - 24).includes("I") && e.substring(e.length - 1).includes("") || e.includes("P93A800") && e.substring(e.length - 24).includes("I") && e.substring(e.length - 1).includes("") || e.includes("P93A022") && e.length >= 406 && s === "vx820" || e.includes("P93A022") && e.length >= 406 && s === "vx520" || e.includes("P93A800") && e.length >= 406 && s === "vx520" || e.includes("P93A800") && e.length >= 406 && s === "vx820" || e.includes("P93A022") && e.length >= 406 && s === "p400" || e.includes("P93A800") && e.length >= 406 && s === "p400" || e.includes("P93A022") && e.length >= 406 && s === "v205c" || e.includes("P93A800") && e.length >= 406 && s === "v205c" || e.includes("P93A022") && e.length >= 406 && s === "move2500" || e.includes("P93A800") && e.length >= 406 && s === "move2500" || e.includes("P93A022") && e.length >= 406 && s === "lane3000" || e.includes("P93A800") && e.length >= 406 && s === "lane3000") {
    let c = e;
    i === "verifone" && (c = e.replace("006P93A00.", "").substring(e.indexOf("P93A"), e.indexOf("P93A") + 7)), e.includes("P81APROCESANDO, NO RETIRE TARJETA") || e.includes("P81APROCESANDO TARJETA") || c.includes("P93A022") || c.includes("P81AINSERTE CHIP O  DESLICE TARJETA") || c.includes("ACERQUE, INSERTE CHIP O  DESLICE") || c.includes("P81AACERQUE, INSERTE CHIP O  DESLICE TARJETA") ? this.dispatch("pp:processing-card", { waiting: !0 }) : e.length > a && o(this, _, Pr).call(this, e);
  }
}, Er = function(t, e) {
  const i = this.__pinPad__.constants.ETX;
  let s = e.replace("023P81AFAVOR RETIRAR TARJ.", "").replace("020P81A DECLINADA EMV  ", "").replace("020P81A DECLINADA EMV  ", "");
  s = s.substring(s.indexOf("B") + 2, s.indexOf(i)), s.includes("006E93A16") && (s = "01"), this.__pinPad__.operation.applyReverse = s === "01" && this.__pinPad__.operation.responseMit._approved && this.__pinPad__.config.otherLogin.executeReverse === "1", this.__pinPad__.waiting.statusSecondGenerateWaiting = "resolved";
}, Pr = function(t) {
  const e = this.__pinPad__.constants.ETX, i = this.__pinPad__.about.brand.toLowerCase();
  let s, a, c, l, h;
  i === "verifone" ? t = t.replace("006P93A00.", "").replace("009P93A00", "").replace("010P93A00B01v", "") : t = t.replace("006P93A00,", ""), this.__pinPad__.config.read.POSEM = t.substring(t.indexOf("P93A") + 4, t.indexOf("B"));
  const p = this.__pinPad__.config.read.POSEM;
  if (p === "051" || p === "071") {
    if (this.__pinPad__.config.read.Chip = "1", this.__pinPad__.config.read.PIN = t.substring(t.indexOf("C") + 2, t.indexOf("D")), this.__pinPad__.config.read.AppId = t.substring(t.indexOf("G") + 2, t.indexOf("H")), this.__pinPad__.config.read.AppIdLabel = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.Arqc = t.substring(t.indexOf("F") + 2, t.indexOf("G")), t.includes("O")) {
      const f = t.substring(t.indexOf("P93A"));
      this.__pinPad__.config.read.ReadCTLS = f.substring(
        f.indexOf("M") + 2,
        f.indexOf("N")
      ), this.__pinPad__.operation.hasQPS = f.substring(f.indexOf("N") + 2, f.indexOf("O")) === "1", this.__pinPad__.operation.bin8 = f.substring(f.indexOf("O") + 2, f.indexOf(e));
    } else if (t.includes("N")) {
      const f = t.substring(t.indexOf("P93A"));
      this.__pinPad__.config.read.ReadCTLS = f.substring(
        f.indexOf("M") + 2,
        f.indexOf("N")
      ), this.__pinPad__.operation.hasQPS = f.substring(f.indexOf("N") + 2, f.indexOf(e)) === "1";
    } else {
      const f = t.substring(t.indexOf("P93A"), t.indexOf("M") + 5);
      this.__pinPad__.config.read.ReadCTLS = f.substring(f.indexOf("M") + 2, f.indexOf(e)), this.__pinPad__.operation.hasQPS = !1;
    }
    this.__pinPad__.config.read.Tags = t.substring(t.indexOf("B") + 2, t.indexOf("C")), this.__pinPad__.config.read.NB_ksn = t.substring(t.indexOf("K") + 2, t.indexOf("M")), this.__pinPad__.config.read.NB_Data = t.substring(t.indexOf("D") + 2, t.indexOf("E")), a = t.substring(t.indexOf("I") + 2, t.indexOf("J")), c = t.substring(t.indexOf("E") + 2, t.indexOf("F")), this.__pinPad__.config.read.ChipName = c, s = t.substring(t.indexOf("J") + 2, t.indexOf("K"));
  } else {
    let f;
    if (this.__pinPad__.config.read.Chip = "0", this.__pinPad__.config.read.PIN = "", this.__pinPad__.config.read.AppId = "", this.__pinPad__.config.read.Arqc = "", this.__pinPad__.config.read.ReadCTLS = "0", this.__pinPad__.config.read.AppIdLabel = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.Tags = t.substring(t.indexOf("B") + 2, t.indexOf("C")), p === "022")
      if (t.includes("O")) {
        const b = t.substring(t.indexOf("P93A"));
        this.__pinPad__.operation.bin8 = b.substring(b.indexOf("O") + 2, b.indexOf(e)), f = t.substring(t.indexOf("P93A022"), t.indexOf("I") + 23), f = f.substring(f.indexOf("I") + 2, f.lastIndexOf(""));
      } else
        f = t.substring(t.indexOf("P93A022"), t.indexOf("I") + 23), f = f.substring(f.indexOf("I") + 2, f.indexOf(e));
    else
      f = t.substring(t.indexOf("P93A800"), t.indexOf("I") + 23), f = f.substring(f.indexOf("I") + 2, f.indexOf(e));
    this.__pinPad__.config.read.NB_ksn = f, this.__pinPad__.config.read.NB_Data = t.substring(t.indexOf("B") + 2, t.indexOf("C")), a = t.substring(t.indexOf("F") + 2, t.indexOf("G")), s = t.substring(t.indexOf("G") + 2, t.indexOf("H")), this.__pinPad__.about.model.toLowerCase() === "vx520" ? (c = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.ChipName = c) : (c = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.ChipName = c);
  }
  s.includes("/") && (s = s.replace("/", "")), s.toString().length === 4 ? (h = s.toString().substring(0, 2), l = s.toString().substring(2)) : (h = "", l = ""), this.__pinPad__.config.read.Chip === "1" ? (this.__pinPad__.config.read.EMV = "3", this.__pinPad__.config.read.ChipNameEnc = "1") : (this.__pinPad__.config.read.ChipNameEnc = "", this.__pinPad__.config.read.EMV = "2"), this.__pinPad__.config.read.AppIdLabel.toLowerCase().includes("american") || this.__pinPad__.config.read.AppIdLabel.toLowerCase().includes("amex") ? this.__pinPad__.config.read.Type = "AMEX" : this.__pinPad__.config.read.Type = "V/MC", this.__pinPad__.operation.bin = a, a.length > 6 && (this.__pinPad__.operation.bin = a.substring(0, 6)), this.__pinPad__.waiting.statusReadCardWaiting = "resolved", this.dispatch("pp:read-card", {
    ERROR: "",
    maskPan: a,
    name: c,
    month: h,
    year: l
  });
}, Cr = function(t, e) {
  e.length > 10 && e.includes("E93A10") && (this.__pinPad__.waiting.statusReadCardWaiting === "pending" && (this.__pinPad__.waiting.statusReadCardWaiting = "rejected"), this.dispatch("pp:error", { message: "Operation cancelled by user." }));
}, Tr = function(t, e) {
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
Sr = function(t, e) {
}, // eslint-disable-next-line no-unused-vars
kr = function(t, e) {
}, // ========================================================================================
// Updated to WS v4
// ========================================================================================
ee = function(t, e) {
  const i = new ao();
  return i.setPublicKey(t), i.encrypt(e);
}, ne = function(t) {
  const e = "0123456789ABCDEF";
  let i = "";
  for (let s = 0; s < t; s++) {
    const a = Math.floor(Math.random() * e.length);
    i += e.substring(a, a + 1);
  }
  return i;
}, xr = function(t) {
  const e = "0123456789abcdef", i = [], s = [];
  for (let a = 0; a < 256; a++)
    i[a] = e.charAt(a >> 4) + e.charAt(a & 15);
  for (let a = 0; a < t.length; a++)
    s[a] = i[t.charCodeAt(a)];
  return s.join("");
}, ie = async function(t, e) {
  const i = new Uint8Array(t.match(/.{1,2}/g).map((b) => parseInt(b, 16))), s = crypto.getRandomValues(new Uint8Array(16)), c = new TextEncoder().encode(e), l = await crypto.subtle.importKey("raw", i, { name: "AES-CBC" }, !1, ["encrypt"]), h = await crypto.subtle.encrypt({ name: "AES-CBC", iv: s }, l, c), p = btoa(String.fromCharCode(...s)), f = btoa(String.fromCharCode(...new Uint8Array(h)));
  return p + f;
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
Ar = function(t, e, i = !1) {
  const s = [];
  for (let p = 0; p < 256; p++)
    s[p] = p;
  let a = 0;
  for (let p = 0; p < 256; p++)
    a = (a + s[p] + t.charCodeAt(p % t.length)) % 256, [s[p], s[a]] = [s[a], s[p]];
  let c = 0, l = 0, h = "";
  for (const p of e) {
    c = (c + 1) % 256, l = (l + s[c]) % 256, [s[c], s[l]] = [s[l], s[c]];
    let f = s[(s[c] + s[l]) % 256];
    h += String.fromCharCode(p.charCodeAt(0) ^ f);
  }
  return i ? o(this, _, xr).call(this, h).toUpperCase() : h;
}, Bt = function(t, e) {
  return o(this, _, Ar).call(this, t, this.hexToAscii(e));
}, Dr = function(t) {
  return t.replaceAll("Á", "A"), t.replaceAll("É", "E"), t.replaceAll("Í", "I"), t.replaceAll("Ó", "O"), t.replaceAll("Ú", "U"), t.replaceAll("á", "a"), t.replaceAll("é", "e"), t.replaceAll("í", "i"), t.replaceAll("ó", "o"), t.replaceAll("ú", "u"), t.replaceAll("ñ", "n"), t.replaceAll("Ñ", "N"), t.replaceAll('Electr?a"', "Electronica"), t;
}, $ = function(t, e, i) {
  if (t = t.replace("@cnb logo_cpagos", e), t = t.replace("@cnn ver_app", i), t = t.replace(/@/g, " @"), t = t.replace(/ {2}@/g, " @"), t = t.replace(/ {3}@/g, " @"), t = t.replace(/\r/g, ""), t = t.replace(/\n/g, ""), t.includes("@lsn POR ESTE PAGARE ME OBLIGO INCONDI")) {
    const s = t.indexOf("@lsn POR ESTE PAGARE ME OBLIGO INCONDI");
    t = t.substring(0, s);
  }
  return t.trim() + "@br @br @br @br @br";
}, Rr = function(t, e) {
  const i = "@logo3 @br", s = "@cnn " + e;
  return t.includes("@cnb Santander") ? (t = t.replace("@cnb Santander", "@logo1@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb American Express") ? (t = t.replace("@cnb American Express", "@logo2@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb HSBC") ? (t = t.replace("@cnb HSBC", "@logo7@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb IXE") ? (t = t.replace("@cnb IXE", "@logo11@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb MULTIVA") ? (t = t.replace("@cnb MULTIVA", "@logo15@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb Multiva") ? (t = t.replace("@cnb Multiva", "@logo15@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb SCOTIA BANK") ? (t = t.replace("@cnb SCOTIA BANK", "@logo16@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb SCOTIABANK") ? (t = t.replace("@cnb SCOTIABANK", "@logo16@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb BANCOMER") ? (t = t.replace("@cnb BANCOMER", "@logo17@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb Bancomer") ? (t = t.replace("@cnb Bancomer", "@logo17@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb BBVA") ? (t = t.replace("@cnb BBVA", "@logo17@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb BANORTE") ? (t = t.replace("@cnb BANORTE", "@logo18@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb Banorte") ? (t = t.replace("@cnb Banorte", "@logo18@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb BANREGIO") ? (t = t.replace("@cnb BANREGIO", "@logo19@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb Banregio") ? (t = t.replace("@cnb Banregio", "@logo19@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb GETNET") ? (t = t.replace("@cnb GETNET", "@logo20@br"), o(this, _, $).call(this, t, i, s)) : t.includes("@cnb GetNET") ? (t = t.replace("@cnb GetNET", "@logo20@br"), o(this, _, $).call(this, t, i, s)) : o(this, _, $).call(this, t, i, s);
}, Ir = async function(t = !1) {
  if (o(this, _, Nr).call(this), this.__pinPad__.config.loginResponse && !t) return await o(this, _, vn).call(this);
  const e = this.url + this.__pinPad__.constants.uris.login, i = {
    usuario: this.username,
    password: this.password,
    crypto: "",
    version: this.__pinPad__.constants.appVersion,
    serieLector: "",
    canal: this.__pinPad__.constants.appChannel
  };
  if (await o(this, _, re).call(this), o(this, _, En).call(this))
    throw new Error("Empty RSA Key");
  const s = o(this, _, ne).call(this, 32), a = o(this, _, ee).call(this, this.__pinPad__.config.publicKeyRSA, s), c = await o(this, _, ie).call(this, s, JSON.stringify(i)), l = await j.post(e, c, {
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0",
      data: a || ""
    }
  }).catch((p) => {
    var f;
    throw new Error(`Error in request, verify internet connection: ${(f = p.response) == null ? void 0 : f.status} ${p.message}`);
  });
  let h = o(this, _, kn).call(this, JSON.stringify(l.data));
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
  ), await o(this, _, vn).call(this);
}, vn = async function() {
  await o(this, _, Lr).call(this);
  try {
    await o(this, _, Ur).call(this);
  } catch (t) {
    console.log("Error getting position", t);
  }
  return this.__pinPad__.config.otherLogin = {}, o(this, _, Or).call(this, this.__pinPad__.config.loginResponse), this.__pinPad__.config.otherLogin;
}, Or = function(t) {
  var a, c, l, h, p, f;
  let e = "", i = "";
  (c = (a = t.xml) == null ? void 0 : a.ventaspropias) != null && c.merchant_currencyb && (e = t.xml.ventaspropias.merchant_currencyb), (h = (l = t.xml) == null ? void 0 : l.ventaspropias) != null && h.merchant_currencym && (i = t.xml.ventaspropias.merchant_currencym);
  let s = (p = t.xml) == null ? void 0 : p.emvReverso;
  s || (s = "0"), this.__pinPad__.config.internal.stTokenization = (f = t.xml) == null ? void 0 : f.st_tokenizacion, !this.__pinPad__.config.internal.stTokenization || this.__pinPad__.config.internal.stTokenization === "false" || this.__pinPad__.config.internal.stTokenization === "0" ? this.__pinPad__.config.internal.stTokenization = !1 : this.__pinPad__.config.internal.stTokenization && (this.__pinPad__.config.internal.stTokenization = !0), this.__pinPad__.config.internal.emv = t.xml.importesPGS, this.__pinPad__.config.internal.qpsDomestic = this.__pinPad__.config.internal.emv.qps_dom, this.__pinPad__.config.internal.qpsInternational = this.__pinPad__.config.internal.emv.qps_il, this.__pinPad__.config.internal.cvmlVMCDomestic = this.__pinPad__.config.internal.emv.cvml_vm_dom, this.__pinPad__.config.internal.cvmlVMCInternational = this.__pinPad__.config.internal.emv.cvml_vm_il, this.__pinPad__.config.internal.cvmlAmex = this.__pinPad__.config.internal.emv.cvml_amex, this.__pinPad__.config.internal.translimitCTLSVMC = this.__pinPad__.config.internal.emv.tl_mc, this.__pinPad__.config.internal.translimitCTLSAmex = this.__pinPad__.config.internal.emv.tl_amex, this.__pinPad__.config.country = t.country.toUpperCase(), this.__pinPad__.config.idBranch = t.id_branch.toUpperCase(), this.__pinPad__.config.idCompany = t.id_company.toUpperCase(), this.__pinPad__.config.otherLogin = {
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
}, Nr = function() {
  let t = localStorage.getItem("ppLoginResponse");
  t && (t = JSON.parse(t), this.__pinPad__.config.loginResponse || (this.__pinPad__.config.loginResponse = t.data), (/* @__PURE__ */ new Date()).getTime() - t.timestamp >= 864e5 && (this.__pinPad__.config.loginResponse = null));
}, Br = async function() {
  const t = this.url + this.__pinPad__.constants.uris.RSAKey, e = await j.get(t).catch((i) => {
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
}, En = function() {
  let t = localStorage.getItem("ppRSAKey");
  return !t || (t = JSON.parse(t), this.__pinPad__.config.publicKeyRSA = t.data, (/* @__PURE__ */ new Date()).getTime() - t.timestamp >= 864e5) ? !0 : !this.__pinPad__.config.publicKeyRSA;
}, Pn = async function() {
  return o(this, _, En).call(this) ? await o(this, _, Br).call(this) : this.__pinPad__.config.publicKeyRSA;
}, re = async function() {
  if (!await o(this, _, Pn).call(this))
    throw new Error("RSA public key is empty");
}, Cn = function(t) {
  return /^[A-Z-a-z0-9\s]+$/g.test(t);
}, Mr = function(t) {
  if (Tt(t))
    return !0;
  const e = /^[A-Z-a-z0-9\s]+$/g.test(t) === !0;
  if (!e)
    throw new Error("Invalid reference");
  return e;
}, ft = function(t) {
  return t.length.toString().padStart(3, "0");
}, gt = function(t) {
  let e = 0;
  for (let i = 0; i < t.length; i++)
    e ^= t.charCodeAt(i);
  return String.fromCharCode(e);
}, xe = function(t, e = 0) {
  return t = parseFloat(t.toString().replace(/[^0-9.-]/g, "")), isNaN(t) ? 0 .toFixed(e) : t.toFixed(e).replace(/,/g, "");
}, Tn = function(t) {
  return t = parseFloat(t.toString()), !(isNaN(t) || t < 0);
}, se = async function(t) {
  for (const e in t)
    if (typeof t[e] > "u" || t[e] === null || t[e] === "")
      throw new Error("Object incomplete to process");
  return t;
}, Sn = function(t) {
  if (!t || isNaN(parseInt(t)) || t.toString().length !== 9)
    throw new Error("Number of operation must be number of 9 digits");
  return t;
}, kn = function(t) {
  if (typeof t != "string") throw new Error("Invalid string");
  return !t || /<html(?:\s+lang=["'][^"']*["'])?>/i.test(t) || (t = t.replace(/aaa/g, "á"), t = t.replace(/eee/g, "é"), t = t.replace(/iii/g, "í"), t = t.replace(/ooo/g, "ó"), t = t.replace(/uuu/g, "ú"), t = t.replace(/NNN/g, "Ñ"), t = t.replace(/nnn/g, "ñ"), t = t.replace(/Ã¡/g, "á")), t;
}, Fr = async function() {
  const t = this.__pinPad__.constants.STX, e = this.__pinPad__.constants.ETX;
  let i = "C55ACANCEL";
  i = t + o(this, _, ft).call(this, i) + i + e, i = i + o(this, _, gt).call(this, i);
  const s = this.parseStringToBytes(i, "");
  await this.appendToQueue(s, "cancel");
}, xn = function() {
  const t = /* @__PURE__ */ new Date(), e = t.getDate().toString().padStart(2, "0"), i = (t.getMonth() + 1).toString().padStart(2, "0"), s = t.getFullYear().toString().substring(2);
  return e + i + s;
}, An = function() {
  const t = /* @__PURE__ */ new Date(), e = t.getHours().toString().padStart(2, "0"), i = t.getMinutes().toString().padStart(2, "0");
  return e + i;
}, Ur = async function() {
  return this.__pinPad__.config.latitude && this.__pinPad__.config.longitude ? this.latitudeLongitude : (this.__pinPad__.config.latitude = null, this.__pinPad__.config.longitude = null, zn() ? new Promise((t) => {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        this.__pinPad__.config.latitude = e.coords.latitude, this.__pinPad__.config.longitude = e.coords.longitude, t(this.latitudeLongitude);
      },
      () => {
        t(this.latitudeLongitude);
      }
    );
  }) : this.latitudeLongitude);
}, Lr = async function() {
  let t = localStorage.getItem("ppPublicIP");
  if (t && (t = JSON.parse(t), this.__pinPad__.config.publicIP = t.data, (/* @__PURE__ */ new Date()).getTime() - t.timestamp >= 864e5 && (this.__pinPad__.config.publicIP = null)), this.__pinPad__.config.publicIP) return this.__pinPad__.config.publicIP;
  this.__pinPad__.config.publicIP = null;
  let e = !1;
  const i = await j.get("https://api.ipify.org?format=json").catch(() => e = !0);
  return e ? null : (this.__pinPad__.config.publicIP = i.data.ip || null, localStorage.setItem(
    "ppPublicIP",
    JSON.stringify({
      timestamp: (/* @__PURE__ */ new Date()).getTime(),
      data: i.data.ip
    })
  ), this.__pinPad__.config.publicIP);
}, Ht = async function(t, e) {
  await o(this, _, re).call(this);
  const i = o(this, _, ne).call(this, 32);
  let s = o(this, _, ee).call(this, this.__pinPad__.config.publicKeyRSA, i), a = await o(this, _, ie).call(this, i, JSON.stringify(e));
  return (await j.post(t, a, {
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      data: s || ""
    }
  }).catch((l) => {
    var h;
    throw l.response.data.includes("Ha ocurrido un error al procesar su solicitud.") ? new Error("It was not possible to obtain the affiliations.") : l.response.status >= 500 && l.response.status <= 599 ? new Error(`Service Temporarily Unavailable ${l.message}`) : new Error(`Error in request, verify internet connection: ${(h = l.response) == null ? void 0 : h.status} ${l.message}`);
  })).data;
}, Dn = async function({ data: t, url: e, cancelable: i = !1 } = {}) {
  await o(this, _, re).call(this);
  const s = o(this, _, ne).call(this, 32), a = o(this, _, ee).call(this, this.__pinPad__.config.publicKeyRSA, s), c = await o(this, _, ie).call(this, s, JSON.stringify(t)), l = this;
  return (await j.post(e, c, {
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      data: a || ""
    }
  }).catch(async (p) => {
    var b;
    let f = `Error in request, verify internet connection: ${p.status} ${p.message}`;
    throw p.response.status >= 500 && p.response.status <= 599 ? f = "Service Temporarily Unavailable" : p.response.status >= 400 && p.response.status <= 499 && (f = "Bad Request"), i && await o(b = l, _, Fr).call(b), new Error(f);
  })).data;
}, Vr = async function() {
  const t = this.__pinPad__.constants.FS, e = this.__pinPad__.constants.ETX, i = this.__pinPad__.constants.STX;
  let s = "C57A" + this.__pinPad__.config.internal.qpsDomestic;
  if (s = s + t + "B" + this.__pinPad__.config.internal.qpsInternational, s = s + t + "C" + this.__pinPad__.config.internal.cvmlVMCDomestic, s = s + t + "D" + this.__pinPad__.config.internal.cvmlVMCInternational, s = s + t + "E" + this.__pinPad__.config.internal.cvmlAmex, s = s + t + "F" + this.__pinPad__.config.internal.translimitCTLSVMC, s = s + t + "G" + this.__pinPad__.config.internal.translimitCTLSAmex, s = i + o(this, _, ft).call(this, s) + s + e, s = s + o(this, _, gt).call(this, s), !this.__pinPad__.about.injectedValues) {
    const a = this.parseStringToBytes(s, "");
    await this.appendToQueue(a, "inject");
  }
}, qr = async function() {
  this.__pinPad__.operation.bin8 && (this.__pinPad__.operation.bin = this.__pinPad__.operation.bin8), this.__pinPad__.operation.bin8 = "";
  const t = await o(this, _, Dn).call(this, {
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
    e = i + o(this, _, ft).call(this, e) + e + s, e = e + o(this, _, gt).call(this, e);
    const a = this.parseStringToBytes(e, "");
    return await this.appendToQueue(a, "cancel"), !1;
  }
  return this.__pinPad__.operation.merchant = t, this.__pinPad__.operation.onlyMerchant = t.contado.af.length > 1 ? t.contado.af[0].merchant : t.contado.af.merchant, !0;
}, jr = async function(t = null) {
  if (this.__pinPad__.waiting.statusAboutWaiting) throw new Error("AboutPP is already running");
  const e = this.__pinPad__.constants.STX, i = this.__pinPad__.constants.ETX;
  let s = "C56AABOUT";
  if (s = e + o(this, _, ft).call(this, s) + s + i, s = s + o(this, _, gt).call(this, s), Tt(this.__pinPad__.about.pp)) {
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
        if (clearInterval(c), a.__pinPad__.waiting.statusAboutWaiting = null, Tt(a.__pinPad__.about.pp))
          return;
        t || l(!0), l(t(a.__pinPad__.about.pp.supportDUKPT, a.__pinPad__.about.pp.hasDUKPTKeys));
      } else a.__pinPad__.waiting.statusAboutWaiting === "rejected" && (clearInterval(c), a.__pinPad__.waiting.statusAboutWaiting = null, h("Error"));
    }, 500);
  });
}, Ae = async function(t, e) {
  if (t = t ? t.toString() : "", e = e ? e.toString() : "", Tt(t) || t === "0") {
    this.dispatch("pp:dukpt", { status: "unsupported", already: !1 });
    return;
  }
  if (Tt(e) || e === "1") {
    this.dispatch("pp:dukpt", { status: "charged", already: !0 });
    return;
  }
  const i = o(this, _, xn).call(this), s = o(this, _, An).call(this), a = this.__pinPad__.constants.FS, c = this.__pinPad__.constants.ETX, l = this.__pinPad__.constants.STX;
  let h = "C91A" + i + a + "B" + s;
  h = l + o(this, _, ft).call(this, h) + h + c, h = h + o(this, _, gt).call(this, h);
  const p = this.parseStringToBytes(h, "");
  await this.appendToQueue(p, "init-dukpt");
  let f = 0;
  this.__pinPad__.waiting.statusinitDUKPTWaiting = "pending";
  const b = this;
  return new Promise((E, v) => {
    f = setInterval(async () => {
      var S;
      b.__pinPad__.waiting.statusinitDUKPTWaiting === "resolved" ? (clearInterval(f), b.__pinPad__.waiting.statusinitDUKPTWaiting = null, b.dispatch("pp:dukpt", { status: "charged", already: !1 }), await o(S = b, _, Hr).call(S), E(!0)) : b.__pinPad__.waiting.statusinitDUKPTWaiting === "rejected" && (clearInterval(f), b.__pinPad__.waiting.statusinitDUKPTWaiting = null, v("Error"));
    }, 500);
  });
}, Hr = async function() {
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
  }, e = await o(this, _, Dn).call(this, {
    data: t,
    url: this.url + this.__pinPad__.constants.uris.keysDUKPT
  });
  await o(this, _, es).call(this, e);
}, Kr = async function() {
  if (!await o(this, _, Pn).call(this))
    throw new Error("RSA public key is empty");
  const e = this;
  await o(this, _, jr).call(this, async function(s, a) {
    var l, h;
    if (e.__pinPad__.about.supportInjection && e.__pinPad__.config.internal.emv && e.__pinPad__.about.injectedValues)
      return await o(l = e, _, Ae).call(l, s, a), !0;
    let c = 0;
    return e.__pinPad__.waiting.statusInjectWaiting = "pending", await o(h = e, _, Vr).call(h), new Promise((p, f) => {
      c = setInterval(async () => {
        var b;
        e.__pinPad__.waiting.statusInjectWaiting === "resolved" ? (clearInterval(c), e.__pinPad__.waiting.statusInjectWaiting = null, await o(b = e, _, Ae).call(b, s, a), p(!0)) : e.__pinPad__.waiting.statusInjectWaiting === "rejected" && (clearInterval(c), e.__pinPad__.waiting.statusInjectWaiting = null, f("Error"));
      }, 500);
    });
  });
}, Rn = function(t, e = 0) {
  if (t = parseFloat(t.toString().replace(/[^0-9.-]/g, "")), isNaN(t) || t === 0)
    return parseFloat("0").toFixed(e);
  t = t.toFixed(e);
  let i = t.split(".");
  return i[0] = i[0].replace(/\B(?=(\d{3})+(?!\d))/g, ""), i.join(".");
}, Wr = async function() {
  this.__pinPad__.operation.errors = 0;
  let t = "ACERQUE, INSERTE CHIP O  DESLICE TARJETA";
  if (this.__pinPad__.about.supportContactless || (t = "INSERTE CHIP O  DESLICE TARJETA"), this.__pinPad__.about.model.toUpperCase().includes("UX300") && (t = "ACERQUE O INSERTE TARJETA"), Tt(this.amount) || this.amount <= 0)
    throw new Error("Amount required");
  if (o(this, _, Tn).call(this, this.amount) === !1)
    throw new Error("Invalid amount required");
  if (o(this, _, xe).call(this, this.amount, 2) <= 0)
    throw new Error("Amount must be greater than 0");
  const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.STX, s = this.__pinPad__.constants.ETX;
  let a = "C93A" + t;
  a = a + e + "B" + o(this, _, xn).call(this), a = a + e + "C" + o(this, _, An).call(this), a = a + e + "D" + o(this, _, xe).call(this, this.amount, 2), a = a + e + "E0.00", a = a + e + "F" + this.__pinPad__.config.currencyCode, this.__pinPad__.about.supportDUKPT && this.__pinPad__.about.supportDUKPT !== "0" && this.__pinPad__.about.supportDUKPT !== "false" && (this.__pinPad__.about.supportContactless ? (a = a + e + "G" + this.timeoutPinPad, a = a + e + "HTAGS", a = a + e + "I" + this.__pinPad__.config.requireCVVAmex, a = a + e + "J" + this.__pinPad__.config.forceOnline, a = a + e + "K" + this.__pinPad__.about.supportContactless, a = a + e + "L" + this.__pinPad__.config.emvCard, this.__pinPad__.about.hasCashback && (a = a + e + "M0", a = a + e + "N00")) : (a = a + e + "G" + this.timeoutPinPad, a = a + e + "HTAGS", a = a + e + "I" + this.__pinPad__.config.requireCVVAmex, a = a + e + "L" + this.__pinPad__.config.emvCard), this.__pinPad__.about.supportInjection && (a = a + e + "O" + this.__pinPad__.config.validateQPS)), a = i + o(this, _, ft).call(this, a) + a + s, a = a + o(this, _, gt).call(this, a), o(this, _, ns).call(this);
  const c = this.parseStringToBytes(a, "");
  await this.appendToQueue(c, "read-card");
  let l = 0;
  const h = this;
  return this.__pinPad__.waiting.statusReadCardWaiting = "pending", new Promise((p, f) => {
    l = setInterval(() => {
      if (h.__pinPad__.waiting.statusReadCardWaiting === "resolved")
        clearInterval(l), h.__pinPad__.waiting.statusReadCardWaiting = null, p(!0);
      else if (h.__pinPad__.waiting.statusReadCardWaiting === "rejected") {
        clearInterval(l), h.__pinPad__.waiting.statusReadCardWaiting = null;
        const b = h.__pinPad__.operation.last_error;
        f(b ?? "Error reading card");
      }
    }, 500);
  });
}, $r = async function(t) {
  return await Ct(t * 1e3);
}, zr = async function(t) {
  let e = this.url + this.__pinPad__.constants.uris.consult;
  return t > 1 && this.environment === "production" && (e = e.replace(
    this.__pinPad__.constants.urls.production,
    this.__pinPad__.constants.urls.productionAlternative
  )), this.__pinPad__.operation.consultDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB"), await o(this, _, Ht).call(this, e, {
    user: this.username.toUpperCase(),
    pwd: this.password.toUpperCase(),
    id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
    id_company: this.__pinPad__.config.idCompany.toUpperCase(),
    date: this.__pinPad__.operation.consultDate,
    reference: this.reference
  });
}, Gr = async function(t = "", e = {}) {
  let i = 1, s = null;
  do {
    i > 1 && this.environment === "production" && (t = t.replace(
      this.__pinPad__.constants.urls.production,
      this.__pinPad__.constants.urls.productionAlternative
    ), await o(this, _, $r).call(this, 5)), await o(this, _, re).call(this);
    const a = o(this, _, ne).call(this, 32), c = o(this, _, ee).call(this, this.__pinPad__.config.publicKeyRSA, a), l = await o(this, _, ie).call(this, a, JSON.stringify(e));
    let h = !1;
    const p = await j.post(t, l, {
      headers: {
        "Content-Type": "application/json",
        data: c || ""
      }
    }).catch(async (f) => {
      let b = `Error in request, verify internet connection: ${f.status} ${f.message}`;
      f.response.status >= 500 && f.response.status <= 599 ? b = "Service Temporarily Unavailable" : f.response.status >= 400 && f.response.status <= 499 && (b = "Bad Request"), console.warn(f), s = b;
      const E = await o(this, _, zr).call(this, i);
      E && E !== "{}" && !E.includes('"transacciones":""') && E.includes("nu_operaion") && (i = 5, s = "EE32"), h = !0;
    });
    if (!h)
      return p.data;
  } while (i++ <= 3);
  return s ? Promise.reject(s) : Promise.reject("Communication error with CDP. IL/MTY");
}, Xr = function(t) {
  if (Tt(t)) throw new Error("Number of authorization invalid");
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
Jr = function(t) {
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
    nb_error: o(a = e, _, kn).call(a, t.nb_error ?? ""),
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
}, Qr = async function() {
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
    const c = await o(this, _, Rn).call(this, this.amount, 2);
    await o(this, _, se).call(this, {
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
    const l = this.__pinPad__.about.supportContactless && this.__pinPad__.about.supportContactless !== "0" ? "1" : "0", h = await o(this, _, Gr).call(this, this.url + this.__pinPad__.constants.uris.sale, {
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
    const p = o(this, _, Jr).call(this, h);
    return i.object = p, await o(this, _, Zr).call(this, p), i.approved = this.__pinPad__.operation.responseMit._approved, this.__pinPad__.operation.finalResult = p, i;
  } catch (c) {
    throw t.__pinPad__.finishCommand.A = "01", t.__pinPad__.finishCommand.B = "", t.__pinPad__.finishCommand.C = "", t.__pinPad__.finishCommand.D = "", t.__pinPad__.finishCommand.E = "", t.__pinPad__.finishCommand.F = "", t.__pinPad__.finishCommand.G = "", t.__pinPad__.finishCommand.H = "", t.__pinPad__.finishCommand.I = "", t.__pinPad__.finishCommand.J = "", t.__pinPad__.finishCommand.K = "", await o(a = t, _, ts).call(a, o(s = t, _, On).call(s, c)), c;
  }
}, Zr = async function(t) {
  if (this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1")
    return this.dispatch("pp:finish-emv", t), !0;
  const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.STX, s = this.__pinPad__.constants.ETX;
  let a = "C93A" + this.__pinPad__.finishCommand.A;
  a = a + e + "B" + this.__pinPad__.finishCommand.B, a = a + e + "C" + this.__pinPad__.finishCommand.C, a = a + e + "D" + this.__pinPad__.finishCommand.D, a = a + e + "E" + this.__pinPad__.finishCommand.E, a = a + e + "F" + this.__pinPad__.finishCommand.F, a = a + e + "G" + this.__pinPad__.finishCommand.G, a = a + e + "H" + this.__pinPad__.finishCommand.H, a = a + e + "I" + this.__pinPad__.finishCommand.I, a = a + e + "J" + this.__pinPad__.finishCommand.J, a = a + e + "K" + this.__pinPad__.finishCommand.K, a = i + o(this, _, ft).call(this, a) + a + s, a = a + o(this, _, gt).call(this, a);
  const c = this.parseStringToBytes(a, "");
  this.__pinPad__.waiting.statusSecondGenerateWaiting = "pending", await this.appendToQueue(c, "second-generate");
  let l = 0;
  const h = this;
  return new Promise((p, f) => {
    l = setInterval(async () => {
      var b, E;
      if (h.__pinPad__.waiting.statusSecondGenerateWaiting === "resolved") {
        if (clearInterval(l), h.__pinPad__.waiting.statusSecondGenerateWaiting = null, h.__pinPad__.operation.applyReverse) {
          const v = await o(b = h, _, Ht).call(b, h.url + h.__pinPad__.constants.uris.reverse, {
            VMCAMEXMREVERSO: {
              business: {
                id_company: this.__pinPad__.config.idCompany.toUpperCase(),
                id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
                country: this.__pinPad__.config.country.toUpperCase(),
                user: this.username.toUpperCase(),
                pwd: this.password.toUpperCase()
              },
              transacction: {
                amount: o(this, _, xe).call(this, this.amount, 2),
                no_operacion: this.__pinPad__.operation.folio,
                auth: this.__pinPad__.operation.authorization.toUpperCase(),
                tracks: "",
                usrtransacction: this.username.toUpperCase(),
                crypto: "2",
                version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion
              }
            }
          }), S = JSON.parse(v);
          let T;
          S.response === "approved" ? T = { message: "Transaction rejected by PinPad." } : T = { message: "No communication, please check your report." }, h.__pinPad__.operation.ignore.counterSale || (h.dispatch("pp:finish-emv", T), h.__pinPad__.operation.ignore.counterSale = !0);
        } else
          h.__pinPad__.operation.ignore.counterSale || (h.dispatch("pp:finish-emv", t), h.__pinPad__.operation.ignore.counterSale = !0);
        t.cd_error === "92" && await o(E = h, _, Yr).call(E, t, a), p(!0);
      } else h.__pinPad__.waiting.statusSecondGenerateWaiting === "rejected" && (clearInterval(l), h.__pinPad__.waiting.statusSecondGenerateWaiting = null, f("There is no response from the reader, check that it is connected."));
    }, 500);
  });
}, Yr = async function(t, e) {
  this.__pinPad__.operation.ignore.responseGlobal = t, this.__pinPad__.operation.ignore.C93Global = e, this.__pinPad__.operation.ignore.isError92TRX = !0, await o(this, _, Ae).call(this, 1, 0);
}, In = async function() {
  if (this.__pinPad__.operation.ignore.isError92TRX = !1, this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1")
    this.dispatch("pp:response", this.__pinPad__.operation.ignore.responseGlobal);
  else {
    const t = this.parseStringToBytes(this.__pinPad__.operation.ignore.C93Global, "");
    await this.appendToQueue(t, "code93"), await Ct(1400), this.dispatch("pp:response", this.__pinPad__.operation.ignore.responseGlobal);
  }
}, On = function(t) {
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
}, ts = async function(t) {
  const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.STX, s = this.__pinPad__.constants.ETX;
  let a = "C93A" + this.__pinPad__.finishCommand.A;
  if (a = a + e + "B" + this.__pinPad__.finishCommand.B, a = a + e + "C" + this.__pinPad__.finishCommand.C, a = a + e + "D" + this.__pinPad__.finishCommand.D, a = a + e + "E" + this.__pinPad__.finishCommand.E, a = a + e + "F" + this.__pinPad__.finishCommand.F, a = a + e + "G" + this.__pinPad__.finishCommand.G, a = a + e + "H" + this.__pinPad__.finishCommand.H, a = a + e + "I" + this.__pinPad__.finishCommand.I, a = a + e + "J" + this.__pinPad__.finishCommand.J, a = a + e + "K" + this.__pinPad__.finishCommand.K, a = i + o(this, _, ft).call(this, a) + a + s, a = a + o(this, _, gt).call(this, a), this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1") {
    this.dispatch("pp:finish-emv", t);
    return;
  }
  const c = this.parseStringToBytes(a, "");
  await this.appendToQueue(c, "finish-emv-end");
}, es = async function(t) {
  if (t.cd_estatus = t.cd_estatus ? t.cd_estatus : "0", t.cd_estatus !== "1") {
    this.__pinPad__.operation.ignore.isError92TRX && await o(this, _, In).call(this);
    return;
  }
  const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.ETX, s = this.__pinPad__.constants.STX, a = t.nb_ksn, c = t.nb_kcv || "", l = t.nb_ipek || "";
  let h = "C92A" + a + e + "B" + c + e + "C" + l;
  h = s + o(this, _, ft).call(this, h) + h + i, h = h + o(this, _, gt).call(this, h);
  const p = this.parseStringToBytes(h, "");
  await this.appendToQueue(p, "dukpt");
  let f = 0;
  this.__pinPad__.waiting.statuswritingDUKPTWaiting = "pending";
  const b = this;
  return new Promise((E, v) => {
    f = setInterval(async () => {
      var S;
      b.__pinPad__.waiting.statuswritingDUKPTWaiting === "resolved" ? (clearInterval(f), b.__pinPad__.waiting.statuswritingDUKPTWaiting = null, this.__pinPad__.operation.ignore.isError92TRX && await o(S = b, _, In).call(S), E(!0)) : b.__pinPad__.waiting.statuswritingDUKPTWaiting === "rejected" && (clearInterval(f), b.__pinPad__.waiting.statuswritingDUKPTWaiting = null, v("Error writing DUKPT keys"));
    }, 500);
  });
}, ns = function() {
  this.__pinPad__.config.read.AppId = "", this.__pinPad__.config.read.AppIdLabel = "", this.__pinPad__.config.read.Arqc = "", this.__pinPad__.config.read.ChipName = "", this.__pinPad__.config.read.ReadCTLS = "", this.__pinPad__.config.read.NB_Data = "", this.__pinPad__.config.read.NB_ksn = "", this.__pinPad__.config.read.PIN = "", this.__pinPad__.config.read.POSEM = "", this.__pinPad__.config.read.Tags = "", this.__pinPad__.config.read.Type = "", this.__pinPad__.config.read.Chip = "", this.__pinPad__.config.read.ChipNameEnc = "", this.__pinPad__.operation.ignore.error = "", this.__pinPad__.operation.ignore.C93Global = "", this.__pinPad__.operation.folio = "", this.__pinPad__.operation.authorization = "", this.__pinPad__.config.tokenizeTRX = !1;
};
var nt, is, rs, ss, as, Nn, os;
class sl extends Dt {
  constructor({
    filters: t = null,
    config_port: e = {
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      bufferSize: 32768,
      flowControl: "none"
    },
    no_device: i = 1,
    device_listen_on_channel: s = 1
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
    super({ filters: t, config_port: e, no_device: i, device_listen_on_channel: s });
    G(this, nt);
    lt(this, "__pinpax__", {
      server: "DEV",
      bussinessId: null,
      encriptionKey: null,
      apiKey: null,
      asyncResponses: {
        voucher: null,
        sale: null
      },
      waiting: {
        voucher: !1,
        sale: !1
      }
    });
    if (this.__internal__.device.type = "pinpax", k.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.time.response_connection = 2e3, this.__internal__.time.response_general = 3e3, this.__internal__.serial.delay_first_connection = 1e3, this.__internal__.serial.response.replacer = "", this.__internal__.serial.response.limiter = `\r
`, o(this, nt, rs).call(this), o(this, nt, is).call(this), this.getResponseAsString();
  }
  set bussinessId(t) {
    this.__pinpax__.bussinessId = t;
  }
  get bussinessId() {
    return this.__pinpax__.bussinessId;
  }
  set encriptionKey(t) {
    this.__pinpax__.encriptionKey = t;
  }
  get encriptionKey() {
    return this.__pinpax__.encriptionKey;
  }
  set apiKey(t) {
    this.__pinpax__.apiKey = t;
  }
  get apiKey() {
    return this.__pinpax__.apiKey;
  }
  set server(t) {
    this.__pinpax__.server = t;
  }
  get server() {
    return this.__pinpax__.server;
  }
  serialMessage(t) {
    let e = null;
    try {
      e = JSON.parse(t);
    } catch (i) {
      console.error("Error parsing response", i), this.dispatch("serial:message", t);
      return;
    }
    switch (e.response) {
      case "INITAPP":
        this.dispatch("init-app", { status: "started" }), o(this, nt, os).call(this).then(() => {
        });
        break;
      case "CONNECT":
        this.dispatch("connectMessage", { status: "connected" });
        break;
      case "LOGIN":
        this.dispatch("login", e);
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
        o(this, nt, ss).call(this, {
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
    }
    this.dispatch("serial:message", e);
  }
  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(t = 1) {
    const e = JSON.stringify({ action: "CONNECT" });
    return this.add0x(this.parseStringToBytes(e, `\r
`));
  }
  softReload() {
    super.softReload(), this.__pinpax__.waiting.sale = !1, this.__pinpax__.waiting.voucher = !1, this.__pinpax__.asyncResponses.sale = null, this.__pinpax__.asyncResponses.voucher = null;
  }
  async sendCustomCode({ code: t = "" } = {}) {
    if (typeof t != "string") throw new Error("Invalid string");
    const e = this.parseStringToBytes(t, `\r
`);
    await this.appendToQueue(e, "custom");
  }
  async connectMessage() {
    const t = JSON.stringify({ action: "CONNECT" }), e = this.parseStringToBytes(t, `\r
`);
    await this.appendToQueue(e, "connect:message");
  }
  async login() {
    if (!this.apiKey || !this.bussinessId || !this.encriptionKey || !this.server)
      throw new Error("Invalid data to login check apiKey, bussinessId, encriptionKey, server");
    const t = JSON.stringify({
      action: "LOGIN_MIT",
      server: this.__pinpax__.server,
      bussiness_id: this.__pinpax__.bussinessId,
      encription_key: this.__pinpax__.encriptionKey,
      api_key: this.__pinpax__.apiKey
    }), e = this.parseStringToBytes(t, `\r
`);
    await this.appendToQueue(e, "login");
  }
  async makeSale({ amount: t = 0, reference: e = null } = {}) {
    if (this.isDisconnected) throw new Error("Device is disconnected");
    if (this.__pinpax__.waiting.sale) throw new Error("Already waiting for sale response");
    if (t <= 0) throw new Error("Invalid amount");
    if (t = parseFloat(t), isNaN(t)) throw new Error("Invalid amount");
    if (!e || !o(this, nt, as).call(this, e))
      throw new Error(
        "Reference is required and must be alphanumeric and the only symbol allowed is midlescore or underscore (- _)"
      );
    t = t.toFixed(2);
    const i = JSON.stringify({ action: "PAYMENT", amount: t, reference: e }), s = this.parseStringToBytes(i, `\r
`);
    this.__pinpax__.waiting.sale = !0, this.__pinpax__.asyncResponses.sale = null, this.queue.length > 0 && await o(this, nt, Nn).call(this);
    const a = this;
    return await this.appendToQueue(s, "make-sale"), new Promise((c) => {
      const l = setInterval(() => {
        if (a.__pinpax__.asyncResponses.sale) {
          const h = a.__pinpax__.asyncResponses.sale;
          a.__pinpax__.asyncResponses.sale = null, a.__pinpax__.waiting.sale = !1, clearInterval(l), c(h.approved);
        }
      }, 100);
    });
  }
  async getVoucher() {
    if (this.isDisconnected) throw new Error("Device is disconnected");
    if (this.__pinpax__.waiting.voucher) throw new Error("Already waiting for voucher");
    this.__pinpax__.waiting.voucher = !0, this.__pinpax__.asyncResponses.voucher = null;
    const t = JSON.stringify({ action: "GETVOUCHER" }), e = this.parseStringToBytes(t, `\r
`);
    this.queue.length > 0 && await o(this, nt, Nn).call(this), await this.appendToQueue(e, "get-voucher");
    const i = this;
    return new Promise((s, a) => {
      const c = setTimeout(() => {
        i.__pinpax__.waiting.voucher = !1, a("Timeout");
      }, 1e4), l = setInterval(() => {
        if (i.__pinpax__.asyncResponses.voucher) {
          const h = i.__pinpax__.asyncResponses.voucher;
          i.__pinpax__.asyncResponses.voucher = null, i.__pinpax__.waiting.voucher = !1, clearInterval(l), clearTimeout(c), s(h.voucher);
        }
      }, 100);
    });
  }
  async info() {
    const t = JSON.stringify({ action: "DEVICEINFO" }), e = this.parseStringToBytes(t, `\r
`);
    await this.appendToQueue(e, "info");
  }
  async keepAlive() {
    const t = JSON.stringify({ action: "KEEPALIVE" }), e = this.parseStringToBytes(t, `\r
`);
    await this.appendToQueue(e, "keep-alive");
  }
  async resetApp() {
    const t = JSON.stringify({ action: "RESETAPP" }), e = this.parseStringToBytes(t, `\r
`);
    await this.appendToQueue(e, "reset-app");
  }
  async getConfig() {
    const t = JSON.stringify({ action: "GETCONFIG" }), e = this.parseStringToBytes(t, `\r
`);
    await this.appendToQueue(e, "get-config");
  }
  async hideButtons() {
    const t = JSON.stringify({ action: "HIDEBUTTONS" }), e = this.parseStringToBytes(t, `\r
`);
    await this.appendToQueue(e, "hide-buttons");
  }
  async showButtons() {
    const t = JSON.stringify({ action: "SHOWBUTTONS" }), e = this.parseStringToBytes(t, `\r
`);
    await this.appendToQueue(e, "show-buttons");
  }
  async demo() {
    console.warn("RUNNING DEMO APP BE CAREFUL");
    const t = JSON.stringify({ action: "DEMO" }), e = this.parseStringToBytes(t, `\r
`);
    await this.appendToQueue(e, "demo");
  }
}
nt = new WeakSet(), is = function() {
  k.add(this);
}, rs = function() {
  const t = [
    "buttons-status",
    "init-app",
    "connectMessage",
    "login",
    "voucher",
    "info",
    "keep-alive",
    "reset-app",
    "get-config",
    "payment",
    "error"
  ];
  for (const e of t)
    this.serialRegisterAvailableListener(e);
}, ss = function(t) {
  this.dispatch("payment", t), this.__pinpax__.waiting.sale && (this.__pinpax__.asyncResponses.sale = t);
}, as = function(t) {
  return /^[A-Z-a-z0-9_\s]+$/g.test(t);
}, Nn = async function() {
  if (this.isDisconnected) throw new Error("Device is disconnected");
  if (this.queue.length === 0) return !0;
  const t = this;
  return new Promise((e) => {
    let i = setInterval(() => {
      t.queue.length === 0 && (clearInterval(i), e(!0));
    }, 500);
  });
}, os = async function() {
  await this.connectMessage(), await this.login(), await this.hideButtons();
};
var g, cs, ls, hs, rt, De, us, ds, ps, _s, fs, gs, ys, bs, ms, ws, vs, Es, Ps, Cs, Ts, Ss, ks, xs, As, Ds, Rs, Is, Os, Ns, Bs, Ms, dt, Q, Re, Z, yt, Fs, Us, Ls, Vs, ae, Bn, Mn, Ie, Oe, qs;
class al extends Dt {
  constructor({
    filters: t = null,
    config_port: e = null,
    no_device: i = 1,
    device_listen_on_port: s = 1,
    type: a = "esplus",
    support_cart: c = !0
  } = {}) {
    super({ filters: t, config_port: e, no_device: i, device_listen_on_port: s });
    G(this, g);
    lt(this, "__device", {
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
    if (this.__internal__.device.type = "jofemar", k.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.dispense.must_response = !0, this.__internal__.time.response_general = 800, this.__internal__.time.response_engines = 800, this.__internal__.dispense.limit_counter = 40, this.__internal__.dispense.timeout = 0, this.__internal__.dispense.timeout_time = 4e3, this.__internal__.dispense.interval = 0, this.__internal__.dispense.interval_time = 1e3, this.__internal__.device.hex_number = (128 + this.listenOnChannel).toString(16), this.__internal__.device.door_open = !1, this.__internal__.dispense.elevator = {
      locking_time: 60,
      locking_interval: 0,
      need_reset: !1
    }, this.deviceType = a, this.supportCart = c, o(this, g, cs).call(this), o(this, g, hs).call(this), o(this, g, ls).call(this);
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
  set listenOnChannel(t) {
    if (t = parseInt(t), isNaN(t) || t < 1 || t > 31) throw new Error("Invalid port number, valid range is 1 to 31");
    this.__internal__.device.listen_on_port = t, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(t), this.__internal__.device.hex_number = (128 + t).toString(16);
  }
  /**
   * @deperecated
   * @param {string|number} channel
   */
  set listenOnPort(t) {
    this.listenOnChannel = t;
  }
  set deviceType(t) {
    if (typeof t != "string") throw new Error("Invalid device type, must be a string");
    this.__device.type = t;
  }
  set supportCart(t) {
    if (typeof t != "boolean") throw new Error("Invalid support cart, must be a boolean");
    this.__device.support_cart = t;
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
        i = o(this, g, Ms).call(this, t, i, 128);
        break;
      case "06":
        i = o(this, g, Fs).call(this, t, i);
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
    const { channel: i, tray: s } = o(this, g, Us).call(this, t);
    this.__internal__.dispense.backup_dispense = {
      selection: t,
      cart: e,
      channel: i,
      tray: s
    };
    let c = ["02", "30", "30", this.__internal__.device.hex_number, "56", s, i];
    e && (c[4] = "4D"), c = o(this, g, De).call(this, c);
    let l;
    do
      l = await this.internalDispense(c), o(this, g, Ls).call(this), l.error === "elevator-locked" ? await o(this, g, us).call(this) : l.error === "no-response" && await Ct(1e3);
    while (["elevator-locked", "no-response"].includes(l.error));
    return this.__internal__.dispense.backup_dispense = {}, l;
  }
  internalClearSensing() {
    super.internalClearSensing(), this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.serial.queue.length > 0 && (this.__internal__.serial.queue = this.__internal__.serial.queue.filter((t) => t.type !== "status"));
  }
  async endDispense() {
    let e = ["02", "30", "30", this.__internal__.device.hex_number, "4D", "80", "80"];
    return e = o(this, g, De).call(this, e), await this.internalDispense(e);
  }
  async collect() {
    const t = ["02", "30", "30", "81", "4E", "FF", "FF"];
    return await o(this, g, rt).call(this, t, "collect");
  }
  async resetSoldOutErrors() {
    return await o(this, g, ae).call(this, "80");
  }
  async resetWaitingProductRemovedError() {
    return await o(this, g, ae).call(this, "81");
  }
  async resetMachineErrors() {
    return this.__internal__.serial.queue.length === 0 ? (o(this, g, Bn).call(this), await o(this, g, ae).call(this, "FF")) : new Promise((t) => {
      const e = setInterval(async () => {
        this.__internal__.serial.queue.length > 0 || (clearInterval(e), await o(this, g, ae).call(this, "FF"), o(this, g, Bn).call(this), t(!0));
      }, 100);
    });
  }
  async resetAllErrors() {
    return await this.resetSoldOutErrors(), await Ct(100), await this.resetWaitingProductRemovedError(), await Ct(100), await this.resetMachineErrors();
  }
  async status() {
    const t = ["02", "30", "30", "81", "53", "FF", "FF"];
    return await o(this, g, rt).call(this, t, "status");
  }
  async lightsOn() {
    return await o(this, g, Mn).call(this, "81");
  }
  async lightsOff() {
    return await o(this, g, Mn).call(this, "80");
  }
  async program(t, e) {
    const i = ["02", "30", "30", "81", "50", t, e];
    return await o(this, g, rt).call(this, i, "program");
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
    return await o(this, g, rt).call(this, c, "voltage-engine");
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
    return await o(this, g, rt).call(this, a, "push-over-products");
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
    return await o(this, g, rt).call(this, a, "channel-running-after-dispense");
  }
  async checkData(t, e = "FF") {
    const i = ["02", "30", "30", "81", "43", t, e];
    return await o(this, g, rt).call(this, i, "check-data");
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
    const e = o(this, g, Oe).call(this, t);
    return await o(this, g, Ie).call(this, "80", e);
  }
  /**
   * @param {string} message
   * @param {number|string} seconds
   * @return {Promise<void>}
   */
  async setDisplayMessageTemporarily({ message: t = "", seconds: e = 1 }) {
    if (t = t.substring(0, 32), e = parseInt(e), isNaN(e) || e < 1 || e > 125) throw new Error("Invalid seconds, valid range is 1 to 125");
    const i = o(this, g, Oe).call(this, t), s = (128 + e).toString(16);
    return await o(this, g, Ie).call(this, s, i);
  }
  /**
   * @param {string} message
   * @return {Promise<void>}
   */
  async setDisplayMessageUnlimited({ message: t = "" }) {
    t = t.substring(0, 32);
    const e = o(this, g, Oe).call(this, t);
    return await o(this, g, Ie).call(this, "FF", e);
  }
  async programClock({ date: t = /* @__PURE__ */ new Date() } = {}) {
    if (!(t instanceof Date)) throw new Error("Invalid date, must be an instance of Date");
    const e = ["02", "30", "30", "81", "72", ...o(this, g, qs).call(this, t)];
    return await o(this, g, rt).call(this, e, "clock");
  }
  /**
   * @param {null|string} event
   * @param {boolean} enable
   * @return {Promise<void>}
   */
  async eventsConfig({ event: t = null, enable: e = !0 } = {}) {
    if (t === null) throw new Error("Invalid event");
    const s = ["02", "30", "30", "81", "41", t, e ? "31" : "30"];
    return await o(this, g, rt).call(this, s, "events-config");
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
    return await o(this, g, rt).call(this, t, "custom");
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
g = new WeakSet(), cs = function() {
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
}, ls = function() {
  this.on("internal:dispense:running", o(this, g, Vs).bind(this));
}, hs = function() {
  k.add(this);
}, rt = function(t, e) {
  return t[3] = this.__internal__.device.hex_number, this.appendToQueue(o(this, g, De).call(this, t), e);
}, De = function(t) {
  let e = this.hexToDec(this.sumHex(t)), i = this.calcCheckSums(e.toString());
  for (let s = 0; s < 2; s++)
    t.push(this.hexMaker(i[s]));
  return t.push("03"), t;
}, us = async function() {
  if (this.__internal__.dispense.elevator.locking_interval) return;
  this.__internal__.dispense.elevator.need_reset && (this.__internal__.dispense.elevator.need_reset = !1, await this.resetWaitingProductRemovedError(), await Ct(500));
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
}, ds = function(t, e) {
  return e.name = "ok", e.description = "The last command was executed successfully", e.no_code = 1, this.dispatch("command-executed", e), e;
}, ps = function(t, e) {
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
}, _s = function(t, e) {
  return e.additional = { open: !1 }, e.no_code = 3, t === "4f" ? (e.name = "door open", e.description = "The door was opened", e.additional.open = !0, this.__internal__.device.door_open = !0, this.dispatch("door:event", e.additional)) : t === "43" ? (e.name = "door close", e.description = "The door was closed", e.additional.open = !1, this.__internal__.device.door_open = !1, this.dispatch("door:event", e.additional)) : (e.name = "door event", e.description = "The door event received is unknown", this.dispatch("door:event", { open: e.additional.open, message: e })), e;
}, fs = function(t, e) {
  e.no_code = 404;
  let i = t[5] ?? null;
  return i && this.listenOnChannel > 1 && (i = this.hexToDec(i) - this.listenOnChannel + 1, i = this.decToHex(i)), i && (i === "FD" ? (e.no_code = 4, e.name = "channel disconnected", e.description = "The channel is disconnected", e.additional = { active: !1 }) : i === "FC" ? (e.no_code = 5, e.name = "channel connected", e.description = "The channel is connected", e.additional = { active: !0 }) : (e.no_code = 6, e.name = "channel sold out", e.description = "The channel is empty", e.additional = { active: !0 }), this.__device.channels.verification.running && (this.__device.channels.verification.channels.push({
    selection: this.__device.channels.verification.current,
    active: e.additional.active
  }), e.additional.selection = this.__device.channels.verification.current), this.dispatch("channel:status", e.additional)), e;
}, gs = function(t, e) {
  e.no_code = 39, e.name = "Program version";
  const i = t.slice(4, 12), s = i.map((a) => String.fromCharCode(this.hexToDec(a))).join("");
  return e.additional = { version: s, hex: i }, e.description = `The program version is ${s}`, this.dispatch("program:version", e.additional), e;
}, ys = function(t, e) {
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
}, bs = function(t, e) {
  e.no_code = 40, e.name = "Clock registers", e.description = "Clock registers";
  const i = t.slice(4, -3), s = i.map((v) => String.fromCharCode(this.hexToDec(v))).join(""), [a, c] = s.split(" "), [l, h] = a.split(":"), [p, f, b] = c.split("-"), E = new Date(
    2e3 + parseInt(b),
    parseInt(f) - 1,
    parseInt(p),
    parseInt(l),
    parseInt(h)
  );
  return e.additional = {
    day: p,
    month: f,
    year: b,
    hours: l,
    minutes: h,
    formatted: s,
    date: E,
    hex: i
  }, this.dispatch("clock:registers", e.additional), e;
}, ms = function(t, e) {
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
      const a = s.map((S) => String.fromCharCode(this.hexToDec(S))).join(""), c = parseInt(a.slice(0, 2)), l = parseInt(a.slice(2, 4)), h = parseInt(a.slice(4, 6)), p = parseInt(a.slice(7, 9)), f = parseInt(a.slice(9, 11)) - 1, b = 2e3 + parseInt(a.slice(11, 13)), E = new Date(b, f, p, c, l, h), v = {
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
        date: E,
        hex: s,
        formatted: E.toLocaleString(),
        ascii: i,
        meaning: v[i] ?? "Unknown"
      };
    }
  }
  return this.dispatch("machine:activity", e.additional), e;
}, ws = function(t, e) {
  const i = {
    30: "Spanish",
    31: "English",
    32: "French"
  };
  return e.no_code = 42, e.name = "Language", e.description = `The language is ${i[t] ?? "unknown"}`, e.additional = {
    hex: t,
    language: i[t] ?? "unknown"
  }, this.dispatch("check:language", e.additional), e;
}, vs = function(t, e) {
  return e.no_code = 43, e.name = "Beeper", e.description = `The beeper is ${t === "30" ? "on" : "off"}`, e.additional = {
    hex: t,
    beeper: t === "30"
  }, this.dispatch("check:beeper", e.additional), e;
}, Es = function(t, e) {
  e.no_code = 44, e.name = "Isolation tray", e.description = "Isolation tray";
  const i = this.hexToDec(t) - 139;
  return e.additional = {
    hex: t,
    tray: i
  }, this.dispatch("check:isolation-tray", e.additional), e;
}, Ps = function(t, e) {
  e.no_code = 45, e.name = "Engine voltage", e.description = "Engine voltage";
  const i = (this.hexToDec(t) - 128) / 2 + 5;
  return e.additional = {
    hex: t,
    voltage: i
  }, this.dispatch("check:engine-voltage", e.additional), e;
}, Cs = function(t, e) {
  e.no_code = 46, e.name = "Push over", e.description = "Push over";
  const i = t === "30";
  return e.additional = {
    hex: t,
    push: i
  }, this.dispatch("check:push-over", e.additional), e;
}, Ts = function(t, e) {
  e.no_code = 47, e.name = "Extractor after dispense", e.description = "Extractor after dispense";
  const i = (this.hexToDec(t) - 128) / 10;
  return e.additional = {
    hex: t,
    seconds: i
  }, this.dispatch("check:extractor-after-dispense", e.additional), e;
}, Ss = function(t, e) {
  e.no_code = 48, e.name = "Standby after collect", e.description = "Time to standby after collect product";
  const i = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    seconds: i
  }, this.dispatch("check:standby-after-collect", e.additional), e;
}, ks = function(t, e) {
  e.no_code = 49, e.name = "Standby without collect", e.description = "Time to standby when product delivery is not collected";
  const i = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    minutes: i
  }, this.dispatch("check:standby-without-collect", e.additional), e;
}, xs = function(t, e) {
  e.no_code = 50, e.name = "Elevator speed", e.description = "Elevator speed";
  const i = t === "30" ? "low" : "high";
  return e.additional = {
    hex: t,
    speed: i
  }, this.dispatch("check:elevator-speed", e.additional), e;
}, As = function(t, e) {
  e.no_code = 51, e.name = "Temperature expiration", e.description = "Temperature expiration";
  const i = t === "31";
  return e.additional = {
    hex: t,
    enabled: i
  }, this.dispatch("check:expiration-by-temperature", e.additional), e;
}, Ds = function(t, e) {
  e.no_code = 52, e.name = "Temperature before expiration", e.description = "Temperature before expiration";
  const i = (this.hexToDec(t) - 128) / 2;
  return e.additional = {
    hex: t,
    temperature: i
  }, this.dispatch("check:temperature-before-expiration", e.additional), e;
}, Rs = function(t, e) {
  e.no_code = 53, e.name = "Time before expiration", e.description = "Time before expiration";
  const i = this.hexToDec(t) - 128;
  return e.additional = {
    hex: t,
    minutes: i
  }, this.dispatch("check:expiration-after", e.additional), e;
}, Is = function(t, e) {
  e.no_code = 54, e.name = "Temperature scale", e.description = "Temperature scale";
  const i = t === "43" ? "Celsius" : "Fahrenheit";
  return e.additional = {
    hex: t,
    scale: i
  }, this.dispatch("check:temperature-scale", e.additional), e;
}, Os = function(t, e) {
  return e.no_code = 54, e.name = "Machine ID", e.description = "Machine ID", e.additional = { hex: t[4], full_hex: t }, this.dispatch("check:machine-id", e.additional), e;
}, Ns = function(t, e) {
  return e.no_code = 7, e.name = "working temperature", e.description = `The working temperature is ${t}`, e.additional = {
    hex: t,
    temperature: {
      traditional: (this.hexToDec(t) - this.hexToDec("80")) / 2,
      ice_plus: (this.hexToDec(t) - this.hexToDec("80")) / 2 - 25.5
    }
  }, this.dispatch("temperature:working", e.additional), e;
}, Bs = function(t, e) {
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
}, Ms = function(t, e, i = 128) {
  if (t[1] && (e.additional.machine.hex = t[1], e.additional.machine.dec = this.hexToDec(t[1]) - i), !(t[1] && t[2]))
    e = o(this, g, ds).call(this, t, e);
  else
    switch (t[2]) {
      case "54":
        e.request = "--automatic", e = o(this, g, ps).call(this, t[3], e);
        break;
      case "50":
        e.request = "--automatic", e = o(this, g, _s).call(this, t[3], e);
        break;
      case "43":
        switch (e.request = "check-data", t[3]) {
          case "41":
            e = o(this, g, ms).call(this, t, e);
            break;
          case "43":
            e.request = "channel-status", e = o(this, g, fs).call(this, t, e);
            break;
          case "50":
            e = o(this, g, gs).call(this, t, e);
            break;
          case "53":
            e = o(this, g, ys).call(this, t, e);
            break;
          case "54":
            e.request = "working-temperature", e = o(this, g, Ns).call(this, t[4], e);
            break;
          case "72":
            e = o(this, g, bs).call(this, t, e);
            break;
          case "74":
            e.request = "current-temperature", e = o(this, g, Bs).call(this, t, e);
            break;
          case "49":
            e = o(this, g, ws).call(this, t[4], e);
            break;
          case "5a":
            e = o(this, g, vs).call(this, t[4], e);
            break;
          case "42":
            e = o(this, g, Es).call(this, t[4], e);
            break;
          case "47":
            e = o(this, g, Ps).call(this, t[4], e);
            break;
          case "4e":
            e = o(this, g, Os).call(this, t, e);
            break;
          case "4f":
            e = o(this, g, Cs).call(this, t[4], e);
            break;
          case "45":
            e = o(this, g, Ts).call(this, t[4], e);
            break;
          case "46":
            e = o(this, g, Ss).call(this, t[4], e);
            break;
          case "48":
            e = o(this, g, ks).call(this, t[4], e);
            break;
          case "76":
            e = o(this, g, xs).call(this, t[4], e);
            break;
          case "63":
            e = o(this, g, As).call(this, t[4], e);
            break;
          case "65":
            e = o(this, g, Ds).call(this, t[4], e);
            break;
          case "66":
            e = o(this, g, Rs).call(this, t[4], e);
            break;
          case "67":
            e = o(this, g, Is).call(this, t[4], e);
            break;
        }
        break;
    }
  return e;
}, dt = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !0);
}, Q = function() {
  this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !1);
}, Re = function() {
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
yt = function({ type: t = null, severity: e = "high" } = {}) {
  this.dispatch("jofemar:error", { type: t, severity: e });
}, Fs = function(t, e) {
  if (e.request = "status", t[1] && !t[2]) {
    switch (t[1]) {
      case "30":
        e.name = "Machine ready", e.description = "The machine is ready for instructions", e.no_code = 9, o(this, g, dt).call(this);
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
        e.name = "Jam", e.description = "Jam in elevator engine", e.no_code = 14, o(this, g, Q).call(this), o(this, g, yt).call(this, { type: "jam" });
        break;
      case "36":
        e.name = "Malfunction", e.description = "Malfunction in the elevator belt or product detector", e.no_code = 15, o(this, g, Q).call(this), o(this, g, yt).call(this, { type: "malfunction" });
        break;
      case "37":
        e.name = "Photo transistors", e.description = "Failure in one of the photo transistors in the cabinet", e.no_code = 16, o(this, g, Q).call(this), o(this, g, yt).call(this, { type: "photo-transistors" });
        break;
      case "38":
        e.name = "Without channels", e.description = "No channels detected", e.no_code = 17, o(this, g, Q).call(this), o(this, g, yt).call(this, { type: "without-channels" });
        break;
      case "39":
        e.name = "Product detector fault", e.description = "Product detector fault", e.no_code = 18, o(this, g, Re).call(this), o(this, g, Z).call(this, { type: "fault-product-detector" });
        break;
      case "41":
        e.name = "Fault in 485 BUS", e.description = "Machine display is disconnected", e.no_code = 19, o(this, g, dt).call(this), o(this, g, Z).call(this, { type: "display-disconnected" });
        break;
      case "42":
        e.name = "Product under elevator", e.description = "Product alarm under elevator", e.no_code = 20, o(this, g, Q).call(this), o(this, g, Z).call(this, { type: "product-under-elevator" });
        break;
      case "43":
        e.name = "Error when elevator approaching to a position", e.description = "Error when elevator approaching to a position", e.no_code = 21, o(this, g, dt).call(this), o(this, g, Z).call(this, { type: "error-approaching-position", severity: "high" });
        break;
      case "44":
        e.name = "Fault in keyboard", e.description = "Fault in keyboard", e.no_code = 22, o(this, g, Q).call(this), o(this, g, yt).call(this, { type: "fault-keyboard" });
        break;
      case "45":
        e.name = "Eeprom writing error", e.description = "Eeprom writing error", e.no_code = 23, o(this, g, Q).call(this), o(this, g, yt).call(this, { type: "eeprom-writing-error", severity: "critical" });
        break;
      case "46":
        e.name = "Fault communicating with temperature control", e.description = "Fault communicating with temperature control", e.no_code = 24, o(this, g, dt).call(this), o(this, g, Z).call(this, { type: "fault-temperature-control" });
        break;
      case "47":
        e.name = "Thermometer disconnected", e.description = "The thermometer is disconnected", e.no_code = 25, o(this, g, dt).call(this), o(this, g, Z).call(this, { type: "thermometer-disconnected" });
        break;
      case "48":
        e.name = "Thermometer programming lost", e.description = "Thermometer programming lost", e.no_code = 26, o(this, g, dt).call(this), o(this, g, Z).call(this, { type: "thermometer-programming-lost" });
        break;
      case "49":
        e.name = "Thermometer faulty", e.description = "Thermometer faulty", e.no_code = 27, o(this, g, dt).call(this), o(this, g, Z).call(this, { type: "thermometer-faulty" });
        break;
      case "4a":
        e.name = "Channels power consumption detector faulty", e.description = "Channels power consumption detector faulty", e.no_code = 28, o(this, g, Q).call(this), o(this, g, yt).call(this, { type: "channels-power-consumption-detector-faulty", severity: "critical" });
        break;
      case "4b":
        e.name = "Elevator does not find channel or tray", e.description = "Elevator does not find channel or tray", e.no_code = 29, o(this, g, Q).call(this), o(this, g, Z).call(this, { type: "elevator-not-find-channel-tray" });
        break;
      case "4c":
        e.name = "Elevator does not find delivery product position", e.description = "Elevator does not find delivery product position", e.no_code = 30, o(this, g, Q).call(this), o(this, g, yt).call(this, { type: "elevator-not-find-delivery-position" });
        break;
      case "4d":
        e.name = "Interior of elevator blocked", e.description = "Interior of elevator blocked", e.no_code = 31, o(this, g, Re).call(this), this.__internal__.dispense.elevator.need_reset || (this.__internal__.dispense.elevator.need_reset = !0), o(this, g, yt).call(this, { type: "interior-elevator-blocked", severity: "low" });
        break;
      case "4e":
        e.name = "Error in tester of product detector", e.description = "Error in tester of product detector", e.no_code = 32, o(this, g, Q).call(this), o(this, g, yt).call(this, { type: "error-tester-product-detector" });
        break;
      case "4f":
        e.name = "Waiting for product to be removed", e.description = "Waiting for product to be removed", e.no_code = 33, o(this, g, Re).call(this);
        break;
      case "50":
        e.name = "Product expired by temperature reasons", e.description = "Product expired by temperature reasons", e.no_code = 34, o(this, g, dt).call(this), o(this, g, Z).call(this, { type: "product-expired-temperature" });
        break;
      case "51":
        e.name = "Automatic door faulty", e.description = "Automatic door faulty", e.no_code = 35, o(this, g, dt).call(this), o(this, g, Z).call(this, { type: "automatic-door-faulty" });
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
        e.no_code = 36, o(this, g, dt).call(this), o(this, g, Z).call(this, { type: "product-expired" });
        break;
      case "64":
        e.name = "Product detector didn't change during its verification test", e.description = "Product detector didn't change during its verification test", e.no_code = 37, o(this, g, dt).call(this), o(this, g, Z).call(this, { type: "automatic-door-faulty" });
        break;
    }
    this.dispatch("machine:status", e);
  } else
    e.name = "executed", e.description = "The last command was executed successfully", e.no_code = 8, !t[1] && this.__internal__.dispense.dispensing && o(this, g, Q).call(this);
  return e;
}, Us = function(t) {
  if (t = parseInt(t) + 109, t = t.toString(), t.length !== 3)
    throw new Error("Invalid selection");
  const e = (parseInt(t.substring(0, 2)) + 128).toString(16).padStart(2, "0");
  return { channel: (parseInt(t.substring(2, 3)) + 128).toString(16).padStart(2, "0"), tray: e };
}, Ls = function() {
  this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.dispense.timeout = 0, this.__internal__.dispense.interval = 0;
}, Vs = function() {
  this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval);
  const t = this;
  t.__internal__.dispense.timeout = setTimeout(() => {
    t.__internal__.dispense.interval = setInterval(() => {
      t.status().then(() => {
      });
    }, t.__internal__.dispense.interval_time);
  }, t.__internal__.dispense.timeout_time);
}, ae = async function(t) {
  const e = ["02", "30", "30", "81", "52", t, "FF"];
  return await o(this, g, rt).call(this, e, "reset");
}, Bn = function() {
  const t = this.__device.type === "iceplus" ? sn(40) : sn(25), e = /* @__PURE__ */ new Date(), i = 1e3 * t + e.getTime(), s = new Date(i);
  this.dispatch("reset:errors", {
    description: "Resetting machine errors",
    duration: t,
    started_at: e,
    finished_at: s
  });
}, Mn = async function(t) {
  const e = ["02", "30", "30", "81", "4C", t, "FF"];
  return await o(this, g, rt).call(this, e, "lights");
}, Ie = async function(t = "80", e = []) {
  const i = ["02", "30", "30", "81", "44", t, ...e];
  return await o(this, g, rt).call(this, i, "display");
}, Oe = function(t = "") {
  t = t.padEnd(32, " ");
  const e = [];
  for (let i = 0; i < 32; i++)
    e.push(t.charCodeAt(i).toString(16));
  return e;
}, qs = function(t) {
  if (!(t instanceof Date)) throw new Error("Invalid date, must be an instance of Date");
  const e = t.getHours().toString().padStart(2, "0"), i = t.getMinutes().toString().padStart(2, "0"), s = t.getDate().toString().padStart(2, "0"), a = (t.getMonth() + 1).toString().padStart(2, "0"), c = t.getFullYear().toString().substring(2, 4), l = `${e}:${i} ${s}-${a}-${c}`, h = [];
  for (let p = 0; p < 14; p++)
    h.push(l.charCodeAt(p).toString(16));
  return h;
};
var $t, Ft, zt, w, js, Hs, Ne, Ks, Ws, $s, zs, Gs, Xs, Js, Qs, Fn, Zs, Ys, ta, ea, na, ia, ra, sa, aa, oa, ca, la, ha, ua, st, Be, da, pa, _a, fa, Un, Me, ga, ya, Ln, Vn, qn;
class ol extends Dt {
  constructor({ filters: t = null, config_port: e = null, no_device: i = 1 } = {}) {
    super({ filters: t, config_port: e, no_device: i });
    G(this, w);
    lt(this, "__coin_purse", {
      available: !0
    });
    lt(this, "__banknote_purse", {
      available: !0,
      isRecycler: !0,
      recycler: {
        ict: !0,
        banknote: 1
        // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
      }
    });
    lt(this, "__sale", {
      price: 0,
      change: 0,
      change_verified: 0,
      dispense_all: !0,
      last_change: 0,
      clear() {
        this.price = 0, this.change = 0, this.change_verified = 0, this.dispense_all = !0, this.last_change = 0;
      }
    });
    lt(this, "__money_session", {
      inserted: 0,
      retired: 0,
      clear() {
        this.inserted = 0, this.retired = 0;
      }
    });
    lt(this, "coins", {
      tubes: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      box: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      totals: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
      total: 0
    });
    lt(this, "banknotes", {
      stacker: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      recycler: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      out: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      totals: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
      total: 0
    });
    lt(this, "card_reader", {
      available: !1,
      max_pre_credit: 0
    });
    G(this, $t, !1);
    G(this, Ft, 0);
    G(this, zt, 0);
    if (this.__internal__.device.type = "boardroid", k.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.serial.config_port.baudRate = 115200, this.__internal__.serial.response.length = 14, this.__internal__.time.response_connection = 600, this.__internal__.time.response_general = 4e3, this.__internal__.time.response_engines = 15e3, this.__internal__.dispense.limit_counter = 15, this.__internal__.dispense.custom_limit_counter = null, this.__internal__.dispense.backup_dispense = {
      channel: 1,
      second_channel: null,
      sensor: !0,
      seconds: null
    }, o(this, w, js).call(this), o(this, w, Hs).call(this);
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
        e.request = "connect", e = o(this, w, Ws).call(this, e);
        break;
      case "a0":
        e.request = "--automatic", e = o(this, w, Zs).call(this, t, e);
        break;
      case "b0":
        e.request = "--automatic", e = o(this, w, Ys).call(this, t, e);
        break;
      case "d0":
        e.request = "coin-purse:config", e = o(this, w, ta).call(this, t[2], e);
        break;
      case "d1":
        e.request = "banknote-purse:config", e.additional = { scrow: null }, e = o(this, w, ea).call(this, t, e);
        break;
      case "d2":
        e.request = "coin-purse:read-tubes", e = o(this, w, na).call(this, t, e);
        break;
      case "d3":
        e.request = "banknote-purse:read-recycler", e = o(this, w, ia).call(this, t, e);
        break;
      case "d4":
        e.request = "banknote-purse:banknote-scrow-status", e = o(this, w, ra).call(this, t[2], e);
        break;
      case "d5":
        e.request = "banknote-purse:dispense", e = o(this, w, sa).call(this, t, e);
        break;
      case "d6":
        e.request = "coin-purse:dispense", e = o(this, w, aa).call(this, t, e);
        break;
      case "d7":
        e.request = "dispense", e = o(this, w, oa).call(this, t[5], e);
        break;
      case "d8":
        e.request = "--automatic", e = o(this, w, ca).call(this, t[13], e);
        break;
      case "d9":
        e.request = "status:temperature", e = o(this, w, la).call(this, t, e);
        break;
      case "da":
        e.request = "status:relay", e = o(this, w, ha).call(this, t[2], e);
        break;
      case "db":
        e.request = "banknote-purse:save-memory", e.no_code = 18, e.name = "Bill purse memory saved?", e.description = "The memory of bill purse was saved successfully?", this.dispatch("banknote-purse:save-memory", { message: e });
        break;
      case "dc":
        e.request = "coin-purse:read-memory", e.no_code = 19, e.name = "Coin purse memory read?", e.description = "The memory of coin purse was read successfully?", this.dispatch("banknote-purse:read-memory", { message: e });
        break;
      case "dd":
        e.request = "card-reader", o(this, w, ua).call(this, t, e);
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
    await o(this, w, st).call(this, a, "coin-purse:config");
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
    await o(this, w, st).call(this, c, "coin-purse:dispense");
  }
  async coinPurseReadTubes() {
    const t = ["F1", "C2", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    await o(this, w, st).call(this, t, "coin-purse:read-tubes");
  }
  async banknotePurseConfigure({ enable: t = !1, scrow: e = !1 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    let i;
    return o(this, w, Ne).call(this) ? i = o(this, w, da).call(this, { enable: t, scrow: e }) : i = o(this, w, pa).call(this, { enable: t, scrow: e }), await o(this, w, st).call(this, i, "banknote-purse:config");
  }
  async banknotePurseDispense({ $_20: t = 0, $_50: e = 0, $_100: i = 0, $_200: s = 0, $_500: a = 0, $_1000: c = 0 } = {}) {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    let l;
    if (o(this, w, Ne).call(this)) {
      const h = [t, e, i, s, a];
      l = o(this, w, _a).call(this, h[this.__banknote_purse.recycler.banknote]);
    } else
      l = o(this, w, fa).call(this, { $_20: t, $_50: e, $_100: i, $_200: s, $_500: a, $_1000: c });
    await o(this, w, st).call(this, l, "banknote-purse:dispense");
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
    await o(this, w, st).call(this, t, "banknote-purse:banknote-scrow-status");
  }
  async banknotePurseRejectInScrow() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    const t = ["F1", "C4", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    await o(this, w, st).call(this, t, "banknote-purse:banknote-scrow-status");
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
    await o(this, w, st).call(this, h, "banknote-purse:save-memory");
  }
  async banknotePurseReadRecycler() {
    if (!this.__banknote_purse.available) throw new Error("Banknote purse not available");
    if (!this.__banknote_purse.isRecycler) throw new Error("Banknote purse is not recycler");
    const t = ["F1", "C3", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "B5"];
    return await o(this, w, st).call(this, t, "banknote-purse:read-recycler");
  }
  async cardReaderDisable() {
    if (!this.card_reader.available) throw new Error("Card reader not available");
    const t = ["F1", "CD", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await o(this, w, st).call(this, t, "card-reader:disable");
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
    let f = "00";
    i || (f = this.decToHex(s * 10));
    const b = ["F1", "CD", "01", h, p, f, c, l, "00", "00", "F2", "00"];
    await o(this, w, st).call(this, b, "card-reader:dispense");
  }
  async paymentPursesDisable({ coin: t = !0, banknote: e = !0, cardReader: i = !1 } = {}) {
    t && await this.coinPurseDisable(), e && await this.banknotePurseDisable(), i && await this.cardReaderDisable();
  }
  async paymentPursesEnable({ coin: t = !0, banknote: e = !0, scrowBanknote: i = !1 } = {}) {
    t && await this.coinPurseEnable(), e && await this.banknotePurseEnable({ scrow: i });
  }
  async coolingRelayConfigure({ enable: t = !1 } = {}) {
    const i = ["F1", "CC", t ? "01" : "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await o(this, w, st).call(this, i, "status:relay");
  }
  async coolingRelayEnable() {
    return await this.coolingRelayConfigure({ enable: !0 });
  }
  async coolingRelayDisable() {
    return await this.coolingRelayConfigure({ enable: !1 });
  }
  async readTemperature() {
    const t = ["F1", "CB", "00", "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
    return await o(this, w, st).call(this, t, "status:temperature");
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
    const p = o(this, w, Be).call(this, [
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
    let f = await this.internalDispense(p);
    return !f.dispensed && a && (f = await this.internalDispense(p)), this.__internal__.dispense.custom_limit_counter = null, f;
  }
  async testEngines({ singleEngine: t = !1 } = {}) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    if (I(this, $t)) throw new Error("Another test is running");
    o(this, w, Un).call(this), M(this, $t, !0);
    const e = [];
    o(this, w, Me).call(this);
    for (let i = 1; i <= 80; i++) {
      const s = await this.dispense({
        selection: i,
        second_selection: t ? null : i + 1,
        sensor: !1,
        seconds: 0.4,
        retry: !1
      });
      e.push(s), M(this, Ft, i), o(this, w, Me).call(this), t || i++;
    }
    M(this, Ft, 80), o(this, w, Me).call(this, { dispensed: e }), o(this, w, Un).call(this);
  }
  async sendCustomCode({ code: t = [] } = {}) {
    if (t.length === 0) throw new Error("Invalid code");
    const e = o(this, w, Be).call(this, t);
    await this.appendToQueue(e, "custom");
  }
  hasToReturnChange(t = 0) {
    let e = t;
    return e <= 0 ? !0 : (e = o(this, w, Ln).call(this, e).pending, e = o(this, w, Vn).call(this, e).pending, !(e > 0));
  }
  async returnChange() {
    return await o(this, w, qn).call(this);
  }
  async returnInsertedMoney() {
    return this.__money_session.inserted <= 0 ? !1 : await o(this, w, qn).call(this, this.__money_session.inserted);
  }
  async serialCorruptMessage(t, e) {
    this.dispatch("corrupt:message", { data: t, message: e });
  }
}
$t = new WeakMap(), Ft = new WeakMap(), zt = new WeakMap(), w = new WeakSet(), js = function() {
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
}, Hs = function() {
  k.add(this);
}, Ne = function() {
  return this.__banknote_purse.isRecycler && this.__banknote_purse.recycler.ict;
}, Ks = function() {
  return this.hasCoinPurse || this.hasRecycler;
}, Ws = function(t) {
  return t.name = "Connection with the serial device completed.", t.description = "Your connection with the serial device was successfully completed.", t.no_code = 1, this.dispatch("run:default-load", {}), t;
}, $s = function(t) {
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
}, zs = function(t) {
  return ["g50", "c50", "p1", "p2", "p5", "p10", "p20"].includes(t);
}, Gs = function(t) {
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
}, Xs = function(t) {
  return ["p20", "p50", "p100", "p200", "p500", "p1000"].includes(t);
}, Js = function(t) {
  return ["r20", "r50", "r100"].includes(t);
}, Qs = function() {
  return ["r20", "r50", "r100", "r200", "r500"][this.__banknote_purse.recycler.banknote];
}, Fn = function(t, e, i) {
  if (!t) return;
  let s = !0;
  if (o(this, w, zs).call(this, t) && i === "coin") {
    if (typeof this.coins.tubes[t] > "u") return;
    e === "tube" ? this.coins.tubes[t] += 1 : e === "box" && (this.coins.box[t] += 1);
    let a = 0;
    ["g50", "c50"].includes(t) ? a = 0.5 : a += parseInt(t.slice(1)), this.coins.totals[t] += a, this.__money_session.inserted += a, this.coins.total += a;
  } else if (o(this, w, Xs).call(this, t) && i === "banknote") {
    if (typeof this.banknotes.recycler[t] > "u") return;
    e === "recycler" ? this.banknotes.recycler[t] += 1 : e === "stacker" && (this.banknotes.stacker[t] += 1);
    let a = parseInt(t.slice(1));
    this.banknotes.totals[t] += a, this.__money_session.inserted += a, this.banknotes.total += a;
  } else if (o(this, w, Js).call(this, t) && e === "out" && i === "banknote") {
    if (typeof this.banknotes.out[t.replace("r", "p")] > "u") return;
    this.banknotes.out[t.replace("r", "p")] += 1;
    let a = parseInt(t.slice(1));
    this.__money_session.retired += a, this.banknotes.recycler[t.replace("r", "p")] -= 1, this.banknotes.total -= a, s = !1, this.dispatch("session:money-dispensed", { type_money: t, retired: a, finish: !1, type: "banknotes" });
  }
  s && this.dispatch("session:money-request", {});
}, Zs = function(t, e) {
  const i = parseInt(t[2], 16);
  return e.name = "Coin Inserted", e.no_code = 2, e.additional = { where: null, coin: null }, i === 1 ? (e.name = "Lever pressed", e.description = "Reject lever", e.no_code = 100, this.dispatch("coin-purse:reject-lever", {})) : i === 2 ? (e.name = "Reset coin purse", e.description = "The configuration of coin purse was reset", e.no_code = 101, this.dispatch("coin-purse:reset", {})) : i >= 64 && i <= 79 ? (e.name = "Coin inserted in profit box", e.additional.where = "box") : i >= 80 && i <= 95 ? (e.name = "Coin inserted in tube", e.additional.where = "tube") : i >= 96 && i <= 111 ? (e.name = "Unused coin", e.description = "Something come from coin changer but in MDB Docs is unused", e.additional.where = "unused") : i >= 112 && i <= 127 ? (e.name = "Coin rejected", e.additional.where = "rejected") : i >= 144 && i <= 159 ? (e.name = "Coin dispensed", e.additional.where = "out", e.description = `Undefined value: ¿${t[2]}?`) : (e.name = "Coin inserted", e.description = "Undefined status. Without information of this", e.no_code = 400), i === 1 || i === 2 || i >= 160 || i >= 128 && i <= 143 || ([e.description, e.additional.coin] = o(this, w, $s).call(this, t[2]), e.no_code = 38 + i, o(this, w, Fn).call(this, e.additional.coin, e.additional.where, "coin"), ["tube", "out"].includes(e.additional.where) && this.dispatch("coin-purse:tubes", this.coins.tubes), this.dispatch("coin-purse:coin-event", this.coins)), e;
}, Ys = function(t, e) {
  const i = parseInt(t[2], 16);
  return e.name = "Banknote Inserted", e.no_code = 2, e.additional = { where: null, banknote: null }, i === 42 ? (e.name = "Banknote dispensed", e.description = "Banknote dispensed by request.", e.additional.banknote = o(this, w, Qs).call(this), e.additional.where = "out", e.no_code = 200) : i >= 128 && i <= 143 ? (e.name = "Banknote inserted", e.additional.where = "stacker") : i >= 144 && i <= 159 ? (e.name = "Banknote inserted in pre stacker", e.additional.where = "tmp") : i >= 160 && i <= 175 ? (e.name = "Banknote rejected", e.additional.where = "nothing") : i >= 176 && i <= 191 && (e.name = "Banknote inserted", e.additional.where = "recycler"), i >= 128 && i <= 191 && ([e.description, e.additional.banknote] = o(this, w, Gs).call(this, t[2]), e.no_code = 74 + i), o(this, w, Fn).call(this, e.additional.banknote, e.additional.where, "banknote"), this.dispatch("banknote-purse:event-banknote", this.banknotes), e;
}, ta = function(t, e) {
  const i = parseInt(t, 16);
  return i === 1 ? (e.name = "Coin purse enabled", e.description = "Configuration complete, enabled", e.no_code = 3) : i === 0 ? (e.name = "Coin purse disabled", e.description = "Disabled by system request", e.no_code = 4) : (e.name = "Status unknown", e.description = "The response of coin purse doesn't identify successfully", e.no_code = 400), this.dispatch("coin-purse:config", { enabled: i === 1 }), e;
}, ea = function(t, e) {
  const i = parseInt(t[2], 16), s = parseInt(t[3], 16);
  return i === 0 ? (e.name = "Bill purse disabled", e.description = "Configuration complete, disabled") : i === 1 && (e.name = "Bill purse enabled", e.description = "Configuration complete, enabled"), s === 0 ? e.additional.scrow = "Scrow disabled, banknote received automatic" : s === 1 && (e.additional.scrow = "Scrow enabled, require manual action"), e.no_code = 5, this.dispatch("banknote-purse:config", { enabled: i === 1, scrow: s === 1 }), e;
}, na = function(t, e) {
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
}, ia = function(t, e) {
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
}, ra = function(t, e) {
  const i = parseInt(t, 16);
  return i === 1 ? e.name = "Banknote accepted" : i === 0 ? e.name = "Banknote rejected" : e.name = "Unknown status banknote", e.no_code = 8, this.dispatch("banknote-purse:banknote-scrow-status", { status: i === 1 }), e;
}, sa = function(t, e) {
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
}, aa = function(t, e) {
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
}, oa = function(t, e) {
  const i = parseInt(t, 16);
  return i === 1 ? (e.name = "Product not delivered", e.description = "The product requested wasn't delivered", e.no_code = 11, this.__internal__.dispense.status = !1) : i === 0 ? (e.name = "Product delivered", e.description = "The product requested was delivered", e.no_code = 12, this.__internal__.dispense.status = !0) : (e.name = "Unknown status product", e.description = "The response of product doesn't identify successfully", e.no_code = 400, this.__internal__.dispense.status = !1), this.dispatch("dispensed", {}), e;
}, ca = function(t, e) {
  let i = "closed";
  return t === "db" ? (e.name = "Door closed", e.no_code = 13) : t === "dc" ? (e.name = "Door open", e.no_code = 14, i = "open") : (e.name = "Unknown status door", e.description = "The response of door doesn't identify successfully", e.no_code = 400, i = "unknown"), this.__internal__.device.door_open = i === "open", this.dispatch("event:door", { open: i === "open" }), this.dispatch("door:event", { open: i === "open" }), e;
}, la = function(t, e) {
  const i = parseInt(t[2], 16) * 255, s = parseInt(t[3], 16), a = (i + s) * 0.1;
  return e.no_code = 15, e.name = "Temperature status", e.description = `Temperature: ${a}`, e.additional = {
    high: i,
    low: s,
    temperature: parseFloat(a.toString())
  }, this.dispatch("status:temperature", e.additional), e;
}, ha = function(t, e) {
  const i = parseInt(t, 16);
  let s = "unknown";
  return i === 1 ? (e.name = "Relay on", e.description = "Relay on", e.no_code = 16, s = "on") : i === 0 ? (e.name = "Relay off", e.description = "Relay off", e.no_code = 17, s = "off") : (e.name = "Status unknown", e.description = "Status unknown", e.no_code = 400), this.dispatch("status:relay", { enabled: s === "on" }), e;
}, ua = function(t, e) {
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
    s === 1 ? (e.no_code = 30, e.name = "product not dispensed", e.description = "The product requested wasn't delivered") : s === 0 ? (e.no_code = 31, e.name = "product dispensed", e.description = "The product requested was delivered") : (e.name = "finished-unknown", e.no_code = 400);
  } else
    e.no_code = 400;
  return this.dispatch("card-reader:event", e), e;
}, st = function(t, e) {
  return this.appendToQueue(o(this, w, Be).call(this, t), e);
}, Be = function(t) {
  return t[11] = this.serialBoardroidSumHex(t), t.map((e, i) => {
    t[i] = this.hexMaker(e);
  }), t;
}, da = function({ enable: t = !1, scrow: e = !1 } = {}) {
  const i = t ? "FF" : "00", s = e ? "FF" : "00";
  return ["F1", "C0", i, i, s, s, "00", "00", "00", "00", "F2", "00"];
}, pa = function({ enable: t = !1, scrow: e = !1 } = {}) {
  return ["F1", "C0", t ? "01" : "00", e ? "01" : "00", "00", "00", "00", "00", "00", "00", "F2", "00"];
}, _a = function(t = 1) {
  if (t < 1) throw new Error("No banknotes to dispense");
  return t = this.decToHex(t), ["F1", "C5", this.decToHex(this.__banknote_purse.recycler.banknote.toString()), t, "00", "00", "00", "00", "00", "00", "F2", "00"];
}, fa = function({ $_20: t = 0, $_50: e = 0, $_100: i = 0, $_200: s = 0, $_500: a = 0, $_1000: c = 0 } = {}) {
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
}, Un = function() {
  M(this, $t, !1), M(this, Ft, 0), M(this, zt, 0);
}, /**
 *
 * @param {null|object} dispensed
 * @param {number} limit
 */
Me = function({ dispensed: t = null, limit: e = 80 } = {}) {
  M(this, zt, Math.round(I(this, Ft) * 100 / e)), this.dispatch("percentage:test", { percentage: I(this, zt), dispensed: t });
}, ga = function(t) {
  const e = ["20", "50", "100", "200", "500"], i = this.__banknote_purse.recycler.banknote, s = "$_" + e[i], a = parseInt(e[i]), c = this.banknotes.recycler[`p${e[i]}`], l = Math.min(Math.floor(t / a), c), h = {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: t,
    will_dispense: l > 0
  };
  return this.totalInRecycler === 0 || l < 1 || t === 0 || (h.banknotes[s] = l, h.pending = parseFloat((t - l * a).toFixed(2))), h;
}, ya = function(t) {
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
}, Ln = function(t) {
  return this.hasRecycler ? o(this, w, Ne).call(this) ? o(this, w, ga).call(this, t) : o(this, w, ya).call(this, t) : {
    banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
    pending: t,
    will_dispense: !1
  };
}, Vn = function(t) {
  const e = {
    coins: { $_50c: 0, $_1: 0, $_2: 0, $_5: 0, $_10: 0 },
    pending: t,
    will_dispense: !1
  };
  if (!this.hasCoinPurse || t <= 0 || this.totalInTubes === 0) return e;
  const i = (s, a, c = null) => {
    if (this.coins.tubes[a] > 0) {
      c === null && (c = "$_" + s);
      const l = Math.floor(e.pending / s), h = Math.min(l, this.coins.tubes[a]);
      e.coins[c] = h, e.pending = parseFloat((e.pending - h * s).toFixed(2));
    }
  };
  return i(10, "p10"), i(5, "p5"), i(2, "p2"), i(1, "p1"), i(0.5, "g50", "$_50c"), e.will_dispense = Object.values(e.coins).some((s) => s > 0), e;
}, qn = async function(t = null) {
  if (!o(this, w, Ks).call(this)) throw new Error("Change not available");
  let e = this.change, i = this.change;
  if (t !== null && (e = t, i = t), i <= 0) return !1;
  const s = o(this, w, Ln).call(this, i);
  i = s.pending;
  const a = o(this, w, Vn).call(this, i);
  return i = a.pending, i > 0 && this.dispatch("change:pending", { pending: i }), this.dispatch("change:dispense", {
    recycler: s.banknotes,
    coins: a.coins,
    pending: i,
    delivery: e - i
  }), i === e ? !1 : (s.will_dispense && await this.banknotePurseDispense(s.banknotes), a.will_dispense && await this.coinPurseDispense(a.coins), !0);
};
var Gt, ba, ma;
class cl extends Dt {
  constructor({ filters: t = null, config_port: e = null, no_device: i = 1 } = {}) {
    super({ filters: t, config_port: e, no_device: i });
    G(this, Gt);
    if (this.__internal__.device.type = "arduino", k.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.time.response_connection = 2e3, this.__internal__.time.response_general = 2e3, this.__internal__.serial.delay_first_connection = 1e3, o(this, Gt, ma).call(this), o(this, Gt, ba).call(this), this.getResponseAsString();
  }
  serialMessage(t) {
    const e = this.stringToArrayHex(t), i = this.stringToArrayBuffer(t), s = {
      original_code: e,
      arrayBuffer: i,
      code: null,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    switch (s.code = t, t) {
      case "connected":
        s.name = "connected", s.description = "Connection established", s.request = "connect", s.no_code = 100;
        break;
      case "created by danidoble":
        s.name = "thanks", s.description = "thanks for using this software", s.request = "credits", s.no_code = 101;
        break;
      case "hello there":
        s.name = "hello there", s.description = "hi human", s.request = "hi", s.no_code = 102;
        break;
      case "ara ara":
        s.name = "ara ara", s.description = "troll", s.request = "ara ara", s.no_code = 404;
        break;
      default:
        s.name = "unknown", s.description = "Unknown command", s.request = "unknown", s.no_code = 400;
        break;
    }
    this.dispatch("serial:message", s);
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
Gt = new WeakSet(), ba = function() {
  k.add(this);
}, ma = function() {
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
const ll = {
  wait: Ct,
  getSeconds: sn,
  supportWebSerial: Pa
}, hl = "4.1.9";
export {
  cl as Arduino,
  ol as Boardroid,
  k as Devices,
  an as Emulator,
  al as Jofemar,
  Dt as Kernel,
  Lc as Locker,
  rl as PinPad,
  sl as PinPax,
  Uc as Relay,
  ll as utils,
  hl as version
};
