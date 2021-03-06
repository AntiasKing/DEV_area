import React from 'react';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core';

const styles = theme => ({});

class TwitchButton extends React.Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    };

    onClick() {
        let popup = window.open('', '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + 600 + ', height=' + 400 + ', top=' + 100 + ', left=' + 100);
        popup.location = 'https://id.twitch.tv/oauth2/authorize?client_id=gh2sbdqqplvq5qa89ze2h6e6zb4tur&redirect_uri=https://staging-area-epitech.herokuapp.com/auth/twitch&response_type=code&scope=user:read:email';
        let polling = setInterval(() => {
            if (!popup || popup.closed || popup.closed == undefined) {
                clearInterval(polling);
                this.props.onFailure(new Error('Popup has been closed by user'));
            }
            try {
                if (!popup.location.hostname.includes('id.twitch.tv') && !popup.location.hostname == '') {
                    let query = new URLSearchParams(popup.location.search);
                    let user = query.get('user');
										let refKey = query.get('refKey');
                    clearInterval(polling);
                    popup.close();
                    this.props.onSuccess(user, refKey);
                }
            } catch (error) {
            }
        }, 500);
    };

    render() {
        const { classes } = this.props;

        return (
            <button onClick={this.onClick} className={ classNames(this.props.btnstyle) }>
                <Icon showIcon={false} className={ classNames(this.props.btnlogo)} />
            </button>
        );
    }
};

export default withStyles(styles)(TwitchButton);
