"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chunk_e4627dab_js_1 = require("./chunk-e4627dab.js");
var chunk_ca6b607d_js_1 = require("./chunk-ca6b607d.js");
var config, url;
function getFlowOptions() { return fetch(url + "/device/flow-options").then(function (e) { return e.json(); }); }
exports.e = getFlowOptions;
function getAnomalies(e, t) { return fetch(url + "/db/api/settings/anomalies/" + e + "?detached=" + t).then(function (e) { return e.json(); }); }
exports.d = getAnomalies;
function saveFingers(e) { return fetch(url + "/db/api/biometries/fingers", { method: "post", body: JSON.stringify(e), headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.f = saveFingers;
function getModalSettings() { return fetch(url + "/db/api/settings/" + chunk_e4627dab_js_1.a.settingTypes.MODAL_SETTINGS, { method: "get", headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.a = getModalSettings;
function getPeople(e, t) { return fetch(url + "/db/api/people-details/" + e + "/" + t, { method: "get", headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.c = getPeople;
function fingerAuthenticate(e) { return fetch(url + "/db/api/biometries/finger/authenticate", { method: "post", body: JSON.stringify(e), headers: { "Content-Type": "application/json" } }).then(function (e) { return e.json(); }); }
exports.b = fingerAuthenticate;
chunk_ca6b607d_js_1.a().then(function (e) { url = (config = e).serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService; });
