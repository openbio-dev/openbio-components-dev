"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("../polyfills/tslib.js");
var chunk_c112ef87_js_1 = require("./chunk-c112ef87.js");
var chunk_1df442d3_js_1 = require("./chunk-1df442d3.js");
var config, url, localUrl, sendToRemote, authServicesUrl, localServicesUrl = "http://" + chunk_c112ef87_js_1.a.WS_HOST;
function getFlowOptions() { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (e) { switch (e.label) {
    case 0: return url ? [3, 2] : [4, chunk_1df442d3_js_1.a()];
    case 1: config = e.sent(), url = config.serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService, localUrl = "http://" + config.urls.localService + ":" + config.ports.localService, sendToRemote = !config.apiService && !config.asyncPersistency, e.label = 2;
    case 2: return [2, fetch((sendToRemote ? url : localUrl) + "/device/flow-options").then(function (e) { return e.json(); })];
} }); }); }
exports.h = getFlowOptions;
function getAnomalies(e, t) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return url ? [3, 2] : [4, chunk_1df442d3_js_1.a()];
    case 1: config = n.sent(), url = config.serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService, localUrl = "http://" + config.urls.localService + ":" + config.ports.localService, sendToRemote = !config.apiService && !config.asyncPersistency, n.label = 2;
    case 2: return [2, fetch((sendToRemote ? url : localUrl) + "/db/api/settings/anomalies/" + e + "?detached=" + t).then(function (e) { return e.json(); })];
} }); }); }
exports.g = getAnomalies;
function saveFingers(e) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return url ? [3, 2] : [4, chunk_1df442d3_js_1.a()];
    case 1: config = t.sent(), url = config.serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService, localUrl = "http://" + config.urls.localService + ":" + config.ports.localService, sendToRemote = !config.apiService && !config.asyncPersistency, t.label = 2;
    case 2: return [2, fetch((sendToRemote ? url : localUrl) + "/db/api/biometries/fingers", { method: "post", body: JSON.stringify(e), headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); })];
} }); }); }
exports.e = saveFingers;
function getModalSettings() { return fetch(localServicesUrl + "/db/api/settings/" + chunk_c112ef87_js_1.a.settingTypes.MODAL_SETTINGS, { method: "get", headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.a = getModalSettings;
function getPeople(e, t) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (n) { switch (n.label) {
    case 0: return url ? [3, 2] : [4, chunk_1df442d3_js_1.a()];
    case 1: config = n.sent(), url = config.serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService, authServicesUrl = config.urls.authServicesUrl, n.label = 2;
    case 2: return [2, fetch(url + "/db/api/people-details/" + e + "/" + t, { method: "get", headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); })];
} }); }); }
exports.f = getPeople;
function authServicesToken() { return fetch(authServicesUrl + "/auth?username=user01&password=E-(Q2hX:pmRugZQ", { method: "post", headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
function fingerAuthenticate(e) { return tslib_1.__awaiter(this, void 0, void 0, function () { return tslib_1.__generator(this, function (t) { switch (t.label) {
    case 0: return [4, authServicesToken()];
    case 1: return t.sent(), [2, fetch(authServicesUrl + "/finger/authenticate", { method: "post", body: JSON.stringify(e), headers: { "Content-Type": "application/json" }, credentials: "include" }).then(function (e) { return e.json(); })];
} }); }); }
exports.c = fingerAuthenticate;
function saveFingerFile(e, t) { return tslib_1.__awaiter(this, void 0, void 0, function () { var n; return tslib_1.__generator(this, function (i) { switch (i.label) {
    case 0: return (n = new FormData).append("file", t), n.set("data", JSON.stringify(e)), url ? [3, 2] : [4, chunk_1df442d3_js_1.a()];
    case 1: config = i.sent(), url = config.serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService, localUrl = "http://" + config.urls.localService + ":" + config.ports.localService, sendToRemote = !config.apiService && !config.asyncPersistency, i.label = 2;
    case 2: return [2, fetch((sendToRemote ? url : localUrl) + "/db/api/biometries/finger-file", { method: "post", body: n }).then(function (e) { return e.json(); })];
} }); }); }
exports.d = saveFingerFile;
function authLog(e) { return fetch(authServicesUrl + "/log/auth", { method: "post", body: JSON.stringify(e), headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.b = authLog;
chunk_1df442d3_js_1.a().then(function (e) { url = (config = e).serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService, localUrl = "http://" + config.urls.localService + ":" + config.ports.localService, authServicesUrl = config.urls.authServicesUrl, sendToRemote = !config.apiService && !config.asyncPersistency; });
