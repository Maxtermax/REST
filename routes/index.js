var uPath  = "./user_handler/"
,		fsPath = "./file_handler/"
,		postPath = "./post_handler/";

module.exports = function(auth,model,model_file) {
	return {
		login  		: require(uPath+'login.js')(auth,model.user,model["_"]),
		signin 		: require(uPath+'signin.js')(model.user,model["_"]),
		profile		: require(uPath+'profile.js')(model.user),
		onePost   : require(uPath+'onePost.js')(model.user),
		allPost   : require(uPath+'allPost.js')(model.user),
		update 		: require(uPath+'update.js')(model.user),
		delete 		: require(uPath+'delete.js')(model.user),
		createPost: require(postPath+'createPost.js')(model["_"],model.user),
		updatePost: require(postPath+'updatePost.js')(model["_"],model.user),	
		upload_fs : require(fsPath+'upload_fs.js'),
		get_fs    : require(fsPath+'get_fs.js')(model_file,model["_"])	
	}	

};




