// configure authentication
//========================================
var passport = require('passport'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	LocalStrategy = require('passport-local').Strategy 	// passport uses strategies to implement auth

// email and password auth
passport.use(new LocalStrategy(
	function(username, password, done){
		// verify user exists in database
		User.findOne({username:username})
			.exec(function(err, user){
				if (err){ return done(err) } // error with database

				// authenticate method defined on User schema
				if (user && user.authenticate(password)){
					return done(null, user)	// supply passport with authenticated user
				} else {
					return done(null, false, { message: 'username not found' });
				}
			})
	}));

// COOKIE SESSIONS
passport.serializeUser(function(user, done){
	if (user){
		done(null, user._id)
	}
})

passport.deserializeUser(function(id, done){
	User.findOne({_id: id}).exec(function(err, user){
		if (user){
			return done(null, user)
		} else {
			return done(null, false)
		}
	})
})