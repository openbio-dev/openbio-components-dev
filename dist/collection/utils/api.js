import constants from './constants';
const url = `http://${constants.WS_HOST}`;
export function getAppConfig() {
    return fetch(`${url}/db/api/config`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
    }).then((res) => res.json());
}
