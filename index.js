const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5001

const bot = require('./bot/bot');
const grabber = require('./grabber/grabber');
const phantomGrabber = require('./grabber/phantomGrab');

process.title = 'ubetit';

express()
    .use(express.static(path.join(__dirname, 'public')))
    .get('/wow', (req, res) => {
        phantomGrabber.init();
        //grabber.getLiveFootball();

//bot.start();
//grabber.getTemperature();
    })
    .get('/new', (req, res) => {
var phantom = require('phantom');
var _ph, _page;
phantom.create()
  .then(function (ph) {
    _ph = ph;
    return ph.createPage();
  })
  .then(function (page) {
  	console.log('1');
    _page = page; 
     var url = "https://1xstavka.ru/live/Football/67559-Club-Friendlies/164787511-TSC-Backa-Topola-Lovcen/";
    return {page: page, status: page.open(url)};
  })
  .then(function(data) {
  	var _status = data.status,
  		_page = data.page;
	console.log('2');
	//console.log('page = ', page);
	console.log('_page = ');
_page.evaluate(function() {
console.log('2.2');
var body = document.body;
console.error(body);
console.error(document.getElementsByClassName('db-stats-table__description')[0]);
});
    return _page.includeJs("127.0.0.1:5001/jquery.min.js");
  })
  .then(function() {
	console.log('2.1');
     _page.evaluate(function() {
    	 console.log('2.2');
		console.log($('div.db__stats > div.db-stats__bottom > div > div:nth-child(1) > div.db-stats-table__description').text());
    });
  })
  .catch(function(err) {
	console.log('3', err);
    _page.close();
    _ph.exit();
  })
    })
.listen(PORT, () => console.log(`Listening on ${ PORT }`))
