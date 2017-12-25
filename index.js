const express = require('express')
const path = require('path')
const request = require("request")
const cheerio = require("cheerio")
const PORT = process.env.PORT || 5000


const Telegraf = require('telegraf')
const { reply } = Telegraf
const bot = new Telegraf('442331568:AAERSNBOgyK3700GpgPYhDrh9pMHhE3N2wY')
//Require
//var bot = require('./bot/bot');

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
    bot.use(session())

// Register logger middleware
bot.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
        const ms = new Date() - start
        console.log('response time %sms', ms)
})
})

// Random location on some text messages
bot.on('text', ({ replyWithLocation }, next) => {
    if (Math.random() > 0.2) {
    return next()
}
return Promise.all([
    replyWithLocation((Math.random() * 180) - 90, (Math.random() * 180) - 90),
    next()
])
})

// Text messages handling
bot.hears('Hey', sayYoMiddleware, (ctx) => {
    ctx.session.heyCounter = ctx.session.heyCounter || 0
ctx.session.heyCounter++
return ctx.replyWithMarkdown(`_Hey counter:_ ${ctx.session.heyCounter}`)
})

// Command handling
bot.command('answer', sayYoMiddleware, (ctx) => {
    console.log(ctx.message)
return ctx.reply('*42*', Extra.markdown())
})

bot.command('cat', ({ replyWithPhoto }) => replyWithPhoto(catPhoto))

// Streaming photo, in case Telegram doesn't accept direct URL
bot.command('cat2', ({ replyWithPhoto }) => replyWithPhoto({ url: catPhoto }))

// Look ma, reply middleware factory
bot.command('foo', reply('http://coub.com/view/9cjmt'))

// Wow! RegEx
bot.hears(/reverse (.+)/, ({ match, reply }) => reply(match[1].split('').reverse().join('')))

// Start polling
bot.startPolling()
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))