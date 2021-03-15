import { getAppConfig } from "../../utils/api";
let config, url;
getAppConfig().then((response) => {
    config = response;
    console.log("app config fetched");
    url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
});
export function loadFingerForm(data) {
    return fetch(`${url}/db/api/biometries/finger/form`, { method: "POST", body: data })
        .then(res => res.json());
}
export function loadPalmForm(data) {
    return fetch(`${url}/db/api/biometries/palm/form`, { method: "POST", body: data })
        .then(res => res.json());
}
export function scannerScan() {
    return fetch(`${url}/db/api/scanner/scan`)
        .then(res => res.json());
}
