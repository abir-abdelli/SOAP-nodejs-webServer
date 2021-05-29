const { response } = require('express');
var mysql = require('mysql');


function data(callback, args) {
  var values = [[args.No_du_compte, args.Date_operation, args.REFERENCE, args.Libelle, args.Date_valeur, args.DEBIT, args.CREDIT]];
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

  //   connection.query('SELECT * FROM MOE_ITEM_T', function (err, rows, fields) {

  //     if (err) {
  //         return callback(err, null);
  //     }
  //     return callback(null, rows);
  // })
  console.log(values);

    connection.query('INSERT INTO MOE_ITEM_T (No_du_compte ,Date_operation,REFERENCE, Libelle, Date_valeur, DEBIT, CREDIT) VALUES ?', [values], function (err, rows, fields) {

    if (err) {
      return callback(err, null);
    }
    return callback(null, rows);
  })




}



function Extrait(args, callback) {

  data(function (err, rows) {
    if (!err) {
      callback(null, rows);

    }
    else {
      callback(true, err);
    }
  }, args);
  //return(' <Date_operation>2008-8-2</Date_operation>');
}

module.exports = { Extrait };