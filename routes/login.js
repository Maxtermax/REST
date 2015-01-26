var bcrypt = require('bcrypt');

module.exports = function(auth,model) {
	var login = function(req,res) {
		var b = req.body;	
		model.findOne({name:b.name},function(err,docs) {
			var test = bcrypt.compareSync(b.pass,docs.pass); 
			if(docs && test){
				var token = auth.genToken({name:docs.name,"ID":docs['_id']});
				res.send({ 'token' : token });
			}else {
				res.send(404);
			}
		})
	};

	return login;
};



































