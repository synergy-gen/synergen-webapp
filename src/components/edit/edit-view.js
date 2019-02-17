import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './edit-styles';
import EditGoal from './edit-goal-control';

class EditView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, match } = this.props;
        return match.params.entity === 'goal' ? <EditGoal match={match} /> : '';
    }
}

EditView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditView);
