import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar, Typography, Toolbar, IconButton, Stepper, Step, StepLabel, Grid, Button, CardActions } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Service from './Service';
import Action from './Action';
import Reaction from './Reaction';

// TODO in future will be send by server
const config = {
    "services": [
        {
            "name": "facebook",
            "color": "#3b5998",
            "icon": "fab fa-facebook-f",
            "actions": [{
                "name": "new_message_in_group",
                "description": "Un nouveau message est poste dans le groupe"
            }, {
                "name": "new_message_inbox ",
                "description": "Un nouveau message prive est recu par l’utilisateur"
            }],
            "reactions": [{
                "name": "like_message",
                "description": "L’utilisateur aime un message"
            }]
        },
        {
            "name": "twitter",
            "color": "#00aced",
            "icon": "fab fa-twitter",
            "actions": [],
            "reactions": []
        },
        {
            "name": "google",
            "color": "#dd4b39",
            "icon": "fab fa-google",
            "actions": [],
            "reactions": []
        },
        {
            "name": "Twitch",
            "color": "#6441a5",
            "icon": "fab fa-twitch",
            "actions": [],
            "reactions": []
        },
        {
            "name": "spotify",
            "color": "#1DB954",
            "icon": "fab fa-spotify",
            "actions": [],
            "reactions": []
        },
        {
            "name": "Weather",
            "color": "#333",
            "icon": "fas fa-cloud-sun",
            "actions": [{
                "name": "it's rainy tomorrow",
                "description": "Détecte si il pleut demain"
            }],
            "reactions": [{
                "name": "like_message",
                "description": "L’utilisateur aime un message"
            }]
        },
    ]
};

const styles = theme => ({
    grid: {
        flexGrow: 1,
    },

    GoBack: {
        textAlign: 'center',
        margin: "auto",
        marginTop: "150px",
    },

    GoBackLink: {
        justifyContent: 'center',
    }
});

function getSteps() {
    return ['Select a service', 'Select an action', 'Select a reaction', 'Good Job'];
}

class AppletDesigner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            serviceSelected: "",
            actionSelected: "",
            reactionName: "",
            skipped: new Set(),
        }
    }

    componentDidMount() {
        loadCSS(
            "https://use.fontawesome.com/releases/v5.6.1/css/all.css",
            document.querySelector('#insertion-point-jss'),
        );
    }

    handleClickService(serviceName) {
        this.setState({ activeStep: this.state.activeStep + 1, serviceSelected: serviceName });
    }

    handleClickAction(actionName) {
        this.setState({ activeStep: this.state.activeStep + 1, actionSelected: actionName });
    }

    handleClickReaction(reactionName) {
        this.setState({ activeStep: this.state.activeStep + 1, reactionSelected: reactionName })
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <div>
                <header>
                    <AppBar style={{ background: "#f5f5f5", color: "#0f0f0f" }} position="static">
                        <Toolbar>
                            <Typography variant="h4" color="inherit">Area</Typography>
                            <IconButton color="inherit" aria-label="Add Widget" className={classes.AddIcon} style={{ marginLeft: "10px" }} href="./dashboard">
                                <BackIcon />
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                </header>
                <div>
                    <Stepper activeStep={activeStep}>
                        {
                            steps.map((label, index) => {
                                const props = {};
                                const labelProps = {};
                                return (
                                    <Step key={label} {...props}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                )
                            })
                        }
                    </Stepper>
                    <div>
                        {((activeStep) => {
                            if (activeStep === 0) {
                                return (
                                    <Grid className={classes.grid} container spacing={0}>
                                        {config.services.map((s, index) => {
                                            return <Service key={index} {...s} onClick={() => this.handleClickService(s.name)} />
                                        })}
                                    </Grid>
                                )
                            } else if (activeStep === 1) {
                                return (
                                    <Grid className={classes.grid} container spacing={8}>
                                        {
                                            config
                                                .services
                                                .find(s => s.name === this.state.serviceSelected)
                                                .actions
                                                .map((a, index) => {
                                                    return <Action key={index} {...a} onClick={() => this.handleClickAction(a.name)} color={config.services.find(s => s.name === this.state.serviceSelected).color} />
                                                })
                                        }
                                    </Grid>
                                )
                            } else if (activeStep === 2) {
                                return (
                                    <Grid className={classes.grid} container spacing={8}>
                                        {
                                            config
                                                .services
                                                .find(s => s.name === this.state.serviceSelected)
                                                .reactions
                                                .map((r, index) => {
                                                    return <Reaction key={index} {...r} onClick={() => this.handleClickReaction(r.name)} color={config.services.find(s => s.name === this.state.serviceSelected).color} />
                                                })
                                        }
                                    </Grid>
                                )
                            } else {
                                return (
                                    <div>
                                        <Typography className={classes.GoBack} variant="h1"> Good Job</Typography>
                                        <CardActions className={classes.GoBackLink}>
                                        <Button color="primary" href="./dashboard"> Go back to your dashboard</Button>
                                        </CardActions>
                                    </div>
                                )
                            }
                        })(activeStep)}
                    </div>
                </div>
            </div>
        );
    };
};

export default withStyles(styles)(AppletDesigner);