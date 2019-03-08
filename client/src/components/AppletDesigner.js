import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar, Typography, Toolbar, IconButton, Stepper, Step, StepLabel, Grid, Button, CardActions } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Service from './Service';
import Axios from 'axios';

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
            skipped: new Set(),
            services: [],
            servicesName: "",
            login: [false, false, false, false, false, true],
        }
        this.CheckLogin();
        this.getServices();
    }

    getServices() {
        Axios.get('https://staging-area-epitech.herokuapp.com/services').then((response) => {
            this.setState({ services: response.data });
        })
    }

    componentDidMount() {
        loadCSS(
            "https://use.fontawesome.com/releases/v5.6.1/css/all.css",
            document.querySelector('#insertion-point-jss'),
        );
    }

    handleClickService(serviceName) {
        this.setState({ activeStep: this.state.activeStep + 1, servicesName: serviceName });
    }

    handleClickAction(actionName) {
        this.setState({ activeStep: this.state.activeStep + 1 });
    }

    handleClickReaction(reactionName) {
        this.setState({ activeStep: this.state.activeStep + 1 })
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

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const services = this.state.services;
        let servicesArray = [];

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
                                for (let i = 0; i < services.length; i++) {
                                    if (this.state.login[i] === true) {
                                        servicesArray.push(<Service {...services[i]} key={services[i].name} onClick={() => (this.handleClickService(services[i].name))} />);
                                    }
                                }
                                return (
                                    <div>{<Grid container spacing={0} className={classes.grid}>{servicesArray}</Grid>}</div>
                                )
                            } else if (activeStep === 1) {
                                for (let i = 0; i < services.length; i++) {
                                    if (this.state.servicesName === services[i].name) {
                                        console.log(services[i].actions[0].name);
                                    }
                                }
//                                console.log(services[0].actions[0].name);
                                return (
                                    <Grid className={classes.grid} container spacing={0}></Grid>
                                )
                            } else if (activeStep === 2) {
                                return (
                                    <Grid className={classes.grid} container spacing={0}>prout</Grid>
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