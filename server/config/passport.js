var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterTokenStrategy = require('passport-twitter-token');
var configAuth = require('./auth');

var passport = require('passport');

module.exports = function (router, usersRef) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        // User.findById(id, function(err, user) {
        //     done(err, user);
        // });
    });

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            // User.findOne({ 'local.email' :  email }, function(err, user) {
            //     if (err)
            //         return done(err);
            //     if (!user)
            //         return done(null, false, req.flash('loginMessage', 'No user found.'));
            //     if (!user.validPassword(password))
            //         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
            //     return done(null, user);
            // });

        }));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            console.log("signupCall");
        }));

    passport.use(new GoogleStrategy({
        clientID: '771442074911-rrj0f6t9bungjq1e5kl3jatmq5d27c04.apps.googleusercontent.com',
        clientSecret: 'H1eckE0ltlVPpYhCU5mCBvLM',
        callbackURL: "/auth/google/callback"
    },
        function (token, refreshToken, profile, done) {
            process.nextTick(function () {
                // User.findOne({ 'google.id' : profile.id }, function(err, user) {
                //     if (err)
                //         return done(err);
                //     if (user) {
                //         return done(null, user);
                //     } else {
                //         var newUser          = new User();
                //         newUser.google.id    = profile.id;
                //         newUser.google.token = token;
                //         newUser.google.email = profile.emails[0].value;
                //         newUser.google.name  = profile.displayName;
                //         newUser.save(function(err) {
                //             if (err)
                //                 throw err;
                //             return done(null, newUser);
                //         });
                //     }
                // });
            });
        }
    ));

    passport.use(new TwitterTokenStrategy({
        consumerKey: 'Vr3UJYSKvR4BNEcrwCMoUrbtX',
        consumerSecret: 'e8YXYMWEhF3jIB3pzxBmRRJkE663gUtphfOMj9J5aH6HEHWdFF',
        includeEmail: true
    },
        function (token, refreshToken, profile, done) {
            let user = profile;
            user.token = token;
            user.refreshToken = refreshToken;
            let newUsersRef = usersRef.push();
            let obj = {};
            usersRef.orderByChild("twitter/id").equalTo(user.id).once("value")
                .then(function (snapShot) {
                    if (snapShot.val()) {
                        snapShot.forEach(function (childSnapShot) {
                            childSnapShot.child("twitter").ref.update(user)
                                .then(function () {
                                    return done(null, user);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    return done(error, user);
                                });
                        });
                        return;
                    }
                    obj["twitter"] = user;
                    newUsersRef.set(obj)
                        .then(function () {
                            console.log("Successfully created new user:", user);
                            return done(null, user);
                        }).catch(function (error) {
                            console.log("Error creating new user:", error);
                            return done(error, user);
                        })
                })
                .catch(err => {
                    console.log(err);
                    return done(err, user);
                });
        }
    ));

    passport.use(new FacebookStrategy({
        clientID: '299279974011153',
        clientSecret: '655373be793d6a341e42bdd38ff438bb',
        callbackURL: '/auth/facebook/callback'
    },
        function (token, refreshToken, profile, done) {
            console.log("facebookCall");
            User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, user);
                } else {
                    let user = req.body.user;
                    let newUsersRef = usersRef.push();
                    let obj = {};
                    obj[req.params.type] = user;
                    newUsersRef.set(obj)
                        .then(function () {
                            console.log("Successfully created new user:", user);
                            res.status(201).send(newUsersRef.key);
                        })
                        .catch(function (error) {
                            console.log("Error creating new user:", error);
                            res.status(500).send(error);
                        });
                    return;
                }
            });
        }
    ));


};
