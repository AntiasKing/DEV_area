import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardHeader, CardContent, Icon, Typography, Switch } from '@material-ui/core';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import classNames from 'classnames';

const styles = theme => ({
    Card: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginTop: theme.spacing.unit * 8,
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
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

    handleSwitchChange = name => event => {
        this.setState({ on: event.target.checked });
    }

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.Card} color="primary" style={{ background: this.props.color }}>
                <CardHeader
                    title={this.props.name}
                    titleTypographyProps={{ variant: "h4", color: "textPrimary" }}
                    avatar={
                        <Icon
                            className={classNames(classes.icon, this.props.icon)}
                            color="inherit"
                            fontSize="large" />}
                />
                <CardContent>
                    <Typography variant="h3" align="right" paragraph>{this.props.action} when you {this.props.reaction}</Typography>
                    <Switch
                        color="secondary"
                        checked={this.state.on}
                        onChange={this.handleSwitchChange("on")}
                    />
                </CardContent>
            </Card >);
    }
};

export default withStyles(styles)(Applet);