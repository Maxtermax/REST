module.exports = function(model) {

	var signIn = function(req,res) {
		var b = req.body;
		if(b && b.pass && b.name && b.email) {
			var user = new model(b).save(function(err,docs) {
				if(err && err.code && err.code === 11000) {
					res.status(404).send({success:false,message:'taken username or password',err: err});
				}else if(err) {
					res.status(500).send({success:false,message:'could not save the user tries again',err: err});
				}else if(docs) {
					//status = Created!! 
					res.status(201).send({success:true,message:'user was created with success :)'});
				}
			});
		}else {
			res.status(400).send({success:false,message:'the request has no parameters required at body'});			
		};

	}//end signIn

	return signIn;
}











