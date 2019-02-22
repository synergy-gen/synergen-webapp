import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './create-goal-styles';
import { Grid, TextField, Typography, IconButton, InputAdornment, Button, Chip } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const TaskInput = ({ classes, name, value, onChange, onKeyPress, onDelete, autoFocus, numTasks }) => (
    <TextField
        required={numTasks <= 1}
        className={classes.taskTextField}
        name={name}
        value={value}
        variant="outlined"
        placeholder="Task Details"
        onChange={onChange}
        onKeyPress={onKeyPress}
        autoFocus={autoFocus}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton aria-label="Toggle password visibility" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </InputAdornment>
            )
        }}
    />
);

const TagInput = ({ classes, value, tags, onDelete, onChange, onKeyPress }) => (
    <div className={classes.tagInput}>
        <Typography className={classes.pushDown} variant="h6">
            Tags
        </Typography>
        <div className={classes.tagsChipContainer}>
            {Object.entries(tags).map(pair => (
                <Chip
                    className={classes.tagChip}
                    key={pair[0]}
                    variant="outlined"
                    label={pair[1]}
                    onDelete={() => onDelete(pair[0])}
                />
            ))}
        </div>

        <TextField
            className={classes.tagsTextField}
            name="currentTag"
            placeholder="Enter tag name"
            value={value}
            variant="outlined"
            onChange={onChange}
            onKeyPress={onKeyPress}
        />
    </div>
);

class CreateGoalView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            tasks: {
                0: ''
            },
            tags: {},
            currentTag: '',
            nextTask: 1,
            nextTag: 1,
            numTasks: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.onAddTask = this.onAddTask.bind(this);
        this.onCreateGoalSubmit = this.onCreateGoalSubmit.bind(this);
        this.handleTaskDetailsChange = this.handleTaskDetailsChange.bind(this);
        this.handleTaskDetailsKeyPress = this.handleTaskDetailsKeyPress.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.handleTagKeyPress = this.handleTagKeyPress.bind(this);
        this.onDeleteTag = this.onDeleteTag.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleTaskDetailsChange(e) {
        this.setState({
            tasks: {
                ...this.state.tasks,
                [e.target.name]: e.target.value
            }
        });
    }

    handleTaskDetailsKeyPress(e) {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            this.onAddTask();
        }
    }

    onAddTask() {
        this.setState({ tasks: { ...this.state.tasks, [this.state.nextTask++]: '' }, numTasks: ++this.state.numTasks });
    }

    onDeleteTask(key) {
        if (this.state.numTasks === 1) return;
        let tasks = { ...this.state.tasks };
        delete tasks[key];
        this.setState({ tasks, numTasks: --this.state.numTasks });
    }

    handleTagKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            if (!Array.from(Object.values(this.state.tags)).includes(this.state.currentTag)) {
                this.setState({
                    tags: {
                        ...this.state.tags,
                        [this.state.nextTag]: this.state.currentTag
                    },
                    currentTag: '',
                    nextTag: ++this.state.nextTag
                });
            } else {
                this.setState({ currentTag: '' });
            }
        }
    }

    onDeleteTag(key) {
        let tags = { ...this.state.tags };
        delete tags[key];
        this.setState({ tags });
    }

    onCreateGoalSubmit(e) {
        e.preventDefault();
        let goal = {
            title: this.state.title,
            description: this.state.description,
            tasks: Array.from(Object.values(this.state.tasks)).filter(t => t !== ''),
            tags: Array.from(Object.values(this.state.tags))
        };
        this.props.onCreateGoal(goal);
        return false;
    }

    render() {
        const { classes } = this.props;

        return (
            <form onSubmit={this.onCreateGoalSubmit}>
                <Grid container spacing={8} direction="column" className={classes.root}>
                    <Grid className={classes.gridItem} item xs={12}>
                        <TextField
                            required
                            className={classes.goalTitle}
                            variant="outlined"
                            label="Title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            autoFocus={this.state.title === ''}
                        />
                    </Grid>
                    <Grid className={classes.gridItem} item xs={12}>
                        <TextField
                            required
                            className={classes.goalDescription}
                            variant="outlined"
                            label="Description"
                            name="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            multiline={true}
                            rows={5}
                        />
                    </Grid>
                    <Grid className={classes.gridItem} item xs={12}>
                        <TagInput
                            classes={classes}
                            value={this.state.currentTag}
                            tags={this.state.tags}
                            onChange={this.handleChange}
                            onDelete={this.onDeleteTag}
                            onKeyPress={this.handleTagKeyPress}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.taskSectionLabel} variant="h6">
                            Tasks
                        </Typography>
                    </Grid>
                    <Grid className={classes.gridItem} item className={classes.tasks} xs={12}>
                        {Object.entries(this.state.tasks).map((pair, index, arr) => (
                            <TaskInput
                                classes={classes}
                                key={pair[0]}
                                name={pair[0]}
                                value={pair[1]}
                                numTasks={this.state.numTasks}
                                autoFocus={arr.length > 1 && index + 1 === arr.length && pair[1] == ''}
                                onChange={this.handleTaskDetailsChange}
                                onKeyPress={this.handleTaskDetailsKeyPress}
                                onDelete={() => this.onDeleteTask(pair[0])}
                            />
                        ))}
                        <IconButton className={classes.buttonAddTask} onClick={this.onAddTask}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

CreateGoalView.propTypes = {
    classes: PropTypes.object.isRequired,
    onCreateGoal: PropTypes.func.isRequired
};

export default withStyles(styles)(CreateGoalView);
