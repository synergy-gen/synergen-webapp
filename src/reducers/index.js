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
            return Object.assign({}, state, {
                authenticated: true,
                user: Object.assign({}, state.user, {
                    ...action.user,
                    goals: action.user.goals.map( g => g.id)
                }),
                goals: goals(state.goals, action.user),
                isFetching: false,
                error: null
            });
        case USER_AUTH_FAILURE:
            return Object.assign({}, state, { authenticated: false, isFetching: false, error: action.error });

        // User verification (for page reloads)
        case VERIFY_USER_AUTH_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case VERIFY_USER_AUTH_SUCCESS:
            return Object.assign({}, state, {
                authenticated: true,
                user: Object.assign({}, state.user, {
                    ...action.user,
                    goals: userGoals(state.user.goals, action.user)
                }),
                goals: goals(state.goals, action.user),
                isFetching: false,
                error: null
            });
        case VERIFY_USER_AUTH_FAILURE:
            return Object.assign({}, state, { authenticated: false, isFetching: false });

        // User registration
        case REGISTER_USER_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case REGISTER_USER_SUCCESS:
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, {
                    ...action.user,
                    goals: userGoals(state.user.goals, action.user)
                }),
                goals: goals(state.goals, action.user),
                isFetching: false,
                error: null
            });
        case REGISTER_USER_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.error });

        // Refreshing user information
        case USER_INFO_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                user: Object.assign({}, state.user, {
                    ...action.user,
                    goals: userGoals(state.goals.goals, action.user)
                }),
                goals: goals(state.goals, action.user),
                error: null
            });
        case USER_INFO_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.error });

        // Creating a new goal
        case CREATE_GOAL_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case CREATE_GOAL_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                // TODO: right now the API is returning the entire user when we post to the user's goals resource.
                // Once we update it to only return the created goal, we will need to change this reducer and the action
                // associated with it
                user: Object.assign({}, state.user, {
                    goals: [...state.user.goals, action.goal.id]
                }),
                goals: {
                    ...state.goals,
                    [goal.id]: goal
                },
                error: null
            });
        case CREATE_GOAL_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.error });

        // Logout the user
        case LOGOUT_REQUEST:
            return Object.assign({}, state, { isFetching: true });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, { authenticated: false, isFetching: false, error: null, user: null });
        case LOGOUT_FAILURE:
            return Object.assign({}, state, { isFetching: false, error: action.error });

        // Catch all so we don't lose state
        default:
            return state;
    }
}

function userGoals(state = [], action) {
    return action.goals.map(g => g.id);
}

function goals(state = {}, action) {
    let goals = {};
    action.goals.forEach(g => {
        goals[g.id] = g;
    });
    return Object.assign({}, state, goals);
}
