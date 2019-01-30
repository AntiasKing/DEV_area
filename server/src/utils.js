const jwt = require('jsonwebtoken');

const JWT_SECRET = "Token vraiment trés trés secrêt oulalala. Si quelqu'un le trouve ça pourrait être très très dommage !!!";

module.exports = {
    generateToken: function (user) {
        return token = jwt.sign(user, JWT_SECRET, { expiresIn: 60 * 60 * 24 });
    }
}