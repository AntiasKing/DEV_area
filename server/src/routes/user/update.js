module.exports = function (router, usersRef) {
    router.put("/user/:userId", function (req, res) {
        let user = req.body.user;
        let userRef = usersRef.child(req.params.userId)
        userRef.update(user)
            .then(function () {
                console.log("Successfully updated user");
                res.status(200).send();
            })
            .catch(function (error) {
                console.log("Error updating user:", error);
                res.status(500).send();
            });
    });
}