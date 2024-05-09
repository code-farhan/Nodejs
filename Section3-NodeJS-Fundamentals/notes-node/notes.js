const fs = require('fs');

var fetchNotes = () => {
    //fetch precious notes
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return  JSON.parse(notesString);
    } catch (error) {
        // meh
        console.log('No previous Notes found, we start over ;) ');
        return [];
    }
};

var saveNotes = (notes) => {
    // save/update the file
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    // all the notes
    var notes = fetchNotes();
    // individual note, which will represent a new note
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter( (note) => {
        // if true, add this note to the duplicateNotes arr
        return note.title === title;
    } );

    if (duplicateNotes.length === 0){
        // add the note to the end of notes array
        notes.push(note);
        saveNotes(notes);
        return note;
    } else {
        console.log('/!\\ A note with the same title, already exist!');
    }
};

var getAll = () => {
    // get all notes and return them
    return fetchNotes();
};

var getNote = (title) => {
    // fetch all notes
    var notes = fetchNotes();
    // match the 'title' to an existing note
    var foundNotes = notes.filter( (note) => note.title === title );
    // return the result
    return foundNotes[0];

};

var removeNote = (title) => {
    // fetch the note
    var notes = fetchNotes();
    // filter notes, removing the one with title of argument
    var filteredNotes = notes.filter( (note) => {
        // if true, remove this note to the notes arr
        return note.title !== title;
    } );
    // save new notes array
    saveNotes(filteredNotes);

    // return true if we removed a note, false otherwise
    return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
    // break on this line and use repl to output note
    // use read command with --title
    debugger;
    console.log('----');
    console.log(`Title: ${note.title}`);
    console.log(`Body:  ${note.body}`);
};

// export the function we want to use in the app.js
module.exports = {
    // ES6: addNote: addNote
    // When property and value is the same you can just use: addNote
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
