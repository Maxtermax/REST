var bcrypt = require('bcrypt');

module.exports = function(auth,model) {
	var login = function(req,res) {
		var b = req.body;	
		model.compare({name:b.name,pass:b.pass},function(docs) {
			if(docs) {
				var token = auth.genToken({name:docs.name,"ID":docs['_id']});
				res.send({ 'token' : token });
				console.log('OKAY');
			}else {
				res.send(404);
			}
		});
	
		
	}//login

	return login;
};



































