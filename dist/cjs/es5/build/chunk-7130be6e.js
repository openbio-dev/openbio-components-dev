"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var session = { person: { id: 0 }, document: {}, signature: {}, face: {}, modal: { fingers: [] }, mugshot: [] };
function setFingers(s) { return session.modal.fingers = s; }
exports.b = setFingers;
function setFace(s) { return session.face = s; }
exports.a = setFace;
function setSignature(s) { return session.signature = s; }
exports.c = setSignature;
