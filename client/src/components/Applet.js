import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardHeader, CardContent, CardActionArea, CardActions, Icon, Typography, Switch } from '@material-ui/core';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import classNames from 'classnames';

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

    handleSwitchChange = name => event => {
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
                        checked={this.state.on}
                        onChange={this.handleSwitchChange("on")}
                    />
                </CardActions>
            </Card >);
    }
};

export default withStyles(styles)(Applet);