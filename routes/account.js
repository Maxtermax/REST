module.exports = function(auth,model) {

	var account = function(req,res) {
		var b = req.body;
		var user = model({
			name  : b.name,
			pass  : b.pass,
			email : b.email
		});
		var Token = auth.genToken({name : user.name, id : user['_id'] });
		
		if( !Token.token ) {
			res.send(500);
		}else{
			user.save(function(err,docs) {
				if(err) res.send(err);
				else res.send(Token);
			});
		}
		
	};



	return account;
};





