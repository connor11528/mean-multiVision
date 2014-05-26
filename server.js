// MAIN SERVER SETUP
// ==================
var express = require('express')

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development'
var app = express()

// ENVIRONMENTS
var envConfig = require('./server/config/environments')[env]

// EXPRESS, STYLUS
require('./server/config/express')(app, envConfig)

// DATABASE
require('./server/config/mongoose')(envConfig)

// AUTHENTICATION
require('./server/config/passport')

// ROUTES
require('./server/config/routes')(app)

// start server..
app.listen(envConfig.port)
console.log('Listening on port ', envConfig.port, '...')