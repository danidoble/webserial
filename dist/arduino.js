var c = (n) => {
  throw TypeError(n);
};
var p = (n, s, t) => s.has(n) || c("Cannot " + t);
var d = (n, s, t) => s.has(n) ? c("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(n) : s.set(n, t);
var h = (n, s, t) => (p(n, s, "access private method"), t);
import { K as _ } from "./kernel-XY8jLkNB.js";
import { i } from "./relay-Dop4mFk-.js";
import { h as l } from "./webserial-core-DGKQCs5a.js";
var r, u;
class f extends _ {
  constructor({ filters: t = null, config_port: o = null, no_device: a = 1 } = {}) {
    super({ filters: t, config_port: o, no_device: a });
    d(this, r);
    if (this.__internal__.device.type = "arduino", l.getCustom(this.typeDevice, a))
      throw new Error(`Device ${this.typeDevice} ${a} already exists`);
    this.__internal__.time.response_connection = 2e3, this.__internal__.time.response_general = 2e3, this.__internal__.serial.delay_first_connection = 1e3, h(this, r, u).call(this), l.add(this), this.getResponseAsString();
  }
  serialMessage(t) {
    const o = this.stringToArrayHex(t), a = this.stringToArrayBuffer(t), e = {
      original_code: o,
      arrayBuffer: a,
      code: null,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    switch (e.code = t, t) {
      case "connected":
        e.name = "connected", e.description = "Connection established", e.request = "connect", e.no_code = 100;
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
  serialSetConnectionConstant(t = 1) {
    return i.connection(t);
  }
  async sayCredits() {
    await this.appendToQueue(i.credits(), "credits");
  }
  async sayHi() {
    await this.appendToQueue(i.hi(), "hi");
  }
  async sayAra() {
    await this.appendToQueue(i.ara(), "ara");
  }
  async sendCustomCode({ code: t = "" } = {}) {
    if (typeof t != "string") throw new Error("Invalid string");
    await this.appendToQueue(this.parseStringToTextEncoder(t), "custom");
  }
  async doSomething() {
    await this.sayCredits(), await this.sayAra(), await this.sayHi();
  }
}
r = new WeakSet(), u = function() {
};
export {
  f as Arduino
};
