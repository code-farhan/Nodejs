console.log('Starting App..');

/**
 * setTimeout()
 * @param {Function} callback - is a callback function the will run after the delay
 * @param {number} delay - the time delay in ms
 */
setTimeout( () => {
    console.log('Inside of callback.');
}, 2000 );


setTimeout( () => {
    console.log('Inside of callback 2.');
}, 0);


console.log('Finishing up!');


/**
 * Output:
 Starting App..
 Finishing up!
 Inside of callback 2.
 Inside of callback.
*/