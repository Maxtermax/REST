'use strict';

var news = function ($http) {
	return {
		getAll:function(url,method,token) {
		  return $http({'url':url,'method':method,headers:{Authorization:"Bearer "+token} });
		}


	}

}

angular.module('chatApp')
  .service('news',news);
