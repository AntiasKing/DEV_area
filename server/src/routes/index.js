const express = require('express');
var router = express.Router();

module.exports = function (admin) {
  let db = admin.database();
  var usersRef = db.ref('users');
  require('../../config/passport.js')(router, usersRef);
  require('./user')(router, usersRef);
  require('./webhook')(router, user);
  return router;
};
