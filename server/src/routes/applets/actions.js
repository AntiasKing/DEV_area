const reaction = require('./reactions')

module.exports = {

  detectTwitterAction: function (webhook, applet, user) {
		if (webhook["favorite_events"] && applet.actionID == 2) {
			this.setServiceAction(applet, user, "I just starred a new tweet", webhook);
		} else if (webhook["tweet_create_events"] && applet.actionID == 0) {
			this.setServiceAction(applet, user, "", webhook)
		}
  },

	detectFacebookAction: function (webhook, applet, user) {
		console.log('===============================');
		console.log(webhook);
		console.log('-------------------------------');
		console.log(webhook.entry);
		console.log('-------------------------------');
		console.log(webhook.entry[0].changes[0])
		console.log('===============================');
		if (webhook.entry[0].changes[0].field == "status")
			this.setServiceAction(applet, user, "I just post a new publication in facebook : " + webhook.entry[0].changes[0].value, webhook)
		// if (webhook["favorite_events"] && applet.actionID == 2) {
		// 	this.setServiceAction(applet, user, "I just starred a new tweet", webhook);
		// } else if (webhook["tweet_create_events"] && applet.actionID == 0) {
		// 	this.setServiceAction(applet, user, "", webhook)
		// }
	},

	setServiceAction: function(applet, user, message, webhook) {
		if (applet.serviceToID == 0)
			this.facebookAction(applet, user, message, webhook);
		else if (applet.serviceToID == 1)
			this.twitterAction(applet, user, message, webhook);
		else if (applet.serviceToID == 2)
			this.googleAction(applet, user, message, webhook);
		else if (applet.serviceToID == 3)
			this.twitchAction(applet, user, message, webhook);
		else if (applet.serviceToID == 4)
			this.spotifyAction(applet, user, message, webhook);
	},

	facebookAction: function(applet, user, message, webhook) {
		// if (applet.reactionID == 0)
		// 	reaction.postTweet(user, message);
		// if (applet.reactionID == 1)
		// 	reaction.starredTweet(user, webhook);
		// if (applet.reactionID == 2)
		// 	reaction.retweetTweet(user, webhook);
		// if (applet.reactionID == 3)
		// 	console.log(applet, user, message, webhook);
		// if (applet.reactionID == 4)
		// 	console.log(applet, user, message, webhook);
		// if (applet.reactionID == 5)
		// 	console.log(applet, user, message, webhook);
	},

	twitterAction: function(applet, user, message, webhook) {
		if (applet.reactionID == 0)
			reaction.postTweet(user, message);
		if (applet.reactionID == 1)
			reaction.starredTweet(user, webhook);
		if (applet.reactionID == 2)
			reaction.retweetTweet(user, webhook);
		if (applet.reactionID == 3)
			console.log(applet, user, message, webhook);
		if (applet.reactionID == 4)
			console.log(applet, user, message, webhook);
		if (applet.reactionID == 5)
			console.log(applet, user, message, webhook);
	},

	googleAction: function(applet, user, message) {
		if (applet.reactionID == 0)
			console.log(applet, user, message);
		if (applet.reactionID == 1)
			console.log(applet, user, message);
		if (applet.reactionID == 2)
			reaction.postTweet(user, message);
		if (applet.reactionID == 3)
			console.log(applet, user, message);
		if (applet.reactionID == 4)
			console.log(applet, user, message);
		if (applet.reactionID == 5)
			console.log(applet, user, message);
	},

	twitchAction: function(applet, user, message) {
		if (applet.reactionID == 0)
			console.log(applet, user, message);
		if (applet.reactionID == 1)
			console.log(applet, user, message);
		if (applet.reactionID == 2)
			reaction.postTweet(user, message);
		if (applet.reactionID == 3)
			console.log(applet, user, message);
		if (applet.reactionID == 4)
			console.log(applet, user, message);
		if (applet.reactionID == 5)
			console.log(applet, user, message);
	},

	spotifyAction: function(applet, user, message) {
		if (applet.reactionID == 0)
			console.log(applet, user, message);
		if (applet.reactionID == 1)
			console.log(applet, user, message);
		if (applet.reactionID == 2)
			reaction.postTweet(user, message);
		if (applet.reactionID == 3)
			console.log(applet, user, message);
		if (applet.reactionID == 4)
			console.log(applet, user, message);
		if (applet.reactionID == 5)
			console.log(applet, user, message);
	},

};
