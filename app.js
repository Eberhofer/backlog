'use strict';
var express = require('express');
var routes = require('./routes/index');
var path = require('path');
var port = process.env.PORT || 3000;
var pg = require('pg');
var knex = require('./config').knex;
var connectionString = require('./config').connectionString;
var bodyParser = require('body-parser');

var app = express();
app.set('port', port);
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/v1/items', function(req, res) {
//curl -H "Content-Type: application/json" -X POST –d "{\"item\":\"cmd api\",\"story\": \"entered through commandline and api\"}" http://localhost:3000/api/v1/items
    var results = [];
    // Grab data from http request
    var data = {item: req.body.item, story: req.body.story, project_id: req.body.project_id};
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // SQL Query > Insert Data
        client.query("INSERT INTO items(item, story, project_id) values($1, $2, $3)", [data.item, data.story, data.project_id]);
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
        var query = client.query("SELECT i.id, i.item, i.story, i.project_id, p.project, p.story as projectstory, p.mandate_id, m.mandate FROM items i inner join projects p on i.project_id = p.id inner join mandates m on m.id = p.mandate_id ORDER BY i.id ASC;");
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
app.get('/api/v1/projects', function(req, res) {
    var results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // SQL Query > Select Data
        var query = client.query("SELECT p.id, p.project, p.story FROM projects p ORDER BY p.id ASC;");
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

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
