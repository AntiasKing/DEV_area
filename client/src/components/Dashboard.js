import React from 'react';
import Applet from './Applet';
import Service from './Service';
import { AppBar, Typography, Toolbar, IconButton, Grid, Tabs, Tab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';
import Axios from 'axios';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import withStyles from '@material-ui/core/styles/withStyles';

import TwitterLogin from 'react-twitter-auth';
import FacebookLogin from 'react-facebook-login';
import TwitchButton from './TwitchButton';
import SpotifyButton from './SpotifyButton';
import GoogleLogin from 'react-google-login';

import './../Ext-Login.css';

const styles = theme => ({
    main: {
        overflow: 'hidden',
    },
    AddIcon: {
        position: "absolute",
        right: "0px"
    },
    noApplet: {
        textAlign: 'center',
        margin: "auto",
        marginTop: "150px",
    },
    grid: {
        flexGrow: 1,
    },
    Applet: {
        height: 100,
        width: 100,
    }
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applets: [],
            services: [],
            login: [false, false, false, false, false, true],
            tab: 0,
        }
        this.CheckLogin();
        this.getServices();
        this.getApplets();
    }

    getServices() {
        Axios.get('https://staging-area-epitech.herokuapp.com/services').then((response) => {
            this.setState({ services: response.data });
        })
    }

    getApplets() {
        let userID = localStorage.getItem('userRef');
        Axios.get(`https://staging-area-epitech.herokuapp.com/applets/${userID}`).then((response) => {
            this.setState({ applets: response.data });
        })
    }

    handleGoogle(response) {
        let data = JSON.stringify({
            "user": response
        });
        Axios.post("https://staging-area-epitech.herokuapp.com/google",
            data, { headers: { "Content-Type": "application/json" } })
            .then(function (response) {
                console.log(response);
                localStorage.setItem("userRef", response.data)
                window.location = "./dashboard";
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleFacebook(response) {
        let data = JSON.stringify({
            "user": response
        });
        Axios.post("https://staging-area-epitech.herokuapp.com/facebook/",
            data, { headers: { "Content-Type": "application/json" } })
            .then(function (response) {
                console.log(response);
                localStorage.setItem("userRef", response.data)
                window.location = "./dashboard";
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

    handleTwitter = (response) => {
        console.log("Twitter handled !!");
        console.log(response.headers)
        window.location = './dashboard';
    };

    onSpotifySuccess = (document) => {
        console.log(document);
        // localStorage.setItem("userRef", response.data)
        window.location = './dashboard';
    }

    onTwitchSucess = (document) => {
        console.log(document);
        // localStorage.setItem("userRef", response.data)
        window.location = './dashboard';
    }

    onFailed = (error) => {
        console.log(error);
    };

    handleTabChange = (event, tab) => {
        this.setState({ tab });
    }

    CheckLogin(response) {
        let GetUserRef = localStorage.getItem('userRef');

        Axios.get("https://staging-area-epitech.herokuapp.com/social?userRef=" + GetUserRef,
            { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                let arrtmp = [response.data.facebook, response.data.twitter, response.data.google, response.data.twitch, response.data.spotify, true];
                this.setState({ 'login': arrtmp });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onFailed = (error) => {
        console.log(error);
    };

    render() {
        const { classes } = this.props;
        const applets = this.state.applets;
        const services = this.state.services;
        let appletsArray = [];
        let servicesArray = [];

        if (applets.length === 0) {
            appletsArray = <Typography variant="h3" color="textPrimary" align="center" className={classes.noApplet}>You have no applets for now</Typography>
        } else {
            for (let i = 0; i < applets.length; i++) {
                appletsArray.push(<Grid item xs key={applets[i].name}><Applet className={classes.Applet} {...applets[i]} /></Grid>);
            }
        }

        if (services.length === 0) {
            servicesArray = <Typography variant="h3" color="textPrimary" align="center" className={classes.noApplet}>You have register to zero services for now</Typography>
        } else {
            for (let i = 0; i < services.length; i++) {
                if (this.state.login[i] === true) {
                    servicesArray.push(<Service {...services[i]} key={services[i].name} />);
                }
                else {
                    if (i === 0) {
                        servicesArray.push(
                            <FacebookLogin
                                appId="410435456195867"
                                autoLoad={false}
                                fields="name,email,picture"
                                cssClass="btn-Facebook btn-Service"
                                textButton={<Icon className={classNames(classes.icon, 'fab fa-10x fa-facebook-f')} />}
                                icon=""
                                callback={this.handleFacebook} />
                        );
                    }
                    if (i === 1) {
                        servicesArray.push(
                            <TwitterLogin
                                loginUrl="https://staging-area-epitech.herokuapp.com/auth/twitter"
                                onFailure={this.onFailed} onSuccess={this.handleTwitter}
                                className="btn-Service btn-Twitter"
                                showIcon={false}
                                text={<Icon className={classNames(classes.icon, 'fab fa-10x fa-twitter')} />}
                                requestTokenUrl="https://staging-area-epitech.herokuapp.com/auth/twitter/reverse" />
                        );
                    }
                    if (i === 2) {
                        servicesArray.push(
                            <GoogleLogin
                                clientId="9362814247-tpm4oqu7grb318iuqtu2frdbmv3iu9mq.apps.googleusercontent.com"
                                onFailure={this.onFailed} onSuccess={this.handleGoogle}
                                className="btn-Service btn-Google btn-Google-left"
                                icon=""
                                buttonText={<Icon className={classNames(classes.icon, 'fab fa-10x fa-google')} />} />
                        );
                    }
                    if (i === 3) {
                        servicesArray.push(
                            <TwitchButton
                                onFailure={this.onFailed}
                                onSuccess={this.onTwitchSucess}
                                btnstyle='btn-Service btn-Twitch'
                                btnlogo='fab fa-10x fa-twitch' />
                        );
                    }
                    if (i === 4) {
                        servicesArray.push(
                            <SpotifyButton
                                onFailure={this.onFailed}
                                onSuccess={this.onSpotifySuccess}
                                btnstyle='btn-Service btn-Spotify-Service'
                                btnlogo='fab fa-10x fa-spotify' />
                        );
                    }
                }
            }
        }

        return (
            <div classes={classes.main}>
                <AppBar style={{ background: "#f5f5f5", color: "#0f0f0f" }} position="static">
                    <Toolbar>
                        <Typography variant="h4" color="inherit">Area</Typography>
                        <IconButton color="inherit" aria-label="Add Applet" className={classes.AddIcon} style={{ marginTop: "10px", marginRight: "40px" }} href="./createApplet">
                            <AddIcon />
                            <Typography variant="h6" color="inherit" style={{ marginLeft: "3px" }}> Create Applet</Typography>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Tabs fullWidth value={this.state.tab} onChange={this.handleTabChange} style={{ background: "#f5f5f5", color: "#0f0f0f" }}>
                    <Tab label="Applets" />
                    <Tab label="Services" />
                </Tabs>
                {this.state.tab === 0 && <Grid container spacing={16} className={classes.grid}>{appletsArray}</Grid>}
                {this.state.tab === 1 && <Grid container spacing={0} className={classes.grid}>{servicesArray}</Grid>}
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
