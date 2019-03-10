import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './tasklist-styles';
import { AppBar, Toolbar, Paper, Typography } from '@material-ui/core';

const Goal = ({ classes, goal }) => (
    <Paper className={classes.goal}>
        <Typography className={classes.goalTitle}>{goal.title}</Typography>
        {goal.tasks.map(t => (
            <Task key={t.id} classes={classes} task={t} />
        ))}
    </Paper>
);

const Task = ({ classes, task }) => (
    <div className={classes.task}>
        <Typography>&middot;&nbsp;{task.details}</Typography>
    </div>
);

class TasklistView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, goals } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.darkText}>
                            Tasklist
                        </Typography>
                    </Toolbar>
                </AppBar>
                {goals.map(goal => (
                    <Goal key={goal.id} classes={classes} goal={goal} />
                ))}
            </div>
        );
    }
}

TasklistView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TasklistView);
