const request = require('request');
const sgMail = require('@sendgrid/mail');

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
		if (!webhook)
			return;
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
		if (!webhook)
			return;
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

	sendPrivateMessage: function(user, message) {
		var options = { method: 'POST',
	  url: 'https://api.twitter.com/1.1/direct_messages/events/new.json',
	  headers: {'Content-Type': 'application/json'},
		oauth: {
				consumer_key: 'BUai9dWTe9p2DDxhulZx6yoXq',
				consumer_secret: 'P4kwpMLWumpxlzlAMtMFRtTBh25VVyjGElHoJrjBkNQgUDFHey',
				token: user.twitter.token,
				token_secret: user.twitter.refreshToken
		},
	  body:
	   { event:
	      { type: 'message_create',
	        message_create:
	         { target: { recipient_id: '1964628600' },
	           message_data: { text: message } } } },
	  json: true };

		request(options, function (error, res, body) {
		  if (error) throw new Error(error);

		  console.log(body);
		});
	},

	/* Gmail */

	sendEmail: function(user, applet) {
		console.log("okok");
		sgMail.setApiKey('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');
		const msg = {
			to: applet.to,
			from: 'ok@ok.com',
			subject: applet.object,
			text: applet.email
		};
		sgMail.send(msg);
	},

}
