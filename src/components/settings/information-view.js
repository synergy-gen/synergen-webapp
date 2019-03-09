import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Typography, Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        margin: 5,
        padding: 5,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400
    },
    input: {
        margin: '5px 15px'
    },
    button: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 20
    }
});

class InformationSettingsView extends Component {
    constructor(props) {
        super(props);

        const { profile } = this.props;

        this.state = {
            name: profile.name,
            email: profile.email,
            slogan: profile.slogan,
            changed: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value, changed: true });
    }

    onSave() {
        this.props
            .onSave({
                name: this.state.name,
                email: this.state.email,
                slogan: this.state.slogan
            })
            .then(() => {
                this.setState({ changed: false });
            });
    }

    render() {
        const { classes } = this.props;
        const { name, email, slogan, changed } = this.state;

        return (
            <div className={classes.root}>
                <Typography variant="subtitle1">Profile Information</Typography>
                <TextField
                    className={classes.input}
                    variant="outlined"
                    name="name"
                    value={name}
                    autoComplete="false"
                    label="Profile User Name"
                    onChange={this.handleChange}
                />
                <TextField
                    className={classes.input}
                    variant="outlined"
                    name="email"
                    value={email}
                    autoComplete="false"
                    label="Profile Email"
                    onChange={this.handleChange}
                />
                <TextField
                    className={classes.input}
                    variant="outlined"
                    name="slogan"
                    value={slogan}
                    autoComplete="false"
                    label="User Slogan"
                    onChange={this.handleChange}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    disabled={!changed}
                    onClick={this.onSave}
                >
                    Save
                </Button>
            </div>
        );
    }
}

InformationSettingsView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(InformationSettingsView);
