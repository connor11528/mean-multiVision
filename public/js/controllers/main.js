'use strict';

app.controller('MainCtrl', ['$scope', 'Course', function($scope, Course){
	$scope.courses = Course.query()
}])