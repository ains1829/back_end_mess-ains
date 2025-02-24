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
/**
 * @return {Promise<User>}
 */

async function getUserbyemail(email) {
  try {
    const result = await pool.query(
      "SELECT * FROM user_message where email = $1 ",
      [email]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Erreur:", err);
    throw err;
  }
}

module.exports = { getAllUser, getUserbyemail };
