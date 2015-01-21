module.exports = function(key,auth,model,root) {
	return {
		home		: require('./home.js')(auth),
		account : require('./account.js')(auth,model),
		login   : require('./login.js')(auth,model) 
	}
};




