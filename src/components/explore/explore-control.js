import React from 'react';
import ExploreView from './explore-view';

export default class ExploreControl extends React.Component {
    constructor(props) {
        super(props);

        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onSearchSubmit(query) {
        console.log(query);
    }

    render() {
        return <ExploreView onSearchSubmit={this.onSearchSubmit} />;
    }
}
