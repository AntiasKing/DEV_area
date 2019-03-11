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
									let index = 0;
									spotify.playlist.forEach(function (playlist) {
										if (playlist.id === object.id) {
											present = 1;
											console.log("test1");
											console.log("id1: "+playlist.snapshot_id);
											console.log("id2: "+object.snapshot_id);
												if (playlist.snapshot_id !== object.snapshot_id) {
												console.log("test2");
												if (childSnapshot.val().applets) {
													childSnapshot.val().applets.forEach(function(appletsnap) {
														if (appletsnap.playlistID) {
															if (playlist.id === appletsnap.playlistID) {
																if (appletsnap.actionID === 0) {
																	console.log(playlist.tracks);
																	console.log(playlist.tracks.length);
																	console.log(object.tracks);
																	console.log(object.tracks.length);
																	if (playlist.tracks.length < object.tracks.length) {
																		console.log("test3");
																		action.detectSpotify(object, appletsnap, childSnapshot);
																	}
																}
															}
														}
													});
												}
												spotify.playlist[index] = object;
												index++;
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