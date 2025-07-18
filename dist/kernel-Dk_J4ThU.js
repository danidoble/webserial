import { h as r, Z as h } from "./webserial-core-BjytHor1.js";
function p(i = 100) {
  return new Promise((n) => setTimeout(() => n(), i));
}
function k() {
  return "serial" in navigator;
}
function y() {
  return "geolocation" in navigator;
}
function D() {
  return "crypto" in window;
}
function w(i = 1) {
  return i * 1e3;
}
function M(i) {
  return i == null || i === "";
}
class e {
  static enable = !1;
  static instance = null;
  static #i = null;
  static #r = 1;
  static #d() {
    if (e.enable === !1) throw new Error("Emulator is disabled");
    return e.enable;
  }
  static #o(n) {
    if (typeof n != "object" || !(n instanceof b))
      throw new Error(`Type ${n.typeDevice} is not supported`);
    return e.instance = n, e.#i = n.typeDevice, e.#r = n.deviceNumber, !0;
  }
  static #n(n = null) {
    return !e.#d() || n === null && e.instance === null ? !1 : (e.instance === null && e.#o(n), !0);
  }
  static #l() {
    if (e.#i !== "locker") throw new Error("This function is only available for Locker devices");
    return !0;
  }
  static #t() {
    if (e.#i !== "boardroid")
      throw new Error("This function is only available for Boardroid devices");
    return !0;
  }
  static #s() {
    if (e.#i !== "jofemar") throw new Error("This function is only available for Jofemar devices");
    return !0;
  }
  static #c() {
    if (e.#i === "locker") throw new Error("This function is not available for Locker devices");
    return !0;
  }
  // static #withoutBoardroid() {
  //     if (Emulator.#_device_type === 'boardroid') throw new Error(`This function is not available for Boardroid devices`);
  //
  //     return true;
  // }
  // static #withoutJofemar() {
  //     if (Emulator.#_device_type === 'jofemar') throw new Error(`This function is not available for Jofemar devices`);
  //
  //     return true;
  // }
  static #e(n) {
    e.instance.__emulate({ code: n });
  }
  static status(n = null) {
    if (!e.#n(n)) return !1;
    let s = [];
    switch (e.#i) {
      case "locker":
        s = ["0", "8"];
        break;
      case "boardroid":
        s = ["2", (5 + e.#r).toString(16).toUpperCase()];
        break;
      case "jofemar":
        s = ["6"];
        break;
      default:
        return !1;
    }
    e.#e(s);
  }
  static dispensed(n = null) {
    if (!e.#n(n)) return !1;
    let s = [];
    switch (e.#i) {
      case "locker":
        s = ["0", "7", "4", "4", "4"];
        break;
      case "boardroid":
        s = ["2", "D7", "A", "0", "0", "0", "0", "0", "0", "0", "0", "0", "F2"];
        break;
      case "jofemar":
        s = ["6", "30"];
        break;
      default:
        return !1;
    }
    e.#e(s);
  }
  static notDispensed(n = null) {
    if (!e.#n(n)) return !1;
    let s = [];
    switch (e.#i) {
      case "locker":
        s = ["0", "7", "5", "5", "5"];
        break;
      case "boardroid":
        s = ["2", "D7", "A", "0", "0", "1", "0", "0", "0", "0", "0", "0", "F2"];
        break;
      case "jofemar":
        s = ["6", "34"];
        break;
      default:
        return !1;
    }
    e.#e(s);
  }
  static gateInactive(n = null) {
    if (!e.#n(n) || !this.#l()) return !1;
    this.#e(["0", "7", "5", "5", "5"]);
  }
  static gateConfigured(n = null) {
    if (!e.#n(n) || !this.#l()) return !1;
    this.#e(["0", "6"]);
  }
  static keyPressed(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    const s = ["30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "2A", "23", "41", "42", "43", "44"], t = (128 + e.#r).toString(16), a = Math.floor(Math.random() * 15);
    e.#e(["2", t, "54", s[a]]);
  }
  static doorOpened(n = null) {
    if (!e.#n(n) || !this.#c()) return !1;
    let s = [];
    const t = (128 + e.#r).toString(16);
    switch (e.#i) {
      case "boardroid":
        s = ["2", "D8", "dc"];
        break;
      case "jofemar":
        s = ["2", t, "50", "4F"];
        break;
    }
    e.#e(s);
  }
  static doorClosed(n = null) {
    if (!e.#n(n) || !this.#c()) return !1;
    let s = [];
    const t = (128 + e.#r).toString(16);
    switch (e.#i) {
      case "boardroid":
        s = ["2", "D8", "db"];
        break;
      case "jofemar":
        s = ["2", t, "50", "43"];
        break;
    }
    e.#e(s);
  }
  static channelDisconnected(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    const s = (128 + e.#r).toString(16);
    e.#e(["2", s, "43", "43", "43", "FD"]);
  }
  static channelConnected(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    const s = (128 + e.#r).toString(16);
    e.#e(["2", s, "43", "43", "43", "FC"]);
  }
  static channelEmpty(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    const s = (128 + e.#r).toString(16);
    e.#e(["2", s, "43", "43", "43", "FF"]);
  }
  static workingTemperature(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    const s = (128 + e.#r).toString(16);
    e.#e(["2", s, "43", "54", "16"]);
  }
  static currentTemperature(n = null) {
    if (!e.#n(n) || !e.#c()) return !1;
    let s = [];
    const t = (128 + e.#r).toString(16);
    switch (e.#i) {
      case "boardroid":
        s = ["2", "D9", "44", "30"];
        break;
      case "jofemar":
        s = ["2", t, "43", "74", "2B", "30", "39", "2E", "31", "7F", "43"];
        break;
    }
    e.#e(s);
  }
  static ready(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "30"]);
  }
  static busy(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "31"]);
  }
  static invalidTray(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "32"]);
  }
  static invalidChannel(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "33"]);
  }
  static emptyChannel(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "34"]);
  }
  static elevatorJam(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "35"]);
  }
  static elevatorMalfunction(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "36"]);
  }
  static phototransistorFailure(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "37"]);
  }
  static allChannelsEmpty(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "38"]);
  }
  static productDetectorFailure(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "39"]);
  }
  static displayDisconnected(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "41"]);
  }
  static productUnderElevator(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "42"]);
  }
  static elevatorSettingAlarm(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "43"]);
  }
  static buttonPanelFailure(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "44"]);
  }
  static errorWritingEeprom(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "45"]);
  }
  static errorControlTemperature(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "46"]);
  }
  static thermometerDisconnected(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "47"]);
  }
  static thermometerMisconfigured(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "48"]);
  }
  static thermometerFailure(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "49"]);
  }
  static errorExtractorConsumption(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "4A"]);
  }
  static channelSearchError(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "4B"]);
  }
  static productExitMouthSearchError(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "4C"]);
  }
  static elevatorInteriorLocked(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "4D"]);
  }
  static productDetectorVerifierError(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "4E"]);
  }
  static waitingForProductRecall(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "4F"]);
  }
  static productExpiredByTemperature(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "50"]);
  }
  static faultyAutomaticDoor(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "51"]);
  }
  static rejectLever(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "A0", "1"]);
  }
  static resetCoinPurse(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "A0", "2"]);
  }
  static #f(n, s = null) {
    let t = n[Math.floor(Math.random() * 5)];
    if (s !== null && !isNaN(parseFloat(s)))
      switch (s.toString()) {
        case "0.5":
          t = n[1];
          break;
        case "1":
          t = n[2];
          break;
        case "2":
          t = n[3];
          break;
        case "5":
          t = n[4];
          break;
        case "10":
          t = n[5];
          break;
      }
    return t;
  }
  static coinInsertedBox(n = null, s = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    const t = ["40", "41", "42", "43", "44", "45"], a = e.#f(t, s);
    e.#e(["2", "A0", a]);
  }
  static coinInsertedTube(n = null, s = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    const t = ["50", "51", "52", "53", "54", "55"], a = e.#f(t, s);
    e.#e(["2", "A0", a]);
  }
  static #a(n, s = null) {
    let t = n[Math.floor(Math.random() * 4)];
    if (s !== null && !isNaN(parseFloat(s)))
      switch (s.toString()) {
        case "20":
          t = n[0];
          break;
        case "50":
          t = n[1];
          break;
        case "100":
          t = n[2];
          break;
        case "200":
          t = n[3];
          break;
        case "500":
          t = n[4];
          break;
      }
    return t;
  }
  static banknoteInsertedStacker(n = null, s = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    const t = ["80", "81", "82", "83", "84"], a = e.#a(t, s);
    e.#e(["2", "B0", a]);
  }
  static banknoteInsertedEscrow(n = null, s = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    const t = ["90", "91", "92", "93", "94"], a = e.#a(t, s);
    e.#e(["2", "B0", a]);
  }
  static banknoteEjected(n = null, s = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    const t = ["A0", "A1", "A2", "A3", "A4"], a = e.#a(t, s);
    e.#e(["2", "B0", a]);
  }
  static banknoteInsertedRecycler(n = null, s = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    const t = ["B0", "B1", "B2", "B3", "B4"], a = e.#a(t, s);
    e.#e(["2", "B0", a]);
  }
  static banknoteTaken(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "B0", "2a"]);
  }
  static coinPurseEnabled(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "D0", "1"]);
  }
  static coinPurseDisabled(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "D0", "0"]);
  }
  static billPurseDisabled(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "D1", "0", "0"]);
  }
  static billPurseEnabled(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "D1", "1", "1"]);
  }
  static readTubes(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    const s = [
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
    ], [t, a, c, l, f, d] = [
      s[Math.floor(Math.random() * 30)],
      s[Math.floor(Math.random() * 30)],
      s[Math.floor(Math.random() * 30)],
      s[Math.floor(Math.random() * 30)],
      s[Math.floor(Math.random() * 30)],
      s[Math.floor(Math.random() * 30)]
    ];
    e.#e(["2", "D2", t, a, c, l, f, d]);
  }
  static readBillPurse(n = null, s = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    let t = [
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
      const a = t[Math.floor(Math.random() * 31)];
      let c = "0", l = "0", f = "0", d = "0", o = "0";
      if (s !== null && !isNaN(parseInt(s)))
        switch (s.toString()) {
          case "20":
            c = a;
            break;
          case "50":
            l = a;
            break;
          case "100":
            f = a;
            break;
          case "200":
            d = a;
            break;
          case "500":
            o = a;
            break;
        }
      else
        switch (n._recycler.bill) {
          case 0:
            c = a;
            break;
          case 1:
            l = a;
            break;
          case 2:
            f = a;
            break;
          case 3:
            d = a;
            break;
          case 4:
            o = a;
            break;
        }
      e.#e(["2", "D3", c, l, f, d, o, "0"]);
    } else {
      const [a, c, l, f, d, o] = [
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 30)],
        t[Math.floor(Math.random() * 2)],
        t[Math.floor(Math.random())],
        t[Math.floor(Math.random())]
      ];
      e.#e(["2", "D3", a, c, l, f, d, o]);
    }
  }
  static banknoteAccepted(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "D4", "1"]);
  }
  static banknoteRejected(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "D4", "0"]);
  }
  static banknotesDispensed(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    let s = [
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
      const t = s[Math.floor(Math.random() * 30)];
      let a = "0", c = "0", l = "0", f = "0", d = "0";
      switch (n._recycler.bill) {
        case 0:
          a = t;
          break;
        case 1:
          c = t;
          break;
        case 2:
          l = t;
          break;
        case 3:
          f = t;
          break;
        case 4:
          d = t;
          break;
      }
      e.#e(["2", "D5", a, c, l, f, d, "0"]);
    } else {
      const [t, a, c, l, f, d] = [
        s[Math.floor(Math.random() * 30)],
        s[Math.floor(Math.random() * 30)],
        s[Math.floor(Math.random() * 30)],
        s[Math.floor(Math.random() * 2)],
        s[Math.floor(Math.random())],
        s[Math.floor(Math.random())]
      ];
      e.#e(["2", "D5", t, a, c, l, f, d]);
    }
  }
  static coinsDispensed(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "D6"]);
  }
  static relayOn(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DA", "1"]);
  }
  static relayOff(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DA", "0"]);
  }
  static nayaxEnabled(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DD", "1"]);
  }
  static nayaxDisabled(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DD", "0"]);
  }
  static nayaxPreCreditAuthorized(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DD", "3"]);
  }
  static nayaxCancelRequest(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DD", "4"]);
  }
  static nayaxSellApproved(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DD", "5"]);
  }
  static nayaxSellDenied(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DD", "6"]);
  }
  static nayaxEndSession(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DD", "7"]);
  }
  static nayaxCancelled(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DD", "8"]);
  }
  static nayaxDispensed(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DD", "A", "0"]);
  }
  static nayaxNotDispensed(n = null) {
    if (!e.#n(n) || !e.#t()) return !1;
    e.#e(["2", "DD", "A", "1"]);
  }
  static fullTray(n = null) {
    if (!e.#n(n) || !e.#s()) return !1;
    e.#e(["6", "4F"]);
  }
  static setConnection(n = null) {
    if (!e.#n(n)) return !1;
    n.__internal__.serial.connected = !0;
  }
}
r.instance || (r.instance = new r());
const u = {
  relay: [],
  locker: [],
  jofemar: [],
  boardroid: [],
  pinpad: [],
  pinpax: [],
  hopper: []
};
r.devices = { ...r.devices, ...u };
r.addCustom = (i, n) => {
  r.registerType(i), r.add(n);
};
r.getCustomByUuid = (i, n) => r.get(i, n);
r.getJofemarByUuid = (i) => r.get("jofemar", i);
r.getLockerByUuid = (i) => r.get("locker", i);
r.getRelayByUuid = (i) => r.get("relay", i);
r.getBoardroidByUuid = (i) => r.get("boardroid", i);
r.getPinPadByUuid = (i) => r.get("pinpad", i);
r.getPinPaxByUuid = (i) => r.get("pinpax", i);
r.getHopperByUuid = (i) => r.get("hopper", i);
r.getJofemar = (i = 1) => r.getByNumber("jofemar", i);
r.getBoardroid = (i = 1) => r.getByNumber("boardroid", i);
r.getLocker = (i = 1) => r.getByNumber("locker", i);
r.getRelay = (i = 1) => r.getByNumber("relay", i);
r.getPinPad = (i = 1) => r.getByNumber("pinpad", i);
r.getPinPax = (i = 1) => r.getByNumber("pinpax", i);
r.getHopper = (i = 1) => r.getByNumber("hopper", i);
class b extends h {
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
  async timeout(n, s) {
    await super.timeout(n, s), s === "dispense" && (this.__internal__.dispense.status = "no-response");
  }
  async serialPortsSaved(n) {
    const s = this.serialFilters;
    if (this.__internal__.aux_port_connector < n.length) {
      const t = this.__internal__.aux_port_connector;
      this.__internal__.serial.port = n[t];
    } else
      this.__internal__.aux_port_connector = 0, this.__internal__.serial.port = await navigator.serial.requestPort({ filters: s });
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
    if (this.__internal__.dispense.must_response && (await p(this.__internal__.time.response_engines + 10), this.__internal__.dispense.status === "no-response"))
      return this.internalClearSensing(), this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", { reason: "no-response" }), { status: !1, error: "no-response" };
    this.__internal__.dispense.status = null, this.__internal__.dispense.dispensing = !0, this.dispatch("internal:dispense:running", {});
    const n = this;
    return new Promise((s) => {
      this.__internal__.interval.waiting_sense = setInterval(() => {
        switch (n.__internal__.dispense.status) {
          case null:
            n.internalDispensingProcess() === !1 && (n.internalClearSensing(), n.dispatch("not-dispensed", { reason: "timeout" }), s({ status: !1, error: "timeout" }));
            break;
          case !0:
            n.internalClearSensing(), n.__internal__.dispense.status = !0, n.dispatch("dispensed", {}), s({ status: !0, error: null });
            break;
          case !1:
            n.internalClearSensing(), n.__internal__.dispense.status = !1, n.dispatch("not-dispensed", { reason: "no-stock" }), s({ status: !1, error: null });
            break;
          case "elevator-locked":
            n.internalClearSensing(), n.__internal__.dispense.status = !1, n.dispatch("not-dispensed", { reason: "elevator-locked" }), s({ status: !1, error: "elevator-locked" });
            break;
          case "no-response":
            n.internalClearSensing(), n.__internal__.dispense.status = !1, n.dispatch("not-dispensed", { reason: "no-response" }), s({ status: !1, error: "no-response" });
            break;
        }
      }, this.__internal__.time.sense);
    });
  }
  async internalDispense(n) {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    if (!e.enable && !this.__internal__.serial.connected && (await this.serialConnect(), !this.__internal__.serial.connected))
      throw new Error("Serial device not connected");
    return this.__internal__.serial.queue.length === 0 ? (await this.appendToQueue(n, "dispense"), await this.internalDispenseStatus()) : new Promise((s) => {
      const t = setInterval(async () => {
        if (this.__internal__.serial.queue.length > 0) return;
        clearInterval(t), await this.appendToQueue(n, "dispense");
        const a = await this.internalDispenseStatus();
        s(a);
      }, 100);
    });
  }
  __emulate(n) {
    if (typeof n.code != "object") {
      console.error("Invalid data to make an emulation");
      return;
    }
    this.__internal__.serial.connected || (this.__internal__.serial.connected = !0, this.dispatch("serial:connected"), r.instance.dispatch("change"), this.__internal__.interval.reconnection && (clearInterval(this.__internal__.interval.reconnection), this.__internal__.interval.reconnection = 0)), this.__internal__.timeout.until_response && (clearTimeout(this.__internal__.timeout.until_response), this.__internal__.timeout.until_response = 0);
    const s = [];
    for (const t in n.code)
      s.push(n.code[t].toString().padStart(2, "0").toLowerCase());
    this.serialMessage(s);
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
  fixHexArray(n) {
    return n.map((s) => typeof s == "string" ? s.padStart(2, "0").toLowerCase() : s.toString(16).padStart(2, "0").toLowerCase());
  }
}
export {
  e as E,
  b as K,
  D as a,
  y as b,
  w as g,
  M as i,
  k as s,
  p as w
};
