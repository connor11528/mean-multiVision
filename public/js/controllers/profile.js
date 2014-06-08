'use strict'

app.controller('ProfileCtrl', ['$scope', "Auth", "Identity", "notifier", function($scope, Auth, Identity, notifier){
	$scope.name = Identity.currentUser.name
	$scope.email = Identity.currentUser.username

	$scope.update = function(){
		var updatedData = {
			username: $scope.email,
			name: $scope.name
		}

		if ($scope.password && $scope.password.length > 0){
			updatedData.password = $scope.password
		}

		// update the user's data
		Auth.updateCurrentUser(updatedData).then(function(){
			notifier.notify('Your data has been updated')
		}, function(err){
			console.log(err)
			notifier.error('Data not updated: ' + err.data.reason)
		})
	}
}])