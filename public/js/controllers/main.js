'use strict';

app.controller('MainCtrl', ['$scope', 'CourseCache', function($scope, CourseCache){
	$scope.courses = CourseCache.query()
}])