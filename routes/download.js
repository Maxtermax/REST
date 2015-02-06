module.exports = function(model_file) {
	var download = function(req,res) {
		model_file.get(req.params.file,function(err,file,data) {
			if(err) return res.send(err);		
			
			file.on('open',function(){
						console.log("start..");//comienza a leer la data binaria
				}).on('data',function(chunk){
					console.log(chunk);
				}).on("end",function(){
					console.log("ready");//termina de leer 
						//loaded :)
				}).on('error', function (err){
						 res.send(404);
						//si existe el username y el id pero no existe el archivo responde no found  file :(
						console.log(err);
				}).pipe(res.type(data["contentType"]));


		});
	};

	return download;
}