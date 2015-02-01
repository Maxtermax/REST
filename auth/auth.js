var auth = function(key,jwt) {	

	var genToken = function(user) {
		var token = jwt.sign({name:user.name,"ID":user['ID']},key,{expiresInMinutes:5})
		return token;
	};//end generate Token

	var verifyToken = function(err,req,res,next) {
		var path = req.path;
		if(err){
			if(req.method === 'DELETE') {
				return next();
			}else if(req.method === 'GET') {
				if(path === '/news') res.status(err.status).send(err);
 				else next();
			}else {
				res.status(err.status).send(err);	
			}
		}else{
			next();
		}
	}//end verifyToken

	return {
		'genToken'   : genToken,
		'verifyToken': verifyToken
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
















































