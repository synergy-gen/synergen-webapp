import {
    USER_AUTH_REQUEST,
    USER_AUTH_SUCCESS,
    USER_AUTH_FAILURE,
    VERIFY_USER_AUTH_REQUEST,
    VERIFY_USER_AUTH_SUCCESS,
    VERIFY_USER_AUTH_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from '../actions/auth.js';

export default function auth(state = {}, action) {
    switch (action.type) {
        case USER_AUTH_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case USER_AUTH_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                authenticated: true,
                error: null
            });
        case USER_AUTH_FAILURE:
            return Object.assign({}, state, { isFetching: false, authenticated: false, error: action.error });

        // User verification (for page reloads)
        case VERIFY_USER_AUTH_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case VERIFY_USER_AUTH_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                authenticated: true,
                error: null
            });
        case VERIFY_USER_AUTH_FAILURE:
            return Object.assign({}, state, { authenticated: false, isFetching: false, error: action.error });

        // Logout the user
        case LOGOUT_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, { authenticated: false, isFetching: false, error: null });
        case LOGOUT_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.error });

        default:
            return state;
    }
}
