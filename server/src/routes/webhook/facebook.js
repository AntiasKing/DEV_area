module.exports = function (router, usersRef) {
    router.get('./webhook/facebook', function (req, res) {
        console.log(req);
    });
}