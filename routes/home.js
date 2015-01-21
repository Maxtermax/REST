module.exports = function(auth) {
  var home = function(req,res) {
  	/*
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      var token = req.headers.authorization.split(' ')[1];
      var verify = auth.verifyToken(token);
      if( verify && verify.err ) {
        if(verify.err.name === 'TokenExpiredError') res.send('TokenExpiredError');
        if(verify.err.name === 'JsonWebTokenError') res.send('JsonWebTokenError');
      }else{
        res.send(200);
      }
    }else {
      res.send('No token');
    }
    */
    res.send('cekwmclkewmk');
  };

	return home;
};













































