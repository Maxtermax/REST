module.exports = function(_,model) {
	return  function(user,id,cb) {
		model.findOne({"post._id":id},function(err,docs) {
			if(err) return cb({success:false,status:500,message:'He could not consult the database',err:err});				
			if(!docs) return cb({success:false,status:404,message:'User not found'});	
			var finder = _.where(docs.post,{_id:id});
			return cb(null,finder);//limit view
		})

	}//end get single post 					
	
};
