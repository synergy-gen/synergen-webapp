import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './summary-styles';
import { Link } from 'react-router-dom';
import { Grid, Card, CardHeader, CardContent, Typography, Button, CircularProgress } from '@material-ui/core';

class ProfileSummaryView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { classes, data } = this.props;

        const SummaryCard = ({ data }) => (
            <Grid item xs={12} sm={6} md={6} lg={4}>
                <Card className={classes.summaryCard}>
                    <CardHeader
                        avatar={ data.completed ? <CircularProgress variant="static" value={data.completed} /> : ''}
                        title={<Typography variant="h6">{data.title}</Typography>}
                        subheader={data.creator}
                        action={
                            <Link className={classes.link} to={`/app/view/${data.id}`}>
                                <Button>View Details</Button>
                            </Link>
                        }
                    />
                    <CardContent>
                        <Typography>{data.description}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        );

        return (
            <Grid container spacing={8}>
                {data.map(d => (
                    <SummaryCard key={d.id} data={d} />
                ))}
            </Grid>
        );
    }
}

ProfileSummaryView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSummaryView);
