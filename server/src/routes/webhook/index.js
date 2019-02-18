module.exports = function (router, usersRef) {
	require('./facebook')(router, usersRef);
  require('./twitter')(router, usersRef);
}
