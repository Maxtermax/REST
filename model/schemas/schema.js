module.exports = function(Schema) {
	var Comments = new Schema({
		username:String,
		body:String,
		pic :String,
		_id:String,
		starts:Number,
		createAt:{type:Date,default:Date.now},
		images:[String]
	});

	var Post = new Schema({
		title:String,
		body:String,
		pic :String,
		_id:String,
		starts:Number,
		createAt:{type:Date,default:Date.now},
		images:[String],
		comments:[Comments]
	})

	var Contacts = new Schema({
		username:String,
		message:[{
			text:String,
			createAt:{type:Date,default:Date.now},
			media:{
				video:[],
				audio:[],
				docs:{pdf:[String]}
			}
		}]
	})

	var User = new Schema({
		username:{type:String,unique:true},
		password:{type:String,unique:true},
		session:{type:String},
		loginAttemps:{type:Number},
		isLooked:{type:Boolean,default:false},
		post:[Post],
		pic:String,
		email:String,
		createAt:{type:Date,default:Date.now},
		media:{
			video:[{type:String}],
			audio:[{type:String}],
			docs:{pdf:[{type:String}]}
		},
		contacts:[Contacts]
	});
	return User;

}

