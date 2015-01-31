module.exports = function(auth,model) {
	var login = function(req,res) {
		var b = req.body;	
		if(b && b.name && b.pass){
			model.Auth({name:b.name,pass:b.pass},function(err,user) {
				if(user) {
					var token = auth.genToken({name:user.name,"ID":user['_id']});
					//create token with the user information
					//token available for 5min
					res.send({token:token});
				}else if(err){
					res.status(500).send({
						success:false,
						message:'could not authenticate the user tries again',
						err:err
					});
				}else {
					res.status(404).send({
						success:false,
						message:'user not found'
					});
				};
			});		
		}else {
			res.status(400).send({
				success:false,
				message:'no username and password in the body from request'
			})
		}
		
	}//login

	return login;
};



































