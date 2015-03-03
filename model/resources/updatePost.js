module.exports = function(_) {
	return function(user,id,body,cb) {
		var self = this;
		var model = self.model('user');
		model.findOne({username:user},function(err,docs) {
			if(err) return cb({sucess:false,status:500});
			for(var i = 0;i<docs.length;i++) {
				if(docs[i]['_id'] === id ) res.send(docs[i]); break;
			}

		});

	}
};
