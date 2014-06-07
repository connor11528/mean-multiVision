var User = require('mongoose').model('User'),
	passport = require('passport'),
	encrypt = require('../utils/encryption')

// get list of users
module.exports = {

	getUsers: function(req, res){
		User.find({}).exec(function(err, usersCollection){
			res.send(usersCollection)
		})
	},

	createUser: function(req, res, next){
		var userData = req.body

		// lowercase username
		userData.username = userData.username.toLowerCase()

		userData.salt = encrypt.createSalt()
		userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password)

		// create user in db with mongoose
		User.create(userData, function(err, user){
			// check for errors
			if (err){
				// check if user is a duplicate
				// MongoDB error code here
				// MO MONEY MO PROBLEMS
				if (err.toString().indexOf('E11000') > -1){
					err = new Error('That username is already taken')
				}
				res.status(400)
				return res.send({ reason: err.toString()})
			}

			// no error. log user in (via passport), send to client
			req.logIn(user, function(err){
				if (err){ return next(err) }

				res.send(user)
			})

		})
	},

	updateUser: function(req, res){

	},

	// XHR post login
	logUserIn: function(req, res, next){
		req.body.username = req.body.username.toLowerCase()
		
		var auth = passport.authenticate('local', function(err, user){
			if (err) { return next(err) }
			if (!user){ res.send({ success: false }) }

			// user found, log them in
			req.logIn(user, function(err){
				if (err){ next(err) }
				res.send({ success: true, user: user })
			})
		})

		// passport authenticate creates a function
		auth(req, res, next)
	},

	logUserOut: function(req, res, next){
		req.logout()	// method added by passport
		res.end()	// end response
	}
}