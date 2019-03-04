const request = require('request');

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
		console.log(req.body)
		if (req.body["favorite_events"])
			console.log("favorite !!")
		else if (req.body["tweet_create_events"])
			console.log("tweet !!")
		// postTweet();
		res.status(200).send();
	})

	function postTweet() {
		var options = { method: 'POST',
			url: 'https://api.twitter.com/1.1/statuses/update.json',
			qs: { status: 'I starred a new tweet !!' },
			headers:
			 { 'Content-Type': 'application/x-www-form-urlencoded' },
			 oauth: {
					 consumer_key: 'BUai9dWTe9p2DDxhulZx6yoXq',
					 consumer_secret: 'P4kwpMLWumpxlzlAMtMFRtTBh25VVyjGElHoJrjBkNQgUDFHey',
					 token: '1964628600-O0QxZYPVL4STkQLZxfz6hWeDiQKcu1aHHTRbucb',
					 token_secret: 'zlShdg6PqAj1ryGdMDoaNPrwrNZNVJ5DTWQUfh9OsJfFf'
			 },
			form: { url: 'https://staging-area-epitech.herokuapp.com/webhooks/twitter' } };

		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			console.log(body);
		});
	}

}
