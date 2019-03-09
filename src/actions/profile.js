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

// Saving avatar
export const UPLOAD_AVATAR_REQUEST = 'UPLOAD_AVATAR_REQUEST';
function uploadAvatarRequest() {
    return { type: UPLOAD_AVATAR_REQUEST };
}

export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';
function uploadAvatarSuccess(sourceUrl) {
    return { type: UPLOAD_AVATAR_SUCCESS, sourceUrl };
}

export const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE';
function uploadAgatarFailure(error) {
    return { type: UPLOAD_AVATAR_FAILURE, error };
}

export function uploadAvatar(rawData, mime) {
    return function(dispatch, getState) {
        dispatch(uploadAvatarRequest());

        let id = getState().profile.id;

        return new Promise((resolve, reject) => {
            api.put(`/users/${id}/avatar`, rawData, { contentType: mime }, (err, res) => {
                if (err) {
                    dispatch(uploadAgatarFailure(err.message));
                    return reject(err);
                }
                dispatch(uploadAvatarSuccess(res.content.location));
                return resolve(res);
            });
        });
    };
}

// Updating user information
export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
const updateUserInfoRequest = () => ({ type: UPDATE_USER_INFO_REQUEST });

export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
const updateUserInfoSuccess = user => ({ type: UPDATE_USER_INFO_SUCCESS, user });

export const UPDATE_USER_INFO_FAILURE = 'UPDATE_USER_INFO_FAILURE';
const updateUserInfoFailure = error => ({ type: UPDATE_USER_INFO_FAILURE, error });

export const updateUserInfo = info => (dispatch, getState) => {
    dispatch(updateUserInfoRequest());

    let uid = getState().profile.id;

    return new Promise((resolve, reject) => {
        api.patch(`/users/${uid}`, info, (err, res) => {
            if (err) {
                dispatch(updateUserInfoFailure(err.message));
                return reject(err);
            } else {
                dispatch(updateUserInfoSuccess(res.content));
                return resolve(res);
            }
        });
    });
};
