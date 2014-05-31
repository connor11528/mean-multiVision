'use strict'

app.controller('SignUpCtrl', ['$scope', '$location', 'Auth', 'notifier', function($scope, $location, Auth, notifier){
	$scope.signup= function(){
		var newUser = {
			name: $scope.name,
			username: $scope.email,
			password: $scope.password
		}

		Auth.createUser(newUser)
			.then(function(){
				notifier.notify('Sign up successful!')
				$location.path('/')
			}, function(reason){
				// something is wrong
				notifier.error(reason)
			})
	}
}])