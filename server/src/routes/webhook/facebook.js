const verifyToken = "JeSuisTaMaman";

module.exports = function (router, usersRef) {
    router.get('/webhook/facebook', function (req, res) {
        console.log(req.query['hub.mode']);
        console.log(req.query['hub.challenge']);
        console.log(req.query['hub.verify_token']);
    });
}