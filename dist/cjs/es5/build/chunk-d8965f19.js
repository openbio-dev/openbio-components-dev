"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
var chunk_d17f9802_js_1 = require("./chunk-d17f9802.js");
function format(t, n, e) { return (t || "") + (n ? " " + n : "") + (e ? " " + e : ""); }
exports.a = format;
function getLocalization() { return tslib_1.__awaiter(this, void 0, void 0, function () { var t = this; return tslib_1.__generator(this, function (n) { return [2, new Promise(function (n, e) { return tslib_1.__awaiter(t, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
        case 0: return [4, fetch(chunk_d17f9802_js_1.a.IPINFO_ADDRESS).then(function (t) { return t.json(); }).then(function (t) { delete t.hostname, delete t.org, delete t.postal, n(JSON.stringify(t)); })];
        case 1: return t.sent(), [2];
    } }); }); })]; }); }); }
exports.b = getLocalization;
