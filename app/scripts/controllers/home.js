'use strict';

var HomeCtrl = function($scope,$window,news) {
	var token = $window.sessionStorage.token;
	if(token) {
		news.getAll('/news','GET',token)
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
	}
		
};



angular.module('chatApp')
	.controller('HomeCtrl',HomeCtrl);
