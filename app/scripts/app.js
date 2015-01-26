var configRoutes = function($routeProvider) {
	$routeProvider
		.when('/', {
		  templateUrl   : 'views/home.html',
		  controller    : 'HomeCtrl'
		})
		.when('/login', {
		  templateUrl   : 'views/login.html',
		  controller    : 'LoginCtrl'
		})
		.when('/account', {
		  templateUrl   : 'views/account.html',
		  controller    : 'AccountCtrl'
		})
		.when('/u/:name', {
		  templateUrl: 'views/profile.html',
		  controller: 'ProfileCtrl'
		})
		.otherwise({
      redirectTo: '/'
    });

};//Routes config

var run = function($rootScope,$location,$window,$route) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		var token = $window.sessionStorage.token;
		var path = $location.$$path; 
	});
};

var Chat = angular.module("chatApp",[
	"ngRoute",
	"ngResource",
])
.config(configRoutes)
.run(run)



































