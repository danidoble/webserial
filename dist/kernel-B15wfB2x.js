var he = Object.defineProperty;
var V = (l) => {
  throw TypeError(l);
};
var de = (l, e, t) => e in l ? he(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t;
var F = (l, e, t) => de(l, typeof e != "symbol" ? e + "" : e, t), j = (l, e, t) => e.has(l) || V("Cannot " + t);
var w = (l, e, t) => (j(l, e, "read from private field"), t ? t.call(l) : e.get(l)), I = (l, e, t) => e.has(l) ? V("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(l) : e.set(l, t), L = (l, e, t, n) => (j(l, e, "write to private field"), n ? n.call(l, t) : e.set(l, t), t), a = (l, e, t) => (j(l, e, "access private method"), t);
function fe(l = 100) {
  return new Promise((e) => setTimeout(() => e(), l));
}
function Me() {
  return "serial" in navigator;
}
function Te() {
  return "geolocation" in navigator;
}
function Pe() {
  return "crypto" in window;
}
function Ue(l = 1) {
  return l * 1e3;
}
function Be(l) {
  return l == null || l === "";
}
var k, A, i, te, ne, c, $, p, d, N, o, H, P;
const r = class r {
  static status(e = null) {
    var n, s;
    if (!a(n = r, i, c).call(n, e)) return !1;
    let t = [];
    switch (w(r, k)) {
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
    a(s = r, i, o).call(s, t);
  }
  static dispensed(e = null) {
    var n, s;
    if (!a(n = r, i, c).call(n, e)) return !1;
    let t = [];
    switch (w(r, k)) {
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
    a(s = r, i, o).call(s, t);
  }
  static notDispensed(e = null) {
    var n, s;
    if (!a(n = r, i, c).call(n, e)) return !1;
    let t = [];
    switch (w(r, k)) {
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
    a(s = r, i, o).call(s, t);
  }
  static gateInactive(e = null) {
    var t;
    if (!a(t = r, i, c).call(t, e) || !a(this, i, $).call(this)) return !1;
    a(this, i, o).call(this, ["0", "7", "5", "5", "5"]);
  }
  static gateConfigured(e = null) {
    var t;
    if (!a(t = r, i, c).call(t, e) || !a(this, i, $).call(this)) return !1;
    a(this, i, o).call(this, ["0", "6"]);
  }
  static keyPressed(e = null) {
    var u, g, f;
    if (!a(u = r, i, c).call(u, e) || !a(g = r, i, d).call(g)) return !1;
    const t = ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "2A", "23", "41", "42", "43", "44"], n = (128 + w(r, A)).toString(16), s = Math.floor(Math.random() * 15);
    a(f = r, i, o).call(f, ["2", n, "54", t[s]]);
  }
  static doorOpened(e = null) {
    var s, u;
    if (!a(s = r, i, c).call(s, e) || !a(this, i, N).call(this)) return !1;
    let t = [];
    const n = (128 + w(r, A)).toString(16);
    switch (w(r, k)) {
      case "boardroid":
        t = ["2", "D8", "dc"];
        break;
      case "jofemar":
        t = ["2", n, "50", "4F"];
        break;
    }
    a(u = r, i, o).call(u, t);
  }
  static doorClosed(e = null) {
    var s, u;
    if (!a(s = r, i, c).call(s, e) || !a(this, i, N).call(this)) return !1;
    let t = [];
    const n = (128 + w(r, A)).toString(16);
    switch (w(r, k)) {
      case "boardroid":
        t = ["2", "D8", "db"];
        break;
      case "jofemar":
        t = ["2", n, "50", "43"];
        break;
    }
    a(u = r, i, o).call(u, t);
  }
  static channelDisconnected(e = null) {
    var n, s, u;
    if (!a(n = r, i, c).call(n, e) || !a(s = r, i, d).call(s)) return !1;
    const t = (128 + w(r, A)).toString(16);
    a(u = r, i, o).call(u, ["2", t, "43", "43", "43", "FD"]);
  }
  static channelConnected(e = null) {
    var n, s, u;
    if (!a(n = r, i, c).call(n, e) || !a(s = r, i, d).call(s)) return !1;
    const t = (128 + w(r, A)).toString(16);
    a(u = r, i, o).call(u, ["2", t, "43", "43", "43", "FC"]);
  }
  static channelEmpty(e = null) {
    var n, s, u;
    if (!a(n = r, i, c).call(n, e) || !a(s = r, i, d).call(s)) return !1;
    const t = (128 + w(r, A)).toString(16);
    a(u = r, i, o).call(u, ["2", t, "43", "43", "43", "FF"]);
  }
  static workingTemperature(e = null) {
    var n, s, u;
    if (!a(n = r, i, c).call(n, e) || !a(s = r, i, d).call(s)) return !1;
    const t = (128 + w(r, A)).toString(16);
    a(u = r, i, o).call(u, ["2", t, "43", "54", "16"]);
  }
  static currentTemperature(e = null) {
    var s, u, g;
    if (!a(s = r, i, c).call(s, e) || !a(u = r, i, N).call(u)) return !1;
    let t = [];
    const n = (128 + w(r, A)).toString(16);
    switch (w(r, k)) {
      case "boardroid":
        t = ["2", "D9", "44", "30"];
        break;
      case "jofemar":
        t = ["2", n, "43", "74", "2B", "30", "39", "2E", "31", "7F", "43"];
        break;
    }
    a(g = r, i, o).call(g, t);
  }
  static ready(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "30"]);
  }
  static busy(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "31"]);
  }
  static invalidTray(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "32"]);
  }
  static invalidChannel(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "33"]);
  }
  static emptyChannel(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "34"]);
  }
  static elevatorJam(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "35"]);
  }
  static elevatorMalfunction(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "36"]);
  }
  static phototransistorFailure(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "37"]);
  }
  static allChannelsEmpty(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "38"]);
  }
  static productDetectorFailure(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "39"]);
  }
  static displayDisconnected(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "41"]);
  }
  static productUnderElevator(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "42"]);
  }
  static elevatorSettingAlarm(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "43"]);
  }
  static buttonPanelFailure(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "44"]);
  }
  static errorWritingEeprom(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "45"]);
  }
  static errorControlTemperature(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "46"]);
  }
  static thermometerDisconnected(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "47"]);
  }
  static thermometerMisconfigured(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "48"]);
  }
  static thermometerFailure(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "49"]);
  }
  static errorExtractorConsumption(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "4A"]);
  }
  static channelSearchError(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "4B"]);
  }
  static productExitMouthSearchError(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "4C"]);
  }
  static elevatorInteriorLocked(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "4D"]);
  }
  static productDetectorVerifierError(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "4E"]);
  }
  static waitingForProductRecall(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "4F"]);
  }
  static productExpiredByTemperature(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "50"]);
  }
  static faultyAutomaticDoor(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "51"]);
  }
  static rejectLever(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "A0", "1"]);
  }
  static resetCoinPurse(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "A0", "2"]);
  }
  static coinInsertedBox(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, i, c).call(u, e) || !a(g = r, i, p).call(g)) return !1;
    const n = ["40", "41", "42", "43", "44", "45"], s = a(f = r, i, H).call(f, n, t);
    a(h = r, i, o).call(h, ["2", "A0", s]);
  }
  static coinInsertedTube(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, i, c).call(u, e) || !a(g = r, i, p).call(g)) return !1;
    const n = ["50", "51", "52", "53", "54", "55"], s = a(f = r, i, H).call(f, n, t);
    a(h = r, i, o).call(h, ["2", "A0", s]);
  }
  static banknoteInsertedStacker(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, i, c).call(u, e) || !a(g = r, i, p).call(g)) return !1;
    const n = ["80", "81", "82", "83", "84"], s = a(f = r, i, P).call(f, n, t);
    a(h = r, i, o).call(h, ["2", "B0", s]);
  }
  static banknoteInsertedEscrow(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, i, c).call(u, e) || !a(g = r, i, p).call(g)) return !1;
    const n = ["90", "91", "92", "93", "94"], s = a(f = r, i, P).call(f, n, t);
    a(h = r, i, o).call(h, ["2", "B0", s]);
  }
  static banknoteEjected(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, i, c).call(u, e) || !a(g = r, i, p).call(g)) return !1;
    const n = ["A0", "A1", "A2", "A3", "A4"], s = a(f = r, i, P).call(f, n, t);
    a(h = r, i, o).call(h, ["2", "B0", s]);
  }
  static banknoteInsertedRecycler(e = null, t = null) {
    var u, g, f, h;
    if (!a(u = r, i, c).call(u, e) || !a(g = r, i, p).call(g)) return !1;
    const n = ["B0", "B1", "B2", "B3", "B4"], s = a(f = r, i, P).call(f, n, t);
    a(h = r, i, o).call(h, ["2", "B0", s]);
  }
  static banknoteTaken(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "B0", "2a"]);
  }
  static coinPurseEnabled(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "D0", "1"]);
  }
  static coinPurseDisabled(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "D0", "0"]);
  }
  static billPurseDisabled(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "D1", "0", "0"]);
  }
  static billPurseEnabled(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "D1", "1", "1"]);
  }
  static readTubes(e = null) {
    var C, D, S;
    if (!a(C = r, i, c).call(C, e) || !a(D = r, i, p).call(D)) return !1;
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
    ], [n, s, u, g, f, h] = [
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)],
      t[Math.floor(Math.random() * 30)]
    ];
    a(S = r, i, o).call(S, ["2", "D2", n, s, u, g, f, h]);
  }
  static readBillPurse(e = null, t = null) {
    var s, u, g, f;
    if (!a(s = r, i, c).call(s, e) || !a(u = r, i, p).call(u)) return !1;
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
      let C = "0", D = "0", S = "0", x = "0", T = "0";
      if (t !== null && !isNaN(parseInt(t)))
        switch (t.toString()) {
          case "20":
            C = h;
            break;
          case "50":
            D = h;
            break;
          case "100":
            S = h;
            break;
          case "200":
            x = h;
            break;
          case "500":
            T = h;
            break;
        }
      else
        switch (e._recycler.bill) {
          case 0:
            C = h;
            break;
          case 1:
            D = h;
            break;
          case 2:
            S = h;
            break;
          case 3:
            x = h;
            break;
          case 4:
            T = h;
            break;
        }
      a(g = r, i, o).call(g, ["2", "D3", C, D, S, x, T, "0"]);
    } else {
      const [h, C, D, S, x, T] = [
        n[Math.floor(Math.random() * 30)],
        n[Math.floor(Math.random() * 30)],
        n[Math.floor(Math.random() * 30)],
        n[Math.floor(Math.random() * 2)],
        n[Math.floor(Math.random())],
        n[Math.floor(Math.random())]
      ];
      a(f = r, i, o).call(f, ["2", "D3", h, C, D, S, x, T]);
    }
  }
  static banknoteAccepted(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "D4", "1"]);
  }
  static banknoteRejected(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "D4", "0"]);
  }
  static banknotesDispensed(e = null) {
    var n, s, u, g;
    if (!a(n = r, i, c).call(n, e) || !a(s = r, i, p).call(s)) return !1;
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
      let h = "0", C = "0", D = "0", S = "0", x = "0";
      switch (e._recycler.bill) {
        case 0:
          h = f;
          break;
        case 1:
          C = f;
          break;
        case 2:
          D = f;
          break;
        case 3:
          S = f;
          break;
        case 4:
          x = f;
          break;
      }
      a(u = r, i, o).call(u, ["2", "D5", h, C, D, S, x, "0"]);
    } else {
      const [f, h, C, D, S, x] = [
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 2)],
        t[Math.floor(Math.random())],
        t[Math.floor(Math.random())]
      ];
      a(g = r, i, o).call(g, ["2", "D5", f, h, C, D, S, x]);
    }
  }
  static coinsDispensed(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "D6"]);
  }
  static relayOn(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DA", "1"]);
  }
  static relayOff(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DA", "0"]);
  }
  static nayaxEnabled(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DD", "1"]);
  }
  static nayaxDisabled(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DD", "0"]);
  }
  static nayaxPreCreditAuthorized(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DD", "3"]);
  }
  static nayaxCancelRequest(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DD", "4"]);
  }
  static nayaxSellApproved(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DD", "5"]);
  }
  static nayaxSellDenied(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DD", "6"]);
  }
  static nayaxEndSession(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DD", "7"]);
  }
  static nayaxCancelled(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DD", "8"]);
  }
  static nayaxDispensed(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DD", "A", "0"]);
  }
  static nayaxNotDispensed(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, p).call(n)) return !1;
    a(s = r, i, o).call(s, ["2", "DD", "A", "1"]);
  }
  static fullTray(e = null) {
    var t, n, s;
    if (!a(t = r, i, c).call(t, e) || !a(n = r, i, d).call(n)) return !1;
    a(s = r, i, o).call(s, ["6", "4F"]);
  }
  static setConnection(e = null) {
    var t;
    if (!a(t = r, i, c).call(t, e)) return !1;
    e.__internal__.serial.connected = !0;
  }
};
k = new WeakMap(), A = new WeakMap(), i = new WeakSet(), te = function() {
  if (r.enable === !1) throw new Error("Emulator is disabled");
  return r.enable;
}, ne = function(e) {
  if (typeof e != "object" || !(e instanceof xe))
    throw new Error(`Type ${e.typeDevice} is not supported`);
  return r.instance = e, L(r, k, e.typeDevice), L(r, A, e.deviceNumber), !0;
}, c = function(e = null) {
  var t, n;
  return !a(t = r, i, te).call(t) || e === null && r.instance === null ? !1 : (r.instance === null && a(n = r, i, ne).call(n, e), !0);
}, $ = function() {
  if (w(r, k) !== "locker") throw new Error("This function is only available for Locker devices");
  return !0;
}, p = function() {
  if (w(r, k) !== "boardroid")
    throw new Error("This function is only available for Boardroid devices");
  return !0;
}, d = function() {
  if (w(r, k) !== "jofemar") throw new Error("This function is only available for Jofemar devices");
  return !0;
}, N = function() {
  if (w(r, k) === "locker") throw new Error("This function is not available for Locker devices");
  return !0;
}, o = function(e) {
  r.instance.__emulate({ code: e });
}, H = function(e, t = null) {
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
}, P = function(e, t = null) {
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
}, I(r, i), F(r, "enable", !1), F(r, "instance", null), I(r, k, null), I(r, A, 1);
let R = r;
var pe = Object.defineProperty, re = (l) => {
  throw TypeError(l);
}, ge = (l, e, t) => e in l ? pe(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t, B = (l, e, t) => ge(l, typeof e != "symbol" ? e + "" : e, t), be = (l, e, t) => e.has(l) || re("Cannot " + t), me = (l, e, t) => e.has(l) ? re("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(l) : e.set(l, t), y = (l, e, t) => (be(l, e, "access private method"), t);
const v = [];
for (let l = 0; l < 256; ++l)
  v.push((l + 256).toString(16).slice(1));
function ye(l, e = 0) {
  return (v[l[e + 0]] + v[l[e + 1]] + v[l[e + 2]] + v[l[e + 3]] + "-" + v[l[e + 4]] + v[l[e + 5]] + "-" + v[l[e + 6]] + v[l[e + 7]] + "-" + v[l[e + 8]] + v[l[e + 9]] + "-" + v[l[e + 10]] + v[l[e + 11]] + v[l[e + 12]] + v[l[e + 13]] + v[l[e + 14]] + v[l[e + 15]]).toLowerCase();
}
let O;
const we = new Uint8Array(16);
function ve() {
  if (!O) {
    if (typeof crypto > "u" || !crypto.getRandomValues)
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    O = crypto.getRandomValues.bind(crypto);
  }
  return O(we);
}
const ke = typeof crypto < "u" && crypto.randomUUID && crypto.randomUUID.bind(crypto), J = { randomUUID: ke };
function Ce(l, e, t) {
  var n;
  if (J.randomUUID && !l)
    return J.randomUUID();
  l = l || {};
  const s = l.random ?? ((n = l.rng) == null ? void 0 : n.call(l)) ?? ve();
  if (s.length < 16)
    throw new Error("Random bytes length must be >= 16");
  return s[6] = s[6] & 15 | 64, s[8] = s[8] & 63 | 128, ye(s);
}
class z extends CustomEvent {
  constructor(e, t) {
    super(e, t);
  }
}
class se extends EventTarget {
  constructor() {
    super(...arguments), B(this, "__listeners__", {
      debug: !1
    }), B(this, "__debug__", !1);
  }
  dispatch(e, t = null) {
    const n = new z(e, { detail: t });
    this.dispatchEvent(n), this.__debug__ && this.dispatchEvent(new z("debug", { detail: { type: e, data: t } }));
  }
  dispatchAsync(e, t = null, n = 100) {
    const s = this;
    setTimeout(() => {
      s.dispatch(e, t);
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
const W = class m extends se {
  constructor() {
    super(), ["change"].forEach((e) => {
      this.serialRegisterAvailableListener(e);
    });
  }
  static $dispatchChange(e = null) {
    e && e.$checkAndDispatchConnection(), m.instance.dispatch("change", { devices: m.devices, dispatcher: e });
  }
  static typeError(e) {
    const t = new Error();
    throw t.message = `Type ${e} is not supported`, t.name = "DeviceTypeError", t;
  }
  static registerType(e) {
    typeof m.devices[e] > "u" && (m.devices[e] = {});
  }
  static add(e) {
    const t = e.typeDevice;
    typeof m.devices[t] > "u" && (m.devices[t] = {});
    const n = e.uuid;
    if (typeof m.devices[t] > "u" && m.typeError(t), m.devices[t][n])
      throw new Error(`Device with id ${n} already exists`);
    return m.devices[t][n] = e, m.$dispatchChange(e), Object.keys(m.devices[t]).indexOf(n);
  }
  static get(e, t) {
    return typeof m.devices[e] > "u" && (m.devices[e] = {}), typeof m.devices[e] > "u" && m.typeError(e), m.devices[e][t];
  }
  static getAll(e = null) {
    return e === null ? m.devices : (typeof m.devices[e] > "u" && m.typeError(e), m.devices[e]);
  }
  static getList() {
    return Object.values(m.devices).map((e) => Object.values(e)).flat();
  }
  static getByNumber(e, t) {
    return typeof m.devices[e] > "u" && m.typeError(e), Object.values(m.devices[e]).find((n) => n.deviceNumber === t) ?? null;
  }
  static getCustom(e, t = 1) {
    return typeof m.devices[e] > "u" && m.typeError(e), Object.values(m.devices[e]).find((n) => n.deviceNumber === t) ?? null;
  }
};
B(W, "instance"), B(W, "devices", {});
let _ = W;
_.instance || (_.instance = new _());
function K(l = 100) {
  return new Promise(
    (e) => setTimeout(() => e(), l)
  );
}
function De() {
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
var b, M, U, Q, E, ie, G, X, Y, ae, le, oe, ce, Z, ee, ue, _e;
class Se extends se {
  constructor({
    filters: e = null,
    config_port: t = q,
    no_device: n = 1,
    device_listen_on_channel: s = 1
  } = {
    filters: null,
    config_port: q,
    no_device: 1,
    device_listen_on_channel: 1
  }) {
    if (super(), me(this, b), B(this, "__internal__", {
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
        config_port: q,
        queue: [],
        auto_response: ["DD", "DD"]
      },
      device: {
        type: "unknown",
        id: Ce(),
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
    e && (this.serialFilters = e), t && (this.serialConfigPort = t), n && y(this, b, ue).call(this, n), s && ["number", "string"].includes(typeof s) && (this.listenOnChannel = s), y(this, b, oe).call(this), y(this, b, ce).call(this);
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
    const e = this.__internal__.serial.connected, t = y(this, b, M).call(this, this.__internal__.serial.port);
    return e && !t && y(this, b, U).call(this, { error: "Port is closed, not readable or writable." }), this.__internal__.serial.connected = t, this.__internal__.serial.connected;
  }
  get isDisconnected() {
    const e = this.__internal__.serial.connected, t = y(this, b, M).call(this, this.__internal__.serial.port);
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
    await this.serialDisconnect(), y(this, b, U).call(this, e);
  }
  async connect() {
    return new Promise((e, t) => {
      De() || t("Web Serial not supported"), setTimeout(async () => {
        await K(499), await this.serialConnect(), this.isConnected ? e(`${this.typeDevice} device ${this.deviceNumber} connected`) : t(`${this.typeDevice} device ${this.deviceNumber} not connected`);
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
      const e = await y(this, b, ie).call(this);
      if (e.length > 0)
        await this.serialPortsSaved(e);
      else {
        const s = this.serialFilters;
        this.__internal__.serial.port = await navigator.serial.requestPort({
          filters: s
        });
      }
      const t = this.__internal__.serial.port;
      if (!t)
        throw new Error("No port selected by the user");
      await t.open(this.serialConfigPort);
      const n = this;
      t.onconnect = (s) => {
        console.log(s), n.dispatch("serial:connected", s), _.$dispatchChange(this), n.__internal__.serial.queue.length > 0 && n.dispatch("internal:queue", {});
      }, t.ondisconnect = async () => {
        await n.disconnect();
      }, await K(this.__internal__.serial.delay_first_connection), this.__internal__.timeout.until_response = setTimeout(async () => {
        await n.timeout(n.__internal__.serial.bytes_connection ?? [], "connection:start");
      }, this.__internal__.time.response_connection), this.__internal__.serial.last_action = "connect", await y(this, b, Q).call(this, this.__internal__.serial.bytes_connection ?? []), this.dispatch("serial:sent", {
        action: "connect",
        bytes: this.__internal__.serial.bytes_connection
      }), this.__internal__.auto_response && y(this, b, E).call(this, this.__internal__.serial.auto_response, null), await y(this, b, ae).call(this);
    } catch (e) {
      this.serialErrors(e);
    }
  }
  async serialForget() {
    return await y(this, b, le).call(this);
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
    return e.forEach((n, s) => {
      t[s] = "0x" + n;
    }), t;
  }
  bytesToHex(e) {
    return this.add0x(Array.from(e, (t) => this.hexMaker(t)));
  }
  async appendToQueue(e, t) {
    const n = this.bytesToHex(e);
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
    y(this, b, _e).call(this), this.dispatch("serial:soft-reload", {});
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
    return Array.from(n).map((s) => s.toString(16));
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
      const s = n.replace("0x", "");
      t.push(parseInt(s, 16));
    }), new Uint8Array(t);
  }
  parseUint8ArrayToString(e) {
    const t = this.stringArrayToUint8Array(e);
    e = this.parseUint8ToHex(t);
    const n = e.map((s) => parseInt(s, 16));
    return this.__internal__.serial.response.replacer ? String.fromCharCode(...n).replace(this.__internal__.serial.response.replacer, "") : String.fromCharCode(...n);
  }
  hexToAscii(e) {
    const t = e.toString();
    let n = "";
    for (let s = 0; s < t.length; s += 2)
      n += String.fromCharCode(parseInt(t.substring(s, 2), 16));
    return n;
  }
  asciiToHex(e) {
    const t = [];
    for (let n = 0, s = e.length; n < s; n++) {
      const u = Number(e.charCodeAt(n)).toString(16);
      t.push(u);
    }
    return t.join("");
  }
  $checkAndDispatchConnection() {
    return this.isConnected;
  }
}
b = /* @__PURE__ */ new WeakSet(), M = function(l) {
  return !!(l && l.readable && l.writable);
}, U = function(l = null) {
  this.__internal__.serial.connected = !1, this.__internal__.aux_port_connector = 0, this.dispatch("serial:disconnected", l), _.$dispatchChange(this);
}, Q = async function(l) {
  const e = this.__internal__.serial.port;
  if (!e || e && (!e.readable || !e.writable))
    throw y(this, b, U).call(this, { error: "Port is closed, not readable or writable." }), new Error("The port is closed or is not readable/writable");
  const t = this.stringArrayToUint8Array(l);
  if (e.writable === null) return;
  const n = e.writable.getWriter();
  await n.write(t), n.releaseLock();
}, E = function(l = [], e = null) {
  if (l && l.length > 0) {
    const t = this.__internal__.serial.connected;
    this.__internal__.serial.connected = y(this, b, M).call(this, this.__internal__.serial.port), _.$dispatchChange(this), !t && this.__internal__.serial.connected && this.dispatch("serial:connected"), this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0);
    const n = [];
    for (const s in l)
      n.push(l[s].toString().padStart(2, "0").toLowerCase());
    if (this.__internal__.serial.response.as === "hex")
      this.serialMessage(n);
    else if (this.__internal__.serial.response.as === "uint8")
      this.serialMessage(this.parseHexToUint8(this.add0x(n)));
    else if (this.__internal__.serial.response.as === "string")
      if (this.__internal__.serial.response.limiter !== null) {
        const s = this.parseUint8ArrayToString(this.add0x(n)).split(this.__internal__.serial.response.limiter);
        for (const u in s)
          s[u] && this.serialMessage(s[u]);
      } else
        this.serialMessage(this.parseUint8ArrayToString(this.add0x(n)));
    else {
      const s = this.stringToArrayBuffer(
        this.parseUint8ArrayToString(this.add0x(n))
      );
      this.serialMessage(s);
    }
  } else
    this.serialCorruptMessage(l, e);
  this.__internal__.serial.queue.length !== 0 && this.dispatch("internal:queue", {});
}, ie = async function() {
  const l = this.serialFilters, e = await navigator.serial.getPorts({ filters: l });
  return l.length === 0 ? e : e.filter((t) => {
    const n = t.getInfo();
    return l.some((s) => n.usbProductId === s.usbProductId && n.usbVendorId === s.usbVendorId);
  }).filter((t) => !y(this, b, M).call(this, t));
}, G = function(l) {
  if (l) {
    const e = this.__internal__.serial.response.buffer, t = new Uint8Array(e.length + l.byteLength);
    t.set(e, 0), t.set(new Uint8Array(l), e.length), this.__internal__.serial.response.buffer = t;
  }
}, X = async function() {
  this.__internal__.serial.time_until_send_bytes && (clearTimeout(this.__internal__.serial.time_until_send_bytes), this.__internal__.serial.time_until_send_bytes = 0), this.__internal__.serial.time_until_send_bytes = setTimeout(() => {
    const l = [];
    for (const e in this.__internal__.serial.response.buffer)
      l.push(this.__internal__.serial.response.buffer[e].toString(16));
    this.__internal__.serial.response.buffer && y(this, b, E).call(this, l), this.__internal__.serial.response.buffer = new Uint8Array(0);
  }, 400);
}, Y = async function() {
  if (this.__internal__.serial.response.length !== null) {
    if (this.__internal__.serial.response.length === this.__internal__.serial.response.buffer.length) {
      const l = [];
      for (const e in this.__internal__.serial.response.buffer)
        l.push(this.__internal__.serial.response.buffer[e].toString(16));
      y(this, b, E).call(this, l), this.__internal__.serial.response.buffer = new Uint8Array(0);
    } else if (this.__internal__.serial.response.length < this.__internal__.serial.response.buffer.length) {
      let l = new Uint8Array(0);
      for (let t = 0; t < this.__internal__.serial.response.length; t++)
        l[t] = this.__internal__.serial.response.buffer[t];
      if (l.length === this.__internal__.serial.response.length) {
        const t = [];
        for (const n in l)
          t.push(l[n].toString(16));
        y(this, b, E).call(this, t), this.__internal__.serial.response.buffer = new Uint8Array(0);
        return;
      }
      l = new Uint8Array(0);
      const e = this.__internal__.serial.response.length * 2;
      if (this.__internal__.serial.response.buffer.length === e) {
        for (let t = 14; t < e; t++)
          l[t - this.__internal__.serial.response.length] = this.__internal__.serial.response.buffer[t];
        if (l.length === this.__internal__.serial.response.length) {
          const t = [];
          for (const n in l)
            t.push(l[n].toString(16));
          y(this, b, E).call(this, t), this.__internal__.serial.response.buffer = new Uint8Array(0);
        }
      }
    }
  }
}, ae = async function() {
  const l = this.__internal__.serial.port;
  if (!l || !l.readable) throw new Error("Port is not readable");
  for (; l.readable && this.__internal__.serial.keep_reading; ) {
    const e = l.readable.getReader();
    this.__internal__.serial.reader = e;
    try {
      let t = !0;
      for (; t; ) {
        const { value: n, done: s } = await e.read();
        if (s) {
          e.releaseLock(), this.__internal__.serial.keep_reading = !1, t = !1;
          break;
        }
        y(this, b, G).call(this, n), this.__internal__.serial.response.length === null ? await y(this, b, X).call(this) : await y(this, b, Y).call(this);
      }
    } catch (t) {
      this.serialErrors(t);
    } finally {
      e.releaseLock();
    }
  }
  this.__internal__.serial.keep_reading = !0, this.__internal__.serial.port && await this.__internal__.serial.port.close();
}, le = async function() {
  return typeof window > "u" ? !1 : "serial" in navigator && "forget" in SerialPort.prototype && this.__internal__.serial.port ? (await this.__internal__.serial.port.forget(), !0) : !1;
}, oe = function() {
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
}, ce = function() {
  const l = this;
  this.on("internal:queue", async () => {
    var e;
    await y(e = l, b, ee).call(e);
  }), y(this, b, Z).call(this);
}, Z = function() {
  const l = this;
  navigator.serial.addEventListener("connect", async () => {
    l.isDisconnected && await l.serialConnect().catch(() => {
    });
  });
}, ee = async function() {
  if (!y(this, b, M).call(this, this.__internal__.serial.port)) {
    y(this, b, U).call(this, { error: "Port is closed, not readable or writable." }), await this.serialConnect();
    return;
  }
  if (this.__internal__.timeout.until_response || this.__internal__.serial.queue.length === 0) return;
  const l = this.__internal__.serial.queue[0];
  let e = this.__internal__.time.response_general;
  l.action === "connect" && (e = this.__internal__.time.response_connection), this.__internal__.timeout.until_response = setTimeout(async () => {
    await this.timeout(l.bytes, l.action);
  }, e), this.__internal__.serial.last_action = l.action ?? "unknown", await y(this, b, Q).call(this, l.bytes), this.dispatch("serial:sent", {
    action: l.action,
    bytes: l.bytes
  }), this.__internal__.auto_response && y(this, b, E).call(this, this.__internal__.serial.auto_response, null);
  const t = [...this.__internal__.serial.queue];
  this.__internal__.serial.queue = t.splice(1);
}, ue = function(l = 1) {
  this.__internal__.device_number = l, this.__internal__.serial.bytes_connection = this.serialSetConnectionConstant(l);
}, _e = function() {
  this.__internal__.last_error = {
    message: null,
    action: null,
    code: null,
    no_code: 0
  };
};
_.instance || (_.instance = new _());
const Ae = {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: [],
  arduino: [],
  pinpad: [],
  pinpax: []
};
_.devices = { ..._.devices, ...Ae };
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
class xe extends Se {
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
    if (this.__internal__.dispense.must_response && (await fe(this.__internal__.time.response_engines + 10), this.__internal__.dispense.status === "no-response"))
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
    if (!R.enable && !this.__internal__.serial.connected && (await this.serialConnect(), !this.__internal__.serial.connected))
      throw new Error("Serial device not connected");
    return this.__internal__.serial.queue.length === 0 ? (await this.appendToQueue(e, "dispense"), await this.internalDispenseStatus()) : new Promise((t) => {
      const n = setInterval(async () => {
        if (this.__internal__.serial.queue.length > 0) return;
        clearInterval(n), await this.appendToQueue(e, "dispense");
        const s = await this.internalDispenseStatus();
        t(s);
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
  R as E,
  xe as K,
  Pe as a,
  Te as b,
  _ as c,
  Ue as g,
  Be as i,
  Me as s,
  fe as w
};
