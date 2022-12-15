'use strict';

const __chunk_6 = require('./chunk-128e8b8e.js');
const __chunk_9 = require('./chunk-0f193d81.js');

let config, url, localUrl, sendToRemote;
__chunk_9.getAppConfig().then((response) => {
    config = response;
    console.log("app config fetched");
    url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`,
        localUrl = `${config.serviceServerType}://${config.urls.localService}:${config.ports.localService}`;
    sendToRemote = !config.apiService && !config.asyncPersistency;
});
async function getAnomalies(type, detached) {
    if (!url) {
        config = await __chunk_9.getAppConfig();
        url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
        localUrl = `http://${config.urls.localService}:${config.ports.localService}`;
        sendToRemote = !config.apiService && !config.asyncPersistency;
    }
    return fetch(`${sendToRemote ? url : localUrl}/db/api/settings/anomalies/${type}?detached=${detached}`).then(res => res.json());
}
async function saveSignature(data) {
    if (!url) {
        config = await __chunk_9.getAppConfig();
        url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
        localUrl = `http://${config.urls.localService}:${config.ports.localService}`;
        sendToRemote = !config.apiService && !config.asyncPersistency;
    }
    return fetch(`${sendToRemote ? url : localUrl}/db/api/biometries/signature`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
function getSignatureSettings() {
    return new Promise(async (resolve, _) => {
        await fetch(`${localUrl}/db/api/settings/${__chunk_6.constants.settingTypes.SIGNATURE_SETTINGS}`)
            .then(async (res) => res.json())
            .then(data => resolve(data));
    });
}
function saveSignatureFile(data, file) {
    const bodyData = new FormData();
    bodyData.append("file", file);
    bodyData.set("data", JSON.stringify(data));
    return fetch(`${url}/db/api/biometries/signature-file`, {
        method: 'post',
        body: bodyData,
    })
        .then(res => res.json());
}

exports.getAnomalies = getAnomalies;
exports.getSignatureSettings = getSignatureSettings;
exports.saveSignature = saveSignature;
exports.saveSignatureFile = saveSignatureFile;
