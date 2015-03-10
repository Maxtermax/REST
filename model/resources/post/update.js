module.exports = function(_,model) {
	return function(query,body,files,cb) {	
		if(files) _.extend(body,files);
		var data = _.object(_.map(body,function (val, key) {
		    return ["post.$."+key,val];
		}));
		var query = {"post._id":query};
		var update = {"$set": data };

		model.update(query,update,function(err,docs) {
			if(err) return cb({err:err,status:500,message:'Somethig was wrong :( try again'});
			return cb(null,docs);
		})

	}
};
