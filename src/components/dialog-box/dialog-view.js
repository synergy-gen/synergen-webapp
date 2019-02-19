import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './dialog-styles';
import { Dialog, DialogTitle, DialogContentText, DialogActions, Button } from '@material-ui/core';

class DialogView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { classes, open, title, message, onClose, onConfirm, onCancel } = this.props;

        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContentText className={classes.content}>{message}</DialogContentText>
                <DialogActions>
                    <Button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        color="primary"
                    >
                        Confirm
                    </Button>
                    <Button
                        onClick={() => {
                            if (onCancel) {
                                onCancel();
                            }
                            onClose();
                        }}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

DialogView.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func
};

export default withStyles(styles)(DialogView);
