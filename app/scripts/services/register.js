var resourcesProvider = function($resource) {
	return {
		register:function(url,data){
			var request =  $resource(url)
			var user = new request();
			user.name  = data.name;
			user.pass  = data.pass;
			user.email = data.email;
			return user;
		}//end register fn			
	}

}



angular.module('chatApp')
.service('resourcesProvider',resourcesProvider);
