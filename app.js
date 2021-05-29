/*jslint node: true */
"use strict";
var soap = require('soap');
var express = require('express');
var fs = require('fs');
const call = require("./functions.js") ;

// the service
var service = {
  MessageExtraitService: {
    MessageExtraitServiceSoapPort: {
      MessageExtrait: call.Extrait
    }    
  }
};

// load the WSDL file
var xml = fs.readFileSync('service.wsdl', 'utf8');
// create express app
var app = express();

// root handler
app.get('/', function (req, res) {
  res.send('Node Soap Example!');
})

// Launch the server and listen
var port = 8000;
app.listen(port, function () {
  console.log('Listening on port ' + port);
  var wsdl_path = "/wsdl";
  soap.listen(app, wsdl_path, service, xml);
  console.log("Check http://localhost:" + port + wsdl_path + "?wsdl to see if the service is working");
});