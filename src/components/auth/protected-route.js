import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect} from 'react-redux';

function ProtectedRoute({ authenticated, component: Component, props, ...rest }) {
    return (
        <Route
            {...rest}
            render={p =>
                authenticated ? (
                    <Component {...p} {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: p.location }
                        }}
                    />
                )
            }
        />
    );
}

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, null)(ProtectedRoute);
