import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './auth-styles';
import { Link } from 'react-router-dom';

function AuthView({
    classes,
    action,
    error,
    onLoginFormSubmit,
    onNameChange,
    onEmailChange,
    onUsernameChange,
    onPasswordChange
}) {
    return (
        <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
            <Typography variant="h4">S Y N E R G E N</Typography>
                <Avatar className={classes.avatar}>{action === 'login' ? <LockIcon /> : <AssignmentIcon />}</Avatar>
                <Typography component="h1" variant="h5">
                    {action === 'login' ? 'Sign In' : 'Register'}
                </Typography>
                {error ? (
                    <Typography className={classes.errorMessage} color="error">
                        {error}
                    </Typography>
                ) : (
                    ''
                )}
                <form className={classes.form} onSubmit={onLoginFormSubmit}>
                    {action === 'register' ? (
                        <React.Fragment>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="name">Name</InputLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    autoComplete="name"
                                    onChange={onNameChange}
                                    autoFocus={action === 'register'}
                                />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" name="email" onChange={onEmailChange} autoComplete="email" />
                            </FormControl>
                        </React.Fragment>
                    ) : (
                        ''
                    )}
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="username">Username</InputLabel>
                        <Input
                            id="username"
                            name="username"
                            autoComplete="username"
                            onChange={onUsernameChange}
                            autoFocus={action === 'login'}
                        />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input
                            name="password"
                            type="password"
                            id="password"
                            onChange={onPasswordChange}
                            autoComplete="current-password"
                        />
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {action === 'login' ? 'Sign In' : 'Register'}
                    </Button>
                    {action === 'login' ? (
                        <div className={classes.register}>
                            <Typography>
                                Don't have an account? <Link to="/register" className={classes.link}>Register</Link>
                            </Typography>
                        </div>
                    ) : (
                        <div className={classes.register}>
                            <Typography>
                                Already have an account? <Link to="/login" className={classes.link}>Sign in</Link>
                            </Typography>
                        </div>
                    )}
                </form>
            </Paper>
        </main>
    );
}

AuthView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AuthView);
