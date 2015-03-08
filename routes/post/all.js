module.exports = function(model) {
	return function(req,res) {
		var b = req.body;
		var	user = req.name;//username
		if(!user) return res.send({success:false,message:'missing data at url request'});					
		var post = model.post();
		post.all(user,function(err,post) {
			if(err) return res.status(err.status || 500).send(err);	
			res.send(post);					
		});
	}//get all post 
};
