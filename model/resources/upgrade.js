module.exports = function(_,genHash,jwt,key,bcrypt) {
	return function(token,update,cb) {
		var self  = this;
		var model = self.model('user');

		jwt.verify(token,key,function(err,decode) {
			//get ID by token
			if(err) return cb(err);
			if(_.has(decode,'ID')) {
				var id = decode['ID']; 
				if(_.has(update,'password')) {
					model.findById(id,function(err,docs) {
						if(err) return cb(err);
						if(!docs) return cb({success:false,message:'user no found'});
						bcrypt.compare(update.password,docs.password,function(err,isMatch) {
							if(err) return cb(err);
							if(isMatch) {
								if(_.has(update,'newpassword')) {
									genHash(update.newpassword,function(err,hash) {
										if(err) return cb(err);
										update.password = hash; 
										model.findByIdAndUpdate(id,update,function(err,docs) {
											if(err) return cb(err);
											return cb(null,_.omit(docs["_doc"],'password','_id','__v','isLogin'));
										});
									});
								}else {
									delete update.password;
									model.findByIdAndUpdate(id,update,function(err,docs) {
										if(err) return cb(err);
										return cb(null,_.omit(docs["_doc"],'password','_id','__v','isLogin'));
									});	
								}
							}else {
								return cb({success:false,message:'bad password'});
							}
						})
					})
				}else {
						return cb({success:false,message:'password required'});
				}
			}else {
				return cb({success:false,message:'bad token'});
			}
		})
	};//new update

}