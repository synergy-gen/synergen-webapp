import React from 'react';
import ExploreView from './explore-view';

export default class ExploreControl extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            goals: [
                {
                    id: 'id1',
                    title: 'Unplug',
                    description:
                        'Take time to unplug from the rest of the world and spend more quality, quiet time with yourself and others',
                    creator: 'Sean Williamson'
                },
                {
                    id: 'id2',
                    title: 'The First Button',
                    description: 'Improve your productivity in the morning with these simple steps',
                    creator: 'John White'
                },
                {
                    id: 'id3',
                    title: 'Nourishment',
                    description: 'Start healthy habbits and watch your attitude about life soar to new heights',
                    creator: 'Elizabeth Stout'
                },
                {
                    id: 'id4',
                    title: 'A Grateful Heart',
                    description: 'Take time every day to increase how much gratitude you feel for what you have',
                    creator: 'Elizabeth Stout'
                }
            ]
        };

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(query) {
        console.log(query);
    }

    render() {
        return <ExploreView onSearchSubmit={this.onSearchSubmit} goals={this.state.goals} />;
    }
}
