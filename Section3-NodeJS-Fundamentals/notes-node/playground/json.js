// ** Convert an object into a string **
// var obj = {
//   name: 'Tolis'
// };
// var stringObj = JSON.stringify(obj);
// console.log(typeof stringObj);
// console.log(stringObj);

// ** Convert a string into an object **
// var personString = '{"name": "Tolis","age": 30}';
// var person = JSON.parse(personString);
// console.log(typeof person);
// console.log(person);

const fs = require('fs');

// Note object
var originalNote = {
    title: 'Some title',
    body: 'Some body'
};

//originalNoteString
var originalNoteString = JSON.stringify(originalNote);

// write the note to a json file
fs.writeFileSync('notes.json', originalNoteString);

// read/get the saved json file
var noteString = fs.readFileSync('notes.json');

// convert the string note into an Object again
var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);







