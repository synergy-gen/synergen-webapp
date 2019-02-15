import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './view-styles';
import { Typography, Table, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import moment from 'moment';

const TaskRow = ({ classes, task }) => (
    <TableRow>
        <TableCell>{task.details}</TableCell>
    </TableRow>
);

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
                <Typography>{goal.description}</Typography>
                <Typography>By: @{goal.creator}</Typography>
                {goal.targetDate ? <Typography>Target Date: {moment(goal.targetDate, 'MMMM Do YYYY')}</Typography> : ''}
                <Paper className={classes.paperTaskSummary}>
                    <Typography variant="h6">Tasks</Typography>
                    <Table>
                        <TableBody>
                            {goal.tasks.map(t => (
                                <TaskRow key={t.id} task={t} />
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}

ViewView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewView);
