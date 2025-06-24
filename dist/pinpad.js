var yn = Object.defineProperty;
var Te = (n) => {
  throw TypeError(n);
};
var bn = (n, i, t) => i in n ? yn(n, i, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[i] = t;
var Ce = (n, i, t) => bn(n, typeof i != "symbol" ? i + "" : i, t), Pn = (n, i, t) => i.has(n) || Te("Cannot " + t);
var Ae = (n, i, t) => i.has(n) ? Te("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(n) : i.set(n, t);
var p = (n, i, t) => (Pn(n, i, "access private method"), t);
import { K as vn, a as wn, h as Re, i as G, b as Oe, w as xe } from "./kernel-C4PiwwCb.js";
var En = "0123456789abcdefghijklmnopqrstuvwxyz";
function $(n) {
  return En.charAt(n);
}
function Sn(n, i) {
  return n & i;
}
function Et(n, i) {
  return n | i;
}
function De(n, i) {
  return n ^ i;
}
function Ie(n, i) {
  return n & ~i;
}
function Tn(n) {
  if (n == 0)
    return -1;
  var i = 0;
  return (n & 65535) == 0 && (n >>= 16, i += 16), (n & 255) == 0 && (n >>= 8, i += 8), (n & 15) == 0 && (n >>= 4, i += 4), (n & 3) == 0 && (n >>= 2, i += 2), (n & 1) == 0 && ++i, i;
}
function Cn(n) {
  for (var i = 0; n != 0; )
    n &= n - 1, ++i;
  return i;
}
var at = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ti = "=";
function Vt(n) {
  var i, t, e = "";
  for (i = 0; i + 3 <= n.length; i += 3)
    t = parseInt(n.substring(i, i + 3), 16), e += at.charAt(t >> 6) + at.charAt(t & 63);
  for (i + 1 == n.length ? (t = parseInt(n.substring(i, i + 1), 16), e += at.charAt(t << 2)) : i + 2 == n.length && (t = parseInt(n.substring(i, i + 2), 16), e += at.charAt(t >> 2) + at.charAt((t & 3) << 4)); (e.length & 3) > 0; )
    e += ti;
  return e;
}
function Be(n) {
  var i = "", t, e = 0, r = 0;
  for (t = 0; t < n.length && n.charAt(t) != ti; ++t) {
    var s = at.indexOf(n.charAt(t));
    s < 0 || (e == 0 ? (i += $(s >> 2), r = s & 3, e = 1) : e == 1 ? (i += $(r << 2 | s >> 4), r = s & 15, e = 2) : e == 2 ? (i += $(r), i += $(s >> 2), r = s & 3, e = 3) : (i += $(r << 2 | s >> 4), i += $(s & 15), e = 0));
  }
  return e == 1 && (i += $(r << 2)), i;
}
var rt, An = {
  decode: function(n) {
    var i;
    if (rt === void 0) {
      var t = "0123456789ABCDEF", e = ` \f
\r	 \u2028\u2029`;
      for (rt = {}, i = 0; i < 16; ++i)
        rt[t.charAt(i)] = i;
      for (t = t.toLowerCase(), i = 10; i < 16; ++i)
        rt[t.charAt(i)] = i;
      for (i = 0; i < e.length; ++i)
        rt[e.charAt(i)] = -1;
    }
    var r = [], s = 0, a = 0;
    for (i = 0; i < n.length; ++i) {
      var o = n.charAt(i);
      if (o == "=")
        break;
      if (o = rt[o], o != -1) {
        if (o === void 0)
          throw new Error("Illegal character at offset " + i);
        s |= o, ++a >= 2 ? (r[r.length] = s, s = 0, a = 0) : s <<= 4;
      }
    }
    if (a)
      throw new Error("Hex encoding incomplete: 4 bits missing");
    return r;
  }
}, Y, Yt = {
  decode: function(n) {
    var i;
    if (Y === void 0) {
      var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = `= \f
\r	 \u2028\u2029`;
      for (Y = /* @__PURE__ */ Object.create(null), i = 0; i < 64; ++i)
        Y[t.charAt(i)] = i;
      for (Y["-"] = 62, Y._ = 63, i = 0; i < e.length; ++i)
        Y[e.charAt(i)] = -1;
    }
    var r = [], s = 0, a = 0;
    for (i = 0; i < n.length; ++i) {
      var o = n.charAt(i);
      if (o == "=")
        break;
      if (o = Y[o], o != -1) {
        if (o === void 0)
          throw new Error("Illegal character at offset " + i);
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
    var i = Yt.re.exec(n);
    if (i)
      if (i[1])
        n = i[1];
      else if (i[2])
        n = i[2];
      else
        throw new Error("RegExp out of sync");
    return Yt.decode(n);
  }
}, st = 1e13, pt = (
  /** @class */
  function() {
    function n(i) {
      this.buf = [+i || 0];
    }
    return n.prototype.mulAdd = function(i, t) {
      var e = this.buf, r = e.length, s, a;
      for (s = 0; s < r; ++s)
        a = e[s] * i + t, a < st ? t = 0 : (t = 0 | a / st, a -= t * st), e[s] = a;
      t > 0 && (e[s] = t);
    }, n.prototype.sub = function(i) {
      var t = this.buf, e = t.length, r, s;
      for (r = 0; r < e; ++r)
        s = t[r] - i, s < 0 ? (s += st, i = 1) : i = 0, t[r] = s;
      for (; t[t.length - 1] === 0; )
        t.pop();
    }, n.prototype.toString = function(i) {
      if ((i || 10) != 10)
        throw new Error("only base 10 is supported");
      for (var t = this.buf, e = t[t.length - 1].toString(), r = t.length - 2; r >= 0; --r)
        e += (st + t[r]).toString().substring(1);
      return e;
    }, n.prototype.valueOf = function() {
      for (var i = this.buf, t = 0, e = i.length - 1; e >= 0; --e)
        t = t * st + i[e];
      return t;
    }, n.prototype.simplify = function() {
      var i = this.buf;
      return i.length == 1 ? i[0] : this;
    }, n;
  }()
), ei = "…", Rn = /^(\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/, On = /^(\d\d\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;
function ct(n, i) {
  return n.length > i && (n = n.substring(0, i) + ei), n;
}
var zt = (
  /** @class */
  function() {
    function n(i, t) {
      this.hexDigits = "0123456789ABCDEF", i instanceof n ? (this.enc = i.enc, this.pos = i.pos) : (this.enc = i, this.pos = t);
    }
    return n.prototype.get = function(i) {
      if (i === void 0 && (i = this.pos++), i >= this.enc.length)
        throw new Error("Requesting byte offset ".concat(i, " on a stream of length ").concat(this.enc.length));
      return typeof this.enc == "string" ? this.enc.charCodeAt(i) : this.enc[i];
    }, n.prototype.hexByte = function(i) {
      return this.hexDigits.charAt(i >> 4 & 15) + this.hexDigits.charAt(i & 15);
    }, n.prototype.hexDump = function(i, t, e) {
      for (var r = "", s = i; s < t; ++s)
        if (r += this.hexByte(this.get(s)), e !== !0)
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
    }, n.prototype.isASCII = function(i, t) {
      for (var e = i; e < t; ++e) {
        var r = this.get(e);
        if (r < 32 || r > 176)
          return !1;
      }
      return !0;
    }, n.prototype.parseStringISO = function(i, t) {
      for (var e = "", r = i; r < t; ++r)
        e += String.fromCharCode(this.get(r));
      return e;
    }, n.prototype.parseStringUTF = function(i, t) {
      for (var e = "", r = i; r < t; ) {
        var s = this.get(r++);
        s < 128 ? e += String.fromCharCode(s) : s > 191 && s < 224 ? e += String.fromCharCode((s & 31) << 6 | this.get(r++) & 63) : e += String.fromCharCode((s & 15) << 12 | (this.get(r++) & 63) << 6 | this.get(r++) & 63);
      }
      return e;
    }, n.prototype.parseStringBMP = function(i, t) {
      for (var e = "", r, s, a = i; a < t; )
        r = this.get(a++), s = this.get(a++), e += String.fromCharCode(r << 8 | s);
      return e;
    }, n.prototype.parseTime = function(i, t, e) {
      var r = this.parseStringISO(i, t), s = (e ? Rn : On).exec(r);
      return s ? (e && (s[1] = +s[1], s[1] += +s[1] < 70 ? 2e3 : 1900), r = s[1] + "-" + s[2] + "-" + s[3] + " " + s[4], s[5] && (r += ":" + s[5], s[6] && (r += ":" + s[6], s[7] && (r += "." + s[7]))), s[8] && (r += " UTC", s[8] != "Z" && (r += s[8], s[9] && (r += ":" + s[9]))), r) : "Unrecognized time: " + r;
    }, n.prototype.parseInteger = function(i, t) {
      for (var e = this.get(i), r = e > 127, s = r ? 255 : 0, a, o = ""; e == s && ++i < t; )
        e = this.get(i);
      if (a = t - i, a === 0)
        return r ? -1 : 0;
      if (a > 4) {
        for (o = e, a <<= 3; ((+o ^ s) & 128) == 0; )
          o = +o << 1, --a;
        o = "(" + a + ` bit)
`;
      }
      r && (e = e - 256);
      for (var c = new pt(e), u = i + 1; u < t; ++u)
        c.mulAdd(256, this.get(u));
      return o + c.toString();
    }, n.prototype.parseBitString = function(i, t, e) {
      for (var r = this.get(i), s = (t - i - 1 << 3) - r, a = "(" + s + ` bit)
`, o = "", c = i + 1; c < t; ++c) {
        for (var u = this.get(c), l = c == t - 1 ? r : 0, f = 7; f >= l; --f)
          o += u >> f & 1 ? "1" : "0";
        if (o.length > e)
          return a + ct(o, e);
      }
      return a + o;
    }, n.prototype.parseOctetString = function(i, t, e) {
      if (this.isASCII(i, t))
        return ct(this.parseStringISO(i, t), e);
      var r = t - i, s = "(" + r + ` byte)
`;
      e /= 2, r > e && (t = i + e);
      for (var a = i; a < t; ++a)
        s += this.hexByte(this.get(a));
      return r > e && (s += ei), s;
    }, n.prototype.parseOID = function(i, t, e) {
      for (var r = "", s = new pt(), a = 0, o = i; o < t; ++o) {
        var c = this.get(o);
        if (s.mulAdd(128, c & 127), a += 7, !(c & 128)) {
          if (r === "")
            if (s = s.simplify(), s instanceof pt)
              s.sub(80), r = "2." + s.toString();
            else {
              var u = s < 80 ? s < 40 ? 0 : 1 : 2;
              r = u + "." + (s - u * 40);
            }
          else
            r += "." + s.toString();
          if (r.length > e)
            return ct(r, e);
          s = new pt(), a = 0;
        }
      }
      return a > 0 && (r += ".incomplete"), r;
    }, n;
  }()
), xn = (
  /** @class */
  function() {
    function n(i, t, e, r, s) {
      if (!(r instanceof Ne))
        throw new Error("Invalid tag value.");
      this.stream = i, this.header = t, this.length = e, this.tag = r, this.sub = s;
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
    }, n.prototype.content = function(i) {
      if (this.tag === void 0)
        return null;
      i === void 0 && (i = 1 / 0);
      var t = this.posContent(), e = Math.abs(this.length);
      if (!this.tag.isUniversal())
        return this.sub !== null ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + e, i);
      switch (this.tag.tagNumber) {
        case 1:
          return this.stream.get(t) === 0 ? "false" : "true";
        case 2:
          return this.stream.parseInteger(t, t + e);
        case 3:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(t, t + e, i);
        case 4:
          return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(t, t + e, i);
        // case 0x05: // NULL
        case 6:
          return this.stream.parseOID(t, t + e, i);
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
          return ct(this.stream.parseStringUTF(t, t + e), i);
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
          return ct(this.stream.parseStringISO(t, t + e), i);
        case 30:
          return ct(this.stream.parseStringBMP(t, t + e), i);
        case 23:
        // UTCTime
        case 24:
          return this.stream.parseTime(t, t + e, this.tag.tagNumber == 23);
      }
      return null;
    }, n.prototype.toString = function() {
      return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (this.sub === null ? "null" : this.sub.length) + "]";
    }, n.prototype.toPrettyString = function(i) {
      i === void 0 && (i = "");
      var t = i + this.typeName() + " @" + this.stream.pos;
      if (this.length >= 0 && (t += "+"), t += this.length, this.tag.tagConstructed ? t += " (constructed)" : this.tag.isUniversal() && (this.tag.tagNumber == 3 || this.tag.tagNumber == 4) && this.sub !== null && (t += " (encapsulates)"), t += `
`, this.sub !== null) {
        i += "  ";
        for (var e = 0, r = this.sub.length; e < r; ++e)
          t += this.sub[e].toPrettyString(i);
      }
      return t;
    }, n.prototype.posStart = function() {
      return this.stream.pos;
    }, n.prototype.posContent = function() {
      return this.stream.pos + this.header;
    }, n.prototype.posEnd = function() {
      return this.stream.pos + this.header + Math.abs(this.length);
    }, n.prototype.toHexString = function() {
      return this.stream.hexDump(this.posStart(), this.posEnd(), !0);
    }, n.decodeLength = function(i) {
      var t = i.get(), e = t & 127;
      if (e == t)
        return e;
      if (e > 6)
        throw new Error("Length over 48 bits not supported at position " + (i.pos - 1));
      if (e === 0)
        return null;
      t = 0;
      for (var r = 0; r < e; ++r)
        t = t * 256 + i.get();
      return t;
    }, n.prototype.getHexStringValue = function() {
      var i = this.toHexString(), t = this.header * 2, e = this.length * 2;
      return i.substr(t, e);
    }, n.decode = function(i) {
      var t;
      i instanceof zt ? t = i : t = new zt(i, 0);
      var e = new zt(t), r = new Ne(t), s = n.decodeLength(t), a = t.pos, o = a - e.pos, c = null, u = function() {
        var f = [];
        if (s !== null) {
          for (var g = a + s; t.pos < g; )
            f[f.length] = n.decode(t);
          if (t.pos != g)
            throw new Error("Content size is not correct for container starting at offset " + a);
        } else
          try {
            for (; ; ) {
              var P = n.decode(t);
              if (P.tag.isEOC())
                break;
              f[f.length] = P;
            }
            s = a - t.pos;
          } catch (m) {
            throw new Error("Exception while decoding undefined length content: " + m);
          }
        return f;
      };
      if (r.tagConstructed)
        c = u();
      else if (r.isUniversal() && (r.tagNumber == 3 || r.tagNumber == 4))
        try {
          if (r.tagNumber == 3 && t.get() != 0)
            throw new Error("BIT STRINGs with unused bits cannot encapsulate.");
          c = u();
          for (var l = 0; l < c.length; ++l)
            if (c[l].tag.isEOC())
              throw new Error("EOC is not supposed to be actual content.");
        } catch {
          c = null;
        }
      if (c === null) {
        if (s === null)
          throw new Error("We can't skip over an invalid tag with undefined length at offset " + a);
        t.pos = a + Math.abs(s);
      }
      return new n(e, o, s, r, c);
    }, n;
  }()
), Ne = (
  /** @class */
  function() {
    function n(i) {
      var t = i.get();
      if (this.tagClass = t >> 6, this.tagConstructed = (t & 32) !== 0, this.tagNumber = t & 31, this.tagNumber == 31) {
        var e = new pt();
        do
          t = i.get(), e.mulAdd(128, t & 127);
        while (t & 128);
        this.tagNumber = e.simplify();
      }
    }
    return n.prototype.isUniversal = function() {
      return this.tagClass === 0;
    }, n.prototype.isEOC = function() {
      return this.tagClass === 0 && this.tagNumber === 0;
    }, n;
  }()
), Z, Dn = 244837814094590, Ve = (Dn & 16777215) == 15715070, N = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997], In = (1 << 26) / N[N.length - 1], E = (
  /** @class */
  function() {
    function n(i, t, e) {
      i != null && (typeof i == "number" ? this.fromNumber(i, t, e) : t == null && typeof i != "string" ? this.fromString(i, 256) : this.fromString(i, t));
    }
    return n.prototype.toString = function(i) {
      if (this.s < 0)
        return "-" + this.negate().toString(i);
      var t;
      if (i == 16)
        t = 4;
      else if (i == 8)
        t = 3;
      else if (i == 2)
        t = 1;
      else if (i == 32)
        t = 5;
      else if (i == 4)
        t = 2;
      else
        return this.toRadix(i);
      var e = (1 << t) - 1, r, s = !1, a = "", o = this.t, c = this.DB - o * this.DB % t;
      if (o-- > 0)
        for (c < this.DB && (r = this[o] >> c) > 0 && (s = !0, a = $(r)); o >= 0; )
          c < t ? (r = (this[o] & (1 << c) - 1) << t - c, r |= this[--o] >> (c += this.DB - t)) : (r = this[o] >> (c -= t) & e, c <= 0 && (c += this.DB, --o)), r > 0 && (s = !0), s && (a += $(r));
      return s ? a : "0";
    }, n.prototype.negate = function() {
      var i = S();
      return n.ZERO.subTo(this, i), i;
    }, n.prototype.abs = function() {
      return this.s < 0 ? this.negate() : this;
    }, n.prototype.compareTo = function(i) {
      var t = this.s - i.s;
      if (t != 0)
        return t;
      var e = this.t;
      if (t = e - i.t, t != 0)
        return this.s < 0 ? -t : t;
      for (; --e >= 0; )
        if ((t = this[e] - i[e]) != 0)
          return t;
      return 0;
    }, n.prototype.bitLength = function() {
      return this.t <= 0 ? 0 : this.DB * (this.t - 1) + St(this[this.t - 1] ^ this.s & this.DM);
    }, n.prototype.mod = function(i) {
      var t = S();
      return this.abs().divRemTo(i, null, t), this.s < 0 && t.compareTo(n.ZERO) > 0 && i.subTo(t, t), t;
    }, n.prototype.modPowInt = function(i, t) {
      var e;
      return i < 256 || t.isEven() ? e = new Ue(t) : e = new Le(t), this.exp(i, e);
    }, n.prototype.clone = function() {
      var i = S();
      return this.copyTo(i), i;
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
      var i = this.t, t = [];
      t[0] = this.s;
      var e = this.DB - i * this.DB % 8, r, s = 0;
      if (i-- > 0)
        for (e < this.DB && (r = this[i] >> e) != (this.s & this.DM) >> e && (t[s++] = r | this.s << this.DB - e); i >= 0; )
          e < 8 ? (r = (this[i] & (1 << e) - 1) << 8 - e, r |= this[--i] >> (e += this.DB - 8)) : (r = this[i] >> (e -= 8) & 255, e <= 0 && (e += this.DB, --i)), (r & 128) != 0 && (r |= -256), s == 0 && (this.s & 128) != (r & 128) && ++s, (s > 0 || r != this.s) && (t[s++] = r);
      return t;
    }, n.prototype.equals = function(i) {
      return this.compareTo(i) == 0;
    }, n.prototype.min = function(i) {
      return this.compareTo(i) < 0 ? this : i;
    }, n.prototype.max = function(i) {
      return this.compareTo(i) > 0 ? this : i;
    }, n.prototype.and = function(i) {
      var t = S();
      return this.bitwiseTo(i, Sn, t), t;
    }, n.prototype.or = function(i) {
      var t = S();
      return this.bitwiseTo(i, Et, t), t;
    }, n.prototype.xor = function(i) {
      var t = S();
      return this.bitwiseTo(i, De, t), t;
    }, n.prototype.andNot = function(i) {
      var t = S();
      return this.bitwiseTo(i, Ie, t), t;
    }, n.prototype.not = function() {
      for (var i = S(), t = 0; t < this.t; ++t)
        i[t] = this.DM & ~this[t];
      return i.t = this.t, i.s = ~this.s, i;
    }, n.prototype.shiftLeft = function(i) {
      var t = S();
      return i < 0 ? this.rShiftTo(-i, t) : this.lShiftTo(i, t), t;
    }, n.prototype.shiftRight = function(i) {
      var t = S();
      return i < 0 ? this.lShiftTo(-i, t) : this.rShiftTo(i, t), t;
    }, n.prototype.getLowestSetBit = function() {
      for (var i = 0; i < this.t; ++i)
        if (this[i] != 0)
          return i * this.DB + Tn(this[i]);
      return this.s < 0 ? this.t * this.DB : -1;
    }, n.prototype.bitCount = function() {
      for (var i = 0, t = this.s & this.DM, e = 0; e < this.t; ++e)
        i += Cn(this[e] ^ t);
      return i;
    }, n.prototype.testBit = function(i) {
      var t = Math.floor(i / this.DB);
      return t >= this.t ? this.s != 0 : (this[t] & 1 << i % this.DB) != 0;
    }, n.prototype.setBit = function(i) {
      return this.changeBit(i, Et);
    }, n.prototype.clearBit = function(i) {
      return this.changeBit(i, Ie);
    }, n.prototype.flipBit = function(i) {
      return this.changeBit(i, De);
    }, n.prototype.add = function(i) {
      var t = S();
      return this.addTo(i, t), t;
    }, n.prototype.subtract = function(i) {
      var t = S();
      return this.subTo(i, t), t;
    }, n.prototype.multiply = function(i) {
      var t = S();
      return this.multiplyTo(i, t), t;
    }, n.prototype.divide = function(i) {
      var t = S();
      return this.divRemTo(i, t, null), t;
    }, n.prototype.remainder = function(i) {
      var t = S();
      return this.divRemTo(i, null, t), t;
    }, n.prototype.divideAndRemainder = function(i) {
      var t = S(), e = S();
      return this.divRemTo(i, t, e), [t, e];
    }, n.prototype.modPow = function(i, t) {
      var e = i.bitLength(), r, s = J(1), a;
      if (e <= 0)
        return s;
      e < 18 ? r = 1 : e < 48 ? r = 3 : e < 144 ? r = 4 : e < 768 ? r = 5 : r = 6, e < 8 ? a = new Ue(t) : t.isEven() ? a = new Nn(t) : a = new Le(t);
      var o = [], c = 3, u = r - 1, l = (1 << r) - 1;
      if (o[1] = a.convert(this), r > 1) {
        var f = S();
        for (a.sqrTo(o[1], f); c <= l; )
          o[c] = S(), a.mulTo(f, o[c - 2], o[c]), c += 2;
      }
      var g = i.t - 1, P, m = !0, b = S(), y;
      for (e = St(i[g]) - 1; g >= 0; ) {
        for (e >= u ? P = i[g] >> e - u & l : (P = (i[g] & (1 << e + 1) - 1) << u - e, g > 0 && (P |= i[g - 1] >> this.DB + e - u)), c = r; (P & 1) == 0; )
          P >>= 1, --c;
        if ((e -= c) < 0 && (e += this.DB, --g), m)
          o[P].copyTo(s), m = !1;
        else {
          for (; c > 1; )
            a.sqrTo(s, b), a.sqrTo(b, s), c -= 2;
          c > 0 ? a.sqrTo(s, b) : (y = s, s = b, b = y), a.mulTo(b, o[P], s);
        }
        for (; g >= 0 && (i[g] & 1 << e) == 0; )
          a.sqrTo(s, b), y = s, s = b, b = y, --e < 0 && (e = this.DB - 1, --g);
      }
      return a.revert(s);
    }, n.prototype.modInverse = function(i) {
      var t = i.isEven();
      if (this.isEven() && t || i.signum() == 0)
        return n.ZERO;
      for (var e = i.clone(), r = this.clone(), s = J(1), a = J(0), o = J(0), c = J(1); e.signum() != 0; ) {
        for (; e.isEven(); )
          e.rShiftTo(1, e), t ? ((!s.isEven() || !a.isEven()) && (s.addTo(this, s), a.subTo(i, a)), s.rShiftTo(1, s)) : a.isEven() || a.subTo(i, a), a.rShiftTo(1, a);
        for (; r.isEven(); )
          r.rShiftTo(1, r), t ? ((!o.isEven() || !c.isEven()) && (o.addTo(this, o), c.subTo(i, c)), o.rShiftTo(1, o)) : c.isEven() || c.subTo(i, c), c.rShiftTo(1, c);
        e.compareTo(r) >= 0 ? (e.subTo(r, e), t && s.subTo(o, s), a.subTo(c, a)) : (r.subTo(e, r), t && o.subTo(s, o), c.subTo(a, c));
      }
      if (r.compareTo(n.ONE) != 0)
        return n.ZERO;
      if (c.compareTo(i) >= 0)
        return c.subtract(i);
      if (c.signum() < 0)
        c.addTo(i, c);
      else
        return c;
      return c.signum() < 0 ? c.add(i) : c;
    }, n.prototype.pow = function(i) {
      return this.exp(i, new Bn());
    }, n.prototype.gcd = function(i) {
      var t = this.s < 0 ? this.negate() : this.clone(), e = i.s < 0 ? i.negate() : i.clone();
      if (t.compareTo(e) < 0) {
        var r = t;
        t = e, e = r;
      }
      var s = t.getLowestSetBit(), a = e.getLowestSetBit();
      if (a < 0)
        return t;
      for (s < a && (a = s), a > 0 && (t.rShiftTo(a, t), e.rShiftTo(a, e)); t.signum() > 0; )
        (s = t.getLowestSetBit()) > 0 && t.rShiftTo(s, t), (s = e.getLowestSetBit()) > 0 && e.rShiftTo(s, e), t.compareTo(e) >= 0 ? (t.subTo(e, t), t.rShiftTo(1, t)) : (e.subTo(t, e), e.rShiftTo(1, e));
      return a > 0 && e.lShiftTo(a, e), e;
    }, n.prototype.isProbablePrime = function(i) {
      var t, e = this.abs();
      if (e.t == 1 && e[0] <= N[N.length - 1]) {
        for (t = 0; t < N.length; ++t)
          if (e[0] == N[t])
            return !0;
        return !1;
      }
      if (e.isEven())
        return !1;
      for (t = 1; t < N.length; ) {
        for (var r = N[t], s = t + 1; s < N.length && r < In; )
          r *= N[s++];
        for (r = e.modInt(r); t < s; )
          if (r % N[t++] == 0)
            return !1;
      }
      return e.millerRabin(i);
    }, n.prototype.copyTo = function(i) {
      for (var t = this.t - 1; t >= 0; --t)
        i[t] = this[t];
      i.t = this.t, i.s = this.s;
    }, n.prototype.fromInt = function(i) {
      this.t = 1, this.s = i < 0 ? -1 : 0, i > 0 ? this[0] = i : i < -1 ? this[0] = i + this.DV : this.t = 0;
    }, n.prototype.fromString = function(i, t) {
      var e;
      if (t == 16)
        e = 4;
      else if (t == 8)
        e = 3;
      else if (t == 256)
        e = 8;
      else if (t == 2)
        e = 1;
      else if (t == 32)
        e = 5;
      else if (t == 4)
        e = 2;
      else {
        this.fromRadix(i, t);
        return;
      }
      this.t = 0, this.s = 0;
      for (var r = i.length, s = !1, a = 0; --r >= 0; ) {
        var o = e == 8 ? +i[r] & 255 : ke(i, r);
        if (o < 0) {
          i.charAt(r) == "-" && (s = !0);
          continue;
        }
        s = !1, a == 0 ? this[this.t++] = o : a + e > this.DB ? (this[this.t - 1] |= (o & (1 << this.DB - a) - 1) << a, this[this.t++] = o >> this.DB - a) : this[this.t - 1] |= o << a, a += e, a >= this.DB && (a -= this.DB);
      }
      e == 8 && (+i[0] & 128) != 0 && (this.s = -1, a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)), this.clamp(), s && n.ZERO.subTo(this, this);
    }, n.prototype.clamp = function() {
      for (var i = this.s & this.DM; this.t > 0 && this[this.t - 1] == i; )
        --this.t;
    }, n.prototype.dlShiftTo = function(i, t) {
      var e;
      for (e = this.t - 1; e >= 0; --e)
        t[e + i] = this[e];
      for (e = i - 1; e >= 0; --e)
        t[e] = 0;
      t.t = this.t + i, t.s = this.s;
    }, n.prototype.drShiftTo = function(i, t) {
      for (var e = i; e < this.t; ++e)
        t[e - i] = this[e];
      t.t = Math.max(this.t - i, 0), t.s = this.s;
    }, n.prototype.lShiftTo = function(i, t) {
      for (var e = i % this.DB, r = this.DB - e, s = (1 << r) - 1, a = Math.floor(i / this.DB), o = this.s << e & this.DM, c = this.t - 1; c >= 0; --c)
        t[c + a + 1] = this[c] >> r | o, o = (this[c] & s) << e;
      for (var c = a - 1; c >= 0; --c)
        t[c] = 0;
      t[a] = o, t.t = this.t + a + 1, t.s = this.s, t.clamp();
    }, n.prototype.rShiftTo = function(i, t) {
      t.s = this.s;
      var e = Math.floor(i / this.DB);
      if (e >= this.t) {
        t.t = 0;
        return;
      }
      var r = i % this.DB, s = this.DB - r, a = (1 << r) - 1;
      t[0] = this[e] >> r;
      for (var o = e + 1; o < this.t; ++o)
        t[o - e - 1] |= (this[o] & a) << s, t[o - e] = this[o] >> r;
      r > 0 && (t[this.t - e - 1] |= (this.s & a) << s), t.t = this.t - e, t.clamp();
    }, n.prototype.subTo = function(i, t) {
      for (var e = 0, r = 0, s = Math.min(i.t, this.t); e < s; )
        r += this[e] - i[e], t[e++] = r & this.DM, r >>= this.DB;
      if (i.t < this.t) {
        for (r -= i.s; e < this.t; )
          r += this[e], t[e++] = r & this.DM, r >>= this.DB;
        r += this.s;
      } else {
        for (r += this.s; e < i.t; )
          r -= i[e], t[e++] = r & this.DM, r >>= this.DB;
        r -= i.s;
      }
      t.s = r < 0 ? -1 : 0, r < -1 ? t[e++] = this.DV + r : r > 0 && (t[e++] = r), t.t = e, t.clamp();
    }, n.prototype.multiplyTo = function(i, t) {
      var e = this.abs(), r = i.abs(), s = e.t;
      for (t.t = s + r.t; --s >= 0; )
        t[s] = 0;
      for (s = 0; s < r.t; ++s)
        t[s + e.t] = e.am(0, r[s], t, s, 0, e.t);
      t.s = 0, t.clamp(), this.s != i.s && n.ZERO.subTo(t, t);
    }, n.prototype.squareTo = function(i) {
      for (var t = this.abs(), e = i.t = 2 * t.t; --e >= 0; )
        i[e] = 0;
      for (e = 0; e < t.t - 1; ++e) {
        var r = t.am(e, t[e], i, 2 * e, 0, 1);
        (i[e + t.t] += t.am(e + 1, 2 * t[e], i, 2 * e + 1, r, t.t - e - 1)) >= t.DV && (i[e + t.t] -= t.DV, i[e + t.t + 1] = 1);
      }
      i.t > 0 && (i[i.t - 1] += t.am(e, t[e], i, 2 * e, 0, 1)), i.s = 0, i.clamp();
    }, n.prototype.divRemTo = function(i, t, e) {
      var r = i.abs();
      if (!(r.t <= 0)) {
        var s = this.abs();
        if (s.t < r.t) {
          t != null && t.fromInt(0), e != null && this.copyTo(e);
          return;
        }
        e == null && (e = S());
        var a = S(), o = this.s, c = i.s, u = this.DB - St(r[r.t - 1]);
        u > 0 ? (r.lShiftTo(u, a), s.lShiftTo(u, e)) : (r.copyTo(a), s.copyTo(e));
        var l = a.t, f = a[l - 1];
        if (f != 0) {
          var g = f * (1 << this.F1) + (l > 1 ? a[l - 2] >> this.F2 : 0), P = this.FV / g, m = (1 << this.F1) / g, b = 1 << this.F2, y = e.t, C = y - l, T = t ?? S();
          for (a.dlShiftTo(C, T), e.compareTo(T) >= 0 && (e[e.t++] = 1, e.subTo(T, e)), n.ONE.dlShiftTo(l, T), T.subTo(a, a); a.t < l; )
            a[a.t++] = 0;
          for (; --C >= 0; ) {
            var R = e[--y] == f ? this.DM : Math.floor(e[y] * P + (e[y - 1] + b) * m);
            if ((e[y] += a.am(0, R, e, C, 0, l)) < R)
              for (a.dlShiftTo(C, T), e.subTo(T, e); e[y] < --R; )
                e.subTo(T, e);
          }
          t != null && (e.drShiftTo(l, t), o != c && n.ZERO.subTo(t, t)), e.t = l, e.clamp(), u > 0 && e.rShiftTo(u, e), o < 0 && n.ZERO.subTo(e, e);
        }
      }
    }, n.prototype.invDigit = function() {
      if (this.t < 1)
        return 0;
      var i = this[0];
      if ((i & 1) == 0)
        return 0;
      var t = i & 3;
      return t = t * (2 - (i & 15) * t) & 15, t = t * (2 - (i & 255) * t) & 255, t = t * (2 - ((i & 65535) * t & 65535)) & 65535, t = t * (2 - i * t % this.DV) % this.DV, t > 0 ? this.DV - t : -t;
    }, n.prototype.isEven = function() {
      return (this.t > 0 ? this[0] & 1 : this.s) == 0;
    }, n.prototype.exp = function(i, t) {
      if (i > 4294967295 || i < 1)
        return n.ONE;
      var e = S(), r = S(), s = t.convert(this), a = St(i) - 1;
      for (s.copyTo(e); --a >= 0; )
        if (t.sqrTo(e, r), (i & 1 << a) > 0)
          t.mulTo(r, s, e);
        else {
          var o = e;
          e = r, r = o;
        }
      return t.revert(e);
    }, n.prototype.chunkSize = function(i) {
      return Math.floor(Math.LN2 * this.DB / Math.log(i));
    }, n.prototype.toRadix = function(i) {
      if (i == null && (i = 10), this.signum() == 0 || i < 2 || i > 36)
        return "0";
      var t = this.chunkSize(i), e = Math.pow(i, t), r = J(e), s = S(), a = S(), o = "";
      for (this.divRemTo(r, s, a); s.signum() > 0; )
        o = (e + a.intValue()).toString(i).substr(1) + o, s.divRemTo(r, s, a);
      return a.intValue().toString(i) + o;
    }, n.prototype.fromRadix = function(i, t) {
      this.fromInt(0), t == null && (t = 10);
      for (var e = this.chunkSize(t), r = Math.pow(t, e), s = !1, a = 0, o = 0, c = 0; c < i.length; ++c) {
        var u = ke(i, c);
        if (u < 0) {
          i.charAt(c) == "-" && this.signum() == 0 && (s = !0);
          continue;
        }
        o = t * o + u, ++a >= e && (this.dMultiply(r), this.dAddOffset(o, 0), a = 0, o = 0);
      }
      a > 0 && (this.dMultiply(Math.pow(t, a)), this.dAddOffset(o, 0)), s && n.ZERO.subTo(this, this);
    }, n.prototype.fromNumber = function(i, t, e) {
      if (typeof t == "number")
        if (i < 2)
          this.fromInt(1);
        else
          for (this.fromNumber(i, e), this.testBit(i - 1) || this.bitwiseTo(n.ONE.shiftLeft(i - 1), Et, this), this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(t); )
            this.dAddOffset(2, 0), this.bitLength() > i && this.subTo(n.ONE.shiftLeft(i - 1), this);
      else {
        var r = [], s = i & 7;
        r.length = (i >> 3) + 1, t.nextBytes(r), s > 0 ? r[0] &= (1 << s) - 1 : r[0] = 0, this.fromString(r, 256);
      }
    }, n.prototype.bitwiseTo = function(i, t, e) {
      var r, s, a = Math.min(i.t, this.t);
      for (r = 0; r < a; ++r)
        e[r] = t(this[r], i[r]);
      if (i.t < this.t) {
        for (s = i.s & this.DM, r = a; r < this.t; ++r)
          e[r] = t(this[r], s);
        e.t = this.t;
      } else {
        for (s = this.s & this.DM, r = a; r < i.t; ++r)
          e[r] = t(s, i[r]);
        e.t = i.t;
      }
      e.s = t(this.s, i.s), e.clamp();
    }, n.prototype.changeBit = function(i, t) {
      var e = n.ONE.shiftLeft(i);
      return this.bitwiseTo(e, t, e), e;
    }, n.prototype.addTo = function(i, t) {
      for (var e = 0, r = 0, s = Math.min(i.t, this.t); e < s; )
        r += this[e] + i[e], t[e++] = r & this.DM, r >>= this.DB;
      if (i.t < this.t) {
        for (r += i.s; e < this.t; )
          r += this[e], t[e++] = r & this.DM, r >>= this.DB;
        r += this.s;
      } else {
        for (r += this.s; e < i.t; )
          r += i[e], t[e++] = r & this.DM, r >>= this.DB;
        r += i.s;
      }
      t.s = r < 0 ? -1 : 0, r > 0 ? t[e++] = r : r < -1 && (t[e++] = this.DV + r), t.t = e, t.clamp();
    }, n.prototype.dMultiply = function(i) {
      this[this.t] = this.am(0, i - 1, this, 0, 0, this.t), ++this.t, this.clamp();
    }, n.prototype.dAddOffset = function(i, t) {
      if (i != 0) {
        for (; this.t <= t; )
          this[this.t++] = 0;
        for (this[t] += i; this[t] >= this.DV; )
          this[t] -= this.DV, ++t >= this.t && (this[this.t++] = 0), ++this[t];
      }
    }, n.prototype.multiplyLowerTo = function(i, t, e) {
      var r = Math.min(this.t + i.t, t);
      for (e.s = 0, e.t = r; r > 0; )
        e[--r] = 0;
      for (var s = e.t - this.t; r < s; ++r)
        e[r + this.t] = this.am(0, i[r], e, r, 0, this.t);
      for (var s = Math.min(i.t, t); r < s; ++r)
        this.am(0, i[r], e, r, 0, t - r);
      e.clamp();
    }, n.prototype.multiplyUpperTo = function(i, t, e) {
      --t;
      var r = e.t = this.t + i.t - t;
      for (e.s = 0; --r >= 0; )
        e[r] = 0;
      for (r = Math.max(t - this.t, 0); r < i.t; ++r)
        e[this.t + r - t] = this.am(t - r, i[r], e, 0, 0, this.t + r - t);
      e.clamp(), e.drShiftTo(1, e);
    }, n.prototype.modInt = function(i) {
      if (i <= 0)
        return 0;
      var t = this.DV % i, e = this.s < 0 ? i - 1 : 0;
      if (this.t > 0)
        if (t == 0)
          e = this[0] % i;
        else
          for (var r = this.t - 1; r >= 0; --r)
            e = (t * e + this[r]) % i;
      return e;
    }, n.prototype.millerRabin = function(i) {
      var t = this.subtract(n.ONE), e = t.getLowestSetBit();
      if (e <= 0)
        return !1;
      var r = t.shiftRight(e);
      i = i + 1 >> 1, i > N.length && (i = N.length);
      for (var s = S(), a = 0; a < i; ++a) {
        s.fromInt(N[Math.floor(Math.random() * N.length)]);
        var o = s.modPow(r, this);
        if (o.compareTo(n.ONE) != 0 && o.compareTo(t) != 0) {
          for (var c = 1; c++ < e && o.compareTo(t) != 0; )
            if (o = o.modPowInt(2, this), o.compareTo(n.ONE) == 0)
              return !1;
          if (o.compareTo(t) != 0)
            return !1;
        }
      }
      return !0;
    }, n.prototype.square = function() {
      var i = S();
      return this.squareTo(i), i;
    }, n.prototype.gcda = function(i, t) {
      var e = this.s < 0 ? this.negate() : this.clone(), r = i.s < 0 ? i.negate() : i.clone();
      if (e.compareTo(r) < 0) {
        var s = e;
        e = r, r = s;
      }
      var a = e.getLowestSetBit(), o = r.getLowestSetBit();
      if (o < 0) {
        t(e);
        return;
      }
      a < o && (o = a), o > 0 && (e.rShiftTo(o, e), r.rShiftTo(o, r));
      var c = function() {
        (a = e.getLowestSetBit()) > 0 && e.rShiftTo(a, e), (a = r.getLowestSetBit()) > 0 && r.rShiftTo(a, r), e.compareTo(r) >= 0 ? (e.subTo(r, e), e.rShiftTo(1, e)) : (r.subTo(e, r), r.rShiftTo(1, r)), e.signum() > 0 ? setTimeout(c, 0) : (o > 0 && r.lShiftTo(o, r), setTimeout(function() {
          t(r);
        }, 0));
      };
      setTimeout(c, 10);
    }, n.prototype.fromNumberAsync = function(i, t, e, r) {
      if (typeof t == "number")
        if (i < 2)
          this.fromInt(1);
        else {
          this.fromNumber(i, e), this.testBit(i - 1) || this.bitwiseTo(n.ONE.shiftLeft(i - 1), Et, this), this.isEven() && this.dAddOffset(1, 0);
          var s = this, a = function() {
            s.dAddOffset(2, 0), s.bitLength() > i && s.subTo(n.ONE.shiftLeft(i - 1), s), s.isProbablePrime(t) ? setTimeout(function() {
              r();
            }, 0) : setTimeout(a, 0);
          };
          setTimeout(a, 0);
        }
      else {
        var o = [], c = i & 7;
        o.length = (i >> 3) + 1, t.nextBytes(o), c > 0 ? o[0] &= (1 << c) - 1 : o[0] = 0, this.fromString(o, 256);
      }
    }, n;
  }()
), Bn = (
  /** @class */
  function() {
    function n() {
    }
    return n.prototype.convert = function(i) {
      return i;
    }, n.prototype.revert = function(i) {
      return i;
    }, n.prototype.mulTo = function(i, t, e) {
      i.multiplyTo(t, e);
    }, n.prototype.sqrTo = function(i, t) {
      i.squareTo(t);
    }, n;
  }()
), Ue = (
  /** @class */
  function() {
    function n(i) {
      this.m = i;
    }
    return n.prototype.convert = function(i) {
      return i.s < 0 || i.compareTo(this.m) >= 0 ? i.mod(this.m) : i;
    }, n.prototype.revert = function(i) {
      return i;
    }, n.prototype.reduce = function(i) {
      i.divRemTo(this.m, null, i);
    }, n.prototype.mulTo = function(i, t, e) {
      i.multiplyTo(t, e), this.reduce(e);
    }, n.prototype.sqrTo = function(i, t) {
      i.squareTo(t), this.reduce(t);
    }, n;
  }()
), Le = (
  /** @class */
  function() {
    function n(i) {
      this.m = i, this.mp = i.invDigit(), this.mpl = this.mp & 32767, this.mph = this.mp >> 15, this.um = (1 << i.DB - 15) - 1, this.mt2 = 2 * i.t;
    }
    return n.prototype.convert = function(i) {
      var t = S();
      return i.abs().dlShiftTo(this.m.t, t), t.divRemTo(this.m, null, t), i.s < 0 && t.compareTo(E.ZERO) > 0 && this.m.subTo(t, t), t;
    }, n.prototype.revert = function(i) {
      var t = S();
      return i.copyTo(t), this.reduce(t), t;
    }, n.prototype.reduce = function(i) {
      for (; i.t <= this.mt2; )
        i[i.t++] = 0;
      for (var t = 0; t < this.m.t; ++t) {
        var e = i[t] & 32767, r = e * this.mpl + ((e * this.mph + (i[t] >> 15) * this.mpl & this.um) << 15) & i.DM;
        for (e = t + this.m.t, i[e] += this.m.am(0, r, i, t, 0, this.m.t); i[e] >= i.DV; )
          i[e] -= i.DV, i[++e]++;
      }
      i.clamp(), i.drShiftTo(this.m.t, i), i.compareTo(this.m) >= 0 && i.subTo(this.m, i);
    }, n.prototype.mulTo = function(i, t, e) {
      i.multiplyTo(t, e), this.reduce(e);
    }, n.prototype.sqrTo = function(i, t) {
      i.squareTo(t), this.reduce(t);
    }, n;
  }()
), Nn = (
  /** @class */
  function() {
    function n(i) {
      this.m = i, this.r2 = S(), this.q3 = S(), E.ONE.dlShiftTo(2 * i.t, this.r2), this.mu = this.r2.divide(i);
    }
    return n.prototype.convert = function(i) {
      if (i.s < 0 || i.t > 2 * this.m.t)
        return i.mod(this.m);
      if (i.compareTo(this.m) < 0)
        return i;
      var t = S();
      return i.copyTo(t), this.reduce(t), t;
    }, n.prototype.revert = function(i) {
      return i;
    }, n.prototype.reduce = function(i) {
      for (i.drShiftTo(this.m.t - 1, this.r2), i.t > this.m.t + 1 && (i.t = this.m.t + 1, i.clamp()), this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3), this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); i.compareTo(this.r2) < 0; )
        i.dAddOffset(1, this.m.t + 1);
      for (i.subTo(this.r2, i); i.compareTo(this.m) >= 0; )
        i.subTo(this.m, i);
    }, n.prototype.mulTo = function(i, t, e) {
      i.multiplyTo(t, e), this.reduce(e);
    }, n.prototype.sqrTo = function(i, t) {
      i.squareTo(t), this.reduce(t);
    }, n;
  }()
);
function S() {
  return new E(null);
}
function O(n, i) {
  return new E(n, i);
}
var Me = typeof navigator < "u";
Me && Ve && navigator.appName == "Microsoft Internet Explorer" ? (E.prototype.am = function(i, t, e, r, s, a) {
  for (var o = t & 32767, c = t >> 15; --a >= 0; ) {
    var u = this[i] & 32767, l = this[i++] >> 15, f = c * u + l * o;
    u = o * u + ((f & 32767) << 15) + e[r] + (s & 1073741823), s = (u >>> 30) + (f >>> 15) + c * l + (s >>> 30), e[r++] = u & 1073741823;
  }
  return s;
}, Z = 30) : Me && Ve && navigator.appName != "Netscape" ? (E.prototype.am = function(i, t, e, r, s, a) {
  for (; --a >= 0; ) {
    var o = t * this[i++] + e[r] + s;
    s = Math.floor(o / 67108864), e[r++] = o & 67108863;
  }
  return s;
}, Z = 26) : (E.prototype.am = function(i, t, e, r, s, a) {
  for (var o = t & 16383, c = t >> 14; --a >= 0; ) {
    var u = this[i] & 16383, l = this[i++] >> 14, f = c * u + l * o;
    u = o * u + ((f & 16383) << 14) + e[r] + s, s = (u >> 28) + (f >> 14) + c * l, e[r++] = u & 268435455;
  }
  return s;
}, Z = 28);
E.prototype.DB = Z;
E.prototype.DM = (1 << Z) - 1;
E.prototype.DV = 1 << Z;
var ve = 52;
E.prototype.FV = Math.pow(2, ve);
E.prototype.F1 = ve - Z;
E.prototype.F2 = 2 * Z - ve;
var Mt = [], ut, k;
ut = 48;
for (k = 0; k <= 9; ++k)
  Mt[ut++] = k;
ut = 97;
for (k = 10; k < 36; ++k)
  Mt[ut++] = k;
ut = 65;
for (k = 10; k < 36; ++k)
  Mt[ut++] = k;
function ke(n, i) {
  var t = Mt[n.charCodeAt(i)];
  return t ?? -1;
}
function J(n) {
  var i = S();
  return i.fromInt(n), i;
}
function St(n) {
  var i = 1, t;
  return (t = n >>> 16) != 0 && (n = t, i += 16), (t = n >> 8) != 0 && (n = t, i += 8), (t = n >> 4) != 0 && (n = t, i += 4), (t = n >> 2) != 0 && (n = t, i += 2), (t = n >> 1) != 0 && (n = t, i += 1), i;
}
E.ZERO = J(0);
E.ONE = J(1);
var Vn = (
  /** @class */
  function() {
    function n() {
      this.i = 0, this.j = 0, this.S = [];
    }
    return n.prototype.init = function(i) {
      var t, e, r;
      for (t = 0; t < 256; ++t)
        this.S[t] = t;
      for (e = 0, t = 0; t < 256; ++t)
        e = e + this.S[t] + i[t % i.length] & 255, r = this.S[t], this.S[t] = this.S[e], this.S[e] = r;
      this.i = 0, this.j = 0;
    }, n.prototype.next = function() {
      var i;
      return this.i = this.i + 1 & 255, this.j = this.j + this.S[this.i] & 255, i = this.S[this.i], this.S[this.i] = this.S[this.j], this.S[this.j] = i, this.S[i + this.S[this.i] & 255];
    }, n;
  }()
);
function Un() {
  return new Vn();
}
var ii = 256, Tt, Q = null, K;
if (Q == null) {
  Q = [], K = 0;
  var Ct = void 0;
  if (typeof window < "u" && window.crypto && window.crypto.getRandomValues) {
    var Gt = new Uint32Array(256);
    for (window.crypto.getRandomValues(Gt), Ct = 0; Ct < Gt.length; ++Ct)
      Q[K++] = Gt[Ct] & 255;
  }
  var At = 0, Rt = function(n) {
    if (At = At || 0, At >= 256 || K >= ii) {
      window.removeEventListener ? window.removeEventListener("mousemove", Rt, !1) : window.detachEvent && window.detachEvent("onmousemove", Rt);
      return;
    }
    try {
      var i = n.x + n.y;
      Q[K++] = i & 255, At += 1;
    } catch {
    }
  };
  typeof window < "u" && (window.addEventListener ? window.addEventListener("mousemove", Rt, !1) : window.attachEvent && window.attachEvent("onmousemove", Rt));
}
function Ln() {
  if (Tt == null) {
    for (Tt = Un(); K < ii; ) {
      var n = Math.floor(65536 * Math.random());
      Q[K++] = n & 255;
    }
    for (Tt.init(Q), K = 0; K < Q.length; ++K)
      Q[K] = 0;
    K = 0;
  }
  return Tt.next();
}
var te = (
  /** @class */
  function() {
    function n() {
    }
    return n.prototype.nextBytes = function(i) {
      for (var t = 0; t < i.length; ++t)
        i[t] = Ln();
    }, n;
  }()
);
function Mn(n, i) {
  if (i < n.length + 22)
    return console.error("Message too long for RSA"), null;
  for (var t = i - n.length - 6, e = "", r = 0; r < t; r += 2)
    e += "ff";
  var s = "0001" + e + "00" + n;
  return O(s, 16);
}
function kn(n, i) {
  if (i < n.length + 11)
    return console.error("Message too long for RSA"), null;
  for (var t = [], e = n.length - 1; e >= 0 && i > 0; ) {
    var r = n.charCodeAt(e--);
    r < 128 ? t[--i] = r : r > 127 && r < 2048 ? (t[--i] = r & 63 | 128, t[--i] = r >> 6 | 192) : (t[--i] = r & 63 | 128, t[--i] = r >> 6 & 63 | 128, t[--i] = r >> 12 | 224);
  }
  t[--i] = 0;
  for (var s = new te(), a = []; i > 2; ) {
    for (a[0] = 0; a[0] == 0; )
      s.nextBytes(a);
    t[--i] = a[0];
  }
  return t[--i] = 2, t[--i] = 0, new E(t);
}
var Fn = (
  /** @class */
  function() {
    function n() {
      this.n = null, this.e = 0, this.d = null, this.p = null, this.q = null, this.dmp1 = null, this.dmq1 = null, this.coeff = null;
    }
    return n.prototype.doPublic = function(i) {
      return i.modPowInt(this.e, this.n);
    }, n.prototype.doPrivate = function(i) {
      if (this.p == null || this.q == null)
        return i.modPow(this.d, this.n);
      for (var t = i.mod(this.p).modPow(this.dmp1, this.p), e = i.mod(this.q).modPow(this.dmq1, this.q); t.compareTo(e) < 0; )
        t = t.add(this.p);
      return t.subtract(e).multiply(this.coeff).mod(this.p).multiply(this.q).add(e);
    }, n.prototype.setPublic = function(i, t) {
      i != null && t != null && i.length > 0 && t.length > 0 ? (this.n = O(i, 16), this.e = parseInt(t, 16)) : console.error("Invalid RSA public key");
    }, n.prototype.encrypt = function(i) {
      var t = this.n.bitLength() + 7 >> 3, e = kn(i, t);
      if (e == null)
        return null;
      var r = this.doPublic(e);
      if (r == null)
        return null;
      for (var s = r.toString(16), a = s.length, o = 0; o < t * 2 - a; o++)
        s = "0" + s;
      return s;
    }, n.prototype.setPrivate = function(i, t, e) {
      i != null && t != null && i.length > 0 && t.length > 0 ? (this.n = O(i, 16), this.e = parseInt(t, 16), this.d = O(e, 16)) : console.error("Invalid RSA private key");
    }, n.prototype.setPrivateEx = function(i, t, e, r, s, a, o, c) {
      i != null && t != null && i.length > 0 && t.length > 0 ? (this.n = O(i, 16), this.e = parseInt(t, 16), this.d = O(e, 16), this.p = O(r, 16), this.q = O(s, 16), this.dmp1 = O(a, 16), this.dmq1 = O(o, 16), this.coeff = O(c, 16)) : console.error("Invalid RSA private key");
    }, n.prototype.generate = function(i, t) {
      var e = new te(), r = i >> 1;
      this.e = parseInt(t, 16);
      for (var s = new E(t, 16); ; ) {
        for (; this.p = new E(i - r, 1, e), !(this.p.subtract(E.ONE).gcd(s).compareTo(E.ONE) == 0 && this.p.isProbablePrime(10)); )
          ;
        for (; this.q = new E(r, 1, e), !(this.q.subtract(E.ONE).gcd(s).compareTo(E.ONE) == 0 && this.q.isProbablePrime(10)); )
          ;
        if (this.p.compareTo(this.q) <= 0) {
          var a = this.p;
          this.p = this.q, this.q = a;
        }
        var o = this.p.subtract(E.ONE), c = this.q.subtract(E.ONE), u = o.multiply(c);
        if (u.gcd(s).compareTo(E.ONE) == 0) {
          this.n = this.p.multiply(this.q), this.d = s.modInverse(u), this.dmp1 = this.d.mod(o), this.dmq1 = this.d.mod(c), this.coeff = this.q.modInverse(this.p);
          break;
        }
      }
    }, n.prototype.decrypt = function(i) {
      var t = O(i, 16), e = this.doPrivate(t);
      return e == null ? null : jn(e, this.n.bitLength() + 7 >> 3);
    }, n.prototype.generateAsync = function(i, t, e) {
      var r = new te(), s = i >> 1;
      this.e = parseInt(t, 16);
      var a = new E(t, 16), o = this, c = function() {
        var u = function() {
          if (o.p.compareTo(o.q) <= 0) {
            var g = o.p;
            o.p = o.q, o.q = g;
          }
          var P = o.p.subtract(E.ONE), m = o.q.subtract(E.ONE), b = P.multiply(m);
          b.gcd(a).compareTo(E.ONE) == 0 ? (o.n = o.p.multiply(o.q), o.d = a.modInverse(b), o.dmp1 = o.d.mod(P), o.dmq1 = o.d.mod(m), o.coeff = o.q.modInverse(o.p), setTimeout(function() {
            e();
          }, 0)) : setTimeout(c, 0);
        }, l = function() {
          o.q = S(), o.q.fromNumberAsync(s, 1, r, function() {
            o.q.subtract(E.ONE).gcda(a, function(g) {
              g.compareTo(E.ONE) == 0 && o.q.isProbablePrime(10) ? setTimeout(u, 0) : setTimeout(l, 0);
            });
          });
        }, f = function() {
          o.p = S(), o.p.fromNumberAsync(i - s, 1, r, function() {
            o.p.subtract(E.ONE).gcda(a, function(g) {
              g.compareTo(E.ONE) == 0 && o.p.isProbablePrime(10) ? setTimeout(l, 0) : setTimeout(f, 0);
            });
          });
        };
        setTimeout(f, 0);
      };
      setTimeout(c, 0);
    }, n.prototype.sign = function(i, t, e) {
      var r = qn(e), s = r + t(i).toString(), a = Mn(s, this.n.bitLength() / 4);
      if (a == null)
        return null;
      var o = this.doPrivate(a);
      if (o == null)
        return null;
      var c = o.toString(16);
      return (c.length & 1) == 0 ? c : "0" + c;
    }, n.prototype.verify = function(i, t, e) {
      var r = O(t, 16), s = this.doPublic(r);
      if (s == null)
        return null;
      var a = s.toString(16).replace(/^1f+00/, ""), o = Kn(a);
      return o == e(i).toString();
    }, n;
  }()
);
function jn(n, i) {
  for (var t = n.toByteArray(), e = 0; e < t.length && t[e] == 0; )
    ++e;
  if (t.length - e != i - 1 || t[e] != 2)
    return null;
  for (++e; t[e] != 0; )
    if (++e >= t.length)
      return null;
  for (var r = ""; ++e < t.length; ) {
    var s = t[e] & 255;
    s < 128 ? r += String.fromCharCode(s) : s > 191 && s < 224 ? (r += String.fromCharCode((s & 31) << 6 | t[e + 1] & 63), ++e) : (r += String.fromCharCode((s & 15) << 12 | (t[e + 1] & 63) << 6 | t[e + 2] & 63), e += 2);
  }
  return r;
}
var Ot = {
  md2: "3020300c06082a864886f70d020205000410",
  md5: "3020300c06082a864886f70d020505000410",
  sha1: "3021300906052b0e03021a05000414",
  sha224: "302d300d06096086480165030402040500041c",
  sha256: "3031300d060960864801650304020105000420",
  sha384: "3041300d060960864801650304020205000430",
  sha512: "3051300d060960864801650304020305000440",
  ripemd160: "3021300906052b2403020105000414"
};
function qn(n) {
  return Ot[n] || "";
}
function Kn(n) {
  for (var i in Ot)
    if (Ot.hasOwnProperty(i)) {
      var t = Ot[i], e = t.length;
      if (n.substr(0, e) == t)
        return n.substr(e);
    }
  return n;
}
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
var x = {};
x.lang = {
  /**
   * Utility to set up the prototype, constructor and superclass properties to
   * support an inheritance strategy that can chain constructors and methods.
   * Static members will not be inherited.
   *
   * @method extend
   * @static
   * @param {Function} subc   the object to modify
   * @param {Function} superc the object to inherit
   * @param {Object} overrides  additional properties/methods to add to the
   *                              subclass prototype.  These will override the
   *                              matching items obtained from the superclass
   *                              if present.
   */
  extend: function(n, i, t) {
    if (!i || !n)
      throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");
    var e = function() {
    };
    if (e.prototype = i.prototype, n.prototype = new e(), n.prototype.constructor = n, n.superclass = i.prototype, i.prototype.constructor == Object.prototype.constructor && (i.prototype.constructor = i), t) {
      var r;
      for (r in t)
        n.prototype[r] = t[r];
      var s = function() {
      }, a = ["toString", "valueOf"];
      try {
        /MSIE/.test(navigator.userAgent) && (s = function(o, c) {
          for (r = 0; r < a.length; r = r + 1) {
            var u = a[r], l = c[u];
            typeof l == "function" && l != Object.prototype[u] && (o[u] = l);
          }
        });
      } catch {
      }
      s(n.prototype, t);
    }
  }
};
/**
 * @fileOverview
 * @name asn1-1.0.js
 * @author Kenji Urushima kenji.urushima@gmail.com
 * @version asn1 1.0.13 (2017-Jun-02)
 * @since jsrsasign 2.1
 * @license <a href="https://kjur.github.io/jsrsasign/license/">MIT License</a>
 */
var _ = {};
(typeof _.asn1 > "u" || !_.asn1) && (_.asn1 = {});
_.asn1.ASN1Util = new function() {
  this.integerToByteHex = function(n) {
    var i = n.toString(16);
    return i.length % 2 == 1 && (i = "0" + i), i;
  }, this.bigIntToMinTwosComplementsHex = function(n) {
    var i = n.toString(16);
    if (i.substr(0, 1) != "-")
      i.length % 2 == 1 ? i = "0" + i : i.match(/^[0-7]/) || (i = "00" + i);
    else {
      var t = i.substr(1), e = t.length;
      e % 2 == 1 ? e += 1 : i.match(/^[0-7]/) || (e += 2);
      for (var r = "", s = 0; s < e; s++)
        r += "f";
      var a = new E(r, 16), o = a.xor(n).add(E.ONE);
      i = o.toString(16).replace(/^-/, "");
    }
    return i;
  }, this.getPEMStringFromHex = function(n, i) {
    return hextopem(n, i);
  }, this.newObject = function(n) {
    var i = _, t = i.asn1, e = t.DERBoolean, r = t.DERInteger, s = t.DERBitString, a = t.DEROctetString, o = t.DERNull, c = t.DERObjectIdentifier, u = t.DEREnumerated, l = t.DERUTF8String, f = t.DERNumericString, g = t.DERPrintableString, P = t.DERTeletexString, m = t.DERIA5String, b = t.DERUTCTime, y = t.DERGeneralizedTime, C = t.DERSequence, T = t.DERSet, R = t.DERTaggedObject, V = t.ASN1Util.newObject, I = Object.keys(n);
    if (I.length != 1)
      throw "key of param shall be only one.";
    var v = I[0];
    if (":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":" + v + ":") == -1)
      throw "undefined key: " + v;
    if (v == "bool")
      return new e(n[v]);
    if (v == "int")
      return new r(n[v]);
    if (v == "bitstr")
      return new s(n[v]);
    if (v == "octstr")
      return new a(n[v]);
    if (v == "null")
      return new o(n[v]);
    if (v == "oid")
      return new c(n[v]);
    if (v == "enum")
      return new u(n[v]);
    if (v == "utf8str")
      return new l(n[v]);
    if (v == "numstr")
      return new f(n[v]);
    if (v == "prnstr")
      return new g(n[v]);
    if (v == "telstr")
      return new P(n[v]);
    if (v == "ia5str")
      return new m(n[v]);
    if (v == "utctime")
      return new b(n[v]);
    if (v == "gentime")
      return new y(n[v]);
    if (v == "seq") {
      for (var M = n[v], W = [], X = 0; X < M.length; X++) {
        var Xt = V(M[X]);
        W.push(Xt);
      }
      return new C({ array: W });
    }
    if (v == "set") {
      for (var M = n[v], W = [], X = 0; X < M.length; X++) {
        var Xt = V(M[X]);
        W.push(Xt);
      }
      return new T({ array: W });
    }
    if (v == "tag") {
      var F = n[v];
      if (Object.prototype.toString.call(F) === "[object Array]" && F.length == 3) {
        var mn = V(F[2]);
        return new R({
          tag: F[0],
          explicit: F[1],
          obj: mn
        });
      } else {
        var wt = {};
        if (F.explicit !== void 0 && (wt.explicit = F.explicit), F.tag !== void 0 && (wt.tag = F.tag), F.obj === void 0)
          throw "obj shall be specified for 'tag'.";
        return wt.obj = V(F.obj), new R(wt);
      }
    }
  }, this.jsonToASN1HEX = function(n) {
    var i = this.newObject(n);
    return i.getEncodedHex();
  };
}();
_.asn1.ASN1Util.oidHexToInt = function(n) {
  for (var r = "", i = parseInt(n.substr(0, 2), 16), t = Math.floor(i / 40), e = i % 40, r = t + "." + e, s = "", a = 2; a < n.length; a += 2) {
    var o = parseInt(n.substr(a, 2), 16), c = ("00000000" + o.toString(2)).slice(-8);
    if (s = s + c.substr(1, 7), c.substr(0, 1) == "0") {
      var u = new E(s, 2);
      r = r + "." + u.toString(10), s = "";
    }
  }
  return r;
};
_.asn1.ASN1Util.oidIntToHex = function(n) {
  var i = function(o) {
    var c = o.toString(16);
    return c.length == 1 && (c = "0" + c), c;
  }, t = function(o) {
    var c = "", u = new E(o, 10), l = u.toString(2), f = 7 - l.length % 7;
    f == 7 && (f = 0);
    for (var g = "", P = 0; P < f; P++)
      g += "0";
    l = g + l;
    for (var P = 0; P < l.length - 1; P += 7) {
      var m = l.substr(P, 7);
      P != l.length - 7 && (m = "1" + m), c += i(parseInt(m, 2));
    }
    return c;
  };
  if (!n.match(/^[0-9.]+$/))
    throw "malformed oid string: " + n;
  var e = "", r = n.split("."), s = parseInt(r[0]) * 40 + parseInt(r[1]);
  e += i(s), r.splice(0, 2);
  for (var a = 0; a < r.length; a++)
    e += t(r[a]);
  return e;
};
_.asn1.ASN1Object = function() {
  var n = "";
  this.getLengthHexFromValue = function() {
    if (typeof this.hV > "u" || this.hV == null)
      throw "this.hV is null or undefined.";
    if (this.hV.length % 2 == 1)
      throw "value hex must be even length: n=" + n.length + ",v=" + this.hV;
    var i = this.hV.length / 2, t = i.toString(16);
    if (t.length % 2 == 1 && (t = "0" + t), i < 128)
      return t;
    var e = t.length / 2;
    if (e > 15)
      throw "ASN.1 length too long to represent by 8x: n = " + i.toString(16);
    var r = 128 + e;
    return r.toString(16) + t;
  }, this.getEncodedHex = function() {
    return (this.hTLV == null || this.isModified) && (this.hV = this.getFreshValueHex(), this.hL = this.getLengthHexFromValue(), this.hTLV = this.hT + this.hL + this.hV, this.isModified = !1), this.hTLV;
  }, this.getValueHex = function() {
    return this.getEncodedHex(), this.hV;
  }, this.getFreshValueHex = function() {
    return "";
  };
};
_.asn1.DERAbstractString = function(n) {
  _.asn1.DERAbstractString.superclass.constructor.call(this), this.getString = function() {
    return this.s;
  }, this.setString = function(i) {
    this.hTLV = null, this.isModified = !0, this.s = i, this.hV = stohex(this.s);
  }, this.setStringHex = function(i) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = i;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof n < "u" && (typeof n == "string" ? this.setString(n) : typeof n.str < "u" ? this.setString(n.str) : typeof n.hex < "u" && this.setStringHex(n.hex));
};
x.lang.extend(_.asn1.DERAbstractString, _.asn1.ASN1Object);
_.asn1.DERAbstractTime = function(n) {
  _.asn1.DERAbstractTime.superclass.constructor.call(this), this.localDateToUTC = function(i) {
    utc = i.getTime() + i.getTimezoneOffset() * 6e4;
    var t = new Date(utc);
    return t;
  }, this.formatDate = function(i, t, e) {
    var r = this.zeroPadding, s = this.localDateToUTC(i), a = String(s.getFullYear());
    t == "utc" && (a = a.substr(2, 2));
    var o = r(String(s.getMonth() + 1), 2), c = r(String(s.getDate()), 2), u = r(String(s.getHours()), 2), l = r(String(s.getMinutes()), 2), f = r(String(s.getSeconds()), 2), g = a + o + c + u + l + f;
    if (e === !0) {
      var P = s.getMilliseconds();
      if (P != 0) {
        var m = r(String(P), 3);
        m = m.replace(/[0]+$/, ""), g = g + "." + m;
      }
    }
    return g + "Z";
  }, this.zeroPadding = function(i, t) {
    return i.length >= t ? i : new Array(t - i.length + 1).join("0") + i;
  }, this.getString = function() {
    return this.s;
  }, this.setString = function(i) {
    this.hTLV = null, this.isModified = !0, this.s = i, this.hV = stohex(i);
  }, this.setByDateValue = function(i, t, e, r, s, a) {
    var o = new Date(Date.UTC(i, t - 1, e, r, s, a, 0));
    this.setByDate(o);
  }, this.getFreshValueHex = function() {
    return this.hV;
  };
};
x.lang.extend(_.asn1.DERAbstractTime, _.asn1.ASN1Object);
_.asn1.DERAbstractStructured = function(n) {
  _.asn1.DERAbstractString.superclass.constructor.call(this), this.setByASN1ObjectArray = function(i) {
    this.hTLV = null, this.isModified = !0, this.asn1Array = i;
  }, this.appendASN1Object = function(i) {
    this.hTLV = null, this.isModified = !0, this.asn1Array.push(i);
  }, this.asn1Array = new Array(), typeof n < "u" && typeof n.array < "u" && (this.asn1Array = n.array);
};
x.lang.extend(_.asn1.DERAbstractStructured, _.asn1.ASN1Object);
_.asn1.DERBoolean = function() {
  _.asn1.DERBoolean.superclass.constructor.call(this), this.hT = "01", this.hTLV = "0101ff";
};
x.lang.extend(_.asn1.DERBoolean, _.asn1.ASN1Object);
_.asn1.DERInteger = function(n) {
  _.asn1.DERInteger.superclass.constructor.call(this), this.hT = "02", this.setByBigInteger = function(i) {
    this.hTLV = null, this.isModified = !0, this.hV = _.asn1.ASN1Util.bigIntToMinTwosComplementsHex(i);
  }, this.setByInteger = function(i) {
    var t = new E(String(i), 10);
    this.setByBigInteger(t);
  }, this.setValueHex = function(i) {
    this.hV = i;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof n < "u" && (typeof n.bigint < "u" ? this.setByBigInteger(n.bigint) : typeof n.int < "u" ? this.setByInteger(n.int) : typeof n == "number" ? this.setByInteger(n) : typeof n.hex < "u" && this.setValueHex(n.hex));
};
x.lang.extend(_.asn1.DERInteger, _.asn1.ASN1Object);
_.asn1.DERBitString = function(n) {
  if (n !== void 0 && typeof n.obj < "u") {
    var i = _.asn1.ASN1Util.newObject(n.obj);
    n.hex = "00" + i.getEncodedHex();
  }
  _.asn1.DERBitString.superclass.constructor.call(this), this.hT = "03", this.setHexValueIncludingUnusedBits = function(t) {
    this.hTLV = null, this.isModified = !0, this.hV = t;
  }, this.setUnusedBitsAndHexValue = function(t, e) {
    if (t < 0 || 7 < t)
      throw "unused bits shall be from 0 to 7: u = " + t;
    var r = "0" + t;
    this.hTLV = null, this.isModified = !0, this.hV = r + e;
  }, this.setByBinaryString = function(t) {
    t = t.replace(/0+$/, "");
    var e = 8 - t.length % 8;
    e == 8 && (e = 0);
    for (var r = 0; r <= e; r++)
      t += "0";
    for (var s = "", r = 0; r < t.length - 1; r += 8) {
      var a = t.substr(r, 8), o = parseInt(a, 2).toString(16);
      o.length == 1 && (o = "0" + o), s += o;
    }
    this.hTLV = null, this.isModified = !0, this.hV = "0" + e + s;
  }, this.setByBooleanArray = function(t) {
    for (var e = "", r = 0; r < t.length; r++)
      t[r] == !0 ? e += "1" : e += "0";
    this.setByBinaryString(e);
  }, this.newFalseArray = function(t) {
    for (var e = new Array(t), r = 0; r < t; r++)
      e[r] = !1;
    return e;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof n < "u" && (typeof n == "string" && n.toLowerCase().match(/^[0-9a-f]+$/) ? this.setHexValueIncludingUnusedBits(n) : typeof n.hex < "u" ? this.setHexValueIncludingUnusedBits(n.hex) : typeof n.bin < "u" ? this.setByBinaryString(n.bin) : typeof n.array < "u" && this.setByBooleanArray(n.array));
};
x.lang.extend(_.asn1.DERBitString, _.asn1.ASN1Object);
_.asn1.DEROctetString = function(n) {
  if (n !== void 0 && typeof n.obj < "u") {
    var i = _.asn1.ASN1Util.newObject(n.obj);
    n.hex = i.getEncodedHex();
  }
  _.asn1.DEROctetString.superclass.constructor.call(this, n), this.hT = "04";
};
x.lang.extend(_.asn1.DEROctetString, _.asn1.DERAbstractString);
_.asn1.DERNull = function() {
  _.asn1.DERNull.superclass.constructor.call(this), this.hT = "05", this.hTLV = "0500";
};
x.lang.extend(_.asn1.DERNull, _.asn1.ASN1Object);
_.asn1.DERObjectIdentifier = function(n) {
  var i = function(e) {
    var r = e.toString(16);
    return r.length == 1 && (r = "0" + r), r;
  }, t = function(e) {
    var r = "", s = new E(e, 10), a = s.toString(2), o = 7 - a.length % 7;
    o == 7 && (o = 0);
    for (var c = "", u = 0; u < o; u++)
      c += "0";
    a = c + a;
    for (var u = 0; u < a.length - 1; u += 7) {
      var l = a.substr(u, 7);
      u != a.length - 7 && (l = "1" + l), r += i(parseInt(l, 2));
    }
    return r;
  };
  _.asn1.DERObjectIdentifier.superclass.constructor.call(this), this.hT = "06", this.setValueHex = function(e) {
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = e;
  }, this.setValueOidString = function(e) {
    if (!e.match(/^[0-9.]+$/))
      throw "malformed oid string: " + e;
    var r = "", s = e.split("."), a = parseInt(s[0]) * 40 + parseInt(s[1]);
    r += i(a), s.splice(0, 2);
    for (var o = 0; o < s.length; o++)
      r += t(s[o]);
    this.hTLV = null, this.isModified = !0, this.s = null, this.hV = r;
  }, this.setValueName = function(e) {
    var r = _.asn1.x509.OID.name2oid(e);
    if (r !== "")
      this.setValueOidString(r);
    else
      throw "DERObjectIdentifier oidName undefined: " + e;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, n !== void 0 && (typeof n == "string" ? n.match(/^[0-2].[0-9.]+$/) ? this.setValueOidString(n) : this.setValueName(n) : n.oid !== void 0 ? this.setValueOidString(n.oid) : n.hex !== void 0 ? this.setValueHex(n.hex) : n.name !== void 0 && this.setValueName(n.name));
};
x.lang.extend(_.asn1.DERObjectIdentifier, _.asn1.ASN1Object);
_.asn1.DEREnumerated = function(n) {
  _.asn1.DEREnumerated.superclass.constructor.call(this), this.hT = "0a", this.setByBigInteger = function(i) {
    this.hTLV = null, this.isModified = !0, this.hV = _.asn1.ASN1Util.bigIntToMinTwosComplementsHex(i);
  }, this.setByInteger = function(i) {
    var t = new E(String(i), 10);
    this.setByBigInteger(t);
  }, this.setValueHex = function(i) {
    this.hV = i;
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof n < "u" && (typeof n.int < "u" ? this.setByInteger(n.int) : typeof n == "number" ? this.setByInteger(n) : typeof n.hex < "u" && this.setValueHex(n.hex));
};
x.lang.extend(_.asn1.DEREnumerated, _.asn1.ASN1Object);
_.asn1.DERUTF8String = function(n) {
  _.asn1.DERUTF8String.superclass.constructor.call(this, n), this.hT = "0c";
};
x.lang.extend(_.asn1.DERUTF8String, _.asn1.DERAbstractString);
_.asn1.DERNumericString = function(n) {
  _.asn1.DERNumericString.superclass.constructor.call(this, n), this.hT = "12";
};
x.lang.extend(_.asn1.DERNumericString, _.asn1.DERAbstractString);
_.asn1.DERPrintableString = function(n) {
  _.asn1.DERPrintableString.superclass.constructor.call(this, n), this.hT = "13";
};
x.lang.extend(_.asn1.DERPrintableString, _.asn1.DERAbstractString);
_.asn1.DERTeletexString = function(n) {
  _.asn1.DERTeletexString.superclass.constructor.call(this, n), this.hT = "14";
};
x.lang.extend(_.asn1.DERTeletexString, _.asn1.DERAbstractString);
_.asn1.DERIA5String = function(n) {
  _.asn1.DERIA5String.superclass.constructor.call(this, n), this.hT = "16";
};
x.lang.extend(_.asn1.DERIA5String, _.asn1.DERAbstractString);
_.asn1.DERUTCTime = function(n) {
  _.asn1.DERUTCTime.superclass.constructor.call(this, n), this.hT = "17", this.setByDate = function(i) {
    this.hTLV = null, this.isModified = !0, this.date = i, this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s);
  }, this.getFreshValueHex = function() {
    return typeof this.date > "u" && typeof this.s > "u" && (this.date = /* @__PURE__ */ new Date(), this.s = this.formatDate(this.date, "utc"), this.hV = stohex(this.s)), this.hV;
  }, n !== void 0 && (n.str !== void 0 ? this.setString(n.str) : typeof n == "string" && n.match(/^[0-9]{12}Z$/) ? this.setString(n) : n.hex !== void 0 ? this.setStringHex(n.hex) : n.date !== void 0 && this.setByDate(n.date));
};
x.lang.extend(_.asn1.DERUTCTime, _.asn1.DERAbstractTime);
_.asn1.DERGeneralizedTime = function(n) {
  _.asn1.DERGeneralizedTime.superclass.constructor.call(this, n), this.hT = "18", this.withMillis = !1, this.setByDate = function(i) {
    this.hTLV = null, this.isModified = !0, this.date = i, this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s);
  }, this.getFreshValueHex = function() {
    return this.date === void 0 && this.s === void 0 && (this.date = /* @__PURE__ */ new Date(), this.s = this.formatDate(this.date, "gen", this.withMillis), this.hV = stohex(this.s)), this.hV;
  }, n !== void 0 && (n.str !== void 0 ? this.setString(n.str) : typeof n == "string" && n.match(/^[0-9]{14}Z$/) ? this.setString(n) : n.hex !== void 0 ? this.setStringHex(n.hex) : n.date !== void 0 && this.setByDate(n.date), n.millis === !0 && (this.withMillis = !0));
};
x.lang.extend(_.asn1.DERGeneralizedTime, _.asn1.DERAbstractTime);
_.asn1.DERSequence = function(n) {
  _.asn1.DERSequence.superclass.constructor.call(this, n), this.hT = "30", this.getFreshValueHex = function() {
    for (var i = "", t = 0; t < this.asn1Array.length; t++) {
      var e = this.asn1Array[t];
      i += e.getEncodedHex();
    }
    return this.hV = i, this.hV;
  };
};
x.lang.extend(_.asn1.DERSequence, _.asn1.DERAbstractStructured);
_.asn1.DERSet = function(n) {
  _.asn1.DERSet.superclass.constructor.call(this, n), this.hT = "31", this.sortFlag = !0, this.getFreshValueHex = function() {
    for (var i = new Array(), t = 0; t < this.asn1Array.length; t++) {
      var e = this.asn1Array[t];
      i.push(e.getEncodedHex());
    }
    return this.sortFlag == !0 && i.sort(), this.hV = i.join(""), this.hV;
  }, typeof n < "u" && typeof n.sortflag < "u" && n.sortflag == !1 && (this.sortFlag = !1);
};
x.lang.extend(_.asn1.DERSet, _.asn1.DERAbstractStructured);
_.asn1.DERTaggedObject = function(n) {
  _.asn1.DERTaggedObject.superclass.constructor.call(this), this.hT = "a0", this.hV = "", this.isExplicit = !0, this.asn1Object = null, this.setASN1Object = function(i, t, e) {
    this.hT = t, this.isExplicit = i, this.asn1Object = e, this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(), this.hTLV = null, this.isModified = !0) : (this.hV = null, this.hTLV = e.getEncodedHex(), this.hTLV = this.hTLV.replace(/^../, t), this.isModified = !1);
  }, this.getFreshValueHex = function() {
    return this.hV;
  }, typeof n < "u" && (typeof n.tag < "u" && (this.hT = n.tag), typeof n.explicit < "u" && (this.isExplicit = n.explicit), typeof n.obj < "u" && (this.asn1Object = n.obj, this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)));
};
x.lang.extend(_.asn1.DERTaggedObject, _.asn1.ASN1Object);
var Hn = /* @__PURE__ */ function() {
  var n = function(i, t) {
    return n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e, r) {
      e.__proto__ = r;
    } || function(e, r) {
      for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (e[s] = r[s]);
    }, n(i, t);
  };
  return function(i, t) {
    if (typeof t != "function" && t !== null)
      throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    n(i, t);
    function e() {
      this.constructor = i;
    }
    i.prototype = t === null ? Object.create(t) : (e.prototype = t.prototype, new e());
  };
}(), Fe = (
  /** @class */
  function(n) {
    Hn(i, n);
    function i(t) {
      var e = n.call(this) || this;
      return t && (typeof t == "string" ? e.parseKey(t) : (i.hasPrivateKeyProperty(t) || i.hasPublicKeyProperty(t)) && e.parsePropertiesFrom(t)), e;
    }
    return i.prototype.parseKey = function(t) {
      try {
        var e = 0, r = 0, s = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/, a = s.test(t) ? An.decode(t) : Yt.unarmor(t), o = xn.decode(a);
        if (o.sub.length === 3 && (o = o.sub[2].sub[0]), o.sub.length === 9) {
          e = o.sub[1].getHexStringValue(), this.n = O(e, 16), r = o.sub[2].getHexStringValue(), this.e = parseInt(r, 16);
          var c = o.sub[3].getHexStringValue();
          this.d = O(c, 16);
          var u = o.sub[4].getHexStringValue();
          this.p = O(u, 16);
          var l = o.sub[5].getHexStringValue();
          this.q = O(l, 16);
          var f = o.sub[6].getHexStringValue();
          this.dmp1 = O(f, 16);
          var g = o.sub[7].getHexStringValue();
          this.dmq1 = O(g, 16);
          var P = o.sub[8].getHexStringValue();
          this.coeff = O(P, 16);
        } else if (o.sub.length === 2)
          if (o.sub[0].sub) {
            var m = o.sub[1], b = m.sub[0];
            e = b.sub[0].getHexStringValue(), this.n = O(e, 16), r = b.sub[1].getHexStringValue(), this.e = parseInt(r, 16);
          } else
            e = o.sub[0].getHexStringValue(), this.n = O(e, 16), r = o.sub[1].getHexStringValue(), this.e = parseInt(r, 16);
        else
          return !1;
        return !0;
      } catch {
        return !1;
      }
    }, i.prototype.getPrivateBaseKey = function() {
      var t = {
        array: [
          new _.asn1.DERInteger({ int: 0 }),
          new _.asn1.DERInteger({ bigint: this.n }),
          new _.asn1.DERInteger({ int: this.e }),
          new _.asn1.DERInteger({ bigint: this.d }),
          new _.asn1.DERInteger({ bigint: this.p }),
          new _.asn1.DERInteger({ bigint: this.q }),
          new _.asn1.DERInteger({ bigint: this.dmp1 }),
          new _.asn1.DERInteger({ bigint: this.dmq1 }),
          new _.asn1.DERInteger({ bigint: this.coeff })
        ]
      }, e = new _.asn1.DERSequence(t);
      return e.getEncodedHex();
    }, i.prototype.getPrivateBaseKeyB64 = function() {
      return Vt(this.getPrivateBaseKey());
    }, i.prototype.getPublicBaseKey = function() {
      var t = new _.asn1.DERSequence({
        array: [
          new _.asn1.DERObjectIdentifier({ oid: "1.2.840.113549.1.1.1" }),
          new _.asn1.DERNull()
        ]
      }), e = new _.asn1.DERSequence({
        array: [
          new _.asn1.DERInteger({ bigint: this.n }),
          new _.asn1.DERInteger({ int: this.e })
        ]
      }), r = new _.asn1.DERBitString({
        hex: "00" + e.getEncodedHex()
      }), s = new _.asn1.DERSequence({
        array: [t, r]
      });
      return s.getEncodedHex();
    }, i.prototype.getPublicBaseKeyB64 = function() {
      return Vt(this.getPublicBaseKey());
    }, i.wordwrap = function(t, e) {
      if (e = e || 64, !t)
        return t;
      var r = "(.{1," + e + `})( +|$
?)|(.{1,` + e + "})";
      return t.match(RegExp(r, "g")).join(`
`);
    }, i.prototype.getPrivateKey = function() {
      var t = `-----BEGIN RSA PRIVATE KEY-----
`;
      return t += i.wordwrap(this.getPrivateBaseKeyB64()) + `
`, t += "-----END RSA PRIVATE KEY-----", t;
    }, i.prototype.getPublicKey = function() {
      var t = `-----BEGIN PUBLIC KEY-----
`;
      return t += i.wordwrap(this.getPublicBaseKeyB64()) + `
`, t += "-----END PUBLIC KEY-----", t;
    }, i.hasPublicKeyProperty = function(t) {
      return t = t || {}, t.hasOwnProperty("n") && t.hasOwnProperty("e");
    }, i.hasPrivateKeyProperty = function(t) {
      return t = t || {}, t.hasOwnProperty("n") && t.hasOwnProperty("e") && t.hasOwnProperty("d") && t.hasOwnProperty("p") && t.hasOwnProperty("q") && t.hasOwnProperty("dmp1") && t.hasOwnProperty("dmq1") && t.hasOwnProperty("coeff");
    }, i.prototype.parsePropertiesFrom = function(t) {
      this.n = t.n, this.e = t.e, t.hasOwnProperty("d") && (this.d = t.d, this.p = t.p, this.q = t.q, this.dmp1 = t.dmp1, this.dmq1 = t.dmq1, this.coeff = t.coeff);
    }, i;
  }(Fn)
), $t, Wn = typeof process < "u" ? ($t = process.env) === null || $t === void 0 ? void 0 : $t.npm_package_version : void 0, Xn = (
  /** @class */
  function() {
    function n(i) {
      i === void 0 && (i = {}), i = i || {}, this.default_key_size = i.default_key_size ? parseInt(i.default_key_size, 10) : 1024, this.default_public_exponent = i.default_public_exponent || "010001", this.log = i.log || !1, this.key = null;
    }
    return n.prototype.setKey = function(i) {
      this.log && this.key && console.warn("A key was already set, overriding existing."), this.key = new Fe(i);
    }, n.prototype.setPrivateKey = function(i) {
      this.setKey(i);
    }, n.prototype.setPublicKey = function(i) {
      this.setKey(i);
    }, n.prototype.decrypt = function(i) {
      try {
        return this.getKey().decrypt(Be(i));
      } catch {
        return !1;
      }
    }, n.prototype.encrypt = function(i) {
      try {
        return Vt(this.getKey().encrypt(i));
      } catch {
        return !1;
      }
    }, n.prototype.sign = function(i, t, e) {
      try {
        return Vt(this.getKey().sign(i, t, e));
      } catch {
        return !1;
      }
    }, n.prototype.verify = function(i, t, e) {
      try {
        return this.getKey().verify(i, Be(t), e);
      } catch {
        return !1;
      }
    }, n.prototype.getKey = function(i) {
      if (!this.key) {
        if (this.key = new Fe(), i && {}.toString.call(i) === "[object Function]") {
          this.key.generateAsync(this.default_key_size, this.default_public_exponent, i);
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
    }, n.version = Wn, n;
  }()
);
function ni(n, i) {
  return function() {
    return n.apply(i, arguments);
  };
}
const { toString: zn } = Object.prototype, { getPrototypeOf: we } = Object, { iterator: kt, toStringTag: ri } = Symbol, Ft = /* @__PURE__ */ ((n) => (i) => {
  const t = zn.call(i);
  return n[t] || (n[t] = t.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), H = (n) => (n = n.toLowerCase(), (i) => Ft(i) === n), jt = (n) => (i) => typeof i === n, { isArray: ht } = Array, bt = jt("undefined");
function Gn(n) {
  return n !== null && !bt(n) && n.constructor !== null && !bt(n.constructor) && U(n.constructor.isBuffer) && n.constructor.isBuffer(n);
}
const si = H("ArrayBuffer");
function $n(n) {
  let i;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? i = ArrayBuffer.isView(n) : i = n && n.buffer && si(n.buffer), i;
}
const Jn = jt("string"), U = jt("function"), ai = jt("number"), qt = (n) => n !== null && typeof n == "object", Qn = (n) => n === !0 || n === !1, xt = (n) => {
  if (Ft(n) !== "object")
    return !1;
  const i = we(n);
  return (i === null || i === Object.prototype || Object.getPrototypeOf(i) === null) && !(ri in n) && !(kt in n);
}, Zn = H("Date"), Yn = H("File"), tr = H("Blob"), er = H("FileList"), ir = (n) => qt(n) && U(n.pipe), nr = (n) => {
  let i;
  return n && (typeof FormData == "function" && n instanceof FormData || U(n.append) && ((i = Ft(n)) === "formdata" || // detect form-data instance
  i === "object" && U(n.toString) && n.toString() === "[object FormData]"));
}, rr = H("URLSearchParams"), [sr, ar, or, cr] = ["ReadableStream", "Request", "Response", "Headers"].map(H), ur = (n) => n.trim ? n.trim() : n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Pt(n, i, { allOwnKeys: t = !1 } = {}) {
  if (n === null || typeof n > "u")
    return;
  let e, r;
  if (typeof n != "object" && (n = [n]), ht(n))
    for (e = 0, r = n.length; e < r; e++)
      i.call(null, n[e], e, n);
  else {
    const s = t ? Object.getOwnPropertyNames(n) : Object.keys(n), a = s.length;
    let o;
    for (e = 0; e < a; e++)
      o = s[e], i.call(null, n[o], o, n);
  }
}
function oi(n, i) {
  i = i.toLowerCase();
  const t = Object.keys(n);
  let e = t.length, r;
  for (; e-- > 0; )
    if (r = t[e], i === r.toLowerCase())
      return r;
  return null;
}
const et = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, ci = (n) => !bt(n) && n !== et;
function ee() {
  const { caseless: n } = ci(this) && this || {}, i = {}, t = (e, r) => {
    const s = n && oi(i, r) || r;
    xt(i[s]) && xt(e) ? i[s] = ee(i[s], e) : xt(e) ? i[s] = ee({}, e) : ht(e) ? i[s] = e.slice() : i[s] = e;
  };
  for (let e = 0, r = arguments.length; e < r; e++)
    arguments[e] && Pt(arguments[e], t);
  return i;
}
const hr = (n, i, t, { allOwnKeys: e } = {}) => (Pt(i, (r, s) => {
  t && U(r) ? n[s] = ni(r, t) : n[s] = r;
}, { allOwnKeys: e }), n), lr = (n) => (n.charCodeAt(0) === 65279 && (n = n.slice(1)), n), fr = (n, i, t, e) => {
  n.prototype = Object.create(i.prototype, e), n.prototype.constructor = n, Object.defineProperty(n, "super", {
    value: i.prototype
  }), t && Object.assign(n.prototype, t);
}, pr = (n, i, t, e) => {
  let r, s, a;
  const o = {};
  if (i = i || {}, n == null) return i;
  do {
    for (r = Object.getOwnPropertyNames(n), s = r.length; s-- > 0; )
      a = r[s], (!e || e(a, n, i)) && !o[a] && (i[a] = n[a], o[a] = !0);
    n = t !== !1 && we(n);
  } while (n && (!t || t(n, i)) && n !== Object.prototype);
  return i;
}, dr = (n, i, t) => {
  n = String(n), (t === void 0 || t > n.length) && (t = n.length), t -= i.length;
  const e = n.indexOf(i, t);
  return e !== -1 && e === t;
}, _r = (n) => {
  if (!n) return null;
  if (ht(n)) return n;
  let i = n.length;
  if (!ai(i)) return null;
  const t = new Array(i);
  for (; i-- > 0; )
    t[i] = n[i];
  return t;
}, gr = /* @__PURE__ */ ((n) => (i) => n && i instanceof n)(typeof Uint8Array < "u" && we(Uint8Array)), mr = (n, i) => {
  const e = (n && n[kt]).call(n);
  let r;
  for (; (r = e.next()) && !r.done; ) {
    const s = r.value;
    i.call(n, s[0], s[1]);
  }
}, yr = (n, i) => {
  let t;
  const e = [];
  for (; (t = n.exec(i)) !== null; )
    e.push(t);
  return e;
}, br = H("HTMLFormElement"), Pr = (n) => n.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(t, e, r) {
    return e.toUpperCase() + r;
  }
), je = (({ hasOwnProperty: n }) => (i, t) => n.call(i, t))(Object.prototype), vr = H("RegExp"), ui = (n, i) => {
  const t = Object.getOwnPropertyDescriptors(n), e = {};
  Pt(t, (r, s) => {
    let a;
    (a = i(r, s, n)) !== !1 && (e[s] = a || r);
  }), Object.defineProperties(n, e);
}, wr = (n) => {
  ui(n, (i, t) => {
    if (U(n) && ["arguments", "caller", "callee"].indexOf(t) !== -1)
      return !1;
    const e = n[t];
    if (U(e)) {
      if (i.enumerable = !1, "writable" in i) {
        i.writable = !1;
        return;
      }
      i.set || (i.set = () => {
        throw Error("Can not rewrite read-only method '" + t + "'");
      });
    }
  });
}, Er = (n, i) => {
  const t = {}, e = (r) => {
    r.forEach((s) => {
      t[s] = !0;
    });
  };
  return ht(n) ? e(n) : e(String(n).split(i)), t;
}, Sr = () => {
}, Tr = (n, i) => n != null && Number.isFinite(n = +n) ? n : i;
function Cr(n) {
  return !!(n && U(n.append) && n[ri] === "FormData" && n[kt]);
}
const Ar = (n) => {
  const i = new Array(10), t = (e, r) => {
    if (qt(e)) {
      if (i.indexOf(e) >= 0)
        return;
      if (!("toJSON" in e)) {
        i[r] = e;
        const s = ht(e) ? [] : {};
        return Pt(e, (a, o) => {
          const c = t(a, r + 1);
          !bt(c) && (s[o] = c);
        }), i[r] = void 0, s;
      }
    }
    return e;
  };
  return t(n, 0);
}, Rr = H("AsyncFunction"), Or = (n) => n && (qt(n) || U(n)) && U(n.then) && U(n.catch), hi = ((n, i) => n ? setImmediate : i ? ((t, e) => (et.addEventListener("message", ({ source: r, data: s }) => {
  r === et && s === t && e.length && e.shift()();
}, !1), (r) => {
  e.push(r), et.postMessage(t, "*");
}))(`axios@${Math.random()}`, []) : (t) => setTimeout(t))(
  typeof setImmediate == "function",
  U(et.postMessage)
), xr = typeof queueMicrotask < "u" ? queueMicrotask.bind(et) : typeof process < "u" && process.nextTick || hi, Dr = (n) => n != null && U(n[kt]), d = {
  isArray: ht,
  isArrayBuffer: si,
  isBuffer: Gn,
  isFormData: nr,
  isArrayBufferView: $n,
  isString: Jn,
  isNumber: ai,
  isBoolean: Qn,
  isObject: qt,
  isPlainObject: xt,
  isReadableStream: sr,
  isRequest: ar,
  isResponse: or,
  isHeaders: cr,
  isUndefined: bt,
  isDate: Zn,
  isFile: Yn,
  isBlob: tr,
  isRegExp: vr,
  isFunction: U,
  isStream: ir,
  isURLSearchParams: rr,
  isTypedArray: gr,
  isFileList: er,
  forEach: Pt,
  merge: ee,
  extend: hr,
  trim: ur,
  stripBOM: lr,
  inherits: fr,
  toFlatObject: pr,
  kindOf: Ft,
  kindOfTest: H,
  endsWith: dr,
  toArray: _r,
  forEachEntry: mr,
  matchAll: yr,
  isHTMLForm: br,
  hasOwnProperty: je,
  hasOwnProp: je,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: ui,
  freezeMethods: wr,
  toObjectSet: Er,
  toCamelCase: Pr,
  noop: Sr,
  toFiniteNumber: Tr,
  findKey: oi,
  global: et,
  isContextDefined: ci,
  isSpecCompliantForm: Cr,
  toJSONObject: Ar,
  isAsyncFn: Rr,
  isThenable: Or,
  setImmediate: hi,
  asap: xr,
  isIterable: Dr
};
function w(n, i, t, e, r) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = n, this.name = "AxiosError", i && (this.code = i), t && (this.config = t), e && (this.request = e), r && (this.response = r, this.status = r.status ? r.status : null);
}
d.inherits(w, Error, {
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
      config: d.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const li = w.prototype, fi = {};
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
  fi[n] = { value: n };
});
Object.defineProperties(w, fi);
Object.defineProperty(li, "isAxiosError", { value: !0 });
w.from = (n, i, t, e, r, s) => {
  const a = Object.create(li);
  return d.toFlatObject(n, a, function(c) {
    return c !== Error.prototype;
  }, (o) => o !== "isAxiosError"), w.call(a, n.message, i, t, e, r), a.cause = n, a.name = n.name, s && Object.assign(a, s), a;
};
const Ir = null;
function ie(n) {
  return d.isPlainObject(n) || d.isArray(n);
}
function pi(n) {
  return d.endsWith(n, "[]") ? n.slice(0, -2) : n;
}
function qe(n, i, t) {
  return n ? n.concat(i).map(function(r, s) {
    return r = pi(r), !t && s ? "[" + r + "]" : r;
  }).join(t ? "." : "") : i;
}
function Br(n) {
  return d.isArray(n) && !n.some(ie);
}
const Nr = d.toFlatObject(d, {}, null, function(i) {
  return /^is[A-Z]/.test(i);
});
function Kt(n, i, t) {
  if (!d.isObject(n))
    throw new TypeError("target must be an object");
  i = i || new FormData(), t = d.toFlatObject(t, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(b, y) {
    return !d.isUndefined(y[b]);
  });
  const e = t.metaTokens, r = t.visitor || l, s = t.dots, a = t.indexes, c = (t.Blob || typeof Blob < "u" && Blob) && d.isSpecCompliantForm(i);
  if (!d.isFunction(r))
    throw new TypeError("visitor must be a function");
  function u(m) {
    if (m === null) return "";
    if (d.isDate(m))
      return m.toISOString();
    if (d.isBoolean(m))
      return m.toString();
    if (!c && d.isBlob(m))
      throw new w("Blob is not supported. Use a Buffer instead.");
    return d.isArrayBuffer(m) || d.isTypedArray(m) ? c && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function l(m, b, y) {
    let C = m;
    if (m && !y && typeof m == "object") {
      if (d.endsWith(b, "{}"))
        b = e ? b : b.slice(0, -2), m = JSON.stringify(m);
      else if (d.isArray(m) && Br(m) || (d.isFileList(m) || d.endsWith(b, "[]")) && (C = d.toArray(m)))
        return b = pi(b), C.forEach(function(R, V) {
          !(d.isUndefined(R) || R === null) && i.append(
            // eslint-disable-next-line no-nested-ternary
            a === !0 ? qe([b], V, s) : a === null ? b : b + "[]",
            u(R)
          );
        }), !1;
    }
    return ie(m) ? !0 : (i.append(qe(y, b, s), u(m)), !1);
  }
  const f = [], g = Object.assign(Nr, {
    defaultVisitor: l,
    convertValue: u,
    isVisitable: ie
  });
  function P(m, b) {
    if (!d.isUndefined(m)) {
      if (f.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      f.push(m), d.forEach(m, function(C, T) {
        (!(d.isUndefined(C) || C === null) && r.call(
          i,
          C,
          d.isString(T) ? T.trim() : T,
          b,
          g
        )) === !0 && P(C, b ? b.concat(T) : [T]);
      }), f.pop();
    }
  }
  if (!d.isObject(n))
    throw new TypeError("data must be an object");
  return P(n), i;
}
function Ke(n) {
  const i = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g, function(e) {
    return i[e];
  });
}
function Ee(n, i) {
  this._pairs = [], n && Kt(n, this, i);
}
const di = Ee.prototype;
di.append = function(i, t) {
  this._pairs.push([i, t]);
};
di.toString = function(i) {
  const t = i ? function(e) {
    return i.call(this, e, Ke);
  } : Ke;
  return this._pairs.map(function(r) {
    return t(r[0]) + "=" + t(r[1]);
  }, "").join("&");
};
function Vr(n) {
  return encodeURIComponent(n).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function _i(n, i, t) {
  if (!i)
    return n;
  const e = t && t.encode || Vr;
  d.isFunction(t) && (t = {
    serialize: t
  });
  const r = t && t.serialize;
  let s;
  if (r ? s = r(i, t) : s = d.isURLSearchParams(i) ? i.toString() : new Ee(i, t).toString(e), s) {
    const a = n.indexOf("#");
    a !== -1 && (n = n.slice(0, a)), n += (n.indexOf("?") === -1 ? "?" : "&") + s;
  }
  return n;
}
class He {
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
  use(i, t, e) {
    return this.handlers.push({
      fulfilled: i,
      rejected: t,
      synchronous: e ? e.synchronous : !1,
      runWhen: e ? e.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(i) {
    this.handlers[i] && (this.handlers[i] = null);
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
  forEach(i) {
    d.forEach(this.handlers, function(e) {
      e !== null && i(e);
    });
  }
}
const gi = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ur = typeof URLSearchParams < "u" ? URLSearchParams : Ee, Lr = typeof FormData < "u" ? FormData : null, Mr = typeof Blob < "u" ? Blob : null, kr = {
  isBrowser: !0,
  classes: {
    URLSearchParams: Ur,
    FormData: Lr,
    Blob: Mr
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
}, Se = typeof window < "u" && typeof document < "u", ne = typeof navigator == "object" && navigator || void 0, Fr = Se && (!ne || ["ReactNative", "NativeScript", "NS"].indexOf(ne.product) < 0), jr = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", qr = Se && window.location.href || "http://localhost", Kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: Se,
  hasStandardBrowserEnv: Fr,
  hasStandardBrowserWebWorkerEnv: jr,
  navigator: ne,
  origin: qr
}, Symbol.toStringTag, { value: "Module" })), B = {
  ...Kr,
  ...kr
};
function Hr(n, i) {
  return Kt(n, new B.classes.URLSearchParams(), Object.assign({
    visitor: function(t, e, r, s) {
      return B.isNode && d.isBuffer(t) ? (this.append(e, t.toString("base64")), !1) : s.defaultVisitor.apply(this, arguments);
    }
  }, i));
}
function Wr(n) {
  return d.matchAll(/\w+|\[(\w*)]/g, n).map((i) => i[0] === "[]" ? "" : i[1] || i[0]);
}
function Xr(n) {
  const i = {}, t = Object.keys(n);
  let e;
  const r = t.length;
  let s;
  for (e = 0; e < r; e++)
    s = t[e], i[s] = n[s];
  return i;
}
function mi(n) {
  function i(t, e, r, s) {
    let a = t[s++];
    if (a === "__proto__") return !0;
    const o = Number.isFinite(+a), c = s >= t.length;
    return a = !a && d.isArray(r) ? r.length : a, c ? (d.hasOwnProp(r, a) ? r[a] = [r[a], e] : r[a] = e, !o) : ((!r[a] || !d.isObject(r[a])) && (r[a] = []), i(t, e, r[a], s) && d.isArray(r[a]) && (r[a] = Xr(r[a])), !o);
  }
  if (d.isFormData(n) && d.isFunction(n.entries)) {
    const t = {};
    return d.forEachEntry(n, (e, r) => {
      i(Wr(e), r, t, 0);
    }), t;
  }
  return null;
}
function zr(n, i, t) {
  if (d.isString(n))
    try {
      return (i || JSON.parse)(n), d.trim(n);
    } catch (e) {
      if (e.name !== "SyntaxError")
        throw e;
    }
  return (t || JSON.stringify)(n);
}
const vt = {
  transitional: gi,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(i, t) {
    const e = t.getContentType() || "", r = e.indexOf("application/json") > -1, s = d.isObject(i);
    if (s && d.isHTMLForm(i) && (i = new FormData(i)), d.isFormData(i))
      return r ? JSON.stringify(mi(i)) : i;
    if (d.isArrayBuffer(i) || d.isBuffer(i) || d.isStream(i) || d.isFile(i) || d.isBlob(i) || d.isReadableStream(i))
      return i;
    if (d.isArrayBufferView(i))
      return i.buffer;
    if (d.isURLSearchParams(i))
      return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), i.toString();
    let o;
    if (s) {
      if (e.indexOf("application/x-www-form-urlencoded") > -1)
        return Hr(i, this.formSerializer).toString();
      if ((o = d.isFileList(i)) || e.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return Kt(
          o ? { "files[]": i } : i,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return s || r ? (t.setContentType("application/json", !1), zr(i)) : i;
  }],
  transformResponse: [function(i) {
    const t = this.transitional || vt.transitional, e = t && t.forcedJSONParsing, r = this.responseType === "json";
    if (d.isResponse(i) || d.isReadableStream(i))
      return i;
    if (i && d.isString(i) && (e && !this.responseType || r)) {
      const a = !(t && t.silentJSONParsing) && r;
      try {
        return JSON.parse(i);
      } catch (o) {
        if (a)
          throw o.name === "SyntaxError" ? w.from(o, w.ERR_BAD_RESPONSE, this, null, this.response) : o;
      }
    }
    return i;
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
  validateStatus: function(i) {
    return i >= 200 && i < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
d.forEach(["delete", "get", "head", "post", "put", "patch"], (n) => {
  vt.headers[n] = {};
});
const Gr = d.toObjectSet([
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
]), $r = (n) => {
  const i = {};
  let t, e, r;
  return n && n.split(`
`).forEach(function(a) {
    r = a.indexOf(":"), t = a.substring(0, r).trim().toLowerCase(), e = a.substring(r + 1).trim(), !(!t || i[t] && Gr[t]) && (t === "set-cookie" ? i[t] ? i[t].push(e) : i[t] = [e] : i[t] = i[t] ? i[t] + ", " + e : e);
  }), i;
}, We = Symbol("internals");
function ft(n) {
  return n && String(n).trim().toLowerCase();
}
function Dt(n) {
  return n === !1 || n == null ? n : d.isArray(n) ? n.map(Dt) : String(n);
}
function Jr(n) {
  const i = /* @__PURE__ */ Object.create(null), t = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let e;
  for (; e = t.exec(n); )
    i[e[1]] = e[2];
  return i;
}
const Qr = (n) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());
function Jt(n, i, t, e, r) {
  if (d.isFunction(e))
    return e.call(this, i, t);
  if (r && (i = t), !!d.isString(i)) {
    if (d.isString(e))
      return i.indexOf(e) !== -1;
    if (d.isRegExp(e))
      return e.test(i);
  }
}
function Zr(n) {
  return n.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (i, t, e) => t.toUpperCase() + e);
}
function Yr(n, i) {
  const t = d.toCamelCase(" " + i);
  ["get", "set", "has"].forEach((e) => {
    Object.defineProperty(n, e + t, {
      value: function(r, s, a) {
        return this[e].call(this, i, r, s, a);
      },
      configurable: !0
    });
  });
}
let L = class {
  constructor(i) {
    i && this.set(i);
  }
  set(i, t, e) {
    const r = this;
    function s(o, c, u) {
      const l = ft(c);
      if (!l)
        throw new Error("header name must be a non-empty string");
      const f = d.findKey(r, l);
      (!f || r[f] === void 0 || u === !0 || u === void 0 && r[f] !== !1) && (r[f || c] = Dt(o));
    }
    const a = (o, c) => d.forEach(o, (u, l) => s(u, l, c));
    if (d.isPlainObject(i) || i instanceof this.constructor)
      a(i, t);
    else if (d.isString(i) && (i = i.trim()) && !Qr(i))
      a($r(i), t);
    else if (d.isObject(i) && d.isIterable(i)) {
      let o = {}, c, u;
      for (const l of i) {
        if (!d.isArray(l))
          throw TypeError("Object iterator must return a key-value pair");
        o[u = l[0]] = (c = o[u]) ? d.isArray(c) ? [...c, l[1]] : [c, l[1]] : l[1];
      }
      a(o, t);
    } else
      i != null && s(t, i, e);
    return this;
  }
  get(i, t) {
    if (i = ft(i), i) {
      const e = d.findKey(this, i);
      if (e) {
        const r = this[e];
        if (!t)
          return r;
        if (t === !0)
          return Jr(r);
        if (d.isFunction(t))
          return t.call(this, r, e);
        if (d.isRegExp(t))
          return t.exec(r);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(i, t) {
    if (i = ft(i), i) {
      const e = d.findKey(this, i);
      return !!(e && this[e] !== void 0 && (!t || Jt(this, this[e], e, t)));
    }
    return !1;
  }
  delete(i, t) {
    const e = this;
    let r = !1;
    function s(a) {
      if (a = ft(a), a) {
        const o = d.findKey(e, a);
        o && (!t || Jt(e, e[o], o, t)) && (delete e[o], r = !0);
      }
    }
    return d.isArray(i) ? i.forEach(s) : s(i), r;
  }
  clear(i) {
    const t = Object.keys(this);
    let e = t.length, r = !1;
    for (; e--; ) {
      const s = t[e];
      (!i || Jt(this, this[s], s, i, !0)) && (delete this[s], r = !0);
    }
    return r;
  }
  normalize(i) {
    const t = this, e = {};
    return d.forEach(this, (r, s) => {
      const a = d.findKey(e, s);
      if (a) {
        t[a] = Dt(r), delete t[s];
        return;
      }
      const o = i ? Zr(s) : String(s).trim();
      o !== s && delete t[s], t[o] = Dt(r), e[o] = !0;
    }), this;
  }
  concat(...i) {
    return this.constructor.concat(this, ...i);
  }
  toJSON(i) {
    const t = /* @__PURE__ */ Object.create(null);
    return d.forEach(this, (e, r) => {
      e != null && e !== !1 && (t[r] = i && d.isArray(e) ? e.join(", ") : e);
    }), t;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([i, t]) => i + ": " + t).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(i) {
    return i instanceof this ? i : new this(i);
  }
  static concat(i, ...t) {
    const e = new this(i);
    return t.forEach((r) => e.set(r)), e;
  }
  static accessor(i) {
    const e = (this[We] = this[We] = {
      accessors: {}
    }).accessors, r = this.prototype;
    function s(a) {
      const o = ft(a);
      e[o] || (Yr(r, a), e[o] = !0);
    }
    return d.isArray(i) ? i.forEach(s) : s(i), this;
  }
};
L.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
d.reduceDescriptors(L.prototype, ({ value: n }, i) => {
  let t = i[0].toUpperCase() + i.slice(1);
  return {
    get: () => n,
    set(e) {
      this[t] = e;
    }
  };
});
d.freezeMethods(L);
function Qt(n, i) {
  const t = this || vt, e = i || t, r = L.from(e.headers);
  let s = e.data;
  return d.forEach(n, function(o) {
    s = o.call(t, s, r.normalize(), i ? i.status : void 0);
  }), r.normalize(), s;
}
function yi(n) {
  return !!(n && n.__CANCEL__);
}
function lt(n, i, t) {
  w.call(this, n ?? "canceled", w.ERR_CANCELED, i, t), this.name = "CanceledError";
}
d.inherits(lt, w, {
  __CANCEL__: !0
});
function bi(n, i, t) {
  const e = t.config.validateStatus;
  !t.status || !e || e(t.status) ? n(t) : i(new w(
    "Request failed with status code " + t.status,
    [w.ERR_BAD_REQUEST, w.ERR_BAD_RESPONSE][Math.floor(t.status / 100) - 4],
    t.config,
    t.request,
    t
  ));
}
function ts(n) {
  const i = /^([-+\w]{1,25})(:?\/\/|:)/.exec(n);
  return i && i[1] || "";
}
function es(n, i) {
  n = n || 10;
  const t = new Array(n), e = new Array(n);
  let r = 0, s = 0, a;
  return i = i !== void 0 ? i : 1e3, function(c) {
    const u = Date.now(), l = e[s];
    a || (a = u), t[r] = c, e[r] = u;
    let f = s, g = 0;
    for (; f !== r; )
      g += t[f++], f = f % n;
    if (r = (r + 1) % n, r === s && (s = (s + 1) % n), u - a < i)
      return;
    const P = l && u - l;
    return P ? Math.round(g * 1e3 / P) : void 0;
  };
}
function is(n, i) {
  let t = 0, e = 1e3 / i, r, s;
  const a = (u, l = Date.now()) => {
    t = l, r = null, s && (clearTimeout(s), s = null), n.apply(null, u);
  };
  return [(...u) => {
    const l = Date.now(), f = l - t;
    f >= e ? a(u, l) : (r = u, s || (s = setTimeout(() => {
      s = null, a(r);
    }, e - f)));
  }, () => r && a(r)];
}
const Ut = (n, i, t = 3) => {
  let e = 0;
  const r = es(50, 250);
  return is((s) => {
    const a = s.loaded, o = s.lengthComputable ? s.total : void 0, c = a - e, u = r(c), l = a <= o;
    e = a;
    const f = {
      loaded: a,
      total: o,
      progress: o ? a / o : void 0,
      bytes: c,
      rate: u || void 0,
      estimated: u && o && l ? (o - a) / u : void 0,
      event: s,
      lengthComputable: o != null,
      [i ? "download" : "upload"]: !0
    };
    n(f);
  }, t);
}, Xe = (n, i) => {
  const t = n != null;
  return [(e) => i[0]({
    lengthComputable: t,
    total: n,
    loaded: e
  }), i[1]];
}, ze = (n) => (...i) => d.asap(() => n(...i)), ns = B.hasStandardBrowserEnv ? /* @__PURE__ */ ((n, i) => (t) => (t = new URL(t, B.origin), n.protocol === t.protocol && n.host === t.host && (i || n.port === t.port)))(
  new URL(B.origin),
  B.navigator && /(msie|trident)/i.test(B.navigator.userAgent)
) : () => !0, rs = B.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(n, i, t, e, r, s) {
      const a = [n + "=" + encodeURIComponent(i)];
      d.isNumber(t) && a.push("expires=" + new Date(t).toGMTString()), d.isString(e) && a.push("path=" + e), d.isString(r) && a.push("domain=" + r), s === !0 && a.push("secure"), document.cookie = a.join("; ");
    },
    read(n) {
      const i = document.cookie.match(new RegExp("(^|;\\s*)(" + n + ")=([^;]*)"));
      return i ? decodeURIComponent(i[3]) : null;
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
function ss(n) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(n);
}
function as(n, i) {
  return i ? n.replace(/\/?\/$/, "") + "/" + i.replace(/^\/+/, "") : n;
}
function Pi(n, i, t) {
  let e = !ss(i);
  return n && (e || t == !1) ? as(n, i) : i;
}
const Ge = (n) => n instanceof L ? { ...n } : n;
function nt(n, i) {
  i = i || {};
  const t = {};
  function e(u, l, f, g) {
    return d.isPlainObject(u) && d.isPlainObject(l) ? d.merge.call({ caseless: g }, u, l) : d.isPlainObject(l) ? d.merge({}, l) : d.isArray(l) ? l.slice() : l;
  }
  function r(u, l, f, g) {
    if (d.isUndefined(l)) {
      if (!d.isUndefined(u))
        return e(void 0, u, f, g);
    } else return e(u, l, f, g);
  }
  function s(u, l) {
    if (!d.isUndefined(l))
      return e(void 0, l);
  }
  function a(u, l) {
    if (d.isUndefined(l)) {
      if (!d.isUndefined(u))
        return e(void 0, u);
    } else return e(void 0, l);
  }
  function o(u, l, f) {
    if (f in i)
      return e(u, l);
    if (f in n)
      return e(void 0, u);
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
    headers: (u, l, f) => r(Ge(u), Ge(l), f, !0)
  };
  return d.forEach(Object.keys(Object.assign({}, n, i)), function(l) {
    const f = c[l] || r, g = f(n[l], i[l], l);
    d.isUndefined(g) && f !== o || (t[l] = g);
  }), t;
}
const vi = (n) => {
  const i = nt({}, n);
  let { data: t, withXSRFToken: e, xsrfHeaderName: r, xsrfCookieName: s, headers: a, auth: o } = i;
  i.headers = a = L.from(a), i.url = _i(Pi(i.baseURL, i.url, i.allowAbsoluteUrls), n.params, n.paramsSerializer), o && a.set(
    "Authorization",
    "Basic " + btoa((o.username || "") + ":" + (o.password ? unescape(encodeURIComponent(o.password)) : ""))
  );
  let c;
  if (d.isFormData(t)) {
    if (B.hasStandardBrowserEnv || B.hasStandardBrowserWebWorkerEnv)
      a.setContentType(void 0);
    else if ((c = a.getContentType()) !== !1) {
      const [u, ...l] = c ? c.split(";").map((f) => f.trim()).filter(Boolean) : [];
      a.setContentType([u || "multipart/form-data", ...l].join("; "));
    }
  }
  if (B.hasStandardBrowserEnv && (e && d.isFunction(e) && (e = e(i)), e || e !== !1 && ns(i.url))) {
    const u = r && s && rs.read(s);
    u && a.set(r, u);
  }
  return i;
}, os = typeof XMLHttpRequest < "u", cs = os && function(n) {
  return new Promise(function(t, e) {
    const r = vi(n);
    let s = r.data;
    const a = L.from(r.headers).normalize();
    let { responseType: o, onUploadProgress: c, onDownloadProgress: u } = r, l, f, g, P, m;
    function b() {
      P && P(), m && m(), r.cancelToken && r.cancelToken.unsubscribe(l), r.signal && r.signal.removeEventListener("abort", l);
    }
    let y = new XMLHttpRequest();
    y.open(r.method.toUpperCase(), r.url, !0), y.timeout = r.timeout;
    function C() {
      if (!y)
        return;
      const R = L.from(
        "getAllResponseHeaders" in y && y.getAllResponseHeaders()
      ), I = {
        data: !o || o === "text" || o === "json" ? y.responseText : y.response,
        status: y.status,
        statusText: y.statusText,
        headers: R,
        config: n,
        request: y
      };
      bi(function(M) {
        t(M), b();
      }, function(M) {
        e(M), b();
      }, I), y = null;
    }
    "onloadend" in y ? y.onloadend = C : y.onreadystatechange = function() {
      !y || y.readyState !== 4 || y.status === 0 && !(y.responseURL && y.responseURL.indexOf("file:") === 0) || setTimeout(C);
    }, y.onabort = function() {
      y && (e(new w("Request aborted", w.ECONNABORTED, n, y)), y = null);
    }, y.onerror = function() {
      e(new w("Network Error", w.ERR_NETWORK, n, y)), y = null;
    }, y.ontimeout = function() {
      let V = r.timeout ? "timeout of " + r.timeout + "ms exceeded" : "timeout exceeded";
      const I = r.transitional || gi;
      r.timeoutErrorMessage && (V = r.timeoutErrorMessage), e(new w(
        V,
        I.clarifyTimeoutError ? w.ETIMEDOUT : w.ECONNABORTED,
        n,
        y
      )), y = null;
    }, s === void 0 && a.setContentType(null), "setRequestHeader" in y && d.forEach(a.toJSON(), function(V, I) {
      y.setRequestHeader(I, V);
    }), d.isUndefined(r.withCredentials) || (y.withCredentials = !!r.withCredentials), o && o !== "json" && (y.responseType = r.responseType), u && ([g, m] = Ut(u, !0), y.addEventListener("progress", g)), c && y.upload && ([f, P] = Ut(c), y.upload.addEventListener("progress", f), y.upload.addEventListener("loadend", P)), (r.cancelToken || r.signal) && (l = (R) => {
      y && (e(!R || R.type ? new lt(null, n, y) : R), y.abort(), y = null);
    }, r.cancelToken && r.cancelToken.subscribe(l), r.signal && (r.signal.aborted ? l() : r.signal.addEventListener("abort", l)));
    const T = ts(r.url);
    if (T && B.protocols.indexOf(T) === -1) {
      e(new w("Unsupported protocol " + T + ":", w.ERR_BAD_REQUEST, n));
      return;
    }
    y.send(s || null);
  });
}, us = (n, i) => {
  const { length: t } = n = n ? n.filter(Boolean) : [];
  if (i || t) {
    let e = new AbortController(), r;
    const s = function(u) {
      if (!r) {
        r = !0, o();
        const l = u instanceof Error ? u : this.reason;
        e.abort(l instanceof w ? l : new lt(l instanceof Error ? l.message : l));
      }
    };
    let a = i && setTimeout(() => {
      a = null, s(new w(`timeout ${i} of ms exceeded`, w.ETIMEDOUT));
    }, i);
    const o = () => {
      n && (a && clearTimeout(a), a = null, n.forEach((u) => {
        u.unsubscribe ? u.unsubscribe(s) : u.removeEventListener("abort", s);
      }), n = null);
    };
    n.forEach((u) => u.addEventListener("abort", s));
    const { signal: c } = e;
    return c.unsubscribe = () => d.asap(o), c;
  }
}, hs = function* (n, i) {
  let t = n.byteLength;
  if (t < i) {
    yield n;
    return;
  }
  let e = 0, r;
  for (; e < t; )
    r = e + i, yield n.slice(e, r), e = r;
}, ls = async function* (n, i) {
  for await (const t of fs(n))
    yield* hs(t, i);
}, fs = async function* (n) {
  if (n[Symbol.asyncIterator]) {
    yield* n;
    return;
  }
  const i = n.getReader();
  try {
    for (; ; ) {
      const { done: t, value: e } = await i.read();
      if (t)
        break;
      yield e;
    }
  } finally {
    await i.cancel();
  }
}, $e = (n, i, t, e) => {
  const r = ls(n, i);
  let s = 0, a, o = (c) => {
    a || (a = !0, e && e(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: u, value: l } = await r.next();
        if (u) {
          o(), c.close();
          return;
        }
        let f = l.byteLength;
        if (t) {
          let g = s += f;
          t(g);
        }
        c.enqueue(new Uint8Array(l));
      } catch (u) {
        throw o(u), u;
      }
    },
    cancel(c) {
      return o(c), r.return();
    }
  }, {
    highWaterMark: 2
  });
}, Ht = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", wi = Ht && typeof ReadableStream == "function", ps = Ht && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((n) => (i) => n.encode(i))(new TextEncoder()) : async (n) => new Uint8Array(await new Response(n).arrayBuffer())), Ei = (n, ...i) => {
  try {
    return !!n(...i);
  } catch {
    return !1;
  }
}, ds = wi && Ei(() => {
  let n = !1;
  const i = new Request(B.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return n = !0, "half";
    }
  }).headers.has("Content-Type");
  return n && !i;
}), Je = 64 * 1024, re = wi && Ei(() => d.isReadableStream(new Response("").body)), Lt = {
  stream: re && ((n) => n.body)
};
Ht && ((n) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((i) => {
    !Lt[i] && (Lt[i] = d.isFunction(n[i]) ? (t) => t[i]() : (t, e) => {
      throw new w(`Response type '${i}' is not supported`, w.ERR_NOT_SUPPORT, e);
    });
  });
})(new Response());
const _s = async (n) => {
  if (n == null)
    return 0;
  if (d.isBlob(n))
    return n.size;
  if (d.isSpecCompliantForm(n))
    return (await new Request(B.origin, {
      method: "POST",
      body: n
    }).arrayBuffer()).byteLength;
  if (d.isArrayBufferView(n) || d.isArrayBuffer(n))
    return n.byteLength;
  if (d.isURLSearchParams(n) && (n = n + ""), d.isString(n))
    return (await ps(n)).byteLength;
}, gs = async (n, i) => {
  const t = d.toFiniteNumber(n.getContentLength());
  return t ?? _s(i);
}, ms = Ht && (async (n) => {
  let {
    url: i,
    method: t,
    data: e,
    signal: r,
    cancelToken: s,
    timeout: a,
    onDownloadProgress: o,
    onUploadProgress: c,
    responseType: u,
    headers: l,
    withCredentials: f = "same-origin",
    fetchOptions: g
  } = vi(n);
  u = u ? (u + "").toLowerCase() : "text";
  let P = us([r, s && s.toAbortSignal()], a), m;
  const b = P && P.unsubscribe && (() => {
    P.unsubscribe();
  });
  let y;
  try {
    if (c && ds && t !== "get" && t !== "head" && (y = await gs(l, e)) !== 0) {
      let I = new Request(i, {
        method: "POST",
        body: e,
        duplex: "half"
      }), v;
      if (d.isFormData(e) && (v = I.headers.get("content-type")) && l.setContentType(v), I.body) {
        const [M, W] = Xe(
          y,
          Ut(ze(c))
        );
        e = $e(I.body, Je, M, W);
      }
    }
    d.isString(f) || (f = f ? "include" : "omit");
    const C = "credentials" in Request.prototype;
    m = new Request(i, {
      ...g,
      signal: P,
      method: t.toUpperCase(),
      headers: l.normalize().toJSON(),
      body: e,
      duplex: "half",
      credentials: C ? f : void 0
    });
    let T = await fetch(m, g);
    const R = re && (u === "stream" || u === "response");
    if (re && (o || R && b)) {
      const I = {};
      ["status", "statusText", "headers"].forEach((X) => {
        I[X] = T[X];
      });
      const v = d.toFiniteNumber(T.headers.get("content-length")), [M, W] = o && Xe(
        v,
        Ut(ze(o), !0)
      ) || [];
      T = new Response(
        $e(T.body, Je, M, () => {
          W && W(), b && b();
        }),
        I
      );
    }
    u = u || "text";
    let V = await Lt[d.findKey(Lt, u) || "text"](T, n);
    return !R && b && b(), await new Promise((I, v) => {
      bi(I, v, {
        data: V,
        headers: L.from(T.headers),
        status: T.status,
        statusText: T.statusText,
        config: n,
        request: m
      });
    });
  } catch (C) {
    throw b && b(), C && C.name === "TypeError" && /Load failed|fetch/i.test(C.message) ? Object.assign(
      new w("Network Error", w.ERR_NETWORK, n, m),
      {
        cause: C.cause || C
      }
    ) : w.from(C, C && C.code, n, m);
  }
}), se = {
  http: Ir,
  xhr: cs,
  fetch: ms
};
d.forEach(se, (n, i) => {
  if (n) {
    try {
      Object.defineProperty(n, "name", { value: i });
    } catch {
    }
    Object.defineProperty(n, "adapterName", { value: i });
  }
});
const Qe = (n) => `- ${n}`, ys = (n) => d.isFunction(n) || n === null || n === !1, Si = {
  getAdapter: (n) => {
    n = d.isArray(n) ? n : [n];
    const { length: i } = n;
    let t, e;
    const r = {};
    for (let s = 0; s < i; s++) {
      t = n[s];
      let a;
      if (e = t, !ys(t) && (e = se[(a = String(t)).toLowerCase()], e === void 0))
        throw new w(`Unknown adapter '${a}'`);
      if (e)
        break;
      r[a || "#" + s] = e;
    }
    if (!e) {
      const s = Object.entries(r).map(
        ([o, c]) => `adapter ${o} ` + (c === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let a = i ? s.length > 1 ? `since :
` + s.map(Qe).join(`
`) : " " + Qe(s[0]) : "as no adapter specified";
      throw new w(
        "There is no suitable adapter to dispatch the request " + a,
        "ERR_NOT_SUPPORT"
      );
    }
    return e;
  },
  adapters: se
};
function Zt(n) {
  if (n.cancelToken && n.cancelToken.throwIfRequested(), n.signal && n.signal.aborted)
    throw new lt(null, n);
}
function Ze(n) {
  return Zt(n), n.headers = L.from(n.headers), n.data = Qt.call(
    n,
    n.transformRequest
  ), ["post", "put", "patch"].indexOf(n.method) !== -1 && n.headers.setContentType("application/x-www-form-urlencoded", !1), Si.getAdapter(n.adapter || vt.adapter)(n).then(function(e) {
    return Zt(n), e.data = Qt.call(
      n,
      n.transformResponse,
      e
    ), e.headers = L.from(e.headers), e;
  }, function(e) {
    return yi(e) || (Zt(n), e && e.response && (e.response.data = Qt.call(
      n,
      n.transformResponse,
      e.response
    ), e.response.headers = L.from(e.response.headers))), Promise.reject(e);
  });
}
const Ti = "1.10.0", Wt = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((n, i) => {
  Wt[n] = function(e) {
    return typeof e === n || "a" + (i < 1 ? "n " : " ") + n;
  };
});
const Ye = {};
Wt.transitional = function(i, t, e) {
  function r(s, a) {
    return "[Axios v" + Ti + "] Transitional option '" + s + "'" + a + (e ? ". " + e : "");
  }
  return (s, a, o) => {
    if (i === !1)
      throw new w(
        r(a, " has been removed" + (t ? " in " + t : "")),
        w.ERR_DEPRECATED
      );
    return t && !Ye[a] && (Ye[a] = !0, console.warn(
      r(
        a,
        " has been deprecated since v" + t + " and will be removed in the near future"
      )
    )), i ? i(s, a, o) : !0;
  };
};
Wt.spelling = function(i) {
  return (t, e) => (console.warn(`${e} is likely a misspelling of ${i}`), !0);
};
function bs(n, i, t) {
  if (typeof n != "object")
    throw new w("options must be an object", w.ERR_BAD_OPTION_VALUE);
  const e = Object.keys(n);
  let r = e.length;
  for (; r-- > 0; ) {
    const s = e[r], a = i[s];
    if (a) {
      const o = n[s], c = o === void 0 || a(o, s, n);
      if (c !== !0)
        throw new w("option " + s + " must be " + c, w.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (t !== !0)
      throw new w("Unknown option " + s, w.ERR_BAD_OPTION);
  }
}
const It = {
  assertOptions: bs,
  validators: Wt
}, z = It.validators;
let it = class {
  constructor(i) {
    this.defaults = i || {}, this.interceptors = {
      request: new He(),
      response: new He()
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
  async request(i, t) {
    try {
      return await this._request(i, t);
    } catch (e) {
      if (e instanceof Error) {
        let r = {};
        Error.captureStackTrace ? Error.captureStackTrace(r) : r = new Error();
        const s = r.stack ? r.stack.replace(/^.+\n/, "") : "";
        try {
          e.stack ? s && !String(e.stack).endsWith(s.replace(/^.+\n.+\n/, "")) && (e.stack += `
` + s) : e.stack = s;
        } catch {
        }
      }
      throw e;
    }
  }
  _request(i, t) {
    typeof i == "string" ? (t = t || {}, t.url = i) : t = i || {}, t = nt(this.defaults, t);
    const { transitional: e, paramsSerializer: r, headers: s } = t;
    e !== void 0 && It.assertOptions(e, {
      silentJSONParsing: z.transitional(z.boolean),
      forcedJSONParsing: z.transitional(z.boolean),
      clarifyTimeoutError: z.transitional(z.boolean)
    }, !1), r != null && (d.isFunction(r) ? t.paramsSerializer = {
      serialize: r
    } : It.assertOptions(r, {
      encode: z.function,
      serialize: z.function
    }, !0)), t.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : t.allowAbsoluteUrls = !0), It.assertOptions(t, {
      baseUrl: z.spelling("baseURL"),
      withXsrfToken: z.spelling("withXSRFToken")
    }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
    let a = s && d.merge(
      s.common,
      s[t.method]
    );
    s && d.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete s[m];
      }
    ), t.headers = L.concat(a, s);
    const o = [];
    let c = !0;
    this.interceptors.request.forEach(function(b) {
      typeof b.runWhen == "function" && b.runWhen(t) === !1 || (c = c && b.synchronous, o.unshift(b.fulfilled, b.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function(b) {
      u.push(b.fulfilled, b.rejected);
    });
    let l, f = 0, g;
    if (!c) {
      const m = [Ze.bind(this), void 0];
      for (m.unshift.apply(m, o), m.push.apply(m, u), g = m.length, l = Promise.resolve(t); f < g; )
        l = l.then(m[f++], m[f++]);
      return l;
    }
    g = o.length;
    let P = t;
    for (f = 0; f < g; ) {
      const m = o[f++], b = o[f++];
      try {
        P = m(P);
      } catch (y) {
        b.call(this, y);
        break;
      }
    }
    try {
      l = Ze.call(this, P);
    } catch (m) {
      return Promise.reject(m);
    }
    for (f = 0, g = u.length; f < g; )
      l = l.then(u[f++], u[f++]);
    return l;
  }
  getUri(i) {
    i = nt(this.defaults, i);
    const t = Pi(i.baseURL, i.url, i.allowAbsoluteUrls);
    return _i(t, i.params, i.paramsSerializer);
  }
};
d.forEach(["delete", "get", "head", "options"], function(i) {
  it.prototype[i] = function(t, e) {
    return this.request(nt(e || {}, {
      method: i,
      url: t,
      data: (e || {}).data
    }));
  };
});
d.forEach(["post", "put", "patch"], function(i) {
  function t(e) {
    return function(s, a, o) {
      return this.request(nt(o || {}, {
        method: i,
        headers: e ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: s,
        data: a
      }));
    };
  }
  it.prototype[i] = t(), it.prototype[i + "Form"] = t(!0);
});
let Ps = class Ci {
  constructor(i) {
    if (typeof i != "function")
      throw new TypeError("executor must be a function.");
    let t;
    this.promise = new Promise(function(s) {
      t = s;
    });
    const e = this;
    this.promise.then((r) => {
      if (!e._listeners) return;
      let s = e._listeners.length;
      for (; s-- > 0; )
        e._listeners[s](r);
      e._listeners = null;
    }), this.promise.then = (r) => {
      let s;
      const a = new Promise((o) => {
        e.subscribe(o), s = o;
      }).then(r);
      return a.cancel = function() {
        e.unsubscribe(s);
      }, a;
    }, i(function(s, a, o) {
      e.reason || (e.reason = new lt(s, a, o), t(e.reason));
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
  subscribe(i) {
    if (this.reason) {
      i(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(i) : this._listeners = [i];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(i) {
    if (!this._listeners)
      return;
    const t = this._listeners.indexOf(i);
    t !== -1 && this._listeners.splice(t, 1);
  }
  toAbortSignal() {
    const i = new AbortController(), t = (e) => {
      i.abort(e);
    };
    return this.subscribe(t), i.signal.unsubscribe = () => this.unsubscribe(t), i.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let i;
    return {
      token: new Ci(function(r) {
        i = r;
      }),
      cancel: i
    };
  }
};
function vs(n) {
  return function(t) {
    return n.apply(null, t);
  };
}
function ws(n) {
  return d.isObject(n) && n.isAxiosError === !0;
}
const ae = {
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
Object.entries(ae).forEach(([n, i]) => {
  ae[i] = n;
});
function Ai(n) {
  const i = new it(n), t = ni(it.prototype.request, i);
  return d.extend(t, it.prototype, i, { allOwnKeys: !0 }), d.extend(t, i, null, { allOwnKeys: !0 }), t.create = function(r) {
    return Ai(nt(n, r));
  }, t;
}
const A = Ai(vt);
A.Axios = it;
A.CanceledError = lt;
A.CancelToken = Ps;
A.isCancel = yi;
A.VERSION = Ti;
A.toFormData = Kt;
A.AxiosError = w;
A.Cancel = A.CanceledError;
A.all = function(i) {
  return Promise.all(i);
};
A.spread = vs;
A.isAxiosError = ws;
A.mergeConfig = nt;
A.AxiosHeaders = L;
A.formToJSON = (n) => mi(d.isHTMLForm(n) ? new FormData(n) : n);
A.getAdapter = Si.getAdapter;
A.HttpStatusCode = ae;
A.default = A;
const {
  Axios: As,
  AxiosError: Rs,
  CanceledError: Os,
  isCancel: xs,
  CancelToken: Ds,
  VERSION: Is,
  all: Bs,
  Cancel: Ns,
  isAxiosError: Vs,
  spread: Us,
  toFormData: Ls,
  AxiosHeaders: Ms,
  HttpStatusCode: ks,
  formToJSON: Fs,
  getAdapter: js,
  mergeConfig: qs
} = A;
var h, Ri, Oi, xi, oe, Di, Ii, Bi, Ni, Vi, Ui, Li, Mi, ki, Fi, dt, _t, ji, gt, qi, tt, Ki, D, Hi, Wi, ce, Xi, zi, Gi, ue, he, mt, le, $i, j, q, Bt, fe, yt, pe, de, Ji, _e, ge, Qi, Zi, ot, me, Yi, tn, en, Nt, nn, rn, ye, sn, an, on, cn, un, hn, ln, fn, pn, be, Pe, dn, _n, gn;
class Ks extends vn {
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
    no_device: r = 1,
    device_listen_on_channel: s = 1,
    username: a = null,
    password: o = null,
    environment: c = "production"
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
    environment: "production"
  }) {
    super({ filters: t, config_port: e, no_device: r, device_listen_on_channel: s });
    Ae(this, h);
    Ce(this, "__pinPad__", {
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
        amount: 0,
        reference: null,
        folio: null,
        authorization: null,
        errors: 0,
        last_error: null,
        commerceVoucher: "",
        clientVoucher: "",
        consultDate: null,
        ignore: { counter: !1, counterSale: !1, isError92TRX: !1, C93Global: !1, error: "" },
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
        statusSecondGenerateWaiting: null
      }
    });
    if (this.__internal__.device.type = "pinpad", !wn())
      throw new Error("Crypto not supported in this browser");
    if (Re.getCustom(this.typeDevice, r))
      throw new Error(`Device ${this.typeDevice} ${r} already exists`);
    this.__internal__.time.response_connection = 3e3, this.__internal__.time.response_general = 5e3, this.__internal__.serial.delay_first_connection = 1e3, this.environment = c, a && (this.username = a), o && (this.password = o), p(this, h, Oi).call(this), p(this, h, Ri).call(this);
  }
  async timeout(t, e) {
    await super.timeout(t, e), this.__pinPad__.waiting.statusAboutWaiting && e === "about" ? this.__pinPad__.waiting.statusAboutWaiting = "rejected" : this.__pinPad__.waiting.statusInjectWaiting && e === "inject" ? this.__pinPad__.waiting.statusInjectWaiting = "rejected" : this.__pinPad__.waiting.statusinitDUKPTWaiting && e === "init-dukpt" ? this.__pinPad__.waiting.statusinitDUKPTWaiting = "rejected" : this.__pinPad__.waiting.statuswritingDUKPTWaiting && e === "dukpt" ? this.__pinPad__.waiting.statuswritingDUKPTWaiting = "rejected" : this.__pinPad__.waiting.statusReadCardWaiting && e === "read-card" ? this.__pinPad__.waiting.statusReadCardWaiting = "rejected" : this.__pinPad__.waiting.statusSecondGenerateWaiting && e === "second-generate" && (this.__pinPad__.waiting.statusSecondGenerateWaiting = "rejected");
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
    }, r = this.parseHexToUint8(t), s = this.parseUint8ArrayToString(r);
    let a = p(this, h, xi).call(this, s);
    switch (this.__pinPad__.buffer = s, e.parsed = a, e.code = s, e.request) {
      case "connect":
        e.name = "connected", e.description = "Connection established", e.no_code = 100, p(this, h, oe).call(this, a, s);
        break;
      case "about":
        e.name = "About PinPad", e.description = "Response of about", e.no_code = 101, p(this, h, oe).call(this, a, s);
        break;
      case "inject":
        e.name = "Inject", e.description = "Response of inject values", e.no_code = 102, p(this, h, Di).call(this, a, s);
        break;
      case "init-dukpt":
        e.name = "Init DUKPT", e.description = "Response of init DUKPT", e.no_code = 103, p(this, h, Ii).call(this, a, s);
        break;
      case "dukpt":
        e.name = "Write DUKPT", e.description = "Response of write DUKPT", e.no_code = 104, p(this, h, Bi).call(this, a, s);
        break;
      case "read-card":
        e.name = "read card", e.description = "response of read card", e.no_code = 105, p(this, h, Ni).call(this, a, s);
        break;
      case "second-generate":
        e.name = "second generate", e.description = "response of second generate", e.no_code = 106, p(this, h, Vi).call(this, a, s);
        break;
      case "cancel":
        e.name = "cancel pinpad", e.description = "response of cancel", e.no_code = 107;
        break;
      case "print":
        p(this, h, Mi).call(this, a, s), e.name = "print voucher", e.description = "response of print", e.no_code = 108;
        break;
      case "cancel-read-card":
        p(this, h, Li).call(this, a, s), e.name = "cancel read card", e.description = "response of cancel read card", e.no_code = 109;
        break;
      case "code93":
        p(this, h, ki).call(this, a, s), e.name = "code 93", e.description = "response of code 93", e.no_code = 110;
        break;
      case "finish-emv-end":
        p(this, h, Fi).call(this, a, s), e.name = "Finish EMV End", e.description = "response of finish EMV End", e.no_code = 111;
        break;
      default:
        e.name = "unknown", e.description = "Unknown command", e.no_code = 400;
        break;
    }
    this.dispatch("serial:message", e);
  }
  // eslint-disable-next-line no-unused-vars
  serialSetConnectionConstant(t = 1) {
    const e = "", r = "";
    let s = "C56AABOUT";
    s = e + s.length.toString().padStart(3, "0") + s + r;
    let a = 0;
    for (let c = 0; c < s.length; c++)
      a ^= s.charCodeAt(c);
    s = s + String.fromCharCode(a);
    const o = this.parseStringToBytes(s, "");
    return this.add0x(o);
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
    if (!p(this, h, le).call(this, t.trim())) throw new Error("Invalid reference");
    this.__pinPad__.operation.reference = t.trim().toString().replaceAll(" ", "").toUpperCase();
  }
  get reference() {
    return this.__pinPad__.operation.reference;
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
  async login({ force: t = !1 } = {}) {
    return await p(this, h, Wi).call(this, t);
  }
  clearSession() {
    localStorage.removeItem("ppLoginResponse"), localStorage.removeItem("ppRSAKey"), localStorage.removeItem("ppPublicIP");
  }
  async checkPositionPermission() {
    if (!Oe())
      throw new Error("Geolocation not supported");
    return new Promise((t, e) => {
      navigator.permissions.query({ name: "geolocation" }).then((r) => {
        r.state === "granted" ? t(!0) : t(!1);
      }).catch(() => e(!1));
    });
  }
  async cancelReadCard() {
    let t = "012VXVCANCELl";
    this.__pinPad__.about.model.toLowerCase() === "ingenico" && (t = "029C50AOPERACION       CANCELADA");
    const e = this.parseStringToBytes(t, "");
    await this.appendToQueue(e, "cancel-read-card");
  }
  async print(t = "client") {
    this.__pinPad__.operation.errors = 0;
    const e = this.__pinPad__.constants.STX, r = this.__pinPad__.constants.ETX;
    this.__pinPad__.operation.commerceVoucher.includes(":") || (this.__pinPad__.operation.commerceVoucher = p(this, h, tt).call(this, this.__pinPad__.config.RC4Key, this.__pinPad__.operation.commerceVoucher)), this.__pinPad__.operation.clientVoucher.includes(":") || (this.__pinPad__.operation.clientVoucher = p(this, h, tt).call(this, this.__pinPad__.config.RC4Key, this.__pinPad__.operation.clientVoucher));
    let s = t === "client" ? this.__pinPad__.operation.clientVoucher : this.__pinPad__.operation.commerceVoucher;
    if (s.length === 0) {
      this.dispatch("pp:print", {
        error: !0,
        code: "001",
        message: "Without information to print"
      });
      return;
    }
    s = p(this, h, Ki).call(this, s), s = p(this, h, Hi).call(this, s, this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion);
    let a = "C59A" + s;
    a = e + p(this, h, j).call(this, a) + a + r, a = a + p(this, h, q).call(this, a), t === "client" ? this.__pinPad__.operation.clientVoucher = "" : t === "commerce" && (this.__pinPad__.operation.commerceVoucher = "");
    const o = this.parseStringToBytes(a, "");
    await this.appendToQueue(o, "print");
  }
  getClientVoucher() {
    return this.__pinPad__.operation.clientVoucher;
  }
  getCommerceVoucher() {
    return this.__pinPad__.operation.commerceVoucher;
  }
  /**
   * @param {null|string} reference
   * @return {Promise<any>}
   */
  async consult({ reference: t = null }) {
    return t || (t = this.reference), G(t) && (t = "--", this.reference = t), p(this, h, $i).call(this, this.reference), this.__pinPad__.operation.consultDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB"), await p(this, h, yt).call(this, {
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      Tx_Date: this.__pinPad__.operation.consultDate
    }), p(this, h, ot).call(this, this.url + this.__pinPad__.constants.uris.consult, {
      user: this.username.toUpperCase(),
      pwd: this.password.toUpperCase(),
      id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
      id_company: this.__pinPad__.config.idCompany.toUpperCase(),
      date: this.__pinPad__.operation.consultDate,
      reference: this.reference
    });
  }
  /**
   * @param {number|string|null} folio
   * @return {Promise<any>}
   */
  async rePrint({ folio: t = null } = {}) {
    t === null && (t = this.__pinPad__.operation.folio || ""), p(this, h, pe).call(this, t), await p(this, h, yt).call(this, {
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      Tx_OperationNumber: t
    });
    const e = await p(this, h, ot).call(this, this.url + this.__pinPad__.constants.uris.rePrint, {
      REPRINTVOUCHER: {
        business: {
          country: this.__pinPad__.config.country.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany.toUpperCase(),
          pwd: this.password.toUpperCase(),
          user: this.username.toUpperCase()
        },
        no_operacion: t,
        crypto: "2"
      }
    });
    let r = e.voucher_comercio;
    return this.__pinPad__.operation.commerceVoucher = "", r && (e.voucher_comercio.includes(":") ? this.__pinPad__.operation.commerceVoucher = e.voucher_comercio : this.__pinPad__.operation.commerceVoucher = p(this, h, tt).call(this, this.__pinPad__.config.RC4Key, e.voucher_comercio)), r = e.voucher_cliente, this.__pinPad__.operation.clientVoucher = "", r && (e.voucher_cliente.includes(":") ? this.__pinPad__.operation.clientVoucher = e.voucher_cliente : this.__pinPad__.operation.clientVoucher = p(this, h, tt).call(this, this.__pinPad__.config.RC4Key, e.voucher_cliente)), e;
  }
  async cancelPurchase({ amount: t = 0, authorization: e = "", folio: r = "" } = {}) {
    if (!p(this, h, fe).call(this, t)) throw new Error("Invalid amount");
    if (!p(this, h, un).call(this, e)) throw new Error("Invalid authorization");
    if (!p(this, h, pe).call(this, r)) throw new Error("Invalid folio");
    t = p(this, h, ye).call(this, t, 2);
    const s = {
      Ambiente: this.environment,
      User: this.username,
      Pwd: this.password,
      IdBranch: this.__pinPad__.config.idBranch,
      IdCompany: this.__pinPad__.config.idCompany,
      Country: this.__pinPad__.config.country,
      UserTRX: "userPinpadWeb",
      Tx_OperationNumber: r,
      Tx_Auth: e,
      Amount: t
    };
    await p(this, h, yt).call(this, s);
    const a = p(this, h, ot).call(this, this.url + this.__pinPad__.constants.uris.cancellation, {
      VMCAMEXMCANCELACION: {
        business: {
          country: this.__pinPad__.config.country.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany.toUpperCase(),
          pwd: this.password.toUpperCase(),
          user: this.username.toUpperCase()
        },
        transacction: {
          amount: t,
          auth: e.toUpperCase(),
          crypto: "2",
          no_operacion: r,
          usrtransacction: this.username.toUpperCase(),
          version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion
        }
      }
    });
    return this.__pinPad__.operation.commerceVoucher = "", a.voucher_comercio && (a.voucher_comercio.includes(":") ? this.__pinPad__.operation.commerceVoucher = a.voucher_comercio : this.__pinPad__.operation.commerceVoucher = p(this, h, tt).call(this, this.__pinPad__.config.RC4Key, a.voucher_comercio)), this.__pinPad__.operation.clientVoucher = "", a.voucher_cliente && (a.voucher_cliente.includes(":") ? this.__pinPad__.operation.clientVoucher = a.voucher_cliente : this.__pinPad__.operation.clientVoucher = p(this, h, tt).call(this, this.__pinPad__.config.RC4Key, a.voucher_cliente)), JSON.stringify(a);
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
    if (this.amount = t, !e || G(e) || !p(this, h, le).call(this, e))
      throw new Error("Reference is required and must be alphanumeric");
    if (this.reference = e, /^[A-Z-a-z\s]+$/g.test(this.__pinPad__.config.currency) === !1)
      throw new Error("Invalid currency");
    let r = {
      error: !1,
      message: null,
      approved: !1,
      object: {}
    };
    try {
      return await this.login(), await p(this, h, rn).call(this), !await p(this, h, sn).call(this) || !await p(this, h, tn).call(this) ? r : await p(this, h, ln).call(this);
    } catch (s) {
      console.warn(s), r.error = !0, r.message = s.message, r.approved = !1, r.object = s;
    }
    return r;
  }
}
h = new WeakSet(), Ri = function() {
  Re.add(this);
}, Oi = function() {
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
}, xi = function(t) {
  const e = this.__pinPad__.constants.STX, r = this.__pinPad__.constants.ETX, s = this.__pinPad__.constants.FS, a = this.__pinPad__.constants.getNULL;
  t = t.replace(new RegExp(e, "g"), "");
  const o = t.split(r);
  t = o[0];
  const c = t.split(s);
  c.push(...o[1].split(s));
  const u = {};
  return c.map((l, f) => {
    const g = f > 0 ? l.substring(0, 1) : "A", P = f > 0 ? l.substring(1) : l;
    return { [g]: P.replace(new RegExp(a, "g"), "") };
  }).forEach((l) => Object.assign(u, l)), u;
}, oe = function(t, e) {
  const r = this.__pinPad__.constants.ETX, s = e.substring(e.indexOf("D") + 2, e.indexOf("E"));
  let a = 0;
  const o = e.indexOf("N") > 0, c = e.substring(e.indexOf("A00") + 3, e.indexOf("B"));
  if (c && c !== "undefined" && c.toUpperCase() === "VERIFONE") {
    const l = s.replace("MITP_1.00.", "").replace("MITP_01.00.", "").replace("MITD_1.00.", "").replace("MITD_01.00.", "");
    a = parseInt(l), a >= 15 && (this.__pinPad__.about.hasCashback = !0);
  }
  this.__pinPad__.about.supportInjection = o, e.indexOf("M") > 0 ? (this.__pinPad__.about.supportSign = e.substring(e.indexOf("L") + 2, e.indexOf("M")), this.__pinPad__.about.supportInjection ? this.__pinPad__.about.supportContactlessCollisionCard = e.substring(
    e.indexOf("M") + 2,
    e.indexOf("N")
  ) : (this.__pinPad__.about.supportContactlessCollisionCard = e.substring(
    e.indexOf("M") + 2,
    e.indexOf(r)
  ), this.__pinPad__.about.supportContactless = !0)) : (this.__pinPad__.about.supportSign = e.substring(e.indexOf("L") + 2, e.indexOf(r)), this.__pinPad__.about.supportContactless = !1), this.__pinPad__.about.supportDUKPT = e.substring(e.indexOf("J") + 2, e.indexOf("K")), this.__pinPad__.about.EMV = e.substring(e.indexOf("E") + 2, e.indexOf("F")), this.__pinPad__.about.serial = e.substring(e.indexOf("C") + 2, e.indexOf("D")), this.__pinPad__.about.printer = e.substring(e.indexOf("F") + 2, e.indexOf("G")), this.__pinPad__.about.model = e.substring(e.indexOf("B") + 2, e.indexOf("C")), this.__pinPad__.about.brand = c, this.__pinPad__.about.appVersion = s;
  const u = e.substring(e.indexOf("K") + 2, e.indexOf("L"));
  this.__pinPad__.about.pp = {
    brand: c,
    appVersion: s,
    versionInt: a,
    hasCashback: this.__pinPad__.about.hasCashback,
    supportInjection: this.__pinPad__.about.supportInjection,
    supportSign: this.__pinPad__.about.supportSign,
    supportContactlessCollisionCard: this.__pinPad__.about.supportContactlessCollisionCard,
    supportContactless: this.__pinPad__.about.supportContactless,
    supportDUKPT: this.__pinPad__.about.supportDUKPT,
    hasDUKPTKeys: u,
    EMV: this.__pinPad__.about.EMV,
    serial: this.__pinPad__.about.serial,
    printer: this.__pinPad__.about.printer,
    model: this.__pinPad__.about.model
  }, this.__pinPad__.waiting.statusAboutWaiting && (this.__pinPad__.waiting.statusAboutWaiting = "resolved");
}, // eslint-disable-next-line no-unused-vars
Di = function(t, e) {
  this.__pinPad__.waiting.statusInjectWaiting = "resolved";
}, Ii = function(t, e) {
  e = e.replace("010P93A00B01t036P81AACERQUE, INSERTE CHIP O  DESLICE*", ""), this.__pinPad__.config.terminal = {
    nb_kcv: e.substring(e.indexOf("E") + 2, e.indexOf("F")),
    nb_marca_terminal: e.substring(e.indexOf("P91A") + 4, e.indexOf("B")),
    nb_modelo_terminal: e.substring(e.indexOf("B") + 2, e.indexOf("C")),
    nb_serie_lector: e.substring(e.indexOf("C") + 2, e.indexOf("D")),
    nb_tk: e.substring(e.indexOf("F") + 2, e.length - 2),
    nb_version_terminal: e.substring(e.indexOf("D") + 2, e.indexOf("E"))
  }, this.__pinPad__.waiting.statusinitDUKPTWaiting = "resolved";
}, // eslint-disable-next-line no-unused-vars
Bi = function(t, e) {
  this.__pinPad__.waiting.statuswritingDUKPTWaiting = "resolved";
}, Ni = function(t, e) {
  const r = this.__pinPad__.about.brand.toLowerCase(), s = this.__pinPad__.about.model.toLowerCase(), a = r === "ingenico" && s === "ipp320" ? 500 : 350;
  if (e.length < a) {
    e = e.replace("006P93A00.", "").replace("006P93A00,", ""), e.includes("E93") ? this.__pinPad__.operation.ignore.error = e.substring(e.indexOf("E93") + 3, e.indexOf("E93") + 6) : e.includes("E71") && (this.__pinPad__.operation.ignore.error = e.substring(e.indexOf("E71") + 3, e.indexOf("E71") + 6)), this.__pinPad__.operation.ignore.error !== "" && e.indexOf("OPERACION       CANCELADA") === -1 && e.indexOf("TIEMPO         EXCEDIDO") === -1 && this.__pinPad__.operation.ignore.error.length === 3 && (this.__pinPad__.operation.last_error = p(this, h, Pe).call(this, this.__pinPad__.operation.ignore.error), this.__pinPad__.waiting.statusReadCardWaiting = "rejected");
    return;
  }
  if (e.includes("M1") || e.includes("M0") || e.includes("M1") || e.includes("N1") || e.includes("N1") || e.includes("P93A022") && e.substring(e.length - 24).includes("I") && e.substring(e.length - 1).includes("") || e.includes("P93A800") && e.substring(e.length - 24).includes("I") && e.substring(e.length - 1).includes("") || e.includes("P93A022") && e.length >= 406 && s === "vx820" || e.includes("P93A022") && e.length >= 406 && s === "vx520" || e.includes("P93A800") && e.length >= 406 && s === "vx520" || e.includes("P93A800") && e.length >= 406 && s === "vx820" || e.includes("P93A022") && e.length >= 406 && s === "p400" || e.includes("P93A800") && e.length >= 406 && s === "p400" || e.includes("P93A022") && e.length >= 406 && s === "v205c" || e.includes("P93A800") && e.length >= 406 && s === "v205c" || e.includes("P93A022") && e.length >= 406 && s === "move2500" || e.includes("P93A800") && e.length >= 406 && s === "move2500" || e.includes("P93A022") && e.length >= 406 && s === "lane3000" || e.includes("P93A800") && e.length >= 406 && s === "lane3000") {
    let o = e;
    r === "verifone" && (o = e.replace("006P93A00.", "").substring(e.indexOf("P93A"), e.indexOf("P93A") + 7)), e.includes("P81APROCESANDO, NO RETIRE TARJETA") || e.includes("P81APROCESANDO TARJETA") || o.includes("P93A022") || o.includes("P81AINSERTE CHIP O  DESLICE TARJETA") || o.includes("ACERQUE, INSERTE CHIP O  DESLICE") || o.includes("P81AACERQUE, INSERTE CHIP O  DESLICE TARJETA") ? this.dispatch("pp:processing-card", { waiting: !0 }) : e.length > a && p(this, h, Ui).call(this, e);
  }
}, Vi = function(t, e) {
  const r = this.__pinPad__.constants.ETX;
  let s = e.replace("023P81AFAVOR RETIRAR TARJ.", "").replace("020P81A DECLINADA EMV  ", "").replace("020P81A DECLINADA EMV  ", "");
  s = s.substring(s.indexOf("B") + 2, s.indexOf(r)), s.includes("006E93A16") && (s = "01"), this.__pinPad__.operation.applyReverse = s === "01" && this.__pinPad__.operation.responseMit._approved && this.__pinPad__.config.otherLogin.executeReverse === "1", this.__pinPad__.waiting.statusSecondGenerateWaiting = "resolved";
}, Ui = function(t) {
  const e = this.__pinPad__.constants.ETX, r = this.__pinPad__.about.brand.toLowerCase();
  let s, a, o, c, u;
  r === "verifone" ? t = t.replace("006P93A00.", "").replace("009P93A00", "").replace("010P93A00B01v", "") : t = t.replace("006P93A00,", ""), this.__pinPad__.config.read.POSEM = t.substring(t.indexOf("P93A") + 4, t.indexOf("B"));
  const l = this.__pinPad__.config.read.POSEM;
  if (l === "051" || l === "071") {
    if (this.__pinPad__.config.read.Chip = "1", this.__pinPad__.config.read.PIN = t.substring(t.indexOf("C") + 2, t.indexOf("D")), this.__pinPad__.config.read.AppId = t.substring(t.indexOf("G") + 2, t.indexOf("H")), this.__pinPad__.config.read.AppIdLabel = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.Arqc = t.substring(t.indexOf("F") + 2, t.indexOf("G")), t.includes("O")) {
      const f = t.substring(t.indexOf("P93A"));
      this.__pinPad__.config.read.ReadCTLS = f.substring(
        f.indexOf("M") + 2,
        f.indexOf("N")
      ), this.__pinPad__.operation.hasQPS = f.substring(f.indexOf("N") + 2, f.indexOf("O")) === "1", this.__pinPad__.operation.bin8 = f.substring(f.indexOf("O") + 2, f.indexOf(e));
    } else if (t.includes("N")) {
      const f = t.substring(t.indexOf("P93A"));
      this.__pinPad__.config.read.ReadCTLS = f.substring(
        f.indexOf("M") + 2,
        f.indexOf("N")
      ), this.__pinPad__.operation.hasQPS = f.substring(f.indexOf("N") + 2, f.indexOf(e)) === "1";
    } else {
      const f = t.substring(t.indexOf("P93A"), t.indexOf("M") + 5);
      this.__pinPad__.config.read.ReadCTLS = f.substring(f.indexOf("M") + 2, f.indexOf(e)), this.__pinPad__.operation.hasQPS = !1;
    }
    this.__pinPad__.config.read.Tags = t.substring(t.indexOf("B") + 2, t.indexOf("C")), this.__pinPad__.config.read.NB_ksn = t.substring(t.indexOf("K") + 2, t.indexOf("M")), this.__pinPad__.config.read.NB_Data = t.substring(t.indexOf("D") + 2, t.indexOf("E")), a = t.substring(t.indexOf("I") + 2, t.indexOf("J")), o = t.substring(t.indexOf("E") + 2, t.indexOf("F")), this.__pinPad__.config.read.ChipName = o, s = t.substring(t.indexOf("J") + 2, t.indexOf("K"));
  } else {
    let f;
    if (this.__pinPad__.config.read.Chip = "0", this.__pinPad__.config.read.PIN = "", this.__pinPad__.config.read.AppId = "", this.__pinPad__.config.read.Arqc = "", this.__pinPad__.config.read.ReadCTLS = "0", this.__pinPad__.config.read.AppIdLabel = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.Tags = t.substring(t.indexOf("B") + 2, t.indexOf("C")), l === "022")
      if (t.includes("O")) {
        const g = t.substring(t.indexOf("P93A"));
        this.__pinPad__.operation.bin8 = g.substring(g.indexOf("O") + 2, g.indexOf(e)), f = t.substring(t.indexOf("P93A022"), t.indexOf("I") + 23), f = f.substring(f.indexOf("I") + 2, f.lastIndexOf(""));
      } else
        f = t.substring(t.indexOf("P93A022"), t.indexOf("I") + 23), f = f.substring(f.indexOf("I") + 2, f.indexOf(e));
    else
      f = t.substring(t.indexOf("P93A800"), t.indexOf("I") + 23), f = f.substring(f.indexOf("I") + 2, f.indexOf(e));
    this.__pinPad__.config.read.NB_ksn = f, this.__pinPad__.config.read.NB_Data = t.substring(t.indexOf("B") + 2, t.indexOf("C")), a = t.substring(t.indexOf("F") + 2, t.indexOf("G")), s = t.substring(t.indexOf("G") + 2, t.indexOf("H")), this.__pinPad__.about.model.toLowerCase() === "vx520" ? (o = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.ChipName = o) : (o = t.substring(t.indexOf("H") + 2, t.indexOf("I")), this.__pinPad__.config.read.ChipName = o);
  }
  s.includes("/") && (s = s.replace("/", "")), s.toString().length === 4 ? (u = s.toString().substring(0, 2), c = s.toString().substring(2)) : (u = "", c = ""), this.__pinPad__.config.read.Chip === "1" ? (this.__pinPad__.config.read.EMV = "3", this.__pinPad__.config.read.ChipNameEnc = "1") : (this.__pinPad__.config.read.ChipNameEnc = "", this.__pinPad__.config.read.EMV = "2"), this.__pinPad__.config.read.AppIdLabel.toLowerCase().includes("american") || this.__pinPad__.config.read.AppIdLabel.toLowerCase().includes("amex") ? this.__pinPad__.config.read.Type = "AMEX" : this.__pinPad__.config.read.Type = "V/MC", this.__pinPad__.operation.bin = a, a.length > 6 && (this.__pinPad__.operation.bin = a.substring(0, 6)), this.__pinPad__.waiting.statusReadCardWaiting = "resolved", this.dispatch("pp:read-card", {
    ERROR: "",
    maskPan: a,
    name: o,
    month: u,
    year: c
  });
}, Li = function(t, e) {
  e.length > 10 && e.includes("E93A10") && (this.__pinPad__.waiting.statusReadCardWaiting === "pending" && (this.__pinPad__.waiting.statusReadCardWaiting = "rejected"), this.dispatch("pp:error", { message: "Operation cancelled by user." }));
}, Mi = function(t, e) {
  const r = this;
  if (this.__pinPad__.about.model.toLowerCase() === "vx520") {
    if (e.length > 11)
      if (e.includes("P59A00"))
        this.__pinPad__.operation.clientVoucher !== "" ? setTimeout(function() {
          r.print("client").then(() => {
          }).catch((s) => {
            console.error(s);
          });
        }, 1e3) : this.dispatch("pp:print", { type: "success" });
      else {
        const s = e.includes("E17") || e.includes("A17") ? { type: "warning", message: "printer without paper" } : { type: "error", message: "The voucher could not be printed" };
        this.dispatch("pp:print", s);
      }
  } else if (e.includes("P59A00"))
    this.__pinPad__.operation.clientVoucher !== "" ? setTimeout(function() {
      r.print("client").then(() => {
      }).catch((s) => {
        console.error(s);
      });
    }, 1e3) : this.dispatch("pp:print", { type: "success" });
  else {
    const s = e.includes("E17") || e.includes("A17") ? { type: "warning", message: "printer without paper" } : { type: "error", message: "The voucher could not be printed" };
    this.dispatch("pp:print", s);
  }
}, // eslint-disable-next-line no-unused-vars
ki = function(t, e) {
}, // eslint-disable-next-line no-unused-vars
Fi = function(t, e) {
}, // ========================================================================================
// Updated to WS v4
// ========================================================================================
dt = function(t, e) {
  const r = new Xn();
  return r.setPublicKey(t), r.encrypt(e);
}, _t = function(t) {
  const e = "0123456789ABCDEF";
  let r = "";
  for (let s = 0; s < t; s++) {
    const a = Math.floor(Math.random() * e.length);
    r += e.substring(a, a + 1);
  }
  return r;
}, ji = function(t) {
  const e = "0123456789abcdef", r = [], s = [];
  for (let a = 0; a < 256; a++)
    r[a] = e.charAt(a >> 4) + e.charAt(a & 15);
  for (let a = 0; a < t.length; a++)
    s[a] = r[t.charCodeAt(a)];
  return s.join("");
}, gt = async function(t, e) {
  const r = new Uint8Array(t.match(/.{1,2}/g).map((g) => parseInt(g, 16))), s = crypto.getRandomValues(new Uint8Array(16)), o = new TextEncoder().encode(e), c = await crypto.subtle.importKey("raw", r, { name: "AES-CBC" }, !1, ["encrypt"]), u = await crypto.subtle.encrypt({ name: "AES-CBC", iv: s }, c, o), l = btoa(String.fromCharCode(...s)), f = btoa(String.fromCharCode(...new Uint8Array(u)));
  return l + f;
}, // async AESDecrypt(key, encryptedMessage) {
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
qi = function(t, e, r = !1) {
  const s = [];
  for (let l = 0; l < 256; l++)
    s[l] = l;
  let a = 0;
  for (let l = 0; l < 256; l++)
    a = (a + s[l] + t.charCodeAt(l % t.length)) % 256, [s[l], s[a]] = [s[a], s[l]];
  let o = 0, c = 0, u = "";
  for (const l of e) {
    o = (o + 1) % 256, c = (c + s[o]) % 256, [s[o], s[c]] = [s[c], s[o]];
    let f = s[(s[o] + s[c]) % 256];
    u += String.fromCharCode(l.charCodeAt(0) ^ f);
  }
  return r ? p(this, h, ji).call(this, u).toUpperCase() : u;
}, tt = function(t, e) {
  return p(this, h, qi).call(this, t, this.hexToAscii(e));
}, Ki = function(t) {
  return t.replaceAll("Á", "A"), t.replaceAll("É", "E"), t.replaceAll("Í", "I"), t.replaceAll("Ó", "O"), t.replaceAll("Ú", "U"), t.replaceAll("á", "a"), t.replaceAll("é", "e"), t.replaceAll("í", "i"), t.replaceAll("ó", "o"), t.replaceAll("ú", "u"), t.replaceAll("ñ", "n"), t.replaceAll("Ñ", "N"), t.replaceAll('Electr?a"', "Electronica"), t;
}, D = function(t, e, r) {
  if (t = t.replace("@cnb logo_cpagos", e), t = t.replace("@cnn ver_app", r), t = t.replace(/@/g, " @"), t = t.replace(/ {2}@/g, " @"), t = t.replace(/ {3}@/g, " @"), t = t.replace(/\r/g, ""), t = t.replace(/\n/g, ""), t.includes("@lsn POR ESTE PAGARE ME OBLIGO INCONDI")) {
    const s = t.indexOf("@lsn POR ESTE PAGARE ME OBLIGO INCONDI");
    t = t.substring(0, s);
  }
  return t.trim() + "@br @br @br @br @br";
}, Hi = function(t, e) {
  const r = "@logo3 @br", s = "@cnn " + e;
  return t.includes("@cnb Santander") ? (t = t.replace("@cnb Santander", "@logo1@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb American Express") ? (t = t.replace("@cnb American Express", "@logo2@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb HSBC") ? (t = t.replace("@cnb HSBC", "@logo7@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb IXE") ? (t = t.replace("@cnb IXE", "@logo11@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb MULTIVA") ? (t = t.replace("@cnb MULTIVA", "@logo15@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb Multiva") ? (t = t.replace("@cnb Multiva", "@logo15@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb SCOTIA BANK") ? (t = t.replace("@cnb SCOTIA BANK", "@logo16@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb SCOTIABANK") ? (t = t.replace("@cnb SCOTIABANK", "@logo16@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb BANCOMER") ? (t = t.replace("@cnb BANCOMER", "@logo17@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb Bancomer") ? (t = t.replace("@cnb Bancomer", "@logo17@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb BBVA") ? (t = t.replace("@cnb BBVA", "@logo17@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb BANORTE") ? (t = t.replace("@cnb BANORTE", "@logo18@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb Banorte") ? (t = t.replace("@cnb Banorte", "@logo18@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb BANREGIO") ? (t = t.replace("@cnb BANREGIO", "@logo19@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb Banregio") ? (t = t.replace("@cnb Banregio", "@logo19@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb GETNET") ? (t = t.replace("@cnb GETNET", "@logo20@br"), p(this, h, D).call(this, t, r, s)) : t.includes("@cnb GetNET") ? (t = t.replace("@cnb GetNET", "@logo20@br"), p(this, h, D).call(this, t, r, s)) : p(this, h, D).call(this, t, r, s);
}, Wi = async function(t = !1) {
  if (p(this, h, zi).call(this), this.__pinPad__.config.loginResponse && !t) return await p(this, h, ce).call(this);
  const e = this.url + this.__pinPad__.constants.uris.login, r = {
    usuario: this.username,
    password: this.password,
    crypto: "",
    version: this.__pinPad__.constants.appVersion,
    serieLector: "",
    canal: this.__pinPad__.constants.appChannel
  };
  if (await p(this, h, mt).call(this), p(this, h, ue).call(this))
    throw new Error("Empty RSA Key");
  const s = p(this, h, _t).call(this, 32), a = p(this, h, dt).call(this, this.__pinPad__.config.publicKeyRSA, s), o = await p(this, h, gt).call(this, s, JSON.stringify(r)), c = await A.post(e, o, {
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache, must-revalidate, post-check=0, pre-check=0, max-age=0",
      data: a || ""
    }
  }).catch((l) => {
    var f;
    throw new Error(`Error in request, verify internet connection: ${(f = l.response) == null ? void 0 : f.status} ${l.message}`);
  });
  let u = p(this, h, de).call(this, JSON.stringify(c.data));
  if (typeof u == "string" && (u = JSON.parse(u)), !u)
    throw new Error("Invalid response JSON");
  if (u.RESPUESTA === "error")
    throw new Error(u);
  return this.__pinPad__.config.loginResponse = u, localStorage.setItem(
    "ppLoginResponse",
    JSON.stringify({
      timestamp: (/* @__PURE__ */ new Date()).getTime(),
      data: u
    })
  ), await p(this, h, ce).call(this);
}, ce = async function() {
  await p(this, h, Zi).call(this);
  try {
    await p(this, h, Qi).call(this);
  } catch (t) {
    console.log("Error getting position", t);
  }
  return this.__pinPad__.config.otherLogin = {}, p(this, h, Xi).call(this, this.__pinPad__.config.loginResponse), this.__pinPad__.config.otherLogin;
}, Xi = function(t) {
  var a, o, c, u, l, f;
  let e = "", r = "";
  (o = (a = t.xml) == null ? void 0 : a.ventaspropias) != null && o.merchant_currencyb && (e = t.xml.ventaspropias.merchant_currencyb), (u = (c = t.xml) == null ? void 0 : c.ventaspropias) != null && u.merchant_currencym && (r = t.xml.ventaspropias.merchant_currencym);
  let s = (l = t.xml) == null ? void 0 : l.emvReverso;
  s || (s = "0"), this.__pinPad__.config.internal.stTokenization = (f = t.xml) == null ? void 0 : f.st_tokenizacion, !this.__pinPad__.config.internal.stTokenization || this.__pinPad__.config.internal.stTokenization === "false" || this.__pinPad__.config.internal.stTokenization === "0" ? this.__pinPad__.config.internal.stTokenization = !1 : this.__pinPad__.config.internal.stTokenization && (this.__pinPad__.config.internal.stTokenization = !0), this.__pinPad__.config.internal.emv = t.xml.importesPGS, this.__pinPad__.config.internal.qpsDomestic = this.__pinPad__.config.internal.emv.qps_dom, this.__pinPad__.config.internal.qpsInternational = this.__pinPad__.config.internal.emv.qps_il, this.__pinPad__.config.internal.cvmlVMCDomestic = this.__pinPad__.config.internal.emv.cvml_vm_dom, this.__pinPad__.config.internal.cvmlVMCInternational = this.__pinPad__.config.internal.emv.cvml_vm_il, this.__pinPad__.config.internal.cvmlAmex = this.__pinPad__.config.internal.emv.cvml_amex, this.__pinPad__.config.internal.translimitCTLSVMC = this.__pinPad__.config.internal.emv.tl_mc, this.__pinPad__.config.internal.translimitCTLSAmex = this.__pinPad__.config.internal.emv.tl_amex, this.__pinPad__.config.country = t.country.toUpperCase(), this.__pinPad__.config.idBranch = t.id_branch.toUpperCase(), this.__pinPad__.config.idCompany = t.id_company.toUpperCase(), this.__pinPad__.config.otherLogin = {
    bsUser: t.user,
    nbUser: t.nb_user,
    bsCompany: t.id_company,
    nbCompany: t.nb_company,
    nbStreetCompany: t.nb_companystreet,
    bsBranch: t.id_branch,
    nbBranch: t.nb_branch,
    bsCountry: t.country,
    coins: e,
    coinsMOTO: r,
    executeReverse: s
  };
}, zi = function() {
  let t = localStorage.getItem("ppLoginResponse");
  t && (t = JSON.parse(t), this.__pinPad__.config.loginResponse || (this.__pinPad__.config.loginResponse = t.data), (/* @__PURE__ */ new Date()).getTime() - t.timestamp >= 864e5 && (this.__pinPad__.config.loginResponse = null));
}, Gi = async function() {
  const t = this.url + this.__pinPad__.constants.uris.RSAKey, e = await A.get(t).catch((r) => {
    throw new Error(`Error in request, verify internet connection: ${r.response.status} ${r.message}`);
  });
  if (e.headers.get("content-type").indexOf("application/json") === -1)
    throw new Error("Fail to fetch RSA public key");
  return this.__pinPad__.config.publicKeyRSA = e.data.key_public, localStorage.setItem(
    "ppRSAKey",
    JSON.stringify({
      timestamp: (/* @__PURE__ */ new Date()).getTime(),
      data: e.data.key_public
    })
  ), this.__pinPad__.config.publicKeyRSA;
}, ue = function() {
  let t = localStorage.getItem("ppRSAKey");
  return !t || (t = JSON.parse(t), this.__pinPad__.config.publicKeyRSA = t.data, (/* @__PURE__ */ new Date()).getTime() - t.timestamp >= 864e5) ? !0 : !this.__pinPad__.config.publicKeyRSA;
}, he = async function() {
  return p(this, h, ue).call(this) ? await p(this, h, Gi).call(this) : this.__pinPad__.config.publicKeyRSA;
}, mt = async function() {
  if (!await p(this, h, he).call(this))
    throw new Error("RSA public key is empty");
}, le = function(t) {
  return /^[A-Z-a-z0-9\s]+$/g.test(t);
}, $i = function(t) {
  if (G(t))
    return !0;
  const e = /^[A-Z-a-z0-9\s]+$/g.test(t) === !0;
  if (!e)
    throw new Error("Invalid reference");
  return e;
}, j = function(t) {
  return t.length.toString().padStart(3, "0");
}, q = function(t) {
  let e = 0;
  for (let r = 0; r < t.length; r++)
    e ^= t.charCodeAt(r);
  return String.fromCharCode(e);
}, Bt = function(t, e = 0) {
  return t = parseFloat(t.toString().replace(/[^0-9.-]/g, "")), isNaN(t) ? 0 .toFixed(e) : t.toFixed(e).replace(/,/g, "");
}, fe = function(t) {
  return t = parseFloat(t.toString()), !(isNaN(t) || t < 0);
}, yt = async function(t) {
  for (const e in t)
    if (typeof t[e] > "u" || t[e] === null || t[e] === "")
      throw new Error("Object incomplete to process");
  return t;
}, pe = function(t) {
  if (!t || isNaN(parseInt(t)) || t.toString().length !== 9)
    throw new Error("Number of operation must be number of 9 digits");
  return t;
}, de = function(t) {
  if (typeof t != "string") throw new Error("Invalid string");
  return !t || /<html(?:\s+lang=["'][^"']*["'])?>/i.test(t) || (t = t.replace(/aaa/g, "á"), t = t.replace(/eee/g, "é"), t = t.replace(/iii/g, "í"), t = t.replace(/ooo/g, "ó"), t = t.replace(/uuu/g, "ú"), t = t.replace(/NNN/g, "Ñ"), t = t.replace(/nnn/g, "ñ"), t = t.replace(/Ã¡/g, "á")), t;
}, Ji = async function() {
  const t = this.__pinPad__.constants.STX, e = this.__pinPad__.constants.ETX;
  let r = "C55ACANCEL";
  r = t + p(this, h, j).call(this, r) + r + e, r = r + p(this, h, q).call(this, r);
  const s = this.parseStringToBytes(r, "");
  await this.appendToQueue(s, "cancel");
}, _e = function() {
  const t = /* @__PURE__ */ new Date(), e = t.getDate().toString().padStart(2, "0"), r = (t.getMonth() + 1).toString().padStart(2, "0"), s = t.getFullYear().toString().substring(2);
  return e + r + s;
}, ge = function() {
  const t = /* @__PURE__ */ new Date(), e = t.getHours().toString().padStart(2, "0"), r = t.getMinutes().toString().padStart(2, "0");
  return e + r;
}, Qi = async function() {
  return this.__pinPad__.config.latitude && this.__pinPad__.config.longitude ? this.latitudeLongitude : (this.__pinPad__.config.latitude = null, this.__pinPad__.config.longitude = null, Oe() ? new Promise((t) => {
    navigator.geolocation.getCurrentPosition(
      (e) => {
        this.__pinPad__.config.latitude = e.coords.latitude, this.__pinPad__.config.longitude = e.coords.longitude, t(this.latitudeLongitude);
      },
      () => {
        t(this.latitudeLongitude);
      }
    );
  }) : this.latitudeLongitude);
}, Zi = async function() {
  let t = localStorage.getItem("ppPublicIP");
  if (t && (t = JSON.parse(t), this.__pinPad__.config.publicIP = t.data, (/* @__PURE__ */ new Date()).getTime() - t.timestamp >= 864e5 && (this.__pinPad__.config.publicIP = null)), this.__pinPad__.config.publicIP) return this.__pinPad__.config.publicIP;
  this.__pinPad__.config.publicIP = null;
  let e = !1;
  const r = await A.get("https://api.ipify.org?format=json").catch(() => e = !0);
  return e ? null : (this.__pinPad__.config.publicIP = r.data.ip || null, localStorage.setItem(
    "ppPublicIP",
    JSON.stringify({
      timestamp: (/* @__PURE__ */ new Date()).getTime(),
      data: r.data.ip
    })
  ), this.__pinPad__.config.publicIP);
}, ot = async function(t, e) {
  await p(this, h, mt).call(this);
  const r = p(this, h, _t).call(this, 32);
  let s = p(this, h, dt).call(this, this.__pinPad__.config.publicKeyRSA, r), a = await p(this, h, gt).call(this, r, JSON.stringify(e));
  return (await A.post(t, a, {
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      data: s || ""
    }
  }).catch((c) => {
    var u;
    throw c.response.data.includes("Ha ocurrido un error al procesar su solicitud.") ? new Error("It was not possible to obtain the affiliations.") : c.response.status >= 500 && c.response.status <= 599 ? new Error(`Service Temporarily Unavailable ${c.message}`) : new Error(`Error in request, verify internet connection: ${(u = c.response) == null ? void 0 : u.status} ${c.message}`);
  })).data;
}, me = async function({ data: t, url: e, cancelable: r = !1 } = {}) {
  await p(this, h, mt).call(this);
  const s = p(this, h, _t).call(this, 32), a = p(this, h, dt).call(this, this.__pinPad__.config.publicKeyRSA, s), o = await p(this, h, gt).call(this, s, JSON.stringify(t)), c = this;
  return (await A.post(e, o, {
    headers: {
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      data: a || ""
    }
  }).catch(async (l) => {
    var g;
    let f = `Error in request, verify internet connection: ${l.status} ${l.message}`;
    throw l.response.status >= 500 && l.response.status <= 599 ? f = "Service Temporarily Unavailable" : l.response.status >= 400 && l.response.status <= 499 && (f = "Bad Request"), r && await p(g = c, h, Ji).call(g), new Error(f);
  })).data;
}, Yi = async function() {
  const t = this.__pinPad__.constants.FS, e = this.__pinPad__.constants.ETX, r = this.__pinPad__.constants.STX;
  let s = "C57A" + this.__pinPad__.config.internal.qpsDomestic;
  if (s = s + t + "B" + this.__pinPad__.config.internal.qpsInternational, s = s + t + "C" + this.__pinPad__.config.internal.cvmlVMCDomestic, s = s + t + "D" + this.__pinPad__.config.internal.cvmlVMCInternational, s = s + t + "E" + this.__pinPad__.config.internal.cvmlAmex, s = s + t + "F" + this.__pinPad__.config.internal.translimitCTLSVMC, s = s + t + "G" + this.__pinPad__.config.internal.translimitCTLSAmex, s = r + p(this, h, j).call(this, s) + s + e, s = s + p(this, h, q).call(this, s), !this.__pinPad__.about.injectedValues) {
    const a = this.parseStringToBytes(s, "");
    await this.appendToQueue(a, "inject");
  }
}, tn = async function() {
  this.__pinPad__.operation.bin8 && (this.__pinPad__.operation.bin = this.__pinPad__.operation.bin8), this.__pinPad__.operation.bin8 = "";
  const t = await p(this, h, me).call(this, {
    data: {
      accion: "tipoPagoInfo",
      cc_num: this.__pinPad__.operation.bin,
      usuario: this.username.toUpperCase(),
      canal: this.__pinPad__.constants.typeChannel,
      tp_canal: "1",
      tp_moneda: this.__pinPad__.config.currency.toUpperCase()
    },
    url: this.url + this.__pinPad__.constants.uris.merchant,
    cancelable: !0
  });
  if (!t.respuesta || t.respuesta === "0") {
    let e = "C55ACANCEL";
    const r = this.__pinPad__.constants.STX, s = this.__pinPad__.constants.ETX;
    e = r + p(this, h, j).call(this, e) + e + s, e = e + p(this, h, q).call(this, e);
    const a = this.parseStringToBytes(e, "");
    return await this.appendToQueue(a, "cancel"), !1;
  }
  return this.__pinPad__.operation.merchant = t, this.__pinPad__.operation.onlyMerchant = t.contado.af.length > 1 ? t.contado.af[0].merchant : t.contado.af.merchant, !0;
}, en = async function(t = null) {
  if (this.__pinPad__.waiting.statusAboutWaiting) throw new Error("AboutPP is already running");
  const e = this.__pinPad__.constants.STX, r = this.__pinPad__.constants.ETX;
  let s = "C56AABOUT";
  if (s = e + p(this, h, j).call(this, s) + s + r, s = s + p(this, h, q).call(this, s), G(this.__pinPad__.about.pp)) {
    this.__pinPad__.waiting.statusAboutWaiting = "pending";
    const c = this.parseStringToBytes(s, "");
    await this.appendToQueue(c, "about");
  } else
    return t ? t(this.__pinPad__.about.pp.supportDUKPT, this.__pinPad__.about.pp.hasDUKPTKeys) : !0;
  const a = this;
  let o = 0;
  return new Promise((c, u) => {
    o = setInterval(() => {
      if (a.__pinPad__.waiting.statusAboutWaiting === "resolved") {
        if (clearInterval(o), a.__pinPad__.waiting.statusAboutWaiting = null, G(a.__pinPad__.about.pp))
          return;
        t || c(!0), c(t(a.__pinPad__.about.pp.supportDUKPT, a.__pinPad__.about.pp.hasDUKPTKeys));
      } else a.__pinPad__.waiting.statusAboutWaiting === "rejected" && (clearInterval(o), a.__pinPad__.waiting.statusAboutWaiting = null, u("Error"));
    }, 500);
  });
}, Nt = async function(t, e) {
  if (t = t ? t.toString() : "", e = e ? e.toString() : "", G(t) || t === "0") {
    this.dispatch("pp:dukpt", { status: "unsupported", already: !1 });
    return;
  }
  if (G(e) || e === "1") {
    this.dispatch("pp:dukpt", { status: "charged", already: !0 });
    return;
  }
  const r = p(this, h, _e).call(this), s = p(this, h, ge).call(this), a = this.__pinPad__.constants.FS, o = this.__pinPad__.constants.ETX, c = this.__pinPad__.constants.STX;
  let u = "C91A" + r + a + "B" + s;
  u = c + p(this, h, j).call(this, u) + u + o, u = u + p(this, h, q).call(this, u);
  const l = this.parseStringToBytes(u, "");
  await this.appendToQueue(l, "init-dukpt");
  let f = 0;
  this.__pinPad__.waiting.statusinitDUKPTWaiting = "pending";
  const g = this;
  return new Promise((P, m) => {
    f = setInterval(async () => {
      var b;
      g.__pinPad__.waiting.statusinitDUKPTWaiting === "resolved" ? (clearInterval(f), g.__pinPad__.waiting.statusinitDUKPTWaiting = null, g.dispatch("pp:dukpt", { status: "charged", already: !1 }), await p(b = g, h, nn).call(b), P(!0)) : g.__pinPad__.waiting.statusinitDUKPTWaiting === "rejected" && (clearInterval(f), g.__pinPad__.waiting.statusinitDUKPTWaiting = null, m("Error"));
    }, 500);
  });
}, nn = async function() {
  const t = {
    IPEK_REQUESTType: {
      business: {
        country: this.__pinPad__.config.country.toUpperCase(),
        id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
        id_company: this.__pinPad__.config.idCompany.toUpperCase(),
        pwd: this.password.toUpperCase(),
        user: this.username.toUpperCase()
      },
      terminal: this.__pinPad__.config.terminal
    }
  }, e = await p(this, h, me).call(this, {
    data: t,
    url: this.url + this.__pinPad__.constants.uris.keysDUKPT
  });
  await p(this, h, _n).call(this, e);
}, rn = async function() {
  if (!await p(this, h, he).call(this))
    throw new Error("RSA public key is empty");
  const e = this;
  await p(this, h, en).call(this, async function(s, a) {
    var c, u;
    if (e.__pinPad__.about.supportInjection && e.__pinPad__.config.internal.emv && e.__pinPad__.about.injectedValues)
      return await p(c = e, h, Nt).call(c, s, a), !0;
    let o = 0;
    return e.__pinPad__.waiting.statusInjectWaiting = "pending", await p(u = e, h, Yi).call(u), new Promise((l, f) => {
      o = setInterval(async () => {
        var g;
        e.__pinPad__.waiting.statusInjectWaiting === "resolved" ? (clearInterval(o), e.__pinPad__.waiting.statusInjectWaiting = null, await p(g = e, h, Nt).call(g, s, a), l(!0)) : e.__pinPad__.waiting.statusInjectWaiting === "rejected" && (clearInterval(o), e.__pinPad__.waiting.statusInjectWaiting = null, f("Error"));
      }, 500);
    });
  });
}, ye = function(t, e = 0) {
  if (t = parseFloat(t.toString().replace(/[^0-9.-]/g, "")), isNaN(t) || t === 0)
    return parseFloat("0").toFixed(e);
  t = t.toFixed(e);
  let r = t.split(".");
  return r[0] = r[0].replace(/\B(?=(\d{3})+(?!\d))/g, ""), r.join(".");
}, sn = async function() {
  this.__pinPad__.operation.errors = 0;
  let t = "ACERQUE, INSERTE CHIP O  DESLICE TARJETA";
  if (this.__pinPad__.about.supportContactless || (t = "INSERTE CHIP O  DESLICE TARJETA"), this.__pinPad__.about.model.toUpperCase().includes("UX300") && (t = "ACERQUE O INSERTE TARJETA"), G(this.amount) || this.amount <= 0)
    throw new Error("Amount required");
  if (p(this, h, fe).call(this, this.amount) === !1)
    throw new Error("Invalid amount required");
  if (p(this, h, Bt).call(this, this.amount, 2) <= 0)
    throw new Error("Amount must be greater than 0");
  const e = this.__pinPad__.constants.FS, r = this.__pinPad__.constants.STX, s = this.__pinPad__.constants.ETX;
  let a = "C93A" + t;
  a = a + e + "B" + p(this, h, _e).call(this), a = a + e + "C" + p(this, h, ge).call(this), a = a + e + "D" + p(this, h, Bt).call(this, this.amount, 2), a = a + e + "E0.00", a = a + e + "F" + this.__pinPad__.config.currencyCode, this.__pinPad__.about.supportDUKPT && this.__pinPad__.about.supportDUKPT !== "0" && this.__pinPad__.about.supportDUKPT !== "false" && (this.__pinPad__.about.supportContactless ? (a = a + e + "G" + this.timeoutPinPad, a = a + e + "HTAGS", a = a + e + "I" + this.__pinPad__.config.requireCVVAmex, a = a + e + "J" + this.__pinPad__.config.forceOnline, a = a + e + "K" + this.__pinPad__.about.supportContactless, a = a + e + "L" + this.__pinPad__.config.emvCard, this.__pinPad__.about.hasCashback && (a = a + e + "M0", a = a + e + "N00")) : (a = a + e + "G" + this.timeoutPinPad, a = a + e + "HTAGS", a = a + e + "I" + this.__pinPad__.config.requireCVVAmex, a = a + e + "L" + this.__pinPad__.config.emvCard), this.__pinPad__.about.supportInjection && (a = a + e + "O" + this.__pinPad__.config.validateQPS)), a = r + p(this, h, j).call(this, a) + a + s, a = a + p(this, h, q).call(this, a), p(this, h, gn).call(this);
  const o = this.parseStringToBytes(a, "");
  await this.appendToQueue(o, "read-card");
  let c = 0;
  const u = this;
  return this.__pinPad__.waiting.statusReadCardWaiting = "pending", new Promise((l, f) => {
    c = setInterval(() => {
      if (u.__pinPad__.waiting.statusReadCardWaiting === "resolved")
        clearInterval(c), u.__pinPad__.waiting.statusReadCardWaiting = null, l(!0);
      else if (u.__pinPad__.waiting.statusReadCardWaiting === "rejected") {
        clearInterval(c), u.__pinPad__.waiting.statusReadCardWaiting = null;
        const g = u.__pinPad__.operation.last_error;
        f(g ?? "Error reading card");
      }
    }, 500);
  });
}, an = async function(t) {
  return await xe(t * 1e3);
}, on = async function(t) {
  let e = this.url + this.__pinPad__.constants.uris.consult;
  return t > 1 && this.environment === "production" && (e = e.replace(
    this.__pinPad__.constants.urls.production,
    this.__pinPad__.constants.urls.productionAlternative
  )), this.__pinPad__.operation.consultDate = (/* @__PURE__ */ new Date()).toLocaleDateString("en-GB"), await p(this, h, ot).call(this, e, {
    user: this.username.toUpperCase(),
    pwd: this.password.toUpperCase(),
    id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
    id_company: this.__pinPad__.config.idCompany.toUpperCase(),
    date: this.__pinPad__.operation.consultDate,
    reference: this.reference
  });
}, cn = async function(t = "", e = {}) {
  let r = 1, s = null;
  do {
    r > 1 && this.environment === "production" && (t = t.replace(
      this.__pinPad__.constants.urls.production,
      this.__pinPad__.constants.urls.productionAlternative
    ), await p(this, h, an).call(this, 5)), await p(this, h, mt).call(this);
    const a = p(this, h, _t).call(this, 32), o = p(this, h, dt).call(this, this.__pinPad__.config.publicKeyRSA, a), c = await p(this, h, gt).call(this, a, JSON.stringify(e));
    let u = !1;
    const l = await A.post(t, c, {
      headers: {
        "Content-Type": "application/json",
        data: o || ""
      }
    }).catch(async (f) => {
      let g = `Error in request, verify internet connection: ${f.status} ${f.message}`;
      f.response.status >= 500 && f.response.status <= 599 ? g = "Service Temporarily Unavailable" : f.response.status >= 400 && f.response.status <= 499 && (g = "Bad Request"), console.warn(f), s = g;
      const P = await p(this, h, on).call(this, r);
      P && P !== "{}" && !P.includes('"transacciones":""') && P.includes("nu_operaion") && (r = 5, s = "EE32"), u = !0;
    });
    if (!u)
      return l.data;
  } while (r++ <= 3);
  return s ? Promise.reject(s) : Promise.reject("Communication error with CDP. IL/MTY");
}, un = function(t) {
  if (G(t)) throw new Error("Number of authorization invalid");
  if (/^[A-Za-z0-9]+$/g.test(t) !== !0) throw new Error("Number of authorization invalid");
  if (t.length !== 6) throw new Error("Number of authorization invalid");
  return !0;
}, // jsonTokenization() {
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
hn = function(t) {
  var s, a;
  const e = this;
  this.__pinPad__.operation.responseMit._approved = t.response === "approved", this.__pinPad__.operation.responseMit._status = t.response, this.__pinPad__.operation.responseMit._originalToken = t.number_tkn ?? "", this.__pinPad__.operation.folio = t.foliocpagos, this.__pinPad__.operation.authorization = t.auth;
  let r = (s = t.cd_response) == null ? void 0 : s.toUpperCase();
  return r.toUpperCase() === "0C" || this.__pinPad__.operation.responseMit._approved ? r = "00" : (r !== "Z3" && r !== "05" || t.cd_error === "92") && (r = "01"), this.__pinPad__.operation.responseMit._cdResponse = r, this.__pinPad__.finishCommand.A = r, this.__pinPad__.finishCommand.B = "", this.__pinPad__.finishCommand.C = "", this.__pinPad__.finishCommand.D = "", this.__pinPad__.finishCommand.E = t.emv_key_date ? t.emv_key_date : "", this.__pinPad__.finishCommand.F = t.icc_csn ? t.icc_csn : "", this.__pinPad__.finishCommand.G = t.icc_atc ? t.icc_atc : "", this.__pinPad__.finishCommand.H = t.icc_arpc ? t.icc_arpc : "", this.__pinPad__.finishCommand.I = t.icc_issuer_script ? t.icc_issuer_script : "", this.__pinPad__.finishCommand.J = t.authorized_amount ? t.authorized_amount : "", this.__pinPad__.finishCommand.K = t.account_balance_1 ? t.account_balance_1 : "", {
    reference: t.reference,
    response: t.response,
    foliocpagos: t.foliocpagos,
    auth: t.auth,
    cd_response: r,
    cd_error: t.cd_error,
    nb_error: p(a = e, h, de).call(a, t.nb_error ?? ""),
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
}, ln = async function() {
  var s, a;
  const t = this;
  this.__pinPad__.operation.errors = 0, this.__pinPad__.operation.ignore.counterSale = !1;
  const e = this.__pinPad__.operation.onlyMerchant;
  if (/^[0-9]+$/.test(e) === !1) throw new Error("Invalid merchant");
  this.__pinPad__.operation.typeOperation = "29";
  let r = {
    error: !1,
    message: null,
    approved: !1,
    object: {}
  };
  try {
    const o = await p(this, h, ye).call(this, this.amount, 2);
    await p(this, h, yt).call(this, {
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
      Amount: o,
      Currency: this.__pinPad__.config.currency,
      Merchant: e,
      Reverse: this.__pinPad__.config.otherLogin.executeReverse
    });
    const c = this.__pinPad__.about.supportContactless && this.__pinPad__.about.supportContactless !== "0" ? "1" : "0", u = await p(this, h, cn).call(this, this.url + this.__pinPad__.constants.uris.sale, {
      VMCAMEXB: {
        business: {
          country: this.__pinPad__.config.country.toUpperCase(),
          id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
          id_company: this.__pinPad__.config.idCompany.toUpperCase(),
          pwd: this.password.toUpperCase(),
          user: this.username.toUpperCase()
        },
        dcc: {
          dcc_amount: "0",
          dcc_status: "0"
        },
        transacction: {
          amount: o,
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
            is_contactless: c,
            is_mobile: "0",
            printer: this.__pinPad__.about.printer
          },
          tp_operation: this.__pinPad__.operation.typeOperation,
          tp_resp: this.__pinPad__.operation.typeResponse,
          usrtransacction: this.username.toUpperCase(),
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
    u.response === "error" && (r.error = !0, r.message = u.nb_error || "Error in response");
    const l = p(this, h, hn).call(this, u);
    return r.object = l, await p(this, h, fn).call(this, l), r.approved = this.__pinPad__.operation.responseMit._approved, this.__pinPad__.operation.finalResult = l, r;
  } catch (o) {
    throw t.__pinPad__.finishCommand.A = "01", t.__pinPad__.finishCommand.B = "", t.__pinPad__.finishCommand.C = "", t.__pinPad__.finishCommand.D = "", t.__pinPad__.finishCommand.E = "", t.__pinPad__.finishCommand.F = "", t.__pinPad__.finishCommand.G = "", t.__pinPad__.finishCommand.H = "", t.__pinPad__.finishCommand.I = "", t.__pinPad__.finishCommand.J = "", t.__pinPad__.finishCommand.K = "", await p(a = t, h, dn).call(a, p(s = t, h, Pe).call(s, o)), o;
  }
}, fn = async function(t) {
  if (this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1")
    return this.dispatch("pp:finish-emv", t), !0;
  const e = this.__pinPad__.constants.FS, r = this.__pinPad__.constants.STX, s = this.__pinPad__.constants.ETX;
  let a = "C93A" + this.__pinPad__.finishCommand.A;
  a = a + e + "B" + this.__pinPad__.finishCommand.B, a = a + e + "C" + this.__pinPad__.finishCommand.C, a = a + e + "D" + this.__pinPad__.finishCommand.D, a = a + e + "E" + this.__pinPad__.finishCommand.E, a = a + e + "F" + this.__pinPad__.finishCommand.F, a = a + e + "G" + this.__pinPad__.finishCommand.G, a = a + e + "H" + this.__pinPad__.finishCommand.H, a = a + e + "I" + this.__pinPad__.finishCommand.I, a = a + e + "J" + this.__pinPad__.finishCommand.J, a = a + e + "K" + this.__pinPad__.finishCommand.K, a = r + p(this, h, j).call(this, a) + a + s, a = a + p(this, h, q).call(this, a);
  const o = this.parseStringToBytes(a, "");
  this.__pinPad__.waiting.statusSecondGenerateWaiting = "pending", await this.appendToQueue(o, "second-generate");
  let c = 0;
  const u = this;
  return new Promise((l, f) => {
    c = setInterval(async () => {
      var g, P;
      if (u.__pinPad__.waiting.statusSecondGenerateWaiting === "resolved") {
        if (clearInterval(c), u.__pinPad__.waiting.statusSecondGenerateWaiting = null, u.__pinPad__.operation.applyReverse) {
          const m = await p(g = u, h, ot).call(g, u.url + u.__pinPad__.constants.uris.reverse, {
            VMCAMEXMREVERSO: {
              business: {
                id_company: this.__pinPad__.config.idCompany.toUpperCase(),
                id_branch: this.__pinPad__.config.idBranch.toUpperCase(),
                country: this.__pinPad__.config.country.toUpperCase(),
                user: this.username.toUpperCase(),
                pwd: this.password.toUpperCase()
              },
              transacction: {
                amount: p(this, h, Bt).call(this, this.amount, 2),
                no_operacion: this.__pinPad__.operation.folio,
                auth: this.__pinPad__.operation.authorization.toUpperCase(),
                tracks: "",
                usrtransacction: this.username.toUpperCase(),
                crypto: "2",
                version: this.__pinPad__.constants.appName + this.__pinPad__.constants.appVersion
              }
            }
          }), b = JSON.parse(m);
          let y;
          b.response === "approved" ? y = { message: "Transaction rejected by PinPad." } : y = { message: "No communication, please check your report." }, u.__pinPad__.operation.ignore.counterSale || (u.dispatch("pp:finish-emv", y), u.__pinPad__.operation.ignore.counterSale = !0);
        } else
          u.__pinPad__.operation.ignore.counterSale || (u.dispatch("pp:finish-emv", t), u.__pinPad__.operation.ignore.counterSale = !0);
        t.cd_error === "92" && await p(P = u, h, pn).call(P, t, a), l(!0);
      } else u.__pinPad__.waiting.statusSecondGenerateWaiting === "rejected" && (clearInterval(c), u.__pinPad__.waiting.statusSecondGenerateWaiting = null, f("There is no response from the reader, check that it is connected."));
    }, 500);
  });
}, pn = async function(t, e) {
  this.__pinPad__.operation.ignore.responseGlobal = t, this.__pinPad__.operation.ignore.C93Global = e, this.__pinPad__.operation.ignore.isError92TRX = !0, await p(this, h, Nt).call(this, 1, 0);
}, be = async function() {
  if (this.__pinPad__.operation.ignore.isError92TRX = !1, this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1")
    this.dispatch("pp:response", this.__pinPad__.operation.ignore.responseGlobal);
  else {
    const t = this.parseStringToBytes(this.__pinPad__.operation.ignore.C93Global, "");
    await this.appendToQueue(t, "code93"), await xe(1400), this.dispatch("pp:response", this.__pinPad__.operation.ignore.responseGlobal);
  }
}, Pe = function(t) {
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
  };
  let r = e[t] ? {
    error: t,
    message: e[t]
  } : { error: t, message: "Error desconocido" };
  return this.dispatch("pp:error", r), r;
}, dn = async function(t) {
  const e = this.__pinPad__.constants.FS, r = this.__pinPad__.constants.STX, s = this.__pinPad__.constants.ETX;
  let a = "C93A" + this.__pinPad__.finishCommand.A;
  if (a = a + e + "B" + this.__pinPad__.finishCommand.B, a = a + e + "C" + this.__pinPad__.finishCommand.C, a = a + e + "D" + this.__pinPad__.finishCommand.D, a = a + e + "E" + this.__pinPad__.finishCommand.E, a = a + e + "F" + this.__pinPad__.finishCommand.F, a = a + e + "G" + this.__pinPad__.finishCommand.G, a = a + e + "H" + this.__pinPad__.finishCommand.H, a = a + e + "I" + this.__pinPad__.finishCommand.I, a = a + e + "J" + this.__pinPad__.finishCommand.J, a = a + e + "K" + this.__pinPad__.finishCommand.K, a = r + p(this, h, j).call(this, a) + a + s, a = a + p(this, h, q).call(this, a), this.__pinPad__.config.read.POSEM === "022" || this.__pinPad__.config.read.POSEM === "800" || this.__pinPad__.config.read.ReadCTLS === "1") {
    this.dispatch("pp:finish-emv", t);
    return;
  }
  const o = this.parseStringToBytes(a, "");
  await this.appendToQueue(o, "finish-emv-end");
}, _n = async function(t) {
  if (t.cd_estatus = t.cd_estatus ? t.cd_estatus : "0", t.cd_estatus !== "1") {
    this.__pinPad__.operation.ignore.isError92TRX && await p(this, h, be).call(this);
    return;
  }
  const e = this.__pinPad__.constants.FS, r = this.__pinPad__.constants.ETX, s = this.__pinPad__.constants.STX, a = t.nb_ksn, o = t.nb_kcv || "", c = t.nb_ipek || "";
  let u = "C92A" + a + e + "B" + o + e + "C" + c;
  u = s + p(this, h, j).call(this, u) + u + r, u = u + p(this, h, q).call(this, u);
  const l = this.parseStringToBytes(u, "");
  await this.appendToQueue(l, "dukpt");
  let f = 0;
  this.__pinPad__.waiting.statuswritingDUKPTWaiting = "pending";
  const g = this;
  return new Promise((P, m) => {
    f = setInterval(async () => {
      var b;
      g.__pinPad__.waiting.statuswritingDUKPTWaiting === "resolved" ? (clearInterval(f), g.__pinPad__.waiting.statuswritingDUKPTWaiting = null, this.__pinPad__.operation.ignore.isError92TRX && await p(b = g, h, be).call(b), P(!0)) : g.__pinPad__.waiting.statuswritingDUKPTWaiting === "rejected" && (clearInterval(f), g.__pinPad__.waiting.statuswritingDUKPTWaiting = null, m("Error writing DUKPT keys"));
    }, 500);
  });
}, gn = function() {
  this.__pinPad__.config.read.AppId = "", this.__pinPad__.config.read.AppIdLabel = "", this.__pinPad__.config.read.Arqc = "", this.__pinPad__.config.read.ChipName = "", this.__pinPad__.config.read.ReadCTLS = "", this.__pinPad__.config.read.NB_Data = "", this.__pinPad__.config.read.NB_ksn = "", this.__pinPad__.config.read.PIN = "", this.__pinPad__.config.read.POSEM = "", this.__pinPad__.config.read.Tags = "", this.__pinPad__.config.read.Type = "", this.__pinPad__.config.read.Chip = "", this.__pinPad__.config.read.ChipNameEnc = "", this.__pinPad__.operation.ignore.error = "", this.__pinPad__.operation.ignore.C93Global = "", this.__pinPad__.operation.folio = "", this.__pinPad__.operation.authorization = "", this.__pinPad__.config.tokenizeTRX = !1;
};
export {
  Ks as PinPad
};
