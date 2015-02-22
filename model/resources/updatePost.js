module.exports = function(_,jwt,key,ID) {
	return function(user,id,body,cb) {
		var self = this;
		var model = self.model('user');
		model.findAndUpdate(user,body,function(err,docs) {
			if(err) return cb({status:500,err:err});
			if(_isEmpty(docs)) return cb({status:404,message:'User not found'});
			return cb(null,docs);
		})
	}
};
