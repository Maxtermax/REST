module.exports = function(_,model) {
	return function(user,cb) {
		model.findOne({username:user},function(err,docs) {
			if(err) return cb({success:false,status:500,message:'He could not consult the database',err:err});				
			if(!docs) return cb({success:false,message:'No users'});
		 	return cb(null,docs.post);
		})							
	}//end allPost 
};























