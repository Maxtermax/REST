var Grid = require('gridfs-stream');

module.exports = function(mongoose) {
  var conn = mongoose.createConnection('localhost', 'fs_model', 27017).once('open', function() {
    console.log('CONECTADO A fs_model');
  })//end open connection
  return Grid(conn.db, mongoose.mongo);            
          
};//end exports

