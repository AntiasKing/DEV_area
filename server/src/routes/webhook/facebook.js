const verifyToken = "Bonjour la mifa";

module.exports = function (router, usersRef) {
    router.get('/webhook/facebook', function (req, res) {
        console.log(req.query['hub.mode']);
        console.log(req.query['hub.challenge']);
        console.log(req.query['hub.verify_token']);
        if (req.query['hub.verify_token'] === verifyToken) {
            return res.status(200).send(req.query['hub.challenge']);
        }
        return res.status(401).send();
    });

    router.post('/webhook/facebook', function (req, res) {
        // console.log('===============================');
        // console.log(req.body);
				// console.log('-------------------------------');
        // console.log(req.body.entry);
				// console.log('-------------------------------');
				// console.log(req.body.entry[0].changes)
        // console.log('===============================');
				searchApplet(req.body);
        return res.status(200).send();
    })

		function searchApplet(webhook) {
			usersRef.once('value')
					.then(function (snapshot) {
						snapshot.forEach(function(childSnapshot) {
							if (childSnapshot.val().facebook && childSnapshot.val().facebook.email == "axel.vandenabeele@gmail.com") {
								if (childSnapshot.val().applets) {
									childSnapshot.val().applets.forEach(function (appletsnap) {
										if (appletsnap.serviceToID == 0 && appletsnap.on) {
											let user = childSnapshot.val();
											action.detectFacebookAction(webhook, appletsnap, user);
										}
									})
								}
							}
						})
					})
		}

}
