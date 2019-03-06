module.exports = function (router, usersRef) {
    router.get('/applets/:userID', function (req, res) {
        usersRef.child(req.params.userID).once('value').then(snap => {
            if (snap.val()) {
                if (snap.val().applets) {
                    return res.status(200).send(snap.val().applets);
                }
                return res.status(200).send([]);
            }
            return res.status(400).send(`No user ${req.params.userID} found`);
        }).catch(e => {
            res.status(500).send(e);
        })
    });

    router.get('/applet/:userID/:appletID', function (req, res) {
        usersRef.child(req.params.userID).once('value').then(snap => {
            if (snap.val()) {
                if (snap.val().applets && snap.val().applets.find(n => n.id === parseInt(req.params.appletID))) {

                    return res.status(200).send(snap.val().applets.find(n => n.id === parseInt(req.params.appletID)));
                }
                return res.status(400).send(`User ${req.params.userID} as no applet with id: ${req.params.appletID}`);
            }
            return res.status(400).send(`No user ${req.params.userID} found`);
        }).catch(e => {
            res.status(500).send(e);
        })
    });
}