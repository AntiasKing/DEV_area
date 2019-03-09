const request = require('request');

module.exports = function (router, usersRef) {

	router.get('/webhooks/twitch/follows', function(req, res) {
		console.log(req.body);
		console.log("TestTestTestTestTestTest3");
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
		} else if (req.body.data !== undefined) {
			usersRef.once('value')
					.then(function (snapshot) {
						snapshot.forEach(function (childSnapshot) {
							if (childSnapshot.val().twitch) {
								if (childSnapshot.val().twitch.id === req.body.data.from_id) {
									if (childSnapshot.val().applets) {
										childSnapshot.val().applets.forEach(function (appletsnap) {
											if (appletsnap.val().serviceID === 3 && appletsnap.val().actionID === 0) {

											}
										})
									}
								} else if (childSnapshot.val().twitch.id === req.body.data.to_id) {
									if (childSnapshot.val().applets) {
										childSnapshot.val().applets.forEach(function (appletsnap) {
											if (appletsnap.val().serviceID === 3 && appletsnap.val().actionID === 1) {

											}
										})
									}
								}
							}
						})
					})
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