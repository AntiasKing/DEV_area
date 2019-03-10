const request = require('request');

module.exports = {
		FollowPlaylist: function(playlistID, spotifyID, interval, usersRef, access_token) {
			let polling = setInterval(() => {
				request.get({
					url: 'https://api.spotify.com/v1/playlists/'+playlistID,
					headers: {
						'Authorization': 'Bearer '+access_token
					}
				}, function (err, response, body) {
					if (err) {
						console.log(err);
						return res.status(500).send(err);
					}
					object = JSON.parse(body);
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
										spotify.playlist.forEach(function (playlist) {
											if (playlist.id === object.id) {
												present = 1;
												if (playlist.snapshot_id !== object.snapshot_id) {
													handlePlaylist(playlist, object, childSnapshot);
													playlist = object;
												}
											}
										})
										if (present === 0) {
											spotify.playlist.push(object);	
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