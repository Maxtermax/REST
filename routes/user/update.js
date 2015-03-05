module.exports = function(model) {
  return function(req,res) {
 		var b = req.body;
 		var token = req.headers.authorization || '';
 		var method = token.split(' ')[0];
 		var key = token.split(' ')[1]; 
 		if(!method === 'Bearer') return	res.status(400).send({
 			success:false,
 			message:'no found Bearer [token] field in the headers of the request'
 		});		

		var user = model.user()
		user.update(key,b,function(err,docs) {
			if(err) return res.send(err);
			res.send({status:200,message:'Ok Data updated :)'});
		})

 	}
			
}
