import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Avatar, Button, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        margin: 5,
        padding: 5
    },
    content: {
        padding: 5,
        display: 'flex'
    },
    avatar: {
        width: 100,
        height: 100
    },
    actions: {
        marginLeft: 15,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    buttonUploadNew: {
        marginBottom: 10
    },
    input: {
        display: 'none'
    }
});

class AvatarSettingView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            src: props.src ? props.src : '/assets/img/no-avatar.png',
            file: null
        };

        this.reader = new FileReader();

        this.buttonUpload = React.createRef();
        this.buttonUploadNew = React.createRef();

        this.onFileChange = this.onFileChange.bind(this);
        this.onClearAvatar = this.onClearAvatar.bind(this);
    }

    onFileChange(e) {
        if (e.target.files.length === 0 || e.target.value === '') return;
        let image = e.target.files[0];
        if(image.type.indexOf('image') < 0) return;
        this.reader.onload = () => {
            let src = this.reader.result;
            this.setState({ src, file: image });
            this.reader.onload = () => {
                let rawData = this.reader.result;
                this.props.onNewAvatar(rawData, image.type);
            };
            this.reader.readAsArrayBuffer(image);
        };
        this.reader.readAsDataURL(image);
    }

    onClearAvatar() {
        this.setState({ src: 'assets/img/no-avatar.png', file: null });
        if (this.buttonUploadNew.current) this.buttonUploadNew.current.value = '';
        if (this.buttonUpload.current) this.buttonUpload.current.value = '';
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant="subtitle1">Avatar Image</Typography>
                <div className={classes.content}>
                    <Avatar alt="avatar" src={this.state.src} className={classes.avatar} />
                    <div className={classes.actions}>
                        {this.state.file ? (
                            <React.Fragment>
                                <Button
                                    className={classes.buttonUploadNew}
                                    variant="contained"
                                    color="secondary"
                                    component="label"
                                    size="small"
                                >
                                    Upload New
                                    <input
                                        type="file"
                                        ref={this.buttonUploadNew}
                                        className={classes.input}
                                        onChange={this.onFileChange}
                                        accept="image/*"
                                    />
                                </Button>
                                <Button component="label" size="small" onClick={this.onClearAvatar}>
                                    Clear
                                </Button>
                            </React.Fragment>
                        ) : (
                            <Button variant="contained" color="secondary" component="label" size="small">
                                Upload
                                <input
                                    type="file"
                                    ref={this.buttonUpload}
                                    className={classes.input}
                                    onChange={this.onFileChange}
                                    accept="image/*"
                                />
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

AvatarSettingView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AvatarSettingView);
