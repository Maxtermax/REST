var express = require("express")//express 4
,		app = express()
,		server = require("http").createServer(app)
,		io = require("socket.io")(server)//socket last version
,		fs = require("fs")
,		cors = require("cors")
,		key = fs.readFileSync("secret/key.txt")
,		jwt = require("jsonwebtoken")
,		session	= require("express-jwt")
,		model = require("./model/index.js")(key,jwt)
,		gfs	= require("./model/model_file.js")(model.mongo,fs,model._)
,		auth = require("./auth/auth.js")(key,jwt,model)
,		routes = require('./routes/index.js')(auth,model,gfs);

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
	.use(require("./resources/file/save.js")(require("multer"))(gfs))//middleware post and file request
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

app.route('/signin').post(routes.user.signin);
app.route('/login').post(routes.user.login);


/*
/////////////////////////////
	USER SERVICES
/////////////////////////////
*/
app.route('/u/:name').get(routes.user.profile);
app.route('/u/:name/update').put(routes.user.update);
app.route('/u/delete/:id').delete(routes.user.delete);

/*
////////////////////////////
	POST SERVICES
////////////////////////////
*/

app.route('/u/:name/post/all').get(routes.post.all);//get all pot from user
app.route('/u/:name/post/new').post(routes.post.create);//create post
app.route('/u/:name/post/:id').put(routes.post.update);//update single post
app.route('/u/:name/post/:id').get(routes.post.one);//get single post by id


/*
////////////////////////////
	FILE SYSTEM
////////////////////////////
*/
app.get('/statics/media/pictures/:name',routes.files.get);

//web sockets
io.on("connection",function(socket){

});

server.listen(5000,function(){
	console.log("Escuchando el el puerto: "+server.address().port);
});
