import { h } from '../openbio-components.core.js';

import { a as constants } from './chunk-e4627dab.js';
import { a as getAppConfig } from './chunk-ca6b607d.js';

let config, url;
getAppConfig().then((response) => {
    config = response;
    url = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
});
function getFlowOptions() {
    return fetch(`${url}/device/flow-options`).then(res => res.json());
}
function getAnomalies(type, detached) {
    return fetch(`${url}/db/api/settings/anomalies/${type}?detached=${detached}`).then(res => res.json());
}
function saveFingers(data) {
    return fetch(`${url}/db/api/biometries/fingers`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
function getModalSettings() {
    return fetch(`${url}/db/api/settings/${constants.settingTypes.MODAL_SETTINGS}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json());
}
function getPeople(cpf, captureType) {
    return fetch(`${url}/db/api/people-details/${cpf}/${captureType}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
}
function fingerAuthenticate(data) {
    return fetch(`${url}/db/api/biometries/finger/authenticate`, {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json());
}

export { getModalSettings as a, fingerAuthenticate as b, getPeople as c, getAnomalies as d, getFlowOptions as e, saveFingers as f };
