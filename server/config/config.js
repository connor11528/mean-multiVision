var path = require('path');		// normalizes path strings

var rootPath = path.normalize(__dirname + '/../../');

// configuration object
module.exports = {
	development: {
		rootPath: rootPath,
		database: 'mongodb://localhost/multiVision',
		port: process.env.PORT || 3000
	},
	production: {
		rootPath: rootPath,
		database: 'mongodb://jasonshark:multivision@ds037478.mongolab.com:37478/multivision',
		port: process.env.PORT || 80
	}
}