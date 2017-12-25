/**
 * Grabber controller
 */
const request = require("request")
const cheerio = require("cheerio")

module.exports = {
    getTemperature: function () {
        var url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02888;
        request(url, function (error, response, body) {
            if (!error) {
                var $ = cheerio.load(body),
                    temperature = $('.wu-value-to').html();

                console.log("Температура " + temperature + " градусов по Фаренгейту.111");
            } else {
                console.log("Произошла ошибка: " + error);
            }
        });
    }
};
