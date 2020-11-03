"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session = { person: { id: 0 }, document: {}, signature: {}, face: {}, modal: { fingers: [] }, mugshot: [] };
function setFingers(e) { return session.modal.fingers = e; }
exports.e = setFingers;
function setFace(e) { return session.face = e; }
exports.a = setFace;
function setSignature(e) { return session.signature = e; }
exports.f = setSignature;
var commonjsGlobal = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
exports.d = commonjsGlobal;
function unwrapExports(e) { return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e; }
exports.c = unwrapExports;
function createCommonjsModule(e, s) { return e(s = { exports: {} }, s.exports), s.exports; }
exports.b = createCommonjsModule;
