import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from './auth/login-control';
import Register from './auth/register-control';
import Profile from './home/profile';
import Home from './home/home-control';
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
                        <Route path="/profile" component={Profile} />
                        <Route path="" component={Create} />
                        {
                            //<ProtectedRoute path="/home" component={Home} />
                            //<Redirect to="/home" />
                        }
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
