var auth = function(key,jwt) {	
	var genToken = function(user) {
		var token = jwt.sign({name :user.name,id: user['_id']},key,{expiresInMinutes:5})
		return token;
	};// genToken

	var verifyToken = function(token){
		jwt.verify(token,key,function(err,decode) {
			if(err && err.name ) {
				return {err:err.name};
			}else{
				return true;
			}
		})
	};

	return {
		'genToken'    : genToken,
		'verifyToken' : verifyToken
	}
}
	

module.exports = auth;











					/*
					if(err) return err;
					return jwt.sign({
						name : docs.name,
						_id  : docs['_id']
					},key,{expiresInMinutes:5});
					*/
















































