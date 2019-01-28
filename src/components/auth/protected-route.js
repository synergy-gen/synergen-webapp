import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthControl from './auth-control';

export default function ProtectedRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                AuthControl.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
}
