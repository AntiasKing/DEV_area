const request = require('request');

module.exports = {
	TwitchFollows: function(twitchID, gain) {
		console.log("TestTestTestTestTestTest");
		let user;
		if (gain === 0) {
			user = 'to_id='+twitchID;
		} else {
			user = 'from_id='+twitchID;
		}
		console.log(user);
		request.post({
			url: 'https://api.twitch.tv/helix/webhooks/hub',
			headers: {
				'Client-ID': 'gh2sbdqqplvq5qa89ze2h6e6zb4tur',
				'Content-Type': 'application/json'
			},
			'body': {
				'hub.callback': 'https://staging-area-epitech.herokuapp.com/webhooks/twitch/follows',
				'hub.mode': 'subscribe',
				'hub.topic': 'https://api.twitch.tv/helix/users/follows?first=1&'+user
			}
		}, function(err, response, body){
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
			console.log(body);
		});
		console.log("TestTestTestTestTestTest2");
	},
	streamFollows: function(twitchID) {
		request.post({
			url: 'https://api.twitch.tv/helix/webhooks/hub',
			headers: {
				'Client-ID': 'gh2sbdqqplvq5qa89ze2h6e6zb4tur'
			},
			payload: {
				'hub.callback': 'https://staging-area-epitech.herokuapp.com/webhooks/twitch/stream',
				'hub.mode': 'subscribe',
				'hub.topic': 'https://api.twitch.tv/helix/streams?user_id='+twitchID
			}
		}, function(err, response, body){
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	}
}