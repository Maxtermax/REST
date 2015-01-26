var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/Coder',function(err,res){
	if(err) console.log(err);
	else 		console.log("Conect at: Coder");
});


var Esquema = new Schema({
	name:String,
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

module.exports = function(key,jwt) {
	Esquema.methods.getProfile = function(query,token,cb) {
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

	return	mongoose.model('user',Esquema);
};


