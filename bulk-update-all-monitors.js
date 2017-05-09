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

// How frequently to check each monitor (in seconds)
let interval = 60;

// How long each monitor needs to be down before notifying in minutues
let threshold = 30;

/*
|--------------------------------------------------------------------------
| Running Code
|--------------------------------------------------------------------------
*/

request.post(
    baseAPIURL + '/getMonitors',
    {
        json: {
            api_key: apiKey,
            alert_contacts: true
        }
    },
    function (error, response, body) {
        if ( !error && response.statusCode == 200) {

            body.monitors.forEach( (monitor) => {

                console.log(`Attempting to edit monitor for ${monitor.friendly_name}`);
                request.post(
                    baseAPIURL + '/editMonitor',
                    {
                        json: {
                            api_key: apiKey,
                            id: `${monitor.id}`,
                            alert_contacts: `${monitor.alert_contacts[0].id}_${threshold}_0`,
                            interval: `${interval}`
                        }
                    },
                    function( error, response, body ) {
                        if ( !error && response.statusCode == 200) {
                            console.log(`Successfully edited monitor for ${monitor.friendly_name}`);
                        }
                    }
                )

            });

        } else {
            console.log(body);
        }
    }
)