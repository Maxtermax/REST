module.exports = function(_,model) {
	return  function(user,id,cb) {
		model.findOne({username:user},function(err,docs) {
			if(err) return cb({success:false,status:500,message:'He could not consult the database',err:err});				
			if(!docs) return cb({success:false,status:404,message:'User not found'});
			var post;
			for (var i = 0; i < docs.post.length; i++) {
				if(_.isEmpty(docs.post[i])) continue;
				if(docs.post[i]['_id'] === id) {
					post = docs.post[i];
					break;
				}
			};
			if(!post) post = [];
			console.log('POAR QUE ENTRAS ');
			return cb(null,post);//limit view
		});

	}//end get single post 					
	
};
