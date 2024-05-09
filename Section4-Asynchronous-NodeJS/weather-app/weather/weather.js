/**
 * File    : weather.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 15/9/2017
 */
const request = require('request');
const darkSkyKey = require('./darksky.io.API_KEY');

// get the API Key for darksky.net
const API_KEY = darkSkyKey.darkSkyAPIKey();

/**
 * For our weather data, we will use the DarkSky.net API
 * @url: https://www.darksky.net/dev/
 * @ExampleRequest: https://api.darksky.net/forecast/API_KEY/37.8267,-122.4233
 */
var getWeather = (lat, lng, callback) => {

    request({
        url: `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}?units=ca`,
        json: true
    }, (error, response, body) => {
        if (error){
            callback(`Unable to connect to DarkSky.net server.`);
        } else if (response.statusCode === 400){
            callback(`Unable to fetch weather.`);
        }else if (response.statusCode === 200){
            // all good, so print the temp and weather description
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });
};


// export the function we want to use in the app.js
module.exports.getWeather = getWeather;