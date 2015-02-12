module.exports = function(_) {
	return function(cb) {
		var self = this;
		self.find({},function(err,docs) {
			if(err) return cb({success:false,status:500,message:'He could not consult the database',err:err});				
			if(docs){
				if(_.isArray(docs)) {
				  return cb(null,_.map(docs,function(doc) { return {username:doc.username,email:doc.email} 	}));//filter the data for dont show pass an more data
				}else{
					return cb(null,{name:docs.username,email:docs.email});
				}//filter the data
			}else {
				return cb(null,{empty:'No news'});
			}
						
		});
	};//end getNews

}