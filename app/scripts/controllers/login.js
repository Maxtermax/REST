'use strict';

var LoginCtrl = function ($scope,auth,$location,$window) {
	$scope.getIn = function(info) {
		auth.login(info)
			.success(function(data,status,header) {
				var token = data.token;
				if(token) {
					console.log(data,'data');
					$window.sessionStorage.token = token;		
				  $location.path("/");			  
				};
			})
			.error(function(err,status) {
				if(status === 404) {
					$scope.Uname = "";
					$scope.Upass = "";
				}
			})

	};

};

angular.module('chatApp')
  .controller('LoginCtrl',LoginCtrl);
