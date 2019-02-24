import api from '../api-gateway';

// Searching goals
export const FETCH_QUERY_RESULTS_REQUEST = 'FETCH_QUERY_RESULTS_REQUEST';
function fetchQueryResultsRequest(query) {
    return { type: FETCH_QUERY_RESULTS_REQUEST, query };
}
export const FETCH_QUERY_RESULTS_SUCCESS = 'FETCH_QUERY_RESULTS_SUCCESS';
function fetchQueryResultsSuccess(results) {
    return { type: FETCH_QUERY_RESULTS_SUCCESS, results };
}
export const FETCH_QUERY_RESULTS_FAILURE = 'FETCH_QUERY_RESULTS_FAILURE';
function fetchQueryResultsFailure(error) {
    return { type: FETCH_QUERY_RESULTS_FAILURE, error };
}

export function queryGoals(query) {
    return function(dispatch) {
        dispatch(fetchQueryResultsRequest(query));

        return new Promise((resolve, reject) => {
            api.get(`/goals?q=${query}`, (err, res) => {
                if (err) {
                    dispatch(fetchQueryResultsFailure(err.message));
                    return reject(err);
                }
                dispatch(fetchQueryResultsSuccess(res.content));
                return resolve(res);
            });
        });
    };
}