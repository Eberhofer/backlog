'use strict';
var express = require('express');
var routes = require('./routes/index');
var port = process.env.PORT || 3000;

var app = express();
app.use('/', routes);

//server.listen(port, function () {
//  console.log('Server running on port %d', port);
//});

var server = app.listen(3000, function () {
  var host = 'localhost'; //server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});
