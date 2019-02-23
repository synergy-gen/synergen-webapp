import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './create-goal-styles';
import {
    Grid,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Button,
    Chip,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

const TaskInput = ({ classes, index, value, onChange, onKeyPress, onDelete, autoFocus }) => (
    <TextField
        required={index === 0}
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
                    <IconButton aria-label="Delete Task" onClick={() => onDelete(index)}>
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

const PublishCheckbox = ({ classes, shouldPublish, onChange }) => (
    <div className={classes.checkboxPublish}>
        <FormControlLabel
            label="Publish Goal"
            labelPlacement="end"
            control={<Checkbox checked={shouldPublish} onChange={onChange} />}
        />
        {shouldPublish ? <Typography>Publishing your goal will make it available for others to adopt</Typography> : ''}
    </div>
);

class CreateGoalView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            tasks: [''],
            tags: [],
            currentTag: '',
            shouldPublish: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.onAddTask = this.onAddTask.bind(this);
        this.onCreateGoalSubmit = this.onCreateGoalSubmit.bind(this);
        this.handleTaskDetailsChange = this.handleTaskDetailsChange.bind(this);
        this.handleTaskDetailsKeyPress = this.handleTaskDetailsKeyPress.bind(this);
        this.onDeleteTask = this.onDeleteTask.bind(this);
        this.handleTagKeyPress = this.handleTagKeyPress.bind(this);
        this.onDeleteTag = this.onDeleteTag.bind(this);
        this.handlePublishCheckboxChange = this.handlePublishCheckboxChange.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleTaskDetailsChange(index, value) {
        let tasks = [...this.state.tasks];
        tasks[index] = value;
        this.setState({ tasks });
    }

    handleTaskDetailsKeyPress(e) {
        if (e.key === 'Enter') {
            e.stopPropagation();
            e.preventDefault();
            this.onAddTask();
        }
    }

    onAddTask() {
        let tasks = [...this.state.tasks, ''];
        this.setState({ tasks });
    }

    onDeleteTask(index) {
        let tasks = [this.state.tasks];
        tasks.splice(index, 1);
        this.setState({ tasks });
    }

    handleTagKeyPress(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            if (!this.state.tags.includes(this.state.currentTag)) {
                let tags = [...this.state.tags];
                tags.push(this.state.currentTag);
                this.setState({ tags, currentTag: '' });
            } else {
                this.setState({ currentTag: '' });
            }
        }
    }

    onDeleteTag(index) {
        let tags = [...this.state.tags];
        tags.splice(index, 1);
        this.setState({ tags });
    }

    handlePublishCheckboxChange() {
        this.setState({ shouldPublish: !this.state.shouldPublish });
    }

    onCreateGoalSubmit(e) {
        e.preventDefault();
        let goal = {
            title: this.state.title,
            description: this.state.description,
            tasks: this.state.tasks.filter(t => t !== ''),
            tags: this.state.tags
        };
        this.props.onCreateGoal(goal, this.state.shouldPublish);
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
                        {this.state.tasks.map((task, index, arr) => (
                            <TaskInput
                                classes={classes}
                                key={index}
                                index={index}
                                value={task}
                                autoFocus={arr.length > 1 && index + 1 === arr.length && task == ''}
                                onChange={this.handleTaskDetailsChange}
                                onKeyPress={this.handleTaskDetailsKeyPress}
                                onDelete={this.onDeleteTask}
                            />
                        ))}
                        <IconButton className={classes.buttonAddTask} onClick={this.onAddTask}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                    <Grid className={classes.gridItem} item xs={12}>
                        <PublishCheckbox
                            classes={classes}
                            shouldPublish={this.state.shouldPublish}
                            onChange={this.handlePublishCheckboxChange}
                        />
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
