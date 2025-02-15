const express = require("express");
const middleware_auth = require("../middlewares/auth-middle");
const { getAllUser } = require("../services/user-service");
const router = express.Router();

router.get("/users", middleware_auth, (req, res) => {
  res.send("salut toi");
});

router.get("/all_user", async (req, res) => {
  const users = await getAllUser();
  res.send(users);
});

module.exports = router;
