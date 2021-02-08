"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fingerNames = new Map;
fingerNames.set(4, "RIGHT-LITTLE"), fingerNames.set(3, "RIGHT-RING"), fingerNames.set(2, "RIGHT-MIDDLE"), fingerNames.set(1, "RIGHT-INDEX"), fingerNames.set(0, "RIGHT-THUMB"), fingerNames.set(5, "LEFT-THUMB"), fingerNames.set(6, "LEFT-INDEX"), fingerNames.set(7, "LEFT-MIDDLE"), fingerNames.set(8, "LEFT-RING"), fingerNames.set(9, "LEFT-LITTLE");
var constants = { SERVER_HOST: "localhost:4000", WS_HOST: "localhost:5000", IPINFO_ADDRESS: "http://ipinfo.io/json?token=61ed945b6baf67", anomalyTypes: { SIGNATURE_ANOMALY: 0, FACE_ANOMALY: 1, MODAL_ANOMALY: 2, DOCUMENT_ANOMALY: 3 }, settingTypes: { PERSON_REQUIRED_FIELD: 0, MODAL_SETTINGS: 1, FACE_SETTINGS: 2, SIGNATURE_SETTINGS: 3 }, device: { AKYSCAM: "AKYSCAM", WEBCAM: "WEBCAM", IB: "IB", MSP: "MSP", SECUGEN: "SECUGEN", WACOM: "WACOM", CANON: "CANON" }, processor: { AWPREFACE: "AWPREFACE", IDKIT: "IDKIT", AK_MATCHER: "AK_MATCHER" }, valueTypes: { INTEGER: 0, STRING: 1, BOOLEAN: 2 }, dpiValue: { 1: 300 }, fingerNames: fingerNames };
exports.a = constants;
