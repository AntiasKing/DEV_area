const C = require('../../../config/service');
const Config = C.Config;

module.exports = function (router, usersRef) {
    router.get('/services', function (req, res) {
        res.status(200).send(Config.services);
    });
}