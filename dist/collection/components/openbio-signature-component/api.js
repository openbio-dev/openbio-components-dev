import constants from "../../utils/constants";
import { getAppConfig } from "../../utils/api";
let config, url;
getAppConfig().then((response) => {
    config = response;
    console.log("app config fetched");
    url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
});
export function getAnomalies(type, detached) {
    return fetch(`${url}/db/api/settings/anomalies/${type}?detached=${detached}`).then(res => res.json());
}
export function saveSignature(data) {
    return fetch(`${url}/db/api/biometries/signature`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
export function getSignatureSettings() {
    return new Promise(async (resolve, _) => {
        await fetch(`${url}/db/api/settings/${constants.settingTypes.SIGNATURE_SETTINGS}`)
            .then(async (res) => res.json())
            .then(data => resolve(data));
    });
}
export function saveSignatureFile(data, file) {
    const bodyData = new FormData();
    bodyData.append("file", file);
    bodyData.set("data", JSON.stringify(data));
    return fetch(`${url}/db/api/biometries/signature-file`, {
        method: 'post',
        body: bodyData,
    })
        .then(res => res.json());
}
