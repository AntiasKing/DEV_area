import twitchFollows from "../webhooks/twitch.js"

function followSomeone(twitchID) {
	TwitchFollows(twitchID, 0);
}

function getFollowed(twitchID) {
	TwitchFollows(twitchID, 1);
}