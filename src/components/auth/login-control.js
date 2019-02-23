import { connect } from 'react-redux';
import { verifyUserIsAuthenticated, authenticateUser } from '../../actions/auth';
import { fetchUserInfo } from '../../actions/profile';
import LoginView from './login-view';

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
    authenticateUser: (username, password) =>
        dispatch(authenticateUser(username, password)).then(
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
)(LoginView);
