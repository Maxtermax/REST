var mongoose = require('mongoose')
,		bcrypt   = require('bcrypt')
,		_ 			 = require('underscore')
,		Schema   = mongoose.Schema
,		id       = mongoose.mongo.ObjectID//call new for create instance
,		genHash = require('./resources/genHash.js')(bcrypt);

mongoose.connect('mongodb://localhost/nuevo',function(err,res){
	if(err) console.log(err,'ERROR');
	else 		console.log("Conect at: nuevo");
});

var schema = new Schema({
	username:{type:String,unique:true},
	password:{type:String,unique:true},
	isLogin:{type:Boolean,default:false},
	loginAttemps:{type:Number},
	isLooked:{type:Boolean,default:false},
	post:[{
		title:String,
		body:String,
		pic :String,
		_id:String,
		starts:Number,
		createAt:{type:Date,default:Date.now},
		images:[{url:String}],
		comments:[{
			username:String,
			body:String,
			pic :String,
			_id:String,
			starts:Number,
			createAt:{type:Date,default:Date.now},
			images:[{url:String}]
		}]
	}],
	pic:String,
	email:String,
	createAt:{type:Date,default:Date.now},
	media:{
		video:[{type:String}],
		audio:[{type:String}],
		docs:{pdf:[{type:String}]}
	},
	contactos:[{
		username:String,
		message:[{
			text:String,
			createAt:{type:Date,default:Date.now},
			media:{
				video:[],
				audio:[],
				docs:{pdf:[]}
			}
		}]
	}]
});

var model = mongoose.model('user',schema);

var up = {
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





/*

module.exports = function(key,jwt) {
	schema.methods.getProfile = require('./resources/getProfile.js')(_,jwt,key);
	schema.statics.onePost    = require('./resources/onePost.js')(_);
	schema.statics.allPost    = require('./resources/allPost.js')(_);
	schema.statics.upgrade    = require('./resources/upgrade.js')(_,genHash,jwt,key,bcrypt);
	schema.statics.unlink     = require('./resources/unlink.js')(_,key,jwt);
	schema.statics.login      = require('./resources/login.js')(_,bcrypt);
	schema.statics.createPost = require('./resources/createPost.js')(_,jwt,key,id);
	schema.statics.updatePost = require('./resources/updatePost.js')(_);
	schema.pre("save",require('./resources/encryptPass.js')(genHash)); 

	return {
		user:mongoose.model('user',schema),
		mongo:mongoose,
		_:_
	}

}
*/

