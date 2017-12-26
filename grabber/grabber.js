/**
 * Grabber controller
 */
const request = require("request")
const cheerio = require("cheerio")
const oneXbet = "http://1xbet.com/"

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
    },
    getLiveFootball: function() {
        var liveFootBall = oneXbet + 'en/live/Football/';

        request(liveFootBall, function (error, response, body) {
            if (!error) {
                var $ = cheerio.load(body);
                    $('div.c-events__item').each(function(index) {
                        var minutes = $(this)
                            .find('.c-events__time')
                            .children('span').text()
                            .substring(-2 , 2);
                        minutes = parseInt(minutes);
                        if (minutes < 16 && minutes > 12) {
                            console.log('omfgThis is IT! ' + minutes);
                        } else {
                            console.log('wrong one time ' + minutes);
                        }
                    });


                console.log("Температура " + $('div.c-events__item')[0] + " градусов по Фаренгейту.111");
            } else {
                console.log("Произошла ошибка: " + error);
            }
        });
    }
};
