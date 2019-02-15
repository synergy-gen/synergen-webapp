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
                    className={item.active ? classes.active : ''}
                    key={item.title}
                    onClick={() => onLinkSelect(item.title)}
                >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText key={item.title} primary={item.title} />
                </ListItem>
            </Link>
        ) : (
            <ListItem button className={item.active ? classes.active : ''} key={item.title} onClick={item.action}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText key={item.title} primary={item.title} />
            </ListItem>
        )}
    </React.Fragment>
);

class MenuView extends React.Component {
    constructor(props) {
        super(props);

        let startActive = path => window.location.href.indexOf(path) > 0;

        this.state = {
            menuItems: [
                {
                    title: 'Profile',
                    active: startActive('/profile'),
                    link: this.props.match.url + '/profile',
                    icon: <PersonIcon />
                },
                {
                    title: 'Explore',
                    active: startActive('/explore'),
                    link: this.props.match.url + '/explore',
                    icon: <SearchIcon />
                },
                {
                    title: 'Settings',
                    active: startActive('/settings'),
                    link: this.props.match.url + '/settings',
                    icon: <SettingsIcon />
                },
                {
                    title: 'Logout',
                    active: false,
                    action: this.props.onLogout,
                    icon: <ExitIcon style={{ transform: 'rotate(180deg)' }} />
                }
            ]
        };

        this.onLinkSelect = this.onLinkSelect.bind(this);
    }

    onLinkSelect(title) {
        this.setState(previousState => ({
            menuItems: previousState.menuItems.map(i => {
                let item = { ...i };
                if (i.active) item.active = false;
                if (title === i.title) {
                    item.active = true;
                }
                return item;
            })
        }));
        if (this.props.onLinkSelect) {
            this.props.onLinkSelect();
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div />
                <Divider />
                <List>
                    {this.state.menuItems.map(item => (
                        <ExploreLink key={item.title} classes={classes} item={item} onLinkSelect={this.onLinkSelect} />
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
