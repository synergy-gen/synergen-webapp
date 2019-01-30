import React from 'react';
import MenuView from './menu-view';
import { withRouter } from 'react-router-dom';

class Menu extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <MenuView />;
    }
}

export default withRouter(Menu);