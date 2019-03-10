const request = require('request');

module.exports = function () {
		function FollowPlaylist(playlistID, spotifyID, interval) {
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
											if (playlist.id === response.body.id) {
												present = 1;
												if (playlist.snapshot_id !== response.body.snapshot_id) {
													handlePlaylist(playlist, response.body, childSnapshot);
													playlist = response.body;
												}
											}
										})
										if (present === 0) {
											spotify.playlist.push(response.body);	
										}
										childSnapshot.child("spotify").ref.update(spotify);
									}
								}
							})
						})
					}
				)
			}, interval*1000);
		}

		function handlePlaylist(oldPlaylist, newPlaylist, user) {
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