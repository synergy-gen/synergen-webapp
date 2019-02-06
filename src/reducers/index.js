import initialState from './initial-state';
import {
    USER_AUTH_REQUEST,
    USER_AUTH_SUCCESS,
    USER_AUTH_FAILURE,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAILURE,
    CREATE_GOAL_REQUEST,
    CREATE_GOAL_SUCCESS,
    CREATE_GOAL_FAILURE,
    VERIFY_USER_AUTH_REQUEST,
    VERIFY_USER_AUTH_SUCCESS,
    VERIFY_USER_AUTH_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE
} from '../actions';

export default function synergen(state = initialState, action) {
    switch (action.type) {
        // User authentication
        case USER_AUTH_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case USER_AUTH_SUCCESS:
            return Object.assign({}, state, { authenticated: true, user: action.user, isFetching: false });
        case USER_AUTH_FAILURE:
            return Object.assign({}, state, { authenticated: false, isFetching: false, error: action.error });

        // User verification (for page reloads)
        case VERIFY_USER_AUTH_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case VERIFY_USER_AUTH_SUCCESS:
            return Object.assign({}, state, { authenticated: true, user: action.user, isFetching: false });
        case VERIFY_USER_AUTH_FAILURE:
            return Object.assign({}, state, { authenticated: false, isFetching: false });

        // User registration
        case REGISTER_USER_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case REGISTER_USER_SUCCESS:
            return Object.assign({}, state, { user: action.user, isFetching: false });
        case REGISTER_USER_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.error });

        // Refreshing user information
        case USER_INFO_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case USER_INFO_SUCCESS:
            return Object.assign({}, state, { isFetching: false, user: action.user });
        case USER_INFO_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.error });

        // Creating a new goal
        case CREATE_GOAL_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case CREATE_GOAL_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                user: {
                    ...state.user,
                    goals: [].concat(state.user.goals, [action.goal])
                }
            });
        case CREATE_GOAL_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.error });

        // Logout the user
        case LOGOUT_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, { authenticated: false, isFetching: false });
        case LOGOUT_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.error });

        // Catch all so we don't lose state
        default:
            return state;
    }
}
