const express = require('express');
var router = express.Router();

module.exports = function (admin) {
    let db = admin.database();
    var usersRef = db.ref('users');
    require('./user')(router, usersRef);
    return router;
};