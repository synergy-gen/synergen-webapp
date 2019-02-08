import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Root from './root/root-view';
import Login from './auth/login-control';
import Register from './auth/register-control';
import ProtectedRoute from './auth/protected-route';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {  
            main: '#fbc02d',
        },
        secondary: {
            main: '#007bff'
        }
    }
});

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Router basename="/client">
                    <div>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <ProtectedRoute path="/app" component={Root} />
                            <Redirect to="/login" />
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;
