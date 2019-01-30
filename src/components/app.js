import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Root from './root/root-view';
import Login from './auth/login-control';
import Register from './auth/register-control';
import ProtectedRoute from './auth/protected-route';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <ProtectedRoute path="/app" component={Root} />
                        <Redirect to="/app/profile" />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
