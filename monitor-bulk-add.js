const fs = require('fs');

const addMonitor = require('./monitor-add.js');

let filename = './sites.txt';

fs.readFile( filename, 'utf8', (err, data) => {

    if (err) console.log(err);

    // Split data into an array of lines & remove blank lines
    let dataAsLines = data.split('\n').filter( data => data !== "" );

    // Create logical data structure
    let names = dataAsLines.filter( (element, index) => index % 2 === 0 )
    let urls = dataAsLines.filter( (element, index) => index % 2 === 1 )
    let namesAndUrls = [];
    for (var i = 0; i < names.length; i++) {
        let site = {
            name: names[i].trim(),
            url: urls[i].trim()
        };
        namesAndUrls.push(site)
    }

    namesAndUrls.forEach( site => {
        addMonitor(site.name, site.url);
    });

});