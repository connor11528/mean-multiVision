var mongoose = require('mongoose');

// connect to database
module.exports = function(config){
	mongoose.connect(config.database);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'Connection error...'));
	db.once('open', function callback(){
		console.log('multiVision development database opened.');
	});
};