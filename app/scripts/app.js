var configRoutes = function($routeProvider) {
	$routeProvider
		.when('/', {
		  templateUrl   : 'views/home.html',
		  controller    : 'HomeCtrl',
		  requiresLogin : true
		})
		.when('/login', {
		  templateUrl   : 'views/login.html',
		  controller    : 'LoginCtrl',
		  requiresLogin : false
		})
		.when('/account', {
		  templateUrl   : 'views/account.html',
		  controller    : 'AccountCtrl',
		  requiresLogin : false
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
		if(path === "/account" || path === "/login" && token) $location.path('/');

		//if( next.requiresLogin &&!next.requiresLogin && token ) $location.path('/');	
	});
};

var Chat = angular.module("chatApp",[
	"ngRoute",
	"ngResource",
])
.config(configRoutes)
.run(run)



































