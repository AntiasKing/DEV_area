const action = require('../applets/actions');
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
								if (spotify.id === spotifyID) {
									if (!spotify.playlist) {
										spotify.playlist = [];
									}
									console.log("test");
									spotify.playlist.forEach(function (playlist) {
										if (playlist.id === object.id) {
											console.log("test2");
											present = 1;
											if (playlist.snapshot_id !== object.snapshot_id) {
												console.log("test3");
												(playlist, object, childSnapshot);
												console.log("test4");
												if (childSnapshot.val().applets) {
													console.log("test5");
													childSnapshot.val().applets.forEach(function(appletsnap) {
														console.log("test6");
														if (appletsnap.playlistID) {
															if (playlist.id === appletsnap.playlistID) {
																if (appletsnap.actionID === 0) {
																	if (playlist.tracks.length < object.tracks.length) {
																		action.detectSpotify(object, appletsnap, childSnapshot);
																	}
																}
															}
														}
													});
												}
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
	}
};