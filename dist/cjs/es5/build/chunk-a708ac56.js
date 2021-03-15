"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chunk_d17f9802_js_1 = require("./chunk-d17f9802.js");
var url = "http://" + chunk_d17f9802_js_1.a.WS_HOST;
function getAppConfig() { return fetch(url + "/db/api/config", { method: "get", headers: { "Content-Type": "application/json" } }).then(function (t) { return t.json(); }); }
exports.a = getAppConfig;
function getCameraPresets() { return fetch(url + "/db/api/camera-presets", { method: "get", headers: { "Content-Type": "application/json" } }).then(function (t) { return t.json(); }); }
exports.b = getCameraPresets;
function showImage(t, e, n, a, i) { var o = t.getContext("2d"); if (e) {
    var r = new Image, h = "data:image/charset=UTF-8;png;base64," + e;
    o.drawVerticalLine = function (t, e, n, a) { this.fillStyle = a, this.fillRect(t, e, 1, n); }, r.onload = function () { !function (t, e) { var r, h, c, s, d = e.width / e.height, f = t.width / t.height; d < f ? (c = (t.width - (h = e.width * ((r = t.height) / e.height))) / 2, s = 0) : d > f ? (c = 0, s = (t.height - (r = e.height * ((h = t.width) / e.width))) / 2) : (r = t.height, h = t.width, c = 0, s = 0); for (var g = o.createImageData(t.width, t.height), u = g.data.length; --u >= 0;)
        g.data[u] = 0; o.putImageData(g, 0, 0), o.drawImage(e, c, s, h, r), a && n && o.drawVerticalLine(.575 * a, c - 60, r, n > 1 ? "green" : "red"), 0 === n && o.drawVerticalLine(0, 0, r, "white"), i && i.eyes.length > 0 && i.eyes.forEach(function (t) { o.strokeStyle = "red", o.beginPath(), o.arc(t.x, t.y, 5, 0, 2 * Math.PI), o.stroke(); }); }(t, r); }, r.src = h;
}
else
    o.clearRect(0, 0, 460, 300); }
exports.d = showImage;
function notify(t, e, n, a) { t.shadowRoot.querySelector("div#notification-container").insertAdjacentHTML("beforeend", '<notification-component notification-type="' + e + '" text="' + n + '"/>'), setTimeout(function () { var e = t.shadowRoot.querySelector("notification-component"); e.parentNode.removeChild(e); }, a || 3e3); }
exports.c = notify;