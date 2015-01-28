var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var _      = require('underscore');

mongoose.connect('mongodb://localhost/MEAN',function(err,res){
	if(err) console.log(err);
	else 		console.log("Conect at: MEAN");
});

var schema = new Schema({
	name:{type:String,unique:true},
	pass:{type:String,unique:true},
	pic:String,
	email:String,
	createAt:{type:Date,default:Date.now},
	media:{
		video:[],
		audio:[],
		docs:{pdf:[]}
	},
	isLogin:{type:Boolean,default:true},
	contactos:[{
		name:String,
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

var encryptPass = function(next) {
	var self = this;
	bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(self.pass,salt, function(err, hash) {
      if (err) return next(err);
      // override the textplain password with the hashed one
      self.pass = hash;
      next();
    });
  });
}

schema.pre("save",encryptPass);

module.exports = function(key,jwt) {

	schema.methods.getProfile = function(query,token,cb) {
  	var self = this;
  	try{
	  	var decode = jwt.verify(token,key);	
	  	self.model('user').findOne(query,function(error,docs) {
		 		if(docs && String(docs["_id"]) === decode["ID"] ) 
		 			return cb(null,docs);
		 		else if(error)
		 			return cb(error,null);
		 		else 
		 			return cb(null,{name:docs.name,email:docs.email});				 		
		 	});//end find 
   	}catch(err){
	 		return cb(err,null)
  	}	
	}//end getProfile

	return mongoose.model('user',schema);

};



