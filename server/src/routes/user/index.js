module.exports = function (router, usersRef, db) {
    require('./create')(router, usersRef, db);
    require('./delete')(router, usersRef);
    require('./update')(router, usersRef);
    require('./link')(router, usersRef);
    require('./login')(router, usersRef);
}
