const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "userData"
});

module.exports = pool;
