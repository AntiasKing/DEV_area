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
		var options = { method: 'POST',
			url: 'https://api.twitter.com/1.1/favorites/create.json',
			qs: { id: webhook["tweet_create_events"][0].id_str },
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
	},

	retweetTweet: function(user, webhook) {
		var options = { method: 'POST',
			url: 'https://api.twitter.com/1.1/statuses/retweet/' + webhook["tweet_create_events"][0].id_str + '.json',
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
	},

	// sendPrivateMessage: function(user, webhook, message) {
	// 	var options = { method: 'POST',
	//   url: 'https://api.twitter.com/1.1/direct_messages/events/new.json',
	//   headers:
	//    { 'Postman-Token': '4d8235b9-9348-4ef1-8cd4-c104077be2d7',
	//      'Cache-Control': 'no-cache',
	//      Authorization: 'OAuth oauth_consumer_key=\\"BUai9dWTe9p2DDxhulZx6yoXq\\",oauth_token=\\"1964628600-O0QxZYPVL4STkQLZxfz6hWeDiQKcu1aHHTRbucb\\",oauth_signature_method=\\"HMAC-SHA1\\",oauth_timestamp=\\"1552136180\\",oauth_nonce=\\"GyUZVmurWoo\\",oauth_version=\\"1.0\\",oauth_signature=\\"sy900XNnQAQerTcRtfRiT1w39Fk%3D\\"',
	//      'Content-Type': 'application/json' },
	//   body:
	//    { event:
	//       { type: 'message_create',
	//         message_create:
	//          { target: { recipient_id: '1964628600' },
	//            message_data: { text: 'test message' } } } },
	//   json: true };
	//
	// 	request(options, function (error, response, body) {
	// 	  if (error) throw new Error(error);
	//
	// 	  console.log(body);
	// 	});
	// }


	sendPrivateMessage: function(user, webhook, message) {
		console.log("send !!");
		var options = { method: 'POST',
			url: 'https://api.twitter.com/1.1/direct_messages/events/new.json',
			headers:
			 { 'Content-Type': 'application/json' },
			 oauth: {
					 consumer_key: 'BUai9dWTe9p2DDxhulZx6yoXq',
					 consumer_secret: 'P4kwpMLWumpxlzlAMtMFRtTBh25VVyjGElHoJrjBkNQgUDFHey',
					 token: user.twitter.token,
					 token_secret: user.twitter.refreshToken
			 },
			 body: {"event": {"type": "message_create", "message_create": {"target": {"recipient_id": "1964628600"}, "message_data": {"text": "salut"}}}},
			form: { url: 'https://staging-area-epitech.herokuapp.com/webhooks/twitter' } };

		request(options, function (error, response, body) {
			if (error) throw new Error(error);

			console.log(body);
		});
	}

}
