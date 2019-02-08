import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './view-styles';
import { Typography, Table, TableBody, TableRow, TableCell } from '@material-ui/core';

class ViewView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, goals, match } = this.props;
        const goal = goals[match.params.goalId];
        return (
            <div className={classes.root}>
                <Typography variant="h4">{goal.title}</Typography>
                <Typography variant="h5">{goal.description}</Typography>
                <Typography>Created by: {goal.creator}</Typography>
                <Typography variant="title">Tasks</Typography>
                <Table>
                    <TableBody>
                        {goal.tasks.map(t => (
                            <TableRow>
                                <TableCell>{t.details}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

ViewView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewView);
