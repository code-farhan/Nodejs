// Load the fs & os core module
const fs = require('fs');

// load 3rd party modules
const _ = require('lodash'); // utility library
const yargs = require('yargs');

// load our own files - using relative paths
const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: 'The body of the note',
    demand: true,
    alias: 'b'
}

// create --help and description and aliases for each of our commands
const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .help()
    .argv; // yargs object

//var command = process.argv[2];
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if(note !== undefined && note !== null) {
        console.log('Note created successfully!');
        notes.logNote(note);
    }else{
        console.log('Note title, already in use!');
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach( (note) => notes.logNote(note) );
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if(note !== undefined && note !== null) {
        console.log('Note found!');
        notes.logNote(note);
    }else{
        console.log('Note not found!');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed.' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recognised');
}

