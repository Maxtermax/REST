module.exports = function(_,jwt,key) {
 	return function(query,token,cb) {
  	var self = this;
	  jwt.verify(token,key,function(err,decode) {
		  	self.model('user').findOne(query)
		  		.exec(function(err,docs) {
				 		console.log(query,'query');
				 	  if(err)	return cb({err:err,message:'something wrong in the query'},null);
				 		if(decode && docs && String(docs["_id"]) === decode["ID"]) return cb(null,_.omit(docs["_doc"],'password','_id','__v','isLogin'));	//complete view	
				 		if(docs) return cb(null,_.pick(docs["_doc"],'email', 'username'));//limit view
				 		if(!docs)	return cb({status:404,success:false,message:'user no found'});				 					 			
			 		})//end find with token	  			 
	  })//end verify
			 		
	}//end getProfile
			 		



}
