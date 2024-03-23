const pg = require('pg');

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "EPlanner",
    password: "admin",
    port: 5432,
});

module.exports = db;