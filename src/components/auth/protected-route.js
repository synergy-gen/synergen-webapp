import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect} from 'react-redux';

function ProtectedRoute({ authenticated, component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                authenticated ? (
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

const mapStateToProps = state => ({
    authenticated: state.auth.authenticated
});

export default connect(mapStateToProps, null)(ProtectedRoute);
