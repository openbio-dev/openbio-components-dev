"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chunk_e4627dab_js_1 = require("./chunk-e4627dab.js");
var hookCallback, some;
function hooks() { return hookCallback.apply(null, arguments); }
function setHookCallback(e) { hookCallback = e; }
function isArray(e) { return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e); }
function isObject(e) { return null != e && "[object Object]" === Object.prototype.toString.call(e); }
function hasOwnProp(e, t) { return Object.prototype.hasOwnProperty.call(e, t); }
function isObjectEmpty(e) { if (Object.getOwnPropertyNames)
    return 0 === Object.getOwnPropertyNames(e).length; var t; for (t in e)
    if (hasOwnProp(e, t))
        return !1; return !0; }
function isUndefined(e) { return void 0 === e; }
function isNumber(e) { return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e); }
function isDate(e) { return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e); }
function map(e, t) { var a, o = []; for (a = 0; a < e.length; ++a)
    o.push(t(e[a], a)); return o; }
function extend(e, t) { for (var a in t)
    hasOwnProp(t, a) && (e[a] = t[a]); return hasOwnProp(t, "toString") && (e.toString = t.toString), hasOwnProp(t, "valueOf") && (e.valueOf = t.valueOf), e; }
function createUTC(e, t, a, o) { return createLocalOrUTC(e, t, a, o, !0).utc(); }
function defaultParsingFlags() { return { empty: !1, unusedTokens: [], unusedInput: [], overflow: -2, charsLeftOver: 0, nullInput: !1, invalidEra: null, invalidMonth: null, invalidFormat: !1, userInvalidated: !1, iso: !1, parsedDateParts: [], era: null, meridiem: null, rfc2822: !1, weekdayMismatch: !1 }; }
function getParsingFlags(e) { return null == e._pf && (e._pf = defaultParsingFlags()), e._pf; }
function isValid(e) { if (null == e._isValid) {
    var t = getParsingFlags(e), a = some.call(t.parsedDateParts, function (e) { return null != e; }), o = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && a);
    if (e._strict && (o = o && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour), null != Object.isFrozen && Object.isFrozen(e))
        return o;
    e._isValid = o;
} return e._isValid; }
function createInvalid(e) { var t = createUTC(NaN); return null != e ? extend(getParsingFlags(t), e) : getParsingFlags(t).userInvalidated = !0, t; }
some = Array.prototype.some ? Array.prototype.some : function (e) { var t, a = Object(this), o = a.length >>> 0; for (t = 0; t < o; t++)
    if (t in a && e.call(this, a[t], t, a))
        return !0; return !1; };
var momentProperties = hooks.momentProperties = [], updateInProgress = !1;
function copyConfig(e, t) { var a, o, n; if (isUndefined(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), isUndefined(t._i) || (e._i = t._i), isUndefined(t._f) || (e._f = t._f), isUndefined(t._l) || (e._l = t._l), isUndefined(t._strict) || (e._strict = t._strict), isUndefined(t._tzm) || (e._tzm = t._tzm), isUndefined(t._isUTC) || (e._isUTC = t._isUTC), isUndefined(t._offset) || (e._offset = t._offset), isUndefined(t._pf) || (e._pf = getParsingFlags(t)), isUndefined(t._locale) || (e._locale = t._locale), momentProperties.length > 0)
    for (a = 0; a < momentProperties.length; a++)
        isUndefined(n = t[o = momentProperties[a]]) || (e[o] = n); return e; }
function Moment(e) { copyConfig(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === updateInProgress && (updateInProgress = !0, hooks.updateOffset(this), updateInProgress = !1); }
function isMoment(e) { return e instanceof Moment || null != e && null != e._isAMomentObject; }
function warn(e) { !1 === hooks.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e); }
function deprecate(e, t) { var a = !0; return extend(function () { if (null != hooks.deprecationHandler && hooks.deprecationHandler(null, e), a) {
    var o, n, r, s = [];
    for (n = 0; n < arguments.length; n++) {
        if (o = "", "object" == typeof arguments[n]) {
            for (r in o += "\n[" + n + "] ", arguments[0])
                hasOwnProp(arguments[0], r) && (o += r + ": " + arguments[0][r] + ", ");
            o = o.slice(0, -2);
        }
        else
            o = arguments[n];
        s.push(o);
    }
    warn(e + "\nArguments: " + Array.prototype.slice.call(s).join("") + "\n" + (new Error).stack), a = !1;
} return t.apply(this, arguments); }, t); }
var keys, deprecations = {};
function deprecateSimple(e, t) { null != hooks.deprecationHandler && hooks.deprecationHandler(e, t), deprecations[e] || (warn(t), deprecations[e] = !0); }
function isFunction(e) { return "undefined" != typeof Function && e instanceof Function || "[object Function]" === Object.prototype.toString.call(e); }
function set(e) { var t, a; for (a in e)
    hasOwnProp(e, a) && (isFunction(t = e[a]) ? this[a] = t : this["_" + a] = t); this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source); }
function mergeConfigs(e, t) { var a, o = extend({}, e); for (a in t)
    hasOwnProp(t, a) && (isObject(e[a]) && isObject(t[a]) ? (o[a] = {}, extend(o[a], e[a]), extend(o[a], t[a])) : null != t[a] ? o[a] = t[a] : delete o[a]); for (a in e)
    hasOwnProp(e, a) && !hasOwnProp(t, a) && isObject(e[a]) && (o[a] = extend({}, o[a])); return o; }
function Locale(e) { null != e && this.set(e); }
hooks.suppressDeprecationWarnings = !1, hooks.deprecationHandler = null, keys = Object.keys ? Object.keys : function (e) { var t, a = []; for (t in e)
    hasOwnProp(e, t) && a.push(t); return a; };
var defaultCalendar = { sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L" };
function calendar(e, t, a) { var o = this._calendar[e] || this._calendar.sameElse; return isFunction(o) ? o.call(t, a) : o; }
function zeroFill(e, t, a) { var o = "" + Math.abs(e); return (e >= 0 ? a ? "+" : "" : "-") + Math.pow(10, Math.max(0, t - o.length)).toString().substr(1) + o; }
var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g, localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, formatFunctions = {}, formatTokenFunctions = {};
function addFormatToken(e, t, a, o) { var n = o; "string" == typeof o && (n = function () { return this[o](); }), e && (formatTokenFunctions[e] = n), t && (formatTokenFunctions[t[0]] = function () { return zeroFill(n.apply(this, arguments), t[1], t[2]); }), a && (formatTokenFunctions[a] = function () { return this.localeData().ordinal(n.apply(this, arguments), e); }); }
function removeFormattingTokens(e) { return e.match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, ""); }
function makeFormatFunction(e) { var t, a, o = e.match(formattingTokens); for (t = 0, a = o.length; t < a; t++)
    o[t] = formatTokenFunctions[o[t]] ? formatTokenFunctions[o[t]] : removeFormattingTokens(o[t]); return function (t) { var n, r = ""; for (n = 0; n < a; n++)
    r += isFunction(o[n]) ? o[n].call(t, e) : o[n]; return r; }; }
function formatMoment(e, t) { return e.isValid() ? (t = expandFormat(t, e.localeData()), formatFunctions[t] = formatFunctions[t] || makeFormatFunction(t), formatFunctions[t](e)) : e.localeData().invalidDate(); }
function expandFormat(e, t) { var a = 5; function o(e) { return t.longDateFormat(e) || e; } for (localFormattingTokens.lastIndex = 0; a >= 0 && localFormattingTokens.test(e);)
    e = e.replace(localFormattingTokens, o), localFormattingTokens.lastIndex = 0, a -= 1; return e; }
var defaultLongDateFormat = { LTS: "h:mm:ss A", LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D, YYYY", LLL: "MMMM D, YYYY h:mm A", LLLL: "dddd, MMMM D, YYYY h:mm A" };
function longDateFormat(e) { var t = this._longDateFormat[e], a = this._longDateFormat[e.toUpperCase()]; return t || !a ? t : (this._longDateFormat[e] = a.match(formattingTokens).map(function (e) { return "MMMM" === e || "MM" === e || "DD" === e || "dddd" === e ? e.slice(1) : e; }).join(""), this._longDateFormat[e]); }
var defaultInvalidDate = "Invalid date";
function invalidDate() { return this._invalidDate; }
var defaultOrdinal = "%d", defaultDayOfMonthOrdinalParse = /\d{1,2}/;
function ordinal(e) { return this._ordinal.replace("%d", e); }
var defaultRelativeTime = { future: "in %s", past: "%s ago", s: "a few seconds", ss: "%d seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", w: "a week", ww: "%d weeks", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
function relativeTime(e, t, a, o) { var n = this._relativeTime[a]; return isFunction(n) ? n(e, t, a, o) : n.replace(/%d/i, e); }
function pastFuture(e, t) { var a = this._relativeTime[e > 0 ? "future" : "past"]; return isFunction(a) ? a(t) : a.replace(/%s/i, t); }
var aliases = {};
function addUnitAlias(e, t) { var a = e.toLowerCase(); aliases[a] = aliases[a + "s"] = aliases[t] = e; }
function normalizeUnits(e) { return "string" == typeof e ? aliases[e] || aliases[e.toLowerCase()] : void 0; }
function normalizeObjectUnits(e) { var t, a, o = {}; for (a in e)
    hasOwnProp(e, a) && (t = normalizeUnits(a)) && (o[t] = e[a]); return o; }
var priorities = {};
function addUnitPriority(e, t) { priorities[e] = t; }
function getPrioritizedUnits(e) { var t, a = []; for (t in e)
    hasOwnProp(e, t) && a.push({ unit: t, priority: priorities[t] }); return a.sort(function (e, t) { return e.priority - t.priority; }), a; }
function isLeapYear(e) { return e % 4 == 0 && e % 100 != 0 || e % 400 == 0; }
function absFloor(e) { return e < 0 ? Math.ceil(e) || 0 : Math.floor(e); }
function toInt(e) { var t = +e, a = 0; return 0 !== t && isFinite(t) && (a = absFloor(t)), a; }
function makeGetSet(e, t) { return function (a) { return null != a ? (set$1(this, e, a), hooks.updateOffset(this, t), this) : get(this, e); }; }
function get(e, t) { return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN; }
function set$1(e, t, a) { e.isValid() && !isNaN(a) && ("FullYear" === t && isLeapYear(e.year()) && 1 === e.month() && 29 === e.date() ? (a = toInt(a), e._d["set" + (e._isUTC ? "UTC" : "") + t](a, e.month(), daysInMonth(a, e.month()))) : e._d["set" + (e._isUTC ? "UTC" : "") + t](a)); }
function stringGet(e) { return isFunction(this[e = normalizeUnits(e)]) ? this[e]() : this; }
function stringSet(e, t) { if ("object" == typeof e) {
    var a, o = getPrioritizedUnits(e = normalizeObjectUnits(e));
    for (a = 0; a < o.length; a++)
        this[o[a].unit](e[o[a].unit]);
}
else if (isFunction(this[e = normalizeUnits(e)]))
    return this[e](t); return this; }
var regexes, match1 = /\d/, match2 = /\d\d/, match3 = /\d{3}/, match4 = /\d{4}/, match6 = /[+-]?\d{6}/, match1to2 = /\d\d?/, match3to4 = /\d\d\d\d?/, match5to6 = /\d\d\d\d\d\d?/, match1to3 = /\d{1,3}/, match1to4 = /\d{1,4}/, match1to6 = /[+-]?\d{1,6}/, matchUnsigned = /\d+/, matchSigned = /[+-]?\d+/, matchOffset = /Z|[+-]\d\d:?\d\d/gi, matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
function addRegexToken(e, t, a) { regexes[e] = isFunction(t) ? t : function (e, o) { return e && a ? a : t; }; }
function getParseRegexForToken(e, t) { return hasOwnProp(regexes, e) ? regexes[e](t._strict, t._locale) : new RegExp(unescapeFormat(e)); }
function unescapeFormat(e) { return regexEscape(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (e, t, a, o, n) { return t || a || o || n; })); }
function regexEscape(e) { return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"); }
regexes = {};
var tokens = {};
function addParseToken(e, t) { var a, o = t; for ("string" == typeof e && (e = [e]), isNumber(t) && (o = function (e, a) { a[t] = toInt(e); }), a = 0; a < e.length; a++)
    tokens[e[a]] = o; }
function addWeekParseToken(e, t) { addParseToken(e, function (e, a, o, n) { o._w = o._w || {}, t(e, o._w, o, n); }); }
function addTimeToArrayFromToken(e, t, a) { null != t && hasOwnProp(tokens, e) && tokens[e](t, a._a, a, e); }
var indexOf, YEAR = 0, MONTH = 1, DATE = 2, HOUR = 3, MINUTE = 4, SECOND = 5, MILLISECOND = 6, WEEK = 7, WEEKDAY = 8;
function mod(e, t) { return (e % t + t) % t; }
function daysInMonth(e, t) { if (isNaN(e) || isNaN(t))
    return NaN; var a = mod(t, 12); return e += (t - a) / 12, 1 === a ? isLeapYear(e) ? 29 : 28 : 31 - a % 7 % 2; }
indexOf = Array.prototype.indexOf ? Array.prototype.indexOf : function (e) { var t; for (t = 0; t < this.length; ++t)
    if (this[t] === e)
        return t; return -1; }, addFormatToken("M", ["MM", 2], "Mo", function () { return this.month() + 1; }), addFormatToken("MMM", 0, 0, function (e) { return this.localeData().monthsShort(this, e); }), addFormatToken("MMMM", 0, 0, function (e) { return this.localeData().months(this, e); }), addUnitAlias("month", "M"), addUnitPriority("month", 8), addRegexToken("M", match1to2), addRegexToken("MM", match1to2, match2), addRegexToken("MMM", function (e, t) { return t.monthsShortRegex(e); }), addRegexToken("MMMM", function (e, t) { return t.monthsRegex(e); }), addParseToken(["M", "MM"], function (e, t) { t[MONTH] = toInt(e) - 1; }), addParseToken(["MMM", "MMMM"], function (e, t, a, o) { var n = a._locale.monthsParse(e, o, a._strict); null != n ? t[MONTH] = n : getParsingFlags(a).invalidMonth = e; });
var defaultLocaleMonths = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), defaultLocaleMonthsShort = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/, defaultMonthsShortRegex = matchWord, defaultMonthsRegex = matchWord;
function localeMonths(e, t) { return e ? isArray(this._months) ? this._months[e.month()] : this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(t) ? "format" : "standalone"][e.month()] : isArray(this._months) ? this._months : this._months.standalone; }
function localeMonthsShort(e, t) { return e ? isArray(this._monthsShort) ? this._monthsShort[e.month()] : this._monthsShort[MONTHS_IN_FORMAT.test(t) ? "format" : "standalone"][e.month()] : isArray(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone; }
function handleStrictParse(e, t, a) { var o, n, r, s = e.toLocaleLowerCase(); if (!this._monthsParse)
    for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], o = 0; o < 12; ++o)
        r = createUTC([2e3, o]), this._shortMonthsParse[o] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[o] = this.months(r, "").toLocaleLowerCase(); return a ? "MMM" === t ? -1 !== (n = indexOf.call(this._shortMonthsParse, s)) ? n : null : -1 !== (n = indexOf.call(this._longMonthsParse, s)) ? n : null : "MMM" === t ? -1 !== (n = indexOf.call(this._shortMonthsParse, s)) ? n : -1 !== (n = indexOf.call(this._longMonthsParse, s)) ? n : null : -1 !== (n = indexOf.call(this._longMonthsParse, s)) ? n : -1 !== (n = indexOf.call(this._shortMonthsParse, s)) ? n : null; }
function localeMonthsParse(e, t, a) { var o, n, r; if (this._monthsParseExact)
    return handleStrictParse.call(this, e, t, a); for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), o = 0; o < 12; o++) {
    if (n = createUTC([2e3, o]), a && !this._longMonthsParse[o] && (this._longMonthsParse[o] = new RegExp("^" + this.months(n, "").replace(".", "") + "$", "i"), this._shortMonthsParse[o] = new RegExp("^" + this.monthsShort(n, "").replace(".", "") + "$", "i")), a || this._monthsParse[o] || (r = "^" + this.months(n, "") + "|^" + this.monthsShort(n, ""), this._monthsParse[o] = new RegExp(r.replace(".", ""), "i")), a && "MMMM" === t && this._longMonthsParse[o].test(e))
        return o;
    if (a && "MMM" === t && this._shortMonthsParse[o].test(e))
        return o;
    if (!a && this._monthsParse[o].test(e))
        return o;
} }
function setMonth(e, t) { var a; if (!e.isValid())
    return e; if ("string" == typeof t)
    if (/^\d+$/.test(t))
        t = toInt(t);
    else if (!isNumber(t = e.localeData().monthsParse(t)))
        return e; return a = Math.min(e.date(), daysInMonth(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, a), e; }
function getSetMonth(e) { return null != e ? (setMonth(this, e), hooks.updateOffset(this, !0), this) : get(this, "Month"); }
function getDaysInMonth() { return daysInMonth(this.year(), this.month()); }
function monthsShortRegex(e) { return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (hasOwnProp(this, "_monthsShortRegex") || (this._monthsShortRegex = defaultMonthsShortRegex), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex); }
function monthsRegex(e) { return this._monthsParseExact ? (hasOwnProp(this, "_monthsRegex") || computeMonthsParse.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (hasOwnProp(this, "_monthsRegex") || (this._monthsRegex = defaultMonthsRegex), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex); }
function computeMonthsParse() { function e(e, t) { return t.length - e.length; } var t, a, o = [], n = [], r = []; for (t = 0; t < 12; t++)
    a = createUTC([2e3, t]), o.push(this.monthsShort(a, "")), n.push(this.months(a, "")), r.push(this.months(a, "")), r.push(this.monthsShort(a, "")); for (o.sort(e), n.sort(e), r.sort(e), t = 0; t < 12; t++)
    o[t] = regexEscape(o[t]), n[t] = regexEscape(n[t]); for (t = 0; t < 24; t++)
    r[t] = regexEscape(r[t]); this._monthsRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + o.join("|") + ")", "i"); }
function daysInYear(e) { return isLeapYear(e) ? 366 : 365; }
addFormatToken("Y", 0, 0, function () { var e = this.year(); return e <= 9999 ? zeroFill(e, 4) : "+" + e; }), addFormatToken(0, ["YY", 2], 0, function () { return this.year() % 100; }), addFormatToken(0, ["YYYY", 4], 0, "year"), addFormatToken(0, ["YYYYY", 5], 0, "year"), addFormatToken(0, ["YYYYYY", 6, !0], 0, "year"), addUnitAlias("year", "y"), addUnitPriority("year", 1), addRegexToken("Y", matchSigned), addRegexToken("YY", match1to2, match2), addRegexToken("YYYY", match1to4, match4), addRegexToken("YYYYY", match1to6, match6), addRegexToken("YYYYYY", match1to6, match6), addParseToken(["YYYYY", "YYYYYY"], YEAR), addParseToken("YYYY", function (e, t) { t[YEAR] = 2 === e.length ? hooks.parseTwoDigitYear(e) : toInt(e); }), addParseToken("YY", function (e, t) { t[YEAR] = hooks.parseTwoDigitYear(e); }), addParseToken("Y", function (e, t) { t[YEAR] = parseInt(e, 10); }), hooks.parseTwoDigitYear = function (e) { return toInt(e) + (toInt(e) > 68 ? 1900 : 2e3); };
var getSetYear = makeGetSet("FullYear", !0);
function getIsLeapYear() { return isLeapYear(this.year()); }
function createDate(e, t, a, o, n, r, s) { var i; return e < 100 && e >= 0 ? (i = new Date(e + 400, t, a, o, n, r, s), isFinite(i.getFullYear()) && i.setFullYear(e)) : i = new Date(e, t, a, o, n, r, s), i; }
function createUTCDate(e) { var t, a; return e < 100 && e >= 0 ? ((a = Array.prototype.slice.call(arguments))[0] = e + 400, t = new Date(Date.UTC.apply(null, a)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t; }
function firstWeekOffset(e, t, a) { var o = 7 + t - a; return -(7 + createUTCDate(e, 0, o).getUTCDay() - t) % 7 + o - 1; }
function dayOfYearFromWeeks(e, t, a, o, n) { var r, s, i = 1 + 7 * (t - 1) + (7 + a - o) % 7 + firstWeekOffset(e, o, n); return i <= 0 ? s = daysInYear(r = e - 1) + i : i > daysInYear(e) ? (r = e + 1, s = i - daysInYear(e)) : (r = e, s = i), { year: r, dayOfYear: s }; }
function weekOfYear(e, t, a) { var o, n, r = firstWeekOffset(e.year(), t, a), s = Math.floor((e.dayOfYear() - r - 1) / 7) + 1; return s < 1 ? o = s + weeksInYear(n = e.year() - 1, t, a) : s > weeksInYear(e.year(), t, a) ? (o = s - weeksInYear(e.year(), t, a), n = e.year() + 1) : (n = e.year(), o = s), { week: o, year: n }; }
function weeksInYear(e, t, a) { var o = firstWeekOffset(e, t, a), n = firstWeekOffset(e + 1, t, a); return (daysInYear(e) - o + n) / 7; }
function localeWeek(e) { return weekOfYear(e, this._week.dow, this._week.doy).week; }
addFormatToken("w", ["ww", 2], "wo", "week"), addFormatToken("W", ["WW", 2], "Wo", "isoWeek"), addUnitAlias("week", "w"), addUnitAlias("isoWeek", "W"), addUnitPriority("week", 5), addUnitPriority("isoWeek", 5), addRegexToken("w", match1to2), addRegexToken("ww", match1to2, match2), addRegexToken("W", match1to2), addRegexToken("WW", match1to2, match2), addWeekParseToken(["w", "ww", "W", "WW"], function (e, t, a, o) { t[o.substr(0, 1)] = toInt(e); });
var defaultLocaleWeek = { dow: 0, doy: 6 };
function localeFirstDayOfWeek() { return this._week.dow; }
function localeFirstDayOfYear() { return this._week.doy; }
function getSetWeek(e) { var t = this.localeData().week(this); return null == e ? t : this.add(7 * (e - t), "d"); }
function getSetISOWeek(e) { var t = weekOfYear(this, 1, 4).week; return null == e ? t : this.add(7 * (e - t), "d"); }
function parseWeekday(e, t) { return "string" != typeof e ? e : isNaN(e) ? "number" == typeof (e = t.weekdaysParse(e)) ? e : null : parseInt(e, 10); }
function parseIsoWeekday(e, t) { return "string" == typeof e ? t.weekdaysParse(e) % 7 || 7 : isNaN(e) ? null : e; }
function shiftWeekdays(e, t) { return e.slice(t, 7).concat(e.slice(0, t)); }
addFormatToken("d", 0, "do", "day"), addFormatToken("dd", 0, 0, function (e) { return this.localeData().weekdaysMin(this, e); }), addFormatToken("ddd", 0, 0, function (e) { return this.localeData().weekdaysShort(this, e); }), addFormatToken("dddd", 0, 0, function (e) { return this.localeData().weekdays(this, e); }), addFormatToken("e", 0, 0, "weekday"), addFormatToken("E", 0, 0, "isoWeekday"), addUnitAlias("day", "d"), addUnitAlias("weekday", "e"), addUnitAlias("isoWeekday", "E"), addUnitPriority("day", 11), addUnitPriority("weekday", 11), addUnitPriority("isoWeekday", 11), addRegexToken("d", match1to2), addRegexToken("e", match1to2), addRegexToken("E", match1to2), addRegexToken("dd", function (e, t) { return t.weekdaysMinRegex(e); }), addRegexToken("ddd", function (e, t) { return t.weekdaysShortRegex(e); }), addRegexToken("dddd", function (e, t) { return t.weekdaysRegex(e); }), addWeekParseToken(["dd", "ddd", "dddd"], function (e, t, a, o) { var n = a._locale.weekdaysParse(e, o, a._strict); null != n ? t.d = n : getParsingFlags(a).invalidWeekday = e; }), addWeekParseToken(["d", "e", "E"], function (e, t, a, o) { t[o] = toInt(e); });
var defaultLocaleWeekdays = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), defaultWeekdaysRegex = matchWord, defaultWeekdaysShortRegex = matchWord, defaultWeekdaysMinRegex = matchWord;
function localeWeekdays(e, t) { var a = isArray(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(t) ? "format" : "standalone"]; return !0 === e ? shiftWeekdays(a, this._week.dow) : e ? a[e.day()] : a; }
function localeWeekdaysShort(e) { return !0 === e ? shiftWeekdays(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort; }
function localeWeekdaysMin(e) { return !0 === e ? shiftWeekdays(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin; }
function handleStrictParse$1(e, t, a) { var o, n, r, s = e.toLocaleLowerCase(); if (!this._weekdaysParse)
    for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], o = 0; o < 7; ++o)
        r = createUTC([2e3, 1]).day(o), this._minWeekdaysParse[o] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[o] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[o] = this.weekdays(r, "").toLocaleLowerCase(); return a ? "dddd" === t ? -1 !== (n = indexOf.call(this._weekdaysParse, s)) ? n : null : "ddd" === t ? -1 !== (n = indexOf.call(this._shortWeekdaysParse, s)) ? n : null : -1 !== (n = indexOf.call(this._minWeekdaysParse, s)) ? n : null : "dddd" === t ? -1 !== (n = indexOf.call(this._weekdaysParse, s)) ? n : -1 !== (n = indexOf.call(this._shortWeekdaysParse, s)) ? n : -1 !== (n = indexOf.call(this._minWeekdaysParse, s)) ? n : null : "ddd" === t ? -1 !== (n = indexOf.call(this._shortWeekdaysParse, s)) ? n : -1 !== (n = indexOf.call(this._weekdaysParse, s)) ? n : -1 !== (n = indexOf.call(this._minWeekdaysParse, s)) ? n : null : -1 !== (n = indexOf.call(this._minWeekdaysParse, s)) ? n : -1 !== (n = indexOf.call(this._weekdaysParse, s)) ? n : -1 !== (n = indexOf.call(this._shortWeekdaysParse, s)) ? n : null; }
function localeWeekdaysParse(e, t, a) { var o, n, r; if (this._weekdaysParseExact)
    return handleStrictParse$1.call(this, e, t, a); for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), o = 0; o < 7; o++) {
    if (n = createUTC([2e3, 1]).day(o), a && !this._fullWeekdaysParse[o] && (this._fullWeekdaysParse[o] = new RegExp("^" + this.weekdays(n, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[o] = new RegExp("^" + this.weekdaysShort(n, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[o] = new RegExp("^" + this.weekdaysMin(n, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[o] || (r = "^" + this.weekdays(n, "") + "|^" + this.weekdaysShort(n, "") + "|^" + this.weekdaysMin(n, ""), this._weekdaysParse[o] = new RegExp(r.replace(".", ""), "i")), a && "dddd" === t && this._fullWeekdaysParse[o].test(e))
        return o;
    if (a && "ddd" === t && this._shortWeekdaysParse[o].test(e))
        return o;
    if (a && "dd" === t && this._minWeekdaysParse[o].test(e))
        return o;
    if (!a && this._weekdaysParse[o].test(e))
        return o;
} }
function getSetDayOfWeek(e) { if (!this.isValid())
    return null != e ? this : NaN; var t = this._isUTC ? this._d.getUTCDay() : this._d.getDay(); return null != e ? (e = parseWeekday(e, this.localeData()), this.add(e - t, "d")) : t; }
function getSetLocaleDayOfWeek(e) { if (!this.isValid())
    return null != e ? this : NaN; var t = (this.day() + 7 - this.localeData()._week.dow) % 7; return null == e ? t : this.add(e - t, "d"); }
function getSetISODayOfWeek(e) { if (!this.isValid())
    return null != e ? this : NaN; if (null != e) {
    var t = parseIsoWeekday(e, this.localeData());
    return this.day(this.day() % 7 ? t : t - 7);
} return this.day() || 7; }
function weekdaysRegex(e) { return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (hasOwnProp(this, "_weekdaysRegex") || (this._weekdaysRegex = defaultWeekdaysRegex), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex); }
function weekdaysShortRegex(e) { return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (hasOwnProp(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = defaultWeekdaysShortRegex), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex); }
function weekdaysMinRegex(e) { return this._weekdaysParseExact ? (hasOwnProp(this, "_weekdaysRegex") || computeWeekdaysParse.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (hasOwnProp(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = defaultWeekdaysMinRegex), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex); }
function computeWeekdaysParse() { function e(e, t) { return t.length - e.length; } var t, a, o, n, r, s = [], i = [], d = [], l = []; for (t = 0; t < 7; t++)
    a = createUTC([2e3, 1]).day(t), o = regexEscape(this.weekdaysMin(a, "")), n = regexEscape(this.weekdaysShort(a, "")), r = regexEscape(this.weekdays(a, "")), s.push(o), i.push(n), d.push(r), l.push(o), l.push(n), l.push(r); s.sort(e), i.sort(e), d.sort(e), l.sort(e), this._weekdaysRegex = new RegExp("^(" + l.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + d.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + s.join("|") + ")", "i"); }
function hFormat() { return this.hours() % 12 || 12; }
function kFormat() { return this.hours() || 24; }
function meridiem(e, t) { addFormatToken(e, 0, 0, function () { return this.localeData().meridiem(this.hours(), this.minutes(), t); }); }
function matchMeridiem(e, t) { return t._meridiemParse; }
function localeIsPM(e) { return "p" === (e + "").toLowerCase().charAt(0); }
addFormatToken("H", ["HH", 2], 0, "hour"), addFormatToken("h", ["hh", 2], 0, hFormat), addFormatToken("k", ["kk", 2], 0, kFormat), addFormatToken("hmm", 0, 0, function () { return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2); }), addFormatToken("hmmss", 0, 0, function () { return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2); }), addFormatToken("Hmm", 0, 0, function () { return "" + this.hours() + zeroFill(this.minutes(), 2); }), addFormatToken("Hmmss", 0, 0, function () { return "" + this.hours() + zeroFill(this.minutes(), 2) + zeroFill(this.seconds(), 2); }), meridiem("a", !0), meridiem("A", !1), addUnitAlias("hour", "h"), addUnitPriority("hour", 13), addRegexToken("a", matchMeridiem), addRegexToken("A", matchMeridiem), addRegexToken("H", match1to2), addRegexToken("h", match1to2), addRegexToken("k", match1to2), addRegexToken("HH", match1to2, match2), addRegexToken("hh", match1to2, match2), addRegexToken("kk", match1to2, match2), addRegexToken("hmm", match3to4), addRegexToken("hmmss", match5to6), addRegexToken("Hmm", match3to4), addRegexToken("Hmmss", match5to6), addParseToken(["H", "HH"], HOUR), addParseToken(["k", "kk"], function (e, t, a) { var o = toInt(e); t[HOUR] = 24 === o ? 0 : o; }), addParseToken(["a", "A"], function (e, t, a) { a._isPm = a._locale.isPM(e), a._meridiem = e; }), addParseToken(["h", "hh"], function (e, t, a) { t[HOUR] = toInt(e), getParsingFlags(a).bigHour = !0; }), addParseToken("hmm", function (e, t, a) { var o = e.length - 2; t[HOUR] = toInt(e.substr(0, o)), t[MINUTE] = toInt(e.substr(o)), getParsingFlags(a).bigHour = !0; }), addParseToken("hmmss", function (e, t, a) { var o = e.length - 4, n = e.length - 2; t[HOUR] = toInt(e.substr(0, o)), t[MINUTE] = toInt(e.substr(o, 2)), t[SECOND] = toInt(e.substr(n)), getParsingFlags(a).bigHour = !0; }), addParseToken("Hmm", function (e, t, a) { var o = e.length - 2; t[HOUR] = toInt(e.substr(0, o)), t[MINUTE] = toInt(e.substr(o)); }), addParseToken("Hmmss", function (e, t, a) { var o = e.length - 4, n = e.length - 2; t[HOUR] = toInt(e.substr(0, o)), t[MINUTE] = toInt(e.substr(o, 2)), t[SECOND] = toInt(e.substr(n)); });
var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i, getSetHour = makeGetSet("Hours", !0);
function localeMeridiem(e, t, a) { return e > 11 ? a ? "pm" : "PM" : a ? "am" : "AM"; }
var globalLocale, baseConfig = { calendar: defaultCalendar, longDateFormat: defaultLongDateFormat, invalidDate: defaultInvalidDate, ordinal: defaultOrdinal, dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse, relativeTime: defaultRelativeTime, months: defaultLocaleMonths, monthsShort: defaultLocaleMonthsShort, week: defaultLocaleWeek, weekdays: defaultLocaleWeekdays, weekdaysMin: defaultLocaleWeekdaysMin, weekdaysShort: defaultLocaleWeekdaysShort, meridiemParse: defaultLocaleMeridiemParse }, locales = {}, localeFamilies = {};
function commonPrefix(e, t) { var a, o = Math.min(e.length, t.length); for (a = 0; a < o; a += 1)
    if (e[a] !== t[a])
        return a; return o; }
function normalizeLocale(e) { return e ? e.toLowerCase().replace("_", "-") : e; }
function chooseLocale(e) { for (var t, a, o, n, r = 0; r < e.length;) {
    for (t = (n = normalizeLocale(e[r]).split("-")).length, a = (a = normalizeLocale(e[r + 1])) ? a.split("-") : null; t > 0;) {
        if (o = loadLocale(n.slice(0, t).join("-")))
            return o;
        if (a && a.length >= t && commonPrefix(n, a) >= t - 1)
            break;
        t--;
    }
    r++;
} return globalLocale; }
function loadLocale(e) { var t = null; if (void 0 === locales[e] && "undefined" != typeof module && module && module.exports)
    try {
        t = globalLocale._abbr, require("./locale/" + e), getSetGlobalLocale(t);
    }
    catch (t) {
        locales[e] = null;
    } return locales[e]; }
function getSetGlobalLocale(e, t) { var a; return e && ((a = isUndefined(t) ? getLocale(e) : defineLocale(e, t)) ? globalLocale = a : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), globalLocale._abbr; }
function defineLocale(e, t) { if (null !== t) {
    var a, o = baseConfig;
    if (t.abbr = e, null != locales[e])
        deprecateSimple("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), o = locales[e]._config;
    else if (null != t.parentLocale)
        if (null != locales[t.parentLocale])
            o = locales[t.parentLocale]._config;
        else {
            if (null == (a = loadLocale(t.parentLocale)))
                return localeFamilies[t.parentLocale] || (localeFamilies[t.parentLocale] = []), localeFamilies[t.parentLocale].push({ name: e, config: t }), null;
            o = a._config;
        }
    return locales[e] = new Locale(mergeConfigs(o, t)), localeFamilies[e] && localeFamilies[e].forEach(function (e) { defineLocale(e.name, e.config); }), getSetGlobalLocale(e), locales[e];
} return delete locales[e], null; }
function updateLocale(e, t) { if (null != t) {
    var a, o, n = baseConfig;
    null != locales[e] && null != locales[e].parentLocale ? locales[e].set(mergeConfigs(locales[e]._config, t)) : (null != (o = loadLocale(e)) && (n = o._config), t = mergeConfigs(n, t), null == o && (t.abbr = e), (a = new Locale(t)).parentLocale = locales[e], locales[e] = a), getSetGlobalLocale(e);
}
else
    null != locales[e] && (null != locales[e].parentLocale ? (locales[e] = locales[e].parentLocale, e === getSetGlobalLocale() && getSetGlobalLocale(e)) : null != locales[e] && delete locales[e]); return locales[e]; }
function getLocale(e) { var t; if (e && e._locale && e._locale._abbr && (e = e._locale._abbr), !e)
    return globalLocale; if (!isArray(e)) {
    if (t = loadLocale(e))
        return t;
    e = [e];
} return chooseLocale(e); }
function listLocales() { return keys(locales); }
function checkOverflow(e) { var t, a = e._a; return a && -2 === getParsingFlags(e).overflow && (t = a[MONTH] < 0 || a[MONTH] > 11 ? MONTH : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH]) ? DATE : a[HOUR] < 0 || a[HOUR] > 24 || 24 === a[HOUR] && (0 !== a[MINUTE] || 0 !== a[SECOND] || 0 !== a[MILLISECOND]) ? HOUR : a[MINUTE] < 0 || a[MINUTE] > 59 ? MINUTE : a[SECOND] < 0 || a[SECOND] > 59 ? SECOND : a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND : -1, getParsingFlags(e)._overflowDayOfYear && (t < YEAR || t > DATE) && (t = DATE), getParsingFlags(e)._overflowWeeks && -1 === t && (t = WEEK), getParsingFlags(e)._overflowWeekday && -1 === t && (t = WEEKDAY), getParsingFlags(e).overflow = t), e; }
var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/, tzRegex = /Z|[+-]\d\d(?::?\d\d)?/, isoDates = [["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/], ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/], ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/], ["GGGG-[W]WW", /\d{4}-W\d\d/, !1], ["YYYY-DDD", /\d{4}-\d{3}/], ["YYYY-MM", /\d{4}-\d\d/, !1], ["YYYYYYMMDD", /[+-]\d{10}/], ["YYYYMMDD", /\d{8}/], ["GGGG[W]WWE", /\d{4}W\d{3}/], ["GGGG[W]WW", /\d{4}W\d{2}/, !1], ["YYYYDDD", /\d{7}/], ["YYYYMM", /\d{6}/, !1], ["YYYY", /\d{4}/, !1]], isoTimes = [["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/], ["HH:mm:ss", /\d\d:\d\d:\d\d/], ["HH:mm", /\d\d:\d\d/], ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/], ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/], ["HHmmss", /\d\d\d\d\d\d/], ["HHmm", /\d\d\d\d/], ["HH", /\d\d/]], aspNetJsonRegex = /^\/?Date\((-?\d+)/i, rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/, obsOffsets = { UT: 0, GMT: 0, EDT: -240, EST: -300, CDT: -300, CST: -360, MDT: -360, MST: -420, PDT: -420, PST: -480 };
function configFromISO(e) { var t, a, o, n, r, s, i = e._i, d = extendedIsoRegex.exec(i) || basicIsoRegex.exec(i); if (d) {
    for (getParsingFlags(e).iso = !0, t = 0, a = isoDates.length; t < a; t++)
        if (isoDates[t][1].exec(d[1])) {
            n = isoDates[t][0], o = !1 !== isoDates[t][2];
            break;
        }
    if (null == n)
        return void (e._isValid = !1);
    if (d[3]) {
        for (t = 0, a = isoTimes.length; t < a; t++)
            if (isoTimes[t][1].exec(d[3])) {
                r = (d[2] || " ") + isoTimes[t][0];
                break;
            }
        if (null == r)
            return void (e._isValid = !1);
    }
    if (!o && null != r)
        return void (e._isValid = !1);
    if (d[4]) {
        if (!tzRegex.exec(d[4]))
            return void (e._isValid = !1);
        s = "Z";
    }
    e._f = n + (r || "") + (s || ""), configFromStringAndFormat(e);
}
else
    e._isValid = !1; }
function extractFromRFC2822Strings(e, t, a, o, n, r) { var s = [untruncateYear(e), defaultLocaleMonthsShort.indexOf(t), parseInt(a, 10), parseInt(o, 10), parseInt(n, 10)]; return r && s.push(parseInt(r, 10)), s; }
function untruncateYear(e) { var t = parseInt(e, 10); return t <= 49 ? 2e3 + t : t <= 999 ? 1900 + t : t; }
function preprocessRFC2822(e) { return e.replace(/\([^)]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""); }
function checkWeekday(e, t, a) { return !e || defaultLocaleWeekdaysShort.indexOf(e) === new Date(t[0], t[1], t[2]).getDay() || (getParsingFlags(a).weekdayMismatch = !0, a._isValid = !1, !1); }
function calculateOffset(e, t, a) { if (e)
    return obsOffsets[e]; if (t)
    return 0; var o = parseInt(a, 10), n = o % 100; return (o - n) / 100 * 60 + n; }
function configFromRFC2822(e) { var t, a = rfc2822.exec(preprocessRFC2822(e._i)); if (a) {
    if (t = extractFromRFC2822Strings(a[4], a[3], a[2], a[5], a[6], a[7]), !checkWeekday(a[1], t, e))
        return;
    e._a = t, e._tzm = calculateOffset(a[8], a[9], a[10]), e._d = createUTCDate.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), getParsingFlags(e).rfc2822 = !0;
}
else
    e._isValid = !1; }
function configFromString(e) { var t = aspNetJsonRegex.exec(e._i); null === t ? (configFromISO(e), !1 === e._isValid && (delete e._isValid, configFromRFC2822(e), !1 === e._isValid && (delete e._isValid, e._strict ? e._isValid = !1 : hooks.createFromInputFallback(e)))) : e._d = new Date(+t[1]); }
function defaults(e, t, a) { return null != e ? e : null != t ? t : a; }
function currentDateArray(e) { var t = new Date(hooks.now()); return e._useUTC ? [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()] : [t.getFullYear(), t.getMonth(), t.getDate()]; }
function configFromArray(e) { var t, a, o, n, r, s = []; if (!e._d) {
    for (o = currentDateArray(e), e._w && null == e._a[DATE] && null == e._a[MONTH] && dayOfYearFromWeekInfo(e), null != e._dayOfYear && (r = defaults(e._a[YEAR], o[YEAR]), (e._dayOfYear > daysInYear(r) || 0 === e._dayOfYear) && (getParsingFlags(e)._overflowDayOfYear = !0), a = createUTCDate(r, 0, e._dayOfYear), e._a[MONTH] = a.getUTCMonth(), e._a[DATE] = a.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t)
        e._a[t] = s[t] = o[t];
    for (; t < 7; t++)
        e._a[t] = s[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
    24 === e._a[HOUR] && 0 === e._a[MINUTE] && 0 === e._a[SECOND] && 0 === e._a[MILLISECOND] && (e._nextDay = !0, e._a[HOUR] = 0), e._d = (e._useUTC ? createUTCDate : createDate).apply(null, s), n = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[HOUR] = 24), e._w && void 0 !== e._w.d && e._w.d !== n && (getParsingFlags(e).weekdayMismatch = !0);
} }
function dayOfYearFromWeekInfo(e) { var t, a, o, n, r, s, i, d, l; null != (t = e._w).GG || null != t.W || null != t.E ? (r = 1, s = 4, a = defaults(t.GG, e._a[YEAR], weekOfYear(createLocal(), 1, 4).year), o = defaults(t.W, 1), ((n = defaults(t.E, 1)) < 1 || n > 7) && (d = !0)) : (r = e._locale._week.dow, s = e._locale._week.doy, l = weekOfYear(createLocal(), r, s), a = defaults(t.gg, e._a[YEAR], l.year), o = defaults(t.w, l.week), null != t.d ? ((n = t.d) < 0 || n > 6) && (d = !0) : null != t.e ? (n = t.e + r, (t.e < 0 || t.e > 6) && (d = !0)) : n = r), o < 1 || o > weeksInYear(a, r, s) ? getParsingFlags(e)._overflowWeeks = !0 : null != d ? getParsingFlags(e)._overflowWeekday = !0 : (i = dayOfYearFromWeeks(a, o, n, r, s), e._a[YEAR] = i.year, e._dayOfYear = i.dayOfYear); }
function configFromStringAndFormat(e) { if (e._f !== hooks.ISO_8601)
    if (e._f !== hooks.RFC_2822) {
        e._a = [], getParsingFlags(e).empty = !0;
        var t, a, o, n, r, s, i = "" + e._i, d = i.length, l = 0;
        for (o = expandFormat(e._f, e._locale).match(formattingTokens) || [], t = 0; t < o.length; t++)
            (a = (i.match(getParseRegexForToken(n = o[t], e)) || [])[0]) && ((r = i.substr(0, i.indexOf(a))).length > 0 && getParsingFlags(e).unusedInput.push(r), i = i.slice(i.indexOf(a) + a.length), l += a.length), formatTokenFunctions[n] ? (a ? getParsingFlags(e).empty = !1 : getParsingFlags(e).unusedTokens.push(n), addTimeToArrayFromToken(n, a, e)) : e._strict && !a && getParsingFlags(e).unusedTokens.push(n);
        getParsingFlags(e).charsLeftOver = d - l, i.length > 0 && getParsingFlags(e).unusedInput.push(i), e._a[HOUR] <= 12 && !0 === getParsingFlags(e).bigHour && e._a[HOUR] > 0 && (getParsingFlags(e).bigHour = void 0), getParsingFlags(e).parsedDateParts = e._a.slice(0), getParsingFlags(e).meridiem = e._meridiem, e._a[HOUR] = meridiemFixWrap(e._locale, e._a[HOUR], e._meridiem), null !== (s = getParsingFlags(e).era) && (e._a[YEAR] = e._locale.erasConvertYear(s, e._a[YEAR])), configFromArray(e), checkOverflow(e);
    }
    else
        configFromRFC2822(e);
else
    configFromISO(e); }
function meridiemFixWrap(e, t, a) { var o; return null == a ? t : null != e.meridiemHour ? e.meridiemHour(t, a) : null != e.isPM ? ((o = e.isPM(a)) && t < 12 && (t += 12), o || 12 !== t || (t = 0), t) : t; }
function configFromStringAndArray(e) { var t, a, o, n, r, s, i = !1; if (0 === e._f.length)
    return getParsingFlags(e).invalidFormat = !0, void (e._d = new Date(NaN)); for (n = 0; n < e._f.length; n++)
    r = 0, s = !1, t = copyConfig({}, e), null != e._useUTC && (t._useUTC = e._useUTC), t._f = e._f[n], configFromStringAndFormat(t), isValid(t) && (s = !0), r += getParsingFlags(t).charsLeftOver, r += 10 * getParsingFlags(t).unusedTokens.length, getParsingFlags(t).score = r, i ? r < o && (o = r, a = t) : (null == o || r < o || s) && (o = r, a = t, s && (i = !0)); extend(e, a || t); }
function configFromObject(e) { if (!e._d) {
    var t = normalizeObjectUnits(e._i);
    e._a = map([t.year, t.month, void 0 === t.day ? t.date : t.day, t.hour, t.minute, t.second, t.millisecond], function (e) { return e && parseInt(e, 10); }), configFromArray(e);
} }
function createFromConfig(e) { var t = new Moment(checkOverflow(prepareConfig(e))); return t._nextDay && (t.add(1, "d"), t._nextDay = void 0), t; }
function prepareConfig(e) { var t = e._i, a = e._f; return e._locale = e._locale || getLocale(e._l), null === t || void 0 === a && "" === t ? createInvalid({ nullInput: !0 }) : ("string" == typeof t && (e._i = t = e._locale.preparse(t)), isMoment(t) ? new Moment(checkOverflow(t)) : (isDate(t) ? e._d = t : isArray(a) ? configFromStringAndArray(e) : a ? configFromStringAndFormat(e) : configFromInput(e), isValid(e) || (e._d = null), e)); }
function configFromInput(e) { var t = e._i; isUndefined(t) ? e._d = new Date(hooks.now()) : isDate(t) ? e._d = new Date(t.valueOf()) : "string" == typeof t ? configFromString(e) : isArray(t) ? (e._a = map(t.slice(0), function (e) { return parseInt(e, 10); }), configFromArray(e)) : isObject(t) ? configFromObject(e) : isNumber(t) ? e._d = new Date(t) : hooks.createFromInputFallback(e); }
function createLocalOrUTC(e, t, a, o, n) { var r = {}; return !0 !== t && !1 !== t || (o = t, t = void 0), !0 !== a && !1 !== a || (o = a, a = void 0), (isObject(e) && isObjectEmpty(e) || isArray(e) && 0 === e.length) && (e = void 0), r._isAMomentObject = !0, r._useUTC = r._isUTC = n, r._l = a, r._i = e, r._f = t, r._strict = o, createFromConfig(r); }
function createLocal(e, t, a, o) { return createLocalOrUTC(e, t, a, o, !1); }
hooks.createFromInputFallback = deprecate("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function (e) { e._d = new Date(e._i + (e._useUTC ? " UTC" : "")); }), hooks.ISO_8601 = function () { }, hooks.RFC_2822 = function () { };
var prototypeMin = deprecate("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var e = createLocal.apply(null, arguments); return this.isValid() && e.isValid() ? e < this ? this : e : createInvalid(); }), prototypeMax = deprecate("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function () { var e = createLocal.apply(null, arguments); return this.isValid() && e.isValid() ? e > this ? this : e : createInvalid(); });
function pickBy(e, t) { var a, o; if (1 === t.length && isArray(t[0]) && (t = t[0]), !t.length)
    return createLocal(); for (a = t[0], o = 1; o < t.length; ++o)
    t[o].isValid() && !t[o][e](a) || (a = t[o]); return a; }
function min() { return pickBy("isBefore", [].slice.call(arguments, 0)); }
function max() { return pickBy("isAfter", [].slice.call(arguments, 0)); }
var now = function () { return Date.now ? Date.now() : +new Date; }, ordering = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];
function isDurationValid(e) { var t, a, o = !1; for (t in e)
    if (hasOwnProp(e, t) && (-1 === indexOf.call(ordering, t) || null != e[t] && isNaN(e[t])))
        return !1; for (a = 0; a < ordering.length; ++a)
    if (e[ordering[a]]) {
        if (o)
            return !1;
        parseFloat(e[ordering[a]]) !== toInt(e[ordering[a]]) && (o = !0);
    } return !0; }
function isValid$1() { return this._isValid; }
function createInvalid$1() { return createDuration(NaN); }
function Duration(e) { var t = normalizeObjectUnits(e), a = t.year || 0, o = t.quarter || 0, n = t.month || 0, r = t.week || t.isoWeek || 0, s = t.day || 0, i = t.hour || 0, d = t.minute || 0, l = t.second || 0, c = t.millisecond || 0; this._isValid = isDurationValid(t), this._milliseconds = +c + 1e3 * l + 6e4 * d + 1e3 * i * 60 * 60, this._days = +s + 7 * r, this._months = +n + 3 * o + 12 * a, this._data = {}, this._locale = getLocale(), this._bubble(); }
function isDuration(e) { return e instanceof Duration; }
function absRound(e) { return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e); }
function compareArrays(e, t, a) { var o, n = Math.min(e.length, t.length), r = Math.abs(e.length - t.length), s = 0; for (o = 0; o < n; o++)
    (a && e[o] !== t[o] || !a && toInt(e[o]) !== toInt(t[o])) && s++; return s + r; }
function offset(e, t) { addFormatToken(e, 0, 0, function () { var e = this.utcOffset(), a = "+"; return e < 0 && (e = -e, a = "-"), a + zeroFill(~~(e / 60), 2) + t + zeroFill(~~e % 60, 2); }); }
offset("Z", ":"), offset("ZZ", ""), addRegexToken("Z", matchShortOffset), addRegexToken("ZZ", matchShortOffset), addParseToken(["Z", "ZZ"], function (e, t, a) { a._useUTC = !0, a._tzm = offsetFromString(matchShortOffset, e); });
var chunkOffset = /([\+\-]|\d\d)/gi;
function offsetFromString(e, t) { var a, o, n = (t || "").match(e); return null === n ? null : 0 === (o = 60 * (a = ((n[n.length - 1] || []) + "").match(chunkOffset) || ["-", 0, 0])[1] + toInt(a[2])) ? 0 : "+" === a[0] ? o : -o; }
function cloneWithOffset(e, t) { var a, o; return t._isUTC ? (a = t.clone(), o = (isMoment(e) || isDate(e) ? e.valueOf() : createLocal(e).valueOf()) - a.valueOf(), a._d.setTime(a._d.valueOf() + o), hooks.updateOffset(a, !1), a) : createLocal(e).local(); }
function getDateOffset(e) { return -Math.round(e._d.getTimezoneOffset()); }
function getSetOffset(e, t, a) { var o, n = this._offset || 0; if (!this.isValid())
    return null != e ? this : NaN; if (null != e) {
    if ("string" == typeof e) {
        if (null === (e = offsetFromString(matchShortOffset, e)))
            return this;
    }
    else
        Math.abs(e) < 16 && !a && (e *= 60);
    return !this._isUTC && t && (o = getDateOffset(this)), this._offset = e, this._isUTC = !0, null != o && this.add(o, "m"), n !== e && (!t || this._changeInProgress ? addSubtract(this, createDuration(e - n, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, hooks.updateOffset(this, !0), this._changeInProgress = null)), this;
} return this._isUTC ? n : getDateOffset(this); }
function getSetZone(e, t) { return null != e ? ("string" != typeof e && (e = -e), this.utcOffset(e, t), this) : -this.utcOffset(); }
function setOffsetToUTC(e) { return this.utcOffset(0, e); }
function setOffsetToLocal(e) { return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e && this.subtract(getDateOffset(this), "m")), this; }
function setOffsetToParsedOffset() { if (null != this._tzm)
    this.utcOffset(this._tzm, !1, !0);
else if ("string" == typeof this._i) {
    var e = offsetFromString(matchOffset, this._i);
    null != e ? this.utcOffset(e) : this.utcOffset(0, !0);
} return this; }
function hasAlignedHourOffset(e) { return !!this.isValid() && (e = e ? createLocal(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0); }
function isDaylightSavingTime() { return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset(); }
function isDaylightSavingTimeShifted() { if (!isUndefined(this._isDSTShifted))
    return this._isDSTShifted; var e, t = {}; return copyConfig(t, this), (t = prepareConfig(t))._a ? (e = t._isUTC ? createUTC(t._a) : createLocal(t._a), this._isDSTShifted = this.isValid() && compareArrays(t._a, e.toArray()) > 0) : this._isDSTShifted = !1, this._isDSTShifted; }
function isLocal() { return !!this.isValid() && !this._isUTC; }
function isUtcOffset() { return !!this.isValid() && this._isUTC; }
function isUtc() { return !!this.isValid() && this._isUTC && 0 === this._offset; }
hooks.updateOffset = function () { };
var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/, isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
function createDuration(e, t) { var a, o, n, r = e, s = null; return isDuration(e) ? r = { ms: e._milliseconds, d: e._days, M: e._months } : isNumber(e) || !isNaN(+e) ? (r = {}, t ? r[t] = +e : r.milliseconds = +e) : (s = aspNetRegex.exec(e)) ? (a = "-" === s[1] ? -1 : 1, r = { y: 0, d: toInt(s[DATE]) * a, h: toInt(s[HOUR]) * a, m: toInt(s[MINUTE]) * a, s: toInt(s[SECOND]) * a, ms: toInt(absRound(1e3 * s[MILLISECOND])) * a }) : (s = isoRegex.exec(e)) ? r = { y: parseIso(s[2], a = "-" === s[1] ? -1 : 1), M: parseIso(s[3], a), w: parseIso(s[4], a), d: parseIso(s[5], a), h: parseIso(s[6], a), m: parseIso(s[7], a), s: parseIso(s[8], a) } : null == r ? r = {} : "object" == typeof r && ("from" in r || "to" in r) && (n = momentsDifference(createLocal(r.from), createLocal(r.to)), (r = {}).ms = n.milliseconds, r.M = n.months), o = new Duration(r), isDuration(e) && hasOwnProp(e, "_locale") && (o._locale = e._locale), isDuration(e) && hasOwnProp(e, "_isValid") && (o._isValid = e._isValid), o; }
function parseIso(e, t) { var a = e && parseFloat(e.replace(",", ".")); return (isNaN(a) ? 0 : a) * t; }
function positiveMomentsDifference(e, t) { var a = {}; return a.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(a.months, "M").isAfter(t) && --a.months, a.milliseconds = +t - +e.clone().add(a.months, "M"), a; }
function momentsDifference(e, t) { var a; return e.isValid() && t.isValid() ? (t = cloneWithOffset(t, e), e.isBefore(t) ? a = positiveMomentsDifference(e, t) : ((a = positiveMomentsDifference(t, e)).milliseconds = -a.milliseconds, a.months = -a.months), a) : { milliseconds: 0, months: 0 }; }
function createAdder(e, t) { return function (a, o) { var n; return null === o || isNaN(+o) || (deprecateSimple(t, "moment()." + t + "(period, number) is deprecated. Please use moment()." + t + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), n = a, a = o, o = n), addSubtract(this, createDuration(a, o), e), this; }; }
function addSubtract(e, t, a, o) { var n = t._milliseconds, r = absRound(t._days), s = absRound(t._months); e.isValid() && (o = null == o || o, s && setMonth(e, get(e, "Month") + s * a), r && set$1(e, "Date", get(e, "Date") + r * a), n && e._d.setTime(e._d.valueOf() + n * a), o && hooks.updateOffset(e, r || s)); }
createDuration.fn = Duration.prototype, createDuration.invalid = createInvalid$1;
var add = createAdder(1, "add"), subtract = createAdder(-1, "subtract");
function isString(e) { return "string" == typeof e || e instanceof String; }
function isMomentInput(e) { return isMoment(e) || isDate(e) || isString(e) || isNumber(e) || isNumberOrStringArray(e) || isMomentInputObject(e) || null == e; }
function isMomentInputObject(e) { var t, a = isObject(e) && !isObjectEmpty(e), o = !1, n = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"]; for (t = 0; t < n.length; t += 1)
    o = o || hasOwnProp(e, n[t]); return a && o; }
function isNumberOrStringArray(e) { var t = isArray(e), a = !1; return t && (a = 0 === e.filter(function (t) { return !isNumber(t) && isString(e); }).length), t && a; }
function isCalendarSpec(e) { var t, a = isObject(e) && !isObjectEmpty(e), o = !1, n = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"]; for (t = 0; t < n.length; t += 1)
    o = o || hasOwnProp(e, n[t]); return a && o; }
function getCalendarFormat(e, t) { var a = e.diff(t, "days", !0); return a < -6 ? "sameElse" : a < -1 ? "lastWeek" : a < 0 ? "lastDay" : a < 1 ? "sameDay" : a < 2 ? "nextDay" : a < 7 ? "nextWeek" : "sameElse"; }
function calendar$1(e, t) { 1 === arguments.length && (arguments[0] ? isMomentInput(arguments[0]) ? (e = arguments[0], t = void 0) : isCalendarSpec(arguments[0]) && (t = arguments[0], e = void 0) : (e = void 0, t = void 0)); var a = e || createLocal(), o = cloneWithOffset(a, this).startOf("day"), n = hooks.calendarFormat(this, o) || "sameElse", r = t && (isFunction(t[n]) ? t[n].call(this, a) : t[n]); return this.format(r || this.localeData().calendar(n, this, createLocal(a))); }
function clone() { return new Moment(this); }
function isAfter(e, t) { var a = isMoment(e) ? e : createLocal(e); return !(!this.isValid() || !a.isValid()) && ("millisecond" === (t = normalizeUnits(t) || "millisecond") ? this.valueOf() > a.valueOf() : a.valueOf() < this.clone().startOf(t).valueOf()); }
function isBefore(e, t) { var a = isMoment(e) ? e : createLocal(e); return !(!this.isValid() || !a.isValid()) && ("millisecond" === (t = normalizeUnits(t) || "millisecond") ? this.valueOf() < a.valueOf() : this.clone().endOf(t).valueOf() < a.valueOf()); }
function isBetween(e, t, a, o) { var n = isMoment(e) ? e : createLocal(e), r = isMoment(t) ? t : createLocal(t); return !!(this.isValid() && n.isValid() && r.isValid()) && ("(" === (o = o || "()")[0] ? this.isAfter(n, a) : !this.isBefore(n, a)) && (")" === o[1] ? this.isBefore(r, a) : !this.isAfter(r, a)); }
function isSame(e, t) { var a, o = isMoment(e) ? e : createLocal(e); return !(!this.isValid() || !o.isValid()) && ("millisecond" === (t = normalizeUnits(t) || "millisecond") ? this.valueOf() === o.valueOf() : (a = o.valueOf(), this.clone().startOf(t).valueOf() <= a && a <= this.clone().endOf(t).valueOf())); }
function isSameOrAfter(e, t) { return this.isSame(e, t) || this.isAfter(e, t); }
function isSameOrBefore(e, t) { return this.isSame(e, t) || this.isBefore(e, t); }
function diff(e, t, a) { var o, n, r; if (!this.isValid())
    return NaN; if (!(o = cloneWithOffset(e, this)).isValid())
    return NaN; switch (n = 6e4 * (o.utcOffset() - this.utcOffset()), t = normalizeUnits(t)) {
    case "year":
        r = monthDiff(this, o) / 12;
        break;
    case "month":
        r = monthDiff(this, o);
        break;
    case "quarter":
        r = monthDiff(this, o) / 3;
        break;
    case "second":
        r = (this - o) / 1e3;
        break;
    case "minute":
        r = (this - o) / 6e4;
        break;
    case "hour":
        r = (this - o) / 36e5;
        break;
    case "day":
        r = (this - o - n) / 864e5;
        break;
    case "week":
        r = (this - o - n) / 6048e5;
        break;
    default: r = this - o;
} return a ? r : absFloor(r); }
function monthDiff(e, t) { if (e.date() < t.date())
    return -monthDiff(t, e); var a = 12 * (t.year() - e.year()) + (t.month() - e.month()), o = e.clone().add(a, "months"); return -(a + (t - o < 0 ? (t - o) / (o - e.clone().add(a - 1, "months")) : (t - o) / (e.clone().add(a + 1, "months") - o))) || 0; }
function toString() { return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ"); }
function toISOString(e) { if (!this.isValid())
    return null; var t = !0 !== e, a = t ? this.clone().utc() : this; return a.year() < 0 || a.year() > 9999 ? formatMoment(a, t ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : isFunction(Date.prototype.toISOString) ? t ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", formatMoment(a, "Z")) : formatMoment(a, t ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"); }
function inspect() { if (!this.isValid())
    return "moment.invalid(/* " + this._i + " */)"; var e, t, a = "moment", o = ""; return this.isLocal() || (a = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", o = "Z"), e = "[" + a + '("]', t = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", this.format(e + t + "-MM-DD[T]HH:mm:ss.SSS" + o + '[")]'); }
function format(e) { e || (e = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat); var t = formatMoment(this, e); return this.localeData().postformat(t); }
function from(e, t) { return this.isValid() && (isMoment(e) && e.isValid() || createLocal(e).isValid()) ? createDuration({ to: this, from: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate(); }
function fromNow(e) { return this.from(createLocal(), e); }
function to(e, t) { return this.isValid() && (isMoment(e) && e.isValid() || createLocal(e).isValid()) ? createDuration({ from: this, to: e }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate(); }
function toNow(e) { return this.to(createLocal(), e); }
function locale(e) { var t; return void 0 === e ? this._locale._abbr : (null != (t = getLocale(e)) && (this._locale = t), this); }
hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
var lang = deprecate("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function (e) { return void 0 === e ? this.localeData() : this.locale(e); });
function localeData() { return this._locale; }
var MS_PER_SECOND = 1e3, MS_PER_MINUTE = 60 * MS_PER_SECOND, MS_PER_HOUR = 60 * MS_PER_MINUTE, MS_PER_400_YEARS = 3506328 * MS_PER_HOUR;
function mod$1(e, t) { return (e % t + t) % t; }
function localStartOfDate(e, t, a) { return e < 100 && e >= 0 ? new Date(e + 400, t, a) - MS_PER_400_YEARS : new Date(e, t, a).valueOf(); }
function utcStartOfDate(e, t, a) { return e < 100 && e >= 0 ? Date.UTC(e + 400, t, a) - MS_PER_400_YEARS : Date.UTC(e, t, a); }
function startOf(e) { var t, a; if (void 0 === (e = normalizeUnits(e)) || "millisecond" === e || !this.isValid())
    return this; switch (a = this._isUTC ? utcStartOfDate : localStartOfDate, e) {
    case "year":
        t = a(this.year(), 0, 1);
        break;
    case "quarter":
        t = a(this.year(), this.month() - this.month() % 3, 1);
        break;
    case "month":
        t = a(this.year(), this.month(), 1);
        break;
    case "week":
        t = a(this.year(), this.month(), this.date() - this.weekday());
        break;
    case "isoWeek":
        t = a(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
        break;
    case "day":
    case "date":
        t = a(this.year(), this.month(), this.date());
        break;
    case "hour":
        t = this._d.valueOf(), t -= mod$1(t + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
        break;
    case "minute":
        t = this._d.valueOf(), t -= mod$1(t, MS_PER_MINUTE);
        break;
    case "second": t = this._d.valueOf(), t -= mod$1(t, MS_PER_SECOND);
} return this._d.setTime(t), hooks.updateOffset(this, !0), this; }
function endOf(e) { var t, a; if (void 0 === (e = normalizeUnits(e)) || "millisecond" === e || !this.isValid())
    return this; switch (a = this._isUTC ? utcStartOfDate : localStartOfDate, e) {
    case "year":
        t = a(this.year() + 1, 0, 1) - 1;
        break;
    case "quarter":
        t = a(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
        break;
    case "month":
        t = a(this.year(), this.month() + 1, 1) - 1;
        break;
    case "week":
        t = a(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
        break;
    case "isoWeek":
        t = a(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
        break;
    case "day":
    case "date":
        t = a(this.year(), this.month(), this.date() + 1) - 1;
        break;
    case "hour":
        t = this._d.valueOf(), t += MS_PER_HOUR - mod$1(t + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
        break;
    case "minute":
        t = this._d.valueOf(), t += MS_PER_MINUTE - mod$1(t, MS_PER_MINUTE) - 1;
        break;
    case "second": t = this._d.valueOf(), t += MS_PER_SECOND - mod$1(t, MS_PER_SECOND) - 1;
} return this._d.setTime(t), hooks.updateOffset(this, !0), this; }
function valueOf() { return this._d.valueOf() - 6e4 * (this._offset || 0); }
function unix() { return Math.floor(this.valueOf() / 1e3); }
function toDate() { return new Date(this.valueOf()); }
function toArray() { var e = this; return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]; }
function toObject() { var e = this; return { years: e.year(), months: e.month(), date: e.date(), hours: e.hours(), minutes: e.minutes(), seconds: e.seconds(), milliseconds: e.milliseconds() }; }
function toJSON() { return this.isValid() ? this.toISOString() : null; }
function isValid$2() { return isValid(this); }
function parsingFlags() { return extend({}, getParsingFlags(this)); }
function invalidAt() { return getParsingFlags(this).overflow; }
function creationData() { return { input: this._i, format: this._f, locale: this._locale, isUTC: this._isUTC, strict: this._strict }; }
function localeEras(e, t) { var a, o, n, r = this._eras || getLocale("en")._eras; for (a = 0, o = r.length; a < o; ++a) {
    switch (typeof r[a].since) {
        case "string": n = hooks(r[a].since).startOf("day"), r[a].since = n.valueOf();
    }
    switch (typeof r[a].until) {
        case "undefined":
            r[a].until = 1 / 0;
            break;
        case "string": n = hooks(r[a].until).startOf("day").valueOf(), r[a].until = n.valueOf();
    }
} return r; }
function localeErasParse(e, t, a) { var o, n, r, s, i, d = this.eras(); for (e = e.toUpperCase(), o = 0, n = d.length; o < n; ++o)
    if (r = d[o].name.toUpperCase(), s = d[o].abbr.toUpperCase(), i = d[o].narrow.toUpperCase(), a)
        switch (t) {
            case "N":
            case "NN":
            case "NNN":
                if (s === e)
                    return d[o];
                break;
            case "NNNN":
                if (r === e)
                    return d[o];
                break;
            case "NNNNN": if (i === e)
                return d[o];
        }
    else if ([r, s, i].indexOf(e) >= 0)
        return d[o]; }
function localeErasConvertYear(e, t) { var a = e.since <= e.until ? 1 : -1; return void 0 === t ? hooks(e.since).year() : hooks(e.since).year() + (t - e.offset) * a; }
function getEraName() { var e, t, a, o = this.localeData().eras(); for (e = 0, t = o.length; e < t; ++e) {
    if (a = this.clone().startOf("day").valueOf(), o[e].since <= a && a <= o[e].until)
        return o[e].name;
    if (o[e].until <= a && a <= o[e].since)
        return o[e].name;
} return ""; }
function getEraNarrow() { var e, t, a, o = this.localeData().eras(); for (e = 0, t = o.length; e < t; ++e) {
    if (a = this.clone().startOf("day").valueOf(), o[e].since <= a && a <= o[e].until)
        return o[e].narrow;
    if (o[e].until <= a && a <= o[e].since)
        return o[e].narrow;
} return ""; }
function getEraAbbr() { var e, t, a, o = this.localeData().eras(); for (e = 0, t = o.length; e < t; ++e) {
    if (a = this.clone().startOf("day").valueOf(), o[e].since <= a && a <= o[e].until)
        return o[e].abbr;
    if (o[e].until <= a && a <= o[e].since)
        return o[e].abbr;
} return ""; }
function getEraYear() { var e, t, a, o, n = this.localeData().eras(); for (e = 0, t = n.length; e < t; ++e)
    if (a = n[e].since <= n[e].until ? 1 : -1, o = this.clone().startOf("day").valueOf(), n[e].since <= o && o <= n[e].until || n[e].until <= o && o <= n[e].since)
        return (this.year() - hooks(n[e].since).year()) * a + n[e].offset; return this.year(); }
function erasNameRegex(e) { return hasOwnProp(this, "_erasNameRegex") || computeErasParse.call(this), e ? this._erasNameRegex : this._erasRegex; }
function erasAbbrRegex(e) { return hasOwnProp(this, "_erasAbbrRegex") || computeErasParse.call(this), e ? this._erasAbbrRegex : this._erasRegex; }
function erasNarrowRegex(e) { return hasOwnProp(this, "_erasNarrowRegex") || computeErasParse.call(this), e ? this._erasNarrowRegex : this._erasRegex; }
function matchEraAbbr(e, t) { return t.erasAbbrRegex(e); }
function matchEraName(e, t) { return t.erasNameRegex(e); }
function matchEraNarrow(e, t) { return t.erasNarrowRegex(e); }
function matchEraYearOrdinal(e, t) { return t._eraYearOrdinalRegex || matchUnsigned; }
function computeErasParse() { var e, t, a = [], o = [], n = [], r = [], s = this.eras(); for (e = 0, t = s.length; e < t; ++e)
    o.push(regexEscape(s[e].name)), a.push(regexEscape(s[e].abbr)), n.push(regexEscape(s[e].narrow)), r.push(regexEscape(s[e].name)), r.push(regexEscape(s[e].abbr)), r.push(regexEscape(s[e].narrow)); this._erasRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp("^(" + n.join("|") + ")", "i"); }
function addWeekYearFormatToken(e, t) { addFormatToken(0, [e, e.length], 0, t); }
function getSetWeekYear(e) { return getSetWeekYearHelper.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy); }
function getSetISOWeekYear(e) { return getSetWeekYearHelper.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4); }
function getISOWeeksInYear() { return weeksInYear(this.year(), 1, 4); }
function getISOWeeksInISOWeekYear() { return weeksInYear(this.isoWeekYear(), 1, 4); }
function getWeeksInYear() { var e = this.localeData()._week; return weeksInYear(this.year(), e.dow, e.doy); }
function getWeeksInWeekYear() { var e = this.localeData()._week; return weeksInYear(this.weekYear(), e.dow, e.doy); }
function getSetWeekYearHelper(e, t, a, o, n) { var r; return null == e ? weekOfYear(this, o, n).year : (t > (r = weeksInYear(e, o, n)) && (t = r), setWeekAll.call(this, e, t, a, o, n)); }
function setWeekAll(e, t, a, o, n) { var r = dayOfYearFromWeeks(e, t, a, o, n), s = createUTCDate(r.year, 0, r.dayOfYear); return this.year(s.getUTCFullYear()), this.month(s.getUTCMonth()), this.date(s.getUTCDate()), this; }
function getSetQuarter(e) { return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3); }
addFormatToken("N", 0, 0, "eraAbbr"), addFormatToken("NN", 0, 0, "eraAbbr"), addFormatToken("NNN", 0, 0, "eraAbbr"), addFormatToken("NNNN", 0, 0, "eraName"), addFormatToken("NNNNN", 0, 0, "eraNarrow"), addFormatToken("y", ["y", 1], "yo", "eraYear"), addFormatToken("y", ["yy", 2], 0, "eraYear"), addFormatToken("y", ["yyy", 3], 0, "eraYear"), addFormatToken("y", ["yyyy", 4], 0, "eraYear"), addRegexToken("N", matchEraAbbr), addRegexToken("NN", matchEraAbbr), addRegexToken("NNN", matchEraAbbr), addRegexToken("NNNN", matchEraName), addRegexToken("NNNNN", matchEraNarrow), addParseToken(["N", "NN", "NNN", "NNNN", "NNNNN"], function (e, t, a, o) { var n = a._locale.erasParse(e, o, a._strict); n ? getParsingFlags(a).era = n : getParsingFlags(a).invalidEra = e; }), addRegexToken("y", matchUnsigned), addRegexToken("yy", matchUnsigned), addRegexToken("yyy", matchUnsigned), addRegexToken("yyyy", matchUnsigned), addRegexToken("yo", matchEraYearOrdinal), addParseToken(["y", "yy", "yyy", "yyyy"], YEAR), addParseToken(["yo"], function (e, t, a, o) { var n; a._locale._eraYearOrdinalRegex && (n = e.match(a._locale._eraYearOrdinalRegex)), t[YEAR] = a._locale.eraYearOrdinalParse ? a._locale.eraYearOrdinalParse(e, n) : parseInt(e, 10); }), addFormatToken(0, ["gg", 2], 0, function () { return this.weekYear() % 100; }), addFormatToken(0, ["GG", 2], 0, function () { return this.isoWeekYear() % 100; }), addWeekYearFormatToken("gggg", "weekYear"), addWeekYearFormatToken("ggggg", "weekYear"), addWeekYearFormatToken("GGGG", "isoWeekYear"), addWeekYearFormatToken("GGGGG", "isoWeekYear"), addUnitAlias("weekYear", "gg"), addUnitAlias("isoWeekYear", "GG"), addUnitPriority("weekYear", 1), addUnitPriority("isoWeekYear", 1), addRegexToken("G", matchSigned), addRegexToken("g", matchSigned), addRegexToken("GG", match1to2, match2), addRegexToken("gg", match1to2, match2), addRegexToken("GGGG", match1to4, match4), addRegexToken("gggg", match1to4, match4), addRegexToken("GGGGG", match1to6, match6), addRegexToken("ggggg", match1to6, match6), addWeekParseToken(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, a, o) { t[o.substr(0, 2)] = toInt(e); }), addWeekParseToken(["gg", "GG"], function (e, t, a, o) { t[o] = hooks.parseTwoDigitYear(e); }), addFormatToken("Q", 0, "Qo", "quarter"), addUnitAlias("quarter", "Q"), addUnitPriority("quarter", 7), addRegexToken("Q", match1), addParseToken("Q", function (e, t) { t[MONTH] = 3 * (toInt(e) - 1); }), addFormatToken("D", ["DD", 2], "Do", "date"), addUnitAlias("date", "D"), addUnitPriority("date", 9), addRegexToken("D", match1to2), addRegexToken("DD", match1to2, match2), addRegexToken("Do", function (e, t) { return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient; }), addParseToken(["D", "DD"], DATE), addParseToken("Do", function (e, t) { t[DATE] = toInt(e.match(match1to2)[0]); });
var getSetDayOfMonth = makeGetSet("Date", !0);
function getSetDayOfYear(e) { var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1; return null == e ? t : this.add(e - t, "d"); }
addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), addUnitAlias("dayOfYear", "DDD"), addUnitPriority("dayOfYear", 4), addRegexToken("DDD", match1to3), addRegexToken("DDDD", match3), addParseToken(["DDD", "DDDD"], function (e, t, a) { a._dayOfYear = toInt(e); }), addFormatToken("m", ["mm", 2], 0, "minute"), addUnitAlias("minute", "m"), addUnitPriority("minute", 14), addRegexToken("m", match1to2), addRegexToken("mm", match1to2, match2), addParseToken(["m", "mm"], MINUTE);
var getSetMinute = makeGetSet("Minutes", !1);
addFormatToken("s", ["ss", 2], 0, "second"), addUnitAlias("second", "s"), addUnitPriority("second", 15), addRegexToken("s", match1to2), addRegexToken("ss", match1to2, match2), addParseToken(["s", "ss"], SECOND);
var token, getSetMillisecond, getSetSecond = makeGetSet("Seconds", !1);
for (addFormatToken("S", 0, 0, function () { return ~~(this.millisecond() / 100); }), addFormatToken(0, ["SS", 2], 0, function () { return ~~(this.millisecond() / 10); }), addFormatToken(0, ["SSS", 3], 0, "millisecond"), addFormatToken(0, ["SSSS", 4], 0, function () { return 10 * this.millisecond(); }), addFormatToken(0, ["SSSSS", 5], 0, function () { return 100 * this.millisecond(); }), addFormatToken(0, ["SSSSSS", 6], 0, function () { return 1e3 * this.millisecond(); }), addFormatToken(0, ["SSSSSSS", 7], 0, function () { return 1e4 * this.millisecond(); }), addFormatToken(0, ["SSSSSSSS", 8], 0, function () { return 1e5 * this.millisecond(); }), addFormatToken(0, ["SSSSSSSSS", 9], 0, function () { return 1e6 * this.millisecond(); }), addUnitAlias("millisecond", "ms"), addUnitPriority("millisecond", 16), addRegexToken("S", match1to3, match1), addRegexToken("SS", match1to3, match2), addRegexToken("SSS", match1to3, match3), token = "SSSS"; token.length <= 9; token += "S")
    addRegexToken(token, matchUnsigned);
function parseMs(e, t) { t[MILLISECOND] = toInt(1e3 * ("0." + e)); }
for (token = "S"; token.length <= 9; token += "S")
    addParseToken(token, parseMs);
function getZoneAbbr() { return this._isUTC ? "UTC" : ""; }
function getZoneName() { return this._isUTC ? "Coordinated Universal Time" : ""; }
getSetMillisecond = makeGetSet("Milliseconds", !1), addFormatToken("z", 0, 0, "zoneAbbr"), addFormatToken("zz", 0, 0, "zoneName");
var proto = Moment.prototype;
function createUnix(e) { return createLocal(1e3 * e); }
function createInZone() { return createLocal.apply(null, arguments).parseZone(); }
function preParsePostFormat(e) { return e; }
proto.add = add, proto.calendar = calendar$1, proto.clone = clone, proto.diff = diff, proto.endOf = endOf, proto.format = format, proto.from = from, proto.fromNow = fromNow, proto.to = to, proto.toNow = toNow, proto.get = stringGet, proto.invalidAt = invalidAt, proto.isAfter = isAfter, proto.isBefore = isBefore, proto.isBetween = isBetween, proto.isSame = isSame, proto.isSameOrAfter = isSameOrAfter, proto.isSameOrBefore = isSameOrBefore, proto.isValid = isValid$2, proto.lang = lang, proto.locale = locale, proto.localeData = localeData, proto.max = prototypeMax, proto.min = prototypeMin, proto.parsingFlags = parsingFlags, proto.set = stringSet, proto.startOf = startOf, proto.subtract = subtract, proto.toArray = toArray, proto.toObject = toObject, proto.toDate = toDate, proto.toISOString = toISOString, proto.inspect = inspect, "undefined" != typeof Symbol && null != Symbol.for && (proto[Symbol.for("nodejs.util.inspect.custom")] = function () { return "Moment<" + this.format() + ">"; }), proto.toJSON = toJSON, proto.toString = toString, proto.unix = unix, proto.valueOf = valueOf, proto.creationData = creationData, proto.eraName = getEraName, proto.eraNarrow = getEraNarrow, proto.eraAbbr = getEraAbbr, proto.eraYear = getEraYear, proto.year = getSetYear, proto.isLeapYear = getIsLeapYear, proto.weekYear = getSetWeekYear, proto.isoWeekYear = getSetISOWeekYear, proto.quarter = proto.quarters = getSetQuarter, proto.month = getSetMonth, proto.daysInMonth = getDaysInMonth, proto.week = proto.weeks = getSetWeek, proto.isoWeek = proto.isoWeeks = getSetISOWeek, proto.weeksInYear = getWeeksInYear, proto.weeksInWeekYear = getWeeksInWeekYear, proto.isoWeeksInYear = getISOWeeksInYear, proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear, proto.date = getSetDayOfMonth, proto.day = proto.days = getSetDayOfWeek, proto.weekday = getSetLocaleDayOfWeek, proto.isoWeekday = getSetISODayOfWeek, proto.dayOfYear = getSetDayOfYear, proto.hour = proto.hours = getSetHour, proto.minute = proto.minutes = getSetMinute, proto.second = proto.seconds = getSetSecond, proto.millisecond = proto.milliseconds = getSetMillisecond, proto.utcOffset = getSetOffset, proto.utc = setOffsetToUTC, proto.local = setOffsetToLocal, proto.parseZone = setOffsetToParsedOffset, proto.hasAlignedHourOffset = hasAlignedHourOffset, proto.isDST = isDaylightSavingTime, proto.isLocal = isLocal, proto.isUtcOffset = isUtcOffset, proto.isUtc = isUtc, proto.isUTC = isUtc, proto.zoneAbbr = getZoneAbbr, proto.zoneName = getZoneName, proto.dates = deprecate("dates accessor is deprecated. Use date instead.", getSetDayOfMonth), proto.months = deprecate("months accessor is deprecated. Use month instead", getSetMonth), proto.years = deprecate("years accessor is deprecated. Use year instead", getSetYear), proto.zone = deprecate("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", getSetZone), proto.isDSTShifted = deprecate("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", isDaylightSavingTimeShifted);
var proto$1 = Locale.prototype;
function get$1(e, t, a, o) { var n = getLocale(), r = createUTC().set(o, t); return n[a](r, e); }
function listMonthsImpl(e, t, a) { if (isNumber(e) && (t = e, e = void 0), e = e || "", null != t)
    return get$1(e, t, a, "month"); var o, n = []; for (o = 0; o < 12; o++)
    n[o] = get$1(e, o, a, "month"); return n; }
function listWeekdaysImpl(e, t, a, o) { "boolean" == typeof e ? (isNumber(t) && (a = t, t = void 0), t = t || "") : (a = t = e, e = !1, isNumber(t) && (a = t, t = void 0), t = t || ""); var n, r = getLocale(), s = e ? r._week.dow : 0, i = []; if (null != a)
    return get$1(t, (a + s) % 7, o, "day"); for (n = 0; n < 7; n++)
    i[n] = get$1(t, (n + s) % 7, o, "day"); return i; }
function listMonths(e, t) { return listMonthsImpl(e, t, "months"); }
function listMonthsShort(e, t) { return listMonthsImpl(e, t, "monthsShort"); }
function listWeekdays(e, t, a) { return listWeekdaysImpl(e, t, a, "weekdays"); }
function listWeekdaysShort(e, t, a) { return listWeekdaysImpl(e, t, a, "weekdaysShort"); }
function listWeekdaysMin(e, t, a) { return listWeekdaysImpl(e, t, a, "weekdaysMin"); }
proto$1.calendar = calendar, proto$1.longDateFormat = longDateFormat, proto$1.invalidDate = invalidDate, proto$1.ordinal = ordinal, proto$1.preparse = preParsePostFormat, proto$1.postformat = preParsePostFormat, proto$1.relativeTime = relativeTime, proto$1.pastFuture = pastFuture, proto$1.set = set, proto$1.eras = localeEras, proto$1.erasParse = localeErasParse, proto$1.erasConvertYear = localeErasConvertYear, proto$1.erasAbbrRegex = erasAbbrRegex, proto$1.erasNameRegex = erasNameRegex, proto$1.erasNarrowRegex = erasNarrowRegex, proto$1.months = localeMonths, proto$1.monthsShort = localeMonthsShort, proto$1.monthsParse = localeMonthsParse, proto$1.monthsRegex = monthsRegex, proto$1.monthsShortRegex = monthsShortRegex, proto$1.week = localeWeek, proto$1.firstDayOfYear = localeFirstDayOfYear, proto$1.firstDayOfWeek = localeFirstDayOfWeek, proto$1.weekdays = localeWeekdays, proto$1.weekdaysMin = localeWeekdaysMin, proto$1.weekdaysShort = localeWeekdaysShort, proto$1.weekdaysParse = localeWeekdaysParse, proto$1.weekdaysRegex = weekdaysRegex, proto$1.weekdaysShortRegex = weekdaysShortRegex, proto$1.weekdaysMinRegex = weekdaysMinRegex, proto$1.isPM = localeIsPM, proto$1.meridiem = localeMeridiem, getSetGlobalLocale("en", { eras: [{ since: "0001-01-01", until: 1 / 0, offset: 1, name: "Anno Domini", narrow: "AD", abbr: "AD" }, { since: "0000-12-31", until: -1 / 0, offset: 1, name: "Before Christ", narrow: "BC", abbr: "BC" }], dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/, ordinal: function (e) { var t = e % 10; return e + (1 === toInt(e % 100 / 10) ? "th" : 1 === t ? "st" : 2 === t ? "nd" : 3 === t ? "rd" : "th"); } }), hooks.lang = deprecate("moment.lang is deprecated. Use moment.locale instead.", getSetGlobalLocale), hooks.langData = deprecate("moment.langData is deprecated. Use moment.localeData instead.", getLocale);
var mathAbs = Math.abs;
function abs() { var e = this._data; return this._milliseconds = mathAbs(this._milliseconds), this._days = mathAbs(this._days), this._months = mathAbs(this._months), e.milliseconds = mathAbs(e.milliseconds), e.seconds = mathAbs(e.seconds), e.minutes = mathAbs(e.minutes), e.hours = mathAbs(e.hours), e.months = mathAbs(e.months), e.years = mathAbs(e.years), this; }
function addSubtract$1(e, t, a, o) { var n = createDuration(t, a); return e._milliseconds += o * n._milliseconds, e._days += o * n._days, e._months += o * n._months, e._bubble(); }
function add$1(e, t) { return addSubtract$1(this, e, t, 1); }
function subtract$1(e, t) { return addSubtract$1(this, e, t, -1); }
function absCeil(e) { return e < 0 ? Math.floor(e) : Math.ceil(e); }
function bubble() { var e, t, a, o, n, r = this._milliseconds, s = this._days, i = this._months, d = this._data; return r >= 0 && s >= 0 && i >= 0 || r <= 0 && s <= 0 && i <= 0 || (r += 864e5 * absCeil(monthsToDays(i) + s), s = 0, i = 0), d.milliseconds = r % 1e3, e = absFloor(r / 1e3), d.seconds = e % 60, t = absFloor(e / 60), d.minutes = t % 60, a = absFloor(t / 60), d.hours = a % 24, s += absFloor(a / 24), i += n = absFloor(daysToMonths(s)), s -= absCeil(monthsToDays(n)), o = absFloor(i / 12), i %= 12, d.days = s, d.months = i, d.years = o, this; }
function daysToMonths(e) { return 4800 * e / 146097; }
function monthsToDays(e) { return 146097 * e / 4800; }
function as(e) { if (!this.isValid())
    return NaN; var t, a, o = this._milliseconds; if ("month" === (e = normalizeUnits(e)) || "quarter" === e || "year" === e)
    switch (a = this._months + daysToMonths(t = this._days + o / 864e5), e) {
        case "month": return a;
        case "quarter": return a / 3;
        case "year": return a / 12;
    }
else
    switch (t = this._days + Math.round(monthsToDays(this._months)), e) {
        case "week": return t / 7 + o / 6048e5;
        case "day": return t + o / 864e5;
        case "hour": return 24 * t + o / 36e5;
        case "minute": return 1440 * t + o / 6e4;
        case "second": return 86400 * t + o / 1e3;
        case "millisecond": return Math.floor(864e5 * t) + o;
        default: throw new Error("Unknown unit " + e);
    } }
function valueOf$1() { return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * toInt(this._months / 12) : NaN; }
function makeAs(e) { return function () { return this.as(e); }; }
var asMilliseconds = makeAs("ms"), asSeconds = makeAs("s"), asMinutes = makeAs("m"), asHours = makeAs("h"), asDays = makeAs("d"), asWeeks = makeAs("w"), asMonths = makeAs("M"), asQuarters = makeAs("Q"), asYears = makeAs("y");
function clone$1() { return createDuration(this); }
function get$2(e) { return e = normalizeUnits(e), this.isValid() ? this[e + "s"]() : NaN; }
function makeGetter(e) { return function () { return this.isValid() ? this._data[e] : NaN; }; }
var milliseconds = makeGetter("milliseconds"), seconds = makeGetter("seconds"), minutes = makeGetter("minutes"), hours = makeGetter("hours"), days = makeGetter("days"), months = makeGetter("months"), years = makeGetter("years");
function weeks() { return absFloor(this.days() / 7); }
var round = Math.round, thresholds = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
function substituteTimeAgo(e, t, a, o, n) { return n.relativeTime(t || 1, !!a, e, o); }
function relativeTime$1(e, t, a, o) { var n = createDuration(e).abs(), r = round(n.as("s")), s = round(n.as("m")), i = round(n.as("h")), d = round(n.as("d")), l = round(n.as("M")), c = round(n.as("w")), h = round(n.as("y")), u = r <= a.ss && ["s", r] || r < a.s && ["ss", r] || s <= 1 && ["m"] || s < a.m && ["mm", s] || i <= 1 && ["h"] || i < a.h && ["hh", i] || d <= 1 && ["d"] || d < a.d && ["dd", d]; return null != a.w && (u = u || c <= 1 && ["w"] || c < a.w && ["ww", c]), (u = u || l <= 1 && ["M"] || l < a.M && ["MM", l] || h <= 1 && ["y"] || ["yy", h])[2] = t, u[3] = +e > 0, u[4] = o, substituteTimeAgo.apply(null, u); }
function getSetRelativeTimeRounding(e) { return void 0 === e ? round : "function" == typeof e && (round = e, !0); }
function getSetRelativeTimeThreshold(e, t) { return void 0 !== thresholds[e] && (void 0 === t ? thresholds[e] : (thresholds[e] = t, "s" === e && (thresholds.ss = t - 1), !0)); }
function humanize(e, t) { if (!this.isValid())
    return this.localeData().invalidDate(); var a, o, n = !1, r = thresholds; return "object" == typeof e && (t = e, e = !1), "boolean" == typeof e && (n = e), "object" == typeof t && (r = Object.assign({}, thresholds, t), null != t.s && null == t.ss && (r.ss = t.s - 1)), o = relativeTime$1(this, !n, r, a = this.localeData()), n && (o = a.pastFuture(+this, o)), a.postformat(o); }
var abs$1 = Math.abs;
function sign(e) { return (e > 0) - (e < 0) || +e; }
function toISOString$1() { if (!this.isValid())
    return this.localeData().invalidDate(); var e, t, a, o, n, r, s, i, d = abs$1(this._milliseconds) / 1e3, l = abs$1(this._days), c = abs$1(this._months), h = this.asSeconds(); return h ? (e = absFloor(d / 60), t = absFloor(e / 60), d %= 60, e %= 60, a = absFloor(c / 12), c %= 12, o = d ? d.toFixed(3).replace(/\.?0+$/, "") : "", n = h < 0 ? "-" : "", r = sign(this._months) !== sign(h) ? "-" : "", s = sign(this._days) !== sign(h) ? "-" : "", i = sign(this._milliseconds) !== sign(h) ? "-" : "", n + "P" + (a ? r + a + "Y" : "") + (c ? r + c + "M" : "") + (l ? s + l + "D" : "") + (t || e || d ? "T" : "") + (t ? i + t + "H" : "") + (e ? i + e + "M" : "") + (d ? i + o + "S" : "")) : "P0D"; }
var proto$2 = Duration.prototype;
proto$2.isValid = isValid$1, proto$2.abs = abs, proto$2.add = add$1, proto$2.subtract = subtract$1, proto$2.as = as, proto$2.asMilliseconds = asMilliseconds, proto$2.asSeconds = asSeconds, proto$2.asMinutes = asMinutes, proto$2.asHours = asHours, proto$2.asDays = asDays, proto$2.asWeeks = asWeeks, proto$2.asMonths = asMonths, proto$2.asQuarters = asQuarters, proto$2.asYears = asYears, proto$2.valueOf = valueOf$1, proto$2._bubble = bubble, proto$2.clone = clone$1, proto$2.get = get$2, proto$2.milliseconds = milliseconds, proto$2.seconds = seconds, proto$2.minutes = minutes, proto$2.hours = hours, proto$2.days = days, proto$2.weeks = weeks, proto$2.months = months, proto$2.years = years, proto$2.humanize = humanize, proto$2.toISOString = toISOString$1, proto$2.toString = toISOString$1, proto$2.toJSON = toISOString$1, proto$2.locale = locale, proto$2.localeData = localeData, proto$2.toIsoString = deprecate("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", toISOString$1), proto$2.lang = lang, addFormatToken("X", 0, 0, "unix"), addFormatToken("x", 0, 0, "valueOf"), addRegexToken("x", matchSigned), addRegexToken("X", matchTimestamp), addParseToken("X", function (e, t, a) { a._d = new Date(1e3 * parseFloat(e)); }), addParseToken("x", function (e, t, a) { a._d = new Date(toInt(e)); }), hooks.version = "2.29.1", setHookCallback(createLocal), hooks.fn = proto, hooks.min = min, hooks.max = max, hooks.now = now, hooks.utc = createUTC, hooks.unix = createUnix, hooks.months = listMonths, hooks.isDate = isDate, hooks.locale = getSetGlobalLocale, hooks.invalid = createInvalid, hooks.duration = createDuration, hooks.isMoment = isMoment, hooks.weekdays = listWeekdays, hooks.parseZone = createInZone, hooks.localeData = getLocale, hooks.isDuration = isDuration, hooks.monthsShort = listMonthsShort, hooks.weekdaysMin = listWeekdaysMin, hooks.defineLocale = defineLocale, hooks.updateLocale = updateLocale, hooks.locales = listLocales, hooks.weekdaysShort = listWeekdaysShort, hooks.normalizeUnits = normalizeUnits, hooks.relativeTimeRounding = getSetRelativeTimeRounding, hooks.relativeTimeThreshold = getSetRelativeTimeThreshold, hooks.calendarFormat = getCalendarFormat, hooks.prototype = proto, hooks.HTML5_FMT = { DATETIME_LOCAL: "YYYY-MM-DDTHH:mm", DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss", DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS", DATE: "YYYY-MM-DD", TIME: "HH:mm", TIME_SECONDS: "HH:mm:ss", TIME_MS: "HH:mm:ss.SSS", WEEK: "GGGG-[W]WW", MONTH: "YYYY-MM" };
var WS = function () { function e() { this.init(); } return e.prototype.connectionCheck = function () { var e = this; this.connected || (this.connectionInterval = setInterval(function () { if (e.connected)
    return clearInterval(e.connectionInterval); e.init(); }, 2e3)); }, e.prototype.init = function () { var e = this; console.warn("websocket connection closed", hooks().format()); try {
    this.deviceSocket = new WebSocket("ws://" + chunk_e4627dab_js_1.a.WS_HOST + "/device");
}
catch (e) {
    console.log("Component WS error", e);
} this.deviceSocket.addEventListener("close", function () { e.connected = !1, e.connectionCheck(), console.info("device websocket connection closed", hooks().format()); }), this.deviceSocket.addEventListener("open", function () { e.connected = !0, console.info("device websocket connection opened", hooks().format()); }), this.componentSocket = new WebSocket("ws://" + chunk_e4627dab_js_1.a.WS_HOST + "/component"), this.componentSocket.addEventListener("close", function () { e.connected = !1, e.connectionCheck(); }), this.componentSocket.addEventListener("open", function () { e.connected = !0, console.info("component websocket connection opened", hooks().format()); }), this.interfaceSocket = new WebSocket("ws://" + chunk_e4627dab_js_1.a.WS_HOST + "/interface"), this.interfaceSocket.addEventListener("close", function () { e.connected = !1, e.connectionCheck(); }), this.interfaceSocket.addEventListener("open", function () { e.connected = !0, console.info("interface websocket connection opened", hooks().format()); }); }, e.prototype.respondToDeviceWS = function (e) { this.deviceSocket.send(JSON.stringify(e)); }, e.prototype.respondToComponentWS = function (e) { this.componentSocket.send(JSON.stringify(e)); }, e.prototype.changeModuleTo = function (e) { this.interfaceSocket.send(JSON.stringify(e)); }, e.prototype.status = function () { return this.deviceSocket.readyState; }, e; }();
exports.a = WS;