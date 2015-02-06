Grid = require 'gridfs-stream'

open = ()->
	console.log('Conexion de archivos abierta en','fs_model');

module.exports = (mongoose,_)-> 
	conect = mongoose.createConnection('localhost', 'fs_model',27017).once('open',open)
	gfs = Grid(conect.db,mongoose.mongo)
	return {
	  save : (file) ->
		  return gfs.createWriteStream(file);
	}

























































