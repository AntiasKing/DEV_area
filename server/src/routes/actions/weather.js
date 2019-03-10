var request = require("request");

module.exports = {

	getWeather: function(applet, user, id) {
	    setTimeout(() => {
	        var options = {
	            method: 'GET',
	            url: 'http://api.apixu.com/v1/forecast.json',
	            qs: { key: '7e7ac12f12194438bfd132440191003', q: 'Montpellier', days: '2' }
	        };
	        request(options, function (error, response, body) {
	            if (error) throw new Error(error);
	            let Val = JSON.parse(body);
							let cond = Val.forecast.forecastday[1].day.condition.text;
							let events = Val.forecast.forecastday[1].day;
							const action = require("../applets/actions");
	            if ((cond.indexOf("rain") > -1 || cond.indexOf("Rain") > -1) && id == 0) {
								action.setServiceAction(applet, user, null)
	            }
							if ((cond.indexOf("sunny") > -1 || cond.indexOf("Sunny") > -1) && id == 1) {
								action.setServiceAction(applet, user, null)
							}
							if ((cond.indexOf("snow") > -1 || cond.indexOf("Snow") > -1) && id == 2) {
								action.setServiceAction(applet, user, null)
							}
							if ((cond.indexOf("cloudy") > -1 || cond.indexOf("Cloudy") > -1) && id == 3) {
								action.setServiceAction(applet, user, null)
							}
							if (events.maxwind_kph >= 50 && id == 4) {
								action.setServiceAction(applet, user, null)
							}
							if (events.max_temp_c >= 20 && id == 5) {
								action.setServiceAction(applet, user, null)
							}
							if (events.min_temp_c < 10 && id == 6) {
								action.setServiceAction(applet, user, null)
							}
	        });
	    this.getWeather(applet, user, id);
		}, (applet.interval * 60000))
	},

	timer: function(applet, user) {
		setTimeout(() => {
			const action = require("../applets/actions");
			action.setServiceAction(applet, user, null)
	}, (applet.interval * 60000))
	}

}
