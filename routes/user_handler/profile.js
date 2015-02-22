module.exports = function(model) {
	return function(req,res) {
 		var user = new model()
 		,		auth = req.headers.authorization || ''
 		,		method = auth.split(' ')[0]
 		,		token	= auth.split(' ')[1];
   	if( method !== 'Bearer' || !token) return res.status(400).send({success:false,message:'no found Bearer [token] field in the headers of the request'});
   	user.getProfile({'username':req.name},token,function(err,docs) {
    	if(err) return res.status(err.status || 500).send({success:false,message:'Ooops! something was wrong try again',err:err});
    	res.send(docs);             
  	})           
	}//end Profile
};



























