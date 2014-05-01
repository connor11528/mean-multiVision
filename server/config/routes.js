
module.exports = function(app){

	// server side route for the partials files
	app.get('/views/*', function(req, res){
		res.render('../../public/views/' + req.params);
	})

	// everything else handled by this route
	app.get('*', function(req, res){
		res.render('index');
	})
}