/*jslint node: true */
"use strict";


var soap = require('soap');
var express = require('express');
var mysql = require('mysql');
var fs = require('fs');


var args = {
  message: [{
    "No_du_compte": "A1-20-02650/9",
    "Date_Operation": "2020-06-10T00:00:00.000Z",
    "REFERENCE": 1120214,
    "Libelle": "Paiement Echeance principale",
    "Date_valeur": "2020-06-10T00:00:00.000Z",
    "DEBIT": 189.77,
    "CREDIT": null
},{
  "No_du_compte": "A1-20-02650/9",
  "Date_Operation": "2020-06-10T00:00:00.000Z",
  "REFERENCE": 1120214,
  "Libelle": "Paiement Echeance principale",
  "Date_valeur": "2020-06-10T00:00:00.000Z",
  "DEBIT": 189.77,
  "CREDIT": null
}]
};


 function splitter_function(args) {

  // var mysqlHost = process.env.MYSQL_HOST || 'localhost';
  // var mysqlPort = process.env.MYSQL_PORT || '3306';
  // var mysqlUser = process.env.MYSQL_USER || 'root';
  // var mysqlPass = process.env.MYSQL_PASS || 'root';
  // var mysqlDB   = process.env.MYSQL_DB   || 'bank_db';

  // var connectionOptions = {
  //   host: mysqlHost,
  //   port: mysqlPort,
  //   user: mysqlUser,
  //   password: mysqlPass,
  //   database: mysqlDB
  // };

  // console.log('MySQL Connection config:');
  // console.log(connectionOptions);

  // var connection = mysql.createConnection(connectionOptions);

  // connection.connect();

  // connection.query('SELECT * FROM MOE_ITEM_T', function (error, results, fields) {
  //   if (error) throw error;
    
  //    if(responseStr.length == 0)
  //      responseStr = 'No records found';

  //   console.log(results);

  //   res.status(200).send(results);
  // });

  return {
    result: args.message
    }
  

}

// the service
var serviceObject = {
  MessageSplitterService: {
        MessageSplitterServiceSoapPort: {
            MessageSplitter: splitter_function
        },
        MessageSplitterServiceSoap12Port: {
            MessageSplitter: splitter_function
        }
    }
};

// load the WSDL file
var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!<br /><a href="https://github.com/macogala/node-soap-example#readme">Git README</a>');
})

// Launch the server and listen
var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, serviceObject, xml);
  console.log("Check http://localhost:" + port + wsdl_path +"?wsdl to see if the service is working");


/////////////////
var url = 'http://localhost:8000/wsdl?wsdl';

// Create client
soap.createClient(url, function (err, client) {
  if (err){
    throw err;
  }
  
  // call the service
  client.MessageSplitter(args, function (err, res) {
    if (err)
      throw err;
      // print the service returned result
    console.log(res); 
  });
});

});