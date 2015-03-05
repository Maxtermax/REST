module.exports = function(auth,model,model_file) {
	return {
		user:{
			login:require("./user/login.js")(auth,model.user,model["_"]),
			signin:require("./user/signin.js")(model.user,model["_"]),
			profile:require("./user/profile.js")(model.user),
			delete:require("./user/delete.js")(model.user),
			update:require("./user/update.js")(model.user)
		}


/*
		onePost   : require(uPath+'onePost.js')(model.user),
		allPost   : require(uPath+'allPost.js')(model.user),
		createPost: require(postPath+'createPost.js')(model["_"],model.user),
		updatePost: require(postPath+'updatePost.js')(model["_"],model.user),	
		upload_fs : require(fsPath+'upload_fs.js'),
		get_fs    : require(fsPath+'get_fs.js')(model_file,model["_"])	
*/
	}	

};




