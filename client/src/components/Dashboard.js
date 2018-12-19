import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Applet from './Applet';
import { AppBar, Typography, Toolbar, IconButton, Grid } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';

// TODO in future will be send by server
const config = {
    "services": [
        {
            "name": "facebook",
            "actions": [],
            "reactions": []
        },
        {
            "name": "twitter",
            "actions": [],
            "reactions": []
        },
        {
            "name": "youtube",
            "actions": [],
            "reactions": []
        }
    ]
};

const user = {
    "username": "Test",
    "email": "test@test.test",
    "applets": [
        {
            "name": "Hello World",
            "service": "facebook",
            "action": "receive a message",
            "reaction": "send an email",
            "icon": "fab fa-google", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Bonjour",
            "service": "google",
            "action": "receive a message",
            "reaction": "send an email",
            "icon": "fab fa-facebook-f", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Hello",
            "service": "google",
            "action": "receive a message",
            "reaction": "send an email",
            "icon": "fab fa-facebook-f", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Maman",
            "service": "google",
            "action": "receive a message",
            "reaction": "send an email",
            "icon": "fab fa-facebook-f", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Maman1",
            "service": "google",
            "action": "receive a message",
            "reaction": "send an email",
            "icon": "fab fa-facebook-f", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Maman2",
            "service": "google",
            "action": "receive a message",
            "reaction": "send an email",
            "icon": "fab fa-facebook-f", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Maman3",
            "service": "google",
            "action": "receive a message",
            "reaction": "send an email",
            "icon": "fab fa-facebook-f", // Font Awesome icon name
            "on": true
        }
    ]
}

const styles = theme => ({
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
        height: 140,
        width: 100,
    }
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            services: config.services,
            applets: user.applets,
        }
    }

    render() {
        const { classes } = this.props;
        const applets = this.state.applets;
        let nameArray = [];

        if (applets.length === 0) {
            nameArray = <Typography variant="h3" color="textPrimary" align="center" className={classes.noApplet}>You have no applets for now</Typography>
        }
        for (let i = 0; i < applets.length; i++) {
            nameArray.push(<Grid item xs key={applets[i].name}><Applet className={classes.Applet} name={applets[i].name} icon={applets[i].icon} action={applets[i].action} reaction={applets[i].reaction} on={applets[i].on} /></Grid>);
        }
        return (
            <React.Fragment>
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">Area</Typography>
                        <IconButton color="inherit" aria-label="Add Widget" className={classes.AddIcon}>
                            <AddIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Grid container spacing={16} className={classes.grid}>{nameArray}</Grid>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Dashboard);