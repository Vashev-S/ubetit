const phantom = require('phantom');

const cheerio = require("cheerio")

const oneXbet = "http://1xbet.com/"

module.exports = {
    getData: function() {
        var that = this;
        (async function() {
            const instance = await phantom.create();
            const page = await instance.createPage();
            await page.on('onResourceRequested', function(requestData) {
                //console.log('sas = ', requestData.getElementsByClassName('jc-sp-between')[0]);
                console.info('Requesting', requestData.url);
            });

            const status = await page.open('http://1xbet.com/en/live/Football/');

            page.evaluate(function() {
                return document.getElementsByTagName('body')[0].innerHTML;
            }).then(function(html){
                that.getLiveFootball(html);
            });

            const content = await page.property('content');
            //console.log(content);

            await instance.exit();
        })();
    },

    /**
     *
     */
    getLiveFootball: function(body) {
        var that = this;
console.log('LETSROLL');
        var $ = cheerio.load(body),
            league;
        //Get league
        league = $($('#games_content').find('div')[1]);
        //console.log(league[0]);
console.log('TEST ===', league);
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
                   // that.checkGame();
                    //console.log('omfgThis is IT! ' + minutes, gameLink, leaguName);
                } else {
                    gameLink = $(this).find('a').attr('href');
                   // that.checkGame(gameLink);
                    //console.log('wrong one time ' + minutes, gameLink, leaguName);
                }
            });
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

                //description = $('div.db-stats__bottom-table')[0];
                description = $('div.sports_widget')
                    .find('div.game_content_line.on_main ')
                    .find('#games_content')
                    .find('.main_game')[0];

                gameName = $('#page_title > span').text();

                console.log(gameName);
                console.log(description);
            } else {
                console.log("Произошла ошибка: " + error);
            }
        });
    }
}