import { K as mi, a as yi, D as le, i as z, b as fe, w as pe } from "./kernel-DkC7Kj3m.js";
var bi = "0123456789abcdefghijklmnopqrstuvwxyz";
function G(n) {
  return bi.charAt(n);
}
function Pi(n, t) {
  return n & t;
}
function St(n, t) {
  return n | t;
}
function de(n, t) {
  return n ^ t;
}
function _e(n, t) {
  return n & ~t;
}
function vi(n) {
  if (n == 0)
    return -1;
  var t = 0;
  return (n & 65535) == 0 && (n >>= 16, t += 16), (n & 255) == 0 && (n >>= 8, t += 8), (n & 15) == 0 && (n >>= 4, t += 4), (n & 3) == 0 && (n >>= 2, t += 2), (n & 1) == 0 && ++t, t;
}
function Ei(n) {
  for (var t = 0; n != 0; )
    n &= n - 1, ++t;
  return t;
}
var ht = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", qe = "=";
function yt(n) {
  var t, e, i = "";
  for (t = 0; t + 3 <= n.length; t += 3)
    e = parseInt(n.substring(t, t + 3), 16), i += ht.charAt(e >> 6) + ht.charAt(e & 63);
  for (t + 1 == n.length ? (e = parseInt(n.substring(t, t + 1), 16), i += ht.charAt(e << 2)) : t + 2 == n.length && (e = parseInt(n.substring(t, t + 2), 16), i += ht.charAt(e >> 2) + ht.charAt((e & 3) << 4)); (i.length & 3) > 0; )
    i += qe;
  return i;
}
function ge(n) {
  var t = "", e, i = 0, r = 0;
  for (e = 0; e < n.length && n.charAt(e) != qe; ++e) {
    var s = ht.indexOf(n.charAt(e));
    s < 0 || (i == 0 ? (t += G(s >> 2), r = s & 3, i = 1) : i == 1 ? (t += G(r << 2 | s >> 4), r = s & 15, i = 2) : i == 2 ? (t += G(r), t += G(s >> 2), r = s & 3, i = 3) : (t += G(r << 2 | s >> 4), t += G(s & 15), i = 0));
  }
  return i == 1 && (t += G(r << 2)), t;
}
var ct, wi = {
  decode: function(n) {
    var t;
    if (ct === void 0) {
      var e = "0123456789ABCDEF", i = ` \f
\r	 \u2028\u2029`;
      for (ct = {}, t = 0; t < 16; ++t)
        ct[e.charAt(t)] = t;
      for (e = e.toLowerCase(), t = 10; t < 16; ++t)
        ct[e.charAt(t)] = t;
      for (t = 0; t < i.length; ++t)
        ct[i.charAt(t)] = -1;
    }
    var r = [], s = 0, a = 0;
    for (t = 0; t < n.length; ++t) {
      var o = n.charAt(t);
      if (o == "=")
        break;
      if (o = ct[o], o != -1) {
        if (o === void 0)
          throw new Error("Illegal character at offset " + t);
        s |= o, ++a >= 2 ? (r[r.length] = s, s = 0, a = 0) : s <<= 4;
      }
    }
    if (a)
      throw new Error("Hex encoding incomplete: 4 bits missing");
    return r;
  }
}, et, Jt = {
  decode: function(n) {
    var t;
    if (et === void 0) {
      var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = `= \f
\r	 \u2028\u2029`;
      for (et = /* @__PURE__ */ Object.create(null), t = 0; t < 64; ++t)
        et[e.charAt(t)] = t;
      for (et["-"] = 62, et._ = 63, t = 0; t < i.length; ++t)
        et[i.charAt(t)] = -1;
    }
    var r = [], s = 0, a = 0;
    for (t = 0; t < n.length; ++t) {
      var o = n.charAt(t);
      if (o == "=")
        break;
      if (o = et[o], o != -1) {
        if (o === void 0)
          throw new Error("Illegal character at offset " + t);
        s |= o, ++a >= 4 ? (r[r.length] = s >> 16, r[r.length] = s >> 8 & 255, r[r.length] = s & 255, s = 0, a = 0) : s <<= 6;
      }
    }
    switch (a) {
      case 1:
        throw new Error("Base64 encoding incomplete: at least 2 bits missing");
      case 2:
        r[r.length] = s >> 10;
        break;
      case 3:
        r[r.length] = s >> 16, r[r.length] = s >> 8 & 255;
        break;
    }
    return r;
  },
  re: /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
  unarmor: function(n) {
    var t = Jt.re.exec(n);
    if (t)
      if (t[1])
        n = t[1];
      else if (t[2])
        n = t[2];
      else
        throw new Error("RegExp out of sync");
    return Jt.decode(n);
  }
}, ut = 1e13, mt = (
  /** @class */
  function() {
    function n(t) {
      this.buf = [+t || 0];
    }
    return n.prototype.mulAdd = function(t, e) {
      var i = this.buf, r = i.length, s, a;
      for (s = 0; s < r; ++s)
        a = i[s] * t + e, a < ut ? e = 0 : (e = 0 | a / ut, a -= e * ut), i[s] = a;
      e > 0 && (i[s] = e);
    }, n.prototype.sub = function(t) {
      var e = this.buf, i = e.length, r, s;
      for (r = 0; r < i; ++r)
        s = e[r] - t, s < 0 ? (s += ut, t = 1) : t = 0, e[r] = s;
      for (; e[e.length - 1] === 0; )
        e.pop();
    }, n.prototype.toString = function(t) {
      if ((t || 10) != 10)
        throw new Error("only base 10 is supported");
      for (var e = this.buf, i = e[e.length - 1].toString(), r = e.length - 2; r >= 0; --r)
        i += (ut + e[r]).toString().substring(1);
      return i;
    }, n.prototype.valueOf = function() {
      for (var t = this.buf, e = 0, i = t.length - 1; i >= 0; --i)
        e = e * ut + t[i];
      return e;
    }, n.prototype.simplify = function() {
      var t = this.buf;
      return t.length == 1 ? t[0] : this;
    }, n;
  }()
), Ke = "…", Si = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, Ti = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function lt(n, t) {
  return n.length > t && (n = n.substring(0, t) + Ke), n;
}
var Ht = (
  /** @class */
  function() {
    function n(t, e) {
      this.hexDigits = "0123456789ABCDEF", t instanceof n ? (this.enc = t.enc, this.pos = t.pos) : (this.enc = t, this.pos = e);
    }
    return n.prototype.get = function(t) {
      if (t === void 0 && (t = this.pos++), t >= this.enc.length)
        throw new Error("Requesting byte offset ".concat(t, " on a stream of length ").concat(this.enc.length));
      return typeof this.enc == "string" ? this.enc.charCodeAt(t) : this.enc[t];
    }, n.prototype.hexByte = function(t) {
      return this.hexDigits.charAt(t >> 4 & 15) + this.hexDigits.charAt(t & 15);
    }, n.prototype.hexDump = function(t, e, i) {
      for (var r = "", s = t; s < e; ++s)
        if (r += this.hexByte(this.get(s)), i !== !0)
          switch (s & 15) {
            case 7:
              r += "  ";
              break;
            case 15:
              r += `
`;
              break;
            default:
              r += " ";
          }
      return r;
    }, n.prototype.isASCII = function(t, e) {
      for (var i = t; i < e; ++i) {
        var r = this.get(i);
        if (r < 32 || r > 176)
          return !1;
      }
      return !0;
    }, n.prototype.parseStringISO = function(t, e) {
      for (var i = "", r = t; r < e; ++r)
        i += String.fromCharCode(this.get(r));
      return i;
    }, n.prototype.parseStringUTF = function(t, e) {
      for (var i = "", r = t; r < e; ) {
        var s = this.get(r++);
        s < 128 ? i += String.fromCharCode(s) : s > 191 && s < 224 ? i += String.fromCharCode((s & 31) << 6 | this.get(r++) & 63) : i += String.fromCharCode((s & 15) << 12 | (this.get(r++) & 63) << 6 | this.get(r++) & 63);
      }
      return i;
    }, n.prototype.parseStringBMP = function(t, e) {
      for (var i = "", r, s, a = t; a < e; )
        r = this.get(a++), s = this.get(a++), i += String.fromCharCode(r << 8 | s);
      return i;
    }, n.prototype.parseTime = function(t, e, i) {
      var r = this.parseStringISO(t, e), s = (i ? Si : Ti).exec(r);
      return s ? (i && (s[1] = +s[1], s[1] += +s[1] < 70 ? 2e3 : 1900), r = s[1] + "-" + s[2] + "-" + s[3] + " " + s[4], s[5] && (r += ":" + s[5], s[6] && (r += ":" + s[6], s[7] && (r += "." + s[7]))), s[8] && (r += " UTC", s[8] != "Z" && (r += s[8], s[9] && (r += ":" + s[9]))), r) : "Unrecognized time: " + r;
    }, n.prototype.parseInteger = function(t, e) {
      for (var i = this.get(t), r = i > 127, s = r ? 255 : 0, a, o = ""; i == s && ++t < e; )
        i = this.get(t);
      if (a = e - t, a === 0)
        return r ? -1 : 0;
      if (a > 4) {
        for (o = i, a <<= 3; ((+o ^ s) & 128) == 0; )
          o = +o << 1, --a;
        o = "(" + a + ` bit)
`;
      }
      r && (i = i - 256);
      for (var c = new mt(i), h = t + 1; h < e; ++h)
        c.mulAdd(256, this.get(h));
      return o + c.toString();
    }, n.prototype.parseBitString = function(t, e, i) {
      for (var r = this.get(t), s = (e - t - 1 << 3) - r, a = "(" + s + ` bit)
`, o = "", c = t + 1; c < e; ++c) {
        for (var h = this.get(c), u = c == e - 1 ? r : 0, f = 7; f >= u; --f)
          o += h >> f & 1 ? "1" : "0";
        if (o.length > i)
          return a + lt(o, i);
      }
      return a + o;
    }, n.prototype.parseOctetString = function(t, e, i) {
      if (this.isASCII(t, e))
        return lt(this.parseStringISO(t, e), i);
      var r = e - t, s = "(" + r + ` byte)
`;
      i /= 2, r > i && (e = t + i);
      for (var a = t; a < e; ++a)
        s += this.hexByte(this.get(a));
      return r > i && (s += Ke), s;
    }, n.prototype.parseOID = function(t, e, i) {
      for (var r = "", s = new mt(), a = 0, o = t; o < e; ++o) {
        var c = this.get(o);
        if (s.mulAdd(128, c & 127), a += 7, !(c & 128)) {
          if (r === "")
            if (s = s.simplify(), s instanceof mt)
              s.sub(80), r = "2." + s.toString();
            else {
              var h = s < 80 ? s < 40 ? 0 : 1 : 2;
              r = h + "." + (s - h * 40);
            }
          else
            r += "." + s.toString();
          if (r.length > i)
            return lt(r, i);
          s = new mt(), a = 0;
        }
      }
      return a > 0 && (r += ".incomplete"), r;
    }, n;
  }()
), Ai = (
  /** @class */
  function() {
    function n(t, e, i, r, s) {
      if (!(r instanceof me))
        throw new Error("Invalid tag value.");
      this.stream = t, this.header = e, this.length = i, this.tag = r, this.sub = s;
    }
    return n.prototype.typeName = function() {
      switch (this.tag.tagClass) {
        case 0:
          switch (this.tag.tagNumber) {
            case 0:
              return "EOC";
            case 1:
              return "BOOLEAN";
            case 2:
              return "INTEGER";
            case 3:
              return "BIT_STRING";
            case 4:
              return "OCTET_STRING";
            case 5:
              return "NULL";
            case 6:
              return "OBJECT_IDENTIFIER";
            case 7:
              return "ObjectDescriptor";
            case 8:
              return "EXTERNAL";
            case 9:
              return "REAL";
            case 10:
              return "ENUMERATED";
            case 11:
              return "EMBEDDED_PDV";
            case 12:
              return "UTF8String";
            case 16:
              return "SEQUENCE";
            case 17:
              return "SET";
            case 18:
              return "NumericString";
            case 19:
              return "PrintableString";
            // ASCII subset
            case 20:
              return "TeletexString";
            // aka T61String
            case 21:
              return "VideotexString";
            case 22:
              return "IA5String";
            // ASCII
            case 23:
              return "UTCTime";
            case 24:
              return "GeneralizedTime";
            case 25:
              return "GraphicString";
            case 26:
              return "VisibleString";
            // ASCII subset
            case 27:
              return "GeneralString";
            case 28:
              return "UniversalString";
            case 30:
              return "BMPString";
          }
          return "Universal_" + this.tag.tagNumber.toString();
        case 1:
          return "Application_" + this.tag.tagNumber.toString();
        case 2:
          return "[" + this.tag.tagNumber.toString() + "]";
        // Context
        case 3:
          return "Private_" + this.tag.tagNumber.toString();
      }
    }, n.prototype.content = function(t) {
      if (this.tag === void 0)
        return null;
      t === void 0 && (t = 1 / 0);
      var e = this.posContent(), i = Math.abs(this.length);
      if (!this.tag.isUniversal())
        return this.sub !== null ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);
      switch (this.tag.tagNumber) {
        case 1:
          return this.stream.get(e) === 0 ? "false" : "true";
        case 2:
          return this.stream.parseInteger(e, e + i);
        case 3:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(e, e + i, t);
        case 4:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(e, e + i, t);
        // case 0x05: // NULL
        case 6:
          return this.stream.parseOID(e, e + i, t);
        // case 0x07: // ObjectDescriptor
        // case 0x08: // EXTERNAL
        // case 0x09: // REAL
        // case 0x0A: // ENUMERATED
        // case 0x0B: // EMBEDDED_PDV
        case 16:
        // SEQUENCE
        case 17:
          return this.sub !== null ? "(" + this.sub.length + " elem)" : "(no elem)";
        case 12:
          return lt(this.stream.parseStringUTF(e, e + i), t);
        case 18:
        // NumericString
        case 19:
        // PrintableString
        case 20:
        // TeletexString
        case 21:
        // VideotexString
        case 22:
        // IA5String
        // case 0x19: // GraphicString
        case 26:
          return lt(this.stream.parseStringISO(e, e + i), t);
        case 30:
          return lt(this.stream.parseStringBMP(e, e + i), t);
        case 23:
        // UTCTime
        case 24:
          return this.stream.parseTime(e, e + i, this.tag.tagNumber == 23);
      }
      return null;
    }, n.prototype.toString = function() {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
    }, n.prototype.toPrettyString = function(t) {
      t === void 0 && (t = "");
      var e = t + this.typeName() + " @" + this.stream.pos;
      if (this.length >= 0 && (e += "+"), e += this.length, this.tag.tagConstructed ? e += " (constructed)" : this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null && (e += " (encapsulates)"), e += `
`, this.sub !== null) {
        t += "  ";
        for (var i = 0, r = this.sub.length; i < r; ++i)
          e += this.sub[i].toPrettyString(t);
      }
      return e;
    }, n.prototype.posStart = function() {
      return this.stream.pos;
    }, n.prototype.posContent = function() {
      return this.stream.pos + this.header;
    }, n.prototype.posEnd = function() {
      return this.stream.pos + this.header + Math.abs(this.length);
    }, n.prototype.toHexString = function() {
      return this.stream.hexDump(this.posStart(), this.posEnd(), !0);
    }, n.decodeLength = function(t) {
      var e = t.get(), i = e & 127;
      if (i == e)
        return i;
      if (i > 6)
        throw new Error("Length over 48 bits not supported at position " + (t.pos - 1));
      if (i === 0)
        return null;
      e = 0;
      for (var r = 0; r < i; ++r)
        e = e * 256 + t.get();
      return e;
    }, n.prototype.getHexStringValue = function() {
      var t = this.toHexString(), e = this.header * 2, i = this.length * 2;
      return t.substring(e, e + i);
    }, n.decode = function(t) {
      var e;
      t instanceof Ht ? e = t : e = new Ht(t, 0);
      var i = new Ht(e), r = new me(e), s = n.decodeLength(e), a = e.pos, o = a - i.pos, c = null, h = function() {
        var f = [];
        if (s !== null) {
          for (var _ = a + s; e.pos < _; )
            f[f.length] = n.decode(e);
          if (e.pos != _)
            throw new Error("Content size is not correct for container starting at offset " + a);
        } else
          try {
            for (; ; ) {
              var y = n.decode(e);
              if (y.tag.isEOC())
                break;
              f[f.length] = y;
            }
            s = a - e.pos;
          } catch (d) {
            throw new Error("Exception while decoding undefined length content: " + d);
          }
        return f;
      };
      if (r.tagConstructed)
        c = h();
      else if (r.isUniversal() && (r.tagNumber == 3 || r.tagNumber == 4))
        try {
          if (r.tagNumber == 3 && e.get() != 0)
            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
          c = h();
          for (var u = 0; u < c.length; ++u)
            if (c[u].tag.isEOC())
              throw new Error("EOC is not supposed to be actual content.");
        } catch {
          c = null;
        }
      if (c === null) {
        if (s === null)
          throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);
        e.pos = a + Math.abs(s);
      }
      return new n(i, o, s, r, c);
    }, n;
  }()
), me = (
  /** @class */
  function() {
    function n(t) {
      var e = t.get();
      if (this.tagClass = e >> 6, this.tagConstructed = (e & 32) !== 0, this.tagNumber = e & 31, this.tagNumber == 31) {
        var i = new mt();
        do
          e = t.get(), i.mulAdd(128, e & 127);
        while (e & 128);
        this.tagNumber = i.simplify();
      }
    }
    return n.prototype.isUniversal = function() {
      return this.tagClass === 0;
    }, n.prototype.isEOC = function() {
      return this.tagClass === 0 && this.tagNumber === 0;
    }, n;
  }()
), Y, Ci = 244837814094590, ye = (Ci & 16777215) == 15715070, N = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], Ri = (1 << 26) / N[N.length - 1], P = (
  /** @class */
  function() {
    function n(t, e, i) {
      t != null && (typeof t == "number" ? this.fromNumber(t, e, i) : e == null && typeof t != "string" ? this.fromString(t, 256) : this.fromString(t, e));
    }
    return n.prototype.toString = function(t) {
      if (this.s < 0)
        return "-" + this.negate().toString(t);
      var e;
      if (t == 16)
        e = 4;
      else if (t == 8)
        e = 3;
      else if (t == 2)
        e = 1;
      else if (t == 32)
        e = 5;
      else if (t == 4)
        e = 2;
      else
        return this.toRadix(t);
      var i = (1 << e) - 1, r, s = !1, a = "", o = this.t, c = this.DB - o * this.DB % e;
      if (o-- > 0)
        for (c < this.DB && (r = this[o] >> c) > 0 && (s = !0, a = G(r)); o >= 0; )
          c < e ? (r = (this[o] & (1 << c) - 1) << e - c, r |= this[--o] >> (c += this.DB - e)) : (r = this[o] >> (c -= e) & i, c <= 0 && (c += this.DB, --o)), r > 0 && (s = !0), s && (a += G(r));
      return s ? a : "0";
    }, n.prototype.negate = function() {
      var t = E();
      return n.ZERO.subTo(this, t), t;
    }, n.prototype.abs = function() {
      return this.s < 0 ? this.negate() : this;
    }, n.prototype.compareTo = function(t) {
      var e = this.s - t.s;
      if (e != 0)
        return e;
      var i = this.t;
      if (e = i - t.t, e != 0)
        return this.s < 0 ? -e : e;
      for (; --i >= 0; )
        if ((e = this[i] - t[i]) != 0)
          return e;
      return 0;
    }, n.prototype.bitLength = function() {
      return this.t <= 0 ? 0 : this.DB * (this.t - 1) + Tt(this[this.t - 1] ^ this.s & this.DM);
    }, n.prototype.mod = function(t) {
      var e = E();
      return this.abs().divRemTo(t, null, e), this.s < 0 && e.compareTo(n.ZERO) > 0 && t.subTo(e, e), e;
    }, n.prototype.modPowInt = function(t, e) {
      var i;
      return t < 256 || e.isEven() ? i = new be(e) : i = new Pe(e), this.exp(t, i);
    }, n.prototype.clone = function() {
      var t = E();
      return this.copyTo(t), t;
    }, n.prototype.intValue = function() {
      if (this.s < 0) {
        if (this.t == 1)
          return this[0] - this.DV;
        if (this.t == 0)
          return -1;
      } else {
        if (this.t == 1)
          return this[0];
        if (this.t == 0)
          return 0;
      }
      return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0];
    }, n.prototype.byteValue = function() {
      return this.t == 0 ? this.s : this[0] << 24 >> 24;
    }, n.prototype.shortValue = function() {
      return this.t == 0 ? this.s : this[0] << 16 >> 16;
    }, n.prototype.signum = function() {
      return this.s < 0 ? -1 : this.t <= 0 || this.t == 1 && this[0] <= 0 ? 0 : 1;
    }, n.prototype.toByteArray = function() {
      var t = this.t, e = [];
      e[0] = this.s;
      var i = this.DB - t * this.DB % 8, r, s = 0;
      if (t-- > 0)
        for (i < this.DB && (r = this[t] >> i) != (this.s & this.DM) >> i && (e[s++] = r | this.s << this.DB - i); t >= 0; )
          i < 8 ? (r = (this[t] & (1 << i) - 1) << 8 - i, r |= this[--t] >> (i += this.DB - 8)) : (r = this[t] >> (i -= 8) & 255, i <= 0 && (i += this.DB, --t)), (r & 128) != 0 && (r |= -256), s == 0 && (this.s & 128) != (r & 128) && ++s, (s > 0 || r != this.s) && (e[s++] = r);
      return e;
    }, n.prototype.equals = function(t) {
      return this.compareTo(t) == 0;
    }, n.prototype.min = function(t) {
      return this.compareTo(t) < 0 ? this : t;
    }, n.prototype.max = function(t) {
      return this.compareTo(t) > 0 ? this : t;
    }, n.prototype.and = function(t) {
      var e = E();
      return this.bitwiseTo(t, Pi, e), e;
    }, n.prototype.or = function(t) {
      var e = E();
      return this.bitwiseTo(t, St, e), e;
    }, n.prototype.xor = function(t) {
      var e = E();
      return this.bitwiseTo(t, de, e), e;
    }, n.prototype.andNot = function(t) {
      var e = E();
      return this.bitwiseTo(t, _e, e), e;
    }, n.prototype.not = function() {
      for (var t = E(), e = 0; e < this.t; ++e)
        t[e] = this.DM & ~this[e];
      return t.t = this.t, t.s = ~this.s, t;
    }, n.prototype.shiftLeft = function(t) {
      var e = E();
      return t < 0 ? this.rShiftTo(-t, e) : this.lShiftTo(t, e), e;
    }, n.prototype.shiftRight = function(t) {
      var e = E();
      return t < 0 ? this.lShiftTo(-t, e) : this.rShiftTo(t, e), e;
    }, n.prototype.getLowestSetBit = function() {
      for (var t = 0; t < this.t; ++t)
        if (this[t] != 0)
          return t * this.DB + vi(this[t]);
      return this.s < 0 ? this.t * this.DB : -1;
    }, n.prototype.bitCount = function() {
      for (var t = 0, e = this.s & this.DM, i = 0; i < this.t; ++i)
        t += Ei(this[i] ^ e);
      return t;
    }, n.prototype.testBit = function(t) {
      var e = Math.floor(t / this.DB);
      return e >= this.t ? this.s != 0 : (this[e] & 1 << t % this.DB) != 0;
    }, n.prototype.setBit = function(t) {
      return this.changeBit(t, St);
    }, n.prototype.clearBit = function(t) {
      return this.changeBit(t, _e);
    }, n.prototype.flipBit = function(t) {
      return this.changeBit(t, de);
    }, n.prototype.add = function(t) {
      var e = E();
      return this.addTo(t, e), e;
    }, n.prototype.subtract = function(t) {
      var e = E();
      return this.subTo(t, e), e;
    }, n.prototype.multiply = function(t) {
      var e = E();
      return this.multiplyTo(t, e), e;
    }, n.prototype.divide = function(t) {
      var e = E();
      return this.divRemTo(t, e, null), e;
    }, n.prototype.remainder = function(t) {
      var e = E();
      return this.divRemTo(t, null, e), e;
    }, n.prototype.divideAndRemainder = function(t) {
      var e = E(), i = E();
      return this.divRemTo(t, e, i), [e, i];
    }, n.prototype.modPow = function(t, e) {
      var i = t.bitLength(), r, s = Q(1), a;
      if (i <= 0)
        return s;
      i < 18 ? r = 1 : i < 48 ? r = 3 : i < 144 ? r = 4 : i < 768 ? r = 5 : r = 6, i < 8 ? a = new be(e) : e.isEven() ? a = new Di(e) : a = new Pe(e);
      var o = [], c = 3, h = r - 1, u = (1 << r) - 1;
      if (o[1] = a.convert(this), r > 1) {
        var f = E();
        for (a.sqrTo(o[1], f); c <= u; )
          o[c] = E(), a.mulTo(f, o[c - 2], o[c]), c += 2;
      }
      var _ = t.t - 1, y, d = !0, m = E(), g;
      for (i = Tt(t[_]) - 1; _ >= 0; ) {
        for (i >= h ? y = t[_] >> i - h & u : (y = (t[_] & (1 << i + 1) - 1) << h - i, _ > 0 && (y |= t[_ - 1] >> this.DB + i - h)), c = r; (y & 1) == 0; )
          y >>= 1, --c;
        if ((i -= c) < 0 && (i += this.DB, --_), d)
          o[y].copyTo(s), d = !1;
        else {
          for (; c > 1; )
            a.sqrTo(s, m), a.sqrTo(m, s), c -= 2;
          c > 0 ? a.sqrTo(s, m) : (g = s, s = m, m = g), a.mulTo(m, o[y], s);
        }
        for (; _ >= 0 && (t[_] & 1 << i) == 0; )
          a.sqrTo(s, m), g = s, s = m, m = g, --i < 0 && (i = this.DB - 1, --_);
      }
      return a.revert(s);
    }, n.prototype.modInverse = function(t) {
      var e = t.isEven();
      if (this.isEven() && e || t.signum() == 0)
        return n.ZERO;
      for (var i = t.clone(), r = this.clone(), s = Q(1), a = Q(0), o = Q(0), c = Q(1); i.signum() != 0; ) {
        for (; i.isEven(); )
          i.rShiftTo(1, i), e ? ((!s.isEven() || !a.isEven()) && (s.addTo(this, s), a.subTo(t, a)), s.rShiftTo(1, s)) : a.isEven() || a.subTo(t, a), a.rShiftTo(1, a);
        for (; r.isEven(); )
          r.rShiftTo(1, r), e ? ((!o.isEven() || !c.isEven()) && (o.addTo(this, o), c.subTo(t, c)), o.rShiftTo(1, o)) : c.isEven() || c.subTo(t, c), c.rShiftTo(1, c);
        i.compareTo(r) >= 0 ? (i.subTo(r, i), e && s.subTo(o, s), a.subTo(c, a)) : (r.subTo(i, r), e && o.subTo(s, o), c.subTo(a, c));
      }
      if (r.compareTo(n.ONE) != 0)
        return n.ZERO;
      if (c.compareTo(t) >= 0)
        return c.subtract(t);
      if (c.signum() < 0)
        c.addTo(t, c);
      else
        return c;
      return c.signum() < 0 ? c.add(t) : c;
    }, n.prototype.pow = function(t) {
      return this.exp(t, new Oi());
    }, n.prototype.gcd = function(t) {
      var e = this.s < 0 ? this.negate() : this.clone(), i = t.s < 0 ? t.negate() : t.clone();
      if (e.compareTo(i) < 0) {
        var r = e;
        e = i, i = r;
      }
      var s = e.getLowestSetBit(), a = i.getLowestSetBit();
      if (a < 0)
        return e;
      for (s < a && (a = s), a > 0 && (e.rShiftTo(a, e), i.rShiftTo(a, i)); e.signum() > 0; )
        (s = e.getLowestSetBit()) > 0 && e.rShiftTo(s, e), (s = i.getLowestSetBit()) > 0 && i.rShiftTo(s, i), e.compareTo(i) >= 0 ? (e.subTo(i, e), e.rShiftTo(1, e)) : (i.subTo(e, i), i.rShiftTo(1, i));
      return a > 0 && i.lShiftTo(a, i), i;
    }, n.prototype.isProbablePrime = function(t) {
      var e, i = this.abs();
      if (i.t == 1 && i[0] <= N[N.length - 1]) {
        for (e = 0; e < N.length; ++e)
          if (i[0] == N[e])
            return !0;
        return !1;
      }
      if (i.isEven())
        return !1;
      for (e = 1; e < N.length; ) {
        for (var r = N[e], s = e + 1; s < N.length && r < Ri; )
          r *= N[s++];
        for (r = i.modInt(r); e < s; )
          if (r % N[e++] == 0)
            return !1;
      }
      return i.millerRabin(t);
    }, n.prototype.copyTo = function(t) {
      for (var e = this.t - 1; e >= 0; --e)
        t[e] = this[e];
      t.t = this.t, t.s = this.s;
    }, n.prototype.fromInt = function(t) {
      this.t = 1, this.s = t < 0 ? -1 : 0, t > 0 ? this[0] = t : t < -1 ? this[0] = t + this.DV : this.t = 0;
    }, n.prototype.fromString = function(t, e) {
      var i;
      if (e == 16)
        i = 4;
      else if (e == 8)
        i = 3;
      else if (e == 256)
        i = 8;
      else if (e == 2)
        i = 1;
      else if (e == 32)
        i = 5;
      else if (e == 4)
        i = 2;
      else {
        this.fromRadix(t, e);
        return;
      }
      this.t = 0, this.s = 0;
      for (var r = t.length, s = !1, a = 0; --r >= 0; ) {
        var o = i == 8 ? +t[r] & 255 : Ee(t, r);
        if (o < 0) {
          t.charAt(r) == "-" && (s = !0);
          continue;
        }
        s = !1, a == 0 ? this[this.t++] = o : a + i > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - a) - 1) << a, this[this.t++] = o >> this.DB - a) : this[this.t - 1] |= o << a, a += i, a >= this.DB && (a -= this.DB);
      }
      i == 8 && (+t[0] & 128) != 0 && (this.s = -1, a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)), this.clamp(), s && n.ZERO.subTo(this, this);
    }, n.prototype.clamp = function() {
      for (var t = this.s & this.DM; this.t > 0 && this[this.t - 1] == t; )
        --this.t;
    }, n.prototype.dlShiftTo = function(t, e) {
      var i;
      for (i = this.t - 1; i >= 0; --i)
        e[i + t] = this[i];
      for (i = t - 1; i >= 0; --i)
        e[i] = 0;
      e.t = this.t + t, e.s = this.s;
    }, n.prototype.drShiftTo = function(t, e) {
      for (var i = t; i < this.t; ++i)
        e[i - t] = this[i];
      e.t = Math.max(this.t - t, 0), e.s = this.s;
    }, n.prototype.lShiftTo = function(t, e) {
      for (var i = t % this.DB, r = this.DB - i, s = (1 << r) - 1, a = Math.floor(t / this.DB), o = this.s << i & this.DM, c = this.t - 1; c >= 0; --c)
        e[c + a + 1] = this[c] >> r | o, o = (this[c] & s) << i;
      for (var c = a - 1; c >= 0; --c)
        e[c] = 0;
      e[a] = o, e.t = this.t + a + 1, e.s = this.s, e.clamp();
    }, n.prototype.rShiftTo = function(t, e) {
      e.s = this.s;
      var i = Math.floor(t / this.DB);
      if (i >= this.t) {
        e.t = 0;
        return;
      }
      var r = t % this.DB, s = this.DB - r, a = (1 << r) - 1;
      e[0] = this[i] >> r;
      for (var o = i + 1; o < this.t; ++o)
        e[o - i - 1] |= (this[o] & a) << s, e[o - i] = this[o] >> r;
      r > 0 && (e[this.t - i - 1] |= (this.s & a) << s), e.t = this.t - i, e.clamp();
    }, n.prototype.subTo = function(t, e) {
      for (var i = 0, r = 0, s = Math.min(t.t, this.t); i < s; )
        r += this[i] - t[i], e[i++] = r & this.DM, r >>= this.DB;
      if (t.t < this.t) {
        for (r -= t.s; i < this.t; )
          r += this[i], e[i++] = r & this.DM, r >>= this.DB;
        r += this.s;
      } else {
        for (r += this.s; i < t.t; )
          r -= t[i], e[i++] = r & this.DM, r >>= this.DB;
        r -= t.s;
      }
      e.s = r < 0 ? -1 : 0, r < -1 ? e[i++] = this.DV + r : r > 0 && (e[i++] = r), e.t = i, e.clamp();
    }, n.prototype.multiplyTo = function(t, e) {
      var i = this.abs(), r = t.abs(), s = i.t;
      for (e.t = s + r.t; --s >= 0; )
        e[s] = 0;
      for (s = 0; s < r.t; ++s)
        e[s + i.t] = i.am(0, r[s], e, s, 0, i.t);
      e.s = 0, e.clamp(), this.s != t.s && n.ZERO.subTo(e, e);
    }, n.prototype.squareTo = function(t) {
      for (var e = this.abs(), i = t.t = 2 * e.t; --i >= 0; )
        t[i] = 0;
      for (i = 0; i < e.t - 1; ++i) {
        var r = e.am(i, e[i], t, 2 * i, 0, 1);
        (t[i + e.t] += e.am(i + 1, 2 * e[i], t, 2 * i + 1, r, e.t - i - 1)) >= e.DV && (t[i + e.t] -= e.DV, t[i + e.t + 1] = 1);
      }
      t.t > 0 && (t[t.t - 1] += e.am(i, e[i], t, 2 * i, 0, 1)), t.s = 0, t.clamp();
    }, n.prototype.divRemTo = function(t, e, i) {
      var r = t.abs();
      if (!(r.t <= 0)) {
        var s = this.abs();
        if (s.t < r.t) {
          e?.fromInt(0), i != null && this.copyTo(i);
          return;
        }
        i == null && (i = E());
        var a = E(), o = this.s, c = t.s, h = this.DB - Tt(r[r.t - 1]);
        h > 0 ? (r.lShiftTo(h, a), s.lShiftTo(h, i)) : (r.copyTo(a), s.copyTo(i));
        var u = a.t, f = a[u - 1];
        if (f != 0) {
          var _ = f * (1 << this.F1) + (u > 1 ? a[u - 2] >> this.F2 : 0), y = this.FV / _, d = (1 << this.F1) / _, m = 1 << this.F2, g = i.t, w = g - u, A = e ?? E();
          for (a.dlShiftTo(w, A), i.compareTo(A) >= 0 && (i[i.t++] = 1, i.subTo(A, i)), n.ONE.dlShiftTo(u, A), A.subTo(a, a); a.t < u; )
            a[a.t++] = 0;
          for (; --w >= 0; ) {
            var T = i[--g] == f ? this.DM : Math.floor(i[g] * y + (i[g - 1] + m) * d);
            if ((i[g] += a.am(0, T, i, w, 0, u)) < T)
              for (a.dlShiftTo(w, A), i.subTo(A, i); i[g] < --T; )
                i.subTo(A, i);
          }
          e != null && (i.drShiftTo(u, e), o != c && n.ZERO.subTo(e, e)), i.t = u, i.clamp(), h > 0 && i.rShiftTo(h, i), o < 0 && n.ZERO.subTo(i, i);
        }
      }
    }, n.prototype.invDigit = function() {
      if (this.t < 1)
        return 0;
      var t = this[0];
      if ((t & 1) == 0)
        return 0;
      var e = t & 3;
      return e = e * (2 - (t & 15) * e) & 15, e = e * (2 - (t & 255) * e) & 255, e = e * (2 - ((t & 65535) * e & 65535)) & 65535, e = e * (2 - t * e % this.DV) % this.DV, e > 0 ? this.DV - e : -e;
    }, n.prototype.isEven = function() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    }, n.prototype.exp = function(t, e) {
      if (t > 4294967295 || t < 1)
        return n.ONE;
      var i = E(), r = E(), s = e.convert(this), a = Tt(t) - 1;
      for (s.copyTo(i); --a >= 0; )
        if (e.sqrTo(i, r), (t & 1 << a) > 0)
          e.mulTo(r, s, i);
        else {
          var o = i;
          i = r, r = o;
        }
      return e.revert(i);
    }, n.prototype.chunkSize = function(t) {
      return Math.floor(Math.LN2 * this.DB / Math.log(t));
    }, n.prototype.toRadix = function(t) {
      if (t == null && (t = 10), this.signum() == 0 || t < 2 || t > 36)
        return "0";
      var e = this.chunkSize(t), i = Math.pow(t, e), r = Q(i), s = E(), a = E(), o = "";
      for (this.divRemTo(r, s, a); s.signum() > 0; )
        o = (i + a.intValue()).toString(t).substring(1) + o, s.divRemTo(r, s, a);
      return a.intValue().toString(t) + o;
    }, n.prototype.fromRadix = function(t, e) {
      this.fromInt(0), e == null && (e = 10);
      for (var i = this.chunkSize(e), r = Math.pow(e, i), s = !1, a = 0, o = 0, c = 0; c < t.length; ++c) {
        var h = Ee(t, c);
        if (h < 0) {
          t.charAt(c) == "-" && this.signum() == 0 && (s = !0);
          continue;
        }
        o = e * o + h, ++a >= i && (this.dMultiply(r), this.dAddOffset(o, 0), a = 0, o = 0);
      }
      a > 0 && (this.dMultiply(Math.pow(e, a)), this.dAddOffset(o, 0)), s && n.ZERO.subTo(this, this);
    }, n.prototype.fromNumber = function(t, e, i) {
      if (typeof e == "number")
        if (t < 2)
          this.fromInt(1);
        else
          for (this.fromNumber(t, i), this.testBit(t - 1) || this.bitwiseTo(n.ONE.shiftLeft(t - 1), St, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(e); )
            this.dAddOffset(2, 0), this.bitLength() > t && this.subTo(n.ONE.shiftLeft(t - 1), this);
      else {
        var r = [], s = t & 7;
        r.length = (t >> 3) + 1, e.nextBytes(r), s > 0 ? r[0] &= (1 << s) - 1 : r[0] = 0, this.fromString(r, 256);
      }
    }, n.prototype.bitwiseTo = function(t, e, i) {
      var r, s, a = Math.min(t.t, this.t);
      for (r = 0; r < a; ++r)
        i[r] = e(this[r], t[r]);
      if (t.t < this.t) {
        for (s = t.s & this.DM, r = a; r < this.t; ++r)
          i[r] = e(this[r], s);
        i.t = this.t;
      } else {
        for (s = this.s & this.DM, r = a; r < t.t; ++r)
          i[r] = e(s, t[r]);
        i.t = t.t;
      }
      i.s = e(this.s, t.s), i.clamp();
    }, n.prototype.changeBit = function(t, e) {
      var i = n.ONE.shiftLeft(t);
      return this.bitwiseTo(i, e, i), i;
    }, n.prototype.addTo = function(t, e) {
      for (var i = 0, r = 0, s = Math.min(t.t, this.t); i < s; )
        r += this[i] + t[i], e[i++] = r & this.DM, r >>= this.DB;
      if (t.t < this.t) {
        for (r += t.s; i < this.t; )
          r += this[i], e[i++] = r & this.DM, r >>= this.DB;
        r += this.s;
      } else {
        for (r += this.s; i < t.t; )
          r += t[i], e[i++] = r & this.DM, r >>= this.DB;
        r += t.s;
      }
      e.s = r < 0 ? -1 : 0, r > 0 ? e[i++] = r : r < -1 && (e[i++] = this.DV + r), e.t = i, e.clamp();
    }, n.prototype.dMultiply = function(t) {
      this[this.t] = this.am(0, t - 1, this, 0, 0, this.t), ++this.t, this.clamp();
    }, n.prototype.dAddOffset = function(t, e) {
      if (t != 0) {
        for (; this.t <= e; )
          this[this.t++] = 0;
        for (this[e] += t; this[e] >= this.DV; )
          this[e] -= this.DV, ++e >= this.t && (this[this.t++] = 0), ++this[e];
      }
    }, n.prototype.multiplyLowerTo = function(t, e, i) {
      var r = Math.min(this.t + t.t, e);
      for (i.s = 0, i.t = r; r > 0; )
        i[--r] = 0;
      for (var s = i.t - this.t; r < s; ++r)
        i[r + this.t] = this.am(0, t[r], i, r, 0, this.t);
      for (var s = Math.min(t.t, e); r < s; ++r)
        this.am(0, t[r], i, r, 0, e - r);
      i.clamp();
    }, n.prototype.multiplyUpperTo = function(t, e, i) {
      --e;
      var r = i.t = this.t + t.t - e;
      for (i.s = 0; --r >= 0; )
        i[r] = 0;
      for (r = Math.max(e - this.t, 0); r < t.t; ++r)
        i[this.t + r - e] = this.am(e - r, t[r], i, 0, 0, this.t + r - e);
      i.clamp(), i.drShiftTo(1, i);
    }, n.prototype.modInt = function(t) {
      if (t <= 0)
        return 0;
      var e = this.DV % t, i = this.s < 0 ? t - 1 : 0;
      if (this.t > 0)
        if (e == 0)
          i = this[0] % t;
        else
          for (var r = this.t - 1; r >= 0; --r)
            i = (e * i + this[r]) % t;
      return i;
    }, n.prototype.millerRabin = function(t) {
      var e = this.subtract(n.ONE), i = e.getLowestSetBit();
      if (i <= 0)
        return !1;
      var r = e.shiftRight(i);
      t = t + 1 >> 1, t > N.length && (t = N.length);
      for (var s = E(), a = 0; a < t; ++a) {
        s.fromInt(N[Math.floor(Math.random() * N.length)]);
        var o = s.modPow(r, this);
        if (o.compareTo(n.ONE) != 0 && o.compareTo(e) != 0) {
          for (var c = 1; c++ < i && o.compareTo(e) != 0; )
            if (o = o.modPowInt(2, this), o.compareTo(n.ONE) == 0)
              return !1;
          if (o.compareTo(e) != 0)
            return !1;
        }
      }
      return !0;
    }, n.prototype.square = function() {
      var t = E();
      return this.squareTo(t), t;
    }, n.prototype.gcda = function(t, e) {
      var i = this.s < 0 ? this.negate() : this.clone(), r = t.s < 0 ? t.negate() : t.clone();
      if (i.compareTo(r) < 0) {
        var s = i;
        i = r, r = s;
      }
      var a = i.getLowestSetBit(), o = r.getLowestSetBit();
      if (o < 0) {
        e(i);
        return;
      }
      a < o && (o = a), o > 0 && (i.rShiftTo(o, i), r.rShiftTo(o, r));
      var c = function() {
        (a = i.getLowestSetBit()) > 0 && i.rShiftTo(a, i), (a = r.getLowestSetBit()) > 0 && r.rShiftTo(a, r), i.compareTo(r) >= 0 ? (i.subTo(r, i), i.rShiftTo(1, i)) : (r.subTo(i, r), r.rShiftTo(1, r)), i.signum() > 0 ? setTimeout(c, 0) : (o > 0 && r.lShiftTo(o, r), setTimeout(function() {
          e(r);
        }, 0));
      };
      setTimeout(c, 10);
    }, n.prototype.fromNumberAsync = function(t, e, i, r) {
      if (typeof e == "number")
        if (t < 2)
          this.fromInt(1);
        else {
          this.fromNumber(t, i), this.testBit(t - 1) || this.bitwiseTo(n.ONE.shiftLeft(t - 1), St, this), this.isEven() && this.dAddOffset(1, 0);
          var s = this, a = function() {
            s.dAddOffset(2, 0), s.bitLength() > t && s.subTo(n.ONE.shiftLeft(t - 1), s), s.isProbablePrime(e) ? setTimeout(function() {
              r();
            }, 0) : setTimeout(a, 0);
          };
          setTimeout(a, 0);
        }
      else {
        var o = [], c = t & 7;
        o.length = (t >> 3) + 1, e.nextBytes(o), c > 0 ? o[0] &= (1 << c) - 1 : o[0] = 0, this.fromString(o, 256);
      }
    }, n;
  }()
), Oi = (
  /** @class */
  function() {
    function n() {
    }
    return n.prototype.convert = function(t) {
      return t;
    }, n.prototype.revert = function(t) {
      return t;
    }, n.prototype.mulTo = function(t, e, i) {
      t.multiplyTo(e, i);
    }, n.prototype.sqrTo = function(t, e) {
      t.squareTo(e);
    }, n;
  }()
), be = (
  /** @class */
  function() {
    function n(t) {
      this.m = t;
    }
    return n.prototype.convert = function(t) {
      return t.s < 0 || t.compareTo(this.m) >= 0 ? t.mod(this.m) : t;
    }, n.prototype.revert = function(t) {
      return t;
    }, n.prototype.reduce = function(t) {
      t.divRemTo(this.m, null, t);
    }, n.prototype.mulTo = function(t, e, i) {
      t.multiplyTo(e, i), this.reduce(i);
    }, n.prototype.sqrTo = function(t, e) {
      t.squareTo(e), this.reduce(e);
    }, n;
  }()
), Pe = (
  /** @class */
  function() {
    function n(t) {
      this.m = t, this.mp = t.invDigit(), this.mpl = this.mp & 32767, this.mph = this.mp >> 15, this.um = (1 << t.DB - 15) - 1, this.mt2 = 2 * t.t;
    }
    return n.prototype.convert = function(t) {
      var e = E();
      return t.abs().dlShiftTo(this.m.t, e), e.divRemTo(this.m, null, e), t.s < 0 && e.compareTo(P.ZERO) > 0 && this.m.subTo(e, e), e;
    }, n.prototype.revert = function(t) {
      var e = E();
      return t.copyTo(e), this.reduce(e), e;
    }, n.prototype.reduce = function(t) {
      for (; t.t <= this.mt2; )
        t[t.t++] = 0;
      for (var e = 0; e < this.m.t; ++e) {
        var i = t[e] & 32767, r = i * this.mpl + ((i * this.mph + (t[e] >> 15) * this.mpl & this.um) << 15) & t.DM;
        for (i = e + this.m.t, t[i] += this.m.am(0, r, t, e, 0, this.m.t); t[i] >= t.DV; )
          t[i] -= t.DV, t[++i]++;
      }
      t.clamp(), t.drShiftTo(this.m.t, t), t.compareTo(this.m) >= 0 && t.subTo(this.m, t);
    }, n.prototype.mulTo = function(t, e, i) {
      t.multiplyTo(e, i), this.reduce(i);
    }, n.prototype.sqrTo = function(t, e) {
      t.squareTo(e), this.reduce(e);
    }, n;
  }()
), Di = (
  /** @class */
  function() {
    function n(t) {
      this.m = t, this.r2 = E(), this.q3 = E(), P.ONE.dlShiftTo(2 * t.t, this.r2), this.mu = this.r2.divide(t);
    }
    return n.prototype.convert = function(t) {
      if (t.s < 0 || t.t > 2 * this.m.t)
        return t.mod(this.m);
      if (t.compareTo(this.m) < 0)
        return t;
      var e = E();
      return t.copyTo(e), this.reduce(e), e;
    }, n.prototype.revert = function(t) {
      return t;
    }, n.prototype.reduce = function(t) {
      for (t.drShiftTo(this.m.t - 1, this.r2), t.t > this.m.t + 1 && (t.t = this.m.t + 1, t.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); t.compareTo(this.r2) < 0; )
        t.dAddOffset(1, this.m.t + 1);
      for (t.subTo(this.r2, t); t.compareTo(this.m) >= 0; )
        t.subTo(this.m, t);
    }, n.prototype.mulTo = function(t, e, i) {
      t.multiplyTo(e, i), this.reduce(i);
    }, n.prototype.sqrTo = function(t, e) {
      t.squareTo(e), this.reduce(e);
    }, n;
  }()
);
function E() {
  return new P(null);
}
function C(n, t) {
  return new P(n, t);
}
var ve = typeof navigator < "u";
ve && ye && navigator.appName == "Microsoft Internet Explorer" ? (P.prototype.am = function(t, e, i, r, s, a) {
  for (var o = e & 32767, c = e >> 15; --a >= 0; ) {
    var h = this[t] & 32767, u = this[t++] >> 15, f = c * h + u * o;
    h = o * h + ((f & 32767) << 15) + i[r] + (s & 1073741823), s = (h >>> 30) + (f >>> 15) + c * u + (s >>> 30), i[r++] = h & 1073741823;
  }
  return s;
}, Y = 30) : ve && ye && navigator.appName != "Netscape" ? (P.prototype.am = function(t, e, i, r, s, a) {
  for (; --a >= 0; ) {
    var o = e * this[t++] + i[r] + s;
    s = Math.floor(o / 67108864), i[r++] = o & 67108863;
  }
  return s;
}, Y = 26) : (P.prototype.am = function(t, e, i, r, s, a) {
  for (var o = e & 16383, c = e >> 14; --a >= 0; ) {
    var h = this[t] & 16383, u = this[t++] >> 14, f = c * h + u * o;
    h = o * h + ((f & 16383) << 14) + i[r] + s, s = (h >> 28) + (f >> 14) + c * u, i[r++] = h & 268435455;
  }
  return s;
}, Y = 28);
P.prototype.DB = Y;
P.prototype.DM = (1 << Y) - 1;
P.prototype.DV = 1 << Y;
var ne = 52;
P.prototype.FV = Math.pow(2, ne);
P.prototype.F1 = ne - Y;
P.prototype.F2 = 2 * Y - ne;
var Lt = [], pt, k;
pt = 48;
for (k = 0; k <= 9; ++k)
  Lt[pt++] = k;
pt = 97;
for (k = 10; k < 36; ++k)
  Lt[pt++] = k;
pt = 65;
for (k = 10; k < 36; ++k)
  Lt[pt++] = k;
function Ee(n, t) {
  var e = Lt[n.charCodeAt(t)];
  return e ?? -1;
}
function Q(n) {
  var t = E();
  return t.fromInt(n), t;
}
function Tt(n) {
  var t = 1, e;
  return (e = n >>> 16) != 0 && (n = e, t += 16), (e = n >> 8) != 0 && (n = e, t += 8), (e = n >> 4) != 0 && (n = e, t += 4), (e = n >> 2) != 0 && (n = e, t += 2), (e = n >> 1) != 0 && (n = e, t += 1), t;
}
P.ZERO = Q(0);
P.ONE = Q(1);
var Ii = (
  /** @class */
  function() {
    function n() {
      this.i = 0, this.j = 0, this.S = [];
    }
    return n.prototype.init = function(t) {
      var e, i, r;
      for (e = 0; e < 256; ++e)
        this.S[e] = e;
      for (i = 0, e = 0; e < 256; ++e)
        i = i + this.S[e] + t[e % t.length] & 255, r = this.S[e], this.S[e] = this.S[i], this.S[i] = r;
      this.i = 0, this.j = 0;
    }, n.prototype.next = function() {
      var t;
      return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, t = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = t, this.S[t + this.S[this.i] & 255];
    }, n;
  }()
);
function Bi() {
  return new Ii();
}
var He = 256, At, Z = null, F;
if (Z == null) {
  Z = [], F = 0;
  var Ct = void 0;
  if (typeof window < "u" && self.crypto && self.crypto.getRandomValues) {
    var Wt = new Uint32Array(256);
    for (self.crypto.getRandomValues(Wt), Ct = 0; Ct < Wt.length; ++Ct)
      Z[F++] = Wt[Ct] & 255;
  }
  var Rt = 0, Ot = function(n) {
    if (Rt = Rt || 0, Rt >= 256 || F >= He) {
      self.removeEventListener ? self.removeEventListener("mousemove", Ot, !1) : self.detachEvent && self.detachEvent("onmousemove", Ot);
      return;
    }
    try {
      var t = n.x + n.y;
      Z[F++] = t & 255, Rt += 1;
    } catch {
    }
  };
  typeof window < "u" && (self.addEventListener ? self.addEventListener("mousemove", Ot, !1) : self.attachEvent && self.attachEvent("onmousemove", Ot));
}
function Ni() {
  if (At == null) {
    for (At = Bi(); F < He; ) {
      var n = Math.floor(65536 * Math.random());
      Z[F++] = n & 255;
    }
    for (At.init(Z), F = 0; F < Z.length; ++F)
      Z[F] = 0;
    F = 0;
  }
  return At.next();
}
var Vt = (
  /** @class */
  function() {
    function n() {
    }
    return n.prototype.nextBytes = function(t) {
      for (var e = 0; e < t.length; ++e)
        t[e] = Ni();
    }, n;
  }()
);
function Qt(n) {
  return Vi(Ki(xi(n), n.length * 8));
}
function we(n) {
  for (var t = "0123456789abcdef", e = "", i = 0; i < n.length; i++) {
    var r = n.charCodeAt(i);
    e += t.charAt(r >>> 4 & 15) + t.charAt(r & 15);
  }
  return e;
}
function xi(n) {
  for (var t = Array(n.length >> 2), e = 0; e < t.length; e++)
    t[e] = 0;
  for (var e = 0; e < n.length * 8; e += 8)
    t[e >> 5] |= (n.charCodeAt(e / 8) & 255) << 24 - e % 32;
  return t;
}
function Vi(n) {
  for (var t = "", e = 0; e < n.length * 32; e += 8)
    t += String.fromCharCode(n[e >> 5] >>> 24 - e % 32 & 255);
  return t;
}
function W(n, t) {
  return n >>> t | n << 32 - t;
}
function We(n, t) {
  return n >>> t;
}
function Ui(n, t, e) {
  return n & t ^ ~n & e;
}
function Li(n, t, e) {
  return n & t ^ n & e ^ t & e;
}
function Mi(n) {
  return W(n, 2) ^ W(n, 13) ^ W(n, 22);
}
function ki(n) {
  return W(n, 6) ^ W(n, 11) ^ W(n, 25);
}
function Fi(n) {
  return W(n, 7) ^ W(n, 18) ^ We(n, 3);
}
function ji(n) {
  return W(n, 17) ^ W(n, 19) ^ We(n, 10);
}
var qi = new Array(1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998);
function Ki(n, t) {
  var e = new Array(1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225), i = new Array(64), r, s, a, o, c, h, u, f, _, y, d, m;
  for (n[t >> 5] |= 128 << 24 - t % 32, n[(t + 64 >> 9 << 4) + 15] = t, _ = 0; _ < n.length; _ += 16) {
    for (r = e[0], s = e[1], a = e[2], o = e[3], c = e[4], h = e[5], u = e[6], f = e[7], y = 0; y < 64; y++)
      y < 16 ? i[y] = n[y + _] : i[y] = I(I(I(ji(i[y - 2]), i[y - 7]), Fi(i[y - 15])), i[y - 16]), d = I(I(I(I(f, ki(c)), Ui(c, h, u)), qi[y]), i[y]), m = I(Mi(r), Li(r, s, a)), f = u, u = h, h = c, c = I(o, d), o = a, a = s, s = r, r = I(d, m);
    e[0] = I(r, e[0]), e[1] = I(s, e[1]), e[2] = I(a, e[2]), e[3] = I(o, e[3]), e[4] = I(c, e[4]), e[5] = I(h, e[5]), e[6] = I(u, e[6]), e[7] = I(f, e[7]);
  }
  return e;
}
function I(n, t) {
  var e = (n & 65535) + (t & 65535), i = (n >> 16) + (t >> 16) + (e >> 16);
  return i << 16 | e & 65535;
}
function Hi(n, t) {
  if (t < n.length + 22)
    return console.error("Message too long for RSA"), null;
  for (var e = t - n.length - 6, i = "", r = 0; r < e; r += 2)
    i += "ff";
  var s = "0001" + i + "00" + n;
  return C(s, 16);
}
function Wi(n, t) {
  if (t < n.length + 11)
    return console.error("Message too long for RSA"), null;
  for (var e = [], i = n.length - 1; i >= 0 && t > 0; ) {
    var r = n.charCodeAt(i--);
    r < 128 ? e[--t] = r : r > 127 && r < 2048 ? (e[--t] = r & 63 | 128, e[--t] = r >> 6 | 192) : (e[--t] = r & 63 | 128, e[--t] = r >> 6 & 63 | 128, e[--t] = r >> 12 | 224);
  }
  e[--t] = 0;
  for (var s = new Vt(), a = []; t > 2; ) {
    for (a[0] = 0; a[0] == 0; )
      s.nextBytes(a);
    e[--t] = a[0];
  }
  return e[--t] = 2, e[--t] = 0, new P(e);
}
function Se(n, t, e) {
  for (var i = "", r = 0; i.length < t; )
    i += e(String.fromCharCode.apply(String, n.concat([
      (r & 4278190080) >> 24,
      (r & 16711680) >> 16,
      (r & 65280) >> 8,
      r & 255
    ]))), r += 1;
  return i;
}
var Xi = 32;
function zi(n, t) {
  var e = Xi, i = Qt;
  if (n.length + 2 * e + 2 > t)
    throw "Message too long for RSA";
  var r = "", s;
  for (s = 0; s < t - n.length - 2 * e - 2; s += 1)
    r += "\0";
  var a = i("") + r + "" + n, o = new Array(e);
  new Vt().nextBytes(o);
  var c = Se(o, a.length, i), h = [];
  for (s = 0; s < a.length; s += 1)
    h[s] = a.charCodeAt(s) ^ c.charCodeAt(s);
  var u = Se(h, o.length, i), f = [0];
  for (s = 0; s < o.length; s += 1)
    f[s + 1] = o[s] ^ u.charCodeAt(s);
  return new P(f.concat(h));
}
var Gi = (
  /** @class */
  function() {
    function n() {
      this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null;
    }
    return n.prototype.doPublic = function(t) {
      return t.modPowInt(this.e, this.n);
    }, n.prototype.doPrivate = function(t) {
      if (this.p == null || this.q == null)
        return t.modPow(this.d, this.n);
      for (var e = t.mod(this.p).modPow(this.dmp1, this.p), i = t.mod(this.q).modPow(this.dmq1, this.q); e.compareTo(i) < 0; )
        e = e.add(this.p);
      return e.subtract(i).multiply(this.coeff).mod(this.p).multiply(this.q).add(i);
    }, n.prototype.setPublic = function(t, e) {
      t != null && e != null && t.length > 0 && e.length > 0 ? (this.n = C(t, 16), this.e = parseInt(e, 16)) : console.error("Invalid RSA public key");
    }, n.prototype.encrypt = function(t, e) {
      typeof e > "u" && (e = Wi);
      var i = this.n.bitLength() + 7 >> 3, r = e(t, i);
      if (r == null)
        return null;
      var s = this.doPublic(r);
      if (s == null)
        return null;
      for (var a = s.toString(16), o = a.length, c = 0; c < i * 2 - o; c++)
        a = "0" + a;
      return a;
    }, n.prototype.setPrivate = function(t, e, i) {
      t != null && e != null && t.length > 0 && e.length > 0 ? (this.n = C(t, 16), this.e = parseInt(e, 16), this.d = C(i, 16)) : console.error("Invalid RSA private key");
    }, n.prototype.setPrivateEx = function(t, e, i, r, s, a, o, c) {
      t != null && e != null && t.length > 0 && e.length > 0 ? (this.n = C(t, 16), this.e = parseInt(e, 16), this.d = C(i, 16), this.p = C(r, 16), this.q = C(s, 16), this.dmp1 = C(a, 16), this.dmq1 = C(o, 16), this.coeff = C(c, 16)) : console.error("Invalid RSA private key");
    }, n.prototype.generate = function(t, e) {
      var i = new Vt(), r = t >> 1;
      this.e = parseInt(e, 16);
      for (var s = new P(e, 16); ; ) {
        for (; this.p = new P(t - r, 1, i), !(this.p.subtract(P.ONE).gcd(s).compareTo(P.ONE) == 0 && this.p.isProbablePrime(10)); )
          ;
        for (; this.q = new P(r, 1, i), !(this.q.subtract(P.ONE).gcd(s).compareTo(P.ONE) == 0 && this.q.isProbablePrime(10)); )
          ;
        if (this.p.compareTo(this.q) <= 0) {
          var a = this.p;
          this.p = this.q, this.q = a;
        }
        var o = this.p.subtract(P.ONE), c = this.q.subtract(P.ONE), h = o.multiply(c);
        if (h.gcd(s).compareTo(P.ONE) == 0) {
          this.n = this.p.multiply(this.q), this.d = s.modInverse(h), this.dmp1 = this.d.mod(o), this.dmq1 = this.d.mod(c), this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    }, n.prototype.decrypt = function(t) {
      var e = C(t, 16), i = this.doPrivate(e);
      return i == null ? null : $i(i, this.n.bitLength() + 7 >> 3);
    }, n.prototype.generateAsync = function(t, e, i) {
      var r = new Vt(), s = t >> 1;
      this.e = parseInt(e, 16);
      var a = new P(e, 16), o = this, c = function() {
        var h = function() {
          if (o.p.compareTo(o.q) <= 0) {
            var _ = o.p;
            o.p = o.q, o.q = _;
          }
          var y = o.p.subtract(P.ONE), d = o.q.subtract(P.ONE), m = y.multiply(d);
          m.gcd(a).compareTo(P.ONE) == 0 ? (o.n = o.p.multiply(o.q), o.d = a.modInverse(m), o.dmp1 = o.d.mod(y), o.dmq1 = o.d.mod(d), o.coeff = o.q.modInverse(o.p), setTimeout(function() {
            i();
          }, 0)) : setTimeout(c, 0);
        }, u = function() {
          o.q = E(), o.q.fromNumberAsync(s, 1, r, function() {
            o.q.subtract(P.ONE).gcda(a, function(_) {
              _.compareTo(P.ONE) == 0 && o.q.isProbablePrime(10) ? setTimeout(h, 0) : setTimeout(u, 0);
            });
          });
        }, f = function() {
          o.p = E(), o.p.fromNumberAsync(t - s, 1, r, function() {
            o.p.subtract(P.ONE).gcda(a, function(_) {
              _.compareTo(P.ONE) == 0 && o.p.isProbablePrime(10) ? setTimeout(u, 0) : setTimeout(f, 0);
            });
          });
        };
        setTimeout(f, 0);
      };
      setTimeout(c, 0);
    }, n.prototype.sign = function(t, e, i) {
      var r = Ji(i), s = r + e(t).toString(), a = this.n.bitLength() / 4, o = Hi(s, a);
      if (o == null)
        return null;
      var c = this.doPrivate(o);
      if (c == null)
        return null;
      for (var h = c.toString(16), u = h.length, f = 0; f < a - u; f++)
        h = "0" + h;
      return h;
    }, n.prototype.verify = function(t, e, i) {
      var r = C(e, 16), s = this.doPublic(r);
      if (s == null)
        return null;
      var a = s.toString(16).replace(/^1f+00/, ""), o = Qi(a);
      return o == i(t).toString();
    }, n;
  }()
);
function $i(n, t) {
  for (var e = n.toByteArray(), i = 0; i < e.length && e[i] == 0; )
    ++i;
  if (e.length - i != t - 1 || e[i] != 2)
    return null;
  for (++i; e[i] != 0; )
    if (++i >= e.length)
      return null;
  for (var r = ""; ++i < e.length; ) {
    var s = e[i] & 255;
    s < 128 ? r += String.fromCharCode(s) : s > 191 && s < 224 ? (r += String.fromCharCode((s & 31) << 6 | e[i + 1] & 63), ++i) : (r += String.fromCharCode((s & 15) << 12 | (e[i + 1] & 63) << 6 | e[i + 2] & 63), i += 2);
  }
  return r;
}
var It = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};
function Ji(n) {
  return It[n] || "";
}
function Qi(n) {
  for (var t in It)
    if (It.hasOwnProperty(t)) {
      var e = It[t], i = e.length;
      if (n.substring(0, i) == e)
        return n.substring(i);
    }
  return n;
}
function R(n, t, e) {
  if (!t || !n)
    throw new Error("extend failed, please check that all dependencies are included.");
  var i = function() {
  };
  i.prototype = t.prototype, n.prototype = new i(), n.prototype.constructor = n, n.superclass = t.prototype, t.prototype.constructor == Object.prototype.constructor && (t.prototype.constructor = t);
}
/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */
var p = {};
(typeof p.asn1 > "u" || !p.asn1) && (p.asn1 = {});
p.asn1.ASN1Util = new function() {
  this.integerToByteHex = function(n) {
    var t = n.toString(16);
    return t.length % 2 == 1 && (t = "0" + t), t;
  }, this.bigIntToMinTwosComplementsHex = function(n) {
    var t = n.toString(16);
    if (t.substring(0, 1) != "-")
      t.length % 2 == 1 ? t = "0" + t : t.match(/^[0-7]/) || (t = "00" + t);
    else {
      var e = t.substring(1), i = e.length;
      i % 2 == 1 ? i += 1 : t.match(/^[0-7]/) || (i += 2);
      for (var r = "", s = 0; s < i; s++)
        r += "f";
      var a = new P(r, 16), o = a.xor(n).add(P.ONE);
      t = o.toString(16).replace(/^-/, "");
    }
    return t;
  }, this.getPEMStringFromHex = function(n, t) {
    return hextopem(n, t);
  }, this.newObject = function(n) {
    var t = p, e = t.asn1, i = e.DERBoolean, r = e.DERInteger, s = e.DERBitString, a = e.DEROctetString, o = e.DERNull, c = e.DERObjectIdentifier, h = e.DEREnumerated, u = e.DERUTF8String, f = e.DERNumericString, _ = e.DERPrintableString, y = e.DERTeletexString, d = e.DERIA5String, m = e.DERUTCTime, g = e.DERGeneralizedTime, w = e.DERSequence, A = e.DERSet, T = e.DERTaggedObject, O = e.ASN1Util.newObject, x = Object.keys(n);
    if (x.length != 1)
      throw "key of param shall be only one.";
    var b = x[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + b + ":") == -1)
      throw "undefined key: " + b;
    if (b == "bool")
      return new i(n[b]);
    if (b == "int")
      return new r(n[b]);
    if (b == "bitstr")
      return new s(n[b]);
    if (b == "octstr")
      return new a(n[b]);
    if (b == "null")
      return new o(n[b]);
    if (b == "oid")
      return new c(n[b]);
    if (b == "enum")
      return new h(n[b]);
    if (b == "utf8str")
      return new u(n[b]);
    if (b == "numstr")
      return new f(n[b]);
    if (b == "prnstr")
      return new _(n[b]);
    if (b == "telstr")
      return new y(n[b]);
    if (b == "ia5str")
      return new d(n[b]);
    if (b == "utctime")
      return new m(n[b]);
    if (b == "gentime")
      return new g(n[b]);
    if (b == "seq") {
      for (var D = n[b], X = [], M = 0; M < D.length; M++) {
        var st = O(D[M]);
        X.push(st);
      }
      return new w({ array: X });
    }
    if (b == "set") {
      for (var D = n[b], X = [], M = 0; M < D.length; M++) {
        var st = O(D[M]);
        X.push(st);
      }
      return new A({ array: X });
    }
    if (b == "tag") {
      var V = n[b];
      if (Object.prototype.toString.call(V) === "[object Array]" && V.length == 3) {
        var at = O(V[2]);
        return new T({
          tag: V[0],
          explicit: V[1],
          obj: at
        });
      } else {
        var q = {};
        if (V.explicit !== void 0 && (q.explicit = V.explicit), V.tag !== void 0 && (q.tag = V.tag), V.obj === void 0)
          throw "obj shall be specified for 'tag'.";
        return q.obj = O(V.obj), new T(q);
      }
    }
  }, this.jsonToASN1HEX = function(n) {
    var t = this.newObject(n);
    return t.getEncodedHex();
  };
}();
p.asn1.ASN1Util.oidHexToInt = function(n) {
  for (var r = "", t = parseInt(n.substring(0, 2), 16), e = Math.floor(t / 40), i = t % 40, r = e + "." + i, s = "", a = 2; a < n.length; a += 2) {
    var o = parseInt(n.substring(a, a + 2), 16), c = ("00000000" + o.toString(2)).slice(-8);
    if (s = s + c.substring(1, 8), c.substring(0, 1) == "0") {
      var h = new P(s, 2);
      r = r + "." + h.toString(10), s = "";
    }
  }
  return r;
};
p.asn1.ASN1Util.oidIntToHex = function(n) {
  var t = function(o) {
    var c = o.toString(16);
    return c.length == 1 && (c = "0" + c), c;
  }, e = function(o) {
    var c = "", h = new P(o, 10), u = h.toString(2), f = 7 - u.length % 7;
    f == 7 && (f = 0);
    for (var _ = "", y = 0; y < f; y++)
      _ += "0";
    u = _ + u;
    for (var y = 0; y < u.length - 1; y += 7) {
      var d = u.substring(y, y + 7);
      y != u.length - 7 && (d = "1" + d), c += t(parseInt(d, 2));
    }
    return c;
  };
  if (!n.match(/^[0-9.]+$/))
    throw "malformed oid string: " + n;
  var i = "", r = n.split("."), s = parseInt(r[0]) * 40 + parseInt(r[1]);
  i += t(s), r.splice(0, 2);
  for (var a = 0; a < r.length; a++)
    i += e(r[a]);
  return i;
};
p.asn1.ASN1Object = function() {
  var n = "";
  this.getLengthHexFromValue = function() {
    if (typeof this.hV > "u" || this.hV == null)
      throw "this.hV is null or undefined.";
    if (this.hV.length % 2 == 1)
      throw "value hex must be even length: n=" + n.length + ",v=" + this.hV;
    var t = this.hV.length / 2, e = t.toString(16);
    if (e.length % 2 == 1 && (e = "0" + e), t < 128)
      return e;
    var i = e.length / 2;
    if (i > 15)
      throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
    var r = 128 + i;
    return r.toString(16) + e;
  }, this.getEncodedHex = function() {
    return (this.hTLV == null || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV;
  }, this.getValueHex = function() {
    return this.getEncodedHex(), this.hV;
  }, this.getFreshValueHex = function() {
    return "";
  };
};
p.asn1.DERAbstractString = function(n) {
  p.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function() {
    return this.s;
  }, this.setString = function(t) {
    this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(this.s);
  }, this.setStringHex = function(t) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = t;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof n < "u" && (typeof n == "string" ? this.setString(n) : typeof n.str < "u" ? this.setString(n.str) : typeof n.hex < "u" && this.setStringHex(n.hex));
};
R(p.asn1.DERAbstractString, p.asn1.ASN1Object);
p.asn1.DERAbstractTime = function(n) {
  p.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function(t) {
    utc = t.getTime() + t.getTimezoneOffset() * 6e4;
    var e = new Date(utc);
    return e;
  }, this.formatDate = function(t, e, i) {
    var r = this.zeroPadding, s = this.localDateToUTC(t), a = String(s.getFullYear());
    e == "utc" && (a = a.substring(2, 4));
    var o = r(String(s.getMonth() + 1), 2), c = r(String(s.getDate()), 2), h = r(String(s.getHours()), 2), u = r(String(s.getMinutes()), 2), f = r(String(s.getSeconds()), 2), _ = a + o + c + h + u + f;
    if (i === !0) {
      var y = s.getMilliseconds();
      if (y != 0) {
        var d = r(String(y), 3);
        d = d.replace(/[0]+$/, ""), _ = _ + "." + d;
      }
    }
    return _ + "Z";
  }, this.zeroPadding = function(t, e) {
    return t.length >= e ? t : new Array(e - t.length + 1).join("0") + t;
  }, this.getString = function() {
    return this.s;
  }, this.setString = function(t) {
    this.hTLV = null, this.isModified = !0, this.s = t, this.hV = stohex(t);
  }, this.setByDateValue = function(t, e, i, r, s, a) {
    var o = new Date(Date.UTC(t, e - 1, i, r, s, a, 0));
    this.setByDate(o);
  }, this.getFreshValueHex = function() {
    return this.hV;
  };
};
R(p.asn1.DERAbstractTime, p.asn1.ASN1Object);
p.asn1.DERAbstractStructured = function(n) {
  p.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function(t) {
    this.hTLV = null, this.isModified = !0, this.asn1Array = t;
  }, this.appendASN1Object = function(t) {
    this.hTLV = null, this.isModified = !0, this.asn1Array.push(t);
  }, this.asn1Array = new Array(), typeof n < "u" && typeof n.array < "u" && (this.asn1Array = n.array);
};
R(p.asn1.DERAbstractStructured, p.asn1.ASN1Object);
p.asn1.DERBoolean = function() {
  p.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff";
};
R(p.asn1.DERBoolean, p.asn1.ASN1Object);
p.asn1.DERInteger = function(n) {
  p.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(t) {
    this.hTLV = null, this.isModified = !0, this.hV = p.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t);
  }, this.setByInteger = function(t) {
    var e = new P(String(t), 10);
    this.setByBigInteger(e);
  }, this.setValueHex = function(t) {
    this.hV = t;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof n < "u" && (typeof n.bigint < "u" ? this.setByBigInteger(n.bigint) : typeof n.int < "u" ? this.setByInteger(n.int) : typeof n == "number" ? this.setByInteger(n) : typeof n.hex < "u" && this.setValueHex(n.hex));
};
R(p.asn1.DERInteger, p.asn1.ASN1Object);
p.asn1.DERBitString = function(n) {
  if (n !== void 0 && typeof n.obj < "u") {
    var t = p.asn1.ASN1Util.newObject(n.obj);
    n.hex = "00" + t.getEncodedHex();
  }
  p.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(e) {
    this.hTLV = null, this.isModified = !0, this.hV = e;
  }, this.setUnusedBitsAndHexValue = function(e, i) {
    if (e < 0 || 7 < e)
      throw "unused bits shall be from 0 to 7: u = " + e;
    var r = "0" + e;
    this.hTLV = null, this.isModified = !0, this.hV = r + i;
  }, this.setByBinaryString = function(e) {
    e = e.replace(/0+$/, "");
    var i = 8 - e.length % 8;
    i == 8 && (i = 0);
    for (var r = 0; r <= i; r++)
      e += "0";
    for (var s = "", r = 0; r < e.length - 1; r += 8) {
      var a = e.substring(r, r + 8), o = parseInt(a, 2).toString(16);
      o.length == 1 && (o = "0" + o), s += o;
    }
    this.hTLV = null, this.isModified = !0, this.hV = "0" + i + s;
  }, this.setByBooleanArray = function(e) {
    for (var i = "", r = 0; r < e.length; r++)
      e[r] == !0 ? i += "1" : i += "0";
    this.setByBinaryString(i);
  }, this.newFalseArray = function(e) {
    for (var i = new Array(e), r = 0; r < e; r++)
      i[r] = !1;
    return i;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof n < "u" && (typeof n == "string" && n.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(n) : typeof n.hex < "u" ? this.setHexValueIncludingUnusedBits(n.hex) : typeof n.bin < "u" ? this.setByBinaryString(n.bin) : typeof n.array < "u" && this.setByBooleanArray(n.array));
};
R(p.asn1.DERBitString, p.asn1.ASN1Object);
p.asn1.DEROctetString = function(n) {
  if (n !== void 0 && typeof n.obj < "u") {
    var t = p.asn1.ASN1Util.newObject(n.obj);
    n.hex = t.getEncodedHex();
  }
  p.asn1.DEROctetString.superclass.constructor.call(this, n), this.hT = "04";
};
R(p.asn1.DEROctetString, p.asn1.DERAbstractString);
p.asn1.DERNull = function() {
  p.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500";
};
R(p.asn1.DERNull, p.asn1.ASN1Object);
p.asn1.DERObjectIdentifier = function(n) {
  var t = function(i) {
    var r = i.toString(16);
    return r.length == 1 && (r = "0" + r), r;
  }, e = function(i) {
    var r = "", s = new P(i, 10), a = s.toString(2), o = 7 - a.length % 7;
    o == 7 && (o = 0);
    for (var c = "", h = 0; h < o; h++)
      c += "0";
    a = c + a;
    for (var h = 0; h < a.length - 1; h += 7) {
      var u = a.substring(h, h + 7);
      h != a.length - 7 && (u = "1" + u), r += t(parseInt(u, 2));
    }
    return r;
  };
  p.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(i) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = i;
  }, this.setValueOidString = function(i) {
    if (!i.match(/^[0-9.]+$/))
      throw "malformed oid string: " + i;
    var r = "", s = i.split("."), a = parseInt(s[0]) * 40 + parseInt(s[1]);
    r += t(a), s.splice(0, 2);
    for (var o = 0; o < s.length; o++)
      r += e(s[o]);
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = r;
  }, this.setValueName = function(i) {
    var r = p.asn1.x509.OID.name2oid(i);
    if (r !== "")
      this.setValueOidString(r);
    else
      throw "DERObjectIdentifier oidName undefined: " + i;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, n !== void 0 && (typeof n == "string" ? n.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(n) : this.setValueName(n) : n.oid !== void 0 ? this.setValueOidString(n.oid) : n.hex !== void 0 ? this.setValueHex(n.hex) : n.name !== void 0 && this.setValueName(n.name));
};
R(p.asn1.DERObjectIdentifier, p.asn1.ASN1Object);
p.asn1.DEREnumerated = function(n) {
  p.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(t) {
    this.hTLV = null, this.isModified = !0, this.hV = p.asn1.ASN1Util.bigIntToMinTwosComplementsHex(t);
  }, this.setByInteger = function(t) {
    var e = new P(String(t), 10);
    this.setByBigInteger(e);
  }, this.setValueHex = function(t) {
    this.hV = t;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof n < "u" && (typeof n.int < "u" ? this.setByInteger(n.int) : typeof n == "number" ? this.setByInteger(n) : typeof n.hex < "u" && this.setValueHex(n.hex));
};
R(p.asn1.DEREnumerated, p.asn1.ASN1Object);
p.asn1.DERUTF8String = function(n) {
  p.asn1.DERUTF8String.superclass.constructor.call(this, n), this.hT = "0c";
};
R(p.asn1.DERUTF8String, p.asn1.DERAbstractString);
p.asn1.DERNumericString = function(n) {
  p.asn1.DERNumericString.superclass.constructor.call(this, n), this.hT = "12";
};
R(p.asn1.DERNumericString, p.asn1.DERAbstractString);
p.asn1.DERPrintableString = function(n) {
  p.asn1.DERPrintableString.superclass.constructor.call(this, n), this.hT = "13";
};
R(p.asn1.DERPrintableString, p.asn1.DERAbstractString);
p.asn1.DERTeletexString = function(n) {
  p.asn1.DERTeletexString.superclass.constructor.call(this, n), this.hT = "14";
};
R(p.asn1.DERTeletexString, p.asn1.DERAbstractString);
p.asn1.DERIA5String = function(n) {
  p.asn1.DERIA5String.superclass.constructor.call(this, n), this.hT = "16";
};
R(p.asn1.DERIA5String, p.asn1.DERAbstractString);
p.asn1.DERUTCTime = function(n) {
  p.asn1.DERUTCTime.superclass.constructor.call(this, n), this.hT = "17", this.setByDate = function(t) {
    this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s);
  }, this.getFreshValueHex = function() {
    return typeof this.date > "u" && typeof this.s > "u" && (this.date = /* @__PURE__ */ new Date(), this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)), this.hV;
  }, n !== void 0 && (n.str !== void 0 ? this.setString(n.str) : typeof n == "string" && n.match(/^[0-9]{12}Z$/) ? this.setString(n) : n.hex !== void 0 ? this.setStringHex(n.hex) : n.date !== void 0 && this.setByDate(n.date));
};
R(p.asn1.DERUTCTime, p.asn1.DERAbstractTime);
p.asn1.DERGeneralizedTime = function(n) {
  p.asn1.DERGeneralizedTime.superclass.constructor.call(this, n), this.hT = "18", this.withMillis = !1, this.setByDate = function(t) {
    this.hTLV = null, this.isModified = !0, this.date = t, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s);
  }, this.getFreshValueHex = function() {
    return this.date === void 0 && this.s === void 0 && (this.date = /* @__PURE__ */ new Date(), this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)), this.hV;
  }, n !== void 0 && (n.str !== void 0 ? this.setString(n.str) : typeof n == "string" && n.match(/^[0-9]{14}Z$/) ? this.setString(n) : n.hex !== void 0 ? this.setStringHex(n.hex) : n.date !== void 0 && this.setByDate(n.date), n.millis === !0 && (this.withMillis = !0));
};
R(p.asn1.DERGeneralizedTime, p.asn1.DERAbstractTime);
p.asn1.DERSequence = function(n) {
  p.asn1.DERSequence.superclass.constructor.call(this, n), this.hT = "30", this.getFreshValueHex = function() {
    for (var t = "", e = 0; e < this.asn1Array.length; e++) {
      var i = this.asn1Array[e];
      t += i.getEncodedHex();
    }
    return this.hV = t, this.hV;
  };
};
R(p.asn1.DERSequence, p.asn1.DERAbstractStructured);
p.asn1.DERSet = function(n) {
  p.asn1.DERSet.superclass.constructor.call(this, n), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function() {
    for (var t = new Array(), e = 0; e < this.asn1Array.length; e++) {
      var i = this.asn1Array[e];
      t.push(i.getEncodedHex());
    }
    return this.sortFlag == !0 && t.sort(), this.hV = t.join(""), this.hV;
  }, typeof n < "u" && typeof n.sortflag < "u" && n.sortflag == !1 && (this.sortFlag = !1);
};
R(p.asn1.DERSet, p.asn1.DERAbstractStructured);
p.asn1.DERTaggedObject = function(n) {
  p.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(t, e, i) {
    this.hT = e, this.isExplicit = t, this.asn1Object = i, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = i.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, e), this.isModified = !1);
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof n < "u" && (typeof n.tag < "u" && (this.hT = n.tag), typeof n.explicit < "u" && (this.isExplicit = n.explicit), typeof n.obj < "u" && (this.asn1Object = n.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)));
};
R(p.asn1.DERTaggedObject, p.asn1.ASN1Object);
var Zi = /* @__PURE__ */ function() {
  var n = function(t, e) {
    return n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(i, r) {
      i.__proto__ = r;
    } || function(i, r) {
      for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (i[s] = r[s]);
    }, n(t, e);
  };
  return function(t, e) {
    if (typeof e != "function" && e !== null)
      throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
    n(t, e);
    function i() {
      this.constructor = t;
    }
    t.prototype = e === null ? Object.create(e) : (i.prototype = e.prototype, new i());
  };
}(), Te = (
  /** @class */
  function(n) {
    Zi(t, n);
    function t(e) {
      var i = n.call(this) || this;
      return e && (typeof e == "string" ? i.parseKey(e) : (t.hasPrivateKeyProperty(e) || t.hasPublicKeyProperty(e)) && i.parsePropertiesFrom(e)), i;
    }
    return t.prototype.parseKey = function(e) {
      try {
        var i = 0, r = 0, s = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/, a = s.test(e) ? wi.decode(e) : Jt.unarmor(e), o = Ai.decode(a);
        if (o.sub.length === 3 && (o = o.sub[2].sub[0]), o.sub.length === 9) {
          i = o.sub[1].getHexStringValue(), this.n = C(i, 16), r = o.sub[2].getHexStringValue(), this.e = parseInt(r, 16);
          var c = o.sub[3].getHexStringValue();
          this.d = C(c, 16);
          var h = o.sub[4].getHexStringValue();
          this.p = C(h, 16);
          var u = o.sub[5].getHexStringValue();
          this.q = C(u, 16);
          var f = o.sub[6].getHexStringValue();
          this.dmp1 = C(f, 16);
          var _ = o.sub[7].getHexStringValue();
          this.dmq1 = C(_, 16);
          var y = o.sub[8].getHexStringValue();
          this.coeff = C(y, 16);
        } else if (o.sub.length === 2)
          if (o.sub[0].sub) {
            var d = o.sub[1], m = d.sub[0];
            i = m.sub[0].getHexStringValue(), this.n = C(i, 16), r = m.sub[1].getHexStringValue(), this.e = parseInt(r, 16);
          } else
            i = o.sub[0].getHexStringValue(), this.n = C(i, 16), r = o.sub[1].getHexStringValue(), this.e = parseInt(r, 16);
        else
          return !1;
        return !0;
      } catch {
        return !1;
      }
    }, t.prototype.getPrivateBaseKey = function() {
      var e = {
        array: [
          new p.asn1.DERInteger({ int: 0 }),
          new p.asn1.DERInteger({ bigint: this.n }),
          new p.asn1.DERInteger({ int: this.e }),
          new p.asn1.DERInteger({ bigint: this.d }),
          new p.asn1.DERInteger({ bigint: this.p }),
          new p.asn1.DERInteger({ bigint: this.q }),
          new p.asn1.DERInteger({ bigint: this.dmp1 }),
          new p.asn1.DERInteger({ bigint: this.dmq1 }),
          new p.asn1.DERInteger({ bigint: this.coeff })
        ]
      }, i = new p.asn1.DERSequence(e);
      return i.getEncodedHex();
    }, t.prototype.getPrivateBaseKeyB64 = function() {
      return yt(this.getPrivateBaseKey());
    }, t.prototype.getPublicBaseKey = function() {
      var e = new p.asn1.DERSequence({
        array: [
          new p.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
          // RSA Encryption pkcs #1 oid
          new p.asn1.DERNull()
        ]
      }), i = new p.asn1.DERSequence({
        array: [
          new p.asn1.DERInteger({ bigint: this.n }),
          new p.asn1.DERInteger({ int: this.e })
        ]
      }), r = new p.asn1.DERBitString({
        hex: "00" + i.getEncodedHex()
      }), s = new p.asn1.DERSequence({
        array: [e, r]
      });
      return s.getEncodedHex();
    }, t.prototype.getPublicBaseKeyB64 = function() {
      return yt(this.getPublicBaseKey());
    }, t.wordwrap = function(e, i) {
      if (i = i || 64, !e)
        return e;
      var r = "(.{1," + i + `})( +|$
?)|(.{1,` + i + "})";
      return e.match(RegExp(r, "g")).join(`
`);
    }, t.prototype.getPrivateKey = function() {
      var e = `-----BEGIN RSA PRIVATE KEY-----
`;
      return e += t.wordwrap(this.getPrivateBaseKeyB64()) + `
`, e += "-----END RSA PRIVATE KEY-----", e;
    }, t.prototype.getPublicKey = function() {
      var e = `-----BEGIN PUBLIC KEY-----
`;
      return e += t.wordwrap(this.getPublicBaseKeyB64()) + `
`, e += "-----END PUBLIC KEY-----", e;
    }, t.hasPublicKeyProperty = function(e) {
      return e = e || {}, e.hasOwnProperty("n") && e.hasOwnProperty("e");
    }, t.hasPrivateKeyProperty = function(e) {
      return e = e || {}, e.hasOwnProperty("n") && e.hasOwnProperty("e") && e.hasOwnProperty("d") && e.hasOwnProperty("p") && e.hasOwnProperty("q") && e.hasOwnProperty("dmp1") && e.hasOwnProperty("dmq1") && e.hasOwnProperty("coeff");
    }, t.prototype.parsePropertiesFrom = function(e) {
      this.n = e.n, this.e = e.e, e.hasOwnProperty("d") && (this.d = e.d, this.p = e.p, this.q = e.q, this.dmp1 = e.dmp1, this.dmq1 = e.dmq1, this.coeff = e.coeff);
    }, t;
  }(Gi)
), Xt, Yi = typeof process < "u" ? (Xt = process.env) === null || Xt === void 0 ? void 0 : Xt.npm_package_version : void 0, tn = (
  /** @class */
  function() {
    function n(t) {
      t === void 0 && (t = {}), this.default_key_size = t.default_key_size ? parseInt(t.default_key_size, 10) : 1024, this.default_public_exponent = t.default_public_exponent || "010001", this.log = t.log || !1, this.key = t.key || null;
    }
    return n.prototype.setKey = function(t) {
      t ? (this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new Te(t)) : !this.key && this.log && console.error("A key was not set.");
    }, n.prototype.setPrivateKey = function(t) {
      this.setKey(t);
    }, n.prototype.setPublicKey = function(t) {
      this.setKey(t);
    }, n.prototype.decrypt = function(t) {
      try {
        return this.getKey().decrypt(ge(t));
      } catch {
        return !1;
      }
    }, n.prototype.encrypt = function(t) {
      try {
        return yt(this.getKey().encrypt(t));
      } catch {
        return !1;
      }
    }, n.prototype.encryptOAEP = function(t) {
      try {
        return yt(this.getKey().encrypt(t, zi));
      } catch {
        return !1;
      }
    }, n.prototype.sign = function(t, e, i) {
      e === void 0 && (e = function(r) {
        return r;
      }), i === void 0 && (i = "");
      try {
        return yt(this.getKey().sign(t, e, i));
      } catch {
        return !1;
      }
    }, n.prototype.signSha256 = function(t) {
      return this.sign(t, function(e) {
        return we(Qt(e));
      }, "sha256");
    }, n.prototype.verify = function(t, e, i) {
      i === void 0 && (i = function(r) {
        return r;
      });
      try {
        return this.getKey().verify(t, ge(e), i);
      } catch {
        return !1;
      }
    }, n.prototype.verifySha256 = function(t, e) {
      return this.verify(t, e, function(i) {
        return we(Qt(i));
      });
    }, n.prototype.getKey = function(t) {
      if (!this.key) {
        if (this.key = new Te(), t && {}.toString.call(t) === "[object Function]") {
          this.key.generateAsync(this.default_key_size, this.default_public_exponent, t);
          return;
        }
        this.key.generate(this.default_key_size, this.default_public_exponent);
      }
      return this.key;
    }, n.prototype.getPrivateKey = function() {
      return this.getKey().getPrivateKey();
    }, n.prototype.getPrivateKeyB64 = function() {
      return this.getKey().getPrivateBaseKeyB64();
    }, n.prototype.getPublicKey = function() {
      return this.getKey().getPublicKey();
    }, n.prototype.getPublicKeyB64 = function() {
      return this.getKey().getPublicBaseKeyB64();
    }, n.version = Yi, n;
  }()
);
function Xe(n, t) {
  return function() {
    return n.apply(t, arguments);
  };
}
const { toString: en } = Object.prototype, { getPrototypeOf: re } = Object, { iterator: Mt, toStringTag: ze } = Symbol, kt = /* @__PURE__ */ ((n) => (t) => {
  const e = en.call(t);
  return n[e] || (n[e] = e.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), j = (n) => (n = n.toLowerCase(), (t) => kt(t) === n), Ft = (n) => (t) => typeof t === n, { isArray: dt } = Array, ft = Ft("undefined");
function bt(n) {
  return n !== null && !ft(n) && n.constructor !== null && !ft(n.constructor) && U(n.constructor.isBuffer) && n.constructor.isBuffer(n);
}
const Ge = j("ArrayBuffer");
function nn(n) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(n) : t = n && n.buffer && Ge(n.buffer), t;
}
const rn = Ft("string"), U = Ft("function"), $e = Ft("number"), Pt = (n) => n !== null && typeof n == "object", sn = (n) => n === !0 || n === !1, Bt = (n) => {
  if (kt(n) !== "object")
    return !1;
  const t = re(n);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(ze in n) && !(Mt in n);
}, an = (n) => {
  if (!Pt(n) || bt(n))
    return !1;
  try {
    return Object.keys(n).length === 0 && Object.getPrototypeOf(n) === Object.prototype;
  } catch {
    return !1;
  }
}, on = j("Date"), cn = j("File"), un = j("Blob"), hn = j("FileList"), ln = (n) => Pt(n) && U(n.pipe), fn = (n) => {
  let t;
  return n && (typeof FormData == "function" && n instanceof FormData || U(n.append) && ((t = kt(n)) === "formdata" || // detect form-data instance
  t === "object" && U(n.toString) && n.toString() === "[object FormData]"));
}, pn = j("URLSearchParams"), [dn, _n, gn, mn] = ["ReadableStream", "Request", "Response", "Headers"].map(j), yn = (n) => n.trim ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function vt(n, t, { allOwnKeys: e = !1 } = {}) {
  if (n === null || typeof n > "u")
    return;
  let i, r;
  if (typeof n != "object" && (n = [n]), dt(n))
    for (i = 0, r = n.length; i < r; i++)
      t.call(null, n[i], i, n);
  else {
    if (bt(n))
      return;
    const s = e ? Object.getOwnPropertyNames(n) : Object.keys(n), a = s.length;
    let o;
    for (i = 0; i < a; i++)
      o = s[i], t.call(null, n[o], o, n);
  }
}
function Je(n, t) {
  if (bt(n))
    return null;
  t = t.toLowerCase();
  const e = Object.keys(n);
  let i = e.length, r;
  for (; i-- > 0; )
    if (r = e[i], t === r.toLowerCase())
      return r;
  return null;
}
const it = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Qe = (n) => !ft(n) && n !== it;
function Zt() {
  const { caseless: n, skipUndefined: t } = Qe(this) && this || {}, e = {}, i = (r, s) => {
    const a = n && Je(e, s) || s;
    Bt(e[a]) && Bt(r) ? e[a] = Zt(e[a], r) : Bt(r) ? e[a] = Zt({}, r) : dt(r) ? e[a] = r.slice() : (!t || !ft(r)) && (e[a] = r);
  };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && vt(arguments[r], i);
  return e;
}
const bn = (n, t, e, { allOwnKeys: i } = {}) => (vt(t, (r, s) => {
  e && U(r) ? n[s] = Xe(r, e) : n[s] = r;
}, { allOwnKeys: i }), n), Pn = (n) => (n.charCodeAt(0) === 65279 && (n = n.slice(1)), n), vn = (n, t, e, i) => {
  n.prototype = Object.create(t.prototype, i), n.prototype.constructor = n, Object.defineProperty(n, "super", {
    value: t.prototype
  }), e && Object.assign(n.prototype, e);
}, En = (n, t, e, i) => {
  let r, s, a;
  const o = {};
  if (t = t || {}, n == null) return t;
  do {
    for (r = Object.getOwnPropertyNames(n), s = r.length; s-- > 0; )
      a = r[s], (!i || i(a, n, t)) && !o[a] && (t[a] = n[a], o[a] = !0);
    n = e !== !1 && re(n);
  } while (n && (!e || e(n, t)) && n !== Object.prototype);
  return t;
}, wn = (n, t, e) => {
  n = String(n), (e === void 0 || e > n.length) && (e = n.length), e -= t.length;
  const i = n.indexOf(t, e);
  return i !== -1 && i === e;
}, Sn = (n) => {
  if (!n) return null;
  if (dt(n)) return n;
  let t = n.length;
  if (!$e(t)) return null;
  const e = new Array(t);
  for (; t-- > 0; )
    e[t] = n[t];
  return e;
}, Tn = /* @__PURE__ */ ((n) => (t) => n && t instanceof n)(typeof Uint8Array < "u" && re(Uint8Array)), An = (n, t) => {
  const i = (n && n[Mt]).call(n);
  let r;
  for (; (r = i.next()) && !r.done; ) {
    const s = r.value;
    t.call(n, s[0], s[1]);
  }
}, Cn = (n, t) => {
  let e;
  const i = [];
  for (; (e = n.exec(t)) !== null; )
    i.push(e);
  return i;
}, Rn = j("HTMLFormElement"), On = (n) => n.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(e, i, r) {
    return i.toUpperCase() + r;
  }
), Ae = (({ hasOwnProperty: n }) => (t, e) => n.call(t, e))(Object.prototype), Dn = j("RegExp"), Ze = (n, t) => {
  const e = Object.getOwnPropertyDescriptors(n), i = {};
  vt(e, (r, s) => {
    let a;
    (a = t(r, s, n)) !== !1 && (i[s] = a || r);
  }), Object.defineProperties(n, i);
}, In = (n) => {
  Ze(n, (t, e) => {
    if (U(n) && ["arguments", "caller", "callee"].indexOf(e) !== -1)
      return !1;
    const i = n[e];
    if (U(i)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + e + "'");
      });
    }
  });
}, Bn = (n, t) => {
  const e = {}, i = (r) => {
    r.forEach((s) => {
      e[s] = !0;
    });
  };
  return dt(n) ? i(n) : i(String(n).split(t)), e;
}, Nn = () => {
}, xn = (n, t) => n != null && Number.isFinite(n = +n) ? n : t;
function Vn(n) {
  return !!(n && U(n.append) && n[ze] === "FormData" && n[Mt]);
}
const Un = (n) => {
  const t = new Array(10), e = (i, r) => {
    if (Pt(i)) {
      if (t.indexOf(i) >= 0)
        return;
      if (bt(i))
        return i;
      if (!("toJSON" in i)) {
        t[r] = i;
        const s = dt(i) ? [] : {};
        return vt(i, (a, o) => {
          const c = e(a, r + 1);
          !ft(c) && (s[o] = c);
        }), t[r] = void 0, s;
      }
    }
    return i;
  };
  return e(n, 0);
}, Ln = j("AsyncFunction"), Mn = (n) => n && (Pt(n) || U(n)) && U(n.then) && U(n.catch), Ye = ((n, t) => n ? setImmediate : t ? ((e, i) => (it.addEventListener("message", ({ source: r, data: s }) => {
  r === it && s === e && i.length && i.shift()();
}, !1), (r) => {
  i.push(r), it.postMessage(e, "*");
}))(`axios@${Math.random()}`, []) : (e) => setTimeout(e))(
  typeof setImmediate == "function",
  U(it.postMessage)
), kn = typeof queueMicrotask < "u" ? queueMicrotask.bind(it) : typeof process < "u" && process.nextTick || Ye, Fn = (n) => n != null && U(n[Mt]), l = {
  isArray: dt,
  isArrayBuffer: Ge,
  isBuffer: bt,
  isFormData: fn,
  isArrayBufferView: nn,
  isString: rn,
  isNumber: $e,
  isBoolean: sn,
  isObject: Pt,
  isPlainObject: Bt,
  isEmptyObject: an,
  isReadableStream: dn,
  isRequest: _n,
  isResponse: gn,
  isHeaders: mn,
  isUndefined: ft,
  isDate: on,
  isFile: cn,
  isBlob: un,
  isRegExp: Dn,
  isFunction: U,
  isStream: ln,
  isURLSearchParams: pn,
  isTypedArray: Tn,
  isFileList: hn,
  forEach: vt,
  merge: Zt,
  extend: bn,
  trim: yn,
  stripBOM: Pn,
  inherits: vn,
  toFlatObject: En,
  kindOf: kt,
  kindOfTest: j,
  endsWith: wn,
  toArray: Sn,
  forEachEntry: An,
  matchAll: Cn,
  isHTMLForm: Rn,
  hasOwnProperty: Ae,
  hasOwnProp: Ae,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ze,
  freezeMethods: In,
  toObjectSet: Bn,
  toCamelCase: On,
  noop: Nn,
  toFiniteNumber: xn,
  findKey: Je,
  global: it,
  isContextDefined: Qe,
  isSpecCompliantForm: Vn,
  toJSONObject: Un,
  isAsyncFn: Ln,
  isThenable: Mn,
  setImmediate: Ye,
  asap: kn,
  isIterable: Fn
};
function v(n, t, e, i, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = n, this.name = "AxiosError", t && (this.code = t), e && (this.config = e), i && (this.request = i), r && (this.response = r, this.status = r.status ? r.status : null);
}
l.inherits(v, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: l.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const ti = v.prototype, ei = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((n) => {
  ei[n] = { value: n };
});
Object.defineProperties(v, ei);
Object.defineProperty(ti, "isAxiosError", { value: !0 });
v.from = (n, t, e, i, r, s) => {
  const a = Object.create(ti);
  l.toFlatObject(n, a, function(u) {
    return u !== Error.prototype;
  }, (h) => h !== "isAxiosError");
  const o = n && n.message ? n.message : "Error", c = t == null && n ? n.code : t;
  return v.call(a, o, c, e, i, r), n && a.cause == null && Object.defineProperty(a, "cause", { value: n, configurable: !0 }), a.name = n && n.name || "Error", s && Object.assign(a, s), a;
};
const jn = null;
function Yt(n) {
  return l.isPlainObject(n) || l.isArray(n);
}
function ii(n) {
  return l.endsWith(n, "[]") ? n.slice(0, -2) : n;
}
function Ce(n, t, e) {
  return n ? n.concat(t).map(function(r, s) {
    return r = ii(r), !e && s ? "[" + r + "]" : r;
  }).join(e ? "." : "") : t;
}
function qn(n) {
  return l.isArray(n) && !n.some(Yt);
}
const Kn = l.toFlatObject(l, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function jt(n, t, e) {
  if (!l.isObject(n))
    throw new TypeError("target must be an object");
  t = t || new FormData(), e = l.toFlatObject(e, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(m, g) {
    return !l.isUndefined(g[m]);
  });
  const i = e.metaTokens, r = e.visitor || u, s = e.dots, a = e.indexes, c = (e.Blob || typeof Blob < "u" && Blob) && l.isSpecCompliantForm(t);
  if (!l.isFunction(r))
    throw new TypeError("visitor must be a function");
  function h(d) {
    if (d === null) return "";
    if (l.isDate(d))
      return d.toISOString();
    if (l.isBoolean(d))
      return d.toString();
    if (!c && l.isBlob(d))
      throw new v("Blob is not supported. Use a Buffer instead.");
    return l.isArrayBuffer(d) || l.isTypedArray(d) ? c && typeof Blob == "function" ? new Blob([d]) : Buffer.from(d) : d;
  }
  function u(d, m, g) {
    let w = d;
    if (d && !g && typeof d == "object") {
      if (l.endsWith(m, "{}"))
        m = i ? m : m.slice(0, -2), d = JSON.stringify(d);
      else if (l.isArray(d) && qn(d) || (l.isFileList(d) || l.endsWith(m, "[]")) && (w = l.toArray(d)))
        return m = ii(m), w.forEach(function(T, O) {
          !(l.isUndefined(T) || T === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? Ce([m], O, s) : a === null ? m : m + "[]",
            h(T)
          );
        }), !1;
    }
    return Yt(d) ? !0 : (t.append(Ce(g, m, s), h(d)), !1);
  }
  const f = [], _ = Object.assign(Kn, {
    defaultVisitor: u,
    convertValue: h,
    isVisitable: Yt
  });
  function y(d, m) {
    if (!l.isUndefined(d)) {
      if (f.indexOf(d) !== -1)
        throw Error("Circular reference detected in " + m.join("."));
      f.push(d), l.forEach(d, function(w, A) {
        (!(l.isUndefined(w) || w === null) && r.call(
          t,
          w,
          l.isString(A) ? A.trim() : A,
          m,
          _
        )) === !0 && y(w, m ? m.concat(A) : [A]);
      }), f.pop();
    }
  }
  if (!l.isObject(n))
    throw new TypeError("data must be an object");
  return y(n), t;
}
function Re(n) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g, function(i) {
    return t[i];
  });
}
function se(n, t) {
  this._pairs = [], n && jt(n, this, t);
}
const ni = se.prototype;
ni.append = function(t, e) {
  this._pairs.push([t, e]);
};
ni.toString = function(t) {
  const e = t ? function(i) {
    return t.call(this, i, Re);
  } : Re;
  return this._pairs.map(function(r) {
    return e(r[0]) + "=" + e(r[1]);
  }, "").join("&");
};
function Hn(n) {
  return encodeURIComponent(n).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function ri(n, t, e) {
  if (!t)
    return n;
  const i = e && e.encode || Hn;
  l.isFunction(e) && (e = {
    serialize: e
  });
  const r = e && e.serialize;
  let s;
  if (r ? s = r(t, e) : s = l.isURLSearchParams(t) ? t.toString() : new se(t, e).toString(i), s) {
    const a = n.indexOf("#");
    a !== -1 && (n = n.slice(0, a)), n += (n.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return n;
}
class Oe {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, e, i) {
    return this.handlers.push({
      fulfilled: t,
      rejected: e,
      synchronous: i ? i.synchronous : !1,
      runWhen: i ? i.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    l.forEach(this.handlers, function(i) {
      i !== null && t(i);
    });
  }
}
const si = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Wn = typeof URLSearchParams < "u" ? URLSearchParams : se, Xn = typeof FormData < "u" ? FormData : null, zn = typeof Blob < "u" ? Blob : null, Gn = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Wn,
    FormData: Xn,
    Blob: zn
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, ae = typeof window < "u" && typeof document < "u", te = typeof navigator == "object" && navigator || void 0, $n = ae && (!te || ["ReactNative", "NativeScript", "NS"].indexOf(te.product) < 0), Jn = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Qn = ae && window.location.href || "http://localhost", Zn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: ae,
  hasStandardBrowserEnv: $n,
  hasStandardBrowserWebWorkerEnv: Jn,
  navigator: te,
  origin: Qn
}, Symbol.toStringTag, { value: "Module" })), B = {
  ...Zn,
  ...Gn
};
function Yn(n, t) {
  return jt(n, new B.classes.URLSearchParams(), {
    visitor: function(e, i, r, s) {
      return B.isNode && l.isBuffer(e) ? (this.append(i, e.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    },
    ...t
  });
}
function tr(n) {
  return l.matchAll(/\w+|\[(\w*)]/g, n).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function er(n) {
  const t = {}, e = Object.keys(n);
  let i;
  const r = e.length;
  let s;
  for (i = 0; i < r; i++)
    s = e[i], t[s] = n[s];
  return t;
}
function ai(n) {
  function t(e, i, r, s) {
    let a = e[s++];
    if (a === "__proto__") return !0;
    const o = Number.isFinite(+a), c = s >= e.length;
    return a = !a && l.isArray(r) ? r.length : a, c ? (l.hasOwnProp(r, a) ? r[a] = [r[a], i] : r[a] = i, !o) : ((!r[a] || !l.isObject(r[a])) && (r[a] = []), t(e, i, r[a], s) && l.isArray(r[a]) && (r[a] = er(r[a])), !o);
  }
  if (l.isFormData(n) && l.isFunction(n.entries)) {
    const e = {};
    return l.forEachEntry(n, (i, r) => {
      t(tr(i), r, e, 0);
    }), e;
  }
  return null;
}
function ir(n, t, e) {
  if (l.isString(n))
    try {
      return (t || JSON.parse)(n), l.trim(n);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (e || JSON.stringify)(n);
}
const Et = {
  transitional: si,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, e) {
    const i = e.getContentType() || "", r = i.indexOf("application/json") > -1, s = l.isObject(t);
    if (s && l.isHTMLForm(t) && (t = new FormData(t)), l.isFormData(t))
      return r ? JSON.stringify(ai(t)) : t;
    if (l.isArrayBuffer(t) || l.isBuffer(t) || l.isStream(t) || l.isFile(t) || l.isBlob(t) || l.isReadableStream(t))
      return t;
    if (l.isArrayBufferView(t))
      return t.buffer;
    if (l.isURLSearchParams(t))
      return e.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let o;
    if (s) {
      if (i.indexOf("application/x-www-form-urlencoded") > -1)
        return Yn(t, this.formSerializer).toString();
      if ((o = l.isFileList(t)) || i.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return jt(
          o ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return s || r ? (e.setContentType("application/json", !1), ir(t)) : t;
  }],
  transformResponse: [function(t) {
    const e = this.transitional || Et.transitional, i = e && e.forcedJSONParsing, r = this.responseType === "json";
    if (l.isResponse(t) || l.isReadableStream(t))
      return t;
    if (t && l.isString(t) && (i && !this.responseType || r)) {
      const a = !(e && e.silentJSONParsing) && r;
      try {
        return JSON.parse(t, this.parseReviver);
      } catch (o) {
        if (a)
          throw o.name === "SyntaxError" ? v.from(o, v.ERR_BAD_RESPONSE, this, null, this.response) : o;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: B.classes.FormData,
    Blob: B.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
l.forEach(["delete", "get", "head", "post", "put", "patch"], (n) => {
  Et.headers[n] = {};
});
const nr = l.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), rr = (n) => {
  const t = {};
  let e, i, r;
  return n && n.split(`
`).forEach(function(a) {
    r = a.indexOf(":"), e = a.substring(0, r).trim().toLowerCase(), i = a.substring(r + 1).trim(), !(!e || t[e] && nr[e]) && (e === "set-cookie" ? t[e] ? t[e].push(i) : t[e] = [i] : t[e] = t[e] ? t[e] + ", " + i : i);
  }), t;
}, De = Symbol("internals");
function gt(n) {
  return n && String(n).trim().toLowerCase();
}
function Nt(n) {
  return n === !1 || n == null ? n : l.isArray(n) ? n.map(Nt) : String(n);
}
function sr(n) {
  const t = /* @__PURE__ */ Object.create(null), e = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = e.exec(n); )
    t[i[1]] = i[2];
  return t;
}
const ar = (n) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());
function zt(n, t, e, i, r) {
  if (l.isFunction(i))
    return i.call(this, t, e);
  if (r && (t = e), !!l.isString(t)) {
    if (l.isString(i))
      return t.indexOf(i) !== -1;
    if (l.isRegExp(i))
      return i.test(t);
  }
}
function or(n) {
  return n.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, e, i) => e.toUpperCase() + i);
}
function cr(n, t) {
  const e = l.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(n, i + e, {
      value: function(r, s, a) {
        return this[i].call(this, t, r, s, a);
      },
      configurable: !0
    });
  });
}
let L = class {
  constructor(t) {
    t && this.set(t);
  }
  set(t, e, i) {
    const r = this;
    function s(o, c, h) {
      const u = gt(c);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const f = l.findKey(r, u);
      (!f || r[f] === void 0 || h === !0 || h === void 0 && r[f] !== !1) && (r[f || c] = Nt(o));
    }
    const a = (o, c) => l.forEach(o, (h, u) => s(h, u, c));
    if (l.isPlainObject(t) || t instanceof this.constructor)
      a(t, e);
    else if (l.isString(t) && (t = t.trim()) && !ar(t))
      a(rr(t), e);
    else if (l.isObject(t) && l.isIterable(t)) {
      let o = {}, c, h;
      for (const u of t) {
        if (!l.isArray(u))
          throw TypeError("Object iterator must return a key-value pair");
        o[h = u[0]] = (c = o[h]) ? l.isArray(c) ? [...c, u[1]] : [c, u[1]] : u[1];
      }
      a(o, e);
    } else
      t != null && s(e, t, i);
    return this;
  }
  get(t, e) {
    if (t = gt(t), t) {
      const i = l.findKey(this, t);
      if (i) {
        const r = this[i];
        if (!e)
          return r;
        if (e === !0)
          return sr(r);
        if (l.isFunction(e))
          return e.call(this, r, i);
        if (l.isRegExp(e))
          return e.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, e) {
    if (t = gt(t), t) {
      const i = l.findKey(this, t);
      return !!(i && this[i] !== void 0 && (!e || zt(this, this[i], i, e)));
    }
    return !1;
  }
  delete(t, e) {
    const i = this;
    let r = !1;
    function s(a) {
      if (a = gt(a), a) {
        const o = l.findKey(i, a);
        o && (!e || zt(i, i[o], o, e)) && (delete i[o], r = !0);
      }
    }
    return l.isArray(t) ? t.forEach(s) : s(t), r;
  }
  clear(t) {
    const e = Object.keys(this);
    let i = e.length, r = !1;
    for (; i--; ) {
      const s = e[i];
      (!t || zt(this, this[s], s, t, !0)) && (delete this[s], r = !0);
    }
    return r;
  }
  normalize(t) {
    const e = this, i = {};
    return l.forEach(this, (r, s) => {
      const a = l.findKey(i, s);
      if (a) {
        e[a] = Nt(r), delete e[s];
        return;
      }
      const o = t ? or(s) : String(s).trim();
      o !== s && delete e[s], e[o] = Nt(r), i[o] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const e = /* @__PURE__ */ Object.create(null);
    return l.forEach(this, (i, r) => {
      i != null && i !== !1 && (e[r] = t && l.isArray(i) ? i.join(", ") : i);
    }), e;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, e]) => t + ": " + e).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...e) {
    const i = new this(t);
    return e.forEach((r) => i.set(r)), i;
  }
  static accessor(t) {
    const i = (this[De] = this[De] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function s(a) {
      const o = gt(a);
      i[o] || (cr(r, a), i[o] = !0);
    }
    return l.isArray(t) ? t.forEach(s) : s(t), this;
  }
};
L.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
l.reduceDescriptors(L.prototype, ({ value: n }, t) => {
  let e = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => n,
    set(i) {
      this[e] = i;
    }
  };
});
l.freezeMethods(L);
function Gt(n, t) {
  const e = this || Et, i = t || e, r = L.from(i.headers);
  let s = i.data;
  return l.forEach(n, function(o) {
    s = o.call(e, s, r.normalize(), t ? t.status : void 0);
  }), r.normalize(), s;
}
function oi(n) {
  return !!(n && n.__CANCEL__);
}
function _t(n, t, e) {
  v.call(this, n ?? "canceled", v.ERR_CANCELED, t, e), this.name = "CanceledError";
}
l.inherits(_t, v, {
  __CANCEL__: !0
});
function ci(n, t, e) {
  const i = e.config.validateStatus;
  !e.status || !i || i(e.status) ? n(e) : t(new v(
    "Request failed with status code " + e.status,
    [v.ERR_BAD_REQUEST, v.ERR_BAD_RESPONSE][Math.floor(e.status / 100) - 4],
    e.config,
    e.request,
    e
  ));
}
function ur(n) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(n);
  return t && t[1] || "";
}
function hr(n, t) {
  n = n || 10;
  const e = new Array(n), i = new Array(n);
  let r = 0, s = 0, a;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const h = Date.now(), u = i[s];
    a || (a = h), e[r] = c, i[r] = h;
    let f = s, _ = 0;
    for (; f !== r; )
      _ += e[f++], f = f % n;
    if (r = (r + 1) % n, r === s && (s = (s + 1) % n), h - a < t)
      return;
    const y = u && h - u;
    return y ? Math.round(_ * 1e3 / y) : void 0;
  };
}
function lr(n, t) {
  let e = 0, i = 1e3 / t, r, s;
  const a = (h, u = Date.now()) => {
    e = u, r = null, s && (clearTimeout(s), s = null), n(...h);
  };
  return [(...h) => {
    const u = Date.now(), f = u - e;
    f >= i ? a(h, u) : (r = h, s || (s = setTimeout(() => {
      s = null, a(r);
    }, i - f)));
  }, () => r && a(r)];
}
const Ut = (n, t, e = 3) => {
  let i = 0;
  const r = hr(50, 250);
  return lr((s) => {
    const a = s.loaded, o = s.lengthComputable ? s.total : void 0, c = a - i, h = r(c), u = a <= o;
    i = a;
    const f = {
      loaded: a,
      total: o,
      progress: o ? a / o : void 0,
      bytes: c,
      rate: h || void 0,
      estimated: h && o && u ? (o - a) / h : void 0,
      event: s,
      lengthComputable: o != null,
      [t ? "download" : "upload"]: !0
    };
    n(f);
  }, e);
}, Ie = (n, t) => {
  const e = n != null;
  return [(i) => t[0]({
    lengthComputable: e,
    total: n,
    loaded: i
  }), t[1]];
}, Be = (n) => (...t) => l.asap(() => n(...t)), fr = B.hasStandardBrowserEnv ? /* @__PURE__ */ ((n, t) => (e) => (e = new URL(e, B.origin), n.protocol === e.protocol && n.host === e.host && (t || n.port === e.port)))(
  new URL(B.origin),
  B.navigator && /(msie|trident)/i.test(B.navigator.userAgent)
) : () => !0, pr = B.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(n, t, e, i, r, s) {
      const a = [n + "=" + encodeURIComponent(t)];
      l.isNumber(e) && a.push("expires=" + new Date(e).toGMTString()), l.isString(i) && a.push("path=" + i), l.isString(r) && a.push("domain=" + r), s === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read(n) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(n) {
      this.write(n, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function dr(n) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(n);
}
function _r(n, t) {
  return t ? n.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : n;
}
function ui(n, t, e) {
  let i = !dr(t);
  return n && (i || e == !1) ? _r(n, t) : t;
}
const Ne = (n) => n instanceof L ? { ...n } : n;
function rt(n, t) {
  t = t || {};
  const e = {};
  function i(h, u, f, _) {
    return l.isPlainObject(h) && l.isPlainObject(u) ? l.merge.call({ caseless: _ }, h, u) : l.isPlainObject(u) ? l.merge({}, u) : l.isArray(u) ? u.slice() : u;
  }
  function r(h, u, f, _) {
    if (l.isUndefined(u)) {
      if (!l.isUndefined(h))
        return i(void 0, h, f, _);
    } else return i(h, u, f, _);
  }
  function s(h, u) {
    if (!l.isUndefined(u))
      return i(void 0, u);
  }
  function a(h, u) {
    if (l.isUndefined(u)) {
      if (!l.isUndefined(h))
        return i(void 0, h);
    } else return i(void 0, u);
  }
  function o(h, u, f) {
    if (f in t)
      return i(h, u);
    if (f in n)
      return i(void 0, h);
  }
  const c = {
    url: s,
    method: s,
    data: s,
    baseURL: a,
    transformRequest: a,
    transformResponse: a,
    paramsSerializer: a,
    timeout: a,
    timeoutMessage: a,
    withCredentials: a,
    withXSRFToken: a,
    adapter: a,
    responseType: a,
    xsrfCookieName: a,
    xsrfHeaderName: a,
    onUploadProgress: a,
    onDownloadProgress: a,
    decompress: a,
    maxContentLength: a,
    maxBodyLength: a,
    beforeRedirect: a,
    transport: a,
    httpAgent: a,
    httpsAgent: a,
    cancelToken: a,
    socketPath: a,
    responseEncoding: a,
    validateStatus: o,
    headers: (h, u, f) => r(Ne(h), Ne(u), f, !0)
  };
  return l.forEach(Object.keys({ ...n, ...t }), function(u) {
    const f = c[u] || r, _ = f(n[u], t[u], u);
    l.isUndefined(_) && f !== o || (e[u] = _);
  }), e;
}
const hi = (n) => {
  const t = rt({}, n);
  let { data: e, withXSRFToken: i, xsrfHeaderName: r, xsrfCookieName: s, headers: a, auth: o } = t;
  if (t.headers = a = L.from(a), t.url = ri(ui(t.baseURL, t.url, t.allowAbsoluteUrls), n.params, n.paramsSerializer), o && a.set(
    "Authorization",
    "Basic " + btoa((o.username || "") + ":" + (o.password ? unescape(encodeURIComponent(o.password)) : ""))
  ), l.isFormData(e)) {
    if (B.hasStandardBrowserEnv || B.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if (l.isFunction(e.getHeaders)) {
      const c = e.getHeaders(), h = ["content-type", "content-length"];
      Object.entries(c).forEach(([u, f]) => {
        h.includes(u.toLowerCase()) && a.set(u, f);
      });
    }
  }
  if (B.hasStandardBrowserEnv && (i && l.isFunction(i) && (i = i(t)), i || i !== !1 && fr(t.url))) {
    const c = r && s && pr.read(s);
    c && a.set(r, c);
  }
  return t;
}, gr = typeof XMLHttpRequest < "u", mr = gr && function(n) {
  return new Promise(function(e, i) {
    const r = hi(n);
    let s = r.data;
    const a = L.from(r.headers).normalize();
    let { responseType: o, onUploadProgress: c, onDownloadProgress: h } = r, u, f, _, y, d;
    function m() {
      y && y(), d && d(), r.cancelToken && r.cancelToken.unsubscribe(u), r.signal && r.signal.removeEventListener("abort", u);
    }
    let g = new XMLHttpRequest();
    g.open(r.method.toUpperCase(), r.url, !0), g.timeout = r.timeout;
    function w() {
      if (!g)
        return;
      const T = L.from(
        "getAllResponseHeaders" in g && g.getAllResponseHeaders()
      ), x = {
        data: !o || o === "text" || o === "json" ? g.responseText : g.response,
        status: g.status,
        statusText: g.statusText,
        headers: T,
        config: n,
        request: g
      };
      ci(function(D) {
        e(D), m();
      }, function(D) {
        i(D), m();
      }, x), g = null;
    }
    "onloadend" in g ? g.onloadend = w : g.onreadystatechange = function() {
      !g || g.readyState !== 4 || g.status === 0 && !(g.responseURL && g.responseURL.indexOf("file:") === 0) || setTimeout(w);
    }, g.onabort = function() {
      g && (i(new v("Request aborted", v.ECONNABORTED, n, g)), g = null);
    }, g.onerror = function(O) {
      const x = O && O.message ? O.message : "Network Error", b = new v(x, v.ERR_NETWORK, n, g);
      b.event = O || null, i(b), g = null;
    }, g.ontimeout = function() {
      let O = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const x = r.transitional || si;
      r.timeoutErrorMessage && (O = r.timeoutErrorMessage), i(new v(
        O,
        x.clarifyTimeoutError ? v.ETIMEDOUT : v.ECONNABORTED,
        n,
        g
      )), g = null;
    }, s === void 0 && a.setContentType(null), "setRequestHeader" in g && l.forEach(a.toJSON(), function(O, x) {
      g.setRequestHeader(x, O);
    }), l.isUndefined(r.withCredentials) || (g.withCredentials = !!r.withCredentials), o && o !== "json" && (g.responseType = r.responseType), h && ([_, d] = Ut(h, !0), g.addEventListener("progress", _)), c && g.upload && ([f, y] = Ut(c), g.upload.addEventListener("progress", f), g.upload.addEventListener("loadend", y)), (r.cancelToken || r.signal) && (u = (T) => {
      g && (i(!T || T.type ? new _t(null, n, g) : T), g.abort(), g = null);
    }, r.cancelToken && r.cancelToken.subscribe(u), r.signal && (r.signal.aborted ? u() : r.signal.addEventListener("abort", u)));
    const A = ur(r.url);
    if (A && B.protocols.indexOf(A) === -1) {
      i(new v("Unsupported protocol " + A + ":", v.ERR_BAD_REQUEST, n));
      return;
    }
    g.send(s || null);
  });
}, yr = (n, t) => {
  const { length: e } = n = n ? n.filter(Boolean) : [];
  if (t || e) {
    let i = new AbortController(), r;
    const s = function(h) {
      if (!r) {
        r = !0, o();
        const u = h instanceof Error ? h : this.reason;
        i.abort(u instanceof v ? u : new _t(u instanceof Error ? u.message : u));
      }
    };
    let a = t && setTimeout(() => {
      a = null, s(new v(`timeout ${t} of ms exceeded`, v.ETIMEDOUT));
    }, t);
    const o = () => {
      n && (a && clearTimeout(a), a = null, n.forEach((h) => {
        h.unsubscribe ? h.unsubscribe(s) : h.removeEventListener("abort", s);
      }), n = null);
    };
    n.forEach((h) => h.addEventListener("abort", s));
    const { signal: c } = i;
    return c.unsubscribe = () => l.asap(o), c;
  }
}, br = function* (n, t) {
  let e = n.byteLength;
  if (e < t) {
    yield n;
    return;
  }
  let i = 0, r;
  for (; i < e; )
    r = i + t, yield n.slice(i, r), i = r;
}, Pr = async function* (n, t) {
  for await (const e of vr(n))
    yield* br(e, t);
}, vr = async function* (n) {
  if (n[Symbol.asyncIterator]) {
    yield* n;
    return;
  }
  const t = n.getReader();
  try {
    for (; ; ) {
      const { done: e, value: i } = await t.read();
      if (e)
        break;
      yield i;
    }
  } finally {
    await t.cancel();
  }
}, xe = (n, t, e, i) => {
  const r = Pr(n, t);
  let s = 0, a, o = (c) => {
    a || (a = !0, i && i(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: h, value: u } = await r.next();
        if (h) {
          o(), c.close();
          return;
        }
        let f = u.byteLength;
        if (e) {
          let _ = s += f;
          e(_);
        }
        c.enqueue(new Uint8Array(u));
      } catch (h) {
        throw o(h), h;
      }
    },
    cancel(c) {
      return o(c), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, Ve = 64 * 1024, { isFunction: Dt } = l, Er = (({ Request: n, Response: t }) => ({
  Request: n,
  Response: t
}))(l.global), {
  ReadableStream: Ue,
  TextEncoder: Le
} = l.global, Me = (n, ...t) => {
  try {
    return !!n(...t);
  } catch {
    return !1;
  }
}, wr = (n) => {
  n = l.merge.call({
    skipUndefined: !0
  }, Er, n);
  const { fetch: t, Request: e, Response: i } = n, r = t ? Dt(t) : typeof fetch == "function", s = Dt(e), a = Dt(i);
  if (!r)
    return !1;
  const o = r && Dt(Ue), c = r && (typeof Le == "function" ? /* @__PURE__ */ ((d) => (m) => d.encode(m))(new Le()) : async (d) => new Uint8Array(await new e(d).arrayBuffer())), h = s && o && Me(() => {
    let d = !1;
    const m = new e(B.origin, {
      body: new Ue(),
      method: "POST",
      get duplex() {
        return d = !0, "half";
      }
    }).headers.has("Content-Type");
    return d && !m;
  }), u = a && o && Me(() => l.isReadableStream(new i("").body)), f = {
    stream: u && ((d) => d.body)
  };
  r && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((d) => {
    !f[d] && (f[d] = (m, g) => {
      let w = m && m[d];
      if (w)
        return w.call(m);
      throw new v(`Response type '${d}' is not supported`, v.ERR_NOT_SUPPORT, g);
    });
  });
  const _ = async (d) => {
    if (d == null)
      return 0;
    if (l.isBlob(d))
      return d.size;
    if (l.isSpecCompliantForm(d))
      return (await new e(B.origin, {
        method: "POST",
        body: d
      }).arrayBuffer()).byteLength;
    if (l.isArrayBufferView(d) || l.isArrayBuffer(d))
      return d.byteLength;
    if (l.isURLSearchParams(d) && (d = d + ""), l.isString(d))
      return (await c(d)).byteLength;
  }, y = async (d, m) => {
    const g = l.toFiniteNumber(d.getContentLength());
    return g ?? _(m);
  };
  return async (d) => {
    let {
      url: m,
      method: g,
      data: w,
      signal: A,
      cancelToken: T,
      timeout: O,
      onDownloadProgress: x,
      onUploadProgress: b,
      responseType: D,
      headers: X,
      withCredentials: M = "same-origin",
      fetchOptions: st
    } = hi(d), V = t || fetch;
    D = D ? (D + "").toLowerCase() : "text";
    let at = yr([A, T && T.toAbortSignal()], O), q = null;
    const tt = at && at.unsubscribe && (() => {
      at.unsubscribe();
    });
    let oe;
    try {
      if (b && h && g !== "get" && g !== "head" && (oe = await y(X, w)) !== 0) {
        let J = new e(m, {
          method: "POST",
          body: w,
          duplex: "half"
        }), ot;
        if (l.isFormData(w) && (ot = J.headers.get("content-type")) && X.setContentType(ot), J.body) {
          const [Kt, wt] = Ie(
            oe,
            Ut(Be(b))
          );
          w = xe(J.body, Ve, Kt, wt);
        }
      }
      l.isString(M) || (M = M ? "include" : "omit");
      const K = s && "credentials" in e.prototype, ce = {
        ...st,
        signal: at,
        method: g.toUpperCase(),
        headers: X.normalize().toJSON(),
        body: w,
        duplex: "half",
        credentials: K ? M : void 0
      };
      q = s && new e(m, ce);
      let $ = await (s ? V(q, st) : V(m, ce));
      const ue = u && (D === "stream" || D === "response");
      if (u && (x || ue && tt)) {
        const J = {};
        ["status", "statusText", "headers"].forEach((he) => {
          J[he] = $[he];
        });
        const ot = l.toFiniteNumber($.headers.get("content-length")), [Kt, wt] = x && Ie(
          ot,
          Ut(Be(x), !0)
        ) || [];
        $ = new i(
          xe($.body, Ve, Kt, () => {
            wt && wt(), tt && tt();
          }),
          J
        );
      }
      D = D || "text";
      let gi = await f[l.findKey(f, D) || "text"]($, d);
      return !ue && tt && tt(), await new Promise((J, ot) => {
        ci(J, ot, {
          data: gi,
          headers: L.from($.headers),
          status: $.status,
          statusText: $.statusText,
          config: d,
          request: q
        });
      });
    } catch (K) {
      throw tt && tt(), K && K.name === "TypeError" && /Load failed|fetch/i.test(K.message) ? Object.assign(
        new v("Network Error", v.ERR_NETWORK, d, q),
        {
          cause: K.cause || K
        }
      ) : v.from(K, K && K.code, d, q);
    }
  };
}, Sr = /* @__PURE__ */ new Map(), li = (n) => {
  let t = n ? n.env : {};
  const { fetch: e, Request: i, Response: r } = t, s = [
    i,
    r,
    e
  ];
  let a = s.length, o = a, c, h, u = Sr;
  for (; o--; )
    c = s[o], h = u.get(c), h === void 0 && u.set(c, h = o ? /* @__PURE__ */ new Map() : wr(t)), u = h;
  return h;
};
li();
const ee = {
  http: jn,
  xhr: mr,
  fetch: {
    get: li
  }
};
l.forEach(ee, (n, t) => {
  if (n) {
    try {
      Object.defineProperty(n, "name", { value: t });
    } catch {
    }
    Object.defineProperty(n, "adapterName", { value: t });
  }
});
const ke = (n) => `- ${n}`, Tr = (n) => l.isFunction(n) || n === null || n === !1, fi = {
  getAdapter: (n, t) => {
    n = l.isArray(n) ? n : [n];
    const { length: e } = n;
    let i, r;
    const s = {};
    for (let a = 0; a < e; a++) {
      i = n[a];
      let o;
      if (r = i, !Tr(i) && (r = ee[(o = String(i)).toLowerCase()], r === void 0))
        throw new v(`Unknown adapter '${o}'`);
      if (r && (l.isFunction(r) || (r = r.get(t))))
        break;
      s[o || "#" + a] = r;
    }
    if (!r) {
      const a = Object.entries(s).map(
        ([c, h]) => `adapter ${c} ` + (h === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let o = e ? a.length > 1 ? `since :
` + a.map(ke).join(`
`) : " " + ke(a[0]) : "as no adapter specified";
      throw new v(
        "There is no suitable adapter to dispatch the request " + o,
        "ERR_NOT_SUPPORT"
      );
    }
    return r;
  },
  adapters: ee
};
function $t(n) {
  if (n.cancelToken && n.cancelToken.throwIfRequested(), n.signal && n.signal.aborted)
    throw new _t(null, n);
}
function Fe(n) {
  return $t(n), n.headers = L.from(n.headers), n.data = Gt.call(
    n,
    n.transformRequest
  ), ["post", "put", "patch"].indexOf(n.method) !== -1 && n.headers.setContentType("application/x-www-form-urlencoded", !1), fi.getAdapter(n.adapter || Et.adapter, n)(n).then(function(i) {
    return $t(n), i.data = Gt.call(
      n,
      n.transformResponse,
      i
    ), i.headers = L.from(i.headers), i;
  }, function(i) {
    return oi(i) || ($t(n), i && i.response && (i.response.data = Gt.call(
      n,
      n.transformResponse,
      i.response
    ), i.response.headers = L.from(i.response.headers))), Promise.reject(i);
  });
}
const pi = "1.12.2", qt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((n, t) => {
  qt[n] = function(i) {
    return typeof i === n || "a" + (t < 1 ? "n " : " ") + n;
  };
});
const je = {};
qt.transitional = function(t, e, i) {
  function r(s, a) {
    return "[Axios v" + pi + "] Transitional option '" + s + "'" + a + (i ? ". " + i : "");
  }
  return (s, a, o) => {
    if (t === !1)
      throw new v(
        r(a, " has been removed" + (e ? " in " + e : "")),
        v.ERR_DEPRECATED
      );
    return e && !je[a] && (je[a] = !0, console.warn(
      r(
        a,
        " has been deprecated since v" + e + " and will be removed in the near future"
      )
    )), t ? t(s, a, o) : !0;
  };
};
qt.spelling = function(t) {
  return (e, i) => (console.warn(`${i} is likely a misspelling of ${t}`), !0);
};
function Ar(n, t, e) {
  if (typeof n != "object")
    throw new v("options must be an object", v.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(n);
  let r = i.length;
  for (; r-- > 0; ) {
    const s = i[r], a = t[s];
    if (a) {
      const o = n[s], c = o === void 0 || a(o, s, n);
      if (c !== !0)
        throw new v("option " + s + " must be " + c, v.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (e !== !0)
      throw new v("Unknown option " + s, v.ERR_BAD_OPTION);
  }
}
const xt = {
  assertOptions: Ar,
  validators: qt
}, H = xt.validators;
let nt = class {
  constructor(t) {
    this.defaults = t || {}, this.interceptors = {
      request: new Oe(),
      response: new Oe()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, e) {
    try {
      return await this._request(t, e);
    } catch (i) {
      if (i instanceof Error) {
        let r = {};
        Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
        const s = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          i.stack ? s && !String(i.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (i.stack += `
` + s) : i.stack = s;
        } catch {
        }
      }
      throw i;
    }
  }
  _request(t, e) {
    typeof t == "string" ? (e = e || {}, e.url = t) : e = t || {}, e = rt(this.defaults, e);
    const { transitional: i, paramsSerializer: r, headers: s } = e;
    i !== void 0 && xt.assertOptions(i, {
      silentJSONParsing: H.transitional(H.boolean),
      forcedJSONParsing: H.transitional(H.boolean),
      clarifyTimeoutError: H.transitional(H.boolean)
    }, !1), r != null && (l.isFunction(r) ? e.paramsSerializer = {
      serialize: r
    } : xt.assertOptions(r, {
      encode: H.function,
      serialize: H.function
    }, !0)), e.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? e.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : e.allowAbsoluteUrls = !0), xt.assertOptions(e, {
      baseUrl: H.spelling("baseURL"),
      withXsrfToken: H.spelling("withXSRFToken")
    }, !0), e.method = (e.method || this.defaults.method || "get").toLowerCase();
    let a = s && l.merge(
      s.common,
      s[e.method]
    );
    s && l.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (d) => {
        delete s[d];
      }
    ), e.headers = L.concat(a, s);
    const o = [];
    let c = !0;
    this.interceptors.request.forEach(function(m) {
      typeof m.runWhen == "function" && m.runWhen(e) === !1 || (c = c && m.synchronous, o.unshift(m.fulfilled, m.rejected));
    });
    const h = [];
    this.interceptors.response.forEach(function(m) {
      h.push(m.fulfilled, m.rejected);
    });
    let u, f = 0, _;
    if (!c) {
      const d = [Fe.bind(this), void 0];
      for (d.unshift(...o), d.push(...h), _ = d.length, u = Promise.resolve(e); f < _; )
        u = u.then(d[f++], d[f++]);
      return u;
    }
    _ = o.length;
    let y = e;
    for (; f < _; ) {
      const d = o[f++], m = o[f++];
      try {
        y = d(y);
      } catch (g) {
        m.call(this, g);
        break;
      }
    }
    try {
      u = Fe.call(this, y);
    } catch (d) {
      return Promise.reject(d);
    }
    for (f = 0, _ = h.length; f < _; )
      u = u.then(h[f++], h[f++]);
    return u;
  }
  getUri(t) {
    t = rt(this.defaults, t);
    const e = ui(t.baseURL, t.url, t.allowAbsoluteUrls);
    return ri(e, t.params, t.paramsSerializer);
  }
};
l.forEach(["delete", "get", "head", "options"], function(t) {
  nt.prototype[t] = function(e, i) {
    return this.request(rt(i || {}, {
      method: t,
      url: e,
      data: (i || {}).data
    }));
  };
});
l.forEach(["post", "put", "patch"], function(t) {
  function e(i) {
    return function(s, a, o) {
      return this.request(rt(o || {}, {
        method: t,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: a
      }));
    };
  }
  nt.prototype[t] = e(), nt.prototype[t + "Form"] = e(!0);
});
let Cr = class di {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let e;
    this.promise = new Promise(function(s) {
      e = s;
    });
    const i = this;
    this.promise.then((r) => {
      if (!i._listeners) return;
      let s = i._listeners.length;
      for (; s-- > 0; )
        i._listeners[s](r);
      i._listeners = null;
    }), this.promise.then = (r) => {
      let s;
      const a = new Promise((o) => {
        i.subscribe(o), s = o;
      }).then(r);
      return a.cancel = function() {
        i.unsubscribe(s);
      }, a;
    }, t(function(s, a, o) {
      i.reason || (i.reason = new _t(s, a, o), e(i.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const e = this._listeners.indexOf(t);
    e !== -1 && this._listeners.splice(e, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), e = (i) => {
      t.abort(i);
    };
    return this.subscribe(e), t.signal.unsubscribe = () => this.unsubscribe(e), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new di(function(r) {
        t = r;
      }),
      cancel: t
    };
  }
};
function Rr(n) {
  return function(e) {
    return n.apply(null, e);
  };
}
function Or(n) {
  return l.isObject(n) && n.isAxiosError === !0;
}
const ie = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(ie).forEach(([n, t]) => {
  ie[t] = n;
});
function _i(n) {
  const t = new nt(n), e = Xe(nt.prototype.request, t);
  return l.extend(e, nt.prototype, t, { allOwnKeys: !0 }), l.extend(e, t, null, { allOwnKeys: !0 }), e.create = function(r) {
    return _i(rt(n, r));
  }, e;
}
const S = _i(Et);
S.Axios = nt;
S.CanceledError = _t;
S.CancelToken = Cr;
S.isCancel = oi;
S.VERSION = pi;
S.toFormData = jt;
S.AxiosError = v;
S.Cancel = S.CanceledError;
S.all = function(t) {
  return Promise.all(t);
};
S.spread = Rr;
S.isAxiosError = Or;
S.mergeConfig = rt;
S.AxiosHeaders = L;
S.formToJSON = (n) => ai(l.isHTMLForm(n) ? new FormData(n) : n);
S.getAdapter = fi.getAdapter;
S.HttpStatusCode = ie;
S.default = S;
const {
  Axios: Nr,
  AxiosError: xr,
  CanceledError: Vr,
  isCancel: Ur,
  CancelToken: Lr,
  VERSION: Mr,
  all: kr,
  Cancel: Fr,
  isAxiosError: jr,
  spread: qr,
  toFormData: Kr,
  AxiosHeaders: Hr,
  HttpStatusCode: Wr,
  formToJSON: Xr,
  getAdapter: zr,
  mergeConfig: Gr
} = S;
class $r extends mi {
  __pinPad__ = {
    buffer: null,
    about: {
      EMV: null,
      model: null,
      serial: null,
      brand: null,
      appVersion: null,
      printer: null,
      hasCashback: !1,
      supportInjection: !1,
      supportSign: !1,
      supportContactlessCollisionCard: !1,
      supportContactless: !1,
      supportDUKPT: "",
      // Derived Unique Key Per Transaction
      injectedValues: !1,
      pp: null
    },
    config: {
      defaultEnvironment: "production",
      environment: "production",
      currency: "MXN",
      currencyCode: "0484",
      timeoutPinPad: "100",
      signSupport: "1",
      CTLSSupport: "1",
      userTRX: "userPinpadWeb",
      tp_operation: "29",
      requireCVVAmex: "1",
      forceOnline: "00",
      emvCard: "0",
      validateQPS: "1",
      username: null,
      password: null,
      country: null,
      idBranch: null,
      idCompany: null,
      latitude: null,
      longitude: null,
      publicKeyRSA: null,
      publicIP: null,
      internal: {
        stTokenization: !1,
        qpsDomestic: "",
        qpsInternational: "",
        cvmlVMCDomestic: "",
        cvmlVMCInternational: "",
        cvmlAmex: "",
        translimitCTLSVMC: "",
        translimitCTLSAmex: "",
        emv: {}
      },
      terminal: {},
      loginResponse: null,
      otherLogin: {},
      RC4Key: "KEY CREDIT CARD KEY",
      read: {
        EMV: "",
        PIN: "",
        POSEM: "",
        AppId: "",
        AppIdLabel: "",
        Arqc: "",
        Chip: "",
        ChipName: "",
        ChipNameEnc: "",
        ReadCTLS: "",
        NB_Data: "",
        NB_ksn: "",
        Tags: "",
        Type: ""
      },
      tokenizeTRX: !1
    },
    constants: {
      // don't change
      appVersion: "1.0.16",
      appName: "pinpapWebApp ",
      STX: "",
      ETX: "",
      FS: "",
      getNULL: "\0",
      appChannel: "3",
      typeChannel: "11",
      urls: {
        development: "https://fcdev.mitec.com.mx",
        qa: "https://fcqa.mitec.com.mx",
        production: "https://m.mit.com.mx",
        productionAlternative: "https://m2.mit.com.mx"
      },
      uris: {
        login: "/pinpadWeb/login",
        RSAKey: "/pinpadWeb/getDataCrypt",
        merchant: "/pinpadWeb/getAfiliaciones",
        consult: "/pinpadWeb/queryTrx",
        keysDUKPT: "/pinpadWeb/getKeysDUKPT",
        reverse: "/pinpadWeb/executeBackSale",
        rePrint: "/pinpadWeb/reprint",
        checkInMoto: "/pinpadWeb/checkin",
        checkOutMoto: "/pinpadWeb/checkout",
        reAuthorizationMoto: "/pinpadWeb/reAuthorization",
        cancellation: "/pinpadWeb/executeVoid",
        sale: "/pinpadWeb/executeSale"
      }
    },
    operation: {
      amount: "0",
      reference: null,
      folio: null,
      authorization: null,
      errors: 0,
      last_error: null,
      commerceVoucher: "",
      clientVoucher: "",
      consultDate: null,
      ignore: {
        responseGlobal: {},
        counter: !1,
        counterSale: !1,
        isError92TRX: !1,
        C93Global: !1,
        error: ""
      },
      finalResult: {},
      moto: {
        ccType: "",
        ccName: "",
        ccNumber: "",
        ccExpMonth: "",
        ccExpYear: "",
        ccCvvCsc: "",
        txRoom: ""
      },
      bin: "",
      bin8: "",
      hasQPS: !1,
      onlyMerchant: "",
      merchant: null,
      typeOperation: "29",
      typeResponse: "",
      responseMit: {},
      applyReverse: !1
    },
    finishCommand: { A: "", B: "", C: "", D: "", E: "", F: "", G: "", H: "", I: "", J: "", K: "" },
    waiting: {
      statusAboutWaiting: null,
      statusInjectWaiting: null,
      statusReadCardWaiting: null,
      statusSecondGenerateWaiting: null,
      statusinitDUKPTWaiting: null,
      statuswritingDUKPTWaiting: null
    }
  };
  constructor({
    filters: t = null,
    config_port: e = {
      baudRate: 19200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      bufferSize: 32768,
      flowControl: "none"
    },
    no_device: i = 1,
    device_listen_on_channel: r = 1,
    username: s = null,
    password: a = null,
    environment: o = "production",
    socket: c = !1
  } = {
    filters: null,
    config_port: {
      baudRate: 19200,
      dataBits: 8,
      stopBits: 1,
      parity: "none",
      bufferSize: 32768,
      flowControl: "none"
    },
    no_device: 1,
    device_listen_on_channel: 1,
    username: null,
    password: null,
    environment: "production",
    socket: !1
  }) {
    if (super({ filters: t, config_port: e, no_device: i, device_listen_on_channel: r, socket: c }), this.__internal__.device.type = "pinpad", !yi())
      throw new Error("Crypto not supported in this browser");
    if (le.getCustom(this.typeDevice, i))
      throw new Error(`Device ${this.typeDevice} ${i} already exists`);
    this.__internal__.time.response_connection = 3e3, this.__internal__.time.response_general = 5e3, this.__internal__.serial.delay_first_connection = 1e3, this.environment = o, s && (this.username = s), a && (this.password = a), this.#A(), le.add(this);
  }
  #A() {
    const t = [
      "pp:processing-card",
      "pp:read-card",
      "pp:error",
      "pp:print",
      "pp:merchant-moto",
      "pp:dukpt",
      "pp:finish-emv",
      "pp:response"
    ];
    for (const e of t)
      this.serialRegisterAvailableListener(e);
  }
  async timeout(t, e) {
    await super.timeout(t, e), this.__pinPad__.waiting.statusAboutWaiting && e === "about" ? this.__pinPad__.waiting.statusAboutWaiting = "rejected" : this.__pinPad__.waiting.statusInjectWaiting && e === "inject" ? this.__pinPad__.waiting.statusInjectWaiting = "rejected" : this.__pinPad__.waiting.statusinitDUKPTWaiting && e === "init-dukpt" ? this.__pinPad__.waiting.statusinitDUKPTWaiting = "rejected" : this.__pinPad__.waiting.statuswritingDUKPTWaiting && e === "dukpt" ? this.__pinPad__.waiting.statuswritingDUKPTWaiting = "rejected" : this.__pinPad__.waiting.statusReadCardWaiting && e === "read-card" ? this.__pinPad__.waiting.statusReadCardWaiting = "rejected" : this.__pinPad__.waiting.statusSecondGenerateWaiting && e === "second-generate" && (this.__pinPad__.waiting.statusSecondGenerateWaiting = "rejected");
  }
  #C(t) {
    const e = this.__pinPad__.constants.STX, i = this.__pinPad__.constants.ETX, r = this.__pinPad__.constants.FS, s = this.__pinPad__.constants.getNULL;
    t = t.replace(new RegExp(e, "g"), "");
    const a = t.split(i);
    t = a[0];
    const o = t.split(r);
    o.push(...a[1].split(r));
    const c = {};
    return o.map((h, u) => {
      const f = u > 0 ? h.substring(0, 1) : "A", _ = u > 0 ? h.substring(1) : h;
      return { [f]: _.replace(new RegExp(s, "g"), "") };
    }).forEach((h) => Object.assign(c, h)), c;
  }
  // @ts-expect-error parts is not used
  #f(t, e) {
    const i = this.__pinPad__.constants.ETX, r = e.substring(e.indexOf("D") + 2, e.indexOf("E"));
    let s = 0;
    const a = e.indexOf("N") > 0, o = e.substring(e.indexOf("A00") + 3, e.indexOf("B"));
    if (o && o !== "undefined" && o.toUpperCase() === "VERIFONE") {
      const h = r.replace("MITP_1.00.", "").replace("MITP_01.00.", "").replace("MITD_1.00.", "").replace("MITD_01.00.", "");
      s = parseInt(h), s >= 15 && (this.__pinPad__.about.hasCashback = !0);
    }
    this.__pinPad__.about.supportInjection = a, e.indexOf("M") > 0 ? (this.__pinPad__.about.supportSign = e.substring(e.indexOf("L") + 2, e.indexOf("M")) == "1", this.__pinPad__.about.supportInjection ? this.__pinPad__.about.supportContactlessCollisionCard = e.substring(e.indexOf("M") + 2, e.indexOf("N")) === "1" : (this.__pinPad__.about.supportContactlessCollisionCard = e.substring(e.indexOf("M") + 2, e.indexOf(i)) == "1", this.__pinPad__.about.supportContactless = !0)) : (this.__pinPad__.about.supportSign = e.substring(e.indexOf("L") + 2, e.indexOf(i)) == "1", this.__pinPad__.about.supportContactless = !1), this.__pinPad__.about.supportDUKPT = e.substring(e.indexOf("J") + 2, e.indexOf("K")), this.__pinPad__.about.EMV = e.substring(e.indexOf("E") + 2, e.indexOf("F")), this.__pinPad__.about.serial = e.substring(e.indexOf("C") + 2, e.indexOf("D")), this.__pinPad__.about.printer = e.substring(e.indexOf("F") + 2, e.indexOf("G")), this.__pinPad__.about.model = e.substring(e.indexOf("B") + 2, e.indexOf("C")), this.__pinPad__.about.brand = o, this.__pinPad__.about.appVersion = r;
    const c = e.substring(e.indexOf("K") + 2, e.indexOf("L")) == "1";
    this.__pinPad__.about.pp = {
      brand: o,
      appVersion: r,
      versionInt: s,
      hasCashback: this.__pinPad__.about.hasCashback,
      supportInjection: this.__pinPad__.about.supportInjection,
      supportSign: this.__pinPad__.about.supportSign,
      supportContactlessCollisionCard: this.__pinPad__.about.supportContactlessCollisionCard,
      supportContactless: this.__pinPad__.about.supportContactless,
      supportDUKPT: this.__pinPad__.about.supportDUKPT == "1",
      hasDUKPTKeys: c,
      EMV: this.__pinPad__.about.EMV,
      serial: this.__pinPad__.about.serial,
      printer: this.__pinPad__.about.printer,
      model: this.__pinPad__.about.model
    }, this.__pinPad__.waiting.statusAboutWaiting && (this.__pinPad__.waiting.statusAboutWaiting = "resolved");
  }
  #R() {
    this.__pinPad__.waiting.statusInjectWaiting = "resolved";
  }
  // @ts-expect-error parts is not used
  #O(t, e) {
    e = e.replace("010P93A00B01t036P81AACERQUE, INSERTE CHIP O  DESLICE*", ""), this.__pinPad__.config.terminal = {
      nb_kcv: e.substring(e.indexOf("E") + 2, e.indexOf("F")),
      nb_marca_terminal: e.substring(e.indexOf("P91A") + 4, e.indexOf("B")),
      nb_modelo_terminal: e.substring(e.indexOf("B") + 2, e.indexOf("C")),
      nb_serie_lector: e.substring(e.indexOf("C") + 2, e.indexOf("D")),
      nb_tk: e.substring(e.indexOf("F") + 2, e.length - 2),
      nb_version_terminal: e.substring(e.indexOf("D") + 2, e.indexOf("E"))
    }, this.__pinPad__.waiting.statusinitDUKPTWaiting = "resolved";
  }
  #D() {
    this.__pinPad__.waiting.statuswritingDUKPTWaiting = "resolved";
  }
  // @ts-expect-error parts is not used
  #I(t, e) {
    const i = this.__pinPad__.about?.brand?.toLowerCase(), r = this.__pinPad__.about?.model?.toLowerCase(), s = i === "ingenico" && r === "ipp320" ? 500 : 350;
    if (e.length < s) {
      e = e.replace("006P93A00.", "").replace("006P93A00,", ""), e.includes("E93") ? this.__pinPad__.operation.ignore.error = e.substring(e.indexOf("E93") + 3, e.indexOf("E93") + 6) : e.includes("E71") && (this.__pinPad__.operation.ignore.error = e.substring(e.indexOf("E71") + 3, e.indexOf("E71") + 6)), this.__pinPad__.operation.ignore.error !== "" && e.indexOf("OPERACION       CANCELADA") === -1 && e.indexOf("TIEMPO         EXCEDIDO") === -1 && this.__pinPad__.operation.ignore.error.length === 3 && (this.__pinPad__.operation.last_error = this.#T(this.__pinPad__.operation.ignore.error), this.__pinPad__.waiting.statusReadCardWaiting = "rejected");
      return;
    }
    if (e.includes("M1") || e.includes("M0") || e.includes("M1") || e.includes("N1") || e.includes("N1") || e.includes("P93A022") && e.substring(e.length - 24).includes("I") && e.substring(e.length - 1).includes("") || e.includes("P93A800") && e.substring(e.length - 24).includes("I") && e.substring(e.length - 1).includes("") || e.includes("P93A022") && e.length >= 406 && r === "vx820" || e.includes("P93A022") && e.length >= 406 && r === "vx520" || e.includes("P93A800") && e.length >= 406 && r === "vx520" || e.includes("P93A800") && e.length >= 406 && r === "vx820" || e.includes("P93A022") && e.length >= 406 && r === "p400" || e.includes("P93A800") && e.length >= 406 && r === "p400" || e.includes("P93A022") && e.length >= 406 && r === "v205c" || e.includes("P93A800") && e.length >= 406 && r === "v205c" || e.includes("P93A022") && e.length >= 406 && r === "move2500" || e.includes("P93A800") && e.length >= 406 && r === "move2500" || e.includes("P93A022") && e.length >= 406 && r === "lane3000" || e.includes("P93A800") && e.length >= 406 && r === "lane3000") {
      let a = e;
      i === "verifone" && (a = e.replace("006P93A00.", "").substring(e.indexOf("P93A"), e.indexOf("P93A") + 7)), e.includes("P81APROCESANDO, NO RETIRE TARJETA") || e.includes("P81APROCESANDO TARJETA") || a.includes("P93A022") || a.includes("P81AINSERTE CHIP O  DESLICE TARJETA") || a.includes("ACERQUE, INSERTE CHIP O  DESLICE") || a.includes("P81AACERQUE, INSERTE CHIP O  DESLICE TARJETA") ? this.dispatch("pp:processing-card", { waiting: !0 }) : e.length > s && this.#N(e);
    }
  }
  // @ts-expect-error parts is not used
  #B(t, e) {
    const i = this.__pinPad__.constants.ETX;
    let r = e.replace("023P81AFAVOR RETIRAR TARJ.", "").replace("020P81A DECLINADA EMV  ", "").replace("020P81A DECLINADA EMV  ", "");
    r = r.substring(r.indexOf("B") + 2, r.indexOf(i)), r.includes("006E93A16") && (r = "01"), this.__pinPad__.operation.applyReverse = r === "01" && this.__pinPad__.operation.responseMit._approved && this.__pinPad__.config.otherLogin.executeReverse === "1", this.__pinPad__.waiting.statusSecondGenerateWaiting = "resolved";
  }
  #N(t) {
    const e = this.__pinPad__.constants.ETX, i = this.__pinPad__.about?.brand?.toLowerCase();
    let r, s, a, o, c;
    i === "verifone" ? t = t.replace("006P93A00.", "").replace("009P93A00", "").replace("010P93A00B01v", "") : t = t.replace("006P93A00,", ""), this.__pinPad__.config.read.POSEM = t.substring(t.indexOf("P93A") + 4, t.indexOf("B"));
    const h = this.__pinPad__.config.read.POSEM;
    if (h === "051" || h === "071") {
      if (this.__pinPad__.config.read.Chip = "1", this.__pinPad__.config.read.PIN = t.substring(t.indexOf("C") + 2, t.indexOf("D")), this.__pinPad__.config.read.AppId = t.substring(t.indexOf("G") + 2, t.indexOf("H")), this.__pinPad__.config.read.AppIdLabel = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.Arqc = t.substring(t.indexOf("F") + 2, t.indexOf("G")), t.includes("O")) {
        const u = t.substring(t.indexOf("P93A"));
        this.__pinPad__.config.read.ReadCTLS = u.substring(
          u.indexOf("M") + 2,
          u.indexOf("N")
        ), this.__pinPad__.operation.hasQPS = u.substring(u.indexOf("N") + 2, u.indexOf("O")) === "1", this.__pinPad__.operation.bin8 = u.substring(u.indexOf("O") + 2, u.indexOf(e));
      } else if (t.includes("N")) {
        const u = t.substring(t.indexOf("P93A"));
        this.__pinPad__.config.read.ReadCTLS = u.substring(
          u.indexOf("M") + 2,
          u.indexOf("N")
        ), this.__pinPad__.operation.hasQPS = u.substring(u.indexOf("N") + 2, u.indexOf(e)) === "1";
      } else {
        const u = t.substring(t.indexOf("P93A"), t.indexOf("M") + 5);
        this.__pinPad__.config.read.ReadCTLS = u.substring(u.indexOf("M") + 2, u.indexOf(e)), this.__pinPad__.operation.hasQPS = !1;
      }
      this.__pinPad__.config.read.Tags = t.substring(t.indexOf("B") + 2, t.indexOf("C")), this.__pinPad__.config.read.NB_ksn = t.substring(t.indexOf("K") + 2, t.indexOf("M")), this.__pinPad__.config.read.NB_Data = t.substring(t.indexOf("D") + 2, t.indexOf("E")), s = t.substring(t.indexOf("I") + 2, t.indexOf("J")), a = t.substring(t.indexOf("E") + 2, t.indexOf("F")), this.__pinPad__.config.read.ChipName = a, r = t.substring(t.indexOf("J") + 2, t.indexOf("K"));
    } else {
      let u;
      if (this.__pinPad__.config.read.Chip = "0", this.__pinPad__.config.read.PIN = "", this.__pinPad__.config.read.AppId = "", this.__pinPad__.config.read.Arqc = "", this.__pinPad__.config.read.ReadCTLS = "0", this.__pinPad__.config.read.AppIdLabel = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.Tags = t.substring(t.indexOf("B") + 2, t.indexOf("C")), h === "022")
        if (t.includes("O")) {
          const f = t.substring(t.indexOf("P93A"));
          this.__pinPad__.operation.bin8 = f.substring(f.indexOf("O") + 2, f.indexOf(e)), u = t.substring(t.indexOf("P93A022"), t.indexOf("I") + 23), u = u.substring(u.indexOf("I") + 2, u.lastIndexOf(""));
        } else
          u = t.substring(t.indexOf("P93A022"), t.indexOf("I") + 23), u = u.substring(u.indexOf("I") + 2, u.indexOf(e));
      else
        u = t.substring(t.indexOf("P93A800"), t.indexOf("I") + 23), u = u.substring(u.indexOf("I") + 2, u.indexOf(e));
      this.__pinPad__.config.read.NB_ksn = u, this.__pinPad__.config.read.NB_Data = t.substring(t.indexOf("B") + 2, t.indexOf("C")), s = t.substring(t.indexOf("F") + 2, t.indexOf("G")), r = t.substring(t.indexOf("G") + 2, t.indexOf("H")), this.__pinPad__.about.model?.toLowerCase() === "vx520" ? (a = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.ChipName = a) : (a = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.ChipName = a);
    }
    r.includes("/") && (r = r.replace("/", "")), r.toString().length === 4 ? (c = r.toString().substring(0, 2), o = r.toString().substring(2)) : (c = "", o = ""), this.__pinPad__.config.read.Chip === "1" ? (this.__pinPad__.config.read.EMV = "3", this.__pinPad__.config.read.ChipNameEnc = "1") : (this.__pinPad__.config.read.ChipNameEnc = "", this.__pinPad__.config.read.EMV = "2"), this.__pinPad__.config.read.AppIdLabel.toLowerCase().includes("american") || this.__pinPad__.config.read.AppIdLabel.toLowerCase().includes("amex") ? this.__pinPad__.config.read.Type = "AMEX" : this.__pinPad__.config.read.Type = "V/MC", this.__pinPad__.operation.bin = s, s.length > 6 && (this.__pinPad__.operation.bin = s.substring(0, 6)), this.__pinPad__.waiting.statusReadCardWaiting = "resolved", this.dispatch("pp:read-card", {
      ERROR: "",
      maskPan: s,
      name: a,
      month: c,
      year: o
    });
  }
  // @ts-expect-error parts is not used
  #x(t, e) {
    e.length > 10 && e.includes("E93A10") && (this.__pinPad__.waiting.statusReadCardWaiting === "pending" && (this.__pinPad__.waiting.statusReadCardWaiting = "rejected"), this.dispatch("pp:error", { message: "Operation cancelled by user." }));
  }
  // @ts-expect-error parts is not used
  #V(t, e) {
    if (this.__pinPad__.about.model?.toLowerCase() === "vx520") {
      if (e.length > 11)
        if (e.includes("P59A00"))
          this.__pinPad__.operation.clientVoucher !== "" ? setTimeout(() => {
            this.print("client").then(() => {
            }).catch((i) => {
              console.error(i);
            });
          }, 1e3) : this.dispatch("pp:print", { type: "success" });
        else {
          const i = e.includes("E17") || e.includes("A17") ? { type: "warning", message: "printer without paper" } : { type: "error", message: "The voucher could not be printed" };
          this.dispatch("pp:print", i);
        }
    } else if (e.includes("P59A00"))
      this.__pinPad__.operation.clientVoucher !== "" ? setTimeout(() => {
        this.print("client").then(() => {
        }).catch((i) => {
          console.error(i);
        });
      }, 1e3) : this.dispatch("pp:print", { type: "success" });
    else {
      const i = e.includes("E17") || e.includes("A17") ? { type: "warning", message: "printer without paper" } : { type: "error", message: "The voucher could not be printed" };
      this.dispatch("pp:print", i);
    }
  }
  #U(t, e) {
    console.log(t, e);
  }
  #L(t, e) {
    console.log(t, e);
  }
  serialMessage(t) {
    const e = {
      original_code: t,
      code: null,
      name: null,
      description: null,
      request: this.lastAction,
      no_code: 0,
      parsed: null
    }, i = this.parseHexToUint8(t), r = this.parseUint8ArrayToString(i), s = this.#C(r);
    switch (this.__pinPad__.buffer = r, e.parsed = s, e.code = r, e.request) {
      case "connect":
        e.name = "connected", e.description = "Connection established", e.no_code = 100, this.#f(s, r);
        break;
      case "about":
        e.name = "About PinPad", e.description = "Response of about", e.no_code = 101, this.#f(s, r);
        break;
      case "inject":
        e.name = "Inject", e.description = "Response of inject values", e.no_code = 102, this.#R();
        break;
      case "init-dukpt":
        e.name = "Init DUKPT", e.description = "Response of init DUKPT", e.no_code = 103, this.#O(s, r);
        break;
      case "dukpt":
        e.name = "Write DUKPT", e.description = "Response of write DUKPT", e.no_code = 104, this.#D();
        break;
      case "read-card":
        e.name = "read card", e.description = "response of read card", e.no_code = 105, this.#I(s, r);
        break;
      case "second-generate":
        e.name = "second generate", e.description = "response of second generate", e.no_code = 106, this.#B(s, r);
        break;
      case "cancel":
        e.name = "cancel pinpad", e.description = "response of cancel", e.no_code = 107;
        break;
      case "print":
        this.#V(s, r), e.name = "print voucher", e.description = "response of print", e.no_code = 108;
        break;
      case "cancel-read-card":
        this.#x(s, r), e.name = "cancel read card", e.description = "response of cancel read card", e.no_code = 109;
        break;
      case "code93":
        this.#U(s, r), e.name = "code 93", e.description = "response of code 93", e.no_code = 110;
        break;
      case "finish-emv-end":
        this.#L(s, r), e.name = "Finish EMV End", e.description = "response of finish EMV End", e.no_code = 111;
        break;
      default:
        e.name = "unknown", e.description = "Unknown command", e.no_code = 400;
        break;
    }
    this.dispatch("serial:message", e);
  }
  serialSetConnectionConstant() {
    const t = "", e = "";
    let i = "C56AABOUT";
    i = t + i.length.toString().padStart(3, "0") + i + e;
    let r = 0;
    for (let a = 0; a < i.length; a++)
      r ^= i.charCodeAt(a);
    i = i + String.fromCharCode(r);
    const s = this.parseStringToBytes(i, "");
    return this.add0x(s);
  }
  async sendCustomCode({ code: t = "" } = {}) {
    if (typeof t != "string") throw new Error("Invalid string");
    const e = this.parseStringToBytes(t);
    await this.appendToQueue(e, "custom");
  }
  // ========================================================================================
  // ========================================================================================
  // ========================================================================================
  set username(t) {
    this.__pinPad__.config.username = t;
  }
  get username() {
    return this.__pinPad__.config.username;
  }
  set password(t) {
    if (typeof t != "string") throw new Error("Invalid password");
    this.__pinPad__.config.password = t.toUpperCase();
  }
  get password() {
    return this.__pinPad__.config.password;
  }
  set amount(t) {
    if (t = parseFloat(t), isNaN(t) || t <= 0) throw new Error("Invalid amount");
    this.__pinPad__.operation.amount = t.toFixed(2).toString();
  }
  get amount() {
    return parseFloat(this.__pinPad__.operation.amount) || 0;
  }
  set reference(t) {
    if (!this.#g(t.trim())) throw new Error("Invalid reference");
    this.__pinPad__.operation.reference = t.trim().toString().replaceAll(" ", "").toUpperCase();
  }
  get reference() {
    return this.__pinPad__.operation.reference || "";
  }
  get url() {
    const t = this.environment;
    return this.__pinPad__.constants.urls[t];
  }
  get version() {
    return {
      name: this.__pinPad__.constants.appName,
      version: this.__pinPad__.constants.appVersion,
      environment: this.environment,
      type: this.typeDevice
    };
  }
  set environment(t) {
    const e = ["development", "qa", "production", "productionAlternative"];
    if (typeof t != "string" || !e.includes(t.toLowerCase()))
      throw new Error("The environment must be a string, in: " + e.join(", "));
    this.__pinPad__.config.defaultEnvironment = t.toLowerCase(), this.__pinPad__.config.environment = t.toLowerCase();
  }
  get defaultEnvironment() {
    return this.__pinPad__.config.defaultEnvironment;
  }
  get environment() {
    return this.__pinPad__.config.environment;
  }
  get latitudeLongitude() {
    return {
      latitude: this.__pinPad__.config.latitude,
      longitude: this.__pinPad__.config.longitude
    };
  }
  set timeoutPinPad(t) {
    if (t = parseInt(t), isNaN(t) || t <= 10 || t >= 300)
      throw new Error("Invalid timeout please use a number between 10 and 300 seconds");
    this.__pinPad__.config.timeoutPinPad = t.toString();
  }
  get timeoutPinPad() {
    return parseInt(this.__pinPad__.config.timeoutPinPad);
  }
  // ========================================================================================
  // Updated to WS v4
  // ========================================================================================
  #s(t, e) {
    const i = new tn();
    return i.setPublicKey(t), i.encrypt(e);
  }
  #a(t) {
    const e = "0123456789ABCDEF";
    let i = "";
    for (let r = 0; r < t; r++) {
      const s = Math.floor(Math.random() * e.length);
      i += e.substring(s, s + 1);
    }
    return i;
  }
  #M(t) {
    const e = "0123456789abcdef", i = [], r = [];
    for (let s = 0; s < 256; s++)
      i[s] = e.charAt(s >> 4) + e.charAt(s & 15);
    for (let s = 0; s < t.length; s++)
      r[s] = i[t.charCodeAt(s)];
    return r.join("");
  }
  // base16Decode(hex) {
  //   const hexChars = '0123456789abcdef';
  //   const asciiArray = [];
  //   const decodedArray = [];
  //   let j = 0;
  //   for (let i = 0; i < 256; i++) {
  //     asciiArray[hexChars.charAt(i >> 4) + hexChars.charAt(i & 15)] = String.fromCharCode(i);
  //   }
  //   hex = hex.replace(/[^a-f0-9]/gi, '');
  //   if (hex.length % 2) {
  //     hex = '0' + hex;
  //   }
  //   for (let i = 0; i < hex.length; i += 2) {
  //     decodedArray[j++] = asciiArray[hex.substr(i, 2)];
  //   }
  //   return decodedArray.join('');
  // }
  async #o(t, e) {
    const i = t.match(/.{1,2}/g) || [], r = new Uint8Array(i.map((_) => parseInt(_, 16))), s = crypto.getRandomValues(new Uint8Array(16)), o = new TextEncoder().encode(e), c = await crypto.subtle.importKey("raw", r, { name: "AES-CBC" }, !1, ["encrypt"]), h = await crypto.subtle.encrypt({ name: "AES-CBC", iv: s }, c, o), u = btoa(String.fromCharCode(...s)), f = btoa(String.fromCharCode(...new Uint8Array(h)));
    return u + f;
  }
  // async AESDecrypt(key, encryptedMessage) {
  //   const keyBytes = new Uint8Array(key.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
  //   const ivBase64 = encryptedMessage.slice(0, 24); // Assuming the IV is 16 bytes and base64 encoded
  //   const ciphertextBase64 = encryptedMessage.slice(24);
  //
  //   const iv = new Uint8Array(
  //     atob(ivBase64)
  //       .split('')
  //       .map((char) => char.charCodeAt(0))
  //   );
  //   const ciphertext = new Uint8Array(
  //     atob(ciphertextBase64)
  //       .split('')
  //       .map((char) => char.charCodeAt(0))
  //   );
  //
  //   const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-CBC' }, false, ['decrypt']);
  //
  //   const decrypted = await crypto.subtle.decrypt({ name: 'AES-CBC', iv: iv }, cryptoKey, ciphertext);
  //
  //   const decoder = new TextDecoder();
  //   return decoder.decode(decrypted);
  // }
  #k(t, e, i = !1) {
    const r = [];
    for (let h = 0; h < 256; h++)
      r[h] = h;
    let s = 0;
    for (let h = 0; h < 256; h++)
      s = (s + r[h] + t.charCodeAt(h % t.length)) % 256, [r[h], r[s]] = [r[s], r[h]];
    let a = 0, o = 0, c = "";
    for (const h of e) {
      a = (a + 1) % 256, o = (o + r[a]) % 256, [r[a], r[o]] = [r[o], r[a]];
      const u = r[(r[a] + r[o]) % 256];
      c += String.fromCharCode(h.charCodeAt(0) ^ u);
    }
    return i ? this.#M(c).toUpperCase() : c;
  }
  #n(t, e) {
    return this.#k(t, this.hexToAscii(e));
  }
  #F(t) {
    return t.replaceAll("Á", "A"), t.replaceAll("É", "E"), t.replaceAll("Í", "I"), t.replaceAll("Ó", "O"), t.replaceAll("Ú", "U"), t.replaceAll("á", "a"), t.replaceAll("é", "e"), t.replaceAll("í", "i"), t.replaceAll("ó", "o"), t.replaceAll("ú", "u"), t.replaceAll("ñ", "n"), t.replaceAll("Ñ", "N"), t.replaceAll('Electr?a"', "Electronica"), t;
  }
  #t(t, e, i) {
    if (t = t.replace("@cnb logo_cpagos", e), t = t.replace("@cnn ver_app", i), t = t.replace(/@/g, " @"), t = t.replace(/ {2}@/g, " @"), t = t.replace(/ {3}@/g, " @"), t = t.replace(/\r/g, ""), t = t.replace(/\n/g, ""), t.includes("@lsn POR ESTE PAGARE ME OBLIGO INCONDI")) {
      const r = t.indexOf("@lsn POR ESTE PAGARE ME OBLIGO INCONDI");
      t = t.substring(0, r);
    }
    return t.trim() + "@br @br @br @br @br";
  }
  #j(t, e) {
    const i = "@logo3 @br", r = "@cnn " + e;
    return t.includes("@cnb Santander") ? (t = t.replace("@cnb Santander", "@logo1@br"), this.#t(t, i, r)) : t.includes("@cnb American Express") ? (t = t.replace("@cnb American Express", "@logo2@br"), this.#t(t, i, r)) : t.includes("@cnb HSBC") ? (t = t.replace("@cnb HSBC", "@logo7@br"), this.#t(t, i, r)) : t.includes("@cnb IXE") ? (t = t.replace("@cnb IXE", "@logo11@br"), this.#t(t, i, r)) : t.includes("@cnb MULTIVA") ? (t = t.replace("@cnb MULTIVA", "@logo15@br"), this.#t(t, i, r)) : t.includes("@cnb Multiva") ? (t = t.replace("@cnb Multiva", "@logo15@br"), this.#t(t, i, r)) : t.includes("@cnb SCOTIA BANK") ? (t = t.replace("@cnb SCOTIA BANK", "@logo16@br"), this.#t(t, i, r)) : t.includes("@cnb SCOTIABANK") ? (t = t.replace("@cnb SCOTIABANK", "@logo16@br"), this.#t(t, i, r)) : t.includes("@cnb BANCOMER") ? (t = t.replace("@cnb BANCOMER", "@logo17@br"), this.#t(t, i, r)) : t.includes("@cnb Bancomer") ? (t = t.replace("@cnb Bancomer", "@logo17@br"), this.#t(t, i, r)) : t.includes("@cnb BBVA") ? (t = t.replace("@cnb BBVA", "@logo17@br"), this.#t(t, i, r)) : t.includes("@cnb BANORTE") ? (t = t.replace("@cnb BANORTE", "@logo18@br"), this.#t(t, i, r)) : t.includes("@cnb Banorte") ? (t = t.replace("@cnb Banorte", "@logo18@br"), this.#t(t, i, r)) : t.includes("@cnb BANREGIO") ? (t = t.replace("@cnb BANREGIO", "@logo19@br"), this.#t(t, i, r)) : t.includes("@cnb Banregio") ? (t = t.replace("@cnb Banregio", "@logo19@br"), this.#t(t, i, r)) : t.includes("@cnb GETNET") ? (t = t.replace("@cnb GETNET", "@logo20@br"), this.#t(t, i, r)) : t.includes("@cnb GetNET") ? (t = t.replace("@cnb GetNET", "@logo20@br"), this.#t(t, i, r)) : this.#t(t, i, r);
  }
  async #q(t = !1) {
    if (this.#H(), this.__pinPad__.config.loginResponse && !t) return await this.#p();
    const e = this.url + this.__pinPad__.constants.uris.login, i = {
      usuario: this.username,
      password: this.password,
      crypto: "",
      version: this.__pinPad__.constants.appVersion,
      serieLector: "",
      canal: this.__pinPad__.constants.appChannel
    };
    if (await this.#c(), this.#d())
      throw new Error("Empty RSA Key");
    const r = this.#a(32), s = this.#s(this.__pinPad__.config.publicKeyRSA || "", r), a = await this.#o(r, JSON.stringify(i)), o = await S.post(e, a, {
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0",
        data: s || ""
      }
    }).catch((u) => {
      throw new Error(`Error in request, verify internet connection: ${u.response?.status} ${u.message}`);
    }), c = this.#b(JSON.stringify(o.data));
    let h = c;
    if (typeof c == "string" && (h = JSON.parse(c)), !h)
      throw new Error("Invalid response JSON");
    if (h.RESPUESTA === "error")
      throw new Error(h);
    return this.__pinPad__.config.loginResponse = h, localStorage.setItem(
      "ppLoginResponse",
      JSON.stringify({
        timestamp: (/* @__PURE__ */ new Date()).getTime(),
        data: h
      })
    ), await this.#p();
  }
  async #p() {
    await this.#G();
    try {
      await this.getPosition();
    } catch (t) {
      console.log("Error getting position", t);
    }
    return this.__pinPad__.config.otherLogin = {}, this.#K(this.__pinPad__.config.loginResponse), this.__pinPad__.config.otherLogin;
  }
  #K(t) {
    let e = "", i = "";
    t.xml?.ventaspropias?.merchant_currencyb && (e = t.xml.ventaspropias.merchant_currencyb), t.xml?.ventaspropias?.merchant_currencym && (i = t.xml.ventaspropias.merchant_currencym);
    let r = t.xml?.emvReverso;
    r || (r = "0");
    const s = t.xml?.st_tokenizacion;
    !s || s === "false" || s === "0" ? this.__pinPad__.config.internal.stTokenization = !1 : this.__pinPad__.config.internal.stTokenization && (this.__pinPad__.config.internal.stTokenization = !0), this.__pinPad__.config.internal.emv = t.xml.importesPGS, this.__pinPad__.config.internal.qpsDomestic = this.__pinPad__.config.internal.emv.qps_dom, this.__pinPad__.config.internal.qpsInternational = this.__pinPad__.config.internal.emv.qps_il, this.__pinPad__.config.internal.cvmlVMCDomestic = this.__pinPad__.config.internal.emv.cvml_vm_dom, this.__pinPad__.config.internal.cvmlVMCInternational = this.__pinPad__.config.internal.emv.cvml_vm_il, this.__pinPad__.config.internal.cvmlAmex = this.__pinPad__.config.internal.emv.cvml_amex, this.__pinPad__.config.internal.translimitCTLSVMC = this.__pinPad__.config.internal.emv.tl_mc, this.__pinPad__.config.internal.translimitCTLSAmex = this.__pinPad__.config.internal.emv.tl_amex, this.__pinPad__.config.country = t.country.toUpperCase(), this.__pinPad__.config.idBranch = t.id_branch.toUpperCase(), this.__pinPad__.config.idCompany = t.id_company.toUpperCase(), this.__pinPad__.config.otherLogin = {
      bsUser: t.user,
      nbUser: t.nb_user,
      bsCompany: t.id_company,
      nbCompany: t.nb_company,
      nbStreetCompany: t.nb_companystreet,
      bsBranch: t.id_branch,
      nbBranch: t.nb_branch,
      bsCountry: t.country,
      coins: e,
      coinsMOTO: i,
      executeReverse: r
    };
  }
  #H() {
    const t = localStorage.getItem("ppLoginResponse");
    let e = null;
    t && (e = JSON.parse(t), this.__pinPad__.config.loginResponse || (this.__pinPad__.config.loginResponse = e?.data), (/* @__PURE__ */ new Date()).getTime() - e?.timestamp >= 864e5 && (this.__pinPad__.config.loginResponse = null));
  }
  async login({ force: t = !1 } = {}) {
    return await this.#q(t);
  }
  async #W() {
    const t = this.url + this.__pinPad__.constants.uris.RSAKey, e = await S.get(t).catch((r) => {
      throw new Error(`Error in request, verify internet connection: ${r.response.status} ${r.message}`);
    });
    if (!e) return "";
    const i = e.headers;
    if (!i) return "";
    if (i.get("content-type").indexOf("application/json") === -1)
      throw new Error("Fail to fetch RSA public key");
    return this.__pinPad__.config.publicKeyRSA = e.data.key_public, localStorage.setItem(
      "ppRSAKey",
      JSON.stringify({
        timestamp: (/* @__PURE__ */ new Date()).getTime(),
        data: e.data.key_public
      })
    ), this.__pinPad__.config.publicKeyRSA;
  }
  clearSession() {
    localStorage.removeItem("ppLoginResponse"), localStorage.removeItem("ppRSAKey"), localStorage.removeItem("ppPublicIP");
  }
  #d() {
    const t = localStorage.getItem("ppRSAKey");
    if (!t) return !0;
    const e = JSON.parse(t);
    return !e.data || (this.__pinPad__.config.publicKeyRSA = e.data, (/* @__PURE__ */ new Date()).getTime() - e.timestamp >= 864e5) ? !0 : !this.__pinPad__.config.publicKeyRSA;
  }
  async #_() {
    return this.#d() ? await this.#W() : this.__pinPad__.config.publicKeyRSA;
  }
  async #c() {
    if (!await this.#_())
      throw new Error("RSA public key is empty");
  }
  #g(t) {
    return /^[A-Z-a-z0-9\s]+$/g.test(t);
  }
  #X(t) {
    if (z(t))
      return !0;
    const e = /^[A-Z-a-z0-9\s]+$/g.test(t) === !0;
    if (!e)
      throw new Error("Invalid reference");
    return e;
  }
  #e(t) {
    return t.length.toString().padStart(3, "0");
  }
  #i(t) {
    let e = 0;
    for (let i = 0; i < t.length; i++)
      e ^= t.charCodeAt(i);
    return String.fromCharCode(e);
  }
  #h(t, e = 0) {
    return t = parseFloat(t.toString().replace(/[^0-9.-]/g, "")), isNaN(t) ? 0 .toFixed(e) : t.toFixed(e).replace(/,/g, "");
  }
  #m(t) {
    return t = parseFloat(t.toString()), !(isNaN(t) || t < 0);
  }
  async #u(t) {
    for (const e in t)
      if (typeof t[e] > "u" || t[e] === null || t[e] === "")
        throw new Error("Object incomplete to process");
    return t;
  }
  #y(t) {
    if (!t || isNaN(parseInt(t)) || t.toString().length !== 9)
      throw new Error("Number of operation must be number of 9 digits");
    return t;
  }
  #b(t) {
    if (typeof t != "string") throw new Error("Invalid string");
    return !t || /<html(?:\s+lang=["'][^"']*["'])?>/i.test(t) || (t = t.replace(/aaa/g, "á"), t = t.replace(/eee/g, "é"), t = t.replace(/iii/g, "í"), t = t.replace(/ooo/g, "ó"), t = t.replace(/uuu/g, "ú"), t = t.replace(/NNN/g, "Ñ"), t = t.replace(/nnn/g, "ñ"), t = t.replace(/Ã¡/g, "á")), t;
  }
  async #z() {
    const t = this.__pinPad__.constants.STX, e = this.__pinPad__.constants.ETX;
    let i = "C55ACANCEL";
    i = t + this.#e(i) + i + e, i = i + this.#i(i);
    const r = this.parseStringToBytes(i, "");
    await this.appendToQueue(r, "cancel");
  }
  #P() {
    const t = /* @__PURE__ */ new Date(), e = t.getDate().toString().padStart(2, "0"), i = (t.getMonth() + 1).toString().padStart(2, "0"), r = t.getFullYear().toString().substring(2);
    return e + i + r;
  }
  #v() {
    const t = /* @__PURE__ */ new Date(), e = t.getHours().toString().padStart(2, "0"), i = t.getMinutes().toString().padStart(2, "0");
    return e + i;
  }
  async checkPositionPermission() {
    if (!fe())
      throw new Error("Geolocation not supported");
    return new Promise((t, e) => {
      navigator.permissions.query({ name: "geolocation" }).then((i) => {
        i.state === "granted" ? t(!0) : t(!1);
      }).catch(() => e(!1));
    });
  }
  async getPosition() {
    return this.__pinPad__.config.latitude && this.__pinPad__.config.longitude ? this.latitudeLongitude : (this.__pinPad__.config.latitude = null, this.__pinPad__.config.longitude = null, fe() ? new Promise((t) => {
      navigator.geolocation.getCurrentPosition(
        (e) => {
          this.__pinPad__.config.latitude = e.coords.latitude, this.__pinPad__.config.longitude = e.coords.longitude, t(this.latitudeLongitude);
        },
        () => {
          t(this.latitudeLongitude);
        }
      );
    }) : this.latitudeLongitude);
  }
  async #G() {
    const t = localStorage.getItem("ppPublicIP");
    if (t) {
      const s = JSON.parse(t);
      this.__pinPad__.config.publicIP = s.data, (/* @__PURE__ */ new Date()).getTime() - s.timestamp >= 864e5 && (this.__pinPad__.config.publicIP = null);
    }
    if (this.__pinPad__.config.publicIP) return this.__pinPad__.config.publicIP;
    this.__pinPad__.config.publicIP = null;
    let e = !1;
    const i = await S.get("https://api.ipify.org?format=json").catch(() => e = !0);
    if (e || typeof i != "object" || !i || !i.data)
      return null;
    const r = i.data || {};
    return this.__pinPad__.config.publicIP = r.ip || null, localStorage.setItem(
      "ppPublicIP",
      JSON.stringify({
        timestamp: (/* @__PURE__ */ new Date()).getTime(),
        data: r.ip
      })
    ), this.__pinPad__.config.publicIP;
  }
  async cancelReadCard() {
    let t = "012VXVCANCELl";
    this.__pinPad__.about.model?.toLowerCase() === "ingenico" && (t = "029C50AOPERACION       CANCELADA");
    const e = this.parseStringToBytes(t, "");
    await this.appendToQueue(e, "cancel-read-card");
  }
  async print(t = "client") {
    this.__pinPad__.operation.errors = 0;
    const e = this.__pinPad__.constants.STX, i = this.__pinPad__.constants.ETX;
    this.__pinPad__.operation.commerceVoucher.includes(":") || (this.__pinPad__.operation.commerceVoucher = this.#n(
      this.__pinPad__.config.RC4Key,
      this.__pinPad__.operation.commerceVoucher
    )), this.__pinPad__.operation.clientVoucher.includes(":") || (this.__pinPad__.operation.clientVoucher = this.#n(
      this.__pinPad__.config.RC4Key,
      this.__pinPad__.operation.clientVoucher
    ));
    let r = t === "client" ? this.__pinPad__.operation.clientVoucher : this.__pinPad__.operation.commerceVoucher;
    if (r.length === 0) {
      this.dispatch("pp:print", {
        error: !0,
        code: "001",
        message: "Without information to print"
      });
      return;
    }
    r = this.#F(r), r = this.#j(r, this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion);
    let s = "C59A" + r;
    s = e + this.#e(s) + s + i, s = s + this.#i(s), t === "client" ? this.__pinPad__.operation.clientVoucher = "" : t === "commerce" && (this.__pinPad__.operation.commerceVoucher = "");
    const a = this.parseStringToBytes(s, "");
    await this.appendToQueue(a, "print");
  }
  async #r(t, e) {
    await this.#c();
    const i = this.#a(32), r = this.#s(this.__pinPad__.config.publicKeyRSA || "", i), s = await this.#o(i, JSON.stringify(e));
    return (await S.post(t, s, {
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        data: r || ""
      }
    }).catch((o) => {
      throw o.response.data.includes("Ha ocurrido un error al procesar su solicitud.") ? new Error("It was not possible to obtain the affiliations.") : o.response.status >= 500 && o.response.status <= 599 ? new Error(`Service Temporarily Unavailable ${o.message}`) : new Error(`Error in request, verify internet connection: ${o.response?.status} ${o.message}`);
    })).data;
  }
  // async getMerchantMOTO() {
  //   this.__pinPad__.operation.errors = 0;
  //   this.__pinPad__.operation.ignore.counterSale = false;
  //   await this.#validateObject({
  //     Ambiente: this.environment,
  //     BIN: this.__pinPad__.operation.bin8,
  //     User: this.username,
  //     Currency: this.__pinPad__.config.currency,
  //     Tx_OperationType: '',
  //   });
  //   const response = await this.#postMITRequest(this.url + this.__pinPad__.constants.uris.merchant, {
  //     accion: 'tipoPagoInfo',
  //     cc_num: this.__pinPad__.operation.bin8,
  //     usuario: this.username.toUpperCase(),
  //     canal: '',
  //     tp_canal: 'B',
  //     tp_moneda: this.__pinPad__.config.currency.toUpperCase(),
  //   });
  //   if (!response || response === '{}' || response.includes('Ha ocurrido un error al procesar su solicitud.')) {
  //     throw new Error('It was not possible to obtain the affiliations.');
  //   }
  //   this.dispatch('pp:merchant-moto', response);
  //   return response;
  // }
  async #E({ data: t, url: e, cancelable: i = !1 } = {
    data: null,
    url: "",
    cancelable: !1
  }) {
    await this.#c();
    const r = this.#a(32), s = this.#s(this.__pinPad__.config.publicKeyRSA || "", r), a = await this.#o(r, JSON.stringify(t)), o = this;
    return (await S.post(e, a, {
      headers: {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        data: s || ""
      }
    }).catch(async (h) => {
      let u = `Error in request, verify internet connection: ${h.status} ${h.message}`;
      throw h.response.status >= 500 && h.response.status <= 599 ? u = "Service Temporarily Unavailable" : h.response.status >= 400 && h.response.status <= 499 && (u = "Bad Request"), i && await o.#z(), new Error(u);
    })).data;
  }
  async #$() {
    const t = this.__pinPad__.constants.FS, e = this.__pinPad__.constants.ETX, i = this.__pinPad__.constants.STX;
    let r = "C57A" + this.__pinPad__.config.internal.qpsDomestic;
    if (r = r + t + "B" + this.__pinPad__.config.internal.qpsInternational, r = r + t + "C" + this.__pinPad__.config.internal.cvmlVMCDomestic, r = r + t + "D" + this.__pinPad__.config.internal.cvmlVMCInternational, r = r + t + "E" + this.__pinPad__.config.internal.cvmlAmex, r = r + t + "F" + this.__pinPad__.config.internal.translimitCTLSVMC, r = r + t + "G" + this.__pinPad__.config.internal.translimitCTLSAmex, r = i + this.#e(r) + r + e, r = r + this.#i(r), !this.__pinPad__.about.injectedValues) {
      const s = this.parseStringToBytes(r, "");
      await this.appendToQueue(s, "inject");
    }
  }
  async #J() {
    this.__pinPad__.operation.bin8 && (this.__pinPad__.operation.bin = this.__pinPad__.operation.bin8), this.__pinPad__.operation.bin8 = "";
    const t = await this.#E({
      data: {
        accion: "tipoPagoInfo",
        cc_num: this.__pinPad__.operation.bin,
        usuario: this.username?.toUpperCase(),
        canal: this.__pinPad__.constants.typeChannel,
        tp_canal: "1",
        tp_moneda: this.__pinPad__.config.currency.toUpperCase()
      },
      url: this.url + this.__pinPad__.constants.uris.merchant,
      cancelable: !0
    });
    if (!t.respuesta || t.respuesta === "0") {
      let e = "C55ACANCEL";
      const i = this.__pinPad__.constants.STX, r = this.__pinPad__.constants.ETX;
      e = i + this.#e(e) + e + r, e = e + this.#i(e);
      const s = this.parseStringToBytes(e, "");
      return await this.appendToQueue(s, "cancel"), !1;
    }
    return this.__pinPad__.operation.merchant = t, this.__pinPad__.operation.onlyMerchant = t.contado.af.length > 1 ? t.contado.af[0].merchant : t.contado.af.merchant, !0;
  }
  /**
   * @param {function|null} callback
   * @return {Promise<unknown>}
   */
  async #Q(t = null) {
    if (this.__pinPad__.waiting.statusAboutWaiting) throw new Error("AboutPP is already running");
    const e = this.__pinPad__.constants.STX, i = this.__pinPad__.constants.ETX;
    let r = "C56AABOUT";
    if (r = e + this.#e(r) + r + i, r = r + this.#i(r), z(this.__pinPad__.about.pp)) {
      this.__pinPad__.waiting.statusAboutWaiting = "pending";
      const a = this.parseStringToBytes(r, "");
      await this.appendToQueue(a, "about");
    } else
      return t ? t(this.__pinPad__.about.pp?.supportDUKPT || !1, this.__pinPad__.about.pp?.hasDUKPTKeys || !1) : !0;
    let s = 0;
    return new Promise((a, o) => {
      s = setInterval(() => {
        if (this.__pinPad__.waiting.statusAboutWaiting === "resolved") {
          if (clearInterval(s), this.__pinPad__.waiting.statusAboutWaiting = null, z(this.__pinPad__.about.pp))
            return;
          if (!t || typeof t != "function") {
            a(!0);
            return;
          }
          const c = t(
            this.__pinPad__.about.pp?.supportDUKPT || !1,
            this.__pinPad__.about.pp?.hasDUKPTKeys || !1
          );
          a(c);
        } else this.__pinPad__.waiting.statusAboutWaiting === "rejected" && (clearInterval(s), this.__pinPad__.waiting.statusAboutWaiting = null, o("Error"));
      }, 500);
    });
  }
  async #l(t, e) {
    if (t = t ? t.toString() : "", e = e ? e.toString() : "", z(t) || t === "0") {
      this.dispatch("pp:dukpt", { status: "unsupported", already: !1 });
      return;
    }
    if (z(e) || e === "1") {
      this.dispatch("pp:dukpt", { status: "charged", already: !0 });
      return;
    }
    const i = this.#P(), r = this.#v(), s = this.__pinPad__.constants.FS, a = this.__pinPad__.constants.ETX, o = this.__pinPad__.constants.STX;
    let c = "C91A" + i + s + "B" + r;
    c = o + this.#e(c) + c + a, c = c + this.#i(c);
    const h = this.parseStringToBytes(c, "");
    await this.appendToQueue(h, "init-dukpt");
    let u = 0;
    return this.__pinPad__.waiting.statusinitDUKPTWaiting = "pending", new Promise((f, _) => {
      u = setInterval(async () => {
        this.__pinPad__.waiting.statusinitDUKPTWaiting === "resolved" ? (clearInterval(u), this.__pinPad__.waiting.statusinitDUKPTWaiting = null, this.dispatch("pp:dukpt", { status: "charged", already: !1 }), await this.#Z(), f(!0)) : this.__pinPad__.waiting.statusinitDUKPTWaiting === "rejected" && (clearInterval(u), this.__pinPad__.waiting.statusinitDUKPTWaiting = null, _("Error"));
      }, 500);
    });
  }
  async #Z() {
    const t = {
      IPEK_REQUESTType: {
        business: {
          country: this.__pinPad__.config.country?.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch?.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany?.toUpperCase(),
          pwd: this.password?.toUpperCase(),
          user: this.username?.toUpperCase()
        },
        terminal: this.__pinPad__.config.terminal
      }
    }, e = await this.#E({
      data: t,
      url: this.url + this.__pinPad__.constants.uris.keysDUKPT
    });
    await this.#ht(e);
  }
  async #Y() {
    if (!await this.#_())
      throw new Error("RSA public key is empty");
    const e = this;
    await this.#Q(async function(r, s) {
      if (e.__pinPad__.about.supportInjection && e.__pinPad__.config.internal.emv && e.__pinPad__.about.injectedValues)
        return await e.#l(r, s), !0;
      let a = 0;
      return e.__pinPad__.waiting.statusInjectWaiting = "pending", await e.#$(), new Promise((o, c) => {
        a = setInterval(async () => {
          e.__pinPad__.waiting.statusInjectWaiting === "resolved" ? (clearInterval(a), e.__pinPad__.waiting.statusInjectWaiting = null, await e.#l(r, s), o(!0)) : e.__pinPad__.waiting.statusInjectWaiting === "rejected" && (clearInterval(a), e.__pinPad__.waiting.statusInjectWaiting = null, c("Error"));
        }, 500);
      });
    });
  }
  #w(t, e = 0) {
    if (t = parseFloat(t.toString().replace(/[^0-9.-]/g, "")), isNaN(t) || t === 0)
      return parseFloat("0").toFixed(e);
    t = t.toFixed(e);
    const i = t.split(".");
    return i[0] = i[0].replace(/\B(?=(\d{3})+(?!\d))/g, ""), i.join(".");
  }
  getClientVoucher() {
    return this.__pinPad__.operation.clientVoucher;
  }
  getCommerceVoucher() {
    return this.__pinPad__.operation.commerceVoucher;
  }
  async #tt() {
    this.__pinPad__.operation.errors = 0;
    let t = "ACERQUE, INSERTE CHIP O  DESLICE TARJETA";
    if (this.__pinPad__.about.supportContactless || (t = "INSERTE CHIP O  DESLICE TARJETA"), this.__pinPad__.about.model?.toUpperCase().includes("UX300") && (t = "ACERQUE O INSERTE TARJETA"), z(this.amount) || isNaN(parseFloat(this.amount)))
      throw new Error("Amount required");
    if (parseFloat(this.amount) <= 0)
      throw new Error("Amount must be greater than 0");
    if (this.#m(this.amount) === !1)
      throw new Error("Invalid amount required");
    if (parseFloat(this.#h(this.amount, 2)) <= 0)
      throw new Error("Amount must be greater than 0");
    const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.STX, r = this.__pinPad__.constants.ETX;
    let s = "C93A" + t;
    s = s + e + "B" + this.#P(), s = s + e + "C" + this.#v(), s = s + e + "D" + this.#h(this.amount, 2), s = s + e + "E0.00", s = s + e + "F" + this.__pinPad__.config.currencyCode, this.__pinPad__.about.supportDUKPT && this.__pinPad__.about.supportDUKPT !== "0" && this.__pinPad__.about.supportDUKPT !== "false" && (this.__pinPad__.about.supportContactless ? (s = s + e + "G" + this.timeoutPinPad, s = s + e + "HTAGS", s = s + e + "I" + this.__pinPad__.config.requireCVVAmex, s = s + e + "J" + this.__pinPad__.config.forceOnline, s = s + e + "K" + this.__pinPad__.about.supportContactless, s = s + e + "L" + this.__pinPad__.config.emvCard, this.__pinPad__.about.hasCashback && (s = s + e + "M0", s = s + e + "N00")) : (s = s + e + "G" + this.timeoutPinPad, s = s + e + "HTAGS", s = s + e + "I" + this.__pinPad__.config.requireCVVAmex, s = s + e + "L" + this.__pinPad__.config.emvCard), this.__pinPad__.about.supportInjection && (s = s + e + "O" + this.__pinPad__.config.validateQPS)), s = i + this.#e(s) + s + r, s = s + this.#i(s), this.#lt();
    const a = this.parseStringToBytes(s, "");
    await this.appendToQueue(a, "read-card");
    let o = 0;
    return this.__pinPad__.waiting.statusReadCardWaiting = "pending", new Promise((c, h) => {
      o = setInterval(() => {
        if (this.__pinPad__.waiting.statusReadCardWaiting === "resolved")
          clearInterval(o), this.__pinPad__.waiting.statusReadCardWaiting = null, c(!0);
        else if (this.__pinPad__.waiting.statusReadCardWaiting === "rejected") {
          clearInterval(o), this.__pinPad__.waiting.statusReadCardWaiting = null;
          const u = this.__pinPad__.operation.last_error;
          h(u ?? "Error reading card");
        }
      }, 500);
    });
  }
  async #et(t) {
    return await pe(t * 1e3);
  }
  /**
   * @param {null|string} reference
   * @return {Promise<any>}
   */
  async consult({ reference: t = null } = { reference: null }) {
    return t || (t = this.reference), z(t) && (t = "--", this.reference = t), this.#X(this.reference), this.__pinPad__.operation.consultDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB"), await this.#u({
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      Tx_Date: this.__pinPad__.operation.consultDate
    }), this.#r(this.url + this.__pinPad__.constants.uris.consult, {
      user: this.username?.toUpperCase(),
      pwd: this.password?.toUpperCase(),
      id_branch: this.__pinPad__.config.idBranch?.toUpperCase(),
      id_company: this.__pinPad__.config.idCompany?.toUpperCase(),
      date: this.__pinPad__.operation.consultDate,
      reference: this.reference
    });
  }
  async #it(t) {
    let e = this.url + this.__pinPad__.constants.uris.consult;
    return t > 1 && this.environment === "production" && (e = e.replace(
      this.__pinPad__.constants.urls.production,
      this.__pinPad__.constants.urls.productionAlternative
    )), this.__pinPad__.operation.consultDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB"), await this.#r(e, {
      user: this.username?.toUpperCase(),
      pwd: this.password?.toUpperCase(),
      id_branch: this.__pinPad__.config.idBranch?.toUpperCase(),
      id_company: this.__pinPad__.config.idCompany?.toUpperCase(),
      date: this.__pinPad__.operation.consultDate,
      reference: this.reference
    });
  }
  async #nt(t = "", e = {}) {
    let i = 1, r = null;
    do {
      i > 1 && this.environment === "production" && (t = t.replace(
        this.__pinPad__.constants.urls.production,
        this.__pinPad__.constants.urls.productionAlternative
      ), await this.#et(5)), await this.#c();
      const s = this.#a(32), a = this.#s(this.__pinPad__.config.publicKeyRSA || "", s), o = await this.#o(s, JSON.stringify(e));
      let c = !1;
      const h = await S.post(t, o, {
        headers: {
          "Content-Type": "application/json",
          data: a || ""
        }
      }).catch(async (u) => {
        let f = `Error in request, verify internet connection: ${u.status} ${u.message}`;
        u.response.status >= 500 && u.response.status <= 599 ? f = "Service Temporarily Unavailable" : u.response.status >= 400 && u.response.status <= 499 && (f = "Bad Request"), console.warn(u), r = f;
        const _ = await this.#it(i);
        _ && _ !== "{}" && !_.includes('"transacciones":""') && _.includes("nu_operaion") && (i = 5, r = "EE32"), c = !0;
      });
      if (!c) {
        if (!h || typeof h != "object" || !h.data) {
          r = "It was not possible to obtain the affiliations.";
          continue;
        }
        return h.data;
      }
    } while (i++ <= 3);
    return r ? Promise.reject(r) : Promise.reject("Communication error with CDP. IL/MTY");
  }
  #rt(t) {
    if (z(t)) throw new Error("Number of authorization invalid");
    if (/^[A-Za-z0-9]+$/g.test(t) !== !0) throw new Error("Number of authorization invalid");
    if (t.length !== 6) throw new Error("Number of authorization invalid");
    return !0;
  }
  /**
   * @param {number|string|null} folio
   * @return {Promise<any>}
   */
  async rePrint({ folio: t = null } = {}) {
    let e = "";
    t === null && (e = this.__pinPad__.operation.folio || ""), this.#y(e), await this.#u({
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      Tx_OperationNumber: e
    });
    const i = await this.#r(this.url + this.__pinPad__.constants.uris.rePrint, {
      REPRINTVOUCHER: {
        business: {
          country: this.__pinPad__.config.country?.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch?.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany?.toUpperCase(),
          pwd: this.password?.toUpperCase(),
          user: this.username?.toUpperCase()
        },
        no_operacion: t,
        crypto: "2"
      }
    });
    let r = i.voucher_comercio;
    return this.__pinPad__.operation.commerceVoucher = "", r && (i.voucher_comercio.includes(":") ? this.__pinPad__.operation.commerceVoucher = i.voucher_comercio : this.__pinPad__.operation.commerceVoucher = this.#n(
      this.__pinPad__.config.RC4Key,
      i.voucher_comercio
    )), r = i.voucher_cliente, this.__pinPad__.operation.clientVoucher = "", r && (i.voucher_cliente.includes(":") ? this.__pinPad__.operation.clientVoucher = i.voucher_cliente : this.__pinPad__.operation.clientVoucher = this.#n(
      this.__pinPad__.config.RC4Key,
      i.voucher_cliente
    )), i;
  }
  // jsonTokenization() {
  //   // build json "11"
  //   return {
  //     TOKENIZATION_TP: {
  //       business: {
  //         id_company: this.__pinPad__.config.idCompany,
  //         id_branch: this.__pinPad__.config.idBranch,
  //         user: this.username,
  //         pwd: this.password,
  //       },
  //       transacction_tkn: {
  //         version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion,
  //         serie: this.__pinPad__.about.serial,
  //         version_terminal: this.__pinPad__.about.appVersion,
  //         modelo_terminal: this.__pinPad__.about.model,
  //       },
  //       dukpt: {
  //         tp_dukpt: '1',
  //         nb_ksn: this.__pinPad__.config.read.NB_ksn,
  //         nb_data: this.__pinPad__.config.read.NB_Data,
  //       },
  //       tkn_reference: this.reference,
  //       geolocation: {
  //         latitude: this.__pinPad__.config.latitude,
  //         longitude: this.__pinPad__.config.longitude,
  //         ip: this.__pinPad__.config.publicIP,
  //       },
  //     },
  //   };
  // }
  #st(t) {
    this.__pinPad__.operation.responseMit._approved = t.response === "approved", this.__pinPad__.operation.responseMit._status = t.response, this.__pinPad__.operation.responseMit._originalToken = t.number_tkn ?? "", this.__pinPad__.operation.folio = t.foliocpagos, this.__pinPad__.operation.authorization = t.auth;
    let e = t.cd_response?.toUpperCase();
    return e.toUpperCase() === "0C" || this.__pinPad__.operation.responseMit._approved ? e = "00" : (e !== "Z3" && e !== "05" || t.cd_error === "92") && (e = "01"), this.__pinPad__.operation.responseMit._cdResponse = e, this.__pinPad__.finishCommand.A = e, this.__pinPad__.finishCommand.B = "", this.__pinPad__.finishCommand.C = "", this.__pinPad__.finishCommand.D = "", this.__pinPad__.finishCommand.E = t.emv_key_date ? t.emv_key_date : "", this.__pinPad__.finishCommand.F = t.icc_csn ? t.icc_csn : "", this.__pinPad__.finishCommand.G = t.icc_atc ? t.icc_atc : "", this.__pinPad__.finishCommand.H = t.icc_arpc ? t.icc_arpc : "", this.__pinPad__.finishCommand.I = t.icc_issuer_script ? t.icc_issuer_script : "", this.__pinPad__.finishCommand.J = t.authorized_amount ? t.authorized_amount : "", this.__pinPad__.finishCommand.K = t.account_balance_1 ? t.account_balance_1 : "", {
      reference: t.reference,
      response: t.response,
      foliocpagos: t.foliocpagos,
      auth: t.auth,
      cd_response: e,
      cd_error: t.cd_error,
      nb_error: this.#b(t.nb_error ?? ""),
      time: t.time,
      date: t.date,
      nb_company: t.nb_company,
      nb_merchant: t.nb_merchant,
      nb_street: t.nb_street,
      cc_type: t.cc_type,
      tp_operation: t.tp_operation,
      cc_name: t.cc_name,
      cc_number: t.cc_number,
      cc_expmonth: t.cc_expmonth,
      cc_expyear: t.cc_expyear,
      amount: t.amount,
      voucher_comercio: t.voucher_comercio,
      voucher_cliente: t.voucher_cliente,
      friendly_response: t.friendly_response,
      appid: t.appid,
      appidlabel: t.appidlabel,
      arqc: t.arqc
    };
  }
  async cancelPurchase({ amount: t = 0, authorization: e = "", folio: i = "" } = {}) {
    if (!this.#m(t)) throw new Error("Invalid amount");
    if (!this.#rt(e)) throw new Error("Invalid authorization");
    if (!this.#y(i)) throw new Error("Invalid folio");
    const r = this.#w(t, 2), s = {
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      UserTRX: "userPinpadWeb",
      Tx_OperationNumber: i,
      Tx_Auth: e,
      Amount: r
    };
    await this.#u(s);
    const a = await this.#r(this.url + this.__pinPad__.constants.uris.cancellation, {
      VMCAMEXMCANCELACION: {
        business: {
          country: this.__pinPad__.config.country?.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch?.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany?.toUpperCase(),
          pwd: this.password?.toUpperCase(),
          user: this.username?.toUpperCase()
        },
        transacction: {
          amount: t,
          auth: e.toUpperCase(),
          crypto: "2",
          no_operacion: i,
          usrtransacction: this.username?.toUpperCase(),
          version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion
        }
      }
    });
    return this.__pinPad__.operation.commerceVoucher = "", a.voucher_comercio && (a.voucher_comercio.includes(":") ? this.__pinPad__.operation.commerceVoucher = a.voucher_comercio : this.__pinPad__.operation.commerceVoucher = this.#n(
      this.__pinPad__.config.RC4Key,
      a.voucher_comercio
    )), this.__pinPad__.operation.clientVoucher = "", a.voucher_cliente && (a.voucher_cliente.includes(":") ? this.__pinPad__.operation.clientVoucher = a.voucher_cliente : this.__pinPad__.operation.clientVoucher = this.#n(
      this.__pinPad__.config.RC4Key,
      a.voucher_cliente
    )), JSON.stringify(a);
  }
  async #at() {
    this.__pinPad__.operation.errors = 0, this.__pinPad__.operation.ignore.counterSale = !1;
    const t = this.__pinPad__.operation.onlyMerchant;
    if (/^[0-9]+$/.test(t) === !1) throw new Error("Invalid merchant");
    this.__pinPad__.operation.typeOperation = "29";
    const e = {
      error: !1,
      message: null,
      approved: !1,
      object: {}
    };
    try {
      const i = await this.#w(this.amount, 2);
      await this.#u({
        Ambiente: this.environment,
        Country: this.__pinPad__.config.country,
        IdBranch: this.__pinPad__.config.idBranch,
        IdCompany: this.__pinPad__.config.idCompany,
        pwd: this.password,
        User: this.username,
        UserTRX: "userPinpadWeb",
        EMV: this.__pinPad__.config.read.EMV,
        ModeloTerminal: this.__pinPad__.about.model,
        SerieTerminal: this.__pinPad__.about.serial,
        Contactless: this.__pinPad__.about.supportContactless,
        Printer: this.__pinPad__.about.printer,
        VersionTerminal: this.__pinPad__.about.appVersion,
        TpOperation: this.__pinPad__.operation.typeOperation,
        Reference: this.reference,
        Amount: i,
        Currency: this.__pinPad__.config.currency,
        Merchant: t,
        Reverse: this.__pinPad__.config.otherLogin.executeReverse
      });
      let r = this.__pinPad__.about.supportContactless;
      typeof r == "string" && (r = r !== "0");
      const s = this.__pinPad__.about.supportContactless && r, a = await this.#nt(this.url + this.__pinPad__.constants.uris.sale, {
        VMCAMEXB: {
          business: {
            country: this.__pinPad__.config.country?.toUpperCase(),
            id_branch: this.__pinPad__.config.idBranch?.toUpperCase(),
            id_company: this.__pinPad__.config.idCompany?.toUpperCase(),
            pwd: this.password?.toUpperCase(),
            user: this.username?.toUpperCase()
          },
          dcc: {
            dcc_amount: "0",
            dcc_status: "0"
          },
          transacction: {
            amount: i,
            creditcard: {
              appid: this.__pinPad__.config.read.AppId,
              appidlabel: this.__pinPad__.config.read.AppIdLabel,
              arqc: this.__pinPad__.config.read.Arqc,
              chip: this.__pinPad__.config.read.Chip,
              chipname: this.__pinPad__.config.read.ChipName,
              chipnameenc: this.__pinPad__.config.read.ChipNameEnc,
              contactless: this.__pinPad__.config.read.ReadCTLS,
              crypto: "4",
              dukpt: {
                nb_data: this.__pinPad__.config.read.NB_Data,
                nb_ksn: this.__pinPad__.config.read.NB_ksn,
                tp_dukpt: "1"
              },
              pin: this.__pinPad__.config.read.PIN,
              posentrymode: this.__pinPad__.config.read.POSEM,
              tags: this.__pinPad__.config.read.Tags,
              type: this.__pinPad__.config.read.Type
            },
            currency: this.__pinPad__.config.currency.toUpperCase(),
            emv: this.__pinPad__.config.read.EMV,
            merchant: this.__pinPad__.operation.onlyMerchant,
            modelo_terminal: this.__pinPad__.about.model,
            reference: this.reference,
            serie: this.__pinPad__.about.serial,
            terminal: {
              display: "1",
              is_contactless: s,
              is_mobile: "0",
              printer: this.__pinPad__.about.printer
            },
            tp_operation: this.__pinPad__.operation.typeOperation,
            tp_resp: this.__pinPad__.operation.typeResponse,
            usrtransacction: this.username?.toUpperCase(),
            version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion,
            version_terminal: this.__pinPad__.about.appVersion
          },
          geolocation: {
            latitude: this.__pinPad__.config.latitude,
            longitude: this.__pinPad__.config.longitude,
            ip: this.__pinPad__.config.publicIP
          }
        }
      });
      a.response === "error" && (e.error = !0, e.message = a.nb_error || "Error in response");
      const o = this.#st(a);
      return e.object = o, await this.#ot(o), e.approved = this.__pinPad__.operation.responseMit._approved, this.__pinPad__.operation.finalResult = o, e;
    } catch (i) {
      throw this.__pinPad__.finishCommand.A = "01", this.__pinPad__.finishCommand.B = "", this.__pinPad__.finishCommand.C = "", this.__pinPad__.finishCommand.D = "", this.__pinPad__.finishCommand.E = "", this.__pinPad__.finishCommand.F = "", this.__pinPad__.finishCommand.G = "", this.__pinPad__.finishCommand.H = "", this.__pinPad__.finishCommand.I = "", this.__pinPad__.finishCommand.J = "", this.__pinPad__.finishCommand.K = "", await this.#ut(this.#T(i)), i;
    }
  }
  async #ot(t) {
    if (this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1")
      return this.dispatch("pp:finish-emv", t), !0;
    const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.STX, r = this.__pinPad__.constants.ETX;
    let s = "C93A" + this.__pinPad__.finishCommand.A;
    s = s + e + "B" + this.__pinPad__.finishCommand.B, s = s + e + "C" + this.__pinPad__.finishCommand.C, s = s + e + "D" + this.__pinPad__.finishCommand.D, s = s + e + "E" + this.__pinPad__.finishCommand.E, s = s + e + "F" + this.__pinPad__.finishCommand.F, s = s + e + "G" + this.__pinPad__.finishCommand.G, s = s + e + "H" + this.__pinPad__.finishCommand.H, s = s + e + "I" + this.__pinPad__.finishCommand.I, s = s + e + "J" + this.__pinPad__.finishCommand.J, s = s + e + "K" + this.__pinPad__.finishCommand.K, s = i + this.#e(s) + s + r, s = s + this.#i(s);
    const a = this.parseStringToBytes(s, "");
    this.__pinPad__.waiting.statusSecondGenerateWaiting = "pending", await this.appendToQueue(a, "second-generate");
    let o = 0;
    return new Promise((c, h) => {
      o = setInterval(async () => {
        if (this.__pinPad__.waiting.statusSecondGenerateWaiting === "resolved") {
          if (clearInterval(o), this.__pinPad__.waiting.statusSecondGenerateWaiting = null, this.__pinPad__.operation.applyReverse) {
            const u = await this.#r(this.url + this.__pinPad__.constants.uris.reverse, {
              VMCAMEXMREVERSO: {
                business: {
                  id_company: this.__pinPad__.config.idCompany?.toUpperCase(),
                  id_branch: this.__pinPad__.config.idBranch?.toUpperCase(),
                  country: this.__pinPad__.config.country?.toUpperCase(),
                  user: this.username?.toUpperCase(),
                  pwd: this.password?.toUpperCase()
                },
                transacction: {
                  amount: this.#h(this.amount, 2),
                  no_operacion: this.__pinPad__.operation.folio,
                  auth: this.__pinPad__.operation.authorization?.toUpperCase(),
                  tracks: "",
                  usrtransacction: this.username?.toUpperCase(),
                  crypto: "2",
                  version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion
                }
              }
            }), f = JSON.parse(u);
            let _;
            f.response === "approved" ? _ = { message: "Transaction rejected by PinPad." } : _ = { message: "No communication, please check your report." }, this.__pinPad__.operation.ignore.counterSale || (this.dispatch("pp:finish-emv", _), this.__pinPad__.operation.ignore.counterSale = !0);
          } else
            this.__pinPad__.operation.ignore.counterSale || (this.dispatch("pp:finish-emv", t), this.__pinPad__.operation.ignore.counterSale = !0);
          t.cd_error === "92" && await this.#ct(t, s), c(!0);
        } else this.__pinPad__.waiting.statusSecondGenerateWaiting === "rejected" && (clearInterval(o), this.__pinPad__.waiting.statusSecondGenerateWaiting = null, h("There is no response from the reader, check that it is connected."));
      }, 500);
    });
  }
  async #ct(t, e) {
    this.__pinPad__.operation.ignore.responseGlobal = t, this.__pinPad__.operation.ignore.C93Global = e, this.__pinPad__.operation.ignore.isError92TRX = !0, await this.#l(!0, !1);
  }
  async #S() {
    if (this.__pinPad__.operation.ignore.isError92TRX = !1, this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1")
      this.dispatch("pp:response", this.__pinPad__.operation.ignore.responseGlobal);
    else {
      const t = this.parseStringToBytes(this.__pinPad__.operation.ignore.C93Global, "");
      await this.appendToQueue(t, "code93"), await pe(1400), this.dispatch("pp:response", this.__pinPad__.operation.ignore.responseGlobal);
    }
  }
  #T(t) {
    const e = {
      PPE02: "Importe Incorrecto.",
      A02: "Importe Incorrecto.",
      PPE03: "No hay respuesta del lector, verifique que se encuentra conectado.",
      A03: "No hay respuesta del lector, verifique que se encuentra conectado.",
      PP18: "Sin comunicación, por favor verifique su reporte.",
      PP24: "Transacción declinada por la PinPad.",
      A01: "Tarjeta Ilegible.",
      A04: "No hay planes de pago para esta tarjeta, por favor cambie la tarjeta.",
      A10: "Operación cancelada por el usuario.",
      A11: "Proceso cancelado por timeout.",
      A12: "Lectura errónea de banda/chip.",
      A13: "Carga de llave fallida.",
      A14: "Error de lectura de PIN.",
      A15: "Tarjeta Vencida.",
      A16: "Problemas al leer el chip.",
      A17: "Impresora sin Papel.",
      E17: "Impresora sin Papel.",
      A21: "Información no almacenada correctamente.",
      A22: "Tarjeta bloqueada.",
      A23: "Sin llave de cifrado DUKPT.",
      A28: "Fallback no soportado.",
      EE19: "Error de conexión, verifique su reporte.",
      EE21: "Ha ocurrido un error al procesar su solicitud.",
      EE22: "Ha ocurrido un error de conexión al servidor.",
      EE23: "El número de operación no puede ir vacío.",
      EE24: "El número de operación debe ser de 9 dígitos.",
      EE25: "El número de operación debe ser numérico.",
      EE26: "La información enviada al servicio está incompleta.",
      EE27: "La referencia contiene caracteres inválidos o está vacía.",
      EE28: "Número de autorización inválido.",
      EE29: "Importe inválido.",
      EE30: "La información enviada al servicio no es válida.",
      EE31: "No fue posible obtener las afiliaciones.",
      EE32: "Error de conexión, existe una o más transacciones en el servidor , Favor de validar su reporte y en su caso reimprimir el voucher.",
      EE33: "Error de comunicacion con CDP. IL/MTY",
      EE20: "La Referencia contiene caracteres inválidos",
      EE99: "Error código 99."
    }, i = e[t] ? {
      error: t,
      message: e[t]
    } : { error: t, message: "Error desconocido" };
    return this.dispatch("pp:error", i), i;
  }
  async #ut(t) {
    const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.STX, r = this.__pinPad__.constants.ETX;
    let s = "C93A" + this.__pinPad__.finishCommand.A;
    if (s = s + e + "B" + this.__pinPad__.finishCommand.B, s = s + e + "C" + this.__pinPad__.finishCommand.C, s = s + e + "D" + this.__pinPad__.finishCommand.D, s = s + e + "E" + this.__pinPad__.finishCommand.E, s = s + e + "F" + this.__pinPad__.finishCommand.F, s = s + e + "G" + this.__pinPad__.finishCommand.G, s = s + e + "H" + this.__pinPad__.finishCommand.H, s = s + e + "I" + this.__pinPad__.finishCommand.I, s = s + e + "J" + this.__pinPad__.finishCommand.J, s = s + e + "K" + this.__pinPad__.finishCommand.K, s = i + this.#e(s) + s + r, s = s + this.#i(s), this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1") {
      this.dispatch("pp:finish-emv", t);
      return;
    }
    const a = this.parseStringToBytes(s, "");
    await this.appendToQueue(a, "finish-emv-end");
  }
  async #ht(t) {
    if (t.cd_estatus = t.cd_estatus ? t.cd_estatus : "0", t.cd_estatus !== "1") {
      this.__pinPad__.operation.ignore.isError92TRX && await this.#S();
      return;
    }
    const e = this.__pinPad__.constants.FS, i = this.__pinPad__.constants.ETX, r = this.__pinPad__.constants.STX, s = t.nb_ksn, a = t.nb_kcv || "", o = t.nb_ipek || "";
    let c = "C92A" + s + e + "B" + a + e + "C" + o;
    c = r + this.#e(c) + c + i, c = c + this.#i(c);
    const h = this.parseStringToBytes(c, "");
    await this.appendToQueue(h, "dukpt");
    let u = 0;
    return this.__pinPad__.waiting.statuswritingDUKPTWaiting = "pending", new Promise((f, _) => {
      u = setInterval(async () => {
        this.__pinPad__.waiting.statuswritingDUKPTWaiting === "resolved" ? (clearInterval(u), this.__pinPad__.waiting.statuswritingDUKPTWaiting = null, this.__pinPad__.operation.ignore.isError92TRX && await this.#S(), f(!0)) : this.__pinPad__.waiting.statuswritingDUKPTWaiting === "rejected" && (clearInterval(u), this.__pinPad__.waiting.statuswritingDUKPTWaiting = null, _("Error writing DUKPT keys"));
      }, 500);
    });
  }
  #lt() {
    this.__pinPad__.config.read.AppId = "", this.__pinPad__.config.read.AppIdLabel = "", this.__pinPad__.config.read.Arqc = "", this.__pinPad__.config.read.ChipName = "", this.__pinPad__.config.read.ReadCTLS = "", this.__pinPad__.config.read.NB_Data = "", this.__pinPad__.config.read.NB_ksn = "", this.__pinPad__.config.read.PIN = "", this.__pinPad__.config.read.POSEM = "", this.__pinPad__.config.read.Tags = "", this.__pinPad__.config.read.Type = "", this.__pinPad__.config.read.Chip = "", this.__pinPad__.config.read.ChipNameEnc = "", this.__pinPad__.operation.ignore.error = "", this.__pinPad__.operation.ignore.C93Global = "", this.__pinPad__.operation.folio = "", this.__pinPad__.operation.authorization = "", this.__pinPad__.config.tokenizeTRX = !1;
  }
  // ========================================================================================
  // Needed for WS v4
  // ========================================================================================
  /**
   * @param {number} amount
   * @param {null|string} reference
   * @returns {Promise<{error: boolean, message: null, approved: boolean, object: {}}>}
   */
  async makeSale({ amount: t = 0, reference: e = null } = {}) {
    if (t = parseFloat(t.toString()), isNaN(t) || t <= 0)
      throw new Error("Amount is required and must be greater than 0");
    if (this.amount = t, !e || z(e) || !this.#g(e))
      throw new Error("Reference is required and must be alphanumeric");
    if (this.reference = e, /^[A-Z-a-z\s]+$/g.test(this.__pinPad__.config.currency) === !1)
      throw new Error("Invalid currency");
    const i = {
      error: !1,
      message: null,
      approved: !1,
      object: {}
    };
    try {
      return await this.login(), await this.#Y(), !await this.#tt() || !await this.#J() ? i : await this.#at();
    } catch (r) {
      console.warn(r), i.error = !0, i.message = r.message, i.approved = !1, i.object = r;
    }
    return i;
  }
}
export {
  $r as PinPad
};
