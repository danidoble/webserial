import { Kernel } from './kernel.js';
import { Devices } from '../utils/devices.js';
import { Boardroid as BoardroidCommands } from '@danidoble/webserial-vending-commands';

export class Boardroid extends Kernel {
  __coin_purse = {
    available: true,
  };

  __banknote_purse = {
    available: true,
    isRecycler: true,
    recycler: {
      ict: true,
      banknote: 1, // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
    },
  };

  __sale = {
    price: 0,
    change: 0,
    change_verified: 0,
    dispense_all: true,
    last_change: 0,
    clear() {
      this.price = 0;
      this.change = 0;
      this.change_verified = 0;
      this.dispense_all = true;
      this.last_change = 0;
    },
  };

  __money_session = {
    inserted: 0,
    retired: 0,
    clear() {
      this.inserted = 0;
      this.retired = 0;
    },
  };

  coins = {
    tubes: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
    box: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
    totals: { g50: 0, c50: 0, p1: 0, p2: 0, p5: 0, p10: 0 },
    total: 0,
  };

  banknotes = {
    stacker: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
    recycler: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
    out: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
    totals: { p20: 0, p50: 0, p100: 0, p200: 0, p500: 0, p1000: 0 },
    total: 0,
  };

  card_reader = {
    available: false,
    max_pre_credit: 0,
  };

  #__is_matrix_test = false;
  #__active_engine_testing = 0;
  #__percentage_test_matrix = 0;

  constructor({ filters = null, config_port = null, no_device = 1 } = {}) {
    super({ filters, config_port, no_device });
    this.__internal__.device.type = 'boardroid';
    if (Devices.getCustom(this.typeDevice, no_device))
      throw new Error(`Device ${this.typeDevice} ${no_device} already exists`);
    this.__internal__.serial.config_port.baudRate = 115200;
    this.__internal__.serial.response.length = 14;
    this.__internal__.time.response_connection = 600;
    this.__internal__.time.response_general = 4_000;
    this.__internal__.time.response_engines = 15_000;
    this.__internal__.dispense.limit_counter = 15;
    this.__internal__.dispense.custom_limit_counter = null;
    this.__internal__.dispense.backup_dispense = {
      channel: 1,
      second_channel: null,
      sensor: true,
      seconds: null,
    };
    this.#registerAvailableListenersLocker();
    this.#touch();
  }

  #registerAvailableListenersLocker() {
    const _ = [
      'banknote-purse:banknote-scrow-status',
      'banknote-purse:config',
      'banknote-purse:event-banknote',
      'banknote-purse:read-memory',
      'banknote-purse:recycler',
      'banknote-purse:save-memory',
      'card-reader:event',
      'change:pending',
      'change:dispense',
      'coin-purse:coin-event',
      'coin-purse:config',
      'coin-purse:reject-lever',
      'coin-purse:reset',
      'coin-purse:tubes',
      'percentage:test',
      'run:default-load',
      'session:money-dispensed',
      'session:money-request',
      'event:door',
      'door:event',
      'status:relay',
      'status:temperature',
    ];
    for (const event of _) {
      this.serialRegisterAvailableListener(event);
    }
  }

  get totalInTubes() {
    return (
      this.coins.tubes.g50 * 0.5 +
      this.coins.tubes.c50 * 0.5 +
      this.coins.tubes.p1 +
      this.coins.tubes.p2 * 2 +
      this.coins.tubes.p5 * 5 +
      this.coins.tubes.p10 * 10
    );
  }

  get totalInRecycler() {
    return (
      this.banknotes.recycler.p20 * 20 +
      this.banknotes.recycler.p50 * 50 +
      this.banknotes.recycler.p100 * 100 +
      this.banknotes.recycler.p200 * 200 +
      this.banknotes.recycler.p500 * 500 +
      this.banknotes.recycler.p1000 * 1000
    );
  }

  get hasRecycler() {
    return this.__banknote_purse.available && this.__banknote_purse.isRecycler;
  }

  set hasRecycler(value) {
    this.__banknote_purse.isRecycler = value;
  }

  get hasICT() {
    return this.hasRecycler && this.__banknote_purse.recycler.ict;
  }

  set hasICT(value) {
    this.__banknote_purse.recycler.ict = value;
  }

  set banknoteICT(value) {
    if (![20, 50, 100, 200, 500].includes(value)) throw new Error(`Invalid banknote value: ${value}`);
    value = [20, 50, 100, 200, 500].indexOf(value);
    this.__banknote_purse.recycler.banknote = value;
  }

  get banknoteICT() {
    return [20, 50, 100, 200, 500][this.__banknote_purse.recycler.banknote];
  }

  get hasCoinPurse() {
    return this.__coin_purse.available;
  }

  set hasCoinPurse(value) {
    if (typeof value !== 'boolean') {
      throw new Error(`Invalid value: ${value}`);
    }
    this.__coin_purse.available = value;
  }

  set price(value) {
    let price = parseFloat(value);
    if (isNaN(price) || price < 0) {
      price = 0;
    }
    this.__sale.price = price;
  }

  get price() {
    return this.__sale.price;
  }

  get change() {
    if (this.__sale.price <= 0 || this.__money_session.inserted <= this.__sale.price) return 0;

    return this.__money_session.inserted - this.__sale.price;
  }

  #touch() {
    Devices.add(this);
  }

  #isIct() {
    return this.__banknote_purse.isRecycler && this.__banknote_purse.recycler.ict;
  }

  #hasAbilitiesToReturnChange() {
    return this.hasCoinPurse || this.hasRecycler;
  }

  softReload() {
    super.softReload();
    this.__sale.clear();
    this.__money_session.clear();
  }

  #internalMessageConnected(message) {
    message.name = `Connection with the serial device completed.`;
    message.description = `Your connection with the serial device was successfully completed.`;
    message.no_code = 1;

    this.dispatch('run:default-load', {});
    return message;
  }

  #typeCoin(code) {
    const pennies = {
      g50: ['40', '50', '60', '70', '90'],
      c50: ['41', '51', '61', '71', '91'],
      p1: ['42', '52', '62', '72', '92'],
      p2: ['43', '53', '63', '73', '93'],
      p5: ['44', '54', '64', '74', '94'],
      p10: ['45', '55', '65', '75', '95'],
      p20: ['47', '57', '67', '77', '97'],
    };

    let coin = null;
    for (let key in pennies) {
      if (!pennies[key].includes(code)) continue;

      coin = key;
      break;
    }

    if (!coin) {
      return [`Undefined value: ¿${code}?`, null];
    }

    const types = {
      g50: '50 pennies (the big one)',
      c0: '50 pennies (the little one)',
      p1: '1 peso',
      p2: '2 pesos',
      p5: '5 pesos',
      p10: '10 pesos',
      p20: '20 pesos',
    };
    return [types[coin], coin];
  }

  #isCoin(type_money) {
    return ['g50', 'c50', 'p1', 'p2', 'p5', 'p10', 'p20'].includes(type_money);
  }

  #typeBanknote(code) {
    const banknotes = {
      p20: ['80', '90', 'a0', 'b0'],
      p50: ['81', '91', 'a1', 'b1'],
      p100: ['82', '92', 'a2', 'b2'],
      p200: ['83', '93', 'a3', 'b3'],
      p500: ['84', '94', 'a4', 'b4'],
      p1000: ['85', '95', 'a5', 'b5'],
    };

    let banknote = null;
    for (let key in banknotes) {
      if (!banknotes[key].includes(code)) continue;

      banknote = key;
      break;
    }

    if (!banknote) {
      return [`Undefined value: ¿${code}?`, null];
    }

    const types = {
      p20: '20 pesos',
      p50: '50 pesos',
      p100: '100 pesos',
      p200: '200 pesos',
      p500: '500 pesos',
      p1000: '1000 pesos',
    };
    return [types[banknote], banknote];
  }

  #isBanknote(type_money) {
    return ['p20', 'p50', 'p100', 'p200', 'p500', 'p1000'].includes(type_money);
  }

  #isBanknoteOut(type_money) {
    return ['r20', 'r50', 'r100'].includes(type_money);
  }

  #getTypeBanknoteOutIct() {
    const types = ['r20', 'r50', 'r100', 'r200', 'r500'];
    return types[this.__banknote_purse.recycler.banknote];
  }

  #countMoney(type_money, where_gone, type) {
    if (!type_money) return;

    let _dispatch = true;
    if (this.#isCoin(type_money) && type === 'coin') {
      if (typeof this.coins.tubes[type_money] === 'undefined') return;

      if (where_gone === 'tube') {
        this.coins.tubes[type_money] += 1;
      } else if (where_gone === 'box') {
        this.coins.box[type_money] += 1;
      }

      let inserted = 0;
      if (['g50', 'c50'].includes(type_money)) {
        inserted = 0.5;
      } else {
        inserted += parseInt(type_money.slice(1));
      }
      this.coins.totals[type_money] += inserted;
      this.__money_session.inserted += inserted;
      this.coins.total += inserted;
    } else if (this.#isBanknote(type_money) && type === 'banknote') {
      if (typeof this.banknotes.recycler[type_money] === 'undefined') return;

      if (where_gone === 'recycler') {
        this.banknotes.recycler[type_money] += 1;
      } else if (where_gone === 'stacker') {
        this.banknotes.stacker[type_money] += 1;
      }

      let inserted = parseInt(type_money.slice(1));
      this.banknotes.totals[type_money] += inserted;
      this.__money_session.inserted += inserted;
      this.banknotes.total += inserted;
    } else if (this.#isBanknoteOut(type_money) && where_gone === 'out' && type === 'banknote') {
      if (typeof this.banknotes.out[type_money.replace('r', 'p')] === 'undefined') return;

      this.banknotes.out[type_money.replace('r', 'p')] += 1;
      let retired = parseInt(type_money.slice(1));
      this.__money_session.retired += retired;
      this.banknotes.recycler[type_money.replace('r', 'p')] -= 1;
      this.banknotes.total -= retired;

      _dispatch = false;
      this.dispatch('session:money-dispensed', { type_money, retired, finish: false, type: 'banknotes' });
    }

    if (_dispatch) {
      this.dispatch('session:money-request', {});
    }
  }

  #internalMessageInsertedCoin(code, message) {
    const _decimal = parseInt(code[2], 16);

    message.name = `Coin Inserted`;
    message.no_code = 2;
    message.additional = { where: null, coin: null };

    if (_decimal === 1) {
      message.name = `Lever pressed`;
      message.description = `Reject lever`;
      message.no_code = 100;
      this.dispatch('coin-purse:reject-lever', {});
    } else if (_decimal === 2) {
      message.name = `Reset coin purse`;
      message.description = `The configuration of coin purse was reset`;
      message.no_code = 101;
      this.dispatch('coin-purse:reset', {});
    } else if (_decimal >= 64 && _decimal <= 79) {
      // 40 - 4F
      message.name = `Coin inserted in profit box`;
      message.additional.where = 'box';
    } else if (_decimal >= 80 && _decimal <= 95) {
      // 50 - 5F
      message.name = `Coin inserted in tube`;
      message.additional.where = 'tube';
    } else if (_decimal >= 96 && _decimal <= 111) {
      // 60 - 6F
      message.name = `Unused coin`;
      message.description = `Something come from coin changer but in MDB Docs is unused`;
      message.additional.where = 'unused';
    } else if (_decimal >= 112 && _decimal <= 127) {
      // 70 - 7F
      message.name = `Coin rejected`;
      message.additional.where = 'rejected';
    } else if (_decimal >= 144 && _decimal <= 159) {
      // 90 - 9F
      message.name = `Coin dispensed`;
      message.additional.where = 'out';
      message.description = `Undefined value: ¿${code[2]}?`;
    } else {
      message.name = `Coin inserted`;
      message.description = `Undefined status. Without information of this`;
      message.no_code = 400;
    }

    if (_decimal === 1 || _decimal === 2 || _decimal >= 160 || (_decimal >= 128 && _decimal <= 143)) return message;

    [message.description, message.additional.coin] = this.#typeCoin(code[2]);
    message.no_code = 38 + _decimal; // 102 - 197

    this.#countMoney(message.additional.coin, message.additional.where, 'coin');
    if (['tube', 'out'].includes(message.additional.where)) {
      this.dispatch('coin-purse:tubes', this.coins.tubes);
    }
    this.dispatch('coin-purse:coin-event', this.coins);

    return message;
  }

  #internalMessageInsertedBanknote(code, message) {
    const _decimal = parseInt(code[2], 16);

    message.name = `Banknote Inserted`;
    message.no_code = 2;
    message.additional = { where: null, banknote: null };

    if (_decimal === 42) {
      // 2A
      message.name = `Banknote dispensed`;
      message.description = `Banknote dispensed by request.`;
      message.additional.banknote = this.#getTypeBanknoteOutIct();
      message.additional.where = 'out';
      message.no_code = 200;
    } else if (_decimal >= 128 && _decimal <= 143) {
      // 80 - 8F
      message.name = `Banknote inserted`;
      message.additional.where = 'stacker';
    } else if (_decimal >= 144 && _decimal <= 159) {
      // 90 - 9F
      message.name = `Banknote inserted in pre stacker`;
      message.additional.where = 'tmp';
    } else if (_decimal >= 160 && _decimal <= 175) {
      // A0 - AF
      message.name = `Banknote rejected`;
      message.additional.where = 'nothing';
    } else if (_decimal >= 176 && _decimal <= 191) {
      // B0 - BF
      message.name = `Banknote inserted`;
      message.additional.where = 'recycler';
    }

    if (_decimal >= 128 && _decimal <= 191) {
      [message.description, message.additional.banknote] = this.#typeBanknote(code[2]);
      message.no_code = 74 + _decimal;
    }

    this.#countMoney(message.additional.banknote, message.additional.where, 'banknote');
    this.dispatch('banknote-purse:event-banknote', this.banknotes);

    return message;
  }

  #internalMessageConfigCoinPurse(code, message) {
    const _decimal = parseInt(code, 16);
    if (_decimal === 1) {
      message.name = `Coin purse enabled`;
      message.description = `Configuration complete, enabled`;
      message.no_code = 3;
    } else if (_decimal === 0) {
      message.name = `Coin purse disabled`;
      message.description = `Disabled by system request`;
      message.no_code = 4;
    } else {
      message.name = `Status unknown`;
      message.description = `The response of coin purse doesn't identify successfully`;
      message.no_code = 400;
    }

    this.dispatch('coin-purse:config', { enabled: _decimal === 1 });

    return message;
  }

  #internalMessageConfigBillPurse(code, message) {
    const _decimalN2 = parseInt(code[2], 16);
    const _decimalN3 = parseInt(code[3], 16);

    if (_decimalN2 === 0) {
      message.name = `Bill purse disabled`;
      message.description = `Configuration complete, disabled`;
    } else if (_decimalN2 === 1) {
      message.name = `Bill purse enabled`;
      message.description = `Configuration complete, enabled`;
    }

    if (_decimalN3 === 0) {
      message.additional.scrow = `Scrow disabled, banknote received automatic`;
    } else if (_decimalN3 === 1) {
      message.additional.scrow = `Scrow enabled, require manual action`;
    }
    message.no_code = 5;

    this.dispatch('banknote-purse:config', { enabled: _decimalN2 === 1, scrow: _decimalN3 === 1 });
    return message;
  }

  #internalMessageSetCoinsTubes(code, message) {
    message.no_code = 6;

    const [g50, c50, p1, p2, p5, p10] = [
      parseInt(code[2], 16),
      parseInt(code[3], 16),
      parseInt(code[4], 16),
      parseInt(code[5], 16),
      parseInt(code[6], 16),
      parseInt(code[7], 16),
    ];

    message.additional = {
      coins: { g50, c50, p1, p2, p5, p10 },
    };
    this.coins.tubes.g50 = g50;
    this.coins.tubes.c50 = c50;
    this.coins.tubes.p1 = p1;
    this.coins.tubes.p2 = p2;
    this.coins.tubes.p5 = p5;
    this.coins.tubes.p10 = p10;

    this.coins.totals.g50 = (this.coins.box.g50 + g50) * 0.5;
    this.coins.totals.c50 = (this.coins.box.c50 + c50) * 0.5;
    this.coins.totals.p1 = this.coins.box.p1 + p1;
    this.coins.totals.p2 = (this.coins.box.p2 + p2) * 2;
    this.coins.totals.p5 = (this.coins.box.p5 + p5) * 5;
    this.coins.totals.p10 = (this.coins.box.p10 + p10) * 10;

    this.coins.total =
      this.coins.totals.g50 +
      this.coins.totals.c50 +
      this.coins.totals.p1 +
      this.coins.totals.p2 +
      this.coins.totals.p5 +
      this.coins.totals.p10;

    message.name = `Read tubes`;
    message.description = `Quantity of coins approximated`;

    this.dispatch('coin-purse:tubes', this.coins.tubes);
    return message;
  }

  #internalMessageSetBillsRecycler(code, message) {
    message.no_code = 7;
    const [b20, b50, b100, b200, b500, b1000] = [
      parseInt(code[2], 16),
      parseInt(code[3], 16),
      parseInt(code[4], 16),
      parseInt(code[5], 16),
      parseInt(code[6], 16),
      parseInt(code[7], 16),
    ];
    message.additional = {
      banknotes: { b20, b50, b100, b200, b500, b1000 },
    };

    this.banknotes.recycler.p20 = b20;
    this.banknotes.recycler.p50 = b50;
    this.banknotes.recycler.p100 = b100;
    this.banknotes.recycler.p200 = b200;
    this.banknotes.recycler.p500 = b500;
    this.banknotes.recycler.p1000 = b1000;

    this.banknotes.totals.p20 = (this.banknotes.stacker.p20 + b20) * 20;
    this.banknotes.totals.p50 = (this.banknotes.stacker.p50 + b50) * 50;
    this.banknotes.totals.p100 = (this.banknotes.stacker.p100 + b100) * 100;
    this.banknotes.totals.p200 = (this.banknotes.stacker.p200 + b200) * 200;
    this.banknotes.totals.p500 = (this.banknotes.stacker.p500 + b500) * 500;
    this.banknotes.totals.p1000 = (this.banknotes.stacker.p1000 + b1000) * 1000;

    this.banknotes.total =
      this.banknotes.totals.p20 +
      this.banknotes.totals.p50 +
      this.banknotes.totals.p100 +
      this.banknotes.totals.p200 +
      this.banknotes.totals.p500 +
      this.banknotes.totals.p1000;

    message.name = `Read recycler`;
    message.description = `Quantity of banknotes approximated`;

    this.dispatch('banknote-purse:recycler', this.banknotes.recycler);
    return message;
  }

  #internalMessageStatusBanknoteScrow(code, message) {
    const _decimal = parseInt(code, 16);
    if (_decimal === 1) {
      message.name = `Banknote accepted`;
    } else if (_decimal === 0) {
      message.name = `Banknote rejected`;
    } else {
      message.name = `Unknown status banknote`;
    }
    message.no_code = 8;

    this.dispatch('banknote-purse:banknote-scrow-status', { status: _decimal === 1 });
    return message;
  }

  #internalMessageDispensedBanknotes(code, message) {
    const [b20, b50, b100, b200, b500, b1000] = [
      parseInt(code[2], 16),
      parseInt(code[3], 16),
      parseInt(code[4], 16),
      parseInt(code[5], 16),
      parseInt(code[6], 16),
      parseInt(code[7], 16),
    ];

    const total_dispensed = b20 * 20 + b50 * 50 + b100 * 100 + b200 * 200 + b500 * 500 + b1000 * 1000;

    message.name = `Banknotes dispensed`;
    message.description =
      total_dispensed > 0 ? `Banknotes dispensed by request` : `No banknotes dispensed, recycler empty`;
    message.no_code = 9;
    message.additional = {
      banknotes: { b20, b50, b100, b200, b500, b1000 },
      total_dispensed,
    };

    this.dispatch('session:money-dispensed', {
      type_money: null,
      retired: null,
      finish: false,
      type: 'banknotes',
      data: message,
    });
    return message;
  }

  #internalMessageCoinsDispensed(code, message) {
    message.name = `Coins dispensed`;
    message.no_code = 10;
    message.description = `Coins dispensed by request`;

    if (isNaN(this.__sale.last_change)) {
      this.__sale.last_change = 0;
    }
    this.__money_session.retired += this.__sale.last_change;
    this.dispatchAsync(
      'session:money-dispensed',
      {
        type_money: null,
        retired: null,
        finish: false,
        type: 'coins',
      },
      500
    );

    return message;
  }

  #internalMessageDispenseProduct(code, message) {
    const _decimal = parseInt(code, 16);
    if (_decimal === 1) {
      message.name = `Product not delivered`;
      message.description = `The product requested wasn't delivered`;
      message.no_code = 11;
      this.__internal__.dispense.status = false;
    } else if (_decimal === 0) {
      message.name = `Product delivered`;
      message.description = `The product requested was delivered`;
      message.no_code = 12;
      this.__internal__.dispense.status = true;
    } else {
      message.name = `Unknown status product`;
      message.description = `The response of product doesn't identify successfully`;
      message.no_code = 400;
      this.__internal__.dispense.status = false;
    }

    this.dispatch('dispensed', {});

    return message;
  }

  #internalMessageDoorStatus(code, message) {
    let status = 'closed';
    if (code === 'db') {
      message.name = `Door closed`;
      message.no_code = 13;
    } else if (code === 'dc') {
      message.name = `Door open`;
      message.no_code = 14;
      status = 'open';
    } else {
      message.name = `Unknown status door`;
      message.description = `The response of door doesn't identify successfully`;
      message.no_code = 400;
      status = 'unknown';
    }

    this.__internal__.device.door_open = status === 'open';
    this.dispatch('event:door', { open: status === 'open' });
    this.dispatch('door:event', { open: status === 'open' });
    return message;
  }

  #internalMessageTemperatureStatus(code, message) {
    const high = parseInt(code[2], 16) * 255;
    const low = parseInt(code[3], 16);
    const tmp = (high + low) * 0.1;

    message.no_code = 15;
    message.name = `Temperature status`;
    message.description = `Temperature: ${tmp}`;
    message.additional = {
      high,
      low,
      temperature: parseFloat(tmp.toString()),
    };

    this.dispatch('status:temperature', message.additional);
    return message;
  }

  #internalMessageRelayStatus(code, message) {
    const _decimal = parseInt(code, 16);
    let status = 'unknown';
    if (_decimal === 1) {
      message.name = `Relay on`;
      message.description = `Relay on`;
      message.no_code = 16;
      status = 'on';
    } else if (_decimal === 0) {
      message.name = `Relay off`;
      message.description = `Relay off`;
      message.no_code = 17;
      status = 'off';
    } else {
      message.name = `Status unknown`;
      message.description = `Status unknown`;
      message.no_code = 400;
    }

    this.dispatch('status:relay', { enabled: status === 'on' });
    return message;
  }

  #internalMessageCardReader(code, message) {
    // [2] => status
    // [3] => selection
    // [4] => selection_aux
    // [5] => time dispense
    // [6] => price >> 8
    // [7] => price >> 0
    // [8] => status dispense, 0 = dispensed, 1 = not dispensed
    const _decimal = parseInt(code[2], 16);
    message.no_code = 20 + _decimal;

    message.name = `Status unknown`;
    message.description = `The status of card reader does not identified correctly`;

    if (_decimal === 0) {
      message.request += ':disable';
      message.name = `Card reader disabled`;
      message.description = `Card reader device was disabled successfully`;
    } else if (_decimal === 1 || _decimal === 2) {
      message.request += ':dispense';
      message.name = `Card reader enabled`;
      message.description = `Card reader device is now enabled`;
    } else if (_decimal === 3) {
      message.request += ':pre-authorize';
      message.name = `Pre-authorized credit`;
      message.description = `The pre credit was authorized successfully`;
    } else if (_decimal === 4) {
      message.request += ':cancel';
      message.name = `Cancellation in progress`;
      message.description = `Cancellation request done successfully`;
    } else if (_decimal === 5) {
      message.request += ':sell';
      message.name = `Sell approved`;
      message.description = `Sell approved, starting dispense product`;
    } else if (_decimal === 6) {
      message.request += ':sell';
      message.name = `Sell denied`;
      message.description = `This sell was denied, try again`;
    } else if (_decimal === 7) {
      message.request += ':end';
      message.name = `Session ended`;
      message.description = `The session ended`;
    } else if (_decimal === 8) {
      message.request += ':cancel';
      message.name = `Cancelled`;
      message.description = `Cancellation complete`;
    } else if (_decimal === 10) {
      // end of dispense, status of dispense
      const _decimal2 = parseInt(code[8], 16);
      if (_decimal2 === 1) {
        message.no_code = 30;
        message.name = `product not dispensed`;
        message.description = `The product requested wasn't delivered`;
      } else if (_decimal2 === 0) {
        message.no_code = 31;
        message.name = `product dispensed`;
        message.description = `The product requested was delivered`;
      } else {
        message.name = `finished-unknown`;
        message.no_code = 400;
      }
    } else {
      message.no_code = 400;
    }

    this.dispatch('card-reader:event', message);

    return message;
  }

  serialMessage(code) {
    let message = {
      code,
      name: null,
      description: null,
      request: null,
      no_code: 0,
    };

    const no_device = (5 + this.deviceNumber).toString(16).padStart(2, '0').toLowerCase();
    switch (code[1]) {
      case no_device:
        message.request = `connect`;
        message = this.#internalMessageConnected(message);
        break;
      case 'a0':
        message.request = `--automatic`;
        message = this.#internalMessageInsertedCoin(code, message);
        break;
      case 'b0':
        message.request = `--automatic`;
        message = this.#internalMessageInsertedBanknote(code, message);
        break;
      case 'd0':
        message.request = `coin-purse:config`;
        message = this.#internalMessageConfigCoinPurse(code[2], message);
        break;
      case 'd1':
        message.request = `banknote-purse:config`;
        message.additional = { scrow: null };
        message = this.#internalMessageConfigBillPurse(code, message);
        break;
      case 'd2':
        message.request = `coin-purse:read-tubes`;
        message = this.#internalMessageSetCoinsTubes(code, message);
        break;
      case 'd3':
        message.request = `banknote-purse:read-recycler`;
        message = this.#internalMessageSetBillsRecycler(code, message);
        break;
      case 'd4':
        message.request = `banknote-purse:banknote-scrow-status`;
        message = this.#internalMessageStatusBanknoteScrow(code[2], message);
        break;
      case 'd5':
        message.request = `banknote-purse:dispense`;
        message = this.#internalMessageDispensedBanknotes(code, message);
        break;
      case 'd6':
        message.request = `coin-purse:dispense`;
        message = this.#internalMessageCoinsDispensed(code, message);
        break;
      case 'd7':
        message.request = `dispense`;
        message = this.#internalMessageDispenseProduct(code[5], message);
        break;
      case 'd8':
        message.request = `--automatic`;
        message = this.#internalMessageDoorStatus(code[13], message);
        break;
      case 'd9':
        message.request = `status:temperature`;
        message = this.#internalMessageTemperatureStatus(code, message);
        break;
      case 'da':
        message.request = 'status:relay';
        message = this.#internalMessageRelayStatus(code[2], message);
        break;
      case 'db':
        message.request = `banknote-purse:save-memory`;
        message.no_code = 18;
        message.name = `Bill purse memory saved?`;
        message.description = `The memory of bill purse was saved successfully?`;
        this.dispatch('banknote-purse:save-memory', { message });
        break;
      case 'dc':
        message.request = `coin-purse:read-memory`;
        message.no_code = 19;
        message.name = `Coin purse memory read?`;
        message.description = `The memory of coin purse was read successfully?`;
        this.dispatch('banknote-purse:read-memory', { message });
        break;
      case 'dd':
        message.request = `card-reader`;
        this.#internalMessageCardReader(code, message);
        break;
      default:
        message.request = `--unknown`;
        message.name = `Response unrecognized`;
        message.description = `The response of application was received, but dont identify with any of current parameters`;
        message.no_code = 400;
        this.dispatch('unknown', message);
        break;
    }

    this.dispatch('serial:message', message);
  }

  serialSetConnectionConstant(listen_on_port = 1) {
    return BoardroidCommands.connection({ channel: listen_on_port });
  }

  async coinPurseConfigure({ enable = false, high = 'FF', low = 'FF' } = {}) {
    if (!this.__coin_purse.available) throw new Error('Coin purse not available');
    high = this.hexToDec(high);
    low = this.hexToDec(low);
    return await this.appendToQueue(
      BoardroidCommands.coinPurseConfiguration({ enable, high, low }),
      'coin-purse:config'
    );
  }

  async coinPurseEnable() {
    await this.coinPurseConfigure({ enable: true });
  }

  async coinPurseDisable() {
    await this.coinPurseConfigure({ enable: false });
  }

  async coinPurseDispense({ $_50c = 0, $_1 = 0, $_2 = 0, $_5 = 0, $_10 = 0 } = {}) {
    if (!this.__coin_purse.available) throw new Error('Coin purse not available');

    return await this.appendToQueue(
      BoardroidCommands.coinPurseDispense({
        $50c: $_50c,
        $1: $_1,
        $2: $_2,
        $5: $_5,
        $10: $_10,
      }),
      'coin-purse:dispense'
    );
  }

  async coinPurseReadTubes() {
    return await this.appendToQueue(BoardroidCommands.coinPurseReadTubes(), 'coin-purse:read-tubes');
  }

  #banknotePurseICTConfigure({ enable = false, scrow = false } = {}) {
    return BoardroidCommands.banknotePurseICTConfigure({ enable, scrow });
  }

  #banknotePurseOtherConfigure({ enable = false, scrow = false } = {}) {
    return BoardroidCommands.banknotePurseOtherConfigure({ enable, scrow });
  }

  async banknotePurseConfigure({ enable = false, scrow = false } = {}) {
    if (!this.__banknote_purse.available) throw new Error('Banknote purse not available');

    let bytes;
    if (this.#isIct()) {
      bytes = this.#banknotePurseICTConfigure({ enable, scrow });
    } else {
      bytes = this.#banknotePurseOtherConfigure({ enable, scrow });
    }

    return await this.appendToQueue(bytes, 'banknote-purse:config');
  }

  #banknotePurseIctDispense(quantity = 1) {
    if (quantity < 1) throw new Error('No banknotes to dispense');
    // 0: $20, 1: $50, 2: $100, 3: $200, 4: $500
    const denomination = [20, 50, 100, 200, 500][this.__banknote_purse.recycler.banknote];
    return BoardroidCommands.banknotePurseICTDispense({ quantity, denomination });
  }

  #banknotePurseOtherDispense({ $_20 = 0, $_50 = 0, $_100 = 0, $_200 = 0, $_500 = 0, $_1000 = 0 } = {}) {
    return BoardroidCommands.banknotePurseOtherDispense({
      $20: $_20,
      $50: $_50,
      $100: $_100,
      $200: $_200,
      $500: $_500,
      $1000: $_1000,
    });
  }

  async banknotePurseDispense({ $_20 = 0, $_50 = 0, $_100 = 0, $_200 = 0, $_500 = 0, $_1000 = 0 } = {}) {
    if (!this.__banknote_purse.available) throw new Error('Banknote purse not available');
    if (!this.__banknote_purse.isRecycler) throw new Error('Banknote purse is not recycler');

    let bytes;
    if (this.#isIct()) {
      const bill = [$_20, $_50, $_100, $_200, $_500];
      bytes = this.#banknotePurseIctDispense(bill[this.__banknote_purse.recycler.banknote]);
    } else {
      bytes = this.#banknotePurseOtherDispense({ $_20, $_50, $_100, $_200, $_500, $_1000 });
    }

    await this.appendToQueue(bytes, 'banknote-purse:dispense');
  }

  async banknotePurseEnable({ scrow = false }) {
    return await this.banknotePurseConfigure({ enable: true, scrow });
  }

  async banknotePurseDisable() {
    return await this.banknotePurseConfigure({ enable: false });
  }

  async banknotePurseAcceptInScrow() {
    if (!this.__banknote_purse.available) throw new Error('Banknote purse not available');
    return await this.appendToQueue(
      BoardroidCommands.banknotePurseAcceptInScrow(),
      'banknote-purse:banknote-scrow-status'
    );
  }

  async banknotePurseRejectInScrow() {
    if (!this.__banknote_purse.available) throw new Error('Banknote purse not available');
    return await this.appendToQueue(
      BoardroidCommands.banknotePurseRejectInScrow(),
      'banknote-purse:banknote-scrow-status'
    );
  }

  async banknotePurseSaveMemory({
    channel = null,
    $_20 = null,
    $_50 = null,
    $_100 = null,
    $_200 = null,
    $_500 = null,
    $_1000 = null,
  } = {}) {
    if (!this.__banknote_purse.available) throw new Error('Banknote purse not available');

    return await this.appendToQueue(
      BoardroidCommands.banknotePurseSaveMemory({
        channel: channel,
        $20: $_20,
        $50: $_50,
        $100: $_100,
        $200: $_200,
        $500: $_500,
        $1000: $_1000,
      }),
      'banknote-purse:save-memory'
    );
  }

  async banknotePurseReadRecycler() {
    if (!this.__banknote_purse.available) throw new Error('Banknote purse not available');
    if (!this.__banknote_purse.isRecycler) throw new Error('Banknote purse is not recycler');
    return await this.appendToQueue(BoardroidCommands.banknotePurseReadRecycler(), 'banknote-purse:read-recycler');
  }

  async cardReaderDisable() {
    if (!this.card_reader.available) throw new Error('Card reader not available');
    return await this.appendToQueue(BoardroidCommands.cardReaderDisable(), 'card-reader:disable');
  }

  async cardReaderDispense({ channel = 1, second_channel = null, sensor = true, seconds = null, price = 0 } = {}) {
    if (!this.card_reader.available) throw new Error('Card reader not available');
    if (isNaN(this.card_reader.max_pre_credit) || this.card_reader.max_pre_credit === 0) {
      this.card_reader.max_pre_credit = price;
      // throw new Error('Card reader pre-credit not configured');
    }
    if (isNaN(price) || price <= 0) throw new Error('Price must be greater than 0');
    if (price > this.card_reader.max_pre_credit) throw new Error('Price is greater than pre-credit configured');
    if (!sensor && (seconds === null || seconds <= 0 || seconds > 40.0)) {
      throw new Error('Invalid time to dispense without sensor, must be between 0.1 and 40.0 seconds');
    }

    return this.appendToQueue(
      BoardroidCommands.cardReaderDispense({
        selection: channel,
        second_selection: second_channel,
        sensor,
        seconds,
        price,
      }),
      'card-reader:dispense'
    );
  }

  async paymentPursesDisable({ coin = true, banknote = true, cardReader = false } = {}) {
    if (coin && this.__coin_purse.available) await this.coinPurseDisable();
    if (banknote && this.__banknote_purse.available) await this.banknotePurseDisable();
    if (cardReader && this.card_reader.available) await this.cardReaderDisable();
  }

  async paymentPursesEnable({ coin = true, banknote = true, scrowBanknote = false } = {}) {
    if (coin && this.__coin_purse.available) await this.coinPurseEnable();
    if (banknote && this.__banknote_purse.available) await this.banknotePurseEnable({ scrow: scrowBanknote });
  }

  async coolingRelayConfigure({ enable = false } = {}) {
    return await this.appendToQueue(BoardroidCommands.coolingRelayConfigure({ enable }), 'status:relay');
  }

  async coolingRelayEnable() {
    return await this.coolingRelayConfigure({ enable: true });
  }

  async coolingRelayDisable() {
    return await this.coolingRelayConfigure({ enable: false });
  }

  async readTemperature() {
    return await this.appendToQueue(BoardroidCommands.readTemperature(), 'status:temperature');
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
  async dispense({ selection = 1, second_selection = null, sensor = true, seconds = null, retry = true } = {}) {
    selection = parseInt(selection);

    if (isNaN(selection) || selection < 1 || selection > 80) throw new Error('Invalid channel number');
    if (null !== second_selection && (second_selection < 1 || second_selection > 80 || second_selection === selection))
      throw new Error('Invalid second channel number');
    if (!sensor && (seconds === null || seconds <= 0 || seconds > 40.0))
      throw new Error('Invalid time to dispense without sensor, must be between 0.1 and 40.0 seconds');

    if (retry) {
      this.__internal__.dispense.backup_dispense = {
        selection,
        second_selection,
        sensor,
        seconds,
      };
    }

    const bytes = BoardroidCommands.dispense({
      selection,
      second_selection,
      sensor,
      seconds,
    });
    if (!sensor) {
      if (!seconds) seconds = 1.5;

      this.__internal__.dispense.custom_limit_counter = seconds + 0.2;
    }
    let r = await this.internalDispense(bytes);
    if (!r.dispensed && retry) {
      r = await this.internalDispense(bytes);
    }
    this.__internal__.dispense.custom_limit_counter = null;
    return r;
  }

  #resetTestMatrix() {
    this.#__is_matrix_test = false;
    this.#__active_engine_testing = 0;
    this.#__percentage_test_matrix = 0;
  }

  /**
   *
   * @param {null|object} dispensed
   * @param {number} limit
   */
  #percentageTestMatrix({ dispensed = null, limit = 80 } = {}) {
    this.#__percentage_test_matrix = Math.round((this.#__active_engine_testing * 100) / limit);
    this.dispatch('percentage:test', { percentage: this.#__percentage_test_matrix, dispensed });
  }

  async testEngines({ singleEngine = false } = {}) {
    if (this.isDispensing) throw new Error('Another dispensing process is running');
    if (this.#__is_matrix_test) throw new Error('Another test is running');

    this.#resetTestMatrix();
    this.#__is_matrix_test = true;
    const dispensed = [];
    this.#percentageTestMatrix();

    for (let i = 1; i <= 80; i++) {
      const tmp = await this.dispense({
        selection: i,
        second_selection: singleEngine ? null : i + 1,
        sensor: false,
        seconds: 0.4,
        retry: false,
      });
      dispensed.push(tmp);
      this.#__active_engine_testing = i;
      this.#percentageTestMatrix();
      if (!singleEngine) {
        i++;
      }
    }
    this.#__active_engine_testing = 80;
    this.#percentageTestMatrix({ dispensed });
    this.#resetTestMatrix();
  }

  async sendCustomCode({ code = [] } = {}) {
    if (code.length === 0) throw new Error('Invalid code');
    return await this.appendToQueue(BoardroidCommands.customCode(code), 'custom');
  }

  #internalBanknotesChangeToReturnWithIct(change) {
    // Only can return banknotes of one denomination
    const banknotes = ['20', '50', '100', '200', '500'];
    const banknoteIndex = this.__banknote_purse.recycler.banknote;
    const banknoteName = '$_' + banknotes[banknoteIndex];
    const banknoteValue = parseInt(banknotes[banknoteIndex]);
    const maxBanknotesAvailable = this.banknotes.recycler[`p${banknotes[banknoteIndex]}`]; // Número máximo disponible
    const toDispense = Math.min(Math.floor(change / banknoteValue), maxBanknotesAvailable);

    const data = {
      banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
      pending: change,
      will_dispense: toDispense > 0,
    };

    if (this.totalInRecycler === 0 || toDispense < 1 || change === 0) return data;

    data.banknotes[banknoteName] = toDispense;
    data.pending = parseFloat((change - toDispense * banknoteValue).toFixed(2));
    return data;
  }

  #internalBanknotesChangeToReturnWithOther(change) {
    const data = {
      banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
      pending: change,
      will_dispense: false,
    };

    if (this.totalInRecycler === 0 || change === 0) return data;

    const calculateBanknotes = (denomination, key) => {
      if (this.banknotes.recycler[key] > 0) {
        const maxBanknotes = Math.floor(data.pending / denomination);
        const banknotesToUse = Math.min(maxBanknotes, this.banknotes.recycler[key]);
        data.banknotes[`$_${denomination}`] = banknotesToUse;
        data.pending = parseFloat((data.pending - banknotesToUse * denomination).toFixed(2));
      }
    };

    // Procesa las denominaciones de mayor a menor
    calculateBanknotes(1000, 'p1000');
    calculateBanknotes(500, 'p500');
    calculateBanknotes(200, 'p200');
    calculateBanknotes(100, 'p100');
    calculateBanknotes(50, 'p50');
    calculateBanknotes(20, 'p20');

    data.will_dispense = Object.values(data.banknotes).some((count) => count > 0);

    return data;
  }

  #internalBanknotesChangeToReturn(change) {
    if (!this.hasRecycler) {
      return {
        banknotes: { $_20: 0, $_50: 0, $_100: 0, $_200: 0, $_500: 0, $_1000: 0 },
        pending: change,
        will_dispense: false,
      };
    }

    if (this.#isIct()) return this.#internalBanknotesChangeToReturnWithIct(change);

    return this.#internalBanknotesChangeToReturnWithOther(change);
  }

  #internalCoinsChangeToReturn(change) {
    const data = {
      coins: { $_50c: 0, $_1: 0, $_2: 0, $_5: 0, $_10: 0 },
      pending: change,
      will_dispense: false,
    };
    if (!this.hasCoinPurse) return data;
    if (change <= 0 || this.totalInTubes === 0) return data;

    const calculateChange = (denomination, tubeKey, denominationName = null) => {
      if (this.coins.tubes[tubeKey] > 0) {
        if (denominationName === null) {
          denominationName = '$_' + denomination;
        }
        const maxCoins = Math.floor(data.pending / denomination);
        const coinsToUse = Math.min(maxCoins, this.coins.tubes[tubeKey]);
        data.coins[denominationName] = coinsToUse;
        data.pending = parseFloat((data.pending - coinsToUse * denomination).toFixed(2));
      }
    };

    calculateChange(10, 'p10');
    calculateChange(5, 'p5');
    calculateChange(2, 'p2');
    calculateChange(1, 'p1');
    calculateChange(0.5, 'g50', '$_50c');

    data.will_dispense = Object.values(data.coins).some((count) => count > 0);

    return data;
  }

  hasToReturnChange(money = 0) {
    let change = money;
    if (change <= 0) return true;
    const recycler_change = this.#internalBanknotesChangeToReturn(change);
    change = recycler_change.pending;
    const coins_change = this.#internalCoinsChangeToReturn(change);
    change = coins_change.pending;
    return !(change > 0);
  }

  async #internalReturnChange(custom_change = null) {
    if (!this.#hasAbilitiesToReturnChange()) throw new Error('Change not available');
    let original_change = this.change;
    let change = this.change;
    if (custom_change !== null) {
      original_change = custom_change;
      change = custom_change;
    }
    if (change <= 0) return false;

    const recycler_change = this.#internalBanknotesChangeToReturn(change);
    change = recycler_change.pending;
    const coins_change = this.#internalCoinsChangeToReturn(change);
    change = coins_change.pending;

    if (change > 0) {
      this.dispatch('change:pending', { pending: change });
    }
    this.dispatch('change:dispense', {
      recycler: recycler_change.banknotes,
      coins: coins_change.coins,
      pending: change,
      delivery: original_change - change,
    });

    if (change === original_change) {
      return false;
    }

    if (recycler_change.will_dispense) {
      await this.banknotePurseDispense(recycler_change.banknotes);
    }

    if (coins_change.will_dispense) {
      await this.coinPurseDispense(coins_change.coins);
    }

    return true;
  }

  async returnChange() {
    return await this.#internalReturnChange();
  }

  async returnInsertedMoney() {
    if (this.__money_session.inserted <= 0) return false;
    return await this.#internalReturnChange(this.__money_session.inserted);
  }

  async serialCorruptMessage(data, message) {
    this.dispatch('corrupt:message', { data, message });
  }
}
