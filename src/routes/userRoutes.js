const express = require("express");
const middleware_auth = require("../middlewares/auth-middle");
const { getAllUser, getUserbyemail } = require("../services/user-service");
const router = express.Router();

router.get("/user", middleware_auth, async (req, res) => {
  const user = req.user;
  const user_api = await getUserbyemail(user.email);
  console.log(user_api);
  res.json({ user: user_api });
});

router.get("/all_user", async (req, res) => {
  const users = await getAllUser();
  res.send(users);
});

module.exports = router;
