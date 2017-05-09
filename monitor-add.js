/*
|--------------------------------------------------------------------------
| Requires
|--------------------------------------------------------------------------
*/

var request = require('request');
var apiDetails = require('./api-details.js');

/*
|--------------------------------------------------------------------------
| Constants
|--------------------------------------------------------------------------
*/

const {baseAPIURL, apiKey} = apiDetails;


/*
|--------------------------------------------------------------------------
| App Variables
|--------------------------------------------------------------------------
*/

// Contact ID to notify
let alertContactID = '0430898';

// How frequently to check each monitor (in seconds)
let interval = 60;

// How long each monitor needs to be down before notifying (in minutues)
let threshold = 30;

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
*/

function addMonitor(name, url) {
    request.post(
        baseAPIURL + '/newMonitor',
        {
            json: {
                api_key: apiKey,
                friendly_name: name,
                url: url,
                type: 1,
                interval: interval,
                alert_contacts: `${alertContactID}_${threshold}_0`
            }
        },
        function (error, response, body) {
            if ( !error && response.statusCode == 200) {

                if (body.stat === 'fail') {
                    console.log(`Monitor for "${name} [${url}]" could not be added.`);
                    console.log(body);
                } else {
                    console.log(`Monitor for "${name} [${url}]" successfully added.`);
                }

            } else {
                console.log(body);
            }
        }
    )
}

module.exports = addMonitor;

/*
|--------------------------------------------------------------------------
| Running Code
|--------------------------------------------------------------------------
*/

// Get CLI arguments
let args = process.argv.slice(2);

if (args.length < 2) {
    console.log(`Usage: monitor-add.js [monitor-name] [monitor-url]`);
    return;
}

let niceName = args[0];
let url = args[1];

addMonitor(niceName, url);