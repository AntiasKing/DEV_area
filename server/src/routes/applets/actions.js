const reaction = require('./reactions')

module.exports = {

  detectTwitterAction: function (webhook, applet, user) {
		if (webhook["tweet_create_events"] && applet.actionID == 0)
			this.setServiceAction(applet, user, "I tweet", webhook)
		if (webhook["favorite_events"] && applet.actionID == 1)
			this.setServiceAction(applet, user, "I just starred a new tweet", webhook);
		if (webhook["tweet_create_events"] && applet.actionID == 2)
			this.setServiceAction(applet, user, "I just rt a tweet", webhook);
		if (webhook["direct_message_events"] && applet.actionID == 3)
			this.setServiceAction(applet, user, "I just received a private message", webhook);
  },

  	detectTwitchAction: function (webhook, applet, user) {
		if (applet.actionID === 0)
			this.etserviceAction(applet, user, "I followed a streamer", webhook);
		if (applet.actionID === 1)
			this.etserviceAction(applet, user, "I gained a follower", webhook);
	},

	detectFacebookAction: function (webhook, applet, user) {
		if (webhook.entry[0].changes[0].field == "status" && webhook.entry[0].changes[0].id && applet.actionID == 0)
			this.setServiceAction(applet, user, "I just share a friend status in facebook", webhook)
		else if (webhook.entry[0].changes[0].field == "status" && applet.actionID == 1)
			this.setServiceAction(applet, user, "I just post a new status in facebook : " + webhook.entry[0].changes[0].value, webhook)
		if (webhook.entry[0].changes[0].field == "likes" && applet.actionID == 2)
			this.setServiceAction(applet, user, "I like a post in facebook", webhook)
		if (webhook.entry[0].changes[0].field == "name" && applet.actionID == 3)
			this.setServiceAction(applet, user, "I changed my name in facebook", webhook)
		if (webhook.entry[0].changes[0].field == "photos" && applet.actionID == 4)
			this.setServiceAction(applet, user, "I just post a new profile picture in facebook", webhook)
		if (webhook.entry[0].changes[0].field == "friends" && applet.actionID == 5)
			this.setServiceAction(applet, user, "I have a new friend on facebook", webhook)
		if (webhook.entry[0].changes[0].field == "message_sends" && applet.actionID == 6)
			this.setServiceAction(applet, user, "I send a private message in facebook", webhook)
	},

	setServiceAction: function(applet, user, message, webhook) {
		if (applet.serviceToID == 0)
			this.facebookReaction(applet, user, message, webhook);
		else if (applet.serviceToID == 1)
			this.twitterReaction(applet, user, message, webhook);
		else if (applet.serviceToID == 2)
			this.googleReaction(applet, user, message, webhook);
		else if (applet.serviceToID == 3)
			this.twitchReaction(applet, user, message, webhook);
		else if (applet.serviceToID == 4)
			this.spotifyReaction(applet, user, message, webhook);
	},

	facebookReaction: function(applet, user, message, webhook) {
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

	twitterReaction: function(applet, user, message, webhook) {
		if (applet.reactionID == 0)
			reaction.postTweet(user, applet.message);
		if (applet.reactionID == 1)
			reaction.starredTweet(user, webhook);
		if (applet.reactionID == 2)
			reaction.retweetTweet(user, webhook);
		if (applet.reactionID == 3)
			reaction.sendPrivateMessage(user, webhook, message);
		if (applet.reactionID == 4)
			console.log(applet, user, message, webhook);
		if (applet.reactionID == 5)
			console.log(applet, user, message, webhook);
	},

	googleReaction: function(applet, user, message, webhook) {
		if (applet.reactionID == 0)
			reaction.sendEmail(user, webhook, message);
		if (applet.reactionID == 1)
			console.log(applet, user, message);
		if (applet.reactionID == 2)
			console.log(applet, user, message);
		if (applet.reactionID == 3)
			console.log(applet, user, message);
		if (applet.reactionID == 4)
			console.log(applet, user, message);
		if (applet.reactionID == 5)
			console.log(applet, user, message);
	},

	twitchReaction: function(applet, user, message) {
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

	spotifyReaction: function(applet, user, message) {
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
