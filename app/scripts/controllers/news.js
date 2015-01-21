'use strict';

var NewsCtrl = function($scope,$window,$route,auth) {
	var token = $window.sessionStorage.token;
	if(token) {
		console.log('TOKEN ');
		auth.verifyToken(token)
		 	.success(function(data,status,header,config) {
		 		console.log(status,'status');
		 		console.log(data,'data');
		 	})
		 	.error(function(err,status) {
		 		console.log(err,'error');
		 		delete $window.sessionStorage.token;
		 		if(status === 403) console.log('TokenExpired');
		 		if(status === 401)	console.log('Unauthorized');
		 	});
	}// if token 

	$scope.logout = function() {
		delete $window.sessionStorage.token;
		$route.reload();
	};
};


angular.module('chatApp')
.controller('NewsCtrl',NewsCtrl);
