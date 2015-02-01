module.exports = function(key,auth,model) {
	return {
		login  : require('./login.js')(auth,model),
		delete : require('./delete.js')(model),
		profile: require('./profile.js')(model),
		news   : require('./news.js')(model),
		signin : require('./signin.js')(model),
		update : require('./update.js')(model)
	}
};




