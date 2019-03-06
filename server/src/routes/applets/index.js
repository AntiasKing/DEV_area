module.exports = function (router, usersRef) {
    require('./get')(router, usersRef);
    require('./create')(router, usersRef);
    require('./update')(router, usersRef);
    require('./delete')(router, usersRef);
}