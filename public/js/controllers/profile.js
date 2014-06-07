'use strict'

app.controller('ProfileCtrl', ['$scope', "Auth", "Identity", "notifier", function($scope, Auth, Identity, notifier){
	$scope.name = Identity.currentUser.name
	$scope.email = Identity.currentUser.email

	$scope.update = function(){
		var updatedData = {
			username: $scope.email,
			name: $scope.name
		}

		if ($scope.password && $scope.password.length > 0){
			newUserData.password = $scope.password
		}

		// update the user's data
		Auth.updateCurrentUser(newUserData).then(function(){
			notifier.notify('Your data has been updated')
		}).error(function(err){
			notify.error('Data not updated: ', err)
		})
	}
}])