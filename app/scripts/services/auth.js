'use strict';

var auth = function ($http) {

	return {
		verifyToken : function(token) {
			return $http({url: '/', method: 'POST',headers:{Authorization:"Bearer "+token} });
		},
		login : function(info) {
			return $http({url:'/login',method:'POST',data:info});
		}

	} 
};

angular.module('chatApp')
  .service('auth',auth);
