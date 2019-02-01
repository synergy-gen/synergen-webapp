import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Avatar, Grid, Button, FormControl, Select, MenuItem, OutlinedInput } from '@material-ui/core';
import styles from './profile-styles';
import ProfileSummary from './summary/summary-control';

class ProfileView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: 'overview'
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { classes, user } = this.props;
        return (
            <React.Fragment>
                <Grid container justify="center" alignItems="center" spacing={8}>
                    <Grid item container justify="center" alignItems="center" xs={12}>
                        <Avatar
                            className={classes.avatar}
                            alt="User Name"
                            src={user.image ? user.image : '/assets/img/no-avatar.png'}
                        />
                    </Grid>
                    <Grid item container direction="column" justify="center" alignItems="center" xs={12}>
                        <Typography variant="h3" align="center">
                            {user.name}
                        </Typography>
                        <Typography variant="subheading" align="center">
                            {user.slogan || 'Welcome to Synergen!'}
                        </Typography>
                    </Grid>
                    <Grid item container justify="center" alignItems="center" xs={12}>
                        <Button variant="contained" color="secondary">
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
                            classes={{
                                select: classes.selectInput
                            }}
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
            </React.Fragment>
        );
    }
}

ProfileView.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ProfileView);
