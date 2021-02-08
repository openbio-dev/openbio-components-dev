import constants from "../../utils/constants";
import { getAppConfig } from "../../utils/api";
let config, url;
getAppConfig().then((response) => {
    config = response;
    url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
});
export function getAnomalies(type, detached) {
    return fetch(`${url}/db/api/settings/anomalies/${type}?detached=${detached}`).then(res => res.json());
}
export function getCameraSettingsOptions() {
    return fetch(`${url}/device/camera-settings`).then(res => res.json());
}
export function getCameraSettings() {
    return fetch(`${url}/db/api/settings/camera`).then(res => res.json());
}
export function saveCameraSettings(data) {
    fetch(`${url}/db/api/settings/camera`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
export function getFaceSettings() {
    return fetch(`${url}/db/api/settings/${constants.settingTypes.FACE_SETTINGS}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
export function saveMugshotPhoto(data) {
    return fetch(`${url}/db/api/biometries/mugshot`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
export function deleteMugshotPhoto(id) {
    return fetch(`${url}/db/api/biometries/mugshot/${id}`, {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
