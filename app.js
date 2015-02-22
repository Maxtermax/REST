var express 		= require("express")//express 4
,		app 				= express()
,		server 			= require("http").createServer(app)
,		io 					= require("socket.io")(server)//socket last version
,		fs 					= require("fs")
,		cors 				= require("cors")
,		key  				= fs.readFileSync("secret/key.txt")
,		jwt 				= require("jsonwebtoken")
,		session			= require("express-jwt")
,		model 			= require("./model/model.js")(key,jwt)
,		gfs				 	= require("./model/model_file.js")(model.mongo,fs,model._)
,		auth   			= require("./auth/auth.js")(key,jwt,model)
,		routes 			= require('./routes/index.js')(auth,model,gfs)
,		multer 			= require('multer');

	/*
	/////////////////////////////
		EXPRESS CONFIGURATIONS
	/////////////////////////////
	*/
app
	.set('view engine', 'html')
	.set('views', __dirname + '/app/views')
	.use(cors())//middlewares acess among server's 
	.use(require('morgan')('dev'))//middleware debug
	.use(require('method-override')())//middleware put and delete request
	.use(multer({
		upload:null,//take uploading process 
		onFileUploadStart:function(file){
			//set upload with WritableStream
				this.upload = gfs.createWriteStream({
				filename:file.name,
				mode:"w",
				chunkSize:1024*4,
				content_type:file.mimetype,
				root:"fs",
				metadata:{name:file.originalname}
			})
		},
		onFileUploadData:function(file,data) {
			this.upload.write(data);//put the chucks into db 
		},
		onFileUploadComplete:function(file) {
			//end process 
			this.upload.end();
		}
	}))//middleware post and file request
	.use(express.static(__dirname+"/"))//statics resources
	.use(express.static(__dirname+"/app"))//statics resources
	.use(session({secret:key,exp:5}).unless({
		path: ['/login','/fs/upload','/signin']
	}))//session routes
	.use(auth.verifyToken)// verify acess token
	.param('id',function(req,res,next,id) {
		req.id = id;
		next();
	})
	.param('name',function(req,res,next,name) {
		req.name = name;
		next();
	})

app.get('/',function(req,res) {
	res.sendFile(__dirname+'/app/views/index.html');
});

/*
/////////////////////////////
	USER REGISTER
/////////////////////////////
*/
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

app.route('/u/:name/post/:id').get(routes.onePost);//get single post by id
//app.routes('u/:name/post/:id').put(routes.updatePost);//update single post
app.route('/u/:name/post').get(routes.allPost);//get all pot from user
app.route('/u/new/post').post(routes.createPost);//create post






/*
////////////////////////////
	FILE SYSTEM
////////////////////////////
*/

app.get('/statics/media/pictures/:name',function(req,res) {
	gfs.files.find({filename:req.name}).toArray(function(err,file) {
		if(err) return res.send(err);
		gfs.createReadStream({filename:req.name}).pipe(res.type(file[0]['contentType']));
	});
});


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
