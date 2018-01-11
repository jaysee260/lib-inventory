"use strict";
require('dotenv').config(); // allows for importing of env variables
 // bring in necessary dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var hbs = require('express-handlebars');

var app = express(); // define an instance of express
var routes = require('./routes/index'); // bring in routes
// bring in environment variables 
const PORT = process.env.PORT;
const db_connection = process.env.MONGO_CONNECTION;

app.use(bodyParser.json()); // set up express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(db_connection, {useMongoClient: true}); // Open connection to database
mongoose.Promise = global.Promise; // set up use of Promises
// set up notifications for connection status
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('mongodb connected.'));

// set up view engine
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// =========

app.use('/', routes);

// =========

// Start server on designated port #
app.listen(PORT, () => console.log(`Running on port ${PORT}...`));