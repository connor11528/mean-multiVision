'use strict';

var app = angular.module('mean-multiVision', [
	'ngResource', 
	'ngRoute'
]);

// ROUTES
app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true)

	var checkRole = {
		admin: {
			auth: function(Auth){
				// return true or an unresolved promise (which will trigger routeChangeError)
				return Auth.routeAccessFor('admin')					
			}
		}
	}

	$routeProvider
		.when('/', {
			templateUrl: '/views/main/main',	// gets main.jade from server
			controller: 'mainCtrl'
		})
		.when('/admin/users', {
			templateUrl: '/views/admin/userList',
			controller: 'UserListCtrl',
			resolve: checkRole.admin
		})
		.otherwise({ redirectTo: '/' })
}])

// listen for routing errors
// app.run executes after the module has been completely configured
app.run(function($rootScope, $location){
	$rootScope.$on("$routeChangeError", function(e, current, previous, rejectionReason){
		if (rejectionReason === 'not authorized'){
			$location.path('/')
		}
	})
})