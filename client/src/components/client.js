import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Button } from '@material-ui/core';

const styles = theme => ({})

class clientAPK extends React.Component {

    render() {

        return (
            <div style={{ margin: "auto", width: "100%" }}>
                <Button 
                variant="contained"
                color="primary"
                href="https://exp.host/@antiaskid/app/builds"
                style={{ marginTop: "300px", marginLeft: "37%", width: "25%", height: "60px" }}
                >Download APK</Button>
            </div>
        );
    }
};

export default withStyles(styles)(clientAPK);