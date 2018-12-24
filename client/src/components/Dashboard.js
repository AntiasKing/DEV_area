import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Applet from './Applet';
import Service from './Service';
import { AppBar, Typography, Toolbar, IconButton, Grid, Tabs, Tab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';

const user = {
    "username": "Test",
    "email": "test@test.test",
    "applets": [
        {
            "name": "Hello World",
            "service": "facebook",
            "action": "receive a message",
            "reaction": "send an email",
            "color": "#3b5998",
            "icon": "fab fa-google", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Bonjour",
            "service": "google",
            "action": "receive a message",
            "reaction": "send an email",
            "color": "#00aced",
            "icon": "fab fa-facebook-f", // Font Awesome icon name
            "on": true
        },
        {
            "name": "Hello",
            "service": "google",
            "action": "receive a message",
            "reaction": "send an email",
            "color": "#ff0000",
            "icon": "fab fa-youtube", // Font Awesome icon name
            "on": true
        },
    ],
    "services": [{
        "name": "facebook",
        "color": "#3b5998",
        "icon": "fab fa-facebook-f",
    },
    {
        "name": "twitter",
        "color": "#00aced",
        "icon": "fab fa-twitter",
    },
    {
        "name": "youtube",
        "color": "#ff0000",
        "icon": "fab fa-youtube",
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
        height: 140,
        width: 100,
    }
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applets: user.applets,
            services: user.services,
            tab: 0,
        }
    }

    handleTabChange = (event, tab) => {
        this.setState({ tab });
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
                servicesArray.push(<Service {...services[i]} key={services[i].name} />);
            }
        }
        return (
            <div classes={classes.main}>
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">Area</Typography>
                        <IconButton color="inherit" aria-label="Add Applet" className={classes.AddIcon} href="./createApplet">
                            <AddIcon />
                            <Typography variant="h6" color="inherit" style={{ marginLeft: "3px " }}> Create Applet</Typography>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Tabs fullWidth value={this.state.tab} onChange={this.handleTabChange}>
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