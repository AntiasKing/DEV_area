module.exports = function (router, usersRef) {
    router.post("/user/:type", function (req, res) {
        let user = req.body.user;
        let newUsersRef = usersRef.push();
        let obj = {};
        obj[req.params.type] = user;
        newUsersRef.set(obj)
            .then(function () {
                console.log("Successfully created new user:", user);
                res.status(201).send(newUsersRef.key);
            })
            .catch(function (error) {
                console.log("Error creating new user:", error);
                res.status(500).send(error);
            });
    });
}