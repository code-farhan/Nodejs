/**
 * File    : app.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 14/9/2017
 */
const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

// options for our app
const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently '${weatherResults.summary}' with the temperature at ${weatherResults.temperature} Celsius. And it feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
});

