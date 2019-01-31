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
    margin-top: 20px !important;
    margin-left: auto !important;
    margin-right: auto !important;
`

const AddButton = styled(Button)`
    width: 100%;
    margin-top: 8px !important;
`

const AddTitleField = styled(TextField)`
    width:100%;
`

const StyledFieldSet = styled.fieldset`
    display: flex;
    width: 100%;
    position: relative;
    padding: 5px;
    box-sizing: border-box;
`

const StyledLegend = styled.legend`
    font-family: sans-serif;
    display: flex;
    position: relative
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
                //tasks: [{title:"asdasdjnaksjdbiausdhgiasugdiasugdiausgdiauasgd", details:"adjnakjsbdajsbasd aidoians oiashdoiahsodih asoidhoaishdoaish asdoiahodiahsd aoishdoaishdoi aoihdoaishdoih doasubadasj dasdasdasdsidboasidbaosbd dakjsbdakjsbd"}],
                tasks:[],
                currentTitle: "",
                currentDetails: ""
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

    onTaskAdd(){
        let newState = this.state;
        newState.goal.tasks.push({
            title: newState.goal.currentTitle,
            details: newState.goal.currentDetails
        });
        newState.goal.currentDetails="";
        newState.goal.currentTitle="";
        this.setState({...newState});
    }

    removeTask(key){
        let newState = this.state;
        newState.goal.tasks = newState.goal.tasks.filter((_, index)=>{
            return index!==key
        });
        this.setState({...newState})

    }
    
    goalTaskTitleChange(title){
        let newState = this.state;
        newState.goal.currentTitle = title;
        this.setState({...newState});
    }

    goalTaskDetailsChange(details){
        let newState = this.state;
        newState.goal.currentDetails = details;
        this.setState({...newState});
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
                        <TaskTable tasks={this.state.goal.tasks} currentTitle={this.state.goal.currentTitle} currentDetails={this.state.goal.currentDetails} onTitleChange={(title)=>{this.goalTaskTitleChange(title)}} onDetailsChange={(details)=>{this.goalTaskDetailsChange(details)}} addTask={()=>this.onTaskAdd()} removeTask={(key)=>this.removeTask(key)}/>
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

const HeaderRow = styled.div`
    display: flex;
    flex-direction: row;
`

const Header = styled.div`
    font-family: sans-serif;
    display: flex;
    flex-basis: 50%;
    padding: 5px;
    align-items: center;
`

const TableRow = styled.div`
    display: flex;
    flex-direction: row;
`

const TableCell = styled.div`
    display: flex;
    text-align: center;
    font-family: sans-serif;
    color: #222;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 5px;
    align-items: center;
    overflow: hidden;
`
const StyledTable = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`


const TaskTable = ({tasks, currentTitle, currentDetails, onTitleChange, onDetailsChange, addTask, removeTask}) => {
    return (
    <StyledFieldSet>
        <StyledLegend>Tasks</StyledLegend>
        <StyledTable>
            <HeaderRow>
                {tasks.length>0 && 
                    <React.Fragment>
                        <Header>
                            {"Title"}
                        </Header>
                        <Header>
                            {"Description"}
                        </Header>
                    </React.Fragment>
                }
            </HeaderRow>
            {
                tasks.map((element, key)=>{
                    return <TableRow key={key}>
                        <TableCell style={{flexBasis: "50%", maxWidth:"50%"}}>
                            {element.title}
                        </TableCell>
                        <TableCell style={{flexBasis: "40%", maxWidth:"40%"}}>
                            {element.details}
                        </TableCell>
                        <TableCell style={{flexBasis: "10%"}}>
                            <AddButton onClick={()=>removeTask(key)} variant="contained" color="primary" className={""}>-</AddButton>
                        </TableCell>
                    </TableRow>
                })
            }
            <TableRow>
                <TableCell style={{flexBasis: "50%"}}>
                    <AddTitleField
                        id="outlined-name"
                        label="Title"
                        className={""}
                        value={currentTitle}
                        onChange={(e)=>{onTitleChange(e.target.value)}}
                        margin="normal"
                        variant="outlined"
                    />
                </TableCell>
                <TableCell style={{flexBasis: "50%"}}>
                    <AddTitleField
                        id="outlined-name"
                        label="Description"
                        className={""}
                        value={currentDetails}
                        onChange={(e)=>{onDetailsChange(e.target.value)}}
                        margin="normal"
                        variant="outlined"
                    />
                </TableCell>
            </TableRow>
        </StyledTable>
        <AddButton variant="contained" color="primary" onClick={()=>addTask()} className={""}>+</AddButton>
    </StyledFieldSet>
    )
}