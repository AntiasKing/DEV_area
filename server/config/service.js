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
            name: "User like a post",
            description: "..."
        },{
            id: 1,
            constructor: function () {}, // function to call at creation of the applet
            name: "User like a page",
            description: "..."
        },{
            id: 2,
            constructor: function () {}, // function to call at creation of the applet
            name: "User modify his profile",
            description: "..."
        },{
            id: 3,
            constructor: function () {}, // function to call at creation of the applet
            name: "User post a new status",
            description: "..."
        },{
            id: 4,
            constructor: function () {}, // function to call at creation of the applet
            name: "User post a new photo",
            description: "..."
        },{
            id: 5,
            constructor: function () {}, // function to call at creation of the applet
            name: "User post a new link",
            description: "Trigger when you post a new link"
        },],
        reactions: [{
            id: 0,
            constructor: function() {}, // function to call at creation of the applet
            name: "1",
            description: "..."
        },{
            id: 1,
            constructor: function() {}, // function to call at creation of the applet
            name: "2",
            description: "..."
        },{
            id: 2,
            constructor: function() {}, // function to call at creation of the applet
            name: "3",
            description: "..."
        },{
            id: 3,
            constructor: function() {}, // function to call at creation of the applet
            name: "4",
            description: "..."
        },{
            id: 4,
            constructor: function() {}, // function to call at creation of the applet
            name: "5",
            description: "..."
        },{
            id: 5,
            constructor: function() {}, // function to call at creation of the applet
            name: "6",
            description: "..."
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
            name: "User post a new link",
            description: "..."
        },{
            id: 2,
            constructor: function () {}, // function to call at creation of the applet
            name: "User like a tweet",
            description: "..."
        },{
            id: 3,
            constructor: function () {}, // function to call at creation of the applet
            name: "User retweet",
            description: "..."
        },{
            id: 4,
            constructor: function () {}, // function to call at creation of the applet
            name: "New tweet from a user",
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
            description: "..."
        },{
            id: 1,
            constructor: function() {}, // function to call at creation of the applet
            name: "User starred a tweet",
            description: "..."
        },{
            id: 2,
            constructor: function() {}, // function to call at creation of the applet
            name: "User retweet tweet",
            description: "..."
        },{
            id: 3,
            constructor: function() {}, // function to call at creation of the applet
            name: "User send private message",
            description: "..."
        },{
            id: 4,
            constructor: function() {}, // function to call at creation of the applet
            name: "...",
            description: "..."
        },{
            id: 5,
            constructor: function() {}, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],


    }, {
        serviceID: 2,
        name: "google",
        "color": "#dd4b39",
        "icon": "fab fa-google",
        actions: [],
        reactions: [],


    }, {
				serviceID: 3,
        name: "twitch",
        "color": "#6441a5",
        "icon": "fab fa-twitch",
        actions: [{
            id: 0,
            constructor: function () {}, // function to call at creation of the applet
            name: "New stream start from a user T",
            description: "..."
        },{
            id: 1,
            constructor: function () {}, // function to call at creation of the applet
            name: "User start a new stream",
            description: "..."
        },{
            id: 2,
            constructor: function () {}, // function to call at creation of the applet
            name: "New clip is posted by a user you follow",
            description: "..."
        },{
            id: 3,
            constructor: function () {}, // function to call at creation of the applet
            name: "User post a new clip",
            description: "..."
        },{
            id: 4,
            constructor: function () {}, // function to call at creation of the applet
            name: "User follow a new streamer",
            description: "..."
        },{
            id: 5,
            constructor: function () {}, // function to call at creation of the applet
            name: "User gain a new follower",
            description: "Trigger when you gain a new follower"
        },],
        reactions: [{
            id: 0,
            constructor: function() {}, // function to call at creation of the applet
            name: "...",
            description: "..."
        },{
            id: 1,
            constructor: function() {}, // function to call at creation of the applet
            name: "...",
            description: "..."
        },{
            id: 2,
            constructor: function() {}, // function to call at creation of the applet
            name: "...",
            description: "..."
        },{
            id: 3,
            constructor: function() {}, // function to call at creation of the applet
            name: "...",
            description: "..."
        },{
            id: 4,
            constructor: function() {}, // function to call at creation of the applet
            name: "...",
            description: "..."
        },{
            id: 5,
            constructor: function() {}, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],


    }, {
				serviceID: 4,
        "name": "spotify",
        "color": "#1DB954",
        "icon": "fab fa-spotify",
        actions: [{
            id: 0,
            constructor: function () {}, // function to call at creation of the applet
            name: "User like a new track",
            description: "..."
        },{
            id: 1,
                constructor: function () {}, // function to call at creation of the applet
                name: "User add a track to a playlist",
            description: "Trigger when you add a track to a playlist"
            },],
        reactions: [{
            id: 0,
            constructor: function() {}, // function to call at creation of the applet
            name: "...",
            description: "..."
        },{
            id: 1,
                constructor: function () {}, // function to call at creation of the applet,
                name: "...",
                description: "..."
            },],


    }, {
				serviceID: 5,
        "name": "weather",
        "color": "#333",
        "icon": "fas fa-cloud-sun",
        actions: [{
            id: 0,
            constructor: function () {}, // function to call at creation of the applet
            name: "it's rainy tomorrow",
            description: "Trigger if it's rainning tomorrow"
        },],
        reactions: [{
            id: 0,
            constructor: function () {}, // function to call at creation of the applet
            name: "...",
            description: "..."
        },]
    },]
}

module.exports = {
    Config: Config
}
