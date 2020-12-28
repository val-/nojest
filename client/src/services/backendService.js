export const backendService = {
    updateSessionContext,
    getSessionContext,
    login,
    logout,
    registration,
    activation,
};

let sessionContextState;

function updateSessionContext() {
    return new Promise((resolve, reject) => {
        fetchJSON('/api/session-context').then(resp => {
            sessionContextState = resp;
            resolve(resp);
        }, reject)
    });
}

function getSessionContext() {
    return sessionContextState;
}

function login(params) {
    return fetchJSON('/api/login', 'POST', params);
}

function logout() {
    return fetchJSON('/api/logout');
}

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
    return new Promise((resolve, reject) => {
        fetch(url, options).then(resp => resp.json()).then(
            resp => {
                if (resp.error) {
                    reject(resp.error);
                } else {
                    resolve(resp);
                }
            },
            reject
        );
    });
}

