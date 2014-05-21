// Database configuration
// ======================
var mongoose = require('mongoose');

module.exports = function(envConfig){
	// CONNECTION
	mongoose.connect(envConfig.database);
	var db = mongoose.connection;

	// open connection
	db.on('error', console.error.bind(console, 'Connection error...'));
	db.once('open', function callback(){
		console.log('multiVision development database opened.');
	});

	// USERS
	var userSchema = mongoose.Schema({
		name: String,
		username: String
	});
	var User = mongoose.model('User', userSchema);

	// create default users
	User
		.find({})		// all documents from collection
		.exec(function(err, collection){
			// if no users in the collection
			if (collection.length === 0){
				User.create({
					name: 'Connor James Leech',
					username: 'connorleech'
				});
				User.create({
					name: 'Jason Shark',
					username: 'jasonshark'
				})
			}
		})
};