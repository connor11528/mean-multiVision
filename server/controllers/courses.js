var Course = require('mongoose').model('Course')

module.exports = {
	getCourses: function(req, res, next){
		// send back all courses
		Course.find({}).exec(function(err, collection){
			res.send(collection)
		})
	},
}