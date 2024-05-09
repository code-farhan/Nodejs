/**
 * File    : utils.test.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 1/10/2017
 */
const expect = require('expect');

const utils = require('./utils');

describe('Utils', () => {

    describe('#add', () => {
        it('should add two numbers', () => {
            var res = utils.add(33, 11);

            expect(res).toBe(44).toBeA('number');
        });
    });


    it('should async add two numbers', (done) => {
        utils.asyncAdd(4, 3, (sum) => {
            expect(sum).toBe(7).toBeA('number');
            done();
        })
    });

    it('should square a number', () => {
        var res = utils.square(5);

        expect(res).toBe(25).toBeA('number');
    });

    it('should async square a number', (done) => {
        utils.asyncSquare(3, (square) => {
            expect(square).toBe(9).toBeA('number');
            done();
        })
    });
});


// it('should expect some values', () => {
//     expect(12).toNotBe(11);
//     expect({name: 'Tolios'}).toEqual({name: 'Tolios'});
//     expect({name: 'tolios'}).toNotEqual({name: 'Tolios'});
//     expect([2,3,4]).toExclude(1);
//     expect({
//         name: 'Tolios',
//         age: 30,
//         location: 'Salonika'
//     }).toInclude({
//         age:30
//     });
// });


// should verify first and last names are set
// assert it includes firstName and lastName with proper values
it('should set firstName and lastName', () => {
    var user = {location: 'Salonika', age: 30};
    var res = utils.setName(user, 'Apostolis Gouvalas');

    expect(user).toEqual(res);
    expect(res).toInclude({
        firstName: 'Apostolis',
        lastName: 'Gouvalas'
    });
    expect(res.firstName).toBeA('string');
    expect(res.lastName).toBeA('string');
});