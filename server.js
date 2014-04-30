var express = require('express')
var stylus = require('stylus');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var port = 3000;

// stylus
function compile(str, path){
	return stylus(str).set('filename', path);
}
// configuration
app.configure(function(){
	app.set('views', __dirname + '/server/views');
	app.set('view engine', 'jade');
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	// invoke stylus middleware
	app.use(stylus.middleware({
		src: __dirname + '/public',
		compile: compile
	}));

	// static routing to public directory
	app.use(express.static(__dirname + '/public'))
});

// everything handled by this route
app.get('*', function(req, res){
	res.render('index');
})

app.listen(port)
console.log('Listening on port ', port, '...');