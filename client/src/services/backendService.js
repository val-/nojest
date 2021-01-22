export const backendService = {
    liveUpdateSessionContext,
    getSessionContext,
    login,
    logout,
    registration,
    activation,
    createOrder,
    getOrder,
    getUserOrdersList,
    getUserJobsList,
    updateProfile,
    uploadAvatar,
};

let sessionContextState;
let liveUpdateSessionContextListener = () => {};

function liveUpdateSessionContext(cb) {
    liveUpdateSessionContextListener = cb;
    if (!sessionContextState) {
        updateSessionContext();
    }
}

function updateSessionContext() {
    return fetchJSON('/api/session-context').then(resp => {
        sessionContextState = resp;
        liveUpdateSessionContextListener(resp);
    }, () => {
        liveUpdateSessionContextListener(false);
    })
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

function createOrder(params) {
    return fetchJSON('/api/create-order', 'POST', params)
}

function getOrder(orderId) {
    return fetchJSON(`/api/order/${orderId}`)
}

function getUserOrdersList() {
    return fetchJSON('/api/user-orders')
}

function getUserJobsList() {
    return fetchJSON('/api/user-jobs')
}

function updateProfile(params) {
    return new Promise((resolve, reject) => {
        fetchJSON('/api/update-profile', 'POST', params).then(
            resp => {
                updateSessionContext().then(() => {
                    resolve(resp);
                }, reject);
            },
            reject
        );
    });
}

function uploadAvatar(params) {
    return new Promise((resolve, reject) => {
        fetchJSON('/api/upload-avatar', 'POST', params).then(
            resp => {
                updateSessionContext().then(() => {
                    resolve(resp);
                }, reject);
            },
            reject
        );
    });
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

