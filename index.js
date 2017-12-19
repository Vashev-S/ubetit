const express = require('express')
const app = express()

app.get('/', (req, res) => {
    var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://www.wunderground.com/cgi-bin/findweather/getForecast?&query=" + 02888;

    request(url, function (error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                temperature = $("[data-variable='temperature'] .wx-value").html();

            console.log("Температура " + temperature + " градусов по Фаренгейту.");
        } else {
            console.log("Произошла ошибка: " + error);
        }
    });
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))


