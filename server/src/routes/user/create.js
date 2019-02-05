// TODO: Check user's params and send jw-token
var passport = require('passport');

module.exports = function (router, usersRef) {

	// app.get('/auth/google', passport.authenticate('google', {
	// 	scope: ['profile', 'email']
	// }));
	//
	// app.get('/auth/google/callback', passport.authenticate('google', {
	// 		successRedirect : '/profile',
	// 		failureRedirect : '/'
	// }));
	//
	// app.get('/auth/twitter', passport.authenticate('twitter'));
	//
	// app.get('/auth/twitter/callback', passport.authenticate('twitter', {
	// 		successRedirect : '/profile',
	// 		failureRedirect : '/'
	// }));

	router.post('/facebook', function(req, res, next) {
	let user = req.body.user;
	let newUsersRef = usersRef.push();
	let obj = {};
    usersRef.orderByChild(`${i.name}/${i.id}`).equalTo(user.userID).once("value")
      .then(function (snapShot) {
          if (snapShot.val()) {
            snapShot.forEach(function (childSnapShot) {
              childSnapShot.child(`${i.name}`).ref.update(user)
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
        obj[req.params.type] = user;
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

	router.post('/signup', function(req, res, next) {
  passport.authenticate('local-signup', function(err, lol, info) {
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
  			})(req, res, next);
	});
}
