import api from '../api-gateway';

// Creating a new goal
export const CREATE_GOAL_REQUEST = 'CREATE_GOAL_REQUEST';
function createGoalRequest() {
    return { type: CREATE_GOAL_REQUEST };
}

export const CREATE_GOAL_SUCCESS = 'CREATE_GOAL_SUCCESS';
function createGoalSuccess(goal) {
    return { type: CREATE_GOAL_SUCCESS, goal };
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
        goal.creator = state.profile.id;

        return new Promise((resolve, reject) => {
            api.post(`/users/${goal.creator}/goals`, goal, (err, res) => {
                if (err) {
                    dispatch(createGoalFailure(err.message));
                    return reject(err);
                }

                dispatch(createGoalSuccess(res.content));
                return resolve(res);
            });
        });
    };
}

// Editing goals
export const EDIT_GOAL_REQUEST = 'EDIT_GOAL_REQUEST';
function editGoalRequest() {
    return { type: EDIT_GOAL_REQUEST };
}
export const EDIT_GOAL_SUCCESS = 'EDIT_GOAL_SUCCESS';
function editGoalSuccess(goal) {
    return { type: EDIT_GOAL_SUCCESS, goal };
}
export const EDIT_GOAL_FAILURE = 'EDIT_GOAL_FAILURE';
function editGoalFailure(error) {
    return { type: EDIT_GOAL_FAILURE, error };
}

export function editGoal(goal) {
    return function(dispatch) {
        dispatch(editGoalRequest());

        let url = goal._links.self;
        delete goal._links;
        delete goal.id;
        return new Promise((resolve, reject) => {
            api.patch(url, goal, (err, res) => {
                if (err) {
                    dispatch(editGoalFailure(err.message));
                    return reject(err);
                }
                dispatch(editGoalSuccess(res.content));
                return resolve(res);
            });
        });
    };
}

// Delete goals
export const DELETE_GOAL_REQUEST = 'DELETE_GOAL_REQUEST';
function deleteGoalRequest() {
    return { type: DELETE_GOAL_REQUEST };
}
export const DELETE_GOAL_SUCCESS = 'DELETE_GOAL_SUCCESS';
function deleteGoalSuccess(id) {
    return { type: DELETE_GOAL_SUCCESS, id };
}
export const DELETE_GOAL_FAILURE = 'DELETE_GOAL_FAILURE';
function deleteGoalFailure(error) {
    return { type: DELETE_GOAL_FAILURE, error };
}

export function deleteGoal(goal) {
    return function(dispatch) {
        dispatch(deleteGoalRequest());

        let url = goal._links.self;
        return new Promise((resolve, reject) => {
            api.delete(url, (err, res) => {
                if (err) {
                    dispatch(deleteGoalFailure(err.message));
                    return reject(err);
                }
                dispatch(deleteGoalSuccess(goal.id));
                return resolve(res);
            });
        });
    };
}

// Publish an existing goal
export const PUBLISH_GOAL_REQUEST = 'PUBLISH_GOAL_REQUEST';
function publishGoalRequest() {
    return { type: PUBLISH_GOAL_REQUEST };
}

export const PUBLISH_GOAL_SUCCESS = 'PUBLISH_GOAL_SUCCESS';
function publishGoalSuccess(goal) {
    return { type: PUBLISH_GOAL_SUCCESS, goal };
}

export const PUBLISH_GOAL_FAILURE = 'PUBLISH_GOAL_FAILURE';
function publishGoalFailure(error) {
    return { type: PUBLISH_GOAL_FAILURE, error };
}

export function publishGoal(goal) {
    return function(dispatch, getState) {
        dispatch(publishGoalRequest());

        let state = getState();
        goal.creator = state.profile.id;

        return new Promise((resolve, reject) => {
            api.post(`/goals`, goal, (err, res) => {
                if (err) {
                    dispatch(publishGoalFailure(err.message));
                    return reject(err);
                }

                dispatch(publishGoalSuccess(res.content));
                return resolve(res);
            });
        });
    };
}

// Adopt a goal
export const ADOPT_GOAL_REQUEST = 'ADOPT_GOAL_REQUEST';
function adoptGoalRequest() {
    return { type: ADOPT_GOAL_REQUEST };
}

export const ADOPT_GOAL_SUCCESS = 'ADOPT_GOAL_SUCCESS';
function adoptGoalSuccess(goal) {
    return { type: ADOPT_GOAL_SUCCESS, goal };
}

export const ADOPT_GOAL_FAILURE = 'ADOPT_GOAL_FAILURE';
function adoptGoalFailure(error) {
    return { type: ADOPT_GOAL_FAILURE, error };
}

export function adoptGoal(goalId) {
    return function(dispatch, getState) {
        dispatch(adoptGoalRequest());
        let uid = getState().profile.id;

        let data = { uid };

        return new Promise((resolve, reject) => {
            api.post(`/goals/${goalId}/adoptions`, data, (err, res) => {
                if (err) {
                    dispatch(adoptGoalFailure(err.message));
                    return reject(err);
                }
                dispatch(adoptGoalSuccess(res.content));
                return resolve(res);
            });
        });
    };
}
