import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardContent, CardActionArea, Typography } from '@material-ui/core';
import { loadCSS } from 'fg-loadcss/src/loadCSS';

const styles = theme => ({
    Card: {
        width: 380,
        height: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 1,
        marginRight: theme.spacing.unit * 1,
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

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.Card} color="primary" >
                <CardActionArea>
                    <CardContent>
                        <Typography variant="h4" paragraph>{this.props.name}</Typography>
                        <Typography variant="h6" paragraph>{this.props.description}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card >);
    }
};

export default withStyles(styles)(Applet);