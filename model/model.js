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

module.exports = function(key,jwt) {

	schema.statics.logout = function(query,cb) {
		var self = this;
		self.model('user').findOneAndUpdate(query,{isLogin:false},function(err,docs) {
			if(err) return cb(err);
			if(!docs) return cb({sucess:false,message:'user not found'});
			if(docs) return cb(null,docs);
		})
	};

	schema.methods.getProfile = require('./resources/getProfile.js')(_,jwt,key);
	schema.statics.onePost    = require('./resources/onePost.js')(_);
	schema.statics.allPost    = require('./resources/allPost.js')(_);
	schema.statics.update     = require('./resources/update.js')(_,genHash,jwt,key,bcrypt);
	schema.statics.remove     = require('./resources/remove.js')(_,key,jwt);
	schema.statics.login      = require('./resources/login.js')(bcrypt);
	schema.statics.createPost = require('./resources/createPost.js')(_,jwt,key,id);
	schema.pre("save",require('./resources/encryptPass.js')(genHash)); 

	return {
		user:mongoose.model('user',schema),
		mongo:mongoose,
		_:_
	}

};






