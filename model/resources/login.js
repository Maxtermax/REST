module.exports = function(bcrypt) {
   return function(query,cb) {
	 	var self = this;
	 	self.findOneAndUpdate({username:query.username},{isLogin:true},function(err,doc) {
	 		if(err) return cb(err,null);
	 		if(!doc) return cb({success:false,message:'user not found'}); 		
			bcrypt.compare(query.password,doc.password,function(err, isMatch) {
				//user find
		 		if(err) return cb(err,null);
		 		if(isMatch) {
		 			if(doc.isLooked) cb({success:false,message:'user is locked'});;
		 			return cb(null,doc);	
		 		}else {
		 			return cb({success:false,message:'bad password'}); 			
		 		}
		 			
		 			

		  })//compare

	 	});//match query

	};//end login

}
