const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// debug logs
pool.on("connect", () => {
  console.log("Connected to Local PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Unexpected PG error:", err);
  process.exit(-1);
});

// health check
const checkDbHealth = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("Database connection is healthy.");
    return { ok: true, health: "Local DB Working" };
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};
// connect to db on start
const connectDB = async () => {
  try {
    await pool.query("SELECT 1");
    console.log(" DB is healthy (SELECT 1 OK)");
  } catch (err) {
    console.error0(" DB connection failed:", err.message);
    process.exit(1); // stop app
  }
};

module.exports = { pool, checkDbHealth , connectDB };
