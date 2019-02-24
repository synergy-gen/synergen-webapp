import {
    FETCH_QUERY_RESULTS_REQUEST,
    FETCH_QUERY_RESULTS_SUCCESS,
    FETCH_QUERY_RESULTS_FAILURE
} from '../actions/explore';

export default function explore(state = {}, action) {
    switch (action.type) {
        case FETCH_QUERY_RESULTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                error: null,
                query: action.query
            });

        case FETCH_QUERY_RESULTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                results: action.results
            });

        case FETCH_QUERY_RESULTS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });

        default:
            return state;
    }
}
