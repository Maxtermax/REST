module.exports = function(_) {
	return function(user,cb) {
		var self = this;
		var u = user || {};
		self.find(u,function(err,docs) {
			if(err) return cb({success:false,status:500,message:'He could not consult the database',err:err});				
			if(!docs) return cb({success:false,message:'No users'});
			var posts = [];
			for(var i = 0; i < docs.length; i++) {
				if(_.isEmpty(docs[i]['post']) ) continue;
				posts.push(docs[i]['post']);	
			};
		 	return cb(null,posts[0]);
		})							
	}//end allPost 
};























