const pool = require("../config/db/db-config");

/**
 * Récupérer tous les utilisateurs depuis la base de données.
 * @returns {Promise<User[]>} - Promesse renvoyant un tableau d'utilisateurs
 */

async function getAllUser() {
  try {
    const result = await pool.query("SELECT * FROM user_message");
    return result.rows;
  } catch (err) {
    console.error("Erreur:", err);
    throw err;
  }
}

module.exports = { getAllUser };
