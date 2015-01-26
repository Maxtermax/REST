module.exports = function(model) {
	var profile = function(req,res) {
 		var usuario = new model();
 		var token = req.headers.authorization || false;
   	if( token && token.split(' ')[0] === 'Bearer') {
    	usuario.getProfile({'name':req.params.name},token.split(' ')[1],function(err,docs) {
     		if(err) console.log(err);
     		else res.send(docs);
    	});     	
    }
	};

	return profile;
};



























