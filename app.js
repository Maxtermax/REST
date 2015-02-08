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
,		auth   			= require("./auth/auth.js")(key,jwt)
,		routes 			= require('./routes/index.js')(auth,model,model_file);


app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('method-override')());
//app.use(require('multer')());


app.use(express.static(__dirname+"/"));
app.use(express.static(__dirname+"/app"));

app.use(session({
	secret:key,
	exp:5
}).unless({path: ['/login','/fs/upload','/signin','/algo']}));
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
app.route('/news').get(routes.news);
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
		FILE SYSTEM
	////////////////////////////
	*/
var gfs = model_file;

var multer = require('multer')

app.post('/fs/upload',multer({
	upload:null,
	onFileUploadStart:function(file){		
		this.upload = gfs.createWriteStream({
			filename:file.originalname,
			mode:"w",
			chunkSize:1024*4,
			content_type:file.mimetype,
			root:"fs"
		});

	},
	onFileUploadData:function(file,data) {
		this.upload.write(data);
	},
	onFileUploadComplete:function(file) {
		this.upload.end();
	}
}),function(req,res) {
	res.sendStatus(200);
});

app.route('/fs/download/:file').get(routes.download_fs);

//web sockets
io.on("connection",function(socket){

});

server.listen(5000,function(){
	console.log("Escuchando el el puerto: "+server.address().port);
});
