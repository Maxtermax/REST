module.exports = function(model,_) {

	return function(req,res) {
		var b = req.body || {};

		if(_.has(b,'username','password','email')) {
			var user = new model({username:b.username,password:b.password,email:b.email});
			user.save(function(err,docs) {
				if(err && err.code && err.code === 11000) return res.status(404).send({success:false,message:'taken username or password',err: err});
				if(err) return res.status(500).send({success:false,message:'could not save the user tries again',err: err});
				if(docs) return res.status(201).send({success:true,message:'user was created with success :)'});
			});			
		}else {
			res.status(400).send({success:false,message:'the request has no parameters required at body'});			
		};
	}//end signIn

}











