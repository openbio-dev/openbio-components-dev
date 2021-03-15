"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var url = "http://localhost:5000";
function getAppConfig() { return fetch(url + "/db/api/config", { method: "get", headers: { "Content-Type": "application/json" } }).then(function (t) { return t.json(); }); }
exports.a = getAppConfig;
function getCameraPresets() { return fetch(url + "/db/api/camera-presets", { method: "get", headers: { "Content-Type": "application/json" } }).then(function (t) { return t.json(); }); }
exports.b = getCameraPresets;
function showImage(t, e, n, i, a) { var o = t.getContext("2d"); if (e) {
    var r = new Image, h = "data:image/charset=UTF-8;png;base64," + e;
    o.drawVerticalLine = function (t, e, n, i) { this.fillStyle = i, this.fillRect(t, e, 1, n); }, r.onload = function () { !function (t, e) { var r, h, c, d, s = e.width / e.height, g = t.width / t.height; s < g ? (c = (t.width - (h = e.width * ((r = t.height) / e.height))) / 2, d = 0) : s > g ? (c = 0, d = (t.height - (r = e.height * ((h = t.width) / e.width))) / 2) : (r = t.height, h = t.width, c = 0, d = 0); for (var f = o.createImageData(t.width, t.height), l = f.data.length; --l >= 0;)
        f.data[l] = 0; o.putImageData(f, 0, 0), o.drawImage(e, c, d, h, r), i && n && o.drawVerticalLine(.575 * i, c - 60, r, n > 1 ? "green" : "red"), 0 === n && o.drawVerticalLine(0, 0, r, "white"), a && a.eyes.length > 0 && a.eyes.forEach(function (t) { o.strokeStyle = "red", o.beginPath(), o.arc(t.x, t.y, 5, 0, 2 * Math.PI), o.stroke(); }); }(t, r); }, r.src = h;
}
else
    o.clearRect(0, 0, 460, 300); }
exports.d = showImage;
function notify(t, e, n, i) { t.shadowRoot.querySelector("div#notification-container").insertAdjacentHTML("beforeend", '<notification-component notification-type="' + e + '" text="' + n + '"/>'), setTimeout(function () { var e = t.shadowRoot.querySelector("notification-component"); e.parentNode.removeChild(e); }, i || 3e3); }
exports.c = notify;
