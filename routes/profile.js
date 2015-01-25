module.exports = function(model) {
	var profile = function(req,res) {
		var user = req.params.name;
		model.findOne({name:user},function(err,docs) {
			if(err){
				res.send(403);
			}else if(!docs) {
				res.send(404);
			}else{	
				res.send(docs);
			}
	
		});
	};

	return profile;
};



























