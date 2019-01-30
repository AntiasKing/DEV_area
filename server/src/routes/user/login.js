const bcrypt = require('bcrypt');
const utils = require('../../utils');

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
                            console.log(user.password, childSnapshot.val().local.password);
                            bcrypt.compare(user.password, childSnapshot.val().local.password, function (err, valid) {
                                if (!valid) {
                                    return res.status(404).send("Username or Password invalid.");
                                }
                            });
                            return res.status(200).send(utils.generateToken({
                                id: childSnapshot.key,
                                name: childSnapshot.name,
                                email: childSnapshot.email,
                                thumbmailURL: childSnapshot.thumbmailURL
                            }));
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                        return res.status(500).send(error);
                    })
                break;
            default:
                return res.status(400).send("Invalid type");
        }
    })
}