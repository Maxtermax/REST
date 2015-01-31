module.exports = function(key,auth,model) {
	return {
		profile: require('./profile.js')(model),
		news   : require('./news.js')(model),
		signin : require('./signin.js')(model),
		login  : require('./login.js')(auth,model) 
	}
};




