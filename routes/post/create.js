module.exports = function(_,model) {
	return function(req,res) {
		var	b = req.body
 		, 	auth = req.headers.authorization || ''
 		,		method = auth.split(' ')[0]
 		,		token	= auth.split(' ')[1]
 		,		files = req.files;  

    if( method !== 'Bearer' || !token) return res.status(400).send({success:false,message:'no found Bearer [token] field in the headers of the request'});
		if(!(_.has(b,'title','body'))) return res.status(401).send({success:false,status:401,message:'missing data in the request'});
		var content = {
			title:b.title,
			body:b.body,
			images:function() {
				if(!files.file) return [];	
				if(_.isArray(files.file)) {
					var yeild = _.map(files.file,function(file) {	return file.name });
					return yeild;
				}
				return files.file.name;
			}()
		}
		var post = model.post();
		post.create(token,content,function(err,docs) {
			if(err) return res.status(err.status).send(err);
			res.status(docs.status).send(docs);
		});			
		
	}
};





























