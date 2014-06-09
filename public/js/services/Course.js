'use strict'

app.factory('Course', ['$resource', function($resource){
	var courseResource = $resource('/api/courses', {
		_id: '@id'
	}, {update: {
		method: 'PUT',
		isArray: false
	}})

	return courseResource
}])