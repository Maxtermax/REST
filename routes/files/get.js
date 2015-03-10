module.exports = function(gfs) {
	return function(req,res) {
		gfs.files.find({filename:req.name}).toArray(function(err,file) {
			if(err) return res.send(err);
			gfs.createReadStream({
				filename:req.name
			}).pipe(res.type(file[0]['contentType']));
		})
	}

}