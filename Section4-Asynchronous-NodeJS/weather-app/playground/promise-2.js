/**
 * File    : promise-2.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 25/9/2017
 */
const request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        var encodedAddress = encodeURIComponent(address);

        // make a request to Google Maps Geocoding API  and expect a json as answer
        // more info about the API: https://developers.google.com/maps/documentation/geocoding/start
        request({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true
        }, (error, response, body) => {
            // handle machine errors via error obj, e.g.: unable to connect to connect to a network
            // handle errors coming fom other server, e.g.: the Google server, like invalid address
            if (error) {
                reject(`Unable to connect to Google servers.\n ${error}`);
            } else if (body.status === 'ZERO_RESULTS') {
                /* "ZERO_RESULTS" indicates that the geocode was successful but returned no results.
                 * This may occur if the geocoder was passed a non-existent address.*/
                reject(`Unable to find that address: "${address}".`);
            } else if (body.status === 'OVER_QUERY_LIMIT') {
                /* "OVER_QUERY_LIMIT" indicates that you are over your quota. */
                reject(`Busted! You are over your quota.`);
            } else if (body.status === 'REQUEST_DENIED') {
                /* "REQUEST_DENIED" indicates that your request was denied. */
                reject(`You found AREA 52 - Your request was denied.`);
            } else if (body.status === 'INVALID_REQUEST') {
                /* "INVALID_REQUEST" generally indicates that the query
                 * (address, components or latlng) is missing. */
                reject(`WoW! maybe type an address first ?`);
            } else if (body.status === 'UNKNOWN_ERROR') {
                /* "UNKNOWN_ERROR" indicates that the request could not be processed due to a
                 * server error. The request may succeed if you try again. */
                reject(`Opps. Shit happens. Try again please!`);
            } else if (body.status === 'OK') {
                /* "OK" all good! Finally.. or not? */
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });

};



geocodeAddress('Thessaloniki, Greece' +
    ' Greece').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage);
});