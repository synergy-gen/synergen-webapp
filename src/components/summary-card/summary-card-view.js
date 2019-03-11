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
    CardActions,
    Avatar
} from '@material-ui/core';

const SummaryCard = ({ classes, title, description, creator, completed, image, viewPath }) => (
    <Grid item xs={12} sm={6} md={6} lg={4} className={classes.summaryCardGrid}>
        <Card className={classes.summaryCard}>
            <CardHeader
                className={classes.summaryCardHeader}
                avatar={
                    completed ? (
                        <CircularProgress variant="static" value={data.completed} />
                    ) : image ? (
                        <Avatar src={image} />
                    ) : (
                        ''
                    )
                }
                title={<Typography variant="h6">{title}</Typography>}
                subheader={'@' + creator}
            />
            <CardContent className={classes.summaryCardContent}>
                <p className={classes.summaryCardDescription}>{description}</p>
            </CardContent>
            <CardActions>
                <Link className={classes.link} to={viewPath}>
                    <Button>View Details</Button>
                </Link>
            </CardActions>
        </Card>
    </Grid>
);

SummaryCard.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    creator: PropTypes.string,
    completed: PropTypes.number,
    image: PropTypes.string,
    viewPath: PropTypes.string
};

export default withStyles(styles)(SummaryCard);
