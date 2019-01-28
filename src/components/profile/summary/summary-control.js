import React from 'react';
import SummaryView from './summary-view';
import { withRouter } from 'react-router-dom';

class ProfileSummary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    id: 'id1',
                    title: 'Goal Title',
                    description: 'A great goal description',
                    creator: 'My Name',
                    completed: 75
                },
                {
                    id: 'id2',
                    title: 'Goal Title',
                    description: 'A great goal description',
                    creator: 'My Name',
                    completed: 75
                },
                {
                    id: 'id3',
                    title: 'Goal Title',
                    description: 'A great goal description',
                    creator: 'My Name',
                    completed: 75
                }
            ]
        };
    }

    componentDidMount() {}

    componentDidUpdate() {}

    render() {
        return <SummaryView data={this.state.data} />;
    }
}

export default withRouter(ProfileSummary);
