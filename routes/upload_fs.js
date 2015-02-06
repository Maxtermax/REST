var fs = require("fs");

module.exports = function(model_file) {
	var upload_fs = function(req,res) {
		var gfs = model_file.ins; 
		console.log(gfs,'gfs');
		var file = req.files.img;
		/*
		var writestream = gfs.createWriteStream({
			filename:file.originalname,
			mode:"w",
			chunkSize:1024*4,
			content_type:file.ContentType,
			root:"fs"
		});
		*/
		res.send(200);	
	}

	return upload_fs;
};