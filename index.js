const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
.listen(PORT, () => console.log(`Listening on ${ PORT }`))


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