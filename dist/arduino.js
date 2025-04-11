var c = (s) => {
  throw TypeError(s);
};
var p = (s, n, e) => n.has(s) || c("Cannot " + e);
var h = (s, n, e) => n.has(s) ? c("Cannot add the same private member more than once") : n instanceof WeakSet ? n.add(s) : n.set(s, e);
var o = (s, n, e) => (p(s, n, "access private method"), e);
import { K as _, c as d } from "./kernel-B15wfB2x.js";
var a, l, u;
class m extends _ {
  constructor({ filters: e = null, config_port: r = null, no_device: i = 1 } = {}) {
    super({ filters: e, config_port: r, no_device: i });
    h(this, a);
    if (this.__internal__.device.type = "arduino", d.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.time.response_connection = 2e3, this.__internal__.time.response_general = 2e3, this.__internal__.serial.delay_first_connection = 1e3, o(this, a, u).call(this), o(this, a, l).call(this), this.getResponseAsString();
  }
  serialMessage(e) {
    const r = this.stringToArrayHex(e), i = this.stringToArrayBuffer(e), t = {
      original_code: r,
      arrayBuffer: i,
      code: null,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    switch (t.code = e, e) {
      case "connected":
        t.name = "connected", t.description = "Connection established", t.request = "connect", t.no_code = 100;
        break;
      case "created by danidoble":
        t.name = "thanks", t.description = "thanks for using this software", t.request = "credits", t.no_code = 101;
        break;
      case "hello there":
        t.name = "hello there", t.description = "hi human", t.request = "hi", t.no_code = 102;
        break;
      case "ara ara":
        t.name = "ara ara", t.description = "troll", t.request = "ara ara", t.no_code = 404;
        break;
      default:
        t.name = "unknown", t.description = "Unknown command", t.request = "unknown", t.no_code = 400;
        break;
    }
    this.dispatch("serial:message", t);
  }
  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(e = 1) {
    return this.add0x(this.parseStringToBytes("CONNECT"));
  }
  async sayCredits() {
    const e = this.parseStringToBytes("CREDITS");
    await this.appendToQueue(e, "credits");
  }
  async sayHi() {
    const e = this.parseStringToBytes("HI");
    await this.appendToQueue(e, "hi");
  }
  async sayAra() {
    const e = this.parseStringToBytes("OTHER");
    await this.appendToQueue(e, "ara");
  }
  async sendCustomCode({ code: e = "" } = {}) {
    if (typeof e != "string") throw new Error("Invalid string");
    const r = this.parseStringToBytes(e);
    await this.appendToQueue(r, "custom");
  }
  async doSomething() {
    await this.sayCredits(), await this.sayAra(), await this.sayHi();
  }
}
a = new WeakSet(), l = function() {
  d.add(this);
}, u = function() {
};
export {
  m as Arduino
};
