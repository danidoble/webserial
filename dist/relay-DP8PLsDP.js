const g = (i) => {
  if (i instanceof Uint8Array)
    return i;
  if (Array.isArray(i))
    return new Uint8Array(i);
  if (typeof i == "string")
    return new TextEncoder().encode(i);
  if (i instanceof ArrayBuffer)
    return new Uint8Array(i);
  throw new Error("Unsupported data type");
}, P = ({
  data: i,
  asString: e = !0
}) => e ? Array.from(i).map((n) => n.toString(16).padStart(2, "0")).join(" ") : Array.from(i).map((n) => n.toString(16).padStart(2, "0"));
var F = Object.defineProperty, L = (i, e, n) => e in i ? F(i, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[e] = n, S = (i, e, n) => L(i, typeof e != "symbol" ? e + "" : e, n);
const f = class d {
  build(e) {
    return g(e + d.append);
  }
  static connection() {
    return d.instance.build("CONNECT");
  }
  static connect() {
    return d.connection();
  }
  static credits() {
    return d.instance.build("CREDITS");
  }
  static hi() {
    return d.instance.build("HI");
  }
  static ara() {
    return d.instance.build("ARA");
  }
  static custom(e) {
    return d.instance.build(e);
  }
};
S(f, "append", `
`), S(f, "instance");
let k = f;
k.instance = new k();
var H = Object.defineProperty, B = (i, e, n) => e in i ? H(i, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[e] = n, I = (i, e, n) => B(i, typeof e != "symbol" ? e + "" : e, n);
const b = class c {
  build(e) {
    return c.asHex ? P({ data: e, asString: !1 }) : g(e);
  }
  serialBoardroidSumHex(e) {
    let n = 0;
    for (let a = 0; a < e.length; a++)
      a === 0 || a === 11 || (n += e[a]);
    return n;
  }
  boardroidCheckSum(e) {
    return e[11] = this.serialBoardroidSumHex(e), e;
  }
  static connection({ channel: e = 1 } = {}) {
    const n = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        5 + e,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        242,
        248
      ])
    );
    return c.instance.build(n);
  }
  static coinPurseConfiguration({
    enable: e = !1,
    high: n = 255,
    low: a = 255
  } = {}) {
    const t = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        193,
        e ? 1 : 0,
        n,
        a,
        0,
        0,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(t);
  }
  static coinPurseDispense({ $50c: e = 0, $1: n = 0, $2: a = 0, $5: t = 0, $10: s = 0 } = {}) {
    if ([e, n, a, t, s].some(
      (u) => isNaN(u) || typeof u == "string"
    ))
      throw new Error("One of the values is not a number");
    if (e < 1 && n < 1 && a < 1 && t < 1 && s < 1)
      throw new Error("No coins to dispense");
    const o = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        198,
        e,
        n,
        a,
        t,
        s,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(o);
  }
  static coinPurseReadTubes() {
    const e = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        194,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(e);
  }
  static banknotePurseICTConfigure({ enable: e = !1, scrow: n = !1 } = {}) {
    const a = e ? 255 : 0, t = n ? 255 : 0, s = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        192,
        a,
        a,
        t,
        t,
        0,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(s);
  }
  static banknotePurseOtherConfigure({ enable: e = !1, scrow: n = !1 } = {}) {
    const a = e ? 1 : 0, t = n ? 1 : 0, s = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        192,
        a,
        t,
        0,
        0,
        0,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(s);
  }
  static banknotePurseICTDispense({
    quantity: e = 1,
    denomination: n = 20
  }) {
    if (e < 1)
      throw new Error("No banknotes to dispense");
    if ([20, 50, 100, 200, 500].indexOf(n) === -1)
      throw new Error("Invalid denomination");
    const a = [20, 50, 100, 200, 500].indexOf(n), t = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        197,
        a,
        e,
        0,
        0,
        0,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(t);
  }
  static banknotePurseOtherDispense({
    $20: e = 0,
    $50: n = 0,
    $100: a = 0,
    $200: t = 0,
    $500: s = 0,
    $1000: o = 0
  } = {}) {
    if ([e, n, a, t, s, o].some(
      (m) => isNaN(m) || typeof m == "string"
    ))
      throw new Error("One of the values is not a number");
    if (e < 1 && n < 1 && a < 1 && t < 1 && s < 1 && o < 1)
      throw new Error("No banknotes to dispense");
    const u = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        197,
        e,
        n,
        a,
        t,
        s,
        o,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(u);
  }
  static banknotePurseAcceptInScrow() {
    const e = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        196,
        1,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(e);
  }
  static banknotePurseRejectInScrow() {
    const e = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        196,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(e);
  }
  static banknotePurseSaveMemory({
    channel: e = null,
    $20: n = null,
    $50: a = null,
    $100: t = null,
    $200: s = null,
    $500: o = null,
    $1000: u = null
  } = {
    channel: null,
    $20: null,
    $50: null,
    $100: null,
    $200: null,
    $500: null,
    $1000: null
  }) {
    if (e === null || n === null || a === null || t === null || s === null || o === null || u === null)
      throw new Error(
        "One of the values is not defined: " + JSON.stringify({
          channel: e,
          $20: n,
          $50: a,
          $100: t,
          $200: s,
          $500: o,
          $1000: u
        })
      );
    const m = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        200,
        e,
        0,
        n,
        a,
        t,
        s,
        o,
        u,
        242,
        0
      ])
    );
    return c.instance.build(m);
  }
  static banknotePurseReadRecycler() {
    const e = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        195,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        242,
        181
      ])
    );
    return c.instance.build(e);
  }
  static cardReaderDisable() {
    const e = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        205,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(e);
  }
  static cardReaderDispense({
    selection: e = 1,
    second_selection: n = null,
    sensor: a = !0,
    seconds: t = null,
    price: s = 0
  } = {
    selection: 1,
    second_selection: null,
    sensor: !0,
    seconds: null,
    price: 0
  }) {
    const o = s / 256, u = s % 256, m = e + 9;
    let p = 0;
    n && (p = n + 9);
    let E = 0;
    a || (t || (t = 1.5), E = Math.round(t * 6.2));
    const M = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        205,
        1,
        m,
        p,
        E,
        o,
        u,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(M);
  }
  static coolingRelayConfigure({ enable: e = !0 } = {}) {
    const n = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        204,
        e ? 1 : 0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(n);
  }
  static readTemperature() {
    const e = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        203,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(e);
  }
  static dispense({
    selection: e = 1,
    second_selection: n = null,
    sensor: a = !0,
    seconds: t = null
  } = {
    selection: 1,
    second_selection: null,
    sensor: !0,
    seconds: null
  }) {
    e += 9;
    const s = e;
    let o = 0;
    n && (n += 9, o = n);
    let u = 0;
    a || (t || (t = 1.5), u = Math.round(t * 6.2));
    const m = c.instance.boardroidCheckSum(
      new Uint8Array([
        241,
        199,
        s,
        o,
        u,
        0,
        0,
        0,
        0,
        0,
        242,
        0
      ])
    );
    return c.instance.build(m);
  }
  static customCode(e) {
    typeof e[0] == "string" && (e = e.map((a) => parseInt(a, 16)));
    const n = c.instance.boardroidCheckSum(
      new Uint8Array(e)
    );
    return c.instance.build(n);
  }
};
I(b, "asHex", !1), I(b, "instance");
let N = b;
N.instance = new N();
var J = Object.defineProperty, G = (i, e, n) => e in i ? J(i, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[e] = n, A = (i, e, n) => G(i, typeof e != "symbol" ? e + "" : e, n);
const w = class r {
  build(e) {
    const n = this.jofemarCheckSum(e);
    return r.asHex ? P({
      data: new Uint8Array(n),
      asString: !1
    }) : g(n);
  }
  calcCheckSums(e) {
    const n = [];
    return n.push(e & 255 | 240), n.push(e & 255 | 15), n;
  }
  jofemarCheckSum(e) {
    let n = 0;
    for (let t = 0; t < e.length; t++)
      n += e[t];
    const a = this.calcCheckSums(n);
    return e.push(a[0]), e.push(a[1]), e.push(3), new Uint8Array(e);
  }
  getTrayAndChannelBySelection(e) {
    if (e = parseInt(e) + 109, e = e.toString(), e.length !== 3)
      throw new Error("Invalid selection");
    const n = (parseInt(e.substring(0, 2)) + 128).toString(16).padStart(2, "0"), a = (parseInt(e.substring(2, 3)) + 128).toString(16).padStart(2, "0");
    return { channel: parseInt(a, 16), tray: parseInt(n, 16) };
  }
  makeDisplayMessage(e = "") {
    e = e.padEnd(32, " ");
    const n = [];
    for (let a = 0; a < 32; a++)
      n.push(e.charCodeAt(a));
    return n;
  }
  makeTimeFormat(e) {
    if (!(e instanceof Date))
      throw new Error("Invalid date, must be an instance of Date");
    const n = e.getHours().toString().padStart(2, "0"), a = e.getMinutes().toString().padStart(2, "0"), t = e.getDate().toString().padStart(2, "0"), s = (e.getMonth() + 1).toString().padStart(2, "0"), o = e.getFullYear().toString().substring(2, 4), u = `${n}:${a} ${t}-${s}-${o}`, m = [];
    for (let p = 0; p < 14; p++)
      m.push(u.charCodeAt(p));
    return m;
  }
  static connection({ channel: e = 1 } = {}) {
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      83,
      255,
      255
    ]);
  }
  static dispense({ machineChannel: e = 1, selection: n = 1, cart: a = !1 } = {
    machineChannel: 1,
    selection: 1,
    cart: !1
  }) {
    if (n = parseInt(n), isNaN(n) || n < 1 || n > 130)
      throw new Error("Invalid selection");
    const { channel: t, tray: s } = r.instance.getTrayAndChannelBySelection(n);
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      a ? 77 : 86,
      s,
      t
    ]);
  }
  static endCartDispense({ machineChannel: e = 1 } = {}) {
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      77,
      128,
      128
    ]);
  }
  static collect({ machineChannel: e = 1 } = {}) {
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      78,
      255,
      255
    ]);
  }
  static reset({ machineChannel: e = 1, type: n = "soldOut" } = {}) {
    let a = 128;
    return n === "waiting" ? a = 129 : n === "machine" && (a = 255), r.instance.build([
      2,
      48,
      48,
      128 + e,
      82,
      a,
      255
    ]);
  }
  static status({ machineChannel: e = 1 } = {}) {
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      83,
      255,
      255
    ]);
  }
  static lights({ machineChannel: e = 1, type: n = "on" } = {}) {
    const a = n === "on" ? 129 : 128;
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      76,
      a,
      255
    ]);
  }
  static program({
    machineChannel: e = 1,
    param1: n = 255,
    param2: a = 255
  } = {}) {
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      80,
      n,
      a
    ]);
  }
  static programDisplayLanguage({
    machineChannel: e = 1,
    language: n = "spanish"
  } = {}) {
    const a = { spanish: 48, english: 49, french: 50 };
    if (!a[n]) throw new Error("Invalid language");
    return r.program({
      machineChannel: e,
      param1: 73,
      param2: a[n]
    });
  }
  static programBeeper({
    machineChannel: e = 1,
    enable: n = !0
  }) {
    return r.program({
      machineChannel: e,
      param1: 90,
      param2: n ? 49 : 48
    });
  }
  static programDisableWorkingTemperature({
    machineChannel: e = 1
  }) {
    return r.program({
      machineChannel: e,
      param1: 84,
      param2: 128
    });
  }
  static programDisableThermometer({
    machineChannel: e = 1
  }) {
    return r.programDisableWorkingTemperature({ machineChannel: e });
  }
  static programWorkingTemperature({
    machineChannel: e = 1,
    degrees: n = 0.5,
    machineType: a = "esplus"
  } = {}) {
    typeof n == "string" && (n = parseFloat(n));
    const t = a === "iceplus" ? 6.5 : 32, s = a === "iceplus" ? -25 : 0.5;
    if (isNaN(n) || n < s || n > t || n % 0.5 !== 0)
      throw new Error(
        "Invalid degrees, must be a multiple of 0.5 and between 0.5 and 32"
      );
    let o = n * 2 + 128;
    return a === "iceplus" && (o += 51), o = Math.ceil(o), r.program({ param1: 84, param2: o, machineChannel: e });
  }
  static programIsolationTray({
    machineChannel: e = 1,
    tray: n = 0
  }) {
    if (typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 0 || n > 12)
      throw new Error("Invalid tray, valid range is 0 to 12");
    const a = n === 0 ? 128 : n + 139;
    return r.program({ param1: 66, param2: a, machineChannel: e });
  }
  static programTimeToStandbyAfterCollect({
    machineChannel: e = 1,
    seconds: n = 15
  } = {}) {
    if (typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 15 || n > 120)
      throw new Error("Invalid seconds, valid range is 15 to 120");
    const a = 128 + n;
    return r.program({ param1: 70, param2: a, machineChannel: e });
  }
  static programTimeToStandbyWithoutCollect({
    machineChannel: e = 1,
    minutes: n = 1
  } = {}) {
    if (typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 1 || n > 10)
      throw new Error("Invalid minutes, valid range is 1 to 10");
    const a = 128 + n;
    return r.program({ param1: 72, param2: a, machineChannel: e });
  }
  static programElevatorSpeed({
    machineChannel: e = 1,
    speed: n = "high"
  } = {}) {
    const a = { high: 49, low: 48 };
    if (!a[n])
      throw new Error("Invalid speed, valid speeds are 'high' and 'low'");
    return r.program({
      param1: 118,
      param2: a[n],
      machineChannel: e
    });
  }
  static programTemperatureExpiration({
    machineChannel: e = 1,
    enable: n = !1
  }) {
    return r.program({
      machineChannel: e,
      param1: 99,
      param2: n ? 49 : 48
    });
  }
  static programMachineAddress({
    machineChannel: e = 1,
    address: n = 1
  }) {
    if (typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 1 || n > 31)
      throw new Error("Invalid address, valid range is 1 to 31");
    return r.program({
      param1: 100,
      param2: 128 + n,
      machineChannel: e
    });
  }
  static programTemperatureBeforeExpiration({
    machineChannel: e = 1,
    degrees: n = 0.5
  }) {
    if (typeof n == "string" && (n = parseFloat(n)), isNaN(n) || n < 0.5 || n > 30 || n % 0.5 !== 0)
      throw new Error(
        "Invalid degrees, must be a multiple of 0.5 and valid range is 0.5 to 30"
      );
    const a = 128 + n * 2;
    return r.program({ param1: 101, param2: a, machineChannel: e });
  }
  static programTimeBeforeExpirationByTemperature({
    machineChannel: e = 1,
    minutes: n = 1
  }) {
    if (typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 1 || n > 120)
      throw new Error("Invalid minutes, valid range is 1 to 120");
    const a = 128 + n;
    return r.program({ param1: 102, param2: a, machineChannel: e });
  }
  static programTemperatureScale({
    machineChannel: e = 1,
    scale: n = "celsius"
  } = {}) {
    const a = { celsius: 67, fahrenheit: 70 };
    if (!a[n])
      throw new Error(
        "Invalid scale, valid scales are 'celsius' and 'fahrenheit'"
      );
    return r.program({
      param1: 103,
      param2: a[n],
      machineChannel: e
    });
  }
  static programVoltageEngine({
    machineChannel: e = 1,
    selection: n = 1,
    voltage: a = 5
  } = {}) {
    if (typeof a == "string" && (a = parseFloat(a)), typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 1 || n > 130)
      throw new Error("Invalid selection, valid range is 1 to 130");
    if (isNaN(a) || a < 5 || a > 9.5 || a % 0.5 !== 0)
      throw new Error("Invalid voltage, valid range is 5 to 9.5");
    const t = 109 + n, s = 128 + (a - 5) * 2;
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      71,
      t,
      s
    ]);
  }
  static programPushOverProducts({
    machineChannel: e = 1,
    selection: n = 1,
    enable: a = !0
  } = {}) {
    if (typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 1 || n > 130)
      throw new Error("Invalid selection, valid range is 1 to 130");
    const t = 109 + n, s = a ? 49 : 48;
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      79,
      t,
      s
    ]);
  }
  static programChannelRunningAfterDispense({
    machineChannel: e = 1,
    selection: n = 1,
    seconds: a = 0
  } = {}) {
    if (typeof n == "string" && (n = parseInt(n)), typeof a == "string" && (a = parseFloat(a)), isNaN(n) || n < 1 || n > 130)
      throw new Error("Invalid selection, valid range is 1 to 130");
    if (isNaN(a) || a < 0 || a > 10 || a % 0.1 !== 0)
      throw new Error(
        "Invalid seconds, valid range is 0.0 to 10.0 with a step of 0.1"
      );
    const t = 109 + n;
    a = 10 * parseFloat(a.toFixed(1));
    const s = 128 + a;
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      69,
      t,
      s
    ]);
  }
  static checkData({
    machineChannel: e = 1,
    type: n = 255,
    aux: a = 255
  }) {
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      67,
      n,
      a
    ]);
  }
  static getDisplayLanguage({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 73 });
  }
  static getBeeper({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 90 });
  }
  static getWorkingTemperature({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 84 });
  }
  static getIsolationTray({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 66 });
  }
  static getProgramVersion({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 80 });
  }
  static getFaults({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 83 });
  }
  static getMachineId({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 78 });
  }
  static getCurrentTemperature({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 116 });
  }
  static getTimeToStandbyAfterCollect({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 70 });
  }
  static getTimeToStandbyWithoutCollect({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 72 });
  }
  static getElevatorSpeed({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 118 });
  }
  static getTemperatureExpiration({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 99 });
  }
  static getTemperatureBeforeExpiration({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 101 });
  }
  static getTimeBeforeExpirationByTemperature({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 102 });
  }
  static getTemperatureScale({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 103 });
  }
  static getClockRegisters({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 114 });
  }
  static getMachineActivity({
    machineChannel: e = 1
  }) {
    return r.checkData({ machineChannel: e, type: 65 });
  }
  static getVoltageEngine({
    machineChannel: e = 1,
    selection: n = 1
  }) {
    if (typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 1 || n > 130)
      throw new Error("Invalid selection, valid range is 1 to 130");
    return r.checkData({
      machineChannel: e,
      type: 71,
      aux: 109 + n
    });
  }
  static getChannelPresence({ machineChannel: e = 1, selection: n = 1 } = {}) {
    if (typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 1 || n > 130)
      throw new Error("Invalid selection, valid range is 1 to 130");
    return r.checkData({
      machineChannel: e,
      type: 67,
      aux: 109 + n
    });
  }
  static getPushOverProducts({ machineChannel: e = 1, selection: n = 1 } = {}) {
    if (typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 1 || n > 130)
      throw new Error("Invalid selection, valid range is 1 to 130");
    return r.checkData({
      machineChannel: e,
      type: 79,
      aux: 109 + n
    });
  }
  static getChannelRunningAfterDispense({
    machineChannel: e = 1,
    selection: n = 1
  } = {}) {
    if (typeof n == "string" && (n = parseInt(n)), isNaN(n) || n < 1 || n > 130)
      throw new Error("Invalid selection, valid range is 1 to 130");
    return r.checkData({
      machineChannel: e,
      type: 69,
      aux: 109 + n
    });
  }
  static displayConfig({
    machineChannel: e = 1,
    type: n = 128,
    param2: a = []
  } = {}) {
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      68,
      n,
      ...a
    ]);
  }
  static setDisplayStandbyMessage({ machineChannel: e = 1, message: n = "" } = {}) {
    n = n.substring(0, 32);
    const a = r.instance.makeDisplayMessage(n);
    return r.displayConfig({
      machineChannel: e,
      type: 128,
      param2: a
    });
  }
  static setDisplayMessageTemporarily({
    machineChannel: e = 1,
    message: n = "",
    seconds: a = 1
  }) {
    if (n = n.substring(0, 32), typeof a == "string" && (a = parseInt(a)), isNaN(a) || a < 1 || a > 125)
      throw new Error("Invalid seconds, valid range is 1 to 125");
    const t = r.instance.makeDisplayMessage(n), s = 128 + a;
    return r.displayConfig({
      machineChannel: e,
      type: s,
      param2: t
    });
  }
  static setDisplayMessageUnlimited({
    machineChannel: e = 1,
    message: n = ""
  }) {
    n = n.substring(0, 32);
    const a = r.instance.makeDisplayMessage(n);
    return r.displayConfig({
      machineChannel: e,
      type: 255,
      param2: a
    });
  }
  static programClock({ machineChannel: e = 1, date: n = /* @__PURE__ */ new Date() } = {}) {
    if (!(n instanceof Date))
      throw new Error("Invalid date, must be an instance of Date");
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      114,
      ...r.instance.makeTimeFormat(n)
    ]);
  }
  static eventsConfig({
    machineChannel: e = 1,
    event: n = null,
    enable: a = !0
  } = {}) {
    if (n === null) throw new Error("Invalid event");
    const t = a ? 49 : 48;
    return r.instance.build([
      2,
      48,
      48,
      128 + e,
      65,
      n,
      t
    ]);
  }
  static eventEnable({
    machineChannel: e = 1,
    event: n = null
  } = {}) {
    if (n === null) throw new Error("Invalid event");
    const a = parseInt(n, 16);
    if (isNaN(a) || a < 38 || a > 100)
      throw new Error("Invalid event");
    return r.eventsConfig({ machineChannel: e, event: n, enable: !0 });
  }
  static eventDisable({
    machineChannel: e = 1,
    event: n = null
  } = {}) {
    if (n === null) throw new Error("Invalid event");
    const a = parseInt(n, 16);
    if (isNaN(a) || a < 38 || a > 100)
      throw new Error("Invalid event");
    return r.eventsConfig({ machineChannel: e, event: n, enable: !1 });
  }
  static sendCustomCode({ code: e = [] } = {}) {
    if (e.length < 5) throw new Error("Invalid code, minimum length is 5");
    return r.instance.build(e);
  }
};
A(w, "asHex", !1), A(w, "instance");
let D = w;
D.instance = new D();
var j = Object.defineProperty, W = (i, e, n) => e in i ? j(i, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[e] = n, T = (i, e, n) => W(i, typeof e != "symbol" ? e + "" : e, n);
const y = class h {
  serialLockerCmdMaker(e) {
    let n;
    try {
      n = new Uint8Array(e.length + 8), n.set(e, 2), n[0] = 2, n[1] = e.length + 4, n[n.length - 2] = 3;
      let a = 0;
      for (let o = 1; o < e.length; o++)
        a += e[o], a *= parseInt(Math.pow(2, o - 1).toString());
      n[e.length + 2] = a % 256, n[e.length + 3] = 666 * 3 % 256, n[e.length + 4] = 666 * 8 % 256;
      let t = 0;
      for (let o = 3; o < e.length + 5; o++)
        t += n[o];
      n[e.length + 5] = t % 256;
      let s = 0;
      for (let o = 0; o < n.length - 1; o++)
        s ^= n[o];
      n[n.length - 1] = s;
    } catch (a) {
      throw n = new Uint8Array(0), a instanceof Error ? new Error(`Error generating command: ${a.message}`) : new Error("Error generating command: Unknown error");
    }
    return n;
  }
  serialLockerHexCmd(e) {
    const n = this.serialLockerCmdMaker(e), a = [];
    for (let t = 0; t < n.length; t++) {
      const s = n[t].toString(16).padStart(2, "0");
      a.push(s);
    }
    return a;
  }
  validateCell(e = 1) {
    let n;
    if (typeof e == "string" ? n = parseInt(e) : n = e, isNaN(n) || n < 1 || n > 90) throw new Error("Invalid cell number");
    return n;
  }
  serialLockerGetStatusCellCmd({
    cell: e = 1,
    channel: n = 1
  } = {}) {
    return e = this.validateCell(e), this.build(new Uint8Array([16, n, e]));
  }
  serialLockerGetLightScanCmd({ since: e = 0, until: n = 10, channel: a = 1 } = {}) {
    return this.build(new Uint8Array([32, a, e, n]));
  }
  parseCellToColumnRow(e) {
    const n = Math.floor((e - 1) / 10) + 1;
    let a = e % 8;
    return a === 0 && (a = 8), [n, a];
  }
  serialLockerGetConfigureCellCmd({
    enable: e = !0,
    column: n = 0,
    row: a = 10,
    channel: t = 1
  } = {}) {
    if (n < 0 || n > 8) throw new Error("Invalid column number");
    if (a < 0 || a > 10) throw new Error("Invalid row number");
    let s = 1;
    return e || (s = 0), this.build(new Uint8Array([48, t, n, a, s]));
  }
  serialLockerGetOpenCmd({ cell: e = 1, channel: n = 1 } = {}) {
    e = this.validateCell(e);
    const a = 666, t = a % 256, s = Math.floor(a / 3) % 256;
    return this.build(new Uint8Array([64, n, e, t, s]));
  }
  build(e) {
    return h.asHex ? this.serialLockerHexCmd(e) : g(this.serialLockerCmdMaker(e));
  }
  static connection({ channel: e = 1 } = {}) {
    return h.instance.build(new Uint8Array([0, e]));
  }
  static openCell({ cell: e = 1, channel: n = 1 } = {}) {
    return e = h.instance.validateCell(e), h.instance.serialLockerGetOpenCmd({ cell: e, channel: n });
  }
  static statusCell({ cell: e = 1, channel: n = 1 } = {}) {
    return e = h.instance.validateCell(e), h.instance.serialLockerGetStatusCellCmd({ cell: e, channel: n });
  }
  static lightScan({ since: e = 0, until: n = 10, channel: a = 1 } = {}) {
    if (e < 0 || e > 10) throw new Error("Invalid since number");
    if (n < 0 || n > 10) throw new Error("Invalid until number");
    return h.instance.serialLockerGetLightScanCmd({
      since: e,
      until: n,
      channel: a
    });
  }
  static enableCell({ cell: e = 1, channel: n = 1 } = {}) {
    e = h.instance.validateCell(e);
    const [a, t] = h.instance.parseCellToColumnRow(e);
    return h.instance.serialLockerGetConfigureCellCmd({
      enable: !0,
      column: a,
      row: t,
      channel: n
    });
  }
  static disableCell({ cell: e = 1, channel: n = 1 } = {}) {
    e = h.instance.validateCell(e);
    const [a, t] = h.instance.parseCellToColumnRow(e);
    return h.instance.serialLockerGetConfigureCellCmd({
      enable: !1,
      column: a,
      row: t,
      channel: n
    });
  }
};
T(y, "asHex", !1), T(y, "instance");
let $ = y;
$.instance = new $();
var V = Object.defineProperty, Q = (i, e, n) => e in i ? V(i, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[e] = n, O = (i, e, n) => Q(i, typeof e != "symbol" ? e + "" : e, n);
const v = class l {
  build(e) {
    return g(e + l.append);
  }
  static connection() {
    const e = JSON.stringify({ action: "CONNECT" });
    return l.instance.build(e);
  }
  static connect() {
    return l.connection();
  }
  static custom(e) {
    if (typeof e != "string") throw new Error("Invalid string");
    return l.instance.build(e);
  }
  static readQR({ type: e = "production" } = {
    type: "production"
  }) {
    const n = JSON.stringify({
      action: "READQR",
      server: e === "production" ? "PROD" : "QA"
    });
    return l.instance.build(n);
  }
  static forceHide() {
    const e = JSON.stringify({ action: "FORCEHIDE" });
    return l.instance.build(e);
  }
  static forceShow() {
    const e = JSON.stringify({ action: "FORCESHOW" });
    return l.instance.build(e);
  }
  static makeSale({
    amount: e = 0,
    reference: n = null
  } = {}) {
    if (e <= 0) throw new Error("Invalid amount");
    if (typeof e != "number" && (e = parseFloat(e)), isNaN(e)) throw new Error("Invalid amount");
    if (n && !/^[A-Z-a-z0-9_\s]+$/g.test(n))
      throw new Error(
        "Reference must be alphanumeric and the only symbol allowed is midlescore or underscore (- _) or null"
      );
    const a = e.toFixed(2), t = JSON.stringify({
      action: "PAYMENT",
      amount: a,
      reference: n
    });
    return l.instance.build(t);
  }
  static getVoucher({ folio: e = null } = {}) {
    if (!e)
      throw new Error("Folio must be a number");
    const n = JSON.stringify({ action: "GETVOUCHER", folio: e });
    return l.instance.build(n);
  }
  static info() {
    const e = JSON.stringify({ action: "DEVICEINFO" });
    return l.instance.build(e);
  }
  static keepAlive() {
    const e = JSON.stringify({ action: "KEEPALIVE" });
    return l.instance.build(e);
  }
  static restartApp() {
    const e = JSON.stringify({ action: "RESETAPP" });
    return l.instance.build(e);
  }
  static getConfig() {
    const e = JSON.stringify({ action: "GETCONFIG" });
    return l.instance.build(e);
  }
  static hideButtons() {
    const e = JSON.stringify({ action: "HIDEBUTTONS" });
    return l.instance.build(e);
  }
  static showButtons() {
    const e = JSON.stringify({ action: "SHOWBUTTONS" });
    return l.instance.build(e);
  }
  static demo() {
    const e = JSON.stringify({ action: "DEMO" });
    return l.instance.build(e);
  }
  static refund({
    amount: e = 0,
    folio: n = null,
    auth: a = null
  } = {}) {
    if (e <= 0) throw new Error("Invalid amount");
    if (typeof e != "number" && (e = parseFloat(e)), isNaN(e)) throw new Error("Invalid amount");
    if (!n) throw new Error("Folio must be a number");
    if (!a) throw new Error("Auth must be a number");
    const t = e.toFixed(2), s = JSON.stringify({
      action: "REFUND",
      amount: t,
      folio: n,
      auth: a
    });
    return l.instance.build(s);
  }
  static exit() {
    const e = JSON.stringify({ action: "EXIT" });
    return l.instance.build(e);
  }
  static init() {
    const e = JSON.stringify({ action: "INIT" });
    return l.instance.build(e);
  }
};
O(v, "append", `\r
`), O(v, "instance");
let U = v;
U.instance = new U();
var Y = Object.defineProperty, q = (i, e, n) => e in i ? Y(i, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : i[e] = n, z = (i, e, n) => q(i, e + "", n);
const R = class C {
  build(e) {
    return e[3] = this.withChecksum(e), g(e);
  }
  withChecksum(e) {
    let n = 0;
    return e.forEach((a, t) => {
      t !== 3 && (n += a);
    }), n;
  }
  static connection(e = 1) {
    return C.instance.build([160, e, 0, 161]);
  }
  static deactivate(e = 1) {
    return C.connection(e);
  }
  static activate(e = 1) {
    return C.instance.build([160, e, 1, 162]);
  }
  static custom(e) {
    return C.instance.build(e);
  }
};
z(R, "instance");
let x = R;
x.instance = new x();
export {
  x as e,
  N as l,
  D as o,
  U as s,
  $ as u
};
