module.exports = function(_,model) {
	return function(req,res) {
		var	b = req.body
 		, 	auth = req.headers.authorization || ''
 		,		method = auth.split(' ')[0]
 		,		token	= auth.split(' ')[1];
 
    if( method !== 'Bearer' || !token) return res.status(400).send({success:false,message:'no found Bearer [token] field in the headers of the request'});
		if(!_.has(b,'title','body')) return res.status(401).send('missing data in the request');
		model.createPost(token,{
			title:b.title,
			body:b.body,
			images:[{url:req.files.file.name}]
		},function(err,docs) {
			if(err) return res.status(err.status).send(err);
			res.send(docs.post);
		});			
	}
};





























