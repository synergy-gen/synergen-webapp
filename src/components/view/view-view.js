import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './view-styles';
import { Link } from 'react-router-dom';
import {
    Typography,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    IconButton,
    AppBar,
    Toolbar
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
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
        const { classes, goal, userIsOwner, match } = this.props;
        return (
            <React.Fragment>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <Link to={`/app/profile`} className={classes.link}>
                            <IconButton className={classes.toolbarButton}>
                                <BackArrowIcon />
                            </IconButton>
                        </Link>
                        <Typography variant="h6" color="inherit">
                            View Details
                        </Typography>
                        <div className={classes.headerActions}>
                            {userIsOwner ? (
                                <Link to={`/app/edit/goal/${goal.id}`}>
                                    <IconButton className={classes.toolbarButton}>
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                            ) : (
                                ''
                            )}
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.root}>
                    <div className={classes.header}>
                        <div className={classes.headerContent}>
                            <Typography variant="h4">{goal.title}</Typography>
                            <Typography>By: @{goal.creator}</Typography>
                        </div>
                    </div>
                    <Typography>{goal.description}</Typography>
                    {goal.targetDate ? (
                        <Typography>Target Date: {moment(goal.targetDate, 'MMMM Do YYYY')}</Typography>
                    ) : (
                        ''
                    )}
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
            </React.Fragment>
        );
    }
}

ViewView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ViewView);
