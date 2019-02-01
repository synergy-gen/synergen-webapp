import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styles from './create-styles';
import {
    StyledCreate,
    CreateTarget,
    StyledFormControl,
    TitleField,
    CreateButton,
    AddButton,
    AddTitleField,
    StyledFieldSet,
    StyledLegend,
    HeaderRow,
    Header,
    TableRow,
    TableCell,
    StyledTable
} from './create-styles';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const EntityDetails = ({ state, titleChange, detailsChange }) => {
    return (
        <React.Fragment>
            <TitleField
                id="outlined-name"
                label="Title"
                className={''}
                value={state.title}
                onChange={e => {
                    titleChange(e.target.value);
                }}
                margin="normal"
                variant="outlined"
            />
            <TextField
                id="outlined-multiline-flexible"
                label="Details"
                multiline
                rows="4"
                rowsMax="4"
                value={state.details}
                onChange={e => {
                    detailsChange(e.target.value);
                }}
                className={''}
                margin="normal"
                helperText=""
                variant="outlined"
            />
        </React.Fragment>
    );
};

const TaskTable = ({ tasks, currentTitle, currentDetails, onTitleChange, onDetailsChange, addTask, removeTask }) => {
    return (
        <StyledFieldSet>
            <StyledLegend>Tasks</StyledLegend>
            <StyledTable>
                <HeaderRow>
                    {tasks.length > 0 && (
                        <React.Fragment>
                            <Header>{'Title'}</Header>
                            <Header>{'Description'}</Header>
                        </React.Fragment>
                    )}
                </HeaderRow>
                {tasks.map((element, key) => {
                    return (
                        <TableRow key={key}>
                            <TableCell style={{ flexBasis: '50%', maxWidth: '50%' }}>{element.title}</TableCell>
                            <TableCell style={{ flexBasis: '40%', maxWidth: '40%' }}>{element.details}</TableCell>
                            <TableCell style={{ flexBasis: '10%' }}>
                                <AddButton
                                    onClick={() => removeTask(key)}
                                    variant="contained"
                                    color="primary"
                                    className={''}
                                >
                                    -
                                </AddButton>
                            </TableCell>
                        </TableRow>
                    );
                })}
                <TableRow>
                    <TableCell style={{ flexBasis: '50%' }}>
                        <AddTitleField
                            id="outlined-name"
                            label="Title"
                            className={''}
                            value={currentTitle}
                            onChange={e => {
                                onTitleChange(e.target.value);
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                    </TableCell>
                    <TableCell style={{ flexBasis: '50%' }}>
                        <AddTitleField
                            id="outlined-name"
                            label="Description"
                            className={''}
                            value={currentDetails}
                            onChange={e => {
                                onDetailsChange(e.target.value);
                            }}
                            margin="normal"
                            variant="outlined"
                        />
                    </TableCell>
                </TableRow>
            </StyledTable>
            <AddButton variant="contained" color="primary" onClick={() => addTask()} className={''}>
                +
            </AddButton>
        </StyledFieldSet>
    );
};

class Create extends React.Component {
    constructor() {
        super();
        this.state = {
            entity: 'task',
            task: {
                title: '',
                details: ''
            },
            goal: {
                title: '',
                details: '',
                tasks: [],
                currentTitle: '',
                currentDetails: ''
            }
        };
    }

    handleEntityChange(value) {
        this.setState({ entity: value });
    }

    handleTaskTitleChange(value) {
        this.setState({ task: { ...this.state.task, title: value } });
    }

    handleGoalTitleChange(value) {
        this.setState({ goal: { ...this.state.goal, title: value } });
    }

    handleTaskDetailsChange(value) {
        this.setState({ task: { ...this.state.task, details: value } });
    }

    handleGoalDetailsChange(value) {
        this.setState({ goal: { ...this.state.goal, title: value } });
    }

    onTaskCreate(task) {
        let newState = { ...this.state };
        newState.goal.tasks.push(task);
        newState.task.title = '';
        newState.task.details = '';

        this.setState({ newState });
    }

    onTaskAdd() {
        let newState = this.state;
        newState.goal.tasks.push({
            title: newState.goal.currentTitle,
            details: newState.goal.currentDetails
        });
        newState.goal.currentDetails = '';
        newState.goal.currentTitle = '';
        this.setState({ ...newState });
    }

    removeTask(key) {
        let newState = this.state;
        newState.goal.tasks = newState.goal.tasks.filter((_, index) => {
            return index !== key;
        });
        this.setState({ ...newState });
    }

    goalTaskTitleChange(title) {
        let newState = this.state;
        newState.goal.currentTitle = title;
        this.setState({ ...newState });
    }

    goalTaskDetailsChange(details) {
        let newState = this.state;
        newState.goal.currentDetails = details;
        this.setState({ ...newState });
    }

    render() {
        const { classes } = this.props;
        return (
            <StyledCreate>
                <div className={classes.topBar}>
                    <CreateTarget>
                        <Typography variant="title" style={{ color: 'rgba(0, 0, 0, 0.87)', marginRight: 10 }}>
                            Create
                        </Typography>
                        <StyledFormControl className={''}>
                            <Select
                                value={this.state.entity}
                                onChange={e => {
                                    this.handleEntityChange(e.target.value);
                                }}
                                name="age"
                                className={classes.viewSelect}
                                classes={{
                                    select: classes.selectInput
                                }}
                                input={<OutlinedInput name="view" labelWidth={0} />}
                            >
                                <MenuItem value="task">Task</MenuItem>
                                <MenuItem value="goal">Goal</MenuItem>
                                { /*<MenuItem value="objective">Objective</MenuItem>*/ }
                            </Select>
                        </StyledFormControl>
                    </CreateTarget>
                </div>
                <div className={classes.content}>
                    {this.state.entity === 'task' && (
                        <React.Fragment>
                            <EntityDetails
                                state={this.state.task}
                                titleChange={val => this.handleTaskTitleChange(val)}
                                detailsChange={val => this.handleTaskDetailsChange(val)}
                            />
                            <CreateButton
                                variant="contained"
                                onClick={e => {
                                    this.onTaskCreate(this.state.task);
                                }}
                                color="primary"
                                className={''}
                            >
                                Create
                            </CreateButton>
                        </React.Fragment>
                    )}
                    {this.state.entity === 'goal' && (
                        <React.Fragment>
                            <EntityDetails
                                state={this.state.goal}
                                titleChange={val => this.handleGoalTitleChange(val)}
                                detailsChange={val => this.handleGoalDetailsChange(val)}
                            />
                            <TaskTable
                                tasks={this.state.goal.tasks}
                                currentTitle={this.state.goal.currentTitle}
                                currentDetails={this.state.goal.currentDetails}
                                onTitleChange={title => {
                                    this.goalTaskTitleChange(title);
                                }}
                                onDetailsChange={details => {
                                    this.goalTaskDetailsChange(details);
                                }}
                                addTask={() => this.onTaskAdd()}
                                removeTask={key => this.removeTask(key)}
                            />
                            <CreateButton variant="contained" color="primary" className={''}>
                                Create
                            </CreateButton>
                        </React.Fragment>
                    )}
                </div>
            </StyledCreate>
        );
    }
}

export default withStyles(styles)(Create);
