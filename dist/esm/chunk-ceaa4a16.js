import { c as constants } from './chunk-df3525b2.js';
import { g as getAppConfig } from './chunk-745c836f.js';

let config, url, localUrl, sendToRemote, authServicesUrl;
const localServicesUrl = `http://${constants.WS_HOST}`;
getAppConfig().then((response) => {
    config = response;
    url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
    localUrl = `http://${config.urls.localService}:${config.ports.localService}`;
    authServicesUrl = config.urls.authServicesUrl;
    sendToRemote = !config.apiService && !config.asyncPersistency;
});
async function getFlowOptions() {
    if (!url) {
        config = await getAppConfig();
        url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
        localUrl = `http://${config.urls.localService}:${config.ports.localService}`;
        sendToRemote = !config.apiService && !config.asyncPersistency;
    }
    return fetch(`${sendToRemote ? url : localUrl}/device/flow-options`).then(res => res.json());
}
async function getAnomalies(type, detached) {
    if (!url) {
        config = await getAppConfig();
        url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
        localUrl = `http://${config.urls.localService}:${config.ports.localService}`;
        sendToRemote = !config.apiService && !config.asyncPersistency;
    }
    return fetch(`${sendToRemote ? url : localUrl}/db/api/settings/anomalies/${type}?detached=${detached}`).then(res => res.json());
}
async function saveFingers(data) {
    if (!url) {
        config = await getAppConfig();
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
    return fetch(`${localServicesUrl}/db/api/settings/${constants.settingTypes.MODAL_SETTINGS}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
async function getPeople(cpf, captureType) {
    if (!url) {
        config = await getAppConfig();
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
        config = await getAppConfig();
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

export { authLog as a, saveFingers as b, getPeople as c, getAnomalies as d, getFlowOptions as e, fingerAuthenticate as f, getModalSettings as g, saveFingerFile as s };
