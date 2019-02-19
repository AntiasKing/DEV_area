import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import Axios from 'axios';

import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';

import './../Ext-Login.css';

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

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({ [name]: target.value });
    }

    handleFacebook(response) {
        let data = JSON.stringify({
            "user": response
        });
				Axios.post("https://prod-area-epitech.herokuapp.com/facebook/",
            data,
            { headers: { "Content-Type": "application/json" } })
            .then(function (response) {
                console.log(response);
                // window.location = "./dashboard";
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // TODO: Add Error message for bad register
    handleSubmit(event) {
        let data = JSON.stringify({
            "user": {
                "email": this.state.email,
                "password": this.state.password,
                "name": this.state.name,
                "thumbmailURL": ""
            }
        });

				Axios.post('https://prod-area-epitech.herokuapp.com/signup',
            data,
            { headers: { "Content-Type": "application/json" } })
            .then(function (response) {
                console.log(response);
                // window.location = "./dashboard";
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Register
                </Typography>
                    <form className={classes.form}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor='name'>Username</InputLabel>
                            <Input id='name' name='name' autoComplete='username' onChange={this.handleInputChange}>Username</Input>
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" autoComplete="email" onChange={this.handleInputChange} />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleInputChange} />
                        </FormControl>
                    </form>

                    <ul class="Ext-Login-Select">
                        <li>
                            <FacebookLogin
                                appId="410435456195867"
                                autoLoad={false}
                                fields="name,email,picture"
                                cssClass="Ext-Login btn-Facebook"
                                textButton={<Icon className={classNames(classes.icon, 'fa fa-facebook')} />}
                                icon=""
                                callback={this.handleFacebook} />
                        </li>
                        <li>
                            <TwitterLogin
                                loginUrl="https://prod-area-epitech.herokuapp.com/auth/twitter"
                                onFailure={this.onFailed} onSuccess={this.handleTwitter}
                                className="Ext-Login btn-Twitter"
                                showIcon={false}
                                text={<Icon className={classNames(classes.icon, 'fa fa-twitter')} />}
                                requestTokenUrl="https://prod-area-epitech.herokuapp.com/auth/twitter/reverse" />
                        </li>
                        {/* Changer en dessous par les autres services de login */}
                        <li>
                            <TwitterLogin
                                loginUrl="https://prod-area-epitech.herokuapp.com/auth/twitter"
                                onFailure={this.onFailed} onSuccess={this.handleTwitter}
                                className="Ext-Login btn-Google"
                                showIcon={false}
                                text={<Icon className={classNames(classes.icon, 'fa fa-google')} />}
                                requestTokenUrl="https://prod-area-epitech.herokuapp.com/auth/twitter/reverse" />
                        </li>
                        <li>
                            <TwitterLogin
                                loginUrl="https://prod-area-epitech.herokuapp.com/auth/twitter"
                                onFailure={this.onFailed} onSuccess={this.handleTwitter}
                                className="Ext-Login btn-Twitch"
                                showIcon={false}
                                text={<Icon className={classNames(classes.icon, 'fa fa-twitch')} />}
                                requestTokenUrl="https://prod-area-epitech.herokuapp.com/auth/twitter/reverse" />
                        </li>
                        <li>
                            <TwitterLogin
                                loginUrl="https://prod-area-epitech.herokuapp.com/auth/twitter"
                                onFailure={this.onFailed} onSuccess={this.handleTwitter}
                                className="Ext-Login btn-Spotify"
                                showIcon={false}
                                text={<Icon className={classNames(classes.icon, 'fa fa-spotify')} />}
                                requestTokenUrl="https://prod-area-epitech.herokuapp.com/auth/twitter/reverse" />
                        </li>
                        {/* FIN des services à changer */}
                    </ul>


                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.handleSubmit}
                    >
                        Register
                        </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.register}
                        href='./sign-in'
                    >
                        Sign in
                    </Button>
                </Paper>
            </main>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
