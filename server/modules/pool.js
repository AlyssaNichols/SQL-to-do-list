const pg = require("pg");
// connect DB

let config ={}

if (process.env.DATABASE_URL) {
    config = {
      connectionString: process.env.DATABASE_URL,
    };
  } else {
    config = {
      database: "weekend-to-do-app",
      host: "localhost",
      port: 5432,
      max: 10,
      idleTimeoutMillis: 30000,
    };
  }

const pool = new pg.Pool(config);

pool.on("connect", () => {
    console.log("Connected to Postgres");
});
pool.on("error", () => {
    console.log("Error with connecting to Postgres");
});

module.exports = pool;