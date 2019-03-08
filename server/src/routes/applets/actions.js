const reaction = require('./reactions')

module.exports = {

  detectTwitterAction: function (webhook, applet, user) {
		if (webhook["favorite_events"] && applet.actionID == 2) {
			this.setServiceAction(applet, user);
		}
		// else if (webhook["create_events"])
		// 	console.log("create_event");
  },

	setServiceAction: function(applet, user) {
		if (applet.serviceName == "facebook")
			this.facebookAction(applet, user);
		else if (applet.serviceName == "twitter")
			this.twitterAction(applet, user);
		else if (applet.serviceName == "google")
			this.googleAction(applet, user);
		else if (applet.serviceName == "twitch")
			this.twitchAction(applet, user);
		else if (applet.serviceName == "spotify")
			this.spotifyAction(applet, user);
	},

	facebookAction: function(applet, user) {
		console.log(applet);
	},

	twitterAction: function(applet, user) {
		if (applet.reactionID == 0)
			console.log(applet, user);
		if (applet.reactionID == 1)
			console.log(applet, user);
		if (applet.reactionID == 2)
			reaction.postTweet(user);
		if (applet.reactionID == 3)
			console.log(applet, user);
		if (applet.reactionID == 4)
			console.log(applet, user);
		if (applet.reactionID == 5)
			console.log(applet, user);
	},

	googleAction: function(applet, user) {
		console.log(applet);
	},

	twitchAction: function(applet, user) {
		console.log(applet);
	},

	spotifyAction: function(applet, user) {
		console.log(applet);
	},

};
