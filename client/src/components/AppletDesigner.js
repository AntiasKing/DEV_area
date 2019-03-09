import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { AppBar, Typography, Toolbar, IconButton, Stepper, Step, StepLabel, Grid, Button, CardActions, TextField } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBack';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Service from './Service';
import SelectApplet from './SelectApplet';
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
    return ['Select a service', 'Select an action', 'Select a reaction Service', 'Select a reaction', 'message', 'Good Job'];
}

class AppletDesigner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            skipped: new Set(),
            services: [],
            servicesID: 0,
            reactionServicesID: 0,
            actionsID: 0,
            reactionsID: 0,
            message: "",
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

    handleClickService(serviceID) {
        this.setState({ activeStep: this.state.activeStep + 1, servicesID: serviceID });
    }

    handleClickReactionService(reactionserviceID) {
        this.setState({ activeStep: this.state.activeStep + 1, reactionServicesID: reactionserviceID });
    }

    handleClickAction(actionID) {
        this.setState({ activeStep: this.state.activeStep + 1, actionsID: actionID });
    }

    handleClickReaction(reactionID, needMessage) {
        if (needMessage === true) {
            this.setState({ activeStep: this.state.activeStep + 1, reactionsID: reactionID })
        } else {
            this.setState({ activeStep: this.state.activeStep + 2, reactionsID: reactionID })
        }
    }

    handleMessage = message => event => {
        this.setState({ [message]: event.target.value });
    };

    handleNextStep() {
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

    SendApplets() {
        let data = JSON.stringify({
            "applet": {
                "serviceToID": this.state.reactionServicesID,
                "serviceID": this.state.servicesID,
                "actionID": this.state.actionsID,
                "reactionID": this.state.reactionsID,
                "message": this.state.message,
//                "interval": this.state.interval,
            }
        });
        console.log(data);
        Axios.post("https://staging-area-epitech.herokuapp.com/applets/" + localStorage.getItem('userRef'),
            data,
            { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    console.log("An Applet has been created");
                }
            }).catch(function (error) {
                console.log(error);
            })
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
                            if (activeStep === 0) { // Services
                                for (let i = 0; i < services.length; i++) {
                                    if (this.state.login[i] === true) {
                                        servicesArray.push(<Service {...services[i]} key={services[i].name} onClick={() => (this.handleClickService(services[i].serviceID))} />);
                                    }
                                }
                                return (
                                    <div>{<Grid container className={classes.grid}>{servicesArray}</Grid>}</div>
                                )
                            } else if (activeStep === 1) { // Actions

                                for (let i = 0; i < services.length; i++) {
                                    if (this.state.servicesID === services[i].serviceID) {
                                        for (let j = 0; services[i].actions[j] ; j++) {
                                            servicesArray.push(<Grid onClick={() => (this.handleClickAction(services[i].actions[j].id))}><SelectApplet {...services[i].actions[j]} /></Grid>);
                                        }
                                    }
                                }
                                return (
                                    <Grid className={classes.grid} container>{servicesArray}</Grid>
                                )
                            } else if (activeStep === 2) { // Reactions Services
                                for (let i = 0; i < services.length; i++) {
                                    if (this.state.login[i] === true) {
                                        servicesArray.push(<Service {...services[i]} key={services[i].name} onClick={() => (this.handleClickReactionService(services[i].serviceID))} />);
                                    }
                                }
                                return (
                                    <div>{<Grid container className={classes.grid}>{servicesArray}</Grid>}</div>
                                )
                            } else if (activeStep === 3) { // Reactions
                                for (let i = 0; i < services.length; i++) {
                                    if (this.state.reactionServicesID === services[i].serviceID) {
                                        for (let j = 0; services[i].reactions[j]; j++) {
                                            servicesArray.push(<Grid onClick={() => (this.handleClickReaction(services[i].reactions[j].id, services[i].reactions[j].needMessage))}><SelectApplet {...services[i].reactions[j]} /></Grid>);
                                        }
                                    }
                                }
                                return (
                                    <Grid className={classes.grid} container>{servicesArray}</Grid>
                                )
                            } else if (activeStep === 4) { // Get Message
                                servicesArray.push(
                                    <Grid>
                                        <TextField
                                            label="Get a message to send"
                                            style={{ margin: "30px" }}
                                            placeholder="Type a message"
                                            variant="outlined"
                                            value={this.state.message}
                                            onChange={this.handleMessage('message')}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <Button variant="contained" color="primary" onClick={this.handleNextStep.bind(this)}>
                                            Send Text
                                        </Button>
                                    </Grid>
                                );
                                return (
                                    <div>{<Grid>{servicesArray}</Grid>}</div>
                                )
                            } else { // Bien Joue
                                this.SendApplets();
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