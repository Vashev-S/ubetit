/*
const express = require('express')
const app = express()
//const PORT = process.env.PORT || 5000

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

//app.listen(PORT, () => console.log(`Example app listening on port ${ PORT }`))

app.listen(1005, () => console.log(`Example app listening on port !@#@!#@!`))
**/

const express = require('express')
const path = require('path')
const request = require("request")
const cheerio = require("cheerio")
const PORT = process.env.PORT || 1021

express()
    .use(express.static(path.join(__dirname, 'public')))
   // .set('views', path.join(__dirname, 'views'))
   // .set('view engine', 'ejs')
    .get('/wow', (req, res) => {
    /*var request = require("request"),
    cheerio = require("cheerio"),*/
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
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
