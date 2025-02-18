const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "message_ains",
  password: "2005",
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("🟢 Connecté à PostgreSQL"))
  .catch((err) => console.error("🔴 Erreur de connexion", err));

module.exports = pool;
