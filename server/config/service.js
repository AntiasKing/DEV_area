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
            name: "...",
            description: "..."
        },],
        reactions: [{
            id: 0,
            constructor: null, // function to call at creation of the applet
            name: "...",
            description: "..."
        },]
    }]
}

module.exports = {
    Config: Config
}