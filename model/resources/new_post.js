module.exports = function(_,jwt,key) {
	return function(id,post,cb) {
		var self = this;
		jwt.verify(id,key,function(err,decode) {
			if(err) return cb({err:err,sucess:false,status:500});
			if(_.has(decode,'ID')) {
				self.model('user').findOneAndUpdate({_id:decode['ID']},{
					post:[post]
				},function(err,docs) {
					if(err) return cb({err:err,sucess:false,status:500});
					if(!docs) return cb({message:'User no found',sucess:false,status:404});
					return cb(null,docs);	
				});
			}else {
				return cb({message:'bad token access at body from request',sucess:false,status:400});
			}
		})//end verify 


	}
};

























