import React from 'react';
import { withStyles, Grid, Paper, Typography } from '@material-ui/core';

const styles = theme => ({
    main: {
    },
    paper: {
        height: "200px",
        padding: "30px",
        margin: "10px",
    },
    title: {
        "font-size": "1.125em",
        "font-weight": "800",
        "color": "white",
    },
    description: {
        "font-size": "1em",
        "font-weight": "700",
        "color": "#999999",
        "margin-top": "1em",
        "margin-left": "1em",
    }
});

class Reaction extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid item className={classes.main}>
                <Paper className={classes.paper} style={{ background: this.props.color }} onClick={this.props.onClick}>
                    <Typography className={classes.title} align="justify" variant="title">{this.props.name}</Typography>
                    <Typography className={classes.description} align="justify" variant="body2">{this.props.description}</Typography>
                </Paper>
            </Grid>
        );
    }
}

export default withStyles(styles)(Reaction);