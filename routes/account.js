var bcrypt = require('bcrypt');

module.exports = function(auth,model) {

	var account = function(req,res) {
		var b = req.body;
		var user = model({
			name:b.name,
			pass:function() {
				var salt = bcrypt.genSaltSync(10);
				var hash = bcrypt.hashSync(b.pass, salt);
				return hash;
			}(),
			email:b.email
		})
		.save(function(err,docs) {
			console.log(docs,'docs');
			var Token = auth.genToken({name:docs.name,ID:docs['_id'] });
			if(err) res.send(err);
			else res.send({'token':Token});
		});
		
	};



	return account;
};





