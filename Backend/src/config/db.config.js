//i want to connect neon db and donot want to use any orm i want to use pg module to connect to neon db and for query i will write rqw queries in this project
const { Pool } = require('pg');
require('dotenv').config();
const pool =new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false
    }


})

// pool.connect()
// logging for debugging
pool.on("connect", () => {
    console.log("Connected to Neon PostgreSQL");
  });
  
  pool.on("error", (err) => {
    console.error("Unexpected PG error:", err);
    process.exit(-1);
  });
  
  // graceful shutdown — closes pool before exit (on app termination we need to handle this to avoid leaks)
  const shutdownPool = async () => {
    try {
      console.log("Closing PostgreSQL pool...");
      await pool.end();
      console.log("PostgreSQL pool closed.");
    } catch (err) {
      console.error("Error closing pool:", err);
    } finally {
      process.exit(0);
    }
  };
  
  process.on("SIGINT", shutdownPool);
  process.on("SIGTERM", shutdownPool);
  
module.exports=pool;