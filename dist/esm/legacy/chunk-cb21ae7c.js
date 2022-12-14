var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { c as constants } from './chunk-df3525b2.js';
import { g as getAppConfig } from './chunk-745c836f.js';
var config, url, localUrl, sendToRemote;
getAppConfig().then(function (response) {
    config = response;
    console.log("app config fetched");
    url = config.serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService,
        localUrl = config.serviceServerType + "://" + config.urls.localService + ":" + config.ports.localService;
    sendToRemote = !config.apiService && !config.asyncPersistency;
});
function getAnomalies(type, detached) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!url) return [3 /*break*/, 2];
                    return [4 /*yield*/, getAppConfig()];
                case 1:
                    config = _a.sent();
                    url = config.serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService;
                    localUrl = "http://" + config.urls.localService + ":" + config.ports.localService;
                    sendToRemote = !config.apiService && !config.asyncPersistency;
                    _a.label = 2;
                case 2: return [2 /*return*/, fetch((sendToRemote ? url : localUrl) + "/db/api/settings/anomalies/" + type + "?detached=" + detached).then(function (res) { return res.json(); })];
            }
        });
    });
}
function saveSignature(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!url) return [3 /*break*/, 2];
                    return [4 /*yield*/, getAppConfig()];
                case 1:
                    config = _a.sent();
                    url = config.serviceServerType + "://" + config.urls.apiService + ":" + config.ports.apiService;
                    localUrl = "http://" + config.urls.localService + ":" + config.ports.localService;
                    sendToRemote = !config.apiService && !config.asyncPersistency;
                    _a.label = 2;
                case 2: return [2 /*return*/, fetch((sendToRemote ? url : localUrl) + "/db/api/biometries/signature", {
                        method: 'post',
                        body: JSON.stringify(data),
                        headers: { 'Content-Type': 'application/json' },
                    })
                        .then(function (res) { return res.json(); })];
            }
        });
    });
}
function getSignatureSettings() {
    var _this = this;
    return new Promise(function (resolve, _) { return __awaiter(_this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(localUrl + "/db/api/settings/" + constants.settingTypes.SIGNATURE_SETTINGS)
                        .then(function (res) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, res.json()];
                    }); }); })
                        .then(function (data) { return resolve(data); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
}
function saveSignatureFile(data, file) {
    var bodyData = new FormData();
    bodyData.append("file", file);
    bodyData.set("data", JSON.stringify(data));
    return fetch(url + "/db/api/biometries/signature-file", {
        method: 'post',
        body: bodyData,
    })
        .then(function (res) { return res.json(); });
}
export { getAnomalies as a, saveSignature as b, getSignatureSettings as g, saveSignatureFile as s };
