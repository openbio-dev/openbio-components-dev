'use strict';

const __chunk_6 = require('./chunk-128e8b8e.js');

const url = `http://${__chunk_6.constants.WS_HOST}`;
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

exports.getAppConfig = getAppConfig;
exports.getCameraPresets = getCameraPresets;
exports.saveServiceTime = saveServiceTime;
