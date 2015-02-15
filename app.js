var express 		= require("express")//express 4
,		app 				= express()
,		server 			= require("http").createServer(app)
,		io 					= require("socket.io")(server)//socket last version
,		fs 					= require("fs")
,		bodyParser 	= require("body-parser")
,		cors 				= require("cors")
,		key  				= fs.readFileSync("secret/key.txt")
,		jwt 				= require("jsonwebtoken")
,		session			= require("express-jwt")
,		model 			= require("./model/model.js")(key,jwt)
,		model_file 	= require("./model/model_file.js")(model.mongo,fs,model._)
,		auth   			= require("./auth/auth.js")(key,jwt,model)
,		routes 			= require('./routes/index.js')(auth,model,model_file)
,		multer 			= require('multer');


app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');

app.use(cors());
app.use(require('morgan')('dev'));
app.use(require('method-override')());
app.use(multer());


app.use(express.static(__dirname+"/"));
app.use(express.static(__dirname+"/app"));

app.use(session({
	secret:key,
	exp:5
}).unless({path: ['/login','/fs/upload','/signin']}));
app.use(auth.verifyToken);

app.param('id',function(req,res,next,id) {
	req.id = id;
	next();
});

app.get('/',function(req,res) {
	res.sendFile(__dirname+'/app/views/index.html');
});

	/*
	/////////////////////////////
		USER REGISTER
	/////////////////////////////
	*/
app.route('/post').get(routes.news);
app.route('/signin').post(routes.signin);
app.route('/login').post(routes.login);
	/*
	/////////////////////////////
		USER SERVICES
	/////////////////////////////
	*/
app.route('/u/:name').get(routes.profile);
app.route('/u/update').put(routes.update);
app.route('/u/delete/:id').delete(routes.delete);

	/*
	////////////////////////////
		POST SERVICES
	////////////////////////////
	*/
app.route('/new_post').post(routes.new_post);






	/*
	////////////////////////////
		FILE SYSTEM
	////////////////////////////
	*/
var gfs = model_file;

/*
app.post('/fs/upload',multer({
	upload:null,//take uploading process 
	catch:[],
	onFileUploadStart:function(file){
		//set upload with WritableStream		
		this.upload = gfs.createWriteStream({
			filename:file.name,
			mode:"w",
			chunkSize:1024*4,
			content_type:file.mimetype,
			root:"fs",
			metadata:{
				name:file.originalname
			}

		});
	},
	onFileUploadData:function(file,data) {
		var lose_data = this.catch;
		var upload = this.upload;
		//put the chucks into db 
		if(!upload.write(data)) lose_data.push(data);

	},
	onFileUploadComplete:function(file) {
		//end process 
		var lose_data = this.catch;
		var upload = this.upload;
		upload.on('drain',function() {
			console.log(lose_data);		
			upload.end();
		});
	}

}),function(req,res) {
	res.send(req.files);
});

app.route('/fs/download/:file').get(function(req,res) {
	var name = req.params.file;
	gfs.files.find({filename:name}).toArray(function(err,file) {
		if(err) return res.send(err);
		var len = file[0]['length'];
		var progress = 0;
		gfs.createReadStream({filename:name})
			.on('data',function(data) {
				progress += data.length
				console.log('PROGRESS',Math.ceil((progress/len)*100),'%');
			})
			.pipe(res.type('video/mp4'));
	});


});
*/

//web sockets
io.on("connection",function(socket){

});

server.listen(5000,function(){
	console.log("Escuchando el el puerto: "+server.address().port);
});
