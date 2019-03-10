const weather = require('../src/routes/actions/weather')
const action = require('../src/routes/applets/actions')

const Config = {
    // Example
    // Maybe more keys should be added
    // This file will be used to genererate the about.json
    // and to serve the list of services, actions and reactions to the front and the app
    services: [{
        serviceID: 0,
        name: "facebook",
        "color": "#3b5998",
        "icon": "fab fa-facebook-f",
        actions: [{
            id: 0,
            constructor: function () { }, // function to call at creation of the applet
            name: "User share a publication",
            description: "Trigger when user share a publication",
        }, {
            id: 1,
            constructor: function () { }, // function to call at creation of the applet
            name: "User post a new status",
            description: "Trigger when user post new status"
        }, {
            id: 2,
            constructor: function () { }, // function to call at creation of the applet
            name: "User like a publication",
            description: "Trigger when user like a publication"
        }, {
            id: 3,
            constructor: function () { }, // function to call at creation of the applet
            name: "User modify his profile",
            description: "Trigger when user modify his profile"
        }, {
            id: 4,
            constructor: function () { }, // function to call at creation of the applet
            name: "User push a new profile picture",
            description: "Trigger when user push a new profile picture"
        }, {
            id: 5,
            constructor: function () { }, // function to call at creation of the applet
            name: "User change his friend's list",
            description: "Trigger when user add or remove friend form his list"
        }, {
            id: 6,
            constructor: function () { }, // function to call at creation of the applet
            name: "User send a private message",
            description: "Trigger when user send private message"
        },],
        reactions: [{
            id: 0,
            constructor: function () { }, // function to call at creation of the applet
            name: "Deleted reaction",
            description: "...",
            needMessage: false
        },],


    }, {
        serviceID: 1,
        name: "twitter",
        "color": "#00acee",
        "icon": "fab fa-twitter",
        actions: [{
            id: 0,
            constructor: function () { }, // function to call at creation of the applet
            name: "User post a new tweet",
            description: "Trigger when user post a new tweet"
        }, {
            id: 1,
            constructor: function () { }, // function to call at creation of the applet
            name: "User like a tweet",
            description: "Trigger when user like a tweet"
        }, {
            id: 2,
            constructor: function () { }, // function to call at creation of the applet
            name: "User retweet",
            description: "Trigger when user retweet"
        }, {
            id: 3,
            constructor: function () { }, // function to call at creation of the applet
            name: "User receive new private message",
            description: "Trigger when user received a new private message"
        },],
        reactions: [{
            id: 0,
            constructor: function () { }, // function to call at creation of the applet
            name: "User post tweet",
            description: "User post tweet with custom body",
            needMessage: true
        }, {
            id: 1,
            constructor: function () { }, // function to call at creation of the applet
            name: "User starred a tweet",
            description: "User like custom tweet",
            needMessage: false
        }, {
            id: 2,
            constructor: function () { }, // function to call at creation of the applet
            name: "User retweet tweet",
            description: "User retweet custom tweet",
            needMessage: false
        }, {
            id: 3,
            constructor: function () { }, // function to call at creation of the applet
            name: "User send private message",
            description: "User send message to a custom people",
            needMessage: true
        },],


    }, {
        serviceID: 2,
        name: "google",
        "color": "#dd4b39",
        "icon": "fab fa-google",
        actions: [],
        reactions: [{
            id: 0,
            constructor: function () { }, // function to call at creation of the applet
            name: "User send email",
            description: "User send email to a custom user with custom body too",
            needMessage: true
        },],


    }, {
        serviceID: 3,
        name: "twitch",
        "color": "#6441a5",
        "icon": "fab fa-twitch",
        actions: [{
            id: 0,
            constructor: function () { }, // function to call at creation of the applet
            name: "User follow a new streamer",
            description: "Trigger when user follow a streamer"
        }, {
            id: 1,
            constructor: function () { }, // function to call at creation of the applet
            name: "User gain a new follower",
            description: "Trigger when people follow user"
        },],
        reactions: [{},],
    }, {
        serviceID: 4,
        "name": "spotify",
        "color": "#1DB954",
        "icon": "fab fa-spotify",
        actions: [{
            id: 0,
            constructor: function () { }, // function to call at creation of the applet
            name: "User like a new track",
            description: "Trigger when user like a new track"
        }, {
            id: 1,
            constructor: function () { }, // function to call at creation of the applet
            name: "User add a track to a playlist",
            description: "Trigger when user add a track to a playlist"
        },],
        reactions: [],


    }, {
        serviceID: 5,
        "name": "weather",
        "color": "#333",
        "icon": "fas fa-cloud-sun",
        actions: [{
            id: 0,
            constructor: function (applet, user) { weather.getWeather(applet, user, 0) }, // function to call at creation of the applet
            name: "it's rainy tomorrow",
            description: "Trigger if it's rainning tomorrow"
        }, {
            id: 1,
            constructor: function (applet, user) { weather.getWeather(applet, user, 1) }, // function to call at creation of the applet
            name: "It's sunny tomorrow",
            description: "Trigger if the weather is sunny tomorrow"
        }, {
            id: 2,
            constructor: function (applet, user) { weather.getWeather(applet, user, 2) }, // function to call at creation of the applet
            name: "It's snowy tomorrow",
            description: "Trigger if the weather is snowy tomorrow"
        }, {
            id: 3,
            constructor: function (applet, user) { weather.getWeather(applet, user, 3) }, // function to call at creation of the applet
            name: "It's cloudy tomorrow",
            description: "Trigger if the weather is cloudy tomorrow"
        }, {
 					id: 4,
 					constructor: function (applet, user) { weather.getWeather(applet, user, 4) }, // function to call at creation of the applet
 					name: "It's windy tomorrow",
 					description: "Trigger if the weather is windy tomorrow"
	 			}, {
 					id: 5,
 					constructor: function (applet, user) { weather.getWeather(applet, user, 5) }, // function to call at creation of the applet
 					name: "It's hot tomorrow",
 					description: "Trigger if the temp is hot (>= 20°C) tomorrow"
	 			}, {
 					id: 6,
 					constructor: function (applet, user) { weather.getWeather(applet, user, 6) }, // function to call at creation of the applet
 					name: "It's cold tomorrow",
 					description: "Trigger if the temp is cold (< 10°C) tomorrow"
	 			},],
        reactions: []
    },

		{
 			serviceID: 6,
 			"name": "timer",
 			"color": "#333",
 			"icon": "fas fa-clock",
 			actions: [{
 					id: 0,
 					constructor: function (applet, user) { weather.timer(applet, user) }, // function to call at creation of the applet
 					name: "program actions",
 					description: "Trigger when it's time to make action"
 			},],
 			reactions: []
 	},]
}

module.exports = {
    Config: Config
}
