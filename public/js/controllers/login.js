'use strict';

app.controller('LoginCtrl', ['$scope', '$http', '$location', 'notifier', 'Auth', 'Identity', function($scope, $http, $location, notifier, Auth, Identity){
	$scope.identity = Identity
	$scope.signIn = function(username, password){
		Auth.authenticateUser(username, password).then(function(success){
			if(success){
				// show success notification
				notifier.notify('You logged in successfully!')
			} else {
				notifier.error('Error logging in!')
			}
		})
	}

	$scope.logout = function(){
		Auth.logoutUser().then(function(){
			// reset fields
			$scope.username = ''
			$scope.password = ''
			notifier.notify('Log out successful!')
			$location.path('/')		// redirect
		})
	}
}])