module.exports = function (router, usersRef) {
    router.put("/user/:type/:userId", function (req, res) {
        let user = req.body.user;
        let userRef = usersRef.child(req.params.userId)
        let obj = {};
        obj[req.params.type] = user;
        userRef.update(obj)
            .then(function () {
                console.log(`Successfully linked user to ${req.params.type} service`);
                res.status(200).send();
            })
            .catch(function (e) {
                console.log("Error linking user:", error);
                res.status(500).send();
            });

    });
};