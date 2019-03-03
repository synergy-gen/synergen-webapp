import api from '../api-gateway';
import { authenticateUser } from './auth';

// Register a new user
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
function registerUserRequest() {
    return { type: REGISTER_USER_REQUEST };
}

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
function registerUserSuccess(user) {
    return { type: REGISTER_USER_SUCCESS, user };
}

export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
function registerUserFailure(error) {
    return { type: REGISTER_USER_FAILURE, error };
}

export function registerUser(name, email, username, password) {
    return function(dispatch) {
        dispatch(registerUserRequest());

        return new Promise((resolve, reject) => {
            api.post(`/users`, { name, email, username, password }, (err, res) => {
                if (err) {
                    dispatch(registerUserFailure(err.message));
                    return reject(err);
                }
                // If we succeeded, we also need to authenticate
                dispatch(registerUserSuccess(res.content));
                dispatch(authenticateUser(username, password)).then(resolve, reject);
            });
        });
    };
}

// Getting User Info
export const FETCH_USER_INFO_REQUEST = 'FETCH_USER_INFO_REQUEST';
function fetchUserInfoRequest() {
    return { type: FETCH_USER_INFO_REQUEST };
}

export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
function fetchUserInfoSuccess(user) {
    return { type: FETCH_USER_INFO_SUCCESS, user };
}

export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';
function fetchUserInfoFailure(error) {
    return { type: FETCH_USER_INFO_FAILURE, error };
}

export function fetchUserInfo(id) {
    return function(dispatch) {
        dispatch(fetchUserInfoRequest());

        return new Promise((resolve, reject) => {
            api.get(`/users/${id}`, (err, res) => {
                if (err) {
                    dispatch(fetchUserInfoFailure(err.message));
                    return reject(err);
                }
                dispatch(fetchUserInfoSuccess(res.content));
                return resolve(res);
            });
        });
    };
}