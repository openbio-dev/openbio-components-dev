const baseUrl = 'https://testeomaservice.openbio.com.br';
async function register(data, token) {
    return fetch(`${baseUrl}/api/v1/face/register`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    }).then(res => res.json());
}
async function verify(data, token) {
    return fetch(`${baseUrl}/api/v1/face/verify`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    }).then(res => res.json());
}
async function checkLiveness(data, token) {
    return fetch(`${baseUrl}/api/v1/liveness/verify`, {
        method: 'post',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: data,
    }).then(res => res.json());
}
async function contains(data, token) {
    return fetch(`${baseUrl}/api/v1/face/contains`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    }).then(res => res.json());
}
async function update(data, token) {
    return fetch(`${baseUrl}/api/v1/face/update`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data),
    }).then(res => res.json());
}
export default {
    checkLiveness,
    contains,
    register,
    verify,
    update,
};
