// server side routing
var passport = require('passport'),
	mongoose = require('mongoose'),
	User = mongoose.model('User')

module.exports = function(app){

	// Users API
	// only available to admins
	app.get('/api/users', requiresRole('admin'), function(req, res, next){
		// get list of users
		User.find({}).exec(function(err, usersCollection){
			res.send(usersCollection)
		})
	})

	// server side route for the angularjs partials
	app.get('/views/*', function(req, res){
		res.render('../../public/views/' + req.params);
	})

	// XHR post login
	app.post('/login', function(req, res, next){
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
	})

	app.post('/logout', function(req, res, next){
		req.logout()	// method added by passport
		res.end()	// end response
	})

	// everything else handled by this route
	app.get('*', function(req, res){
		// pass the index page with currentUser data
		res.render('index', {
			currentUser: req.user
		})
	})
}


// HELPERS
//==========
// middleware to check if user is authenticated
var requiresApiLogin = function(req, res, next){
	if( !req.isAuthenticated() ){	// passport method
		// not authenticated, send them home
		res.render('index', {
			currentUser: req.user
		})
	} else {
		next()
	}
}

var requiresRole = function(role){
	return function(req, res, next){
		// user not authenticated or role is not found
		if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1){
			// not authenticated, send them home
			res.render('index', {
				currentUser: req.user
			})
		} else {
			next()
		}
	}
}