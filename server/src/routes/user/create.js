const utils = require('../../utils');
const bcrypt = require('bcrypt');

const oauth = [
    {
        "name": "facebook",
        "id": "userID"
    },
]
// TODO: Check user's params and send jw-token
module.exports = function (router, usersRef) {
    router.post("/user/:type", function (req, res) {
        let i;
        let user = req.body.user;
        let newUsersRef = usersRef.push();
        let obj = {};
        if (req.params.type === "local") {
            let hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;
            obj[req.params.type] = user;
            newUsersRef.set(obj)
                .then(function () {
                    console.log("Successfully created new user:", user);
                    res.status(201).send(utils.generateToken({ id: newUsersRef.key, name: user.name, email: user.email, thumbmailURL: user.thumbmailURL }));
                })
                .catch(function (error) {
                    console.log("Error creating new user:", error);
                    res.status(500).send(error);
                });
            return;
        } else if ((i = oauth.find((n) => { return req.params.type === n.name }))) {
            usersRef.orderByChild(`${i.name}/${i.id}`).equalTo(user.userID).once("value")
                .then(function (snapShot) {
                    if (snapShot.val()) {
                        snapShot.forEach(function (childSnapShot) {
                            childSnapShot.child(`${i.name}`).ref.update(user)
                                .then(function () {
                                    return res.status(200).send(utils.generateToken({
                                        id: childSnapShot.key,
                                        name: childSnapShot.name,
                                        email: childSnapShot.email,
                                        thumbmailURL: childSnapShot.thumbmailURL
                                    }));
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    return res.status(500).send(error);
                                });
                        });
                        return;
                    }
                    obj[req.params.type] = user;
                    newUsersRef.set(obj)
                        .then(function () {
                            console.log("Successfully created new user:", user);
                            return res.status(201).send(utils.generateToken({ id: newUsersRef.key, name: user.name, email: user.email, thumbmailURL: user.picture.data.url }));
                        }).catch(function (error) {
                            console.log("Error creating new user:", error);
                            return res.status(500).send(error);
                        })
                })
                .catch(function (error) {
                    console.log(error);
                    return res.status(500).send(error);
                });
            return;
        }
        return res.status(400).send("Invalid type");
    });
}