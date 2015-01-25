var express 		= require("express")//express 4
,		app 				= express()
,		server 			= require("http").createServer(app)
,		io 					= require("socket.io")(server)//socket last version
,		fs 					= require("fs")
,		bodyParser 	= require("body-parser")
,		cors 				= require("cors")
,		session			= require("express-jwt")
,		model 			= require("./model/model.js")
,		jwt 				= require("jsonwebtoken")
,		_           = require("underscore"); 

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


var key    = fs.readFileSync("secret/key.txt");
var auth   = require("./auth/auth.js")(key,jwt);
var routes = require('./routes/routes.js')(key,auth,model);


app.use(session({
	secret:key,
	exp:5
}).unless({path: ['/login']}));
app.use(auth.verifyToken);


app.get('/',function(req,res) {
	res.sendFile(__dirname+'/app/views/index.html');
});


app.route('/')
 .post(routes.news);

app.route('/account')
 .post(routes.account);

app.route('/login')
	.post(routes.login);

app.route('/u/:name')
	.get(routes.profile);



//web sockets
io.on("connection",function(socket){

});

server.listen(5000,function(){
	console.log("Escuchando el el puerto: "+server.address().port);
});
