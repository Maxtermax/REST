var signInCtrl = function ($scope,auth,$location) {
	$scope.submitData = function(info) {
		auth.signIn(info)
			.success(function(data,status,header,config) {
				console.log(data,status);
				$location.path("/login");
			})
			.error(function(err,status) {
				console.log(err,status);
				$scope.Uname = "";
				$scope.Upass = "";
			})
	};//submitData

};






angular.module('chatApp')
	.controller('signInCtrl',signInCtrl)	
