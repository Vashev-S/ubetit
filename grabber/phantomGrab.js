const phantom = require('phantom');

module.exports = {
    getData: function() {
        (async function() {
            const instance = await phantom.create();
            const page = await instance.createPage();
            await page.on('onResourceRequested', function(requestData) {
                //console.log('sas = ', requestData.getElementsByClassName('jc-sp-between')[0]);
                console.info('Requesting', requestData.url);
            });

            const status = await page.open('https://stackoverflow.com/');

            page.evaluate(function() {
                return document.getElementsByClassName('jc-sp-between')[0].innerHTML;
            }).then(function(html){
                console.log(html);
            });

            const content = await page.property('content');
            //console.log(content);

            await instance.exit();
        })();
    }
}