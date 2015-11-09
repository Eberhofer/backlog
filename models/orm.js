var conn = require('../config').connection;
var knex = require("knex")({
	client: "pg",
	connection: {
 		host: conn.host,
 		user: conn.user,
 		password: conn.password,
 		database: conn.database
 	}
});

var Bookshelf = require('bookshelf')(knex);

module.exports = Bookshelf
