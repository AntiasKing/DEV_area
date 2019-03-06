import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Applet from './Applet';
import Service from './Service';
import { AppBar, Typography, Toolbar, IconButton, Grid, Tabs, Tab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';
import Axios from 'axios';

const user = {
    "username": "Test",
    "email": "test@test.test",
    "applets": [
        {
            "name": "Facebook",
            "service": "facebook",
            "action": "receive a message",
            "reaction": "send an email",
            "color": "#3b5998",
            "icon": "fab fa-facebook-f", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Twitter",
            "service": "twitter",
            "action": "receive a message",
            "reaction": "send an email",
            "color": "#00acee",
            "icon": "fab fa-twitter", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Twitch",
            "service": "twitch",
            "action": "receive a message",
            "reaction": "send an email",
            "color": "#6441a5",
            "icon": "fab fa-twitch", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Spotify",
            "service": "spotify",
            "action": "receive a message",
            "reaction": "send an email",
            "color": "#1DB954",
            "icon": "fab fa-spotify", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Weather",
            "service": "weather",
            "action": "receive a message",
            "reaction": "send an email",
            "color": "#333",
            "icon": "fas fa-cloud-sun", // Font Awesome icon name
            "on": true
        },
    ],
    "services": [{
        "name": "facebook",
        "color": "#3b5998",
        "icon": "fab fa-facebook-f"
    },
    {
        "name": "twitter",
        "color": "#00aced",
        "icon": "fab fa-twitter"
    },
    {
        "name": "google",
        "color": "#dd4b39",
        "icon": "fab fa-google"
    },
    {
        "name": "Twitch",
        "color": "#6441a5",
        "icon": "fab fa-twitch"
    },
    {
        "name": "spotify",
        "color": "#1DB954",
        "icon": "fab fa-spotify"
    },
    {
        "name": "Weather",
        "color": "#333",
        "icon": "fas fa-cloud-sun"
    },
    ],
}

const styles = theme => ({
    main: {
        overflow: 'hidden',
    },
    AddIcon: {
        position: "absolute",
        right: "0px"
    },
    noApplet: {
        // TODO:: Center vertically
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
            applets: user.applets,
            services: user.services,
            login: [ false, false, false, false, false, true ],
            tab: 0,
        }
        this.CheckLogin();
    }

    handleTabChange = (event, tab) => {
        this.setState({ tab });
    }

    CheckLogin(response) {
        let GetUserRef = localStorage.getItem('userRef');

        Axios.get("http://localhost:8080/social?userRef=" + GetUserRef,
            { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                let arrtmp = [ response.data.facebook, response.data.twitter, response.data.google, response.data.twitch, response.data.spotify ];
                this.setState({ 'login': arrtmp });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                    // mettre le service de connection
                    servicesArray.push("pas connecté");
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
                            <Typography variant="h6" color="inherit" style={{ marginLeft: "3px"}}> Create Applet</Typography>
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