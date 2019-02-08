import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Switch } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Drawer, CssBaseline, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import styles from './root-styles';
import Menu from '../menu/menu-control';
import Tasklist from '../tasklist/tasklist-control';
import Profile from '../profile/profile-control';
import Explore from '../explore/explore-control';
import Create from '../create/create-control';
import View from '../view/view-control';
import ProtectedRoute from '../auth/protected-route';

class RootView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            tasklistOpen: false
        };
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
        this.handleTasklistToggle = this.handleTasklistToggle.bind(this);
    }

    handleMenuToggle() {
        this.setState({ menuOpen: !this.state.menuOpen });
    }

    handleTasklistToggle() {
        this.setState({ tasklistOpen: !this.state.tasklistOpen });
    }

    render() {
        const { classes, match } = this.props;
        return (
            <main className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            onClick={this.handleMenuToggle}
                            className={classes.drawerButton}
                            color="inherit"
                            aria-label="Main Menu"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.logo} align="center">
                            S Y N E R G E N
                        </Typography>
                        <IconButton
                            onClick={this.handleTasklistToggle}
                            className={classes.drawerButton}
                            color="inherit"
                            aria-label="Tasks Menu"
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    <Hidden lgUp implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="temporary"
                            anchor="left"
                            open={this.state.menuOpen}
                            onClose={this.handleMenuToggle}
                        >
                            <Menu onLinkSelect={this.handleMenuToggle} />
                        </Drawer>
                    </Hidden>
                    <Hidden mdDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="permanent"
                            anchor="left"
                            open
                        >
                            <Menu />
                        </Drawer>
                    </Hidden>
                </nav>
                <div className={classes.mainContent}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <ProtectedRoute path={`${match.path}/profile`} component={Profile} />
                        <ProtectedRoute path={`${match.path}/explore`} component={Explore} />
                        <ProtectedRoute path={`${match.path}/create`} component={Create} />
                        <ProtectedRoute path={`${match.path}/view/:goalId`} component={View} />
                    </Switch>
                </div>
                <div className={classes.drawer}>
                    <Hidden lgUp implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="temporary"
                            anchor="right"
                            open={this.state.tasklistOpen}
                            onClose={this.handleTasklistToggle}
                        >
                            <Tasklist />
                        </Drawer>
                    </Hidden>
                    <Hidden mdDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="permanent"
                            anchor="right"
                            open
                        >
                            <Tasklist />
                        </Drawer>
                    </Hidden>
                </div>
            </main>
        );
    }
}

RootView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RootView);
