# backlog

A backlog for my idiosyncratic purposes and really just to learn **Node.js** with **React** and **PostgreSQL**.

It uses express, knex and bookshelf as well as ES6 promises.


## models
### schema and migrations
create the database in PostgreSQL, create the config.js file (see below), cd to models and run 'npm migrations'.
Then cd to the root directory and run 'npm start' (or, if that fails, 'node app').
### orm
### api
### config.js
```js
var conn = {
  host: 'hostname',
  user: 'username',
  password: 'pw',
  database: 'DB'
}

exports.connection = conn;
exports.connectionString = "postgres://" + conn.user + ":" + conn.password + "@" + conn.host + "/" + conn.database;
//without password: exports.connectionString = "postgres://" + conn.user + "@" + conn.host + "/" + conn.database;
```
## express
## views
