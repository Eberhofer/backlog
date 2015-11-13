'use strict';
var express = require('express');
var routes = require('./routes/index');
var path = require('path');
var port = process.env.PORT || 3000;
var pg = require('pg');
var knex = require('./config').knex;
var connectionString = require('./config').connectionString;

var app = express();
app.use('/', express.static(path.join(__dirname, 'public')));

//server.listen(port, function () {
//  console.log('Server running on port %d', port);
//});

app.post('/api/v1/items', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {item: req.body.item, item: req.body.story, item: req.body.project_id};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Insert Data
        client.query("INSERT INTO items(item, story, project_id, complete) values($1, $2)", [data.item, data.story, data.project_id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
});

app.get('/api/v1/items', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });
});

app.put('/api/v1/items/:item_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.item_id;

    // Grab data from http request
    var data = {item: req.body.item, story: req.body.story, project_id: req.body.project_id};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Update Data
        client.query("UPDATE items SET item=($1), story=($2), project_id=($3) WHERE id=($4)", [data.item, data.story, data.project_id, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});

app.delete('/api/v1/items/:item_id', function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.todo_id;


    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Delete Data
        client.query("DELETE FROM items WHERE id=($1)", [id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM items ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if(err) {
          console.log(err);
        }

    });

});



var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});
