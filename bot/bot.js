/**
 * Bot controller
 */
const Telegraf = require('telegraf')
const { reply } = Telegraf
const bot = new Telegraf('442331568:AAERSNBOgyK3700GpgPYhDrh9pMHhE3N2wY')

module.exports = {
    start: function () {
        var Telegraf = require('telegraf');
        var { reply } = Telegraf;
        var bot = new Telegraf('442331568:AAERSNBOgyK3700GpgPYhDrh9pMHhE3N2wY');
        console.log('BOT is here');
        bot.command('/nigga', (ctx) => ctx.reply('Hello HUY!'))
        bot.command('/modern', ({ reply }) => reply('Yo'))
        bot.command('/hipster', reply('λ'))
        bot.startPolling()
    }
};
