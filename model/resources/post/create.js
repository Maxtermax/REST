module.exports = function(_,jwt,key,ID,model) {
	return function(id,newpost,cb) {
		jwt.verify(id,key,function(err,decode) {
			if(err) return cb({err:err,sucess:false,status:500});
			if(!decode['ID']) return cb({message:'bad token access at body from request',sucess:false,status:400});
			newpost['_id'] = new ID();
			var update = {"$push":{post:newpost}};
			model.update({_id:decode['ID']},update,function(err) {
				if(err) return cb({err:err,sucess:false,status:500});
				return cb(null,{sucess:true,status:201,message:'Post created :)',id:newpost['_id']});	
			})//push post 			
		})//end verify 
	}
}

























