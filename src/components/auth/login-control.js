import { connect } from 'react-redux';
import { verifyUserIsAuthenticated, authenticateUser } from '../../actions';
import LoginView from './login-view';

const mapStateToProps = state => ({
    error: state.error,
    loggedIn: state.authenticated
});

const mapDispatchToProps = dispatch => ({
    verifyUserIsAuthenticated: () => dispatch(verifyUserIsAuthenticated()),
    authenticateUser: (username, password) => dispatch(authenticateUser(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
