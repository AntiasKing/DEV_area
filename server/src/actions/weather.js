var request = require("request");

function logEvery1Seconds(i) {
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
            if (res.indexOf("rain") > -1 || res.indexOf("Rain") > -1) {
                return(1);
            }
        });
    logEvery1Seconds(++i);
    }, 100)
}

logEvery1Seconds(0);