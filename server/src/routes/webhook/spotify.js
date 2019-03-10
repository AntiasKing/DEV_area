const request = require('request');

module.exports = {
		FollowPlaylist: function(playlistID, spotifyID, interval) {
			let polling = setInterval(() => {
				request.get({
					url: 'https://api.spotify.com/v1/playlists/'+playlistID,
					headers: {
						'Authorization': 'Bearer '+spotifyID
					}
				}, function (err, response, body) {
					if (err) {
						console.log(err);
						return res.status(500).send(err);
					}
					console.log(body);
					let present = 0;
					usersRef.once('value')
						.then(function (snapshot) {
							snapshot.forEach(function (childSnapshot) {
								if (childSnapshot.val().spotify) {
									let spotify = childSnapshot.val().spotify;
									if (spotify.spotify.id === spotifyID) {
										if (!spotify.playlist) {
											spotify.playlist = [];
										}
										spotify.playlist.push();
										spotify.playlist.forEach(function (list) {
											if (playlist.id === body.id) {
												present = 1;
												if (playlist.snapshot_id !== body.snapshot_id) {
													handlePlaylist(playlist, body, childSnapshot);
													playlist = body;
												}
											}
										})
										if (present === 0) {
											spotify.playlist.push(body);	
										}
										childSnapshot.child("spotify").ref.update(spotify);
									}
								}
							})
						})
					}
				)
			}, interval*1000);
		},

		handlePlaylist: function(oldPlaylist, newPlaylist, user) {
			if (user.val().applets) {
				user.val().applets.forEach(function(appletsnap) {
					if (appletsnap.playlistID) {
						if (oldPlaylist.id === appletsnap.playlistID) {
							if (appletsnap.actionID === 0) {

							}
						}
					}
				});
			}
		}
	};