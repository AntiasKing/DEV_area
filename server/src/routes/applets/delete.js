module.exports = function (router, usersRef) {
    router.delete('/applets/:userID', function (req, res) {
        usersRef.child(req.params.userID).once('value').then(snap => {
            let user = snap.val();
            if (user) {
                user.applets = [];
                snap.ref.update(user);
                return res.status(200).send();
            }
            return res.status(400).send(`No user ${req.params.userID} found`);
        }).catch(e => {
            res.status(500).send(e);
        })
    });

    router.delete('/applet/:userID/:appletID', function (req, res) {
        usersRef.child(req.params.userID).once('value').then(snap => {
            let user = snap.val();
            if (user) {
                if (user.applets && user.applets.find(n => n.id === parseInt(req.params.appletID))) {
                    let a = user.applets.find(n => n.id === parseInt(req.params.appletID));
                    let i = user.applets.indexOf(a);
                    if (i >= 0) {
                        user.applets.splice(i, 1);
                        snap.ref.update(user);
                    }
                    return res.status(200).send(user.applets.find(n => n.id === parseInt(req.params.appletID)));
                }
                return res.status(400).send(`User ${req.params.userID} as no applet with id: ${req.params.appletID}`);
            }
            return res.status(400).send(`No user ${req.params.userID} found`);
        }).catch(e => {
            res.status(500).send(e);
        })
    });
}