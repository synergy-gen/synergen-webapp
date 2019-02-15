import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './create-styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import CreateGoal from './create-goal-control';

class CreateView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            entity: 'Goal'
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">Create {this.state.entity}</Typography>
                    </Toolbar>
                </AppBar>
                {this.state.entity === 'Goal' ? <CreateGoal /> : ''}
            </div>
        );
    }
}

CreateView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CreateView);
