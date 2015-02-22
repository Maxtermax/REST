Date.prototype.addMinutes = function(minutes) {
  this.setMinutes(this.getMinutes() + minutes);
	return this;
};

module.exports = function(auth,model,_) {
	return function(req,res) {
		var b = req.body || {};	
		if(!b.username && !b.password) return res.status(400).send({success:false,message:'the request has no parameters required at body'});
			model.login({username:b.username,password:b.password},function(err,docs) {
				if(err && err.message) return res.status(err.status).send(err);
				var time = new Date();
				var token = auth.genToken({"ID":docs['_id']});
				res.send({maxAge:time.addMinutes(5),scope:'/u/post /u/*',success:true,access_token:token,message:'welcome login success :)'});
			});	
		
	}//end login

};



































