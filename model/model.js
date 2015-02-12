var mongoose = require('mongoose')
,		bcrypt   = require('bcrypt')
,		_ 			 = require('underscore')
,		Schema   = mongoose.Schema
,		id       = mongoose.mongo.ObjectID//call new for create instance
,		genHash = require('./resources/genHash.js')(bcrypt);


mongoose.connect('mongodb://localhost/MEAN',function(err,res){
	if(err) console.log(err,'ERROR');
	else 		console.log("Conect at: MEAN");
});

var schema = new Schema({
	username:{type:String,unique:true},
	password:{type:String,unique:true},
	post:[{
		username:String,
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
	isLogin:{type:Boolean,default:true},
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

	schema.methods.getProfile = require('./resources/getProfile.js')(_,jwt,key);
	schema.statics.getNews    = require('./resources/getNews.js')(_);
	schema.statics.update     = require('./resources/update.js')(_,genHash,jwt,key,bcrypt);
	schema.statics.remove     = require('./resources/remove.js')(_,key,jwt);
	schema.statics.login      = require('./resources/login.js')(bcrypt);;
	schema.pre("save",require('./resources/encryptPass.js')(genHash)); 

	return {
		user:mongoose.model('user',schema),
		mongo:mongoose,
		_:_
	}

};




