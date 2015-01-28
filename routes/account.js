module.exports = function(model) {

	var singUp = function(req,res) {
		var b = req.body;
		console.log(b,'data');
		var user = new model(b).save(function(err,docs) {
			if(err && err.code && err.code === 11000) {
				res.status(409).send(err);
			}else {
				res.send(200);
			}
		});

	}//singUp

	return singUp;

}











