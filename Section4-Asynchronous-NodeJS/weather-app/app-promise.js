/**
 * File    : app.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 14/9/2017
 */
const yargs = require('yargs');
const axios = require('axios');
const darkSkyKey = require('./weather/darksky.io.API_KEY');

// options for our app
const argv = yargs
    .options({
        address: {
            demand: true,
            alias: 'a',
            describe: 'Address to fetch weather for',
            string: true,
            default: "Thessaloniki, Greece",
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

// get the API Key for darksky.net
const API_KEY = darkSkyKey.darkSkyAPIKey();

// make an HTTP request by using the get() method from axios
axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        /* "ZERO_RESULTS" indicates that the geocode was successful but returned no results.
         * This may occur if the geocoder was passed a non-existent address.*/
        throw new Error(`Unable to find that address: "${argv.address}".`);
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lng}?units=ca`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then((response) => {
    var summary = response.data.currently.summary;
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently '${summary}' with the temperature at ${temperature} Celsius. And it feels like ${apparentTemperature}`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log(`Unable to connect to API servers.\n ${e}`);
    } else {
        console.log(e.message);
    }
});
