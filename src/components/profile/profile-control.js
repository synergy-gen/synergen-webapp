import React from 'react';
import ProfileView from './profile-view';
import { withRouter } from 'react-router-dom';
import AuthControl from '../auth/auth-control';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <ProfileView user={AuthControl.user} />;
    }
}

export default withRouter(Profile);
