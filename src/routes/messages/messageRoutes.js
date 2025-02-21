const express = require("express");
const router = express.Router();
const Messsage = require("../../models/messages/message-type");

router.post("/send_message", async (req, res) => {
  try {
    const reponse = req.body;
    const new_message = new Messsage(reponse);
    await new_message.save();
    console.log(reponse);
    res.status(201).json({ message: "message envoye", data: new_message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/my_message", async (req, res) => {
  try {
    const limit = 20;
    const { idconnected, iduserclicked, page } = req.query;
    const messages = await Messsage.find({
      $or: [
        { iduser_send: idconnected, iduser_receive: iduserclicked },
        { iduser_send: iduserclicked, iduser_receive: idconnected },
      ],
    })
      .skip(Number(page))
      .sort({ createdAt: -1 })
      .limit(limit);
    const totalMessages = await Messsage.countDocuments({
      $or: [
        { iduser_send: idconnected, iduser_receive: iduserclicked },
        { iduser_send: iduserclicked, iduser_receive: idconnected },
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
