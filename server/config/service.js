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
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User like a post",
            description: "trigger when you like a post"
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 1,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User like a page",
            description: "trigger when you like a page"
        },],
        reactions: [{
            id: 1,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 2,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User modify his profile",
            description: "trigger when you modify your profile"
        },],
        reactions: [{
            id: 2,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 3,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User post a new status",
            description: "trigger when you post a new status"
        },],
        reactions: [{
            id: 3,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 4,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User post a new photo",
            description: "trigger when you post a new photo"
        },],
        reactions: [{
            id: 4,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 5,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User post a new link",
            description: "trigger when you post a new link"
        },],
        reactions: [{
            id: 5,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },]



    }, {
        serviceID: 1,
        name: "twitter",
        "color": "#00acee",
        "icon": "fab fa-twitter",
        actions: [{
            id: 0,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User post a new tweet",
            description: "trigger when you post a new tweet"
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 1,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User post a new link",
            description: "trigger when you post a new link"
        },],
        reactions: [{
            id: 1,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 2,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User like a tweet",
            description: "trigger when you like a tweet"
        },],
        reactions: [{
            id: 2,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 3,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User retweet",
            description: "trigger when you retweet"
        },],
        reactions: [{
            id: 3,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 4,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "New tweet from a user",
            description: "trigger when a user you selected tweet"
        },],
        reactions: [{
            id: 4,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 5,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User is mentioned in a tweet",
            description: "trigger when you are mentioned in a tweet"
        },],
        reactions: [{
            id: 5,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },]



    
    }, {
        serviceID: 2,
        name: "google",
        "color": "#dd4b39",
        "icon": "fab fa-google",
        actions: [],
        reactions: [],
    }, {
        "name": "twitch",
        "color": "#6441a5",
        "icon": "fab fa-twitch",
        actions: [{
            id: 0,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "New stream start from a user T",
            description: "trigger when a user you designed start streaming"
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 0,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User start a new stream",
            description: "trigger when you start a stream"
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 0,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "New clip is posted by a user you follow",
            description: "trigger when a user you follow post a clip"
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 0,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User post a new clip",
            description: "trigger when you post a clip"
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 0,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User follow a new streamer",
            description: "trigger when you follow a new streamer"
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 0,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User gain a new follower",
            description: "trigger when you gain a new follower"
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },]



    }, {
        "name": "spotify",
        "color": "#1DB954",
        "icon": "fab fa-spotify",
        actions: [{
            id: 0,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "User like a new track",
            description: "trigger when you like a new track"
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },],
        actions: [{
            id: 1,
                constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
                name: "User add a track to a playlist",
            description: "trigger when you add a track to a playlist"
            },],
        reactions: [{
            id: 1,
                constructor: null, // function to call at creation of the applet
                name: "...",
                description: "..."
            },]



    }, {
        "name": "weather",
        "color": "#333",
        "icon": "fas fa-cloud-sun",
        actions: [{
            id: 0,
            constructor: function () { console.log("Enorme ZGUEG") }, // function to call at creation of the applet
            name: "it's rainy tomorrow",
            description: "trigger if it's rainning tomorrow"
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },]
    },]
}

module.exports = {
    Config: Config
}