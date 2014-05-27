'use strict'

app.controller('UserListCtrl', ['$scope', 'User', function($scope, User){
	$scope.users = User.query()
}])