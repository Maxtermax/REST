module.exports = function(model) {
 var Update = function(req,res) {
 		var b = req.body;
 		var token = req.headers.authorization || '';
 		var method = token.split(' ')[0];
 		var key = token.split(' ')[1]; 
 		if(method === 'Bearer') {
 			model.upgrade(key,b,function(err,docs) {
 				if(err) res.send(err);
 				else 		res.send(docs);
 			});
 		}else {
 			res.status(400).send({success:false,message:'no found Bearer [token] field in the headers of the request'});
 		}
 	}

 return Update;
};
