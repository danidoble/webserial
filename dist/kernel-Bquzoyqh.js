var ce = Object.defineProperty;
var W = (l) => {
  throw TypeError(l);
};
var ue = (l, e, t) => e in l ? ce(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t;
var N = (l, e, t) => ue(l, typeof e != "symbol" ? e + "" : e, t), F = (l, e, t) => e.has(l) || W("Cannot " + t);
var w = (l, e, t) => (F(l, e, "read from private field"), t ? t.call(l) : e.get(l)), U = (l, e, t) => e.has(l) ? W("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(l) : e.set(l, t), j = (l, e, t, n) => (F(l, e, "write to private field"), n ? n.call(l, t) : e.set(l, t), t), a = (l, e, t) => (F(l, e, "access private method"), t);
function _e(l = 100) {
  return new Promise((e) => setTimeout(() => e(), l));
}
function ve() {
  return "serial" in navigator;
}
function ke() {
  return "geolocation" in navigator;
}
function Ce() {
  return "crypto" in window;
}
function De(l = 1) {
  return l * 1e3;
}
function Ae(l) {
  return l == null || l === "";
}
var v, A, s, Y, Z, c, O, p, d, I, o, $, T;
const r = class r {
  static status(e = null) {
    var n, i;
    if (!a(n = r, s, c).call(n, e)) return !1;
    let t = [];
    switch (w(r, v)) {
      case "locker":
        t = ["0", "8"];
        break;
      case "boardroid":
        t = ["2", (5 + w(r, A)).toString(16).toUpperCase()];
        break;
      case "jofemar":
        t = ["6"];
        break;
      default:
        return !1;
    }
    a(i = r, s, o).call(i, t);
  }
  static dispensed(e = null) {
    var n, i;
    if (!a(n = r, s, c).call(n, e)) return !1;
    let t = [];
    switch (w(r, v)) {
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
    a(i = r, s, o).call(i, t);
  }
  static notDispensed(e = null) {
    var n, i;
    if (!a(n = r, s, c).call(n, e)) return !1;
    let t = [];
    switch (w(r, v)) {
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
    a(i = r, s, o).call(i, t);
  }
  static gateInactive(e = null) {
    var t;
    if (!a(t = r, s, c).call(t, e) || !a(this, s, O).call(this)) return !1;
    a(this, s, o).call(this, ["0", "7", "5", "5", "5"]);
  }
  static gateConfigured(e = null) {
    var t;
    if (!a(t = r, s, c).call(t, e) || !a(this, s, O).call(this)) return !1;
    a(this, s, o).call(this, ["0", "6"]);
  }
  static keyPressed(e = null) {
    var u, g, f;
    if (!a(u = r, s, c).call(u, e) || !a(g = r, s, d).call(g)) return !1;
    const t = ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "2A", "23", "41", "42", "43", "44"], n = (128 + w(r, A)).toString(16), i = Math.floor(Math.random() * 15);
    a(f = r, s, o).call(f, ["2", n, "54", t[i]]);
  }
  static doorOpened(e = null) {
    var i, u;
    if (!a(i = r, s, c).call(i, e) || !a(this, s, I).call(this)) return !1;
    let t = [];
    const n = (128 + w(r, A)).toString(16);
    switch (w(r, v)) {
      case "boardroid":
        t = ["2", "D8", "dc"];
        break;
      case "jofemar":
        t = ["2", n, "50", "4F"];
        break;
    }
    a(u = r, s, o).call(u, t);
  }
  static doorClosed(e = null) {
    var i, u;
    if (!a(i = r, s, c).call(i, e) || !a(this, s, I).call(this)) return !1;
    let t = [];
    const n = (128 + w(r, A)).toString(16);
    switch (w(r, v)) {
      case "boardroid":
        t = ["2", "D8", "db"];
        break;
      case "jofemar":
        t = ["2", n, "50", "43"];
        break;
    }
    a(u = r, s, o).call(u, t);
  }
  static channelDisconnected(e = null) {
    var n, i, u;
    if (!a(n = r, s, c).call(n, e) || !a(i = r, s, d).call(i)) return !1;
    const t = (128 + w(r, A)).toString(16);
    a(u = r, s, o).call(u, ["2", t, "43", "43", "43", "FD"]);
  }
  static channelConnected(e = null) {
    var n, i, u;
    if (!a(n = r, s, c).call(n, e) || !a(i = r, s, d).call(i)) return !1;
    const t = (128 + w(r, A)).toString(16);
    a(u = r, s, o).call(u, ["2", t, "43", "43", "43", "FC"]);
  }
  static channelEmpty(e = null) {
    var n, i, u;
    if (!a(n = r, s, c).call(n, e) || !a(i = r, s, d).call(i)) return !1;
    const t = (128 + w(r, A)).toString(16);
    a(u = r, s, o).call(u, ["2", t, "43", "43", "43", "FF"]);
  }
  static workingTemperature(e = null) {
    var n, i, u;
    if (!a(n = r, s, c).call(n, e) || !a(i = r, s, d).call(i)) return !1;
    const t = (128 + w(r, A)).toString(16);
    a(u = r, s, o).call(u, ["2", t, "43", "54", "16"]);
  }
  static currentTemperature(e = null) {
    var i, u, g;
    if (!a(i = r, s, c).call(i, e) || !a(u = r, s, I).call(u)) return !1;
    let t = [];
    const n = (128 + w(r, A)).toString(16);
    switch (w(r, v)) {
      case "boardroid":
        t = ["2", "D9", "44", "30"];
        break;
      case "jofemar":
        t = ["2", n, "43", "74", "2B", "30", "39", "2E", "31", "7F", "43"];
        break;
    }
    a(g = r, s, o).call(g, t);
  }
  static ready(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "30"]);
  }
  static busy(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "31"]);
  }
  static invalidTray(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "32"]);
  }
  static invalidChannel(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "33"]);
  }
  static emptyChannel(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "34"]);
  }
  static elevatorJam(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "35"]);
  }
  static elevatorMalfunction(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "36"]);
  }
  static phototransistorFailure(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "37"]);
  }
  static allChannelsEmpty(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "38"]);
  }
  static productDetectorFailure(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "39"]);
  }
  static displayDisconnected(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "41"]);
  }
  static productUnderElevator(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "42"]);
  }
  static elevatorSettingAlarm(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "43"]);
  }
  static buttonPanelFailure(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "44"]);
  }
  static errorWritingEeprom(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "45"]);
  }
  static errorControlTemperature(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "46"]);
  }
  static thermometerDisconnected(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "47"]);
  }
  static thermometerMisconfigured(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "48"]);
  }
  static thermometerFailure(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "49"]);
  }
  static errorExtractorConsumption(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "4A"]);
  }
  static channelSearchError(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "4B"]);
  }
  static productExitMouthSearchError(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "4C"]);
  }
  static elevatorInteriorLocked(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "4D"]);
  }
  static productDetectorVerifierError(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "4E"]);
  }
  static waitingForProductRecall(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "4F"]);
  }
  static productExpiredByTemperature(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "50"]);
  }
  static faultyAutomaticDoor(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "51"]);
  }
  static rejectLever(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "A0", "1"]);
  }
  static resetCoinPurse(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "A0", "2"]);
  }
  static coinInsertedBox(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, s, c).call(u, e) || !a(g = r, s, p).call(g)) return !1;
    const n = ["40", "41", "42", "43", "44", "45"], i = a(f = r, s, $).call(f, n, t);
    a(h = r, s, o).call(h, ["2", "A0", i]);
  }
  static coinInsertedTube(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, s, c).call(u, e) || !a(g = r, s, p).call(g)) return !1;
    const n = ["50", "51", "52", "53", "54", "55"], i = a(f = r, s, $).call(f, n, t);
    a(h = r, s, o).call(h, ["2", "A0", i]);
  }
  static banknoteInsertedStacker(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, s, c).call(u, e) || !a(g = r, s, p).call(g)) return !1;
    const n = ["80", "81", "82", "83", "84"], i = a(f = r, s, T).call(f, n, t);
    a(h = r, s, o).call(h, ["2", "B0", i]);
  }
  static banknoteInsertedEscrow(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, s, c).call(u, e) || !a(g = r, s, p).call(g)) return !1;
    const n = ["90", "91", "92", "93", "94"], i = a(f = r, s, T).call(f, n, t);
    a(h = r, s, o).call(h, ["2", "B0", i]);
  }
  static banknoteEjected(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, s, c).call(u, e) || !a(g = r, s, p).call(g)) return !1;
    const n = ["A0", "A1", "A2", "A3", "A4"], i = a(f = r, s, T).call(f, n, t);
    a(h = r, s, o).call(h, ["2", "B0", i]);
  }
  static banknoteInsertedRecycler(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, s, c).call(u, e) || !a(g = r, s, p).call(g)) return !1;
    const n = ["B0", "B1", "B2", "B3", "B4"], i = a(f = r, s, T).call(f, n, t);
    a(h = r, s, o).call(h, ["2", "B0", i]);
  }
  static banknoteTaken(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "B0", "2a"]);
  }
  static coinPurseEnabled(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "D0", "1"]);
  }
  static coinPurseDisabled(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "D0", "0"]);
  }
  static billPurseDisabled(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "D1", "0", "0"]);
  }
  static billPurseEnabled(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "D1", "1", "1"]);
  }
  static readTubes(e = null) {
    var k, C, D;
    if (!a(k = r, s, c).call(k, e) || !a(C = r, s, p).call(C)) return !1;
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
    ], [n, i, u, g, f, h] = [
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)]
    ];
    a(D = r, s, o).call(D, ["2", "D2", n, i, u, g, f, h]);
  }
  static readBillPurse(e = null, t = null) {
    var i, u, g, f;
    if (!a(i = r, s, c).call(i, e) || !a(u = r, s, p).call(u)) return !1;
    let n = [
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
    if (e._recycler.ict) {
      const h = n[Math.floor(Math.random() * 31)];
      let k = "0", C = "0", D = "0", S = "0", M = "0";
      if (t !== null && !isNaN(parseInt(t)))
        switch (t.toString()) {
          case "20":
            k = h;
            break;
          case "50":
            C = h;
            break;
          case "100":
            D = h;
            break;
          case "200":
            S = h;
            break;
          case "500":
            M = h;
            break;
        }
      else
        switch (e._recycler.bill) {
          case 0:
            k = h;
            break;
          case 1:
            C = h;
            break;
          case 2:
            D = h;
            break;
          case 3:
            S = h;
            break;
          case 4:
            M = h;
            break;
        }
      a(g = r, s, o).call(g, ["2", "D3", k, C, D, S, M, "0"]);
    } else {
      const [h, k, C, D, S, M] = [
        n[Math.floor(Math.random() * 30)],
        n[Math.floor(Math.random() * 30)],
        n[Math.floor(Math.random() * 30)],
        n[Math.floor(Math.random() * 2)],
        n[Math.floor(Math.random())],
        n[Math.floor(Math.random())]
      ];
      a(f = r, s, o).call(f, ["2", "D3", h, k, C, D, S, M]);
    }
  }
  static banknoteAccepted(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "D4", "1"]);
  }
  static banknoteRejected(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "D4", "0"]);
  }
  static banknotesDispensed(e = null) {
    var n, i, u, g;
    if (!a(n = r, s, c).call(n, e) || !a(i = r, s, p).call(i)) return !1;
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
    if (e._recycler.ict) {
      const f = t[Math.floor(Math.random() * 30)];
      let h = "0", k = "0", C = "0", D = "0", S = "0";
      switch (e._recycler.bill) {
        case 0:
          h = f;
          break;
        case 1:
          k = f;
          break;
        case 2:
          C = f;
          break;
        case 3:
          D = f;
          break;
        case 4:
          S = f;
          break;
      }
      a(u = r, s, o).call(u, ["2", "D5", h, k, C, D, S, "0"]);
    } else {
      const [f, h, k, C, D, S] = [
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 2)],
        t[Math.floor(Math.random())],
        t[Math.floor(Math.random())]
      ];
      a(g = r, s, o).call(g, ["2", "D5", f, h, k, C, D, S]);
    }
  }
  static coinsDispensed(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "D6"]);
  }
  static relayOn(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DA", "1"]);
  }
  static relayOff(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DA", "0"]);
  }
  static nayaxEnabled(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DD", "1"]);
  }
  static nayaxDisabled(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DD", "0"]);
  }
  static nayaxPreCreditAuthorized(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DD", "3"]);
  }
  static nayaxCancelRequest(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DD", "4"]);
  }
  static nayaxSellApproved(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DD", "5"]);
  }
  static nayaxSellDenied(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DD", "6"]);
  }
  static nayaxEndSession(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DD", "7"]);
  }
  static nayaxCancelled(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DD", "8"]);
  }
  static nayaxDispensed(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DD", "A", "0"]);
  }
  static nayaxNotDispensed(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, p).call(n)) return !1;
    a(i = r, s, o).call(i, ["2", "DD", "A", "1"]);
  }
  static fullTray(e = null) {
    var t, n, i;
    if (!a(t = r, s, c).call(t, e) || !a(n = r, s, d).call(n)) return !1;
    a(i = r, s, o).call(i, ["6", "4F"]);
  }
  static setConnection(e = null) {
    var t;
    if (!a(t = r, s, c).call(t, e)) return !1;
    e.__internal__.serial.connected = !0;
  }
};
v = new WeakMap(), A = new WeakMap(), s = new WeakSet(), Y = function() {
  if (r.enable === !1) throw new Error("Emulator is disabled");
  return r.enable;
}, Z = function(e) {
  if (typeof e != "object" || !(e instanceof me))
    throw new Error(`Type ${e.typeDevice} is not supported`);
  return r.instance = e, j(r, v, e.typeDevice), j(r, A, e.deviceNumber), !0;
}, c = function(e = null) {
  var t, n;
  return !a(t = r, s, Y).call(t) || e === null && r.instance === null ? !1 : (r.instance === null && a(n = r, s, Z).call(n, e), !0);
}, O = function() {
  if (w(r, v) !== "locker") throw new Error("This function is only available for Locker devices");
  return !0;
}, p = function() {
  if (w(r, v) !== "boardroid")
    throw new Error("This function is only available for Boardroid devices");
  return !0;
}, d = function() {
  if (w(r, v) !== "jofemar") throw new Error("This function is only available for Jofemar devices");
  return !0;
}, I = function() {
  if (w(r, v) === "locker") throw new Error("This function is not available for Locker devices");
  return !0;
}, o = function(e) {
  r.instance.__emulate({ code: e });
}, $ = function(e, t = null) {
  let n = e[Math.floor(Math.random() * 5)];
  if (t !== null && !isNaN(parseFloat(t)))
    switch (t.toString()) {
      case "0.5":
        n = e[1];
        break;
      case "1":
        n = e[2];
        break;
      case "2":
        n = e[3];
        break;
      case "5":
        n = e[4];
        break;
      case "10":
        n = e[5];
        break;
    }
  return n;
}, T = function(e, t = null) {
  let n = e[Math.floor(Math.random() * 4)];
  if (t !== null && !isNaN(parseFloat(t)))
    switch (t.toString()) {
      case "20":
        n = e[0];
        break;
      case "50":
        n = e[1];
        break;
      case "100":
        n = e[2];
        break;
      case "200":
        n = e[3];
        break;
      case "500":
        n = e[4];
        break;
    }
  return n;
}, U(r, s), N(r, "enable", !1), N(r, "instance", null), U(r, v, null), U(r, A, 1);
let L = r;
var he = Object.defineProperty, ee = (l) => {
  throw TypeError(l);
}, de = (l, e, t) => e in l ? he(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t, B = (l, e, t) => de(l, typeof e != "symbol" ? e + "" : e, t), fe = (l, e, t) => e.has(l) || ee("Cannot " + t), pe = (l, e, t) => e.has(l) ? ee("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(l) : e.set(l, t), m = (l, e, t) => (fe(l, e, "access private method"), t);
class Q extends CustomEvent {
  constructor(e, t) {
    super(e, t);
  }
}
class te extends EventTarget {
  constructor() {
    super(...arguments), B(this, "__listeners__", {
      debug: !1
    }), B(this, "__debug__", !1);
  }
  dispatch(e, t = null) {
    const n = new Q(e, { detail: t });
    this.dispatchEvent(n), this.__debug__ && this.dispatchEvent(new Q("debug", { detail: { type: e, data: t } }));
  }
  dispatchAsync(e, t = null, n = 100) {
    const i = this;
    setTimeout(() => {
      i.dispatch(e, t);
    }, n);
  }
  on(e, t) {
    typeof this.__listeners__[e] < "u" && !this.__listeners__[e] && (this.__listeners__[e] = !0), this.addEventListener(e, t);
  }
  off(e, t) {
    this.removeEventListener(e, t);
  }
  serialRegisterAvailableListener(e) {
    this.__listeners__[e] || (this.__listeners__[e] = !1);
  }
  get availableListeners() {
    return Object.keys(this.__listeners__).sort().map((e) => ({
      type: e,
      listening: this.__listeners__[e]
    }));
  }
}
const R = class y extends te {
  constructor() {
    super(), ["change"].forEach((e) => {
      this.serialRegisterAvailableListener(e);
    });
  }
  static $dispatchChange(e = null) {
    e && e.$checkAndDispatchConnection(), y.instance.dispatch("change", { devices: y.devices, dispatcher: e });
  }
  static typeError(e) {
    const t = new Error();
    throw t.message = `Type ${e} is not supported`, t.name = "DeviceTypeError", t;
  }
  static registerType(e) {
    typeof y.devices[e] > "u" && (y.devices[e] = {});
  }
  static add(e) {
    const t = e.typeDevice;
    typeof y.devices[t] > "u" && (y.devices[t] = {});
    const n = e.uuid;
    if (typeof y.devices[t] > "u" && y.typeError(t), y.devices[t][n])
      throw new Error(`Device with id ${n} already exists`);
    return y.devices[t][n] = e, y.$dispatchChange(e), Object.keys(y.devices[t]).indexOf(n);
  }
  static get(e, t) {
    return typeof y.devices[e] > "u" && (y.devices[e] = {}), typeof y.devices[e] > "u" && y.typeError(e), y.devices[e][t];
  }
  static getAll(e = null) {
    return e === null ? y.devices : (typeof y.devices[e] > "u" && y.typeError(e), y.devices[e]);
  }
  static getList() {
    return Object.values(y.devices).map((e) => Object.values(e)).flat();
  }
  static getByNumber(e, t) {
    return typeof y.devices[e] > "u" && y.typeError(e), Object.values(y.devices[e]).find((n) => n.deviceNumber === t) ?? null;
  }
  static getCustom(e, t = 1) {
    return typeof y.devices[e] > "u" && y.typeError(e), Object.values(y.devices[e]).find((n) => n.deviceNumber === t) ?? null;
  }
};
B(R, "instance"), B(R, "devices", {});
let _ = R;
_.instance || (_.instance = new _());
function J(l = 100) {
  return new Promise(
    (e) => setTimeout(() => e(), l)
  );
}
function ge() {
  return "serial" in navigator;
}
const q = {
  baudRate: 9600,
  dataBits: 8,
  stopBits: 1,
  parity: "none",
  bufferSize: 32768,
  flowControl: "none"
};
var b, x, P, H, E, ne, V, z, K, re, ie, se, ae, G, X, le, oe;
class be extends te {
  constructor({
    filters: e = null,
    config_port: t = q,
    no_device: n = 1,
    device_listen_on_channel: i = 1
  } = {
    filters: null,
    config_port: q,
    no_device: 1,
    device_listen_on_channel: 1
  }) {
    if (super(), pe(this, b), B(this, "__internal__", {
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
          as: "uint8",
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
        config_port: q,
        queue: [],
        auto_response: ["DD", "DD"]
      },
      device: {
        type: "unknown",
        id: window.crypto.randomUUID(),
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
    e && (this.serialFilters = e), t && (this.serialConfigPort = t), n && m(this, b, le).call(this, n), i && ["number", "string"].includes(typeof i) && (this.listenOnChannel = i), m(this, b, se).call(this), m(this, b, ae).call(this);
  }
  set listenOnChannel(e) {
    if (typeof e == "string" && (e = parseInt(e)), isNaN(e) || e < 1 || e > 255)
      throw new Error("Invalid port number");
    this.__internal__.device.listen_on_port = e, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(e);
  }
  get lastAction() {
    return this.__internal__.serial.last_action;
  }
  get listenOnChannel() {
    return this.__internal__.device.listen_on_port ?? 1;
  }
  set serialFilters(e) {
    this.__internal__.serial.filters = e;
  }
  get serialFilters() {
    return this.__internal__.serial.filters;
  }
  set serialConfigPort(e) {
    this.__internal__.serial.config_port = e;
  }
  get serialConfigPort() {
    return this.__internal__.serial.config_port;
  }
  get isConnected() {
    const e = this.__internal__.serial.connected, t = m(this, b, x).call(this, this.__internal__.serial.port);
    return e && !t && m(this, b, P).call(this, { error: "Port is closed, not readable or writable." }), this.__internal__.serial.connected = t, this.__internal__.serial.connected;
  }
  get isDisconnected() {
    const e = this.__internal__.serial.connected, t = m(this, b, x).call(this, this.__internal__.serial.port);
    return !e && t && (this.dispatch("serial:connected"), _.$dispatchChange(this)), this.__internal__.serial.connected = t, !this.__internal__.serial.connected;
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
  async timeout(e, t) {
    this.__internal__.last_error.message = "Operation response timed out.", this.__internal__.last_error.action = t, this.__internal__.last_error.code = e, this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), t === "connect" ? (this.__internal__.serial.connected = !1, this.dispatch("serial:reconnect", {}), _.$dispatchChange(this)) : t === "connection:start" && (await this.serialDisconnect(), this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector += 1, _.$dispatchChange(this), await this.serialConnect()), this.dispatch("serial:timeout", {
      ...this.__internal__.last_error,
      bytes: e,
      action: t
    });
  }
  async disconnect(e = null) {
    await this.serialDisconnect(), m(this, b, P).call(this, e);
  }
  async connect() {
    return new Promise((e, t) => {
      ge() || t("Web Serial not supported"), setTimeout(async () => {
        await J(499), await this.serialConnect(), this.isConnected ? e(`${this.typeDevice} device ${this.deviceNumber} connected`) : t(`${this.typeDevice} device ${this.deviceNumber} not connected`);
      }, 1);
    });
  }
  async serialDisconnect() {
    try {
      const e = this.__internal__.serial.reader, t = this.__internal__.serial.output_stream;
      e && (await e.cancel().catch((n) => this.serialErrors(n)), await this.__internal__.serial.input_done), t && (await t.getWriter().close(), await this.__internal__.serial.output_done), this.__internal__.serial.connected && this.__internal__.serial && this.__internal__.serial.port && await this.__internal__.serial.port.close();
    } catch (e) {
      this.serialErrors(e);
    } finally {
      this.__internal__.serial.reader = null, this.__internal__.serial.input_done = null, this.__internal__.serial.output_stream = null, this.__internal__.serial.output_done = null, this.__internal__.serial.connected = !1, this.__internal__.serial.port = null, _.$dispatchChange(this);
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
  async serialPortsSaved(e) {
    const t = this.serialFilters;
    if (this.__internal__.aux_port_connector < e.length) {
      const n = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = e[n];
    } else
      this.__internal__.aux_port_connector = 0, this.__internal__.serial.port = await navigator.serial.requestPort({
        filters: t
      });
    if (!this.__internal__.serial.port)
      throw new Error("Select another port please");
  }
  serialErrors(e) {
    const t = e.toString().toLowerCase();
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
        this.dispatch("serial:need-permission", {}), _.$dispatchChange(this);
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
        this.dispatch("serial:lost", {}), _.$dispatchChange(this);
        break;
      case t.includes("navigator.serial is undefined"):
        this.dispatch("serial:unsupported", {});
        break;
      default:
        console.error(e);
        break;
    }
    this.dispatch("serial:error", e);
  }
  async serialConnect() {
    try {
      this.dispatch("serial:connecting", {});
      const e = await m(this, b, ne).call(this);
      if (e.length > 0)
        await this.serialPortsSaved(e);
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
      const n = this;
      t.onconnect = (i) => {
        console.log(i), n.dispatch("serial:connected", i), _.$dispatchChange(this), n.__internal__.serial.queue.length > 0 && n.dispatch("internal:queue", {});
      }, t.ondisconnect = async () => {
        await n.disconnect();
      }, await J(this.__internal__.serial.delay_first_connection), this.__internal__.timeout.until_response = setTimeout(async () => {
        await n.timeout(n.__internal__.serial.bytes_connection ?? [], "connection:start");
      }, this.__internal__.time.response_connection), this.__internal__.serial.last_action = "connect", await m(this, b, H).call(this, this.__internal__.serial.bytes_connection ?? []), this.dispatch("serial:sent", {
        action: "connect",
        bytes: this.__internal__.serial.bytes_connection
      }), this.__internal__.auto_response && m(this, b, E).call(this, this.__internal__.serial.auto_response, null), await m(this, b, re).call(this);
    } catch (e) {
      this.serialErrors(e);
    }
  }
  async serialForget() {
    return await m(this, b, ie).call(this);
  }
  decToHex(e) {
    return typeof e == "string" && (e = parseInt(e, 10)), e.toString(16);
  }
  hexToDec(e) {
    return parseInt(e, 16);
  }
  hexMaker(e = "00", t = 2) {
    return e.toString().padStart(t, "0").toLowerCase();
  }
  add0x(e) {
    const t = [];
    return e.forEach((n, i) => {
      t[i] = "0x" + n;
    }), t;
  }
  bytesToHex(e) {
    return this.add0x(Array.from(e, (t) => this.hexMaker(t)));
  }
  validateBytes(e) {
    let t = new Uint8Array(0);
    if (e instanceof Uint8Array)
      t = e;
    else if (typeof e == "string")
      t = this.parseStringToTextEncoder(e);
    else if (Array.isArray(e) && typeof e[0] == "string")
      t = this.stringArrayToUint8Array(e);
    else if (Array.isArray(e) && typeof e[0] == "number")
      t = new Uint8Array(e);
    else
      throw new Error("Invalid data type");
    return t;
  }
  async appendToQueue(e, t) {
    const n = this.validateBytes(e);
    if (["connect", "connection:start"].includes(t)) {
      if (this.__internal__.serial.connected) return;
      await this.serialConnect();
      return;
    }
    this.__internal__.serial.queue.push({ bytes: n, action: t }), this.dispatch("internal:queue", {});
  }
  serialSetConnectionConstant(e = 1) {
    throw new Error(`Method not implemented 'serialSetConnectionConstant' to listen on channel ${e}`);
  }
  serialMessage(e) {
    throw console.log(e), new Error("Method not implemented 'serialMessage'");
  }
  serialCorruptMessage(e, t) {
    throw console.log(e, t), new Error("Method not implemented 'serialCorruptMessage'");
  }
  clearSerialQueue() {
    this.__internal__.serial.queue = [];
  }
  sumHex(e) {
    let t = 0;
    return e.forEach((n) => {
      t += parseInt(n, 16);
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
    m(this, b, oe).call(this), this.dispatch("serial:soft-reload", {});
  }
  async sendConnect() {
    if (!this.__internal__.serial.bytes_connection)
      throw new Error("No connection bytes defined");
    await this.appendToQueue(this.__internal__.serial.bytes_connection, "connect");
  }
  // @ts-expect-error code is required but can be empty
  async sendCustomCode({ code: e = [] } = { code: [] }) {
    if (e === null || e.length === 0)
      throw new Error("No data to send");
    await this.appendToQueue(e, "custom");
  }
  stringToArrayHex(e) {
    return Array.from(e).map((t) => t.charCodeAt(0).toString(16));
  }
  stringToArrayBuffer(e, t = `
`) {
    return this.parseStringToTextEncoder(e, t).buffer;
  }
  parseStringToTextEncoder(e = "", t = `
`) {
    const n = new TextEncoder();
    return e += t, n.encode(e);
  }
  parseStringToBytes(e = "", t = `
`) {
    const n = this.parseStringToTextEncoder(e, t);
    return Array.from(n).map((i) => i.toString(16));
  }
  parseUint8ToHex(e) {
    return Array.from(e).map((t) => t.toString(16));
  }
  parseHexToUint8(e) {
    return new Uint8Array(e.map((t) => parseInt(t, 16)));
  }
  stringArrayToUint8Array(e) {
    const t = [];
    return e.forEach((n) => {
      const i = n.replace("0x", "");
      t.push(parseInt(i, 16));
    }), new Uint8Array(t);
  }
  parseUint8ArrayToString(e) {
    let t = new Uint8Array(0);
    e instanceof Uint8Array ? t = e : t = this.stringArrayToUint8Array(e), e = this.parseUint8ToHex(t);
    const n = e.map((i) => parseInt(i, 16));
    return this.__internal__.serial.response.replacer ? String.fromCharCode(...n).replace(this.__internal__.serial.response.replacer, "") : String.fromCharCode(...n);
  }
  hexToAscii(e) {
    const t = e.toString();
    let n = "";
    for (let i = 0; i < t.length; i += 2)
      n += String.fromCharCode(parseInt(t.substring(i, 2), 16));
    return n;
  }
  asciiToHex(e) {
    const t = [];
    for (let n = 0, i = e.length; n < i; n++) {
      const u = Number(e.charCodeAt(n)).toString(16);
      t.push(u);
    }
    return t.join("");
  }
  $checkAndDispatchConnection() {
    return this.isConnected;
  }
}
b = /* @__PURE__ */ new WeakSet(), x = function(l) {
  return !!(l && l.readable && l.writable);
}, P = function(l = null) {
  this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector = 0, this.dispatch("serial:disconnected", l), _.$dispatchChange(this);
}, H = async function(l) {
  const e = this.__internal__.serial.port;
  if (!e || e && (!e.readable || !e.writable))
    throw m(this, b, P).call(this, { error: "Port is closed, not readable or writable." }), new Error("The port is closed or is not readable/writable");
  const t = this.validateBytes(l);
  if (e.writable === null) return;
  const n = e.writable.getWriter();
  await n.write(t), n.releaseLock();
}, E = function(l = new Uint8Array([]), e = null) {
  if (l && l.length > 0) {
    const t = this.__internal__.serial.connected;
    if (this.__internal__.serial.connected = m(this, b, x).call(this, this.__internal__.serial.port), _.$dispatchChange(this), !t && this.__internal__.serial.connected && this.dispatch("serial:connected"), this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0), this.__internal__.serial.response.as === "hex")
      this.serialMessage(this.parseUint8ToHex(l));
    else if (this.__internal__.serial.response.as === "uint8")
      this.serialMessage(l);
    else if (this.__internal__.serial.response.as === "string") {
      const n = this.parseUint8ArrayToString(l);
      if (this.__internal__.serial.response.limiter !== null) {
        const i = n.split(this.__internal__.serial.response.limiter);
        for (const u in i)
          i[u] && this.serialMessage(i[u]);
      } else
        this.serialMessage(n);
    } else {
      const n = this.stringToArrayBuffer(this.parseUint8ArrayToString(l));
      this.serialMessage(n);
    }
  } else
    this.serialCorruptMessage(l, e);
  this.__internal__.serial.queue.length !== 0 && this.dispatch("internal:queue", {});
}, ne = async function() {
  const l = this.serialFilters, e = await navigator.serial.getPorts({ filters: l });
  return l.length === 0 ? e : e.filter((t) => {
    const n = t.getInfo();
    return l.some((i) => n.usbProductId === i.usbProductId && n.usbVendorId === i.usbVendorId);
  }).filter((t) => !m(this, b, x).call(this, t));
}, V = function(l) {
  if (l) {
    const e = this.__internal__.serial.response.buffer, t = new Uint8Array(e.length + l.byteLength);
    t.set(e, 0), t.set(new Uint8Array(l), e.length), this.__internal__.serial.response.buffer = t;
  }
}, z = async function() {
  this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0), this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
    this.__internal__.serial.response.buffer && m(this, b, E).call(this, this.__internal__.serial.response.buffer), this.__internal__.serial.response.buffer = new Uint8Array(0);
  }, 400);
}, K = async function() {
  if (this.__internal__.serial.response.length !== null) {
    if (this.__internal__.serial.response.length === this.__internal__.serial.response.buffer.length)
      m(this, b, E).call(this, this.__internal__.serial.response.buffer), this.__internal__.serial.response.buffer = new Uint8Array(0);
    else if (this.__internal__.serial.response.length < this.__internal__.serial.response.buffer.length) {
      let l = new Uint8Array(0);
      for (let t = 0; t < this.__internal__.serial.response.length; t++)
        l[t] = this.__internal__.serial.response.buffer[t];
      if (l.length === this.__internal__.serial.response.length) {
        m(this, b, E).call(this, l), this.__internal__.serial.response.buffer = new Uint8Array(0);
        return;
      }
      l = new Uint8Array(0);
      const e = this.__internal__.serial.response.length * 2;
      if (this.__internal__.serial.response.buffer.length === e) {
        for (let t = 14; t < e; t++)
          l[t - this.__internal__.serial.response.length] = this.__internal__.serial.response.buffer[t];
        l.length === this.__internal__.serial.response.length && (m(this, b, E).call(this, l), this.__internal__.serial.response.buffer = new Uint8Array(0));
      }
    }
  }
}, re = async function() {
  const l = this.__internal__.serial.port;
  if (!l || !l.readable) throw new Error("Port is not readable");
  for (; l.readable && this.__internal__.serial.keep_reading; ) {
    const e = l.readable.getReader();
    this.__internal__.serial.reader = e;
    try {
      let t = !0;
      for (; t; ) {
        const { value: n, done: i } = await e.read();
        if (i) {
          e.releaseLock(), this.__internal__.serial.keep_reading = !1, t = !1;
          break;
        }
        m(this, b, V).call(this, n), this.__internal__.serial.response.length === null ? await m(this, b, z).call(this) : await m(this, b, K).call(this);
      }
    } catch (t) {
      this.serialErrors(t);
    } finally {
      e.releaseLock();
    }
  }
  this.__internal__.serial.keep_reading = !0, this.__internal__.serial.port && await this.__internal__.serial.port.close();
}, ie = async function() {
  return typeof window > "u" ? !1 : "serial" in navigator && "forget" in SerialPort.prototype && this.__internal__.serial.port ? (await this.__internal__.serial.port.forget(), !0) : !1;
}, se = function() {
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
  ].forEach((l) => {
    this.serialRegisterAvailableListener(l);
  });
}, ae = function() {
  const l = this;
  this.on("internal:queue", async () => {
    var e;
    await m(e = l, b, X).call(e);
  }), m(this, b, G).call(this);
}, G = function() {
  const l = this;
  navigator.serial.addEventListener("connect", async () => {
    l.isDisconnected && await l.serialConnect().catch(() => {
    });
  });
}, X = async function() {
  if (!m(this, b, x).call(this, this.__internal__.serial.port)) {
    m(this, b, P).call(this, { error: "Port is closed, not readable or writable." }), await this.serialConnect();
    return;
  }
  if (this.__internal__.timeout.until_response || this.__internal__.serial.queue.length === 0) return;
  const l = this.__internal__.serial.queue[0];
  let e = this.__internal__.time.response_general;
  if (l.action === "connect" && (e = this.__internal__.time.response_connection), this.__internal__.timeout.until_response = setTimeout(async () => {
    await this.timeout(l.bytes, l.action);
  }, e), this.__internal__.serial.last_action = l.action ?? "unknown", await m(this, b, H).call(this, l.bytes), this.dispatch("serial:sent", {
    action: l.action,
    bytes: l.bytes
  }), this.__internal__.auto_response) {
    let n = new Uint8Array(0);
    try {
      n = this.validateBytes(this.__internal__.serial.auto_response);
    } catch (i) {
      this.serialErrors(i);
    }
    m(this, b, E).call(this, n, null);
  }
  const t = [...this.__internal__.serial.queue];
  this.__internal__.serial.queue = t.splice(1);
}, le = function(l = 1) {
  this.__internal__.device_number = l, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(l);
}, oe = function() {
  this.__internal__.last_error = {
    message: null,
    action: null,
    code: null,
    no_code: 0
  };
};
_.instance || (_.instance = new _());
const ye = {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: [],
  arduino: [],
  pinpad: [],
  pinpax: []
};
_.devices = { ..._.devices, ...ye };
_.addCustom = (l, e) => {
  _.registerType(l), _.add(e);
};
_.getCustomByUuid = (l, e) => _.get(l, e);
_.getJofemarByUuid = (l) => _.get("jofemar", l);
_.getLockerByUuid = (l) => _.get("locker", l);
_.getRelayByUuid = (l) => _.get("relay", l);
_.getBoardroidByUuid = (l) => _.get("boardroid", l);
_.getArduinoByUuid = (l) => _.get("arduino", l);
_.getPinPadByUuid = (l) => _.get("pinpad", l);
_.getPinPaxByUuid = (l) => _.get("pinpax", l);
_.getJofemar = (l = 1) => _.getByNumber("jofemar", l);
_.getBoardroid = (l = 1) => _.getByNumber("boardroid", l);
_.getLocker = (l = 1) => _.getByNumber("locker", l);
_.getRelay = (l = 1) => _.getByNumber("relay", l);
_.getArduino = (l = 1) => _.getByNumber("arduino", l);
_.getPinPad = (l = 1) => _.getByNumber("pinpad", l);
_.getPinPax = (l = 1) => _.getByNumber("pinpax", l);
class me extends be {
  constructor(e) {
    super(e), this.__internal__ = structuredClone(this.__internal__), this.getResponseAsArrayHex(), this.__internal__.device.door_open = !1, this.__internal__.time.response_engines = 2e3, this.__internal__.time.sense = 100, this.__internal__.interval.waiting_sense = 0, this.__internal__.dispense = {
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
  async timeout(e, t) {
    await super.timeout(e, t), t === "dispense" && (this.__internal__.dispense.status = "no-response");
  }
  async serialPortsSaved(e) {
    const t = this.serialFilters;
    if (this.__internal__.aux_port_connector < e.length) {
      const n = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = e[n];
    } else
      this.__internal__.aux_port_connector = 0, this.__internal__.serial.port = await navigator.serial.requestPort({ filters: t });
    if (!this.__internal__.serial.port)
      throw new Error("Select another port please");
  }
  internalClearSensing() {
    this.__internal__.interval.waiting_sense && clearInterval(this.__internal__.interval.waiting_sense), this.__internal__.interval.waiting_sense = 0, this.__internal__.dispense.status = null, this.__internal__.dispense.counter = 0, this.__internal__.dispense.dispensing = !1;
  }
  internalDispensingProcess() {
    let e = this.__internal__.dispense.limit_counter;
    return this.__internal__.dispense.custom_limit_counter && (e = this.__internal__.dispense.custom_limit_counter), e += Math.ceil(e * 0.6), this.__internal__.dispense.counter >= e ? (this.internalClearSensing(), this.__internal__.dispense.status = !1, this.__internal__.dispense.dispensing = !1, !1) : (this.__internal__.dispense.counter = parseFloat((0.1 + this.__internal__.dispense.counter).toFixed(1)), this.__internal__.dispense.counter % 1 === 0 && this.dispatch("dispensing", {
      status: this.__internal__.dispense.status,
      counter: this.__internal__.dispense.counter,
      limit: e
    }), null);
  }
  async internalDispenseStatus() {
    if (this.__internal__.dispense.must_response && (await _e(this.__internal__.time.response_engines + 10), this.__internal__.dispense.status === "no-response"))
      return this.internalClearSensing(), this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", { reason: "no-response" }), { status: !1, error: "no-response" };
    this.__internal__.dispense.status = null, this.__internal__.dispense.dispensing = !0, this.dispatch("internal:dispense:running", {});
    const e = this;
    return new Promise((t) => {
      this.__internal__.interval.waiting_sense = setInterval(() => {
        switch (e.__internal__.dispense.status) {
          case null:
            e.internalDispensingProcess() === !1 && (e.internalClearSensing(), e.dispatch("not-dispensed", { reason: "timeout" }), t({ status: !1, error: "timeout" }));
            break;
          case !0:
            e.internalClearSensing(), e.__internal__.dispense.status = !0, e.dispatch("dispensed", {}), t({ status: !0, error: null });
            break;
          case !1:
            e.internalClearSensing(), e.__internal__.dispense.status = !1, e.dispatch("not-dispensed", { reason: "no-stock" }), t({ status: !1, error: null });
            break;
          case "elevator-locked":
            e.internalClearSensing(), e.__internal__.dispense.status = !1, e.dispatch("not-dispensed", { reason: "elevator-locked" }), t({ status: !1, error: "elevator-locked" });
            break;
          case "no-response":
            e.internalClearSensing(), e.__internal__.dispense.status = !1, e.dispatch("not-dispensed", { reason: "no-response" }), t({ status: !1, error: "no-response" });
            break;
        }
      }, this.__internal__.time.sense);
    });
  }
  async internalDispense(e) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    if (!L.enable && !this.__internal__.serial.connected && (await this.serialConnect(), !this.__internal__.serial.connected))
      throw new Error("Serial device not connected");
    return this.__internal__.serial.queue.length === 0 ? (await this.appendToQueue(e, "dispense"), await this.internalDispenseStatus()) : new Promise((t) => {
      const n = setInterval(async () => {
        if (this.__internal__.serial.queue.length > 0) return;
        clearInterval(n), await this.appendToQueue(e, "dispense");
        const i = await this.internalDispenseStatus();
        t(i);
      }, 100);
    });
  }
  __emulate(e) {
    if (typeof e.code != "object") {
      console.error("Invalid data to make an emulation");
      return;
    }
    this.__internal__.serial.connected || (this.__internal__.serial.connected = !0, this.dispatch("serial:connected"), _.instance.dispatch("change"), this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0)), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0);
    const t = [];
    for (const n in e.code)
      t.push(e.code[n].toString().padStart(2, "0").toLowerCase());
    this.serialMessage(t);
  }
  /**
   * @deprecated Use listenOnChannel instead
   * @param {string|number} channel
   */
  set listenOnPort(e) {
    this.listenOnChannel = e;
  }
  /**
   * @deprecated Use listenOnChannel instead
   */
  get listenOnPort() {
    return this.__internal__.device.listen_on_port ?? 1;
  }
}
export {
  L as E,
  me as K,
  _,
  Ce as a,
  ke as b,
  De as g,
  Ae as i,
  ve as s,
  _e as w
};
