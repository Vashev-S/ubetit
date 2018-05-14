const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const bot = require('./bot/bot');
const grabber = require('./grabber/grabber');
const phantomGrabber = require('./grabber/phantomGrab');

express()
    .use(express.static(path.join(__dirname, 'public')))
    .get('/wow', (req, res) => {
        phantomGrabber.getData();
        //grabber.getLiveFootball();

//bot.start();
//grabber.getTemperature();
    })
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
