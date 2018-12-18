import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Service from './Service';

// TODO in future will be send by server
const config = {
    "services": [
        {
            "name": "facebook",
            "actions": [],
            "reactions": []
        },
        {
            "name": "twitter",
            "actions": [],
            "reactions": []
        },
        {
            "name": "youtube",
            "actions": [],
            "reactions": []
        }
    ]
};

const styles = theme => ({
    card: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
});

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            services: config.services
        }
    }

    render() {
        const services = this.state.services;
        let nameArray = [];

        for (let i = 0; i < services.length; i++) {
            nameArray.push(<Service key={services[i].name} name={services[i].name.toUpperCase()} />);
        }
        return (<div>{nameArray}</div>);
    }
}

export default withStyles(styles)(Dashboard);