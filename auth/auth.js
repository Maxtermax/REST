var auth = function(key,jwt) {	

	var genToken = function(user) {
		var token = jwt.sign({name:user.name,"ID":user['ID']},key,{expiresInMinutes:5})
		return token;
	};// genToken

	var verifyToken = function(err,req,res,next) {
		var path = req.path;
		if(err){
			if(req.method === 'GET' && path === "/") {
				next();
				console.log('NO TOKEN SOLO QUIERO LA VISTA NORMAL');
			}else {
				res.status(err.status).send(err);
				console.log('no autorizado ');
			};
		}else{
			console.log('SIGASE');
			next();
		}
	}


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
















































