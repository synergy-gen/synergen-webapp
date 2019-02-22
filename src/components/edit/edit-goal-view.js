import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './edit-goal-styles';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Grid,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Button,
    Chip
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import Dialog from '../dialog-box/dialog-view';

const TaskInput = ({ classes, index, value, onChange, onKeyPress, onDelete, autoFocus, numTasks }) => (
    <TextField
        required={numTasks <= 1}
        className={classes.taskTextField}
        value={value}
        variant="outlined"
        placeholder="Task Details"
        onChange={e => onChange(index, e.target.value)}
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
            {tags.map((tag, index) => (
                <Chip
                    className={classes.tagChip}
                    key={index}
                    variant="outlined"
                    label={tag}
                    onDelete={() => onDelete(index)}
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

class EditGoalView extends Component {
    constructor(props) {
        super(props);

        const { goal } = this.props;

        this.state = {
            changed: false,
            dialogOpen: false,
            title: goal.title,
            description: goal.description,
            tasks: goal.tasks,
            tags: goal.tags,
            currentTag: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onAddTask = this.onAddTask.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
        this.handleTaskDetailsChange = this.handleTaskDetailsChange.bind(this);
        this.handleTaskDetailsKeyPress = this.handleTaskDetailsKeyPress.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.handleTagKeyPress = this.handleTagKeyPress.bind(this);
        this.onDeleteTag = this.onDeleteTag.bind(this);
        this.onDeleteGoal = this.onDeleteGoal.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleOpenDialog() {
        this.setState({ dialogOpen: true });
    }

    handleCloseDialog() {
        this.setState({ dialogOpen: false });
    }

    handleTaskDetailsChange(index, value) {
        let tasks = [...this.state.tasks];
        tasks[index].details = value;
        this.setState({ tasks });
    }

    handleTaskDetailsKeyPress(e) {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
        }
    }

    onAddTask() {
        let tasks = [...this.state.tasks];
        tasks.push({ details: '' });
        this.setState({ tasks });
    }

    onDeleteTask(key) {
        if (this.state.tasks.length === 1) return;
        let tasks = [...this.state.tasks];
        tasks.splice(key, 1);
        this.setState({ tasks });
    }

    handleTagKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            let tags = [...this.state.tags];
            if (!this.state.tags.includes(this.state.currentTag)) {
                tags.push(this.state.currentTag);
            }
            this.setState({ tags, currentTag: '' });
        }
    }

    onDeleteTag(key) {
        let tags = [...this.state.tags];
        tags.splice(key, 1);
        this.setState({ tags });
    }

    onEditSubmit(e) {
        e.preventDefault();
        let goal = {
            _links: this.props.goal._links,
            title: this.state.title,
            description: this.state.description,
            tasks: this.state.tasks.filter(t => t.details !== '').map(t => {
                let task = {};
                if (t.id) {
                    task.id = t.id;
                }
                task.details = t.details;
                return task;
            }),
            tags: this.state.tags
        };
        this.props.onSaveGoalEdits(this.props.goal.id, goal);
        return false;
    }

    onDeleteGoal() {
        this.props.onDeleteGoal(this.props.goal);
    }

    render() {
        const { classes, match } = this.props;
        return (
            <form onSubmit={this.onEditSubmit} className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.appToolbar}>
                        <Link to={`/app/view/${match.params.entityId}`} className={classes.link}>
                            <IconButton className={classes.buttonCancel}>
                                <BackArrowIcon />
                            </IconButton>
                        </Link>
                        <Typography variant="h6" color="inherit">
                            Edit {match.params.entity === 'goal' ? 'Goal' : 'Objective'}
                        </Typography>
                        <Button className={classes.buttonSave} variant="contained" color="secondary" type="submit">
                            Save
                        </Button>
                        <IconButton className={classes.buttonDelete} onClick={this.handleOpenDialog}>
                            <DeleteIcon />
                        </IconButton>
                        <Dialog
                            open={this.state.dialogOpen}
                            title="Delete Goal?"
                            message="Are you sure you want to delete this goal?"
                            onConfirm={this.onDeleteGoal}
                            onClose={this.handleCloseDialog}
                        />
                    </Toolbar>
                </AppBar>
                <Grid container spacing={8} direction="column" className={classes.gridRoot}>
                    <Grid className={classes.gridItem} item xs={12}>
                        <TextField
                            required
                            className={classes.goalTitle}
                            variant="outlined"
                            label="Title"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
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
                        {this.state.tasks.map((task, index, arr) => (
                            <TaskInput
                                classes={classes}
                                key={index}
                                index={index}
                                value={task.details}
                                numTasks={arr.length}
                                autoFocus={this.state.title !== '' && index + 1 === arr.length && task.details === ''}
                                onChange={this.handleTaskDetailsChange}
                                onKeyPress={this.handleTaskDetailsKeyPress}
                                onDelete={() => this.onDeleteTask(index)}
                            />
                        ))}
                        <IconButton className={classes.buttonAddTask} onClick={this.onAddTask}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </form>
        );
    }
}

EditGoalView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditGoalView);
