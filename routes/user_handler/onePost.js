module.exports = function(model) {
	return function(req,res) {
		var b = req.body;
		if(!req.name && !req.id) return res.send({success:false,message:'missing data at url request'});					
		model.onePost(req.name,req.id,function(err,post) {
			if(err) return res.status(err.status || 500).send(err);	
			res.send(post);					
		})
	}//get all post 
}
































































