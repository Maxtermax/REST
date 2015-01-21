var express 		= require('express')//express 4
,		app 				= express()
,		server 			= require('http').createServer(app)
,		io 					= require('socket.io')(server)//socket las version
,		fs 					= require('fs')
,		bodyParser 	= require('body-parser')
,		cors 				= require('cors')
,		session			= require("express-jwt")
,		model 			= require('./model/model.js')
,		jwt 				= require('jsonwebtoken');


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

app.use(function(err,req,res,next) {
	var path = req.path;
	var b    = req.body;
	if(path != '/login' && path != '/account' && path != '/') {
		res.send(404);
		console.log('NO <ENCONTRADO></ENCONTRADO> ');
	} else if(err){
		if(req.method === 'GET') {
			next();
			console.log('NO TOKEN SOLO QUIERO LA VISTA NORMAL');
		}else {
			res.status(err.status).send(err);
			console.log('no autorizado ');
		};
	}else{
		console.log('SIGASE');
		next();
	}
});

app.get('/',function(req,res) {
	res.sendFile(__dirname+'/app/views/index.html');
});


app.route('/')
	.post(routes.home);

app.route('/account')
 .post(routes.account);

app.route('/login')
	.post(routes.login);


/*

//	var token = jwt.sign({secret:'esneyder'},'lolipop');
	var token = req.headers.authorization.split(' ')[1];
	var decode = jwt.verify(token,key);
	console.log(decode,'decode');
	res.send(decode);
*/





//web sockets
io.on("connection",function(socket){

});

server.listen(5000,function(){
	console.log("Escuchando el el puerto: "+server.address().port);
});
