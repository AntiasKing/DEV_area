import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Card, CardHeader, CardContent } from '@material-ui/core';

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
    CardHeader: {
    },
    CardHeaderRoot: {
        background: "cornflowerblue"
    },
    CardContent: {

    }
});

function Service(props) {
    const { classes } = props;
    return (
        <Card className={classes.Card}>
            <CardHeader title={props.name} className={classes.CardHeader} classes={{ root: classes.CardHeaderRoot, }}></CardHeader>
            <CardContent className={classes.CardContent}>Create a new Widget for {props.name} services</CardContent>
        </Card>
    );
}

export default withStyles(styles)(Service);
