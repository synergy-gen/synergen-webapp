import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './summary-styles';
import { Grid } from '@material-ui/core';
import SummaryCard from '../../summary-card/summary-card-view';

class ProfileSummaryView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;

        return (
            <Grid container spacing={8} justify="center">
                {data ? Array.from(Object.values(data)).map(d => (
                    <SummaryCard key={d.id} data={d} />
                )) : ''}
            </Grid>
        );
    }
}

ProfileSummaryView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSummaryView);
