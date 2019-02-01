import React from 'react';
import ExploreView from './explore-view';

export default class ExploreControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            goals: [
                {
                    id: 'id1',
                    title: 'Test Goal',
                    description: 'A great description about the goal',
                    creator: 'Braden Hitchcock'
                },
                {
                    id: 'id2',
                    title: 'Test Goal',
                    description: 'A great description about the goal',
                    creator: 'Braden Hitchcock'
                },
                {
                    id: 'id3',
                    title: 'Test Goal',
                    description: 'A great description about the goal',
                    creator: 'Braden Hitchcock'
                },
                {
                    id: 'id4',
                    title: 'Test Goal',
                    description: 'A great description about the goal',
                    creator: 'Braden Hitchcock'
                }
            ]
        }

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(query) {
        console.log(query);
    }

    render() {
        return <ExploreView onSearchSubmit={this.onSearchSubmit} goals={this.state.goals} />;
    }
}
