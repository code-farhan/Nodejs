// --- Statement syntax ---
// you can have as many line of code as you need
// code must be in {} and the return keyword is needed
var square = (x) => {
  var result = x*x;
  return result;
};

console.log('square(9):', square(9));

// --- Expression syntax ---
// we have only one line of code and
// we do not need {} and
// the return keyword is not needed also
var square_v2 = (x) =>  x*x;
console.log('square_v2(9):', square_v2(9));

// In arrow functions:
// when you have 1 argument, the parenthesis is not needed
// while they are needed when we have zero or 2 and more arguments

var user = {
    name: 'Tolios',
    sayHi: () => {
        // with arrow functions, the arguments object is not bind
        console.log(arguments);
        // with arrow functions, the this keyword is NOT bound
        console.log(`Hi. I'm ${this.name}`);
    },
    sayHiAlt () {
        // prefer this syntax for defining methods
        console.log(arguments);
        console.log(`Hi. I'm ${this.name}`);
    }
};

user.sayHi(1, 2, 3);
user.sayHiAlt(1, 2, 3);

// In GENERAL, when you Need the "this" keyword or the "argument" object AVOID the arrow functions!