module.export = function(_,model) {
	return function(req,res) {
		var b = req.body;
		model.updatePost(req.name,req.id,b,function(err,docs) {
			if(err) return res.status(err.status).send(err);
			res.send(docs)
		})
	}

};