import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardHeader, CardContent, CardActionArea, CardActions, Icon, Typography, Switch, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import classNames from 'classnames';
import Axios from 'axios';

const styles = theme => ({
    Card: {
        width: 380,
        height: 'auto',
        display: 'block', // Fix IE 11 issue.
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginTop: theme.spacing.unit * 8,
        flexDirection: 'column',
        padding: '0',
    },
    icon: {
        overflow: 'visible'
    },
});

class Applet extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            on: props.on
        };
    }

    componentDidMount() {
        loadCSS(
            "https://use.fontawesome.com/releases/v5.6.1/css/all.css",
            document.querySelector('#insertion-point-jss'),
        );
    }

    ChangeStatus() {
        Axios.put("https://staging-area-epitech.herokuapp.com/applet/" + localStorage.getItem('userRef') + "/" + this.props.id + "/toggle")
            .then((response) => {
                console.log("The status of the applet has been edited");
                this.setState({ on: !this.state.on });
            }).catch(function (error) {
                console.log(error);
            })
    }

    DeleteApplets() {
        Axios.delete("https://staging-area-epitech.herokuapp.com/applet/" + localStorage.getItem('userRef') + "/" + this.props.id)
            .then((response) => {
                console.log("An applet has been deleted");
                window.location = './dashboard';
            }).catch(function (error) {
                console.log(error);
            })
    }

    handleSwitchChange = event => {
        this.setState({ on: event.target.checked });
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.Card} color="primary" style={{ background: this.props.color }}>
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h4" paragraph>When {this.props.actionName}: {this.props.reactionName}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{ background: "rgba(0, 0, 0, 0.3)", padding: "0px 20px 0px 20px" }}>
                    <Icon
                        className={classNames(classes.icon, this.props.icon)}
                        color="inherit"
                        fontSize="medium"
                    />
                    <CardHeader
                        title={this.props.serviceName}
                        titleTypographyProps={{ variant: "h6", color: "textPrimary" }}
                    />
                    <Switch
                        color="secondary"
                        checked={this.props.on}
                        onClick={this.ChangeStatus.bind(this)}
                    />
                    <IconButton aria-label="Delete" onClick={this.DeleteApplets.bind(this)}>
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card >);
    }
};

export default withStyles(styles)(Applet);