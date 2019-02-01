import React from 'react';
import AuthView from './auth-view';
import AuthControl from './auth-control';
import { withRouter, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

class Login extends React.Component {
    constructor(properties) {
        super(properties);

        this.state = {
            username: '',
            password: '',
            error: null,
            loggedIn: AuthControl.isAuthenticated
        };

        this.onLoginFormSubmit = this.onLoginFormSubmit.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    componentDidMount() {
        if (AuthControl.isAuthenticated == null) {
            AuthControl.verify((err, user) => {
                if (err) {
                    this.setState({ loggedIn: false });
                } else {
                    this.setState({ loggedIn: true });
                }
            });
        }
    }

    onUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    onLoginFormSubmit(event) {
        event.stopPropagation();
        event.preventDefault();
        AuthControl.authenticate(this.state.username, this.state.password, (err, res) => {
            if (err) {
                return this.setState({ error: err.message });
            }
            this.setState({ error: null });
            this.props.history.push('/app/profile');
        });
    }

    render() {
        if (this.state.loggedIn == null) {
            return (
                <div
                    style={{
                        height: '100vh',
                        width: '100vw',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CircularProgress style={{ width: 200, height: 200 }} color="primary" />
                </div>
            );
        }
        if (this.state.loggedIn) {
            return <Redirect to="/app/profile" />;
        }

        return (
            <AuthView
                action={'login'}
                error={this.state.error}
                onLoginFormSubmit={this.onLoginFormSubmit}
                onUsernameChange={this.onUsernameChange}
                onPasswordChange={this.onPasswordChange}
            />
        );
    }
}

export default withRouter(Login);
