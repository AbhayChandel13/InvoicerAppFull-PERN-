const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "abhay@123",
  // password: "rootUser",
  host: "localhost",
  port: 5433,
  database: "billingdata",
});

module.exports = pool;
