const C = require('../../../config/service');
const Config = C.Config;

module.exports = function (router, usersRef) {
    router.post("/applets/:userID", function (req, res) {
        let newApplet = req.body.applet;
        if (!newApplet)
            return res.status(400).send(`No applet submited`);

        if (newApplet.serviceID === undefined || newApplet.serviceID === null || newApplet.serviceID > Config.services.length - 1 || newApplet.serviceID < 0)
            return res.status(400).send('No serviceID submited or serviceID out of bounds');

				if (newApplet.serviceToID === undefined || newApplet.serviceToID === null || newApplet.serviceToID > Config.services.length - 1 || newApplet.serviceToID < 0)
            return res.status(400).send('No serviceToID submited or serviceToID out of bounds');

				if (newApplet.actionID === undefined || newApplet.actionID === null || newApplet.actionID > Config.services[newApplet.serviceID].actions.length - 1 || newApplet.actionID < 0)
					return res.status(400).send('No actionID submited or actionID out of bounds');

        if (newApplet.reactionID === undefined || newApplet.reactionID === null || newApplet.reactionID > Config.services[newApplet.serviceToID].reactions.length - 1 || newApplet.reactionID < 0)
            return res.status(400).send('No reactionID submited or reactionID out of bounds');

        usersRef.child(req.params.userID).once('value').then(snap => {
            if (snap.val()) {
                let user = snap.val();
                let applets = user.applets ? user.applets : [];
                newApplet.id = applets.length;
								newApplet.on = true;
								newApplet.serviceName = Config.services[newApplet.serviceID].name;
								newApplet.serviceToName = Config.services[newApplet.serviceToID].name;
								newApplet.color = Config.services[newApplet.serviceID].color;
								newApplet.icon = Config.services[newApplet.serviceID].icon;
								newApplet.actionName = Config.services[newApplet.serviceID].actions[newApplet.actionID].name;
								newApplet.reactionName = Config.services[newApplet.serviceToID].reactions[newApplet.reactionID].name;
								if (newApplet.message)
									newApplet.message = newApplet.message;
                applets.push(newApplet);
                user.applets = applets;
                snap.ref.update(user);

								if (Config.services[newApplet.serviceID].actions[newApplet.actionID].constructor && (newApplet.serviceID == 5 || newApplet.serviceID == 6))
										Config.services[newApplet.serviceID].actions[newApplet.actionID].constructor(newApplet, user);

								if (Config.services[newApplet.serviceToID].reactions[newApplet.reactionID].constructor)
										Config.services[newApplet.serviceToID].reactions[newApplet.reactionID].constructor();

                return res.status(200).send(user.applets);
            }
            return res.status(400).send(`No user ${req.params.userID} found`);
        }).catch(e => {
            res.status(500).send(e);
        })
    });
}
