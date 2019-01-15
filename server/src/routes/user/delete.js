module.exports = function (router, usersRef) {
    router.delete("/user/:userId", function (req, res) {
        let userRef = usersRef.child(req.params.userId)
        userRef.remove()
            .then(function () {
                console.log("Successfully deleted user: " + req.params.userId);
                res.status(204).send();
            })
            .catch(function (error) {
                console.log(`Error deleting user: ${req.params.userId}, error: ${error}`);
                res.status(500).send(error);
            });
    })
}