// Database configuration
// ======================
var mongoose = require('mongoose'),
	userModel = require('../models/User'),
	courseModel = require('../models/Course')

module.exports = function(envConfig){
	// CONNECTION
	mongoose.connect(envConfig.database);
	var db = mongoose.connection;

	// open connection
	db.on('error', console.error.bind(console, 'Connection error...'))
	db.once('open', function callback(){
		console.log('multiVision development database opened.')
	})

	// populate empty users collection with defaults
	userModel.createDefaults()
	courseModel.createDefaults()
};