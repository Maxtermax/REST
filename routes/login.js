module.exports = function(auth,model) {
	var login = function(req,res) {
		var b = req.body;	
		model.Auth({name:b.name,pass:b.pass},function(err,docs) {
			console.log(docs,'docs');
			if(docs) {
				var token = auth.genToken({name:docs.name,"ID":docs['_id']});
				res.send({'token':token});
				console.log('OKAY');
			}else {
				res.send(404);
			}
		});
		
	}//login

	return login;
};



































