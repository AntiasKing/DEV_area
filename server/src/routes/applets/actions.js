const reaction = require('./reactions')
const weather = require('../actions/weather')

module.exports = {

  detectTwitterAction: function (webhook, applet, user) {
		if (webhook["tweet_create_events"] && applet.actionID == 0)
			this.setServiceAction(applet, user, webhook)
		if (webhook["favorite_events"] && applet.actionID == 1)
			this.setServiceAction(applet, user, webhook);
		if (webhook["tweet_create_events"] && applet.actionID == 2)
			this.setServiceAction(applet, user, webhook);
		if (webhook["direct_message_events"] && applet.actionID == 3)
			this.setServiceAction(applet, user, webhook);
  },

	detectTwitchAction: function (webhook, applet, user) {
		if (applet.actionID === 0)
			this.setserviceAction(applet, user, webhook);
		if (applet.actionID === 1)
			this.setserviceAction(applet, user, webhook);
	},

	detectFacebookAction: function (webhook, applet, user) {
		if (webhook.entry[0].changes[0].field == "status" && webhook.entry[0].changes[0].id && applet.actionID == 0) //share facebook post
			this.setServiceAction(applet, user, webhook)
		else if (webhook.entry[0].changes[0].field == "status" && applet.actionID == 1) // post status webhook.entry[0].changes[0].value
			this.setServiceAction(applet, user, webhook)
		if (webhook.entry[0].changes[0].field == "likes" && applet.actionID == 2)
			this.setServiceAction(applet, user, webhook)
		if (webhook.entry[0].changes[0].field == "name" && applet.actionID == 3)
			this.setServiceAction(applet, user, webhook)
		if (webhook.entry[0].changes[0].field == "photos" && applet.actionID == 4)
			this.setServiceAction(applet, user, webhook)
		if (webhook.entry[0].changes[0].field == "friends" && applet.actionID == 5)
			this.setServiceAction(applet, user, webhook)
		if (webhook.entry[0].changes[0].field == "message_sends" && applet.actionID == 6)
			this.setServiceAction(applet, user, webhook)
	},

	setServiceAction: function(applet, user, webhook) {
		if (applet.serviceToID == 0)
			this.facebookReaction(applet, user, webhook);
		else if (applet.serviceToID == 1)
			this.twitterReaction(applet, user, webhook);
		else if (applet.serviceToID == 2)
			this.googleReaction(applet, user, webhook);
		else if (applet.serviceToID == 3)
			this.twitchReaction(applet, user, webhook);
		else if (applet.serviceToID == 4)
			this.spotifyReaction(applet, user, webhook);
	},

	facebookReaction: function(applet, user, webhook) {
	},

	twitterReaction: function(applet, user, webhook) {
		if (applet.reactionID == 0)
			reaction.postTweet(user, applet.message);
		if (applet.reactionID == 1)
			reaction.starredTweet(user, webhook);
		if (applet.reactionID == 2)
			reaction.retweetTweet(user, webhook);
		if (applet.reactionID == 3)
			reaction.sendPrivateMessage(user, applet.message);
	},

	googleReaction: function(applet, user, webhook) {
		if (applet.reactionID == 0)
			reaction.sendEmail(user, webhook, applet.message);
	},

	twitchReaction: function(applet, user, message) {
	},

	spotifyReaction: function(applet, user) {
	},

};
