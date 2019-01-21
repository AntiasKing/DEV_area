
// TODO: Check user's params and send jw-token

// Only for local loggin for now
// For facebook login use "/user/facebook"
module.exports = function (router, userRef) {
    router.post("/user/:type/login", function (req, res) {
        let user = req.body.user;
        switch (req.params.type) {
            case "local":
                userRef.orderByChild("local/email").equalTo(user.email).once("value")
                    .then(function (snapShot) {
                        snapShot.forEach(function (childSnapshot) {
                            if (childSnapshot.val().local.password === user.password) {
                                res.status(200).send(childSnapshot.key);
                            } else {
                                res.send(401).send();
                            }
                        });
                    })
                    .catch(function (error) {
                        res.status(500).send(error);
                    })
                break;
            default:
                res.status(400).send("Invalid type");
                break;
        }
    })
}