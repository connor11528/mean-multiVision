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

	// everything else handled by this route
	app.get('*', function(req, res){
		res.render('index');
	})
}