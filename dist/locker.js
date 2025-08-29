import { K as r, w as n } from "./kernel-D2dlpMca.js";
import { u as t } from "./relay-DP8PLsDP.js";
import { s as a } from "./webserial-core-l5v2UEyv.js";
class p extends r {
  #s = !1;
  #e = 0;
  #t = 0;
  constructor({ filters: s = null, config_port: e = null, no_device: i = 1, device_listen_on_port: l = 3 } = {}) {
    if (super({ filters: s, config_port: e, no_device: i, device_listen_on_port: l }), this.__internal__.device.type = "locker", a.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.time.response_engines = 1e3, this.__internal__.device.milliseconds = 666, this.__internal__.dispense.limit_counter = 1, a.add(this), this.#r();
  }
  #r() {
    const s = ["percentage:disable", "percentage:enable", "percentage:open"];
    for (const e of s)
      this.serialRegisterAvailableListener(e);
  }
  serialMessage(s) {
    s = this.fixHexArray(s);
    const e = {
      code: s,
      name: null,
      description: null,
      request: null,
      no_code: 0
    };
    switch (s[1]) {
      case "08":
        e.name = "Connection with the serial device completed.", e.description = "Your connection with the serial device was successfully completed.", e.request = "connect", e.no_code = 100;
        break;
      case "07":
        switch (s[4]) {
          case "00":
            e.name = "Cell closed.", e.description = "The selected cell is closed.", e.request = "dispense", e.no_code = 1102, this.__internal__.dispense.status = !1, this.dispatch("dispensed", {}), this.#s && this.#e >= 89 ? (e.finished_test = !0, this.#s = !1, this.#e = 0) : this.#s && (e.finished_test = !1);
            break;
          case "01":
          // cell open by status
          case "04":
            e.name = "Cell open.", e.description = "The selected cell was open successfully.", e.request = "dispense", e.no_code = 102, this.__internal__.dispense.status = !0, this.dispatch("dispensed", {}), this.#s && this.#e >= 89 ? (e.finished_test = !0, this.#s = !1, this.#e = 0) : this.#s && (e.finished_test = !1);
            break;
          case "05":
            e.name = "Cell inactive.", e.description = "The selected cell is inactive or doesn't exist.", e.request = "dispense", e.no_code = 101, this.__internal__.dispense.status = !1, this.dispatch("not-dispensed", {}), this.#s && this.#e >= 89 ? (e.finished_test = !0, this.#s = !1, this.#e = 0) : this.#s && (e.finished_test = !1);
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
  serialSetConnectionConstant(s = 3) {
    return t.connection({ channel: s });
  }
  #i() {
    this.#s = !1, this.#e = 0, this.#t = 0;
  }
  #n(s = null) {
    this.#t = Math.round(this.#e * 100 / 80), this.dispatch("percentage:open", { percentage: this.#t, dispensed: s });
  }
  #a() {
    this.#t = Math.round(this.#e * 100 / 80), this.dispatch("percentage:enable", { percentage: this.#t });
  }
  #l() {
    this.#t = Math.round(this.#e * 100 / 80), this.dispatch("percentage:disable", { percentage: this.#t });
  }
  async dispense({ cell: s = 1, status: e = !0 } = {}) {
    return setTimeout(() => {
      e === !0 ? this.#h() : this.#c();
    }, this.__internal__.time.response_engines / 2), await this.internalDispense(
      t.openCell({
        cell: s,
        channel: this.__internal__.device.listen_on_port
      })
    );
  }
  #h() {
    this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !0);
  }
  #c() {
    this.__internal__.dispense.dispensing && (this.__internal__.dispense.status = !1);
  }
  async status({ cell: s = 1 } = {}) {
    return await this.appendToQueue(
      t.statusCell({
        cell: s,
        channel: this.__internal__.device.listen_on_port
      }),
      "status"
    );
  }
  async lightScan({ since: s = 0, until: e = 10 } = {}) {
    return await this.appendToQueue(
      t.lightScan({
        channel: this.__internal__.device.listen_on_port,
        since: s,
        until: e
      }),
      "light-scan"
    );
  }
  async enable({ cell: s = 1 } = {}) {
    return await this.appendToQueue(
      t.enableCell({
        cell: s,
        channel: this.__internal__.device.listen_on_port
      }),
      "activate"
    );
  }
  async disable({ cell: s = 1 } = {}) {
    await this.appendToQueue(
      t.disableCell({
        cell: s,
        channel: this.__internal__.device.listen_on_port
      }),
      "disable"
    );
  }
  async openAll() {
    if (this.isDispensing) throw new Error("Another dispensing process is running");
    this.#i(), this.#s = !0, this.#n();
    const s = [];
    for (let e = 1; e <= 80; e++) {
      const i = await this.dispense({ cell: e, status: !0 });
      s.push(i), this.#e = e, this.#n();
    }
    this.#e = 80, this.#n(s), this.#i();
  }
  async enableAll() {
    this.#i(), this.#s = !0, this.#a();
    for (let s = 1; s <= 80; s++)
      await this.enable({ cell: s }), await n(100), this.#e = s, this.#a();
    this.#e = 80, this.#a(), this.#i();
  }
  async disableAll() {
    this.#i(), this.#s = !0, this.#l();
    for (let s = 1; s <= 80; s++)
      await this.disable({ cell: s }), await n(100), this.#e = s, this.#l();
    this.#e = 80, this.#l(), this.#i();
  }
}
export {
  p as Locker
};
