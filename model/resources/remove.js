module.exports = function(_,key,jwt) {
	return function(token,cb) {
		var self = this;
		var model = self.model('user');
		jwt.verify(token,key,function(err,decode) {
			if(err) return cb(err);
			if(_.has(decode,'ID')) {
				model.findByIdAndRemove(decode['ID'],function(err,docs) {
					if(err)   return cb(err);
					if(docs)  return cb(null,{success:true,message:'OKAY!!! user delete'});
					if(!docs) return cb({status:404,success:false,message:'user no found'});
				})
			}else {
				return cb({status:403,success:false,message:'has not permissions to delete this user'});
			}
		})
	};//end remove


};
