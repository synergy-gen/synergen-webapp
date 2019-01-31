import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './explore-styles';
import { Paper, InputBase, IconButton, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class ExploreView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.renderSearchBar = this.renderSearchBar.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSearch(event) {
        event.preventDefault();
        this.props.onSearchSubmit(this.state.search);
        return false;
    }

    renderSearchBar() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root} elevation={1}>
                <InputBase
                    name="search"
                    className={classes.input}
                    placeholder="Search Synergen"
                    onChange={this.handleChange}
                />
                <IconButton className={classes.iconButton} aria-label="Search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container justify="center" className={classes.searchContainer}>
                <Grid item>
                    <form onSubmit={this.handleSearch}>{this.renderSearchBar()}</form>
                </Grid>
            </Grid>
        );
    }
}

ExploreView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExploreView);
