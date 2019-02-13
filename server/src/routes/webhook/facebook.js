const verifyToken = "JeSuisTaMaman";

module.exports = function (router, usersRef) {
    router.post('./webhook/facebook', function (req, res) {
        console.log(req);
    });
}