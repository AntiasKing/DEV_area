const request = require('request');

module.exports = {

	/* Twitter */

	postTweet: function(user) {
		var options = { method: 'POST',
			url: 'https://api.twitter.com/1.1/statuses/update.json',
			qs: { status: 'I starred a new tweet !!' },
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
	}

}
