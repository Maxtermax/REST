var singUp = function($http) {
	return {
		register:function(url,data){
			return $http({
				'url':url,
				method:'POST',
				data:{
					name:data.name,
					pass:data.pass,
					email:data.email
				}
			});
		}//end register fn			
	}

}



angular.module('chatApp')
	.service('singUp',singUp);
