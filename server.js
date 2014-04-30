var express = require('express')
var stylus = require('stylus');
var mongoose = require('mongoose')
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

// DATABASE
// ===============
mongoose.connect('mongodb://localhost/multiVision');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error...'));
db.once('open', function callback(){
	console.log('multiVision database opened.');
});

var messageSchema = mongoose.Schema({message: String})
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
	mongoMessage = messageDoc.message;
});


// ROUTES
// ===============
// server side route for the partials files
app.get('/partials/:partialPath', function(req, res){
	res.render('partials/' + req.params.partialPath);
})

// everything handled by this route
app.get('*', function(req, res){
	res.render('index', {
		mongoMessage: mongoMessage
	});
})

app.listen(port)
console.log('Listening on port ', port, '...');