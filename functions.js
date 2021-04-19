var mysql = require('mysql');


function data(callback) {
    var mysqlHost = process.env.MYSQL_HOST || 'localhost';
      var mysqlPort = process.env.MYSQL_PORT || '3306';
      var mysqlUser = process.env.MYSQL_USER || 'root';
      var mysqlPass = process.env.MYSQL_PASS || 'root';
      var mysqlDB = process.env.MYSQL_DB || 'bank_db';
  
      var connectionOptions = {
        host: mysqlHost,
        port: mysqlPort,
        user: mysqlUser,
        password: mysqlPass,
        database: mysqlDB
      };
  
      var connection = mysql.createConnection(connectionOptions);
      connection.connect()
  
      
            connection.query('SELECT * FROM MOE_ITEM_T', function (err, rows, fields) {
               
                if (err) {
                    return callback(err, null);
                }
                return callback(null, rows);
            })
        
        
  
            
  
}
  
  
  
function Extrait(args, callback) {
  
  
    data( function (err, rows) {
      if (!err) {
         callback(null,rows);
          
      }
      else {
         callback(true,err);
      }
   });

}

module.exports = { Extrait };