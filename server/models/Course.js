var mongoose = require('mongoose')

var courseSchema = mongoose.Schema({
	title: {
		type: String,
		required: '{PATH} is required!'
	},
	featured: {
		type: Boolean,
		required: '{PATH} is required!'
	},
	published: {
		type: Date,
		required: '{PATH} is required!'
	},
	tags: [String]
})

var Course = mongoose.model('Course', courseSchema)

// create default courses
exports.createDefaults = function(){
	Course.find({}).exec(function(err, collection){
		if(collection.length === 0){
			// dummy data
			Course.create({title: 'C# for Sociopaths', featured: true, published: new Date('10/5/2013'), tags: ['c#']}),
			Course.create({title: 'C# for Non-Sociopaths', featured: false, published: new Date('10/12/2013'), tags: ['c#']}),
			Course.create({title: 'Super Duper Expert C#', featured: false, published: new Date('10/1/2013'), tags: ['c#']}),
			Course.create({title: 'Visual Basic for Visual Basic Developers', featured: false, published: new Date('7/12/2013'), tags: ['visual basic']}),
			Course.create({title: 'Pedantic C++', featured: true, published: new Date('1/1/2013'), tags: ['c++']}),
			Course.create({title: 'JavaScript for People over 20', featured: true, published: new Date('10/13/2013'), tags: ['javascript']}),
			Course.create({title: 'Maintainable Code for Cowards', featured: true, published: new Date('3/1/2013')})
		}
	})
}

