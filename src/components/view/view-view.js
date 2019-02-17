import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './view-styles';
import { Link } from 'react-router-dom';
import { Typography, Table, TableBody, TableRow, TableCell, Paper, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
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
                <div className={classes.header}>
                    <div className={classes.headerContent}>
                        <Typography variant="h4">{goal.title}</Typography>
                        <Typography variant="body2">By: @{goal.creator}</Typography>
                    </div>
                    <div className={classes.headerActions}>
                        <Link to={`/app/edit/goal/${goal.id}`}>
                            <IconButton className={classes.buttonEdit}>
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </div>
                </div>
                <Typography>{goal.description}</Typography>
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
