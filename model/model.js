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


module.exports = mongoose.model('user',Esquema);
