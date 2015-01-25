module.exports = function(auth,model) {
	var login = function(req,res) {
		var b = req.body;	
		model.findOne({name:b.name,pass:b.pass },function(err,docs) {
			if(docs){
				var token = auth.genToken({name:docs.name,id:docs['_id']});
				res.send({ 'token' : token });
			}else {
				res.send(404);
			}
		})
	};

	return login;
};



































