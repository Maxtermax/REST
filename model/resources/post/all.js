module.exports = function(_) {
	return function(user,cb) {
		var self = this;
		var u = user;
		self.findOne({username:u},function(err,docs) {
			if(err) return cb({success:false,status:500,message:'He could not consult the database',err:err});				
			if(!docs) return cb({success:false,message:'No users'});
		 	return cb(null,docs.post);
		})							
	}//end allPost 
};























