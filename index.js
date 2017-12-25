const express = require('express')
const path = require('path')
const request = require("request")
const cheerio = require("cheerio")
const PORT = process.env.PORT || 5000

//Require
var bot = require('./bot/bot');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .get('/wow', (req, res) => {
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
    })
    .get('/botStart', (req, res) => {
        bot.start();
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))