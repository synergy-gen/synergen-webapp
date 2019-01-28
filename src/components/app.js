import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './auth/login-control';
import Register from './auth/register-control';
import Profile from './profile/profile-control';
import ProfileSettings from './home/profile';
import ProtectedRoute from './auth/protected-route';
import Create from './create';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/profile/settings" component={ProfileSettings} />
                        <ProtectedRoute path="/profile" component={Profile} />
                        <ProtectedRoute path="/profile/create" component={Create} />
                        <Redirect to="/profile" />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
