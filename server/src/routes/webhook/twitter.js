const request = require('request');

const action = require('../applets/actions')

module.exports = function (router, usersRef) {

	router.get('/webhooks/twitter', function(req, res) {
		var crc_token = req.query.crc_token
		if (crc_token) {
			var hash = crypto.createHmac('sha256', 'P4kwpMLWumpxlzlAMtMFRtTBh25VVyjGElHoJrjBkNQgUDFHey').update(crc_token).digest('base64')
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
	// router.post('/salut', function(req, res) {

		// req = { body : { for_user_id: '1964628600',
		// 	favorite_events: [ { id: '54b62dfcf5f92e83871ab37600c0a6c7',
		// 	created_at: 'Fri Mar 08 09:47:20 +0000 2019',
		// } ] } }

		// console.log(req.body)
		// console.log("||||||||||")
		// console.log(req.body.for_user_id)

		searchApplet(req.body, req.body.for_user_id);

		// usersRef.orderByChild("twitter/id").equalTo(req.body.user.id).once("value")
		// 				.then(function (snapShot) {
		// 					if (snapShot.val()) {
		// 						let cons_token = snapShot.val().token;
		// 						let secret_token = snapShot.val().refreshToken;
		// 						console.log(token, refreshToken);
		// 					} else {
		// 						console.log("no found");
		// 						return;
		// 					}
		// 					res.status(200).send();
		// 				})

		// if (req.body["favorite_events"])
		// 	console.log("favorited !!")
		// 	// postTweet(cons_token, refreshToken);
		// else if (req.body["tweet_create_events"])
		// 	console.log("tweet !!")
		res.status(200).send();
	})

	function searchApplet(webhook, userId) {
		usersRef.once('value')
				.then(function (snapshot) {
					snapshot.forEach(function(childSnapshot) {
						if (childSnapshot.val().twitter && childSnapshot.val().twitter.id == userId) {
							if (childSnapshot.val().applets) {
								childSnapshot.val().applets.forEach(function (appletsnap) {
									if (appletsnap.serviceToID == 1 && appletsnap.on) {
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
