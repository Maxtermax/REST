var fs = require("fs");

module.exports = function() {

	var upload_fs = function(req,res) {	
    res.send(req.files);
  }//end upload_fs 


	return upload_fs;
};