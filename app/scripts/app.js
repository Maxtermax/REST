var configRoutes = function($routeProvider) {
	$routeProvider
		.when('/', {
		  templateUrl   : 'views/news.html',
		  controller    : 'NewsCtrl',
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
		.otherwise({	
			redirectTo: '/'
		});

};//Routes config


var run = function($rootScope,$location,$window,auth) {
	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		var token = $window.sessionStorage.token;
		if(!next.requiresLogin && token ) $location.path('/');
		

	});
};

var Chat = angular.module("chatApp",[
	"ngRoute",
	"ngResource",
])
.config(configRoutes)
.run(run)



































