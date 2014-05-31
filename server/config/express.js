// configure Express middleware
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
		app.use(express.methodOverride())	// allows app.put() and app.delete()
		app.use(express.session({ secret: 'supersecretmeanmultivision' }))
		app.use(passport.initialize())
		app.use(passport.session())		// tell passport to use sessions

		// static routing to public directory
		app.use(express.static(envConfig.rootPath + '/public'))
	})
}