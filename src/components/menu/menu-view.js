import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './menu-styles';
import { Link } from 'react-router-dom';
import { Divider, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import SearchIcon from '@material-ui/icons/Search';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitIcon from '@material-ui/icons/ExitToApp';

const ExploreLink = ({ classes, item, onLinkSelect }) => (
    <React.Fragment>
        {item.link ? (
            <Link className={classes.link} to={item.link}>
                <ListItem
                    button
                    className={window.location.href.indexOf(item.link) > 0 ? classes.active : ''}
                    key={item.title}
                    onClick={onLinkSelect}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText key={item.title} primary={item.title} />
                </ListItem>
            </Link>
        ) : (
            <ListItem
                button
                className={window.location.href.indexOf(item.link) > 0 ? classes.active : ''}
                key={item.title}
                onClick={item.action}
            >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText key={item.title} primary={item.title} />
            </ListItem>
        )}
    </React.Fragment>
);

class MenuView extends React.Component {
    constructor(props) {
        super(props);

        this.menuItems = [
            { title: 'Profile', link: this.props.match.url + '/profile', icon: <PersonIcon /> },
            { title: 'Explore', link: this.props.match.url + '/explore', icon: <SearchIcon /> },
            { title: 'Settings', link: this.props.match.url + '/settings', icon: <SettingsIcon /> },
            {
                title: 'Logout',
                action: this.props.onLogout,
                icon: <ExitIcon style={{ transform: 'rotate(180deg)' }} />
            }
            //{ title: 'Supporting', link: '' },
            //{ title: 'Groups', link: '' }
        ];
    }

    render() {
        const { classes, onLinkSelect } = this.props;

        return (
            <React.Fragment>
                <div />
                <Divider />
                <List>
                    {this.menuItems.map(item => (
                        <ExploreLink key={item.title} classes={classes} item={item} onLinkSelect={onLinkSelect} />
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
