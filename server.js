var express = require('express')
var mongoose = require('mongoose')
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

// configuration object
var config = require('./server/config/config')[env]

// express configuration
require('./server/config/express')(app, config)

// connect to database
require('./server/config/mongoose')(config)

// routes
require('./server/config/routes')(app)


app.listen(config.port)
console.log('Listening on port ', config.port, '...');