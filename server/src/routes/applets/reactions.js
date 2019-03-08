const request = require('request');

module.exports = {

	/* Twitter */

	postTweet: function(user, message) {
		var options = { method: 'POST',
			url: 'https://api.twitter.com/1.1/statuses/update.json',
			qs: { status: message },
			headers:
			 { 'Content-Type': 'application/x-www-form-urlencoded' },
			 oauth: {
					 consumer_key: 'BUai9dWTe9p2DDxhulZx6yoXq',
					 consumer_secret: 'P4kwpMLWumpxlzlAMtMFRtTBh25VVyjGElHoJrjBkNQgUDFHey',
					 token: user.twitter.token,
					 token_secret: user.twitter.refreshToken
			 },
			form: { url: 'https://staging-area-epitech.herokuapp.com/webhooks/twitter' } };

		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			console.log(body);
		});
	},

	starredTweet: function(user, webhook) {
		console.log(webhook.id);
		var options = { method: 'POST',
			url: 'https://api.twitter.com/1.1/favorite/create.json',
			qs: { id: webhook.id },
			headers:
			 { 'Content-Type': 'application/json' },
			 oauth: {
					 consumer_key: 'BUai9dWTe9p2DDxhulZx6yoXq',
					 consumer_secret: 'P4kwpMLWumpxlzlAMtMFRtTBh25VVyjGElHoJrjBkNQgUDFHey',
					 token: user.twitter.token,
					 token_secret: user.twitter.refreshToken
			 },
			form: { url: 'https://staging-area-epitech.herokuapp.com/webhooks/twitter' } };

		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			console.log(body);
		});
	}

}
