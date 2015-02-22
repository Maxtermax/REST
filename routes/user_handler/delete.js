module.exports = function(model) {
	var Delete = function(req,res) {
		model.unlink(req.id,function(err,docs) {
			if(err) return res.status(err.status || 500).send(err);
			res.send(docs);
		});
	};//end Delete

	return Delete;
};
