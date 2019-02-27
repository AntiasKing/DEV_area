import React from 'react';
import classNames from 'classnames';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core';

const styles = theme => ({})

class SpotifyButton extends React.Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);

	};

	onClick() {
		let popup = window.open('', '', 'toolbar=no, location=no');
		popup.location = 'https://accounts.spotify.com/authorize'+'?response_type=code'+'&client_id=d6606813f1904768bb612bf21e76d04f'+'&scope='+'user-read-private user-read-email'+'&redirect_uri='+'http://localhost:8080/auth/spotify';

		let polling = setInterval(() => {
			if	(!popup || popup.closed || popup.closed === undefined) {
				clearInterval(polling);
				this.props.onFailure(new Error('Popup has been closed by user'));
			}
			try {
				if (!popup.location.hostname.includes('accounts.spotify.com') && !popup.location.hostname == '') {
					let query = new URLSearchParams(popup.location.search);
					let accessToken = query.get('access_token')
					clearInterval(polling);
					popup.close();
					this.props.onSuccess(accessToken);
				}
			} catch (error) {

			}
		}, 500);
	};

	render() {
		const { classes } = this.props;

		return (
			<button
            	onClick={this.onClick}
                className="Ext-Login btn-Spotify">
                <Icon className={classNames(classes.icon, 'fa fa-spotify')} />
        	</button>
		)
	}
};

export default withStyles(styles)(SpotifyButton);