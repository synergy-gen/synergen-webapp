import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './explore-styles';
import { Paper, InputBase, IconButton, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/protected-route';
import SearchResults from './results/results-view';
import ResultGoalDetails from './details/details-control';

class ExploreView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };

        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.renderSearchBar = this.renderSearchBar.bind(this);
    }

    handleSearchChange(event) {
        this.setState({ search: event.target.value });
    }

    handleSearch(event) {
        event.preventDefault();
        this.props.searchForGoals(this.state.search).catch(console.log);
        return false;
    }

    renderSearchBar() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root} elevation={1}>
                <InputBase
                    className={classes.input}
                    placeholder="Search Synergen"
                    onChange={this.handleSearchChange}
                />
                <IconButton className={classes.iconButton} aria-label="Search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        );
    }

    render() {
        const { classes, results } = this.props;

        return (
            <React.Fragment>
                <Grid container justify="center" className={classes.searchContainer}>
                    <Grid item>
                        <form onSubmit={this.handleSearch}>{this.renderSearchBar()}</form>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Switch>
                        <ProtectedRoute exact path="/app/explore" component={SearchResults} />
                        <ProtectedRoute exact path="/app/explore/results/:id" component={ResultGoalDetails} />
                    </Switch>
                </Grid>
            </React.Fragment>
        );
    }
}

ExploreView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExploreView);
