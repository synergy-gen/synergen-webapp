import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './auth-styles';
import { Link, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

class LoginView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.onRegister = this.onRegister.bind(this);
    }

    componentDidMount() {
        if (this.props.loggedIn == null) {
            this.props.verifyUserIsAuthenticated().catch(console.log);
        }
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    onRegister(event) {
        event.preventDefault();
        this.props
            .registerUser(this.state.name, this.state.email, this.state.username, this.state.password)
            .catch(console.log);
        return false;
    }

    render() {
        const { classes, error, loggedIn } = this.props;

        if (loggedIn) {
            return <Redirect to="/app/profile" />;
        }

        if (loggedIn == null) {
            return (
                <div
                    style={{
                        height: '100vh',
                        width: '100vw',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CircularProgress style={{ width: 200, height: 200 }} color="primary" />
                </div>
            );
        }

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Typography variant="h4">S Y N E R G E N</Typography>
                    <Avatar className={classes.avatar}>
                    <AssignmentIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    {error ? (
                        <Typography className={classes.errorMessage} color="error">
                            {error}
                        </Typography>
                    ) : (
                        ''
                    )}
                    <form className={classes.form} onSubmit={this.onRegister}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input
                                id="name"
                                name="name"
                                autoComplete="name"
                                onChange={this.handleChange}
                                autoFocus={true}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <Input id="email" name="email" onChange={this.handleChange} autoComplete="email" />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input
                                id="username"
                                name="username"
                                autoComplete="username"
                                onChange={this.handleChange}
                                autoFocus={true}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type="password"
                                id="password"
                                onChange={this.handleChange}
                                autoComplete="current-password"
                            />
                        </FormControl>
                        <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                            Register
                        </Button>
                        <div className={classes.register}>
                            <Typography>
                                Already have an account?{' '}
                                <Link to="/login" className={classes.link}>
                                    Sign in
                                </Link>
                            </Typography>
                        </div>
                    </form>
                </Paper>
            </main>
        );
    }
}

LoginView.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginView);
