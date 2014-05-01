'use strict';

app.controller('LoginCtrl', ['$scope', function($scope){
	$scope.signIn = function(username, password){
		console.log('You signed in!')
	}
}])