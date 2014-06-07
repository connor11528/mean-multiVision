var mongoose = require('mongoose'),
	encrypt = require('../utils/encryption')

// USERS schema
var userSchema = mongoose.Schema({
	name: { type: String, 
		required: '{PATH} is required!' // required true, string given is error message
										// {PATH} is name of property
	},
	username: {
		type: String,
		unique: true,	// creates unique index inside MongoDB
		required: '{PATH} is required!' 
	},
	salt: { type: String, required: '{PATH} is required!' },
	hashed_pwd: { type: String, required: '{PATH} is required!' },
	roles: [String]		// for authorization
})

// check a user is authenticated, passing in a password
userSchema.methods = {
	authenticate: function(passwordToMatch){
		// take password client's trying to match,
		// hash it
		// compare to the hashed pwd in the database
		// this.salt == current user's salt
		return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd	// check it's equal to the
																		// current user's hashed password
	}
}

// can access User model through mongoose. No need to export
var User = mongoose.model('User', userSchema);

// create default users
exports.createDefaultUsers = function(){
	User
		.find({})		// all documents from collection
		.exec(function(err, collection){
			// if no users in the collection
			if (collection.length === 0){
				var salt, hash
				salt = encrypt.createSalt()
				hash = encrypt.hashPwd(salt, 'connor')	// default user password is their name

				// create the default users
				User.create({
					name: 'coNnor JaMes lEEch',
					username: 'connorleech',
					salt: salt,
					hashed_pwd: hash,
					roles: ['admin']
				});
				salt = encrypt.createSalt()
				hash = encrypt.hashPwd(salt, 'jason')
				User.create({
					name: 'jason shark',
					username: 'jasonshark',
					salt: salt,
					hashed_pwd: hash
				})
			}
		})
}
