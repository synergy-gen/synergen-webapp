import api from '../api-gateway';

// Authenticating the user
export const USER_AUTH_REQUEST = 'USER_AUTH_REQUEST';
function userAuthRequest() {
    return { type: USER_AUTH_REQUEST };
}

export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
function userAuthSuccess(uid) {
    return { type: USER_AUTH_SUCCESS, uid };
}

export const USER_AUTH_FAILURE = 'USER_AUTH_FAILURE';
function userAuthFailure(error) {
    return { type: USER_AUTH_FAILURE, error };
}

export function authenticateUser(username, password) {
    return function(dispatch) {
        dispatch(userAuthRequest());

        return new Promise((resolve, reject) => {
            api.put('/auth', { username, password }, (err, res) => {
                if (err) {
                    dispatch(userAuthFailure(err.message));
                    return reject(err);
                }
                api.setToken(res.content.token);
                dispatch(userAuthSuccess(res.content.uid));
                return resolve(res);
            });
        });
    };
}

// Verify user authentication
export const VERIFY_USER_AUTH_REQUEST = 'VERIFY_USER_AUTH_REQUEST';
function verifyUserAuthRequest() {
    return { type: VERIFY_USER_AUTH_REQUEST };
}

export const VERIFY_USER_AUTH_SUCCESS = 'VERIFY_USER_AUTH_SUCCESS';
function verifyUserAuthSuccess(uid) {
    return { type: VERIFY_USER_AUTH_SUCCESS, uid };
}

export const VERIFY_USER_AUTH_FAILURE = 'VERIFY_USER_AUTH_FAILURE';
function verifyUserAuthFailure() {
    return { type: VERIFY_USER_AUTH_FAILURE };
}

export function verifyUserIsAuthenticated() {
    return function(dispatch) {
        dispatch(verifyUserAuthRequest());
        return new Promise((resolve, reject) => {
            api.get('/auth', (err, res) => {
                if (err) {
                    dispatch(verifyUserAuthFailure());
                    return reject(err);
                }
                dispatch(verifyUserAuthSuccess(res.content.uid));
                return resolve(res);
            });
        });
    };
}

// Logout action
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
function logoutRequest() {
    return { type: LOGOUT_REQUEST };
}
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
function logoutSuccess() {
    return { type: LOGOUT_SUCCESS };
}
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
function logoutFailure(error) {
    return { type: LOGOUT_FAILURE, error };
}

export function logout() {
    return function(dispatch) {
        dispatch(logoutRequest());
        api.setToken(null);
        dispatch(logoutSuccess());
    };
}
