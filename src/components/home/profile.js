import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const StyledProfile  = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    width: 60%;
`

const StyledAccountBasics  = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledProfileSection  = styled.div`
    display: flex;
    flex-direction: column;
`

const SectionTitle = styled.span`
    display: flex;
    font-family: sans-serif;
    color: #333;
    font-size: 36px;
`

const StyledButton = styled(Button)`
    width: 15rem;
`

const StyledSelect = styled(Select)`
    margin: 10px 0;
`

const StyledRadioGroup = styled(RadioGroup)`
    display: flex;
    flex-direction: row;
`

const StyledProfileName = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

const handleChange = ()=>{}

const AccountBasics = ({classes, label, name}) =>
    <StyledAccountBasics>
        <SectionTitle>Account Basics</SectionTitle>
        <TextField
          id="outlined-name"
          label={label}
          className=""
          value={"Test"}
          margin="normal"
          variant="outlined"
        />
        <StyledButton variant="contained" className="">
            Change Password
        </StyledButton>
        <StyledSelect
          value={10}
          onChange={handleChange}
          name="Language"
          input={<OutlinedInput labelWidth={50} name="age" id="outlined-age-simple" />}
          inputProps={{
            id: 'sel-language',
          }}
          className=""
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </StyledSelect>
        <StyledSelect
          value={10}
          onChange={handleChange}
          name="Country"
          input={<OutlinedInput labelWidth={50} name="age" id="outlined-age-simple" />}
          inputProps={{
            id: 'sel-country',
          }}
          className=""
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </StyledSelect>
        <StyledRadioGroup
          aria-label="Gender"
          name="gender"
          className={"gender"}
          value={"male"}
          onChange={handleChange}
        >
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="custom" control={<Radio />} label="Other" />
          <FormControlLabel
            value="disabled"
            disabled
            control={<Radio />}
            label="(Disabled option)"
          />
        </StyledRadioGroup>
    </StyledAccountBasics>

const ProfileName = ()=>
    <StyledProfileName>
        <TextField
          id="outlined-name"
          label={"First Name"}
          className=""
          value={"Test"}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label={"Last Name"}
          className=""
          value={"Test"}
          margin="normal"
          variant="outlined"
        />
    </StyledProfileName>  


const ProfileSection = ({}) => 
    <StyledProfileSection>
        <SectionTitle>Profile</SectionTitle>
        <ProfileName />
        <TextField
          id="outlined-name"
          label={"About You"}
          className=""
          value={"Test"}
          margin="normal"
          variant="outlined"
          multiline={true}
        />
    </StyledProfileSection>


export default class Profile extends React.Component {
    constructor(){
        super();
    }
    render(){
        return(
            <StyledProfile>
                <AccountBasics label="Email Address"/>
                <ProfileSection />
            </StyledProfile>
        );
    }
}