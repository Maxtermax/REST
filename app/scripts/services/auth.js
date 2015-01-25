'use strict';

var auth = function ($http) {
	return {
		verifyToken : function(data) {
		  return $http({url:data.url, method: data.method,headers:{Authorization:"Bearer "+data.key} })
		},
		login : function(info) {
			return $http({url:'/login',method:'POST',data:info});
		}

	} 
};

angular.module('chatApp')
  .service('auth',auth);
