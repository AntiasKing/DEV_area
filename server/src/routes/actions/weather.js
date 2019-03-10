var request = require("request");

module.exports = {

	getWeather: function(applet, user, id) {
	    setTimeout(() => {
	        var options = {
	            method: 'GET',
	            url: 'http://api.apixu.com/v1/forecast.json',
	            qs: { key: '687f2f78d994457bb25130501190403', q: 'Montpellier', days: '2' }
	        };
	        request(options, function (error, response, body) {
	            if (error) throw new Error(error);
	            let Val = JSON.parse(body);
	            let res = Val.forecast.forecastday[1].day.condition.text;
							const action = require("../applets/actions");
	            if ((res.indexOf("rain") > -1 || res.indexOf("Rain") > -1) && id == 0) {
								action.setServiceAction(applet, user, null)
	            } else if ((res.indexOf("sunny") > -1 || res.indexOf("Sunny") > -1) && id == 1) {
								action.setServiceAction(applet, user, null)
							} else if ((res.indexOf("snow") > -1 || res.indexOf("Snow") > -1) && id == 2) {
								action.setServiceAction(applet, user, null)
							} else if ((res.indexOf("cloudy") > -1 || res.indexOf("Cloudy") > -1) && id == 3) {
								action.setServiceAction(applet, user, null)
							}
	        });
					console.log("new loop !!!!");
	    this.getWeather(applet);
		}, (applet.interval * 10000))
	}

}
