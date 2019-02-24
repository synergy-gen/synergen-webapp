import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './explore-styles';
import {
    Paper,
    InputBase,
    IconButton,
    Grid,
    Card,
    CardHeader,
    CardActions,
    CardMedia,
    CardContent,
    Typography,
    Button
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import SummaryCard from '../summary-card/summary-card-view';

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
        this.props.searchForGoals(this.state.search).catch(console.log);
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
        const { classes, results } = this.props;

        return (
            <React.Fragment>
                <Grid container justify="center" className={classes.searchContainer}>
                    <Grid item>
                        <form onSubmit={this.handleSearch}>{this.renderSearchBar()}</form>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    {results
                        ? Array.from(Object.values(results)).map(res => (
                              <SummaryCard
                                  key={res.id}
                                  title={res.latest.title}
                                  description={res.latest.description}
                                  creator={res.creator}
                                  image={null}
                                  viewPath={`/explore/results/${res.id}`}
                              />
                          ))
                        : ''}
                </Grid>
            </React.Fragment>
        );
    }
}

ExploreView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ExploreView);
