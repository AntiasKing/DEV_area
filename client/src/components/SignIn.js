import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import Axios from 'axios';

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit,
    },
});

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

		handleGoogle(response) {
				let data = JSON.stringify({
						"user": response
				});
				Axios.post("http://localhost:8080/google",
						data, { headers: { "Content-Type": "application/json" } })
						.then(function (response) {
								console.log(response);
								// window.location = "./dashboard";
						})
						.catch(function (error) {
								console.log(error);
						})
		}

    handleFacebook(response) {
        let data = JSON.stringify({
            "user": response
        });
        Axios.post("https://prod-area-epitech.herokuapp.com/facebook/",
            data, { headers: { "Content-Type": "application/json" } })
            .then(function (response) {
                console.log(response);
                // window.location = "./dashboard";
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({ [name]: target.value });
    }

    handleSubmit(event) {
        let data = JSON.stringify({
            "user": {
                "email": this.state.email,
                "password": this.state.password,
            }
        });
        Axios.post("https://prod-area-epitech.herokuapp.com/user/local/login",
            data,
            { headers: { "Content-Type": "application/json" } })
            .then(function (response) {
                console.log(response);
                // window.location = "./dashboard";
            }).catch(function (error) {
                console.log(error);
            })
    }

    handleTwitter = (response) => {
        console.log("Twitter handled !!");
    };

    onFailed = (error) => {
        console.log(error);
    };

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <FacebookLogin
                    appId="410435456195867"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={this.handleFacebook} />
                <TwitterLogin loginUrl="https://prod-area-epitech.herokuapp.com/auth/twitter"
                    onFailure={this.onFailed} onSuccess={this.handleTwitter}
										requestTokenUrl="https://prod-area-epitech.herokuapp.com/auth/twitter/reverse" />
                <GoogleLogin
                    clientId="9362814247-n8l28l8hmmrc8ebqps2nf4bktjb93pg6.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.handleGoogle}
                    onFailure={this.handleGoogle} />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleInputChange} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange} />
                        </FormControl>
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                    </form>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.handleSubmit}
                    >
                        Sign in
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.register}
                        href='./register'
                    >
                        Register
                    </Button>
                </Paper>
            </main>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
