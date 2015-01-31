module.exports = function(model) {
	var news = function(req,res) {
		//get news from DB
		var b = req.body;
		model.getNews(function(err,news) {
			if(err) res.status(err.status).send(err);	
			if(news) res.send(news);					
		});
	}//get news

	return news;	
}































































