'use strict';

const __chunk_6 = require('./chunk-128e8b8e.js');
const __chunk_9 = require('./chunk-0f193d81.js');

let config, url, localUrl, sendToRemote, authServicesUrl;
const localServicesUrl = `http://${__chunk_6.constants.WS_HOST}`;
__chunk_9.getAppConfig().then((response) => {
    config = response;
    url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
    localUrl = `http://${config.urls.localService}:${config.ports.localService}`;
    authServicesUrl = config.urls.authServicesUrl;
    sendToRemote = !config.apiService && !config.asyncPersistency;
});
async function getFlowOptions() {
    if (!url) {
        config = await __chunk_9.getAppConfig();
        url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
        localUrl = `http://${config.urls.localService}:${config.ports.localService}`;
        sendToRemote = !config.apiService && !config.asyncPersistency;
    }
    return fetch(`${sendToRemote ? url : localUrl}/device/flow-options`).then(res => res.json());
}
async function getAnomalies(type, detached) {
    if (!url) {
        config = await __chunk_9.getAppConfig();
        url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
        localUrl = `http://${config.urls.localService}:${config.ports.localService}`;
        sendToRemote = !config.apiService && !config.asyncPersistency;
    }
    return fetch(`${sendToRemote ? url : localUrl}/db/api/settings/anomalies/${type}?detached=${detached}`).then(res => res.json());
}
async function saveFingers(data) {
    if (!url) {
        config = await __chunk_9.getAppConfig();
        url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
        localUrl = `http://${config.urls.localService}:${config.ports.localService}`;
        sendToRemote = !config.apiService && !config.asyncPersistency;
    }
    return fetch(`${sendToRemote ? url : localUrl}/db/api/biometries/fingers`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
function getModalSettings() {
    return fetch(`${localServicesUrl}/db/api/settings/${__chunk_6.constants.settingTypes.MODAL_SETTINGS}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
async function getPeople(cpf, captureType) {
    if (!url) {
        config = await __chunk_9.getAppConfig();
        url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
        authServicesUrl = config.urls.authServicesUrl;
    }
    return fetch(`${url}/db/api/people-details/${cpf}/${captureType}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
}
function authServicesToken() {
    return fetch(`${authServicesUrl}/auth?username=user01&password=E-(Q2hX:pmRugZQ`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
}
async function fingerAuthenticate(data) {
    await authServicesToken();
    return fetch(`${authServicesUrl}/finger/authenticate`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
    }).then(res => res.json());
}
async function saveFingerFile(data, file) {
    const bodyData = new FormData();
    bodyData.append("file", file);
    bodyData.set("data", JSON.stringify(data));
    if (!url) {
        config = await __chunk_9.getAppConfig();
        url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
        localUrl = `http://${config.urls.localService}:${config.ports.localService}`;
        sendToRemote = !config.apiService && !config.asyncPersistency;
    }
    return fetch(`${sendToRemote ? url : localUrl}/db/api/biometries/finger-file`, {
        method: 'post',
        body: bodyData,
    })
        .then(res => res.json());
}
function authLog(data) {
    return fetch(`${authServicesUrl}/log/auth`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}

exports.authLog = authLog;
exports.fingerAuthenticate = fingerAuthenticate;
exports.getAnomalies = getAnomalies;
exports.getFlowOptions = getFlowOptions;
exports.getModalSettings = getModalSettings;
exports.getPeople = getPeople;
exports.saveFingerFile = saveFingerFile;
exports.saveFingers = saveFingers;
