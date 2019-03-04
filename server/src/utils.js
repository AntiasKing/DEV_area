const jwt = require('jsonwebtoken');

const JWT_SECRET = "Token vraiment trés trés secrêt oulalala. Si quelqu'un le trouve ça pourrait être très très dommage !!!";

module.exports = {
    generateToken: function (user) {
        return token = jwt.sign(user, JWT_SECRET, { expiresIn: 60 * 60 * 24 });
    },

    searchApplet: function (userId, rawData, usersRef, orderOn) {
        usersRef.orderByChild(orderOn).equalTo(userId).once("value")
            .then(function (snapShot) {
                if (snapShot.val()) {
                    snapShot.forEach(element => {
                        console.log(element.key, element.val());
                    });
                }
            })
    }
}