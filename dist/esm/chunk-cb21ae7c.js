import { c as constants } from './chunk-df3525b2.js';
import { g as getAppConfig } from './chunk-745c836f.js';

let config, url, localUrl, sendToRemote;
getAppConfig().then((response) => {
    config = response;
    console.log("app config fetched");
    url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`,
        localUrl = `${config.serviceServerType}://${config.urls.localService}:${config.ports.localService}`;
    sendToRemote = !config.apiService && !config.asyncPersistency;
});
async function getAnomalies(type, detached) {
    if (!url) {
        config = await getAppConfig();
        url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
        localUrl = `http://${config.urls.localService}:${config.ports.localService}`;
        sendToRemote = !config.apiService && !config.asyncPersistency;
    }
    return fetch(`${sendToRemote ? url : localUrl}/db/api/settings/anomalies/${type}?detached=${detached}`).then(res => res.json());
}
async function saveSignature(data) {
    if (!url) {
        config = await getAppConfig();
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
        await fetch(`${localUrl}/db/api/settings/${constants.settingTypes.SIGNATURE_SETTINGS}`)
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

export { getAnomalies as a, saveSignature as b, getSignatureSettings as g, saveSignatureFile as s };
