import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button, Grid, Icon, Typography } from '@material-ui/core';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import classNames from 'classnames';

const styles = theme => ({
    service: {
        height: "300px",
    },
    icon: {
        overflow: "visible",
        color: "white",
        position: "absolute"
    },
    name: {
        position: "absolute",
        bottom: "0px",
        color: "white"
    }
});

class Service extends React.Component {
    componentDidMount() {
        loadCSS(
            "https://use.fontawesome.com/releases/v5.6.1/css/all.css",
            document.querySelector('#insertion-point-jss'),
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid item xs={3}>
                <Button
                    className={classes.service}
                    size='large'
                    fullWidth
                    style={{ background: this.props.color }}
                    onClick={this.props.onClick}>
                    <Icon className={classNames(classes.icon, "fa-10x " + this.props.icon)} />
                    <Typography className={classes.name} variant="title">{this.props.name}</Typography>
                </Button>
            </Grid>
        );
    }
}

export default withStyles(styles)(Service);