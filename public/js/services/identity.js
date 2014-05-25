
// Authentication

app.factory('Identity', ['$window', function($window){
	var currentUser
	// if the currentUserObj was supplied from the server
	if(!!$window.currentUserObj){
		currentUser = $window.currentUserObj
	}
	return {
		currentUser: currentUser,	// gets it from the server
		isAuthenticated: function(){
			return !!this.currentUser
		},
		// isAuthorized: function(role){
		// 	return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1
		// }
	}
}])