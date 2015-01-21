var fs=require('fs');
var Grid = require('gridfs-stream');
var mongoose = require('mongoose');//mongoose driver 
var mongoID = mongoose.mongo.ObjectID;

var conn = mongoose.createConnection('localhost', 'Archivo',27017).once('open',function(){
	console.log("Conexion de archivo lista");
});//files collection 

var gfs = Grid(conn.db,mongoose.mongo);


module.exports={	 
	OpenAndWriteF:function(data,cb){
	console.log("archivo ",data);
	console.log(this);
	var ID=new mongoID();
	var escritura=gfs.createWriteStream({
		_id:ID,
		filename:data.User,
		mode:"w",
		chunkSize:1024*4,
		content_type:data.ContentType,
		root:"fs",
		metadata:{
			"nameFile":data.nameFile,
			"descripcion":data.des,
			"ID":ID+data.extension
		}
	});	
	fs.createReadStream(data.path).pipe(escritura);
	escritura.on("close",function(file){
		return cb(null,file);
	})
	escritura.on("error",function(err){
		return cb(err,null);
	});
	},//end WFiles
	OpenAndReadF:function(res,u,id){
		gfs.files.find({filename:u}).toArray(function(err,docs){
		var len=docs.length//cath longitud
		if(err) console.log(err);
		if( !docs[0] ) res.send(404);//si el u parametro es invalido retorna user not found
		for(var i=0;i<len;i++){
			//si paso la validacion de u entonces comienza la validacion de el id
			if(docs[i]["metadata"]["ID"] == id){
				//en caso de que el id propuesto sea igual al id de la DB muestrelo
				var LectorArchivos=gfs.createReadStream({
						_id:id.slice(0,24)//crea un lector segun el id que paso la validacion
				}).on('open',function(){
						console.log("start..");//comienza a leer la data binaria
				}).on('data',function(chunk){
						//loading...
					//console.log("loading file"); 
				}).on("end",function(){
					console.log("ready");//termina de leer 
						//loaded :)
				}).on('error', function (err){
						 res.send(404);
						//si existe el username y el id pero no existe el archivo responde no found  file :(
						console.log(err);
				});
				LectorArchivos.pipe(res.type(docs[i]["contentType"]));//responde el archivo segun su tipo
				console.log(docs[i]["metadata"]);//show file found						
				break	//se sale del ciclo si encuentra el documento 
				}else if(i === len-1){
				 res.send(404);//file not found
				//si el archivo no es encontrado en ningun JSON envia not found status
				};//termina si no encontra el id dentro de ningun JSON

			}//end ciclo 
		});//end Rfile
	}//end function to send files like: /img/video/pdf etc....


}//end exports functions






