'use strict';

var auth = function ($http) {
	return {
		verifyToken:function(url,method,token) {
		  return $http({'url':url,'method':method,headers:{Authorization:"Bearer "+token} })
		},
		login:function(info) {
			return $http({url:'/login',method:'POST',data:info});
		},
		signIn:function(data){
			return $http({'url':'/signin',method:'POST','data':data});
		}	

	} 
};

angular.module('chatApp')
  .service('auth',auth);
