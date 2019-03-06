const request = require('request');

module.exports = function (router, usersRef) {

	function TwitchFollows(twitchID, gain) {
		let user;
		if (gain === -1) {
			user = 'to_id='+twitchID;
		} else {
			user = 'from_id='+twitchID;
		}
		request.post({
			url: 'https://api.twitch.tv/helix/webhooks/hub',
			headers: {
				'Client-ID': 'gh2sbdqqplvq5qa89ze2h6e6zb4tur'
			},
			payload: {
				'hub.callback': 'https://staging-area-epitech.herokuapp.com/webhooks/twitch/follows',
				'hub.mode': 'subscribe',
				'hub.topic': 'https://api.twitch.tv/helix/users/follows?first=1&'+user
			}
		}, function(err, response, body){
			if (err) {
				console.log(err);
				return res.status(500).send(err);
			}
		});
	};

	function streamFollows(twitchID) {
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
	};

	router.post('/webhooks/twitch/follows', function(req, res) {
		console.log(req.body);
		if (req.body.hub.challenge !== undefined) {
			request.post({
				url: 'https://api.twitch.tv/helix/webhooks/hub',
				body: req.body.hub.challenge
			}, function(err, response, body) {
				if (err) {
					console.log(err);
					return res.status(500).send(err);
				}
			});
		}
	});

	router.post('/webhooks/twitch/stream', function(req, res) {
		console.log(req.body);
		if (req.body.hub.challenge !== undefined) {
			request.post({
				url: 'https://api.twitch.tv/helix/webhooks/hub',
				body: req.body.hub.challenge
			}, function(err, response, body) {
				if (err) {
					console.log(err);
					return res.status(500).send(err);
				}
			});
		}
	});
}