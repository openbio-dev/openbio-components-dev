"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chunk_d17f9802_js_1 = require("./chunk-d17f9802.js");
var chunk_a708ac56_js_1 = require("./chunk-a708ac56.js");
var config, url;
function getFlowOptions() { return fetch(url + "/device/flow-options").then(function (e) { return e.json(); }); }
exports.g = getFlowOptions;
function getAnomalies(e, t) { return fetch(url + "/db/api/settings/anomalies/" + e + "?detached=" + t).then(function (e) { return e.json(); }); }
exports.f = getAnomalies;
function saveFingers(e) { return fetch(url + "/db/api/biometries/fingers", { method: "post", body: JSON.stringify(e), headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.e = saveFingers;
function getModalSettings() { return fetch(url + "/db/api/settings/" + chunk_d17f9802_js_1.a.settingTypes.MODAL_SETTINGS, { method: "get", headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.a = getModalSettings;
function getPeople(e, t) { return fetch(url + "/db/api/people-details/" + e + "/" + t, { method: "get", headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.c = getPeople;
function fingerAuthenticate(e) { return fetch(url + "/db/api/biometries/finger/authenticate", { method: "post", body: JSON.stringify(e), headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.b = fingerAuthenticate;
function saveFingerFile(e, t) { var n = new FormData; return n.append("file", t), n.set("data", JSON.stringify(e)), fetch(url + "/db/api/biometries/finger-file", { method: "post", body: n }).then(function (e) { return e.json(); }); }
exports.d = saveFingerFile;
chunk_a708ac56_js_1.a().then(function (e) { url = (config = e).serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService; });
