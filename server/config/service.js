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
    }, {
        serviceID: 1,
        name: "twitter",
        "color": "#3b5998",
        "icon": "fab fa-twitter",
        actions: [],
        reactions: [],
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
        actions: [],
        reactions: [],
    }, {
        "name": "spotify",
        "color": "#1DB954",
        "icon": "fab fa-spotify",
        actions: [],
        reactions: [],
    }, {
        "name": "weather",
        "color": "#333",
        "icon": "fas fa-cloud-sun",
        actions: [],
        reactions: [],
    },]
}

module.exports = {
    Config: Config
}