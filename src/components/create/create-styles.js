import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';

import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

export default theme => ({
    topBar: {
        display: 'flex',
        position: 'relative',
        flexDirection: 'row',
        flexGrow: 1,
        padding: '5px 10px',
        backgroundColor: theme.palette.primary.main
    },
    viewSelect: {
        textAlign: 'center',
        borderRadius: theme.shape.borderRadius
    },
    selectInput: {
        color: theme.palette.primary.contrastText,
        fontWeight: 'bold'
    },
    content: {
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
});

export const StyledCreate = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const CreateTarget = styled.div`
    display: flex;
    position: relative;
    align-self: center;
    align-items: center;

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: sans-serif;
        margin: 0 5px;
    }
`;

export const StyledFormControl = styled(FormControl)`
    margin: 0 5px !important;
`;

export const TitleField = styled(TextField)`
    width: 150px;
`;

export const CreateButton = styled(Button)`
    width: 200px;
    margin-top: 20px !important;
    margin-left: auto !important;
    margin-right: auto !important;
`;

export const AddButton = styled(Button)`
    width: 100%;
    margin-top: 8px !important;
`;

export const AddTitleField = styled(TextField)`
    width: 100%;
`;

export const StyledFieldSet = styled.fieldset`
    display: flex;
    width: 100%;
    position: relative;
    padding: 5px;
    box-sizing: border-box;
`;

export const StyledLegend = styled.legend`
    font-family: sans-serif;
    display: flex;
    position: relative;
    color: #fff
`;

export const HeaderRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Header = styled.div`
    font-family: sans-serif;
    display: flex;
    flex-basis: 50%;
    padding: 5px;
    align-items: center;
`;

export const TableRow = styled.div`
    display: flex;
    flex-direction: row;
`;

export const TableCell = styled.div`
    display: flex;
    text-align: center;
    font-family: sans-serif;
    color: #222;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 5px;
    align-items: center;
    overflow: hidden;
`;
export const StyledTable = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
`;