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
,		model 			= require("./model/model.js")(key,jwt);

app.set('view engine', 'html');
app.set('views', __dirname + '/app/views');

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('method-override')());
app.use(require('multer')());//files


app.use(express.static(__dirname+"/"));
app.use(express.static(__dirname+"/app"));


var auth   = require("./auth/auth.js")(key,jwt);
var routes = require('./routes/index.js')(key,auth,model);

app.use(session({
	secret:key,
	exp:5
}).unless({path: ['/login','/signin']}));
app.use(auth.verifyToken);

app.param('id',function(req,res,next,id) {
	req.id = id;
	next();
});

app.get('/',function(req,res) {
	res.sendFile(__dirname+'/app/views/index.html');
})

app.route('/news').get(routes.news);

app.route('/signin').post(routes.signin);

app.route('/login').post(routes.login);

app.route('/u/:name').get(routes.profile);

app.route('/update').put(routes.update);

app.route('/delete/:id').delete(routes.delete);

//web sockets
io.on("connection",function(socket){

});

server.listen(5000,function(){
	console.log("Escuchando el el puerto: "+server.address().port);
});
