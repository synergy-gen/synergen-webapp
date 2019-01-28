import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './tasklist-styles';
import { Divider, List, ListItem, ListItemText } from '@material-ui/core';

class TasklistView extends React.Component {
    constructor(props) {
        super(props);

        this.menuItems = [
            { title: 'Profile', link: '' },
            { title: 'Explore', link: '' },
            { title: 'Supporting', link: '' },
            { title: 'Groups', link: '' }
        ];
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div />
                <Divider />
                <List>
                    {this.menuItems.map((item, index) => (
                        <ListItem button key={item.title}>
                            <ListItemText key={item.title} primary={item.title} />
                        </ListItem>
                    ))}
                </List>
            </React.Fragment>
        );
    }
}

TasklistView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TasklistView);
