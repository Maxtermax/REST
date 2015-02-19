module.exports = function(model) {
	return function(req,res) {
		var b = req.body
		,	user = req.name//username
		,	id = req.id;//post id 
		if(!user && !id) return res.send({success:false,message:'missing data at url request'});					
		model.onePost(user,id,function(err,post) {
			if(err) return res.status(err.status || 500).send(err);	
			res.send(post);					
		});
	}//get all post 

}
































































