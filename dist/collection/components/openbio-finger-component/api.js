import constants from "../../utils/constants";
import { getAppConfig } from "../../utils/api";
let config, url;
getAppConfig().then((response) => {
    config = response;
    url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
});
export function getFlowOptions() {
    return fetch(`${url}/device/flow-options`).then(res => res.json());
}
export function getAnomalies(type, detached) {
    return fetch(`${url}/db/api/settings/anomalies/${type}?detached=${detached}`).then(res => res.json());
}
export function saveFingers(data) {
    return fetch(`${url}/db/api/biometries/fingers`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
export function getModalSettings() {
    return fetch(`${url}/db/api/settings/${constants.settingTypes.MODAL_SETTINGS}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
export function getPeople(cpf, captureType) {
    return fetch(`${url}/db/api/people-details/${cpf}/${captureType}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
}
export function fingerAuthenticate(data) {
    return fetch(`${url}/db/api/biometries/finger/authenticate`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
}
export function saveFingerFile(data, file) {
    const bodyData = new FormData();
    bodyData.append("file", file);
    bodyData.set("data", JSON.stringify(data));
    return fetch(`${url}/db/api/biometries/finger-file`, {
        method: 'post',
        body: bodyData,
    })
        .then(res => res.json());
}
