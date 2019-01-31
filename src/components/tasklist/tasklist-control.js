import React from 'react';
import TasklistView from './tasklist-view';
import { withRouter } from 'react-router-dom';

class Tasklist extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <TasklistView />;
    }
}

export default withRouter(Tasklist);