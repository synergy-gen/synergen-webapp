import api from '../api-gateway';

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