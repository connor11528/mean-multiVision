'use strict'

app.controller('CourseDetailsCtrl', ['$scope', '$routeParams', 'Course', function($scope, $routeParams, Course){
	
	// _id maps to Course $resource
	// $routeParams.id maps to /courses/:id in app.js
	$scope.course = Course.get({ _id: $routeParams.id })
}])

