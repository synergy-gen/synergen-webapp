import React from 'react';
import HomeView from './home-view';
import { withRouter } from 'react-router-dom';

class HomeController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        };
    }

    componentDidMount() {
        
    }

    render() {
        return <HomeView />;
    }
}

export default withRouter(HomeController);
