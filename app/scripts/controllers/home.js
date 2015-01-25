'use strict';

var HomeCtrl = function($scope,$window,auth) {
	var token = $window.sessionStorage.token;
	auth.verifyToken({'key':token,'url':'/',method:'POST'})
		.success(function(data,status,header,config) {
			console.log(status,'status');
			$scope.users = data;
	 	})
	 	.error(function(err,status) {
	 		console.log(err,'error');
	 		delete $window.sessionStorage.token;
	 		if(status === 403) console.log('TokenExpired');
	 		if(status === 401)	console.log('Unauthorized'); 

	 	});
	 	


};



angular.module('chatApp')
	.controller('HomeCtrl',HomeCtrl);
