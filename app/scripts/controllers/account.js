var controller = function ($scope,singUp,$location,$window) {
	$scope.submitData = function(info) {
		console.log('fewfew');
		singUp.register('/account',info)
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
.controller('AccountCtrl',controller)	
