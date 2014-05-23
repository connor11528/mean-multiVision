
// Authentication

app.factory('Identity', ['$window', function($window){
	return {
		currentUser: undefined,
		isAuthenticated: function(){
			return !!this.currentUser
		},
		isAuthorized: function(role){
			return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1
		}
	}
}])