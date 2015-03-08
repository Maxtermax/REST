module.exports = function(auth,model,model_file) {
	var _ = model["_"];
	var model = model.user;
	return {
		user:{
			login:require("./user/login.js")(auth,model,_),
			signin:require("./user/signin.js")(model,_),
			profile:require("./user/profile.js")(model),
			delete:require("./user/delete.js")(model),
			update:require("./user/update.js")(model)
		},//user services
		post: {
			create:require("./post/create.js")(_,model),//POST
			all:require("./post/all.js")(model),//GET
			one:require("./post/one.js")(model),//GET
			update:require("./post/update.js")(_,model)
		}//post services
	}	
};






