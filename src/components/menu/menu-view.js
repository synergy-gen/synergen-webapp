import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './menu-styles';
import { Link } from 'react-router-dom';
import { Divider, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
//import ExitIcon from '@material-ui/icons/ExitToApp';

class MenuView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuItems: [
                { title: 'Profile', link: this.props.rootPath + '/profile', icon: <PersonIcon /> },
                { title: 'Explore', link: this.props.rootPath + '/explore', icon: <SearchIcon /> }
                //{ title: 'Supporting', link: '' },
                //{ title: 'Groups', link: '' }
            ]
        };
    }

    render() {
        const { classes, onLinkSelect } = this.props;

        const ExploreLink = ({ item }) => (
            <Link className={classes.link} to={item.link}>
                <ListItem button key={item.title} onClick={onLinkSelect}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText key={item.title} primary={item.title} />
                </ListItem>
            </Link>
        );

        return (
            <React.Fragment>
                <div />
                <Divider />
                <List>
                    {this.state.menuItems.map(item => (
                        <ExploreLink key={item.title} item={item} />
                    ))}
                </List>
            </React.Fragment>
        );
    }
}

MenuView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuView);
