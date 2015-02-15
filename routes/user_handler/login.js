Date.prototype.addMinutes = function(minutes) {
  this.setMinutes(this.getMinutes() + minutes);
	return this;
};

module.exports = function(auth,model,_) {
	return function(req,res) {
		var b = req.body || {};	
		if(_.has(b,'password','username')) {
			model.login({username:b.username,password:b.password},function(err,user) {
				if(err && err.message === 'user is login') return res.status(403).send(err);
				if(err && err.message === 'bad password') return res.status(400).send(err);
				if(err && err.message === 'user not found') return res.status(404).send(err);
				if(err && !err.message)	return res.status(500).send({success:false,err:err,message:'Oops al parecer hubo un error interno en el servidor'});
				var time = new Date();
				var token = auth.genToken({"ID":user['_id']});
				res.send({maxAge:time.addMinutes(5),scope:'/news /u/*',success:true,access_token:token,message:'welcome login success :)'});
			});	
		}else {
			res.status(400).send({success:false,message:'the request has no parameters required at body'});
		}

	}//end login

};



































