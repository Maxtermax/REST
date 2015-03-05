module.exports = function(_,bcrypt,model) {
   return function(query,cb) {
	 	model.findOne({username:query.username},function(err,docs) {
	 		if(err) return cb(_.extend(err,{status:500,message:'Ooops !!!'}));
	 		if(_.isEmpty(docs)) return cb({status:404,message:'The user not was found'});
	 		bcrypt.compare(query.password,docs.password,function(err,isMatch) {
	 			if(err) return cb(_.extend(err,{status:500,message:'Ooops !!!'}));
	 			if(!isMatch) return cb({status:400,message:'Bad password'});
	 			return cb(null,docs);
	 		})
	 	})//match query
	 	
	}//end login
};
