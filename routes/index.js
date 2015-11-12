'use strict';
var connectionString = require('../config').connectionString;
var express = require('express');
var path = require('path');
var appDir = path.join(__filename, '../../')
var router = express.Router();
var bodyParser = require('body-parser');
var pg = require('pg');
var knex = require('../config').knex;

router.get('/', function(req,res){
     res.sendFile(path.join(appDir, 'public/index.html'));
});
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
// router.get('/', function (req, res) {
//   res.send('Hello World!');
// });


router.post('/api/v1/items', function(req, res) {

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

router.get('/api/v1/items', function(req, res) {

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

router.put('/api/v1/items/:item_id', function(req, res) {

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

router.delete('/api/v1/items/:item_id', function(req, res) {

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

module.exports = router;
