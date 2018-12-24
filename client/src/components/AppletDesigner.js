import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar, Typography, Toolbar, IconButton, Stepper, Step, StepLabel, Grid } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Service from './Service';
import Action from './Action';

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
            "reactions": []
        },
        {
            "name": "twitter",
            "color": "#00aced",
            "icon": "fab fa-twitter",
            "actions": [],
            "reactions": []
        },
        {
            "name": "youtube",
            "color": "#ff0000",
            "icon": "fab fa-youtube",
            "actions": [],
            "reactions": []
        },
        {
            "name": "google",
            "color": "#518ff5",
            "icon": "fab fa-google",
            "actions": [],
            "reactions": []
        },
    ]
};

const styles = theme => ({
    grid: {
        flexGrow: 1,
    },
});

function getSteps() {
    return ['Select a service', 'Select an action', 'Select a reaction'];
}

class AppletDesigner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            serviceSelected: "",
            actionSelected: "",
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
        this.setState({ activeStep: this.state.activeStep + 1, actionSelected: actionName});
    }

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
            <div>
                <header>
                    <AppBar color="primary" position="static">
                        <Toolbar>
                            <Typography variant="h6" color="inherit">Area</Typography>
                            <IconButton color="inherit" aria-label="Add Widget" className={classes.AddIcon} href="./dashboard">
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
                                                    console.log(a);
                                                    return <Action key={index} {...a} onClick={() => this.handleClickAction(a.name)} color={config.services.find(s => s.name === this.state.serviceSelected).color} />
                                                })
                                        }
                                    </Grid>
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