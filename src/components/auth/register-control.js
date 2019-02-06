import { connect } from 'react-redux';
import { verifyUserIsAuthenticated, registerUser } from '../../actions';
import RegisterView from './register-view';

const mapStateToProps = state => ({
    error: state.error,
    loggedIn: state.authenticated
});

const mapDispatchToProps = dispatch => ({
    verifyUserIsAuthenticated: () => dispatch(verifyUserIsAuthenticated()),
    registerUser: (name, email, username, password) => dispatch(registerUser(name, email, username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
