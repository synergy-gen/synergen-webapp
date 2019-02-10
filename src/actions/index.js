import api from '../api-gateway';

// Authenticating the user
export const USER_AUTH_REQUEST = 'USER_AUTH_REQUEST';
function userAuthRequest() {
    return { type: USER_AUTH_REQUEST };
}

export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
function userAuthSuccess(user) {
    return { type: USER_AUTH_SUCCESS, user };
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
                dispatch(userAuthSuccess(res.content.user));
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
function verifyUserAuthSuccess(user) {
    return { type: VERIFY_USER_AUTH_SUCCESS, user };
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
                dispatch(verifyUserAuthSuccess(res.content.user));
                return resolve(res);
            });
        });
    };
}

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
export const USER_INFO_REQUEST = 'USER_INFO_REQUEST';
function userInfoRequest() {
    return { type: USER_INFO_REQUEST };
}

export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
function userInfoSuccess(user) {
    return { type: USER_INFO_SUCCESS, user };
}

export const USER_INFO_FAILURE = 'USER_INFO_FAILURE';
function userInfoFailure(error) {
    return { type: USER_INFO_FAILURE, error };
}

export function fetchUserInfo(id) {
    return function(dispatch) {
        dispatch(userInfoRequest());

        return new Promise((resolve, reject) => {
            api.get(`/users/${id}`, (err, res) => {
                if (err) {
                    dispatch(userInfoFailure(err.message));
                    return reject(err);
                }
                dispatch(userInfoSuccess(res.content));
                return resolve(res);
            });
        });
    };
}

// Creating a new goal
export const CREATE_GOAL_REQUEST = 'CREATE_GOAL_REQUEST';
function createGoalRequest() {
    return { type: CREATE_GOAL_REQUEST };
}

export const CREATE_GOAL_SUCCESS = 'CREATE_GOAL_SUCCESS';
function createGoalSuccess(user) {
    return { type: CREATE_GOAL_SUCCESS, user };
}

export const CREATE_GOAL_FAILURE = 'CREATE_GOAL_FAILURE';
function createGoalFailure(error) {
    return { type: CREATE_GOAL_FAILURE, error };
}

export function createGoal(goal) {
    return function(dispatch, getState) {
        dispatch(createGoalRequest());

        // The created goal needs additional information from the state before we create it. We can add that here.
        let state = getState();
        goal.creator = state.user.id;

        return new Promise((resolve, reject) => {
            // If it is a public goal, then we need to post it to the public goals, otherwise just add it to the
            // user
            if (goal.public) {
                api.post('/goals', goal, (err, res) => {
                    if (err) {
                        dispatch(createGoalFailure(err.message));
                        return reject(err);
                    }
                    // We dispatch an empty goal because when a user creates a public goal, it doesn't automatically
                    // add it to the list of goals they are working on (TODO is this the case??)
                    dispatch(createGoalSuccess({}));
                    return resolve(res);
                });
            } else {
                api.post(`/users/${goal.creator}/goals`, goal, (err, res) => {
                    if (err) {
                        dispatch(createGoalFailure(err.message));
                        return reject(err);
                    }

                    dispatch(createGoalSuccess(res.content));
                    return resolve(res);
                });
            }
        });
    };
}

// Searching goals
export const QUERY_GOALS_REQUEST = 'QUERY_GOALS_REQUEST';
function queryGoalsRequest(query) {
    return { type: QUERY_GOALS_REQUEST, query };
}
export const QUERY_GOALS_SUCCESS = 'QUERY_GOALS_SUCCESS';
function queryGoalsSuccess(results) {
    return { type: QUERY_GOALS_SUCCESS, results };
}
export const QUERY_GOALS_FAILURE = 'QUERY_GOALS_FAILURE';
function queryGoalsFailure(error) {
    return { type: QUERY_GOALS_FAILURE, error };
}

export function queryGoals(query) {
    return function(dispatch) {
        dispatch(queryGoalsRequest(query));

        return new Promise((resolve, reject) => {
            api.get(`/goals?q=${query}`, (err, res) => {
                if (err) {
                    dispatch(queryGoalsFailure(err.message));
                    return reject(err);
                }
                dispatch(queryGoalsSuccess(res.content));
                return resolve(res);
            });
        });
    };
}

// Adopting goals
export const REQUEST_ADOPT_GOAL = 'REQUEST_ADOPT_GOAL';
export const REQUEST_ADOPT_GOAL_SUCCESS = 'REQUEST_ADOPT_GOAL_SUCCESS';
export const REQUEST_ADOPT_GOAL_FAILURE = 'REQUEST_ADOPT_GOAL_FAILURE';

// Visible goal
export const SET_VISIBLE_GOAL = 'SET_VISIBLE_GOAL';
export function setVisibleGoal(goal) {
    return { type: SET_VISIBLE_GOAL, goal };
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
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        if (document.cookie.split(';').filter(c => c.includes('auth') === true).length > 0) {
            dispatch(logoutFailure('Could not delete authorization token'));
            return;
        }
        dispatch(logoutSuccess());
    };
}
