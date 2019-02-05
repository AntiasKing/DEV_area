const bcrypt = require('bcrypt');
const utils = require('../../utils');

// TODO: Check user's params and send jw-token

// Only for local loggin for now
// For facebook login use "/user/facebook"
module.exports = function (app, passport) {

    // app.get('/', function(req, res) {
    //   res.render('index.ejs');
    // });
    //
    // app.get('/login', function(req, res) {
    //   res.render('login.ejs', { message: req.flash('loginMessage') });
    // });
    //
    // app.get('/profile', isLoggedIn, function(req, res) {
    //   res.render('profile.ejs', {
    //       user : req.user
    //   });
    // });
    //
    // app.get('/logout', function(req, res) {
    //   req.logout();
    //   res.redirect('/');
    // });
    //
    // app.post('/login', passport.authenticate('local-login', {
    //   successRedirect : '/profile',
    //   failureRedirect : '/login',
    //   failureFlash : true
    // }));

    // router.post("/user/:type/login", function (req, res) {
    //     let user = req.body.user;
    //     switch (req.params.type) {
    //         case "local":
    //             userRef.orderByChild("local/email").equalTo(user.email).once("value")
    //                 .then(function (snapShot) {
    //                     snapShot.forEach(function (childSnapshot) {
    //                         if (childSnapshot.val().local.password === user.password) {
    //                             res.status(200).send(childSnapshot.key);
    //                         } else {
    //                             res.send(401).send();
    //                         }
    //                     });
    //                 })
    //                 .catch(function (error) {
    //                     res.status(500).send(error);
    //                 })
    //             break;
    //         default:
    //             res.status(400).send("Invalid type");
    //             break;
    //     }
    // })
}

// function isLoggedIn(req, res, next) {
//     if (req.isAuthenticated())
//         return next();
//     res.redirect('/');
// }
