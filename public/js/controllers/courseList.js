'use strict'

app.controller('CourseListCtrl', ['$scope', 'CourseCache', function($scope, CourseCache){
	
	$scope.courses = CourseCache.query()

	$scope.searchTerm = ''

	$scope.sortOptions = [
		{value: 'title',  text: 'Sort by Title'},
		{value: 'published', text: 'Sort by Publish Date'}
	]

	// set default search
	$scope.sortOrder = $scope.sortOptions[0].value
}])