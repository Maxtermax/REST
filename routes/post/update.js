module.exports = function(_,model) {
	return function(req,res) {
		var body = req.body;
		var id = req.id;	
		var post = model.post();
		post.update(id,body,function(err,docs) {
			if(err) return res.status(err.status).send(err);
			if(docs) return res.send({
				message:'Ok post updated',
				status:200,
				sucess:true,
				post:body
			});
			res.send({message:'Somethig was wrong :( try again',status:500,sucess:false});
		})		
	}
}