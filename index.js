const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bot = require('./bot/bot');
const grabber = require('./grabber/grabber');
/**
const Telegraf = require('telegraf')
const { reply } = Telegraf
const bot = new Telegraf('442331568:AAERSNBOgyK3700GpgPYhDrh9pMHhE3N2wY')*/

express()
    .use(express.static(path.join(__dirname, 'public')))
    .get('/wow', (req, res) => {
        grabber.getLiveFootball();
//bot.start();
//grabber.getTemperature();
    })
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
