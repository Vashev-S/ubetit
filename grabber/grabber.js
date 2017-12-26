/**
 * Grabber controller
 */
var cheerio = require("cheerio")

const request = require("request")
const oneXbet = "http://1xbet.com/"
const cheerioAdv = require('cheerio-advanced-selectors')

cheerio = cheerioAdv.wrap(cheerio)

module.exports = {
    matches: {},
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
    /**
     *
     */
    getLiveFootball: function() {
        var liveFootBall = oneXbet + 'en/live/Football/',
            that = this;

        request(liveFootBall, function (error, response, body) {
            if (!error) {
                var $ = cheerio.load(body),
                    league;
                //Get league
                league = $($('#games_content').find('div')[1]);
                //console.log(league[0]);
                league.each(function(index) {
                    var leaguName = $(this)
                        .find('.c-events__item_head')
                        .find('c-events__name')
                        .children('span')
                        .text();
                    $('div.c-events__item').each(function() {
                        var minutes, gameLink;
                        minutes = $(this)
                            .find('.c-events__time')
                            .children('span').text()
                            .substring(-2 , 2);
                        minutes = minutes ? parseInt(minutes) : 0;

                        if (minutes < 16 && minutes > 12) {
                            gameLink = $(this).find('a').attr('href');
                            that.checkGame();
                            //console.log('omfgThis is IT! ' + minutes, gameLink, leaguName);
                        } else {
                            gameLink = $(this).find('a').attr('href');
                            that.checkGame(gameLink);
                            //console.log('wrong one time ' + minutes, gameLink, leaguName);
                        }
                    });
                });


                console.log("Температура " + $('div.c-events__item')[0] + " градусов по Фаренгейту.111");
            } else {
                console.log("Произошла ошибка: " + error);
            }
        });
    },
    /**
     *
     */
    checkGame: function (link) {
        var gameLink = oneXbet + link;

        request(gameLink, function (error, response, body) {
            if (!error) {
                var $ = cheerio.load(body),
                    description, gameName;

                description = $('.db-stats-table__group')[5];
                description = $('#games_content > div.SSR > div > div.mainTablo > div.double_tabloR.quadBoard.soccer.notVideo.smallBoard.twoSt.notZone.tblMinD > div.tablo_dual_board > div.db__stats > div.db-stats__bottom > div > div:nth-child(24) > div.db-stats-table__description').text();
                gameName = $('#page_title > span').text();

                console.log(gameName + 'tuc');
                console.log(description);
            } else {
                console.log("Произошла ошибка: " + error);
            }
        });
    }
};
