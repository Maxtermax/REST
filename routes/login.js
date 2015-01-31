module.exports = function(auth,model) {
	var login = function(req,res) {
		var b = req.body;	
		if(b && b.name && b.pass){
			model.Auth({name:b.name,pass:b.pass},function(err,user) {
				if(user) {
					var token = auth.genToken({name:user.name,"ID":user['_id']});
					//create token with the user information
					//token available for 5min
					res.send({
						success:true,
						token:token,
						message:'welcome login success :)'
					});
				}else if(err && !err.message){
					res.status(500).send({
						success:false,
						message:'could not authenticate the user tries again',
						err:err
					});
				}else if(err && err.message) {
					if(err.message === 'bad password') res.status(400).send(err);
					if(err.message === 'user not found') res.status(400).send(err);
				};

			});	

		}else {
			res.status(400).send({
				success:false,
				message:'the request has no parameters required at body'
			})
		}
		
	}//login

	return login;
};



































