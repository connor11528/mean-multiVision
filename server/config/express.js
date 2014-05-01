// Express configuration
var express = require('express'),
	stylus = require('stylus');

// recieves express app and configuration object
module.exports = function(app, config){
	
	// configuration
	app.configure(function(){
		app.set('views', config.rootPath + '/server/views');
		app.set('view engine', 'jade');
		app.use(express.logger('dev'));
		app.use(express.bodyParser());
		// invoke stylus middleware
		app.use(stylus.middleware({
			src: config.rootPath + '/public',
			compile: compile
		}));

		// static routing to public directory
		app.use(express.static(config.rootPath + '/public'))
	});

	// stylus
	function compile(str, path){
		return stylus(str).set('filename', path);
	}
};