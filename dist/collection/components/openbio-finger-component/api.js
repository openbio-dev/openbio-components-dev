import constants from "../../utils/constants";
import { getAppConfig } from "../../utils/api";
let config, url;
getAppConfig().then((response) => {
    config = response;
    url = `http://${config.urls.apiService}:${config.ports.apiService}`;
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
