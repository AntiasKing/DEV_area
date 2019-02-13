const verifyToken = "Bonjour la mifa";

module.exports = function (router, usersRef) {
    router.get('/webhook/facebook', function (req, res) {
        console.log(req.query['hub.mode']);
        console.log(req.query['hub.challenge']);
        console.log(req.query['hub.verify_token']);
        if (req.query['hub.verify_token'] === verifyToken) {
            return res.status(200).send(req.query['hub.challenge']);
        }
        return res.status(401).send();
    });
}