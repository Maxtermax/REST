module.exports = function(_,key,jwt,model) {
	return function(token,cb) {
		jwt.verify(token,key,function(err,decode) {
			if(err) return cb({message:"Bad token access",status:400,err:err});
			if(!decode['ID']) return cb({status:403,success:false,message:'has not permissions to delete this user'});
			model.findByIdAndRemove(decode['ID'],function(err,docs) {
				if(err) return cb({status:500,success:false,message:"somethig bad happend at request try again"});
				if(!docs) return cb({status:404,success:false,message:'user not found'});
				return cb(null,{success:true,message:'OKAY!!! user delete'});
			})//operation at db
		})//verify token
	}//end remove

}
