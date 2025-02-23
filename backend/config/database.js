const pg = require("pg");
require("dotenv").config();

const { Pool } = pg;

const db = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
  ssl: {
    rejectUnauthorized: false,
  },
});

db.on("connect", () => {
  console.log("connected to db");
});

db.on("error", () => {
  console.log("disconnected from db");
  process.exit(-1);
});

module.exports = db;
