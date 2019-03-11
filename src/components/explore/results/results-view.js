import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import SummaryCard from '../../summary-card/summary-card-view';
import { CircularProgress, Typography } from '@material-ui/core';

const styles = theme => ({});

class ResultsView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, results, fetching } = this.props;

        if (fetching) {
            return <CircularProgress color="secondary" />;
        }

        return results
            ? results.length > 0
                ? Array.from(Object.values(results)).map(res => (
                      <SummaryCard
                          key={res.id}
                          title={res.latest.title}
                          description={res.latest.description}
                          creator={res.creator}
                          image={null}
                          viewPath={`/app/explore/results/${res.id}`}
                      />
                  ))
                : <Typography>No results found</Typography>
            : <Typography>Search for goals to adopt!</Typography>;
    }
}

ResultsView.propTypes = {
    classes: PropTypes.object.isRequired,
    results: PropTypes.array
};

const mapStateToProps = state => ({
    results: state.explore.results,
    fetching: state.explore.isFetching
});

export default connect(
    mapStateToProps,
    null
)(withStyles(styles)(ResultsView));
