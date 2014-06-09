'use strict'

app.controller('CourseListCtrl', ['$scope', 'Course', function($scope, Course){
	
	$scope.courses = Course.query()
}])