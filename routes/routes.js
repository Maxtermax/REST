module.exports = function(key,auth,model) {
	return {
		profile   : require('./profile.js')(model),
		news    : require('./news.js')(model),
		account : require('./account.js')(auth,model),
		login   : require('./login.js')(auth,model) 
	}
};




