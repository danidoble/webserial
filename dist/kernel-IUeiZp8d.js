var U = Object.defineProperty;
var I = (u) => {
  throw TypeError(u);
};
var O = (u, n, e) => n in u ? U(u, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : u[n] = e;
var x = (u, n, e) => O(u, typeof n != "symbol" ? n + "" : n, e), A = (u, n, e) => n.has(u) || I("Cannot " + e);
var g = (u, n, e) => (A(u, n, "read from private field"), e ? e.call(u) : n.get(u)), B = (u, n, e) => n.has(u) ? I("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(u) : n.set(u, e), P = (u, n, e, a) => (A(u, n, "write to private field"), a ? a.call(u, e) : n.set(u, e), e), s = (u, n, e) => (A(u, n, "access private method"), e);
import { h as f, K as L } from "./webserial-core-DGKQCs5a.js";
function R(u = 100) {
  return new Promise((n) => setTimeout(() => n(), u));
}
function Q() {
  return "serial" in navigator;
}
function W() {
  return "geolocation" in navigator;
}
function z() {
  return "crypto" in window;
}
function G(u = 1) {
  return u * 1e3;
}
function V(u) {
  return u == null || u === "";
}
var k, M, r, j, N, o, F, m, h, C, l, T, S;
const t = class t {
  static status(n = null) {
    var a, i;
    if (!s(a = t, r, o).call(a, n)) return !1;
    let e = [];
    switch (g(t, k)) {
      case "locker":
        e = ["0", "8"];
        break;
      case "boardroid":
        e = ["2", (5 + g(t, M)).toString(16).toUpperCase()];
        break;
      case "jofemar":
        e = ["6"];
        break;
      default:
        return !1;
    }
    s(i = t, r, l).call(i, e);
  }
  static dispensed(n = null) {
    var a, i;
    if (!s(a = t, r, o).call(a, n)) return !1;
    let e = [];
    switch (g(t, k)) {
      case "locker":
        e = ["0", "7", "4", "4", "4"];
        break;
      case "boardroid":
        e = ["2", "D7", "A", "0", "0", "0", "0", "0", "0", "0", "0", "0", "F2"];
        break;
      case "jofemar":
        e = ["6", "30"];
        break;
      default:
        return !1;
    }
    s(i = t, r, l).call(i, e);
  }
  static notDispensed(n = null) {
    var a, i;
    if (!s(a = t, r, o).call(a, n)) return !1;
    let e = [];
    switch (g(t, k)) {
      case "locker":
        e = ["0", "7", "5", "5", "5"];
        break;
      case "boardroid":
        e = ["2", "D7", "A", "0", "0", "1", "0", "0", "0", "0", "0", "0", "F2"];
        break;
      case "jofemar":
        e = ["6", "34"];
        break;
      default:
        return !1;
    }
    s(i = t, r, l).call(i, e);
  }
  static gateInactive(n = null) {
    var e;
    if (!s(e = t, r, o).call(e, n) || !s(this, r, F).call(this)) return !1;
    s(this, r, l).call(this, ["0", "7", "5", "5", "5"]);
  }
  static gateConfigured(n = null) {
    var e;
    if (!s(e = t, r, o).call(e, n) || !s(this, r, F).call(this)) return !1;
    s(this, r, l).call(this, ["0", "6"]);
  }
  static keyPressed(n = null) {
    var c, b, p;
    if (!s(c = t, r, o).call(c, n) || !s(b = t, r, h).call(b)) return !1;
    const e = ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "2A", "23", "41", "42", "43", "44"], a = (128 + g(t, M)).toString(16), i = Math.floor(Math.random() * 15);
    s(p = t, r, l).call(p, ["2", a, "54", e[i]]);
  }
  static doorOpened(n = null) {
    var i, c;
    if (!s(i = t, r, o).call(i, n) || !s(this, r, C).call(this)) return !1;
    let e = [];
    const a = (128 + g(t, M)).toString(16);
    switch (g(t, k)) {
      case "boardroid":
        e = ["2", "D8", "dc"];
        break;
      case "jofemar":
        e = ["2", a, "50", "4F"];
        break;
    }
    s(c = t, r, l).call(c, e);
  }
  static doorClosed(n = null) {
    var i, c;
    if (!s(i = t, r, o).call(i, n) || !s(this, r, C).call(this)) return !1;
    let e = [];
    const a = (128 + g(t, M)).toString(16);
    switch (g(t, k)) {
      case "boardroid":
        e = ["2", "D8", "db"];
        break;
      case "jofemar":
        e = ["2", a, "50", "43"];
        break;
    }
    s(c = t, r, l).call(c, e);
  }
  static channelDisconnected(n = null) {
    var a, i, c;
    if (!s(a = t, r, o).call(a, n) || !s(i = t, r, h).call(i)) return !1;
    const e = (128 + g(t, M)).toString(16);
    s(c = t, r, l).call(c, ["2", e, "43", "43", "43", "FD"]);
  }
  static channelConnected(n = null) {
    var a, i, c;
    if (!s(a = t, r, o).call(a, n) || !s(i = t, r, h).call(i)) return !1;
    const e = (128 + g(t, M)).toString(16);
    s(c = t, r, l).call(c, ["2", e, "43", "43", "43", "FC"]);
  }
  static channelEmpty(n = null) {
    var a, i, c;
    if (!s(a = t, r, o).call(a, n) || !s(i = t, r, h).call(i)) return !1;
    const e = (128 + g(t, M)).toString(16);
    s(c = t, r, l).call(c, ["2", e, "43", "43", "43", "FF"]);
  }
  static workingTemperature(n = null) {
    var a, i, c;
    if (!s(a = t, r, o).call(a, n) || !s(i = t, r, h).call(i)) return !1;
    const e = (128 + g(t, M)).toString(16);
    s(c = t, r, l).call(c, ["2", e, "43", "54", "16"]);
  }
  static currentTemperature(n = null) {
    var i, c, b;
    if (!s(i = t, r, o).call(i, n) || !s(c = t, r, C).call(c)) return !1;
    let e = [];
    const a = (128 + g(t, M)).toString(16);
    switch (g(t, k)) {
      case "boardroid":
        e = ["2", "D9", "44", "30"];
        break;
      case "jofemar":
        e = ["2", a, "43", "74", "2B", "30", "39", "2E", "31", "7F", "43"];
        break;
    }
    s(b = t, r, l).call(b, e);
  }
  static ready(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "30"]);
  }
  static busy(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "31"]);
  }
  static invalidTray(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "32"]);
  }
  static invalidChannel(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "33"]);
  }
  static emptyChannel(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "34"]);
  }
  static elevatorJam(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "35"]);
  }
  static elevatorMalfunction(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "36"]);
  }
  static phototransistorFailure(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "37"]);
  }
  static allChannelsEmpty(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "38"]);
  }
  static productDetectorFailure(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "39"]);
  }
  static displayDisconnected(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "41"]);
  }
  static productUnderElevator(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "42"]);
  }
  static elevatorSettingAlarm(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "43"]);
  }
  static buttonPanelFailure(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "44"]);
  }
  static errorWritingEeprom(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "45"]);
  }
  static errorControlTemperature(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "46"]);
  }
  static thermometerDisconnected(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "47"]);
  }
  static thermometerMisconfigured(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "48"]);
  }
  static thermometerFailure(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "49"]);
  }
  static errorExtractorConsumption(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "4A"]);
  }
  static channelSearchError(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "4B"]);
  }
  static productExitMouthSearchError(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "4C"]);
  }
  static elevatorInteriorLocked(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "4D"]);
  }
  static productDetectorVerifierError(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "4E"]);
  }
  static waitingForProductRecall(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "4F"]);
  }
  static productExpiredByTemperature(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "50"]);
  }
  static faultyAutomaticDoor(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "51"]);
  }
  static rejectLever(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "A0", "1"]);
  }
  static resetCoinPurse(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "A0", "2"]);
  }
  static coinInsertedBox(n = null, e = null) {
    var c, b, p, d;
    if (!s(c = t, r, o).call(c, n) || !s(b = t, r, m).call(b)) return !1;
    const a = ["40", "41", "42", "43", "44", "45"], i = s(p = t, r, T).call(p, a, e);
    s(d = t, r, l).call(d, ["2", "A0", i]);
  }
  static coinInsertedTube(n = null, e = null) {
    var c, b, p, d;
    if (!s(c = t, r, o).call(c, n) || !s(b = t, r, m).call(b)) return !1;
    const a = ["50", "51", "52", "53", "54", "55"], i = s(p = t, r, T).call(p, a, e);
    s(d = t, r, l).call(d, ["2", "A0", i]);
  }
  static banknoteInsertedStacker(n = null, e = null) {
    var c, b, p, d;
    if (!s(c = t, r, o).call(c, n) || !s(b = t, r, m).call(b)) return !1;
    const a = ["80", "81", "82", "83", "84"], i = s(p = t, r, S).call(p, a, e);
    s(d = t, r, l).call(d, ["2", "B0", i]);
  }
  static banknoteInsertedEscrow(n = null, e = null) {
    var c, b, p, d;
    if (!s(c = t, r, o).call(c, n) || !s(b = t, r, m).call(b)) return !1;
    const a = ["90", "91", "92", "93", "94"], i = s(p = t, r, S).call(p, a, e);
    s(d = t, r, l).call(d, ["2", "B0", i]);
  }
  static banknoteEjected(n = null, e = null) {
    var c, b, p, d;
    if (!s(c = t, r, o).call(c, n) || !s(b = t, r, m).call(b)) return !1;
    const a = ["A0", "A1", "A2", "A3", "A4"], i = s(p = t, r, S).call(p, a, e);
    s(d = t, r, l).call(d, ["2", "B0", i]);
  }
  static banknoteInsertedRecycler(n = null, e = null) {
    var c, b, p, d;
    if (!s(c = t, r, o).call(c, n) || !s(b = t, r, m).call(b)) return !1;
    const a = ["B0", "B1", "B2", "B3", "B4"], i = s(p = t, r, S).call(p, a, e);
    s(d = t, r, l).call(d, ["2", "B0", i]);
  }
  static banknoteTaken(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "B0", "2a"]);
  }
  static coinPurseEnabled(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "D0", "1"]);
  }
  static coinPurseDisabled(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "D0", "0"]);
  }
  static billPurseDisabled(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "D1", "0", "0"]);
  }
  static billPurseEnabled(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "D1", "1", "1"]);
  }
  static readTubes(n = null) {
    var y, D, w;
    if (!s(y = t, r, o).call(y, n) || !s(D = t, r, m).call(D)) return !1;
    const e = [
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
    ], [a, i, c, b, p, d] = [
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)],
      e[Math.floor(Math.random() * 30)]
    ];
    s(w = t, r, l).call(w, ["2", "D2", a, i, c, b, p, d]);
  }
  static readBillPurse(n = null, e = null) {
    var i, c, b, p;
    if (!s(i = t, r, o).call(i, n) || !s(c = t, r, m).call(c)) return !1;
    let a = [
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
      const d = a[Math.floor(Math.random() * 31)];
      let y = "0", D = "0", w = "0", v = "0", _ = "0";
      if (e !== null && !isNaN(parseInt(e)))
        switch (e.toString()) {
          case "20":
            y = d;
            break;
          case "50":
            D = d;
            break;
          case "100":
            w = d;
            break;
          case "200":
            v = d;
            break;
          case "500":
            _ = d;
            break;
        }
      else
        switch (n._recycler.bill) {
          case 0:
            y = d;
            break;
          case 1:
            D = d;
            break;
          case 2:
            w = d;
            break;
          case 3:
            v = d;
            break;
          case 4:
            _ = d;
            break;
        }
      s(b = t, r, l).call(b, ["2", "D3", y, D, w, v, _, "0"]);
    } else {
      const [d, y, D, w, v, _] = [
        a[Math.floor(Math.random() * 30)],
        a[Math.floor(Math.random() * 30)],
        a[Math.floor(Math.random() * 30)],
        a[Math.floor(Math.random() * 2)],
        a[Math.floor(Math.random())],
        a[Math.floor(Math.random())]
      ];
      s(p = t, r, l).call(p, ["2", "D3", d, y, D, w, v, _]);
    }
  }
  static banknoteAccepted(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "D4", "1"]);
  }
  static banknoteRejected(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "D4", "0"]);
  }
  static banknotesDispensed(n = null) {
    var a, i, c, b;
    if (!s(a = t, r, o).call(a, n) || !s(i = t, r, m).call(i)) return !1;
    let e = [
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
      const p = e[Math.floor(Math.random() * 30)];
      let d = "0", y = "0", D = "0", w = "0", v = "0";
      switch (n._recycler.bill) {
        case 0:
          d = p;
          break;
        case 1:
          y = p;
          break;
        case 2:
          D = p;
          break;
        case 3:
          w = p;
          break;
        case 4:
          v = p;
          break;
      }
      s(c = t, r, l).call(c, ["2", "D5", d, y, D, w, v, "0"]);
    } else {
      const [p, d, y, D, w, v] = [
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 30)],
        e[Math.floor(Math.random() * 2)],
        e[Math.floor(Math.random())],
        e[Math.floor(Math.random())]
      ];
      s(b = t, r, l).call(b, ["2", "D5", p, d, y, D, w, v]);
    }
  }
  static coinsDispensed(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "D6"]);
  }
  static relayOn(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DA", "1"]);
  }
  static relayOff(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DA", "0"]);
  }
  static nayaxEnabled(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DD", "1"]);
  }
  static nayaxDisabled(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DD", "0"]);
  }
  static nayaxPreCreditAuthorized(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DD", "3"]);
  }
  static nayaxCancelRequest(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DD", "4"]);
  }
  static nayaxSellApproved(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DD", "5"]);
  }
  static nayaxSellDenied(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DD", "6"]);
  }
  static nayaxEndSession(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DD", "7"]);
  }
  static nayaxCancelled(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DD", "8"]);
  }
  static nayaxDispensed(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DD", "A", "0"]);
  }
  static nayaxNotDispensed(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, m).call(a)) return !1;
    s(i = t, r, l).call(i, ["2", "DD", "A", "1"]);
  }
  static fullTray(n = null) {
    var e, a, i;
    if (!s(e = t, r, o).call(e, n) || !s(a = t, r, h).call(a)) return !1;
    s(i = t, r, l).call(i, ["6", "4F"]);
  }
  static setConnection(n = null) {
    var e;
    if (!s(e = t, r, o).call(e, n)) return !1;
    n.__internal__.serial.connected = !0;
  }
};
k = new WeakMap(), M = new WeakMap(), r = new WeakSet(), j = function() {
  if (t.enable === !1) throw new Error("Emulator is disabled");
  return t.enable;
}, N = function(n) {
  if (typeof n != "object" || !(n instanceof J))
    throw new Error(`Type ${n.typeDevice} is not supported`);
  return t.instance = n, P(t, k, n.typeDevice), P(t, M, n.deviceNumber), !0;
}, o = function(n = null) {
  var e, a;
  return !s(e = t, r, j).call(e) || n === null && t.instance === null ? !1 : (t.instance === null && s(a = t, r, N).call(a, n), !0);
}, F = function() {
  if (g(t, k) !== "locker") throw new Error("This function is only available for Locker devices");
  return !0;
}, m = function() {
  if (g(t, k) !== "boardroid")
    throw new Error("This function is only available for Boardroid devices");
  return !0;
}, h = function() {
  if (g(t, k) !== "jofemar") throw new Error("This function is only available for Jofemar devices");
  return !0;
}, C = function() {
  if (g(t, k) === "locker") throw new Error("This function is not available for Locker devices");
  return !0;
}, l = function(n) {
  t.instance.__emulate({ code: n });
}, T = function(n, e = null) {
  let a = n[Math.floor(Math.random() * 5)];
  if (e !== null && !isNaN(parseFloat(e)))
    switch (e.toString()) {
      case "0.5":
        a = n[1];
        break;
      case "1":
        a = n[2];
        break;
      case "2":
        a = n[3];
        break;
      case "5":
        a = n[4];
        break;
      case "10":
        a = n[5];
        break;
    }
  return a;
}, S = function(n, e = null) {
  let a = n[Math.floor(Math.random() * 4)];
  if (e !== null && !isNaN(parseFloat(e)))
    switch (e.toString()) {
      case "20":
        a = n[0];
        break;
      case "50":
        a = n[1];
        break;
      case "100":
        a = n[2];
        break;
      case "200":
        a = n[3];
        break;
      case "500":
        a = n[4];
        break;
    }
  return a;
}, B(t, r), x(t, "enable", !1), x(t, "instance", null), B(t, k, null), B(t, M, 1);
let E = t;
f.instance || (f.instance = new f());
const q = {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: [],
  arduino: [],
  pinpad: [],
  pinpax: [],
  hopper: []
};
f.devices = { ...f.devices, ...q };
f.addCustom = (u, n) => {
  f.registerType(u), f.add(n);
};
f.getCustomByUuid = (u, n) => f.get(u, n);
f.getJofemarByUuid = (u) => f.get("jofemar", u);
f.getLockerByUuid = (u) => f.get("locker", u);
f.getRelayByUuid = (u) => f.get("relay", u);
f.getBoardroidByUuid = (u) => f.get("boardroid", u);
f.getArduinoByUuid = (u) => f.get("arduino", u);
f.getPinPadByUuid = (u) => f.get("pinpad", u);
f.getPinPaxByUuid = (u) => f.get("pinpax", u);
f.getHopperByUuid = (u) => f.get("hopper", u);
f.getJofemar = (u = 1) => f.getByNumber("jofemar", u);
f.getBoardroid = (u = 1) => f.getByNumber("boardroid", u);
f.getLocker = (u = 1) => f.getByNumber("locker", u);
f.getRelay = (u = 1) => f.getByNumber("relay", u);
f.getArduino = (u = 1) => f.getByNumber("arduino", u);
f.getPinPad = (u = 1) => f.getByNumber("pinpad", u);
f.getPinPax = (u = 1) => f.getByNumber("pinpax", u);
f.getHopper = (u = 1) => f.getByNumber("hopper", u);
class J extends L {
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
  async timeout(n, e) {
    await super.timeout(n, e), e === "dispense" && (this.__internal__.dispense.status = "no-response");
  }
  async serialPortsSaved(n) {
    const e = this.serialFilters;
    if (this.__internal__.aux_port_connector < n.length) {
      const a = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = n[a];
    } else
      this.__internal__.aux_port_connector = 0, this.__internal__.serial.port = await navigator.serial.requestPort({ filters: e });
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
    if (this.__internal__.dispense.must_response && (await R(this.__internal__.time.response_engines + 10), this.__internal__.dispense.status === "no-response"))
      return this.internalClearSensing(), this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", { reason: "no-response" }), { status: !1, error: "no-response" };
    this.__internal__.dispense.status = null, this.__internal__.dispense.dispensing = !0, this.dispatch("internal:dispense:running", {});
    const n = this;
    return new Promise((e) => {
      this.__internal__.interval.waiting_sense = setInterval(() => {
        switch (n.__internal__.dispense.status) {
          case null:
            n.internalDispensingProcess() === !1 && (n.internalClearSensing(), n.dispatch("not-dispensed", { reason: "timeout" }), e({ status: !1, error: "timeout" }));
            break;
          case !0:
            n.internalClearSensing(), n.__internal__.dispense.status = !0, n.dispatch("dispensed", {}), e({ status: !0, error: null });
            break;
          case !1:
            n.internalClearSensing(), n.__internal__.dispense.status = !1, n.dispatch("not-dispensed", { reason: "no-stock" }), e({ status: !1, error: null });
            break;
          case "elevator-locked":
            n.internalClearSensing(), n.__internal__.dispense.status = !1, n.dispatch("not-dispensed", { reason: "elevator-locked" }), e({ status: !1, error: "elevator-locked" });
            break;
          case "no-response":
            n.internalClearSensing(), n.__internal__.dispense.status = !1, n.dispatch("not-dispensed", { reason: "no-response" }), e({ status: !1, error: "no-response" });
            break;
        }
      }, this.__internal__.time.sense);
    });
  }
  async internalDispense(n) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    if (!E.enable && !this.__internal__.serial.connected && (await this.serialConnect(), !this.__internal__.serial.connected))
      throw new Error("Serial device not connected");
    return this.__internal__.serial.queue.length === 0 ? (await this.appendToQueue(n, "dispense"), await this.internalDispenseStatus()) : new Promise((e) => {
      const a = setInterval(async () => {
        if (this.__internal__.serial.queue.length > 0) return;
        clearInterval(a), await this.appendToQueue(n, "dispense");
        const i = await this.internalDispenseStatus();
        e(i);
      }, 100);
    });
  }
  __emulate(n) {
    if (typeof n.code != "object") {
      console.error("Invalid data to make an emulation");
      return;
    }
    this.__internal__.serial.connected || (this.__internal__.serial.connected = !0, this.dispatch("serial:connected"), f.instance.dispatch("change"), this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0)), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0);
    const e = [];
    for (const a in n.code)
      e.push(n.code[a].toString().padStart(2, "0").toLowerCase());
    this.serialMessage(e);
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
export {
  E,
  J as K,
  z as a,
  W as b,
  G as g,
  V as i,
  Q as s,
  R as w
};
