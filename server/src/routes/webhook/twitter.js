const request = require('request');

const action = require('../applets/actions')
const reaction = require('../applets/reactions')

module.exports = function (router, usersRef) {

	router.get('/webhooks/twitter', function(req, res) {
		var crc_token = req.query.crc_token
		if (crc_token) {
			var hash = crypto.createHmac('sha256', 'bla').update(crc_token).digest('base64')
			res.status(200);
			res.send({
				response_token: 'sha256=' + hash
			})
		} else {
			res.status(400);
			res.send('Error: crc_token missing from request.')
		}
	})

	router.post('/webhooks/twitter', function(req, res) {
		searchApplet(req.body, req.body.for_user_id);
		res.status(200).send();
	})

	function searchApplet(webhook, userId) {
		usersRef.once('value')
				.then(function (snapshot) {
					snapshot.forEach(function(childSnapshot) {
						if (childSnapshot.val().twitter && childSnapshot.val().twitter.id == userId) {
							if (childSnapshot.val().applets) {
								childSnapshot.val().applets.forEach(function (appletsnap) {
									if (appletsnap.serviceID == 1 && appletsnap.on) {
										let user = childSnapshot.val();
										action.detectTwitterAction(webhook, appletsnap, user);
									}
								})
							}
						}
					})
				})
	}

}
