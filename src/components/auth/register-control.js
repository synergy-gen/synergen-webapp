import { connect } from 'react-redux';
import { verifyUserIsAuthenticated } from '../../actions/auth';
import { fetchUserInfo, registerUser } from '../../actions/profile';
import RegisterView from './register-view';

const mapStateToProps = state => ({
    error: state.auth.error,
    loggedIn: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
    verifyUserIsAuthenticated: () =>
        dispatch(verifyUserIsAuthenticated()).then(
            res => {
                dispatch(fetchUserInfo(res.content.uid));
            },
            err => {
                console.log(err);
            }
        ),
    registerUser: (name, email, username, password) =>
        dispatch(registerUser(name, email, username, password)).then(
            res => {
                dispatch(fetchUserInfo(res.content.uid));
            },
            err => {
                console.log(err);
            }
        )
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterView);
