module.exports = function(_) {
	return function(cb) {
		var self = this;
		self.find({},function(err,docs) {
			if(err) return cb({success:false,status:500,message:'He could not consult the database',err:err});				
			if(!docs) return cb(null,{empty:'empty'});
			if(_.isArray(docs)) return cb(null,docs);//filter the data for dont show pass an more data
		 	return cb(null,docs.post);
		});
							
	};//end getNews

}