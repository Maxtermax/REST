var mongoose = require('mongoose')
,		bcrypt   = require('bcrypt')
,		_ 			 = require('underscore')
,		schema   = require('./schemas/schema.js')(mongoose.Schema)
,		id       = mongoose.mongo.ObjectID//call new for create instance
,		genHash = require('./resources/utils/genHash.js')(bcrypt);


mongoose.connect('mongodb://localhost/nuevo',function(err,res){
	if(err) return console.log(err,'ERROR');
	console.log("Conect at: nuevo");
});//open connection 

/*
var model = mongoose.model('user',schema);

var up =	 {
	title:'titulo cambiado'
}
var data = _.object(_.map(up,function (val, key) {
    return ["post.$."+key,val];
}));

var query = {"post._id":"54e8f8038c1b73301d08197b"};
var update = {"$set": data }

model.update(query,update,function(err,docs) {
	if(err) return console.log(err,'err');
	console.log(docs,'docs');
});
*/

module.exports = function(key,jwt) {
	schema.methods.profile = require('./resources/user/profile.js')(_,jwt,key)//create user

	schema.statics.user = function() {
		var model = this.model("user");
		return {
			login:require('./resources/user/login.js')(_,bcrypt,model),
			delete:require('./resources/user/delete.js')(_,key,jwt,model),
			update:require('./resources/user/update.js')(_,genHash,jwt,key,bcrypt,model)
		}
	}

	schema.statics.post = function() {
		var model = this.model("user");
		return {
			update:require('./resources/post/update.js')(_,model),
			create:require('./resources/post/create.js')(_,jwt,key,id,model),
			one:require('./resources/post/one.js')(_,model),
			all:require('./resources/post/all.js')(_,model)
		}
	}
	//post services 

	schema.pre("save",require('./resources/utils/encryptPass.js')(genHash)); 
	return {user:mongoose.model("user",schema),mongo:mongoose,_:_}
} 

