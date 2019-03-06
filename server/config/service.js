const Config = {
    // Example
    // Maybe more keys should be added
    // This file will be used to genererate the about.json
    // and to serve the list of services, actions and reactions to the front and the app
    services: [{
        serviceID: 0,
        name: "facebook",
        actions: [{
            id: 0,
			constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
			params: ["userID"],
            name: "...",
            description: "..."
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },]
	},
	{
		serviceID: 1,
        name: "twitch",
        actions: [{
            id: 0,
			constructor: function () { console.log("") }, // function to call at creation of the applet
			params: ["twitchID"],
            name: "getFollowed",
            description: "the user get followed"
		},
		{
            id: 1,
			constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
			params: ["twitchID"],
            name: "Follow",
            description: "the user followed someone"
		},
		{
            id: 2,
			constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
			params: ["userID"],
            name: "...",
            description: "..."
		},
		{
            id: 3,
			constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
			params: ["userID"],
            name: "...",
            description: "..."
        },]
	}]
}

module.exports = {
    Config: Config
}