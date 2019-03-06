const express = require('express');
var router = express.Router();

module.exports = function (admin) {
  let db = admin.database();
  var usersRef = db.ref('users');
  require('../../config/passport.js')(router, usersRef, db);
  require('./user')(router, usersRef, db);
  require('./webhook')(router, usersRef);
  require('./applets')(router, usersRef);
  return router;
};
