import constants from './constants';

const url = `http://${constants.WS_HOST}`;
let config, servicesUrl;
getAppConfig().then((response) => {
  config = response;
  servicesUrl = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
});

export function getAppConfig() {
  return fetch(`${url}/db/api/config`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json'}
  }).then((res) => res.json());
}

export function getCameraPresets() {
  return fetch(`${url}/db/api/camera-presets`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json'}
  }).then((res) => res.json());
}

export async function saveServiceTime(type: string, time: number, personId: number) {
  const config = await getAppConfig();
  const serviceUrl = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;

  return fetch(`${serviceUrl}/db/api/service-time`, {
    method: 'post',
    body: JSON.stringify({ type, time, personId }),
    headers: { 'Content-Type': 'application/json'}
  }).then((res) => res.json());
}

export async function getPersonById(id): Promise<any>{
  if (!url) {
    config = await getAppConfig();
    servicesUrl = `${config.serviceServerType}://${config.urls.apiService}:${config.ports.apiService}`;
  }
  return fetch(`${servicesUrl}/db/api/people/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
}