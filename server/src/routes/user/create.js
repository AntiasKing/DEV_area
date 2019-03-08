var twitchWebhooks = require("../webhook/twitchCreate.js");
var passport = require('passport');
const request = require('request');
crypto = require('crypto')

module.exports = function (router, usersRef, db) {

    router.get('/test', function (req, res, next) {
        res.status(201).send("test succeed !!")
    })

    router.get('/social', function (req, res, next) {

			let data = {
				facebook: false,
				twitter: false,
				google: false,
				twitch: false,
				spotify: false
			}

			db.ref("users").child(req.query.userRef).once("value")
					.then(function (snapshot) {
						if (snapshot.val()) {
							if (snapshot.val().facebook)
								data.facebook = true;
							if (snapshot.val().twitter)
								data.twitter = true;
							if (snapshot.val().google)
								data.google = true;
							if (snapshot.val().twitch)
								data.twitch = true;
							if (snapshot.val().spotify)
								data.spotify = true;
						}
						res.status(201)
						res.setHeader('Content-Type', 'application/json');
						res.send(JSON.stringify(data));
					})

    })

		router.post('/spotify', function (req, res, next) {
			let user = req.body.user;
			let newUsersRef = usersRef.push();
			let obj = {};
			usersRef.orderByChild("spotify/access_token").equalTo(user.access_token).once("value")
					.then(function (snapShot) {
							if (snapShot.val()) {
									snapShot.forEach(function (childSnapShot) {
											childSnapShot.child("spotify").ref.update(user)
													.then(function () {
															res.status(200).send(childSnapShot.ref.path.pieces_[1]);
													})
													.catch(function (error) {
															console.log(error);
															res.status(500).send(error);
													});
									});
									return;
							}
							var email = user.data.email;
							checkServices(user, "spotify", email, res, false)
					})
		})

		router.post('/twitch', function (req, res, next) {
			let user = req.body.user;
			let newUsersRef = usersRef.push();
			let obj = {};
			usersRef.orderByChild("twitch/access_token").equalTo(user.access_token).once("value")
					.then(function (snapShot) {
							if (snapShot.val()) {
									snapShot.forEach(function (childSnapShot) {
											childSnapShot.child("twitch").ref.update(user)
													.then(function () {
															res.status(200).send(childSnapShot.ref.path.pieces_[1]);
													})
													.catch(function (error) {
															console.log(error);
															res.status(500).send(error);
													});
									});
									return;
							}
							var email = user.data.email;
							checkServices(user, "twitch", email, res, false)
					})
		})

    router.get('/auth/twitch', function (req, res) {
        let obj = {};
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
            let access_token = JSON.parse(body).access_token;
            let refresh_token = JSON.parse(body).refresh_token;
            request.get('https://api.twitch.tv/helix/users', {
                'auth': {
                    'bearer': JSON.parse(body).access_token
                }
            }, function (err, r, body) {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                let user = JSON.parse(body).data[0];
                user.access_token = access_token;
				user.refresh_token = refresh_token;
				var twitchID = user.id;
				twitchWebhooks.TwitchFollows(twitchID, 0);
				twitchWebhooks.TwitchFollows(twitchID, 1);
                let newUsersRef = usersRef.push();
                usersRef.orderByChild("twitch/id").equalTo(user.id).once("value")
                    .then(function (snapShot) {
                        if (snapShot.val()) {
                            snapShot.forEach(function (childSnapShot) {
                                childSnapShot.child("twitch").ref.update(user)
                                    .then(function () {
                                        return res.redirect('http://localhost:3000/' + '?user=' + user);
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                        res.status(500).send(error);
                                    });
                            });
                            return;
                        }
						var email = user.email;
						checkServices(user, "twitch", email, res, true)
                    })
            })
        })
    });

    router.post('/google', function (req, res, next) {
        let user = req.body.user;
        let newUsersRef = usersRef.push();
        let obj = {};
        usersRef.orderByChild("google/googleId").equalTo(user.googleId).once("value")
            .then(function (snapShot) {
                if (snapShot.val()) {
                    snapShot.forEach(function (childSnapShot) {
                        childSnapShot.child("google").ref.update(user)
                            .then(function () {
                                res.status(200).send(childSnapShot.ref.path.pieces_[1]);
                            })
                            .catch(function (error) {
                                console.log(error);
                                res.status(500).send(error);
                            });
                    });
                    return;
                }
								var mail = user.profileObj.email;
								checkServices(user, "google", mail, res, true);
            })
    })

		router.get('/auth/spotify/', function (req, res) {
			let obj = {};
			let code = req.query.code || null
			let authOptions = {
					url: 'https://accounts.spotify.com/api/token',
					form: {
							code: code,
							redirect_uri: 'http://localhost:8080/auth/spotify',
							grant_type: 'authorization_code'
					},
					headers: {
							'Authorization': 'Basic ' + (new Buffer(
									'd6606813f1904768bb612bf21e76d04f' + ':' + '0ecc6c233c974752a8edc31b299929a1'
							).toString('base64'))
					},
					json: true
			}
			request.post(authOptions, function (err, response, body) {
					if (err) {
							console.log(err);
							return res.status(500).send(err);
					}
					let access_token = body.access_token;
					let refresh_token = body.refresh_token;
					request.get({
							url: 'https://api.spotify.com/v1/me',
							headers: {
									Authorization: 'Bearer ' + body.access_token
							}

					}, function (err, response, body) {
							if (err) {
									console.log(err);
									return res.status(500).send(err);
							}
							let user = JSON.parse(body);
							user.access_token = access_token;
							user.refresh_token = refresh_token;
							let newUsersRef = usersRef.push();
							usersRef.orderByChild("spotify/id").equalTo(user.id).once("value")
									.then(function (snapshot) {
											if (snapshot.val()) {
													snapshot.forEach(function (childSnapShot) {
															childSnapShot.child("spotify").ref.update(user)
																	.then(function () {
																			return res.redirect('http://localhost:3000/' + '?user=' + user);
																	})
																	.catch(function (error) {
																			console.log(error);
																			res.status(500).send(error);
																	});
													});
													return;
											}
											var email = user.email;
											checkServices(user, "spotify", email, res, true)
											
									});
					})
			})
	});

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
						res.writeHead(200, {"status": "okok"})
						return res.status(200).send()
        });

    router.post('/facebook', function (req, res, next) {
        let user = req.body.user;
        let newUsersRef = usersRef.push();
        usersRef.orderByChild("facebook/email").equalTo(user.email).once("value")
            .then(function (snapShot) {
                if (snapShot.val()) {
                    snapShot.forEach(function (childSnapShot) {
                        childSnapShot.child("facebook").ref.update(user)
                            .then(function () {
                                res.status(200).send(childSnapShot.ref.path.pieces_[1]);
                            })
                            .catch(function (error) {
                                console.log(error);
                                res.status(500).send(error);
                            });
                    });
                    return;
                }
								var email = user.email;
								checkServices(user, "facebook", email, res, true);
							})
    })

		function checkServices(user, service, email, res, stat) {
			var refKey = "";
			var count = 0;
			usersRef.once('value')
				.then(function (snapshot) {
					 snapshot.forEach(function(childSnapshot) {

						if (childSnapshot.val().facebook && childSnapshot.val().facebook.email === email) {
							refKey = Object.keys(snapshot.val())[count];
						} else if (childSnapshot.val().twitter && childSnapshot.val().twitter.emails[0].value === email) {
							refKey = Object.keys(snapshot.val())[count];
						} else if (childSnapshot.val().google && childSnapshot.val().google.profileObj.email === email) {
							refKey = Object.keys(snapshot.val())[count];
						} else if (childSnapshot.val().twitch && childSnapshot.val().twitch.email === email) {
							refKey = Object.keys(snapshot.val())[count];
						} else if (childSnapshot.val().spotify && childSnapshot.val().spotify.email === email) {
							refKey = Object.keys(snapshot.val())[count];
						} else if (childSnapshot.val().local && childSnapshot.val().local.email === email) {
							refKey = Object.keys(snapshot.val())[count];
						}
						count++;
				});
				setTimeout(() => {
					if (refKey != "") {
						let newUsersRef = db.ref('users/'+refKey+"/"+service).update(user)
						.then(function () {
							if ((service == "twitch" || service == "spotify") && stat)
								res.redirect('http://localhost:3000/' + '?user=' + user + "&refKey=" + refKey);
							else
								res.status(200).send(refKey);
							return
						}).catch(function (error) {
							res.status(500).send();
							return
						})
					} else {
						let newUsersRef = usersRef.push();
						let obj = {};
						obj[service] = user;
						newUsersRef.set(obj)
								.then(function () {
										console.log("Successfully created new user:", user);
										if ((service == "twitch" || service == "spotify") && stat)
											res.redirect('http://localhost:3000/' + '?user=' + user + "&refKey=" + newUsersRef.key);
										else {
											res.status(200).send(newUsersRef.key);
										}
										return
								}).catch(function (error) {
										console.log("Error creating new user:", error);
										res.status(500).send();
										return
								})
					}
				}, 1000)
			});
		}

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
                                    res.status(200).send(childSnapShot.ref.path.pieces_[1]);
                                })
                                .catch(function (error) {
                                    console.log(error);
                                    res.status(500).send(error);
                                });
                        });
                    } else {
                        res.status(400).send("No User Found");
                    }
                })
        })(req, res, next);
    });

    router.post('/signup', function (req, res, next) {
        passport.authenticate('local-signup', function (err, lol, info) {
          let user = req.body.user;
					var email = user.email;
					checkServices(user, "local", email, res)
          // let newUsersRef = usersRef.push();
          // let obj = {};
          // obj["local"] = user;
          // newUsersRef.set(obj)
          //     .then(function () {
          //         console.log("Successfully created new user:", user);
          //         res.status(201).send(newUsersRef.key);
          //     })
          //     .catch(function (error) {
          //         console.log("Error creating new user:", error);
          //         res.status(500).send(error);
          //     });
          // return;
        })(req, res, next);
    });
}
