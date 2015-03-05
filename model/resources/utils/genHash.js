module.exports =  function(bcrypt) {
	return function(password,cb) {
			bcrypt.genSalt(10, function(err, salt) {
				//generate salt = 'fwefe23o2mr3ion12' to mix with the pass
				if(err) return cb(err);
				bcrypt.hash(password,salt, function(err, hash) {
				  // override the textplain password with the hashed one
					if(err) return cb(err);
					if(hash)return cb(null,hash);
				})
			})
	}//end genHash
}










