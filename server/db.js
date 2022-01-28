const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "jstreet23",
  host: "localhost",
  port: 5432,
  database: "pernhw"
});

module.exports = pool;