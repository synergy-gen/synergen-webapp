import React from 'react';
import PropTypes from 'prop-types';
import MenuView from './menu-view';
import { withRouter } from 'react-router-dom';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { match, onLinkSelect } = this.props;
        return <MenuView rootPath={match.url} onLinkSelect={onLinkSelect} />;
    }
}

export default withRouter(Menu);
