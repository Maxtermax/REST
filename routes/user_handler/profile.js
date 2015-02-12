module.exports = function(model) {
	var Profile = function(req,res) {
 		var user 		= new model()
 		,		token 	= req.headers.authorization || ''
 		,		method 	= token.split(' ')[0]
 		,		key			= token.split(' ')[1];

   	if( method === 'Bearer') {
    	user.getProfile({'username':req.params.name},key,function(err,docs) {
        if(err) res.status(err.status || 500).send({success:false,message:'Ooops!',err:err});
        else res.send(docs);             
    	});     	
    }else {
      res.status(400).send({success:false,message:'no found Bearer [token] field in the headers of the request'});
    }

	};//end Profile

	return Profile;
};



























