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
                    title: 'Get Out More',
                    description: 'Working on being more social and having more fun in the world with my friends',
                    creator: 'John Smith',
                    completed: 75
                },
                {
                    id: 'id2',
                    title: 'Unplug',
                    description: 'Take time to unplug from the rest of the world and spend more quality, quiet time with yourself and others',
                    creator: 'Sean Williamson',
                    completed: 75
                },
                {
                    id: 'id3',
                    title: 'Stay Fit',
                    description: 'Key things to do every day so that I can stay healthier',
                    creator: 'John Smith',
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
