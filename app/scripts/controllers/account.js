var controller = function ($scope,resourcesProvider,$location,$window) {
	var response = function(res,header) {
		if(res.err) {
			$scope.badPass = true;
			$scope.RUpass = '';
			$scope.Upass = '';
		}else if(res.token){
			console.log(res,'res.token');
			$window.sessionStorage.token = res.token;
			$location.path("/");
		};
	};

	$scope.Register = function(info) {
		resourcesProvider
			.register('/account',info)
			.$save(response)//POST request
	}

};






angular.module('chatApp')
.controller('AccountCtrl',controller)	
