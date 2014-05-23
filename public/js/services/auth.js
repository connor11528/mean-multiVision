
app.service('Auth', ['$http', '$q', 'Identity', function($http, $q, Identity){
	return {
		authenticateUser: function(username, password){
			// returns a promise
			var deferred = $q.defer()

			// send request to server
			$http.post('/login', { username: username, password: password })
				.then(function(response){
					if(response.data.success){
						// log user in
						Identity.currentUser = response.data.user
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
			$http.post('/logout', { logout: true }).then(function(){
				Identity.currentUser = undefined
				dfd.resolve()
			})
			return dfd.promise
		}
	}
}])