module.exports = function(model) {
	var profile = function(req,res) {
 		var usuario = new model();
 		var token = req.headers.authorization;
   	if( token && token.split(' ')[0] === 'Bearer') {
    	usuario.getProfile({'name':req.params.name},token.split(' ')[1],function(err,docs) {
        if(err) console.log(err,'ESTE ERROR');
        else res.send(docs);
    	});     	
    }else {
    	//THIS WAY IS ONLY FOR POSTMAN PEOPLE
    	res.status(400).send({
        success:false,
        message:'no found Bearer [token] field in the headers of the request'
      });
   
    }

	};

	return profile;
};



























