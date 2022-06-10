"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var openbio_components_core_js_1 = require("../openbio-components.core.js");
require("./chunk-c112ef87.js");
var chunk_131033c0_js_1 = require("./chunk-131033c0.js");
var MyComponent = function () { function e() { } return e.prototype.getText = function () { return chunk_131033c0_js_1.b(this.first, this.middle, this.last); }, e.prototype.render = function () { return openbio_components_core_js_1.h("div", null, "Hello, World! I'm ", this.getText()); }, Object.defineProperty(e, "is", { get: function () { return "my-component"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "encapsulation", { get: function () { return "shadow"; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "properties", { get: function () { return { first: { type: String, attr: "first" }, last: { type: String, attr: "last" }, middle: { type: String, attr: "middle" } }; }, enumerable: !0, configurable: !0 }), Object.defineProperty(e, "style", { get: function () { return ""; }, enumerable: !0, configurable: !0 }), e; }();
exports.MyComponent = MyComponent;
