module.exports = function(model) {
	var news = function(req,res) {
		var b = req.body;
		model.getNews(function(err,news) {
			if(err) res.status(err.status || 500).send(err);	
			if(news) res.send(news);					
		});
	}//get news

	return news;	
}































































