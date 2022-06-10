"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
var chunk_c112ef87_js_1 = require("./chunk-c112ef87.js");
var config, servicesUrl, url = "http://" + chunk_c112ef87_js_1.a.WS_HOST;
function getAppConfig() { return fetch(url + "/db/api/config", { method: "get", headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.a = getAppConfig;
function getCameraPresets() { return fetch(url + "/db/api/camera-presets", { method: "get", headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.b = getCameraPresets;
function saveServiceTime(e, t, i) { return tslib_1.__awaiter(this, void 0, void 0, function () { var r; return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return [4, getAppConfig()];
    case 1: return r = n.sent(), [2, fetch(r.serviceServerType + "://" + r.urls.apiService + ":" + r.ports.apiService + "/db/api/service-time", { method: "post", body: JSON.stringify({ type: e, time: t, personId: i }), headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); })];
} }); }); }
exports.d = saveServiceTime;
function showImage(e, t, i, r, n) { var a = e && e.getContext("2d"); if (a) {
    if (!t)
        return void a.clearRect(0, 0, 460, 300);
    var s = new Image, o = "data:image/charset=UTF-8;png;base64," + t;
    a.drawVerticalLine = function (e, t, i, r) { this.fillStyle = r, this.fillRect(e, t, 1, i); }, s.onload = function () { !function (e, t) { var s, o, c, h, g = t.width / t.height, p = e.width / e.height; g < p ? (c = (e.width - (o = t.width * ((s = e.height) / t.height))) / 2, h = 0) : g > p ? (c = 0, h = (e.height - (s = t.height * ((o = e.width) / t.width))) / 2) : (s = e.height, o = e.width, c = 0, h = 0); for (var f = a.createImageData(e.width, e.height), d = f.data.length; --d >= 0;)
        f.data[d] = 0; a.putImageData(f, 0, 0), a.drawImage(t, c, h, o, s), r && i && a.drawVerticalLine(.575 * r, c - 60, s, i > 1 ? "green" : "red"), 0 === i && a.drawVerticalLine(0, 0, s, "white"), n && n.eyes.length > 0 && n.eyes.forEach(function (e) { a.strokeStyle = "red", a.beginPath(), a.arc(e.x, e.y, 5, 0, 2 * Math.PI), a.stroke(); }); }(e, s); }, s.src = o;
} }
exports.c = showImage;
getAppConfig().then(function (e) { servicesUrl = (config = e).serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService; });
