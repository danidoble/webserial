import { K as C, D as f, w as u, g as v } from "./kernel-BZzs36vi.js";
import { o as i } from "./relay-DP8PLsDP.js";
class w extends C {
  __device = {
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
  };
  constructor({
    filters: t = null,
    config_port: e,
    no_device: n = 1,
    device_listen_on_channel: r = 1,
    type: a = "esplus",
    support_cart: o = !0,
    socket: c = !1
  } = {}) {
    if (super({ filters: t, config_port: e, no_device: n, device_listen_on_channel: r, socket: c }), this.__internal__.device.type = "jofemar", f.getCustom(this.typeDevice, n))
      throw new Error(`Device ${this.typeDevice} ${n} already exists`);
    this.__internal__.dispense.must_response = !0, this.__internal__.time.response_general = 800, this.__internal__.time.response_engines = 800, this.__internal__.dispense.limit_counter = 40, this.__internal__.dispense.timeout = 0, this.__internal__.dispense.timeout_time = 4e3, this.__internal__.dispense.interval = 0, this.__internal__.dispense.interval_time = 1e3, this.__internal__.device.hex_number = (128 + this.listenOnChannel).toString(16), this.__internal__.device.door_open = !1, this.__internal__.dispense.elevator = {
      locking_time: 60,
      locking_interval: 0,
      need_reset: !1
    }, this.deviceType = a, this.supportCart = o, this.#h(), f.add(this), this.#l();
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
  #h() {
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
      "channels:progress",
      "channel:status",
      "machine:status"
    ];
    for (const e of t)
      this.serialRegisterAvailableListener(e);
  }
  #l() {
    this.on("internal:dispense:running", this.#q.bind(this));
  }
  serialSetConnectionConstant(t = 1) {
    return i.connection({ channel: t });
  }
  async #s() {
    if (!this.__internal__.dispense.elevator.locking_interval)
      return this.__internal__.dispense.elevator.need_reset && (this.__internal__.dispense.elevator.need_reset = !1, await this.resetWaitingProductRemovedError(), await u(500)), this.__internal__.dispense.status = "elevator-locked", this.__internal__.dispense.elevator.locking_time = 60, new Promise((t) => {
        this.__internal__.dispense.elevator.locking_interval = setInterval(() => {
          this.dispatch("dispensing:withdrawal", {
            elevator: !0,
            seconds: this.__internal__.dispense.elevator.locking_time,
            description: "Please recall products from the elevator"
          }), this.__internal__.dispense.elevator.locking_time -= 1, this.__internal__.dispense.elevator.locking_time <= 0 && (clearInterval(this.__internal__.dispense.elevator.locking_interval), this.__internal__.dispense.elevator.locking_interval = 0, t(!0));
        }, 1e3);
      });
  }
  #d(t) {
    return t.name = "ok", t.description = "The last command was executed successfully", t.no_code = 1, this.dispatch("command-executed", t), t;
  }
  #p(t, e) {
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
    }, r = t.toString().toLowerCase();
    return e.additional.ascii = n[r] ?? null, e.name = "Key pressed", e.description = `The key ${e.additional.ascii} was pressed`, e.no_code = 2, this.dispatch("keyboard:pressed", e.additional), e;
  }
  #u(t, e) {
    return e.additional = { open: !1 }, e.no_code = 3, t === "4f" ? (e.name = "door open", e.description = "The door was opened", e.additional.open = !0, this.__internal__.device.door_open = !0, this.dispatch("door:event", e.additional)) : t === "43" ? (e.name = "door close", e.description = "The door was closed", e.additional.open = !1, this.__internal__.device.door_open = !1, this.dispatch("door:event", e.additional)) : (e.name = "door event", e.description = "The door event received is unknown", this.dispatch("door:event", { open: e.additional.open, message: e })), e;
  }
  #_(t, e) {
    e.no_code = 404;
    let n = t[5] ?? null;
    if (n && this.listenOnChannel > 1 && (n = this.hexToDec(n) - this.listenOnChannel + 1, n = this.decToHex(n)), !n) return e;
    if (console.log(n), n === "FD" ? (e.no_code = 4, e.name = "channel disconnected", e.description = "The channel is disconnected", e.additional = { active: !1 }) : n === "FC" ? (e.no_code = 5, e.name = "channel connected", e.description = "The channel is connected", e.additional = { active: !0 }) : (e.no_code = 6, e.name = "channel sold out", e.description = "The channel is empty", e.additional = { active: !0 }), this.__device.channels.verification.running) {
      const r = this.__device.channels.verification.channels.length + this.__device.channels.verification.start;
      this.__device.channels.verification.channels.push({
        selection: r,
        active: e.additional.active
      }), e.additional.selection = r;
    }
    return this.dispatch("channel:status", e.additional), e;
  }
  #f(t, e) {
    e.no_code = 39, e.name = "Program version";
    const n = t.slice(4, 12), r = n.map((a) => String.fromCharCode(this.hexToDec(a))).join("");
    return e.additional = { version: r, hex: n }, e.description = `The program version is ${r}`, this.dispatch("program:version", e.additional), e;
  }
  #v(t, e) {
    e.no_code = 39, e.name = "Machine faults", e.description = "No faults detected", e.additional = { no_faults: 0, faults: [] };
    const n = t.slice(4, -3);
    if (n.length > 1 && n[0] !== "30") {
      e.description = "Machine has faults";
      const r = {
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
      for (const a of n)
        r[a] && e.additional.faults && typeof e.additional.no_faults < "u" && (e.additional.faults.push(r[a] || "Unknown fault"), e.additional.no_faults++);
    }
    return this.dispatch("machine:faults", e.additional), e;
  }
  #y(t, e) {
    e.no_code = 40, e.name = "Clock registers", e.description = "Clock registers";
    const n = t.slice(4, -3), r = n.map((_) => String.fromCharCode(this.hexToDec(_))).join(""), [a, o] = r.split(" "), [c, h] = a.split(":"), [l, s, d] = o.split("-"), p = new Date(
      2e3 + parseInt(d),
      parseInt(s) - 1,
      parseInt(l),
      parseInt(c),
      parseInt(h)
    );
    return e.additional = {
      day: l,
      month: s,
      year: d,
      hours: c,
      minutes: h,
      formatted: r,
      date: p,
      hex: n
    }, this.dispatch("clock:registers", e.additional), e;
  }
  #C(t, e) {
    e.no_code = 41, e.name = "Machine activity", e.description = "Events from read machine activity";
    const n = String.fromCharCode(this.hexToDec(t[4]));
    if (n !== "0") {
      const r = t.slice(5, -3);
      if (n === "T" && r.length === 4) {
        const a = String.fromCharCode(this.hexToDec(r[0])), o = String.fromCharCode(this.hexToDec(r[1])), c = String.fromCharCode(this.hexToDec(r[3]));
        e.additional = {
          ascii: n,
          type: "DU.d",
          dozens: a,
          units: o,
          decimals: c,
          time: parseFloat(`${a}${o}.${c}`),
          meaning: "Extraction time (in seconds)"
        };
      } else if (["B", "D", "E", "F", "G"].includes(n) && r.length === 3) {
        const a = String.fromCharCode(this.hexToDec(r[0])), o = String.fromCharCode(this.hexToDec(r[1])), c = String.fromCharCode(this.hexToDec(r[2])), h = parseInt(`${a}${o}${c}`), l = {
          B: "Error on going to tray channel",
          D: "Error on product detector",
          E: "Extraction of channel ok",
          F: "Error on engine intensity detection",
          G: "Error on product exit door"
        };
        e.additional = {
          type: "HDU",
          hundreds: a,
          dozens: o,
          decimals: c,
          channel: h,
          selection: h - 109,
          ascii: n,
          meaning: l[n] || "Unknown"
        };
      } else if (r.length === 13) {
        const a = r.map((y) => String.fromCharCode(this.hexToDec(y))).join(""), o = parseInt(a.slice(0, 2)), c = parseInt(a.slice(2, 4)), h = parseInt(a.slice(4, 6)), l = parseInt(a.slice(7, 9)), s = parseInt(a.slice(9, 11)) - 1, d = 2e3 + parseInt(a.slice(11, 13)), p = new Date(d, s, l, o, c, h), _ = {
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
          date: p,
          hex: r,
          formatted: p.toLocaleString(),
          ascii: n,
          meaning: _[n] || "Unknown"
        };
      }
    }
    return this.dispatch("machine:activity", e.additional), e;
  }
  #T(t, e) {
    const n = {
      30: "Spanish",
      31: "English",
      32: "French"
    };
    return e.no_code = 42, e.name = "Language", e.description = `The language is ${n[t] || "unknown"}`, e.additional = {
      hex: t,
      language: n[t] || "unknown"
    }, this.dispatch("check:language", e.additional), e;
  }
  #k(t, e) {
    return e.no_code = 43, e.name = "Beeper", e.description = `The beeper is ${t === "30" ? "on" : "off"}`, e.additional = {
      hex: t,
      beeper: t === "30"
    }, this.dispatch("check:beeper", e.additional), e;
  }
  #m(t, e) {
    e.no_code = 44, e.name = "Isolation tray", e.description = "Isolation tray";
    const n = this.hexToDec(t) - 139;
    return e.additional = {
      hex: t,
      tray: n
    }, this.dispatch("check:isolation-tray", e.additional), e;
  }
  #w(t, e) {
    e.no_code = 45, e.name = "Engine voltage", e.description = "Engine voltage";
    const n = (this.hexToDec(t) - 128) / 2 + 5;
    return e.additional = {
      hex: t,
      voltage: n
    }, this.dispatch("check:engine-voltage", e.additional), e;
  }
  #b(t, e) {
    e.no_code = 46, e.name = "Push over", e.description = "Push over";
    const n = t === "30";
    return e.additional = {
      hex: t,
      push: n
    }, this.dispatch("check:push-over", e.additional), e;
  }
  #x(t, e) {
    e.no_code = 47, e.name = "Extractor after dispense", e.description = "Extractor after dispense";
    const n = (this.hexToDec(t) - 128) / 10;
    return e.additional = {
      hex: t,
      seconds: n
    }, this.dispatch("check:extractor-after-dispense", e.additional), e;
  }
  #E(t, e) {
    e.no_code = 48, e.name = "Standby after collect", e.description = "Time to standby after collect product";
    const n = this.hexToDec(t) - 128;
    return e.additional = {
      hex: t,
      seconds: n
    }, this.dispatch("check:standby-after-collect", e.additional), e;
  }
  #D(t, e) {
    e.no_code = 49, e.name = "Standby without collect", e.description = "Time to standby when product delivery is not collected";
    const n = this.hexToDec(t) - 128;
    return e.additional = {
      hex: t,
      minutes: n
    }, this.dispatch("check:standby-without-collect", e.additional), e;
  }
  #O(t, e) {
    e.no_code = 50, e.name = "Elevator speed", e.description = "Elevator speed";
    const n = t === "30" ? "low" : "high";
    return e.additional = {
      hex: t,
      speed: n
    }, this.dispatch("check:elevator-speed", e.additional), e;
  }
  #M(t, e) {
    e.no_code = 51, e.name = "Temperature expiration", e.description = "Temperature expiration";
    const n = t === "31";
    return e.additional = {
      hex: t,
      enabled: n
    }, this.dispatch("check:expiration-by-temperature", e.additional), e;
  }
  #I(t, e) {
    e.no_code = 52, e.name = "Temperature before expiration", e.description = "Temperature before expiration";
    const n = (this.hexToDec(t) - 128) / 2;
    return e.additional = {
      hex: t,
      temperature: n
    }, this.dispatch("check:temperature-before-expiration", e.additional), e;
  }
  #P(t, e) {
    e.no_code = 53, e.name = "Time before expiration", e.description = "Time before expiration";
    const n = this.hexToDec(t) - 128;
    return e.additional = {
      hex: t,
      minutes: n
    }, this.dispatch("check:expiration-after", e.additional), e;
  }
  #Q(t, e) {
    e.no_code = 54, e.name = "Temperature scale", e.description = "Temperature scale";
    const n = t === "43" ? "Celsius" : "Fahrenheit";
    return e.additional = {
      hex: t,
      scale: n
    }, this.dispatch("check:temperature-scale", e.additional), e;
  }
  #S(t, e) {
    return e.no_code = 54, e.name = "Machine ID", e.description = "Machine ID", e.additional = { hex: t[4], full_hex: t }, this.dispatch("check:machine-id", e.additional), e;
  }
  #g(t, e) {
    return e.no_code = 7, e.name = "working temperature", e.description = `The working temperature is ${t}`, e.additional = {
      hex: t,
      temperature: {
        traditional: (this.hexToDec(t) - this.hexToDec("80")) / 2,
        ice_plus: (this.hexToDec(t) - this.hexToDec("80")) / 2 - 25.5
      }
    }, this.dispatch("temperature:working", e.additional), e;
  }
  #A(t, e) {
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
  }
  #B(t, e, n = 128) {
    if (t[1] && (e.additional.machine || (e.additional.machine = { hex: null, dec: null }), e.additional.machine.hex = t[1], e.additional.machine.dec = this.hexToDec(t[1]) - n), !(t[1] && t[2]))
      e = this.#d(e);
    else
      switch (t[2]) {
        case "54":
          e.request = "--automatic", e = this.#p(t[3], e);
          break;
        case "50":
          e.request = "--automatic", e = this.#u(t[3], e);
          break;
        case "43":
          switch (e.request = "check-data", t[3]) {
            case "41":
              e = this.#C(t, e);
              break;
            case "43":
              e.request = "channel-status", e = this.#_(t, e);
              break;
            case "50":
              e = this.#f(t, e);
              break;
            case "53":
              e = this.#v(t, e);
              break;
            case "54":
              e.request = "working-temperature", e = this.#g(t[4], e);
              break;
            case "72":
              e = this.#y(t, e);
              break;
            case "74":
              e.request = "current-temperature", e = this.#A(t, e);
              break;
            case "49":
              e = this.#T(t[4], e);
              break;
            case "5a":
              e = this.#k(t[4], e);
              break;
            case "42":
              e = this.#m(t[4], e);
              break;
            case "47":
              e = this.#w(t[4], e);
              break;
            case "4e":
              e = this.#S(t, e);
              break;
            case "4f":
              e = this.#b(t[4], e);
              break;
            case "45":
              e = this.#x(t[4], e);
              break;
            case "46":
              e = this.#E(t[4], e);
              break;
            case "48":
              e = this.#D(t[4], e);
              break;
            case "76":
              e = this.#O(t[4], e);
              break;
            case "63":
              e = this.#M(t[4], e);
              break;
            case "65":
              e = this.#I(t[4], e);
              break;
            case "66":
              e = this.#P(t[4], e);
              break;
            case "67":
              e = this.#Q(t[4], e);
              break;
          }
          break;
      }
    return e;
  }
  #n() {
    this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !0);
  }
  #e() {
    this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !1);
  }
  #a() {
    this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = "elevator-locked");
  }
  #t({
    type: t = null,
    severity: e = "low"
  } = {}) {
    this.dispatch("jofemar:warning", { type: t, severity: e });
  }
  #i({
    type: t = null,
    severity: e = "high"
  } = {}) {
    this.dispatch("jofemar:error", { type: t, severity: e });
  }
  #W(t, e) {
    if (e.request = "status", t[1] && !t[2]) {
      switch (t[1]) {
        case "30":
          e.name = "Machine ready", e.description = "The machine is ready for instructions", e.no_code = 9, this.#n();
          break;
        case "31":
          e.name = "Machine busy", e.description = "The machine is busy right now", e.no_code = 10;
          break;
        case "32":
          e.name = "Invalid tray", e.description = "The tray requested is invalid", e.no_code = 11, this.#e(), this.#t({ type: "invalid-tray" });
          break;
        case "33":
          e.name = "Invalid channel", e.description = "The channel requested is invalid", e.no_code = 12, this.#e(), this.#t({ type: "invalid-channel" });
          break;
        case "34":
          e.name = "Empty channel", e.description = "The channel requested is empty", e.no_code = 13, this.#e(), this.#t({ type: "empty-channel" });
          break;
        case "35":
          e.name = "Jam", e.description = "Jam in elevator engine", e.no_code = 14, this.#e(), this.#i({ type: "jam" });
          break;
        case "36":
          e.name = "Malfunction", e.description = "Malfunction in the elevator belt or product detector", e.no_code = 15, this.#e(), this.#i({ type: "malfunction" });
          break;
        case "37":
          e.name = "Photo transistors", e.description = "Failure in one of the photo transistors in the cabinet", e.no_code = 16, this.#e(), this.#i({ type: "photo-transistors" });
          break;
        case "38":
          e.name = "Without channels", e.description = "No channels detected", e.no_code = 17, this.#e(), this.#i({ type: "without-channels" });
          break;
        case "39":
          e.name = "Product detector fault", e.description = "Product detector fault", e.no_code = 18, this.#a(), this.#t({ type: "fault-product-detector" });
          break;
        case "41":
          e.name = "Fault in 485 BUS", e.description = "Machine display is disconnected", e.no_code = 19, this.#n(), this.#t({ type: "display-disconnected" });
          break;
        case "42":
          e.name = "Product under elevator", e.description = "Product alarm under elevator", e.no_code = 20, this.#e(), this.#t({ type: "product-under-elevator" });
          break;
        case "43":
          e.name = "Error when elevator approaching to a position", e.description = "Error when elevator approaching to a position", e.no_code = 21, this.#n(), this.#t({ type: "error-approaching-position", severity: "high" });
          break;
        case "44":
          e.name = "Fault in keyboard", e.description = "Fault in keyboard", e.no_code = 22, this.#e(), this.#i({ type: "fault-keyboard" });
          break;
        case "45":
          e.name = "Eeprom writing error", e.description = "Eeprom writing error", e.no_code = 23, this.#e(), this.#i({ type: "eeprom-writing-error", severity: "critical" });
          break;
        case "46":
          e.name = "Fault communicating with temperature control", e.description = "Fault communicating with temperature control", e.no_code = 24, this.#n(), this.#t({ type: "fault-temperature-control" });
          break;
        case "47":
          e.name = "Thermometer disconnected", e.description = "The thermometer is disconnected", e.no_code = 25, this.#n(), this.#t({ type: "thermometer-disconnected" });
          break;
        case "48":
          e.name = "Thermometer programming lost", e.description = "Thermometer programming lost", e.no_code = 26, this.#n(), this.#t({ type: "thermometer-programming-lost" });
          break;
        case "49":
          e.name = "Thermometer faulty", e.description = "Thermometer faulty", e.no_code = 27, this.#n(), this.#t({ type: "thermometer-faulty" });
          break;
        case "4a":
          e.name = "Channels power consumption detector faulty", e.description = "Channels power consumption detector faulty", e.no_code = 28, this.#e(), this.#i({ type: "channels-power-consumption-detector-faulty", severity: "critical" });
          break;
        case "4b":
          e.name = "Elevator does not find channel or tray", e.description = "Elevator does not find channel or tray", e.no_code = 29, this.#e(), this.#t({ type: "elevator-not-find-channel-tray" });
          break;
        case "4c":
          e.name = "Elevator does not find delivery product position", e.description = "Elevator does not find delivery product position", e.no_code = 30, this.#e(), this.#i({ type: "elevator-not-find-delivery-position" });
          break;
        case "4d":
          e.name = "Interior of elevator blocked", e.description = "Interior of elevator blocked", e.no_code = 31, this.#a(), this.__internal__.dispense.elevator.need_reset || (this.__internal__.dispense.elevator.need_reset = !0), this.#i({ type: "interior-elevator-blocked", severity: "low" });
          break;
        case "4e":
          e.name = "Error in tester of product detector", e.description = "Error in tester of product detector", e.no_code = 32, this.#e(), this.#i({ type: "error-tester-product-detector" });
          break;
        case "4f":
          e.name = "Waiting for product to be removed", e.description = "Waiting for product to be removed", e.no_code = 33, this.#a();
          break;
        case "50":
          e.name = "Product expired by temperature reasons", e.description = "Product expired by temperature reasons", e.no_code = 34, this.#n(), this.#t({ type: "product-expired-temperature" });
          break;
        case "51":
          e.name = "Automatic door faulty", e.description = "Automatic door faulty", e.no_code = 35, this.#n(), this.#t({ type: "automatic-door-faulty" });
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
          e.no_code = 36, this.#n(), this.#t({ type: "product-expired" });
          break;
        case "64":
          e.name = "Product detector didn't change during its verification test", e.description = "Product detector didn't change during its verification test", e.no_code = 37, this.#n(), this.#t({ type: "automatic-door-faulty" });
          break;
      }
      this.dispatch("machine:status", e);
    } else
      e.name = "executed", e.description = "The last command was executed successfully", e.no_code = 8, !t[1] && this.__internal__.dispense.dispensing && this.#e();
    return e;
  }
  serialMessage(t) {
    t = this.fixHexArray(t);
    const e = 128;
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
        n = this.#B(t, n, e);
        break;
      case "06":
        n = this.#W(t, n);
        break;
      case "15":
        n.name = "Checksum error", n.description = "The calculated checksum does not match the received checksum", n.no_code = 38, this.#e();
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
  async dispense({ selection: t = 1, cart: e = !1 } = {}) {
    const n = i.dispense({ selection: t, cart: e, machineChannel: this.listenOnChannel }), r = n[5], a = n[6];
    this.__internal__.dispense.backup_dispense = {
      selection: t,
      cart: e,
      channel: a,
      tray: r
    };
    let o;
    do
      o = await this.internalDispense(n), this.#F(), o.error === "elevator-locked" ? await this.#s() : o.error === "no-response" && await u(1e3);
    while (["elevator-locked", "no-response"].includes(o.error || ""));
    return this.__internal__.dispense.backup_dispense = {}, o;
  }
  #F() {
    this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.dispense.timeout = 0, this.__internal__.dispense.interval = 0;
  }
  #q() {
    this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.dispense.timeout = setTimeout(() => {
      this.__internal__.dispense.interval = setInterval(() => {
        this.status().then(() => {
        });
      }, this.__internal__.dispense.interval_time);
    }, this.__internal__.dispense.timeout_time);
  }
  internalClearSensing() {
    super.internalClearSensing(), this.__internal__.dispense.timeout && clearTimeout(this.__internal__.dispense.timeout), this.__internal__.dispense.interval && clearInterval(this.__internal__.dispense.interval), this.__internal__.serial.queue.length > 0 && (this.__internal__.serial.queue = this.__internal__.serial.queue.filter((t) => t.action !== "status"));
  }
  async endDispense() {
    const t = i.endCartDispense({ machineChannel: this.listenOnChannel });
    return await this.internalDispense(t);
  }
  async collect() {
    return await this.appendToQueue(i.collect({ machineChannel: this.listenOnChannel }), "collect");
  }
  async #r(t) {
    return await this.appendToQueue(
      i.reset({
        machineChannel: this.listenOnChannel,
        type: t
      }),
      "reset"
    );
  }
  async resetSoldOutErrors() {
    return await this.#r("soldOut");
  }
  async resetWaitingProductRemovedError() {
    return await this.#r("waiting");
  }
  async resetMachineErrors() {
    return this.__internal__.serial.queue.length === 0 ? (this.#o(), await this.#r("machine")) : new Promise((t) => {
      const e = setInterval(async () => {
        this.__internal__.serial.queue.length > 0 || (clearInterval(e), await this.#r("machine"), this.#o(), t(!0));
      }, 100);
    });
  }
  #o() {
    const t = this.__device.type === "iceplus" ? v(40) : v(25), e = (/* @__PURE__ */ new Date()).getTime(), n = new Date(e), r = 1e3 * t + e, a = new Date(r);
    this.dispatch("reset:errors", {
      description: "Resetting machine errors",
      duration: t,
      started_at: n,
      finished_at: a
    });
  }
  async resetAllErrors() {
    return await this.resetWaitingProductRemovedError(), await u(200), await this.resetSoldOutErrors(), await u(400), await this.resetMachineErrors();
  }
  async status() {
    return await this.appendToQueue(i.status({ machineChannel: this.listenOnChannel }), "status");
  }
  async #c(t) {
    return await this.appendToQueue(
      i.lights({
        machineChannel: this.listenOnChannel,
        type: t
      }),
      "lights"
    );
  }
  async lightsOn() {
    return await this.#c("on");
  }
  async lightsOff() {
    return await this.#c("off");
  }
  async program(t, e) {
    return await this.appendToQueue(
      i.program({
        machineChannel: this.listenOnChannel,
        param1: t,
        param2: e
      }),
      "program"
    );
  }
  async programDisplayLanguage({
    language: t = "spanish"
  } = {}) {
    return await this.appendToQueue(
      i.programDisplayLanguage({
        machineChannel: this.listenOnChannel,
        language: t
      }),
      "program"
    );
  }
  async programBeeper({ enable: t = !0 } = {}) {
    return await this.appendToQueue(
      i.programBeeper({
        machineChannel: this.listenOnChannel,
        enable: t
      }),
      "program"
    );
  }
  async programDisableWorkingTemperature() {
    if (this.__device.type === "iceplus") throw new Error("IcePlus does not support disable working temperature");
    return await this.appendToQueue(
      i.programDisableWorkingTemperature({
        machineChannel: this.listenOnChannel
      }),
      "program"
    );
  }
  async programDisableThermometer() {
    return await this.appendToQueue(
      i.programDisableThermometer({
        machineChannel: this.listenOnChannel
      }),
      "program"
    );
  }
  async programWorkingTemperature({ degrees: t = 0.5 } = {}) {
    return await this.appendToQueue(
      i.programWorkingTemperature({
        machineChannel: this.listenOnChannel,
        degrees: t,
        machineType: this.__device.type
      }),
      "program"
    );
  }
  async programIsolationTray({ tray: t = 0 } = {}) {
    return await this.appendToQueue(
      i.programIsolationTray({
        machineChannel: this.listenOnChannel,
        tray: t
      }),
      "program"
    );
  }
  async programTimeToStandbyAfterCollect({ seconds: t = 15 } = {}) {
    return await this.appendToQueue(
      i.programTimeToStandbyAfterCollect({
        machineChannel: this.listenOnChannel,
        seconds: t
      }),
      "program"
    );
  }
  async programTimeToStandbyWithoutCollect({ minutes: t = 1 } = {}) {
    return await this.appendToQueue(
      i.programTimeToStandbyWithoutCollect({
        machineChannel: this.listenOnChannel,
        minutes: t
      }),
      "program"
    );
  }
  async programElevatorSpeed({
    speed: t = "high"
  } = {}) {
    return await this.appendToQueue(
      i.programElevatorSpeed({
        machineChannel: this.listenOnChannel,
        speed: t
      }),
      "program"
    );
  }
  async programTemperatureExpiration({ enable: t = !1 } = {}) {
    return await this.appendToQueue(
      i.programTemperatureExpiration({
        machineChannel: this.listenOnChannel,
        enable: t
      }),
      "program"
    );
  }
  async programEnableTemperatureExpiration() {
    return await this.programTemperatureExpiration({ enable: !0 });
  }
  async programDisableTemperatureExpiration() {
    return await this.programTemperatureExpiration({ enable: !1 });
  }
  async programMachineAddress({ address: t = 1 } = {}) {
    return await this.appendToQueue(
      i.programMachineAddress({
        machineChannel: this.listenOnChannel,
        address: t
      }),
      "program"
    );
  }
  async programTemperatureBeforeExpiration({ degrees: t = 0.5 } = {}) {
    return await this.appendToQueue(
      i.programTemperatureBeforeExpiration({
        machineChannel: this.listenOnChannel,
        degrees: t
      }),
      "program"
    );
  }
  async programTimeBeforeExpirationByTemperature({ minutes: t = 1 } = {}) {
    return await this.appendToQueue(
      i.programTimeBeforeExpirationByTemperature({
        machineChannel: this.listenOnChannel,
        minutes: t
      }),
      "program"
    );
  }
  async programTemperatureScale({
    scale: t = "celsius"
  } = {}) {
    return await this.appendToQueue(
      i.programTemperatureScale({
        machineChannel: this.listenOnChannel,
        scale: t
      }),
      "program"
    );
  }
  async programVoltageEngine({ selection: t = 1, voltage: e = 5 } = {}) {
    return await this.appendToQueue(
      i.programVoltageEngine({
        machineChannel: this.listenOnChannel,
        selection: t,
        voltage: e
      }),
      "voltage-engine"
    );
  }
  async programPushOverProducts({ selection: t = 1, enable: e = !0 } = {}) {
    return await this.appendToQueue(
      i.programPushOverProducts({
        machineChannel: this.listenOnChannel,
        selection: t,
        enable: e
      }),
      "push-over-products"
    );
  }
  async programChannelRunningAfterDispense({ selection: t = 1, seconds: e = 0 } = {}) {
    return await this.appendToQueue(
      i.programChannelRunningAfterDispense({
        machineChannel: this.listenOnChannel,
        selection: t,
        seconds: e
      }),
      "channel-running-after-dispense"
    );
  }
  async checkData(t, e = 255) {
    return await this.appendToQueue(
      i.checkData({
        machineChannel: this.listenOnChannel,
        type: t,
        aux: e
      }),
      "check-data"
    );
  }
  async getDisplayLanguage() {
    return await this.appendToQueue(
      i.getDisplayLanguage({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getBeeper() {
    return await this.appendToQueue(i.getBeeper({ machineChannel: this.listenOnChannel }), "check-data");
  }
  async getWorkingTemperature() {
    return await this.appendToQueue(
      i.getWorkingTemperature({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getIsolationTray() {
    return await this.appendToQueue(
      i.getIsolationTray({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getProgramVersion() {
    return await this.appendToQueue(
      i.getProgramVersion({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getFaults() {
    return await this.appendToQueue(i.getFaults({ machineChannel: this.listenOnChannel }), "check-data");
  }
  async getMachineId() {
    return await this.appendToQueue(
      i.getMachineId({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getCurrentTemperature() {
    return await this.appendToQueue(
      i.getCurrentTemperature({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTimeToStandbyAfterCollect() {
    return await this.appendToQueue(
      i.getTimeToStandbyAfterCollect({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTimeToStandbyWithoutCollect() {
    return await this.appendToQueue(
      i.getTimeToStandbyWithoutCollect({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getElevatorSpeed() {
    return await this.appendToQueue(
      i.getElevatorSpeed({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTemperatureExpiration() {
    return await this.appendToQueue(
      i.getTemperatureExpiration({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTemperatureBeforeExpiration() {
    return await this.appendToQueue(
      i.getTemperatureBeforeExpiration({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTimeBeforeExpirationByTemperature() {
    return await this.appendToQueue(
      i.getTimeBeforeExpirationByTemperature({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getTemperatureScale() {
    return await this.appendToQueue(
      i.getTemperatureScale({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getClockRegisters() {
    return await this.appendToQueue(
      i.getClockRegisters({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getMachineActivity() {
    return await this.appendToQueue(
      i.getMachineActivity({ machineChannel: this.listenOnChannel }),
      "check-data"
    );
  }
  async getVoltageEngine({ selection: t = 1 } = {}) {
    return await this.appendToQueue(
      i.getVoltageEngine({
        machineChannel: this.listenOnChannel,
        selection: t
      }),
      "check-data"
    );
  }
  async getChannelPresence({ selection: t = 1 } = {}) {
    return await this.appendToQueue(
      i.getChannelPresence({
        machineChannel: this.listenOnChannel,
        selection: t
      }),
      "check-data"
    );
  }
  async getPushOverProducts({ selection: t = 1 } = {}) {
    return await this.appendToQueue(
      i.getPushOverProducts({
        machineChannel: this.listenOnChannel,
        selection: t
      }),
      "check-data"
    );
  }
  async getChannelRunningAfterDispense({ selection: t = 1 } = {}) {
    return await this.appendToQueue(
      i.getChannelRunningAfterDispense({
        machineChannel: this.listenOnChannel,
        selection: t
      }),
      "check-data"
    );
  }
  async setDisplayStandbyMessage({ message: t = "" } = {}) {
    return await this.appendToQueue(
      i.setDisplayStandbyMessage({
        machineChannel: this.listenOnChannel,
        message: t
      }),
      "display"
    );
  }
  async setDisplayMessageTemporarily({ message: t = "", seconds: e = 1 }) {
    return this.appendToQueue(
      i.setDisplayMessageTemporarily({
        machineChannel: this.listenOnChannel,
        message: t,
        seconds: e
      }),
      "display"
    );
  }
  async setDisplayMessageUnlimited({ message: t = "" }) {
    return await this.appendToQueue(
      i.setDisplayMessageUnlimited({
        machineChannel: this.listenOnChannel,
        message: t
      }),
      "display"
    );
  }
  async programClock({ date: t = /* @__PURE__ */ new Date() } = {}) {
    return await this.appendToQueue(
      i.programClock({
        machineChannel: this.listenOnChannel,
        date: t
      }),
      "clock"
    );
  }
  async eventsConfig({ event: t = null, enable: e = !0 } = {}) {
    return await this.appendToQueue(
      i.eventsConfig({
        machineChannel: this.listenOnChannel,
        event: t,
        enable: e
      }),
      "events-config"
    );
  }
  async eventEnable({ event: t = null } = {}) {
    return await this.appendToQueue(
      i.eventEnable({
        machineChannel: this.listenOnChannel,
        event: t
      }),
      "events-config"
    );
  }
  async eventDisable({ event: t = null } = {}) {
    return await this.appendToQueue(
      i.eventEnable({
        machineChannel: this.listenOnChannel,
        event: t
      }),
      "events-config"
    );
  }
  async sendCustomCode({ code: t = [] } = { code: [] }) {
    return await this.appendToQueue(
      i.sendCustomCode({
        code: t
      }),
      "custom"
    );
  }
  async assignChannels() {
    const t = this.__device.channels.verification.start, e = this.__device.channels.verification.end;
    if (t > e) throw new Error("Invalid range, start must be less than end");
    this.__device.channels.verification.clear(), this.__device.channels.verification.running = !0;
    for (let n = t; n <= e; n++)
      this.__device.channels.verification.current = n, await this.getChannelPresence({ selection: n });
    return new Promise((n) => {
      const r = setInterval(() => {
        this.__device.channels.verification.channels.length === e - t + 1 ? (clearInterval(r), this.dispatch("channels", { channels: this.__device.channels.verification.channels }), this.__device.channels.verification.clear(), n(!0)) : this.dispatch("channels:progress", {
          current: this.__device.channels.verification.channels.length + this.__device.channels.verification.start - 1,
          start: this.__device.channels.verification.start,
          end: this.__device.channels.verification.end,
          total: e - t + 1,
          verified: this.__device.channels.verification.channels.length,
          percentage: Math.min(
            100,
            Math.round(this.__device.channels.verification.channels.length / (e - t + 1) * 100)
          )
        });
      }, 500);
    });
  }
}
export {
  w as Jofemar
};
