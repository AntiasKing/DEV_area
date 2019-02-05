module.exports = function (router, usersRef) {
    require('./create')(router, usersRef);
    require('./delete')(router, usersRef);
    require('./update')(router, usersRef);
    require('./link')(router, usersRef);
    require('./login')(router, usersRef);
}
