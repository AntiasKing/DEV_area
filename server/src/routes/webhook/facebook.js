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

    router.post('/webhook/facebook', function (req, res) {
        console.log('===============================');
        console.log(req.body);
        console.log(req.body.entry.foreach(n => {
            console.log(n);
            console.log(n.changes);
        }));
        console.log('===============================');
        return res.status(200).send();
    })
}