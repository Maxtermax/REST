module.exports = function(model) {
	var Profile = function(req,res) {
 		var user 		= new model()
 		,		auth 	= req.headers.authorization || ''
 		,		method 	= auth.split(' ')[0]
 		,		token			= auth.split(' ')[1];
    if( method !== 'Bearer' || !token) return res.status(400).send({success:false,message:'no found Bearer [token] field in the headers of the request'});
   user.getProfile({'username':req.params.name},token,function(err,docs) {
    if(err) res.status(err.status || 500).send({success:false,message:'Ooops!',err:err});
    else res.send(docs);             
  });       
       




	};//end Profile

	return Profile;
};



























