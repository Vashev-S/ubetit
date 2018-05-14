const phantom = require('phantom');

module.exports = {
    getData: function() {
        (async function() {
            const instance = await phantom.create();
            const page = await instance.createPage();
            await page.on('onResourceRequested', function(requestData) {
                //console.log('sas = ', requestData.getElementsByClassName('jc-sp-between')[0]);
                //console.info('Requesting', requestData.url);
            });

            const status = await page.open('https://stackoverflow.com/', function() {
                console.log("Status: " + status);
                if(status === "success") {
                    page.evaluate(function() {
                        document.getElementsByClassName('jc-sp-between')[0];
                        console.log(document.getElementsByClassName('jc-sp-between')[0]);

                    });
                }
                phantom.exit();
            });
            const content = await page.property('content');
            //console.log(content);

            await instance.exit();
        })();
    }
}