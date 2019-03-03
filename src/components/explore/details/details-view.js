import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
    Paper,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Table,
    TableBody,
    TableRow,
    TableCell,
    Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import BackArrowIcon from '@material-ui/icons/ArrowBack';
import moment from 'moment';

const styles = theme => ({
    appBar: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light
    },
    toolbarButton: {
        color: theme.palette.primary.contrastText
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '10px',
        width: '100%'
    },
    paperTaskSummary: {
        marginTop: 10,
        padding: 15
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10
    },
    headerContent: {},
    headerActions: {
        marginLeft: 'auto'
    },
    link: {
        textDecoration: 'none'
    }
});

const TaskRow = ({ classes, task }) => (
    <TableRow>
        <TableCell>{task}</TableCell>
    </TableRow>
);

class DetailsView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, goal } = this.props;

        return (
            <React.Fragment>
                <AppBar className={classes.appBar} position="static">
                    <Toolbar>
                        <Link to="/app/explore" className={classes.link}>
                            <IconButton className={classes.toolbarButton}>
                                <BackArrowIcon />
                            </IconButton>
                        </Link>
                        <Typography variant="h6" color="inherit">
                            Explore Result Details
                        </Typography>
                        <div className={classes.headerActions}>
                            <Button color="secondary" variant="contained">Adopt</Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className={classes.root}>
                    <div className={classes.header}>
                        <div className={classes.headerContent}>
                            <Typography variant="h4">{goal.latest.title}</Typography>
                            <Typography>By: @{goal.creator}</Typography>
                        </div>
                    </div>
                    <Typography>{goal.latest.description}</Typography>
                    <Paper className={classes.paperTaskSummary}>
                        <Typography variant="h6">Tasks</Typography>
                        <Table>
                            <TableBody>
                                {goal.latest.tasks.map((t, i) => (
                                    <TaskRow key={i} task={t} />
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </React.Fragment>
        );
    }
}

DetailsView.propTypes = {
    classes: PropTypes.object.isRequired,
    goal: PropTypes.object.isRequired
};

export default withStyles(styles)(DetailsView);
