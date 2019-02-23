import initialState from './initial-state';
import auth from './auth';
import profile from './profile';
import explore from './explore';

export default function synergen(state = initialState, action) {
    return {
        auth: auth(state.auth, action),
        profile: profile(state.profile, action),
        explore: explore(state.explore, action)
    }
}
