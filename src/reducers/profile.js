import { USER_AUTH_SUCCESS, VERIFY_USER_AUTH_SUCCESS, LOGOUT_SUCCESS } from '../actions/auth';
import {
    FETCH_USER_INFO_REQUEST,
    FETCH_USER_INFO_SUCCESS,
    FETCH_USER_INFO_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE
} from '../actions/profile';
import {
    CREATE_GOAL_REQUEST,
    CREATE_GOAL_SUCCESS,
    CREATE_GOAL_FAILURE,
    EDIT_GOAL_REQUEST,
    EDIT_GOAL_SUCCESS,
    EDIT_GOAL_FAILURE,
    DELETE_GOAL_REQUEST,
    DELETE_GOAL_SUCCESS,
    DELETE_GOAL_FAILURE,
    PUBLISH_GOAL_REQUEST,
    PUBLISH_GOAL_SUCCESS,
    PUBLISH_GOAL_FAILURE
} from '../actions/goals';

export default function profile(state = {}, action) {
    switch (action.type) {
        case USER_AUTH_SUCCESS:
            return Object.assign({}, state, {
                id: action.uid
            });

        case VERIFY_USER_AUTH_SUCCESS:
            return Object.assign({}, state, {
                id: action.uid
            });

        case LOGOUT_SUCCESS:
            return {};

        case FETCH_USER_INFO_REQUEST:
        case REGISTER_USER_REQUEST:
        case CREATE_GOAL_REQUEST:
        case EDIT_GOAL_REQUEST:
        case DELETE_GOAL_REQUEST:
        case PUBLISH_GOAL_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });

        case FETCH_USER_INFO_SUCCESS:
        case REGISTER_USER_SUCCESS:
            var goals = {};
            action.user.goals.forEach(g => {
                goals[g.id] = g;
            });
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                ...action.user,
                goals
            });

        case FETCH_USER_INFO_FAILURE:
        case REGISTER_USER_FAILURE:
        case CREATE_GOAL_FAILURE:
        case EDIT_GOAL_FAILURE:
        case DELETE_GOAL_FAILURE:
        case PUBLISH_GOAL_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });

        case CREATE_GOAL_SUCCESS:
        case EDIT_GOAL_SUCCESS:
            var goals = { ...state.goals };
            goals[action.goal.id] = action.goal;
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                goals
            });

        case DELETE_GOAL_SUCCESS:
            var goals = { ...state.goals };
            delete goals[action.id];
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                goals
            });

        case PUBLISH_GOAL_SUCCESS:
            var published = { ...state.published };
            published[action.goal.id] = action.goal;
            return Object.assign({}, state, {
                isFetching: false,
                error: null,
                published
            });

        default:
            return state;
    }
}
