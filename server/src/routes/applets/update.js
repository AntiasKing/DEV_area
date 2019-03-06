module.exports = function (router, usersRef) {
    router.put('/applets/:userID', function (req, res) {
        let applets = req.body.applets;
        if (!applets)
            return res.status(400).send(`No applets submited`);

        usersRef.child(req.params.userID).once('value').then(snap => {
            let user = snap.val();
            if (user) {
                user.applets = applets;
                snap.ref.update(user);
                return res.status(200).send(user.applets);
            }
            return res.status(400).send(`No user ${req.params.userID} found`);
        }).catch(e => {
            res.status(500).send(e);
        })
    });

    router.put('/applet/:userID/:appletID', function (req, res) {
        let applet = req.body.applet;
        if (!applet)
            return res.status(400).send(`No applets submited`);

        usersRef.child(req.params.userID).once('value').then(snap => {
            let user = snap.val();
            if (user) {
                if (user.applets && user.applets.find(n => n.id === parseInt(req.params.appletID))) {
                    let a = user.applets.find(n => n.id === parseInt(req.params.appletID));
                    let i = user.applets.indexOf(a);
                    if (i >= 0) {
                        applet.id = user.applets[i].id;
                        user.applets[i] = applet;
                        snap.ref.update(user);
                    }
                    return res.status(200).send(user.applets);
                }
                return res.status(400).send(`User ${req.params.userID} as no applet with id: ${req.params.appletID}`);
            }
            return res.status(400).send(`No user ${req.params.userID} found`);
        }).catch(e => {
            res.status(500).send(e);
        })
    });

    router.put('/applet/:userID/:appletID/toggle', function (req, res) {
        usersRef.child(req.params.userID).once('value').then(snap => {
            let user = snap.val();
            if (user) {
                if (user.applets && user.applets.find(n => n.id === parseInt(req.params.appletID))) {
                    let a = user.applets.find(n => n.id === parseInt(req.params.appletID));
                    let i = user.applets.indexOf(a);
                    if (i >= 0) {
                        user.applets[i].on = !user.applets[i].on;
                        snap.ref.update(user);
                    }
                    return res.status(200).send(user.applets);
                }
                return res.status(400).send(`User ${req.params.userID} as no applet with id: ${req.params.appletID}`);
            }
            return res.status(400).send(`No user ${req.params.userID} found`);
        }).catch(e => {
            res.status(500).send(e);
        })
    });
}