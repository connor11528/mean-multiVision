'use strict';

var app = angular.module('mean-multiVision', ['ngResource', 'ngRoute']);

app.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);

	$routeProvider.when('/', {
		templateUrl: '/views/main/main',	// gets main.jade from server
		controller: 'mainCtrl'
	})
}])