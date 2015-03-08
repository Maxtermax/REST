module.exports = function(model) {
	return function(req,res) {
		var user = model.user();
		user.delete(req.id,function(err,docs) {
			if(err) return res.status(err.status).send(err);
			res.send({status:200,message:"OK"});
		})
	}//end Delete

}
