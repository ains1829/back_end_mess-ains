const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { getUserbyemail } = require("../../services/user-service");

const users = [];
const SECRET_KEY = process.env.SECRET_KEY || "ma_clé_secrète";

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (users.find((user) => user.email === email)) {
    return res.status(400).json({ message: "Email déjà utilisé" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);
  res.json({ message: "Utilisateur enregistré avec succès" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserbyemail(email);
  try {
    if (user === undefined) {
      throw new Error(
        "Votre mot de passe est incorrect. Veuillez le vérifier."
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error(
        "Votre mot de passe est incorrect. Veuillez le vérifier."
      );
    }
    const token = jwt.sign({ id: user.iduser, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ succes: true, token: token });
  } catch (error) {
    res.json({ succes: false, message: error.message || "Erreur inconnue" });
  }
});

module.exports = router;
