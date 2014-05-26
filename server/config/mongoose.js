// Database configuration
// ======================
var mongoose = require('mongoose'),
	crypto = require('crypto')

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
		username: String,
		salt: String,
		hashed_pwd: String,
		roles: [String]		// for authorization
	});

	// check a user is authenticated, passing in a password
	userSchema.methods = {
		authenticate: function(passwordToMatch){
			// take password client's trying to match,
			// hash it
			// compare to the hashed pwd in the database
			// this.salt == current user's salt
			return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd	// check it's equal to the
																			// current user's hashed password
		}
	}


	var User = mongoose.model('User', userSchema);

	// create default users
	User
		.find({})		// all documents from collection
		.exec(function(err, collection){
			// if no users in the collection
			if (collection.length === 0){
				var salt, hash
				salt = createSalt()
				hash = hashPwd(salt, 'connor')	// default user password is their name

				// create the default users
				User.create({
					name: 'coNnor JaMes lEEch',
					username: 'connorleech',
					salt: salt,
					hashed_pwd: hash,
					roles: ['admin']
				});
				salt = createSalt()
				hash = hashPwd(salt, 'jason')
				User.create({
					name: 'jason shark',
					username: 'jasonshark',
					salt: salt,
					hashed_pwd: hash
				})
			}
		})
};

// helper functions
function createSalt(){
	return crypto.randomBytes(128).toString('base64')
}

function hashPwd(salt, pwd){
	// HMAC: Hash Message Authentication Code
	var hmac = crypto.createHmac('sha1', salt)	// sha1 algorithm
	return hmac.update(pwd).digest('hex')
}