// configure Express middleware and stylus
//========================================
var express = require('express'),
	stylus = require('stylus'),
	passport = require('passport')

// recieves express app and environment config obj
module.exports = function(app, envConfig){
	
	// EXPRESS config
	app.configure(function(){
		app.set('views', envConfig.rootPath + '/server/views');
		app.set('view engine', 'jade')
		app.use(express.logger('dev'))
		app.use(express.cookieParser())
		app.use(express.bodyParser())
		app.use(express.session({ secret: 'supersecretmeanmultivision' }))
		app.use(passport.initialize())
		app.use(passport.session())		// tell passport to use sessions
		// invoke stylus middleware
		app.use(stylus.middleware({
			src: envConfig.rootPath + '/public',
			compile: compile
		}));

		// static routing to public directory
		app.use(express.static(envConfig.rootPath + '/public'))
	});

	// DEVELOPMENT
	// middleware that spits out current user OR undefined
	// app.use(function(req, res, next){
	// 	console.log(req.user)
	// 	next()
	// })

	// STYLUS
	function compile(str, path){
		return stylus(str).set('filename', path);
	}
};