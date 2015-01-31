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
		.when('/signin', {
		  templateUrl   : 'views/signin.html',
		  controller    : 'signInCtrl'
		})
		.when('/u/:name', {
		  templateUrl: 'views/profile.html',
		  controller: 'ProfileCtrl'
		})
		.otherwise({
      redirectTo: '/'
    });

};//Routes config


var run = function($rootScope,$location,$window,$route,auth) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {

	});

};

var Chat = angular.module("chatApp",[
	"ngRoute",
	"ngResource",
])
.config(configRoutes)
.run(run)



































