const express = require("express");
const router = express.Router();
const Messsage = require("../../models/messages/message-type");
const middleware_auth = require("../../middlewares/auth-middle");
const { getUserbyemail } = require("../../services/user-service");

router.use(middleware_auth);

router.post("/send_message", async (req, res) => {
  try {
    const reponse = req.body;
    const new_message = new Messsage(reponse);
    await new_message.save();
    res.status(201).json({ message: "message envoye", data: new_message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/my_message", async (req, res) => {
  try {
    const user = req.user;
    const user_connected = await getUserbyemail(user.email);
    console.log(user);
    const limit = 20;
    const { iduserclicked, page } = req.query;
    const messages = await Messsage.find({
      $or: [
        { iduser_send: user_connected.iduser, iduser_receive: iduserclicked },
        { iduser_send: iduserclicked, iduser_receive: user_connected.iduser },
      ],
    })
      .skip(Number(page))
      .sort({ createdAt: -1 })
      .limit(limit);
    const totalMessages = await Messsage.countDocuments({
      $or: [
        { iduser_send: user_connected.iduser, iduser_receive: iduserclicked },
        { iduser_send: iduserclicked, iduser_receive: user_connected.iduser },
      ],
    });
    const hasNextPage = Number(page) + limit < totalMessages;
    res
      .status(200)
      .json({ page: Number(page), hasNextPage: hasNextPage, data: messages });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
