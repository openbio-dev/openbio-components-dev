import { c as constants } from './chunk-df3525b2.js';

const url = `http://${constants.WS_HOST}`;
let config, servicesUrl;
getAppConfig().then((response) => {
    config = response;
    servicesUrl = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
});
function getAppConfig() {
    return fetch(`${url}/db/api/config`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());
}
function getCameraPresets() {
    return fetch(`${url}/db/api/camera-presets`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());
}
async function saveServiceTime(type, time, personId) {
    const config = await getAppConfig();
    const serviceUrl = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
    return fetch(`${serviceUrl}/db/api/service-time`, {
        method: 'post',
        body: JSON.stringify({ type, time, personId }),
        headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());
}

export { getCameraPresets as a, getAppConfig as g, saveServiceTime as s };
