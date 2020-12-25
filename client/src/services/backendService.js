export const backendService = {
    registration,
    activation,
};

function registration(params) {
    return fetchJSON('/api/registration', 'POST', params);
}

function activation(token) {
    return fetchJSON('/api/activation', 'POST', { token });
}

function fetchJSON(url, method = 'GET', params = {}) {
    const options = { method };
    if (method === 'POST') {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(params);
    }
    return fetch(url, options);
}

