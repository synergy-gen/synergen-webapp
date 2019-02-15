import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './summary-card-styles';
import { Link } from 'react-router-dom';
import {
    Grid,
    Card,
    CardHeader,
    CardContent,
    Typography,
    Button,
    CircularProgress,
    CardActions
} from '@material-ui/core';

const SummaryCard = ({ classes, data }) => (
    <Grid item xs={12} sm={6} md={6} lg={4} className={classes.summaryCardGrid}>
        <Card className={classes.summaryCard}>
            <CardHeader
                avatar={data.completed ? <CircularProgress variant="static" value={data.completed} /> : ''}
                title={<Typography variant="h6">{data.title}</Typography>}
                subheader={'@' + data.creator}
            />
            <CardContent className={classes.summaryCardDescription}>
                <Typography noWrap={true}>{data.description}</Typography>
            </CardContent>
            <CardActions>
                <Link className={classes.link} to={`/app/view/${data.id}`}>
                    <Button>View Details</Button>
                </Link>
            </CardActions>
        </Card>
    </Grid>
);

SummaryCard.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired
};

export default withStyles(styles)(SummaryCard);
