module.exports = function(model) {
	var news = function(req,res) {
		//get news from DB
		var b = req.body;
		model.find({},function(err,docs) {
			if(err) res.status(500).send(err);	
			var data = [];
			docs.forEach(function(element,index,array) {
				data.push({name:element.name});
			});
			res.send(data);
		});
	}

	return news;	
}































































