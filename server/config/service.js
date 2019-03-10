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
            constructor: function () {}, // function to call at creation of the applet
            name: "User share a publication",
            description: "...",
        },{
            id: 1,
            constructor: function () {}, // function to call at creation of the applet
            name: "User post a new status",
            description: "..."
        },{
            id: 2,
            constructor: function () {}, // function to call at creation of the applet
            name: "User like a post",
            description: "..."
        },{
            id: 3,
            constructor: function () {}, // function to call at creation of the applet
            name: "User modify his profile",
            description: "..."
        },{
            id: 4,
            constructor: function () {}, // function to call at creation of the applet
            name: "User push a new profile picture",
            description: "..."
        },{
            id: 5,
            constructor: function () {}, // function to call at creation of the applet
            name: "User change his friend's list",
            description: "..."
        },{
            id: 6,
            constructor: function () {}, // function to call at creation of the applet
            name: "User send a private message",
            description: "Trigger when you send private message"
        },],
        reactions: [{
            id: 0,
            constructor: function() {}, // function to call at creation of the applet
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
            constructor: function () {}, // function to call at creation of the applet
            name: "User post a new tweet",
            description: "..."
        },{
            id: 1,
            constructor: function () {}, // function to call at creation of the applet
            name: "User like a tweet",
            description: "..."
        },{
            id: 2,
            constructor: function () {}, // function to call at creation of the applet
            name: "User retweet",
            description: "..."
        },{
            id: 3,
            constructor: function () {}, // function to call at creation of the applet
            name: "User received new private message",
            description: "..."
        },{
            id: 4,
            constructor: function () {}, // function to call at creation of the applet
            name: "undefined",
            description: "..."
        },{
            id: 5,
            constructor: function () {}, // function to call at creation of the applet
            name: "User is mentioned in a tweet",
            description: "Trigger when you are mentioned in a tweet"
        },],
        reactions: [{
            id: 0,
            constructor: function() {}, // function to call at creation of the applet
            name: "User post tweet",
            description: "...",
						needMessage: true
        },{
            id: 1,
            constructor: function() {}, // function to call at creation of the applet
            name: "User starred a tweet",
            description: "...",
						needMessage: false
        },{
            id: 2,
            constructor: function() {}, // function to call at creation of the applet
            name: "User retweet tweet",
            description: "...",
						needMessage: false
        },{
            id: 3,
            constructor: function() {}, // function to call at creation of the applet
            name: "User send private message",
            description: "...",
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
            constructor: function() {}, // function to call at creation of the applet
            name: "USer send email",
            description: "...",
						needMessage: true
        },],


    }, {
		serviceID: 3,
        name: "twitch",
        "color": "#6441a5",
        "icon": "fab fa-twitch",
        actions: [{
            id: 0,
            constructor: function () {}, // function to call at creation of the applet
            name: "User follow a new streamer",
            description: "..."
        },{
			id: 1,
            constructor: function () {}, // function to call at creation of the applet
            name: "User gain a new follower",
            description: "..."
        },],
        reactions: [{},],
    }, {
				serviceID: 4,
        "name": "spotify",
        "color": "#1DB954",
        "icon": "fab fa-spotify",
        actions: [{
            id: 0,
            constructor: function () {}, // function to call at creation of the applet
            name: "Track added to playlist",
            description: "..."
        },{
            id: 1,
            constructor: function () {}, // function to call at creation of the applet
            name: "User add a track to a playlist",
            description: "Trigger when you add a track to a playlist"
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
        },{
            id: 1,
            constructor: function (applet, user) { weather.getWeather(applet, user, 1) }, // function to call at creation of the applet
            name: "It's sunny tomorrow",
            description: "Trigger if the weather is sunny tomorrow"
        },{
            id: 2,
            constructor: function (applet, user) { weather.getWeather(applet, user, 2) }, // function to call at creation of the applet
            name: "Snow tomorrow",
            description: "Trigger if snow tomorrow"
        },{
            id: 3,
            constructor: function (applet, user) { weather.getWeather(applet, user, 3) }, // function to call at creation of the applet
            name: "It's cloudy tomorrow",
            description: "Trigger if the weather is cloudy tomorrow"
        },],
        reactions: []
    },]
}

module.exports = {
    Config: Config
}
