const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY || "ma_clé_secrète";

function middleware_auth(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token requis" });
  }
  jwt.verify(token.split(" ")[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token invalide" });
    }
    req.user = decoded;
    next();
  });
}
module.exports = middleware_auth;
