const express = require('express')
const app = express()

app.get('/', (req, res) => {
    var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02888;

    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                temperature = $('.wu-value-to').html();

            console.log("Температура " + temperature + " градусов по Фаренгейту.111");
        } else {
            console.log("Произошла ошибка: " + error);
        }
    });
})

app.listen(1003, () => console.log('Example app listening on port 1003!'))


