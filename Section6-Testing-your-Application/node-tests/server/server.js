/**
 * File    : server.js
 * Project : the-complete-nodejs-developer-course-2
 * Author  : Apostolos Gouvalas
 * Date    : 1/10/2017
 */
const express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(404).send({
        error: 'Page not found.',
        name: 'Todo App v1.0'
    });
});

// GET /users [{}, {}, ]
// give users a name and age prop
app.get('/users', (req, res) => {
    res.send([
        {
            name: 'Chrysa',
            age: 30
        },
        {
            name: 'Tolios',
            age: 30
        },
        {
            name: 'Gordos',
            age: 8
        }
    ]);
});

app.listen(3000);

module.exports.app = app;