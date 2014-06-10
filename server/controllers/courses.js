var Course = require('mongoose').model('Course')

module.exports = {

	getCourses: function(req, res, next){
		// send back all courses
		Course.find({}).exec(function(err, collection){
			res.send(collection)
		})
	},

	// individual course
	getCourseById: function(req, res, next){
		Course.findOne({ _id: req.params.id })
			.exec(function(err, course){
				res.send(course)
			})
	}
}