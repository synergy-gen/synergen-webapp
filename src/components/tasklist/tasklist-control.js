import React from 'react';
import TasklistView from './tasklist-view';
import { withRouter } from 'react-router-dom';

class Tasklist extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [
                {
                    id: 'id1',
                    title: 'Task Title',
                    description: 'Task Description'
                },
                {
                    id: 'id2',
                    title: 'Task Title',
                    description: 'Task Description'
                },
                {
                    id: 'id3',
                    title: 'Task Title',
                    description: 'Task Description'
                }
            ]
        };
        this.state.tasks = [];

        this.onTaskClear = this.onTaskClear.bind(this);
    }

    onTaskClear(id) {
        console.log(id);
    }

    render() {
        return <TasklistView tasks={this.state.tasks} onTaskClear={this.onTaskClear} />;
    }
}

export default withRouter(Tasklist);
