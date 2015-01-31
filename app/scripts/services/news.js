'use strict';

var news = function ($http) {
	return {
		Last	: function(token){
			$http({url: '/', method:'POST',headers:{Authorization:"Bearer "+token} })
		}

	}

}

angular.module('chatApp')
  .service('news',news);
