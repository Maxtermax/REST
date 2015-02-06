module.exports = function(auth,model,model_file) {
	return {
		login  		: require('./login.js')(auth,model.user),
		signin 		: require('./signin.js')(model.user),
		profile		: require('./profile.js')(model.user),
		news   		: require('./news.js')(model.user),
		update 		: require('./update.js')(model.user),
		delete 		: require('./delete.js')(model.user),
		upload_fs : require('./upload_fs.js')(model_file),
		download_fs : require('./download.js')(model_file,model._)	
	}	

};




