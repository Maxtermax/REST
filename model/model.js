var mongoose = require('mongoose')
,		bcrypt   = require('bcrypt')
,		_ 			 = require('underscore')
,		Schema   = mongoose.Schema
,		id       = mongoose.mongo.ObjectID;//call new for create instance


mongoose.connect('mongodb://localhost/MEAN',function(err,res){
	if(err) console.log(err);
	else 		console.log("Conect at: MEAN");
});

var schema = new Schema({
	name:{type:String,unique:true},
	pass:{type:String,unique:true},
	post:[{
		name:String,
		body:String,
		pic :String,
		_id:String,
		starts:Number,
		createAt:{type:Date,default:Date.now},
		images:[{url:String}],
		comments:[{
			name:String,
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

	var genHash = function(pass,cb) {
		bcrypt.genSalt(10, function(err, salt) {
			//generate salt = 'fwefe23o2mr3ion12' to mix with the pass
			if(err) return cb(err);
			bcrypt.hash(pass,salt, function(err, hash) {
			  // override the textplain password with the hashed one
				if(err) return cb(err);
				if(hash)return cb(null,hash);
			});
		});
	};//end genHash

	var encryptPass = function(next) {
		var self = this;
		genHash(self.pass,function(err,hash) {
			if(err) return next(err);
			self.pass = hash;
			next();
		});
	};//end encryptPass

	var login = function(query,cb) {
	 	var self = this;
	 	self.findOne({name:query.name},function(err,doc) {
	 		if(err) return cb(err,null);
	 		if(!doc) {
	 			return cb({success:false,message:'user not found'}); 
	 		}else {
			  bcrypt.compare(query.pass,doc.pass,function(err, isMatch) {
			 		if(err) return cb(err,null);
			 		if(isMatch) return cb(null,doc);
			 		else return cb({success:false,message:'bad password'}); 			
			  });//compare
			};//user find
	 	});//store query
	};//end login

	var getNews = function(cb) {
		var self = this;
		self.find({},function(err,docs) {
			if(err) return cb({
				success:false,
				status:500,
				message:'He could not consult the database',
				err:err
			});	
				
			if(docs){
				if(_.isArray(docs)) {
					var news = _.map(docs,function(doc) { 
						return {name:doc.name,email:doc.email} 
					});//filter the data for dont show pass an more data
					return cb(null,news);
				}else{
					var doc = docs;
					return cb(null,{name:doc.name,email:doc.email});
				};//filter the data for dont show pass an more data
				
			}	
		});
	};//end getNews

	var getProfile= function(query,token,cb) {
  	var self = this;
	  jwt.verify(token,key,function(err,decode) {
		  	self.model('user').findOne(query,function(err,docs) {
			 		if(decode && docs && String(docs["_id"]) === decode["ID"] ) {
			 			//complete view
			 			var doc = _.omit(docs["_doc"],'pass','_id','__v','isLogin');
			 			console.log('Complete view');
			 			return cb(null,doc);
			 		}else if(err){
			 			console.log(err);
			 			//something wrong in the query
			 			return cb(err,null);
			 		}else if(docs){ 
			 			//Limit view 
			 			console.log('Limit view');
			 			var doc =  _.pick(docs["_doc"],'email', 'name');//return only the email and name
			 			doc.limit = true;
			 			return cb(null,doc);				 		
			 		}else {
			 			return cb({status:404,success:false,message:'user no found'});				 					 			
			 		};
			 	});//end find with token	  		

	  });//end verify
	  /*
			if the user cannot be authenticate because not have token access
			return the limit view of the user in request
	  */
	}//end getProfile

	var update = function(token,update,cb) {
		var self  = this;
		var model = self.model('user');

		jwt.verify(token,key,function(err,decode) {
			//get ID by token
			if(err) return cb(err);
			if(_.has(decode,'ID')) {
				var id = decode['ID']; 
				if(_.has(update,'pass')) {
					model.findById(id,function(err,docs) {
						if(err) return cb(err);
						if(!docs) return cb({success:false,message:'user no found'});
						bcrypt.compare(update.pass,docs.pass,function(err,isMatch) {
							if(err) return cb(err);
							if(isMatch) {
								if(_.has(update,'newpass')) {
									genHash(update.newpass,function(err,hash) {
										if(err) return cb(err);
										update.newpass = hash;
										update.pass = update.newpass; 
										model.findByIdAndUpdate(id,update,function(err,docs) {
											if(err) return cb(err);
											return cb(null,docs);
										});
									});
								}else {
									delete update.pass;
									model.findByIdAndUpdate(id,update,function(err,docs) {
										if(err) return cb(err);
										return cb(null,docs);
									});	
								}
							}else {
								return cb({success:false,message:'bad password'});
							}
						});
					});
				}else {
						return cb({success:false,message:'password required'});
				}
			}else {
				return cb({success:false,message:'bad token'});
			}
		});
	};//new update
	
	var remove = function(token,cb) {
		var self = this;
		var model = self.model('user');
		jwt.verify(token,key,function(err,decode) {
			if(err) return cb(err);
			if(_.has(decode,'ID')) {
				model.findByIdAndRemove(decode['ID'],function(err,docs) {
					if(err)  return cb(err);
					if(docs) return cb(null,docs);
					if(!docs)return cb({status:404,success:false,message:'user no found'});
				});
			}else {
				return cb({status:404,success:false,message:'Bad token'});
			}
		});

	};//end remove

	schema.statics.update = update;
	schema.statics.remove = remove;
	schema.statics.login = login;
	schema.statics.getNews = getNews;
	schema.methods.getProfile = getProfile;
	schema.pre("save",encryptPass); 

	return {
		user:mongoose.model('user',schema),
		mongo:mongoose,
		_:_
	}
	
};



