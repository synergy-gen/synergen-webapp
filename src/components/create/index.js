import React from 'react'
import styled from 'styled-components'
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';

const StyledCreate  = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`

const TopBar = styled.div`
    height: 50px;
    display: flex;
    position: relative;
    flex-direction: row;
    top: 0;
    flex-grow: 1;
    background: #dadada;
    padding: 5px 10px;
`

const CreateTarget = styled.div`
    display: flex;
    position: relative;
    align-self: center;

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: sans-serif;
        margin: 0 5px;
    }
`

const StyledFormControl = styled(FormControl)`
    margin: 0 5px !important;
`

const TitleField = styled(TextField)`
    width: 150px;
`

const CreateButton = styled(Button)`
    width: 200px;
    margin-top: 8px !important;
`

export default class Create extends React.Component {
    constructor(){
        super();
        this.state = {
            entity: "task",
            task:{
                title:"",
                details:"",
            },
            goal:{
                title:"",
                details:"",
                tasks: []
            }
        }
    }

    handleEntityChange(value){
        this.setState({entity:value})
    }

    handleTaskTitleChange(value){
        this.setState({task:{...this.state.task, title: value}})
    }

    handleGoalTitleChange(value){
        this.setState({goal:{...this.state.goal, title: value}})
    }

    handleTaskDetailsChange(value){
        this.setState({task:{...this.state.task, details: value}})
    }

    handleGoalDetailsChange(value){
        this.setState({goal:{...this.state.goal, title: value}})
    }

    onTaskCreate(task){
        
        let newState = {...this.state};
        newState.goal.tasks.push(task);
        newState.task.title="";
        newState.task.details="";
        
        this.setState({newState})
    }

    render(){
        return(
            <StyledCreate>
                <TopBar>
                    <CreateTarget>
                        <label>
                            CREATE
                        </label>
                        <StyledFormControl className={""}>
                            <NativeSelect
                            value={this.state.entity}
                            onChange={(e)=>{this.handleEntityChange(e.target.value)}}
                            name="age"
                            className={""}
                            input={
                                <OutlinedInput labelWidth={0} name="age" id="outlined-age-simple" />
                              }
                            >
                            <option value="none">None</option>
                            <option value={"task"}>Task</option>
                            <option value={"goal"}>Goal</option>
                            <option value={"objective"}>Objective</option>
                            </NativeSelect>
                        </StyledFormControl>
                    </CreateTarget>
                </TopBar>
                {this.state.entity === "task" && 
                    <React.Fragment>
                        <EntityDetails state={this.state.task} titleChange={(val)=>this.handleTaskTitleChange(val)} 
                        detailsChange={(val)=>this.handleTaskDetailsChange(val)}/>
                        <CreateButton variant="contained" onClick={(e)=>{ this.onTaskCreate(this.state.task)}} color="primary" className={""}>Create</CreateButton>
                    </React.Fragment>
                }
                {this.state.entity === "goal" && 
                    <React.Fragment>
                        <EntityDetails state={this.state.goal} titleChange={(val)=>this.handleGoalTitleChange(val)} 
                        detailsChange={(val)=>this.handleGoalDetailsChange(val)}/>
                        <TaskTable tasks={this.state.goal.tasks}/>
                        <CreateButton variant="contained" color="primary" className={""}>Create</CreateButton>
                    </React.Fragment>
                }
            </StyledCreate>
        );
    }
}


const EntityDetails = ({state, titleChange, detailsChange})=>{
    return (<React.Fragment>
        <TitleField
            id="outlined-name"
            label="Title"
            className={""}
            value={state.title}
            onChange={(e)=>{titleChange(e.target.value)}}
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
            onChange={(e)=>{detailsChange(e.target.value)}}
            className={""}
            margin="normal"
            helperText=""
            variant="outlined"
        />
    </React.Fragment>)
}

const HeaderRow = styled.tr``

const Header = styled.th``

const TableRow = styled.tr``

const TableCell = styled.td``

const TaskTable = ({tasks}) => {
    return (
    <table>
        <tbody>
            <HeaderRow>
                <Header>
                    {"Title"}
                </Header>
                <Header>
                    {"Description"}
                </Header>
            </HeaderRow>
            {
                tasks.map((element, key)=>{
                    return <TableRow>
                        <TableCell>
                            {element.title}
                        </TableCell>
                        <TableCell>
                            {element.details}
                        </TableCell>
                    </TableRow>
                })
            }
        </tbody>
    </table>
    )
}