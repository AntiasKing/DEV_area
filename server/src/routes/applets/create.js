module.exports = function (router, usersRef) {
    router.post("/applets/:userID", function (req, res) {
        let newApplet = req.body.applet;
        if (!newApplet)
            return res.status(400).send(`No applet submited`);

        usersRef.child(req.params.userID).once('value').then(snap => {
            if (snap.val()) {
                let user = snap.val();
                let applets = user.applets ? user.applets : [];
                newApplet.id = applets.length;
                applets.push(newApplet);
                user.applets = applets;
                snap.ref.update(user);
                return res.status(200).send(user.applets);
            }
            return res.status(400).send(`No user ${req.params.userID} found`);
        }).catch(e => {
            res.status(500).send(e);
        })
    });
}