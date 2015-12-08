# backlog

A backlog for my idiosyncratic purposes and really just to learn **Node.js** with **React** and **PostgreSQL**.

It uses express, knex and bookshelf as well as ES6 promises

## models
### schema and migrations
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
