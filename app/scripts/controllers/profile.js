'use strict';
var ProfileCtrl = function ($window,$scope,auth,$route) {
	var token = $window.sessionStorage.token;
	var url = "/u/"+$route.current.params.name;

	auth.verifyToken({'key':token,'url':url,method:'GET'})
		.success(function(data,status,header,config) {
			console.log(status,'status');
			$scope.usuario = data;
	 	})
	 	.error(function(err,status) {
	 		console.log(err,'error');
	 		delete $window.sessionStorage.token;
	 		if(status === 403) console.log('TokenExpired');
	 		if(status === 401)	console.log('Unauthorized'); $scope.usuario = "<a href='/login'>Inicia session</a>";
	 	});
	 	 

};



angular.module('chatApp')
  .controller('ProfileCtrl',ProfileCtrl);
