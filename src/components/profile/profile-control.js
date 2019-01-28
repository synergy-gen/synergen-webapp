import React from 'react';
import ProfileView from './profile-view';
import { withRouter } from 'react-router-dom';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <ProfileView />;
    }
}

export default withRouter(Profile);