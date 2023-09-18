const pg = require("pg");
// connect DB
const pool = new pg.Pool({
    database: "weekend-to-do-app",
    host: "localhost",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on("connect", () => {
    console.log("Connected to Postgres");
});
pool.on("error", () => {
    console.log("Error with connecting to Postgres");
});

module.exports = pool;