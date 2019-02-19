var passport = require('passport');
const request = require('request');

crypto = require('crypto')

module.exports = function (router, usersRef) {

    router.get('/test', function (req, res, next) {
        res.status(201).send("test succeed !!")
    })

    router.get('/auth/twitch', function (req, res) {
        request.post({
            url: 'https://id.twitch.tv/oauth2/token',
            form: {
                client_id: 'gh2sbdqqplvq5qa89ze2h6e6zb4tur',
                client_secret: 'wazp2kxihypam497ik8umppckev9aq',
                code: req.query.code,
                grant_type: 'authorization_code',
                redirect_uri: 'https://staging-area-epitech.herokuapp.com/auth/twitch'
            }
        }, function (err, r, body) {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            console.log(body);
            return res.status(200).send(body);
        })
    });

    router.post('/google', function (req, res, next) {
        let user = req.body.user;
        let newUsersRef = usersRef.push();
        let obj = {};
        usersRef.orderByChild("google/profileObj/googleId").equalTo(user.profileObj.googleId).once("value")
            .then(function (snapShot) {
                if (snapShot.val()) {
                    snapShot.forEach(function (childSnapShot) {
                        childSnapShot.child("google").ref.update(user)
                            .then(function () {
                                res.status(200).send();
                            })
                            .catch(function (error) {
                                console.log(error);
                                res.status(500).send(error);
                            });
                    });
                    return;
                }
                obj["google"] = user;
                newUsersRef.set(obj)
                    .then(function () {
                        console.log("Successfully created new user:", user);
                        res.status(201).send(newUsersRef.key);
                    }).catch(function (error) {
                        console.log("Error creating new user:", error);
                        res.status(500).send(error);
                    })
            })
    })

    router.route('/auth/twitter/reverse')
        .post(function (req, res) {
            request.post({
                url: 'https://api.twitter.com/oauth/request_token',
                oauth: {
                    oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
                    consumer_key: 'BUai9dWTe9p2DDxhulZx6yoXq',
                    consumer_secret: 'P4kwpMLWumpxlzlAMtMFRtTBh25VVyjGElHoJrjBkNQgUDFHey'
                }
            }, function (err, r, body) {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
                res.send(JSON.parse(jsonStr));
            });
        });


    router.route('/auth/twitter')
        .post((req, res, next) => {
            request.post({
                url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
                oauth: {
                    consumer_key: 'BUai9dWTe9p2DDxhulZx6yoXq',
                    consumer_secret: 'P4kwpMLWumpxlzlAMtMFRtTBh25VVyjGElHoJrjBkNQgUDFHey',
                    token: req.query.oauth_token
                },
                form: { oauth_verifier: req.query.oauth_verifier }
            }, function (err, r, body) {
                if (err) {
                    return res.send(500, { message: err.message });
                }

                const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
                const parsedBody = JSON.parse(bodyString);

                req.body['oauth_token'] = parsedBody.oauth_token;
                req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
                req.body['user_id'] = parsedBody.user_id;

                next();
            });
        }, passport.authenticate('twitter-token', { session: false }), function (req, res, next) {
            if (!req.user) {
                return res.send(401, 'User Not Authenticated');
            }

            req.auth = {
                id: req.user.id
            };

            return res.status(200).send();
        });

    router.post('/facebook', function (req, res, next) {
        let user = req.body.user;
        let newUsersRef = usersRef.push();
        let obj = {};
        usersRef.orderByChild("facebook/userID").equalTo(user.userID).once("value")
            .then(function (snapShot) {
                if (snapShot.val()) {
                    snapShot.forEach(function (childSnapShot) {
                        childSnapShot.child("facebook").ref.update(user)
                            .then(function () {
                                res.status(200).send();
                            })
                            .catch(function (error) {
                                console.log(error);
                                res.status(500).send(error);
                            });
                    });
                    return;
                }
                obj["facebook"] = user;
                newUsersRef.set(obj)
                    .then(function () {
                        console.log("Successfully created new user:", user);
                        res.status(201).send(newUsersRef.key);
                    }).catch(function (error) {
                        console.log("Error creating new user:", error);
                        res.status(500).send(error);
                    })
            })
    })

    router.post('/user/local/login', function (req, res, next) {
        passport.authenticate('local-signin', function (err, lol, info) {
            let user = req.body.user;
            let obj = {};
            obj["local"] = user;
            usersRef.orderByChild("local/email").equalTo(user.email).once("value")
                .then(function (snapShot) {
                    if (snapShot.val()) {
                        snapShot.forEach(function (childSnapShot) {
                            childSnapShot.child("local").ref.update(user)
                                .then(function () {
                                    res.status(200).send("User Already exist");
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.status(500).send(error);
                                });
                        });
                    } else {
                        res.status(200).send("No User Found");
                    }
                })
        })(req, res, next);
    });

    router.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, lol, info) {
            let user = req.body.user;
            let newUsersRef = usersRef.push();
            let obj = {};
            obj["local"] = user;
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
        })(req, res, next);
    });
}
