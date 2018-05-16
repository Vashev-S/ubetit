const phantom = require('phantom');

const cheerio = require('cheerio');

const oneXbet = 'http://1xbet.com/';

module.exports = {

    /**
     * Initialize
     */
    init: function() {
        this.getPage('http://1xbet.com/en/live/Football/', this.getLiveFootball.bind(this));
    },

    /**
     * Get page by URL
     * @param {String} url - url of the getting page
     * @param {Function} callBack - function which will be call after getting page
      */
    getPage: function(url, callBack) {
        var that = this;
        (async function() {
            const instance = await phantom.create();
            const page = await instance.createPage();
            await page.on('onResourceRequested', function(requestData) {
                //console.log('sas = ', requestData.getElementsByClassName('jc-sp-between')[0]);
                //console.info('Requesting', requestData.url);
            });

            const status = await page.open(url);

            page.evaluate(function() {
                setTimeout(function() {}, 10000);
                return document.getElementsByTagName('body')[0].innerHTML;
            }).then(function(html) {
                callBack(html);
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
        league.each(function(index) {
            var leaguName = $(this)
                .find('.c-events__item_head')
                .find('c-events__name')
                .children('span')
                .text();
           /* $('div.c-events__item').each(function() {
                var minutes, gameLink;
                minutes = $(this)
                    .find('.c-events__time')
                    .children('span').text()
                    .substring(-2 , 2);
                minutes = minutes ? parseInt(minutes) : 0;

                if (minutes < 16 && minutes > 12) {
                    gameLink = $(this).find('a').attr('href');
                    that.openGame(gameLink);
                    console.log('omfgThis is IT! ' + minutes, gameLink, leaguName);
                } else {
                    gameLink = $(this).find('a').attr('href');
                    that.openGame(gameLink);
                    console.log('wrong one time ' + minutes, gameLink, leaguName);
                }
            });*/
            var game = $('div.c-events__item')[0];
            var gameLink = $(game).find('a').attr('href');
            that.openGame(gameLink);
        });
    },

    /**
     *
     * @param link
     */
    openGame: function(link) {
        var gameLink = oneXbet + link;
        gameLink = 'https://1xstavka.ru/live/Football/211739-Japan-Nabisco-Cup/160036529-Shonan-Bellmare-V-Varen-Nagasaki/';
        this.getPage(gameLink, this.checkGame.bind(this));
    },

    /**
     *
     * @param body
     */
    checkGame: function(body) {
        var $ = cheerio.load(body),
            description, gameName;
console.log('checkGame');
        //description = $('div.db-stats__bottom-table')[0];
        /*description = $('div.sports_widget')
            .find('div.game_content_line.on_main ')
            .find('#games_content')
            .find('.main_game')[0];*/
description = $('div.db__stats > div.db-stats__bottom > div > div:nth-child(1) > div.db-stats-table__description').text();

        gameName = $('#page_title > span').text();

        console.log(gameName);
        console.log('description = ', description);
        console.log('table = ', $('div.db-stats__bottom-table')[0]);

    }
}