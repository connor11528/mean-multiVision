
app.service('Auth', ['$http', '$q', 'Identity', 'User', function($http, $q, Identity, User){
	return {
		authenticateUser: function(username, password){
			// returns a promise
			var deferred = $q.defer()

			// send request to server
			$http.post('/login', { username: username, password: password })
				.then(function(response){
					if(response.data.success){
						
						// put user object from server into client model..
						var user = new User()
						angular.extend(user, response.data.user)

						// set current user
						Identity.currentUser = user 	// has .isAdmin method
						deferred.resolve(true)
					} else {
						// error logging in
						deferred.resolve(false)
					}
				});

			return deferred.promise;
		},

		logoutUser: function(){
			var dfd = $q.defer()
			// params must be added to post req or angular will turn it into a get
			$http.post('/logout', { logout: true }).then(function(){
				Identity.currentUser = undefined
				dfd.resolve()
			})
			return dfd.promise
		}
	}
}])