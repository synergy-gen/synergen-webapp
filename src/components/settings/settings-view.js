import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import AvatarSetting from './avatar-control';
import InformationSettings from './information-control';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: 15
    },
    title: {
        marginBottom: 10
    }
});

class SettingsView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, profile } = this.props;

        return (
            <div className={classes.root}>
                <Typography className={classes.title} variant="h4">
                    Settings for {profile.name}
                </Typography>
                <AvatarSetting />
                <InformationSettings />
            </div>
        );
    }
}

SettingsView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingsView);
