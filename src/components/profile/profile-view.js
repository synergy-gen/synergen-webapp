import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Avatar,
    Grid,
    Button,
    FormControl,
    Select,
    MenuItem,
    OutlinedInput,
    Drawer,
    CssBaseline,
    Hidden
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import styles from './profile-styles';
import ProfileSummary from './summary/summary-control';
import Menu from './menu/menu-control';
import Tasklist from './tasklist/tasklist-control';

class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            tasklistOpen: false,
            view: 'overview'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleMenuToggle = this.handleMenuToggle.bind(this);
        this.handleTasklistToggle = this.handleTasklistToggle.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleMenuToggle(event) {
        this.setState({ menuOpen: !this.state.menuOpen });
    }

    handleTasklistToggle() {
        this.setState({ tasklistOpen: !this.state.tasklistOpen });
    }

    render() {
        const { classes, theme } = this.props;
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
                        <Typography variant="h6" color="inherit" className={classes.logo}>
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
                    <Hidden smUp implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper
                            }}
                            variant="temporary"
                            anchor="left"
                            open={this.state.menuOpen}
                            onClose={this.handleMenuToggle}
                        >
                            <Menu />
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
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
                    <Grid container justify="center" alignItems="center" spacing={8}>
                        <Grid item container justify="center" alignItems="center" xs={12}>
                            <Avatar className={classes.avatar} alt="User Name">
                                UN
                            </Avatar>
                        </Grid>
                        <Grid item container direction="column" justify="center" alignItems="center" xs={12}>
                            <Typography variant="h3">User Name</Typography>
                            <Typography variant="subheading">Slogan or really cool quote</Typography>
                        </Grid>
                        <Grid item container justify="center" alignItems="center" xs={12}>
                            <Button variant="contained" color="primary">
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid className={classes.viewSelectContainer} container justify="center" alignItems="center">
                        <FormControl variant="outlined">
                            <Select
                                value={this.state.view}
                                onChange={this.handleChange}
                                className={classes.viewSelect}
                                input={<OutlinedInput name="view" labelWidth={0} />}
                            >
                                <MenuItem value="overview">Overview</MenuItem>
                                <MenuItem value="goals">Goals</MenuItem>
                                <MenuItem value="objectives">Objectives</MenuItem>
                                <MenuItem value="groups">Groups</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <ProfileSummary />
                </div>
                <div className={classes.drawer}>
                    <Hidden smUp implementation="css">
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
                    <Hidden xsDown implementation="css">
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

ProfileView.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ProfileView);
