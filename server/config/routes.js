// server side routing
var passport = require('passport')

module.exports = function(app){

	// server side route for the partials files
	app.get('/views/*', function(req, res){
		res.render('../../public/views/' + req.params);
	})

	// XHR post handling
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
		});
	})
}