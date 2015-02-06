var Grid = require('gridfs-stream');
module.exports = function(mongoose) {
  var conect = mongoose.createConnection('localhost', 'fs_model', 27017).once('open',function() {
    var gfs = new Grid(conect.db, mongoose.mongo);
    
  });
  
}