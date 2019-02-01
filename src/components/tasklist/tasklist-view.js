import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './tasklist-styles';
import { AppBar, Toolbar, Divider, Paper, Typography, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const TaskTile = ({ classes, task }) => (
    <Paper className={classes.taskTile}>
        <div className={classes.taskTileText}>
            <Typography variant="title">{task.title}</Typography>
            <Typography>{task.description}</Typography>
        </div>
        <IconButton className={classes.taskTileClose}>
            <CloseIcon />
        </IconButton>
    </Paper>
);

class TasklistView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, tasks } = this.props;

        return (
            <React.Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.darkText}>
                            Tasklist
                        </Typography>
                    </Toolbar>
                </AppBar>
                {tasks.map(task => (
                    <TaskTile key={task.id} classes={classes} task={task} />
                ))}
            </React.Fragment>
        );
    }
}

TasklistView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TasklistView);
