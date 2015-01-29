module.exports = function(model) {

	var singUp = function(req,res) {
		var b = req.body;
		console.log(b,'data');
		var user = new model(b).save(function(err,docs) {
			if(err && err.code && err.code === 11000) {
				//status = conflic
				res.status(409).send({
					success:false,
					message:'taken username or password',
					err    : err
				});
			}else if(err) {
				//status = internal error at the server
				res.status(500).send({
					success:false,
					message:'could not save the user tries again',
					err    : err
				});
			}else if(docs) {
				//status = Okay!! 
				res.status(200).send({
					success:true,
					message:'user was created with success :)'
				});
			}


		});

	}//singUp

	return singUp;

}











