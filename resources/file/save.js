module.exports = function(multer) {
 return function(gfs) {
		var stacks = [];
		return multer({
			onFileUploadStart:function(file){		 
				stacks.push(gfs.createWriteStream({
					filename:file.name,
					mode:"w",
					chunkSize:1024*4,
					content_type:file.mimetype,
					root:"fs",
					metadata:{name:file.originalname}
				}));
			},
			onFileUploadData:function(file,data) {
				stacks.forEach(function(stack) {
					if(stack.name === file.name) stack.write(data);
				})
			},
			onFileUploadComplete:function(file) {
				stacks.forEach(function(stack,index) {
					if(stack.name === file.name) {
						stack.end();
						stacks.splice(index,1);
					}
				})//stack 
			}
		})
	}//end saveFile files 
}

