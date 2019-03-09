const request = require('request');
const action = require('../applets/actions')

module.exports = function (router, usersRef) {

	router.get('/webhooks/twitch/follows', function(req, res) {
		if (req.query['hub.challenge'] !== undefined) {
			return res.status(200).send(req.query['hub.challenge']);
		}

	});
	router.post('/webhooks/twitch/follows', function(req, res) {
		if (req.body.data !== undefined) {
			console.log(req.body);
			console.log(req.body.data.from_id);
			usersRef.once('value')
					.then(function (snapshot) {
						snapshot.forEach(function (childSnapshot) {
							if (childSnapshot.val().twitch) {
								if (childSnapshot.val().twitch.id === req.body.data.from_id) {
									if (childSnapshot.val().applets) {
										childSnapshot.val().applets.forEach(function (appletsnap) {
											if (appletsnap.val().serviceID === 3 && appletsnap.val().actionID === 0 && appletsnap.val().on) {
												action.detectTwitchAction(req.body, appletsnap, childSnapshot.val());
											}
										})
									}
								} else if (childSnapshot.val().twitch.id === req.body.data.to_id && appletsnap.val().on) {
									if (childSnapshot.val().applets) {
										childSnapshot.val().applets.forEach(function (appletsnap) {
											if (appletsnap.val().serviceID === 3 && appletsnap.val().actionID === 1) {
												action.detectTwitchAction(req.body, appletsnap, childSnapshot.val());
											}
										})
									}
								}
							}
						})
					})
			return res.status(200).send('OK');
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